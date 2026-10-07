'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ARCHIVE_DATA, ArchiveProject } from '@/data/portfolioData';
import { Camera, ExternalLink, Layers, Info, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import { GithubIcon } from '@/components/pixel/BrandIcons';

export default function Scene06CapturedProjects() {
  const { projects } = ARCHIVE_DATA;
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0].id);

  const activeProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  return (
    <section
      id="scene-projects"
      className="relative w-full min-h-screen flex flex-col justify-center items-center px-4 sm:px-8 py-24 overflow-hidden border-t border-white/5 bg-[#030306]"
    >
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center">
        {/* Scene Identification Header */}
        <div className="w-full flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-amber-400/80 mb-8 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Camera className="w-3.5 h-3.5 text-amber-400" />
            <span>SCENE 06 // CAPTURED FRAMES · PRODUCTION EXHIBITS</span>
          </div>
          <div className="text-slate-400">
            LENS: 28mm · f/5.6 · 1/1000s · 5 EXHIBITS CATALOGED
          </div>
        </div>

        {/* Narrative Title */}
        <div className="max-w-3xl text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Exhibition of Engineered Realities</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#f4f1ea] tracking-wide mb-4">
            Captured Frames: Real Projects
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-serif">
            Each project is cataloged like a medium-format photograph: an authentic frame capturing
            a system that was designed, coded, containerized, and deployed into the wild.
          </p>
        </div>

        {/* Project Frame Selector Tabs */}
        <div className="w-full flex items-center gap-2 overflow-x-auto pb-4 mb-8 font-mono text-xs">
          {projects.map((proj) => {
            const isSelected = proj.id === selectedProjectId;
            return (
              <button
                key={proj.id}
                type="button"
                onClick={() => setSelectedProjectId(proj.id)}
                className={`px-4 py-2.5 rounded-full border whitespace-nowrap transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-amber-400/20 border-amber-400 text-amber-200 shadow-[0_0_20px_rgba(212,175,55,0.25)]'
                    : 'bg-[#080911] border-white/10 text-slate-400 hover:text-slate-200 hover:border-white/20'
                }`}
              >
                <span className="text-[10px] text-amber-400/80 font-bold">{proj.frameNumber}</span>
                <span className="font-serif font-semibold">{proj.title}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Project Exhibition Dossier */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
            className="w-full rounded-3xl bg-[#080912] border border-amber-400/30 p-6 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.95)] backdrop-blur-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* Left: Photographic Exhibit Frame */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="w-full rounded-2xl bg-black/80 border border-white/10 overflow-hidden relative shadow-2xl viewfinder-bracket">
                {/* Viewfinder Spec Ribbon */}
                <div className="flex items-center justify-between p-2.5 bg-black/90 border-b border-white/10 text-[10px] font-mono text-amber-300/80">
                  <span>{activeProject.frameNumber}</span>
                  <span>{activeProject.focalLength}</span>
                  <span>{activeProject.exposure}</span>
                </div>

                {/* Screenshot Image */}
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
                <div className="p-2.5 bg-black/90 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span className="text-amber-400 uppercase">{activeProject.category}</span>
                  <span>{activeProject.aspectRatio}</span>
                </div>
              </div>

              {/* External Links */}
              <div className="flex items-center gap-3">
                {activeProject.github && (
                  <a
                    href={activeProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 hover:border-amber-400/50 text-amber-200 text-xs font-mono font-semibold transition-all flex items-center justify-center gap-2"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>Source Code</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                  </a>
                )}
                {activeProject.link && (
                  <a
                    href={activeProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <span>Live Transmission</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>

            {/* Right: Technical Dossier (WHAT / WHY / HOW / ARCHITECTURE) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div>
                <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider block mb-1">
                  {activeProject.frameNumber} // {activeProject.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#f4f1ea]">
                  {activeProject.title}
                </h3>
                <p className="text-sm font-mono text-amber-300/80 mt-1">
                  {activeProject.subtitle}
                </p>
              </div>

              {/* WHAT / WHY / HOW Trilogy */}
              <div className="space-y-3 font-serif">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block mb-1">
                    WHAT // THE SYSTEM
                  </span>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {activeProject.what}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block mb-1">
                    WHY // THE ENGINEERING PURPOSE
                  </span>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {activeProject.why}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block mb-1">
                    HOW // THE ARCHITECTURAL EXECUTION
                  </span>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {activeProject.how}
                  </p>
                </div>
              </div>

              {/* Architecture Highlights */}
              <div>
                <h4 className="text-xs font-mono uppercase text-amber-400 font-bold tracking-wider mb-2 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Key Architecture Blueprint</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeProject.architecture.map((item) => (
                    <div
                      key={item}
                      className="p-2.5 rounded-lg bg-black/60 border border-slate-800 text-xs font-mono text-slate-300 flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="line-clamp-1">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Deployed */}
              <div>
                <h4 className="text-[11px] font-mono uppercase text-slate-400 tracking-wider mb-2">
                  Technologies Deployed
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeProject.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-amber-300"
                    >
                      {t}
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
