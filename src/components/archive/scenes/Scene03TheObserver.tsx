'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import { ARCHIVE_DATA } from '@/data/portfolioData';
import { Camera, Aperture, GraduationCap, Quote, RefreshCw, Eye } from 'lucide-react';

type FocusState = 'soft' | 'focusing' | 'locked';

export default function Scene03TheObserver() {
  const { about, curator } = ARCHIVE_DATA;
  const sectionRef = useRef<HTMLElement>(null);
  const [focusState, setFocusState] = useState<FocusState>('locked');
  const [activeFrameIndex, setActiveFrameIndex] = useState(0);
  const isManualRef = useRef(false);

  // Scroll progress for Telescope mechanical entry, optical alignment, and exit
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 65,
    damping: 24,
    restDelta: 0.001,
  });

  // Automatically drive focus sequence with scroll progress unless user manually toggles
  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    if (latest < 0.15 || latest > 0.90) {
      isManualRef.current = false;
    }
    if (isManualRef.current) return;
    if (latest < 0.36) {
      if (focusState !== 'soft') setFocusState('soft');
    } else if (latest < 0.46) {
      if (focusState !== 'focusing') setFocusState('focusing');
    } else {
      if (focusState !== 'locked') setFocusState('locked');
    }
  });

  // TELESCOPE MULTI-PHASE CHOREOGRAPHY:
  // Phase 1 (0.18–0.36): Enter from right with upward inclination (16deg)
  // Phase 2 (0.36–0.40): Brief mechanical settle
  // Phase 3 (0.40–0.46): AIM barrel downward toward photograph (16deg -> -8deg)
  // Phase 4 (0.46–0.68): OPTICAL LOCK & HERO HOLD (Sightline active, photo locked sharp)
  // Phase 5 (0.68–0.88): Retract toward edge and exit
  const telescopeX = useTransform(
    smoothProgress,
    [0.18, 0.36, 0.40, 0.46, 0.68, 0.88],
    ['180px', '15px', '0px', '0px', '0px', '190px']
  );
  const telescopeY = useTransform(
    smoothProgress,
    [0.18, 0.36, 0.40, 0.46, 0.68, 0.88],
    ['20px', '4px', '0px', '0px', '0px', '16px']
  );
  const telescopeRotate = useTransform(
    smoothProgress,
    [0.18, 0.36, 0.40, 0.46, 0.68, 0.88],
    ['16deg', '16deg', '16deg', '-8deg', '-8deg', '4deg']
  );
  const telescopeScale = useTransform(
    smoothProgress,
    [0.18, 0.36, 0.46, 0.68, 0.88],
    [0.92, 1.0, 1.0, 1.0, 0.9]
  );
  const telescopeOpacity = useTransform(
    smoothProgress,
    [0.15, 0.30, 0.68, 0.88],
    [0, 0.9, 0.9, 0]
  );

  // Optical sightline lock-on during Hero Hold (0.46–0.68)
  const sightlineOpacity = useTransform(
    smoothProgress,
    [0.42, 0.47, 0.68, 0.74],
    [0, 1, 1, 0]
  );

  // Camera calibration nudge toward photograph
  const cameraY = useTransform(
    smoothProgress,
    [0.22, 0.36, 0.46, 0.68],
    ['-8px', '-2px', '0px', '0px']
  );
  const cameraScale = useTransform(
    smoothProgress,
    [0.22, 0.36, 0.46, 0.68],
    [0.94, 1.02, 1.0, 1.0]
  );

  // Photographer's Contact Sheet Frames
  const contactFrames = [
    {
      id: 'frame-001',
      frameNumber: 'FRAME 001',
      title: 'The Observer // Portrait of the Engineer',
      src: about.portraits[0].src,
      lens: '85mm',
      aperture: 'f/1.4',
      shutter: '1/250s',
      iso: 'ISO 400',
      stock: 'KODAK TRI-X 400',
    },
    {
      id: 'frame-002',
      frameNumber: 'FRAME 002',
      title: 'Atmospheric Perspective // Architectural Study',
      src: about.portraits[1].src,
      lens: '50mm',
      aperture: 'f/2.0',
      shutter: '1/500s',
      iso: 'ISO 200',
      stock: 'ILFORD HP5 PLUS',
    },
    {
      id: 'frame-003',
      frameNumber: 'FRAME 003',
      title: 'Cloud Topology // AWS Multi-Tier Blueprint',
      src: '/archive/aws.png',
      lens: '35mm',
      aperture: 'f/4.0',
      shutter: '1/1000s',
      iso: 'ISO 100',
      stock: 'TECHNICAL DIRECT',
    },
    {
      id: 'frame-004',
      frameNumber: 'FRAME 004',
      title: 'Cluster Topology // Containerized Microservices',
      src: '/archive/chatty.png',
      lens: '28mm',
      aperture: 'f/5.6',
      shutter: '1/2000s',
      iso: 'ISO 100',
      stock: 'TECHNICAL DIRECT',
    },
  ];

  const currentFrame = contactFrames[activeFrameIndex];

  const cycleFocus = () => {
    isManualRef.current = true;
    if (focusState === 'soft') {
      setFocusState('focusing');
      setTimeout(() => setFocusState('locked'), 450);
    } else if (focusState === 'focusing') {
      setFocusState('locked');
    } else {
      setFocusState('soft');
    }
  };

  return (
    <section
      ref={sectionRef}
      id="scene-observer"
      className="relative w-full min-h-screen flex flex-col justify-center items-center px-4 sm:px-8 py-24 overflow-hidden border-t border-white/5 bg-[#030306]"
    >
      {/* =========================================================================
          01 — TELESCOPE: OBSERVATIONAL INSTRUMENT (18–30vw SCALE)
          Enters tilted -> Settles -> Aims tube at photograph -> Locks Sightline -> Holds -> Exits
         ========================================================================= */}
      <motion.div
        style={{
          x: telescopeX,
          y: telescopeY,
          rotate: telescopeRotate,
          scale: telescopeScale,
          opacity: telescopeOpacity,
        }}
        className="absolute top-20 right-0 pointer-events-none z-[6] will-change-transform hidden xl:flex flex-col items-end pr-2"
      >
        {/* Subtle Optical Sightline pointing toward the photography frame */}
        <motion.div
          style={{ opacity: sightlineOpacity }}
          className="flex items-center gap-2 mb-1 pr-14"
        >
          <div className="w-28 xl:w-44 2xl:w-60 border-t border-dashed border-amber-400/50 relative">
            <span className="absolute -top-3.5 right-0 text-[8px] font-mono text-amber-300 tracking-widest uppercase">
              OPTICAL SIGHTLINE // AIM TARGET
            </span>
            <span className="w-2 h-2 rounded-full bg-amber-400 absolute -top-[4px] left-0 animate-ping" />
          </div>
          <div className="px-2 py-0.5 rounded bg-black/85 border border-amber-400/40 text-[7px] font-mono text-amber-300 uppercase whitespace-nowrap">
            FOCUS TARGET LOCKED
          </div>
        </motion.div>

        {/* Refracting Telescope Illustration (Target: 18–30vw) */}
        <div className="relative w-56 h-56 xl:w-72 xl:h-72 2xl:w-84 2xl:h-84 scale-x-[-1]">
          <Image
            src="/archive/illustration_telescope_clean.webp"
            alt="Refracting Telescope — Visual Observation Instrument"
            fill
            className="object-contain filter contrast-105 drop-shadow-[0_0_35px_rgba(255,255,255,0.08)]"
            sizes="(max-width: 1536px) 288px, 336px"
          />
        </div>

        <div className="mt-1 mr-4 px-3 py-1 rounded-full bg-[#080911]/85 border border-amber-400/20 text-[8px] font-mono tracking-widest text-amber-300/80 uppercase backdrop-blur-sm">
          EQUATORIAL REFRACTOR // SIGHTLINE COLLIMATION
        </div>
      </motion.div>

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center">
        {/* Scene Identification Header */}
        <div className="w-full flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-amber-400/80 mb-8 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Camera className="w-3.5 h-3.5 text-amber-400" />
            <span>SCENE 03 // THE OBSERVER · PHOTOGRAPHY + ENGINEERING</span>
          </div>
          <div className="text-slate-400">
            LENS: 85mm · f/1.4 · 1/250s · MEDIUM FORMAT 6×7
          </div>
        </div>

        {/* Narrative Title */}
        <div className="max-w-3xl text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono uppercase mb-4">
            <Aperture className="w-3.5 h-3.5 text-amber-400" />
            <span>Observation & Photographic Precision</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#f4f1ea] tracking-wide mb-4">
            The Lens of The Observer
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-serif">
            Observation connects photography and engineering. In photography, it is calibrating the focus ring
            to isolate form in shadows. In systems engineering, it is diagnosing distributed race conditions,
            packet latency, and container bottlenecks before they reach production.
          </p>
        </div>

        {/* =========================================================================
            06 — CAMERA & PHOTOGRAPH INTERACTION: CAMERA ↓ PHOTO
            Camera lens direction aligns toward photograph; photograph transitions SOFT -> FOCUSING -> LOCKED
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-start mb-16">
          {/* Left Column: Camera Rangefinder directly above Photograph Viewfinder */}
          <div className="lg:col-span-7 flex flex-col items-center">
            {/* Conceptual Camera Rangefinder (Visually connected directly above Photograph) */}
            <motion.div
              style={{
                y: cameraY,
                scale: cameraScale,
              }}
              className="flex items-center gap-3 mb-2 px-4 py-2.5 rounded-2xl bg-[#090a14] border border-amber-400/30 shadow-lg relative"
            >
              <div className="relative w-14 h-14 shrink-0">
                <Image
                  src="/archive/illustration_camera_clean.webp"
                  alt="Mechanical Rangefinder Instrument"
                  fill
                  className="object-contain filter contrast-105 opacity-90"
                  sizes="56px"
                />
              </div>
              <div className="text-left font-mono">
                <div className="text-[9px] text-amber-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      focusState === 'locked'
                        ? 'bg-emerald-400 animate-ping'
                        : focusState === 'focusing'
                        ? 'bg-cyan-400 animate-pulse'
                        : 'bg-amber-400'
                    }`}
                  />
                  <span>
                    {focusState === 'locked'
                      ? 'RANGEFINDER ALIGNED ↓ SIGHTLINE FOCUS LOCKED (1:1)'
                      : focusState === 'focusing'
                      ? 'RANGEFINDER: CALIBRATING HELICOID ↓ COLLIMATING'
                      : 'RANGEFINDER: APERTURE WIDE OPEN · SOFT APERTURE'}
                  </span>
                </div>
                <div className="text-[8px] text-slate-400 mt-0.5">
                  INSTRUMENT: 85MM MEDIUM FORMAT · COUPLED TO PHOTOGRAPHIC HERO
                </div>
              </div>
            </motion.div>

            {/* Photographic Viewfinder (The Hero Subject) */}
            <div className="w-full p-4 sm:p-6 rounded-3xl bg-[#080912] border border-amber-400/35 shadow-[0_25px_60px_rgba(0,0,0,0.95)] relative viewfinder-bracket">
              {/* Film Sprocket Edge Markings */}
              <div className="flex items-center justify-between text-[9px] font-mono text-amber-400/60 mb-3 px-2 border-b border-white/10 pb-2">
                <span>{currentFrame.stock}</span>
                <span className="font-bold text-amber-300">{currentFrame.frameNumber}</span>
                <span>{currentFrame.lens} · {currentFrame.aperture} · {currentFrame.shutter}</span>
              </div>

              {/* Viewfinder Window with Interactive Focus */}
              <div className="relative w-full h-[360px] sm:h-[430px] rounded-2xl overflow-hidden bg-black border border-white/10 flex items-center justify-center">
                <Image
                  src={currentFrame.src}
                  alt={currentFrame.title}
                  fill
                  priority
                  className={`object-cover transition-all duration-700 ease-out ${
                    focusState === 'soft'
                      ? 'blur-md contrast-75 brightness-75 scale-105'
                      : focusState === 'focusing'
                      ? 'blur-xs contrast-110 brightness-95 scale-[1.01]'
                      : 'blur-0 contrast-125 brightness-100 grayscale hover:grayscale-0'
                  }`}
                  sizes="(max-width: 768px) 100vw, 600px"
                />

                {/* Reticle Focus Indicator */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div
                    className={`w-14 h-14 rounded-full border transition-all duration-500 flex items-center justify-center ${
                      focusState === 'locked'
                        ? 'border-amber-400 scale-100 shadow-[0_0_20px_rgba(212,175,55,0.6)]'
                        : focusState === 'focusing'
                        ? 'border-cyan-400/80 scale-110 border-dashed animate-spin'
                        : 'border-red-400/50 scale-125 border-dotted'
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        focusState === 'locked'
                          ? 'bg-amber-400 animate-ping'
                          : focusState === 'focusing'
                          ? 'bg-cyan-400'
                          : 'bg-red-400/60'
                      }`}
                    />
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-0.5 bg-amber-400/40 pointer-events-none" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-0.5 bg-amber-400/40 pointer-events-none" />
                </div>

                {/* Status Badge */}
                <div className="absolute bottom-3 left-4 px-3 py-1.5 rounded-full bg-black/85 border border-white/20 text-[10px] font-mono flex items-center gap-2 backdrop-blur-md">
                  {focusState === 'locked' ? (
                    <>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span className="text-emerald-300 font-bold">FOCUS → LOCKED</span>
                      <span className="text-slate-400">· PIN-SHARP ACCURACY</span>
                    </>
                  ) : focusState === 'focusing' ? (
                    <>
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                      <span className="text-cyan-300 font-bold">FOCUSING...</span>
                      <span className="text-slate-400">· CALIBRATING HELICOID</span>
                    </>
                  ) : (
                    <>
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      <span className="text-amber-300 font-bold">IMAGE IS SOFT</span>
                      <span className="text-slate-400">· APERTURE WIDE OPEN</span>
                    </>
                  )}
                </div>

                <div className="absolute top-3 right-4 px-2.5 py-1 rounded bg-black/80 border border-white/10 text-[9px] font-mono text-amber-300">
                  {currentFrame.iso} · {currentFrame.lens}
                </div>
              </div>

              {/* Focus Interaction Trigger */}
              <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={cycleFocus}
                    className="px-4 py-2 rounded-full bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/40 text-amber-200 text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-2"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                    <span>
                      {focusState === 'locked'
                        ? 'Simulate Soft Aperture'
                        : focusState === 'soft'
                        ? 'Engage Focus Calibration'
                        : 'Lock In Pin Focus'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      isManualRef.current = true;
                      setFocusState('locked');
                    }}
                    className={`px-3 py-2 rounded-full text-xs transition-all border ${
                      focusState === 'locked'
                        ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Lock Sharp (1:1)
                  </button>
                </div>

                <div className="text-[10px] text-slate-400">
                  {currentFrame.title}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Personal Narrative, Education & Philosophy */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Dossier Card 01: Curator Note & Origin */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[#080911]/90 border border-white/10 backdrop-blur-xl">
              <span className="text-[10px] font-mono uppercase text-amber-400 tracking-widest block mb-2">
                CHRONICLE 01 // ORIGIN & BEDROCK
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#f4f1ea] mb-3">
                From Raw Code to Production Machinery
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-serif mb-3">
                {about.story}
              </p>
              <p className="text-xs text-slate-400 leading-relaxed font-serif">
                {about.curatorNote}
              </p>
            </div>

            {/* Philosophy Card */}
            <div className="p-5 sm:p-6 rounded-3xl bg-[#0c0d18]/90 border border-amber-500/30 backdrop-blur-xl relative">
              <Quote className="w-7 h-7 text-amber-400/20 absolute top-5 right-5 pointer-events-none" />
              <span className="text-[10px] font-mono uppercase text-amber-400 tracking-widest block mb-1.5">
                PHILOSOPHY // FIRST PRINCIPLES
              </span>
              <p className="text-sm font-serif italic text-amber-200 leading-relaxed mb-3">
                &ldquo;{about.philosophy}&rdquo;
              </p>
              <div className="text-[10px] font-mono text-slate-400 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>ROOT-CAUSE ANALYSIS · RESILIENCE · DETERMINISM</span>
              </div>
            </div>

            {/* Academic Foundation (MIT ADT University) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#080911]/90 border border-white/10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[9px] font-mono uppercase text-amber-400/80 block">
                    ACADEMIC FOUNDATION
                  </span>
                  <h4 className="text-sm font-serif font-bold text-[#f4f1ea]">
                    {about.education.institution}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 font-sans">
                    {about.education.degree} · {about.education.status}
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-white/5 text-[9px] font-mono text-amber-300 border border-white/10">
                B.TECH
              </span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            ARCHIVE CONTACT SHEET: PHOTOGRAPHER'S WORKING PROOFS
            FRAME 001 · FRAME 002 · FRAME 003 · FRAME 004
           ========================================================================= */}
        <div className="w-full flex flex-col items-center">
          <div className="w-full flex items-center justify-between text-xs font-mono text-amber-400/80 border-b border-white/10 pb-3 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>DARKROOM PROOF SHEET // BATCH 2024-2025</span>
            </div>
            <div className="text-slate-400">
              SELECT PROOF FRAME TO INSPECT IN VIEWFINDER
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
            {contactFrames.map((frame, index) => {
              const isSelected = activeFrameIndex === index;
              return (
                <button
                  key={frame.id}
                  type="button"
                  onClick={() => {
                    setActiveFrameIndex(index);
                    setFocusState('locked');
                  }}
                  className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-amber-400/15 border-amber-400 shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                      : 'bg-[#070810] border-white/10 hover:border-amber-400/40 hover:bg-[#0a0c16]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[8px] font-mono text-amber-400/70 mb-2">
                    <span className="font-bold">{frame.frameNumber}</span>
                    <span>{frame.lens}</span>
                  </div>

                  <div className="relative w-full h-28 rounded-lg overflow-hidden bg-black/60 mb-2 border border-white/5">
                    <Image
                      src={frame.src}
                      alt={frame.title}
                      fill
                      className="object-cover filter contrast-110"
                      sizes="(max-width: 768px) 50vw, 200px"
                    />
                    {isSelected && (
                      <div className="absolute inset-0 border-2 border-amber-400 pointer-events-none" />
                    )}
                  </div>

                  <span className="font-serif font-bold text-xs text-[#f4f1ea] line-clamp-1">
                    {frame.title.split('//')[0]}
                  </span>
                  <span className="text-[9px] font-mono text-slate-400 mt-1">
                    {frame.aperture} · {frame.shutter}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
