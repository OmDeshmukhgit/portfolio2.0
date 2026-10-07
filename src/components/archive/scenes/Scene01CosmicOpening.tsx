'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ARCHIVE_DATA } from '@/data/portfolioData';
import { Compass, ArrowDown, Eye, Radio, Sparkles, BookOpen } from 'lucide-react';
import EngineeringConstellations from '@/components/archive/EngineeringConstellations';

interface SceneProps {
  onScrollToNext: () => void;
}

export default function Scene01CosmicOpening({ onScrollToNext }: SceneProps) {
  const { curator, pillars } = ARCHIVE_DATA;

  return (
    <section
      id="scene-deep-space"
      className="relative w-full min-h-screen flex flex-col justify-between items-center px-4 sm:px-8 py-20 overflow-hidden select-none"
    >
      {/* =========================================================================
          COSMIC BACKGROUND: DEEP STARLIGHT, NEBULA DUST & APERTURE VIGNETTE
         ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Obsidian Space Void */}
        <div className="absolute inset-0 bg-[#030305]" />

        {/* Subtle Starlight Points (Pure CSS) */}
        <div className="absolute inset-0 opacity-60">
          {[...Array(35)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-stellar"
              style={{
                top: `${(i * 17) % 100}%`,
                left: `${(i * 29) % 100}%`,
                animationDelay: `${(i % 7) * 0.8}s`,
                opacity: i % 3 === 0 ? 0.8 : 0.4,
              }}
            />
          ))}
        </div>

        {/* Subtle Astronomical Nebula Glow */}
        <div className="absolute w-[500px] h-[500px] rounded-full bg-indigo-950/20 blur-[120px] top-1/4 left-1/3 pointer-events-none" />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-amber-950/15 blur-[100px] bottom-1/3 right-1/4 pointer-events-none" />

        {/* Camera Aperture Radial Vignette */}
        <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_45%,rgba(3,3,5,0.85)_100%]" />
      </div>

      {/* =========================================================================
          CAMERA VIEWFINDER RETICLE & METADATA
         ========================================================================= */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-amber-400/70 border-b border-white/5 pb-4">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span>EXPEDITION: 01 // COSMIC OBSERVATORY & ARCHIVE</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-slate-400">
          <span>COORDINATES: {curator.coordinates}</span>
          <span>·</span>
          <span>LOCATION: {curator.baseLocation}</span>
        </div>
        <div className="text-amber-300 font-bold">
          [ 85mm · f/1.2 · ISO 100 ]
        </div>
      </div>

      {/* =========================================================================
          THE CINEMATIC REVEAL: CURATOR TITLE & RETRO TELESCOPE INTEGRATION
         ========================================================================= */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center my-auto py-8">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
          {/* Left Column: Curator Persona & Narrative */}
          <div className="lg:col-span-8 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Minimal Lens Reticle Crosshair */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="w-12 h-12 rounded-full border border-amber-400/40 flex items-center justify-center mb-6 relative"
            >
              <div className="w-2 h-2 rounded-full bg-amber-400" />
              <div className="absolute -top-1 w-2 h-0.5 bg-amber-400/80" />
              <div className="absolute -bottom-1 w-2 h-0.5 bg-amber-400/80" />
              <div className="absolute -left-1 h-2 w-0.5 bg-amber-400/80" />
              <div className="absolute -right-1 h-2 w-0.5 bg-amber-400/80" />
            </motion.div>

            {/* Cinematic Archive Supertitle */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-xs sm:text-sm font-mono tracking-[0.3em] uppercase text-amber-300/80 mb-3"
            >
              A DIGITAL OBSERVATORY & ARCHIVE
            </motion.div>

            {/* Master Curator Name */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.5 }}
              className="text-4xl sm:text-6xl md:text-7xl font-serif font-extrabold tracking-wider text-[#f4f1ea] drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)]"
            >
              {curator.name}
            </motion.h1>

            {/* Architectural Role */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0c0d14]/90 border border-amber-400/30 text-amber-300 text-xs font-mono tracking-widest uppercase shadow-xl"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{curator.title}</span>
            </motion.div>

            {/* Central Directive */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.9 }}
              className="mt-6 text-base sm:text-lg md:text-xl text-slate-300 max-w-xl font-serif italic leading-relaxed"
            >
              &ldquo;{curator.tagline}&rdquo;
            </motion.p>
          </div>

          {/* Right Column: 01 — TELESCOPE ARTIFACT (Archival Field Journal Illustration) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.6 }}
            className="lg:col-span-4 relative flex flex-col items-center justify-center"
          >
            {/* Archival Plate Frame */}
            <div className="relative p-4 rounded-3xl bg-[#080911]/85 border border-amber-400/30 shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-md group">
              {/* Field Plate Top Label */}
              <div className="flex items-center justify-between text-[9px] font-mono text-amber-400/70 border-b border-white/10 pb-2 mb-2">
                <span>PLATE I // FIELD JOURNAL</span>
                <span>FIG. 85 · REFRACTOR</span>
              </div>

              {/* Telescope Illustration: Archival Editorial Tone, Partially Cropped & Controlled */}
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center overflow-hidden">
                <Image
                  src="/archive/illustration_telescope_clean.webp"
                  alt="Vintage Refracting Telescope Illustration — Archival Observation Instrument"
                  width={256}
                  height={256}
                  priority
                  className="object-contain filter contrast-105 opacity-90 transition-opacity duration-700 hover:opacity-100"
                />
              </div>

              {/* Archival Bottom Annotation */}
              <div className="mt-2 pt-2 border-t border-white/5 text-center font-mono">
                <span className="text-[10px] text-amber-300 tracking-wider font-bold block">
                  OPTICAL INSTRUMENT NO. 85
                </span>
                <span className="text-[9px] text-slate-400 uppercase">
                  AIM: THE CELESTIAL ENGINEERING SKY · OBSERVE → EXPLORE
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* =========================================================================
            INTERACTIVE OBSERVATORY: THE ENGINEERING SKY
            Constellations: AWS · DOCKER · KUBERNETES · TERRAFORM · CI/CD · LINUX · PYTHON
           ========================================================================= */}
        <div className="w-full mt-6">
          <EngineeringConstellations />
        </div>
      </div>

      {/* =========================================================================
          CAMERA ADVANCE CONTROLS
         ========================================================================= */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/5">
        <div className="text-[11px] font-mono text-slate-500">
          FRAME SEQUENCE 01 / 08 · INSTRUMENT: TELESCOPE · SKY: SYNCHRONIZED
        </div>

        <button
          type="button"
          onClick={onScrollToNext}
          className="group flex items-center gap-3 px-6 py-2.5 rounded-full bg-amber-500/10 hover:bg-amber-500/20 border border-amber-400/40 hover:border-amber-300 text-amber-200 text-xs font-mono uppercase tracking-widest transition-all hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
        >
          <span>Travel Forward Into Archive</span>
          <ArrowDown className="w-3.5 h-3.5 text-amber-400 group-hover:translate-y-1 transition-transform" />
        </button>

        <div className="hidden sm:block text-[11px] font-mono text-slate-500">
          SCROLL TO OPERATE CAMERA
        </div>
      </div>
    </section>
  );
}

