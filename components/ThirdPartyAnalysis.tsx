import React from 'react';
import { VendorStat } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const ThirdPartyAnalysis: React.FC<{ vendors: VendorStat[] }> = ({ vendors }) => {
  const chartData = [
    { date: 'Thu 14', count: 10500 },
    { date: 'Fri 10', count: 12400 },
    { date: 'Tue 10', count: 40500 },
    { date: 'Fri 21', count: 25800 },
    { date: 'Mon 24', count: 13000 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex space-x-6 border-b border-slate-800 pb-2">
        <button className="text-sm font-medium whitespace-nowrap pb-2 transition-colors text-slate-400 hover:text-slate-200">
            Third-Party Frequency
        </button>
        <button className="text-sm font-medium whitespace-nowrap pb-2 transition-colors text-cyan-400 border-b-2 border-cyan-400">
            Sensitive Data Share Analysis
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Metric Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 flex flex-col justify-center items-center">
            <h3 className="text-slate-400 font-medium mb-4">Third Party Sensitive Data Shared Percentage</h3>
            <div className="text-7xl font-bold text-rose-500">40.35</div>
            <div className="text-xl text-slate-500 mt-2">Percent %</div>
        </div>

        {/* Chart */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
             <h3 className="text-lg font-semibold text-white mb-4">Sensitive Data Shared Count</h3>
             <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                        <XAxis dataKey="date" stroke="#64748b" />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                        <Bar dataKey="count" fill="#f97316" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
             </div>
        </div>

        {/* Frequency Table */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-slate-800 font-semibold text-white">Third-Party Frequency</div>
            <div className="overflow-auto max-h-[500px]">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-950 text-slate-500 uppercase text-xs sticky top-0">
                        <tr>
                            <th className="p-3">company_name</th>
                            <th className="p-3">third_party_domain</th>
                            <th className="p-3 text-right">third_party_count</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {vendors.filter(v => v.type === 'Third Party').map((v, i) => (
                            <tr key={i} className="hover:bg-slate-800/50">
                                <td className="p-3 text-white">Amazon</td>
                                <td className="p-3 text-slate-400">{v.domain}</td>
                                <td className="p-3 text-right font-mono text-cyan-400 bg-cyan-900/10">{v.count}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  );
};