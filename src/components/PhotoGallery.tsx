import React, { useState } from 'react';
import { Camera, ChevronLeft, ChevronRight, X, Heart, Maximize2 } from 'lucide-react';
import { PhotoItem } from '../types';
import { GoldFlourishDivider } from './FloralDecorations';

interface PhotoGalleryProps {
  photos: PhotoItem[];
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos }) => {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setActivePhotoIndex(index);
  };

  const closeLightbox = () => {
    setActivePhotoIndex(null);
  };

  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex - 1 + photos.length) % photos.length);
    }
  };

  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex + 1) % photos.length);
    }
  };

  return (
    <section id="gallery-section" className="relative py-16 px-4 max-w-6xl mx-auto z-10">
      <div className="text-center mb-12">
        <p className="text-[#d4af37] uppercase tracking-[0.3em] text-xs font-sans font-bold mb-2">
          ჩვენი ისტორია
        </p>
        <h2 className="text-2xl sm:text-4xl text-[#5d4037] font-light tracking-tight">
          ფოტო გალერეა
        </h2>
        <div className="w-24 h-px bg-[#d4af37] my-3 mx-auto"></div>
        <p className="font-serif text-sm text-[#8d7770] max-w-md mx-auto">
          ჩვენი სიყვარულის ჯადოსნური მომენტები და მოგონებები, რომლებიც გულს სითბოთი ავსებს
        </p>
      </div>

      {/* Dynamic Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo, index) => {
          const isFeatured = photo.featured || index === 0;

          return (
            <div
              key={photo.id || index}
              id={`photo-card-${photo.id}`}
              onClick={() => openLightbox(index)}
              className={`group relative overflow-hidden rounded-2xl bg-white border border-[#fbcfe8] shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer hover:border-[#d4af37] ${
                isFeatured ? 'sm:col-span-2 lg:col-span-2 lg:row-span-1' : ''
              }`}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#fdf6f0]">
                <img
                  src={photo.url}
                  alt={photo.caption}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                {/* Delicate Gradient & Border Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div className="absolute inset-3 border border-white/40 rounded-xl pointer-events-none group-hover:border-[#d4af37] transition-colors"></div>

                {/* Hover Maximize Icon */}
                <div className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-xs text-[#5d4037] opacity-0 group-hover:opacity-100 transition-all transform scale-90 group-hover:scale-100">
                  <Maximize2 className="w-4 h-4 text-[#d4af37]" />
                </div>

                {/* Caption at Bottom */}
                <div className="absolute bottom-0 inset-x-0 p-5 text-white transform translate-y-1 group-hover:translate-y-0 transition-transform">
                  <div className="flex items-center gap-1.5 text-xs text-[#fbcfe8] font-sans font-semibold mb-1">
                    <Heart className="w-3 h-3 fill-[#d4af37] text-[#d4af37]" />
                    <span>ნინო & გიორგი</span>
                  </div>
                  <p className="font-serif text-sm sm:text-base font-medium drop-shadow-sm line-clamp-2">
                    {photo.caption}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox / Carousel Fullscreen Modal */}
      {activePhotoIndex !== null && (
        <div
          id="gallery-lightbox-modal"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            id="lightbox-close-button"
            type="button"
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors z-50"
            title="დახურვა"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev button */}
          <button
            id="lightbox-prev-button"
            type="button"
            onClick={showPrev}
            className="absolute left-4 sm:left-8 p-3 rounded-full bg-white/10 hover:bg-white/30 text-white transition-all z-50"
            title="წინა ფოტო"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next button */}
          <button
            id="lightbox-next-button"
            type="button"
            onClick={showNext}
            className="absolute right-4 sm:right-8 p-3 rounded-full bg-white/10 hover:bg-white/30 text-white transition-all z-50"
            title="შემდეგი ფოტო"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Active Image and Caption */}
          <div
            className="relative max-w-4xl max-h-[85vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photos[activePhotoIndex].url}
              alt={photos[activePhotoIndex].caption}
              referrerPolicy="no-referrer"
              className="max-h-[75vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl border border-white/20"
            />
            <div className="mt-4 text-center">
              <p className="font-serif text-base sm:text-lg text-[#fffdfb]">
                {photos[activePhotoIndex].caption}
              </p>
              <p className="font-sans text-xs text-[#fbcfe8] mt-1">
                {activePhotoIndex + 1} / {photos.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
