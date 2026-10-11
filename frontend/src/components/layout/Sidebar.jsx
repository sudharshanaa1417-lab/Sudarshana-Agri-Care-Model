import React from 'react';
import {
  LayoutDashboard,
  Package,
  Activity,
  Cpu,
  Binary,
  Sparkles,
  Apple,
  LineChart,
  Clock,
  Leaf,
  DollarSign,
  Database,
  FileText,
  ShieldCheck,
  Building2,
  Settings
} from 'lucide-react';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'samples', label: 'Food Samples', icon: Package },
  { id: 'sensors', label: 'Live Sensors', icon: Activity },
  { id: 'hardware', label: 'Sensor Hardware', icon: Cpu },
  { id: 'analysis', label: 'Packaging Analysis', icon: Binary },
  { id: 'recommendation', label: 'AI Recommendation', icon: Sparkles },
  { id: 'fresh-produce', label: 'Fresh Produce', icon: Apple },
  { id: 'realtime-charts', label: 'Real-Time Analysis', icon: LineChart },
  { id: 'shelf-life', label: 'Shelf Life', icon: Clock },
  { id: 'sustainability', label: 'Sustainability', icon: Leaf },
  { id: 'cost', label: 'Cost Analysis', icon: DollarSign },
  { id: 'database', label: 'Packaging Database', icon: Database },
  { id: 'reports', label: 'Reports', icon: FileText },
  { id: 'data-sources', label: 'Data Sources', icon: ShieldCheck },
  { id: 'government', label: 'Govt & Ministry', icon: Building2 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ activeTab, setActiveTab }) {
  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-screen flex flex-col border-r border-slate-800 shadow-xl">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
          <Package className="w-6 h-6" />
        </div>
        <div>
          <h1 className="font-bold text-lg text-white tracking-wide leading-none">PackSense AI</h1>
          <p className="text-xs text-emerald-400 mt-1 font-medium">Packaging Intelligence</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-md shadow-emerald-600/30'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer System Version */}
      <div className="p-4 border-t border-slate-800 text-xs text-slate-500 text-center">
        PackSense AI Platform v1.0.4<br />
        <span className="text-slate-600">IoT + AI Rule Decision System</span>
      </div>
    </aside>
  );
}
