'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { Aperture } from 'lucide-react';

interface ArchiveOpeningProps {
  onTrigger?: () => void;
  onEnter: () => void;
}

type OpeningPhase = 'idle' | 'recognition' | 'approach' | 'optical-void' | 'done';

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

  // Track subtle mouse movement across viewport for multi-plane parallax (disabled once active to avoid lag)
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (phase !== 'idle' || typeof window === 'undefined') return;
    const { innerWidth, innerHeight } = window;
    const normX = (e.clientX / innerWidth - 0.5) * 22; // max +-11px
    const normY = (e.clientY / innerHeight - 0.5) * 16; // max +-8px
    mouseX.set(normX);
    mouseY.set(normY);
  }, [phase, mouseX, mouseY]);

  // Cinematic Continuous Activation Sequence:
  // Recognition (160ms) -> Physical Approach (1100ms) -> Optical Void (450ms) -> Reveal Chapter One + Music
  const handleTrigger = useCallback(() => {
    if (phase !== 'idle') return;

    // Reset mouse parallax coordinates immediately for pure, clean transform performance
    mouseX.set(0);
    mouseY.set(0);

    // Notify parent directly in click gesture to prime audio
    if (onTrigger) {
      onTrigger();
    }

    // Phase 1 — Recognition: Immediate camera mechanical acknowledgment & glint
    setPhase('recognition');

    // Phase 2 — Continuous physical approach toward the viewer
    setTimeout(() => {
      setPhase('approach');

      // Phase 3 — Dark Optical Lens Transition (NO WHITE FLASH)
      setTimeout(() => {
        setPhase('optical-void');

        // Phase 4 — Seamless Reveal of Chapter One beneath dissolving optical aperture
        setTimeout(() => {
          setPhase('done');
          onEnter();
        }, prefersReducedMotion ? 350 : 450);
      }, prefersReducedMotion ? 400 : 1050);
    }, 160);
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
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="fixed inset-0 z-[100] overflow-hidden bg-[#03040a] text-[#f4f1ea] select-none flex flex-col justify-between items-center"
      style={{
        pointerEvents: phase === 'done' ? 'none' : 'auto',
      }}
    >
      {/* =========================================================================
          BACKGROUND LAYER 1: BASE DEEP COSMIC VOID & ORGANIC NEBULA TEXTURE
          High-performance composite rendering (transforms & opacity only, no filters)
         ========================================================================= */}
      <motion.div
        animate={{
          scale: phase === 'approach' ? 1.05 : 1,
          opacity: phase === 'approach' || phase === 'optical-void' || phase === 'done' ? 0.2 : 0.85,
        }}
        transition={{
          duration: phase === 'approach' ? 1.1 : 0.4,
          ease: 'easeInOut',
        }}
        className="absolute inset-0 pointer-events-none z-0 will-change-transform"
      >
        <Image
          src="/archive/opening/opening-space-bg.webp"
          alt="Cosmic Environment Base Texture"
          fill
          priority
          className="object-cover object-center filter contrast-125 brightness-80"
          sizes="100vw"
        />

        {/* Deep Optical Radial Mask */}
        <div className="absolute inset-0 bg-radial-[circle_at_40%_45%,transparent_20%,rgba(3,4,10,0.85)_70%,#03040a_100%]" />
      </motion.div>

      {/* =========================================================================
          BACKGROUND LAYER 2: TASTEFUL COLORFUL COSMIC NEBULA ILLUMINATION
          Deep ocean blue, cyan, violet, soft magenta, and warm golden light scattering
         ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden">
        {/* Upper-Left Celestial Nursery: Deep Indigo & Luminous Cyan */}
        <div className="absolute -top-[10%] -left-[10%] w-[65vw] h-[65vw] max-w-[850px] max-h-[850px] rounded-full bg-gradient-to-br from-indigo-600/25 via-cyan-500/18 to-violet-600/15 blur-[120px]" />

        {/* Lower-Right Solar Horizon: Warm Amber, Gold & Soft Rose Dispersion */}
        <div className="absolute -bottom-[12%] -right-[8%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-gradient-to-tl from-amber-500/25 via-orange-400/18 to-rose-500/14 blur-[130px]" />

        {/* Center-Left Planetary Corona: Radiant Celestial Cyan-Teal Sheen */}
        <div className="absolute top-[20%] left-[8%] w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] rounded-full bg-cyan-400/12 blur-[100px]" />

        {/* Center-Right Camera Ambient Warmth: Gentle Golden Rim Light */}
        <div className="absolute top-[38%] right-[12%] w-[35vw] h-[35vw] max-w-[450px] max-h-[450px] rounded-full bg-amber-400/10 blur-[90px]" />
      </div>

      {/* =========================================================================
          BACKGROUND LAYER 3: MULTI-CHROMATIC STARFIELD (NATURAL SPACE PHOTOGRAPHY)
         ========================================================================= */}
      <motion.div
        style={{
          x: smoothMouseX,
          y: smoothMouseY,
        }}
        className="absolute inset-0 pointer-events-none z-[2] opacity-80 will-change-transform"
      >
        {stars.map((star, idx) => (
          <div
            key={idx}
            className={`absolute rounded-full ${star.color}`}
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
            }}
          />
        ))}

        {/* Background micro-stars for rich astronomical depth */}
        {[...Array(30)].map((_, i) => (
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
          BACKGROUND LAYER 4: VIBRANT CELESTIAL SPHERE / PLANETARY HORIZON
          Looming celestial body with rich ocean blue-violet body, atmospheric
          cyan limb dispersion, and warm sunlit golden crescent rim.
         ========================================================================= */}
      <motion.div
        animate={{
          scale: phase === 'approach' ? 1.04 : 1,
          opacity: phase === 'approach' ? 0.3 : phase === 'optical-void' || phase === 'done' ? 0 : 0.95,
        }}
        transition={{ duration: 1.1, ease: 'easeInOut' }}
        style={{
          x: smoothMouseX,
          y: smoothMouseY,
        }}
        className="absolute -left-[20vw] sm:-left-[12vw] md:-left-[8vw] top-[10vh] sm:top-[12vh] pointer-events-none z-[3] w-[340px] h-[340px] sm:w-[500px] sm:h-[500px] md:w-[650px] md:h-[650px] lg:w-[760px] lg:h-[760px] will-change-transform"
      >
        {/* Planetary atmospheric limb diffusion glow */}
        <div className="absolute -inset-4 rounded-full bg-cyan-400/18 blur-[80px]" />
        <div className="absolute inset-0 rounded-full bg-indigo-600/22 blur-[100px]" />

        {/* Spherical Planetary Body with luminous crescent terminator rim */}
        <div
          className="w-full h-full rounded-full relative overflow-hidden"
          style={{
            background:
              'radial-gradient(circle at 74% 32%, #22264c 0%, #11142f 35%, #080a1c 70%, #03040a 100%)',
            boxShadow:
              'inset -32px 22px 65px rgba(251, 191, 36, 0.45), inset -10px 6px 18px rgba(254, 243, 199, 0.75), 0 0 110px rgba(56, 189, 248, 0.22)',
          }}
        >
          {/* Natural atmospheric sheen across terminator */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-cyan-500/15 to-amber-200/15 pointer-events-none" />
        </div>

        {/* Minimal Archival Celestial Annotation */}
        <div className="absolute top-[36%] right-[2%] px-2.5 py-1 rounded bg-[#060710]/85 border border-white/10 text-[8px] font-mono tracking-widest text-amber-300/70 uppercase backdrop-blur-sm hidden md:block">
          CELESTIAL LIMB // SPECTRUM OPTICA
        </div>
      </motion.div>

      {/* =========================================================================
          TOP ARCHIVAL HUD HEADER (Minimalist, unobtrusive, fades on click)
         ========================================================================= */}
      <motion.header
        animate={{
          opacity: phase === 'idle' ? 1 : 0,
          y: phase === 'idle' ? 0 : -16,
        }}
        transition={{ duration: 0.18 }}
        className="relative z-20 w-full max-w-7xl mx-auto px-6 pt-8 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-amber-300/80 border-b border-white/5 pb-4"
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
          FOREGROUND / MIDGROUND: THE HERO CAMERA + CINEMATIC PROMPT
          Camera positioned with spatial depth, slightly offset to the right,
          balancing the majestic planetary body on the left.
         ========================================================================= */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center w-full px-4">
        {/* Spatial Camera Container with Physical Mass & Inertial Parallax */}
        <motion.div
          style={{
            x: smoothMouseX,
            y: smoothMouseY,
          }}
          className="relative flex flex-col items-center sm:translate-x-[12vw] md:translate-x-[16vw] lg:translate-x-[18vw] will-change-transform"
        >
          {/* Floating Zero-G Physical Camera Instrument */}
          <motion.div
            animate={
              phase === 'idle'
                ? {
                    x: [-6, 8, -4, 9, -6],
                    y: [7, -9, 5, -8, 7],
                    rotate: [-0.8, 1.1, -0.4, 0.8, -0.8],
                    scale: [1, 1.008, 0.996, 1.004, 1],
                  }
                : phase === 'recognition'
                ? {
                    scale: 0.985,
                    y: 2,
                    rotate: 0,
                  }
                : phase === 'approach'
                ? {
                    x: 0,
                    y: 0,
                    rotate: 0,
                    scale: prefersReducedMotion ? 1.15 : 36,
                  }
                : {
                    scale: prefersReducedMotion ? 1.2 : 40,
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
                : phase === 'recognition'
                ? {
                    duration: 0.16,
                    ease: 'easeOut',
                  }
                : phase === 'approach'
                ? {
                    duration: 1.05,
                    ease: [0.22, 1, 0.36, 1], // Smooth physical approach curve
                  }
                : {
                    duration: 0.22,
                    ease: 'easeOut',
                  }
            }
            style={{
              transformOrigin: '52% 57%', // Optical center of camera lens barrel
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

            {/* Vintage Field Camera Asset (Reused from existing archive) */}
            <div className="relative w-56 h-56 sm:w-68 sm:h-68 md:w-80 md:h-80 lg:w-92 lg:h-92 transition-transform duration-500 group-hover:scale-103">
              <Image
                src="/archive/illustration_camera_clean.webp"
                alt="Vintage Field Camera — Zero-Gravity Instrument"
                fill
                priority
                className="object-contain filter contrast-110 drop-shadow-[0_20px_50px_rgba(0,0,0,0.95)] group-hover:drop-shadow-[0_25px_65px_rgba(245,158,11,0.28)] transition-all"
                sizes="(max-width: 640px) 224px, (max-width: 768px) 272px, (max-width: 1024px) 320px, 368px"
              />
            </div>

            {/* Phase 1 Optical Glint across the lens upon activation */}
            {phase === 'recognition' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.9, scale: 1.25 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className="absolute top-[54%] left-[51%] -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border border-amber-300 shadow-[0_0_24px_rgba(251,191,36,0.8)] pointer-events-none"
              />
            )}

            {/* Subtle Viewfinder Crosshair Brackets on Hover */}
            <div className="absolute -inset-4 sm:-inset-6 border border-amber-400/0 group-hover:border-amber-400/30 rounded-3xl transition-all duration-500 pointer-events-none">
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-amber-400/60 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-amber-400/60 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-amber-400/60 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-amber-400/60 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </motion.div>

          {/* =========================================================================
              CINEMATIC INTERACTION PROMPT: "ENTER THE ARCHIVE ↓"
              Minimalist, outlined, refined archival prompt situated near camera.
             ========================================================================= */}
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
        className="relative z-20 w-full max-w-7xl mx-auto px-6 pb-8 flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-slate-300/80 border-t border-white/5 pt-4"
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
          DARK OPTICAL LENS TRANSITION (NO WHITE FLASH!)
          As the camera approaches, the viewer smoothly enters the dark glass pupil of the lens.
          Concentric aperture iris rings and deep optical vignetting expand,
          seamlessly dissolving directly into the approved portfolio beneath.
         ========================================================================= */}
      <motion.div
        animate={{
          opacity: phase === 'approach' ? 0.35 : phase === 'optical-void' ? 1 : 0,
        }}
        transition={{
          duration: phase === 'approach' ? 0.6 : phase === 'optical-void' ? 0.35 : 0.4,
          ease: 'easeInOut',
        }}
        className="absolute inset-0 pointer-events-none z-[110] flex items-center justify-center bg-[#000002] will-change-transform"
      >
        {/* Deep Optical Radial Vignette & Lens Interior Chamber */}
        <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_0%,rgba(3,3,7,0.7)_40%,#000002_85%]" />

        {/* Expanding Concentric Brass Aperture Rings */}
        <motion.div
          animate={{
            scale: phase === 'optical-void' ? [0.7, 2.5] : 0.7,
            opacity: phase === 'optical-void' ? [0.85, 0] : 0,
          }}
          transition={{
            duration: 0.55,
            ease: 'easeOut',
          }}
          className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full border border-amber-400/35 flex items-center justify-center will-change-transform"
        >
          <div className="w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rounded-full border border-amber-500/25 flex items-center justify-center">
            <div className="w-[40vw] h-[40vw] max-w-[400px] max-h-[400px] rounded-full border border-amber-300/40" />
          </div>
        </motion.div>

        {/* Subtle Warm Glass Refraction Rim Halo */}
        <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_60%,rgba(212,175,55,0.08)_85%,transparent_100%] pointer-events-none" />
      </motion.div>
    </div>
  );
}
