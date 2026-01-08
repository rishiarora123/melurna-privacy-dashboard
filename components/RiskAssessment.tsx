import React from 'react';
import { Scores } from '../types';
import { RiskScoreCards } from './RiskScoreCards';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface RiskAssessmentProps {
  scores: Scores;
}

export const RiskAssessment: React.FC<RiskAssessmentProps> = ({ scores }) => {
  const geoRiskHistory = [
    { date: '19 Oct', score: 200 },
    { date: '25 Oct', score: 350 },
    { date: '01 Nov', score: 300 },
    { date: '08 Nov', score: 550 },
    { date: '15 Nov', score: 590 },
  ];

  const companies = [
      { name: 'Amazon', score: 590, status: 'High' },
      { name: 'BetterHelp', score: 680, status: 'Medium' },
      { name: 'Klaviyo Inc', score: 382, status: 'Low' },
      { name: 'Ring', score: 203, status: 'Critical' },
      { name: 'Twitch', score: 493, status: 'Medium' },
  ];

  return (
    <div className="space-y-6">
      {/* Sub-nav emulation */}
      <div className="flex space-x-6 border-b border-slate-800 pb-2 overflow-x-auto">
         {['Takeaways', 'Geographical Risk', 'Network', 'Availability', 'Data Security', 'Compliance'].map((tab, i) => (
             <button key={tab} className={`text-sm font-medium whitespace-nowrap pb-2 ${i === 1 ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-slate-400 hover:text-slate-200'}`}>
                 {tab}
             </button>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Geo Risk Over Time */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Geographical Risk over Time</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={geoRiskHistory}>
                        <defs>
                            <linearGradient id="colorGeo" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                        <XAxis dataKey="date" stroke="#64748b" tick={{fill: '#94a3b8'}} />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                        <Area type="monotone" dataKey="score" stroke="#06b6d4" strokeWidth={2} fill="url(#colorGeo)" />
                    </AreaChart>
                </ResponsiveContainer>
              </div>
          </div>

          {/* Geo Risk Score Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 flex flex-col items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent"></div>
               <h3 className="text-slate-400 font-medium uppercase tracking-wider z-10">Geo Risk</h3>
               <div className="text-7xl font-bold text-emerald-400 mt-4 z-10">{scores.geo_risk}</div>
               <div className="text-slate-500 mt-2 z-10">Score</div>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Geographical Risk Score ALL */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
              <div className="p-4 border-b border-slate-800 font-semibold text-white">Geographical Risk Score ALL</div>
              <table className="w-full text-left text-sm">
                  <thead className="bg-slate-950 text-slate-500 uppercase text-xs">
                      <tr>
                          <th className="p-3">scan_datetime</th>
                          <th className="p-3">company_name</th>
                          <th className="p-3 text-right">Geo Risk Score</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                      {companies.map((c, i) => (
                          <tr key={i} className="hover:bg-slate-800/50">
                              <td className="p-3 text-slate-400 font-mono">2023-11-{18 + i}</td>
                              <td className="p-3 text-white">{c.name}</td>
                              <td className="p-3 text-right">
                                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                                      c.score > 600 ? 'bg-emerald-500/20 text-emerald-500' :
                                      c.score > 400 ? 'bg-amber-500/20 text-amber-500' :
                                      'bg-red-500/20 text-red-500'
                                  }`}>
                                      {c.score}
                                  </span>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>

          {/* Data Security Score */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
              <div className="p-4 border-b border-slate-800 font-semibold text-white">Data Security Score</div>
              <table className="w-full text-left text-sm">
                  <thead className="bg-slate-950 text-slate-500 uppercase text-xs">
                      <tr>
                          <th className="p-3">company_name</th>
                          <th className="p-3 text-right">data_security_risk_score</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                      {companies.map((c, i) => (
                          <tr key={i} className="hover:bg-slate-800/50">
                              <td className="p-3 text-white">{c.name}</td>
                              <td className="p-3 text-right">
                                  <div className="flex items-center justify-end">
                                    <div className="w-24 h-2 bg-slate-800 rounded-full mr-3 overflow-hidden">
                                        <div className={`h-full ${
                                            c.score > 600 ? 'bg-emerald-500' :
                                            c.score > 400 ? 'bg-amber-500' :
                                            'bg-red-500'
                                        }`} style={{width: `${c.score / 10}%`}}></div>
                                    </div>
                                    <span className="font-mono text-slate-300">{Math.floor(c.score * 0.8)}</span>
                                  </div>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      </div>
    </div>
  );
};