import React, { useState, useEffect } from 'react';
import { cleanUrl } from '../services/urlService';
import { analyzePrivacyRisk } from '../services/geminiService';
import { CleanResult, AiAnalysis } from '../types';
import { ResultCard } from './ResultCard';
import { Sparkles, Link as LinkIcon, X, Check } from 'lucide-react';

export const CleanerWidget: React.FC = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<CleanResult | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<AiAnalysis | null>(null);
  const [isCleaning, setIsCleaning] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [pasteError, setPasteError] = useState(false);
  const [showConsent, setShowConsent] = useState(false);

  // Helper to validate if string looks like a URL
  const isValidUrl = (str: string) => {
    try {
      new URL(str);
      return true;
    } catch {
      return false;
    }
  };

  const handleClean = async (urlToClean: string = input) => {
    if (!urlToClean.trim()) return;
    
    setIsCleaning(true);
    setResult(null);
    setAiAnalysis(null);

    // 1. Instant Regex Cleaning
    const cleanResult = cleanUrl(urlToClean);
    setResult(cleanResult);
    setIsCleaning(false);

    // 2. Async AI Analysis
    if (cleanResult.removedParams.length > 0) {
      setIsAiLoading(true);
      try {
        const urlObj = new URL(cleanResult.cleanedUrl);
        const analysis = await analyzePrivacyRisk(cleanResult.removedParams, urlObj.hostname);
        setAiAnalysis(analysis);
      } catch (e) {
        setAiAnalysis(null);
      } finally {
        setIsAiLoading(false);
      }
    } else {
        setAiAnalysis({
            riskLevel: 'Low',
            explanation: 'CleanLink detected no known tracking parameters. This link appears safe.',
            dataExposed: []
        });
    }
  };

  const performAutoPaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text && text.trim().length > 0) {
        setInput(text);
        setPasteError(false);
        // UX Recommendation: If it looks like a URL, clean it immediately (Zero-UI)
        if (isValidUrl(text)) {
           handleClean(text);
        }
      }
    } catch (err) {
      console.debug('Auto-clipboard read blocked or empty:', err);
    }
  };

  useEffect(() => {
    const checkPreferenceAndClipboard = () => {
      const pref = localStorage.getItem('cleanlink_autopaste');
      
      if (pref === 'true') {
        performAutoPaste();
      } else if (pref === null) {
        // Only ask if we haven't asked before
        setShowConsent(true);
      }
      // If 'false', do nothing
    };

    // Check on mount
    checkPreferenceAndClipboard();

    // Check on focus (if allowed)
    const onFocus = () => {
        if (localStorage.getItem('cleanlink_autopaste') === 'true') {
            performAutoPaste();
        }
    };

    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, []);

  const handleConsent = (allowed: boolean) => {
    setShowConsent(false);
    localStorage.setItem('cleanlink_autopaste', allowed.toString());
    if (allowed) {
      performAutoPaste();
    }
  };

  const handleManualPaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
      setPasteError(false);
      // Also auto-clean on manual paste button for consistency
      if (isValidUrl(text)) {
        handleClean(text);
      }
    } catch (err) {
      console.error('Failed to read clipboard', err);
      setPasteError(true);
      setTimeout(() => setPasteError(false), 4000);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 relative">
      
      {/* Consent Modal Overlay */}
      {showConsent && (
        <div className="absolute top-0 left-0 right-0 z-50 px-4">
          <div className="bg-slate-800 border border-indigo-500/50 p-4 rounded-xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4 animate-fade-in-up">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-indigo-500/20 rounded-lg">
                <Sparkles className="w-5 h-5 text-indigo-400" />
              </div>
              <div className="text-left">
                <p className="text-white font-medium text-sm">Enable Auto-Paste & Clean?</p>
                <p className="text-slate-400 text-xs">CleanLink can automatically strip trackers when you open the app.</p>
              </div>
            </div>
            <div className="flex space-x-2 w-full md:w-auto">
              <button 
                onClick={() => handleConsent(false)}
                className="flex-1 md:flex-none px-3 py-2 rounded-lg text-slate-400 hover:text-white text-xs font-medium transition-colors"
              >
                No thanks
              </button>
              <button 
                onClick={() => handleConsent(true)}
                className="flex-1 md:flex-none px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center space-x-1"
              >
                <Check className="w-3 h-3" />
                <span>Allow</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-indigo-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative bg-slate-900 ring-1 ring-slate-800 rounded-2xl p-2 md:p-4 flex flex-col md:flex-row items-center gap-2">
          <div className="flex-1 w-full relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
              <LinkIcon className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste a long, messy URL here..."
              className="w-full bg-slate-800/50 text-white placeholder-slate-500 border border-transparent focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 rounded-xl py-4 pl-12 pr-4 outline-none transition-all font-mono text-sm"
              onKeyDown={(e) => e.key === 'Enter' && handleClean(input)}
            />
          </div>
          
          <button
            onClick={() => handleClean(input)}
            disabled={!input || isCleaning}
            className="w-full md:w-auto px-8 py-4 bg-white text-slate-900 rounded-xl font-bold hover:bg-emerald-50 active:scale-95 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isCleaning ? (
               <span className="animate-pulse">Cleaning...</span>
            ) : (
                <>
                    <Sparkles className="w-5 h-5 text-indigo-600" />
                    <span>Clean Link</span>
                </>
            )}
          </button>
        </div>
      </div>
      
      {!input && (
        <div className="text-center mt-4 h-6">
            {pasteError ? (
                <span className="text-xs text-red-400 font-medium animate-pulse">
                    Clipboard blocked. Please press {navigator.userAgent.includes('Mac') ? 'Cmd+V' : 'Ctrl+V'} to paste.
                </span>
            ) : (
                <button onClick={handleManualPaste} className="text-xs text-slate-500 hover:text-emerald-400 transition-colors underline decoration-dotted">
                    Paste from clipboard
                </button>
            )}
        </div>
      )}

      {result && (
        <ResultCard 
          result={result} 
          aiAnalysis={aiAnalysis} 
          loadingAi={isAiLoading} 
        />
      )}
    </div>
  );
};