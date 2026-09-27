import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, X, Heart, Sparkles, RotateCcw } from 'lucide-react';
import { LoveConfig } from '../config/loveConfig';

interface PersonalizeModalProps {
  config: LoveConfig;
  onUpdateConfig: (newConfig: LoveConfig) => void;
  onResetConfig: () => void;
}

export const PersonalizeModal: React.FC<PersonalizeModalProps> = ({
  config,
  onUpdateConfig,
  onResetConfig,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [personName, setPersonName] = useState(config.personName);
  const [yourName, setYourName] = useState(config.yourName);
  const [musicUrl, setMusicUrl] = useState(config.musicUrl);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateConfig({
      ...config,
      personName,
      yourName,
      musicUrl,
    });
    setIsOpen(false);
  };

  const handleReset = () => {
    onResetConfig();
    setPersonName('My Love');
    setYourName('Yours Always');
    setMusicUrl('');
    setIsOpen(false);
  };

  return (
    <>
      {/* Small subtle customize button in bottom-left corner */}
      <div className="fixed bottom-6 left-6 z-40 select-none">
        <button
          id="btn-open-personalize"
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#180927]/80 hover:bg-[#180927] backdrop-blur-md border border-white/15 text-white/70 hover:text-white text-xs font-medium shadow-lg transition-all cursor-pointer"
          title="Personalize Names & Music"
        >
          <Settings className="w-3.5 h-3.5 text-[#ff4f81] group-hover:rotate-90 transition-transform duration-300" />
          <span className="hidden sm:inline">Personalize</span>
        </button>
      </div>

      {/* Modal dialog */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-[#1a082b] border border-[#ff4f81]/30 rounded-3xl p-6 sm:p-8 shadow-2xl"
            >
              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-5 h-5 text-[#ff4f81] fill-[#ff4f81]" />
                <h3 className="text-xl font-serif-luxury font-bold text-white">
                  Personalize Your Love Story
                </h3>
              </div>
              <p className="text-white/60 text-xs mb-6">
                Type your names below to see them update across the entire love letter, question screen, and memories instantly!
              </p>

              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#ffccd9] mb-1">
                    Their Name (Recipient)
                  </label>
                  <input
                    type="text"
                    value={personName}
                    onChange={(e) => setPersonName(e.target.value)}
                    placeholder="e.g. Sophia, My Love"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#ff4f81] transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#ffccd9] mb-1">
                    Your Name (Sender)
                  </label>
                  <input
                    type="text"
                    value={yourName}
                    onChange={(e) => setYourName(e.target.value)}
                    placeholder="e.g. Alex, Yours Always"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#ff4f81] transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#ffccd9] mb-1">
                    Custom Music URL (Optional MP3)
                  </label>
                  <input
                    type="url"
                    value={musicUrl}
                    onChange={(e) => setMusicUrl(e.target.value)}
                    placeholder="Leave empty for built-in romantic melody"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#ff4f81] transition"
                  />
                  <span className="text-[11px] text-white/40 block mt-1">
                    If empty, our soothing built-in Web Audio synthesizer plays!
                  </span>
                </div>

                <div className="pt-4 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-xs transition cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-medium transition cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-[#ff4f81] to-[#ff1744] hover:opacity-95 text-white text-xs font-semibold shadow-md shadow-[#ff4f81]/30 transition cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Save & Apply</span>
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
