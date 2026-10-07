'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ARCHIVE_DATA, ArchiveSkillLayer } from '@/data/portfolioData';
import { Cloud, Layers, Cpu, Terminal, ArrowRight, CheckCircle2, ShieldCheck, Activity, GitFork, Globe } from 'lucide-react';

export default function Scene05SystemsArchitecture() {
  const { skillsLayers } = ARCHIVE_DATA;
  const [selectedLayerId, setSelectedLayerId] = useState<string>(skillsLayers[0].id);

  const activeLayer = skillsLayers.find((l) => l.id === selectedLayerId) || skillsLayers[0];

  return (
    <section
      id="scene-systems"
      className="relative w-full min-h-screen flex flex-col justify-center items-center px-4 sm:px-8 py-24 overflow-hidden border-t border-white/5 bg-[#040408]"
    >
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center">
        {/* Scene Identification Header */}
        <div className="w-full flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-amber-400/80 mb-8 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5 text-amber-400" />
            <span>SCENE 05 // SYSTEMS & INFRASTRUCTURE ARCHITECTURE</span>
          </div>
          <div className="text-slate-400">
            LENS: 35mm · f/4.0 · 1/1000s · RESOLUTION: 1:1 DETERMINISTIC
          </div>
        </div>

        {/* Narrative Title */}
        <div className="max-w-3xl text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono uppercase mb-4">
            <GitFork className="w-3.5 h-3.5 text-amber-400" />
            <span>Infrastructure Stack Blueprint</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#f4f1ea] tracking-wide mb-4">
            Architected Layers & Global Scale
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-serif">
            Distributed infrastructure is not a list of disconnected tools. It is a synchronized planetary mesh where
            declarative Terraform builds the cloud fabric across multiple availability zones, Kubernetes orchestrates self-healing container fleets,
            and automated pipelines ensure uninterrupted continuity.
          </p>
        </div>

        {/* =========================================================================
            05 — EARTH: SINGULAR VISUAL ANCHOR (OBSERVATION → SCALE → SYSTEMS)
            Retro astronomical illustration communicating planetary distributed scale
           ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="w-full mb-10 p-5 sm:p-6 rounded-3xl bg-[#080913]/90 border border-amber-400/25 shadow-xl backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* Earth Editorial Plate */}
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 shrink-0 flex items-center justify-center p-2 rounded-2xl bg-black/50 border border-white/10">
            <Image
              src="/archive/illustration_earth_clean.webp"
              alt="Archival Earth Illustration — Planetary Substrate & Multi-Region Topology"
              width={150}
              height={150}
              className="object-contain filter contrast-105 opacity-90 hover:opacity-100 transition-opacity"
            />
          </div>

          {/* Narrative Callout */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-[10px] font-mono text-amber-400 uppercase tracking-widest mb-1.5">
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>FIGURE V // PLANETARY SUBSTRATE · SCALE & RESILIENCE</span>
            </div>
            <h4 className="text-lg sm:text-xl font-serif font-bold text-[#f4f1ea]">
              Observation → Scale → Systems
            </h4>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl font-serif leading-relaxed">
              When software serves users globally, geographical boundaries dissolve into latency matrices,
              edge-caching nodes, and multi-region failover zones. Terraform scripts define cloud topology,
              making an entire planetary deployment reproducible from a single terminal execution.
            </p>
          </div>

          {/* Telemetry Points */}
          <div className="shrink-0 flex flex-col gap-1 text-[10px] font-mono text-amber-300/90 border-t md:border-t-0 md:border-l border-white/10 pt-3 md:pt-0 md:pl-5 text-left">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>ap-south-1 (Mumbai / Primary)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>us-east-1 (N. Virginia / Edge)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              <span>eu-central-1 (Frankfurt / Sync)</span>
            </div>
            <span className="text-[9px] text-slate-500 mt-1 uppercase">
              STATE: DETERMINISTIC REPLICATION
            </span>
          </div>
        </motion.div>

        {/* Systems Pipeline Flow Indicator */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8 font-mono text-xs">
          {skillsLayers.map((layer, index) => {
            const isSelected = layer.id === selectedLayerId;
            return (
              <button
                key={layer.id}
                type="button"
                onClick={() => setSelectedLayerId(layer.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-400/15 border-amber-400 text-amber-200 shadow-[0_0_25px_rgba(212,175,55,0.25)]'
                    : 'bg-[#080911] border-white/10 text-slate-400 hover:text-slate-200 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] text-amber-400/80 font-bold">
                    0{index + 1} // {layer.codeName}
                  </span>
                  <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-amber-400 animate-ping' : 'bg-slate-700'}`} />
                </div>
                <span className="font-serif font-bold text-xs sm:text-sm text-[#f4f1ea] line-clamp-1">
                  {layer.title.split('&')[0]}
                </span>
                <span className="text-[10px] text-amber-300/70 mt-1 uppercase">
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
            transition={{ duration: 0.4 }}
            className="w-full rounded-3xl bg-[#090a14] border border-amber-400/30 p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl"
          >
            {/* Layer Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-1">
                  <Layers className="w-4 h-4" />
                  <span>LAYER LEVEL 0{activeLayer.level} · {activeLayer.codeName}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#f4f1ea]">
                  {activeLayer.title}
                </h3>
                <p className="text-sm text-slate-300 mt-1 max-w-2xl font-serif">
                  {activeLayer.summary}
                </p>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-mono self-start sm:self-auto">
                <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span>STATE: DETERMINISTIC</span>
              </div>
            </div>

            {/* Components Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
              {activeLayer.components.map((comp) => (
                <div
                  key={comp.name}
                  className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-amber-400/40 transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-bold text-amber-200 font-mono">
                      {comp.name}
                    </h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-400/20">
                      {comp.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {comp.detail}
                  </p>
                </div>
              ))}
            </div>

            {/* Terminal Command Verification Log */}
            <div className="p-4 rounded-xl bg-black/80 border border-slate-800 font-mono text-xs text-slate-300 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 overflow-x-auto">
                <Terminal className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-amber-400/80">$</span>
                <code className="text-slate-200 whitespace-nowrap">{activeLayer.commandSample}</code>
              </div>
              <span className="hidden sm:inline-block text-[10px] text-slate-500 uppercase shrink-0">
                EXECUTION PROVED
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

