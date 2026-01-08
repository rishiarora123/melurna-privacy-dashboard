import React, { useState } from 'react';
import { TrafficRequest, VendorStat } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface VendorDiscoveryProps {
  vendors: VendorStat[];
}

export const VendorDiscovery: React.FC<VendorDiscoveryProps> = ({ vendors }) => {
  const [activeTab, setActiveTab] = useState('First-Parties');

  const thirdPartyCount = vendors.filter(v => v.type === 'Third Party').length;
  const chartData = [
      { name: 'Feb 16', tp: 135, fp: 120 },
      { name: 'Feb 21', tp: 112, fp: 110 },
      { name: 'Mar 14', tp: 56, fp: 50 },
      { name: 'Mar 24', tp: 60, fp: 45 },
  ];

  return (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
             <div className="flex space-x-6 border-b border-slate-800 pb-2">
                {['Third-Parties', 'First-Parties', 'Comparisons'].map((tab) => (
                    <button 
                        key={tab} 
                        onClick={() => setActiveTab(tab)}
                        className={`text-sm font-medium whitespace-nowrap pb-2 transition-colors ${activeTab === tab ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-slate-400 hover:text-slate-200'}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
            <div className="flex items-center space-x-2">
                 <span className="text-slate-500 text-sm">Number of Third-Parties</span>
                 <span className="text-3xl font-bold text-white">{186}</span>
            </div>
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Chart Section */}
         <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-xl p-6 h-[300px]">
            <h3 className="text-lg font-semibold text-white mb-4">IPs (First-Party vs Third-Party)</h3>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis dataKey="name" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }} />
                    <Bar dataKey="tp" name="Third Party IP Count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="fp" name="First Party IP Count" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
         </div>

         {/* Tables */}
         <div className="lg:col-span-1 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
             <div className="p-4 border-b border-slate-800 font-semibold text-white">Company Owned Domains / First-Party</div>
             <div className="overflow-auto max-h-[400px]">
                 <table className="w-full text-left text-sm">
                     <thead className="bg-slate-950 text-slate-500 uppercase text-xs sticky top-0">
                         <tr>
                             <th className="p-3">company_name</th>
                             <th className="p-3">domain_name</th>
                         </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-800">
                         {vendors.filter(v => v.type === 'First Party').map((v, i) => (
                             <tr key={i} className="hover:bg-slate-800/50">
                                 <td className="p-3 text-white">{v.name}</td>
                                 <td className="p-3 text-slate-400">{v.domain}</td>
                             </tr>
                         ))}
                     </tbody>
                 </table>
             </div>
         </div>

         <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
             <div className="p-4 border-b border-slate-800 font-semibold text-white">Third-Party Vendors</div>
             <div className="overflow-auto max-h-[400px]">
                <table className="w-full text-left text-sm">
                     <thead className="bg-slate-950 text-slate-500 uppercase text-xs sticky top-0">
                         <tr>
                             <th className="p-3">company_name</th>
                             <th className="p-3">third_party_domain</th>
                             <th className="p-3 text-right">Share %</th>
                         </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-800">
                         {vendors.filter(v => v.type === 'Third Party').map((v, i) => (
                             <tr key={i} className="hover:bg-slate-800/50">
                                 <td className="p-3 text-white">BetterHelp</td>
                                 <td className="p-3 text-slate-400">{v.domain}</td>
                                 <td className="p-3 text-right text-slate-300">{v.share_percentage || 0}%</td>
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