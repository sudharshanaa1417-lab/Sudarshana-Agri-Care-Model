import React from 'react';
import { Activity, UserCheck, Globe, Cpu, Database, Sparkles } from 'lucide-react';

export default function DataSourceBadge({ type = "USER INPUT" }) {
  const normalized = (type || "").toUpperCase();

  if (normalized.includes("LIVE SENSOR") || normalized.includes("LIVE")) {
    return (
      <span class="badge-live-sensor">
        <Activity className="w-3 h-3 text-emerald-600 animate-pulse" />
        LIVE SENSOR DATA
      </span>
    );
  }

  if (normalized.includes("USER")) {
    return (
      <span class="badge-user-input">
        <UserCheck className="w-3 h-3 text-blue-600" />
        USER INPUT
      </span>
    );
  }

  if (normalized.includes("API")) {
    return (
      <span class="badge-api-data">
        <Globe className="w-3 h-3 text-purple-600" />
        API DATA
      </span>
    );
  }

  if (normalized.includes("CALCULATED")) {
    return (
      <span class="badge-calculated">
        <Cpu className="w-3 h-3 text-amber-600" />
        CALCULATED
      </span>
    );
  }

  if (normalized.includes("AI")) {
    return (
      <span class="badge-ai">
        <Sparkles className="w-3 h-3 text-teal-600" />
        AI RECOMMENDATION
      </span>
    );
  }

  return (
    <span class="badge-database">
      <Database className="w-3 h-3 text-slate-600" />
      DATABASE
    </span>
  );
}
