import React from 'react';

export default function AgriLogo({ size = 'md', showText = true, className = '' }) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Unique SVG Logo: Seedling + Digital IoT Circuit + Protective Leaf Shield */}
      <div className={`relative ${sizeClasses[size] || sizeClasses.md} flex-shrink-0 group`}>
        <div className="absolute inset-0 bg-emerald-500/20 rounded-2xl blur-md group-hover:bg-emerald-500/30 transition-all duration-300"></div>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative w-full h-full drop-shadow-md"
        >
          <defs>
            <linearGradient id="leafGrad" x1="10" y1="90" x2="90" y2="10" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#059669" />
              <stop offset="50%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#34D399" />
            </linearGradient>
            <linearGradient id="iotGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
            <linearGradient id="shieldGrad" x1="50" y1="5" x2="50" y2="95" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ECFDF5" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#D1FAE5" stopOpacity="0.4" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="glow" />
              <feComposite in="SourceGraphic" in2="glow" operator="over" />
            </filter>
          </defs>

          {/* Outer Shield Hexagon Container */}
          <path
            d="M50 8 L85 24 V58 C85 75 50 92 50 92 C50 92 15 75 15 58 V24 L50 8 Z"
            fill="url(#shieldGrad)"
            stroke="#10B981"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* IoT Digital Circuit Lines in Background */}
          <path
            d="M24 38 H38 M38 38 L44 48 M44 48 H58 M58 48 L64 36 M64 36 H76"
            stroke="#0284C7"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="2 3"
            opacity="0.6"
          />
          <circle cx="24" cy="38" r="2.5" fill="#0284C7" />
          <circle cx="76" cy="36" r="2.5" fill="#0284C7" />
          <circle cx="50" cy="22" r="3" fill="#F59E0B" filter="url(#glow)" />
          <path d="M50 16 V28" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />

          {/* Central Sprouting Emerald Leaf */}
          <path
            d="M50 82 C50 82 46 64 36 52 C26 40 32 26 48 24 C50 24 51 24 52 24 C68 26 74 40 64 52 C54 64 50 82 50 82 Z"
            fill="url(#leafGrad)"
          />

          {/* Leaf Central Vein and Micro-branches */}
          <path
            d="M50 80 V32"
            stroke="#064E3B"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M50 48 L40 40 M50 58 L42 52 M50 68 L44 64"
            stroke="#064E3B"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M50 44 L60 38 M50 54 L58 50 M50 64 L56 62"
            stroke="#064E3B"
            strokeWidth="1.8"
            strokeLinecap="round"
          />

          {/* Wi-Fi / IoT Broadcast Waves at Tip */}
          <path
            d="M38 18 C45 13 55 13 62 18"
            stroke="#10B981"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.85"
          />
          <path
            d="M32 12 C43 6 57 6 68 12"
            stroke="#34D399"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.65"
          />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-slate-900 flex items-center">
              Agri<span className="text-emerald-600">Care</span>
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 uppercase tracking-wider">
              2026 AI
            </span>
          </div>
          <span className="text-[11px] sm:text-xs font-semibold text-slate-500 tracking-wide">
            Sudarshana Agri_Care Model
          </span>
        </div>
      )}
    </div>
  );
}
