'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ARCHIVE_DATA } from '@/data/portfolioData';
import { Radio, Activity, Waves } from 'lucide-react';

export default function Scene02SignalTransmission() {
  const { pillars } = ARCHIVE_DATA;
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll progress for tiny background satellite orbital crossing
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 25,
    restDelta: 0.001,
  });

  // ORBITAL CURVED CHOREOGRAPHY:
  // Phase 1 (0.15–0.35): Distant appearance & high-altitude arc entry from upper-right
  // Phase 2 (0.35–0.45): Curves into telemetry transmission coordinates
  // Phase 3 & 4 & 5 (0.45–0.62): HERO HOLD, TRANSMISSION DOWNLINK & PIPELINE RESPONSE
  // Phase 6 (0.62–0.88): Shallow orbital exit curve toward lower-left
  const satelliteX = useTransform(
    smoothProgress,
    [0.15, 0.35, 0.45, 0.62, 0.88],
    ['85vw', '62vw', '50vw', '48vw', '-16vw']
  );
  const satelliteY = useTransform(
    smoothProgress,
    [0.15, 0.35, 0.45, 0.62, 0.88],
    ['8vh', '15vh', '18vh', '18vh', '28vh']
  );
  const satelliteRotate = useTransform(
    smoothProgress,
    [0.15, 0.35, 0.45, 0.62, 0.88],
    ['-14deg', '-4deg', '6deg', '6deg', '22deg']
  );
  const satelliteScale = useTransform(
    smoothProgress,
    [0.15, 0.35, 0.45, 0.62, 0.88],
    [0.85, 0.98, 1.0, 1.0, 0.88]
  );
  const satelliteOpacity = useTransform(
    smoothProgress,
    [0.12, 0.25, 0.62, 0.80, 0.88],
    [0, 0.85, 0.85, 0.35, 0]
  );

  // Transmission line & data pulse toward deployment pipeline (Hero Hold: 0.45–0.62)
  const transmissionOpacity = useTransform(
    smoothProgress,
    [0.44, 0.48, 0.60, 0.64],
    [0, 1, 1, 0]
  );
  const dataPulseY = useTransform(
    smoothProgress,
    [0.48, 0.58],
    ['0%', '100%']
  );

  // Subtle pipeline response glow during transmission
  const pipelineBorderColor = useTransform(
    smoothProgress,
    [0.48, 0.54, 0.60, 0.64],
    [
      'rgba(34, 211, 238, 0.2)',
      'rgba(34, 211, 238, 0.55)',
      'rgba(34, 211, 238, 0.55)',
      'rgba(34, 211, 238, 0.2)',
    ]
  );

  const engineeringStack = [
    { name: 'AWS', role: 'Cloud Substrate', color: 'text-amber-400' },
    { name: 'Terraform', role: 'Declarative IaC', color: 'text-purple-400' },
    { name: 'Kubernetes', role: 'Cluster Orchestration', color: 'text-cyan-400' },
    { name: 'CI/CD', role: 'Continuous Delivery', color: 'text-emerald-400' },
  ];

  return (
    <section
      ref={sectionRef}
      id="scene-signal"
      className="relative w-full min-h-screen flex flex-col justify-center items-center px-4 sm:px-8 py-24 overflow-hidden border-t border-white/5"
    >
      {/* Background Radio Waves Graphic */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[#040407]" />
        {/* Subtle radial frequency ripples */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-cyan-500/10 animate-beacon" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full border border-indigo-500/5 animate-beacon" style={{ animationDelay: '1.2s' }} />
      </div>

      {/* =========================================================================
          03 — SATELLITE: ORBITAL TRANSMISSION RELAY (90–140px SCALE)
          Follows curved orbital trajectory -> HOLDS & TRANSMITS to pipeline -> EXITS
         ========================================================================= */}
      <motion.div
        style={{
          x: satelliteX,
          y: satelliteY,
          opacity: satelliteOpacity,
          scale: satelliteScale,
          rotate: satelliteRotate,
        }}
        className="absolute top-0 left-0 pointer-events-none z-[6] will-change-transform hidden md:flex flex-col items-center"
      >
        <div className="flex items-center gap-3">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32">
            <Image
              src="/archive/illustration_satellite_clean.webp"
              alt="Orbital Telemetry Relay — Data & Signal Transmission Metaphor"
              fill
              className="object-contain filter contrast-110 drop-shadow-[0_0_25px_rgba(34,211,238,0.2)]"
              sizes="(max-width: 768px) 96px, 128px"
            />
          </div>
          <div className="flex flex-col text-[8px] font-mono text-cyan-300 uppercase tracking-widest whitespace-nowrap bg-[#080911]/90 px-3 py-1.5 rounded-full border border-cyan-400/25 shadow-lg backdrop-blur-md">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              <span>ORBITAL TELEMETRY RELAY</span>
            </div>
            <span className="text-slate-400 text-[7px] mt-0.5">ALT: 35,786 KM · DOWNLINK ACTIVE</span>
          </div>
        </div>

        {/* Technical Transmission Ray connecting satellite down toward pipeline */}
        <motion.div
          style={{ opacity: transmissionOpacity }}
          className="flex flex-col items-center mt-1 pointer-events-none"
        >
          <div className="h-20 sm:h-28 w-px border-l border-dashed border-cyan-400/40 relative">
            {/* Traveling Data Pulse */}
            <motion.div
              style={{ top: dataPulseY }}
              className="absolute -left-[3.5px] w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.9)]"
            />
          </div>
          <div className="px-2.5 py-0.5 rounded bg-[#060812]/90 border border-cyan-400/30 text-[7px] font-mono text-cyan-300 whitespace-nowrap mt-1">
            DOWNLINK RAY // TELEMETRY PACKET DISPATCH ↓
          </div>
        </motion.div>
      </motion.div>

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center">
        {/* Scene Identification Header */}
        <div className="w-full flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-cyan-400/80 mb-8 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>SCENE 02 // FREQUENCY DISPATCH & RECEPTOR</span>
          </div>
          <div className="text-slate-400">
            LENS: 200mm · f/2.8 · 1/125s · RECEPTOR CALIBRATED
          </div>
        </div>

        {/* Narrative Title */}
        <div className="max-w-3xl text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/40 border border-cyan-400/30 text-cyan-300 text-xs font-mono uppercase mb-4">
            <Waves className="w-3.5 h-3.5 text-cyan-400" />
            <span>Telemetry & The 5 Pillars</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#f4f1ea] tracking-wide mb-4">
            Listening Across The Wire
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-serif">
            Before an engineer provisions clusters or writes a single line of automation, they observe.
            Space, photography, cinema, and music are not diversions — they are the perceptual foundation
            that teaches an architect how complex systems hold together.
          </p>
        </div>

        {/* Telemetry Ingest Badge (Responds to Satellite Transmission) */}
        <motion.div
          style={{ opacity: transmissionOpacity }}
          className="flex items-center gap-2 mb-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-400/35 text-[9px] font-mono text-cyan-300 shadow-md"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span>SATELLITE DOWNLINK SYNCHRONIZED · TELEMETRY INGEST ACTIVE</span>
        </motion.div>

        {/* The Engineering Deployment Pipeline */}
        <motion.div
          style={{ borderColor: pipelineBorderColor }}
          className="w-full max-w-3xl flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-3.5 rounded-2xl bg-[#070810]/90 border border-cyan-400/20 backdrop-blur-md font-mono text-xs mb-12 shadow-lg transition-colors"
        >
          <span className="text-[10px] text-slate-400 uppercase tracking-wider mr-1">
            DEPLOYMENT PIPELINE:
          </span>
          {engineeringStack.map((item, idx) => (
            <React.Fragment key={item.name}>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10 group">
                <span className={`font-bold ${item.color}`}>{item.name}</span>
                <span className="text-[9px] text-slate-400">({item.role})</span>
              </div>
              {idx < engineeringStack.length - 1 && (
                <span className="text-cyan-400/70 font-bold">→</span>
              )}
            </React.Fragment>
          ))}
        </motion.div>

        {/* The 5 Interlocking Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 w-full mb-12">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="p-5 rounded-2xl bg-[#080911]/90 border border-white/10 hover:border-amber-400/50 shadow-xl backdrop-blur-md flex flex-col justify-between transition-all group"
            >
              <div>
                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-lg text-amber-300 mb-4 group-hover:scale-110 group-hover:border-amber-400/60 transition-all">
                  {pillar.symbol}
                </div>
                <span className="text-[10px] font-mono uppercase text-amber-400/80 tracking-widest block mb-1">
                  {pillar.role}
                </span>
                <h3 className="text-lg font-serif font-bold text-[#f4f1ea] mb-2">
                  {pillar.name}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-white/5 text-[9px] font-mono text-slate-500 uppercase">
                NODE 0{i + 1} // SYNCED
              </div>
            </motion.div>
          ))}
        </div>

        {/* Radio Telemetry Diagnostics Bar */}
        <div className="w-full p-4 rounded-2xl bg-[#07080e]/95 border border-cyan-500/20 shadow-xl flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-300">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="text-cyan-300 font-bold">SIGNAL TELEMETRY:</span>
            <span className="text-slate-400">1.4204 GHz (Hydrogen Frequency)</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-400">PROTOCOLS: TCP / HTTP/2 / WebSockets / gRPC</span>
            <span className="text-white/20">|</span>
            <span className="text-amber-300">GROUND STATION: AKOLA, IN</span>
          </div>

          <div className="flex items-center gap-2 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>PACKET STREAM: 100% HEALTH</span>
          </div>
        </div>
      </div>
    </section>
  );
}


