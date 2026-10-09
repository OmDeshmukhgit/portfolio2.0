'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ARCHIVE_DATA, ArchiveTrack } from '@/data/portfolioData';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Music, Disc3, Sparkles } from 'lucide-react';

interface ArchiveSoundtrackProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  currentTrackIndex: number;
  setCurrentTrackIndex: (index: number) => void;
}

export default function ArchiveSoundtrack({
  isPlaying,
  setIsPlaying,
  currentTrackIndex,
  setCurrentTrackIndex,
}: ArchiveSoundtrackProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [volume, setVolume] = useState(0.45);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const tracks = ARCHIVE_DATA.soundtracks;
  const currentTrack: ArchiveTrack = tracks[currentTrackIndex] || tracks[0];

  const clampVolume = (v: number): number => {
    if (isNaN(v) || !Number.isFinite(v)) return 0;
    return Math.max(0, Math.min(1, v));
  };

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = isMuted ? 0 : clampVolume(volume);
  }, [volume, isMuted]);

  const prevTrackSrcRef = useRef(currentTrack.src);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    let rafId: number | null = null;
    let isCancelled = false;

    const trackChanged = prevTrackSrcRef.current !== currentTrack.src;
    if (trackChanged) {
      prevTrackSrcRef.current = currentTrack.src;
      audio.load();
    }

    if (isPlaying) {
      const targetVol = isMuted ? 0 : clampVolume(volume);
      const wasPaused = audio.paused || trackChanged;
      if (wasPaused) {
        audio.volume = 0;
      }
      audio.play().then(() => {
        if (isCancelled) return;
        if (wasPaused && targetVol > 0) {
          // Smooth cinematic volume fade-in over 1400ms
          const startTime = performance.now();
          const fadeDuration = 1400;
          const step = (now: number) => {
            if (isCancelled) return;
            const progress = Math.max(0, Math.min(1, (now - startTime) / fadeDuration));
            audio.volume = isMuted ? 0 : clampVolume(progress * targetVol);
            if (progress < 1) {
              rafId = requestAnimationFrame(step);
            }
          };
          rafId = requestAnimationFrame(step);
        } else {
          audio.volume = clampVolume(targetVol);
        }
      }).catch(() => {
        if (!isCancelled) {
          setIsPlaying(false);
        }
      });
    } else {
      audio.pause();
    }

    return () => {
      isCancelled = true;
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [isPlaying, currentTrackIndex, currentTrack.src, setIsPlaying]);

  const togglePlay = () => {
    setHasInteracted(true);
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentTrackIndex((currentTrackIndex + 1) % tracks.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((currentTrackIndex - 1 + tracks.length) % tracks.length);
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScrollDismiss = () => {
      if (window.scrollY > 300) {
        setIsDismissed(true);
      }
    };
    window.addEventListener('scroll', handleScrollDismiss, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollDismiss);
  }, []);

  return (
    <>
      {/* Hidden Native Audio Element */}
      <audio
        ref={audioRef}
        src={currentTrack.src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleNext}
        preload="none"
      />

      {/* Persistent Floating Minimalist Console (Bottom Right) */}
      <div className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-40 flex flex-col items-end gap-2 font-mono select-none">
        {/* Expanded Console Panel */}
        {isExpanded && (
          <div className="w-[calc(100vw-1.5rem)] max-w-sm sm:w-96 p-4 rounded-2xl bg-[#090a12]/95 border border-amber-400/40 shadow-[0_15px_40px_rgba(0,0,0,0.9)] backdrop-blur-2xl animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2 text-xs text-amber-300 font-bold uppercase tracking-wider font-serif">
                <Music className="w-3.5 h-3.5" />
                <span>Archive Master Tape</span>
              </div>
              <span className="text-[10px] text-slate-400">
                TRACK 0{currentTrackIndex + 1} / 0{tracks.length}
              </span>
            </div>

            {/* Track Info */}
            <div className="my-3">
              <h4 className="text-sm font-semibold text-[#f4f1ea] truncate font-serif">
                {currentTrack.title}
              </h4>
              <p className="text-xs text-amber-400/80 truncate">
                {currentTrack.artist}
              </p>
              <p className="text-[10px] text-slate-400 mt-1 italic">
                {currentTrack.theme}
              </p>
            </div>

            {/* Progress Slider */}
            <div className="space-y-1">
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                  title="Previous Track"
                >
                  <SkipBack className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={togglePlay}
                  className="p-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold shadow-lg transition-transform hover:scale-105"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                  title="Next Track"
                >
                  <SkipForward className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Volume Slider */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsMuted(!isMuted)}
                  className="text-slate-400 hover:text-amber-300 transition-colors"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    setVolume(clampVolume(parseFloat(e.target.value)));
                    setIsMuted(false);
                  }}
                  className="w-16 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
              </div>
            </div>
          </div>
        )}

        {/* Minimal Floating Badge / Toggle Button */}
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="group flex items-center gap-2 sm:gap-2.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#090a12]/95 hover:bg-[#121320] border border-amber-400/50 hover:border-amber-300 text-amber-200 shadow-[0_10px_25px_rgba(0,0,0,0.85)] backdrop-blur-xl transition-all cursor-pointer"
          aria-label={isExpanded ? 'Collapse soundtrack player' : 'Expand soundtrack player'}
        >
          <Disc3 className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 flex-shrink-0 ${isPlaying ? 'animate-spin' : ''}`} />
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase font-serif text-amber-200 truncate max-w-[110px] sm:max-w-none">
                {isPlaying ? currentTrack.title : 'Soundtrack'}
              </span>
              {isPlaying && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse sm:hidden" />
              )}
            </div>
            <span className="hidden sm:inline text-[9px] text-amber-400/60 font-mono">
              {isPlaying ? 'NOW PLAYING · TAP TO EXPAND' : 'PAUSED · TAP TO PLAY'}
            </span>
          </div>
        </button>
      </div>

      {/* Initial Entry Audio Prompt Banner (Appears only on initial view before scroll or interaction) */}
      {!hasInteracted && !isDismissed && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-30 pointer-events-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setHasInteracted(true);
              setIsPlaying(true);
            }}
            className="group px-5 py-2.5 rounded-full bg-slate-950/95 border border-amber-400/50 hover:border-amber-300 text-amber-200 text-xs font-mono tracking-wider shadow-[0_0_30px_rgba(212,175,55,0.25)] backdrop-blur-xl flex items-center gap-3 hover:scale-105 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>ENTER THE ARCHIVE WITH SOUNDTRACK</span>
            <Play className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          </button>
          <button
            type="button"
            onClick={() => setIsDismissed(true)}
            className="w-8 h-8 rounded-full bg-slate-950/95 border border-white/20 text-slate-400 hover:text-white flex items-center justify-center text-xs transition-colors"
            title="Dismiss prompt"
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
}
