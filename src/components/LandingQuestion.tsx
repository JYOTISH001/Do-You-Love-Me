import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

interface LandingQuestionProps {
  personName: string;
  onYesClicked: () => void;
}

const CUTE_NO_MESSAGES = [
  "Are you sure? 🥺",
  "Nooo... think again 😭❤️",
  "Nice try 😌❤️",
  "Wait... that can't be right 😭",
  "Try again, cutie ❤️",
  "You really want to say NO? 🥺",
  "My heart says otherwise 😭❤️",
  "NO button is feeling shy 👉👈",
  "You're not escaping that easily 😌❤️",
  "Okay okay... you know the answer is YES ❤️",
];

export const LandingQuestion: React.FC<LandingQuestionProps> = ({
  personName,
  onYesClicked,
}) => {
  const [noCount, setNoCount] = useState(0);
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [noPosition, setNoPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDodging, setIsDodging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  const displayName = personName?.trim() || "My Favorite Person";

  // Calculate dynamic scale: YES grows gently, NO shrinks playfully
  const yesScale = Math.min(1.4, 1 + noCount * 0.05);
  const noScale = Math.max(0.65, 1 - noCount * 0.04);

  // Escaping movement generator within safe viewport boundaries
  const moveNoButton = () => {
    romanticAudio.playCuteBoop();
    const nextCount = noCount + 1;
    setNoCount(nextCount);

    const messageIndex = Math.min(nextCount - 1, CUTE_NO_MESSAGES.length - 1);
    setCurrentMessage(CUTE_NO_MESSAGES[messageIndex]);

    // From 3rd attempt onwards, start moving around playful positions
    if (nextCount >= 3) {
      setIsDodging(true);
      // Safe boundary box relative to original spot
      const maxX = typeof window !== 'undefined' ? Math.min(window.innerWidth * 0.35, 260) : 180;
      const maxY = typeof window !== 'undefined' ? Math.min(window.innerHeight * 0.3, 180) : 140;

      // Ensure it moves a noticeable distance away
      const randomX = (Math.random() - 0.5) * 2 * maxX;
      const randomY = (Math.random() - 0.5) * 2 * maxY;

      setNoPosition({
        x: Math.round(randomX),
        y: Math.round(randomY),
      });
    }
  };

  const handleNoClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    moveNoButton();
  };

  const handleNoHover = () => {
    // Only dodge on hover if already clicked at least twice
    if (noCount >= 3) {
      moveNoButton();
    }
  };

  const handleYesClick = () => {
    romanticAudio.playYesCelebration();
    onYesClicked();
  };

  // Keyboard shortcut support (Y / Enter)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'y' || e.key === 'Y') {
        handleYesClick();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div
      ref={containerRef}
      id="screen-question"
      className="relative min-h-screen flex items-center justify-center px-4 py-12 z-10 select-none overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-lg mx-auto"
      >
        {/* Decorative Romantic Glow Aura behind card */}
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#ff4f81]/30 via-[#ff6b9d]/20 to-[#8e44ad]/30 blur-2xl opacity-75" />

        {/* Central Glassmorphism Card */}
        <div className="relative rounded-3xl bg-[#170928]/70 backdrop-blur-xl border border-white/10 p-8 sm:p-10 shadow-2xl text-center">
          {/* Subtle floating heart crest */}
          <div className="flex justify-center mb-4">
            <motion.div
              animate={{
                scale: [1, 1.12, 1],
                rotate: [0, 4, -4, 0],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#ff1744] to-[#ff6b9d] flex items-center justify-center shadow-lg shadow-[#ff4f81]/40"
            >
              <Heart className="w-8 h-8 text-white fill-white" />
            </motion.div>
          </div>

          {/* Personalized Greeting */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-2 mb-1"
          >
            <Sparkles className="w-4 h-4 text-[#ff9bbd]" />
            <span className="text-xs uppercase tracking-widest text-[#ff9bbd] font-semibold">
              For Someone Truly Special
            </span>
            <Sparkles className="w-4 h-4 text-[#ff9bbd]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl sm:text-2xl font-serif-luxury text-white/90 mb-3"
          >
            Hey {displayName}... <span className="text-[#ff6b9d]">❤️</span>
          </motion.h2>

          {/* Main Question */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="text-3xl sm:text-4xl md:text-5xl font-serif-luxury font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] via-[#ffccd9] to-[#ff9bbd] leading-tight mb-2"
          >
            Do You Love Me? <span className="inline-block animate-pulse text-[#ff4f81]">❤️</span>
          </motion.h1>

          <p className="text-white/60 text-sm sm:text-base mb-8">
            Be honest... <span className="text-white/80">👀❤️</span>
          </p>

          {/* Interactive Dynamic Cute Messages */}
          <div className="min-h-[36px] flex items-center justify-center mb-6">
            <AnimatePresence mode="wait">
              {currentMessage ? (
                <motion.div
                  key={currentMessage}
                  initial={{ opacity: 0, y: 6, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.9 }}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#ff4f81]/20 border border-[#ff4f81]/40 text-[#ffccd9] text-sm font-medium shadow-sm"
                >
                  <span>{currentMessage}</span>
                </motion.div>
              ) : (
                <span className="text-white/30 text-xs tracking-wider">Choose carefully with your heart ✨</span>
              )}
            </AnimatePresence>
          </div>

          {/* YES & NO Interactive Buttons */}
          <div className="relative flex flex-wrap items-center justify-center gap-4 sm:gap-6 min-h-[90px]">
            {/* YES BUTTON */}
            <motion.button
              id="btn-yes"
              onClick={handleYesClick}
              animate={{ scale: yesScale }}
              whileHover={{ scale: yesScale * 1.06 }}
              whileTap={{ scale: yesScale * 0.96 }}
              transition={{ type: 'spring', stiffness: 350, damping: 20 }}
              className="relative group px-8 py-3.5 sm:px-10 sm:py-4 rounded-full font-semibold text-white text-base sm:text-lg shadow-xl shadow-[#ff4f81]/30 cursor-pointer overflow-hidden z-20"
              style={{
                background: 'linear-gradient(135deg, #ff1744 0%, #ff4f81 50%, #ff6b9d 100%)',
              }}
            >
              {/* Pulsing glow ring around YES */}
              <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#ff1744] to-[#ff80bf] opacity-60 group-hover:opacity-100 blur transition duration-300 animate-pulse" />
              
              <span className="relative flex items-center gap-2.5 drop-shadow-md">
                <Heart className="w-5 h-5 fill-white animate-bounce" />
                <span>YES</span>
                <span className="text-lg">❤️</span>
              </span>
            </motion.button>

            {/* NO BUTTON (With Playful Dodge Interaction) */}
            <motion.div
              animate={{
                x: noPosition.x,
                y: noPosition.y,
                scale: noScale,
              }}
              transition={{
                type: 'spring',
                stiffness: 280,
                damping: 18,
              }}
              className="relative z-10"
            >
              <button
                ref={noButtonRef}
                id="btn-no"
                onClick={handleNoClick}
                onMouseEnter={handleNoHover}
                onTouchStart={handleNoClick}
                className="px-6 py-3 sm:px-8 sm:py-3.5 rounded-full font-medium text-white/80 hover:text-white text-sm sm:text-base bg-white/10 hover:bg-white/15 border border-white/20 transition-colors shadow-md cursor-pointer flex items-center gap-2"
                style={{
                  transition: 'background-color 0.2s, border-color 0.2s',
                }}
              >
                <span>NO</span>
                <span className="text-base">🥺</span>
              </button>
            </motion.div>
          </div>

          {/* Hint if user tries NO multiple times */}
          {noCount >= 4 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 text-xs text-[#ff9bbd]/90 font-medium"
            >
              Hint: The NO button is feeling shy... but YES is waiting for you! 🫶
            </motion.p>
          )}
        </div>
      </motion.div>
    </div>
  );
};
