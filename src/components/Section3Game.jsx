import React, { useState, useEffect, useRef } from 'react';
import { Trophy, Play, RotateCcw, Sparkles, Heart, Crown, ArrowLeft, ArrowRight, Zap } from 'lucide-react';
import NextSectionButton from './NextSectionButton';
import { sounds } from '../utils/audioHelper';
import { triggerPinkConfetti, triggerGrandCelebration } from '../utils/confettiHelper';

const GAME_ITEMS = [
  { emoji: '🍰', name: 'Cake', points: 15, isBonus: false },
  { emoji: '🍓', name: 'Strawberry', points: 10, isBonus: false },
  { emoji: '💖', name: 'Love', points: 10, isBonus: false },
  { emoji: '🎁', name: 'Gift', points: 20, isBonus: true },
  { emoji: '👑', name: 'Crown', points: 30, isBonus: true },
  { emoji: '🧁', name: 'Cupcake', points: 15, isBonus: false },
];

const WIN_SCORE = 100;

export default function Section3Game({ onNext }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [basketX, setBasketX] = useState(50); // percentage 0 - 100
  const [fallingItems, setFallingItems] = useState([]);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState(null);

  const gameAreaRef = useRef(null);
  const animationFrameRef = useRef(null);
  const lastSpawnRef = useRef(0);
  const isDraggingRef = useRef(false);

  // Start / Restart game
  const startGame = () => {
    sounds.playChime();
    setScore(0);
    setStreak(0);
    setIsWon(false);
    setFallingItems([]);
    setBasketX(50);
    setIsPlaying(true);
    setFeedback({ text: "Go get 'em, babe! 🌸", color: "text-pink-500" });
  };

  // Move basket
  const moveBasketBy = (delta) => {
    setBasketX((prev) => Math.min(88, Math.max(12, prev + delta)));
  };

  // Touch / Drag handler for game area
  const handleTouchMove = (e) => {
    if (!isPlaying || !gameAreaRef.current) return;
    const rect = gameAreaRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const relativeX = ((clientX - rect.left) / rect.width) * 100;
    setBasketX(Math.min(88, Math.max(12, relativeX)));
  };

  // Game Loop
  useEffect(() => {
    if (!isPlaying) {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      return;
    }

    let lastTime = performance.now();

    const loop = (time) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      // Spawn items every 750ms
      if (time - lastSpawnRef.current > 750) {
        lastSpawnRef.current = time;
        const randomItem = GAME_ITEMS[Math.floor(Math.random() * GAME_ITEMS.length)];
        const newItem = {
          id: Math.random(),
          ...randomItem,
          x: Math.floor(Math.random() * 76) + 12,
          y: -10,
          speed: 38 + Math.random() * 20,
        };
        setFallingItems((prev) => [...prev, newItem]);
      }

      // Update falling items position & collision
      setFallingItems((prevItems) => {
        const nextItems = [];

        for (let item of prevItems) {
          const newY = item.y + item.speed * delta;

          // Check collision with basket at y ~ 78% to 92%
          const isAtBasketHeight = newY >= 78 && newY <= 92;
          const isAtBasketX = Math.abs(item.x - basketX) < 14;

          if (isAtBasketHeight && isAtBasketX) {
            // Caught!
            if (item.isBonus) {
              sounds.playBonus();
            } else {
              sounds.playCatch();
            }

            setScore((prevScore) => {
              const updated = prevScore + item.points;
              if (updated > highScore) setHighScore(updated);
              if (updated >= WIN_SCORE && !isWon) {
                setIsWon(true);
                setIsPlaying(false);
                sounds.playVictory();
                triggerGrandCelebration();
              }
              return updated;
            });

            setStreak((prev) => {
              const s = prev + 1;
              if (s % 4 === 0) {
                setFeedback({ text: `${s}x Streak! That's my girl! ✨`, color: "text-amber-500" });
              }
              return s;
            });

            continue;
          }

          // Off bottom of screen
          if (newY > 105) {
            setStreak(0);
            continue;
          }

          nextItems.push({ ...item, y: newY });
        }

        return nextItems;
      });

      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isPlaying, basketX, isWon, highScore]);

  return (
    <div className="w-full flex flex-col items-center justify-between pt-16 px-4 max-w-lg mx-auto animate-fadeIn min-h-[90vh]">
      {/* Header */}
      <div className="text-center w-full mb-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold mb-1">
          <Zap className="w-3.5 h-3.5 text-rose-500" />
          <span>Page 3 • Catch My Love Game</span>
        </div>
        <h2 className="font-serif-title text-2xl sm:text-3xl text-rose-800 font-bold">
          Catch My Love & Treats 🍓🍰
        </h2>
        <p className="text-xs text-pink-700 max-w-xs mx-auto">
          Drag your basket to catch treats & hearts. Hit 100 points to win!
        </p>
      </div>

      {/* Scoreboard bar */}
      <div className="w-full max-w-xs flex items-center justify-between px-4 py-2 bg-white/85 rounded-2xl border border-pink-200/90 shadow-xs backdrop-blur-md mb-2">
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 text-pink-500 fill-pink-400" />
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-pink-400">Score</span>
            <span className="text-base font-extrabold text-pink-600 leading-none">
              {score} <span className="text-[10px] text-pink-400 font-normal">/ {WIN_SCORE}</span>
            </span>
          </div>
        </div>

        {feedback && (
          <div className={`text-[11px] font-bold ${feedback.color || 'text-pink-600'} animate-pulse bg-pink-50 px-2.5 py-0.5 rounded-full border border-pink-200`}>
            {feedback.text}
          </div>
        )}

        {streak > 2 && !feedback && (
          <div className="text-[11px] font-bold text-amber-500 animate-pulse bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
            🔥 {streak}x Streak
          </div>
        )}

        <div className="flex items-center gap-2 text-right">
          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase font-bold text-pink-400">Best</span>
            <span className="text-base font-extrabold text-rose-500 leading-none">
              {highScore}
            </span>
          </div>
          <Trophy className="w-4 h-4 text-amber-400" />
        </div>
      </div>

      {/* Main Game Screen */}
      <div
        ref={gameAreaRef}
        onTouchMove={handleTouchMove}
        onMouseMove={(e) => {
          if (isDraggingRef.current) handleTouchMove(e);
        }}
        onMouseDown={() => {
          isDraggingRef.current = true;
        }}
        onMouseUp={() => {
          isDraggingRef.current = false;
        }}
        className="relative w-full max-w-xs sm:max-w-sm h-72 sm:h-80 rounded-3xl bg-gradient-to-b from-pink-50 via-pink-100/40 to-pink-200/50 border-2 border-pink-300 shadow-inner overflow-hidden select-none cursor-pointer flex flex-col justify-between"
      >
        {/* Subtle background decoration */}
        <div className="absolute inset-0 opacity-15 pointer-events-none flex items-center justify-center">
          <Crown className="w-36 h-36 text-pink-400" />
        </div>

        {/* Falling items */}
        {fallingItems.map((item) => (
          <div
            key={item.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              fontSize: item.isBonus ? '28px' : '22px',
            }}
          >
            {item.emoji}
          </div>
        ))}

        {/* The Basket (Player) */}
        <div
          className="absolute bottom-3 transform -translate-x-1/2 transition-all duration-75 pointer-events-none flex flex-col items-center"
          style={{ left: `${basketX}%` }}
        >
          <div className="text-[10px] bg-white/90 text-pink-600 px-2 py-0.5 rounded-full font-bold shadow-xs whitespace-nowrap mb-0.5 border border-pink-200 scale-90">
            👑 My Birthday Girl
          </div>
          <div className="w-14 h-9 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-400 shadow-md border-2 border-white flex items-center justify-center text-lg">
            🧺
          </div>
        </div>

        {/* Start / Pause / Win Overlays */}
        {!isPlaying && !isWon && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center z-10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-pink-400 to-rose-400 text-white flex items-center justify-center shadow-md mb-2 animate-bounce">
              <Play className="w-7 h-7 ml-1" />
            </div>
            <h3 className="font-serif-title text-xl text-rose-800 font-bold mb-1">
              Sweet Catch Game
            </h3>
            <p className="text-xs text-pink-600 mb-3 max-w-[200px]">
              Catch falling cakes, crowns & gifts to reach 100 points!
            </p>
            <button
              onClick={startGame}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold text-sm shadow-md shadow-pink-400/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Tap to Play</span>
            </button>
          </div>
        )}

        {isWon && (
          <div className="absolute inset-0 bg-white/90 backdrop-blur-md flex flex-col items-center justify-center p-4 text-center z-10 animate-fadeIn">
            <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-500 border-2 border-amber-300 flex items-center justify-center mb-1 animate-pulse">
              <Crown className="w-8 h-8 fill-amber-300" />
            </div>
            <h3 className="font-serif-title text-xl text-rose-800 font-bold">
              👑 YOU WON, BABE! 👑
            </h3>
            <p className="font-script text-lg text-pink-600 mb-1">
              Queen of My Heart!
            </p>
            <p className="text-xs text-pink-700/90 mb-3 max-w-[210px]">
              You scored {score} points! You officially win unlimited hugs, free food, and all my love forever.
            </p>
            <div className="flex gap-2">
              <button
                onClick={startGame}
                className="px-3 py-1.5 rounded-full bg-pink-100 text-pink-700 font-medium text-xs hover:bg-pink-200 transition-all flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Play Again</span>
              </button>
              <button
                onClick={() => {
                  sounds.playChime();
                  triggerPinkConfetti();
                }}
                className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium text-xs shadow-xs flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Celebrate</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Touch Controls */}
      <div className="w-full max-w-xs flex items-center justify-between gap-3 mt-3">
        <button
          onClick={() => moveBasketBy(-12)}
          className="flex-1 py-3 rounded-2xl bg-white border border-pink-200 shadow-xs active:bg-pink-100 active:scale-95 transition-all flex items-center justify-center gap-1 text-pink-700 font-semibold text-xs cursor-pointer"
          aria-label="Move Left"
        >
          <ArrowLeft className="w-4 h-4 text-pink-500" />
          <span>Left</span>
        </button>

        {isPlaying && (
          <button
            onClick={() => setIsPlaying(false)}
            className="px-3 py-3 rounded-2xl bg-pink-50 border border-pink-200 text-pink-600 text-xs font-medium cursor-pointer"
          >
            Pause
          </button>
        )}

        <button
          onClick={() => moveBasketBy(12)}
          className="flex-1 py-3 rounded-2xl bg-white border border-pink-200 shadow-xs active:bg-pink-100 active:scale-95 transition-all flex items-center justify-center gap-1 text-pink-700 font-semibold text-xs cursor-pointer"
          aria-label="Move Right"
        >
          <span>Right</span>
          <ArrowRight className="w-4 h-4 text-pink-500" />
        </button>
      </div>

      <div className="text-[11px] text-pink-400 mt-1">
        💡 Drag anywhere on screen or tap Left / Right
      </div>

      {/* Button to advance to Page 4 */}
      <NextSectionButton
        label="Page 4: Make Your Birthday Wish 🎂"
        subtext="Tap to blow out your birthday candles"
        onClick={onNext}
      />
    </div>
  );
}
