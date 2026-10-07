'use client';

import React, { useState, useEffect } from 'react';
import { ARCHIVE_DATA, ArchiveScene } from '@/data/portfolioData';
import { Camera, Compass, Radio, Disc3, ChevronDown, Sparkles, X } from 'lucide-react';

interface ArchiveHeaderProps {
  activeSceneId: string;
  onSceneSelect: (sceneId: string) => void;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
  currentTrackTitle: string;
}

export default function ArchiveHeader({
  activeSceneId,
  onSceneSelect,
  isAudioPlaying,
  onToggleAudio,
  currentTrackTitle,
}: ArchiveHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeScene = ARCHIVE_DATA.scenes.find((s) => s.id === activeSceneId) || ARCHIVE_DATA.scenes[0];

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 font-sans ${
          hasScrolled
            ? 'bg-[#030305]/90 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)] py-3'
            : 'bg-gradient-to-b from-[#030305]/80 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Archive Emblem & Identity */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onSceneSelect('deep-space')}
              className="group flex items-center gap-2.5 text-left focus:outline-none"
            >
              <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/40 flex items-center justify-center text-amber-300 group-hover:border-amber-300 group-hover:scale-105 transition-all shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                <Camera className="w-4 h-4 text-amber-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-bold tracking-widest uppercase font-serif text-[#f4f1ea] group-hover:text-amber-200 transition-colors">
                  The Om Archive
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400/70">
                  {ARCHIVE_DATA.curator.name} · DevOps
                </span>
              </div>
            </button>
          </div>

          {/* Center: Viewfinder Telemetry (Desktop) */}
          <div className="hidden md:flex items-center gap-4 px-4 py-1.5 rounded-full bg-black/40 border border-white/10 backdrop-blur-md text-[11px] font-mono text-slate-300">
            <div className="flex items-center gap-1.5 text-amber-400">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span>{activeScene.sceneNumber}</span>
            </div>
            <span className="text-white/20">|</span>
            <span className="text-slate-200 uppercase">{activeScene.title}</span>
            <span className="text-white/20">|</span>
            <span className="text-amber-300/80">LENS: {activeScene.focalDistance}</span>
            <span className="text-white/20">|</span>
            <span className="text-slate-400">{activeScene.aperture}</span>
          </div>

          {/* Right: Sound Controller Pill & Scene Index Trigger */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Soundtrack Toggle Pill */}
            <button
              type="button"
              onClick={onToggleAudio}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono transition-all ${
                isAudioPlaying
                  ? 'bg-amber-400/15 border-amber-400/60 text-amber-300 shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                  : 'bg-black/40 border-white/15 text-slate-400 hover:text-slate-200 hover:border-white/30'
              }`}
              title={isAudioPlaying ? 'Mute Soundtrack' : 'Play Soundtrack'}
            >
              <Disc3 className={`w-3.5 h-3.5 ${isAudioPlaying ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline truncate max-w-[120px]">
                {isAudioPlaying ? currentTrackTitle : 'Soundtrack'}
              </span>
            </button>

            {/* Scene Index Menu Button */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 hover:bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-mono tracking-wider transition-all"
            >
              <span>INDEX</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Index Drawer / Scene Selector Modal */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-2xl flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-[#08090f] border border-amber-400/30 rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.95)] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-amber-400" />
                <h3 className="text-base sm:text-lg font-serif font-bold tracking-wider text-amber-200 uppercase">
                  Archive Index · 8 Frame Sequences
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {ARCHIVE_DATA.scenes.map((scene) => {
                const isActive = scene.id === activeSceneId;
                return (
                  <button
                    key={scene.id}
                    type="button"
                    onClick={() => {
                      onSceneSelect(scene.id);
                      setIsMenuOpen(false);
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                      isActive
                        ? 'bg-amber-400/15 border-amber-400 text-amber-200 shadow-[0_0_20px_rgba(212,175,55,0.2)]'
                        : 'bg-white/5 border-white/5 hover:border-amber-400/40 text-slate-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-amber-400/80 font-semibold">
                        {scene.sceneNumber}
                      </span>
                      <div>
                        <h4 className="text-sm font-semibold tracking-wide font-serif">
                          {scene.title}
                        </h4>
                        <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                          {scene.subtitle}
                        </p>
                      </div>
                    </div>
                    <div className="hidden sm:flex flex-col text-right text-[11px] font-mono text-slate-500">
                      <span>{scene.focalDistance}</span>
                      <span>{scene.aperture}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>COORDINATES: {ARCHIVE_DATA.curator.coordinates}</span>
              <span>BASE: {ARCHIVE_DATA.curator.baseLocation}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
