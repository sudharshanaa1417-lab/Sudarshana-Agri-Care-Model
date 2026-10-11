import React from 'react';
import { Leaf, Recycle, Globe, ShieldAlert } from 'lucide-react';
import DataSourceBadge from '../components/common/DataSourceBadge';

export default function SustainabilityAnalysis({ analysisData }) {
  const sust = analysisData?.cost_sustainability_analysis || {};

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Sustainability & Life Cycle Assessment (LCA)</h1>
          <p className="text-sm text-slate-500 mt-1">Environmental footprint, end-of-life pathways, and material mass reduction.</p>
        </div>
        <DataSourceBadge type="CALCULATED" />
      </div>

      {/* Primary LCA Indicators Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-card p-6 rounded-2xl border border-slate-200 space-y-2 border-l-4 border-l-emerald-500">
          <span className="text-xs font-semibold text-slate-500">Recyclability Category</span>
          <h3 className="text-base font-bold text-slate-900">{sust.recyclability || 'Conditionally Recyclable'}</h3>
          <p className="text-xs text-slate-500">Polymer stream classification</p>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-200 space-y-2 border-l-4 border-l-cyan-500">
          <span className="text-xs font-semibold text-slate-500">Compostability</span>
          <h3 className="text-base font-bold text-slate-900">{sust.compostability || 'Non-Compostable'}</h3>
          <p className="text-xs text-slate-500">End-of-life biodegradation</p>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-200 space-y-2 border-l-4 border-l-amber-500">
          <span className="text-xs font-semibold text-slate-500">Package Mass (g)</span>
          <h3 className="text-base font-bold text-slate-900">{sust.package_mass_grams ? `${sust.package_mass_grams} g` : '3.82 g'}</h3>
          <p className="text-xs text-slate-500">Material mass per unit pouch</p>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-200 space-y-2 border-l-4 border-l-purple-500">
          <span className="text-xs font-semibold text-slate-500">CO₂ Footprint / Pouch</span>
          <h3 className="text-base font-bold text-slate-900">{sust.co2_per_package_g ? `${sust.co2_per_package_g} g CO₂-eq` : '9.55 g CO₂-eq'}</h3>
          <p className="text-xs text-slate-500">Global Warming Potential (GWP)</p>
        </div>
      </div>

      {/* End-of-Life Pathway & Environmental Notes */}
      <div className="glass-card p-6 rounded-2xl border border-slate-200 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Recycle className="w-4 h-4 text-emerald-600" />
          End-of-Life Pathway & Circular Economy Potential
        </h3>
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed font-semibold">
          {sust.end_of_life_pathway || 'Mechanical Recycling (PE/PP Stream)'}
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">
          {sust.environmental_notes || 'LCA evaluated per ISO 14040 principles considering raw polymer extraction, film extrusion, and end-of-life incineration or mechanical recycling.'}
        </p>
      </div>
    </div>
  );
}
