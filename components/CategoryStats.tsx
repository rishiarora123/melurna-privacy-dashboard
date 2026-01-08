import React from 'react';
import { CategoryStat } from '../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export const CategoryStats: React.FC<{ categories: CategoryStat[] }> = ({ categories }) => {
  const timeData = [
    { date: '22 Oct', env: 10, dev: 20, corp: 5 },
    { date: '29 Oct', env: 15, dev: 35, corp: 12 },
    { date: '08 Nov', env: 40, dev: 80, corp: 25 },
    { date: '15 Nov', env: 35, dev: 120, corp: 30 },
    { date: '22 Nov', env: 20, dev: 60, corp: 15 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex space-x-6 border-b border-slate-800 pb-2 overflow-x-auto">
         {['Overview', 'Categories by Country', 'Categories by IP', 'n IPs by Category'].map((tab, i) => (
             <button key={tab} className={`text-sm font-medium whitespace-nowrap pb-2 ${i === 3 ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-slate-400 hover:text-slate-200'}`}>
                 {tab}
             </button>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Stacked Chart */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 h-[350px]">
              <h3 className="text-lg font-semibold text-white mb-4">Categorized Stats over time</h3>
              <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={timeData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                      <XAxis dataKey="date" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                      <Area type="monotone" dataKey="dev" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                      <Area type="monotone" dataKey="env" stackId="1" stroke="#22c55e" fill="#22c55e" fillOpacity={0.6} />
                      <Area type="monotone" dataKey="corp" stackId="1" stroke="#eab308" fill="#eab308" fillOpacity={0.6} />
                  </AreaChart>
              </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 h-[400px]">
               <h3 className="text-lg font-semibold text-white mb-4">n IPs by Category</h3>
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categories} layout="vertical" margin={{left: 40}}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                      <XAxis type="number" stroke="#64748b" />
                      <YAxis type="category" dataKey="name" width={150} stroke="#94a3b8" tick={{fontSize: 10}} />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                      <Bar dataKey="ip_count" fill="#86efac" radius={[0, 4, 4, 0]} />
                  </BarChart>
               </ResponsiveContainer>
          </div>

          {/* Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
               <div className="p-4 border-b border-slate-800 font-semibold text-white">Country Count per Category</div>
               <table className="w-full text-left text-sm">
                   <thead className="bg-slate-950 text-slate-500 uppercase text-xs">
                       <tr>
                           <th className="p-3">company_name</th>
                           <th className="p-3">country_name</th>
                           <th className="p-3 text-right">category_name</th>
                       </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-800">
                       {categories.map((c, i) => (
                           <tr key={i} className="hover:bg-slate-800/50">
                               <td className="p-3 text-white">Amazon</td>
                               <td className="p-3 text-slate-400">United States</td>
                               <td className="p-3 text-right text-slate-300">{c.name}</td>
                           </tr>
                       ))}
                   </tbody>
               </table>
          </div>
      </div>
    </div>
  );
};