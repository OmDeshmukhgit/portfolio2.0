'use client';

import React, { useRef, useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Compass, Eye, Info, Check } from 'lucide-react';

export interface Constellation {
  id: string;
  name: string;
  latinName: string;
  role: string;
  coordinates: string;
  magnitude: string;
  fieldNote: string;
  stars: Array<{ x: number; y: number; r: number; label?: string }>; // normalized 0..100
  lines: Array<[number, number]>; // star index pairs
}

export const ENGINEERING_CONSTELLATIONS: Constellation[] = [
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    latinName: 'Corona Gubernatoris',
    role: 'Orchestration Fleet & Self-Healing Pods',
    coordinates: 'α-HELM 19h 50m / +08° 52\'',
    magnitude: '1.2 (Variable)',
    fieldNote: 'Seven-spoked celestial helm. Governs automated failover, declarative pod replicas, and horizontal pod autoscaling.',
    stars: [
      { x: 50, y: 50, r: 4.5, label: 'Control Plane' }, // 0: Center
      { x: 50, y: 18, r: 3.2, label: 'API Server' },   // 1: Top
      { x: 78, y: 32, r: 3.0, label: 'etcd' },         // 2: Top Right
      { x: 82, y: 68, r: 3.0, label: 'Kubelet' },      // 3: Bottom Right
      { x: 50, y: 84, r: 3.2, label: 'Kube-Proxy' },   // 4: Bottom
      { x: 18, y: 68, r: 3.0, label: 'CoreDNS' },      // 5: Bottom Left
      { x: 22, y: 32, r: 3.0, label: 'Scheduler' },    // 6: Top Left
    ],
    lines: [
      [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
      [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 1],
    ],
  },
  {
    id: 'aws',
    name: 'AWS',
    latinName: 'Nebula Nubium',
    role: 'Cloud Substrate & Multi-Region Fabric',
    coordinates: 'β-CLOUD 05h 35m / -05° 23\'',
    magnitude: '1.4 (Pulsating)',
    fieldNote: 'Interconnected triangular cloud delta. Distributes compute across VPCs, S3 object storage, and global edge locations.',
    stars: [
      { x: 20, y: 62, r: 3.5, label: 'IAM' },
      { x: 38, y: 32, r: 3.8, label: 'VPC' },
      { x: 64, y: 28, r: 4.0, label: 'EC2' },
      { x: 82, y: 55, r: 3.6, label: 'S3' },
      { x: 52, y: 72, r: 3.4, label: 'RDS' },
      { x: 44, y: 50, r: 3.0, label: 'Gateway' },
    ],
    lines: [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 0],
      [1, 5], [2, 5], [4, 5], [0, 5],
    ],
  },
  {
    id: 'docker',
    name: 'Docker',
    latinName: 'Cetus Vecturae',
    role: 'Immutable Containerization',
    coordinates: 'γ-CONTAINER 02h 45m / +12° 15\'',
    magnitude: '1.8',
    fieldNote: 'Geometric container grid riding atop the host kernel. Eliminates environment discrepancies through layered OCI images.',
    stars: [
      { x: 25, y: 35, r: 3.0, label: 'Base' },
      { x: 42, y: 35, r: 3.0, label: 'Layers' },
      { x: 58, y: 35, r: 3.0, label: 'App' },
      { x: 25, y: 55, r: 3.0, label: 'Run' },
      { x: 42, y: 55, r: 3.2, label: 'Daemon' },
      { x: 58, y: 55, r: 3.0, label: 'Volume' },
      { x: 80, y: 65, r: 3.8, label: 'Network' },
      { x: 15, y: 75, r: 2.8, label: 'Kernel' },
    ],
    lines: [
      [0, 1], [1, 2], [0, 3], [1, 4], [2, 5], [3, 4], [4, 5],
      [5, 6], [3, 7], [4, 7],
    ],
  },
  {
    id: 'terraform',
    name: 'Terraform',
    latinName: 'Prisma Structurae',
    role: 'Declarative Infrastructure as Code',
    coordinates: 'δ-PRISM 14h 15m / +19° 10\'',
    magnitude: '1.6',
    fieldNote: 'Layered isometric prism. Converts declarative HCL configurations into deterministic cloud topology and state locks.',
    stars: [
      { x: 50, y: 20, r: 4.2, label: 'State Lock' },
      { x: 22, y: 45, r: 3.4, label: 'Provider' },
      { x: 78, y: 45, r: 3.4, label: 'Module' },
      { x: 34, y: 78, r: 3.2, label: 'Plan' },
      { x: 66, y: 78, r: 3.2, label: 'Apply' },
      { x: 50, y: 52, r: 3.6, label: 'Graph' },
    ],
    lines: [
      [0, 1], [0, 2], [1, 5], [2, 5], [0, 5],
      [1, 3], [2, 4], [3, 5], [4, 5], [3, 4],
    ],
  },
  {
    id: 'cicd',
    name: 'CI/CD Pipeline',
    latinName: 'Circulus Perpetuus',
    role: 'Automated Delivery & Verification',
    coordinates: 'ε-PIPELINE 21h 30m / +42° 00\'',
    magnitude: '1.3',
    fieldNote: 'Continuous infinity loop connecting code commits to live verification. Zero downtime rollouts with automated rollbacks.',
    stars: [
      { x: 22, y: 50, r: 3.8, label: 'Commit' },
      { x: 36, y: 32, r: 3.2, label: 'Lint' },
      { x: 50, y: 50, r: 4.2, label: 'Build' },
      { x: 64, y: 68, r: 3.2, label: 'Test' },
      { x: 78, y: 50, r: 3.8, label: 'Deploy' },
      { x: 64, y: 32, r: 3.2, label: 'Verify' },
      { x: 36, y: 68, r: 3.2, label: 'Artifact' },
    ],
    lines: [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 2], [2, 6], [6, 0],
    ],
  },
  {
    id: 'linux',
    name: 'Linux',
    latinName: 'Polaris Substrati',
    role: 'Operating System Foundation',
    coordinates: 'ζ-POLAR 01h 00m / +89° 15\'',
    magnitude: '1.0 (Fixed North)',
    fieldNote: 'The guiding celestial pole. UNIX socket architecture, virtual file systems (/proc, /sys), and cgroups isolation.',
    stars: [
      { x: 50, y: 18, r: 4.6, label: 'Kernel' },
      { x: 30, y: 40, r: 3.4, label: 'Systemd' },
      { x: 70, y: 40, r: 3.4, label: 'Bash / Zsh' },
      { x: 22, y: 72, r: 3.0, label: 'Cgroups' },
      { x: 50, y: 58, r: 3.8, label: 'Networking' },
      { x: 78, y: 72, r: 3.0, label: 'Storage' },
      { x: 50, y: 84, r: 3.2, label: 'Daemons' },
    ],
    lines: [
      [0, 1], [0, 2], [1, 4], [2, 4], [1, 3], [2, 5],
      [4, 6], [3, 6], [5, 6],
    ],
  },
  {
    id: 'python',
    name: 'Python',
    latinName: 'Serpens Automata',
    role: 'Scripting, Tooling & Systems Logic',
    coordinates: 'η-SERPENS 15h 45m / +06° 25\'',
    magnitude: '1.5',
    fieldNote: 'Dual intertwined spirals. Orchestrates API integrations, automation scripts, and systems performance analytics.',
    stars: [
      { x: 25, y: 26, r: 3.6, label: 'Scripts' },
      { x: 45, y: 24, r: 3.8, label: 'FastAPI' },
      { x: 65, y: 38, r: 3.4, label: 'AsyncIO' },
      { x: 75, y: 55, r: 3.8, label: 'Boto3' },
      { x: 55, y: 72, r: 3.6, label: 'PyTest' },
      { x: 35, y: 70, r: 3.4, label: 'Logging' },
      { x: 48, y: 48, r: 4.0, label: 'Runtime' },
    ],
    lines: [
      [0, 1], [1, 2], [2, 6], [6, 3], [3, 4], [4, 5], [5, 6], [6, 0],
    ],
  },
];

interface ConstellationProps {
  onSelectConstellation?: (c: Constellation) => void;
}

export default function EngineeringConstellations({ onSelectConstellation }: ConstellationProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeId, setActiveId] = useState<string>('kubernetes');
  const [isHoveredStar, setIsHoveredStar] = useState<string | null>(null);

  const activeConstellation = useMemo(
    () => ENGINEERING_CONSTELLATIONS.find((c) => c.id === activeId) || ENGINEERING_CONSTELLATIONS[0],
    [activeId]
  );

  // Background random stars generated deterministically
  const backgroundStars = useMemo(() => {
    const list: Array<{ x: number; y: number; r: number; alpha: number }> = [];
    for (let i = 0; i < 90; i++) {
      list.push({
        x: ((i * 37) % 100),
        y: ((i * 53) % 100),
        r: (i % 5 === 0 ? 1.4 : 0.8),
        alpha: (i % 3 === 0 ? 0.65 : 0.35),
      });
    }
    return list;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    let t = 0;

    const render = () => {
      t += 0.02;
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Astrolabe / Celestial Coordinate Grid Lines
      ctx.save();
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.08)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 5]);

      // Concentric Coordinate Rings
      const centerX = width / 2;
      const centerY = height / 2;
      const maxR = Math.min(width, height) * 0.44;

      ctx.beginPath();
      ctx.arc(centerX, centerY, maxR * 0.4, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(centerX, centerY, maxR * 0.75, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(centerX, centerY, maxR, 0, Math.PI * 2);
      ctx.stroke();

      // Right Ascension / Declination Crosshairs
      ctx.beginPath();
      ctx.moveTo(centerX, centerY - maxR);
      ctx.lineTo(centerX, centerY + maxR);
      ctx.moveTo(centerX - maxR, centerY);
      ctx.lineTo(centerX + maxR, centerY);
      ctx.stroke();

      ctx.restore();

      // 2. Draw Faint Background Stars (pure canvas, NO PNGs)
      backgroundStars.forEach((star, idx) => {
        const sx = (star.x / 100) * width;
        const sy = (star.y / 100) * height;
        const twinkle = Math.sin(t + idx * 0.8) * 0.2 + 0.8;
        ctx.fillStyle = `rgba(244, 241, 234, ${star.alpha * twinkle})`;
        ctx.beginPath();
        ctx.arc(sx, sy, star.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Draw Active Engineering Constellation
      const scaleX = width;
      const scaleY = height;

      // Draw connecting lines with archival tungsten gold
      ctx.save();
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.75)';
      ctx.lineWidth = 1.6;
      ctx.shadowColor = 'rgba(212, 175, 55, 0.4)';
      ctx.shadowBlur = 6;

      activeConstellation.lines.forEach(([iA, iB]) => {
        const starA = activeConstellation.stars[iA];
        const starB = activeConstellation.stars[iB];
        if (!starA || !starB) return;

        const xA = (starA.x / 100) * scaleX;
        const yA = (starA.y / 100) * scaleY;
        const xB = (starB.x / 100) * scaleX;
        const yB = (starB.y / 100) * scaleY;

        ctx.beginPath();
        ctx.moveTo(xA, yA);
        ctx.lineTo(xB, yB);
        ctx.stroke();
      });
      ctx.restore();

      // Draw Constellation Star Nodes
      activeConstellation.stars.forEach((star, idx) => {
        const x = (star.x / 100) * scaleX;
        const y = (star.y / 100) * scaleY;
        const pulse = Math.sin(t * 1.5 + idx) * 0.8 + 1;

        // Outer soft glow
        ctx.save();
        ctx.fillStyle = 'rgba(212, 175, 55, 0.22)';
        ctx.beginPath();
        ctx.arc(x, y, (star.r + 3.5) * pulse, 0, Math.PI * 2);
        ctx.fill();

        // Inner bright star core
        ctx.fillStyle = '#fdf8eb';
        ctx.shadowColor = 'rgba(212, 175, 55, 0.9)';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(x, y, star.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Star label text in vintage astronomical typography
        if (star.label) {
          ctx.save();
          ctx.font = '9px "JetBrains Mono", monospace';
          ctx.fillStyle = 'rgba(244, 241, 234, 0.85)';
          ctx.fillText(star.label, x + 8, y + 3);
          ctx.restore();
        }
      });

      animFrame = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animFrame);
    };
  }, [activeConstellation, backgroundStars]);

  const handleSelect = (c: Constellation) => {
    setActiveId(c.id);
    if (onSelectConstellation) {
      onSelectConstellation(c);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Observatory Sky Header & Selector Controls */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 mb-4 text-xs font-mono border-b border-white/10 pb-3">
        <div className="flex items-center gap-2 text-amber-300">
          <Compass className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '24s' }} />
          <span className="font-bold tracking-wider uppercase">THE ENGINEERING SKY // OBSERVATORY</span>
        </div>
        <div className="text-[11px] text-slate-400">
          CHOOSE CELESTIAL CLUSTER TO CALIBRATE
        </div>
      </div>

      {/* Constellation Quick Selector Chips */}
      <div className="w-full flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-6">
        {ENGINEERING_CONSTELLATIONS.map((c) => {
          const isSelected = c.id === activeId;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => handleSelect(c)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-mono tracking-wider transition-all flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-amber-400/20 border border-amber-400 text-amber-200 shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                  : 'bg-[#090a12] border border-white/10 text-slate-400 hover:text-slate-200 hover:border-amber-400/30'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-amber-400 animate-ping' : 'bg-slate-600'}`} />
              <span>{c.name}</span>
            </button>
          );
        })}
      </div>

      {/* The Observatory Canvas & Field Plate Card */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* The Interactive Sky Canvas */}
        <div className="lg:col-span-7 relative w-full h-[320px] sm:h-[380px] rounded-3xl bg-[#040409] border border-amber-400/25 overflow-hidden shadow-[inset_0_0_60px_rgba(0,0,0,0.9)] flex items-center justify-center">
          {/* Astrolabe Circular Border Overlay */}
          <div className="absolute inset-4 sm:inset-6 rounded-full border border-amber-400/15 pointer-events-none" />

          {/* Canvas Rendering System */}
          <canvas
            ref={canvasRef}
            width={540}
            height={380}
            className="w-full h-full object-contain"
          />

          {/* Archival Quadrant Stamp */}
          <div className="absolute top-3 left-4 text-[9px] font-mono text-amber-400/60 uppercase">
            CELESTIAL QUADRANT // {activeConstellation.coordinates}
          </div>

          <div className="absolute bottom-3 right-4 text-[9px] font-mono text-slate-500 uppercase">
            PROJECTION: GNOMONIC · NO PHOTO-PNGS
          </div>
        </div>

        {/* Archival Field Plate Dossier */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-3xl bg-[#080913]/95 border border-amber-400/20 backdrop-blur-xl h-full shadow-xl">
          <div>
            <div className="flex items-center justify-between text-[10px] font-mono text-amber-400 uppercase tracking-widest border-b border-white/10 pb-2 mb-3">
              <span>FIELD PLATE // CATALOG 2024</span>
              <span>MAG: {activeConstellation.magnitude}</span>
            </div>

            <div className="text-[11px] font-serif italic text-amber-300/80 mb-1">
              {activeConstellation.latinName}
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#f4f1ea] mb-2">
              Constellation: {activeConstellation.name}
            </h3>

            <div className="inline-block px-2.5 py-1 rounded bg-amber-400/10 border border-amber-400/25 text-amber-300 text-xs font-mono mb-4">
              {activeConstellation.role}
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-serif">
              {activeConstellation.fieldNote}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-400">
            <span>NODES: {activeConstellation.stars.length} STELLAR VERTICES</span>
            <span className="text-amber-400/90 font-bold">CALIBRATED</span>
          </div>
        </div>
      </div>
    </div>
  );
}
