import React from 'react';
import { FileText, Printer, Trash2, Calendar, ShieldCheck, AlertTriangle, ArrowRight } from 'lucide-react';

export default function PrescriptionHistory({ prescriptions, onSelectPrescription, onClearPrescriptions, setActiveTab }) {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-6 h-6 text-emerald-600" />
            <span>Digital Agri Prescription History</span>
          </h2>
          <p className="text-xs text-slate-500">
            Records of diagnostic advisories, dosage schedules, and fertilizer recommendations
          </p>
        </div>

        {prescriptions.length > 0 && (
          <button
            onClick={onClearPrescriptions}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 self-start sm:self-auto"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {prescriptions.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
            <FileText className="w-8 h-8" />
          </div>
          <div className="max-w-sm mx-auto space-y-1">
            <h3 className="text-lg font-bold text-slate-800">No Prescriptions Yet</h3>
            <p className="text-xs text-slate-500">
              Run a crop diagnosis using the Camera or Upload tool to generate and store digital farmer prescriptions.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('detect')}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-all inline-flex items-center gap-2"
          >
            <span>Diagnose a Crop Leaf Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {prescriptions.map((pres, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Prescription #{idx + 101}
                  </span>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{pres.analyzedAt || 'Today'}</span>
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-slate-900">{pres.cropName}</h4>
                  {pres.status === 'healthy' ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      Healthy
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                      {pres.diseaseName}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-500 line-clamp-2">
                  {pres.status === 'healthy'
                    ? pres.overview
                    : `Remedies: ${pres.homemadeRemedies?.[0]?.name || 'Natural remedies provided'}`}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] font-semibold text-emerald-700">
                  Confidence: {pres.confidence}%
                </span>
                <button
                  onClick={() => {
                    onSelectPrescription(pres);
                    setActiveTab('detect');
                  }}
                  className="px-3 py-1.5 rounded-lg font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
