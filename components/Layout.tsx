import React from 'react';
import { 
  ShieldAlert, 
  LayoutDashboard, 
  BarChart3, 
  Database, 
  Settings, 
  Bell,
  Search,
  User,
  Menu
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col fixed h-full z-20 md:relative hidden md:flex">
        <div className="p-6 flex items-center space-x-3 border-b border-slate-800">
          <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
            <ShieldAlert className="w-6 h-6 text-cyan-500" />
          </div>
          <span className="text-xl font-bold tracking-tight">MELURNA</span>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">Analysis</div>
          
          <NavItem 
            icon={<LayoutDashboard />} 
            label="Dashboards" 
            isActive={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')} 
          />
          <NavItem 
            icon={<BarChart3 />} 
            label="Risk Charts" 
            isActive={activeTab === 'charts'} 
            onClick={() => setActiveTab('charts')} 
          />
          <NavItem 
            icon={<Database />} 
            label="Datasets" 
            isActive={activeTab === 'datasets'} 
            onClick={() => setActiveTab('datasets')} 
          />
          
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-8 mb-4 px-2">Configuration</div>
          
          <NavItem 
            icon={<Settings />} 
            label="Settings" 
            isActive={activeTab === 'settings'} 
            onClick={() => setActiveTab('settings')} 
          />
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center space-x-3 px-2 py-2 rounded-md hover:bg-slate-800 cursor-pointer transition-colors">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center border border-slate-600">
              <User size={16} className="text-slate-300" />
            </div>
            <div className="text-sm">
              <div className="font-medium">SecOps Admin</div>
              <div className="text-xs text-slate-500">admin@melurna.com</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header */}
        <header className="h-16 bg-slate-900/50 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="flex items-center">
             <button className="md:hidden mr-4 text-slate-400 hover:text-white">
                <Menu />
             </button>
            <div className="flex items-center text-sm text-slate-400">
              <span className="hover:text-slate-200 cursor-pointer">Dashboards</span>
              <span className="mx-2">/</span>
              <span className="text-cyan-400 font-medium">Privacy Dashboard POC</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search logs..." 
                className="bg-slate-950 border border-slate-800 rounded-full py-1.5 pl-9 pr-4 text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all w-64"
              />
            </div>
            <button className="p-2 text-slate-400 hover:text-white relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-slate-900"></span>
            </button>
          </div>
        </header>

        {/* Content Body */}
        <div className="flex-1 overflow-auto p-6 scroll-smooth">
          {children}
        </div>
      </main>
    </div>
  );
};

const NavItem = ({ icon, label, isActive, onClick }: { icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-3 w-full px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200 ${
      isActive 
        ? 'bg-cyan-500/10 text-cyan-400 border-r-2 border-cyan-400' 
        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
    }`}
  >
    {React.cloneElement(icon as React.ReactElement<any>, { size: 18 })}
    <span>{label}</span>
  </button>
);