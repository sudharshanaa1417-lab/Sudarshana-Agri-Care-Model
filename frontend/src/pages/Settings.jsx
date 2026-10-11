import React from 'react';
import { Settings as SettingsIcon, Cpu, Key, Database, ShieldCheck } from 'lucide-react';

export default function Settings() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">System Settings & IoT Hardware Setup</h1>
          <p className="text-sm text-slate-500 mt-1">Configure ESP32 WebSocket / HTTP endpoints and AI environment keys.</p>
        </div>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 rounded-2xl border border-slate-200 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-emerald-600" />
            ESP32 Ingestion Endpoints
          </h3>
          <div className="space-y-3 text-xs">
            <div>
              <span className="text-slate-500 block">HTTP Ingestion URL:</span>
              <code className="bg-slate-100 p-2 rounded block font-mono text-slate-800 mt-1">
                POST http://127.0.0.1:8000/api/v1/sensors/ingest
              </code>
            </div>
            <div>
              <span className="text-slate-500 block">WebSocket Live Stream URL:</span>
              <code className="bg-slate-100 p-2 rounded block font-mono text-slate-800 mt-1">
                ws://127.0.0.1:8000/ws/sensors
              </code>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-200 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Key className="w-4 h-4 text-cyan-600" />
            AI API Key Security
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            API keys are securely held on the FastAPI backend in server environment variables (<code className="font-mono">GEMINI_API_KEY</code> / <code className="font-mono">ANTIGRAVITY_API_KEY</code>). Frontend JavaScript strictly NEVER exposes raw API credentials.
          </p>
        </div>
      </div>
    </div>
  );
}
