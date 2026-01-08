import React, { useState, useMemo } from 'react';
import { Sentinel, TrafficRequest } from '../types';
import { AlertCircle, Globe, Hash, Mail, CreditCard, ArrowRight, ShieldAlert, FileText, Search, Filter, Phone, MapPin } from 'lucide-react';

interface JourneyDiscoveryProps {
  sentinels: Sentinel[];
  trafficLog: TrafficRequest[];
}

export const JourneyDiscovery: React.FC<JourneyDiscoveryProps> = ({ sentinels, trafficLog }) => {
  const [activeFilterId, setActiveFilterId] = useState<string | null>(sentinels[0]?.value || null);
  const [searchTerm, setSearchTerm] = useState('');

  const activeSentinel = sentinels.find(s => s.value === activeFilterId);

  const filteredTraffic = useMemo(() => {
    if (!activeFilterId) return [];
    if (!activeSentinel) return [];
    const relatedDomains = activeSentinel.locations.map(l => l.domain);
    
    return trafficLog.filter(req => 
      relatedDomains.includes(req.domain) || req.has_sentinels
    );
  }, [activeFilterId, activeSentinel, trafficLog]);

  const getIconForType = (type: string) => {
    switch (type) {
      case 'Email': return <Mail size={16} />;
      case 'SSN': return <ShieldAlert size={16} />;
      case 'SessionID': return <Hash size={16} />;
      case 'ProductID': return <CreditCard size={16} />;
      case 'Phone': return <Phone size={16} />;
      case 'Address': return <MapPin size={16} />;
      default: return <AlertCircle size={16} />;
    }
  };

  const getRiskColor = (risk: string) => {
      switch(risk) {
          case 'High': return 'bg-red-500';
          case 'Medium': return 'bg-amber-500';
          case 'Low': return 'bg-emerald-500';
          default: return 'bg-slate-500';
      }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col lg:flex-row h-[600px] shadow-2xl">
      {/* LEFT PANE: Identifier Filter */}
      <div className="w-full lg:w-1/3 border-r border-slate-800 flex flex-col bg-slate-900/50">
        <div className="p-4 border-b border-slate-800">
            <h2 className="text-lg font-semibold text-white mb-1">Identifier Filter</h2>
            <p className="text-xs text-slate-500 mb-4">Select sentinels to trace their journey.</p>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search sentinels..." 
              className="w-full bg-slate-950 border border-slate-800 rounded-md py-2 px-3 pl-8 text-sm focus:border-cyan-500 outline-none text-slate-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="w-4 h-4 text-slate-500 absolute left-2.5 top-2.5" />
          </div>
        </div>
        
        {/* Table Header for Left Pane */}
        <div className="flex px-4 py-2 bg-slate-950/50 border-b border-slate-800 text-[10px] font-bold uppercase text-slate-500 tracking-wider">
            <div className="flex-1">scan_sentinel_name</div>
            <div className="w-20 text-right">element_count</div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {sentinels.filter(s => s.value.includes(searchTerm) || s.type.includes(searchTerm)).map((sentinel) => (
            <div 
              key={sentinel.value}
              onClick={() => setActiveFilterId(sentinel.value)}
              className={`flex items-center px-4 py-3 border-b border-slate-800/50 cursor-pointer transition-all hover:bg-slate-800 ${activeFilterId === sentinel.value ? 'bg-slate-800/80 border-l-2 border-l-cyan-500' : 'border-l-2 border-l-transparent'}`}
            >
              <div className="flex-1 min-w-0 pr-4">
                  <div className="flex items-center space-x-2 mb-1">
                       {getIconForType(sentinel.type)}
                       <span className="text-xs font-semibold text-slate-300">{sentinel.type}</span>
                  </div>
                  <div className="text-xs font-mono text-slate-400 truncate" title={sentinel.value}>{sentinel.value}</div>
              </div>
              
              <div className="flex items-center space-x-3">
                  <span className="font-mono text-sm font-medium text-white">{sentinel.count}</span>
                  <div className={`w-2 h-10 rounded-full ${getRiskColor(sentinel.risk_level)} opacity-80`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT PANE: Tracking Data View */}
      <div className="flex-1 flex flex-col bg-slate-950">
        <div className="p-4 border-b border-slate-800 bg-slate-900 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-white">Tracking Data View</h2>
          </div>
          <div className="flex space-x-2">
             <button className="p-1.5 hover:bg-slate-800 rounded text-slate-400">
               <Filter size={16} />
             </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-900/90 sticky top-0 z-10 text-[11px] uppercase text-slate-500 font-bold tracking-wider">
              <tr>
                <th className="p-3 border-b border-slate-800 w-10"></th>
                <th className="p-3 border-b border-slate-800">domain_name</th>
                <th className="p-3 border-b border-slate-800">hostname</th>
                <th className="p-3 border-b border-slate-800">ip_address</th>
                <th className="p-3 border-b border-slate-800 text-right">country_name</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {filteredTraffic.map((req, idx) => (
                <tr key={idx} className="hover:bg-slate-900/50 transition-colors text-sm">
                  <td className="p-3 text-center">
                      <div className={`w-1.5 h-1.5 rounded-full ${req.is_third_party ? 'bg-amber-500' : 'bg-emerald-500'}`}></div>
                  </td>
                  <td className="p-3 font-medium text-slate-200">
                    {req.domain}
                  </td>
                  <td className="p-3 text-slate-400 font-mono text-xs">
                    {req.hostname}
                  </td>
                  <td className="p-3 text-slate-400 font-mono text-xs">
                    {req.destination_ip}
                  </td>
                  <td className="p-3 text-right">
                     <span className="inline-flex items-center text-slate-300">
                        {req.destination_country === 'US' && <span className="mr-2">🇺🇸</span>}
                        {req.destination_country === 'RU' && <span className="mr-2">🇷🇺</span>}
                        {req.destination_country === 'CN' && <span className="mr-2">🇨🇳</span>}
                        {req.destination_country === 'DE' && <span className="mr-2">🇩🇪</span>}
                        {req.destination_country}
                     </span>
                  </td>
                </tr>
              ))}
              {filteredTraffic.length === 0 && (
                 <tr>
                    <td colSpan={5} className="p-12 text-center text-slate-500">
                        Select a sentinel on the left to view tracking data.
                    </td>
                 </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};