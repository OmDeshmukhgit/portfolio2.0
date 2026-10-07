'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Layers, Eye, Cpu, ArrowRight, ShieldCheck, GitBranch, Network, Sparkles, Compass } from 'lucide-react';

interface SceneProps {
  onProceedToSystems: () => void;
}

export default function Scene04EngineerTransition({ onProceedToSystems }: SceneProps) {
  return (
    <section
      id="scene-engineer"
      className="relative w-full min-h-[95vh] flex flex-col justify-center items-center px-4 sm:px-8 py-24 overflow-hidden border-t border-white/5 bg-[#030306]"
    >
      {/* Background Subtle Astronomical Grain & Depth */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[#030306]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-indigo-950/15 blur-[140px]" />
        <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_40%,rgba(3,3,6,0.9)_100%]" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center text-center">
        {/* Telemetry Header */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono uppercase mb-6">
          <Eye className="w-3.5 h-3.5 text-amber-400" />
          <span>CINEMATIC TRANSITION // OBSERVATION ↓ EXPLORATION</span>
        </div>

        {/* Narrative Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-[#f4f1ea] max-w-4xl tracking-wide mb-6"
        >
          &ldquo;Observation captures what exists. Engineering constructs what endures.&rdquo;
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base sm:text-lg text-slate-300 max-w-2xl font-serif leading-relaxed mb-12"
        >
          Here, the archival journey ventures from ground observation into uncharted environments.
          The same eye that calibrates lighting across photographic film demands deterministic order in distributed
          cloud topologies, immutable containers, and automated deployment pipelines.
        </motion.p>

        {/* =========================================================================
            02 — ASTRONAUT: ONE CINEMATIC TRANSITION MOMENT
            Archival illustration discovered during the journey, slow subtle movement,
            partially obscured by darkness and grain, editorial field folio.
           ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="relative w-full max-w-2xl mb-14"
        >
          {/* Archival Folio Frame */}
          <div className="relative p-6 sm:p-8 rounded-3xl bg-[#070810]/90 border border-amber-400/25 shadow-[0_25px_60px_rgba(0,0,0,0.95)] backdrop-blur-2xl flex flex-col items-center overflow-hidden group">
            {/* Edge Metadata */}
            <div className="w-full flex items-center justify-between text-[9px] font-mono text-amber-400/70 border-b border-white/10 pb-3 mb-4">
              <span>FOLIO IV // THE EXTRAVEHICULAR EXPLORER</span>
              <span>DEPTH: 400 KM · ORBITAL VELOCITY</span>
            </div>

            {/* Astronaut Illustration with Slow Subtle Depth Drift */}
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 9, ease: 'easeInOut', repeat: Infinity }}
              className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center my-2"
            >
              {/* Subtle Shadow Vignette Behind Astronaut */}
              <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_55%,rgba(7,8,16,0.85)_100%] pointer-events-none z-10" />

              <Image
                src="/archive/illustration_astronaut_clean.webp"
                alt="Archival Astronaut Illustration — The Exploration Transition"
                width={280}
                height={280}
                className="object-contain filter contrast-105 opacity-85 group-hover:opacity-100 transition-opacity"
              />
            </motion.div>

            {/* Archival Folio Lower Caption */}
            <div className="w-full mt-4 pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] font-mono text-slate-400">
              <span className="text-amber-300 font-bold uppercase tracking-wider">
                EXPLORATION ARCHETYPE
              </span>
              <span className="text-slate-400">
                STEPPING INTO DISTRIBUTED CLOUD TOPOLOGIES
              </span>
            </div>
          </div>
        </motion.div>

        {/* Transition Bridge Graphic */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl mb-12 text-left font-mono text-xs">
          <div className="p-5 rounded-2xl bg-[#090a12] border border-white/10 flex flex-col justify-between">
            <div className="flex items-center gap-2 text-amber-300 mb-2 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>IMMUTABILITY</span>
            </div>
            <p className="text-slate-400 text-[11px] font-sans">
              No configuration drift. Infrastructure defined strictly through declarative code.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#090a12] border border-white/10 flex flex-col justify-between">
            <div className="flex items-center gap-2 text-cyan-300 mb-2 font-bold">
              <Network className="w-4 h-4" />
              <span>ORCHESTRATION</span>
            </div>
            <p className="text-slate-400 text-[11px] font-sans">
              Self-healing container fleets with automated failover and dynamic scaling.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#090a12] border border-white/10 flex flex-col justify-between">
            <div className="flex items-center gap-2 text-indigo-300 mb-2 font-bold">
              <GitBranch className="w-4 h-4" />
              <span>CONTINUITY</span>
            </div>
            <p className="text-slate-400 text-[11px] font-sans">
              Automated pipelines testing, packing, and rolling out code with zero downtime.
            </p>
          </div>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={onProceedToSystems}
          className="group px-7 py-3 rounded-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-black font-bold text-xs uppercase tracking-widest font-mono shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all flex items-center gap-2 hover:scale-105"
        >
          <span>Examine Infrastructure Architecture</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
}

