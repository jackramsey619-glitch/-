import React, { useState } from 'react';
import { MessageSquareHeart, Heart, Send, Sparkles, User, MessageCircle } from 'lucide-react';
import { GuestComment } from '../types';
import { GoldFlourishDivider } from './FloralDecorations';

interface WishesSectionProps {
  comments: GuestComment[];
  onAddComment: (comment: Omit<GuestComment, 'id' | 'timestamp' | 'likes'>) => void;
  onLikeComment: (id: string) => void;
}

const BADGES = ['💍 საუკეთესო სურვილები', '🥂 მილოცვა', '❤️ სიყვარულით', '🕊️ დალოცვა', '✨ ბედნიერება'];

const RELATIONS = ['მეგობარი', 'ნათესავი', 'მეჯვარე', 'კოლეგა', 'ოჯახის წევრი', 'სტუმარი'];

export const WishesSection: React.FC<WishesSectionProps> = ({
  comments,
  onAddComment,
  onLikeComment,
}) => {
  const [author, setAuthor] = useState('');
  const [relation, setRelation] = useState('მეგობარი');
  const [text, setText] = useState('');
  const [selectedBadge, setSelectedBadge] = useState('💍 საუკეთესო სურვილები');
  const [submittedToast, setSubmittedToast] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !text.trim()) {
      setErrorMsg('გთხოვთ შეავსოთ სახელი და სურვილის ტექსტი');
      return;
    }

    setErrorMsg('');
    onAddComment({
      author: author.trim(),
      relation,
      text: text.trim(),
      badge: selectedBadge,
    });

    setAuthor('');
    setText('');
    setSubmittedToast(true);
    setTimeout(() => setSubmittedToast(false), 4000);
  };

  return (
    <section id="wishes-section" className="relative py-16 px-4 max-w-4xl mx-auto z-10">
      <div className="text-center mb-10">
        <p className="text-[#d4af37] uppercase tracking-[0.3em] text-xs font-sans font-bold mb-2">
          თბილი სიტყვები
        </p>
        <h2 className="text-2xl sm:text-4xl text-[#5d4037] font-light tracking-tight">
          სტუმრების სურვილები და მილოცვები
        </h2>
        <div className="w-24 h-px bg-[#d4af37] my-3 mx-auto"></div>
        <p className="font-serif text-sm text-[#8d7770] max-w-md mx-auto">
          დაუტოვეთ თქვენი კეთილი სურვილები ნინოს და გიორგის მათ ცხოვრების უმნიშვნელოვანეს დღეს
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Interactive Comment Form (5 cols) */}
        <div className="lg:col-span-5 bg-white/40 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-[#fbcfe8] shadow-sm">
          <div className="flex items-center gap-2 mb-4 text-[#d4af37] border-b border-[#fbcfe8] pb-2">
            <MessageSquareHeart className="w-5 h-5 text-[#d4af37]" />
            <h3 className="font-sans text-base font-bold text-[#5d4037]">
              დაწერეთ სურვილი
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMsg && (
              <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl font-sans border border-red-200">
                {errorMsg}
              </div>
            )}

            {submittedToast && (
              <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded-xl font-sans border border-emerald-200 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>თქვენი თბილი მილოცვა წარმატებით დაემატა! გმადლობთ ❤️</span>
              </div>
            )}

            {/* Author Name */}
            <div>
              <label
                htmlFor="guest-wishes-name"
                className="block text-xs font-sans text-[#8d7770] mb-1"
              >
                თქვენი სახელი და გვარი *
              </label>
              <div className="relative">
                <input
                  id="guest-wishes-name"
                  type="text"
                  required
                  placeholder="მაგ: მარიამ გიორგაძე"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full bg-white/60 border border-[#fbcfe8] rounded-lg p-2.5 focus:outline-none focus:border-[#d4af37] text-xs font-sans text-[#4a3a35]"
                />
                <User className="absolute right-3 top-2.5 w-4 h-4 text-[#d4af37]/60 pointer-events-none" />
              </div>
            </div>

            {/* Relationship */}
            <div>
              <label
                htmlFor="guest-wishes-relation"
                className="block text-xs font-sans text-[#8d7770] mb-1"
              >
                ვინ ბრძანდებით წყვილისთვის?
              </label>
              <select
                id="guest-wishes-relation"
                value={relation}
                onChange={(e) => setRelation(e.target.value)}
                className="w-full bg-white/60 border border-[#fbcfe8] rounded-lg p-2.5 focus:outline-none focus:border-[#d4af37] text-xs font-sans text-[#4a3a35]"
              >
                {RELATIONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            {/* Badge / Mood picker */}
            <div>
              <label className="block text-xs font-sans text-[#8d7770] mb-1">
                მილოცვის თემატიკა
              </label>
              <div className="flex flex-wrap gap-1.5">
                {BADGES.map((badge) => (
                  <button
                    key={badge}
                    type="button"
                    onClick={() => setSelectedBadge(badge)}
                    className={`px-2.5 py-1 text-[11px] font-sans rounded-lg transition-all border ${
                      selectedBadge === badge
                        ? 'bg-[#d4af37] text-white border-[#d4af37] shadow-xs font-semibold'
                        : 'bg-white/60 text-[#8d7770] border-[#fbcfe8] hover:bg-white'
                    }`}
                  >
                    {badge}
                  </button>
                ))}
              </div>
            </div>

            {/* Message Text */}
            <div>
              <label
                htmlFor="guest-wishes-text"
                className="block text-xs font-sans text-[#8d7770] mb-1"
              >
                თქვენი სურვილი ან მილოცვა *
              </label>
              <textarea
                id="guest-wishes-text"
                required
                rows={4}
                placeholder="დაწერეთ თქვენი გულწრფელი სურვილები..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full bg-white/60 border border-[#fbcfe8] rounded-lg p-2.5 focus:outline-none focus:border-[#d4af37] text-xs font-sans text-[#4a3a35] resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              id="submit-wish-btn"
              type="submit"
              className="w-full bg-[#d4af37] text-white py-2.5 rounded-lg text-xs font-bold font-sans uppercase tracking-wider hover:bg-[#c4a02c] transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>სურვილის გაგზავნა</span>
            </button>
          </form>
        </div>

        {/* Live Scrolling Wishes List (7 cols) */}
        <div className="lg:col-span-7 space-y-4 max-h-[600px] overflow-y-auto pr-2">
          <div className="flex items-center justify-between px-2 text-xs font-sans text-[#8d7770]">
            <span>სულ გამოხმაურებები: {comments.length}</span>
            <span className="flex items-center gap-1 text-[#d4af37] font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>მუდმივად განახლებადი</span>
            </span>
          </div>

          {comments.length === 0 ? (
            <div className="text-center p-8 bg-white/40 rounded-2xl border border-[#fbcfe8]">
              <MessageCircle className="w-8 h-8 text-[#d4af37]/40 mx-auto mb-2" />
              <p className="font-serif text-sm text-[#8d7770]">
                ჯერჯერობით სურვილები არ არის დაწერილი. იყავით პირველი!
              </p>
            </div>
          ) : (
            comments.map((comment) => (
              <div
                key={comment.id}
                id={`wish-card-${comment.id}`}
                className="bg-white/50 backdrop-blur-sm rounded-2xl p-5 border border-[#fbcfe8] shadow-xs hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2.5">
                    {/* Golden Initial Avatar */}
                    <div className="w-8 h-8 rounded-full bg-[#fdf6f0] text-[#d4af37] border border-[#fbcfe8] flex items-center justify-center font-sans font-bold text-xs shadow-xs">
                      {comment.author.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-sans text-sm font-bold text-[#5d4037]">
                        {comment.author}
                      </h4>
                      <div className="flex items-center gap-2 text-[11px] font-sans text-[#8d7770]">
                        <span className="bg-[#fdf6f0] px-2 py-0.5 rounded-md border border-[#fbcfe8]/60">
                          {comment.relation}
                        </span>
                        <span>•</span>
                        <span>{comment.timestamp}</span>
                      </div>
                    </div>
                  </div>

                  {/* Badge */}
                  {comment.badge && (
                    <span className="text-[10px] font-sans font-semibold text-[#d4af37] bg-[#fdf6f0] px-2.5 py-1 rounded-lg border border-[#fbcfe8]/60 shrink-0">
                      {comment.badge}
                    </span>
                  )}
                </div>

                {/* Comment Body */}
                <p className="font-serif text-xs sm:text-sm text-[#4a3a35] leading-relaxed my-3 whitespace-pre-line pl-10">
                  {comment.text}
                </p>

                {/* Like Button */}
                <div className="flex justify-end pt-2 border-t border-[#fbcfe8]/60">
                  <button
                    type="button"
                    onClick={() => onLikeComment(comment.id)}
                    className="inline-flex items-center gap-1.5 text-xs text-[#8d7770] hover:text-[#d4af37] px-3 py-1 rounded-full hover:bg-white/60 transition-colors font-sans"
                  >
                    <Heart className="w-3.5 h-3.5 text-[#d4af37] fill-[#d4af37]/20 hover:fill-[#d4af37]" />
                    <span className="font-medium">{comment.likes}</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};
