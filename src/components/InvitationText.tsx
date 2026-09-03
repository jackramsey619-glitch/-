import React from 'react';
import { Quote, Sparkles, HeartHandshake } from 'lucide-react';
import { WeddingData } from '../types';
import { GoldFlourishDivider } from './FloralDecorations';

interface InvitationTextProps {
  data: WeddingData;
}

export const InvitationText: React.FC<InvitationTextProps> = ({ data }) => {
  return (
    <section className="relative py-12 px-4 max-w-3xl mx-auto z-10">
      <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-8 sm:p-12 border border-[#fbcfe8] shadow-sm text-center relative overflow-hidden">
        {/* Subtle decorative quote icon in corner */}
        <Quote className="absolute top-6 left-6 w-10 h-10 text-[#fbcfe8]/40 rotate-180 pointer-events-none" />
        <Quote className="absolute bottom-6 right-6 w-10 h-10 text-[#fbcfe8]/40 pointer-events-none" />

        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#fdf6f0] border border-[#fbcfe8] text-[#d4af37] mb-3">
          <HeartHandshake className="w-5 h-5" />
        </div>

        <span className="text-[#d4af37] uppercase tracking-[0.3em] text-xs font-sans font-bold mb-1 block">
          მოწვევა
        </span>

        <h2 className="text-xl sm:text-3xl font-light text-[#5d4037] mb-2 tracking-tight">
          ძვირფასო სტუმრებო და მეგობრებო!
        </h2>

        <div className="w-24 h-px bg-[#d4af37] my-4 mx-auto"></div>

        <p className="font-serif text-base sm:text-lg leading-relaxed text-[#4a3a35] max-w-2xl mx-auto whitespace-pre-line">
          {data.welcomeMessage}
        </p>

        {/* Romantic quote */}
        {data.loveQuote && (
          <div className="mt-8 pt-6 border-t border-[#fbcfe8] max-w-xl mx-auto">
            <p className="italic font-serif text-sm sm:text-base text-[#8d7770]">
              „{data.loveQuote}“
            </p>
          </div>
        )}

        {/* Dress code banner */}
        {data.dressCode && (
          <div className="mt-6 inline-flex items-center gap-2 bg-[#fdf6f0] px-5 py-2.5 rounded-xl border border-[#fbcfe8] text-xs sm:text-sm text-[#5d4037] font-sans">
            <Sparkles className="w-4 h-4 text-[#d4af37]" />
            <span className="font-bold uppercase tracking-wider text-[11px] text-[#d4af37]">დრესკოდი:</span>
            <span>{data.dressCode}</span>
          </div>
        )}
      </div>
    </section>
  );
};
