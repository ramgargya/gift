import React, { useState } from 'react';
import { Heart, Sparkles, Smile, Crown, Flower2, Star, CheckCircle2 } from 'lucide-react';
import NextSectionButton from './NextSectionButton';
import { sounds } from '../utils/audioHelper';
import { triggerPinkConfetti } from '../utils/confettiHelper';

const REASONS = [
  {
    id: 1,
    icon: Smile,
    title: "Your Cute Smile",
    tag: "My Favorite View",
    color: "from-pink-400 to-rose-400",
    text: "Seriously, whenever you smile or laugh, I can't help but smile too. It instantly brightens up my whole mood, every single time.",
  },
  {
    id: 2,
    icon: Crown,
    title: "Effortlessly Gorgeous",
    tag: "Prettiest Girl",
    color: "from-rose-400 to-pink-500",
    text: "You don't even have to try. Even when you're just in an oversized hoodie with your hair tied up, you are the most stunning girl to me.",
  },
  {
    id: 3,
    icon: Sparkles,
    title: "When You Laugh At Me",
    tag: "Sweetest Sound",
    color: "from-pink-500 to-rose-500",
    text: "Even when you roll your eyes at my dumb jokes and giggle, it's hands down the cutest sound in the entire world.",
  },
  {
    id: 4,
    icon: Heart,
    title: "Your Big Soft Heart",
    tag: "So Caring",
    color: "from-rose-300 to-pink-400",
    text: "You're so thoughtful and genuinely caring. The way you look after me and remember little details means the world to me.",
  },
  {
    id: 5,
    icon: Star,
    title: "Our Quiet Moments",
    tag: "Pure Comfort",
    color: "from-pink-400 to-rose-400",
    text: "Whether we're out on a cute date or just sitting together doing nothing on our phones, I'm at peace as long as I'm with you.",
  },
  {
    id: 6,
    icon: Flower2,
    title: "You Are My Person",
    tag: "One in a Billion",
    color: "from-rose-400 to-pink-600",
    text: "I am so grateful and lucky to have you in my life. You're my favorite human, my peace, and I wouldn't trade you for the universe.",
  },
];

export default function Section2Compliments({ onNext }) {
  const [revealedIds, setRevealedIds] = useState([]);
  const [likes, setLikes] = useState({});

  const handleCardClick = (id) => {
    sounds.playChime();
    if (!revealedIds.includes(id)) {
      const updated = [...revealedIds, id];
      setRevealedIds(updated);
      if (updated.length === REASONS.length) {
        setTimeout(() => {
          sounds.playBonus();
          triggerPinkConfetti(0.6);
        }, 300);
      }
    }
  };

  const handleLike = (e, id) => {
    e.stopPropagation();
    sounds.playCatch();
    setLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
    triggerPinkConfetti(0.7);
  };

  return (
    <div className="w-full flex flex-col items-center justify-between pt-16 px-4 max-w-lg mx-auto animate-fadeIn min-h-[90vh]">
      {/* Header */}
      <div className="text-center w-full mb-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-semibold mb-2">
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-400" />
          <span>Page 2 • Things I Love About You</span>
        </div>
        <h2 className="font-serif-title text-3xl sm:text-4xl text-rose-800 font-bold mb-1">
          Why I Love You So Much 🌸
        </h2>
        <p className="text-xs sm:text-sm text-pink-700/85 max-w-xs mx-auto">
          Tap each card below to see a few little things about you that make me fall in love every day.
        </p>

        {/* Progress pill */}
        <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-white/85 rounded-full border border-pink-200 text-xs text-pink-600 shadow-xs">
          <CheckCircle2 className="w-3.5 h-3.5 text-pink-500" />
          <span>
            {revealedIds.length} of {REASONS.length} Secrets Read
          </span>
          {revealedIds.length === REASONS.length && (
            <span className="font-bold text-rose-600">✨ 100% Adored!</span>
          )}
        </div>
      </div>

      {/* Grid of Compliment Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full my-2">
        {REASONS.map((item) => {
          const Icon = item.icon;
          const isRevealed = revealedIds.includes(item.id);
          const likeCount = likes[item.id] || 0;

          return (
            <div
              key={item.id}
              onClick={() => handleCardClick(item.id)}
              className={`relative rounded-2xl p-4 transition-all duration-300 cursor-pointer select-none ${
                isRevealed
                  ? 'glass-card border-pink-300 shadow-md ring-1 ring-pink-300'
                  : 'bg-white/75 hover:bg-white/95 border border-pink-200/80 shadow-xs active:scale-98'
              }`}
            >
              {/* Card top row */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-white bg-gradient-to-tr ${item.color} shadow-xs`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-pink-500">
                      {item.tag}
                    </span>
                    <h3 className="font-bold text-sm text-rose-900 leading-snug">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Love Button */}
                <button
                  onClick={(e) => handleLike(e, item.id)}
                  className="w-8 h-8 rounded-full bg-pink-50 hover:bg-pink-100 flex items-center justify-center text-pink-500 transition-colors active:scale-90"
                  title="Send love"
                >
                  <Heart
                    className={`w-4 h-4 ${likeCount > 0 ? 'fill-pink-500 text-pink-500' : 'text-pink-400'}`}
                  />
                  {likeCount > 0 && (
                    <span className="text-[9px] font-bold ml-0.5 text-pink-600">
                      {likeCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Card content / reveal text */}
              {isRevealed ? (
                <div className="mt-2 pt-2 border-t border-pink-100 animate-fadeIn">
                  <p className="text-xs text-pink-950 leading-relaxed font-normal">
                    {item.text}
                  </p>
                </div>
              ) : (
                <div className="mt-2 pt-2 border-t border-pink-100/60 flex items-center justify-between text-pink-400 text-xs">
                  <span className="italic font-script text-sm">Tap to read what I wrote</span>
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Button to advance to Page 3 */}
      <NextSectionButton
        label="Page 3: Play A Game I Made For You 🎮"
        subtext="Tap to play the Sweet Catch Challenge"
        onClick={onNext}
      />
    </div>
  );
}
