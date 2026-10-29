'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ARCHIVE_DATA } from '@/data/portfolioData';
import { Mail, Phone, MapPin, Send, Check, FileDown, ExternalLink, Sparkles, Copy } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from '@/components/pixel/BrandIcons';

export default function Scene08FinalFrameContact() {
  const { curator } = ARCHIVE_DATA;
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isTransmitted, setIsTransmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  // Linear cycle telemetry signal sequencer: GitHub (0) -> LinkedIn (1) -> Instagram (2) -> Pause (3)
  const [activeSignalIndex, setActiveSignalIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSignalIndex((prev) => (prev + 1) % 4);
    }, 650);
    return () => clearInterval(timer);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(curator.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.message) return;
    const subject = encodeURIComponent(`Transmission from ${form.name || 'Archive Traveler'}`);
    const body = encodeURIComponent(
      `From: ${form.name || 'Anonymous'}\nSender Email: ${form.email}\n\nDispatch Message:\n${form.message}`
    );
    // Direct Gmail Web Compose (opens directly in browser without launching desktop Outlook)
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(curator.email)}&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    setIsTransmitted(true);
  };

  return (
    <section
      id="scene-contact"
      className="relative w-full min-h-screen flex flex-col justify-between items-center px-4 sm:px-8 py-24 overflow-hidden border-t border-[var(--archive-border)] bg-[var(--archive-bg)] transition-colors duration-300"
    >
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center">
        {/* Scene Identification Header */}
        <div className="w-full flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-[var(--archive-coral)] mb-8 border-b border-[var(--archive-border)] pb-3">
          <div className="flex items-center gap-2">
            <Send className="w-3.5 h-3.5 text-[var(--archive-coral)]" />
            <span>SCENE 08 // FINAL FRAME · DISPATCH TRANSMISSION</span>
          </div>
          <div className="hidden sm:block text-[var(--archive-text-muted)] font-mono text-[10px] sm:text-[11px]">
            LENS: 24mm · f/1.4 · 1/125s · THE CYCLE PERSISTS
          </div>
        </div>

        {/* =========================================================================
            CINEMATIC FINAL FRAME SEQUENCE
            ARCHIVE ↓ SYSTEMS ↓ TRANSMISSION ↓ THE ARCHIVE REMAINS OPEN.
            Looking for the next system to build.
           ========================================================================= */}
        <div className="max-w-3xl text-center mb-14">
          {/* Quiet Sequence Breadcrumb */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] font-mono text-[var(--archive-apricot)]/80 uppercase tracking-wider sm:tracking-widest mb-6">
            <span className="hidden sm:inline">ARCHIVE</span>
            <span className="hidden sm:inline text-[var(--archive-text-muted)]/40">↓</span>
            <span className="hidden sm:inline">SYSTEMS</span>
            <span className="hidden sm:inline text-[var(--archive-text-muted)]/40">↓</span>
            <span className="hidden sm:inline">TRANSMISSION</span>
            <span className="hidden sm:inline text-[var(--archive-text-muted)]/40">↓</span>
            <span className="text-[var(--archive-coral)] font-bold">THE ARCHIVE REMAINS OPEN</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[var(--archive-text-primary)] tracking-wide mb-4">
            Looking For The Next System To Build
          </h2>

          <p className="text-sm sm:text-base text-[var(--archive-text-secondary)]/80 leading-relaxed font-serif max-w-2xl mx-auto">
            The journal entries pause here, but the infrastructure continues running.
            Whether you are designing a high-throughput microservices mesh, provisioning multi-region cloud topology,
            or structuring automated deployment pipelines — the terminal is receptive. Let us build together.
          </p>

          {/* Quiet Archival Colophon Seal */}
          <div className="mt-6 inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[var(--archive-surface)] border border-[var(--archive-border-warm)] text-[10px] font-mono text-[var(--archive-apricot)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--archive-mint)] animate-ping" />
            <span>CHANNEL STATUS: STANDBY & RECEPTIVE</span>
            <span className="text-[var(--archive-text-muted)]/60">·</span>
            <span>DISPATCH FREQUENCY: 20.70° N, 77.00° E</span>
          </div>
        </div>

        {/* Two-Column Transmission Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full mb-16">
          {/* Left Column: Direct Transmission Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-[var(--archive-surface)]/95 border border-[var(--archive-border)] shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl transition-colors duration-300">
            <h3 className="text-lg font-serif font-bold text-[var(--archive-apricot)] uppercase tracking-widest mb-6 flex items-center gap-2">
              <Send className="w-4 h-4 text-[var(--archive-coral)]" />
              <span>Dispatch a Direct Transmission</span>
            </h3>

            {isTransmitted ? (
              <div className="p-8 rounded-2xl bg-[var(--archive-mint)]/10 border border-[var(--archive-mint)]/40 text-center animate-in fade-in duration-300">
                <Check className="w-8 h-8 text-[var(--archive-mint)] mx-auto mb-3" />
                <h4 className="text-base font-bold text-[var(--archive-mint)] font-serif">
                  Gmail Transmission Window Opened
                </h4>
                <p className="text-xs text-[var(--archive-text-muted)] mt-1 font-mono">
                  Your dispatch has been routed to Gmail to reach <span className="text-[var(--archive-mint)] font-semibold">{curator.email}</span>.
                </p>
                <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(curator.email)}&su=${encodeURIComponent(`Transmission from ${form.name || 'Archive Traveler'}`)}&body=${encodeURIComponent(`From: ${form.name || 'Anonymous'}\nSender Email: ${form.email}\n\nDispatch Message:\n${form.message}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg bg-[var(--archive-coral)]/20 hover:bg-[var(--archive-coral)]/30 text-[var(--archive-apricot)] border border-[var(--archive-border-warm)] text-[11px] font-mono transition-colors"
                  >
                    Open in Gmail Again
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setIsTransmitted(false);
                      setForm({ name: '', email: '', message: '' });
                    }}
                    className="px-4 py-2 rounded-lg bg-[var(--archive-surface-alt)] hover:bg-[var(--archive-border)] text-[var(--archive-text-secondary)] text-[11px] font-mono transition-colors"
                  >
                    Send Another Dispatch
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                <div>
                  <label className="block text-[var(--archive-text-muted)] uppercase tracking-wider mb-1.5">
                    Identifier // Name or Organization
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Observer / Engineering Lead"
                    className="w-full px-4 py-3 rounded-xl bg-[var(--archive-surface-deep)]/80 border border-[var(--archive-border)] focus:border-[var(--archive-coral)] text-[var(--archive-text-primary)] placeholder-[var(--archive-text-muted)]/40 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[var(--archive-text-muted)] uppercase tracking-wider mb-1.5">
                    Return Signal // Contact Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="contact@organization.org"
                    className="w-full px-4 py-3 rounded-xl bg-[var(--archive-surface-deep)]/80 border border-[var(--archive-border)] focus:border-[var(--archive-coral)] text-[var(--archive-text-primary)] placeholder-[var(--archive-text-muted)]/40 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[var(--archive-text-muted)] uppercase tracking-wider mb-1.5">
                    Message // Architecture or Collaboration Scope
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Greetings Om, let us discuss cloud infrastructure provisioning, container deployments, or systems architecture..."
                    className="w-full px-4 py-3 rounded-xl bg-[var(--archive-surface-deep)]/80 border border-[var(--archive-border)] focus:border-[var(--archive-coral)] text-[var(--archive-text-primary)] placeholder-[var(--archive-text-muted)]/40 outline-none transition-colors resize-none font-sans"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-[var(--archive-coral)] to-[var(--archive-apricot)] hover:opacity-95 text-[var(--archive-bg)] font-bold uppercase tracking-widest rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Dispatch</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Direct Telemetry Channels & Social Links */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-[var(--archive-surface)]/95 border border-[var(--archive-border)] backdrop-blur-2xl transition-colors duration-300">
            <div>
              <h3 className="text-lg font-serif font-bold text-[var(--archive-apricot)] uppercase tracking-widest mb-6">
                Ground Coordinates
              </h3>

              <div className="space-y-4 font-mono text-xs">
                {/* Direct Mail */}
                <div className="p-3.5 rounded-2xl bg-[var(--archive-surface-deep)]/70 border border-[var(--archive-border)] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[var(--archive-surface-alt)] border border-[var(--archive-border)] flex items-center justify-center text-[var(--archive-apricot)]">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-[var(--archive-text-muted)] uppercase block">Direct Signal</span>
                      <a
                        href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(curator.email)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--archive-apricot)] hover:text-[var(--archive-coral)] hover:underline font-semibold"
                        title="Compose via Gmail"
                      >
                        {curator.email}
                      </a>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="px-2.5 py-1 rounded bg-[var(--archive-surface-alt)] hover:bg-[var(--archive-surface)] text-[var(--archive-apricot)] border border-[var(--archive-border)] transition-colors"
                  >
                    {copiedEmail ? 'Copied' : 'Copy'}
                  </button>
                </div>

                {/* Phone */}
                <div className="p-3.5 rounded-2xl bg-[var(--archive-surface-deep)]/70 border border-[var(--archive-border)] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[var(--archive-surface-alt)] border border-[var(--archive-border)] flex items-center justify-center text-[var(--archive-apricot)]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[var(--archive-text-muted)] uppercase block">Voice Line</span>
                    <a href={`tel:${curator.phone}`} className="text-[var(--archive-apricot)] hover:text-[var(--archive-coral)] hover:underline font-semibold">
                      {curator.phone}
                    </a>
                  </div>
                </div>

                {/* Base Location */}
                <div className="p-3.5 rounded-2xl bg-[var(--archive-surface-deep)]/70 border border-[var(--archive-border)] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[var(--archive-surface-alt)] border border-[var(--archive-border)] flex items-center justify-center text-[var(--archive-apricot)]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[var(--archive-text-muted)] uppercase block">Physical Terminal</span>
                    <span className="text-[var(--archive-text-primary)] font-semibold">
                      {curator.baseLocation} ({curator.coordinates})
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Channels & Resume */}
            <div className="mt-8 pt-6 border-t border-[var(--archive-border)]">
              <div className="flex flex-wrap items-center justify-between gap-3">
                {/* Social Channels with Sequential Interspace Signal Cycle */}
                <div className="flex items-center gap-3">
                  {[
                    {
                      href: curator.github,
                      title: 'GitHub Archive // Signal 01',
                      Icon: GithubIcon,
                      idx: 0,
                    },
                    {
                      href: curator.linkedin,
                      title: 'LinkedIn Network // Signal 02',
                      Icon: LinkedinIcon,
                      idx: 1,
                    },
                    {
                      href: curator.instagram,
                      title: 'Instagram Dispatch // Signal 03',
                      Icon: InstagramIcon,
                      idx: 2,
                    },
                  ].map(({ href, title, Icon, idx }) => {
                    const isActive = activeSignalIndex === idx;

                    return (
                      <motion.a
                        key={idx}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={title}
                        whileHover={{ scale: 1.08, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        animate={{
                          borderColor: isActive
                            ? 'var(--archive-coral)'
                            : 'var(--archive-border)',
                          boxShadow: isActive
                            ? '0 0 20px rgba(242, 123, 155, 0.4), inset 0 0 10px rgba(112, 65, 166, 0.2)'
                            : '0 0 0px rgba(0, 0, 0, 0)',
                          backgroundColor: isActive
                            ? 'rgba(112, 65, 166, 0.25)'
                            : 'var(--archive-surface-deep)',
                          scale: isActive ? 1.05 : 1,
                        }}
                        transition={{ duration: 0.28, ease: 'easeInOut' }}
                        className="group relative p-3 rounded-xl border backdrop-blur-md cursor-pointer overflow-visible flex items-center justify-center transition-colors"
                      >
                        {/* Expanding Interspace Wavefront Ring on Active Blink */}
                        {isActive && (
                          <motion.span
                            key={`wave-${activeSignalIndex}`}
                            initial={{ scale: 1, opacity: 0.85 }}
                            animate={{ scale: 1.6, opacity: 0 }}
                            transition={{ duration: 0.55, ease: 'easeOut' }}
                            className="absolute -inset-1 rounded-xl border border-[var(--archive-coral)]/80 shadow-[0_0_12px_rgba(242,123,155,0.5)] pointer-events-none"
                          />
                        )}

                        {/* Corner Warm Lantern Yellow Interspace Signal Telemetry Beacon Dot */}
                        <span
                          className={`absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full transition-all duration-300 pointer-events-none ${
                            isActive
                              ? 'bg-[var(--archive-yellow)] shadow-[0_0_10px_rgba(255,214,107,1)] scale-125 opacity-100'
                              : 'bg-[var(--archive-yellow)]/35 scale-90 opacity-40 group-hover:opacity-80 group-hover:bg-[var(--archive-yellow)]'
                          }`}
                        />

                        {/* Icon with Matching Flash */}
                        <motion.div
                          animate={{
                            scale: isActive ? 1.15 : 1,
                            color: isActive ? 'var(--archive-text-primary)' : 'var(--archive-apricot)',
                          }}
                          transition={{ duration: 0.28 }}
                          className="relative z-10 flex items-center justify-center group-hover:text-[var(--archive-apricot)]"
                        >
                          <Icon className="w-4 h-4" />
                        </motion.div>
                      </motion.a>
                    );
                  })}
                </div>

                <a
                  href={curator.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-[var(--archive-mint)] to-[var(--archive-apricot)] hover:opacity-95 text-[var(--archive-bg)] font-bold text-xs uppercase tracking-wider font-mono flex items-center gap-2 shadow-lg transition-all"
                >
                  <FileDown className="w-4 h-4 text-[var(--archive-bg)]" />
                  <span>Download Dossier</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Cinematic Film Credits Colophon */}
        <div className="w-full pt-8 border-t border-[var(--archive-border)] text-center text-xs font-mono text-[var(--archive-text-muted)] space-y-1">
          <p className="text-[var(--archive-coral)] font-bold tracking-widest uppercase">
            THE OM ARCHIVE // CURATED & ARCHITECTED BY OM DESHMUKH
          </p>
          <p className="text-[var(--archive-text-muted)] text-[10px]">
            &copy; {new Date().getFullYear()} ALL RIGHTS RESERVED · TRANSMISSION RECORDED ACROSS TIME & SPACE
          </p>
          <p className="text-[var(--archive-text-muted)]/60 text-[9px]">
            ENGINEERED WITH NEXT.JS APP ROUTER · TYPESCRIPT · TAILWIND CSS · LENIS · MOTION
          </p>
        </div>
      </div>
    </section>
  );
}
