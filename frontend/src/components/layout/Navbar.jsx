import React from 'react';
import AgriLogo from '../common/AgriLogo';
import { Wifi, WifiOff, PhoneCall, Globe, Leaf, Cpu, Calendar, FileText } from 'lucide-react';
import { TRANSLATIONS } from '../../data/translations';

export default function Navbar({
  activeTab,
  setActiveTab,
  esp32Status,
  language,
  setLanguage,
  prescriptionCount = 0
}) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिंदी (Hindi)' },
    { code: 'ta', label: 'தமிழ் (Tamil)' },
    { code: 'te', label: 'తెలుగు (Telugu)' },
    { code: 'kn', label: 'ಕನ್ನಡ (Kannada)' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-2xl border-b border-white/60 shadow-[0_4px_24px_rgba(16,185,129,0.04)] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo and Title */}
          <div className="cursor-pointer" onClick={() => setActiveTab('detect')}>
            <AgriLogo size="md" />
          </div>

          {/* Navigation Glass Pills (Desktop) */}
          <nav className="hidden md:flex items-center gap-1.5 bg-white/60 backdrop-blur-xl p-1.5 rounded-2xl border border-white/80 shadow-sm">
            <button
              onClick={() => setActiveTab('detect')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'detect'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'text-slate-600 hover:text-emerald-700 hover:bg-white/80'
              }`}
            >
              <Leaf className="w-4 h-4" />
              <span>{t.navDetect}</span>
            </button>

            <button
              onClick={() => setActiveTab('iot')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'iot'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'text-slate-600 hover:text-emerald-700 hover:bg-white/80'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>{t.navIot}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            </button>

            <button
              onClick={() => setActiveTab('2026')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === '2026'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'text-slate-600 hover:text-emerald-700 hover:bg-white/80'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>{t.nav2026}</span>
            </button>

            <button
              onClick={() => setActiveTab('prescriptions')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all relative ${
                activeTab === 'prescriptions'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'text-slate-600 hover:text-emerald-700 hover:bg-white/80'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>{t.navPrescriptions}</span>
              {prescriptionCount > 0 && (
                <span className="bg-amber-500 text-white text-[10px] font-black px-1.5 py-0.2 rounded-full">
                  {prescriptionCount}
                </span>
              )}
            </button>
          </nav>

          {/* Right Controls: ESP32 Badge, Language Selector & Farmer Helpline */}
          <div className="flex items-center gap-3">
            {/* ESP32 Wi-Fi Live Status Badge */}
            <div
              onClick={() => setActiveTab('iot')}
              className="cursor-pointer hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold border backdrop-blur-md transition-all shadow-sm"
              style={{
                backgroundColor:
                  esp32Status === 'online'
                    ? 'rgba(236, 253, 245, 0.85)'
                    : esp32Status === 'simulated'
                    ? 'rgba(239, 246, 255, 0.85)'
                    : 'rgba(255, 241, 242, 0.85)',
                color:
                  esp32Status === 'online'
                    ? '#065f46'
                    : esp32Status === 'simulated'
                    ? '#1e40af'
                    : '#9f1239',
                borderColor:
                  esp32Status === 'online'
                    ? 'rgba(110, 231, 183, 0.7)'
                    : esp32Status === 'simulated'
                    ? 'rgba(147, 197, 253, 0.7)'
                    : 'rgba(254, 205, 211, 0.7)'
              }}
              title="ESP32 Telemetry Status"
            >
              {esp32Status === 'online' ? (
                <>
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
                  </span>
                  <Wifi className="w-3.5 h-3.5 text-emerald-600" />
                  <span>ESP32: {t.online}</span>
                </>
              ) : esp32Status === 'simulated' ? (
                <>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
                  <Wifi className="w-3.5 h-3.5 text-blue-600" />
                  <span>ESP32: {t.simulated}</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-rose-600" />
                  <span>ESP32: {t.offline}</span>
                </>
              )}
            </div>

            {/* Language Switcher Dropdown */}
            <div className="relative flex items-center">
              <Globe className="w-4 h-4 text-emerald-700 absolute left-2.5 pointer-events-none" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs font-bold bg-white/70 backdrop-blur-md hover:bg-white text-slate-800 rounded-xl border border-white/80 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer transition-all"
                aria-label="Select Language"
              >
                {languages.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Kisan Helpline Button */}
            <a
              href="tel:18001801551"
              className="hidden lg:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-amber-50/80 backdrop-blur-md text-amber-900 border border-amber-300 hover:bg-amber-100 transition-all shadow-sm"
              title={t.kisanCallCenterTitle}
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
              <span>1800-180-1551</span>
            </a>
          </div>
        </div>

        {/* Mobile Navigation Glass Tabs */}
        <div className="flex md:hidden overflow-x-auto py-2 gap-1.5 border-t border-white/40">
          <button
            onClick={() => setActiveTab('detect')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === 'detect' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-700 bg-white/60 backdrop-blur-md'
            }`}
          >
            <Leaf className="w-3.5 h-3.5" />
            <span>{t.navDetect}</span>
          </button>
          <button
            onClick={() => setActiveTab('iot')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === 'iot' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-700 bg-white/60 backdrop-blur-md'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>{t.navIot}</span>
          </button>
          <button
            onClick={() => setActiveTab('2026')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === '2026' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-700 bg-white/60 backdrop-blur-md'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{t.nav2026}</span>
          </button>
          <button
            onClick={() => setActiveTab('prescriptions')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === 'prescriptions' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-700 bg-white/60 backdrop-blur-md'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{t.navPrescriptions}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
