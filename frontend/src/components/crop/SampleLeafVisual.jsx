import React from 'react';

export default function SampleLeafVisual({ type, className = 'w-full h-44' }) {
  switch (type) {
    case 'tomato-healthy':
      return (
        <div className={`relative bg-emerald-50/80 rounded-xl overflow-hidden flex items-center justify-center p-2 border border-emerald-200 ${className}`}>
          <svg viewBox="0 0 200 160" className="w-full h-full drop-shadow-md">
            <defs>
              <linearGradient id="tomGreen" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#22c55e" />
                <stop offset="60%" stopColor="#15803d" />
                <stop offset="100%" stopColor="#166534" />
              </linearGradient>
            </defs>
            {/* Tomato leaf with serrated lobes */}
            <path
              d="M100 145 C95 130 92 110 90 90 C75 92 50 82 40 70 C35 64 36 55 45 52 C55 50 72 60 85 70 C80 50 75 35 68 25 C64 18 70 12 78 15 C88 20 94 40 98 62 C102 40 108 20 118 15 C126 12 132 18 128 25 C121 35 116 50 111 70 C124 60 141 50 151 52 C160 55 161 64 156 70 C146 82 121 92 106 90 C104 110 101 130 96 145 Z"
              fill="url(#tomGreen)"
              stroke="#0f5132"
              strokeWidth="2"
            />
            {/* Leaf veins */}
            <path d="M98 140 L98 62" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
            <path d="M98 90 L60 62 M98 90 L136 62" stroke="#4ade80" strokeWidth="1.8" strokeLinecap="round" opacity="0.7" />
            <path d="M98 115 L70 95 M98 115 L126 95" stroke="#4ade80" strokeWidth="1.8" strokeLinecap="round" opacity="0.7" />
            <path d="M98 70 L80 35 M98 70 L116 35" stroke="#4ade80" strokeWidth="1.8" strokeLinecap="round" opacity="0.7" />
          </svg>
          <span className="absolute bottom-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-white shadow">
            Healthy 98%
          </span>
        </div>
      );

    case 'tomato-early-blight':
      return (
        <div className={`relative bg-amber-50/80 rounded-xl overflow-hidden flex items-center justify-center p-2 border border-amber-300 ${className}`}>
          <svg viewBox="0 0 200 160" className="w-full h-full drop-shadow-md">
            <defs>
              <radialGradient id="targetSpot1" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#291b16" />
                <stop offset="40%" stopColor="#5c3822" />
                <stop offset="70%" stopColor="#8d5b4c" />
                <stop offset="90%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#84cc16" stopOpacity="0" />
              </radialGradient>
            </defs>
            <path
              d="M100 145 C95 130 92 110 90 90 C75 92 50 82 40 70 C35 64 36 55 45 52 C55 50 72 60 85 70 C80 50 75 35 68 25 C64 18 70 12 78 15 C88 20 94 40 98 62 C102 40 108 20 118 15 C126 12 132 18 128 25 C121 35 116 50 111 70 C124 60 141 50 151 52 C160 55 161 64 156 70 C146 82 121 92 106 90 C104 110 101 130 96 145 Z"
              fill="#4d7c0f"
              stroke="#2e4d08"
              strokeWidth="2"
            />
            {/* Chlorosis yellow areas */}
            <path d="M50 65 Q65 75 75 80 Q60 90 48 78 Z" fill="#eab308" opacity="0.6" />
            <path d="M120 70 Q135 78 145 68 Q135 60 120 70 Z" fill="#eab308" opacity="0.6" />
            {/* Concentric rings / Target spots */}
            <circle cx="68" cy="74" r="14" fill="url(#targetSpot1)" />
            <circle cx="68" cy="74" r="10" stroke="#1f130b" strokeWidth="1.2" fill="none" opacity="0.8" />
            <circle cx="68" cy="74" r="6" stroke="#1f130b" strokeWidth="1.2" fill="none" opacity="0.8" />
            <circle cx="68" cy="74" r="2.5" fill="#1f130b" />

            <circle cx="128" cy="66" r="12" fill="url(#targetSpot1)" />
            <circle cx="128" cy="66" r="8" stroke="#1f130b" strokeWidth="1.2" fill="none" opacity="0.8" />
            <circle cx="128" cy="66" r="2.5" fill="#1f130b" />

            <circle cx="95" cy="48" r="9" fill="url(#targetSpot1)" />
          </svg>
          <span className="absolute bottom-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-600 text-white shadow">
            Early Blight 42%
          </span>
        </div>
      );

    case 'tomato-late-blight':
      return (
        <div className={`relative bg-rose-50/80 rounded-xl overflow-hidden flex items-center justify-center p-2 border border-rose-300 ${className}`}>
          <svg viewBox="0 0 200 160" className="w-full h-full drop-shadow-md">
            <path
              d="M100 145 C95 130 92 110 90 90 C75 92 50 82 40 70 C35 64 36 55 45 52 C55 50 72 60 85 70 C80 50 75 35 68 25 C64 18 70 12 78 15 C88 20 94 40 98 62 C102 40 108 20 118 15 C126 12 132 18 128 25 C121 35 116 50 111 70 C124 60 141 50 151 52 C160 55 161 64 156 70 C146 82 121 92 106 90 C104 110 101 130 96 145 Z"
              fill="#365314"
              stroke="#1c2d0a"
              strokeWidth="2"
            />
            {/* Severe water soaked rotting patches */}
            <path
              d="M60 40 C75 30 110 35 120 50 C110 75 90 85 70 80 C50 75 45 50 60 40 Z"
              fill="#271d17"
              stroke="#451a03"
              strokeWidth="2"
            />
            {/* White mildew rim */}
            <path
              d="M60 40 C75 30 110 35 120 50 C110 75 90 85 70 80 C50 75 45 50 60 40 Z"
              stroke="#f8fafc"
              strokeWidth="2"
              strokeDasharray="3 3"
              fill="none"
              opacity="0.9"
            />
            <path d="M110 80 C130 75 145 90 140 105 C125 115 105 105 110 80 Z" fill="#271d17" />
          </svg>
          <span className="absolute bottom-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-600 text-white shadow">
            Late Blight 68%
          </span>
        </div>
      );

    case 'rice-healthy':
      return (
        <div className={`relative bg-emerald-50/80 rounded-xl overflow-hidden flex items-center justify-center p-2 border border-emerald-200 ${className}`}>
          <svg viewBox="0 0 200 160" className="w-full h-full drop-shadow-md">
            <path
              d="M95 150 C95 120 85 80 75 40 C70 20 85 10 92 10 C96 20 105 80 105 120 C105 135 105 150 95 150 Z"
              fill="#16a34a"
              stroke="#14532d"
              strokeWidth="1.8"
            />
            <path
              d="M102 150 C108 125 122 85 135 50 C140 32 148 24 150 25 C146 38 135 85 120 125 C114 140 105 150 102 150 Z"
              fill="#22c55e"
              stroke="#15803d"
              strokeWidth="1.8"
            />
            {/* Slender parallel veins */}
            <path d="M85 30 L98 140" stroke="#86efac" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
            <path d="M142 40 L112 140" stroke="#86efac" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
          </svg>
          <span className="absolute bottom-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-white shadow">
            Paddy Healthy 97%
          </span>
        </div>
      );

    case 'rice-bacterial-blight':
      return (
        <div className={`relative bg-rose-50/80 rounded-xl overflow-hidden flex items-center justify-center p-2 border border-rose-300 ${className}`}>
          <svg viewBox="0 0 200 160" className="w-full h-full drop-shadow-md">
            {/* Healthy base turning into wavy straw-yellow blight at top */}
            <path
              d="M95 150 C95 120 85 80 75 40 C70 20 85 10 92 10 C96 20 105 80 105 120 C105 135 105 150 95 150 Z"
              fill="#15803d"
            />
            {/* Wavy bacterial blight lesion extending from tip */}
            <path
              d="M92 10 C96 20 103 45 100 70 C96 65 90 75 88 55 C82 50 78 30 75 40 C70 20 85 10 92 10 Z"
              fill="#fef08a"
              stroke="#eab308"
              strokeWidth="1.5"
            />
            <path
              d="M89 12 C93 25 96 45 92 60 C88 55 84 40 82 25 Z"
              fill="#f59e0b"
              opacity="0.8"
            />
            {/* Amber bacterial exudate spots */}
            <circle cx="92" cy="35" r="2" fill="#d97706" />
            <circle cx="88" cy="48" r="1.8" fill="#d97706" />
          </svg>
          <span className="absolute bottom-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-600 text-white shadow">
            Bacterial Blight 55%
          </span>
        </div>
      );

    case 'rice-brown-spot':
      return (
        <div className={`relative bg-amber-50/80 rounded-xl overflow-hidden flex items-center justify-center p-2 border border-amber-300 ${className}`}>
          <svg viewBox="0 0 200 160" className="w-full h-full drop-shadow-md">
            <path
              d="M95 150 C95 120 85 80 75 40 C70 20 85 10 92 10 C96 20 105 80 105 120 C105 135 105 150 95 150 Z"
              fill="#16a34a"
            />
            {/* Oval brown spots */}
            <ellipse cx="88" cy="50" rx="6" ry="3" fill="#451a03" stroke="#f59e0b" strokeWidth="1" transform="rotate(-15 88 50)" />
            <circle cx="88" cy="50" r="1.5" fill="#f1f5f9" />
            <ellipse cx="92" cy="75" rx="7" ry="3.5" fill="#451a03" stroke="#f59e0b" strokeWidth="1" transform="rotate(10 92 75)" />
            <circle cx="92" cy="75" r="1.5" fill="#f1f5f9" />
            <ellipse cx="86" cy="100" rx="5" ry="2.5" fill="#451a03" stroke="#f59e0b" strokeWidth="1" />
          </svg>
          <span className="absolute bottom-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-600 text-white shadow">
            Brown Spot 36%
          </span>
        </div>
      );

    case 'wheat-yellow-rust':
      return (
        <div className={`relative bg-amber-50/80 rounded-xl overflow-hidden flex items-center justify-center p-2 border border-amber-300 ${className}`}>
          <svg viewBox="0 0 200 160" className="w-full h-full drop-shadow-md">
            <path
              d="M95 150 C95 110 88 70 80 30 C75 15 85 10 90 10 C98 25 105 70 105 110 C105 135 105 150 95 150 Z"
              fill="#4d7c0f"
            />
            {/* Linear stripes of yellow-orange powdery pustules */}
            <path d="M86 35 V120" stroke="#f59e0b" strokeWidth="3" strokeDasharray="3 2" />
            <path d="M91 25 V130" stroke="#ea580c" strokeWidth="3" strokeDasharray="4 2" />
            <path d="M96 30 V125" stroke="#facc15" strokeWidth="3" strokeDasharray="3 3" />
            <path d="M100 45 V110" stroke="#ea580c" strokeWidth="2.5" strokeDasharray="2 2" />
          </svg>
          <span className="absolute bottom-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-600 text-white shadow">
            Yellow Rust 70%
          </span>
        </div>
      );

    case 'cotton-leaf-curl':
      return (
        <div className={`relative bg-amber-50/80 rounded-xl overflow-hidden flex items-center justify-center p-2 border border-amber-300 ${className}`}>
          <svg viewBox="0 0 200 160" className="w-full h-full drop-shadow-md">
            {/* Cupped/distorted curled cotton leaf */}
            <path
              d="M100 140 C85 130 50 120 45 90 C40 65 65 40 85 45 C75 35 85 15 100 20 C115 15 125 35 115 45 C135 40 160 65 155 90 C150 120 115 130 100 140 Z"
              fill="#65a30d"
              stroke="#365314"
              strokeWidth="2.5"
            />
            {/* Thickened swolen veins (enations) */}
            <path d="M100 135 L100 30" stroke="#14532d" strokeWidth="4" strokeLinecap="round" />
            <path d="M100 85 Q70 65 55 85" stroke="#14532d" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path d="M100 85 Q130 65 145 85" stroke="#14532d" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            {/* Wrinkle folds */}
            <path d="M80 55 Q95 70 85 105" stroke="#3f6212" strokeWidth="2" strokeDasharray="2 3" fill="none" />
            <path d="M120 55 Q105 70 115 105" stroke="#3f6212" strokeWidth="2" strokeDasharray="2 3" fill="none" />
          </svg>
          <span className="absolute bottom-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-600 text-white shadow">
            Leaf Curl 48%
          </span>
        </div>
      );

    case 'corn-rust':
      return (
        <div className={`relative bg-amber-50/80 rounded-xl overflow-hidden flex items-center justify-center p-2 border border-amber-300 ${className}`}>
          <svg viewBox="0 0 200 160" className="w-full h-full drop-shadow-md">
            {/* Broad corn leaf */}
            <path
              d="M40 150 C50 110 70 60 100 15 C130 60 150 110 160 150 Z"
              fill="#4d7c0f"
              stroke="#1a2e05"
              strokeWidth="2"
            />
            {/* Cinnamon brown powdery rust pustules */}
            <ellipse cx="80" cy="70" rx="5" ry="8" fill="#78350f" stroke="#b45309" strokeWidth="1" />
            <ellipse cx="115" cy="60" rx="4" ry="7" fill="#78350f" stroke="#b45309" strokeWidth="1" />
            <ellipse cx="95" cy="95" rx="6" ry="10" fill="#78350f" stroke="#b45309" strokeWidth="1" />
            <ellipse cx="125" cy="110" rx="5" ry="9" fill="#78350f" stroke="#b45309" strokeWidth="1" />
            <ellipse cx="75" cy="120" rx="4" ry="7" fill="#78350f" stroke="#b45309" strokeWidth="1" />
          </svg>
          <span className="absolute bottom-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-600 text-white shadow">
            Corn Rust 40%
          </span>
        </div>
      );

    default:
      return (
        <div className={`relative bg-emerald-50/80 rounded-xl overflow-hidden flex items-center justify-center p-2 border border-emerald-200 ${className}`}>
          <svg viewBox="0 0 200 160" className="w-full h-full drop-shadow-md">
            <path
              d="M100 145 C60 130 45 80 60 45 C75 20 100 10 100 10 C100 10 125 20 140 45 C155 80 140 130 100 145 Z"
              fill="#15803d"
              stroke="#0f5132"
              strokeWidth="2"
            />
            <path d="M100 140 L100 20" stroke="#86efac" strokeWidth="2.5" />
            <path d="M100 90 L70 65 M100 90 L130 65" stroke="#86efac" strokeWidth="2" />
            <path d="M100 115 L80 95 M100 115 L120 95" stroke="#86efac" strokeWidth="2" />
          </svg>
          <span className="absolute bottom-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white shadow">
            Field Sample
          </span>
        </div>
      );
  }
}
