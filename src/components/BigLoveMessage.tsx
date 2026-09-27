import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';

interface BigLoveMessageProps {
  personName: string;
}

export const BigLoveMessage: React.FC<BigLoveMessageProps> = ({ personName }) => {
  return (
    <section
      id="screen-big-love"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 text-center select-none overflow-hidden"
    >
      {/* Intense Romantic Nebula Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,23,68,0.2)_0%,_rgba(142,68,173,0.15)_40%,_transparent_75%)] pointer-events-none" />
      <div className="absolute w-[40rem] h-[40rem] rounded-full bg-[#ff4f81]/20 blur-[150px] pointer-events-none animate-pulse" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center space-y-8 sm:space-y-10">
        {/* Floating Heart Coronet */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative"
        >
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-[#ff1744] via-[#ff4f81] to-[#8e44ad] p-1 flex items-center justify-center shadow-[0_0_50px_rgba(255,79,129,0.8)]">
            <div className="w-full h-full rounded-full bg-[#130420] flex items-center justify-center">
              <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-[#ff4f81] fill-[#ff4f81] animate-heartbeat" />
            </div>
          </div>
          <div className="absolute -inset-2 rounded-full border border-[#ff4f81]/30 animate-ping opacity-40 pointer-events-none" />
        </motion.div>

        {/* Phase 1: "Out of all the people in this world..." */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl sm:text-3xl md:text-4xl font-serif-luxury text-white/80 font-light tracking-wide"
        >
          Out of all the people in this world...
        </motion.p>

        {/* Phase 2: "I'd still choose you. ❤️" */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="inline-block px-6 py-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl"
        >
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif-luxury font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#ffe6ec] to-[#ff4f81]">
            I'd still choose you. <span className="text-[#ff1744]">❤️</span>
          </h2>
        </motion.div>

        {/* Phase 3: "Today. Tomorrow. And every day after that." */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="space-y-1 sm:space-y-2 text-lg sm:text-2xl font-serif-luxury text-[#ffccd9] italic"
        >
          <p>Today.</p>
          <p>Tomorrow.</p>
          <p className="font-bold text-white not-italic">And every day after that.</p>
        </motion.div>

        {/* Phase 4: Giant Animated "I LOVE YOU ❤️" */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, delay: 1.4, type: 'spring', stiffness: 200 }}
          className="pt-6"
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif-luxury font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] via-[#ffccd9] to-[#ff4f81] drop-shadow-[0_0_40px_rgba(255,79,129,0.9)]">
            {personName ? `${personName.toUpperCase()}, ` : ''}I LOVE YOU <span className="text-[#ff1744]">❤️</span>
          </h1>
        </motion.div>

        {/* Decorative sparkles */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.8 }}
          className="flex items-center justify-center gap-2 text-xs sm:text-sm text-[#ff9bbd]"
        >
          <Sparkles className="w-4 h-4 text-[#ff4f81]" />
          <span>My heart is forever in your hands</span>
          <Sparkles className="w-4 h-4 text-[#ff4f81]" />
        </motion.div>
      </div>
    </section>
  );
};
