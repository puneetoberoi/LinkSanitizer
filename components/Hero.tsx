import React from 'react';

export const Hero: React.FC = () => {
  return (
    <div className="text-center py-12 px-4">
      <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
        Make your links <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">clean</span> again.
      </h1>
      <p className="text-slate-400 text-lg max-w-2xl mx-auto">
        Instantly strip invasive tracking parameters, UTM codes, and affiliate junk from your URLs. 
        Powered by local Regex and Gemini AI for advanced privacy analysis.
      </p>
    </div>
  );
};