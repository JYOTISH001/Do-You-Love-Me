import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { ParticleBackground } from './components/ParticleBackground';
import { LandingQuestion } from './components/LandingQuestion';
import { LoveCelebration } from './components/LoveCelebration';
import { LoveReveal } from './components/LoveReveal';
import { LoveLetter } from './components/LoveLetter';
import { MemoryGallery } from './components/MemoryGallery';
import { ReasonsSection } from './components/ReasonsSection';
import { StoryTimeline } from './components/StoryTimeline';
import { BigLoveMessage } from './components/BigLoveMessage';
import { FinalMessage } from './components/FinalMessage';
import { MusicController } from './components/MusicController';
import { StoryProgress } from './components/StoryProgress';
import { FloatingLoveButton } from './components/FloatingLoveButton';
import { PersonalizeModal } from './components/PersonalizeModal';
import { WelcomeLoader } from './components/WelcomeLoader';
import { DEFAULT_LOVE_CONFIG, LoveConfig } from './config/loveConfig';
import { romanticAudio } from './utils/audio';

export default function App() {
  const [config, setConfig] = useState<LoveConfig>(DEFAULT_LOVE_CONFIG);
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const [isCelebrationActive, setIsCelebrationActive] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleYesClicked = () => {
    setIsCelebrationActive(true);
    setIsUnlocked(true);
  };

  const handleCelebrationFinished = () => {
    setIsCelebrationActive(false);
    // Smoothly scroll down to the Love Reveal section
    const revealEl = document.getElementById('screen-reveal');
    if (revealEl) {
      revealEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenLetter = () => {
    const letterEl = document.getElementById('screen-letter');
    if (letterEl) {
      letterEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToMemories = () => {
    const memEl = document.getElementById('screen-memories');
    if (memEl) {
      memEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReplay = () => {
    romanticAudio.playHeartbeat();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#0c0414] text-white selection:bg-[#ff4f81]/30 selection:text-[#ffccd9] overflow-x-hidden">
      {/* CINEMATIC WELCOME / LOADING SCREEN (Before the main experience) */}
      <AnimatePresence>
        {!isIntroComplete && (
          <WelcomeLoader
            personName={config.personName}
            musicUrl={config.musicUrl}
            onComplete={() => setIsIntroComplete(true)}
          />
        )}
      </AnimatePresence>

      {/* Dynamic Romantic Particle & Gradient Background */}
      <ParticleBackground />

      {/* Floating Navigation Controls (revealed after welcome intro) */}
      {isIntroComplete && (
        <>
          <StoryProgress isUnlocked={isUnlocked} />
          <MusicController customMusicUrl={config.musicUrl} />
          <FloatingLoveButton />
          <PersonalizeModal
            config={config}
            onUpdateConfig={(newConfig) => setConfig(newConfig)}
            onResetConfig={() => setConfig(DEFAULT_LOVE_CONFIG)}
          />
        </>
      )}

      {/* Main Experience Flow */}
      <main className="relative z-10">
        {/* SCREEN 1: THE QUESTION */}
        <LandingQuestion
          personName={config.personName}
          onYesClicked={handleYesClicked}
        />

        {/* YES FULLSCREEN CELEBRATION OVERLAY */}
        <AnimatePresence>
          {isCelebrationActive && (
            <LoveCelebration
              personName={config.personName}
              onFinished={handleCelebrationFinished}
            />
          )}
        </AnimatePresence>

        {/* CONTINUOUS STORY JOURNEY (Revealed and accessible) */}
        <div
          className={`transition-opacity duration-1000 ${
            isUnlocked ? 'opacity-100' : 'opacity-90'
          }`}
        >
          {/* SCREEN 2: LOVE REVEAL & SECRET EASTER EGG */}
          <LoveReveal
            personName={config.personName}
            onOpenLetter={handleOpenLetter}
          />

          {/* SCREEN 3: REALISTIC DIGITAL LOVE LETTER */}
          <LoveLetter
            personName={config.personName}
            yourName={config.yourName}
            onNextSection={handleScrollToMemories}
          />

          {/* SCREEN 4: PHOTO / MEMORY SECTION */}
          <MemoryGallery memories={config.memories} />

          {/* SCREEN 5: REASONS I LOVE YOU */}
          <ReasonsSection reasons={config.reasons} />

          {/* SCREEN 6: OUR STORY TIMELINE */}
          <StoryTimeline timeline={config.timeline} />

          {/* SCREEN 7: BIG LOVE MESSAGE */}
          <BigLoveMessage personName={config.personName} />

          {/* SCREEN 8: FINAL MESSAGE & REPLAY */}
          <FinalMessage
            personName={config.personName}
            yourName={config.yourName}
            onReplay={handleReplay}
          />
        </div>
      </main>
    </div>
  );
}
