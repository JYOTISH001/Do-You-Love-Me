import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, ChevronDown } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

interface LoveLetterProps {
  personName: string;
  yourName: string;
  onNextSection?: () => void;
}

export const LoveLetter: React.FC<LoveLetterProps> = ({
  personName,
  yourName,
  onNextSection,
}) => {
  const [isUnsealed, setIsUnsealed] = useState(false);

  const handleBreakSeal = () => {
    romanticAudio.playLetterOpen();
    setIsUnsealed(true);
  };

  return (
    <section
      id="screen-letter"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16 z-10 select-none overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[32rem] h-[32rem] rounded-full bg-[#ff4f81]/15 blur-[140px] pointer-events-none" />

      {/* Falling Rose Petals effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-xl select-none"
            style={{
              left: `${(i * 8.5) % 100}%`,
              top: '-5%',
              animation: `gentleDrift ${10 + (i % 5) * 3}s linear ${(i * 1.5) % 8}s infinite`,
              opacity: 0.7,
              filter: 'drop-shadow(0 2px 4px rgba(255, 79, 129, 0.3))',
            }}
          >
            🌸
          </div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-widest text-[#ff9bbd] mb-3"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#ff4f81]" />
            <span>Chapter I • The Handwritten Confession</span>
            <Sparkles className="w-3.5 h-3.5 text-[#ff4f81]" />
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-serif-luxury font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#ffe6ec] to-[#ff6b9d]"
          >
            To My Favorite Person ❤️
          </motion.h2>
          <p className="text-white/60 text-sm mt-2">
            A little reminder of how much you mean to me
          </p>
        </div>

        {/* The Realistic Digital Love Letter Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-2xl sm:rounded-3xl p-2 sm:p-3 shadow-[0_20px_60px_-15px_rgba(255,79,129,0.35)]"
          style={{
            background: 'linear-gradient(135deg, rgba(255,107,157,0.2) 0%, rgba(255,255,255,0.05) 50%, rgba(142,68,173,0.2) 100%)',
          }}
        >
          {/* Real Parchment Paper */}
          <div className="relative rounded-xl sm:rounded-2xl bg-letter-paper text-[#2d1b29] p-6 sm:p-12 border border-[#edd7c2] shadow-inner overflow-hidden">
            {/* Elegant Vintage Corner Flourishes */}
            <div className="absolute top-3 left-3 text-[#ff4f81]/30 text-lg font-serif">❦</div>
            <div className="absolute top-3 right-3 text-[#ff4f81]/30 text-lg font-serif">❦</div>
            <div className="absolute bottom-3 left-3 text-[#ff4f81]/30 text-lg font-serif">❦</div>
            <div className="absolute bottom-3 right-3 text-[#ff4f81]/30 text-lg font-serif">❦</div>

            {/* Interactive Wax Seal overlay if not yet unsealed */}
            <AnimatePresence>
              {!isUnsealed && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 1.15 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 bg-[#fffbf5]/95 backdrop-blur-sm z-30 flex flex-col items-center justify-center p-6 text-center cursor-pointer group"
                  onClick={handleBreakSeal}
                >
                  {/* Wax Seal Stamp */}
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.94 }}
                    className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#c0392b] via-[#e74c3c] to-[#962d22] flex items-center justify-center shadow-xl shadow-[#c0392b]/50 border-4 border-[#ffb3ba]/40 mb-4"
                  >
                    <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full border-2 border-dashed border-[#ffd1dc]/60 flex items-center justify-center">
                      <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-[#ffd1dc] fill-[#ffd1dc] drop-shadow-md" />
                    </div>
                  </motion.div>

                  <h3 className="text-xl sm:text-2xl font-serif-luxury font-bold text-[#4a1c2d] mb-1">
                    Sealed with All My Love
                  </h3>
                  <p className="text-xs sm:text-sm text-[#7d3c52] mb-3">
                    For {personName || 'You'} • Click wax seal to open
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-[#c0392b] bg-[#c0392b]/10 px-3 py-1 rounded-full">
                    Tap to Unseal 💌
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Letter Content */}
            <div className="relative z-10 font-serif leading-relaxed">
              {/* Salutation */}
              <div className="flex justify-between items-baseline mb-6 border-b border-[#2d1b29]/10 pb-4">
                <h3 className="text-2xl sm:text-3xl font-script text-[#ff1744]">
                  To {personName ? personName : 'My Favorite Person'},
                </h3>
                <span className="text-xs text-[#8c6779] font-sans tracking-wider">
                  Always & Forever
                </span>
              </div>

              {/* Heartfelt Paragraphs */}
              <div className="space-y-4 text-base sm:text-lg text-[#3b2333]">
                <p>
                  I don't know exactly when you became such an important part of my life, but somehow, you became one of the most beautiful parts of it.
                </p>

                <p>
                  You make ordinary moments feel special. Your smile can change my entire mood. Your presence makes everything feel a little better.
                </p>

                <p className="text-sm sm:text-base italic text-[#5c374f]">
                  I may not always have the perfect words to explain what I feel, but one thing will always be simple:
                </p>

                {/* Big Highlight Quote */}
                <div className="py-4 my-2 text-center">
                  <span className="inline-block text-2xl sm:text-3xl md:text-4xl font-serif-luxury font-extrabold text-[#ff1744] tracking-wide px-4 py-1.5 rounded-xl bg-[#ff1744]/10 border border-[#ff1744]/20 shadow-sm">
                    I LOVE YOU. ❤️
                  </span>
                </div>

                <p>
                  Thank you for being you. Thank you for every smile, every conversation, every little moment and every memory.
                </p>

                <p>
                  If I could choose one person to make countless beautiful memories with, I would choose you again and again.
                </p>

                <p className="font-semibold text-[#8e1b3c]">
                  Always you. Always us. ❤️
                </p>
              </div>

              {/* Signature Block */}
              <div className="mt-8 pt-6 border-t border-[#2d1b29]/10 flex flex-col items-end">
                <span className="text-sm sm:text-base text-[#6b3f55] italic">
                  With all my heart,
                </span>
                <span className="text-2xl sm:text-3xl font-script text-[#ff1744] font-bold mt-1">
                  {yourName ? yourName : 'Yours'} ❤️
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scroll down prompt */}
        {onNextSection && (
          <div className="flex justify-center mt-10">
            <button
              onClick={onNextSection}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-medium transition cursor-pointer group shadow-lg"
            >
              <span>Explore Our Memories</span>
              <ChevronDown className="w-4 h-4 text-[#ff4f81] group-hover:translate-y-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
