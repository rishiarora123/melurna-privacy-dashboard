import React from 'react';
import { Scores } from '../types';
import { TrendingDown, TrendingUp, AlertTriangle, ShieldCheck, Activity } from 'lucide-react';

interface RiskScoreCardsProps {
  scores: Scores;
}

const ScoreCard = ({ title, score, icon: Icon, color }: { title: string, score: number, icon: any, color: string }) => {
  // Calculate stroke dasharray for the circle
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const progress = score / 1000;
  const dashoffset = circumference * (1 - progress);
  
  // Determine color class
  let colorClass = "text-cyan-500";
  let bgClass = "bg-cyan-500/10";
  
  if (score < 500) {
    colorClass = "text-red-500";
    bgClass = "bg-red-500/10";
  } else if (score < 800) {
    colorClass = "text-amber-500";
    bgClass = "bg-amber-500/10";
  } else {
    colorClass = "text-emerald-500";
    bgClass = "bg-emerald-500/10";
  }

  // Override if specific color passed (optional, strictly following requirement logic usually better)
  
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between relative overflow-hidden group hover:border-slate-700 transition-all">
      <div className={`absolute top-0 right-0 p-24 bg-gradient-to-br ${bgClass} opacity-5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:opacity-10 transition-opacity`}></div>
      
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider">{title}</h3>
          <div className="flex items-center mt-1 space-x-2">
            {score < 500 ? <TrendingDown size={16} className="text-red-500" /> : <TrendingUp size={16} className="text-emerald-500" />}
            <span className="text-xs text-slate-500">
               {score < 500 ? 'Critical Risk' : 'Acceptable'}
            </span>
          </div>
        </div>
        <div className={`p-2 rounded-lg ${bgClass}`}>
          <Icon size={20} className={colorClass} />
        </div>
      </div>

      <div className="flex items-end justify-between">
        <div className="text-3xl font-bold font-mono text-white">
          {score}<span className="text-slate-600 text-lg">/1000</span>
        </div>
        
        {/* Radial Progress Mini */}
        <div className="relative w-12 h-12">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 70 70">
                <circle cx="35" cy="35" r="30" fill="none" stroke="#1e293b" strokeWidth="6" />
                <circle 
                    cx="35" cy="35" r="30" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="6" 
                    strokeDasharray={circumference} 
                    strokeDashoffset={dashoffset}
                    strokeLinecap="round"
                    className={`${colorClass} transition-all duration-1000 ease-out`}
                />
            </svg>
        </div>
      </div>
    </div>
  );
};

export const RiskScoreCards: React.FC<RiskScoreCardsProps> = ({ scores }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      <ScoreCard 
        title="Geo Risk" 
        score={scores.geo_risk} 
        icon={Activity} 
        color="cyan"
      />
      <ScoreCard 
        title="Data Security" 
        score={scores.security} 
        icon={ShieldCheck} 
        color="indigo"
      />
      <ScoreCard 
        title="Compliance" 
        score={scores.compliance} 
        icon={AlertTriangle} 
        color="amber"
      />
      <ScoreCard 
        title="Availability" 
        score={scores.availability} 
        icon={Activity} 
        color="emerald"
      />
      <ScoreCard 
        title="Vendor Disc." 
        score={scores.vendor} 
        icon={ShieldCheck} 
        color="rose"
      />
    </div>
  );
};
