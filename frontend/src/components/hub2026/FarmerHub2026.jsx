import React, { useState } from 'react';
import {
  Calendar,
  CloudSunRain,
  Droplets,
  Sprout,
  TrendingUp,
  Cpu,
  Landmark,
  Mic,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { FARMER_REQUIREMENTS_2026, MANDI_PRICES_2026_SAMPLE } from '../../data/farmerRequirements2026';
import { TRANSLATIONS } from '../../data/translations';

export default function FarmerHub2026({ language }) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const [expandedReq, setExpandedReq] = useState('req-climate');
  const [selectedScheme, setSelectedScheme] = useState(null);

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'CloudSunRain':
        return <CloudSunRain className="w-5 h-5" />;
      case 'Droplets':
        return <Droplets className="w-5 h-5" />;
      case 'Sprout':
        return <Sprout className="w-5 h-5" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5" />;
      case 'Landmark':
        return <Landmark className="w-5 h-5" />;
      case 'Mic':
        return <Mic className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-emerald-800">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30 mb-3">
          <Calendar className="w-3.5 h-3.5" />
          <span>Strategic Agricultural Report — Year 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
          {t.hub2026Title}
        </h1>
        <p className="text-xs sm:text-base text-emerald-100/90 mt-2 max-w-2xl leading-relaxed">
          {t.hub2026Subtitle} — Addressing the critical climate shifts, water conservation imperatives,
          organic certification mandates, and real-time market access required by modern farmers in 2026.
        </p>
      </div>

      {/* 2026 Live Mandi Intelligence Ticker */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              <span>2026 APMC Mandi Price Intelligence (e-NAM Direct)</span>
            </h2>
            <p className="text-xs text-slate-500">
              Live modal trade rates across major Indian wholesale agricultural markets
            </p>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 self-start sm:self-auto">
            Updated Hourly
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {MANDI_PRICES_2026_SAMPLE.map((mandi, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-400 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 truncate">{mandi.crop}</span>
                  <span
                    className={`text-[10px] font-bold ${
                      mandi.trend.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'
                    }`}
                  >
                    {mandi.trend}
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 block">{mandi.mandi}</span>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200 flex items-baseline justify-between">
                <span className="text-sm font-black text-slate-900">{mandi.modalPrice}</span>
                <span className="text-[10px] text-slate-400 font-semibold">MSP: {mandi.msp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* The 7 Core Pillars of 2026 Farmer Requirements */}
      <div className="space-y-4">
        <div className="mb-2">
          <h2 className="text-2xl font-bold text-slate-900">
            Key Priorities & Technological Demands of Farmers in 2026
          </h2>
          <p className="text-sm text-slate-500">
            Detailed breakdown of field challenges, 2026 AI/IoT engineering solutions, and actionable agronomic steps:
          </p>
        </div>

        <div className="space-y-3">
          {FARMER_REQUIREMENTS_2026.map((req) => {
            const isExpanded = expandedReq === req.id;
            return (
              <div
                key={req.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all duration-200"
              >
                {/* Header Row */}
                <div
                  onClick={() => setExpandedReq(isExpanded ? null : req.id)}
                  className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 flex-shrink-0">
                      {getIcon(req.icon)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-slate-900">{req.title}</h3>
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 uppercase">
                          {req.priority}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{req.farmerChallenge}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-emerald-700 hidden sm:inline">
                      {req.metricImpact}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="p-6 pt-0 border-t border-slate-100 bg-slate-50/50 space-y-4 text-xs sm:text-sm animate-fadeIn">
                    {/* The 2026 Challenge */}
                    <div className="bg-rose-50/80 p-4 rounded-xl border border-rose-200 text-rose-950">
                      <strong className="block text-rose-900 text-xs uppercase mb-1">
                        The 2026 Field Challenge:
                      </strong>
                      <p className="text-xs leading-relaxed">{req.farmerChallenge}</p>
                    </div>

                    {/* The 2026 Technology Solution */}
                    <div className="bg-emerald-50/80 p-4 rounded-xl border border-emerald-200 text-emerald-950">
                      <strong className="block text-emerald-900 text-xs uppercase mb-1">
                        Sudarshana Agri_Care 2026 Solution:
                      </strong>
                      <p className="text-xs leading-relaxed">{req.techSolution2026}</p>
                    </div>

                    {/* Actionable Steps for Farmer */}
                    {req.actionableAdvisory && (
                      <div className="space-y-2">
                        <strong className="block text-slate-800 text-xs uppercase">
                          Recommended Actionable Advisory for Rural Farmers:
                        </strong>
                        <ul className="space-y-1.5 text-xs text-slate-700">
                          {req.actionableAdvisory.map((step, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                              <span>{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Government Schemes List (If applicable) */}
                    {req.schemesList && (
                      <div className="space-y-3 pt-2">
                        <strong className="block text-slate-800 text-xs uppercase">
                          Major Indian Government Subsidies & Portals in 2026:
                        </strong>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {req.schemesList.map((scheme, sIdx) => (
                            <div
                              key={sIdx}
                              className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-1 shadow-sm"
                            >
                              <div className="flex items-center justify-between">
                                <h4 className="text-xs font-bold text-slate-900">{scheme.name}</h4>
                                <span className="text-[10px] text-blue-600 font-mono font-bold">
                                  {scheme.portal}
                                </span>
                              </div>
                              <p className="text-[11px] text-emerald-800 font-bold">{scheme.amount}</p>
                              <p className="text-[11px] text-slate-500">Eligibility: {scheme.eligibility}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Emergency Kisan Call Center Quick Card */}
      <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-3xl p-6 sm:p-8 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-xl sm:text-2xl font-black">
            Kisan Call Center: 1800-180-1551 (Toll-Free 24x7)
          </h3>
          <p className="text-xs sm:text-sm text-amber-100">
            Government of India agricultural experts available round-the-clock in 22 local Indian languages.
          </p>
        </div>
        <a
          href="tel:18001801551"
          className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-amber-900 font-black text-sm shadow-md hover:bg-amber-50 transition-all whitespace-nowrap"
        >
          <PhoneCall className="w-4 h-4 text-amber-700 animate-pulse" />
          <span>Call 1800-180-1551 Free</span>
        </a>
      </div>
    </div>
  );
}
