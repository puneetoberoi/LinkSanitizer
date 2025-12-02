import React from 'react';
import { CheckCircle2, Zap, ShieldCheck, Crown } from 'lucide-react';

export const ProView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in-up">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">Go Professional</h2>
        <p className="text-slate-400 max-w-xl mx-auto">
          Support the mission and unlock vanity short-links. Control exactly how your content appears on social media.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        {/* Free Plan */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 relative">
          <h3 className="text-xl font-bold text-white mb-2">Basic</h3>
          <div className="text-3xl font-extrabold text-slate-200 mb-6">$0</div>
          <ul className="space-y-4 mb-8">
            <li className="flex items-center space-x-3 text-slate-400">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span>Unlimited Cleaning</span>
            </li>
            <li className="flex items-center space-x-3 text-slate-400">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span>Standard Regex Removal</span>
            </li>
            <li className="flex items-center space-x-3 text-slate-400">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span>Basic AI Risk Scan</span>
            </li>
          </ul>
          <button className="w-full py-3 bg-slate-800 text-slate-300 rounded-xl font-medium cursor-default">
            Current Plan
          </button>
        </div>

        {/* Pro Plan */}
        <div className="bg-slate-800 border border-indigo-500/50 rounded-3xl p-8 relative overflow-hidden shadow-2xl shadow-indigo-500/10">
          <div className="absolute top-0 right-0 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
            RECOMMENDED
          </div>
          <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
            Pro <Crown className="w-5 h-5 text-amber-400 fill-current" />
          </h3>
          <div className="text-3xl font-extrabold text-white mb-6">
            $2<span className="text-lg text-slate-400 font-normal">/mo</span>
          </div>
          <ul className="space-y-4 mb-8">
            <li className="flex items-center space-x-3 text-white">
              <ShieldCheck className="w-5 h-5 text-indigo-400" />
              <span>Everything in Basic</span>
            </li>
            <li className="flex items-center space-x-3 text-white">
              <Zap className="w-5 h-5 text-indigo-400" />
              <span>Vanity Short-links (cl.ink/you)</span>
            </li>
            <li className="flex items-center space-x-3 text-white">
              <Zap className="w-5 h-5 text-indigo-400" />
              <span>Detailed Link Analytics</span>
            </li>
            <li className="flex items-center space-x-3 text-white">
              <Zap className="w-5 h-5 text-indigo-400" />
              <span>Priority AI Processing</span>
            </li>
          </ul>
          <button className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-bold hover:opacity-90 transition-opacity">
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );
};