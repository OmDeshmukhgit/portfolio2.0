'use client';

import React, { useState, useEffect } from 'react';
import { ARCHIVE_DATA, ArchiveScene } from '@/data/portfolioData';
import { Camera, Compass, Radio, Disc3, ChevronDown, Sparkles, X, FileDown, Palette } from 'lucide-react';
import { usePalette } from '@/components/providers/PaletteProvider';

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
  const { palette, isTwilight, togglePalette } = usePalette();

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
            ? 'bg-[var(--archive-bg)]/90 backdrop-blur-xl border-b border-[var(--archive-surface-border)] shadow-[0_10px_30px_rgba(0,0,0,0.85)] py-3'
            : 'bg-gradient-to-b from-[var(--archive-bg)]/80 to-transparent py-5'
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
              <div className="w-8 h-8 rounded-lg bg-[var(--archive-surface)] border border-[var(--archive-border-warm)] flex items-center justify-center text-[var(--archive-coral)] group-hover:scale-105 transition-all shadow-sm">
                <Camera className="w-4 h-4 text-[var(--archive-coral)]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-bold tracking-widest uppercase font-serif text-[var(--archive-text-primary)] group-hover:text-[var(--archive-coral)] transition-colors">
                  The Om Archive
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--archive-text-muted)] group-hover:text-[var(--archive-apricot)] transition-colors">
                  {ARCHIVE_DATA.curator.name} · DevOps
                </span>
              </div>
            </button>
          </div>

          {/* Center: Viewfinder Telemetry (Desktop) */}
          <div className="hidden md:flex items-center gap-4 px-4 py-1.5 rounded-full bg-[var(--archive-surface)]/60 border border-[var(--archive-surface-border)] backdrop-blur-md text-[11px] font-mono text-[var(--archive-text-muted)]">
            <div className="flex items-center gap-1.5 text-[var(--archive-coral)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--archive-coral)] animate-pulse" />
              <span>{activeScene.sceneNumber}</span>
            </div>
            <span className="text-white/20">|</span>
            <span className="text-[var(--archive-text-secondary)] uppercase">{activeScene.title}</span>
            <span className="text-white/20">|</span>
            <span className="text-[var(--archive-apricot)]">LENS: {activeScene.focalDistance}</span>
            <span className="text-white/20">|</span>
            <span className="text-[var(--archive-text-muted)]">{activeScene.aperture}</span>
          </div>

          {/* Right: Palette Switcher, Sound Controller, Dossier Link & Scene Index Trigger */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Real-time Color Palette Comparison Switcher Pill */}
            <button
              type="button"
              onClick={togglePalette}
              title={`Compare Schemes: Switch to ${isTwilight ? 'Classic Obsidian Amber' : 'Twilight Indigo 2.0'}`}
              className={`group relative flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-full border text-xs font-mono tracking-wider transition-all cursor-pointer ${
                isTwilight
                  ? 'bg-[#7041a6]/25 hover:bg-[#7041a6]/40 border-[#f27b9b]/50 text-[#ffd0ad] shadow-[0_0_15px_rgba(242,123,155,0.25)]'
                  : 'bg-amber-400/15 hover:bg-amber-400/25 border-amber-400/40 text-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.2)]'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full transition-transform group-hover:scale-125 ${
                  isTwilight
                    ? 'bg-gradient-to-r from-[#f27b9b] to-[#ffd66b] animate-pulse shadow-[0_0_8px_#f27b9b]'
                    : 'bg-amber-400 shadow-[0_0_8px_#fbbf24]'
                }`}
              />
              <span className="font-semibold text-[11px] sm:text-xs">
                {isTwilight ? 'TWILIGHT' : 'CLASSIC'}
              </span>
              <span className="text-[9px] opacity-75 hidden xl:inline uppercase font-bold">
                {isTwilight ? '2.0' : 'ORIGINAL'}
              </span>
            </button>

            {/* Persistent Engineering Dossier / Resume Link */}
            <a
              href={ARCHIVE_DATA.curator.resume}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Om Deshmukh Resume / Engineering Dossier (opens in new tab)"
              title="View / Download Engineering Dossier (Resume)"
              className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-full bg-[var(--archive-coral)]/15 hover:bg-[var(--archive-coral)]/25 border border-[var(--archive-coral)]/40 hover:border-[var(--archive-peach)] text-[var(--archive-apricot)] hover:text-[var(--archive-text-primary)] text-xs font-mono tracking-wider transition-all shadow-sm"
            >
              <FileDown className="w-3.5 h-3.5 text-[var(--archive-coral)] flex-shrink-0" />
              <span className="hidden sm:inline">RESUME</span>
            </a>

            {/* Soundtrack Toggle Pill */}
            <button
              type="button"
              onClick={onToggleAudio}
              className={`flex items-center gap-2 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-full border text-xs font-mono transition-all ${
                isAudioPlaying
                  ? 'bg-[var(--archive-violet)]/30 border-[var(--archive-orchid)]/60 text-[var(--archive-apricot)] shadow-[0_0_20px_rgba(112,65,166,0.35)]'
                  : 'bg-[var(--archive-surface)]/50 border-[var(--archive-surface-border)] text-[var(--archive-text-muted)] hover:text-[var(--archive-text-primary)]'
              }`}
              title={isAudioPlaying ? 'Mute Soundtrack' : 'Play Soundtrack'}
            >
              <Disc3 className={`w-3.5 h-3.5 ${isAudioPlaying ? 'animate-spin text-[var(--archive-coral)]' : ''}`} />
              <span className="hidden sm:inline truncate max-w-[95px] lg:max-w-[120px]">
                {isAudioPlaying ? currentTrackTitle : 'Soundtrack'}
              </span>
            </button>

            {/* Scene Index Menu Button */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-full bg-[var(--archive-surface)] hover:bg-[var(--archive-surface-elevated)] border border-[var(--archive-border)] text-[var(--archive-text-secondary)] text-xs font-mono tracking-wider transition-all"
            >
              <span>INDEX</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Index Drawer / Scene Selector Modal */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[var(--archive-bg-deep)]/85 backdrop-blur-2xl flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-[var(--archive-surface)] border border-[var(--archive-border-violet)] rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.95)] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-[var(--archive-coral)]" />
                <h3 className="text-base sm:text-lg font-serif font-bold tracking-wider text-[var(--archive-apricot)] uppercase">
                  Archive Index · 8 Frame Sequences
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-[var(--archive-text-muted)] hover:text-[var(--archive-text-primary)] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Interactive Palette Comparison Switcher inside Modal Drawer */}
            <div className="mb-6 p-4 rounded-2xl bg-[var(--archive-bg-deep)]/80 border border-[var(--archive-surface-border)] flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[var(--archive-surface)] border border-[var(--archive-border-warm)] flex items-center justify-center text-[var(--archive-coral)]">
                  <Palette className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--archive-text-muted)] block">
                    Active Color Direction Experiment
                  </span>
                  <span className="text-xs sm:text-sm font-serif font-bold text-[var(--archive-text-primary)]">
                    {isTwilight ? '✦ Twilight Indigo 2.0 (Dreamy & Cinematic)' : '◈ Classic Obsidian Amber (High-Tech Terminal)'}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={togglePalette}
                className="px-3 py-1.5 rounded-xl border text-[11px] font-mono font-bold uppercase tracking-wider transition-all shrink-0 bg-[var(--archive-coral)]/15 border-[var(--archive-coral)]/40 text-[var(--archive-coral)] hover:bg-[var(--archive-coral)]/25"
              >
                Switch Scheme
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
                        ? 'bg-[var(--archive-violet)]/25 border-[var(--archive-border-warm)] text-[var(--archive-text-primary)] shadow-sm'
                        : 'bg-white/5 border-white/5 hover:border-[var(--archive-border)] text-[var(--archive-text-muted)] hover:text-[var(--archive-text-primary)] hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-[var(--archive-coral)] font-semibold">
                        {scene.sceneNumber}
                      </span>
                      <div>
                        <h4 className="text-sm font-semibold tracking-wide font-serif text-[var(--archive-text-primary)]">
                          {scene.title}
                        </h4>
                        <p className="text-xs text-[var(--archive-text-muted)] mt-0.5 line-clamp-1">
                          {scene.subtitle}
                        </p>
                      </div>
                    </div>
                    <div className="hidden sm:flex flex-col text-right text-[11px] font-mono text-[var(--archive-text-muted)]">
                      <span>{scene.focalDistance}</span>
                      <span>{scene.aperture}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-[var(--archive-text-muted)]">
              <div className="flex items-center gap-3">
                <span>COORDINATES: {ARCHIVE_DATA.curator.coordinates}</span>
                <span className="hidden sm:inline">· BASE: {ARCHIVE_DATA.curator.baseLocation}</span>
              </div>
              <a
                href={ARCHIVE_DATA.curator.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--archive-coral)]/20 hover:bg-[var(--archive-coral)]/30 border border-[var(--archive-coral)]/40 text-[var(--archive-apricot)] text-xs font-mono transition-colors shadow-sm"
                aria-label="Download Om Deshmukh Engineering Dossier Resume"
              >
                <FileDown className="w-3.5 h-3.5 text-[var(--archive-coral)]" />
                <span>DOWNLOAD DOSSIER (RESUME)</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
