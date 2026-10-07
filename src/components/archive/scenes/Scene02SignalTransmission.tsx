'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ARCHIVE_DATA } from '@/data/portfolioData';
import { Radio, Wifi, Activity, Terminal, Waves, Globe, Cpu, ArrowDown } from 'lucide-react';

export default function Scene02SignalTransmission() {
  const { pillars, curator } = ARCHIVE_DATA;

  const engineeringStack = [
    { name: 'AWS', role: 'Cloud Substrate', color: 'text-amber-400' },
    { name: 'Terraform', role: 'Declarative IaC', color: 'text-purple-400' },
    { name: 'Kubernetes', role: 'Cluster Orchestration', color: 'text-cyan-400' },
    { name: 'CI/CD', role: 'Automated Deployment', color: 'text-emerald-400' },
  ];

  return (
    <section
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

        {/* =========================================================================
            03 — SATELLITE: DISTANT ORBITAL METAPHOR
            SATELLITE ··· TRANSMISSION ··· ENGINEERING STACK
           ========================================================================= */}
        <div className="w-full flex flex-col items-center mb-10">
          {/* Distant Archival Satellite Plate */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center"
          >
            <div className="relative p-3 rounded-2xl bg-[#07080f]/90 border border-cyan-500/25 shadow-xl backdrop-blur-md group">
              <div className="flex items-center justify-between text-[8px] font-mono text-cyan-400/80 border-b border-white/10 pb-1 mb-1 gap-6">
                <span>FIG. 02 // ORBITAL RELAY</span>
                <span>TELEMETRY BEACON</span>
              </div>

              {/* Small, Distant Satellite Illustration (No continuous spinning) */}
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
                <Image
                  src="/archive/illustration_satellite_clean.webp"
                  alt="Archival Satellite Relay Illustration — Signal Telemetry Metaphor"
                  width={128}
                  height={128}
                  className="object-contain filter contrast-110 opacity-85 group-hover:opacity-100 transition-opacity"
                />
              </div>

              <div className="text-[8px] font-mono text-slate-400 text-center pt-1 border-t border-white/5">
                ALTITUDE: 35,786 KM · GEO-SYNC
              </div>
            </div>

            {/* Dotted Signal Stream */}
            <div className="flex flex-col items-center my-3 text-cyan-400/60 font-mono text-xs tracking-widest">
              <span className="w-1 h-1 rounded-full bg-cyan-400 mb-1 animate-ping" />
              <span>·</span>
              <span>·</span>
              <span>·</span>
              <span className="text-[10px] text-cyan-300 font-bold uppercase tracking-widest mt-1">
                TRANSMISSION
              </span>
              <span>·</span>
              <span>·</span>
            </div>
          </motion.div>

          {/* Connected Engineering Stack Pipeline */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-3xl flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-3 rounded-2xl bg-[#070810]/80 border border-cyan-400/20 backdrop-blur-md font-mono text-xs"
          >
            <span className="text-[10px] text-slate-400 uppercase tracking-wider mr-1">
              ENGINEERING STACK:
            </span>
            {engineeringStack.map((item, idx) => (
              <React.Fragment key={item.name}>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10">
                  <span className={`font-bold ${item.color}`}>{item.name}</span>
                  <span className="text-[9px] text-slate-500">({item.role})</span>
                </div>
                {idx < engineeringStack.length - 1 && (
                  <span className="text-cyan-400/70 font-bold">→</span>
                )}
              </React.Fragment>
            ))}
          </motion.div>
        </div>

        {/* Narrative Title */}
        <div className="max-w-3xl text-center mb-14">
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

