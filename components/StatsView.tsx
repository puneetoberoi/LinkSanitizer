import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'Amazon', trackers: 450, color: '#f59e0b' },
  { name: 'Facebook', trackers: 820, color: '#3b82f6' },
  { name: 'TikTok', trackers: 560, color: '#ec4899' },
  { name: 'Google', trackers: 390, color: '#10b981' },
  { name: 'Twitter', trackers: 210, color: '#6366f1' },
];

export const StatsView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in-up">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Global Impact</h2>
        <p className="text-slate-400">Trackers removed by CleanLink community this week.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl text-center">
          <div className="text-4xl font-extrabold text-emerald-400 mb-2">24.5k</div>
          <div className="text-sm text-slate-400 font-medium">Links Cleaned</div>
        </div>
        <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl text-center">
          <div className="text-4xl font-extrabold text-indigo-400 mb-2">1.2M</div>
          <div className="text-sm text-slate-400 font-medium">Data Points Protected</div>
        </div>
        <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl text-center">
          <div className="text-4xl font-extrabold text-cyan-400 mb-2">85%</div>
          <div className="text-sm text-slate-400 font-medium">Avg. Length Reduction</div>
        </div>
      </div>

      <div className="bg-slate-800/50 border border-slate-700 p-6 md:p-8 rounded-3xl h-[400px]">
        <h3 className="text-lg font-bold text-white mb-6">Top Offenders</h3>
        <ResponsiveContainer width="100%" height="85%">
          <BarChart data={data}>
            <XAxis 
              dataKey="name" 
              stroke="#64748b" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false}
            />
            <YAxis 
              stroke="#64748b" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc' }}
              itemStyle={{ color: '#f8fafc' }}
              cursor={{fill: 'transparent'}}
            />
            <Bar dataKey="trackers" radius={[6, 6, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};