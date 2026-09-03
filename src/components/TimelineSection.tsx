import React from 'react';
import { Clock, MapPin, Feather, Church, Utensils, Sparkles, Cake } from 'lucide-react';
import { TimelineItem } from '../types';
import { GoldFlourishDivider } from './FloralDecorations';

interface TimelineSectionProps {
  items: TimelineItem[];
  onSelectLocation?: (location: string) => void;
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({ items }) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'civil':
        return <Feather className="w-5 h-5 text-[#d4af37]" />;
      case 'church':
        return <Church className="w-5 h-5 text-[#d4af37]" />;
      case 'reception':
        return <Utensils className="w-5 h-5 text-[#d4af37]" />;
      case 'cake':
        return <Cake className="w-5 h-5 text-[#d4af37]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#d4af37]" />;
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'civil':
        return 'ხელის მოწერა (Civil Registry)';
      case 'church':
        return 'ჯვრისწერა (Church Ceremony)';
      case 'reception':
        return 'რესტორანი (Reception)';
      case 'cake':
        return 'საზეიმო კულმინაცია';
      default:
        return 'ცერემონია';
    }
  };

  return (
    <section id="timeline-section" className="relative py-16 px-4 max-w-4xl mx-auto z-10">
      <div className="text-center mb-12">
        <p className="text-[#d4af37] uppercase tracking-[0.3em] text-xs font-sans font-bold mb-2">
          დღის პროგრამა
        </p>
        <h2 className="text-2xl sm:text-4xl text-[#5d4037] font-light tracking-tight">
          საქორწილო განრიგი
        </h2>
        <div className="w-24 h-px bg-[#d4af37] my-3 mx-auto"></div>
        <p className="font-serif text-sm text-[#8d7770] max-w-md mx-auto">
          გთხოვთ გაითვალისწინოთ დროები, რათა არ გამოგრჩეთ არცერთი ჯადოსნური მომენტი
        </p>
      </div>

      {/* Vertical Timeline container with central stem line */}
      <div className="relative">
        {/* Central connecting line */}
        <div className="absolute top-4 bottom-4 left-6 md:left-1/2 md:-ml-[1px] w-[2px] bg-gradient-to-b from-[#fbcfe8] via-[#d4af37] to-[#fbcfe8]"></div>

        <div className="space-y-8 sm:space-y-12">
          {items.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={item.id || index}
                id={`timeline-item-${item.id}`}
                className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Center marker / Icon circle */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10 flex items-center justify-center w-12 h-12 rounded-full bg-white border-2 border-[#d4af37] shadow-sm transition-transform hover:scale-110">
                  {getCategoryIcon(item.category)}
                </div>

                {/* Content Card matching Sleek Interface card */}
                <div
                  className={`w-full pl-16 md:pl-0 md:w-[calc(50%-2.5rem)] ${
                    isEven ? 'md:text-left' : 'md:text-right'
                  }`}
                >
                  <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 border border-[#fbcfe8] shadow-sm hover:shadow-md transition-all group hover:border-[#d4af37]">
                    {/* Category Label & Time Badge */}
                    <div
                      className={`flex flex-wrap items-center gap-2 mb-3 ${
                        isEven ? 'md:justify-start' : 'md:justify-end'
                      }`}
                    >
                      <span className="text-sm font-sans font-bold bg-[#fdf6f0] text-[#d4af37] px-3 py-1 rounded-lg border border-[#fbcfe8]/60 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                        <span>{item.time}</span>
                      </span>
                      <span className="text-[11px] font-sans font-semibold text-[#8d7770] uppercase tracking-wider bg-white/80 px-2.5 py-1 rounded-lg border border-[#fbcfe8]/40">
                        {getCategoryBadge(item.category)}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-sans text-base sm:text-lg font-bold text-[#5d4037] mb-1 group-hover:text-[#d4af37] transition-colors">
                      {item.title}
                    </h3>

                    {/* Location with address */}
                    <div
                      className={`flex items-start gap-1.5 text-xs sm:text-sm text-[#8d7770] mb-3 font-serif ${
                        isEven ? 'md:justify-start' : 'md:justify-end'
                      }`}
                    >
                      <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-[#4a3a35]">{item.location}</span>
                        {item.address && (
                          <span className="block text-[11px] text-[#8d7770]">
                            {item.address}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[#4a3a35]/90 font-serif leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Empty opposite spacer for desktop balance */}
                <div className="hidden md:block md:w-[calc(50%-2.5rem)]"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
