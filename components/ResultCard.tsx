import React, { useState } from 'react';
import { CleanResult, AiAnalysis } from '../types';
import { Check, Copy, AlertTriangle, Shield, Search } from 'lucide-react';

interface ResultCardProps {
  result: CleanResult;
  aiAnalysis: AiAnalysis | null;
  loadingAi: boolean;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, aiAnalysis, loadingAi }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(result.cleanedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!result.cleanedUrl) return null;

  return (
    <div className="mt-8 space-y-6 animate-fade-in-up">
      {/* Main Result */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-cyan-400"></div>
        
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-emerald-400 font-semibold text-sm uppercase tracking-wider mb-1">Clean Link Generated</h3>
            <p className="text-slate-400 text-xs">Ready to share privately</p>
          </div>
          <div className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold border border-emerald-500/20">
            {result.reductionPercentage}% Smaller
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-xl p-4 font-mono text-emerald-100 break-all border border-slate-700/50 mb-6">
          {result.cleanedUrl}
        </div>

        <button
          onClick={handleCopy}
          className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white rounded-xl font-bold transition-colors flex items-center justify-center space-x-2"
        >
          {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
          <span>{copied ? 'Copied to Clipboard' : 'Copy Clean Link'}</span>
        </button>
      </div>

      {/* Stats & AI Analysis Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Statistics */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-5">
          <h4 className="text-slate-300 font-medium mb-4 flex items-center space-x-2">
            <Search className="w-4 h-4 text-slate-500" />
            <span>Removal Stats</span>
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Trackers Found</span>
              <span className="text-white font-mono">{result.paramCount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Chars Removed</span>
              <span className="text-white font-mono">{result.originalUrl.length - result.cleanedUrl.length}</span>
            </div>
            {result.removedParams.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-700/50">
                <span className="text-xs text-slate-500 block mb-2">Removed Parameters:</span>
                <div className="flex flex-wrap gap-2">
                  {result.removedParams.map((param, i) => (
                    <span key={i} className="px-2 py-1 bg-red-500/10 text-red-400 border border-red-500/20 rounded text-xs font-mono">
                      {param}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* AI Insight */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-5 relative overflow-hidden">
          <h4 className="text-slate-300 font-medium mb-4 flex items-center space-x-2">
            <Shield className="w-4 h-4 text-indigo-400" />
            <span>AI Privacy Scan</span>
          </h4>

          {loadingAi ? (
            <div className="flex flex-col items-center justify-center h-32 space-y-3">
               <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
               <span className="text-xs text-indigo-300 animate-pulse">Analyzing privacy risks...</span>
            </div>
          ) : aiAnalysis ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Risk Level</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                  aiAnalysis.riskLevel === 'High' ? 'bg-red-500/20 text-red-400' :
                  aiAnalysis.riskLevel === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-emerald-500/20 text-emerald-400'
                }`}>
                  {aiAnalysis.riskLevel}
                </span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {aiAnalysis.explanation}
              </p>
              {aiAnalysis.dataExposed.length > 0 && (
                <div className="pt-2">
                   <span className="text-xs text-slate-500">Data Prevented:</span>
                   <p className="text-xs text-indigo-300 mt-1">{aiAnalysis.dataExposed.join(', ')}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-32 text-slate-500 text-sm italic">
              Scan initiated automatically...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};