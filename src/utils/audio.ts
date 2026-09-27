/**
 * Romantic Audio Engine
 * Uses Web Audio API synthesizer for zero-dependency, guaranteed audio playback (no broken external audio files!),
 * with seamless fallback to custom audio URLs if provided in config.
 */

class RomanticAudioEngine {
  private ctx: AudioContext | null = null;
  private melodyInterval: number | null = null;
  private isMelodyPlaying: boolean = false;
  private externalAudio: HTMLAudioElement | null = null;
  private masterGain: GainNode | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = 0.5;
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  // Play a soft acoustic chord / bell note with gentle harmonic envelope
  private playBellNote(freq: number, duration: number = 2.0, timeOffset: number = 0, gainLevel: number = 0.2) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime + timeOffset;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Warm sine wave with subtle triangle overtone for music box warmth
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now);

    // Envelope: quick gentle attack, soft warm decay
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(gainLevel, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + duration + 0.1);
  }

  // Romantic music box arpeggio progression: Cmaj9 - Am9 - Fmaj7 - Gsus4
  public startRomanticMelody(customUrl?: string) {
    if (this.isMelodyPlaying) return;

    if (customUrl && customUrl.trim().length > 0) {
      try {
        if (!this.externalAudio) {
          this.externalAudio = new Audio(customUrl);
          this.externalAudio.loop = true;
        }
        this.externalAudio.play().then(() => {
          this.isMelodyPlaying = true;
        }).catch(() => {
          // If external audio fails (CORS or 404), fall back to Web Audio synth
          this.playSynthMelodyLoop();
        });
        return;
      } catch {
        // Fall back to synth
      }
    }

    this.playSynthMelodyLoop();
  }

  private playSynthMelodyLoop() {
    this.initContext();
    this.isMelodyPlaying = true;

    // Romantic dreamy arpeggio chords in Hz:
    // Cmaj9: C4, E4, G4, B4, D5
    // Am9: A3, C4, E4, G4, B4
    // Fmaj7: F3, A3, C4, E4, G4
    // Gsus4: G3, C4, D4, G4, B4
    const chordProgressions = [
      [261.63, 329.63, 392.00, 493.88, 587.33], // Cmaj9
      [220.00, 261.63, 329.63, 392.00, 493.88], // Am9
      [174.61, 220.00, 261.63, 329.63, 392.00], // Fmaj7
      [196.00, 261.63, 293.66, 392.00, 493.88], // Gsus4
    ];

    let currentChordIndex = 0;

    const playChordPattern = () => {
      if (!this.isMelodyPlaying) return;
      const chord = chordProgressions[currentChordIndex];
      // Play arpeggiated notes
      chord.forEach((freq, idx) => {
        this.playBellNote(freq, 2.5, idx * 0.45, 0.12);
      });
      // Soft root chime
      this.playBellNote(chord[0] / 2, 3.5, 0, 0.16);

      currentChordIndex = (currentChordIndex + 1) % chordProgressions.length;
    };

    playChordPattern();
    this.melodyInterval = window.setInterval(playChordPattern, 2800);
  }

  public stopRomanticMelody() {
    this.isMelodyPlaying = false;
    if (this.melodyInterval) {
      clearInterval(this.melodyInterval);
      this.melodyInterval = null;
    }
    if (this.externalAudio) {
      this.externalAudio.pause();
      this.externalAudio.currentTime = 0;
    }
  }

  public toggleRomanticMelody(customUrl?: string): boolean {
    if (this.isMelodyPlaying) {
      this.stopRomanticMelody();
      return false;
    } else {
      this.startRomanticMelody(customUrl);
      return true;
    }
  }

  public isPlaying(): boolean {
    return this.isMelodyPlaying;
  }

  // Playful boop sound when NO button is clicked / hovered
  public playCuteBoop() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    // Pitch drops playfully: 520Hz down to 240Hz
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(240, now + 0.15);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.2);
  }

  // Joyous celebratory fanfare when YES is clicked
  public playYesCelebration() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    // Ascending romantic arpeggio fanfare
    const notes = [
      { freq: 523.25, time: 0.00 }, // C5
      { freq: 659.25, time: 0.08 }, // E5
      { freq: 783.99, time: 0.16 }, // G5
      { freq: 1046.50, time: 0.24 }, // C6
      { freq: 1318.51, time: 0.36 }, // E6
    ];

    notes.forEach((n) => {
      this.playBellNote(n.freq, 1.8, n.time, 0.25);
    });

    // Sub warm heart burst
    this.playHeartbeat();
  }

  // Heartbeat sound (deep double-thump: lub-dub)
  public playHeartbeat() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const playThump = (offset: number, freq: number, gainLevel: number) => {
      if (!this.ctx || !this.masterGain) return;
      const now = this.ctx.currentTime + offset;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.2);

      gain.gain.setValueAtTime(gainLevel, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.25);
    };

    playThump(0, 80, 0.35);
    playThump(0.18, 65, 0.28);
  }

  // Shimmer sound when opening love letter
  public playLetterOpen() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const chimeNotes = [440, 554.37, 659.25, 880, 1108.73];
    chimeNotes.forEach((freq, idx) => {
      this.playBellNote(freq, 1.4, idx * 0.06, 0.15);
    });
  }

  // Gentle magical welcome burst chime
  public playWelcomeChime() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    // Tender harmonic chime (A major 9)
    const notes = [
      { freq: 440.00, time: 0.00 }, // A4
      { freq: 554.37, time: 0.08 }, // C#5
      { freq: 659.25, time: 0.16 }, // E5
      { freq: 830.61, time: 0.24 }, // G#5
      { freq: 1108.73, time: 0.35 }, // C#6
    ];

    notes.forEach((n) => {
      this.playBellNote(n.freq, 2.2, n.time, 0.2);
    });

    this.playHeartbeat();
  }
}

export const romanticAudio = new RomanticAudioEngine();
