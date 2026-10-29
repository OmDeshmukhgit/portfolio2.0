'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { ARCHIVE_DATA } from '@/data/portfolioData';
import { Layers, Cpu, Terminal, Activity, GitFork } from 'lucide-react';
import { SkillIcon, LayerIcon } from '@/components/archive/TechIcons';

export default function Scene05SystemsArchitecture() {
  const { skillsLayers } = ARCHIVE_DATA;
  const [selectedLayerId, setSelectedLayerId] = useState<string>(skillsLayers[0].id);
  const sectionRef = useRef<HTMLElement>(null);

  // Subtle scroll parallax for Earth as background anchor of scale
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 25,
    restDelta: 0.001,
  });

  const earthY = useTransform(smoothProgress, [0, 1], ['-40px', '70px']);
  const activeLayer = skillsLayers.find((l) => l.id === selectedLayerId) || skillsLayers[0];

  return (
    <section
      ref={sectionRef}
      id="scene-systems"
      className="relative w-full min-h-screen flex flex-col justify-center items-center px-4 sm:px-8 py-24 overflow-hidden border-t border-[var(--archive-border)] bg-[var(--archive-bg)] transition-colors duration-400"
    >
      {/* =========================================================================
          05 — EARTH: BACKGROUND VISUAL ANCHOR FOR SCALE (FROZEN)
          Subtle parallax, low opacity (~15%), partially cropped, never competing with UI
         ========================================================================= */}
      <motion.div
        style={{ y: earthY }}
        className="absolute -top-12 -right-20 md:-right-12 lg:right-4 w-[360px] h-[360px] md:w-[480px] md:h-[480px] pointer-events-none z-0 opacity-15 select-none will-change-transform"
      >
        <Image
          src="/archive/illustration_earth_clean.webp"
          alt="Terrestrial Scale Anchor"
          fill
          className="object-contain filter contrast-110"
          sizes="(max-width: 768px) 360px, 480px"
        />
      </motion.div>

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center">
        {/* Scene Identification Header */}
        <div className="w-full flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-[var(--archive-coral)] mb-8 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5 text-[var(--archive-coral)]" />
            <span>SCENE 05 // SYSTEMS & INFRASTRUCTURE ARCHITECTURE</span>
          </div>
          <div className="hidden sm:block text-[var(--archive-text-muted)] font-mono text-[10px] sm:text-[11px]">
            LENS: 35mm · f/4.0 · 1/1000s · DETERMINISTIC BLUEPRINT
          </div>
        </div>

        {/* Narrative Title */}
        <div className="max-w-3xl text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--archive-violet)]/25 border border-[var(--archive-border-warm)] text-[var(--archive-apricot)] text-xs font-mono uppercase mb-4">
            <GitFork className="w-3.5 h-3.5 text-[var(--archive-coral)]" />
            <span>Infrastructure Stack Blueprint</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[var(--archive-text-primary)] tracking-wide mb-4">
            Architected Layers & Global Scale
          </h2>
          <p className="text-sm sm:text-base text-[var(--archive-text-secondary)] leading-relaxed font-serif">
            Distributed infrastructure is not a list of disconnected tools. It is a synchronized stack where
            declarative Terraform provisions multi-region fabrics, Kubernetes orchestrates self-healing container fleets,
            and automated pipelines ensure continuous production delivery.
          </p>
        </div>

        {/* Systems Pipeline Flow Selector */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8 font-mono text-xs">
          {skillsLayers.map((layer, index) => {
            const isSelected = layer.id === selectedLayerId;
            return (
              <button
                key={layer.id}
                type="button"
                onClick={() => setSelectedLayerId(layer.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-[var(--archive-violet)]/30 border-[var(--archive-coral)] text-[var(--archive-text-primary)] shadow-sm'
                    : 'bg-[var(--archive-surface)]/90 border-white/10 text-[var(--archive-text-muted)] hover:text-[var(--archive-text-primary)] hover:border-[var(--archive-border-warm)]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <LayerIcon
                      layerId={layer.id}
                      className={`w-3.5 h-3.5 transition-colors ${
                        isSelected ? 'text-[var(--archive-coral)]' : 'text-[var(--archive-text-muted)] group-hover:text-[var(--archive-coral)]'
                      }`}
                    />
                    <span className="text-[10px] text-[var(--archive-coral)] font-bold">
                      0{index + 1} // {layer.codeName}
                    </span>
                  </div>
                  <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-[var(--archive-coral)] animate-ping' : 'bg-[var(--archive-surface-elevated)]'}`} />
                </div>
                <span className="font-serif font-bold text-xs sm:text-sm text-[var(--archive-text-primary)] line-clamp-1">
                  {layer.title.split('&')[0]}
                </span>
                <span className="text-[10px] text-[var(--archive-apricot)] mt-1 uppercase">
                  {layer.layerTag}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Layer Deep-Dive Console */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeLayer.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="w-full rounded-3xl bg-[var(--archive-surface)]/95 border border-[var(--archive-border-violet)] p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.95)] backdrop-blur-2xl"
          >
            {/* Layer Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-[var(--archive-coral)] mb-1">
                  <LayerIcon layerId={activeLayer.id} className="w-4 h-4 text-[var(--archive-coral)]" />
                  <span>LAYER LEVEL 0{activeLayer.level} · {activeLayer.codeName}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--archive-text-primary)]">
                  {activeLayer.title}
                </h3>
                <p className="text-sm text-[var(--archive-text-secondary)] mt-1 max-w-2xl font-serif">
                  {activeLayer.summary}
                </p>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--archive-bg)]/80 border border-[var(--archive-mint)]/40 text-[var(--archive-mint)] text-xs font-mono self-start sm:self-auto">
                <Activity className="w-3.5 h-3.5 text-[var(--archive-mint)] animate-pulse" />
                <span>STATE: DETERMINISTIC</span>
              </div>
            </div>

            {/* Components Grid with Dedicated Technical Skill Icons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
              {activeLayer.components.map((comp) => (
                <div
                  key={comp.name}
                  className="p-4 rounded-xl bg-[var(--archive-surface-elevated)]/60 border border-[var(--archive-border-violet)] hover:border-[var(--archive-coral)]/50 hover:bg-[var(--archive-surface-elevated)]/90 transition-all flex items-start gap-3.5 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[var(--archive-surface)] border border-[var(--archive-border-violet)] flex items-center justify-center shrink-0 text-[var(--archive-apricot)] shadow-sm group-hover:border-[var(--archive-coral)]/60 group-hover:text-[var(--archive-text-primary)] group-hover:scale-105 transition-all">
                    <SkillIcon name={comp.name} className="w-5 h-5 text-[var(--archive-apricot)] group-hover:text-[var(--archive-text-primary)]" />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className="text-sm font-bold text-[var(--archive-apricot)] font-mono truncate">
                        {comp.name}
                      </h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--archive-violet)]/25 text-[var(--archive-apricot)] border border-[var(--archive-border-violet)] shrink-0">
                        {comp.status}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--archive-text-secondary)] leading-relaxed font-sans">
                      {comp.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Terminal Command Verification Log */}
            <div className="p-4 rounded-xl bg-[var(--archive-bg-deep)] border border-[var(--archive-border-violet)] font-mono text-xs text-[var(--archive-text-primary)] flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 overflow-x-auto">
                <Terminal className="w-4 h-4 text-[var(--archive-mint)] shrink-0" />
                <span className="text-[var(--archive-mint)] font-bold">$</span>
                <code className="text-[var(--archive-text-primary)] whitespace-nowrap">{activeLayer.commandSample}</code>
              </div>
              <span className="hidden sm:inline-block text-[10px] text-[var(--archive-mint)] uppercase shrink-0 font-bold">
                EXECUTION PROVED
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
