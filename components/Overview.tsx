import React from 'react';
import { OverviewStats } from '../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Scan, Building2, Globe2, Plus } from 'lucide-react';

export const Overview: React.FC<{ stats: OverviewStats }> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 space-y-6">
        {/* Scans Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="text-slate-500 text-sm font-medium mb-2 flex items-center">
            <Scan className="w-4 h-4 mr-2" /> Number of Scans Performed
          </div>
          <div className="text-5xl font-bold text-white">{stats.scans_performed}</div>
        </div>

        {/* Companies Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="text-slate-500 text-sm font-medium mb-2 flex items-center">
            <Building2 className="w-4 h-4 mr-2" /> Total Number of Companies
          </div>
          <div className="text-5xl font-bold text-white">{stats.total_companies}</div>
        </div>

        {/* Third Parties Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="text-slate-500 text-sm font-medium mb-2 flex items-center">
            <Globe2 className="w-4 h-4 mr-2" /> Total Number of Third-Parties
          </div>
          <div className="text-5xl font-bold text-cyan-400">{stats.total_third_parties}</div>
        </div>
        
        {/* Summary Action */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
             <div className="p-4 border-b border-slate-800 font-semibold text-white">Summary</div>
             <div className="p-4">
                 <button className="w-full py-2 border-2 border-dashed border-slate-700 rounded-lg text-slate-400 hover:text-white hover:border-slate-500 flex items-center justify-center transition-all">
                     <Plus className="w-4 h-4 mr-2" /> Add a new vendor to your account
                 </button>
             </div>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-6">
        {/* Scan Activity Chart */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 h-[400px] flex flex-col">
           <h3 className="text-lg font-semibold text-white mb-6">Scan Activity</h3>
           <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.scan_activity}>
                    <defs>
                        <linearGradient id="colorScans" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis dataKey="date" stroke="#64748b" tick={{fill: '#94a3b8'}} />
                    <YAxis stroke="#64748b" tick={{fill: '#94a3b8'}} />
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }}
                    />
                    <Area type="monotone" dataKey="scans" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorScans)" />
                </AreaChart>
            </ResponsiveContainer>
           </div>
        </div>

        {/* Takeaways */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 min-h-[150px]">
            <h3 className="text-lg font-semibold text-white mb-2">Takeaways</h3>
            <div className="flex items-center justify-center h-20 text-slate-500 italic">
                No results were returned for this query
            </div>
        </div>
      </div>
    </div>
  );
};