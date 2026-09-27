import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, Clock } from 'lucide-react';
import { TimelineItem } from '../config/loveConfig';

interface StoryTimelineProps {
  timeline: TimelineItem[];
}

export const StoryTimeline: React.FC<StoryTimelineProps> = ({ timeline }) => {
  return (
    <section
      id="screen-story"
      className="relative min-h-screen py-24 px-4 sm:px-6 select-none overflow-hidden"
    >
      {/* Background glow effects */}
      <div className="absolute top-1/3 left-0 w-96 h-96 rounded-full bg-[#ff4f81]/15 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-[#6c5ce7]/15 blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-widest text-[#ff9bbd] mb-3"
          >
            <Clock className="w-3.5 h-3.5 text-[#ff4f81]" />
            <span>Chapter IV • The Journey We Walk</span>
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-serif-luxury font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#ffe6ec] to-[#ff6b9d]"
          >
            Our Little Story ❤️
          </motion.h2>
          <p className="text-white/60 text-sm sm:text-base mt-3 max-w-md mx-auto">
            From the very first moment to all the unwritten tomorrows.
          </p>
        </div>

        {/* Vertical Connected Timeline */}
        <div className="relative">
          {/* Glowing central vertical beam */}
          <div className="absolute left-6 sm:left-1/2 top-4 bottom-4 w-0.5 sm:-translate-x-1/2 bg-gradient-to-b from-[#ff4f81]/80 via-[#ff6b9d]/60 to-[#8e44ad]/80 shadow-[0_0_12px_rgba(255,79,129,0.6)]" />

          <div className="space-y-12 sm:space-y-16">
            {timeline.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`relative flex flex-col sm:flex-row items-start sm:items-center ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Heart Node Marker */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="absolute left-6 sm:left-1/2 top-4 sm:top-1/2 -translate-x-1/2 sm:-translate-y-1/2 z-20 w-10 h-10 rounded-full bg-gradient-to-tr from-[#ff1744] to-[#ff6b9d] p-0.5 shadow-lg shadow-[#ff4f81]/50"
                  >
                    <div className="w-full h-full rounded-full bg-[#180824] flex items-center justify-center">
                      <Heart className="w-4 h-4 text-[#ff4f81] fill-[#ff4f81]" />
                    </div>
                  </motion.div>

                  {/* Content Card (Alternating on desktop, aligned on mobile) */}
                  <div
                    className={`w-full sm:w-1/2 pl-14 sm:pl-0 ${
                      isEven ? 'sm:pr-12 sm:text-right' : 'sm:pl-12 sm:text-left'
                    }`}
                  >
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      className="group relative rounded-2xl bg-gradient-to-b from-[#210931]/80 to-[#14061e]/90 border border-white/10 p-6 shadow-xl hover:border-[#ff4f81]/40 transition-all hover:shadow-[0_8px_25px_rgba(255,79,129,0.25)]"
                    >
                      {/* Phase Badge */}
                      <div
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff4f81]/15 border border-[#ff4f81]/30 text-xs font-semibold text-[#ffccd9] mb-3 ${
                          isEven ? 'sm:ml-auto' : ''
                        }`}
                      >
                        <Sparkles className="w-3 h-3 text-[#ff4f81]" />
                        <span>{item.badge}</span>
                      </div>

                      {/* Title: "Then — We met." etc. */}
                      <h3 className="text-xl sm:text-2xl font-serif-luxury font-bold text-white mb-2 group-hover:text-[#ffccd9] transition-colors">
                        <span className="text-[#ff4f81] font-sans font-semibold text-base sm:text-lg mr-1">
                          {item.phase} —
                        </span>
                        {item.title.replace(/^Then — |^Now — |^Next — /, '')}
                      </h3>

                      {/* Description */}
                      <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                        {item.description}
                      </p>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
