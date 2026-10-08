'use client';

import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Compass, CheckCircle2, Terminal } from 'lucide-react';

export interface Constellation {
  id: string;
  name: string;
  latinName: string;
  classification: string;
  role: string;
  primitives: string[];
  status: string;
  fieldNote: string;
  stars: Array<{ x: number; y: number; r: number; label?: string }>;
  lines: Array<[number, number]>;
}

export const ENGINEERING_CONSTELLATIONS: Constellation[] = [
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    latinName: 'Corona Gubernatoris',
    classification: 'CONTAINER ORCHESTRATION',
    role: 'Fleet Management & Automated Self-Healing',
    primitives: ['DEPLOYMENTS', 'SERVICES', 'INGRESS', 'HPA', 'CONFIGMAPS'],
    status: 'PRODUCTION-GRADE CLUSTER STATE ENGINE',
    fieldNote: 'Seven-spoked helm coordinates microservice pods under declarative state. Manages horizontal autoscaling, rolling zero-downtime updates, and automated failover.',
    stars: [
      { x: 50, y: 50, r: 4.2, label: 'Control Plane' },
      { x: 50, y: 18, r: 3.2, label: 'API Server' },
      { x: 78, y: 32, r: 3.0, label: 'etcd' },
      { x: 82, y: 68, r: 3.0, label: 'Kubelet' },
      { x: 50, y: 84, r: 3.2, label: 'Kube-Proxy' },
      { x: 18, y: 68, r: 3.0, label: 'CoreDNS' },
      { x: 22, y: 32, r: 3.0, label: 'Scheduler' },
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
    classification: 'MULTI-REGION CLOUD SUBSTRATE',
    role: 'Cloud Infrastructure & High-Availability Networking',
    primitives: ['MULTI-AZ VPC', 'EC2 FLEET', 'S3 STORAGE', 'IAM ROLES', 'ROUTE 53'],
    status: 'RESILIENT GLOBAL CLOUD FABRIC',
    fieldNote: 'Triangular cloud topology across availability zones. Enforces least-privilege IAM policies, NAT gateways, isolated subnets, and edge caching.',
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
    classification: 'CONTAINER RUNTIME & PACKAGING',
    role: 'Immutable Application Containers',
    primitives: ['MULTI-STAGE BUILDS', 'DOCKER COMPOSE', 'OCI IMAGES', 'CGROUPS ISOLATION'],
    status: 'STANDARDIZED DEPLOYMENT ARTIFACTS',
    fieldNote: 'Layered OCI container architecture eliminating environment discrepancies. Produces lean distroless container images with minimal attack surfaces.',
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
    classification: 'INFRASTRUCTURE AS CODE',
    role: 'Declarative Cloud Topology & State Management',
    primitives: ['S3 REMOTE STATE', 'STATE LOCKING', 'HCL MODULES', 'PLAN / APPLY VALIDATION'],
    status: 'ZERO-DRIFT DETERMINISTIC PROVISIONING',
    fieldNote: 'Converts declarative configuration files into validated dependency graphs. Provisions VPCs, compute, and databases reproducibly across environments.',
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
    classification: 'AUTOMATED CONTINUOUS DELIVERY',
    role: 'Zero-Downtime Verification & Deployment Cycles',
    primitives: ['JENKINS GROOVY', 'GITHUB ACTIONS', 'LINT / TEST GATES', 'CANARY ROLLOUT'],
    status: 'CONTINUOUS TESTED PROMOTION TO PROD',
    fieldNote: 'Automated continuous loop linking commits to production clusters. Enforces security scans, automated unit tests, container builds, and staging verification.',
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
    classification: 'OPERATING SYSTEM FOUNDATION',
    role: 'Kernel Internals, Daemons & Process Isolation',
    primitives: ['SYSTEMD', 'CGROUPS', 'NAMESPACES', 'BASH SCRIPTING', '/PROC MONITORING'],
    status: 'BEDROCK SYSTEM EXECUTION LAYER',
    fieldNote: 'The guiding system pole. UNIX socket architecture, virtual file systems, kernel networking tuning, and resource quotas governing every cloud node.',
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
    classification: 'SYSTEMS AUTOMATION & TOOLING',
    role: 'Cloud Automation, APIs & Performance Scripting',
    primitives: ['FASTAPI', 'BOTO3 AWS SDK', 'ASYNCIO', 'PYTEST', 'AUTOMATION SCRIPTS'],
    status: 'PRODUCTION AUTOMATION TOOLCHAIN',
    fieldNote: 'Programmatic control of cloud APIs, health monitors, automation daemons, and data transformation scripts running in production.',
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

  const activeConstellation = useMemo(
    () => ENGINEERING_CONSTELLATIONS.find((c) => c.id === activeId) || ENGINEERING_CONSTELLATIONS[0],
    [activeId]
  );

  // Deterministic starfield for background (pure canvas, zero PNGs)
  const backgroundStars = useMemo(() => {
    const list: Array<{ x: number; y: number; r: number; alpha: number }> = [];
    for (let i = 0; i < 75; i++) {
      list.push({
        x: ((i * 37) % 100),
        y: ((i * 53) % 100),
        r: (i % 6 === 0 ? 1.3 : 0.75),
        alpha: (i % 3 === 0 ? 0.5 : 0.25),
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

      // 1. Astrolabe / Coordinate Grid Lines
      ctx.save();
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.06)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 5]);

      const centerX = width / 2;
      const centerY = height / 2;
      const maxR = Math.min(width, height) * 0.44;

      ctx.beginPath();
      ctx.arc(centerX, centerY, maxR * 0.45, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(centerX, centerY, maxR * 0.8, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(centerX, centerY, maxR, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(centerX, centerY - maxR);
      ctx.lineTo(centerX, centerY + maxR);
      ctx.moveTo(centerX - maxR, centerY);
      ctx.lineTo(centerX + maxR, centerY);
      ctx.stroke();
      ctx.restore();

      // 2. Background Stars
      backgroundStars.forEach((star, idx) => {
        const sx = (star.x / 100) * width;
        const sy = (star.y / 100) * height;
        const twinkle = Math.sin(t + idx * 0.8) * 0.2 + 0.8;
        ctx.fillStyle = `rgba(244, 241, 234, ${star.alpha * twinkle})`;
        ctx.beginPath();
        ctx.arc(sx, sy, star.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Constellation Vectors
      const scaleX = width;
      const scaleY = height;

      ctx.save();
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.7)';
      ctx.lineWidth = 1.5;
      ctx.shadowColor = 'rgba(212, 175, 55, 0.35)';
      ctx.shadowBlur = 5;

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

      // 4. Star Nodes & Clean Monospace Labels
      activeConstellation.stars.forEach((star, idx) => {
        const x = (star.x / 100) * scaleX;
        const y = (star.y / 100) * scaleY;
        const pulse = Math.sin(t * 1.5 + idx) * 0.5 + 1;

        ctx.save();
        ctx.fillStyle = 'rgba(212, 175, 55, 0.2)';
        ctx.beginPath();
        ctx.arc(x, y, (star.r + 3) * pulse, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#fefcf8';
        ctx.shadowColor = 'rgba(212, 175, 55, 0.8)';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(x, y, star.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

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
      {/* Chart Header */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 mb-4 text-xs font-mono border-b border-white/10 pb-3">
        <div className="flex items-center gap-2 text-amber-300">
          <Compass className="w-4 h-4 text-amber-400" />
          <span className="font-bold tracking-wider uppercase">ENGINEER&apos;S ANNOTATED STAR CHART</span>
        </div>
        <div className="text-[11px] text-slate-400 font-mono">
          SELECT DISCIPLINE CLUSTER TO INSPECT TOPOLOGY
        </div>
      </div>

      {/* Selector Chips */}
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
                  ? 'bg-amber-400/20 border border-amber-400 text-amber-200 shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                  : 'bg-[#090a12] border border-white/10 text-slate-400 hover:text-slate-200 hover:border-amber-400/30'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-amber-400 animate-ping' : 'bg-slate-600'}`} />
              <span>{c.name}</span>
            </button>
          );
        })}
      </div>

      {/* Star Chart Canvas & Technical Engineering Dossier */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Star Chart Canvas */}
        <div className="lg:col-span-7 relative w-full h-[320px] sm:h-[380px] rounded-3xl bg-[#040409] border border-amber-400/20 overflow-hidden shadow-[inset_0_0_60px_rgba(0,0,0,0.9)] flex items-center justify-center">
          <div className="absolute inset-4 sm:inset-6 rounded-full border border-amber-400/10 pointer-events-none" />

          <canvas
            ref={canvasRef}
            width={540}
            height={380}
            className="w-full h-full object-contain"
          />

          <div className="absolute top-3 left-4 text-[9px] font-mono text-amber-400/60 uppercase">
            VECTOR // {activeConstellation.classification}
          </div>

          <div className="absolute bottom-3 right-4 text-[9px] font-mono text-slate-500 uppercase">
            CANVAS CELESTIAL PROJECTION
          </div>
        </div>

        {/* Technical Archival Annotation Box */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-3xl bg-[#080913]/95 border border-amber-400/20 backdrop-blur-xl shadow-xl">
          <div>
            <div className="flex items-center justify-between text-[10px] font-mono text-amber-400 uppercase tracking-widest border-b border-white/10 pb-2 mb-3">
              <span>ORBITAL CLASSIFICATION</span>
              <span className="font-bold text-amber-300">{activeConstellation.classification}</span>
            </div>

            <div className="text-[11px] font-serif italic text-amber-300/80 mb-0.5">
              {activeConstellation.latinName}
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#f4f1ea] mb-2">
              {activeConstellation.name}
            </h3>

            <div className="text-xs text-amber-300 font-mono mb-4">
              {activeConstellation.role}
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-serif mb-5">
              {activeConstellation.fieldNote}
            </p>

            {/* Core Primitives Checklist */}
            <div className="border-t border-white/5 pt-3">
              <span className="text-[9px] font-mono uppercase text-slate-400 tracking-wider block mb-2">
                CORE TECHNICAL PRIMITIVES
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeConstellation.primitives.map((prim) => (
                  <span
                    key={prim}
                    className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-amber-200"
                  >
                    {prim}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-400">
            <span>TOPOLOGY: {activeConstellation.stars.length} VERIFIED NODES</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>DETERMINISTIC</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
