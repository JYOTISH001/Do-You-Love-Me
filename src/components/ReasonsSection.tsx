import React from 'react';
import { motion } from 'motion/react';
import {
  Heart,
  Smile,
  Sparkles,
  Laugh,
  Flame,
  Sun,
  Crown,
  HeartHandshake,
} from 'lucide-react';
import { ReasonItem } from '../config/loveConfig';

interface ReasonsSectionProps {
  reasons: ReasonItem[];
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Smile: <Smile className="w-6 h-6 text-[#ff6b9d]" />,
  Heart: <Heart className="w-6 h-6 text-[#ff1744] fill-[#ff1744]" />,
  Sparkles: <Sparkles className="w-6 h-6 text-[#ffd166]" />,
  Laugh: <Laugh className="w-6 h-6 text-[#ff9bbd]" />,
  Flame: <Flame className="w-6 h-6 text-[#ff6b6b]" />,
  ShieldHeart: <HeartHandshake className="w-6 h-6 text-[#e056fd]" />,
  Sun: <Sun className="w-6 h-6 text-[#feca57]" />,
  Crown: <Crown className="w-6 h-6 text-[#ff9f43]" />,
};

export const ReasonsSection: React.FC<ReasonsSectionProps> = ({ reasons }) => {
  return (
    <section
      id="screen-reasons"
      className="relative min-h-screen py-24 px-4 sm:px-6 select-none overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36rem] h-[36rem] rounded-full bg-[#ff4f81]/15 blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-widest text-[#ff9bbd] mb-3"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#ff4f81]" />
            <span>Chapter III • What Makes You Extraordinary</span>
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-serif-luxury font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#ffe6ec] to-[#ff4f81]"
          >
            Reasons Why I Love You ❤️
          </motion.h2>
          <p className="text-white/60 text-sm sm:text-base mt-3 max-w-md mx-auto">
            I could list a million reasons, but here are just a few that make you so irreplaceable.
          </p>
        </div>

        {/* Staggered Reasons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((item, index) => {
            const iconElement = ICON_MAP[item.icon] || <Heart className="w-6 h-6 text-[#ff4f81]" />;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 25, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group relative rounded-2xl bg-gradient-to-b from-[#210c32]/80 to-[#150720]/90 border border-white/10 p-6 flex flex-col justify-between shadow-lg hover:shadow-[0_12px_30px_rgba(255,79,129,0.3)] hover:border-[#ff4f81]/40 transition-all cursor-default"
              >
                {/* Glowing border highlight on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#ff4f81]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <div>
                  {/* Top Bar: Icon + Number Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {iconElement}
                    </div>
                    <span className="text-xs font-mono font-bold text-white/30 group-hover:text-[#ff9bbd] transition-colors">
                      #{String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-serif-luxury font-bold text-white mb-2 group-hover:text-[#ffccd9] transition-colors">
                    {item.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>

                {/* Bottom decorative pulse */}
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1.5 text-[11px] text-[#ff9bbd]/60">
                  <Heart className="w-3 h-3 text-[#ff4f81] fill-[#ff4f81]/40" />
                  <span>Always in my heart</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
