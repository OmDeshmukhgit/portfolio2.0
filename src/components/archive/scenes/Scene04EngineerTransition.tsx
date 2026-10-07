'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Eye, Cpu, ArrowRight, ShieldCheck, GitBranch, Network } from 'lucide-react';

interface SceneProps {
  onProceedToSystems: () => void;
}

export default function Scene04EngineerTransition({ onProceedToSystems }: SceneProps) {
  return (
    <section
      id="scene-engineer"
      className="relative w-full min-h-[85vh] flex flex-col justify-center items-center px-4 sm:px-8 py-20 overflow-hidden border-t border-white/5 bg-[#030306]"
    >
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Telemetry Header */}
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono uppercase mb-6">
          <Eye className="w-3.5 h-3.5 text-amber-400" />
          <span>Focal Shift // The Aperture Narrows</span>
        </div>

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
          Here, the archival narrative transitions from visual observation to distributed computing.
          The same eye that seeks balance in a photograph demands deterministic order in cloud topologies,
          immutable containers, and continuous deployment pipelines.
        </motion.p>

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
