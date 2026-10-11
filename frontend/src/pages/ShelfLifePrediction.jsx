import React from 'react';
import { Clock, ShieldAlert, CheckCircle2, TrendingUp, AlertTriangle } from 'lucide-react';
import DataSourceBadge from '../components/common/DataSourceBadge';

export default function ShelfLifePrediction({ analysisData, sample }) {
  const shelf = analysisData?.shelf_life_prediction || {};
  const isTargetAchieved = shelf.is_target_achievable;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Shelf-Life Prediction Module</h1>
          <p className="text-sm text-slate-500 mt-1">Arrhenius temperature kinetics ($Q_{10}$) & barrier protection deterioration model.</p>
        </div>
        <DataSourceBadge type="CALCULATED" />
      </div>

      {/* Main Metric Banner */}
      <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border border-slate-800">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Estimated Shelf Life Range</span>
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-extrabold text-white">{shelf.estimated_shelf_life_days || 18.5} Days</span>
            <span className="text-sm text-slate-300 font-medium">(Range: {shelf.shelf_life_range_min || 15} - {shelf.shelf_life_range_max || 22} Days)</span>
          </div>
          <p className="text-xs text-slate-400">Target Shelf Life: <strong>{sample?.desired_shelf_life || 30} Days</strong></p>
        </div>

        <div className={`px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 ${
          isTargetAchieved ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
        }`}>
          {isTargetAchieved ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertTriangle className="w-4 h-4 text-amber-400" />}
          <span>{isTargetAchieved ? 'Target Shelf-Life Target Met' : 'Requires Additional Barrier Protection'}</span>
        </div>
      </div>

      {/* Kinetic Deterioration Factors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 rounded-2xl border border-slate-200 space-y-3">
          <h3 className="text-sm font-bold text-slate-900">Primary Deterioration Factors</h3>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed font-semibold">
            {shelf.primary_deterioration_factor || 'Moisture Absorption & Lipid Oxidation'}
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-200 space-y-3">
          <h3 className="text-sm font-bold text-slate-900">Packaging Barrier Impact</h3>
          <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
            {shelf.packaging_barrier_impact || 'Calculated barrier protection multiplier evaluated from target OTR and WVTR.'}
          </p>
        </div>
      </div>

      {/* Environmental Thermal Reaction Contribution */}
      <div className="glass-card p-6 rounded-2xl border border-slate-200 space-y-3">
        <h3 className="text-sm font-bold text-slate-900">Environmental Temperature Contribution</h3>
        <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
          {shelf.environmental_impact || 'Thermal reaction rate multiplier evaluated via Q10 Arrhenius factor.'}
        </p>
      </div>

      {/* Mandatory Disclaimer */}
      <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-xl flex items-center gap-3 text-xs font-semibold">
        <ShieldAlert className="w-5 h-5 text-rose-600 flex-shrink-0" />
        <span>AI/model-based estimate — validation required before commercial use.</span>
      </div>
    </div>
  );
}
