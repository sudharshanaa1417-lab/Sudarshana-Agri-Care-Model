import React from 'react';
import { Cpu, Server, Database as DbIcon, UserCircle, WifiOff, Wifi } from 'lucide-react';

export default function Topbar({ esp32Connected = false, activeSampleName = "No Sample Active" }) {
  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30 shadow-sm">
      {/* Active Sample Indicator */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Sample:</span>
        <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          {activeSampleName}
        </span>
      </div>

      {/* Live System & Device Status Badges */}
      <div className="flex items-center gap-4 text-xs font-semibold">
        {/* ESP32 Hardware Status */}
        {esp32Connected ? (
          <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-md">
            <Wifi className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
            <span>ESP32: CONNECTED</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 bg-rose-50 text-rose-700 border border-rose-200 px-3 py-1 rounded-md">
            <WifiOff className="w-3.5 h-3.5 text-rose-600" />
            <span>ESP32 NOT CONNECTED – CONNECT DEVICE TO START LIVE ANALYSIS</span>
          </div>
        )}

        {/* API Backend Status */}
        <div className="hidden md:flex items-center gap-1.5 bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-1 rounded-md">
          <Server className="w-3.5 h-3.5 text-slate-500" />
          <span>API: ONLINE</span>
        </div>

        {/* Database Status */}
        <div className="hidden lg:flex items-center gap-1.5 bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-1 rounded-md">
          <DbIcon className="w-3.5 h-3.5 text-slate-500" />
          <span>DB: READY</span>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200 text-slate-700">
          <UserCircle className="w-5 h-5 text-slate-500" />
          <span className="hidden sm:inline font-medium">Packaging Specialist</span>
        </div>
      </div>
    </header>
  );
}
