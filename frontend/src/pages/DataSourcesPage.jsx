import React from 'react';
import { ShieldCheck, Database, CheckCircle2 } from 'lucide-react';
import DataSourceBadge from '../components/common/DataSourceBadge';

export default function DataSourcesPage({ sources }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Data Source Audit & Provenance Log</h1>
          <p className="text-sm text-slate-500 mt-1">Section 21 Data Source Management — Zero synthetic dummy data policy compliance.</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-xl border border-emerald-200 text-xs font-bold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Strict Audit Enforced</span>
        </div>
      </div>

      {/* Sources Audit Table */}
      <div className="glass-card rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/80 text-slate-700 uppercase font-semibold">
              <tr>
                <th className="py-3 px-4">Metric Name</th>
                <th className="py-3 px-4">Source Classification</th>
                <th className="py-3 px-4">Source Provider / Sensor Name</th>
                <th className="py-3 px-4">Unit</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Confidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {sources.map((src, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60 transition-all">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{src.metric_name}</td>
                  <td className="py-3.5 px-4">
                    <DataSourceBadge type={src.source_type} />
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-medium">{src.source_name}</td>
                  <td className="py-3.5 px-4 font-mono">{src.unit || 'N/A'}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded font-bold text-[11px] ${
                      src.status === 'VALID' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {src.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-bold text-slate-900">
                    {(src.confidence_score * 100).toFixed(0)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
