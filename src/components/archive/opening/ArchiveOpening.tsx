'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { Aperture, Crosshair } from 'lucide-react';

interface ArchiveOpeningProps {
  onTrigger?: () => void;
  onEnter: () => void;
}

type OpeningPhase = 'idle' | 'approaching' | 'viewfinder' | 'diving' | 'done';

export default function ArchiveOpening({ onTrigger, onEnter }: ArchiveOpeningProps) {
  const [phase, setPhase] = useState<OpeningPhase>('idle');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Inertial mouse tracking for realistic physical mass & parallax during idle
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Heavy spring damping gives the feeling of physical weight suspended in vacuum
  const smoothMouseX = useSpring(mouseX, { stiffness: 16, damping: 32 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 16, damping: 32 });

  // Check reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Lock body scroll while opening experience is active
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Track subtle mouse movement across viewport for multi-plane parallax
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (phase !== 'idle' || typeof window === 'undefined') return;
      const { innerWidth, innerHeight } = window;
      const normX = (e.clientX / innerWidth - 0.5) * 20; // max +-10px
      const normY = (e.clientY / innerHeight - 0.5) * 16; // max +-8px
      mouseX.set(normX);
      mouseY.set(normY);
    },
    [phase, mouseX, mouseY]
  );

  // Cinematic Camera Approach & Through-The-Lens Viewfinder Sequence:
  // 1. Approaching (850ms): Camera glides from offset to center and surges close to screen
  // 2. Viewfinder (900ms): Optical lens opens — see the portfolio through the camera lens aperture!
  // 3. Diving (750ms): Dive directly into the camera lens, expanding the view to full screen
  const handleTrigger = useCallback(() => {
    if (phase !== 'idle') return;

    mouseX.set(0);
    mouseY.set(0);

    // Notify parent directly in click gesture to prime audio
    if (onTrigger) {
      onTrigger();
    }

    setPhase('approaching');

    setTimeout(() => {
      setPhase('viewfinder');

      setTimeout(() => {
        setPhase('diving');

        setTimeout(() => {
          setPhase('done');
          onEnter();
        }, prefersReducedMotion ? 350 : 750);
      }, prefersReducedMotion ? 400 : 900);
    }, prefersReducedMotion ? 400 : 850);
  }, [phase, prefersReducedMotion, onTrigger, onEnter, mouseX, mouseY]);

  // Keyboard accessibility (Enter / Space)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleTrigger();
    }
  };

  // Colorful stellar field (starlight colored according to stellar temperature)
  const stars = [
    { top: 12, left: 18, color: 'bg-cyan-200 shadow-[0_0_8px_rgba(34,211,238,0.9)]', size: 2 },
    { top: 22, left: 35, color: 'bg-amber-200 shadow-[0_0_8px_rgba(251,191,36,0.9)]', size: 2 },
    { top: 18, left: 78, color: 'bg-rose-200 shadow-[0_0_6px_rgba(244,63,94,0.8)]', size: 1.5 },
    { top: 45, left: 85, color: 'bg-cyan-100 shadow-[0_0_10px_rgba(56,189,248,1)]', size: 2.5 },
    { top: 68, left: 72, color: 'bg-amber-100 shadow-[0_0_9px_rgba(252,211,77,0.9)]', size: 2 },
    { top: 82, left: 60, color: 'bg-violet-200 shadow-[0_0_8px_rgba(167,139,250,0.8)]', size: 2 },
    { top: 75, left: 25, color: 'bg-cyan-300 shadow-[0_0_7px_rgba(6,182,212,0.9)]', size: 1.5 },
    { top: 88, left: 40, color: 'bg-amber-200 shadow-[0_0_6px_rgba(245,158,11,0.8)]', size: 2 },
    { top: 32, left: 62, color: 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]', size: 2 },
    { top: 15, left: 52, color: 'bg-rose-100 shadow-[0_0_6px_rgba(251,113,133,0.7)]', size: 1.5 },
    { top: 58, left: 42, color: 'bg-cyan-200 shadow-[0_0_6px_rgba(34,211,238,0.7)]', size: 1.5 },
    { top: 6, left: 88, color: 'bg-amber-300 shadow-[0_0_8px_rgba(251,191,36,0.9)]', size: 2 },
    { top: 92, left: 82, color: 'bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]', size: 1.5 },
    { top: 38, left: 14, color: 'bg-violet-300 shadow-[0_0_7px_rgba(139,92,246,0.8)]', size: 1.5 },
    { top: 62, left: 92, color: 'bg-cyan-100 shadow-[0_0_8px_rgba(34,211,238,0.8)]', size: 2 },
    { top: 28, left: 96, color: 'bg-amber-100 shadow-[0_0_7px_rgba(252,211,77,0.8)]', size: 1.5 },
    { top: 84, left: 12, color: 'bg-rose-200 shadow-[0_0_6px_rgba(244,63,94,0.7)]', size: 1.5 },
    { top: 48, left: 28, color: 'bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]', size: 1 },
  ];

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      animate={{
        opacity: phase === 'done' ? 0 : 1,
      }}
      transition={{
        duration: phase === 'diving' ? 0.4 : 0.2,
      }}
      className="fixed inset-0 z-[100] overflow-hidden bg-[#03040a] text-[#f4f1ea] select-none flex flex-col justify-between items-center will-change-transform"
      style={{
        pointerEvents: phase === 'done' ? 'none' : 'auto',
      }}
    >
      {/* =========================================================================
          BACKGROUND LAYER 1: BASE DEEP COSMIC VOID & SPACE IMAGE
          Restored opening space background image with organic celestial depth
         ========================================================================= */}
      <motion.div
        animate={{
          scale:
            phase === 'idle'
              ? 1
              : phase === 'approaching'
              ? 1.05
              : 1.08,
          opacity:
            phase === 'idle'
              ? 0.9
              : phase === 'approaching'
              ? 0.75
              : phase === 'viewfinder'
              ? 0.5
              : 0,
        }}
        transition={{
          duration: phase === 'approaching' ? 0.85 : 0.6,
          ease: 'easeInOut',
        }}
        className="absolute inset-0 pointer-events-none z-0 will-change-transform"
      >
        <Image
          src="/archive/opening/opening-space-bg.webp"
          alt="Cosmic Environment Base Texture"
          fill
          priority
          className="object-cover object-center filter contrast-125 brightness-85"
          sizes="100vw"
        />

        {/* Deep Optical Radial Mask for seamless cosmic edge blending */}
        <div className="absolute inset-0 bg-radial-[circle_at_40%_45%,transparent_20%,rgba(3,4,10,0.8)_65%,#03040a_100%]" />
      </motion.div>

      {/* =========================================================================
          BACKGROUND LAYER 2: COLORFUL COSMIC NEBULA ILLUMINATION
         ========================================================================= */}
      <motion.div
        animate={{
          opacity: phase === 'idle' ? 1 : phase === 'approaching' ? 0.7 : 0.3,
        }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 pointer-events-none z-[1] overflow-hidden"
      >
        {/* Upper-Left Celestial Nursery: Deep Indigo & Luminous Cyan */}
        <div className="absolute -top-[10%] -left-[10%] w-[65vw] h-[65vw] max-w-[850px] max-h-[850px] rounded-full bg-gradient-to-br from-indigo-600/25 via-cyan-500/18 to-violet-600/15 blur-[120px]" />

        {/* Lower-Right Solar Horizon: Warm Amber, Gold & Soft Rose Dispersion */}
        <div className="absolute -bottom-[12%] -right-[8%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-gradient-to-tl from-amber-500/25 via-orange-400/18 to-rose-500/14 blur-[130px]" />

        {/* Center-Left Planetary Corona: Radiant Celestial Cyan-Teal Sheen */}
        <div className="absolute top-[20%] left-[8%] w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] rounded-full bg-cyan-400/12 blur-[100px]" />

        {/* Center-Right Camera Ambient Warmth */}
        <div className="absolute top-[38%] right-[12%] w-[35vw] h-[35vw] max-w-[450px] max-h-[450px] rounded-full bg-amber-400/10 blur-[90px]" />
      </motion.div>

      {/* =========================================================================
          BACKGROUND LAYER 3: MULTI-CHROMATIC STARFIELD
         ========================================================================= */}
      <motion.div
        style={{
          x: smoothMouseX,
          y: smoothMouseY,
        }}
        animate={{
          opacity: phase === 'idle' ? 0.85 : phase === 'approaching' ? 0.6 : 0.2,
        }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 pointer-events-none z-[2] will-change-transform"
      >
        {stars.map((star, idx) => (
          <div
            key={idx}
            className={`absolute rounded-full ${star.color} animate-pulse`}
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDuration: `${3.5 + (idx % 5) * 0.7}s`,
            }}
          />
        ))}

        {/* Subtle background micro-stars */}
        {[...Array(24)].map((_, i) => (
          <div
            key={`micro-${i}`}
            className="absolute rounded-full bg-white/70"
            style={{
              top: `${(i * 23 + 11) % 100}%`,
              left: `${(i * 37 + 17) % 100}%`,
              width: '1px',
              height: '1px',
              opacity: i % 2 === 0 ? 0.6 : 0.3,
            }}
          />
        ))}
      </motion.div>

      {/* =========================================================================
          TOP ARCHIVAL HUD HEADER
         ========================================================================= */}
      <motion.header
        animate={{
          opacity: phase === 'idle' ? 1 : 0,
          y: phase === 'idle' ? 0 : -16,
        }}
        transition={{ duration: 0.18 }}
        className="relative z-20 w-full max-w-7xl mx-auto px-6 pt-8 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-amber-300/80 border-b border-white/5 pb-4 pointer-events-none"
      >
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="tracking-widest">EXPEDITION 00 // FIELD INITIATION</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-slate-300 tracking-wider">
          <span>COSMIC ILLUMINATION</span>
          <span>·</span>
          <span>OPTICAL FIELD CAMERA</span>
        </div>
        <div className="text-amber-300 font-bold tracking-wider">
          [ ARMED · STANDBY ]
        </div>
      </motion.header>

      {/* =========================================================================
          FOREGROUND: THE CAMERA & THROUGH-THE-LENS APERTURE PORTAL
         ========================================================================= */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center w-full px-4">
        {/* Container moving smoothly from offset to screen center */}
        <motion.div
          animate={{
            x: phase === 'idle' ? undefined : 0,
            y: phase === 'idle' ? undefined : 0,
          }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          style={{
            x: phase === 'idle' ? smoothMouseX : 0,
            y: phase === 'idle' ? smoothMouseY : 0,
          }}
          className={`relative flex flex-col items-center will-change-transform ${
            phase === 'idle'
              ? 'sm:translate-x-[12vw] md:translate-x-[16vw] lg:translate-x-[18vw]'
              : 'translate-x-0'
          }`}
        >
          {/* =====================================================================
              THE CAMERA INSTRUMENT (Approaches and surges into the lens)
              transformOrigin: 57.6% 51.5% (The physical center of camera lens barrel)
             ===================================================================== */}
          <motion.div
            animate={
              phase === 'idle'
                ? {
                    x: [-6, 8, -4, 9, -6],
                    y: [7, -9, 5, -8, 7],
                    rotate: [-0.8, 1.1, -0.4, 0.8, -0.8],
                    scale: [1, 1.008, 0.996, 1.004, 1],
                  }
                : phase === 'approaching'
                ? {
                    x: 0,
                    y: 0,
                    rotate: 0,
                    scale: prefersReducedMotion ? 1.6 : 3.0,
                  }
                : phase === 'viewfinder'
                ? {
                    x: 0,
                    y: 0,
                    rotate: 0,
                    scale: prefersReducedMotion ? 1.7 : 3.3,
                  }
                : phase === 'diving'
                ? {
                    scale: prefersReducedMotion ? 2.4 : 28,
                    opacity: [1, 0.9, 0],
                  }
                : {
                    scale: 30,
                    opacity: 0,
                  }
            }
            transition={
              phase === 'idle'
                ? {
                    duration: 24,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }
                : phase === 'approaching'
                ? {
                    duration: 0.85,
                    ease: [0.16, 1, 0.3, 1],
                  }
                : phase === 'viewfinder'
                ? {
                    duration: 0.9,
                    ease: 'easeOut',
                  }
                : phase === 'diving'
                ? {
                    duration: 0.75,
                    ease: [0.7, 0, 0.2, 1],
                  }
                : {
                    duration: 0.2,
                  }
            }
            style={{
              transformOrigin: '57.6% 51.5%', // Precise optical center of lens barrel
            }}
            onClick={handleTrigger}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="button"
            aria-label="Enter the Archive by activating camera"
            className="relative cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/80 rounded-3xl will-change-transform"
          >
            {/* Luminous Ambient Light Scattering around Camera */}
            <div className="absolute top-[48%] left-[45%] -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-44 sm:h-44 rounded-full bg-cyan-400/15 blur-2xl pointer-events-none" />
            <div className="absolute top-[55%] left-[55%] -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-44 sm:h-44 rounded-full bg-amber-400/18 blur-2xl group-hover:bg-amber-400/30 transition-all duration-700 pointer-events-none" />

            {/* Vintage Field Camera Asset */}
            <div className="relative w-56 h-56 sm:w-68 sm:h-68 md:w-80 md:h-80 lg:w-92 lg:h-92 transition-transform duration-500 group-hover:scale-103">
              <Image
                src="/archive/illustration_camera_clean.webp"
                alt="Vintage Field Camera — Zero-Gravity Instrument"
                fill
                priority
                className="object-contain filter contrast-110 drop-shadow-[0_20px_50px_rgba(0,0,0,0.95)] group-hover:drop-shadow-[0_25px_65px_rgba(245,158,11,0.28)] transition-all"
                sizes="(max-width: 640px) 224px, (max-width: 768px) 272px, (max-width: 1024px) 320px, 368px"
              />

              {/* =================================================================
                  THE VIEWFINDER LENS APERTURE PORTAL
                  Positioned exactly over the camera's circular lens pupil (57.6%, 51.5%)
                  Allows the user to see the portfolio right THROUGH the camera lens!
                 ================================================================= */}
              <div
                style={{
                  top: '51.5%',
                  left: '57.6%',
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 w-[43%] h-[43%] rounded-full overflow-hidden pointer-events-none z-10"
              >
                {/* 1. Viewfinder Portal Window (Activates as camera approaches) */}
                <motion.div
                  animate={{
                    opacity:
                      phase === 'idle'
                        ? 0
                        : phase === 'approaching'
                        ? 0.7
                        : 1,
                  }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 bg-[#030305] flex items-center justify-center overflow-hidden"
                >
                  {/* Space Starlight & Cosmic Dust seen inside the lens */}
                  <div className="absolute inset-0 bg-radial-[circle_at_center,#0e1022_0%,#030305_75%]" />
                  
                  {/* Distant Nebulae seen through the lens glass */}
                  <div className="absolute -top-4 -left-4 w-28 h-28 rounded-full bg-cyan-500/25 blur-xl" />
                  <div className="absolute -bottom-4 -right-4 w-28 h-28 rounded-full bg-amber-500/25 blur-xl" />

                  {/* Tiny glittering stars inside lens */}
                  <div className="absolute top-3 left-4 w-1 h-1 rounded-full bg-cyan-200 animate-pulse shadow-[0_0_4px_cyan]" />
                  <div className="absolute top-8 right-5 w-1 h-1 rounded-full bg-amber-200 shadow-[0_0_4px_orange]" />
                  <div className="absolute bottom-6 left-6 w-1 h-1 rounded-full bg-white shadow-[0_0_4px_white]" />
                  <div className="absolute bottom-4 right-8 w-1 h-1 rounded-full bg-violet-300" />

                  {/* The Luminous Moon visible inside the lens */}
                  <div className="absolute top-2 right-2 w-16 h-16 sm:w-20 sm:h-20 opacity-90 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
                    <Image
                      src="/archive/illustration_moon_clean.webp"
                      alt="Moon visible through camera lens"
                      fill
                      className="object-contain"
                      sizes="80px"
                    />
                  </div>

                  {/* Portfolio Scene Title seen through the lens */}
                  <div className="relative z-10 flex flex-col items-center text-center px-2">
                    <span className="text-[6px] font-mono tracking-[0.25em] text-cyan-300 uppercase drop-shadow">
                      SCENE 01 // COSMIC LENS
                    </span>
                    <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-amber-200 uppercase mt-0.5 drop-shadow">
                      THE ARCHIVE
                    </span>
                    <span className="text-[5px] font-mono tracking-widest text-slate-300 uppercase mt-0.5">
                      OM DESHMUKH
                    </span>
                  </div>

                  {/* High-Tech Viewfinder Reticle Crosshair */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-12 h-px bg-amber-400/40" />
                    <div className="h-12 w-px bg-amber-400/40 absolute" />
                    <div className="w-2 h-2 rounded-full border border-cyan-400/80 absolute animate-ping" />
                  </div>

                  {/* Cylindrical Anamorphic Cyan Flare across the glass */}
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent blur-[0.5px] shadow-[0_0_8px_rgba(34,211,238,0.9)]" />

                  {/* Convex Spherical Glass Glare Highlight */}
                  <div className="absolute inset-0 bg-radial-[circle_at_35%_25%,rgba(255,255,255,0.3)_0%,transparent_50%] pointer-events-none" />

                  {/* Dark Radial Glass Vignette */}
                  <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_40%,rgba(0,0,0,0.8)_85%,#000_100%] pointer-events-none" />
                </motion.div>

                {/* 2. Outer Knurled Brass Aperture Bezel */}
                <div className="absolute inset-0 rounded-full border-2 border-amber-400/80 shadow-[0_0_15px_rgba(245,158,11,0.6),inset_0_0_8px_rgba(0,0,0,0.9)] pointer-events-none" />
                <div className="absolute inset-1 rounded-full border border-dashed border-amber-300/40 pointer-events-none" />
              </div>

              {/* Viewfinder Telemetry Overlay (Active during Viewfinder & Diving) */}
              {(phase === 'viewfinder' || phase === 'approaching') && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    top: '51.5%',
                    left: '57.6%',
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 w-[54%] h-[54%] pointer-events-none z-20 flex items-center justify-center"
                >
                  {/* Calibrated Aperture Ring Markings */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-[#080914]/90 border border-amber-400/40 text-[6px] font-mono tracking-widest text-amber-300 uppercase whitespace-nowrap shadow-md">
                    85MM F/1.4 · OPTICAL GLASS
                  </div>

                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-[#080914]/90 border border-amber-400/40 text-[6px] font-mono tracking-widest text-cyan-300 uppercase whitespace-nowrap shadow-md">
                    SIGHTLINE LOCKED // [ 1:1 ]
                  </div>

                  {/* Corner Viewfinder Brackets */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-amber-400" />
                    <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-amber-400" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-amber-400" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-amber-400" />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Subtle Viewfinder Crosshair Brackets on Hover during Idle */}
            {phase === 'idle' && (
              <div className="absolute -inset-4 sm:-inset-6 border border-amber-400/0 group-hover:border-amber-400/30 rounded-3xl transition-all duration-500 pointer-events-none">
                <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-amber-400/60 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-amber-400/60 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-amber-400/60 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-amber-400/60 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            )}
          </motion.div>

          {/* =====================================================================
              CINEMATIC INTERACTION PROMPT: "ENTER THE ARCHIVE ↓"
             ===================================================================== */}
          <motion.div
            animate={{
              opacity: phase === 'idle' ? 1 : 0,
              y: phase === 'idle' ? 0 : 16,
            }}
            transition={{ duration: 0.16 }}
            className="mt-6 sm:mt-7 flex flex-col items-center gap-2"
          >
            <button
              type="button"
              onClick={handleTrigger}
              className="group relative px-6 sm:px-7 py-2.5 rounded-full bg-[#080a14]/85 hover:bg-[#0e1224]/95 border border-amber-400/35 hover:border-amber-400/80 text-amber-200/90 hover:text-amber-100 font-mono text-[11px] sm:text-xs tracking-[0.28em] uppercase transition-all duration-300 backdrop-blur-md cursor-pointer flex items-center gap-2.5 shadow-[0_6px_25px_rgba(0,0,0,0.7)] hover:shadow-[0_0_30px_rgba(245,158,11,0.25)]"
              aria-label="Enter the Archive"
            >
              <Aperture className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-45 transition-transform duration-500" />
              <span>ENTER THE ARCHIVE</span>
              <span className="text-amber-400/80 group-hover:translate-y-0.5 transition-transform">↓</span>
            </button>

            <span className="text-[8px] sm:text-[9px] font-mono tracking-widest text-slate-300 uppercase">
              CLICK CAMERA OR PROMPT TO PROCEED
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* =========================================================================
          BOTTOM ARCHIVAL FOOTER METADATA
         ========================================================================= */}
      <motion.footer
        animate={{
          opacity: phase === 'idle' ? 1 : 0,
          y: phase === 'idle' ? 0 : 16,
        }}
        transition={{ duration: 0.16 }}
        className="relative z-20 w-full max-w-7xl mx-auto px-6 pb-8 flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-slate-300/80 border-t border-white/5 pt-4 pointer-events-none"
      >
        <div className="flex items-center gap-2">
          <span>CURATOR: OM DESHMUKH</span>
          <span>·</span>
          <span>ENGINEERING + PHOTOGRAPHY</span>
        </div>
        <div className="flex items-center gap-2 text-amber-300/70">
          <span>MEDIUM FORMAT 6×7</span>
          <span>·</span>
          <span>OPTICAL EXPOSURE</span>
        </div>
      </motion.footer>

      {/* =========================================================================
          SEAMLESS OPTICAL DIVE CURTAIN
          As the camera zooms past scale 15, smooth vignette blades dissolve
          flawlessly directly into the approved Chapter One portfolio beneath!
         ========================================================================= */}
      {phase === 'diving' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.4, 0] }}
          transition={{ duration: 0.75, ease: 'easeInOut' }}
          className="absolute inset-0 pointer-events-none z-[120] bg-radial-[circle_at_center,transparent_30%,#030305_90%]"
        />
      )}
    </motion.div>
  );
}
