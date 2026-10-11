import React from 'react';
import AgriLogo from '../common/AgriLogo';
import { Heart, Github, ExternalLink, PhoneCall, ShieldCheck } from 'lucide-react';
import { TRANSLATIONS } from '../../data/translations';

export default function Footer({ language = 'en', setActiveTab }) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  return (
    <footer className="glass-panel-dark text-slate-400 mt-20 border-t border-white/10 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="space-y-3 md:col-span-2">
            <AgriLogo size="md" className="brightness-110" />
            <p className="text-slate-400 text-xs max-w-sm leading-relaxed">
              {t.footerDesc}
            </p>
            <div className="flex items-center gap-3 pt-2 text-slate-300">
              <a
                href="https://github.com/sudharshanaa1417-lab"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors font-semibold"
              >
                <Github className="w-4 h-4" />
                <span>GitHub: sudharshanaa1417-lab</span>
              </a>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">{t.systemModules}</h4>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => setActiveTab('detect')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  {t.navDetect}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('iot')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  {t.navIot}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('2026')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  {t.nav2026}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('prescriptions')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  {t.navPrescriptions}
                </button>
              </li>
            </ul>
          </div>

          {/* Helpline & Portals */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">{t.farmerAssistance}</h4>
            <ul className="space-y-1.5">
              <li className="flex items-center gap-1 text-emerald-400 font-bold">
                <PhoneCall className="w-3.5 h-3.5" />
                <span>1800-180-1551 (Kisan Helpline)</span>
              </li>
              <li>
                <a
                  href="https://pmkisan.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-400 flex items-center gap-1"
                >
                  <span>PM-Kisan Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://enam.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-400 flex items-center gap-1"
                >
                  <span>e-NAM Mandi Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://soilhealth.dac.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-400 flex items-center gap-1"
                >
                  <span>Soil Health Card Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            &copy; 2026 AgriCare. {t.allRightsReserved}
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Precision AgTech for Rural Prosperity</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
