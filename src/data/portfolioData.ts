export interface ArchiveProject {
  id: string;
  frameNumber: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  focalLength: string;
  exposure: string;
  aspectRatio: string;
  what: string;
  why: string;
  how: string;
  architecture: string[];
  technologies: string[];
  github?: string;
  link?: string;
  verificationEvidence?: string[];
}

export interface ArchiveSkillLayer {
  id: string;
  level: number;
  title: string;
  codeName: string;
  layerTag: string;
  summary: string;
  components: { name: string; detail: string; status: 'Operational' | 'Active' | 'Core' }[];
  commandSample: string;
}

export interface ArchiveTrack {
  id: string;
  title: string;
  artist: string;
  theme: string;
  src: string;
}

export interface ArchiveScene {
  id: string;
  sceneNumber: string;
  focalDistance: string;
  aperture: string;
  shutter: string;
  title: string;
  subtitle: string;
  theme: 'space' | 'signal' | 'observer' | 'engineer' | 'systems' | 'projects' | 'archive' | 'contact';
}

export const ARCHIVE_DATA = {
  curator: {
    name: "Om Deshmukh",
    title: "DevOps Engineer & Cloud Architect",
    tagline: "I explore things, understand how they work, and build systems.",
    coordinates: "20.7002° N, 77.0082° E",
    baseLocation: "Akola, Maharashtra, India",
    email: "omdeshmukh2907@gmail.com",
    phone: "+91 9922669212",
    github: "https://github.com/OmDeshmukhgit",
    linkedin: "https://www.linkedin.com/in/om-deshmukh-1376b4328",
    instagram: "https://www.instagram.com/omdeshmukh863/profilecard/?igsh=N2VjYXcwaTA1anpk",
    resume: "https://drive.google.com/file/d/10J2QLab0FdeDyPdZ1_JVFil8dZkZ2KCR/view?usp=drive_link",
  },

  pillars: [
    {
      symbol: "✦",
      name: "Space",
      role: "Exploration",
      description: "Looking outward into uncharted territories, boundless curiosity, astronomical scale, and understanding infinite systems.",
    },
    {
      symbol: "◎",
      name: "Photography",
      role: "Observation",
      description: "Freezing light into frames, studying grain and texture, paying meticulous attention to subtle details often overlooked.",
    },
    {
      symbol: "▤",
      name: "Cinema",
      role: "Storytelling",
      description: "Transitions, rhythm, framing, pacing, and translating raw technical machinery into compelling human narratives.",
    },
    {
      symbol: "♪",
      name: "Music",
      role: "Emotion",
      description: "Atmosphere, resonance, mathematical harmony, and soundscapes that give life to silent digital spaces.",
    },
    {
      symbol: "⚡",
      name: "Engineering",
      role: "Architecture",
      description: "The discipline of tangible construction — orchestrating containers, provisioning cloud fabrics, and engineering fault-tolerant pipelines.",
    },
  ],

  scenes: [
    {
      id: "deep-space",
      sceneNumber: "SCENE 01",
      focalDistance: "∞ (Infinity)",
      aperture: "f/1.2",
      shutter: "1/60s",
      title: "The Cosmic Lens",
      subtitle: "Where observation begins in absolute quiet.",
      theme: "space",
    },
    {
      id: "signal",
      sceneNumber: "SCENE 02",
      focalDistance: "200mm",
      aperture: "f/2.8",
      shutter: "1/125s",
      title: "Signal & Frequency",
      subtitle: "Before we build, we listen to transmissions across the wire.",
      theme: "signal",
    },
    {
      id: "observer",
      sceneNumber: "SCENE 03",
      focalDistance: "85mm",
      aperture: "f/1.4",
      shutter: "1/250s",
      title: "The Observer",
      subtitle: "Curating moments, studying structures, breaking and rebuilding.",
      theme: "observer",
    },
    {
      id: "engineer",
      sceneNumber: "SCENE 04",
      focalDistance: "50mm",
      aperture: "f/2.0",
      shutter: "1/500s",
      title: "The Transition to Architecture",
      subtitle: "From capturing frames of light to assembling systems of steel and code.",
      theme: "engineer",
    },
    {
      id: "systems",
      sceneNumber: "SCENE 05",
      focalDistance: "35mm",
      aperture: "f/4.0",
      shutter: "1/1000s",
      title: "Infrastructure & Systems Architecture",
      subtitle: "How the machinery connects: Cloud, Containers, Pipelines, and Kernel.",
      theme: "systems",
    },
    {
      id: "projects",
      sceneNumber: "SCENE 06",
      focalDistance: "28mm",
      aperture: "f/5.6",
      shutter: "1/1000s",
      title: "Captured Frames (Projects)",
      subtitle: "Living records of deployed systems, clusters, and architectures.",
      theme: "projects",
    },
    {
      id: "archive-reflections",
      sceneNumber: "SCENE 07",
      focalDistance: "50mm",
      aperture: "f/1.8",
      shutter: "1/250s",
      title: "The Archive & Reflections",
      subtitle: "Cinema, soundtrack theory, academic foundation at Government College of Engineering, Yavatmal, and personal craft.",
      theme: "archive",
    },
    {
      id: "contact",
      sceneNumber: "SCENE 08",
      focalDistance: "24mm",
      aperture: "f/1.4",
      shutter: "1/125s",
      title: "Final Frame: Dispatch Transmission",
      subtitle: "The archive remains open. Let us build the next system together.",
      theme: "contact",
    },
  ] as ArchiveScene[],

  about: {
    curatorNote:
      "I am a Computer Engineering graduate driven by an insatiable curiosity for how modern distributed architectures operate behind the curtain.",
    philosophy:
      "For me, DevOps is neither a checklist of tools nor a set of commands. It is the architectural art of understanding how distributed components speak, how networks fail, and how to engineer systems that self-heal under pressure.",
    story:
      "My path commenced with web development and organically gravitated toward the foundational bedrock of computing: Linux internals, networking topologies, container orchestration, and immutable cloud infrastructure as code. I take pride in guiding an application from its very first commit into a hardened, highly available production cluster.",
    education: {
      degree: "Bachelor of Technology in Computer Engineering",
      institution: "Government College of Engineering, Yavatmal",
      focus: "Cloud Computing, Operating Systems, Computer Networks & Software Architecture",
      status: "Graduated",
    },
    portraits: [
      {
        src: "/archive/A3.png",
        caption: "FRAME #01 · Portrait of the Engineer",
        meta: "35mm · Natural Light · Observational Stance",
      },
      {
        src: "/archive/A5.jpg",
        caption: "FRAME #02 · Atmospheric Perspective",
        meta: "50mm · Low Angle · Composition Study",
      },
    ],
  },

  skillsLayers: [
    {
      id: "cloud-iac",
      level: 1,
      title: "Cloud Fabric & Infrastructure as Code",
      codeName: "LAYER_01_FABRIC",
      layerTag: "AWS & TERRAFORM",
      summary:
        "Provisioning immutable, modular, and fault-tolerant infrastructure topologies on AWS using declarative Terraform code.",
      components: [
        { name: "AWS EC2 & Multi-AZ VPC", detail: "Isolated subnets, NAT gateways, route tables, security groups", status: "Operational" },
        { name: "Terraform (IaC)", detail: "Modular multi-environment architecture with remote state locking in S3", status: "Core" },
        { name: "AWS S3, IAM & RDS", detail: "Least-privilege policies, bucket versioning, managed relational DBs", status: "Operational" },
        { name: "Cloud Networking", detail: "VPC Peering, DNS routing via Route 53, reverse proxying", status: "Active" },
      ],
      commandSample: "terraform plan -out=tfplan.binary && terraform apply tfplan.binary",
    },
    {
      id: "containers-orchestration",
      level: 2,
      title: "Containers & Cluster Orchestration",
      codeName: "LAYER_02_CONTAINERS",
      layerTag: "DOCKER & KUBERNETES",
      summary:
        "Packaging microservices into lean container images and orchestrating self-healing production workloads across Kubernetes clusters.",
      components: [
        { name: "Docker & Containerization", detail: "Multi-stage builds, minimal base images, Docker Compose", status: "Core" },
        { name: "Kubernetes (K8s)", detail: "Deployments, ReplicaSets, Services, Ingress, Persistent Volumes", status: "Operational" },
        { name: "Helm Templating", detail: "Versioned charts, declarative value overrides for environments", status: "Active" },
        { name: "Cluster Observability", detail: "Liveness and readiness probes, horizontal pod autoscaling", status: "Operational" },
      ],
      commandSample: "kubectl get pods -n production -o wide --watch",
    },
    {
      id: "cicd-delivery",
      level: 3,
      title: "CI/CD & Delivery Pipelines",
      codeName: "LAYER_03_PIPELINES",
      layerTag: "JENKINS & GITHUB ACTIONS",
      summary:
        "Automating build, test, container packaging, and deployment cycles from Git commits to live cluster targets.",
      components: [
        { name: "Jenkins CI/CD", detail: "Declarative Groovy pipelines, webhook triggers, credential binding", status: "Core" },
        { name: "GitHub Actions", detail: "Continuous integration workflows, linting, matrix testing", status: "Operational" },
        { name: "Git Version Control", detail: "Trunk-based development, semantic branch tagging, merge hygiene", status: "Core" },
        { name: "Artifact Registries", detail: "Automated Docker Hub & private registry pushing and versioning", status: "Active" },
      ],
      commandSample: "stage('Deploy to K8s') { sh 'kubectl apply -f k8s/production/' }",
    },
    {
      id: "systems-core",
      level: 4,
      title: "Linux Kernel, Automation & Full-Stack",
      codeName: "LAYER_04_FOUNDATIONS",
      layerTag: "LINUX, PYTHON, REACT",
      summary:
        "Deep foundation in operating system internals, Bash automation scripts, Python systems programming, and modern interfaces.",
      components: [
        { name: "Linux & Bash Scripting", detail: "Systemd service units, cron scheduling, process & kernel tuning", status: "Core" },
        { name: "Python", detail: "Automation scripting, PyTorch machine learning models, Streamlit apps", status: "Active" },
        { name: "Node.js & Express", detail: "REST APIs, WebSocket gateways (Socket.IO), JWT auth", status: "Operational" },
        { name: "Databases & Storage", detail: "MySQL, PostgreSQL, MongoDB document stores", status: "Operational" },
        { name: "React & Tailwind CSS", detail: "High-performance responsive frontends and cinematic interfaces", status: "Active" },
      ],
      commandSample: "#!/usr/bin/env bash\nset -euo pipefail\necho '[KERNEL] Audit OK'",
    },
  ] as ArchiveSkillLayer[],

  projects: [
    {
      id: "aws-terraform",
      frameNumber: "FRAME 001",
      title: "AWS Production Infrastructure",
      subtitle: "Automated Multi-Environment Cloud Architecture",
      category: "Cloud Engineering / Infrastructure as Code",
      image: "/archive/aws.png",
      focalLength: "24mm f/2.8",
      exposure: "1/500s · ISO 100",
      aspectRatio: "16:9 Cinema",
      what: "A production-grade cloud topology on Amazon Web Services provisioned entirely through declarative, modular Terraform code.",
      why: "Manual cloud provisioning introduces configuration drift, security vulnerabilities, and reproducibility failures. This project proves how an entire multi-tier architecture can be stood up or torn down repeatably in minutes.",
      how: "Architected 4 modular Terraform components (VPC, Security Groups, EC2 compute nodes, S3 storage). Configured remote state locking with S3 and DynamoDB to safeguard concurrent infrastructure changes.",
      architecture: [
        "4 Reusable Terraform Modules",
        "Multi-AZ Custom VPC with Public & Private Subnets",
        "Bastion Host for Secure Ingress",
        "Automated S3 Remote State Locking",
        "Security Groups with Least-Privilege Rules",
        "27 Total Coordinated Cloud Resources",
      ],
      technologies: ["Terraform", "AWS", "VPC", "EC2", "S3", "Security Groups", "Linux", "Bash"],
      github: "https://github.com/OmDeshmukhgit/aws-terraform-project",
      verificationEvidence: ["Source Repository", "Terraform / Infrastructure as Code", "AWS Multi-AZ VPC"],
    },
    {
      id: "pokedex",
      frameNumber: "FRAME 002",
      title: "Pokedex Cloud Platform",
      subtitle: "Containerized Microservice & CI/CD Deployment",
      category: "DevOps / Container Orchestration",
      image: "/archive/Pokedex.png",
      focalLength: "35mm f/1.8",
      exposure: "1/250s · ISO 200",
      aspectRatio: "16:9 Cinema",
      what: "A full-stack MERN Pokémon discovery web application containerized and deployed using modern DevOps workflows.",
      why: "To bridge modern responsive frontend experiences with industrial-grade container deployment pipelines, automated testing, and self-healing cluster pods.",
      how: "Containerized frontend and backend into multi-stage Docker images. Configured a Jenkins declarative pipeline triggered upon Git push, automatically building, testing, and pushing container images before rolling out to Kubernetes clusters.",
      architecture: [
        "MERN Microservice Stack",
        "Multi-Stage Docker Builds",
        "Jenkins Declarative Pipeline",
        "Kubernetes Deployments & Cluster Services",
        "MongoDB Persistent Volume Integration",
      ],
      technologies: ["Docker", "Kubernetes", "Jenkins", "React", "Node.js", "MongoDB", "Git"],
      github: "https://github.com/OmDeshmukhgit/Pokedex",
      link: "https://pokedexorion.netlify.app/",
      verificationEvidence: ["Live Demo", "Source Repository", "Docker & Kubernetes", "CI/CD Pipeline"],
    },
    {
      id: "chatty",
      frameNumber: "FRAME 003",
      title: "Chatty: Global Real-Time Network",
      subtitle: "High-Concurrency WebSocket Communication Service",
      category: "Distributed Systems / Real-Time Communication",
      image: "/archive/chatty.png",
      focalLength: "50mm f/1.4",
      exposure: "1/125s · ISO 400",
      aspectRatio: "16:9 Cinema",
      what: "A production-ready global chat application delivering low-latency bidirectional messaging with cryptographic JWT authentication.",
      why: "Real-time communication demands connection resilience, state synchronization, and scalable server instances capable of maintaining persistent socket pools.",
      how: "Constructed on Socket.IO and Node.js with secure auth tokens, packaged into Docker containers, and orchestrated with Kubernetes to provide zero-downtime rolling upgrades and automated container recovery.",
      architecture: [
        "Bidirectional WebSocket Sockets via Socket.IO",
        "JWT Token-Based Authentication",
        "Dockerized API & Socket Gateway",
        "Kubernetes Load Balancing & Ingress",
        "Resilient Connection Reconnect Logic",
      ],
      technologies: ["Socket.IO", "Node.js", "Express", "Docker", "Kubernetes", "React", "JWT"],
      github: "https://github.com/OmDeshmukhgit/full-stack-chatapp",
      link: "http://orionchat.duckdns.org/",
      verificationEvidence: ["Live Demo", "Source Repository", "Kubernetes Ingress", "JWT Authentication"],
    },
    {
      id: "plantest",
      frameNumber: "FRAME 004",
      title: "Plantest AI Diagnostic Laboratory",
      subtitle: "Machine Learning Leaf Pathology Platform",
      category: "Machine Learning / Cloud Deployment",
      image: "/archive/Plantest.png",
      focalLength: "85mm f/1.4",
      exposure: "1/1000s · ISO 100",
      aspectRatio: "16:9 Cinema",
      what: "A multilingual machine learning diagnostic application that analyzes uploaded crop leaf photographs to classify plant diseases accurately.",
      why: "Empowering agricultural observation by transforming high-resolution deep learning computer vision into an instantly accessible web utility for farmers.",
      how: "Built using PyTorch convolutional neural networks (CNNs), wrapped in a responsive Streamlit interface, and deployed on cloud infrastructure for real-time model inference.",
      architecture: [
        "PyTorch CNN Image Classification Engine",
        "Streamlit Reactive Web Interface",
        "Multilingual Translation Layer",
        "Cloud-Hosted Real-Time Inference Container",
      ],
      technologies: ["PyTorch", "Python", "Computer Vision", "Streamlit", "Deep Learning", "Docker"],
      github: "https://github.com/OmDeshmukhgit/plant_test",
      link: "https://planttest-r4ktyr7hnshg7zgpb777m3.streamlit.app/",
      verificationEvidence: ["Live Demo", "Source Repository", "PyTorch CNN Model", "Streamlit Cloud"],
    },
    {
      id: "url-shortener",
      frameNumber: "FRAME 005",
      title: "URL Shortener & Microservices",
      subtitle: "High-Throughput Link Redirection Engine",
      category: "Backend / Microservices",
      image: "/archive/URL-shortner.png",
      focalLength: "50mm f/2.0",
      exposure: "1/500s · ISO 100",
      aspectRatio: "16:9 Cinema",
      what: "A lightweight link redirection engine focused on rapid hash generation, low-latency redirection, and click analytics tracking.",
      why: "Demonstrating clean URL hashing algorithms, database indexing, and lean HTTP redirect overhead.",
      how: "Constructed using Node.js, Express, and MongoDB, with automated indexing on short hashes to ensure sub-millisecond route dispatching.",
      architecture: [
        "Base62 / Cryptographic Short Hash Generation",
        "Indexed Database Lookup for Instant Redirects",
        "Click Analytics & Referrer Logging",
      ],
      technologies: ["Node.js", "Express", "MongoDB", "JavaScript", "REST APIs"],
      github: "https://github.com/OmDeshmukhgit/Url-shortener",
      link: "https://url-shortener-orion.netlify.app/",
      verificationEvidence: ["Live Demo", "Source Repository", "Node.js REST API", "MongoDB Indexing"],
    },
  ] as ArchiveProject[],

  soundtracks: [
    {
      id: "track-1",
      title: "Cornfield Chase (Interstellar)",
      artist: "Hans Zimmer",
      theme: "Space & Gravitational Acceleration",
      src: "/music/Interstellar Official Soundtrack  Cornfield Chase  Hans Zimmer  WaterTower.mp3",
    },
    {
      id: "track-2",
      title: "Solace",
      artist: "Archive Ambient",
      theme: "Atmospheric Quiet & Cosmic Radiance",
      src: "/music/solace-128-ytshorts.savetube.me.mp3",
    },
    {
      id: "track-3",
      title: "Golden Brown",
      artist: "The Stranglers (Slowed + Reverb)",
      theme: "Warm Photographic Grain & Reflection",
      src: "/music/Golden Brown - The Stranglers (slowed + reverb) - etherealnightcore.mp3",
    },
    {
      id: "track-4",
      title: "Experience",
      artist: "Ludovico Einaudi",
      theme: "Cinematic Crescendo & Systems Symphony",
      src: "/music/Ludovico Einaudi - Experience (Official Visualizer).mp3",
    },
    {
      id: "track-5",
      title: "Brighter Days",
      artist: "Gabriel Albuquerque",
      theme: "Dawn Light & Horizon Exploration",
      src: "/music/Brighter Days (Slowed + Reverb) - Gabriel Albuquerque.mp3",
    },
  ] as ArchiveTrack[],
};
