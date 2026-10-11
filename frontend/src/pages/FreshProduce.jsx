import React from 'react';
import { Apple, Wind, Droplets, AlertOctagon, CheckCircle2, ShieldAlert } from 'lucide-react';
import DataSourceBadge from '../components/common/DataSourceBadge';

export default function FreshProduce({ sample, sensorData, analysisData }) {
  const readings = sensorData?.readings || {};
  const ruleRes = analysisData?.rule_analysis || {};
  const isFresh = sample?.category === 'Fresh Produce' || ruleRes.is_fresh_produce;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Apple className="w-5 h-5 text-emerald-600" />
            <h1 className="text-2xl font-bold text-slate-900">Fresh Produce Packaging Module</h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">Respiratory dynamics, micro-perforated film equilibrium, and condensation risk prevention.</p>
        </div>
        <span className={`px-3 py-1.5 rounded-full text-xs font-bold border ${isFresh ? 'bg-emerald-50 text-emerald-800 border-emerald-300' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
          {isFresh ? 'Fresh Produce Active' : 'Processed Commodity'}
        </span>
      </div>

      {/* Respirational Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-xl space-y-2 border-l-4 border-l-emerald-500">
          <span className="text-xs font-semibold text-slate-500">Respiration Rate</span>
          <h3 className="text-lg font-bold text-slate-900">{sample?.respiration_rate ? `${sample.respiration_rate} mg CO₂/kg·h` : '10.0 mg CO₂/kg·h'}</h3>
          <p className="text-xs text-slate-500">Metabolic activity level</p>
        </div>

        <div className="glass-card p-5 rounded-xl space-y-2 border-l-4 border-l-cyan-500">
          <span className="text-xs font-semibold text-slate-500">Ventilation Strategy</span>
          <h3 className="text-base font-bold text-slate-900">{ruleRes.ventilation_strategy || 'Micro-perforated BOPP'}</h3>
          <p className="text-xs text-slate-500">Gas exchange mechanism</p>
        </div>

        <div className="glass-card p-5 rounded-xl space-y-2 border-l-4 border-l-amber-500">
          <span className="text-xs font-semibold text-slate-500">Risk of Anaerobiosis</span>
          <h3 className="text-base font-bold text-slate-900">{ruleRes.anaerobic_risk || 'LOW'}</h3>
          <p className="text-xs text-slate-500">Off-odor & fermentation risk</p>
        </div>

        <div className="glass-card p-5 rounded-xl space-y-2 border-l-4 border-l-blue-500">
          <span className="text-xs font-semibold text-slate-500">Condensation Risk</span>
          <h3 className="text-base font-bold text-slate-900">{ruleRes.condensation_risk || 'LOW'}</h3>
          <p className="text-xs text-slate-500">Transpiration moisture accumulation</p>
        </div>
      </div>

      {/* Equilibrium Modified Atmosphere Packaging (EMAP) Analysis */}
      <div className="glass-card p-6 rounded-2xl border border-slate-200 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Wind className="w-4 h-4 text-emerald-600" />
          Equilibrium Modified Atmosphere Packaging (EMAP) Target Gas Strategy
        </h3>
        <p className="text-xs text-slate-700 bg-emerald-50/60 p-4 rounded-xl border border-emerald-200 leading-relaxed">
          {ruleRes.recommended_gas_strategy || 'High Respiration EMAP: 3-5% O₂, 5-10% CO₂, Balance N₂. Micro-perforated BOPP/PE recommended to maintain respiration equilibrium without inducing anaerobic fermentation.'}
        </p>
      </div>
    </div>
  );
}
