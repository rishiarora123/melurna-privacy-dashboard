import React, { useState } from 'react';
import { Settings as SettingsIcon, Bell, Shield, Key, Lock, Save, Plus } from 'lucide-react';

export const Settings: React.FC = () => {
  const [activeSection, setActiveSection] = useState('compliance');
  const [threshold, setThreshold] = useState(700);

  const sections = [
    { id: 'compliance', label: 'Compliance Rules', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'api', label: 'API Management', icon: Key },
    { id: 'security', label: 'Account Security', icon: Lock },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-[600px] animate-in fade-in duration-500">
      {/* Settings Sidebar */}
      <div className="lg:w-64 flex-shrink-0">
        <h2 className="text-xl font-bold text-white mb-6 pl-2">Settings</h2>
        <nav className="space-y-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeSection === section.id 
                  ? 'bg-slate-800 text-cyan-400 shadow-sm border border-slate-700' 
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
              }`}
            >
              <section.icon size={18} />
              <span>{section.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Settings Content */}
      <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-8 overflow-y-auto relative">
        
        {activeSection === 'compliance' && (
          <div className="space-y-8">
            <div>
                <h3 className="text-lg font-medium text-white mb-1">Risk Threshold Configuration</h3>
                <p className="text-slate-400 text-sm mb-6">Define global parameters for what constitutes a critical threat.</p>
                
                <div className="bg-slate-950 p-6 rounded-lg border border-slate-800">
                    <div className="flex justify-between mb-2">
                        <label className="text-sm font-medium text-slate-300">Global Risk Score Threshold</label>
                        <span className="text-sm font-mono text-cyan-400">{threshold} / 1000</span>
                    </div>
                    <input 
                        type="range" 
                        min="0" 
                        max="1000" 
                        value={threshold} 
                        onChange={(e) => setThreshold(parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                    />
                    <div className="mt-4 text-xs text-slate-500 flex justify-between">
                        <span>Permissive (&lt; 500)</span>
                        <span>Strict (&gt; 800)</span>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-slate-800">
                    <div>
                        <div className="text-slate-200 text-sm font-medium">Auto-block Third Parties</div>
                        <div className="text-slate-500 text-xs">Automatically block outgoing traffic to vendors with risk score &lt; 300.</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                    </label>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-slate-800">
                    <div>
                        <div className="text-slate-200 text-sm font-medium">PII Detection Aggressiveness</div>
                        <div className="text-slate-500 text-xs">Enable heuristic analysis for non-standard PII formats.</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                    </label>
                </div>
            </div>
          </div>
        )}

        {activeSection === 'api' && (
            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-medium text-white mb-1">API Access</h3>
                    <p className="text-slate-400 text-sm mb-6">Manage keys for accessing Melurna reporting endpoints programmatically.</p>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 flex items-center justify-between group">
                    <div>
                        <div className="text-white font-medium text-sm">Production Reporting Key</div>
                        <div className="text-slate-500 text-xs font-mono mt-1">pk_live_****************923a</div>
                    </div>
                    <div className="flex space-x-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                        <button className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium rounded transition-colors">Roll Key</button>
                        <button className="px-3 py-1.5 bg-red-900/20 hover:bg-red-900/40 text-red-400 border border-red-900/30 text-xs font-medium rounded transition-colors">Revoke</button>
                    </div>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 flex items-center justify-between opacity-60">
                    <div>
                        <div className="text-white font-medium text-sm">Staging Key</div>
                        <div className="text-slate-500 text-xs font-mono mt-1">pk_test_****************881b</div>
                    </div>
                    <div className="text-xs text-amber-500 border border-amber-900/50 bg-amber-900/20 px-2 py-1 rounded">Expiring</div>
                </div>

                <button className="w-full py-3 border-2 border-dashed border-slate-700 rounded-lg text-slate-400 hover:text-white hover:border-slate-500 flex items-center justify-center transition-all">
                     <Plus className="w-4 h-4 mr-2" /> Generate New API Key
                 </button>
            </div>
        )}

        {activeSection === 'notifications' && (
             <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-medium text-white mb-1">Alert Channels</h3>
                    <p className="text-slate-400 text-sm mb-6">Where should Melurna send critical vulnerability alerts?</p>
                </div>

                <div className="space-y-4">
                    {['Email Digest (Daily)', 'Slack Integration (#sec-ops)', 'PagerDuty (Critical Only)'].map((label, idx) => (
                        <div key={idx} className="flex items-center justify-between py-3 border-b border-slate-800 last:border-0">
                            <span className="text-slate-200 text-sm font-medium">{label}</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked={idx !== 0} />
                                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {activeSection === 'security' && (
            <div className="flex items-center justify-center h-64 text-slate-500 flex-col">
                <Lock size={48} className="mb-4 opacity-50" />
                <p>SSO is managed by your organization's Identity Provider.</p>
            </div>
        )}

        <div className="absolute bottom-8 right-8">
            <button className="flex items-center px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-full text-sm font-bold shadow-lg shadow-cyan-900/40 transition-all hover:scale-105">
                <Save size={18} className="mr-2" /> Save Changes
            </button>
        </div>
      </div>
    </div>
  );
};