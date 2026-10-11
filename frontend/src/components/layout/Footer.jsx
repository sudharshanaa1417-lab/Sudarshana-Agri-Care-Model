import React from 'react';
import AgriLogo from '../common/AgriLogo';
import { Heart, Github, ExternalLink, PhoneCall, ShieldCheck } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-20 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-2">
            <AgriLogo size="md" className="brightness-110" />
            <p className="text-slate-400 text-xs max-w-sm leading-relaxed">
              Sudarshana Agri_Care Model is an open-source, AI-powered agricultural diagnosis & ESP32 IoT monitoring ecosystem engineered for smallholder rural farmers.
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
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">System Modules</h4>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => setActiveTab('detect')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Crop Disease AI Detector
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('iot')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  ESP32 IoT Real-Time Telemetry
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('2026')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  2026 Farmer Requirements & Mandi
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('prescriptions')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Digital Agri Prescriptions
                </button>
              </li>
            </ul>
          </div>

          {/* Helpline & Portals */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Farmer Assistance</h4>
            <ul className="space-y-1.5">
              <li className="flex items-center gap-1 text-emerald-400 font-semibold">
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
                  <span>e-NAM Mandi Prices</span>
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

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            &copy; 2026 Sudarshana Agri_Care Model. Built with precision for sustainable Indian and global agriculture.
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Precision AgTech for Rural Prosperity</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
