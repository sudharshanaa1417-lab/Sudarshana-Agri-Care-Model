import React from 'react';
import { Sparkles, CheckCircle2, AlertTriangle, Leaf, DollarSign, ShieldAlert, FileCheck } from 'lucide-react';
import DataSourceBadge from '../components/common/DataSourceBadge';

export default function AiRecommendation({ analysisData }) {
  const ai = analysisData?.ai_recommendation || {};
  const advantages = ai.expected_advantages || [];
  const limitations = ai.potential_limitations || [];
  const alternatives = ai.alternatives || [];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white p-8 rounded-2xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border border-slate-700">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">PackSense AI Recommendation Engine</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">{ai.recommended_material_name || 'PET / Al-Foil / LDPE Triplex Laminate'}</h1>
          <p className="text-xs text-slate-300 font-mono">{ai.recommended_structure || 'PET 12µm / Al-Foil 7µm / LDPE 50µm'}</p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <DataSourceBadge type="AI RECOMMENDATION" />
          <span className="text-xs text-slate-400">{ai.ai_status || 'AI RECOMMENDATION (Gemini 1.5 Powered)'}</span>
        </div>
      </div>

      {/* Target Specs Summary Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-4 rounded-xl space-y-1">
          <span className="text-xs text-slate-500 font-semibold">Film Gauge / Thickness</span>
          <p className="text-base font-bold text-slate-900">{ai.recommended_thickness_um || '50 - 90 µm'}</p>
        </div>
        <div className="glass-card p-4 rounded-xl space-y-1">
          <span className="text-xs text-slate-500 font-semibold">Oxygen Barrier (OTR)</span>
          <p className="text-base font-bold text-slate-900">{ai.required_otr || '< 10 cc/m²·day'}</p>
        </div>
        <div className="glass-card p-4 rounded-xl space-y-1">
          <span className="text-xs text-slate-500 font-semibold">Moisture Barrier (WVTR)</span>
          <p className="text-base font-bold text-slate-900">{ai.required_wvtr || '< 1.5 g/m²·day'}</p>
        </div>
        <div className="glass-card p-4 rounded-xl space-y-1">
          <span className="text-xs text-slate-500 font-semibold">Sealability & Strength</span>
          <p className="text-base font-bold text-slate-900">{ai.sealability_requirement || 'Hermetic Heat Seal'}</p>
        </div>
      </div>

      {/* Why This Material? Explainable Rationale */}
      <div className="glass-card p-6 rounded-2xl border border-slate-200 space-y-3">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <FileCheck className="w-5 h-5 text-emerald-600" />
          WHY THIS MATERIAL? — Explainable AI Technical Rationale
        </h3>
        <p className="text-xs text-slate-700 leading-relaxed font-sans bg-slate-50/80 p-4 rounded-xl border border-slate-200">
          {ai.why_recommended || 'Rule engine evaluated food moisture sensitivity, fat oxidation risk, and required OTR/WVTR barrier thresholds.'}
        </p>
      </div>

      {/* Advantages vs Limitations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 rounded-2xl border border-slate-200 space-y-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Expected Advantages
          </h3>
          <ul className="space-y-2 text-xs text-slate-600">
            {advantages.map((adv, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0"></span>
                <span>{adv}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-200 space-y-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            Potential Limitations & Operational Considerations
          </h3>
          <ul className="space-y-2 text-xs text-slate-600">
            {limitations.map((lim, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0"></span>
                <span>{lim}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Alternative Materials & Trade-Offs Table */}
      <div className="glass-card p-6 rounded-2xl border border-slate-200 space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Alternative Packaging Structures & Trade-offs</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/70 text-slate-600 uppercase font-semibold">
              <tr>
                <th className="py-2.5 px-3">Alternative Material</th>
                <th className="py-2.5 px-3">Structure</th>
                <th className="py-2.5 px-3">Technical & Economic Trade-off</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {alternatives.map((alt, idx) => (
                <tr key={idx}>
                  <td className="py-3 px-3 font-bold text-slate-900">{alt.material_name}</td>
                  <td className="py-3 px-3 font-mono text-slate-600">{alt.structure}</td>
                  <td className="py-3 px-3">{alt.trade_off}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Validation Disclaimer Banner */}
      <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-xl flex items-center gap-3 text-xs font-semibold">
        <ShieldAlert className="w-5 h-5 text-rose-600 flex-shrink-0" />
        <span>VALIDATION REQUIRED: Recommendation requires laboratory/industry validation before commercial production use.</span>
      </div>
    </div>
  );
}
