import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Mail, Lock, BellRing } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

interface LoveRevealProps {
  personName: string;
  onOpenLetter: () => void;
}

export const LoveReveal: React.FC<LoveRevealProps> = ({
  personName,
  onOpenLetter,
}) => {
  // Secret 5-clicks tracker
  const [heartClickCount, setHeartClickCount] = useState(0);
  const [showSecretModal, setShowSecretModal] = useState(false);
  const [secretStep, setSecretStep] = useState<1 | 2 | 3>(1);

  const quoteText = "More than words can ever explain.";
  const letters = Array.from(quoteText);

  const handleHeartClick = () => {
    romanticAudio.playHeartbeat();
    const newCount = heartClickCount + 1;
    setHeartClickCount(newCount);

    if (newCount === 5) {
      setShowSecretModal(true);
      setSecretStep(1);
    }
  };

  const handleOpenLetterClick = () => {
    romanticAudio.playLetterOpen();
    onOpenLetter();
  };

  return (
    <section
      id="screen-reveal"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16 text-center select-none overflow-hidden"
    >
      {/* Background glow flares */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[34rem] h-[34rem] rounded-full bg-gradient-to-tr from-[#ff1744]/25 via-[#ff4f81]/30 to-[#8e44ad]/25 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
        {/* Subtle romantic tagline */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm text-[#ffccd9] mb-8"
        >
          <Sparkles className="w-4 h-4 text-[#ff4f81]" />
          <span>Written from the depths of my soul</span>
          <Sparkles className="w-4 h-4 text-[#ff4f81]" />
        </motion.div>

        {/* Large Interactive Animated Heart (Beats & Easter Egg Trigger) */}
        <div className="relative mb-6 cursor-pointer group" onClick={handleHeartClick}>
          {/* Subtle click indicator tooltip when clicked a few times */}
          {heartClickCount > 0 && heartClickCount < 5 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/60 border border-white/20 text-white text-[11px] px-2.5 py-0.5 rounded-full"
            >
              {heartClickCount}/5 💓
            </motion.div>
          )}

          <motion.div
            animate={{
              scale: [1, 1.1, 1, 1.15, 1],
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            whileHover={{ scale: 1.18 }}
            whileTap={{ scale: 0.95 }}
            className="w-36 h-36 sm:w-48 sm:h-48 rounded-full bg-gradient-to-tr from-[#ff1744] via-[#ff4f81] to-[#ff80bf] p-1 flex items-center justify-center shadow-[0_0_60px_rgba(255,79,129,0.7)] transition-shadow group-hover:shadow-[0_0_80px_rgba(255,79,129,0.9)]"
          >
            <div className="w-full h-full rounded-full bg-[#160624]/60 backdrop-blur-sm flex items-center justify-center border border-white/20">
              <Heart className="w-20 h-20 sm:w-28 sm:h-28 text-white fill-[#ff4f81] drop-shadow-[0_4px_15px_rgba(255,23,68,0.8)]" />
            </div>
          </motion.div>

          {/* Pulse ring */}
          <div className="absolute inset-0 rounded-full border-2 border-[#ff4f81]/50 animate-ping pointer-events-none opacity-40" />
        </div>

        {/* Main "I LOVE YOU" Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-4xl sm:text-6xl md:text-7xl font-serif-luxury font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-[#ffe6ec] to-[#ff4f81] mb-4 drop-shadow-[0_2px_20px_rgba(255,79,129,0.4)]"
        >
          {personName ? `${personName.toUpperCase()}, ` : ''}I LOVE YOU <span className="text-[#ff1744]">❤️</span>
        </motion.h2>

        {/* Animated letter-by-letter phrase: "More than words can ever explain." */}
        <div className="flex flex-wrap justify-center items-center text-lg sm:text-2xl md:text-3xl font-serif-luxury italic text-[#ffccd9] mb-10 max-w-xl min-h-[40px]">
          {letters.map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, filter: 'blur(4px)', y: 8 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              transition={{
                delay: 0.6 + index * 0.04,
                duration: 0.4,
              }}
              className={char === ' ' ? 'inline-block w-2' : 'inline-block'}
            >
              {char}
            </motion.span>
          ))}
        </div>

        {/* Action Button: "Open My Heart 💌" */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
          <button
            id="btn-open-heart"
            onClick={handleOpenLetterClick}
            className="group relative px-8 py-4 sm:px-10 sm:py-4.5 rounded-full font-semibold text-white text-base sm:text-lg cursor-pointer overflow-hidden shadow-2xl shadow-[#ff4f81]/40 hover:shadow-[#ff4f81]/70 transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #ff4f81 0%, #ff1744 50%, #8e44ad 100%)',
            }}
          >
            <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative flex items-center gap-3">
              <Mail className="w-5 h-5 transition-transform group-hover:-translate-y-0.5 group-hover:scale-110" />
              <span>Open My Heart</span>
              <span className="text-xl">💌</span>
            </span>
          </button>
        </motion.div>

        {/* Floating helper hint */}
        <p className="mt-4 text-xs text-white/40">
          A handwritten letter is sealed inside just for you
        </p>
      </div>

      {/* SECRET SURPRISE MODAL (TRIGGERED AFTER 5 HEART CLICKS) */}
      <AnimatePresence>
        {showSecretModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              className="relative w-full max-w-md rounded-3xl bg-[#1c082c] border border-[#ff4f81]/40 p-6 sm:p-8 shadow-2xl text-center"
            >
              <div className="w-14 h-14 rounded-full bg-[#ff4f81]/20 border border-[#ff4f81]/50 mx-auto mb-4 flex items-center justify-center text-2xl">
                {secretStep === 1 && '👀'}
                {secretStep === 2 && '✨'}
                {secretStep === 3 && '💖'}
              </div>

              {secretStep === 1 && (
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif-luxury font-bold text-white mb-2">
                    Okay... you found the secret. 👀❤️
                  </h3>
                  <p className="text-white/70 text-sm mb-6">
                    You couldn't resist clicking my beating heart, could you?
                  </p>
                  <button
                    onClick={() => setSecretStep(2)}
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#ff4f81] to-[#ff1744] text-white font-medium text-sm hover:opacity-90 transition cursor-pointer"
                  >
                    What secret? 🤫
                  </button>
                </div>
              )}

              {secretStep === 2 && (
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif-luxury font-bold text-white mb-2">
                    There's actually one more thing...
                  </h3>
                  <p className="text-white/70 text-sm mb-6">
                    Something I don't say out loud often enough.
                  </p>
                  <button
                    onClick={() => setSecretStep(3)}
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#ff4f81] to-[#ff1744] text-white font-medium text-sm hover:opacity-90 transition cursor-pointer"
                  >
                    Tell me ❤️
                  </button>
                </div>
              )}

              {secretStep === 3 && (
                <div>
                  <div className="flex items-center justify-center gap-2 mb-3 text-[#ff9bbd]">
                    <BellRing className="w-5 h-5 animate-bounce" />
                    <span className="text-xs uppercase tracking-wider font-semibold">Secret Confession</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-white mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] via-[#ffccd9] to-[#ff4f81]">
                    "You're my favorite notification. ❤️"
                  </h3>
                  <p className="text-white/70 text-sm mb-6 italic">
                    Whenever your name lights up my phone screen, everything else can wait.
                  </p>
                  <button
                    onClick={() => setShowSecretModal(false)}
                    className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium text-sm transition cursor-pointer"
                  >
                    Keep Secret in My Heart 🤍
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
