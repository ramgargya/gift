import React, { useState } from 'react';
import { Wind, RotateCcw, Cake, Stars } from 'lucide-react';
import NextSectionButton from './NextSectionButton';
import { sounds } from '../utils/audioHelper';
import { triggerCandleWishConfetti } from '../utils/confettiHelper';

export default function Section4CakeWish({ onNext }) {
  const [isBlown, setIsBlown] = useState(false);
  const [candles, setCandles] = useState([true, true, true]); // 3 candles
  const [wishMade, setWishMade] = useState(false);

  const handleBlowAll = () => {
    sounds.playBlow();
    setCandles([false, false, false]);
    setIsBlown(true);
    setWishMade(true);
    triggerCandleWishConfetti();
  };

  const handleBlowSingle = (idx) => {
    if (!candles[idx]) return;
    sounds.playBlow();
    const updated = [...candles];
    updated[idx] = false;
    setCandles(updated);

    if (updated.every((c) => !c)) {
      setIsBlown(true);
      setWishMade(true);
      triggerCandleWishConfetti();
    }
  };

  const handleRelight = () => {
    sounds.playChime();
    setCandles([true, true, true]);
    setIsBlown(false);
  };

  return (
    <div className="w-full flex flex-col items-center justify-between pt-16 px-4 max-w-lg mx-auto animate-fadeIn min-h-[90vh]">
      {/* Header */}
      <div className="text-center w-full mb-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-semibold mb-2">
          <Cake className="w-3.5 h-3.5 text-pink-500" />
          <span>Page 4 • Make Your Wish</span>
        </div>
        <h2 className="font-serif-title text-3xl sm:text-4xl text-rose-800 font-bold mb-1">
          Make a Wish, Baby 🎂✨
        </h2>
        <p className="text-xs sm:text-sm text-pink-700/85 max-w-xs mx-auto">
          Close your eyes, think of your sweetest wish (maybe one about us? 😉), and blow out the candles!
        </p>
      </div>

      {/* Birthday Cake Interactive Illustration */}
      <div className="relative w-full max-w-xs flex flex-col items-center my-4">
        {/* Soft magical glow backdrop */}
        <div
          className={`absolute inset-0 rounded-full transition-opacity duration-1000 blur-2xl ${
            isBlown ? 'bg-indigo-100/30 opacity-40' : 'bg-amber-200/50 opacity-90'
          }`}
        />

        {/* Candles Row */}
        <div className="relative z-10 flex justify-center items-end gap-6 mb-1">
          {[0, 1, 2].map((idx) => {
            const isLit = candles[idx];
            return (
              <div
                key={idx}
                onClick={() => handleBlowSingle(idx)}
                className="flex flex-col items-center cursor-pointer group"
                title={isLit ? "Tap to blow candle" : "Blown"}
              >
                {/* Flame / Smoke */}
                <div className="h-9 flex items-center justify-center relative">
                  {isLit ? (
                    <div className="relative animate-flame">
                      <div className="w-4 h-7 rounded-full bg-gradient-to-t from-orange-500 via-amber-300 to-yellow-100 shadow-[0_0_12px_#ffb703] border border-amber-200" />
                      <div className="absolute inset-1 rounded-full bg-white opacity-60" />
                    </div>
                  ) : (
                    <div className="animate-smoke flex flex-col items-center">
                      <span className="text-xs text-gray-400 select-none">💨</span>
                    </div>
                  )}
                </div>

                {/* Candle Stick */}
                <div className="w-3.5 h-12 rounded-t-sm bg-gradient-to-b from-pink-200 via-white to-pink-300 border-x border-pink-300 shadow-xs relative overflow-hidden flex flex-col justify-around">
                  <div className="w-full h-1 bg-rose-400/50 transform -rotate-12" />
                  <div className="w-full h-1 bg-rose-400/50 transform -rotate-12" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Tier 1 (Top cake tier) */}
        <div className="relative z-0 w-36 h-14 rounded-2xl bg-gradient-to-b from-white via-pink-100 to-pink-200 border-2 border-pink-300 shadow-md flex items-center justify-center overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-4 bg-white rounded-b-xl shadow-xs" />
          <div className="flex gap-2 relative z-10 text-xs">
            <span>🍓</span>
            <span>🌸</span>
            <span>🍓</span>
          </div>
        </div>

        {/* Tier 2 (Bottom cake tier) */}
        <div className="relative z-0 w-52 h-20 -mt-2 rounded-3xl bg-gradient-to-b from-pink-100 via-rose-100 to-pink-200 border-2 border-pink-300 shadow-lg flex items-center justify-center overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-5 bg-white/95 rounded-b-2xl shadow-xs flex justify-around px-2 pt-1 text-[10px]">
            <span>💖</span>
            <span>✨</span>
            <span>💖</span>
            <span>✨</span>
            <span>💖</span>
          </div>

          <div className="relative z-10 text-xs font-script font-bold text-rose-600 mt-3 text-center">
            Happy Birthday to My Girl
          </div>
        </div>

        {/* Cake Stand / Plate */}
        <div className="w-64 h-4 bg-gradient-to-r from-pink-200 via-white to-pink-200 rounded-full border border-pink-300 shadow-md -mt-1" />
        <div className="w-24 h-3 bg-pink-100/90 rounded-b-lg border-x border-b border-pink-300" />

        {/* Action Button: Blow All Candles */}
        <div className="mt-5 flex flex-col items-center gap-2">
          {!isBlown ? (
            <button
              onClick={handleBlowAll}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 text-white font-semibold text-sm shadow-lg shadow-pink-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Wind className="w-4 h-4 animate-bounce" />
              <span>Make a Wish & Blow All 🕯️</span>
            </button>
          ) : (
            <button
              onClick={handleRelight}
              className="px-4 py-2 rounded-full bg-white border border-pink-200 text-pink-700 font-medium text-xs shadow-xs hover:bg-pink-50 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Relight Candles to Wish Again</span>
            </button>
          )}

          <span className="text-[11px] text-pink-400">
            {isBlown ? "✨ Your wish was sent to the stars! ✨" : "Tip: Tap candles directly or tap the button"}
          </span>
        </div>
      </div>

      {/* Heartfelt Wish Letter (Unrolls when wish is made) */}
      <div
        className={`w-full max-w-xs transition-all duration-700 ease-out ${
          wishMade ? 'opacity-100 scale-100 my-3' : 'opacity-0 scale-95 pointer-events-none h-0 overflow-hidden'
        }`}
      >
        <div className="glass-card rounded-3xl p-5 border-2 border-pink-200 shadow-lg relative overflow-hidden">
          <div className="absolute top-2 right-3 text-pink-300">
            <Stars className="w-5 h-5 animate-pulse" />
          </div>

          <h3 className="font-script text-2xl text-rose-700 font-bold mb-1">
            May Your Wish Come True, Babe 💕
          </h3>

          <p className="text-xs text-pink-900 leading-relaxed font-normal mb-2">
            Whatever you wished for just now, I truly hope you get it. You deserve all the good things in this life.
          </p>

          <p className="text-xs text-pink-900 leading-relaxed font-normal">
            And I promise I will always do my best to make you laugh, cheer you up when you're down, and remind you every single day how loved you are.
          </p>

          <div className="mt-3 pt-2 border-t border-pink-100 flex items-center justify-between text-xs text-pink-600 font-script font-bold text-base">
            <span>Always yours, babe 🌸</span>
            <span>💖 🥰 💖</span>
          </div>
        </div>
      </div>

      {/* Button to advance to Page 5 */}
      <NextSectionButton
        label="Page 5: Open Your Birthday Surprise Box 🎁"
        subtext="Tap to see your final gift & coupons"
        onClick={onNext}
      />
    </div>
  );
}
