'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Eye, ArrowRight, ShieldCheck, GitBranch, Network, Terminal } from 'lucide-react';

interface SceneProps {
  onProceedToSystems: () => void;
}

export default function Scene04EngineerTransition({ onProceedToSystems }: SceneProps) {
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll progress for Astronaut moving THROUGH the transition space
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 65,
    damping: 24,
    restDelta: 0.001,
  });

  // Diagonal transit through engineering information: ENTRY -> CROSSOVER -> DISSOLVE
  const astronautX = useTransform(smoothProgress, [0.1, 0.5, 0.88], ['-15vw', '38vw', '95vw']);
  const astronautY = useTransform(smoothProgress, [0.1, 0.5, 0.88], ['36vh', '16vh', '-2vh']);
  const astronautOpacity = useTransform(smoothProgress, [0.1, 0.28, 0.65, 0.88], [0, 0.75, 0.7, 0]);
  const astronautScale = useTransform(smoothProgress, [0.1, 0.5, 0.88], [0.85, 1.05, 0.85]);

  const engineeringTokens = [
    { name: 'AWS', label: 'Cloud Topology' },
    { name: 'Docker', label: 'OCI Containers' },
    { name: 'Kubernetes', label: 'Cluster Orchestration' },
    { name: 'Terraform', label: 'Declarative IaC' },
    { name: 'CI/CD', label: 'Automated Delivery' },
  ];

  return (
    <section
      ref={sectionRef}
      id="scene-engineer"
      className="relative w-full min-h-[95vh] flex flex-col justify-center items-center px-4 sm:px-8 py-24 overflow-hidden border-t border-[var(--archive-border)] bg-[var(--archive-bg)] transition-colors duration-400"
    >
      {/* Background Depth & Vignette */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[var(--archive-bg)] transition-colors duration-400" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-[var(--archive-indigo)]/20 blur-[140px]" />
        <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_40%,rgba(0,0,0,0.9)_100%]" />
      </div>

      {/* =========================================================================
          02 — ASTRONAUT: METAPHOR FOR ENTERING UNKNOWN SYSTEMS (FROZEN)
          Enters diagonally, traverses through the engineering cloud nodes, then exits
         ========================================================================= */}
      <motion.div
        style={{
          x: astronautX,
          y: astronautY,
          opacity: astronautOpacity,
          scale: astronautScale,
        }}
        className="absolute top-0 left-0 pointer-events-none z-[5] will-change-transform flex flex-col items-center"
      >
        <div className="relative w-36 h-36 sm:w-48 sm:h-48 lg:w-56 lg:h-56">
          <Image
            src="/archive/illustration_astronaut_clean.webp"
            alt="The Extravehicular Explorer — Stepping Into Unknown Systems"
            fill
            className="object-contain filter contrast-105 opacity-85 drop-shadow-[0_0_30px_rgba(212,175,55,0.15)]"
            sizes="(max-width: 640px) 144px, (max-width: 1024px) 192px, 224px"
          />
        </div>
        <div className="mt-1 text-[7px] sm:text-[8px] font-mono tracking-widest text-[var(--archive-apricot)]/70 uppercase whitespace-nowrap">
          VENTURING INTO CLOUD TOPOLOGIES
        </div>
      </motion.div>

      {/* =========================================================================
          FOREGROUND: PORTFOLIO TRANSITION & ENGINEERING ARCHITECTURE BEDROCK
         ========================================================================= */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Telemetry Header */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--archive-violet)]/25 border border-[var(--archive-border-warm)] text-[var(--archive-apricot)] text-xs font-mono uppercase mb-6">
          <Eye className="w-3.5 h-3.5 text-[var(--archive-coral)]" />
          <span>FOCAL SHIFT // OBSERVATION ↓ EXPLORATION ↓ ENGINEERING</span>
        </div>

        {/* Narrative Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-[var(--archive-text-primary)] max-w-4xl tracking-wide mb-6"
        >
          &ldquo;Observation captures what exists. Engineering constructs what endures.&rdquo;
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base sm:text-lg text-[var(--archive-text-secondary)] max-w-2xl font-serif leading-relaxed mb-10"
        >
          Here, the archival narrative crosses from visual observation into distributed computing.
          The same eye that calibrates lighting across photographic film demands deterministic order in cloud topologies,
          immutable containers, and automated deployment pipelines.
        </motion.p>

        {/* Engineering Tokens Traversed by the Explorer */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12 font-mono text-xs max-w-3xl">
          {engineeringTokens.map((t) => (
            <div
              key={t.name}
              className="px-3.5 py-1.5 rounded-xl bg-[var(--archive-surface)] border border-[var(--archive-border-violet)] flex items-center gap-2 text-[var(--archive-text-muted)] backdrop-blur-md"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--archive-coral)]" />
              <span className="font-bold text-[var(--archive-apricot)]">{t.name}</span>
              <span className="text-[10px] text-[var(--archive-text-muted)]/70">({t.label})</span>
            </div>
          ))}
        </div>

        {/* 3 Core Architecture Tenets */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl mb-12 text-left font-mono text-xs">
          <div className="p-5 rounded-2xl bg-[var(--archive-surface)]/95 border border-[var(--archive-border-violet)] flex flex-col justify-between shadow-xl backdrop-blur-md">
            <div className="flex items-center gap-2 text-[var(--archive-yellow)] mb-2 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>IMMUTABILITY</span>
            </div>
            <p className="text-[var(--archive-text-muted)] text-[11px] font-sans">
              No configuration drift. Infrastructure defined strictly through declarative code.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--archive-surface)]/95 border border-[var(--archive-border-violet)] flex flex-col justify-between shadow-xl backdrop-blur-md">
            <div className="flex items-center gap-2 text-[var(--archive-mint)] mb-2 font-bold">
              <Network className="w-4 h-4" />
              <span>ORCHESTRATION</span>
            </div>
            <p className="text-[var(--archive-text-muted)] text-[11px] font-sans">
              Self-healing container fleets with automated failover and dynamic scaling.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--archive-surface)]/95 border border-[var(--archive-border-violet)] flex flex-col justify-between shadow-xl backdrop-blur-md">
            <div className="flex items-center gap-2 text-[var(--archive-coral)] mb-2 font-bold">
              <GitBranch className="w-4 h-4" />
              <span>CONTINUITY</span>
            </div>
            <p className="text-[var(--archive-text-muted)] text-[11px] font-sans">
              Automated pipelines testing, packing, and rolling out code with zero downtime.
            </p>
          </div>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={onProceedToSystems}
          className="group px-7 py-3 rounded-full bg-gradient-to-r from-[var(--archive-magenta)] via-[var(--archive-coral)] to-[var(--archive-peach)] hover:opacity-95 text-[var(--archive-bg)] font-bold text-xs uppercase tracking-widest font-mono shadow-[0_0_25px_var(--archive-glow-warm)] transition-all flex items-center gap-2 hover:scale-105"
        >
          <span>Examine Infrastructure Architecture</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
}
