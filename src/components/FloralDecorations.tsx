import React from 'react';

export const FloralCornerTopLeft: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    className={`pointer-events-none select-none ${className}`}
    viewBox="0 0 320 320"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g opacity="0.85">
      {/* Soft watercolor blush petals */}
      <circle cx="90" cy="90" r="70" fill="url(#blush-grad-1)" filter="blur(16px)" opacity="0.6" />
      <circle cx="160" cy="60" r="50" fill="url(#peach-grad)" filter="blur(14px)" opacity="0.5" />
      <circle cx="60" cy="170" r="55" fill="url(#sage-grad)" filter="blur(16px)" opacity="0.4" />

      {/* Gold Foliage & Flourish Vines */}
      <path
        d="M10 20C40 25 110 50 140 120C155 155 160 210 120 260C100 285 70 300 20 310"
        stroke="#D4AF37"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M20 10C50 40 85 100 85 170C85 220 50 260 10 280"
        stroke="#D4AF37"
        strokeWidth="1.2"
        strokeDasharray="4 4"
        opacity="0.4"
      />

      {/* Delicate Stylized Botanical Leaves */}
      <path
        d="M140 120C170 110 195 125 200 150C175 155 150 140 140 120Z"
        fill="#98A78D"
        fillOpacity="0.45"
        stroke="#7A8B70"
        strokeWidth="0.8"
      />
      <path
        d="M110 70C130 50 160 55 170 80C145 85 125 80 110 70Z"
        fill="#DDB6A4"
        fillOpacity="0.5"
      />
      <path
        d="M70 135C65 165 45 180 25 180C30 150 50 140 70 135Z"
        fill="#98A78D"
        fillOpacity="0.4"
      />

      {/* Main Rose / Peony Flower */}
      <g transform="translate(85, 85)">
        <circle cx="0" cy="0" r="32" fill="#F8E5DC" opacity="0.9" />
        <path
          d="M-22 5C-15 25 15 25 22 5C10 32 -10 32 -22 5Z"
          fill="#E8C3B4"
          opacity="0.85"
        />
        <path
          d="M-18 -10C-5 -25 15 -20 20 -5C12 -18 -8 -20 -18 -10Z"
          fill="#DDB6A4"
          opacity="0.8"
        />
        <circle cx="0" cy="0" r="14" fill="#E8BBA8" />
        <circle cx="0" cy="0" r="6" fill="#D4AF37" opacity="0.8" />
      </g>

      {/* Smaller Bud Flower */}
      <g transform="translate(170, 65)">
        <circle cx="0" cy="0" r="20" fill="#FCECE5" opacity="0.85" />
        <path
          d="M-10 0C-5 12 8 12 12 0C6 14 -4 14 -10 0Z"
          fill="#E6BEAF"
        />
        <circle cx="0" cy="0" r="4" fill="#D4AF37" opacity="0.7" />
      </g>
    </g>

    <defs>
      <linearGradient id="blush-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FDEAE1" />
        <stop offset="100%" stopColor="#E9BCA8" />
      </linearGradient>
      <linearGradient id="peach-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF2EB" />
        <stop offset="100%" stopColor="#E5C7B7" />
      </linearGradient>
      <linearGradient id="sage-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#D9E3D3" />
        <stop offset="100%" stopColor="#9BB090" />
      </linearGradient>
    </defs>
  </svg>
);

export const FloralCornerTopRight: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`transform scale-x-[-1] ${className}`}>
    <FloralCornerTopLeft />
  </div>
);

export const ChateauIllustration: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`relative flex justify-center items-center ${className}`}>
    <svg
      viewBox="0 0 800 240"
      className="w-full h-auto max-w-3xl opacity-85"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Distant soft mountains / hills */}
      <path
        d="M0 200C120 185 240 195 380 180C520 165 660 190 800 195V240H0V200Z"
        fill="#EFE8DD"
        opacity="0.5"
      />
      
      {/* Chateau Mukhrani Romantic Silhouette / Facade with arches and spires */}
      <g stroke="#C2A882" strokeWidth="1.2" fill="#FAF6EE" strokeLinejoin="round">
        {/* Central grand palace pavilion */}
        <rect x="330" y="100" width="140" height="95" rx="2" fill="#FDFBF7" />
        <polygon points="330,100 400,45 470,100" fill="#F7EFE1" />
        {/* Crest & Spire */}
        <line x1="400" y1="45" x2="400" y2="20" stroke="#D4AF37" strokeWidth="2" />
        <polygon points="400,20 408,26 400,32" fill="#D4AF37" />

        {/* Central clock / monogram window */}
        <circle cx="400" cy="80" r="12" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="1.5" />
        <path d="M397 76L400 80L404 78" stroke="#D4AF37" strokeWidth="1.2" strokeLinecap="round" />

        {/* Grand Palace Balcony & Columns */}
        <rect x="350" y="125" width="100" height="40" fill="#FFFFFF" stroke="#C2A882" strokeWidth="0.8" />
        <line x1="365" y1="125" x2="365" y2="165" />
        <line x1="380" y1="125" x2="380" y2="165" />
        <line x1="400" y1="125" x2="400" y2="165" />
        <line x1="420" y1="125" x2="420" y2="165" />
        <line x1="435" y1="125" x2="435" y2="165" />

        {/* Main Portal Arches */}
        <path d="M385 195V172C385 165 415 165 415 172V195" fill="#E8D5C4" stroke="#A68360" />

        {/* Left Wing & Tower */}
        <rect x="220" y="120" width="110" height="75" fill="#FAF5ED" />
        <polygon points="220,120 275,85 330,120" fill="#F4EADB" />
        {/* Left Turret */}
        <rect x="180" y="90" width="40" height="105" fill="#FDFBF7" />
        <polygon points="180,90 200,40 220,90" fill="#EEDFC9" stroke="#BFA175" />
        <line x1="200" y1="40" x2="200" y2="25" stroke="#D4AF37" strokeWidth="1.5" />

        {/* Right Wing & Tower */}
        <rect x="470" y="120" width="110" height="75" fill="#FAF5ED" />
        <polygon points="470,120 525,85 580,120" fill="#F4EADB" />
        {/* Right Turret */}
        <rect x="580" y="90" width="40" height="105" fill="#FDFBF7" />
        <polygon points="580,90 600,40 620,90" fill="#EEDFC9" stroke="#BFA175" />
        <line x1="600" y1="40" x2="600" y2="25" stroke="#D4AF37" strokeWidth="1.5" />

        {/* Delicate window rows */}
        <g fill="#EBDDCF" stroke="none">
          <rect x="240" y="135" width="14" height="22" rx="7" />
          <rect x="270" y="135" width="14" height="22" rx="7" />
          <rect x="300" y="135" width="14" height="22" rx="7" />

          <rect x="486" y="135" width="14" height="22" rx="7" />
          <rect x="516" y="135" width="14" height="22" rx="7" />
          <rect x="546" y="135" width="14" height="22" rx="7" />

          {/* Turret Windows */}
          <rect x="193" y="115" width="14" height="22" rx="7" />
          <rect x="593" y="115" width="14" height="22" rx="7" />
        </g>

        {/* Terrace Balustrade & Garden Lawn */}
        <line x1="140" y1="195" x2="660" y2="195" stroke="#A68360" strokeWidth="2" />
        <path d="M120 195C220 190 580 190 680 195C720 197 780 205 800 215V240H0V215C20 205 80 197 120 195Z" fill="#F0EAE1" stroke="none" />

        {/* Italian Garden Cypress & Rose Bushes */}
        <ellipse cx="150" cy="180" rx="14" ry="35" fill="#95A88B" stroke="#7A8E71" />
        <ellipse cx="650" cy="180" rx="14" ry="35" fill="#95A88B" stroke="#7A8E71" />
        <ellipse cx="130" cy="192" rx="18" ry="16" fill="#ADC2A3" stroke="#8EA483" />
        <ellipse cx="670" cy="192" rx="18" ry="16" fill="#ADC2A3" stroke="#8EA483" />

        {/* Subtle Garden Fountain in foreground */}
        <path d="M375 225C375 212 425 212 425 225V235H375V225Z" fill="#FFFFFF" stroke="#C2A882" />
        <ellipse cx="400" cy="214" rx="22" ry="5" fill="#E8F1F2" stroke="#9BB5B9" />
        <path d="M400 214C398 202 402 202 400 195C396 200 404 200 400 214Z" fill="#B3D0D5" opacity="0.8" />
      </g>
    </svg>
    
    {/* Subtle romantic ambient lighting behind palace */}
    <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#F7EFE8]/30 to-transparent pointer-events-none"></div>
  </div>
);

export const GoldFlourishDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center justify-center gap-3 my-6 ${className}`}>
    <span className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent via-[#D4AF37] to-[#D4AF37] opacity-60"></span>
    <div className="flex items-center gap-1.5 text-[#D4AF37]">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="#D4AF37" fillOpacity="0.25" />
      </svg>
      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="#D4AF37" fillOpacity="0.25" />
      </svg>
    </div>
    <span className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent via-[#D4AF37] to-[#D4AF37] opacity-60"></span>
  </div>
);

export const MonogramWreath: React.FC<{
  initials: string;
  className?: string;
}> = ({ initials, className = '' }) => (
  <div className={`relative inline-flex items-center justify-center ${className}`}>
    <svg width="140" height="140" viewBox="0 0 140 140" fill="none" className="w-24 h-24 sm:w-28 sm:h-28">
      {/* Outer subtle ring */}
      <circle cx="70" cy="70" r="62" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
      <circle cx="70" cy="70" r="56" stroke="#C59B27" strokeWidth="1.2" opacity="0.75" />

      {/* Laurel leaves wreath */}
      <g stroke="#A68325" strokeWidth="1" fill="#F3E5AB" fillOpacity="0.6">
        {/* Left Arc leaves */}
        <path d="M70 126 C40 126 18 100 18 70 C18 40 40 14 70 14" stroke="#D4AF37" strokeWidth="1.5" fill="none" />
        <ellipse cx="26" cy="45" rx="5" ry="3" transform="rotate(-30 26 45)" />
        <ellipse cx="20" cy="70" rx="5" ry="3" transform="rotate(0 20 70)" />
        <ellipse cx="28" cy="95" rx="5" ry="3" transform="rotate(30 28 95)" />
        <ellipse cx="46" cy="116" rx="5" ry="3" transform="rotate(50 46 116)" />
        <ellipse cx="46" cy="24" rx="5" ry="3" transform="rotate(-50 46 24)" />

        {/* Right Arc leaves */}
        <path d="M70 126 C100 126 122 100 122 70 C122 40 100 14 70 14" stroke="#D4AF37" strokeWidth="1.5" fill="none" />
        <ellipse cx="114" cy="45" rx="5" ry="3" transform="rotate(30 114 45)" />
        <ellipse cx="120" cy="70" rx="5" ry="3" transform="rotate(0 120 70)" />
        <ellipse cx="112" cy="95" rx="5" ry="3" transform="rotate(-30 112 95)" />
        <ellipse cx="94" cy="116" rx="5" ry="3" transform="rotate(-50 94 116)" />
        <ellipse cx="94" cy="24" rx="5" ry="3" transform="rotate(50 94 24)" />
      </g>
    </svg>
    <div className="absolute inset-0 flex items-center justify-center">
      <span className="font-script text-3xl sm:text-4xl text-[#A68325] tracking-widest pl-1 select-none">
        {initials}
      </span>
    </div>
  </div>
);
