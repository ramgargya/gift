import React, { useState } from 'react';
import { Crown, Heart, Sparkles, Mail, MailOpen } from 'lucide-react';
import NextSectionButton from './NextSectionButton';
import { sounds } from '../utils/audioHelper';
import { triggerPinkConfetti } from '../utils/confettiHelper';

export default function Section1Hero({ onNext }) {
  const [isOpen, setIsOpen] = useState(false);
  const [kissCount, setKissCount] = useState(12);

  const handleEnvelopeToggle = () => {
    sounds.playChime();
    triggerPinkConfetti(0.5);
    setIsOpen(!isOpen);
  };

  const handleSendKiss = () => {
    sounds.playCatch();
    setKissCount((prev) => prev + 1);
    triggerPinkConfetti(0.7);
  };

  return (
    <div className="w-full flex flex-col items-center justify-between pt-16 px-4 max-w-lg mx-auto animate-fadeIn min-h-[90vh]">
      {/* Top Greeting Badge */}
      <div className="flex flex-col items-center text-center w-full">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-pink-200 text-pink-600 text-xs font-semibold mb-2 shadow-xs backdrop-blur-md">
          <Crown className="w-3.5 h-3.5 text-amber-400 fill-amber-300" />
          <span>For My Favorite Girl in the World</span>
          <Heart className="w-3 h-3 text-pink-500 fill-pink-400" />
        </div>

        {/* Headline */}
        <h1 className="font-calligraphy text-5xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-500 to-pink-500 leading-tight py-1">
          Happy Birthday,
        </h1>
        <h2 className="font-script text-3xl sm:text-4xl text-rose-600 font-bold -mt-2 mb-2">
          My Pretty Girl 💖
        </h2>

        <p className="text-xs sm:text-sm text-pink-800/85 max-w-xs font-normal leading-relaxed">
          I made this little website just for you. Happy birthday to the girl who stole my heart and makes every single day so much sweeter.
        </p>
      </div>

      {/* Interactive Birthday Letter Envelope */}
      <div className="w-full my-5 flex flex-col items-center">
        <div
          onClick={handleEnvelopeToggle}
          className={`w-full max-w-xs transition-all duration-500 cursor-pointer transform ${
            isOpen ? 'scale-102' : 'hover:scale-[1.02]'
          }`}
        >
          <div className="relative rounded-3xl p-6 glass-card text-center overflow-hidden border-2 border-pink-200/90 shadow-xl shadow-pink-200/40">
            {/* Top decorative lace */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-pink-300 via-rose-300 to-pink-300" />

            <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-tr from-pink-100 to-rose-50 border border-pink-200 flex items-center justify-center shadow-inner">
              {isOpen ? (
                <MailOpen className="w-8 h-8 text-pink-500 animate-pulse" />
              ) : (
                <Mail className="w-8 h-8 text-rose-400" />
              )}
            </div>

            <div className="font-serif-title font-bold text-lg text-rose-800 mb-1">
              {isOpen ? "A Letter For You 💌" : "You have a letter from me 💌"}
            </div>

            <p className="text-xs text-pink-600/90 mb-2">
              {isOpen ? "Tap to fold letter" : "Tap here to open it"}
            </p>

            {/* Revealed Letter Content */}
            <div
              className={`transition-all duration-700 ease-in-out overflow-hidden text-left ${
                isOpen ? 'max-h-96 opacity-100 mt-3 pt-3 border-t border-pink-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="bg-pink-50/80 p-3.5 rounded-2xl border border-pink-100">
                <p className="font-script text-xl text-rose-700 mb-1 font-bold">
                  Hey baby,
                </p>
                <p className="text-xs text-pink-900 leading-relaxed mb-2 font-normal">
                  Happy birthday, gorgeous! You have no idea how lucky I feel having you by my side.
                </p>
                <p className="text-xs text-pink-900 leading-relaxed font-normal mb-2">
                  I love your laugh, your cute expressions, and how you make everything around you ten times better. Thank you for just being you.
                </p>
                <p className="text-xs text-pink-900 leading-relaxed font-normal">
                  I hope today brings you as much joy as you give me every single day. I love you so much! 💕
                </p>
                <div className="text-right mt-2 text-xs font-script font-bold text-rose-600">
                  Always yours ~
                </div>
              </div>
            </div>

            {/* Tap indicator pulse */}
            {!isOpen && (
              <div className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-medium text-pink-500 bg-pink-100/60 px-3 py-1 rounded-full">
                <Sparkles className="w-3 h-3 text-pink-500 animate-spin" />
                <span>Tap to Read</span>
              </div>
            )}
          </div>
        </div>

        {/* Cute Kisses / Hugs Reaction Button */}
        <div className="mt-4 flex items-center gap-2">
          <button
            onClick={handleSendKiss}
            className="px-4 py-2 rounded-full bg-white/95 border border-pink-200 text-pink-600 text-xs font-semibold shadow-sm hover:bg-pink-50 active:scale-95 transition-all flex items-center gap-2"
          >
            <span className="text-sm">💋</span>
            <span>Send Birthday Kisses</span>
            <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full font-bold text-[11px]">
              {kissCount}
            </span>
          </button>
        </div>
      </div>

      <div className="text-xs text-pink-500/80 italic font-script text-base text-center my-1">
        "You're the prettiest girl in every room, no competition."
      </div>

      {/* Button to advance to Page 2 */}
      <NextSectionButton
        label="Page 2: Little Things I Love About You 🌸"
        subtext="Tap to see what makes you so special to me"
        onClick={onNext}
      />
    </div>
  );
}
