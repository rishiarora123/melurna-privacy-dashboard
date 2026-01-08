import React, { useState } from 'react';
import { Database, RefreshCw, Trash2, Plus, FileJson, Server, Globe, HardDrive, ArrowUpRight } from 'lucide-react';

export const Datasets: React.FC = () => {
  const [activeTab, setActiveTab] = useState('sources');

  const sources = [
    { id: 1, name: 'AWS CloudTrail Production', type: 'AWS S3', status: 'Active', size: '1.2 TB', lastSync: '2 mins ago', icon: Server },
    { id: 2, name: 'Nginx Access Logs (Load Balancer)', type: 'Log Stream', status: 'Active', size: '450 GB', lastSync: '30 sec ago', icon: FileJson },
    { id: 3, name: 'Salesforce API Export', type: 'API Integration', status: 'Error', size: '120 MB', lastSync: '4 hrs ago', icon: Database },
    { id: 4, name: 'Historical PCAP 2023', type: 'Cold Storage', status: 'Archived', size: '4.5 TB', lastSync: 'N/A', icon: HardDrive },
  ];

  const assets = [
    { id: 1, domain: 'melurna.io', type: 'Primary Domain', location: 'US-East', risk: 'Low' },
    { id: 2, domain: 'api.melurna.io', type: 'API Gateway', location: 'US-East', risk: 'Medium' },
    { id: 3, domain: 'legacy-portal.melurna.com', type: 'Legacy App', location: 'EU-West', risk: 'High' },
    { id: 4, domain: 'shop.melurna.com', type: 'E-commerce', location: 'US-West', risk: 'Low' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
           <h2 className="text-2xl font-bold text-white">Data & Assets</h2>
           <p className="text-slate-400 text-sm">Manage data ingestion pipelines and monitored properties.</p>
        </div>
        <div className="flex space-x-3">
             <button className="flex items-center px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-cyan-900/20">
                <Plus size={16} className="mr-2" /> Connect Source
             </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-slate-900 p-1 rounded-lg w-fit border border-slate-800">
        <button 
            onClick={() => setActiveTab('sources')}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${activeTab === 'sources' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
        >
            Data Sources
        </button>
        <button 
            onClick={() => setActiveTab('assets')}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${activeTab === 'assets' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
        >
            Asset Inventory
        </button>
      </div>

      {activeTab === 'sources' && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
            <div className="grid grid-cols-1 divide-y divide-slate-800">
                <div className="bg-slate-950/50 p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider grid grid-cols-12 gap-4">
                    <div className="col-span-5">Source Name</div>
                    <div className="col-span-2">Type</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-2">Size / Sync</div>
                    <div className="col-span-1 text-right">Actions</div>
                </div>

                {sources.map((source) => (
                    <div key={source.id} className="p-4 grid grid-cols-12 gap-4 items-center hover:bg-slate-800/30 transition-colors group">
                        <div className="col-span-5 flex items-center space-x-3">
                            <div className="p-2 bg-slate-800 rounded-lg border border-slate-700 text-cyan-500">
                                <source.icon size={18} />
                            </div>
                            <div>
                                <div className="font-medium text-white">{source.name}</div>
                                <div className="text-xs text-slate-500 font-mono">{source.id === 1 ? 's3://melurna-logs-prod' : 'tcp://10.0.0.5:9000'}</div>
                            </div>
                        </div>
                        <div className="col-span-2">
                            <span className="text-sm text-slate-400 bg-slate-950 border border-slate-800 px-2 py-1 rounded">{source.type}</span>
                        </div>
                        <div className="col-span-2">
                            <div className="flex items-center space-x-2">
                                <div className={`w-2 h-2 rounded-full ${source.status === 'Active' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : source.status === 'Error' ? 'bg-red-500' : 'bg-slate-500'}`}></div>
                                <span className={`text-sm ${source.status === 'Active' ? 'text-emerald-400' : source.status === 'Error' ? 'text-red-400' : 'text-slate-400'}`}>{source.status}</span>
                            </div>
                        </div>
                        <div className="col-span-2 text-sm text-slate-400">
                            <div>{source.size}</div>
                            <div className="text-xs text-slate-600">Last: {source.lastSync}</div>
                        </div>
                        <div className="col-span-1 flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-1.5 hover:bg-slate-700 rounded text-slate-400 hover:text-white" title="Sync Now">
                                <RefreshCw size={14} />
                            </button>
                            <button className="p-1.5 hover:bg-red-900/30 rounded text-slate-400 hover:text-red-400" title="Delete">
                                <Trash2 size={14} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
          </div>
      )}

      {activeTab === 'assets' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {assets.map((asset) => (
                  <div key={asset.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-cyan-500/30 transition-all cursor-pointer group relative overflow-hidden">
                      <div className="flex justify-between items-start mb-4 relative z-10">
                          <div className="p-2 bg-slate-950 rounded-lg border border-slate-800 group-hover:border-cyan-500/30 transition-colors">
                              <Globe size={20} className="text-slate-400 group-hover:text-cyan-400" />
                          </div>
                          <span className={`px-2 py-1 rounded text-xs font-bold border ${
                              asset.risk === 'High' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 
                              asset.risk === 'Medium' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 
                              'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                          }`}>
                              {asset.risk} Risk
                          </span>
                      </div>
                      
                      <h3 className="text-white font-medium mb-1 relative z-10">{asset.domain}</h3>
                      <p className="text-sm text-slate-500 mb-4 relative z-10">{asset.type}</p>
                      
                      <div className="flex items-center text-xs text-slate-500 font-mono border-t border-slate-800 pt-3 relative z-10">
                          <span className="mr-auto">Region: {asset.location}</span>
                          <span className="text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
                              Details <ArrowUpRight size={12} className="ml-1" />
                          </span>
                      </div>

                      {/* Hover Gradient Background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
              ))}
              
              {/* Add New Asset Card */}
              <div className="border border-dashed border-slate-700 rounded-xl p-5 flex flex-col items-center justify-center text-slate-500 hover:text-slate-300 hover:border-slate-500 hover:bg-slate-900/50 transition-all cursor-pointer min-h-[160px]">
                  <Plus size={32} className="mb-3 opacity-50" />
                  <span className="text-sm font-medium">Add Monitored Asset</span>
              </div>
          </div>
      )}
    </div>
  );
};