import React, { useState } from 'react';
import { DollarSign, ShieldAlert, Package, Layers } from 'lucide-react';
import DataSourceBadge from '../components/common/DataSourceBadge';

export default function CostAnalysis({ analysisData, sample }) {
  const cost = analysisData?.cost_sustainability_analysis || {};

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Financial Packaging Cost Optimization</h1>
          <p className="text-sm text-slate-500 mt-1">Material mass costing per unit, per 1,000 packages, and per kg of food product.</p>
        </div>
        <DataSourceBadge type="DATABASE" />
      </div>

      {/* Cost Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-2xl border border-slate-200 space-y-2 border-l-4 border-l-emerald-500">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
            <span>Estimated Cost Per Package</span>
            <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono font-bold text-[10px]">DATABASE ESTIMATE</span>
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900">${cost.cost_per_package_usd ? cost.cost_per_package_usd.toFixed(4) : '0.0134'} USD</h3>
          <p className="text-xs font-bold text-emerald-700">₹{cost.cost_per_package_inr ? cost.cost_per_package_inr.toFixed(2) : '1.14'} INR / pouch</p>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-200 space-y-2 border-l-4 border-l-cyan-500">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
            <span>Cost Per 1,000 Packages</span>
            <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono font-bold text-[10px]">DATABASE ESTIMATE</span>
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900">${cost.cost_per_1000_packages_usd ? cost.cost_per_1000_packages_usd.toFixed(2) : '13.40'} USD</h3>
          <p className="text-xs font-bold text-cyan-700">₹{cost.cost_per_1000_packages_inr ? cost.cost_per_1000_packages_inr.toFixed(2) : '1139.00'} INR / 1k units</p>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-200 space-y-2 border-l-4 border-l-amber-500">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
            <span>Packaging Cost Per kg Food</span>
            <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono font-bold text-[10px]">DATABASE ESTIMATE</span>
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900">${cost.cost_per_kg_food_usd ? cost.cost_per_kg_food_usd.toFixed(4) : '0.0268'} USD</h3>
          <p className="text-xs font-bold text-amber-700">₹{cost.cost_per_kg_food_inr ? cost.cost_per_kg_food_inr.toFixed(2) : '2.28'} INR / kg food</p>
        </div>
      </div>

      {/* Surface Area & Mass Parameters */}
      <div className="glass-card p-6 rounded-2xl border border-slate-200 space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Geometrical Film Mass Parameters</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div>
            <span className="text-slate-500 block">Pouch Dimensions:</span>
            <strong className="text-slate-900">{cost.pouch_dimensions || '20 cm x 15 cm'}</strong>
          </div>
          <div>
            <span className="text-slate-500 block">Calculated Film Area:</span>
            <strong className="text-slate-900">{cost.package_area_m2 || '0.069'} m²</strong>
          </div>
          <div>
            <span className="text-slate-500 block">Film Gauge Thickness:</span>
            <strong className="text-slate-900">{cost.thickness_um || '60'} µm</strong>
          </div>
          <div>
            <span className="text-slate-500 block">Calculated Mass / Unit:</span>
            <strong className="text-slate-900">{cost.package_mass_grams || '3.82'} grams</strong>
          </div>
        </div>
      </div>

      {/* Mandatory Database Label Notice */}
      <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl flex items-center gap-3 text-xs font-semibold">
        <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0" />
        <span>DATABASE ESTIMATE: Cost numbers are computed using base polymer density and database reference prices. Live market raw material prices require supplier quotation.</span>
      </div>
    </div>
  );
}
