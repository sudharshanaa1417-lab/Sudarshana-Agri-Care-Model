import React from 'react';
import { FileText, Download, Plus, Clock, FileCheck } from 'lucide-react';

export default function ReportsPage({ reports, onGenerateReport, generating, sample }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">PDF Recommendation Reports</h1>
          <p className="text-sm text-slate-500 mt-1">Generate and download official PDF packaging specifications and disclaimers.</p>
        </div>

        <button
          onClick={onGenerateReport}
          disabled={generating || !sample}
          className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold px-5 py-2.5 rounded-xl text-sm flex items-center gap-2 shadow-md shadow-emerald-600/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          {generating ? 'Generating PDF Report...' : 'Generate New PDF Report'}
        </button>
      </div>

      {/* Generated Reports Table */}
      <div className="glass-card rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-5 border-b border-slate-200 bg-slate-50/50">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-emerald-600" />
            Generated Official Reports Archive ({reports.length})
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/70 text-slate-600 uppercase font-semibold">
              <tr>
                <th className="py-3 px-4">Report ID</th>
                <th className="py-3 px-4">Report Title</th>
                <th className="py-3 px-4">Date Generated</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {reports.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/60 transition-all">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">REP-00{r.id}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">{r.title}</td>
                  <td className="py-3.5 px-4 text-slate-500">{new Date(r.created_at).toLocaleString()}</td>
                  <td className="py-3.5 px-4 text-right">
                    <a
                      href={r.download_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-3 py-1.5 rounded-lg transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download PDF
                    </a>
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
