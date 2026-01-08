import React from 'react';
import { Scores } from '../types';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { ShieldAlert, AlertTriangle, ArrowUpRight } from 'lucide-react';

interface RiskChartsProps {
  scores: Scores;
}

export const RiskCharts: React.FC<RiskChartsProps> = ({ scores }) => {
  // Transform scores object to array for Radar chart
  const radarData = [
    { subject: 'Geo Risk', A: scores.geo_risk, fullMark: 1000 },
    { subject: 'Security', A: scores.security, fullMark: 1000 },
    { subject: 'Compliance', A: scores.compliance, fullMark: 1000 },
    { subject: 'Availability', A: scores.availability, fullMark: 1000 },
    { subject: 'Vendor', A: scores.vendor, fullMark: 1000 },
  ];

  // Mock data for Threat Velocity
  const velocityData = [
    { name: '00:00', detected: 4, blocked: 2, severity: 200 },
    { name: '04:00', detected: 7, blocked: 5, severity: 350 },
    { name: '08:00', detected: 18, blocked: 12, severity: 600 },
    { name: '12:00', detected: 23, blocked: 18, severity: 800 },
    { name: '16:00', detected: 15, blocked: 14, severity: 400 },
    { name: '20:00', detected: 9, blocked: 8, severity: 300 },
  ];

  const criticalAlerts = [
    { id: 'CVE-2023-4401', target: 'api.melurna.io', type: 'SQL Injection Attempt', time: '10m ago' },
    { id: 'WARN-992', target: 'payment-gateway', type: 'Unencrypted PII Transmission', time: '1h ago' },
    { id: 'GEO-BLK-01', target: 'auth-service', type: 'Login from Sanctioned Region (KP)', time: '2h ago' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end border-b border-slate-800 pb-4">
        <div>
            <h2 className="text-2xl font-bold text-white">Risk Intelligence</h2>
            <p className="text-slate-400 text-sm">Real-time vector analysis and threat modeling.</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-cyan-400 bg-cyan-950/30 px-3 py-1 rounded-full border border-cyan-900">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span>Live Analysis</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Radar Chart */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 lg:col-span-1 min-h-[400px]">
          <h3 className="text-lg font-semibold text-white mb-4">Security Surface Area</h3>
          <div className="h-[300px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 1000]} tick={false} axisLine={false} />
                <Radar
                  name="Current Posture"
                  dataKey="A"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  fill="#06b6d4"
                  fillOpacity={0.3}
                />
                <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }}
                    itemStyle={{ color: '#22d3ee' }}
                />
              </RadarChart>
            </ResponsiveContainer>
            <div className="absolute bottom-0 left-0 right-0 text-center text-xs text-slate-500">
                Score > 800 indicates optimal posture
            </div>
          </div>
        </div>

        {/* Velocity Chart */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 lg:col-span-2 min-h-[400px]">
          <h3 className="text-lg font-semibold text-white mb-4">Threat Velocity (24h)</h3>
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={velocityData}>
                <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis yAxisId="left" stroke="#64748b" />
                <YAxis yAxisId="right" orientation="right" stroke="#ef4444" />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                <Legend />
                <Bar yAxisId="left" dataKey="detected" name="Anomalies Detected" fill="#3b82f6" barSize={20} radius={[4, 4, 0, 0]} />
                <Bar yAxisId="left" dataKey="blocked" name="Auto-Blocked" fill="#10b981" barSize={20} radius={[4, 4, 0, 0]} />
                <Line yAxisId="right" type="monotone" dataKey="severity" name="Severity Index" stroke="#ef4444" strokeWidth={3} dot={{r: 4}} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Critical Alerts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-red-950/30 to-slate-900 border border-red-900/50 rounded-xl p-6">
             <div className="flex items-center justify-between mb-4">
                 <h3 className="text-lg font-semibold text-white flex items-center">
                    <ShieldAlert className="text-red-500 mr-2" />
                    Critical Vulnerabilities
                 </h3>
                 <button className="text-xs text-red-400 hover:text-red-300 underline">View All Issues</button>
             </div>
             
             <div className="space-y-3">
                 {criticalAlerts.map((alert, idx) => (
                     <div key={idx} className="bg-slate-950/50 p-3 rounded-lg border border-slate-800 flex items-start justify-between group hover:border-red-500/30 transition-colors">
                         <div>
                             <div className="flex items-center space-x-2">
                                <span className="text-red-400 font-mono text-xs bg-red-950/50 px-1.5 py-0.5 rounded">{alert.id}</span>
                                <span className="text-slate-200 text-sm font-medium">{alert.type}</span>
                             </div>
                             <div className="text-slate-500 text-xs mt-1">Target: <span className="font-mono text-slate-400">{alert.target}</span></div>
                         </div>
                         <div className="text-slate-500 text-xs whitespace-nowrap">{alert.time}</div>
                     </div>
                 ))}
             </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
             <div className="flex items-center justify-between mb-4">
                 <h3 className="text-lg font-semibold text-white flex items-center">
                    <AlertTriangle className="text-amber-500 mr-2" />
                    Sentinel Exposure (PII)
                 </h3>
             </div>
             <div className="grid grid-cols-2 gap-4">
                 <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-center">
                     <div className="text-3xl font-bold text-white mb-1">12</div>
                     <div className="text-xs text-slate-500 uppercase tracking-wider">SSN Exposures</div>
                     <div className="mt-2 text-xs text-red-400 flex items-center justify-center">
                         <ArrowUpRight size={12} className="mr-1" /> +2 this week
                     </div>
                 </div>
                 <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-center">
                     <div className="text-3xl font-bold text-white mb-1">485</div>
                     <div className="text-xs text-slate-500 uppercase tracking-wider">Email Leaks</div>
                     <div className="mt-2 text-xs text-emerald-400 flex items-center justify-center">
                         <span className="rotate-90 inline-block mr-1">➜</span> Stable
                     </div>
                 </div>
                 <div className="col-span-2 bg-slate-950 p-4 rounded-lg border border-slate-800 flex justify-between items-center">
                     <div>
                         <div className="text-sm font-medium text-slate-300">Total Unencrypted Transmissions</div>
                         <div className="text-xs text-slate-500">Across all 3rd party vendors</div>
                     </div>
                     <div className="text-2xl font-mono text-amber-500">1,204</div>
                 </div>
             </div>
        </div>
      </div>
    </div>
  );
};