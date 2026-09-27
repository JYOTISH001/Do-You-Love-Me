import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

interface WelcomeLoaderProps {
  personName?: string;
  musicUrl?: string;
  onComplete: () => void;
}

type WelcomePhase = 'dark' | 'spark' | 'whisper' | 'loading' | 'completed' | 'entering';

const LOADING_MESSAGES = [
  'Preparing something special... 💌',
  'Gathering a few memories... ❤️',
  'Adding a little magic... ✨',
  'Almost ready... 🥺',
  'Just for you... ❤️',
];

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speedY: number;
  type: 'dot' | 'sparkle' | 'heart';
}

interface ConfettiHeart {
  id: number;
  x: number;
  y: number;
  scale: number;
  vx: number;
  vy: number;
  rot: number;
  color: string;
}

export const WelcomeLoader: React.FC<WelcomeLoaderProps> = ({
  personName = 'My Love',
  musicUrl,
  onComplete,
}) => {
  const [phase, setPhase] = useState<WelcomePhase>('dark');
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [confettiHearts, setConfettiHearts] = useState<ConfettiHeart[]>([]);
  const hasFinishedRef = useRef(false);

  // Background floating particles state
  const [particles, setParticles] = useState<Particle[]>(() => {
    return Array.from({ length: 28 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 2,
      opacity: Math.random() * 0.5 + 0.2,
      speedY: Math.random() * 0.4 + 0.15,
      type: i % 7 === 0 ? 'heart' : i % 3 === 0 ? 'sparkle' : 'dot',
    }));
  });

  // Floating particles animation loop
  useEffect(() => {
    let animId: number;
    const update = () => {
      setParticles((prev) =>
        prev.map((p) => {
          let newY = p.y - p.speedY * 0.3;
          if (newY < -5) newY = 105;
          return { ...p, y: newY };
        })
      );
      animId = requestAnimationFrame(update);
    };
    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Main cinematic timeline sequence
  useEffect(() => {
    // 0.0s -> 0.6s: Pure dark screen to build mystery
    const t0 = setTimeout(() => {
      setPhase('spark');
    }, 600);

    // 0.6s -> 2.4s: "Hey... ❤️"
    const t1 = setTimeout(() => {
      setPhase('whisper');
    }, 2500);

    // 2.4s -> 4.2s: "I made something for you..."
    const t2 = setTimeout(() => {
      setPhase('loading');
    }, 4500);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Smooth loading progress animation (approx 3.6 seconds)
  useEffect(() => {
    if (phase !== 'loading') return;

    const startTime = performance.now();
    const duration = 3600; // 3.6s smooth duration

    let frameId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const pct = Math.min(100, (elapsed / duration) * 100);

      // Non-linear easing for natural feeling (starts gentle, accelerates, then softly lands on 100)
      const easedPct = Math.min(
        100,
        pct < 50
          ? 2 * Math.pow(pct / 100, 1.8) * 100
          : (1 - Math.pow(-2 * (pct / 100) + 2, 1.8) / 2) * 100
      );

      setProgress(easedPct);

      // Update sequential messages based on progress intervals
      if (easedPct < 22) setMessageIndex(0);
      else if (easedPct < 45) setMessageIndex(1);
      else if (easedPct < 68) setMessageIndex(2);
      else if (easedPct < 90) setMessageIndex(3);
      else setMessageIndex(4);

      if (easedPct >= 100) {
        setProgress(100);
        setTimeout(() => {
          setPhase('completed');
        }, 350);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [phase]);

  // Audio mute/play toggle
  const toggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    const playing = romanticAudio.toggleRomanticMelody(musicUrl);
    setIsAudioPlaying(playing);
  };

  // Complete and enter
  const handleEnter = () => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;

    setPhase('entering');
    romanticAudio.playWelcomeChime();

    // Spawn burst of romantic confetti hearts
    const hearts: ConfettiHeart[] = Array.from({ length: 32 }, (_, i) => {
      const angle = (i / 32) * Math.PI * 2;
      const speed = Math.random() * 8 + 4;
      return {
        id: i,
        x: 50,
        y: 50,
        scale: Math.random() * 0.8 + 0.6,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        rot: Math.random() * 360,
        color: ['#ff4f81', '#ff1744', '#ff7597', '#ffccd9', '#ffffff'][i % 5],
      };
    });
    setConfettiHearts(hearts);

    // Fade out and invoke onComplete
    setTimeout(() => {
      onComplete();
    }, 750);
  };

  const handleSkip = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    onComplete();
  };

  return (
    <motion.div
      id="welcome-loader-screen"
      initial={{ opacity: 1 }}
      animate={
        phase === 'entering'
          ? {
              opacity: 0,
              scale: 1.08,
              filter: 'blur(10px)',
              transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
            }
          : { opacity: 1, scale: 1, filter: 'blur(0px)' }
      }
      className="fixed inset-0 z-50 flex flex-col items-center justify-center select-none overflow-hidden bg-[#07020d]"
    >
      {/* 1. Deep Romantic Background & Atmospheric Light */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Deep romantic gradient base */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#090212] via-[#12031c] to-[#06010a]" />

        {/* Soft glowing radiant light in center */}
        <motion.div
          animate={{
            scale: phase === 'completed' || phase === 'entering' ? [1.2, 1.45, 1.3] : [1, 1.15, 1],
            opacity: phase === 'completed' ? 0.85 : phase === 'dark' ? 0 : 0.5,
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[540px] h-[340px] sm:h-[540px] rounded-full bg-gradient-to-r from-[#ff4f81]/30 via-[#c2185b]/20 to-[#8a2be2]/25 blur-[90px]"
        />

        {/* Subtle romantic bokeh orbs */}
        <div className="absolute top-[20%] left-[15%] w-72 h-72 rounded-full bg-[#ff4f81]/10 blur-[100px] animate-pulse" />
        <div className="absolute bottom-[20%] right-[15%] w-80 h-80 rounded-full bg-[#8a2be2]/15 blur-[120px] animate-pulse" />

        {/* Soft floating background particles */}
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute pointer-events-none transition-transform"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              opacity: phase === 'dark' ? 0 : p.opacity,
            }}
          >
            {p.type === 'heart' ? (
              <Heart className="w-2.5 h-2.5 text-[#ff7597]/40 fill-[#ff7597]/20" />
            ) : p.type === 'sparkle' ? (
              <Sparkles className="w-2 h-2 text-[#fff]/50" />
            ) : (
              <div
                className="rounded-full bg-[#ffccd9]/60 shadow-[0_0_8px_rgba(255,204,217,0.8)]"
                style={{ width: `${p.size}px`, height: `${p.size}px` }}
              />
            )}
          </div>
        ))}

        {/* Soft cinematic vignette around edges */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.85) 100%)',
          }}
        />
      </div>

      {/* 2. Top Controls: Sound Toggle */}
      <div className="absolute top-5 right-5 z-30">
        <button
          id="btn-welcome-audio-toggle"
          onClick={toggleAudio}
          type="button"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white text-xs font-light tracking-wide backdrop-blur-md transition-all cursor-pointer"
          title={isAudioPlaying ? 'Mute romantic audio' : 'Play romantic audio'}
        >
          {isAudioPlaying ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-[#ff4f81] animate-pulse" />
              <span className="text-[11px]">Sound On</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-white/40" />
              <span className="text-[11px] text-white/40">Sound Off</span>
            </>
          )}
        </button>
      </div>

      {/* 3. Center Content Area */}
      <div className="relative z-20 flex flex-col items-center justify-center px-6 max-w-lg w-full text-center">
        {/* INITIAL SPARK & HEART ICON */}
        <AnimatePresence mode="wait">
          {phase === 'spark' && (
            <motion.div
              key="spark-stage"
              initial={{ opacity: 0, scale: 0.5, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.8, filter: 'blur(8px)' }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              {/* Glowing tiny heart expanding */}
              <div className="relative mb-6">
                <motion.div
                  initial={{ scale: 0.3, opacity: 0 }}
                  animate={{ scale: [1, 1.2, 1], opacity: 1 }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-14 h-14 rounded-full bg-[#ff4f81]/20 blur-md absolute -inset-2"
                />
                <Heart className="w-10 h-10 text-[#ff4f81] fill-[#ff4f81] drop-shadow-[0_0_15px_rgba(255,79,129,0.8)]" />
              </div>

              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.3 }}
                className="font-serif-luxury text-3xl sm:text-4xl text-white font-light tracking-wide"
              >
                Hey... <span className="text-[#ff4f81] font-normal">❤️</span>
              </motion.h2>
            </motion.div>
          )}

          {phase === 'whisper' && (
            <motion.div
              key="whisper-stage"
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(8px)', y: 10 }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
              exit={{ opacity: 0, scale: 0.9, filter: 'blur(8px)', y: -10 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              <div className="relative mb-6">
                <Heart className="w-12 h-12 text-[#ff4f81] fill-[#ff4f81] drop-shadow-[0_0_20px_rgba(255,79,129,0.9)] animate-heartbeat" />
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="font-cormorant italic text-2xl sm:text-3xl text-[#ffe3ea] font-light tracking-wide"
              >
                &ldquo;I made something for you...&rdquo;
              </motion.p>
            </motion.div>
          )}

          {phase === 'loading' && (
            <motion.div
              key="loading-stage"
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(6px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.05, filter: 'blur(6px)' }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center w-full"
            >
              {/* Animated Custom Heart-Based Loader */}
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 mb-6 flex items-center justify-center">
                {/* Heart ambient backlight halo */}
                <motion.div
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.4, 0.7, 0.4],
                  }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute inset-0 rounded-full bg-[#ff4f81]/25 blur-xl pointer-events-none"
                />

                {/* SVG Heart Loader with dynamic clip-path fill from bottom to top */}
                <svg
                  viewBox="0 0 100 90"
                  className="w-full h-full drop-shadow-[0_0_18px_rgba(255,79,129,0.6)]"
                >
                  <defs>
                    {/* Linear gradient for warm liquid fill */}
                    <linearGradient id="heartGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="#d81b60" />
                      <stop offset="60%" stopColor="#ff4f81" />
                      <stop offset="100%" stopColor="#ff85a2" />
                    </linearGradient>

                    {/* Clip-path that moves up as progress increases */}
                    <clipPath id="heart-fill-clip">
                      <rect
                        x="0"
                        y={90 - (progress / 100) * 90}
                        width="100"
                        height={(progress / 100) * 90}
                      />
                    </clipPath>
                  </defs>

                  {/* 1. Background delicate heart outline */}
                  <path
                    d="M 50,80 C 15,55 0,35 0,20 C 0,8 10,0 22,0 C 33,0 43,6 50,18 C 57,6 67,0 78,0 C 90,0 100,8 100,20 C 100,35 85,55 50,80 Z"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.15)"
                    strokeWidth="2.5"
                  />

                  {/* 2. Inner filled heart clipped by progress */}
                  <g clipPath="url(#heart-fill-clip)">
                    <path
                      d="M 50,80 C 15,55 0,35 0,20 C 0,8 10,0 22,0 C 33,0 43,6 50,18 C 57,6 67,0 78,0 C 90,0 100,8 100,20 C 100,35 85,55 50,80 Z"
                      fill="url(#heartGrad)"
                    />
                  </g>

                  {/* 3. Foreground glowing neon heart outline */}
                  <path
                    d="M 50,80 C 15,55 0,35 0,20 C 0,8 10,0 22,0 C 33,0 43,6 50,18 C 57,6 67,0 78,0 C 90,0 100,8 100,20 C 100,35 85,55 50,80 Z"
                    fill="none"
                    stroke="#ff4f81"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      filter: 'drop-shadow(0 0 6px rgba(255, 79, 129, 0.9))',
                    }}
                  />
                </svg>

                {/* Progress % inside or superimposed in heart */}
                <div className="absolute inset-0 flex items-center justify-center pt-1 pointer-events-none">
                  <span className="font-serif-luxury text-sm sm:text-base font-semibold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    {Math.floor(progress)}%
                  </span>
                </div>
              </div>

              {/* Sequential Romantic Text Sequence */}
              <div className="h-10 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={messageIndex}
                    initial={{ opacity: 0, y: 6, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -6, filter: 'blur(4px)' }}
                    transition={{ duration: 0.45 }}
                    className="font-sans text-sm sm:text-base text-white/80 font-light tracking-wide"
                  >
                    {LOADING_MESSAGES[messageIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Delicate thin progress bar accent */}
              <div className="w-48 sm:w-56 h-[2px] bg-white/10 rounded-full mt-4 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#ff4f81] to-[#ff1744] shadow-[0_0_8px_#ff4f81] transition-all duration-100 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </motion.div>
          )}

          {(phase === 'completed' || phase === 'entering') && (
            <motion.div
              key="completed-stage"
              initial={{ opacity: 0, scale: 0.85, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              {/* Luminous glowing heart burst */}
              <div className="relative mb-6">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: [1, 1.3, 1.15], opacity: [0.6, 1, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-24 h-24 rounded-full bg-gradient-to-r from-[#ff4f81]/40 to-[#ff1744]/40 blur-2xl absolute -inset-3 pointer-events-none"
                />
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Heart className="w-16 h-16 text-[#ff1744] fill-[#ff4f81] drop-shadow-[0_0_30px_rgba(255,23,68,0.9)]" />
                </motion.div>
              </div>

              {/* 100% Completion Text */}
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="font-serif-luxury text-3xl sm:text-4xl text-white font-bold tracking-tight mb-2"
              >
                Ready? <span className="text-[#ff4f81]">❤️</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="font-cormorant italic text-lg sm:text-xl text-[#ffccd9] font-light mb-8"
              >
                Let&apos;s begin...
              </motion.p>

              {/* The "Enter My Heart ❤️" Button */}
              <motion.button
                id="btn-enter-my-heart"
                type="button"
                onClick={handleEnter}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="group relative flex items-center justify-center gap-3 px-8 py-4 sm:px-10 sm:py-4.5 rounded-full bg-gradient-to-r from-[#ff4f81]/30 via-[#c2185b]/30 to-[#ff1744]/30 hover:from-[#ff4f81]/50 hover:to-[#ff1744]/50 backdrop-blur-xl border border-[#ff4f81]/70 text-white font-medium text-base sm:text-lg shadow-[0_0_30px_rgba(255,79,129,0.45)] hover:shadow-[0_0_45px_rgba(255,79,129,0.7)] transition-all cursor-pointer overflow-hidden min-h-[52px]"
              >
                {/* Internal button shimmer light */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

                <Heart className="w-5 h-5 text-[#ff4f81] group-hover:text-white fill-[#ff4f81] group-hover:fill-white transition-colors animate-heartbeat" />
                <span className="tracking-wide font-serif-luxury font-semibold">
                  Enter My Heart <span className="text-[#ffccd9]">❤️</span>
                </span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Confetti hearts on enter click */}
      {confettiHearts.length > 0 && (
        <div className="absolute inset-0 pointer-events-none z-40 overflow-hidden">
          {confettiHearts.map((c) => (
            <motion.div
              key={c.id}
              initial={{ x: '50vw', y: '50vh', scale: 0, opacity: 1, rotate: c.rot }}
              animate={{
                x: `calc(50vw + ${c.vx * 35}px)`,
                y: `calc(50vh + ${c.vy * 35}px)`,
                scale: [0, c.scale, 0.4],
                opacity: [1, 1, 0],
                rotate: c.rot + 180,
              }}
              transition={{ duration: 0.75, ease: 'easeOut' }}
              className="absolute"
            >
              <Heart
                className="w-6 h-6"
                style={{ color: c.color, fill: c.color, filter: 'drop-shadow(0 0 8px currentColor)' }}
              />
            </motion.div>
          ))}
        </div>
      )}
{/* Jyotish Logo */}
<div className="absolute bottom-6 left-6 z-30">
  <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/5 border border-[#ff4f81]/20 backdrop-blur-md">
    <Sparkles className="w-3.5 h-3.5 text-[#ff4f81]" />
    <span className="font-serif-luxury text-sm text-[#ffccd9] tracking-widest">
      Design by Jyotish
    </span>
  </div>
</div>

      {/* 4. Bottom-right subtle "Skip intro" button */}
      <div className="absolute bottom-6 right-6 z-30">
        <button
          id="btn-skip-intro"
          type="button"
          onClick={handleSkip}
          className="text-white/40 hover:text-white/80 text-xs font-light tracking-wider transition-colors duration-300 cursor-pointer select-none py-2 px-3 rounded-lg hover:bg-white/5"
        >
          
          Skip intro &rarr;
        </button>
      </div>
    </motion.div>
  );
};
