import React, { useState, useEffect } from 'react';

export default function BackgroundDecorations() {
  const [tapHearts, setTapHearts] = useState([]);

  // Handle tap anywhere on screen to spawn cute floating hearts
  const handleGlobalTap = (e) => {
    // Only capture primary touch or click
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    if (!clientX && !clientY) return;

    const heartEmojis = ['💖', '🌸', '✨', '🎀', '🍰', '💕', '🍓', '🧁'];
    const randomEmoji = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    const newHeart = {
      id: Date.now() + Math.random(),
      x: clientX,
      y: clientY,
      emoji: randomEmoji,
    };

    setTapHearts((prev) => [...prev.slice(-12), newHeart]);
  };

  useEffect(() => {
    window.addEventListener('click', handleGlobalTap);
    return () => window.removeEventListener('click', handleGlobalTap);
  }, []);

  // Auto clean up tap hearts
  useEffect(() => {
    if (tapHearts.length === 0) return;
    const timer = setTimeout(() => {
      setTapHearts((prev) => prev.slice(1));
    }, 1200);
    return () => clearTimeout(timer);
  }, [tapHearts]);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Soft Ambient Pastel Glow Orbs */}
      <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-pink-200/40 blur-3xl" />
      <div className="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-rose-200/35 blur-3xl" />
      <div className="absolute bottom-20 left-10 w-72 h-72 rounded-full bg-pink-100/50 blur-3xl" />

      {/* Floating Animated Petals / Sparkles */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute text-pink-300/40 select-none animate-float-slow"
            style={{
              top: `${(i * 19 + 7) % 95}%`,
              left: `${(i * 23 + 11) % 92}%`,
              fontSize: `${14 + (i % 4) * 6}px`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${3.5 + (i % 3)}s`,
            }}
          >
            {i % 3 === 0 ? '🌸' : i % 3 === 1 ? '✨' : '💖'}
          </div>
        ))}
      </div>

      {/* Floating Interactive Hearts on Tap */}
      {tapHearts.map((heart) => (
        <span
          key={heart.id}
          className="absolute text-xl pointer-events-none transition-all duration-1000 ease-out"
          style={{
            left: `${heart.x - 12}px`,
            top: `${heart.y - 12}px`,
            animation: 'heartFloat 1.2s ease-out forwards',
          }}
        >
          {heart.emoji}
        </span>
      ))}

      <style>{`
        @keyframes heartFloat {
          0% {
            opacity: 1;
            transform: translateY(0) scale(0.6) rotate(0deg);
          }
          50% {
            opacity: 0.9;
            transform: translateY(-35px) scale(1.3) rotate(-15deg);
          }
          100% {
            opacity: 0;
            transform: translateY(-70px) scale(1) rotate(15deg);
          }
        }
      `}</style>
    </div>
  );
}
