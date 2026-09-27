import React, { useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

interface MusicControllerProps {
  customMusicUrl?: string;
}

export const MusicController: React.FC<MusicControllerProps> = ({ customMusicUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = () => {
    const nextState = romanticAudio.toggleRomanticMelody(customMusicUrl);
    setIsPlaying(nextState);
  };

  return (
    <div className="fixed top-4 right-4 z-40 flex items-center gap-2 select-none">
      <button
        id="btn-music-toggle"
        onClick={toggleMusic}
        className={`group relative flex items-center gap-2.5 px-4 py-2 rounded-full border backdrop-blur-md shadow-lg transition-all duration-300 cursor-pointer ${
          isPlaying
            ? 'bg-[#ff4f81]/30 border-[#ff4f81]/60 text-white shadow-[0_0_20px_rgba(255,79,129,0.4)]'
            : 'bg-[#180927]/70 hover:bg-[#180927]/90 border-white/15 text-white/80 hover:text-white'
        }`}
        title={
          customMusicUrl
            ? 'Play custom romantic song'
            : 'Play soothing romantic lullaby synthesizer'
        }
      >
        {isPlaying ? (
          <>
            {/* Visualizer bars */}
            <div className="flex items-end gap-0.5 h-4">
              <span className="w-1 bg-[#ff6b9d] rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-3" />
              <span className="w-1 bg-[#ff1744] rounded-full animate-[pulse_0.4s_ease-in-out_infinite] h-4" />
              <span className="w-1 bg-[#ffccd9] rounded-full animate-[pulse_0.8s_ease-in-out_infinite] h-2" />
            </div>
            <span className="text-xs sm:text-sm font-medium">Playing Our Song</span>
            <span className="text-sm">🎵</span>
          </>
        ) : (
          <>
            <Music className="w-4 h-4 text-[#ff4f81] group-hover:scale-110 transition-transform" />
            <span className="text-xs sm:text-sm font-medium">🎵 Play Our Song</span>
          </>
        )}
      </button>
    </div>
  );
};
