import React, { useState } from 'react';
import { Gift, Sparkles, Heart, Crown, RefreshCw, ArrowUp, Check } from 'lucide-react';
import { sounds } from '../utils/audioHelper';
import { triggerGrandCelebration, triggerPinkConfetti } from '../utils/confettiHelper';

const LOVE_NOTES = [
  "I still get butterflies every time I see your name pop up on my phone.",
  "You're genuinely the prettiest girl I've ever seen, especially when you think you aren't.",
  "I love how comfortable and safe it feels just laying next to you doing nothing.",
  "You make the hard days easy and the good days unforgettable.",
  "Thank you for being in my life and making everything so sweet.",
  "You're stuck with me forever, baby. No refunds allowed 😉",
  "Happy birthday, my gorgeous girl. You deserve the entire world."
];

const INITIAL_COUPONS = [
  { id: 1, title: "1x Free Warm Hug Anytime", desc: "Redeemable 24/7, no questions asked", icon: "🫂", redeemed: false },
  { id: 2, title: "1x Free Food or Ice Cream Run", desc: "Whatever you're craving, it's completely on me", icon: "🍦", redeemed: false },
  { id: 3, title: "1x Win Any Argument Pass", desc: "Use this whenever you want to be 100% right", icon: "👑", redeemed: false },
  { id: 4, title: "1x Cozy Cuddle & Head Scratch Pass", desc: "Unlimited sweet cuddles until you fall asleep", icon: "🧸", redeemed: false },
];

export default function Section5GiftBox({ onRestart }) {
  const [isOpen, setIsOpen] = useState(false);
  const [noteIndex, setNoteIndex] = useState(0);
  const [coupons, setCoupons] = useState(INITIAL_COUPONS);

  const handleOpenGift = () => {
    sounds.playVictory();
    triggerGrandCelebration();
    setIsOpen(true);
  };

  const handleNextNote = () => {
    sounds.playBonus();
    triggerPinkConfetti(0.7);
    setNoteIndex((prev) => (prev + 1) % LOVE_NOTES.length);
  };

  const handleRedeemCoupon = (id) => {
    sounds.playCatch();
    triggerPinkConfetti(0.6);
    setCoupons((prev) =>
      prev.map((c) => (c.id === id ? { ...c, redeemed: true } : c))
    );
  };

  return (
    <div className="w-full flex flex-col items-center justify-between pt-16 pb-12 px-4 max-w-lg mx-auto animate-fadeIn min-h-[90vh]">
      {/* Header */}
      <div className="text-center w-full mb-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-semibold mb-2">
          <Gift className="w-3.5 h-3.5 text-pink-500" />
          <span>Page 5 • Your Birthday Surprise</span>
        </div>
        <h2 className="font-serif-title text-3xl sm:text-4xl text-rose-800 font-bold mb-1">
          Your Birthday Surprise Box 🎁
        </h2>
        <p className="text-xs sm:text-sm text-pink-700/85 max-w-xs mx-auto">
          One last surprise from me to you, wrapped in ribbons.
        </p>
      </div>

      {/* Interactive 3D Gift Box */}
      <div className="w-full max-w-xs flex flex-col items-center my-3">
        {!isOpen ? (
          <div
            onClick={handleOpenGift}
            className="w-56 h-56 rounded-3xl bg-gradient-to-tr from-pink-400 via-rose-400 to-pink-500 border-4 border-white shadow-2xl shadow-pink-500/30 flex flex-col items-center justify-center relative cursor-pointer group hover:scale-105 active:scale-95 transition-all duration-300"
          >
            {/* White Ribbon Cross */}
            <div className="absolute top-0 bottom-0 w-8 bg-white/90 shadow-xs" />
            <div className="absolute left-0 right-0 h-8 bg-white/90 shadow-xs" />

            {/* Big Ribbon Bow on Top */}
            <div className="absolute -top-5 z-20 flex items-center justify-center">
              <div className="w-12 h-9 rounded-full bg-white shadow-md border-2 border-pink-200 transform -rotate-25" />
              <div className="w-6 h-6 rounded-full bg-pink-100 border border-pink-300 shadow-inner z-10 -mx-2" />
              <div className="w-12 h-9 rounded-full bg-white shadow-md border-2 border-pink-200 transform rotate-25" />
            </div>

            {/* Center Icon */}
            <div className="relative z-10 bg-white p-3 rounded-2xl shadow-md border border-pink-100 group-hover:scale-110 transition-transform">
              <Gift className="w-8 h-8 text-pink-500 animate-bounce" />
            </div>

            <div className="relative z-10 mt-3 text-center">
              <span className="text-xs font-bold text-white tracking-wide bg-pink-600/80 px-3 py-1 rounded-full shadow-xs">
                Tap to Open Your Box ✨
              </span>
            </div>
          </div>
        ) : (
          /* Opened Content */
          <div className="w-full space-y-4 animate-fadeIn">
            {/* Certificate of Absolute Royalty & Prettiness */}
            <div className="glass-card rounded-3xl p-5 border-2 border-pink-200 shadow-xl relative overflow-hidden text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-amber-300 to-yellow-400 text-white shadow-md mb-2">
                <Crown className="w-6 h-6 fill-white" />
              </div>

              <div className="text-[11px] uppercase tracking-widest text-amber-600 font-bold mb-1">
                Special Birthday Honors
              </div>

              <h3 className="font-serif-title text-xl text-rose-800 font-bold">
                The Prettiest Girl in the World 👑
              </h3>

              <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-pink-400 to-transparent mx-auto my-2" />

              <p className="text-xs text-pink-900 leading-relaxed font-normal mb-3">
                Officially awarded to <strong>My Favorite Person</strong> for being the sweetest, most caring, and irreplaceable human ever. Valid for a lifetime with unlimited kisses, hugs, and love.
              </p>

              <div className="bg-pink-50/80 rounded-2xl p-2.5 flex items-center justify-center text-xs text-rose-600 font-semibold border border-pink-100">
                <div className="flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-400" />
                  <span>Loved Forever 💕</span>
                </div>
              </div>
            </div>

            {/* Redeemable Love Coupons */}
            <div className="glass-card rounded-3xl p-4 border border-pink-200/90 shadow-md">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold text-rose-800 flex items-center gap-1.5">
                  <span className="text-sm">🎟️</span>
                  <span>Sweet Love Coupons</span>
                </h4>
                <span className="text-[10px] text-pink-500 bg-pink-100 px-2 py-0.5 rounded-full font-semibold">
                  Tap to use
                </span>
              </div>

              <div className="space-y-2">
                {coupons.map((coupon) => (
                  <div
                    key={coupon.id}
                    className={`p-2.5 rounded-2xl border transition-all flex items-center justify-between ${
                      coupon.redeemed
                        ? 'bg-rose-50/70 border-rose-200 opacity-80'
                        : 'bg-white border-pink-200 shadow-2xs hover:border-pink-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-left">
                      <span className="text-lg">{coupon.icon}</span>
                      <div>
                        <div className="text-xs font-bold text-rose-900">
                          {coupon.title}
                        </div>
                        <div className="text-[10px] text-pink-600">
                          {coupon.desc}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleRedeemCoupon(coupon.id)}
                      disabled={coupon.redeemed}
                      className={`px-2.5 py-1 rounded-xl text-[11px] font-semibold transition-all shrink-0 cursor-pointer ${
                        coupon.redeemed
                          ? 'bg-rose-200 text-rose-700 cursor-default flex items-center gap-1'
                          : 'bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-xs active:scale-95'
                      }`}
                    >
                      {coupon.redeemed ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>Used 💕</span>
                        </>
                      ) : (
                        'Redeem'
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Sweet Notes From My Heart Jar */}
            <div className="glass-card rounded-3xl p-4 border border-pink-200/90 shadow-md text-center">
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-pink-600 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                <span>Little Notes From My Heart 💌</span>
              </div>

              <div className="min-h-[64px] flex items-center justify-center bg-white/90 rounded-2xl p-3 border border-pink-100 shadow-inner">
                <p className="font-script text-xl text-rose-700 font-bold leading-snug">
                  "{LOVE_NOTES[noteIndex]}"
                </p>
              </div>

              <button
                onClick={handleNextNote}
                className="mt-3 px-4 py-2 rounded-full bg-pink-100 text-pink-700 hover:bg-pink-200 active:scale-95 text-xs font-semibold transition-all inline-flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5 text-pink-500" />
                <span>Draw Another Sweet Note</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Grand Finale Replay & Back to Page 1 */}
      <div className="w-full flex flex-col items-center gap-3 mt-6 pt-4 border-t border-pink-200/60">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sounds.playVictory();
              triggerGrandCelebration();
            }}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 text-white font-semibold text-xs shadow-md shadow-pink-500/25 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Celebrate Again! 🎉</span>
          </button>

          <button
            onClick={onRestart}
            className="px-4 py-2.5 rounded-full bg-white border border-pink-200 text-pink-700 font-medium text-xs shadow-xs hover:bg-pink-50 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowUp className="w-4 h-4 text-pink-500" />
            <span>Page 1 🌸</span>
          </button>
        </div>

        {/* Closing Love Note */}
        <div className="text-center">
          <p className="font-script text-xl text-rose-600 font-bold">
            Happy Birthday, Baby 💖
          </p>
          <p className="text-[11px] text-pink-400 mt-0.5">
            Made with all my love, just for you ✨
          </p>
        </div>
      </div>
    </div>
  );
}
