import React, { useState } from 'react';
import { X, Save, RotateCcw, Plus, Trash2, Image, Calendar, MapPin, Clock } from 'lucide-react';
import { WeddingData, TimelineItem, PhotoItem } from '../types';
import { INITIAL_WEDDING_DATA } from '../data/initialData';
import { GoldFlourishDivider } from './FloralDecorations';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: WeddingData;
  onSave: (newData: WeddingData) => void;
}

export const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  data,
  onSave,
}) => {
  const [formData, setFormData] = useState<WeddingData>(data);
  const [activeTab, setActiveTab] = useState<'couple' | 'venue' | 'timeline' | 'photos'>('couple');
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newPhotoCaption, setNewPhotoCaption] = useState('');

  if (!isOpen) return null;

  const handleChange = (field: keyof WeddingData, value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTimelineChange = (index: number, field: keyof TimelineItem, value: string) => {
    setFormData((prev) => {
      const updated = [...prev.timeline];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, timeline: updated };
    });
  };

  const handleAddPhoto = () => {
    if (!newPhotoUrl.trim()) return;
    const newPhoto: PhotoItem = {
      id: `photo-${Date.now()}`,
      url: newPhotoUrl.trim(),
      caption: newPhotoCaption.trim() || 'ჩვენი ბედნიერი წამი',
      featured: false,
    };
    setFormData((prev) => ({
      ...prev,
      photos: [...prev.photos, newPhoto],
    }));
    setNewPhotoUrl('');
    setNewPhotoCaption('');
  };

  const handleDeletePhoto = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((p) => p.id !== id),
    }));
  };

  const handleResetDefaults = () => {
    if (window.confirm('დარწმუნებული ხართ, რომ გსურთ ნაგულისხმევი მონაცემების აღდგენა?')) {
      setFormData(INITIAL_WEDDING_DATA);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div
      id="edit-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#fffdfb] rounded-3xl p-6 sm:p-8 border-8 border-white shadow-2xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#fbcfe8]">
          <div>
            <h2 className="text-xl sm:text-2xl text-[#5d4037] font-light tracking-tight">
              მოსაწვევის პერსონალიზაცია
            </h2>
            <p className="font-serif text-xs text-[#8d7770]">
              შეცვალეთ სახელები, თარიღი, ლოკაცია, განრიგი და ფოტოები
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-white/80 hover:bg-white text-[#8d7770] border border-[#fbcfe8] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 py-3 border-b border-[#fbcfe8] overflow-x-auto text-xs font-sans">
          <button
            type="button"
            onClick={() => setActiveTab('couple')}
            className={`px-3.5 py-1.5 rounded-lg transition-all shrink-0 font-sans text-xs ${
              activeTab === 'couple'
                ? 'bg-[#5d4037] text-white font-bold shadow-xs'
                : 'bg-white/70 text-[#8d7770] border border-[#fbcfe8] hover:bg-white'
            }`}
          >
            წყვილი და თარიღი
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('venue')}
            className={`px-3.5 py-1.5 rounded-lg transition-all shrink-0 font-sans text-xs ${
              activeTab === 'venue'
                ? 'bg-[#5d4037] text-white font-bold shadow-xs'
                : 'bg-white/70 text-[#8d7770] border border-[#fbcfe8] hover:bg-white'
            }`}
          >
            ადგილმდებარეობა (Venue)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('timeline')}
            className={`px-3.5 py-1.5 rounded-lg transition-all shrink-0 font-sans text-xs ${
              activeTab === 'timeline'
                ? 'bg-[#5d4037] text-white font-bold shadow-xs'
                : 'bg-white/70 text-[#8d7770] border border-[#fbcfe8] hover:bg-white'
            }`}
          >
            განრიგი (Timeline)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('photos')}
            className={`px-3.5 py-1.5 rounded-lg transition-all shrink-0 font-sans text-xs ${
              activeTab === 'photos'
                ? 'bg-[#5d4037] text-white font-bold shadow-xs'
                : 'bg-white/70 text-[#8d7770] border border-[#fbcfe8] hover:bg-white'
            }`}
          >
            ფოტო გალერეა
          </button>
        </div>

        {/* Scrollable Form Content */}
        <div className="overflow-y-auto py-4 flex-1 space-y-4 pr-1 font-sans text-xs">
          {/* TAB 1: COUPLE & DATE */}
          {activeTab === 'couple' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-sans text-[#8d7770] mb-1">
                    პატარძლის სახელი *
                  </label>
                  <input
                    type="text"
                    value={formData.brideName}
                    onChange={(e) => handleChange('brideName', e.target.value)}
                    className="w-full bg-white/70 border border-[#fbcfe8] rounded-lg p-2 focus:outline-none focus:border-[#d4af37] text-xs font-sans text-[#4a3a35]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-sans text-[#8d7770] mb-1">
                    სიძის სახელი *
                  </label>
                  <input
                    type="text"
                    value={formData.groomName}
                    onChange={(e) => handleChange('groomName', e.target.value)}
                    className="w-full bg-white/70 border border-[#fbcfe8] rounded-lg p-2 focus:outline-none focus:border-[#d4af37] text-xs font-sans text-[#4a3a35]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-sans text-[#8d7770] mb-1">
                    ქორწილის თარიღი *
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleChange('date', e.target.value)}
                    className="w-full bg-white/70 border border-[#fbcfe8] rounded-lg p-2 focus:outline-none focus:border-[#d4af37] text-xs font-sans text-[#4a3a35]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-sans text-[#8d7770] mb-1">
                    დაწყების დრო (საათი) *
                  </label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => handleChange('time', e.target.value)}
                    className="w-full bg-white/70 border border-[#fbcfe8] rounded-lg p-2 focus:outline-none focus:border-[#d4af37] text-xs font-sans text-[#4a3a35]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-sans text-[#8d7770] mb-1">
                  მისალმების სათაური
                </label>
                <input
                  type="text"
                  value={formData.greetingTitle}
                  onChange={(e) => handleChange('greetingTitle', e.target.value)}
                  className="w-full bg-white/70 border border-[#fbcfe8] rounded-lg p-2 focus:outline-none focus:border-[#d4af37] text-xs font-sans text-[#4a3a35]"
                />
              </div>

              <div>
                <label className="block text-xs font-sans text-[#8d7770] mb-1">
                  მისასალმებელი წერილი სტუმრებს
                </label>
                <textarea
                  rows={3}
                  value={formData.welcomeMessage}
                  onChange={(e) => handleChange('welcomeMessage', e.target.value)}
                  className="w-full bg-white/70 border border-[#fbcfe8] rounded-lg p-2 focus:outline-none focus:border-[#d4af37] text-xs font-sans text-[#4a3a35] resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-sans text-[#8d7770] mb-1">
                  საყვარელი ციტატა
                </label>
                <input
                  type="text"
                  value={formData.loveQuote}
                  onChange={(e) => handleChange('loveQuote', e.target.value)}
                  className="w-full bg-white/70 border border-[#fbcfe8] rounded-lg p-2 focus:outline-none focus:border-[#d4af37] text-xs font-sans text-[#4a3a35]"
                />
              </div>

              <div>
                <label className="block text-xs font-sans text-[#8d7770] mb-1">
                  დრესკოდი (Dress code)
                </label>
                <input
                  type="text"
                  value={formData.dressCode}
                  onChange={(e) => handleChange('dressCode', e.target.value)}
                  className="w-full bg-white/70 border border-[#fbcfe8] rounded-lg p-2 focus:outline-none focus:border-[#d4af37] text-xs font-sans text-[#4a3a35]"
                />
              </div>
            </div>
          )}

          {/* TAB 2: VENUE & GOOGLE MAPS */}
          {activeTab === 'venue' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-sans text-[#8d7770] mb-1">
                  რესტორნის / ლოკაციის სახელი *
                </label>
                <input
                  type="text"
                  value={formData.venueName}
                  onChange={(e) => handleChange('venueName', e.target.value)}
                  className="w-full bg-white/70 border border-[#fbcfe8] rounded-lg p-2 focus:outline-none focus:border-[#d4af37] text-xs font-sans text-[#4a3a35]"
                />
              </div>

              <div>
                <label className="block text-xs font-sans text-[#8d7770] mb-1">
                  მისამართი (ქუჩა, სოფელი, რაიონი) *
                </label>
                <input
                  type="text"
                  value={formData.venueAddress}
                  onChange={(e) => handleChange('venueAddress', e.target.value)}
                  className="w-full bg-white/70 border border-[#fbcfe8] rounded-lg p-2 focus:outline-none focus:border-[#d4af37] text-xs font-sans text-[#4a3a35]"
                />
              </div>

              <div>
                <label className="block text-xs font-sans text-[#8d7770] mb-1">
                  Google Maps ბმული (სურვილისამებრ)
                </label>
                <input
                  type="url"
                  placeholder="https://maps.google.com/..."
                  value={formData.googleMapsUrl}
                  onChange={(e) => handleChange('googleMapsUrl', e.target.value)}
                  className="w-full bg-white/70 border border-[#fbcfe8] rounded-lg p-2 focus:outline-none focus:border-[#d4af37] text-xs font-sans text-[#4a3a35]"
                />
                <p className="text-[11px] text-[#8d7770] font-serif mt-1">
                  თუ ცარიელს დატოვებთ, რუკა ავტომატურად მოიძებნება ლოკაციისა და მისამართის მიხედვით.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: TIMELINE */}
          {activeTab === 'timeline' && (
            <div className="space-y-4">
              <p className="text-xs font-serif text-[#8d7770] mb-2">
                შეცვალეთ დროები და ადგილმდებარეობა ხელის მოწერის, ჯვრისწერისა და რესტორნისთვის:
              </p>

              {formData.timeline.map((item, index) => (
                <div
                  key={item.id || index}
                  className="p-4 bg-white/60 rounded-xl border border-[#fbcfe8] space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-sans font-bold text-[#d4af37]">
                      ეტაპი #{index + 1}: {item.title}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-sans text-[#8d7770] mb-1">
                        სათაური
                      </label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => handleTimelineChange(index, 'title', e.target.value)}
                        className="w-full bg-white/70 border border-[#fbcfe8] rounded-lg p-2 focus:outline-none focus:border-[#d4af37] text-xs font-sans text-[#4a3a35]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-sans text-[#8d7770] mb-1">
                        დრო
                      </label>
                      <input
                        type="text"
                        value={item.time}
                        onChange={(e) => handleTimelineChange(index, 'time', e.target.value)}
                        className="w-full bg-white/70 border border-[#fbcfe8] rounded-lg p-2 focus:outline-none focus:border-[#d4af37] text-xs font-sans text-[#4a3a35]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-sans text-[#8d7770] mb-1">
                        ადგილი (Location)
                      </label>
                      <input
                        type="text"
                        value={item.location}
                        onChange={(e) => handleTimelineChange(index, 'location', e.target.value)}
                        className="w-full bg-white/70 border border-[#fbcfe8] rounded-lg p-2 focus:outline-none focus:border-[#d4af37] text-xs font-sans text-[#4a3a35]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-sans text-[#8d7770] mb-1">
                        აღწერა
                      </label>
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => handleTimelineChange(index, 'description', e.target.value)}
                        className="w-full bg-white/70 border border-[#fbcfe8] rounded-lg p-2 focus:outline-none focus:border-[#d4af37] text-xs font-sans text-[#4a3a35]"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: PHOTOS */}
          {activeTab === 'photos' && (
            <div className="space-y-4">
              {/* Add New Photo */}
              <div className="p-4 bg-white/60 rounded-xl border border-[#fbcfe8] space-y-3">
                <span className="text-xs font-sans font-bold text-[#d4af37]">
                  ახალი ფოტოს დამატება
                </span>
                <div className="space-y-2">
                  <input
                    type="url"
                    placeholder="ფოტოს ბმული (Image URL)..."
                    value={newPhotoUrl}
                    onChange={(e) => setNewPhotoUrl(e.target.value)}
                    className="w-full bg-white/70 border border-[#fbcfe8] rounded-lg p-2 focus:outline-none focus:border-[#d4af37] text-xs font-sans text-[#4a3a35]"
                  />
                  <input
                    type="text"
                    placeholder="წარწერა (Caption)..."
                    value={newPhotoCaption}
                    onChange={(e) => setNewPhotoCaption(e.target.value)}
                    className="w-full bg-white/70 border border-[#fbcfe8] rounded-lg p-2 focus:outline-none focus:border-[#d4af37] text-xs font-sans text-[#4a3a35]"
                  />
                  <button
                    type="button"
                    onClick={handleAddPhoto}
                    className="px-4 py-2 rounded-lg bg-[#d4af37] text-white text-xs font-sans font-bold flex items-center gap-1.5 hover:bg-[#c4a02c] transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>გალერეაში დამატება</span>
                  </button>
                </div>
              </div>

              {/* Photo list */}
              <div className="grid grid-cols-2 gap-3">
                {formData.photos.map((photo) => (
                  <div
                    key={photo.id}
                    className="relative group rounded-xl overflow-hidden border border-[#fbcfe8] bg-white aspect-[4/3]"
                  >
                    <img
                      src={photo.url}
                      alt={photo.caption}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-between text-white text-[11px] font-sans">
                      <p className="line-clamp-2">{photo.caption}</p>
                      <button
                        type="button"
                        onClick={() => handleDeletePhoto(photo.id)}
                        className="self-end p-1.5 rounded-md bg-red-600/80 hover:bg-red-600 text-white transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-[#fbcfe8] flex items-center justify-between gap-3 font-sans">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="px-3.5 py-2 rounded-lg bg-white/70 hover:bg-white text-[#8d7770] text-xs border border-[#fbcfe8] transition-all flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">ნაგულისხმევის აღდგენა</span>
            <span className="sm:hidden">აღდგენა</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-white/70 hover:bg-white text-[#8d7770] text-xs border border-[#fbcfe8] transition-all"
            >
              გაუქმება
            </button>

            <button
              id="save-customization-btn"
              type="button"
              onClick={handleSave}
              className="px-5 py-2 rounded-lg bg-[#d4af37] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#c4a02c] shadow-xs transition-all flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>ცვლილებების შენახვა</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
