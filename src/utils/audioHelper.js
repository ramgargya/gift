// Web Audio API sound generator for cute chimes, game sounds, and a sweet music-box birthday melody
class SoundEffects {
  constructor() {
    this.ctx = null;
    this.isPlayingMusic = false;
    this.musicTimer = null;
    this.isMuted = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play a gentle bell/music-box note
  playTone(freq, duration = 0.4, type = 'sine', gainVal = 0.15) {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn("Audio play error", e);
    }
  }

  // Cute chime on tap / card flip
  playChime() {
    this.playTone(523.25, 0.3, 'triangle', 0.12); // C5
    setTimeout(() => this.playTone(659.25, 0.35, 'triangle', 0.12), 80); // E5
    setTimeout(() => this.playTone(783.99, 0.4, 'triangle', 0.15), 160); // G5
  }

  // Catch item sound in game
  playCatch() {
    this.playTone(880, 0.15, 'sine', 0.18); // A5
    setTimeout(() => this.playTone(1174.66, 0.2, 'sine', 0.2), 60); // D6
  }

  // Bonus item caught
  playBonus() {
    const notes = [659.25, 783.99, 987.77, 1318.51];
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playTone(freq, 0.25, 'triangle', 0.15), idx * 70);
    });
  }

  // Blow candle sound (gentle wind puff + high sparkle)
  playBlow() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;
      // White noise buffer for puff
      const bufferSize = this.ctx.sampleRate * 0.5;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * 0.1;
      }
      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.5);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      whiteNoise.start();
      whiteNoise.stop(this.ctx.currentTime + 0.5);

      // Followed by twinkling harp
      setTimeout(() => this.playBonus(), 300);
    } catch (e) {
      console.warn("Blow audio error", e);
    }
  }

  // Celebration fanfare
  playVictory() {
    const melody = [
      { f: 523.25, d: 0.18 }, // C5
      { f: 523.25, d: 0.18 }, // C5
      { f: 587.33, d: 0.35 }, // D5
      { f: 523.25, d: 0.35 }, // C5
      { f: 698.46, d: 0.35 }, // F5
      { f: 659.25, d: 0.7 }   // E5
    ];
    let time = 0;
    melody.forEach((note) => {
      setTimeout(() => {
        this.playTone(note.f, note.d, 'triangle', 0.22);
      }, time);
      time += note.d * 900;
    });
  }

  // Gentle Music Box "Happy Birthday" melody loop
  startHappyBirthdayMelody() {
    if (this.isPlayingMusic) return;
    this.isPlayingMusic = true;

    // Frequencies: G4, G4, A4, G4, C5, B4, etc.
    const tune = [
      { f: 392.00, d: 0.3, pause: 0.35 }, // Happy
      { f: 392.00, d: 0.2, pause: 0.25 }, // Birth-
      { f: 440.00, d: 0.45, pause: 0.55 }, // -day
      { f: 392.00, d: 0.45, pause: 0.55 }, // to
      { f: 523.25, d: 0.5, pause: 0.6 },  // you
      { f: 493.88, d: 0.9, pause: 1.1 },  // ~

      { f: 392.00, d: 0.3, pause: 0.35 }, // Happy
      { f: 392.00, d: 0.2, pause: 0.25 }, // Birth-
      { f: 440.00, d: 0.45, pause: 0.55 }, // -day
      { f: 392.00, d: 0.45, pause: 0.55 }, // to
      { f: 587.33, d: 0.5, pause: 0.6 },  // you
      { f: 523.25, d: 0.9, pause: 1.1 },  // ~

      { f: 392.00, d: 0.3, pause: 0.35 }, // Happy
      { f: 392.00, d: 0.2, pause: 0.25 }, // Birth-
      { f: 783.99, d: 0.5, pause: 0.6 },  // -day
      { f: 659.25, d: 0.5, pause: 0.6 },  // dear
      { f: 523.25, d: 0.5, pause: 0.6 },  // prin-
      { f: 493.88, d: 0.4, pause: 0.5 },  // -cess
      { f: 440.00, d: 0.9, pause: 1.1 },  // ~

      { f: 698.46, d: 0.3, pause: 0.35 }, // Hap-
      { f: 698.46, d: 0.2, pause: 0.25 }, // -py
      { f: 659.25, d: 0.5, pause: 0.6 },  // birth-
      { f: 523.25, d: 0.5, pause: 0.6 },  // -day
      { f: 587.33, d: 0.5, pause: 0.6 },  // to
      { f: 523.25, d: 1.2, pause: 1.6 }   // you ~
    ];

    let step = 0;
    const playNext = () => {
      if (!this.isPlayingMusic) return;

      if (step >= tune.length) {
        step = 0;
        this.musicTimer = setTimeout(playNext, 2500); // 2.5s gentle rest before loop
        return;
      }

      const item = tune[step];
      if (!this.isMuted) {
        // play dual tone for rich celesta / music box bell timbre
        this.playTone(item.f, item.d * 1.4, 'sine', 0.12);
        this.playTone(item.f * 2, item.d * 0.8, 'triangle', 0.04);
      }

      step++;
      this.musicTimer = setTimeout(playNext, item.pause * 1000);
    };

    playNext();
  }

  stopMusic() {
    this.isPlayingMusic = false;
    if (this.musicTimer) {
      clearTimeout(this.musicTimer);
      this.musicTimer = null;
    }
  }

  toggleMusic() {
    if (this.isPlayingMusic) {
      this.stopMusic();
      return false;
    } else {
      this.startHappyBirthdayMelody();
      return true;
    }
  }
}

export const sounds = new SoundEffects();
