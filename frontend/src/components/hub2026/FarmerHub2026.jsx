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
import { getLocalizedCropName } from '../../data/cropDiseases';

export default function FarmerHub2026({ language }) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const [expandedReq, setExpandedReq] = useState('req-climate');

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

  // Localized Titles for the 7 Pillars
  const pillarTitles = {
    'req-climate': {
      hi: 'जलवायु-सहिष्णु कृषि एवं हाइपरलोकल मौसम पूर्वानुमान (एआई)',
      ta: 'காலநிலை மாற்றத்தை தாங்கும் விவசாயம் & AI வானிலை எச்சரிக்கை',
      te: 'వాతావరణ మార్పులను తట్టుకునే వ్యవసాయం & AI సూచనలు',
      kn: 'ಹವಾಮಾನ ಸ್ಥಿತಿಸ್ಥಾಪಕ ಕೃಷಿ ಮತ್ತು AI ಮುನ್ಸೂಚನೆ'
    },
    'req-water': {
      hi: 'स्वचालित सटीक ड्रिप सिंचाई एवं भूजल संरक्षण',
      ta: 'தானியங்கி துல்லிய சொட்டு நீர் பாசனம் & நிலத்தடி நீர் பாதுகாப்பு',
      te: 'స్వయంచాలక డ్రిప్ నీటి పారుదల & భూగర్భ జలాల పరిరక్షణ',
      kn: 'ಸ್ವಯಂಚಾಲಿತ ಹನಿ ನೀರಾವರಿ ಮತ್ತು ಅಂತರ್ಜಲ ಸಂರಕ್ಷಣೆ'
    },
    'req-carbon': {
      hi: 'मिट्टी में जैविक कार्बन सुधार एवं कार्बन क्रेडिट कमाई (₹1,500/एकड़)',
      ta: 'மண் கரிம கார்பன் பெருக்கம் & கார்பன் கிரెடிட் வருமானம்',
      te: 'నేల సేంద్రీయ కార్బన్ పెంపు & కార్బన్ క్రెడిట్ ఆదాయం',
      kn: 'ಮಣ್ಣಿನ ಸಾವಯವ ಇಂಗಾಲ ಸುಧಾರಣೆ ಮತ್ತು ಕಾರ್ಬನ್ ಕ್ರೆಡಿಟ್ ಆದಾಯ'
    },
    'req-mandi': {
      hi: 'ई-नाम (e-NAM) सीधा डिजिटल मंडी भाव एवं बिचौलिया मुक्ति',
      ta: 'இ-நாம் (e-NAM) நேரடி மண்டி விலை & இடைத்தரகர் ஒழிப்பு',
      te: 'ఈ-నామ్ (e-NAM) ప్రత్యక్ష మార్కెట్ ధరలు & దళారుల నివారణ',
      kn: 'ಇ-ನಾಮ್ (e-NAM) ನೇರ ಮಂಡಿ ದರಗಳು ಮತ್ತು ದಲ್ಲಾಳಿಗಳ ಮುಕ್ತಿ'
    },
    'req-iot-hardware': {
      hi: 'अत्यंत किफायती सौर ऊर्जा संचालित ईएसपी32 फील्ड सेंसर नोड्स (< ₹2,000)',
      ta: 'மலிவு விலை சோலார் ESP32 சென்சார் முனையங்கள் (< ₹2,000)',
      te: 'చౌకైన సౌర శక్తి ESP32 సెన్సార్లు (< ₹2,000)',
      kn: 'ಕಡಿಮೆ ವೆಚ್ಚದ ಸೌರಶಕ್ತಿ ಚಾಲಿತ ESP32 ಸಂವೇದಕಗಳು (< ₹2,000)'
    },
    'req-schemes': {
      hi: '2026 सरकारी सब्सिडी एवं प्रत्यक्ष लाभ अंतरण (DBT) पोर्टल',
      ta: '2026 அரசு மானியங்கள் & நேரடி நிதி உதவி திட்டங்கள்',
      te: '2026 ప్రభుత్వ రాయితీలు & ప్రత్యక్ష నగదు బదిలీ పథకాలు',
      kn: '2026 ಸರ್ಕಾರಿ ಸಬ್ಸಿಡಿಗಳು ಮತ್ತು ನೇರ ಆರ್ಥಿಕ ನೆರವು'
    },
    'req-vernacular-voice': {
      hi: 'मातृभाषा में वॉयस-फर्स्ट डिजिटल सहायक (हिंदी, तमिल, तेलुगु, कन्नड़)',
      ta: 'தாய்மொழி குரல் வழி டிஜிட்டல் உதவி (தமிழ், இந்தி, தெலுங்கு)',
      te: 'మాతృభాష వాయిస్ డిజిటల్ సహాయం (తెలుగు, హిందీ, తమిళం)',
      kn: 'ಮಾತೃಭಾಷಾ ಧ್ವನಿ ಡಿಜಿಟಲ್ ಸಹಾಯ (ಕನ್ನಡ, ಹಿಂದಿ, ತೆಲುಗು)'
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Glassmorphism Banner */}
      <div className="glass-panel-dark text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-white/20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30 mb-3">
          <Calendar className="w-3.5 h-3.5" />
          <span>Strategic Agriculture 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
          {t.hub2026Title}
        </h1>
        <p className="text-xs sm:text-base text-emerald-100/90 mt-2 max-w-2xl leading-relaxed">
          {t.hub2026Subtitle}
        </p>
      </div>

      {/* 2026 Live Mandi Intelligence Ticker */}
      <div className="glass-panel rounded-3xl p-6 shadow-xl border border-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              <span>{t.mandiTitle}</span>
            </h2>
            <p className="text-xs text-slate-500">{t.mandiSub}</p>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100/90 text-emerald-800 border border-emerald-300 self-start sm:self-auto shadow-sm">
            {t.updatedHourly}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {MANDI_PRICES_2026_SAMPLE.map((mandi, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white/70 backdrop-blur-md border border-white shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-900 truncate">
                    {mandi.crop.includes('Paddy')
                      ? getLocalizedCropName('Rice / Paddy', language) + ' (' + mandi.crop.split('(')[1]
                      : mandi.crop.includes('Tomato')
                      ? getLocalizedCropName('Tomato', language)
                      : mandi.crop.includes('Potato')
                      ? getLocalizedCropName('Potato', language)
                      : mandi.crop.includes('Wheat')
                      ? getLocalizedCropName('Wheat', language)
                      : mandi.crop.includes('Cotton')
                      ? getLocalizedCropName('Cotton', language)
                      : mandi.crop.includes('Chilli')
                      ? getLocalizedCropName('Chilli / Pepper', language)
                      : mandi.crop}
                  </span>
                  <span
                    className={`text-[10px] font-black ${
                      mandi.trend.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'
                    }`}
                  >
                    {mandi.trend}
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 block">{mandi.mandi}</span>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-baseline justify-between">
                <span className="text-sm font-black text-slate-900">{mandi.modalPrice}</span>
                <span className="text-[10px] text-slate-400 font-semibold">MSP: {mandi.msp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* The 7 Core Pillars */}
      <div className="space-y-4">
        <div className="mb-2">
          <h2 className="text-2xl font-black text-slate-900">
            {t.keyPrioritiesTitle}
          </h2>
          <p className="text-sm text-slate-500">
            {t.keyPrioritiesSub}
          </p>
        </div>

        <div className="space-y-3">
          {FARMER_REQUIREMENTS_2026.map((req) => {
            const isExpanded = expandedReq === req.id;
            const localizedTitle = pillarTitles[req.id]?.[language] || req.title;

            return (
              <div
                key={req.id}
                className="glass-panel rounded-3xl border border-white shadow-sm overflow-hidden transition-all duration-200"
              >
                {/* Header Row */}
                <div
                  onClick={() => setExpandedReq(isExpanded ? null : req.id)}
                  className="p-5 flex items-center justify-between cursor-pointer hover:bg-white/90 transition-colors"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 flex-shrink-0 shadow-sm">
                      {getIcon(req.icon)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm sm:text-base font-bold text-slate-900">{localizedTitle}</h3>
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
                  <div className="p-6 pt-0 border-t border-slate-100 bg-white/40 space-y-4 text-xs sm:text-sm animate-fadeIn">
                    <div className="bg-rose-50/80 p-4 rounded-2xl border border-rose-200 text-rose-950 backdrop-blur-sm">
                      <strong className="block text-rose-900 text-xs uppercase mb-1">
                        {t.fieldChallenge}
                      </strong>
                      <p className="text-xs leading-relaxed">{req.farmerChallenge}</p>
                    </div>

                    <div className="bg-emerald-50/80 p-4 rounded-2xl border border-emerald-200 text-emerald-950 backdrop-blur-sm">
                      <strong className="block text-emerald-900 text-xs uppercase mb-1">
                        {t.solution2026}
                      </strong>
                      <p className="text-xs leading-relaxed">{req.techSolution2026}</p>
                    </div>

                    {req.actionableAdvisory && (
                      <div className="space-y-2">
                        <strong className="block text-slate-800 text-xs uppercase">
                          {t.actionableAdvisory}
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

                    {req.schemesList && (
                      <div className="space-y-3 pt-2">
                        <strong className="block text-slate-800 text-xs uppercase">
                          {t.govSchemesTitle}
                        </strong>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {req.schemesList.map((scheme, sIdx) => (
                            <div
                              key={sIdx}
                              className="p-3.5 bg-white/90 rounded-2xl border border-white space-y-1 shadow-sm backdrop-blur-md"
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
      <div className="glass-panel-amber text-amber-950 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-amber-300">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-xl sm:text-2xl font-black">
            {t.kisanCallCenterTitle}
          </h3>
          <p className="text-xs sm:text-sm text-amber-900">
            {t.kisanCallCenterSub}
          </p>
        </div>
        <a
          href="tel:18001801551"
          className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white/90 hover:bg-white text-amber-950 font-black text-sm shadow-md transition-all whitespace-nowrap border border-amber-300"
        >
          <PhoneCall className="w-4 h-4 text-amber-600 animate-pulse" />
          <span>{t.callFreeBtn}</span>
        </a>
      </div>
    </div>
  );
}
