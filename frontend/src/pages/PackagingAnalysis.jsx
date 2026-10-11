import React from 'react';
import { Binary, CheckCircle2, AlertTriangle, ShieldCheck, ArrowRight } from 'lucide-react';
import DataSourceBadge from '../components/common/DataSourceBadge';

export default function PackagingAnalysis({ analysisData, sample, onRunAnalysis, loading }) {
  const ruleRes = analysisData?.rule_analysis || {};
  const rulesTriggered = ruleRes.rules_triggered || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Deterministic Packaging Rule Engine</h1>
          <p className="text-sm text-slate-500 mt-1">Calculated barrier thresholds, oxygen & water vapor permeability rules, and mechanical targets.</p>
        </div>
        <button
          onClick={onRunAnalysis}
          disabled={loading || !sample}
          className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold px-5 py-2.5 rounded-xl text-sm flex items-center gap-2 shadow-md shadow-emerald-600/20 transition-all"
        >
          {loading ? 'Evaluating Rules...' : 'Run Packaging Analysis'}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Target Requirements Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6 rounded-2xl border border-slate-200 space-y-2 border-l-4 border-l-emerald-500">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
            <span>Target WVTR (Water Vapor)</span>
            <DataSourceBadge type="CALCULATED" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">{ruleRes.target_wvtr || 'Run Analysis'}</h3>
          <p className="text-xs text-slate-500">Maximum allowed moisture transmission</p>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-200 space-y-2 border-l-4 border-l-cyan-500">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
            <span>Target OTR (Oxygen)</span>
            <DataSourceBadge type="CALCULATED" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">{ruleRes.target_otr || 'Run Analysis'}</h3>
          <p className="text-xs text-slate-500">Maximum allowed oxygen gas ingress</p>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-200 space-y-2 border-l-4 border-l-amber-500">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
            <span>Film Thickness Range</span>
            <DataSourceBadge type="CALCULATED" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">{ruleRes.recommended_thickness_range || 'Run Analysis'}</h3>
          <p className="text-xs text-slate-500">Target polymer film gauge</p>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-200 space-y-2 border-l-4 border-l-purple-500">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
            <span>MAP Suitability</span>
            <DataSourceBadge type="CALCULATED" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">{ruleRes.map_suitability ? 'Suitable (MAP Advised)' : 'Ambient / Vacuum'}</h3>
          <p className="text-xs text-slate-500">{ruleRes.recommended_gas_strategy || 'Gas flushing evaluation'}</p>
        </div>
      </div>

      {/* Triggered Scientific Rules Section */}
      <div className="glass-card p-6 rounded-2xl border border-slate-200 space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Binary className="w-5 h-5 text-emerald-600" />
          Triggered Deterministic Rules Matrix ({rulesTriggered.length})
        </h3>

        {rulesTriggered.length > 0 ? (
          <div className="space-y-3">
            {rulesTriggered.map((rule, idx) => (
              <div key={idx} className="bg-emerald-50/60 border border-emerald-200/80 p-4 rounded-xl flex items-start gap-3 text-xs text-emerald-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="font-semibold leading-relaxed">{rule}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-500 italic">No rules executed yet. Click "Run Packaging Analysis" to evaluate the active sample.</p>
        )}
      </div>
    </div>
  );
}
