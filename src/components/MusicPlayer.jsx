import React, { useState, useEffect } from 'react';
import { Music, Volume2, Sparkles } from 'lucide-react';
import { sounds } from '../utils/audioHelper';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const toggleMusic = () => {
    sounds.init();
    sounds.playChime();
    const playing = sounds.toggleMusic();
    setIsPlaying(playing);
    setHasInteracted(true);
  };

  useEffect(() => {
    return () => {
      sounds.stopMusic();
    };
  }, []);

  return (
    <div className="fixed top-3 right-3 z-50">
      <button
        onClick={toggleMusic}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 shadow-md ${
          isPlaying
            ? 'bg-gradient-to-r from-pink-500 to-rose-400 text-white ring-2 ring-pink-300 animate-pulse-glow'
            : 'bg-white/85 text-pink-600 border border-pink-200 hover:bg-white backdrop-blur-md'
        }`}
        title={isPlaying ? 'Pause music' : 'Play Birthday Melody'}
        aria-label="Toggle background birthday music"
      >
        <div className={`relative ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }}>
          <Music className="w-3.5 h-3.5" />
          {isPlaying && (
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-200 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
          )}
        </div>

        <span className="font-semibold tracking-wide flex items-center gap-1">
          {isPlaying ? (
            <>
              <span>Music Box</span>
              <Volume2 className="w-3 h-3 text-pink-100" />
            </>
          ) : (
            <>
              <span>Birthday Song</span>
              <Sparkles className="w-3 h-3 text-pink-400 animate-bounce" />
            </>
          )}
        </span>
      </button>

      {/* Sweet hint if not yet tapped */}
      {!hasInteracted && (
        <div className="absolute right-0 top-9 w-36 pointer-events-none text-right">
          <span className="inline-block bg-white/90 text-[10px] text-pink-500 px-2 py-0.5 rounded-full shadow-sm border border-pink-100 animate-bounce">
            Tap for sweet tune 🎵
          </span>
        </div>
      )}
    </div>
  );
}
