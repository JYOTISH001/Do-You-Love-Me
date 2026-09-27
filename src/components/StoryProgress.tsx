import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

const SECTIONS = [
  { id: 'screen-question', label: '1', icon: '❤️', name: 'The Question' },
  { id: 'screen-letter', label: '2', icon: '💌', name: 'Love Letter' },
  { id: 'screen-memories', label: '3', icon: '📸', name: 'Our Memories' },
  { id: 'screen-reasons', label: '4', icon: '✨', name: 'Why I Love You' },
  { id: 'screen-big-love', label: '5', icon: '∞', name: 'Forever' },
];

export const StoryProgress: React.FC<{ isUnlocked: boolean }> = ({ isUnlocked }) => {
  const [activeId, setActiveId] = useState('screen-question');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight * 0.35;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.offsetTop <= scrollY) {
          setActiveId(SECTIONS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Only show progress after YES is unlocked or if scrolled down
  if (!isUnlocked) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-4 left-4 z-40 select-none hidden sm:block"
    >
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#160826]/80 backdrop-blur-md border border-white/15 shadow-xl">
        {SECTIONS.map((sec) => {
          const isActive = activeId === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => scrollTo(sec.id)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-[#ff4f81] to-[#ff1744] text-white shadow-md shadow-[#ff4f81]/40 scale-105'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
              title={sec.name}
            >
              <span>{sec.label}</span>
              <span>{sec.icon}</span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
};
