import React from 'react';
import { FileText, Printer, Trash2, Calendar, ShieldCheck, AlertTriangle, ArrowRight } from 'lucide-react';
import { TRANSLATIONS } from '../../data/translations';
import { getLocalizedCropName, getLocalizedDiseaseName } from '../../data/cropDiseases';

export default function PrescriptionHistory({
  language = 'en',
  prescriptions,
  onSelectPrescription,
  onClearPrescriptions,
  setActiveTab
}) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/70">
        <div>
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <FileText className="w-6 h-6 text-emerald-600" />
            <span>{t.prescriptionHistoryTitle}</span>
          </h2>
          <p className="text-xs text-slate-500">
            {t.prescriptionHistorySub}
          </p>
        </div>

        {prescriptions.length > 0 && (
          <button
            onClick={onClearPrescriptions}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 self-start sm:self-auto shadow-sm"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{t.clearHistory}</span>
          </button>
        )}
      </div>

      {prescriptions.length === 0 ? (
        <div className="glass-panel rounded-3xl p-12 text-center border border-white space-y-4 shadow-xl">
          <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
            <FileText className="w-8 h-8" />
          </div>
          <div className="max-w-sm mx-auto space-y-1">
            <h3 className="text-lg font-black text-slate-800">{t.noPrescriptions}</h3>
            <p className="text-xs text-slate-500">
              {t.noPrescriptionsSub}
            </p>
          </div>
          <button
            onClick={() => setActiveTab('detect')}
            className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs transition-all inline-flex items-center gap-2 shadow-lg shadow-emerald-600/30"
          >
            <span>{t.diagnoseNowBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {prescriptions.map((pres, idx) => (
            <div
              key={idx}
              className="glass-panel rounded-3xl p-5 border border-white shadow-md hover:shadow-xl transition-all space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                    Prescription #{idx + 101}
                  </span>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{pres.analyzedAt || 'Today'}</span>
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <h4 className="text-base font-black text-slate-900">
                    {getLocalizedCropName(pres.cropKey || pres.cropName, language)}
                  </h4>
                  {pres.status === 'healthy' ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                      Healthy
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-300">
                      {getLocalizedDiseaseName(pres.diseaseName, language)}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 line-clamp-2">
                  {pres.status === 'healthy'
                    ? pres.overview
                    : `Remedies: ${pres.homemadeRemedies?.[0]?.name || 'Natural remedies'}`}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs">
                <span className="text-[11px] font-bold text-emerald-700">
                  {t.confidenceLabel}: {pres.confidence}%
                </span>
                <button
                  onClick={() => {
                    onSelectPrescription(pres);
                    setActiveTab('detect');
                  }}
                  className="px-3 py-1.5 rounded-xl font-bold text-emerald-800 bg-emerald-100/80 hover:bg-emerald-200 border border-emerald-300 transition-all"
                >
                  {t.viewDetails}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
