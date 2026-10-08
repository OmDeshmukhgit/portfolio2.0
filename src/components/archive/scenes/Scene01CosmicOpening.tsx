'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ARCHIVE_DATA } from '@/data/portfolioData';
import { ArrowDown, Sparkles } from 'lucide-react';
import EngineeringConstellations from '@/components/archive/EngineeringConstellations';

interface SceneProps {
  onScrollToNext: () => void;
}

export default function Scene01CosmicOpening({ onScrollToNext }: SceneProps) {
  const { curator, pillars } = ARCHIVE_DATA;
  const sectionRef = useRef<HTMLElement>(null);

  // Local Scene 01 scroll progress for Moon choreography
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 26,
    restDelta: 0.001,
  });

  // CINEMATIC LOCAL BEATS:
  // Beat A (0.00–0.15): ARRIVAL — Partially visible on LEFT (-10vw), begins entering
  // Beat B (0.15–0.45): IDENTITY INTERACTION — Travels LEFT -> behind identity -> CENTER-RIGHT
  // Beat C (0.45–0.60): HERO / HOLD — Stillness payoff! Sits firmly in composition
  // Beat D (0.60–0.85): EXIT — Glides to the right edge and fades
  // 0.85–1.00: Transits out completely before Scene 02 begins
  const moonX = useTransform(
    smoothProgress,
    [0, 0.15, 0.45, 0.60, 0.85],
    ['-10vw', '-2vw', '38vw', '38vw', '110vw']
  );
  const moonY = useTransform(
    smoothProgress,
    [0, 0.15, 0.45, 0.60, 0.85],
    ['12vh', '16vh', '24vh', '24vh', '36vh']
  );
  const moonScale = useTransform(
    smoothProgress,
    [0, 0.15, 0.45, 0.60, 0.85],
    [0.92, 0.95, 1.02, 1.02, 1.05]
  );
  const moonRotate = useTransform(
    smoothProgress,
    [0, 0.45, 0.60, 0.85],
    ['-4deg', '1deg', '1deg', '6deg']
  );
  const moonOpacity = useTransform(
    smoothProgress,
    [0, 0.10, 0.55, 0.70, 0.85],
    [0.72, 0.85, 0.85, 0.45, 0]
  );

  return (
    <section
      ref={sectionRef}
      id="scene-deep-space"
      className="relative w-full min-h-screen flex flex-col justify-between items-center px-4 sm:px-8 py-20 overflow-hidden select-none"
    >
      {/* =========================================================================
          BACKGROUND LAYER: OBSIDIAN VOID, CANVAS STARLIGHT & VIGNETTE
         ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none z-0">
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

        {/* Atmospheric Nebula Glow */}
        <div className="absolute w-[500px] h-[500px] rounded-full bg-indigo-950/20 blur-[120px] top-1/4 left-1/3 pointer-events-none" />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-amber-950/15 blur-[100px] bottom-1/3 right-1/4 pointer-events-none" />

        {/* Camera Aperture Radial Vignette */}
        <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_45%,rgba(3,3,5,0.85)_100%]" />
      </div>

      {/* =========================================================================
          MIDGROUND INSTRUMENT: THE MOON IN PHYSICAL TRANSIT (25–35vw SCALE)
          Begins partially visible on the LEFT -> passes behind identity -> HOLDS -> exits RIGHT
         ========================================================================= */}
      <motion.div
        style={{
          x: moonX,
          y: moonY,
          opacity: moonOpacity,
          scale: moonScale,
          rotate: moonRotate,
        }}
        className="absolute top-0 left-0 pointer-events-none z-[5] will-change-transform hidden sm:flex flex-col items-center"
      >
        <div className="relative w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] md:w-[420px] md:h-[420px] lg:w-[480px] lg:h-[480px]">
          <Image
            src="/archive/illustration_moon_clean.webp"
            alt="Astronomical Moon Transit — Visual Archive Instrument"
            fill
            priority
            className="object-contain filter contrast-105 drop-shadow-[0_0_50px_rgba(255,255,255,0.12)]"
            sizes="(max-width: 768px) 340px, (max-width: 1200px) 420px, 480px"
          />
        </div>
        <div className="mt-1 px-3 py-1 rounded-full bg-[#080911]/80 border border-white/10 text-[8px] font-mono tracking-widest text-amber-300/70 uppercase backdrop-blur-sm">
          MERIDIAN TRANSIT // LUNAR EPHEMERIS
        </div>
      </motion.div>

      {/* =========================================================================
          FOREGROUND: CAMERA RETICLE & ARCHIVE METADATA
         ========================================================================= */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-amber-400/70 border-b border-white/5 pb-4">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span>EXPEDITION: 01 // DIGITAL ARCHIVE & OBSERVATORY</span>
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
          PRIMARY LEVEL 1 SUBJECT: CURATOR IDENTITY & PORTFOLIO LEAD
         ========================================================================= */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center my-auto py-12">
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

        {/* Supertitle */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-xs sm:text-sm font-mono tracking-[0.3em] uppercase text-amber-300/80 mb-3"
        >
          PERSONAL ENGINEERING & PHOTOGRAPHIC ARCHIVE
        </motion.div>

        {/* Master Curator Name */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-extrabold tracking-wider text-[#f4f1ea] drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)]"
        >
          {curator.name}
        </motion.h1>

        {/* Professional Role */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-4 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#0c0d14]/90 border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-mono tracking-widest uppercase shadow-xl"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{curator.title}</span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.9 }}
          className="mt-6 text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl font-serif italic leading-relaxed"
        >
          &ldquo;{curator.tagline}&rdquo;
        </motion.p>

        {/* The 5 Pillars Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.1 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-mono text-slate-300"
        >
          {pillars.map((p) => (
            <span
              key={p.name}
              className="px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 flex items-center gap-1.5"
            >
              <span className="text-amber-400">{p.symbol}</span>
              <span className="text-slate-200">{p.name}</span>
              <span className="text-slate-500 text-[10px]">({p.role})</span>
            </span>
          ))}
        </motion.div>

        {/* =========================================================================
            THE CELESTIAL ENGINEERING SKY: ANNOTATED STAR CHART
            Constellations: AWS · DOCKER · KUBERNETES · TERRAFORM · CI/CD · LINUX · PYTHON
           ========================================================================= */}
        <div className="w-full mt-14">
          <EngineeringConstellations />
        </div>
      </div>

      {/* =========================================================================
          BOTTOM CAMERA CONTROLS
         ========================================================================= */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/5">
        <div className="text-[11px] font-mono text-slate-500">
          FRAME SEQUENCE 01 / 08 · LEVEL 1: BEDROCK ENGINEERING & PHOTOGRAPHY
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
          SCROLL TO EXPLORE ARCHIVE
        </div>
      </div>
    </section>
  );
}


