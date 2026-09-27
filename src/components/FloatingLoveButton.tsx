import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ArrowUp } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

export const FloatingLoveButton: React.FC = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past 300px
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    romanticAudio.playHeartbeat();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {showButton && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 20 }}
          className="fixed bottom-6 right-6 z-40 select-none"
        >
          <button
            id="btn-floating-heart"
            onClick={scrollToTop}
            className="group relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#ff1744] via-[#ff4f81] to-[#8e44ad] p-0.5 shadow-xl shadow-[#ff4f81]/50 hover:shadow-[0_0_25px_rgba(255,79,129,0.8)] transition-all duration-300 cursor-pointer flex items-center justify-center"
            title="Return to beginning ❤️"
          >
            <div className="w-full h-full rounded-full bg-[#170624] flex items-center justify-center group-hover:bg-[#170624]/70 transition-colors">
              <div className="relative">
                <Heart className="w-6 h-6 text-[#ff4f81] fill-[#ff4f81] group-hover:scale-110 transition-transform animate-heartbeat" />
                <ArrowUp className="w-3 h-3 text-white absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
            {/* Pulsing ring */}
            <div className="absolute inset-0 rounded-full border border-[#ff4f81] animate-ping opacity-30 pointer-events-none" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
