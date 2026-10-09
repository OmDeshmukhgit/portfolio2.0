'use client';
import React, { useState, useEffect } from 'react';
import { MotionConfig, AnimatePresence } from 'framer-motion';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import ArchiveHeader from '@/components/archive/ArchiveHeader';
import ArchiveSoundtrack from '@/components/archive/ArchiveSoundtrack';

import ArchiveOpening from '@/components/archive/opening/ArchiveOpening';
import Scene01CosmicOpening from '@/components/archive/scenes/Scene01CosmicOpening';
import Scene02SignalTransmission from '@/components/archive/scenes/Scene02SignalTransmission';
import Scene03TheObserver from '@/components/archive/scenes/Scene03TheObserver';
import Scene04EngineerTransition from '@/components/archive/scenes/Scene04EngineerTransition';
import Scene05SystemsArchitecture from '@/components/archive/scenes/Scene05SystemsArchitecture';
import Scene06CapturedProjects from '@/components/archive/scenes/Scene06CapturedProjects';
import Scene07ReflectionsArchive from '@/components/archive/scenes/Scene07ReflectionsArchive';
import Scene08FinalFrameContact from '@/components/archive/scenes/Scene08FinalFrameContact';

import { ARCHIVE_DATA } from '@/data/portfolioData';

export default function Home() {
  const [isOpeningVisible, setIsOpeningVisible] = useState(true);
  const [activeSceneId, setActiveSceneId] = useState('deep-space');
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  // Active scene observer
  useEffect(() => {
    const sceneElements = ARCHIVE_DATA.scenes
      .map((s) => document.getElementById(`scene-${s.id}`))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const rawId = entry.target.id.replace('scene-', '');
            setActiveSceneId(rawId);
          }
        });
      },
      { threshold: 0.3 }
    );

    sceneElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSceneSelect = (sceneId: string) => {
    const el = document.getElementById(`scene-${sceneId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleScrollToNext = () => {
    handleSceneSelect('signal');
  };

  const currentTrackTitle = ARCHIVE_DATA.soundtracks[currentTrackIndex]?.title || 'Soundtrack';

  const handleOpeningTrigger = () => {
    // Prime the audio element directly within the user click gesture context
    if (typeof window !== 'undefined') {
      const audioEl = document.querySelector('audio');
      if (audioEl) {
        audioEl.load();
      }
    }
  };

  const handleOpeningEnter = () => {
    setIsOpeningVisible(false);
    setIsAudioPlaying(true);
  };

  return (
    <SmoothScrollProvider>
      <MotionConfig reducedMotion="user">
        <main className="relative w-full min-h-screen bg-[#030305] text-[#f4f1ea] overflow-x-hidden selection:bg-[#d4af37] selection:text-[#030305]">
          {/* Pre-Entry Cinematic Camera Opening Experience */}
          <AnimatePresence>
            {isOpeningVisible && (
              <ArchiveOpening
                key="archive-opening"
                onTrigger={handleOpeningTrigger}
                onEnter={handleOpeningEnter}
              />
            )}
          </AnimatePresence>

          {/* Persistent Cinematic Archive Navigation & Telemetry HUD */}
          <ArchiveHeader
            activeSceneId={activeSceneId}
            onSceneSelect={handleSceneSelect}
            isAudioPlaying={isAudioPlaying}
            onToggleAudio={() => setIsAudioPlaying(!isAudioPlaying)}
            currentTrackTitle={currentTrackTitle}
          />

          {/* Master Sound Console */}
          <ArchiveSoundtrack
            isPlaying={isAudioPlaying}
            setIsPlaying={setIsAudioPlaying}
            currentTrackIndex={currentTrackIndex}
            setCurrentTrackIndex={setCurrentTrackIndex}
          />

          {/* =========================================================================
              THE 8 CINEMATIC ARCHIVE SCENES
             ========================================================================= */}
          {/* Scene 01: Deep Space / The Cosmic Lens */}
          <Scene01CosmicOpening onScrollToNext={handleScrollToNext} />

          {/* Scene 02: Signal & Frequency (The 5 Pillars) */}
          <Scene02SignalTransmission />

          {/* Scene 03: The Observer (Contact Sheet Exhibition & Philosophy) */}
          <Scene03TheObserver />

          {/* Scene 04: The Transition to Architecture */}
          <Scene04EngineerTransition onProceedToSystems={() => handleSceneSelect('systems')} />

          {/* Scene 05: Systems & Infrastructure Architecture */}
          <Scene05SystemsArchitecture />

          {/* Scene 06: Captured Frames (Real Projects) */}
          <Scene06CapturedProjects />

          {/* Scene 07: The Archive & Reflections */}
          <Scene07ReflectionsArchive />

          {/* Scene 08: Final Frame / Dispatch Transmission */}
          <Scene08FinalFrameContact />
        </main>
      </MotionConfig>
    </SmoothScrollProvider>
  );
}
