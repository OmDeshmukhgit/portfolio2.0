'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ARCHIVE_DATA } from '@/data/portfolioData';
import { Mail, Phone, MapPin, Send, Check, FileDown, ExternalLink, Sparkles, Copy } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from '@/components/pixel/BrandIcons';

export default function Scene08FinalFrameContact() {
  const { curator } = ARCHIVE_DATA;
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isTransmitted, setIsTransmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(curator.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.message) return;
    const subject = encodeURIComponent(`Transmission from ${form.name || 'Archive Traveler'}`);
    const body = encodeURIComponent(`${form.message}\n\nSender: ${form.name} (${form.email})`);
    window.location.href = `mailto:${curator.email}?subject=${subject}&body=${body}`;
    setIsTransmitted(true);
  };

  return (
    <section
      id="scene-contact"
      className="relative w-full min-h-screen flex flex-col justify-between items-center px-4 sm:px-8 py-24 overflow-hidden border-t border-white/5 bg-[#020204]"
    >
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center">
        {/* Scene Identification Header */}
        <div className="w-full flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-amber-400/80 mb-8 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Send className="w-3.5 h-3.5 text-amber-400" />
            <span>SCENE 08 // FINAL FRAME · DISPATCH TRANSMISSION</span>
          </div>
          <div className="text-slate-400">
            LENS: 24mm · f/1.4 · 1/125s · THE CYCLE PERSISTS
          </div>
        </div>

        {/* Narrative Title */}
        <div className="max-w-3xl text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>The Final Frame</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#f4f1ea] tracking-wide mb-4">
            The Archive Remains Open
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-serif">
            Whether you need a dedicated engineer to architect multi-environment cloud infrastructure,
            automate complex Kubernetes deployment pipelines, or construct scalable real-time systems —
            the transmission terminal is receptive. Let us build the next architecture together.
          </p>
        </div>

        {/* Two-Column Transmission Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full mb-16">
          {/* Left Column: Direct Transmission Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-[#080912]/95 border border-amber-400/30 shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
            <h3 className="text-lg font-serif font-bold text-amber-200 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Send className="w-4 h-4 text-amber-400" />
              <span>Dispatch a Direct Transmission</span>
            </h3>

            {isTransmitted ? (
              <div className="p-8 rounded-2xl bg-emerald-950/60 border border-emerald-500/50 text-center animate-in fade-in duration-300">
                <Check className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
                <h4 className="text-base font-bold text-emerald-200 font-serif">
                  Transmission Channel Opened
                </h4>
                <p className="text-xs text-emerald-300/80 mt-1 font-mono">
                  Your mail client has been dispatched to reach Om Deshmukh directly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                <div>
                  <label className="block text-slate-400 uppercase tracking-wider mb-1.5">
                    Identifier // Name or Organization
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Observer / Engineering Lead"
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-slate-800 focus:border-amber-400 text-slate-100 placeholder-slate-600 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 uppercase tracking-wider mb-1.5">
                    Return Signal // Contact Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="contact@organization.org"
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-slate-800 focus:border-amber-400 text-slate-100 placeholder-slate-600 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 uppercase tracking-wider mb-1.5">
                    Message // Architecture or Collaboration Scope
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Greetings Om, let us discuss cloud infrastructure provisioning, container deployments, or systems architecture..."
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-slate-800 focus:border-amber-400 text-slate-100 placeholder-slate-600 outline-none transition-colors resize-none font-sans"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-black font-bold uppercase tracking-widest rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Dispatch</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Direct Telemetry Channels & Social Links */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-[#080912]/95 border border-white/10 backdrop-blur-2xl">
            <div>
              <h3 className="text-lg font-serif font-bold text-amber-200 uppercase tracking-widest mb-6">
                Ground Coordinates
              </h3>

              <div className="space-y-4 font-mono text-xs">
                {/* Direct Mail */}
                <div className="p-3.5 rounded-2xl bg-black/60 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block">Direct Signal</span>
                      <a href={`mailto:${curator.email}`} className="text-amber-200 hover:underline font-semibold">
                        {curator.email}
                      </a>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-amber-300 border border-white/10 transition-colors"
                  >
                    {copiedEmail ? 'Copied' : 'Copy'}
                  </button>
                </div>

                {/* Phone */}
                <div className="p-3.5 rounded-2xl bg-black/60 border border-slate-800 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Voice Line</span>
                    <a href={`tel:${curator.phone}`} className="text-amber-200 hover:underline font-semibold">
                      {curator.phone}
                    </a>
                  </div>
                </div>

                {/* Base Location */}
                <div className="p-3.5 rounded-2xl bg-black/60 border border-slate-800 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Physical Terminal</span>
                    <span className="text-slate-200 font-semibold">
                      {curator.baseLocation} ({curator.coordinates})
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Channels & Resume */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <a
                    href={curator.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-black/60 hover:bg-amber-500 hover:text-black border border-white/10 text-amber-300 transition-all shadow-md"
                    title="GitHub Archive"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={curator.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-black/60 hover:bg-amber-500 hover:text-black border border-white/10 text-amber-300 transition-all shadow-md"
                    title="LinkedIn Network"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={curator.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-black/60 hover:bg-amber-500 hover:text-black border border-white/10 text-amber-300 transition-all shadow-md"
                    title="Instagram Dispatch"
                  >
                    <InstagramIcon className="w-4 h-4" />
                  </a>
                </div>

                <a
                  href={curator.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-black font-bold text-xs uppercase tracking-wider font-mono flex items-center gap-2 shadow-lg transition-all"
                >
                  <FileDown className="w-4 h-4" />
                  <span>Download Dossier</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Cinematic Film Credits Colophon */}
        <div className="w-full pt-8 border-t border-white/5 text-center text-xs font-mono text-slate-500 space-y-1">
          <p className="text-amber-400/80 font-bold tracking-widest uppercase">
            THE OM ARCHIVE // CURATED & ARCHITECTED BY OM DESHMUKH
          </p>
          <p className="text-slate-500 text-[10px]">
            &copy; {new Date().getFullYear()} ALL RIGHTS RESERVED · TRANSMISSION RECORDED ACROSS TIME & SPACE
          </p>
          <p className="text-slate-600 text-[9px]">
            ENGINEERED WITH NEXT.JS APP ROUTER · TYPESCRIPT · TAILWIND CSS · LENIS · MOTION
          </p>
        </div>
      </div>
    </section>
  );
}
