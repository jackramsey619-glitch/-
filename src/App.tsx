/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { WeddingData, GuestComment, RsvpEntry } from './types';
import { INITIAL_WEDDING_DATA, INITIAL_GUEST_COMMENTS } from './data/initialData';
import { AudioPlayer } from './components/AudioPlayer';
import { HeroSection } from './components/HeroSection';
import { InvitationText } from './components/InvitationText';
import { TimelineSection } from './components/TimelineSection';
import { VenueMapSection } from './components/VenueMapSection';
import { PhotoGallery } from './components/PhotoGallery';
import { WishesSection } from './components/WishesSection';
import { RsvpModal } from './components/RsvpModal';
import { EditModal } from './components/EditModal';
import { Footer } from './components/Footer';
import { FloralCornerTopLeft, FloralCornerTopRight } from './components/FloralDecorations';
import { Sparkles, Flower2 } from 'lucide-react';

const STORAGE_KEY_WEDDING = 'wedding_invitation_data_v1';
const STORAGE_KEY_COMMENTS = 'wedding_invitation_comments_v1';
const STORAGE_KEY_RSVP = 'wedding_invitation_rsvps_v1';

export default function App() {
  // Wedding details state with LocalStorage persistence
  const [weddingData, setWeddingData] = useState<WeddingData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_WEDDING);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return INITIAL_WEDDING_DATA;
  });

  // Guest comments state with LocalStorage persistence
  const [comments, setComments] = useState<GuestComment[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_COMMENTS);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return INITIAL_GUEST_COMMENTS;
  });

  // RSVP submissions state
  const [rsvps, setRsvps] = useState<RsvpEntry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_RSVP);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return [];
  });

  // Modals state
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [showPetals, setShowPetals] = useState(true);

  // Sync weddingData to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_WEDDING, JSON.stringify(weddingData));
    } catch {
      // ignore
    }
  }, [weddingData]);

  // Sync comments to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_COMMENTS, JSON.stringify(comments));
    } catch {
      // ignore
    }
  }, [comments]);

  // Sync rsvps to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_RSVP, JSON.stringify(rsvps));
    } catch {
      // ignore
    }
  }, [rsvps]);

  // Handlers
  const handleSaveWeddingData = (newData: WeddingData) => {
    setWeddingData(newData);
  };

  const handleAddComment = (newCommentData: Omit<GuestComment, 'id' | 'timestamp' | 'likes'>) => {
    const newComment: GuestComment = {
      id: `w-${Date.now()}`,
      author: newCommentData.author,
      relation: newCommentData.relation,
      text: newCommentData.text,
      badge: newCommentData.badge,
      timestamp: 'ახლახანს',
      likes: 1,
    };
    setComments((prev) => [newComment, ...prev]);
  };

  const handleLikeComment = (id: string) => {
    setComments((prev) =>
      prev.map((item) => (item.id === id ? { ...item, likes: item.likes + 1 } : item))
    );
  };

  const handleRsvpSubmit = (entry: Omit<RsvpEntry, 'id' | 'createdAt'>) => {
    const newRsvp: RsvpEntry = {
      ...entry,
      id: `rsvp-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setRsvps((prev) => [newRsvp, ...prev]);
  };

  return (
    <div className="relative min-h-screen bg-[#fdf6f0] text-[#4a3a35] font-serif-georgian selection:bg-[#fbcfe8] selection:text-[#5d4037] overflow-x-hidden">
      {/* Sleek Interface Ambient Petal Curves and Soft Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Sleek design signature curved petal shapes */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg" className="absolute -top-24 -left-24 w-96 h-96 fill-[#fbcfe8]">
            <path d="M400 0c50 100 150 100 200 200s0 150-100 200-150 0-200-100-100-150-50-200S350-100 400 0z"/>
          </svg>
          <svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg" className="absolute top-1/2 -left-32 w-80 h-80 fill-[#fbcfe8] opacity-60">
            <path d="M400 0c50 100 150 100 200 200s0 150-100 200-150 0-200-100-100-150-50-200S350-100 400 0z"/>
          </svg>
          <svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg" className="absolute -bottom-24 -right-24 w-96 h-96 fill-[#fbcfe8] rotate-180">
            <path d="M400 0c50 100 150 100 200 200s0 150-100 200-150 0-200-100-100-150-50-200S350-100 400 0z"/>
          </svg>
        </div>

        {/* Soft blush & champagne watercolor washes */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#fbcfe8]/30 blur-3xl"></div>
        <div className="absolute top-1/3 -right-24 w-96 h-96 rounded-full bg-[#fdf6f0]/70 blur-3xl"></div>
        <div className="absolute top-2/3 -left-48 w-80 h-80 rounded-full bg-[#fbcfe8]/25 blur-3xl"></div>
      </div>

      {/* Top Left Watercolor Floral Corner */}
      <FloralCornerTopLeft className="fixed top-0 left-0 w-44 sm:w-64 md:w-72 h-auto z-10 pointer-events-none opacity-80" />

      {/* Top Right Watercolor Floral Corner */}
      <FloralCornerTopRight className="fixed top-0 right-0 w-44 sm:w-64 md:w-72 h-auto z-10 pointer-events-none opacity-80" />

      {/* Optional Soft Falling Petals Effect */}
      {showPetals && (
        <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float opacity-40"
              style={{
                top: `${(i * 12) % 95}%`,
                left: `${(i * 11 + 4) % 94}%`,
                animationDuration: `${7 + (i % 5) * 2}s`,
                animationDelay: `${i * 0.8}s`,
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2C7 8 4 14 12 22C20 14 17 8 12 2Z"
                  fill={i % 2 === 0 ? '#fbcfe8' : '#f472b6'}
                  fillOpacity="0.5"
                />
              </svg>
            </div>
          ))}
        </div>
      )}

      {/* Ambient Falling Petals Toggle Control (Top-right pill) */}
      <button
        type="button"
        onClick={() => setShowPetals(!showPetals)}
        title={showPetals ? 'ვარდის ფურცლების გამორთვა' : 'ვარდის ფურცლების ჩართვა'}
        className="fixed top-4 right-4 z-40 p-2 rounded-full bg-white/80 hover:bg-white text-[#8d7770] hover:text-[#d4af37] border border-[#fbcfe8] shadow-xs transition-all backdrop-blur-xs hidden sm:flex items-center gap-1.5 text-xs font-serif-georgian"
      >
        <Flower2 className="w-3.5 h-3.5 text-[#d4af37]" />
        <span>{showPetals ? 'ფურცლები ჩართულია' : 'ფურცლების ჩართვა'}</span>
      </button>

      {/* Floating Background Wedding Music Player */}
      <AudioPlayer />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* 1. Hero Section: Couple Names, Date, Chateau illustration, Countdown */}
        <HeroSection
          data={weddingData}
          onOpenRsvp={() => setIsRsvpOpen(true)}
          onOpenEdit={() => setIsEditOpen(true)}
        />

        {/* 2. Romantic Invitation Letter / Greeting Text */}
        <InvitationText data={weddingData} />

        {/* 3. Timeline / Schedule: Civil Registry, Church Ceremony, Restaurant, Cake */}
        <TimelineSection items={weddingData.timeline} />

        {/* 4. Wedding Venue & Google Maps Integration */}
        <VenueMapSection data={weddingData} />

        {/* 5. Couple's Photo Gallery & Carousel Lightbox */}
        <PhotoGallery photos={weddingData.photos} />

        {/* 6. Guest Comments / Wishes Section (Interactive form + scrolling list) */}
        <WishesSection
          comments={comments}
          onAddComment={handleAddComment}
          onLikeComment={handleLikeComment}
        />
      </main>

      {/* Footer with Couple Monogram and Love Quote */}
      <Footer data={weddingData} />

      {/* RSVP Modal */}
      <RsvpModal
        isOpen={isRsvpOpen}
        onClose={() => setIsRsvpOpen(false)}
        onSubmitRsvp={handleRsvpSubmit}
      />

      {/* Couple Customization Modal */}
      <EditModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        data={weddingData}
        onSave={handleSaveWeddingData}
      />
    </div>
  );
}
