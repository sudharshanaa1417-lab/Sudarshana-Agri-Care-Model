import React from 'react';
import { Database, Search, ShieldCheck } from 'lucide-react';
import DataSourceBadge from '../components/common/DataSourceBadge';

export default function PackagingDatabase({ materials }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Packaging Materials Database</h1>
          <p className="text-sm text-slate-500 mt-1">Authoritative polymer barrier property matrix (OTR, WVTR, ASTM standards).</p>
        </div>
        <DataSourceBadge type="DATABASE" />
      </div>

      {/* Database Table */}
      <div className="glass-card rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/80 text-slate-700 uppercase font-semibold">
              <tr>
                <th className="py-3 px-4">Material ID</th>
                <th className="py-3 px-4">Material Name</th>
                <th className="py-3 px-4">Polymer / Structure</th>
                <th className="py-3 px-4">OTR (cc/m²·day)</th>
                <th className="py-3 px-4">WVTR (g/m²·day)</th>
                <th className="py-3 px-4">Thickness</th>
                <th className="py-3 px-4">Sealability</th>
                <th className="py-3 px-4">Recyclability</th>
                <th className="py-3 px-4">Cost/kg (USD)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {materials.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50/60 transition-all">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{m.material_id}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">{m.material_name}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-600">{m.structure}</td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-700">{m.otr_cc_m2_day}</td>
                  <td className="py-3.5 px-4 font-semibold text-cyan-700">{m.wvtr_g_m2_day}</td>
                  <td className="py-3.5 px-4">{m.thickness_range}</td>
                  <td className="py-3.5 px-4">{m.sealability}</td>
                  <td className="py-3.5 px-4">
                    <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded font-medium">
                      {m.recyclability_category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">${m.cost_per_kg_usd?.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
