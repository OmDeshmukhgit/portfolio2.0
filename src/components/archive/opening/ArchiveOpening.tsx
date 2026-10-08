'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, useSpring, useMotionValue } from 'framer-motion';

interface ArchiveOpeningProps {
  onTrigger?: () => void;
  onEnter: () => void;
}

type OpeningPhase =
  | 'idle'
  | 'silence'
  | 'pulse'
  | 'travel'
  | 'response'
  | 'converge'
  | 'bloom'
  | 'revealed';

// Starlight Responders positioned naturally across the cosmic expanse
interface StarResponder {
  id: string;
  top: number; // percentage of viewport height
  left: number; // percentage of viewport width
  delay: number; // in seconds relative to response phase
  size: number; // in pixels
}

const RESPONDING_STARS: StarResponder[] = [
  { id: 'node-1', left: 28, top: 26, delay: 0.0, size: 4.0 }, // Origin Beacon
  { id: 'node-2', left: 40, top: 33, delay: 0.25, size: 4.5 }, // Upper-mid cluster
  { id: 'node-3', left: 55, top: 23, delay: 0.55, size: 4.2 }, // Top deep sky
  { id: 'node-4', left: 68, top: 38, delay: 0.85, size: 4.8 }, // Right nebula rim
  { id: 'node-5', left: 74, top: 54, delay: 1.15, size: 4.0 }, // Far right expanse
  { id: 'node-6', left: 58, top: 64, delay: 1.4, size: 4.6 }, // Lower-mid cluster
  { id: 'node-7', left: 42, top: 58, delay: 1.65, size: 4.2 }, // Return filament
];

// Constellation network paths connecting responding stars
const NETWORK_CONNECTIONS: [number, number][] = [
  [0, 1], // Node 1 -> Node 2
  [1, 2], // Node 2 -> Node 3
  [1, 5], // Node 2 -> Node 6 (Diagonal balance)
  [2, 3], // Node 3 -> Node 4
  [3, 4], // Node 4 -> Node 5
  [3, 5], // Node 4 -> Node 6
  [5, 6], // Node 6 -> Node 7
  [6, 0], // Node 7 -> Node 1 (Loop discovery)
];

// Natural ambient stars for the dormant space state
const AMBIENT_STARS = [
  { top: 12, left: 18, size: 1.8, delay: 0 },
  { top: 22, left: 82, size: 2.2, delay: 1.4 },
  { top: 48, left: 88, size: 1.6, delay: 2.2 },
  { top: 70, left: 78, size: 2.0, delay: 0.8 },
  { top: 82, left: 62, size: 1.5, delay: 3.1 },
  { top: 86, left: 24, size: 1.8, delay: 1.9 },
  { top: 34, left: 68, size: 2.0, delay: 2.7 },
  { top: 14, left: 48, size: 1.5, delay: 0.5 },
  { top: 62, left: 16, size: 2.2, delay: 3.5 },
  { top: 8, left: 86, size: 1.8, delay: 1.1 },
  { top: 92, left: 80, size: 1.5, delay: 2.4 },
  { top: 38, left: 14, size: 2.0, delay: 0.9 },
  { top: 52, left: 84, size: 1.7, delay: 1.6 },
  { top: 76, left: 34, size: 1.5, delay: 2.9 },
  { top: 24, left: 30, size: 1.8, delay: 0.3 },
];

export default function ArchiveOpening({ onTrigger, onEnter }: ArchiveOpeningProps) {
  const [phase, setPhase] = useState<OpeningPhase>('idle');
  const containerRef = useRef<HTMLDivElement>(null);

  // Inertial mouse tracking for realistic physical parallax during idle
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Heavy spring damping gives physical weight suspended in deep space
  const smoothMouseX = useSpring(mouseX, { stiffness: 12, damping: 38 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 12, damping: 38 });

  // Lock body scroll while opening experience is active
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Track subtle mouse movement across viewport for multi-plane parallax in idle
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (phase !== 'idle' || typeof window === 'undefined') return;
      const { innerWidth, innerHeight } = window;
      const normX = (e.clientX / innerWidth - 0.5) * 12;
      const normY = (e.clientY / innerHeight - 0.5) * 8;
      mouseX.set(normX);
      mouseY.set(normY);
    },
    [phase, mouseX, mouseY]
  );

  // =========================================================================
  // THE SIGNAL CHOREOGRAPHY TIMELINE:
  //
  // 1. DORMANT SPACE (idle):
  //    Still, quiet cosmic expanse using the new signal-space-bg.
  // 2. CLICK -> SILENCE (0 - 650ms):
  //    UI fades away. Motion halts. Anticipation builds.
  // 3. FIRST SIGNAL (650 - 1850ms):
  //    At (28%, 26%), tiny distant point pulses 3 times:
  //    deep blue -> electric blue -> luminous cyan.
  // 4. SIGNAL TRAVEL & WAVEFRONTS (1850 - 2750ms):
  //    Concentric optical light wavefronts propagate outward.
  //    Luminous transmission point glides across the cosmos with a particle trail.
  // 5. STAR RESPONSE & NETWORK (2750 - 4100ms):
  //    Stars awaken in sequence (cause and effect) as signal passes.
  //    Faint constellation filaments connect responding nodes.
  // 6. CONVERGENCE (4100 - 4750ms):
  //    Signal and cosmic energy converge toward center (50%, 50%).
  //    Network lines fade; background collapses toward darkness.
  // 7. ATMOSPHERIC BLOOM & VOID (4750 - 5200ms):
  //    Soft optical bloom contracts into deep blue-black (#030305).
  // 8. ARCHIVE EMERGES (5200ms):
  //    Existing Archive reveals cleanly. Music starts.
  // =========================================================================
  const handleTrigger = useCallback(() => {
    if (phase !== 'idle') return;

    mouseX.set(0);
    mouseY.set(0);

    // Prime the audio system synchronously within user click gesture
    if (onTrigger) {
      onTrigger();
    }

    // Step 1: Click -> Silence (0 - 650ms)
    setPhase('silence');

    // Step 2: First Signal Pulses (650ms - 1850ms)
    setTimeout(() => {
      setPhase('pulse');

      // Step 3: Signal Travels through Space & Wavefront (1850ms - 2750ms)
      setTimeout(() => {
        setPhase('travel');

        // Step 4: Star Chain Reaction & Hidden Cosmic Network (2750ms - 4100ms)
        setTimeout(() => {
          setPhase('response');

          // Step 5: Convergence to Center (4100ms - 4750ms)
          setTimeout(() => {
            setPhase('converge');

            // Step 6: Soft Atmospheric Bloom & Void (4750ms - 5200ms)
            setTimeout(() => {
              setPhase('bloom');

              // Step 7: Reveal the Archive (5200ms)
              setTimeout(() => {
                setPhase('revealed');
                onEnter();
              }, 450);
            }, 650);
          }, 1350);
        }, 900);
      }, 1200);
    }, 650);
  }, [phase, onTrigger, onEnter, mouseX, mouseY]);

  // Keyboard accessibility (Enter / Space)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleTrigger();
    }
  };

  // State derivations
  const isSignalActive =
    phase === 'pulse' ||
    phase === 'travel' ||
    phase === 'response' ||
    phase === 'converge';

  const isWavesActive =
    phase === 'travel' ||
    phase === 'response';

  const isNetworkActive =
    phase === 'response' ||
    phase === 'converge';

  const isDarkVoid = phase === 'bloom' || phase === 'revealed';

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
      }}
      className="fixed inset-0 z-[100] overflow-hidden bg-[#03040a] text-[#f4f1ea] select-none flex flex-col justify-between items-center will-change-transform"
      style={{
        pointerEvents: phase === 'revealed' ? 'none' : 'auto',
      }}
    >
      {/* =========================================================================
          BACKGROUND LAYER: NEW CINEMATIC DEEP-SPACE ENVIRONMENT
          Uses public/archive/opening/signal-space-bg.webp as primary background.
          No artificial large nebulas overlaid on top.
          Atmosphere reacts subtly: wakes up slightly with the signal, collapses at convergence.
         ========================================================================= */}
      <motion.div
        animate={{
          scale: phase === 'idle' ? 1 : isDarkVoid ? 1.04 : 1.015,
          opacity:
            phase === 'idle'
              ? 0.95
              : phase === 'silence'
              ? 0.9
              : phase === 'pulse'
              ? 0.95
              : phase === 'travel' || phase === 'response'
              ? 1.05
              : phase === 'converge'
              ? 0.45
              : 0.15,
        }}
        transition={{
          duration: isDarkVoid ? 0.6 : 1.2,
          ease: 'easeInOut',
        }}
        className="absolute inset-0 pointer-events-none z-0"
      >
        <Image
          src="/archive/opening/signal-space-bg.webp"
          alt="Cinematic Deep Space Signal Environment"
          fill
          priority
          unoptimized
          quality={100}
          className="object-cover object-[38%_center] sm:object-center"
          sizes="100vw"
        />

        {/* Dynamic Atmospheric Awakening Sheen (Brightens during signal transmission without causing mobile GPU texture downsampling) */}
        <motion.div
          animate={{
            opacity:
              phase === 'travel' || phase === 'response'
                ? 0.18
                : phase === 'converge'
                ? 0
                : 0.04,
          }}
          transition={{ duration: 1.0, ease: 'easeInOut' }}
          className="absolute inset-0 bg-cyan-400/20 mix-blend-screen pointer-events-none"
        />

        {/* Soft edge vignette: seamlessly transitions into #030305 & cleanly hides bottom watermark */}
        <div className="absolute inset-0 bg-radial-[circle_at_50%_48%,transparent_35%,rgba(3,4,10,0.6)_70%,#030305_96%]" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#030305] via-[#030305]/80 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#030305] via-[#030305]/80 to-transparent" />
      </motion.div>

      {/* =========================================================================
          NATURAL AMBIENT STARS & GENTLE TWINKLE (DORMANT STATE)
          Subtle parallax during idle, becomes completely still during silence.
         ========================================================================= */}
      <motion.div
        style={{
          x: phase === 'idle' ? smoothMouseX : 0,
          y: phase === 'idle' ? smoothMouseY : 0,
        }}
        animate={{
          opacity: isDarkVoid ? 0.15 : phase === 'silence' ? 0.75 : 0.85,
        }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 pointer-events-none z-[2] will-change-transform"
      >
        {AMBIENT_STARS.map((star, idx) => (
          <div
            key={idx}
            className="absolute rounded-full bg-cyan-100/80 shadow-[0_0_6px_rgba(56,189,248,0.7)]"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: phase === 'idle' ? 0.7 : 0.4,
              transition: 'opacity 1s ease',
            }}
          />
        ))}
      </motion.div>

      {/* =========================================================================
          THE SIGNAL VISUAL SEQUENCE:
          1. DISTANT BEACON (Origin: 28% left, 26% top)
          2. THREE MEASURED PULSES: Deep Blue -> Electric Blue -> Luminous Cyan
          3. SIGNAL TRAVELLING THROUGH SPACE with Luminous Trajectory & Trail
          4. SPHERICAL LIGHT WAVEFRONTS
          5. SEQUENTIAL STAR RESPONDERS (Cause and Effect)
          6. HIDDEN COSMIC NETWORK (Constellation Filaments)
          7. CONVERGENCE TO CENTER & ATMOSPHERIC BLOOM
         ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none z-[15] overflow-hidden">
        {/* =====================================================================
            1. THE FIRST SIGNAL: DISTANT POINT OF LIGHT (Origin: 28% left, 26% top)
            Pulses 3 times with clear emotional progression:
            weak (deep blue) -> stronger (electric blue) -> strongest (luminous cyan)
           ===================================================================== */}
        {isSignalActive && (
          <div
            style={{ top: '26%', left: '28%' }}
            className="absolute -translate-x-1/2 -translate-y-1/2 will-change-transform z-[18]"
          >
            {/* Core Starlight Spark */}
            <motion.div
              animate={{
                scale:
                  phase === 'pulse'
                    ? [1, 2.2, 1, 3.0, 1.2, 4.2, 1.5]
                    : phase === 'converge'
                    ? [1.2, 0]
                    : 1.3,
                opacity:
                  phase === 'pulse'
                    ? [0.2, 0.75, 0.3, 0.9, 0.45, 1, 0.85]
                    : phase === 'converge'
                    ? [0.85, 0]
                    : 0.85,
                backgroundColor:
                  phase === 'pulse'
                    ? ['#1e40af', '#3b82f6', '#0284c7', '#0ea5e9', '#06b6d4', '#22d3ee', '#ffffff']
                    : '#ffffff',
                boxShadow:
                  phase === 'pulse'
                    ? [
                        '0 0 10px rgba(30,64,175,0.8)',
                        '0 0 20px rgba(59,130,246,0.9)',
                        '0 0 15px rgba(2,132,199,0.85)',
                        '0 0 25px rgba(14,165,233,1)',
                        '0 0 20px rgba(6,182,212,0.9)',
                        '0 0 35px rgba(34,211,238,1), 0 0 50px rgba(255,255,255,0.9)',
                        '0 0 24px rgba(34,211,238,0.9)',
                      ]
                    : '0 0 20px rgba(34,211,238,0.85)',
              }}
              transition={{
                duration: phase === 'pulse' ? 1.2 : 0.8,
                ease: 'easeInOut',
              }}
              className="w-2.5 h-2.5 rounded-full"
            />

            {/* Delicate Starlight Diffraction Cross Spikes on Pulse 3 */}
            <motion.div
              animate={{
                opacity: phase === 'pulse' ? [0, 0.4, 0.1, 0.7, 0.2, 0.95, 0.4] : 0.2,
                scale: phase === 'pulse' ? [0.5, 1.2, 0.7, 1.8, 0.9, 2.4, 1.1] : 1.0,
              }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-cyan-200 to-transparent" />
              <div className="h-12 w-[1px] bg-gradient-to-b from-transparent via-cyan-200 to-transparent absolute" />
            </motion.div>
          </div>
        )}

        {/* =====================================================================
            2. SPHERICAL LIGHT WAVEFRONTS
            Concentric optical transmission ripples propagate outward across space.
           ===================================================================== */}
        {isWavesActive && (
          <div
            style={{ top: '26%', left: '28%' }}
            className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none will-change-transform"
          >
            {/* Wave 1: Deep Electric Blue Front */}
            <motion.div
              initial={{ scale: 0.1, opacity: 0 }}
              animate={{
                scale: [0.1, 14],
                opacity: [0, 0.75, 0.35, 0],
              }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-20 h-20 rounded-full border border-sky-500/50 shadow-[0_0_24px_rgba(14,165,233,0.35)]"
            />

            {/* Wave 2: Subtle Luminous Cyan Front (Delayed) */}
            <motion.div
              initial={{ scale: 0.1, opacity: 0 }}
              animate={{
                scale: [0.1, 17],
                opacity: [0, 0.65, 0.28, 0],
              }}
              transition={{ duration: 2.0, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
              className="absolute inset-0 w-20 h-20 rounded-full border border-cyan-400/40 shadow-[0_0_24px_rgba(34,211,238,0.3)]"
            />

            {/* Wave 3: Radiant Starlight Cyan Front (Delayed) */}
            <motion.div
              initial={{ scale: 0.1, opacity: 0 }}
              animate={{
                scale: [0.1, 20],
                opacity: [0, 0.5, 0.18, 0],
              }}
              transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
              className="absolute inset-0 w-20 h-20 rounded-full border border-cyan-200/30"
            />
          </div>
        )}

        {/* =====================================================================
            3. SIGNAL TRAVELLING THROUGH SPACE: LUMINOUS MOVING TRANSMISSION
            A small optical starlight spark glides through space along a cosmic trajectory,
            leaving a faint particle trail and light wake behind it.
           ===================================================================== */}
        {(phase === 'travel' || phase === 'response') && (
          <motion.div
            initial={{ left: '28%', top: '26%', opacity: 0 }}
            animate={{
              left: ['28%', '40%', '55%', '68%', '74%', '58%', '50%'],
              top: ['26%', '33%', '23%', '38%', '54%', '64%', '50%'],
              opacity: [0, 1, 1, 1, 1, 1, 0.9],
            }}
            transition={{
              duration: 2.2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 will-change-transform z-[22] pointer-events-none"
          >
            {/* Travelling Signal Core */}
            <div className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_16px_rgba(255,255,255,1),0_0_32px_rgba(34,211,238,0.95)] relative">
              {/* Luminous corona trailing the head */}
              <div className="absolute -inset-1 rounded-full bg-cyan-400/40 blur-[2px] animate-pulse" />
            </div>

            {/* Faint Micro-Particle Wake Trail */}
            <motion.div
              animate={{
                scale: [1, 2.2, 0.5],
                opacity: [0.8, 0.2, 0],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                ease: 'easeOut',
              }}
              className="absolute -inset-1.5 rounded-full border border-cyan-300/60"
            />
          </motion.div>
        )}

        {/* =====================================================================
            4. HIDDEN COSMIC NETWORK (SVG CONSTELLATION FILAMENTS)
            Extremely thin, delicate, slightly luminous vector lines trace between
            nodes as the Signal awakens them.
           ===================================================================== */}
        {isNetworkActive && (
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full pointer-events-none z-[16]"
          >
            <defs>
              <linearGradient
                id="starlightFilamentGrad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#0284c7" stopOpacity="0.45" />
                <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.45" />
              </linearGradient>
            </defs>

            {NETWORK_CONNECTIONS.map(([iA, iB], idx) => {
              const nodeA = RESPONDING_STARS[iA];
              const nodeB = RESPONDING_STARS[iB];

              return (
                <motion.line
                  key={`network-line-${idx}`}
                  x1={nodeA.left}
                  y1={nodeA.top}
                  x2={nodeB.left}
                  y2={nodeB.top}
                  stroke="url(#starlightFilamentGrad)"
                  strokeWidth="0.12"
                  strokeDasharray={idx % 2 === 0 ? '0.6 0.4' : undefined}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: 1,
                    opacity: phase === 'converge' ? [0.55, 0.12] : 0.55,
                  }}
                  transition={{
                    pathLength: {
                      duration: 0.85,
                      ease: 'easeOut',
                      delay: nodeA.delay + 0.1,
                    },
                    opacity: { duration: 0.65 },
                  }}
                />
              );
            })}
          </svg>
        )}

        {/* =====================================================================
            5. SEQUENTIAL STAR RESPONDERS (CAUSE AND EFFECT)
            As the Signal traverses space, stars awaken sequentially:
            brightness increases, subtle halo emits, then settles into active resonance.
           ===================================================================== */}
        {RESPONDING_STARS.map((star) => {
          const isTriggered =
            phase === 'travel' ||
            phase === 'response' ||
            phase === 'converge';

          return (
            <div
              key={star.id}
              style={{
                top: `${star.top}%`,
                left: `${star.left}%`,
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none will-change-transform z-[18]"
            >
              <motion.div
                animate={{
                  scale: isTriggered
                    ? phase === 'converge'
                    ? [1.2, 0.75]
                    : [1, 2.4, 1.25]
                    : 1,
                  opacity: isTriggered
                    ? phase === 'converge'
                    ? [0.85, 0.2]
                    : [0.5, 1, 0.85]
                    : 0.45,
                }}
                transition={{
                  scale: {
                    duration: 0.8,
                    ease: 'easeOut',
                    delay: star.delay,
                  },
                  opacity: {
                    duration: 0.75,
                    delay: star.delay,
                  },
                }}
                className="rounded-full bg-cyan-100 shadow-[0_0_12px_rgba(34,211,238,0.95),0_0_22px_rgba(14,165,233,0.7)] relative flex items-center justify-center"
                style={{
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                }}
              >
                {/* Luminous Awakening Halo */}
                {isTriggered && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{
                      opacity: [0, 0.85, 0],
                      scale: [0.6, 2.5, 1.3],
                    }}
                    transition={{
                      duration: 0.85,
                      ease: 'easeOut',
                      delay: star.delay,
                    }}
                    className="absolute -inset-1.5 rounded-full border border-cyan-300/50 pointer-events-none"
                  />
                )}
              </motion.div>
            </div>
          );
        })}

        {/* =====================================================================
            6. CONVERGENCE TOWARD THE CENTER (50%, 50%)
            The awakened cosmic energy and the Signal glide into the center.
            Controlled, intelligent, starlight blue/cyan approaching brilliant white.
           ===================================================================== */}
        {phase === 'converge' && (
          <motion.div
            initial={{
              top: '58%',
              left: '52%',
              scale: 1,
              opacity: 0.7,
            }}
            animate={{
              top: '50%',
              left: '50%',
              scale: [1, 2.0, 1.5],
              opacity: [0.7, 1, 0.95],
            }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none will-change-transform z-20"
          >
            <div className="w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_24px_rgba(255,255,255,1),0_0_45px_rgba(34,211,238,0.95),0_0_70px_rgba(14,165,233,0.8)]" />
          </motion.div>
        )}

        {/* =====================================================================
            7. SOFT ATMOSPHERIC BLOOM (NO WHITE FLASH, NO CAMERA FLASH)
            A gentle celestial bloom expands softly, then contracts into the deep void.
           ===================================================================== */}
        {phase === 'bloom' && (
          <motion.div
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{
              scale: [0.3, 2.2, 0.1],
              opacity: [0, 0.85, 0],
            }}
            transition={{ duration: 0.55, ease: 'easeInOut' }}
            style={{ top: '50%', left: '50%' }}
            className="absolute -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-radial-[circle_at_center,rgba(56,189,248,0.45)_0%,rgba(14,165,233,0.25)_35%,rgba(3,10,25,0.6)_60%,transparent_80%] pointer-events-none"
          />
        )}
      </div>

      {/* =========================================================================
          TOP ARCHIVAL HUD HEADER
          Scientific expedition / Deep-space observation metadata.
          Fades smoothly away upon interaction.
         ========================================================================= */}
      <motion.header
        animate={{
          opacity: phase === 'idle' ? 1 : 0,
          y: phase === 'idle' ? 0 : -14,
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="relative z-20 w-full max-w-7xl mx-auto px-6 pt-8 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-cyan-200/80 border-b border-white/5 pb-4 pointer-events-none"
      >
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="tracking-widest">SECTOR 00 // DEEP SPACE OBSERVATION</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-slate-300 tracking-wider">
          <span>COSMIC RECEPTOR</span>
          <span>·</span>
          <span>STELLAR TRANSMISSION</span>
        </div>
        <div className="text-cyan-300 font-bold tracking-wider">
          [ STANDBY · LISTENING ]
        </div>
      </motion.header>

      {/* =========================================================================
          CENTER / BOTTOM INTERACTION PROMPT: "ENTER THE ARCHIVE"
          Minimal, restrained, elegant.
         ========================================================================= */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-end w-full px-4 pb-12 sm:pb-16">
        <motion.div
          animate={{
            opacity: phase === 'idle' ? 1 : 0,
            y: phase === 'idle' ? 0 : 14,
          }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="flex flex-col items-center gap-3"
        >
          <button
            type="button"
            onClick={handleTrigger}
            onKeyDown={handleKeyDown}
            className="group relative px-7 sm:px-8 py-2.5 rounded-full bg-[#030614]/80 hover:bg-[#071028]/90 border border-cyan-400/35 hover:border-cyan-400/80 text-cyan-100 hover:text-white font-mono text-[11px] sm:text-xs tracking-[0.3em] uppercase transition-all duration-300 backdrop-blur-md cursor-pointer flex items-center gap-3 shadow-[0_6px_25px_rgba(0,0,0,0.85)] hover:shadow-[0_0_30px_rgba(34,211,238,0.25)]"
            aria-label="Enter the Archive"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 group-hover:bg-cyan-200 transition-colors animate-pulse" />
            <span>ENTER THE ARCHIVE</span>
            <span className="text-cyan-400/80 group-hover:translate-y-0.5 transition-transform">↓</span>
          </button>

          <span className="text-[8px] sm:text-[9px] font-mono tracking-widest text-slate-400 uppercase">
            TRANSMISSION STANDBY · AWAITING INPUT
          </span>
        </motion.div>
      </div>

      {/* =========================================================================
          BOTTOM ARCHIVAL FOOTER METADATA
         ========================================================================= */}
      <motion.footer
        animate={{
          opacity: phase === 'idle' ? 1 : 0,
          y: phase === 'idle' ? 0 : 14,
        }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        className="relative z-20 w-full max-w-7xl mx-auto px-6 pb-8 flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-slate-400 border-t border-white/5 pt-4 pointer-events-none"
      >
        <div className="flex items-center gap-2">
          <span>CURATOR: OM DESHMUKH</span>
          <span>·</span>
          <span>SYSTEMS & VISUAL ARCHIVE</span>
        </div>
        <div className="flex items-center gap-2 text-cyan-300/70">
          <span>COSMIC FIELD SURVEY</span>
          <span>·</span>
          <span>THE ARCHIVE</span>
        </div>
      </motion.footer>

      {/* =========================================================================
          DEEP SPACE VELVET BLUE-BLACK VOID OVERLAY (#030305)
          Holds the screen in darkness immediately prior to Archive reveal.
         ========================================================================= */}
      <motion.div
        animate={{
          opacity: isDarkVoid ? 1 : 0,
        }}
        transition={{ duration: 0.45, ease: 'easeInOut' }}
        className="absolute inset-0 pointer-events-none z-[25] bg-[#030305]"
      >
        <div className="absolute inset-0 bg-radial-[circle_at_50%_50%,rgba(10,20,38,0.35)_0%,rgba(3,4,8,0.85)_50%,#030305_85%]" />
      </motion.div>
    </motion.div>
  );
}
