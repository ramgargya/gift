import confetti from 'canvas-confetti';

// Pretty pink & pastel color palette
const PINK_PALETTE = ['#ff69b4', '#ffb6c1', '#ff1493', '#ffffff', '#ffd700', '#ff85a2', '#fbcfe8'];

export const triggerPinkConfetti = (originY = 0.7) => {
  confetti({
    particleCount: 70,
    spread: 60,
    origin: { y: originY },
    colors: PINK_PALETTE,
    ticks: 200,
    gravity: 0.8,
    scalar: 1.1,
    shapes: ['circle', 'square'],
  });
};

export const triggerHeartShower = () => {
  const end = Date.now() + 2 * 1000;

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: PINK_PALETTE,
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: PINK_PALETTE,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };
  frame();
};

export const triggerCandleWishConfetti = () => {
  // Center blast
  confetti({
    particleCount: 120,
    spread: 100,
    origin: { y: 0.6 },
    colors: ['#ff4d88', '#ff99c8', '#ffffff', '#ffd166', '#fcf6bd'],
    startVelocity: 35,
    scalar: 1.2,
  });

  setTimeout(() => {
    confetti({
      particleCount: 80,
      angle: 60,
      spread: 80,
      origin: { x: 0.1, y: 0.5 },
      colors: PINK_PALETTE,
    });
    confetti({
      particleCount: 80,
      angle: 120,
      spread: 80,
      origin: { x: 0.9, y: 0.5 },
      colors: PINK_PALETTE,
    });
  }, 250);
};

export const triggerGrandCelebration = () => {
  const duration = 3 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) {
      return clearInterval(interval);
    }
    const particleCount = 50 * (timeLeft / duration);
    confetti({
      ...defaults,
      particleCount,
      origin: { x: 0.2 + Math.random() * 0.6, y: Math.random() - 0.2 },
      colors: PINK_PALETTE,
    });
  }, 250);
};
