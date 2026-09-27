import React, { useMemo } from 'react';

interface Particle {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  char: string;
}

export const ParticleBackground: React.FC = () => {
  // Generate stable particles for subtle floating effect
  const particles: Particle[] = useMemo(() => {
    const chars = ['❤️', '💖', '✨', '🌸', '💕', '✦', '🤍', '🫧'];
    return Array.from({ length: 28 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 10 + Math.random() * 18,
      duration: 12 + Math.random() * 18,
      delay: Math.random() * 8,
      opacity: 0.15 + Math.random() * 0.35,
      char: chars[Math.floor(Math.random() * chars.length)]
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Deep Romantic Ambient Glow Orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#ff4f81]/15 blur-[120px]" />
      <div className="absolute top-1/3 -right-32 w-[30rem] h-[30rem] rounded-full bg-[#8e44ad]/20 blur-[140px]" />
      <div className="absolute -bottom-32 left-1/4 w-[28rem] h-[28rem] rounded-full bg-[#ff1744]/15 blur-[130px]" />
      <div className="absolute top-2/3 right-1/4 w-80 h-80 rounded-full bg-[#6c5ce7]/15 blur-[120px]" />

      {/* Floating Ambient Sparkles and Hearts */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute select-none transform-gpu"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            animation: `gentleDrift ${p.duration}s ease-in-out ${p.delay}s infinite`,
            filter: 'drop-shadow(0 0 8px rgba(255, 107, 157, 0.4))'
          }}
        >
          {p.char}
        </div>
      ))}

      {/* Subtle Star Sparkle Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#0c0414_90%)] opacity-80" />
    </div>
  );
};
