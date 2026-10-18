import React from 'react';
import { ChevronRight, Sparkles, Heart } from 'lucide-react';
import { sounds } from '../utils/audioHelper';
import { triggerPinkConfetti } from '../utils/confettiHelper';

export default function NextSectionButton({ label, subtext, onClick }) {
  const handleClick = () => {
    sounds.playChime();
    triggerPinkConfetti(0.8);
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center pt-6 pb-12 px-4">
      {/* Decorative divider ribbon */}
      <div className="flex items-center gap-3 mb-4 opacity-70">
        <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-pink-300" />
        <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-300 animate-pulse" />
        <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-pink-300" />
      </div>

      <button
        onClick={handleClick}
        className="group relative w-full max-w-xs sm:max-w-sm px-5 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500 bg-[length:200%_auto] hover:bg-[position:right_center] transition-all duration-500 text-white font-medium shadow-lg shadow-pink-500/25 active:scale-95 border border-white/40 flex items-center justify-between gap-3 overflow-hidden cursor-pointer"
      >
        {/* Shimmer light effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-pink-200 animate-spin" style={{ animationDuration: '6s' }} />
          <div className="flex flex-col text-left">
            <span className="text-sm sm:text-base font-bold tracking-wide">
              {label}
            </span>
            {subtext && (
              <span className="text-[11px] text-pink-100/90 font-normal">
                {subtext}
              </span>
            )}
          </div>
        </div>

        <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform shrink-0">
          <ChevronRight className="w-4 h-4 text-white" />
        </div>
      </button>

      <div className="text-[11px] text-pink-400 mt-2 font-script text-base flex items-center gap-1">
        <span>Tap button to turn the page</span>
        <ChevronRight className="w-3.5 h-3.5 animate-bounce text-pink-400" />
      </div>
    </div>
  );
}
