import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Heart, Sparkles, ChevronDown, Share2, Check } from 'lucide-react';
import { WeddingData } from '../types';
import { MonogramWreath, ChateauIllustration, GoldFlourishDivider } from './FloralDecorations';

interface HeroSectionProps {
  data: WeddingData;
  onOpenRsvp: () => void;
  onOpenEdit: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  data,
  onOpenRsvp,
  onOpenEdit,
}) => {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPassed: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date(`${data.date}T${data.time || '15:00'}:00`).getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPassed: false });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [data.date, data.time]);

  // Format date in Georgian
  const formatGeorgianDate = (dateStr: string) => {
    try {
      const months = [
        'იანვარი', 'თებერვალი', 'მარტი', 'აპრილი', 'მაისი', 'ივნისი',
        'ივლისი', 'აგვისტო', 'სექტემბერი', 'ოქტომბერი', 'ნოემბერი', 'დეკემბერი'
      ];
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      const day = d.getDate();
      const month = months[d.getMonth()];
      const year = d.getFullYear();
      return `${day} ${month}, ${year}`;
    } catch {
      return dateStr;
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${data.brideName} და ${data.groomName} - ქორწილის მოსაწვევი`,
        text: `სიყვარულით გეპატიჟებით ჩვენს ქორწილში: ${formatGeorgianDate(data.date)}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Google Calendar Link generator
  const getGoogleCalendarUrl = () => {
    const startDate = `${data.date.replace(/-/g, '')}T${data.time.replace(/:/g, '')}00`;
    const title = encodeURIComponent(`ქორწილი: ${data.brideName} & ${data.groomName}`);
    const details = encodeURIComponent(
      `გვეპატიჟებიან ქორწილში! ადგილი: ${data.venueName}. მისამართი: ${data.venueAddress}`
    );
    const location = encodeURIComponent(`${data.venueName}, ${data.venueAddress}`);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${startDate}&details=${details}&location=${location}`;
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between items-center px-4 pt-12 pb-16 overflow-hidden">
      {/* Top Floating Control Bar for Couple Customization & Share */}
      <div className="w-full max-w-4xl mx-auto flex justify-between items-center z-20 mb-4 px-2">
        <button
          id="hero-customize-button"
          type="button"
          onClick={onOpenEdit}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 hover:bg-white text-[#8d7770] hover:text-[#5d4037] text-xs font-sans border border-[#fbcfe8] shadow-sm transition-all hover:border-[#d4af37]"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>მონაცემების რედაქტირება</span>
        </button>

        <button
          id="hero-share-button"
          type="button"
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/80 hover:bg-white text-[#8d7770] hover:text-[#5d4037] text-xs font-sans border border-[#fbcfe8] shadow-sm transition-all hover:border-[#d4af37]"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700">დაკოპირებულია!</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>გაზიარება</span>
            </>
          )}
        </button>
      </div>

      {/* Main Sleek Invitation Card Container */}
      <div className="relative z-10 w-full max-w-2xl mx-auto bg-[#fffdfb] rounded-3xl p-6 sm:p-10 md:p-12 border-8 border-white shadow-xl text-center">
        {/* Decorative inner sleek border */}
        <div className="absolute inset-3 sm:inset-4 border border-[#fbcfe8] rounded-2xl pointer-events-none"></div>

        {/* Monogram Wreath */}
        <div className="mb-2">
          <MonogramWreath
            initials={`${data.brideName.charAt(0)} & ${data.groomName.charAt(0)}`}
          />
        </div>

        {/* Invitation Subtitle / Eyebrow */}
        <span className="text-[#d4af37] uppercase tracking-[0.3em] text-xs font-sans font-bold mb-2 block">
          {data.greetingTitle || 'ჩვენი ქორწილი'}
        </span>

        {/* Couple's Names: Sleek Regal Header */}
        <h1
          id="couple-names-header"
          className="text-4xl sm:text-5xl md:text-6xl text-[#5d4037] font-light tracking-tight leading-tight mb-2"
        >
          <span>{data.brideName}</span>
          <span className="text-3xl sm:text-4xl align-middle italic font-serif px-2 text-[#d4af37]">
            &
          </span>
          <span>{data.groomName}</span>
        </h1>

        {/* Thin Gold Divider Bar */}
        <div className="w-32 h-px bg-[#d4af37] mt-3 mb-4 mx-auto"></div>

        {/* Date & Time Badge */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 my-4 font-sans text-sm">
          <div className="flex items-center gap-1.5 bg-[#fdf6f0] text-[#d4af37] font-bold px-3.5 py-1.5 rounded-lg border border-[#fbcfe8]">
            <Calendar className="w-4 h-4 text-[#d4af37]" />
            <span>{formatGeorgianDate(data.date)}</span>
          </div>

          <div className="flex items-center gap-1.5 bg-[#fdf6f0] text-[#d4af37] font-bold px-3.5 py-1.5 rounded-lg border border-[#fbcfe8]">
            <Clock className="w-4 h-4 text-[#d4af37]" />
            <span>{data.time} საათი</span>
          </div>
        </div>

        {/* Venue Preview Pill */}
        <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#8d7770] font-serif max-w-md mx-auto mb-6">
          <MapPin className="w-4 h-4 text-[#d4af37] shrink-0" />
          <span className="truncate">{data.venueName}</span>
        </div>

        {/* Countdown Timer to the Wedding */}
        <div className="my-6 pt-5 border-t border-[#fbcfe8]/60">
          <p className="text-xs font-sans uppercase tracking-[0.2em] text-[#8d7770] font-semibold mb-3">
            {timeLeft.isPassed ? 'ქორწილის დღე დადგა!' : 'ქორწილამდე დარჩა:'}
          </p>

          <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-sm mx-auto">
            <div className="bg-[#fdf6f0] rounded-xl p-2.5 sm:p-3 border border-[#fbcfe8] shadow-xs">
              <span className="block font-sans text-xl sm:text-2xl font-bold text-[#5d4037]">
                {timeLeft.days}
              </span>
              <span className="text-[10px] sm:text-xs font-sans text-[#8d7770] uppercase">
                დღე
              </span>
            </div>

            <div className="bg-[#fdf6f0] rounded-xl p-2.5 sm:p-3 border border-[#fbcfe8] shadow-xs">
              <span className="block font-sans text-xl sm:text-2xl font-bold text-[#5d4037]">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs font-sans text-[#8d7770] uppercase">
                საათი
              </span>
            </div>

            <div className="bg-[#fdf6f0] rounded-xl p-2.5 sm:p-3 border border-[#fbcfe8] shadow-xs">
              <span className="block font-sans text-xl sm:text-2xl font-bold text-[#5d4037]">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs font-sans text-[#8d7770] uppercase">
                წუთი
              </span>
            </div>

            <div className="bg-[#fdf6f0] rounded-xl p-2.5 sm:p-3 border border-[#fbcfe8] shadow-xs">
              <span className="block font-sans text-xl sm:text-2xl font-bold text-[#d4af37]">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs font-sans text-[#8d7770] uppercase">
                წამი
              </span>
            </div>
          </div>
        </div>

        {/* Primary Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            id="hero-rsvp-trigger"
            type="button"
            onClick={onOpenRsvp}
            className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#5d4037] text-white font-sans text-xs uppercase tracking-widest hover:bg-[#4a352e] shadow-sm transition-colors flex items-center justify-center gap-2"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>დასწრების დადასტურება (RSVP)</span>
          </button>

          <a
            id="hero-add-calendar"
            href={getGoogleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#d4af37] text-white font-sans text-xs uppercase tracking-widest hover:bg-[#c4a02c] shadow-sm transition-colors flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4 text-white" />
            <span>კალენდარში დამატება</span>
          </a>
        </div>
      </div>

      {/* Chateau Palace Illustration at Bottom of Hero */}
      <div className="w-full max-w-4xl mx-auto mt-8 z-10">
        <ChateauIllustration className="animate-pulse-glow" />
      </div>

      {/* Scroll Down Indicator */}
      <div className="mt-4 flex flex-col items-center gap-1 z-10 text-[#8d7770]">
        <span className="text-[11px] font-sans tracking-[0.2em] uppercase font-medium">
          პროგრამა და დეტალები
        </span>
        <ChevronDown className="w-4 h-4 animate-bounce text-[#d4af37]" />
      </div>
    </section>
  );
};
