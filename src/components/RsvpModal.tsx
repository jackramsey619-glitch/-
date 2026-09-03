import React, { useState } from 'react';
import { X, Heart, Check, Users, Phone, User, Utensils } from 'lucide-react';
import { RsvpEntry } from '../types';
import { GoldFlourishDivider } from './FloralDecorations';

interface RsvpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitRsvp: (entry: Omit<RsvpEntry, 'id' | 'createdAt'>) => void;
}

export const RsvpModal: React.FC<RsvpModalProps> = ({ isOpen, onClose, onSubmitRsvp }) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'attending' | 'declined'>('attending');
  const [guestCount, setGuestCount] = useState<number>(1);
  const [dietary, setDietary] = useState('');
  const [wishes, setWishes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;

    onSubmitRsvp({
      fullName: fullName.trim(),
      phone: phone.trim(),
      status,
      guestCount: status === 'attending' ? guestCount : 0,
      dietary: dietary.trim(),
      wishes: wishes.trim(),
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div
      id="rsvp-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#fffdfb] rounded-3xl p-6 sm:p-8 border-8 border-white shadow-2xl max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          id="rsvp-close-btn"
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white text-[#8d7770] border border-[#fbcfe8] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-10 space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="font-sans text-2xl font-bold text-[#5d4037]">
              გმადლობთ პასუხისთვის!
            </h3>
            <p className="font-serif text-sm text-[#8d7770] max-w-xs mx-auto">
              თქვენი დასტური წარმატებით დაფიქსირდა. მოუთმენლად გელით ქორწილში! ❤️
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <span className="text-xs font-sans text-[#d4af37] uppercase tracking-[0.3em] font-bold block mb-1">
                RSVP
              </span>
              <h2 className="text-2xl sm:text-3xl text-[#5d4037] font-light tracking-tight">
                დასწრების დადასტურება
              </h2>
              <div className="w-20 h-px bg-[#d4af37] my-2 mx-auto"></div>
              <p className="font-serif text-xs sm:text-sm text-[#8d7770]">
                გთხოვთ გვაცნობოთ შეძლებთ თუ არა მობრძანებას
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
              {/* Attending status selector */}
              <div>
                <label className="block text-xs font-sans text-[#8d7770] mb-1.5">
                  შეძლებთ მობრძანებას? *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setStatus('attending')}
                    className={`py-2.5 px-4 rounded-xl font-sans text-xs font-bold border flex items-center justify-center gap-2 transition-all ${
                      status === 'attending'
                        ? 'bg-[#5d4037] text-white border-[#5d4037] shadow-xs'
                        : 'bg-white/70 text-[#5d4037] border-[#fbcfe8] hover:bg-white'
                    }`}
                  >
                    <Check className="w-4 h-4" />
                    <span>სიამოვნებით მოვალ(თ)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStatus('declined')}
                    className={`py-2.5 px-4 rounded-xl font-sans text-xs font-bold border flex items-center justify-center gap-2 transition-all ${
                      status === 'declined'
                        ? 'bg-[#8d7770] text-white border-[#8d7770] shadow-xs'
                        : 'bg-white/70 text-[#5d4037] border-[#fbcfe8] hover:bg-white'
                    }`}
                  >
                    <span>სამწუხაროდ ვერ შევძლებ</span>
                  </button>
                </div>
              </div>

              {/* Guest Full Name */}
              <div>
                <label
                  htmlFor="rsvp-name"
                  className="block text-xs font-sans text-[#8d7770] mb-1"
                >
                  თქვენი სახელი და გვარი *
                </label>
                <div className="relative">
                  <input
                    id="rsvp-name"
                    type="text"
                    required
                    placeholder="მაგ: გიორგი და ანა მაისურაძე"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-white/70 border border-[#fbcfe8] rounded-lg p-2.5 focus:outline-none focus:border-[#d4af37] text-xs font-sans text-[#4a3a35]"
                  />
                  <User className="absolute right-3 top-2.5 w-4 h-4 text-[#d4af37]/60 pointer-events-none" />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="rsvp-phone"
                  className="block text-xs font-sans text-[#8d7770] mb-1"
                >
                  საკონტაქტო ტელეფონი
                </label>
                <div className="relative">
                  <input
                    id="rsvp-phone"
                    type="tel"
                    placeholder="მაგ: +995 599 00 00 00"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white/70 border border-[#fbcfe8] rounded-lg p-2.5 focus:outline-none focus:border-[#d4af37] text-xs font-sans text-[#4a3a35]"
                  />
                  <Phone className="absolute right-3 top-2.5 w-4 h-4 text-[#d4af37]/60 pointer-events-none" />
                </div>
              </div>

              {/* Number of Guests (only if attending) */}
              {status === 'attending' && (
                <div>
                  <label
                    htmlFor="rsvp-guest-count"
                    className="block text-xs font-sans text-[#8d7770] mb-1"
                  >
                    სტუმრების რაოდენობა (თქვენი ჩათვლით)
                  </label>
                  <div className="relative">
                    <select
                      id="rsvp-guest-count"
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="w-full bg-white/70 border border-[#fbcfe8] rounded-lg p-2.5 focus:outline-none focus:border-[#d4af37] text-xs font-sans text-[#4a3a35]"
                    >
                      <option value={1}>1 პერსონა</option>
                      <option value={2}>2 პერსონა (მეწყვილესთან ერთად)</option>
                      <option value={3}>3 პერსონა (ოჯახით)</option>
                      <option value={4}>4 პერსონა (ოჯახით)</option>
                      <option value={5}>5+ პერსონა</option>
                    </select>
                    <Users className="absolute right-3 top-2.5 w-4 h-4 text-[#d4af37]/60 pointer-events-none" />
                  </div>
                </div>
              )}

              {/* Dietary preferences */}
              {status === 'attending' && (
                <div>
                  <label
                    htmlFor="rsvp-dietary"
                    className="block text-xs font-sans text-[#8d7770] mb-1"
                  >
                    სპეციალური მოთხოვნები / დიეტური კვება (სურვილისამებრ)
                  </label>
                  <div className="relative">
                    <input
                      id="rsvp-dietary"
                      type="text"
                      placeholder="მაგ: ვეგეტარიანული, სამარხვო, ალერგია თხილზე..."
                      value={dietary}
                      onChange={(e) => setDietary(e.target.value)}
                      className="w-full bg-white/70 border border-[#fbcfe8] rounded-lg p-2.5 focus:outline-none focus:border-[#d4af37] text-xs font-sans text-[#4a3a35]"
                    />
                    <Utensils className="absolute right-3 top-2.5 w-4 h-4 text-[#d4af37]/60 pointer-events-none" />
                  </div>
                </div>
              )}

              {/* Additional Note */}
              <div>
                <label
                  htmlFor="rsvp-wishes"
                  className="block text-xs font-sans text-[#8d7770] mb-1"
                >
                  მოკლე შეტყობინება წყვილისთვის
                </label>
                <textarea
                  id="rsvp-wishes"
                  rows={2}
                  placeholder="თქვენი მოკლე კომენტარი..."
                  value={wishes}
                  onChange={(e) => setWishes(e.target.value)}
                  className="w-full bg-white/70 border border-[#fbcfe8] rounded-lg p-2.5 focus:outline-none focus:border-[#d4af37] text-xs font-sans text-[#4a3a35] resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                id="rsvp-submit-btn"
                type="submit"
                className="w-full bg-[#d4af37] text-white py-3 rounded-xl font-sans text-xs uppercase tracking-widest hover:bg-[#c4a02c] transition-colors flex items-center justify-center gap-2 shadow-sm font-bold"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>დადასტურების გაგზავნა</span>
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
