'use client';

import React from 'react';
import { Film, Music2, Award, Sparkles } from 'lucide-react';
import { ARCHIVE_DATA } from '@/data/portfolioData';

export default function Scene07ReflectionsArchive() {
  const { about } = ARCHIVE_DATA;

  return (
    <section
      id="scene-archive-reflections"
      className="relative w-full min-h-[85vh] flex flex-col justify-center items-center px-4 sm:px-8 py-24 overflow-hidden border-t border-white/5 bg-[#030306]"
    >
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center">
        {/* Scene Identification Header */}
        <div className="w-full flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-amber-400/80 mb-8 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Film className="w-3.5 h-3.5 text-amber-400" />
            <span>SCENE 07 // THE ARCHIVE REPOSITORY · CINEMA & REFLECTIONS</span>
          </div>
          <div className="text-slate-400">
            LENS: 50mm · f/1.8 · 1/250s · HARMONIC EQUILIBRIUM
          </div>
        </div>

        {/* Narrative Title */}
        <div className="max-w-3xl text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Harmonic Synthesis</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#f4f1ea] tracking-wide mb-4">
            Cinema, Sound & The Engineer&apos;s Mind
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-serif">
            Engineering without artistry is sterile. Artistry without engineering lacks structure.
            The archive gathers the cinematic narratives, musical compositions, and intellectual disciplines
            that inspire daily architectural exploration.
          </p>
        </div>

        {/* 3 Reflection Vaults */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {/* Vault 1: Cinema as Visual Architecture */}
          <div className="p-6 rounded-3xl bg-[#080911]/90 border border-white/10 hover:border-amber-400/40 shadow-xl backdrop-blur-xl flex flex-col justify-between transition-all group">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300 mb-5 group-hover:scale-110 transition-transform">
                <Film className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono uppercase text-amber-400/80 tracking-widest block mb-1">
                DISCIPLINE // CINEMATOGRAPHY
              </span>
              <h3 className="text-xl font-serif font-bold text-[#f4f1ea] mb-3">
                Visual Composition & Framing
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-serif">
                Films like <em>Interstellar</em>, <em>Man of Steel</em>, and <em>How to Train Your Dragon</em> taught me how
                scale, pacing, and camera focus convey vastness. I apply the same principles to user experiences:
                every transition must feel deliberate and emotionally grounded.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 text-[10px] font-mono text-slate-500">
              FRAME PACING · CHOREOGRAPHY
            </div>
          </div>

          {/* Vault 2: Soundscapes & Focus */}
          <div className="p-6 rounded-3xl bg-[#080911]/90 border border-white/10 hover:border-amber-400/40 shadow-xl backdrop-blur-xl flex flex-col justify-between transition-all group">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300 mb-5 group-hover:scale-110 transition-transform">
                <Music2 className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono uppercase text-amber-400/80 tracking-widest block mb-1">
                DISCIPLINE // SOUND DESIGN
              </span>
              <h3 className="text-xl font-serif font-bold text-[#f4f1ea] mb-3">
                Atmosphere & Deep Work
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-serif">
                Music is mathematical emotion. Whether it is Hans Zimmer&apos;s pipe organs or Ludovico Einaudi&apos;s piano
                arpeggios, sound creates the cognitive focus required to trace intricate distributed network bugs
                and architect resilient cloud meshes.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 text-[10px] font-mono text-slate-500">
              RESONANCE · COGNITIVE FLOW
            </div>
          </div>

          {/* Vault 3: Academic Grounding (Government College of Engineering, Yavatmal) */}
          <div className="p-6 rounded-3xl bg-[#080911]/90 border border-white/10 hover:border-amber-400/40 shadow-xl backdrop-blur-xl flex flex-col justify-between transition-all group">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300 mb-5 group-hover:scale-110 transition-transform">
                <Award className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono uppercase text-amber-400/80 tracking-widest block mb-1">
                DISCIPLINE // ENGINEERING RIGOR
              </span>
              <h3 className="text-xl font-serif font-bold text-[#f4f1ea] mb-3">
                Computer Engineering Rigor
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-serif">
                Earning my B.Tech in Computer Engineering at Government College of Engineering, Yavatmal cemented the theoretical
                pillars: operating system schedulers, TCP/IP network protocol state machines, and relational algebra.
                That rigor transforms intuition into repeatable production engineering.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 text-[10px] font-mono text-slate-500">
              GOVERNMENT COLLEGE OF ENGINEERING, YAVATMAL · B.TECH
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
