import React from 'react';
import { motion } from 'motion/react';
import { Heart, RotateCcw, Sparkles } from 'lucide-react';

interface FinalMessageProps {
  personName: string;
  yourName: string;
  onReplay: () => void;
}

export const FinalMessage: React.FC<FinalMessageProps> = ({
  personName,
  yourName,
  onReplay,
}) => {
  return (
    <footer
      id="screen-final"
      className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 py-24 text-center select-none overflow-hidden"
    >
      {/* Background glow flares */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[38rem] h-[38rem] rounded-full bg-gradient-to-t from-[#ff4f81]/20 via-[#8e44ad]/20 to-transparent blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center space-y-8">
        {/* Soft Heart Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-lg"
        >
          <Heart className="w-8 h-8 text-[#ff4f81] fill-[#ff4f81]" />
        </motion.div>

        {/* Closing Sentences */}
        <div className="space-y-4">
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-4xl md:text-5xl font-serif-luxury font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#ffe6ec] to-[#ff9bbd]"
          >
            Thank you for being a part of my story. ❤️
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-2xl font-serif-luxury text-white/80 italic font-light"
          >
            Here's to all the memories we've made...
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-xl sm:text-3xl font-serif-luxury text-[#ffccd9] font-medium"
          >
            And all the ones still waiting for us.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="pt-4"
          >
            <span className="text-3xl sm:text-5xl font-serif-luxury font-black text-[#ff4f81] tracking-wider drop-shadow-[0_2px_20px_rgba(255,79,129,0.7)]">
              Forever & Always ❤️
            </span>
          </motion.div>
        </div>

        {/* Personalized Signature */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-white/60 text-sm font-handwritten text-xl"
        >
          Yours with all my heart, {yourName || 'Forever'}
        </motion.div>

        {/* Replay Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.0 }}
          className="pt-4"
        >
          <button
            id="btn-replay"
            onClick={onReplay}
            className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-[#ff4f81]/30 to-[#8e44ad]/30 hover:from-[#ff4f81] hover:to-[#ff1744] border border-white/20 text-white font-semibold text-base sm:text-lg shadow-xl hover:shadow-[0_8px_30px_rgba(255,79,129,0.5)] transition-all duration-300 cursor-pointer flex items-center gap-3"
          >
            <RotateCcw className="w-5 h-5 transition-transform group-hover:-rotate-180 duration-500 text-[#ffccd9]" />
            <span>Replay Our Story</span>
            <span>🔄❤️</span>
          </button>
        </motion.div>

        {/* Footer subtle brand */}
        <div className="pt-10 flex items-center gap-2 text-xs text-white/30">
          <span>Crafted with infinite love for {personName || 'You'}</span>
          <Sparkles className="w-3 h-3 text-[#ff4f81]" />
        </div>
      </div>
    </footer>
  );
};
