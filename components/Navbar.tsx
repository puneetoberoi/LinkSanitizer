import React from 'react';
import { ViewState } from '../types';
import { ShieldCheck, BarChart3, Zap } from 'lucide-react';

interface NavbarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, setView }) => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
      <div 
        className="flex items-center space-x-2 cursor-pointer" 
        onClick={() => setView(ViewState.HOME)}
      >
        <div className="bg-emerald-500/10 p-2 rounded-lg">
          <ShieldCheck className="text-emerald-400 w-6 h-6" />
        </div>
        <span className="text-xl font-bold tracking-tight text-white">Clean<span className="text-emerald-400">Link</span></span>
      </div>

      <div className="flex space-x-1 bg-slate-800/50 p-1 rounded-full border border-slate-700">
        <button
          onClick={() => setView(ViewState.HOME)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
            currentView === ViewState.HOME 
              ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Cleaner
        </button>
        <button
          onClick={() => setView(ViewState.STATS)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center space-x-1 ${
            currentView === ViewState.STATS 
              ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Impact</span>
        </button>
      </div>

      <button
        onClick={() => setView(ViewState.PRO)}
        className="hidden md:flex items-center space-x-1 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-bold hover:opacity-90 transition-opacity shadow-lg shadow-indigo-500/20"
      >
        <Zap className="w-4 h-4 fill-current" />
        <span>Get Pro</span>
      </button>
    </nav>
  );
};