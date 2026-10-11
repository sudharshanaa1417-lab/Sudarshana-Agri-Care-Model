import React from 'react';
import { Building2, ExternalLink, BookOpen, ShieldCheck } from 'lucide-react';

export default function GovernmentResources({ resources }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Food Processing & Packaging — Govt & Ministry Context</h1>
          <p className="text-sm text-slate-500 mt-1">Section 19 Reference Hub for MoFPI, FSSAI, BIS, ICAR, and FAO standards.</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-xl border border-emerald-200 text-xs font-bold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Authoritative Guidelines</span>
        </div>
      </div>

      {/* Resource Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((res) => (
          <div key={res.id} className="glass-card p-6 rounded-2xl border border-slate-200 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded text-xs uppercase tracking-wider">
                  {res.organization}
                </span>
                <span className="text-xs text-slate-400 font-mono">{res.publication_date}</span>
              </div>
              <h3 className="text-base font-bold text-slate-900">{res.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{res.summary}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
              <span className="text-slate-500 font-semibold">{res.category}</span>
              {res.url && (
                <a
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 hover:text-emerald-700 font-bold flex items-center gap-1"
                >
                  Official Portal
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
