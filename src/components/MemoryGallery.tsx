import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, X, Calendar, Camera } from 'lucide-react';
import { MemoryItem } from '../config/loveConfig';

interface MemoryGalleryProps {
  memories: MemoryItem[];
}

export const MemoryGallery: React.FC<MemoryGalleryProps> = ({ memories }) => {
  const [selectedMemory, setSelectedMemory] = useState<MemoryItem | null>(null);
  const [imgErrorMap, setImgErrorMap] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setImgErrorMap((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section
      id="screen-memories"
      className="relative min-h-screen py-20 px-4 sm:px-6 select-none overflow-hidden"
    >
      {/* Background soft glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-[#8e44ad]/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 rounded-full bg-[#ff4f81]/15 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-widest text-[#ff9bbd] mb-3"
          >
            <Camera className="w-3.5 h-3.5 text-[#ff4f81]" />
            <span>Chapter II • Visual Keepsakes</span>
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-serif-luxury font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#ffe6ec] to-[#ff6b9d]"
          >
            Our Memories ❤️
          </motion.h2>
          <p className="text-white/60 text-sm sm:text-base mt-2 max-w-lg mx-auto">
            Moments frozen in time, holding all the joy and warmth we've shared.
          </p>
        </div>

        {/* Polaroid Memory Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {memories.map((mem, index) => {
            const rot = mem.rotation ?? ((index % 2 === 0 ? -2 : 2) * (1 + (index % 3) * 0.4));
            const hasError = imgErrorMap[mem.id];

            return (
              <motion.div
                key={mem.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: (index % 3) * 0.15 }}
                className="flex justify-center"
              >
                <div
                  onClick={() => setSelectedMemory(mem)}
                  className="group relative bg-[#fdfcf9] rounded-xl p-4 pb-6 shadow-[0_12px_30px_rgba(0,0,0,0.35)] hover:shadow-[0_20px_45px_rgba(255,79,129,0.35)] transition-all duration-300 transform-gpu cursor-pointer w-full max-w-[320px]"
                  style={{
                    transform: `rotate(${rot}deg)`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = `rotate(0deg) translateY(-8px) scale(1.03)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = `rotate(${rot}deg)`;
                  }}
                >
                  {/* Washi Tape / Pin Decorator */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#ffccd9]/60 backdrop-blur-sm border border-white/40 shadow-xs rotate-[-1deg] rounded-xs pointer-events-none" />

                  {/* Photo Frame Container */}
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-[#2d1b29]/10 border border-black/5 mb-4">
                    {hasError ? (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-tr from-[#2d1230] to-[#59163b] text-white p-4 text-center">
                        <Heart className="w-8 h-8 text-[#ff4f81] mb-2 animate-pulse" />
                        <span className="text-xs text-white/80 font-medium">Add your photo here</span>
                        <span className="text-[10px] text-white/50 mt-1">{mem.date}</span>
                      </div>
                    ) : (
                      <img
                        src={mem.photoUrl}
                        alt={mem.caption}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        onError={() => handleImageError(mem.id)}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}

                    {/* Cute Heart Badge on hover */}
                    <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Heart className="w-4 h-4 text-[#ff4f81] fill-[#ff4f81]" />
                    </div>
                  </div>

                  {/* Polaroid Handwritten Caption Area */}
                  <div className="text-center px-2">
                    <p className="font-handwritten text-xl sm:text-2xl text-[#3b1f33] leading-snug font-bold">
                      {mem.caption}
                    </p>
                    <div className="flex items-center justify-center gap-1.5 mt-2 text-xs text-[#7d506d] font-sans">
                      <Calendar className="w-3 h-3 text-[#ff4f81]" />
                      <span>{mem.date}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Helper guide for replacing photos */}
        <div className="mt-14 text-center">
          <p className="text-xs text-white/40 max-w-md mx-auto">
            Tip: You can easily substitute these with your favorite personal photos anytime in <code className="bg-white/10 px-1.5 py-0.5 rounded text-[#ffccd9]">src/config/loveConfig.ts</code>.
          </p>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedMemory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl bg-[#1c0828] border border-white/15 rounded-3xl overflow-hidden shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMemory(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 text-white flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Lightbox Image */}
              <div className="relative aspect-[16/10] bg-black/50 overflow-hidden">
                <img
                  src={selectedMemory.photoUrl}
                  alt={selectedMemory.caption}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1c0828] via-transparent to-transparent" />
              </div>

              {/* Lightbox Info */}
              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <h3 className="text-2xl font-serif-luxury font-bold text-white">
                    {selectedMemory.caption}
                  </h3>
                  <span className="text-xs px-3 py-1 rounded-full bg-[#ff4f81]/20 border border-[#ff4f81]/40 text-[#ffccd9] font-medium whitespace-nowrap">
                    {selectedMemory.date}
                  </span>
                </div>
                {selectedMemory.note && (
                  <p className="text-white/70 text-sm sm:text-base italic font-serif leading-relaxed mt-2">
                    "{selectedMemory.note}"
                  </p>
                )}
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setSelectedMemory(null)}
                    className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider transition cursor-pointer"
                  >
                    Close Memory
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
