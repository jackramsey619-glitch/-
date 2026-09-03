import React from 'react';
import { Heart, Sparkles, Share2 } from 'lucide-react';
import { WeddingData } from '../types';
import { MonogramWreath, GoldFlourishDivider } from './FloralDecorations';

interface FooterProps {
  data: WeddingData;
}

export const Footer: React.FC<FooterProps> = ({ data }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative mt-16 pb-20 pt-16 px-4 border-t border-[#fbcfe8] bg-[#fdf6f0] text-center z-10">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full border border-[#d4af37] flex items-center justify-center bg-white/60 shadow-xs">
            <span className="font-serif text-lg text-[#5d4037]">
              {data.brideName.charAt(0)} & {data.groomName.charAt(0)}
            </span>
          </div>
        </div>

        <div>
          <h3 className="text-2xl sm:text-3xl text-[#5d4037] font-light tracking-tight mb-1">
            {data.brideName} და {data.groomName}
          </h3>
          <p className="font-sans text-xs sm:text-sm text-[#d4af37] tracking-[0.25em] uppercase font-bold">
            {data.date} • {data.venueCity || 'საქართველო'}
          </p>
        </div>

        <div className="w-24 h-px bg-[#d4af37] my-2 mx-auto"></div>

        <p className="font-serif italic text-sm text-[#8d7770] max-w-md mx-auto">
          „სიყვარული არასოდეს მთავრდება. გმადლობთ, რომ ჩვენი ცხოვრების ამ ჯადოსნურ ნაწილს იზიარებთ.“
        </p>

        <div className="pt-4 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={scrollToTop}
            className="text-xs font-sans text-[#8d7770] hover:text-[#5d4037] transition-colors underline underline-offset-4"
          >
            დასაწყისში დაბრუნება ↑
          </button>
        </div>

        <p className="text-[11px] font-sans text-[#8d7770] pt-6">
          სიყვარულით შექმნილი ქორწილის ინტერაქტიული მოსაწვევი ✨
        </p>
      </div>
    </footer>
  );
};
