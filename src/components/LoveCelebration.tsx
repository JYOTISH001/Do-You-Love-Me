import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Heart } from 'lucide-react';

interface LoveCelebrationProps {
  personName: string;
  onFinished: () => void;
}

export const LoveCelebration: React.FC<LoveCelebrationProps> = ({
  personName,
  onFinished,
}) => {
  useEffect(() => {
    // 1. Center heart explosion
    const count = 180;
    const defaults = {
      origin: { y: 0.6 },
      colors: ['#ff1744', '#ff4f81', '#ff6b9d', '#ffd1dc', '#ffffff', '#8e44ad', '#f39c12'],
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.4,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });

    // 2. Side romantic cannons
    const timer1 = setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff1744', '#ff4f81', '#ffffff'],
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff6b9d', '#8e44ad', '#ffffff'],
      });
    }, 450);

    // 3. Transition to next screen after celebration
    const finishTimer = setTimeout(() => {
      onFinished();
    }, 2200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(finishTimer);
    };
  }, [onFinished]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0c0414]/90 backdrop-blur-md px-4 overflow-hidden"
    >
      {/* Soft romantic light burst background */}
      <motion.div
        initial={{ scale: 0.2, opacity: 0 }}
        animate={{ scale: [0.2, 2.5, 3], opacity: [0, 0.8, 0.4] }}
        transition={{ duration: 1.8, ease: 'easeOut' }}
        className="absolute w-96 h-96 rounded-full bg-gradient-to-tr from-[#ff1744] via-[#ff4f81] to-[#8e44ad] blur-[100px] pointer-events-none"
      />

      <div className="relative z-10 text-center flex flex-col items-center">
        {/* Animated Heartbeat Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.3, 1, 1.25, 1] }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="relative mb-6"
        >
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-[#ff1744] to-[#ff6b9d] flex items-center justify-center shadow-2xl shadow-[#ff4f81]/80 animate-heartbeat">
            <Heart className="w-16 h-16 sm:w-20 sm:h-20 text-white fill-white drop-shadow-md" />
          </div>
          {/* Glowing pulse rings */}
          <div className="absolute inset-0 rounded-full border-2 border-[#ff4f81] animate-ping opacity-60 pointer-events-none" />
        </motion.div>

        {/* Celebration Message */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="text-4xl sm:text-6xl md:text-7xl font-serif-luxury font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#ffccd9] to-[#ff4f81] drop-shadow-[0_4px_25px_rgba(255,79,129,0.8)]"
        >
          I KNEW IT! ❤️
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-3 text-lg sm:text-2xl font-serif-luxury text-white/90 italic"
        >
          My heart belongs to you, {personName || 'my love'} ✨
        </motion.p>

        {/* Shimmering indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0, 1, 0.6], scale: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="mt-8 flex items-center gap-2 text-xs uppercase tracking-widest text-[#ff9bbd] bg-white/5 border border-white/10 px-4 py-1.5 rounded-full"
        >
          <span>Unlocking our love story</span>
          <span className="animate-pulse">💌</span>
        </motion.div>
      </div>
    </motion.div>
  );
};
