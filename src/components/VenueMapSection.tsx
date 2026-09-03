import React, { useState } from 'react';
import { MapPin, ExternalLink, Navigation, Copy, Check, Car, Phone, Info } from 'lucide-react';
import { WeddingData } from '../types';
import { GoldFlourishDivider } from './FloralDecorations';

interface VenueMapSectionProps {
  data: WeddingData;
}

export const VenueMapSection: React.FC<VenueMapSectionProps> = ({ data }) => {
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(`${data.venueName}, ${data.venueAddress}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Construct standard embedded map query
  const mapSearchQuery = encodeURIComponent(`${data.venueName}, ${data.venueAddress}`);
  const embedUrl = `https://maps.google.com/maps?q=${mapSearchQuery}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
  const externalGoogleMapsUrl = data.googleMapsUrl || `https://maps.google.com/?q=${mapSearchQuery}`;
  const wazeUrl = `https://waze.com/ul?q=${mapSearchQuery}`;

  return (
    <section id="venue-map-section" className="relative py-16 px-4 max-w-5xl mx-auto z-10">
      <div className="text-center mb-10">
        <p className="text-[#d4af37] uppercase tracking-[0.3em] text-xs font-sans font-bold mb-2">
          ლოკაცია და რუკა
        </p>
        <h2 className="text-2xl sm:text-4xl text-[#5d4037] font-light tracking-tight">
          სად იმართება ქორწილი?
        </h2>
        <div className="w-24 h-px bg-[#d4af37] my-3 mx-auto"></div>
        <p className="font-serif text-sm text-[#8d7770] max-w-lg mx-auto">
          გვეწვიეთ ულამაზეს ისტორიულ გარემოში, სადაც შევხვდებით და ერთად გავატარებთ ამ დაუვიწყარ საღამოს
        </p>
      </div>

      <div className="bg-white/40 backdrop-blur-sm rounded-3xl border border-[#fbcfe8] shadow-sm overflow-hidden">
        {/* Venue Info Header */}
        <div className="p-6 sm:p-10 border-b border-[#fbcfe8]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-wider text-[#d4af37] bg-[#fdf6f0] px-3 py-1 rounded-lg border border-[#fbcfe8]/60 mb-2">
                <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>მთავარი ლოკაცია და რესტორანი</span>
              </div>
              <h3 className="font-sans text-xl sm:text-3xl font-bold text-[#5d4037] mb-2">
                {data.venueName}
              </h3>
              <p className="font-serif text-sm sm:text-base text-[#8d7770] flex items-center gap-2">
                <span>{data.venueAddress}</span>
              </p>
            </div>

            {/* Quick Action Navigation Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                id="copy-address-button"
                type="button"
                onClick={copyAddress}
                className="px-4 py-2.5 rounded-xl bg-white/80 hover:bg-white text-[#5d4037] text-xs sm:text-sm font-sans font-medium border border-[#fbcfe8] transition-all flex items-center gap-2 shadow-xs"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">კოპირებულია!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>მისამართის კოპირება</span>
                  </>
                )}
              </button>

              <a
                id="open-google-maps-btn"
                href={externalGoogleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-[#5d4037] text-white text-xs sm:text-sm font-sans uppercase tracking-wider hover:bg-[#4a352e] shadow-sm transition-all flex items-center gap-2"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Google Maps-ში გახსნა</span>
              </a>

              <a
                id="open-waze-btn"
                href={wazeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-[#d4af37] text-white text-xs sm:text-sm font-sans uppercase tracking-wider hover:bg-[#c4a02c] shadow-sm transition-all flex items-center gap-2"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Waze ნავიგაცია</span>
              </a>
            </div>
          </div>
        </div>

        {/* Embedded Google Map */}
        <div className="relative w-full h-[360px] sm:h-[450px] bg-[#EAE4DC]">
          <iframe
            id="google-maps-iframe"
            title="Wedding Venue Location Map"
            src={embedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full filter contrast-[1.02] grayscale-[15%]"
          ></iframe>

          {/* Floating location card overlay */}
          <div className="absolute top-4 left-4 max-w-xs bg-white/95 backdrop-blur-md rounded-xl p-3.5 border border-[#fbcfe8] shadow-md hidden sm:block">
            <div className="flex items-center gap-2 text-xs font-sans text-[#d4af37] font-bold mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{data.venueName}</span>
            </div>
            <p className="text-[11px] font-serif text-[#8d7770]">
              თბილისიდან ავტომობილით დაახლოებით 35-40 წუთის სავალზე
            </p>
          </div>
        </div>

        {/* Venue Helpful Information Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#fbcfe8] bg-[#fdf6f0]/50">
          <div className="p-5 flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-white text-[#d4af37] shrink-0 border border-[#fbcfe8]">
              <Car className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-sans text-xs sm:text-sm font-bold text-[#5d4037] mb-1">
                უფასო პარკინგი
              </h4>
              <p className="text-xs font-serif text-[#8d7770] leading-relaxed">
                შატოს ტერიტორიაზე უზრუნველყოფილია ფართო დაცული პარკინგი ყველა სტუმრისთვის.
              </p>
            </div>
          </div>

          <div className="p-5 flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-white text-[#d4af37] shrink-0 border border-[#fbcfe8]">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-sans text-xs sm:text-sm font-bold text-[#5d4037] mb-1">
                ორგანიზატორის კონტაქტი
              </h4>
              <p className="text-xs font-serif text-[#8d7770] leading-relaxed">
                ნებისმიერი შეკითხვის შემთხვევაში დაგვიკავშირდით: +995 599 00 00 00
              </p>
            </div>
          </div>

          <div className="p-5 flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-white text-[#d4af37] shrink-0 border border-[#fbcfe8]">
              <Info className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-sans text-xs sm:text-sm font-bold text-[#5d4037] mb-1">
                ტრანსპორტირება
              </h4>
              <p className="text-xs font-serif text-[#8d7770] leading-relaxed">
                ცერემონიის შემდეგ სვეტიცხოვლიდან რესტორნამდე მოძრაობს სპეციალური მიკროავტობუსი.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
