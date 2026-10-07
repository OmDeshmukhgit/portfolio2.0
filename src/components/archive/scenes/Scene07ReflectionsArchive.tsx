'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Film, Music2, Compass, Award, Heart, Sparkles, BookOpen, Moon as MoonIcon } from 'lucide-react';
import { ARCHIVE_DATA } from '@/data/portfolioData';

export default function Scene07ReflectionsArchive() {
  const { about } = ARCHIVE_DATA;

  return (
    <section
      id="scene-archive-reflections"
      className="relative w-full min-h-[90vh] flex flex-col justify-center items-center px-4 sm:px-8 py-24 overflow-hidden border-t border-white/5 bg-[#030306]"
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

        {/* Narrative Title & 04 — MOON Marginalia */}
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-center mb-14">
          <div className="md:col-span-9 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Harmonic Synthesis</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#f4f1ea] tracking-wide mb-4">
              Cinema, Sound & The Engineer&apos;s Mind
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-serif max-w-2xl">
              Engineering without artistry is sterile. Artistry without engineering lacks structure.
              The archive gathers the cinematic narratives, musical compositions, and intellectual disciplines
              that inspire daily architectural exploration.
            </p>
          </div>

          {/* 04 — MOON: Atmospheric Marginalia in the Field Journal Margin */}
          <div className="md:col-span-3 flex flex-col items-center justify-center">
            <div className="p-3.5 rounded-2xl bg-[#080912]/80 border border-white/10 backdrop-blur-md shadow-lg flex flex-col items-center group">
              <div className="flex items-center justify-between w-full text-[8px] font-mono text-amber-400/70 border-b border-white/10 pb-1 mb-1">
                <span>MARGINALIA // EPHEMERIS</span>
                <span>FIG. 04</span>
              </div>

              {/* Delicate Margin Moon Sketch */}
              <div className="relative w-24 h-24 flex items-center justify-center my-1">
                <Image
                  src="/archive/illustration_moon_clean.webp"
                  alt="Archival Moon Sketch — Astronomical Field Journal Marginalia"
                  width={96}
                  height={96}
                  className="object-contain filter contrast-105 opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </div>

              <div className="text-[8px] font-mono text-slate-400 text-center pt-1 border-t border-white/5 uppercase">
                LUNAR PHASE // NIGHT SKY FLOW
              </div>
            </div>
          </div>
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

          {/* Vault 3: Academic Grounding (MIT ADT) */}
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
                Earning my B.Tech in Computer Engineering at MIT ADT University cemented the theoretical
                pillars: operating system schedulers, TCP/IP network protocol state machines, and relational algebra.
                That rigor transforms intuition into repeatable production engineering.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 text-[10px] font-mono text-slate-500">
              MIT ADT UNIVERSITY · B.TECH
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

