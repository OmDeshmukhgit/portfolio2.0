'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ARCHIVE_DATA } from '@/data/portfolioData';
import { Camera, Aperture, BookOpen, GraduationCap, Quote } from 'lucide-react';

export default function Scene03TheObserver() {
  const { about, curator } = ARCHIVE_DATA;

  return (
    <section
      id="scene-observer"
      className="relative w-full min-h-screen flex flex-col justify-center items-center px-4 sm:px-8 py-24 overflow-hidden border-t border-white/5 bg-[#030306]"
    >
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center">
        {/* Scene Identification Header */}
        <div className="w-full flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-amber-400/80 mb-8 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Camera className="w-3.5 h-3.5 text-amber-400" />
            <span>SCENE 03 // THE OBSERVER · PHOTOGRAPHIC ARCHIVE</span>
          </div>
          <div className="text-slate-400">
            LENS: 85mm · f/1.4 · 1/250s · MEDIUM FORMAT 6×7
          </div>
        </div>

        {/* Narrative Title */}
        <div className="max-w-3xl text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono uppercase mb-4">
            <Aperture className="w-3.5 h-3.5 text-amber-400" />
            <span>Contact Sheet Exhibition</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#f4f1ea] tracking-wide mb-4">
            The Lens of The Observer
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-serif">
            Observation is the art of seeing what remains hidden in plain sight. In photography, it is the interplay of light and grain.
            In systems engineering, it is diagnosing stack traces, packet bottlenecks, and race conditions.
          </p>
        </div>

        {/* Contact Sheet Layout: Authentic Portraits & Story Frames */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-start">
          {/* Left Column: Contact Sheet Photographic Frame */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex flex-col items-center"
          >
            {/* Film Negative Frame Container */}
            <div className="w-full max-w-md p-4 rounded-3xl bg-[#090a10] border border-amber-400/30 shadow-[0_20px_50px_rgba(0,0,0,0.9)] relative viewfinder-bracket">
              {/* Film Sprocket Edge Markings */}
              <div className="flex justify-between text-[9px] font-mono text-amber-400/50 mb-3 px-2 border-b border-white/5 pb-2">
                <span>KODAK TRI-X 400</span>
                <span>EXPOSURE 07A</span>
                <span>85MM PORTRAIT</span>
              </div>

              {/* Authentic Portrait Image from Portfolio1 */}
              <div className="relative w-full h-[360px] sm:h-[420px] rounded-2xl overflow-hidden bg-black/60 border border-white/10">
                <Image
                  src={about.portraits[0].src}
                  alt="Om Deshmukh — Portrait of the Observer"
                  fill
                  className="object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
                  sizes="(max-width: 768px) 100vw, 420px"
                />
                {/* Viewfinder Center Crosshair Overlay */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-40">
                  <div className="w-6 h-6 border-t border-b border-amber-400/80" />
                  <div className="w-6 h-6 border-l border-r border-amber-400/80 absolute" />
                </div>
              </div>

              {/* Photo Caption & Metadata */}
              <div className="mt-4 pt-3 border-t border-white/5 text-center font-mono">
                <h4 className="text-xs text-amber-300 font-bold tracking-wider">
                  {curator.name} · {curator.title}
                </h4>
                <p className="text-[10px] text-slate-400 mt-1">
                  {curator.baseLocation} · {curator.coordinates}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Personal Narrative, Education & Philosophy */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            {/* Dossier Card 01: Curator Note & Evolution */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#080911]/90 border border-white/10 backdrop-blur-xl">
              <span className="text-[10px] font-mono uppercase text-amber-400 tracking-widest block mb-2">
                CHRONICLE 01 // ORIGIN & EVOLUTION
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#f4f1ea] mb-3">
                From Raw Code to Production Machinery
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-serif mb-4">
                {about.story}
              </p>
              <p className="text-sm text-slate-400 leading-relaxed font-serif">
                {about.curatorNote}
              </p>
            </div>

            {/* Dossier Card 02: The Philosophy of Breaking & Rebuilding */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0c0d18]/90 border border-amber-500/30 backdrop-blur-xl relative">
              <Quote className="w-8 h-8 text-amber-400/20 absolute top-6 right-6 pointer-events-none" />
              <span className="text-[10px] font-mono uppercase text-amber-400 tracking-widest block mb-2">
                PHILOSOPHY // FIRST PRINCIPLES
              </span>
              <p className="text-base sm:text-lg font-serif italic text-amber-200 leading-relaxed mb-4">
                &ldquo;{about.philosophy}&rdquo;
              </p>
              <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>EXPERIMENTATION · ROOT-CAUSE ANALYSIS · RESILIENCE</span>
              </div>
            </div>

            {/* Dossier Card 03: Academic Foundation (MIT ADT University) */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#080911]/90 border border-white/10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-amber-400/80 block">
                    ACADEMIC FOUNDATION
                  </span>
                  <h4 className="text-base font-serif font-bold text-[#f4f1ea]">
                    {about.education.institution}
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5 font-sans">
                    {about.education.degree} · Focus: {about.education.focus}
                  </p>
                </div>
              </div>
              <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-white/5 text-[10px] font-mono text-amber-300 border border-white/10">
                GRADUATED
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
