'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ARCHIVE_DATA, ArchiveProject } from '@/data/portfolioData';
import { Camera, ExternalLink, Layers, Info, CheckCircle2, ChevronRight, Sparkles, ShieldCheck } from 'lucide-react';
import { GithubIcon } from '@/components/pixel/BrandIcons';
import { SkillIcon } from '@/components/archive/TechIcons';

export default function Scene06CapturedProjects() {
  const { projects } = ARCHIVE_DATA;
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0].id);

  const activeProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  return (
    <section
      id="scene-projects"
      className="relative w-full min-h-screen flex flex-col justify-center items-center px-4 sm:px-8 py-24 overflow-hidden border-t border-[var(--archive-border)] bg-[var(--archive-bg)] transition-colors duration-300"
    >
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center">
        {/* Scene Identification Header */}
        <div className="w-full flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-[var(--archive-coral)] mb-8 border-b border-[var(--archive-border)] pb-3">
          <div className="flex items-center gap-2">
            <Camera className="w-3.5 h-3.5 text-[var(--archive-coral)]" />
            <span>SCENE 06 // CAPTURED FRAMES · PRODUCTION EXHIBITS</span>
          </div>
          <div className="text-[var(--archive-text-muted)]">
            LENS: 28mm · f/5.6 · 1/1000s · 5 EXHIBITS CATALOGED
          </div>
        </div>

        {/* Narrative Title */}
        <div className="max-w-3xl text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--archive-surface-alt)] border border-[var(--archive-border-warm)] text-[var(--archive-apricot)] text-xs font-mono uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[var(--archive-yellow)]" />
            <span>Exhibition of Engineered Realities</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[var(--archive-text-primary)] tracking-wide mb-4">
            Captured Frames: Real Projects
          </h2>
          <p className="text-sm sm:text-base text-[var(--archive-text-secondary)] leading-relaxed font-serif">
            Each project is cataloged like a medium-format photograph: an authentic frame capturing
            a system that was designed, coded, containerized, and deployed into the wild.
          </p>
        </div>

        {/* Archival Contact Sheet — 5 Production Exhibits Cataloged */}
        <div className="w-full mb-10">
          <div className="flex items-center justify-between text-[11px] font-mono text-[var(--archive-text-muted)] mb-3 px-1 border-b border-[var(--archive-border)] pb-2">
            <span className="text-[var(--archive-coral)] font-bold uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--archive-coral)] animate-pulse" />
              <span>ARCHIVAL CONTACT SHEET // 5 FRAMES</span>
            </span>
            <span className="text-[var(--archive-text-muted)] text-[10px] hidden sm:inline">
              SELECT ANY FRAME TO INSPECT FULL ARCHITECTURAL DOSSIER
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {projects.map((proj) => {
              const isSelected = proj.id === selectedProjectId;
              return (
                <button
                  key={proj.id}
                  type="button"
                  onClick={() => setSelectedProjectId(proj.id)}
                  aria-pressed={isSelected}
                  aria-label={`Inspect ${proj.frameNumber}: ${proj.title}`}
                  className={`group relative text-left p-2.5 sm:p-3 rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer ${
                    isSelected
                      ? 'bg-[var(--archive-surface)] border-[var(--archive-coral)] shadow-[0_0_25px_rgba(242,123,155,0.25)] scale-[1.02]'
                      : 'bg-[var(--archive-surface)]/80 border-[var(--archive-border)] hover:border-[var(--archive-border-warm)] hover:bg-[var(--archive-surface-alt)]/80'
                  }`}
                >
                  <div>
                    {/* Top Status Bar: Frame & Active Indicator */}
                    <div className="flex items-center justify-between text-[9px] font-mono mb-2 pb-1.5 border-b border-[var(--archive-border)]">
                      <span className={isSelected ? 'text-[var(--archive-apricot)] font-bold' : 'text-[var(--archive-text-muted)] font-semibold'}>
                        {proj.frameNumber}
                      </span>
                      <span
                        className={`w-1.5 h-1.5 rounded-full transition-all ${
                          isSelected
                            ? 'bg-[var(--archive-coral)] shadow-[0_0_8px_rgba(242,123,155,1)] scale-110'
                            : 'bg-white/20 group-hover:bg-[var(--archive-coral)]/50'
                        }`}
                      />
                    </div>

                    {/* Thumbnail Preview Window (Untouched authentic screenshot) */}
                    <div className="relative w-full h-16 sm:h-20 rounded-lg overflow-hidden bg-black/70 border border-white/5 mb-2.5">
                      <Image
                        src={proj.image}
                        alt={proj.title}
                        fill
                        className={`object-cover object-top transition-transform duration-500 ${
                          isSelected ? 'scale-105 filter contrast-110' : 'opacity-70 group-hover:opacity-95 group-hover:scale-105'
                        }`}
                        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 20vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                      <span className="absolute bottom-1 left-1.5 text-[8px] font-mono text-[var(--archive-apricot)] font-medium truncate max-w-[90%]">
                        {proj.category.split('/')[0].trim()}
                      </span>
                    </div>

                    {/* Project Title & Stack summary */}
                    <h3 className={`text-xs font-serif font-bold leading-snug line-clamp-1 transition-colors ${
                      isSelected ? 'text-[var(--archive-text-primary)]' : 'text-[var(--archive-text-muted)] group-hover:text-[var(--archive-text-primary)]'
                    }`}>
                      {proj.title}
                    </h3>
                    <div className="flex items-center justify-between gap-1 mt-1">
                      <p className="text-[9px] font-mono text-[var(--archive-text-muted)] truncate">
                        {proj.technologies.slice(0, 3).join(' · ')}
                      </p>
                      {proj.github && proj.link ? (
                        <span className="text-[8px] font-mono px-1 py-0.2 rounded bg-[var(--archive-surface-alt)] text-[var(--archive-apricot)] border border-[var(--archive-border)] shrink-0">
                          LIVE+CODE
                        </span>
                      ) : proj.github ? (
                        <span className="text-[8px] font-mono px-1 py-0.2 rounded bg-[var(--archive-surface-alt)] text-[var(--archive-text-muted)] border border-[var(--archive-border)] shrink-0">
                          CODE
                        </span>
                      ) : proj.link ? (
                        <span className="text-[8px] font-mono px-1 py-0.2 rounded bg-[var(--archive-mint)]/20 text-[var(--archive-mint)] border border-[var(--archive-mint)]/30 shrink-0">
                          LIVE
                        </span>
                      ) : null}
                    </div>
                  </div>

                  {/* Active Inspection Indicator Banner */}
                  <div className={`mt-2.5 pt-1.5 border-t border-[var(--archive-border)] text-[8px] font-mono flex items-center justify-between uppercase transition-colors ${
                    isSelected ? 'text-[var(--archive-coral)] font-bold border-[var(--archive-coral)]/30' : 'text-[var(--archive-text-muted)] group-hover:text-[var(--archive-text-primary)]'
                  }`}>
                    <span>{isSelected ? 'INSPECTING' : 'VIEW FRAME'}</span>
                    <span>{isSelected ? '↓' : '→'}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Project Exhibition Dossier */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
            className="w-full rounded-3xl bg-[var(--archive-surface)] border border-[var(--archive-border)] p-6 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.5)] backdrop-blur-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start transition-colors duration-300"
          >
            {/* Left: Photographic Exhibit Frame */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="w-full rounded-2xl bg-black/80 border border-white/10 overflow-hidden relative shadow-2xl viewfinder-bracket">
                {/* Viewfinder Spec Ribbon */}
                <div className="hidden sm:flex items-center justify-between p-2.5 bg-black/90 border-b border-white/10 text-[10px] font-mono text-[var(--archive-apricot)]">
                  <span>{activeProject.frameNumber}</span>
                  <span>{activeProject.focalLength}</span>
                  <span>{activeProject.exposure}</span>
                </div>

                {/* Screenshot Image (Untouched authentic screenshot) */}
                <div className="relative w-full h-56 sm:h-72 bg-slate-950">
                  <Image
                    src={activeProject.image}
                    alt={activeProject.title}
                    fill
                    className="object-contain p-2 hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 480px"
                  />
                </div>

                {/* Bottom Frame Badge */}
                <div className="hidden sm:flex items-center justify-between p-2.5 bg-black/90 border-t border-white/10 text-[10px] font-mono text-[var(--archive-text-muted)]">
                  <span className="text-[var(--archive-coral)] uppercase">{activeProject.category}</span>
                  <span>{activeProject.aspectRatio}</span>
                </div>
              </div>

              {/* External Action Links (SOURCE CODE & LIVE DEMO) */}
              <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
                {activeProject.github && (
                  <a
                    href={activeProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View source code for ${activeProject.title} on GitHub (opens in new tab)`}
                    className="flex-1 py-2.5 px-3.5 rounded-xl bg-[var(--archive-surface-alt)] hover:bg-[var(--archive-surface)] border border-[var(--archive-border)] hover:border-[var(--archive-border-warm)] text-[var(--archive-apricot)] text-xs font-mono font-semibold transition-all flex items-center justify-center gap-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--archive-coral)]/50"
                  >
                    <GithubIcon className="w-4 h-4 text-[var(--archive-apricot)]" />
                    <span>SOURCE CODE</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                  </a>
                )}
                {activeProject.link && (
                  <a
                    href={activeProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open live demonstration for ${activeProject.title} (opens in new tab)`}
                    className="flex-1 py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-[var(--archive-coral)] to-[var(--archive-apricot)] hover:opacity-90 text-[var(--archive-bg)] text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--archive-coral)]"
                  >
                    <span>LIVE DEMO</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {!activeProject.github && !activeProject.link && (
                  <div className="flex-1 py-2 px-3 rounded-xl bg-white/5 border border-white/10 text-[var(--archive-text-muted)] text-[11px] font-mono text-center flex items-center justify-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                    <span>INTERNAL ARCHIVE · REPOSITORY AVAILABLE UPON REQUEST</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Technical Dossier (WHAT / WHY / HOW / ARCHITECTURE) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div>
                <span className="text-xs font-mono text-[var(--archive-coral)] font-bold uppercase tracking-wider block mb-1">
                  {activeProject.frameNumber} // {activeProject.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--archive-text-primary)]">
                  {activeProject.title}
                </h3>
                <p className="text-sm font-mono text-[var(--archive-apricot)] mt-1">
                  {activeProject.subtitle}
                </p>

                {/* Evidence & Verification Badges */}
                {activeProject.verificationEvidence && activeProject.verificationEvidence.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-[var(--archive-border)]">
                    <span className="text-[10px] font-mono uppercase text-[var(--archive-text-muted)] mr-1 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[var(--archive-mint)]" />
                      <span>EVIDENCE:</span>
                    </span>
                    {activeProject.verificationEvidence.map((evidence) => (
                      <span
                        key={evidence}
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[var(--archive-surface-alt)] border border-[var(--archive-mint)]/35 text-[10px] font-mono text-[var(--archive-mint)]"
                      >
                        <span className="w-1 h-1 rounded-full bg-[var(--archive-mint)]" />
                        {evidence}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* WHAT / WHY / HOW Trilogy */}
              <div className="space-y-3 font-serif">
                <div className="p-3.5 rounded-xl bg-[var(--archive-surface-alt)]/60 border border-[var(--archive-border)]">
                  <span className="text-[10px] font-mono uppercase text-[var(--archive-coral)] font-bold block mb-1">
                    WHAT // THE SYSTEM
                  </span>
                  <p className="text-xs sm:text-sm text-[var(--archive-text-secondary)] leading-relaxed">
                    {activeProject.what}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[var(--archive-surface-alt)]/60 border border-[var(--archive-border)]">
                  <span className="text-[10px] font-mono uppercase text-[var(--archive-coral)] font-bold block mb-1">
                    WHY // THE ENGINEERING PURPOSE
                  </span>
                  <p className="text-xs sm:text-sm text-[var(--archive-text-secondary)] leading-relaxed">
                    {activeProject.why}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[var(--archive-surface-alt)]/60 border border-[var(--archive-border)]">
                  <span className="text-[10px] font-mono uppercase text-[var(--archive-coral)] font-bold block mb-1">
                    HOW // THE ARCHITECTURAL EXECUTION
                  </span>
                  <p className="text-xs sm:text-sm text-[var(--archive-text-secondary)] leading-relaxed">
                    {activeProject.how}
                  </p>
                </div>
              </div>

              {/* Architecture Highlights */}
              <div>
                <h4 className="text-xs font-mono uppercase text-[var(--archive-apricot)] font-bold tracking-wider mb-2 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[var(--archive-coral)]" />
                  <span>Key Architecture Blueprint</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeProject.architecture.map((item) => (
                    <div
                      key={item}
                      className="p-2.5 rounded-lg bg-[var(--archive-surface-deep)] border border-[var(--archive-border)] text-xs font-mono text-[var(--archive-text-secondary)] flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[var(--archive-mint)] shrink-0" />
                      <span className="line-clamp-1">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Deployed */}
              <div>
                <h4 className="text-[11px] font-mono uppercase text-[var(--archive-text-muted)] tracking-wider mb-2">
                  Technologies Deployed
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeProject.technologies.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--archive-surface-alt)] border border-[var(--archive-border)] text-[11px] font-mono text-[var(--archive-apricot)]"
                    >
                      <SkillIcon name={t} className="w-3.5 h-3.5 text-[var(--archive-apricot)] shrink-0" />
                      <span>{t}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
