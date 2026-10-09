'use client';

import React from 'react';
import {
  Cloud,
  Box,
  Layers,
  Workflow,
  Cpu,
  Database,
  Globe,
  Radio,
  GitBranch,
  Terminal,
  Activity,
  Package,
} from 'lucide-react';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Amazon Web Services (AWS) Vector Icon
 */
export function AwsIcon({ className = 'w-4 h-4', style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.75 14.2c-.3-.2-.7-.1-.9.2-.5.8-1.5 1.5-2.6 1.5-1.4 0-2.3-.9-2.3-2.3 0-1.4.9-2.3 2.3-2.3 1 0 1.9.6 2.4 1.4.2.3.6.4.9.2l1.2-.8c.2-.2.3-.5.1-.8-.9-1.5-2.6-2.5-4.6-2.5-3 0-5.1 2.1-5.1 5s2.1 5 5.1 5c2.1 0 3.8-1.1 4.7-2.7.2-.3.1-.7-.1-.9l-1.2-.8zM7.1 11.2c.2-.7.8-1.2 1.6-1.2.9 0 1.5.5 1.7 1.2H7.1zm3.9 1.4c0-.2 0-.3-.1-.5-.3-1.6-1.7-2.7-3.4-2.7-1.9 0-3.5 1.4-3.5 3.5 0 2 1.5 3.5 3.6 3.5 1.2 0 2.2-.5 2.9-1.3.2-.2.2-.5 0-.7l-.9-.9c-.2-.2-.5-.2-.7 0-.4.5-1 .8-1.6.8-1 0-1.8-.6-2-1.6h5.4c.2 0 .3-.1.3-.1zm12.3 5.9c-4.4 2.7-9.8 2.7-14.2.1-.4-.2-.8.2-.5.6 4.1 2.9 9.8 3 14.5.3.5-.3.5-.9.2-1zm.7-1.5c-.3-.4-1.6-.2-2.3.1-.2.1-.2.3-.1.5.7 1 1.7 1.8 2.1 1.5.3-.2.4-1.3.3-2.1z" />
    </svg>
  );
}

/**
 * HashiCorp Terraform Vector Icon
 */
export function TerraformIcon({ className = 'w-4 h-4', style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
      <path d="M1.44 0v7.575l6.561 3.79V3.787zm7.933 4.58v7.574l6.563 3.79V8.37zm0 9.16v7.574l6.563 3.79v-7.575zm7.933-4.58v7.575L23.867 13V5.424z" />
    </svg>
  );
}

/**
 * Docker Containerization Vector Icon
 */
export function DockerIcon({ className = 'w-4 h-4', style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.186.185.186zm0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186zm-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186zm-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.186.186.186zm5.893 2.714h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185zm-2.929 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185zm-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H5.136a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185zm-2.928 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H2.208a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185M23.977 12.11c-.13-.09-.99-.54-2.3-.4-.61-.92-1.52-1.51-2.43-1.63-.09-.01-.17-.02-.26-.02-.09 0-.17.03-.24.08-.2.15-.34.36-.42.6-.08.24-.07.49.03.73.08.18.2.34.35.46-.38.56-.57 1.25-.56 1.95 0 .23.02.46.06.69H1.12c-.22 0-.41.13-.5.33-.08.2-.05.43.09.6 1.48 1.92 3.65 3.32 6.13 3.96 1.2.31 2.45.47 3.7.47 6.17 0 11.45-3.83 13.1-9.28.18-.08.35-.18.49-.3.2-.18.29-.42.23-.66-.06-.23-.23-.42-.39-.53z" />
    </svg>
  );
}

/**
 * Kubernetes (K8s) Cluster Orchestration Vector Icon
 */
export function KubernetesIcon({ className = 'w-4 h-4', style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0l10.4 6v12L12 24 1.6 18V6L12 0zm0 2.2l-8.5 4.9v9.8l8.5 4.9 8.5-4.9V7.1L12 2.2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 1.8a3.2 3.2 0 110 6.4 3.2 3.2 0 010-6.4zm-.8 2.2h1.6v2.4h-1.6v-2.4z" />
    </svg>
  );
}

/**
 * Helm Package Manager Vector Icon
 */
export function HelmIcon({ className = 'w-4 h-4', style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.5a9.5 9.5 0 100 19 9.5 9.5 0 000-19zm0 2c4.1 0 7.5 3.4 7.5 7.5 0 1.8-.7 3.5-1.8 4.8l-1.5-1.5c.5-.9.8-1.9.8-3.3a5 5 0 00-4-4.9v-2.1c-.3-.3-.7-.5-1-.5zm-2 0v2.1c-2.3.5-4 2.6-4 4.9 0 1.4.5 2.6 1.3 3.5L5.8 16.5C4.7 15.2 4 13.7 4 12c0-4.1 3.4-7.5 7.5-7.5h.5zm2 5.5a2 2 0 110 4 2 2 0 010-4zm0 6c1.5 0 2.8-.6 3.7-1.6l1.6 1.6c-1.3 1.3-3.2 2-5.3 2-2.1 0-3.9-.8-5.3-2l1.6-1.6c.9 1 2.2 1.6 3.7 1.6z" />
    </svg>
  );
}

/**
 * Jenkins CI/CD Vector Icon
 */
export function JenkinsIcon({ className = 'w-4 h-4', style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.4z" />
    </svg>
  );
}

/**
 * GitHub Actions Vector Icon
 */
export function GitHubActionsIcon({ className = 'w-4 h-4', style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.419 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.53 1.03 1.53 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

/**
 * Git Version Control Vector Icon
 */
export function GitIcon({ className = 'w-4 h-4', style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.6 10.9l-9.5-9.5c-.5-.5-1.4-.5-1.9 0L9.9 3.7l2.8 2.8c.6-.2 1.3 0 1.7.5.5.5.6 1.2.4 1.8l2.7 2.7c.6-.2 1.3 0 1.8.4.8.8.8 2 0 2.8s-2 .8-2.8 0c-.5-.5-.6-1.3-.4-1.9L13.4 9.1v5.7c.2.2.4.4.5.7.8.8.8 2 0 2.8s-2 .8-2.8 0c-.8-.8-.8-2 0-2.8.2-.2.5-.4.8-.5V9c-.3-.1-.6-.3-.8-.5-.5-.5-.6-1.2-.4-1.8L7.9 3.9.4 11.4c-.5.5-.5 1.4 0 1.9l9.5 9.5c.5.5 1.4.5 1.9 0l11.8-11.8c.5-.6.5-1.5 0-2.1z" />
    </svg>
  );
}

/**
 * Linux Kernel Vector Icon
 */
export function LinuxIcon({ className = 'w-4 h-4', style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.012 0c-3.418 0-5.18 1.968-5.18 4.78 0 1.22.42 2.65 1.05 3.8-.5.72-1.12 1.7-1.12 2.89 0 2.5 1.83 4.67 4.13 5.43-.88.94-1.39 2.05-1.39 3.25 0 .28.03.55.08.82C8.63 21.43 7.02 22 5.5 22c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5c2.76 0 5.2-1.02 6.51-2.67 1.31 1.65 3.75 2.67 6.51 2.67.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5c-1.52 0-3.13-.57-4.08-1.03.05-.27.08-.54.08-.82 0-1.2-.51-2.31-1.39-3.25 2.3-.76 4.13-2.93 4.13-5.43 0-1.19-.62-2.17-1.12-2.89.63-1.15 1.05-2.58 1.05-3.8C17.19 1.968 15.43 0 12.012 0zm-1.8 4.8c.45 0 .8.35.8.8s-.35.8-.8.8-.8-.35-.8-.8.35-.8.8-.8zm3.6 0c.45 0 .8.35.8.8s-.35.8-.8.8-.8-.35-.8-.8.35-.8.8-.8z" />
    </svg>
  );
}

/**
 * Python Systems & Automation Vector Icon
 */
export function PythonIcon({ className = 'w-4 h-4', style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.9 0C5.3 0 5.7 2.9 5.7 2.9l.01 3h6.3v.9H3.7S0 6.3 0 12.9c0 6.5 3.3 6.3 3.3 6.3h2v-2.8s-.1-3.3 3.3-3.3h5.7s3.2.1 3.2-3.1V3.2S18.5 0 11.9 0zm-3.5 1.8c.6 0 1.1.5 1.1 1.1s-.5 1.1-1.1 1.1-1.1-.5-1.1-1.1.5-1.1 1.1-1.1zm3.7 22.2c6.6 0 6.2-2.9 6.2-2.9l-.01-3h-6.3v-.9h8.3s3.7.5 3.7-6.1c0-6.5-3.3-6.3-3.3-6.3h-2v2.8s.1 3.3-3.3 3.3H9.4s-3.2-.1-3.2 3.1v6.8s-1 3.2 5.6 3.2zm3.5-1.8c-.6 0-1.1-.5-1.1-1.1s.5-1.1 1.1-1.1 1.1.5 1.1 1.1-.5 1.1-1.1 1.1z" />
    </svg>
  );
}

/**
 * Node.js Runtime Vector Icon
 */
export function NodeIcon({ className = 'w-4 h-4', style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0l10.4 6v12L12 24 1.6 18V6L12 0zm0 2.5L3.8 7.2v9.6L12 21.5l8.2-4.7V7.2L12 2.5zm0 4.2l5.5 3.2v6.4L12 19.5l-5.5-3.2V9.9L12 6.7z" />
    </svg>
  );
}

/**
 * React Vector Icon
 */
export function ReactIcon({ className = 'w-4 h-4', style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="2" />
      <g fill="none" stroke="currentColor" strokeWidth="1.2">
        <ellipse cx="12" cy="12" rx="10" ry="3.8" />
        <ellipse cx="12" cy="12" rx="10" ry="3.8" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="3.8" transform="rotate(120 12 12)" />
      </g>
    </svg>
  );
}

/**
 * Database & Persistent Volumes Vector Icon
 */
export function DatabaseIcon({ className = 'w-4 h-4', style }: IconProps) {
  return <Database className={className} style={style} />;
}

/**
 * Cloud Networking & VPC Vector Icon
 */
export function NetworkingIcon({ className = 'w-4 h-4', style }: IconProps) {
  return <Globe className={className} style={style} />;
}

/**
 * Cluster Telemetry & Observability Vector Icon
 */
export function ObservabilityIcon({ className = 'w-4 h-4', style }: IconProps) {
  return <Activity className={className} style={style} />;
}

/**
 * Artifact Registry Vector Icon
 */
export function RegistryIcon({ className = 'w-4 h-4', style }: IconProps) {
  return <Package className={className} style={style} />;
}

/**
 * Unified Component mapping skill name or key to authentic visual icon
 */
export function SkillIcon({
  name,
  className = 'w-4 h-4',
}: {
  name: string;
  className?: string;
}) {
  const normalized = name.toLowerCase();

  // AWS & Cloud Fabric
  if (normalized.includes('aws') || normalized.includes('ec2') || normalized.includes('s3') || normalized.includes('iam')) {
    return <AwsIcon className={className} />;
  }

  // Terraform
  if (normalized.includes('terraform')) {
    return <TerraformIcon className={className} />;
  }

  // Docker
  if (normalized.includes('docker')) {
    return <DockerIcon className={className} />;
  }

  // Kubernetes
  if (normalized.includes('kubernetes') || normalized.includes('k8s')) {
    return <KubernetesIcon className={className} />;
  }

  // Helm
  if (normalized.includes('helm')) {
    return <HelmIcon className={className} />;
  }

  // Jenkins
  if (normalized.includes('jenkins')) {
    return <JenkinsIcon className={className} />;
  }

  // GitHub Actions
  if (normalized.includes('github') || normalized.includes('actions')) {
    return <GitHubActionsIcon className={className} />;
  }

  // Git Version Control
  if (normalized.includes('git') || normalized.includes('version control')) {
    return <GitIcon className={className} />;
  }

  // Linux & Bash
  if (normalized.includes('linux') || normalized.includes('bash') || normalized.includes('kernel') || normalized.includes('shell')) {
    return <LinuxIcon className={className} />;
  }

  // Python & Machine Learning
  if (normalized.includes('python') || normalized.includes('pytorch') || normalized.includes('streamlit') || normalized.includes('learning') || normalized.includes('vision')) {
    return <PythonIcon className={className} />;
  }

  // Node & Express & Web Development
  if (normalized.includes('node') || normalized.includes('express') || normalized.includes('javascript') || normalized.includes('rest')) {
    return <NodeIcon className={className} />;
  }

  // Databases & Storage
  if (normalized.includes('database') || normalized.includes('mongo') || normalized.includes('postgres') || normalized.includes('sql') || normalized.includes('rds')) {
    return <DatabaseIcon className={className} />;
  }

  // React & Tailwind CSS
  if (normalized.includes('react') || normalized.includes('tailwind') || normalized.includes('frontend')) {
    return <ReactIcon className={className} />;
  }

  // Cloud Networking & Security
  if (normalized.includes('network') || normalized.includes('vpc') || normalized.includes('dns') || normalized.includes('route 53') || normalized.includes('security') || normalized.includes('socket') || normalized.includes('jwt')) {
    return <NetworkingIcon className={className} />;
  }

  // Observability & Telemetry
  if (normalized.includes('observability') || normalized.includes('monitoring') || normalized.includes('probe') || normalized.includes('metric')) {
    return <ObservabilityIcon className={className} />;
  }

  // Artifact Registries
  if (normalized.includes('artifact') || normalized.includes('registry') || normalized.includes('docker hub')) {
    return <RegistryIcon className={className} />;
  }

  // Fallback system icon
  return <Cpu className={className} />;
}

/**
 * Returns representative icon for each Architectural Layer
 */
export function LayerIcon({
  layerId,
  className = 'w-4 h-4',
}: {
  layerId: string;
  className?: string;
}) {
  switch (layerId) {
    case 'cloud-iac':
      return <Cloud className={className} />;
    case 'containers-orchestration':
      return <Box className={className} />;
    case 'cicd-delivery':
      return <Workflow className={className} />;
    case 'systems-core':
      return <Terminal className={className} />;
    default:
      return <Layers className={className} />;
  }
}
