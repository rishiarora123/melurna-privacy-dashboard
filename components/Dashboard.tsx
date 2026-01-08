import React, { useState } from 'react';
import { MelurnaData } from '../types';
import { RiskAssessment } from './RiskAssessment';
import { JourneyDiscovery } from './JourneyDiscovery';
import { VendorDiscovery } from './VendorDiscovery';
import { ThirdPartyAnalysis } from './ThirdPartyAnalysis';
import { CategoryStats } from './CategoryStats';
import { Overview } from './Overview';
import { Upload } from 'lucide-react';

interface DashboardProps {
  data: MelurnaData;
}

type TabType = 'Overview' | 'Risk Assessment' | 'Vendor Discovery' | 'Third-Party Analysis' | 'Category Stats' | 'Journey Discovery';

export const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<TabType>('Overview');
  const tabs: TabType[] = ['Overview', 'Risk Assessment', 'Vendor Discovery', 'Third-Party Analysis', 'Category Stats', 'Journey Discovery'];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header with Title and Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-2xl font-bold text-white tracking-tight flex items-center">
             Data Dashboard <span className="ml-3 text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded border border-slate-700">Published</span>
           </h1>
        </div>
        
        <div className="flex space-x-3">
             <button className="flex items-center px-4 py-2 text-cyan-500 hover:text-cyan-400 text-sm font-medium transition-colors">
                EDIT DASHBOARD
             </button>
        </div>
      </div>

      {/* Main Tab Navigation */}
      <div className="border-b border-slate-800 overflow-x-auto">
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab 
                  ? 'text-cyan-400 border-b-2 border-cyan-400' 
                  : 'text-slate-400 hover:text-slate-200 border-b-2 border-transparent'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="min-h-[600px] animate-in fade-in duration-300">
        {activeTab === 'Overview' && <Overview stats={data.summary.overview} />}
        {activeTab === 'Risk Assessment' && <RiskAssessment scores={data.summary.scores} />}
        {activeTab === 'Vendor Discovery' && <VendorDiscovery vendors={data.summary.vendors} />}
        {activeTab === 'Third-Party Analysis' && <ThirdPartyAnalysis vendors={data.summary.vendors} />}
        {activeTab === 'Category Stats' && <CategoryStats categories={data.summary.categories} />}
        {activeTab === 'Journey Discovery' && <JourneyDiscovery sentinels={data.sentinels} trafficLog={data.traffic_log} />}
      </div>
    </div>
  );
};