# Portfolio 1: Comprehensive Audit & Technical Analysis

> **Document Type:** Reference & Audit Document  
> **Source Project:** `React/Portfolio1` (Untouched, Reference Only)  
> **Target Project:** `React/Portfolio2` (Next.js Rebuild)  
> **Date of Audit:** October 2026  
> **Audit Status:** Complete (Setup & Discovery Phase)

---

## 1. Existing Portfolio Structure

The existing portfolio (`Portfolio1`) is implemented as a single-page scrolling application. Sections are organized sequentially using `react-scroll` within `src/components/Applayout.jsx`:

1. **Header / Fixed Navigation Bar** (`Header.jsx`)
   - Fixed navigation header with glassmorphism backdrop blur (`backdrop-blur-[20px]`).
   - Brand title: `Om Web_Dev`.
   - Scroll links: `_Home`, `_About`, `_Projects`, `_Skills`.
2. **Hero Section** (`Home.jsx`)
   - Outer container with cosmic dark gradient (`#0f0f1a` to `#1c1c2b`).
   - Dynamic animated starfield (80 randomly positioned `div` elements with `animate-pulse`).
   - 3 colored blurred ambient glow orbs (representing glowing planets).
   - "Welcome to My Portfolio" banner badge.
   - Tagline: *"Exploring DevOps, Cloud Infrastructure, Automation & Creative Technology"*.
   - Center profile card containing avatar (`A3.png`), name (*Om Deshmukh*), subtitle, and 4 action buttons (LinkedIn, GitHub, Instagram, Resume download).
3. **About Section** (`About.jsx`)
   - Section header: "About Me" with rainbow animated gradient top border.
   - Profile avatar (`A3.png`) in card layout.
   - Bio intro narrative.
   - Subsection: **Background** (DevOps, Cloud, Computer Engineering education, CI/CD).
   - Subsection: **Interests** (Tinkering, system architecture, resilience engineering).
   - Triggered on scroll via `IntersectionObserver`.
4. **Projects Section** (`Projects.jsx` & `cards/ProjectCard.jsx`)
   - Section header: "Projects".
   - 2-column responsive grid displaying 4 featured projects (`projectsData.js`).
   - Each card features: thumbnail preview, title, link, description, cyan accent line on hover, and slide-up animation.
5. **Skills Section** (`Skills.jsx`, `cards/SkillCard.jsx`, & `cards/ProgressBar.jsx`)
   - Section header: "Skills" with rainbow animated accent divider.
   - 2-to-3 column responsive grid displaying 6 competency domains (`skillsData.js`).
   - Each card features: category icon + title, comprehensive tech stack list, and a custom animated progress bar with percentage indicator.
6. **Footer** (`Footer.jsx`)
   - Three-column footer layout:
     - **Quick Links**: Links to `home`, `about`, `projects`, `contact`.
     - **Contact Info**: Direct email link, phone link, geographic location.
     - **Follow Me**: Social icon buttons (Instagram, LinkedIn, GitHub) and copyright notice.

---

## 2. Content Inventory

All textual and data content present in `Portfolio1` was cataloged verbatim:

### Personal & Brand Identity
- **Full Name:** Om Deshmukh
- **Brand / Site Title:** Om Web_Dev
- **Primary Roles / Title:** DevOps Engineer | Cloud & Infrastructure | Automation & CI/CD
- **Headline / Intro:** *"Welcome to My Portfolio — Exploring DevOps, Cloud Infrastructure, Automation & Creative Technology"*

### About Information
- **Introductory Bio:**
  > *"I'm a Computer Engineering graduate with a passion for building, automating, and understanding how modern applications run behind the scenes. My journey started with web development and gradually evolved into DevOps, cloud infrastructure, containers, and automation."*
- **Background:**
  > *"With a foundation in computer engineering, I've worked with AWS, Terraform, Docker, Kubernetes, Jenkins, Linux, and Git while building projects around infrastructure, CI/CD, and application deployment. I enjoy taking an application from code to a working environment and understanding every layer along the way — from infrastructure and networking to containers and deployment."*
- **Interests & Philosophy:**
  > *"I enjoy experimenting with new technologies, breaking things, figuring out why they broke, and building them back better. For me, learning DevOps is less about memorizing tools and more about understanding how everything connects."*

### Education & Experience
- **Education:** Computer Engineering Graduate (Bachelor of Engineering in Computer Engineering).
- **Professional Experience:** Integrated into project descriptions and about narrative; currently lacks a structured timeline/work experience component.

### Competency & Skill Domains (from `skillsData.js`)
1. **Frontend Development** (`value: 90%`, label: `Frontend`)
   - *Title:* 🖥️ Frontend Development
   - *Description:* *"Building responsive interfaces with modern web technologies and hands‑on programming in Python. HTML • CSS • Tailwind CSS • JavaScript • React."*
2. **Database Management** (`value: 85%`, label: `Database`)
   - *Title:* 🗄️ Database Management
   - *Description:* *"Working with application data using relational and NoSQL database technologies. MySQL • MongoDB • SQL • PostgreSQL"*
3. **Backend Development** (`value: 80%`, label: `Backend`)
   - *Title:* ⚡ Backend Development
   - *Description:* *"Developing APIs and server-side applications with Node.js and Express. Node.js • Express • REST APIs • Postman • JWT • Authentication & Authorization"*
4. **Cloud & AWS** (`value: 90%`, label: `Cloud Engineering`)
   - *Title:* ☁️ Cloud & AWS
   - *Description:* *"Build and manage scalable cloud environments using AWS services and Infrastructure as Code. Terraform • Linux • AWS • EC2 • VPC • IAM • S3 • RDS • EKS • ECS"*
5. **Containers & Kubernetes** (`value: 90%`, label: `Containers`)
   - *Title:* 🐳 Containers & Kubernetes
   - *Description:* *"Containerize applications and orchestrate workloads with production-style deployment practices. Docker • Kubernetes • Helm • Ingress"*
6. **CI/CD & Automation** (`value: 88%`, label: `Automation`)
   - *Title:* ⚙️ CI/CD & Automation
   - *Description:* *"Automate builds, testing, and deployments with modern DevOps workflows. Jenkins • Terraform • Git • Bash • GitHub • Pipelines • CI/CD • Plugins"*

### Contact Information
- **Email:** `omdeshmukh2907@gmail.com` (`mailto:omdeshmukh2907@gmail.com`)
- **Phone:** `+91 9922669212` (`tel:+919922669212`)
- **Location:** Akola, Maharashtra, India

### Social & External Links
- **GitHub Profile:** [https://github.com/OmDeshmukhgit](https://github.com/OmDeshmukhgit)
- **LinkedIn Profile:** [https://www.linkedin.com/in/om-deshmukh-1376b4328](https://www.linkedin.com/in/om-deshmukh-1376b4328)
- **Instagram Profile:** [https://www.instagram.com/omdeshmukh863/profilecard/?igsh=N2VjYXcwaTA1anpk](https://www.instagram.com/omdeshmukh863/profilecard/?igsh=N2VjYXcwaTA1anpk)
- **Resume URL (Google Drive):** [https://drive.google.com/file/d/13YgD1L-2fm34ULE3aaF6QM4ixO2VzoSn/view?usp=drive_link](https://drive.google.com/file/d/13YgD1L-2fm34ULE3aaF6QM4ixO2VzoSn/view?usp=drive_link)
- **Deployed Portfolio URL:** [https://omwebdev.netlify.app/](https://omwebdev.netlify.app/)
- **Old Portfolio GitHub Repo:** [https://github.com/OmDeshmukhgit/Om-Web_Dev-Portfolio.git](https://github.com/OmDeshmukhgit/Om-Web_Dev-Portfolio.git)

---

## 3. Project Inventory

### Featured Projects in `Portfolio1`

| Project Name | Description | Technologies Mentioned | Live URL | GitHub / Source Code URL | Screenshot / Media Asset |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Pokedex** | Comprehensive MERN Pokémon app with intuitive card‑based search, deployed using Docker, Jenkins CI/CD, and Kubernetes for scalable production. | MERN (MongoDB, Express, React, Node.js), Docker, Jenkins CI/CD, Kubernetes | [https://pokedexorion.netlify.app/](https://pokedexorion.netlify.app/) | Not linked in card | `Pokedex.png` (13.6 KB) |
| **Chatty: Global Chat-App** | Production‑ready MERN chat app with secure auth, real‑time messaging via Socket.IO, and scalable deployment using Docker & Kubernetes. | MERN Stack, Socket.IO, JWT Auth, Docker, Kubernetes | [http://orionchat.duckdns.org/](http://orionchat.duckdns.org/) | Not linked in card | `chatty.png` (59.8 KB) |
| **Aws-Terraform-Project** | Production‑ready AWS infrastructure with 4 Terraform modules (VPC, SG, EC2, S3), multi‑environment support, and secure automation deploying 27 resources. | AWS (VPC, Security Groups, EC2, S3), Terraform Modules, Multi-environment, IaC | None | [https://github.com/OmDeshmukhgit/aws-terraform-project](https://github.com/OmDeshmukhgit/aws-terraform-project) | `aws.png` (1.26 MB) |
| **Plantest** | A responsive multilingual web app built with Streamlit and PyTorch to diagnose plant leaf diseases from uploaded images. Transitioned from desktop to hosted platform. | Python, Streamlit, PyTorch, Deep Learning, Computer Vision | [https://planttest-r4ktyr7hnshg7zgpb777m3.streamlit.app/](https://planttest-r4ktyr7hnshg7zgpb777m3.streamlit.app/) | Not linked in card | `Plantest.png` (321.7 KB) |

### Additional Discovered (Unlisted) Projects in Workspace / Assets
- **URL Shortener:** Screenshot `URL-shortner.png` (218.6 KB) exists in `Portfolio1/public/`, indicating an unlisted URL Shortener application.
- **PixAI:** Screenshot `pixai.png` (541.2 KB) exists in `Portfolio1/public/` and a corresponding project folder `React/PixAI` exists in the local workspace directory.

---

## 4. Asset Inventory

All media files located in `React/Portfolio1/public` and `React/Portfolio1/src/assets` were inspected:

| Filename | Location | Size | Type | Purpose in Portfolio1 | Reusability Assessment |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `A3.png` | `public/A3.png` | 228.6 KB | PNG Image | Main profile headshot photo in Hero and About sections | **Reusable** (clean portrait of Om, but needs WebP conversion/optimization) |
| `A5.jpg` | `public/A5.jpg` | 531.3 KB | JPEG Image | Alternate personal portrait photo (unreferenced in current code) | **Reusable** (alternative headshot/portrait option) |
| `Pokedex.png` | `public/Pokedex.png` | 13.6 KB | PNG Image | Project thumbnail for the Pokedex project card | **Reusable** (authentic project screenshot) |
| `chatty.png` | `public/chatty.png` | 59.8 KB | PNG Image | Project thumbnail for Chatty project card | **Reusable** (authentic project screenshot) |
| `aws.png` | `public/aws.png` | 1,293.8 KB (1.26 MB) | PNG Image | AWS & Terraform architecture diagram visual | **Reusable** (crucial for DevOps credibility, but needs compression & WebP conversion) |
| `Plantest.png` | `public/Plantest.png` | 321.7 KB | PNG Image | Project thumbnail for Plantest Streamlit/PyTorch app | **Reusable** (authentic project screenshot) |
| `URL-shortner.png` | `public/URL-shortner.png` | 213.5 KB | PNG Image | Project thumbnail for URL Shortener app | **Optional** (can be showcased if project is added) |
| `pixai.png` | `public/pixai.png` | 528.6 KB | PNG Image | Project thumbnail for PixAI generative app | **Optional** (can be showcased if project is added) |
| `icon.png` | `public/icon.png` | 123.4 KB | PNG Image | Browser favicon / website tab icon | **Replaceable** (can design/generate a modernized vector SVG favicon) |
| `vite.svg` | `public/vite.svg` | 1.5 KB | SVG Vector | Default Vite boilerplate logo (unused) | **Not Reusable** (framework boilerplate) |
| `react.svg` | `src/assets/react.svg` | 4.1 KB | SVG Vector | Default React boilerplate logo (unused) | **Not Reusable** (framework boilerplate) |

---

## 5. Existing Technical Structure

### Framework & Build Tooling
- **Core Framework:** React 18.3.1 (`react`, `react-dom`)
- **Bundler:** Vite 7.3.1 with `@vitejs/plugin-react` (4.3.3)
- **Language:** JavaScript (JSX) with ES Modules (`type: "module"` in `package.json`)
- **Linting:** ESLint 9.13.0 with flat configuration (`eslint.config.js`)

### Styling & Design System
- **CSS Framework:** Tailwind CSS 4.1.13 via `@tailwindcss/postcss` and PostCSS 8.5.6.
- **Typography:** Google Font `Pixelify Sans` imported via `@import` in `src/index.css`.
- **Custom CSS:**
  - `src/index.css`: Tailwind import, font import, keyframe definitions (`spin-slow`, `bounce-slow`, `subtlePulse`, `fadeIn`).
  - `src/App.css`: Dark background `#1e1e1e`, Courier New fallback font, green selection highlight.
  - `src/components/Home.new.css`: Alternate, orphaned stylesheet with a lavender `#f3e8ff` theme and purple `#6a0dad` accents.

### Navigation & Animation
- **Single Page Scroll:** `react-scroll` (1.9.0) with smooth scroll offsets.
- **Intersection Observer:** Used in `About.jsx`, `Projects.jsx`, and `Skills.jsx` to toggle active classes / CSS fade-ins.
- **Progress Bars:** Custom `requestAnimationFrame` loop in `src/cards/ProgressBar.jsx`.

### Docker & Deployment Architecture
- **Containerization:** Multi-stage `Dockerfile`:
  - Stage 1: `node:18 AS builder` (installs dependencies via `npm ci` and builds with `npm run build`).
  - Stage 2: `nginx:alpine` (serves compiled static assets from `/app/dist` on port 80).
- **Production Hosting:** Netlify ([https://omwebdev.netlify.app/](https://omwebdev.netlify.app/)).

### Dependency Audit & Unused Packages
- **`@splinetool/react-spline` (4.0.0):** Installed in `package.json` but **never imported or utilized** anywhere in `src/`.
- **`react-router-dom` (7.0.1):** Installed in `package.json` but **never used** (the app relies solely on `react-scroll`).
- **`react-circular-progressbar` (2.1.0):** Installed in `package.json` but **never used** (custom progress bar was implemented instead).

---

## 6. Current User Experience (UX)

When a visitor lands on `https://omwebdev.netlify.app/`:
1. **Immediate Impression:** The site presents a retro arcade / space-themed aesthetic featuring a pixel font (`Pixelify Sans`) on a dark purple-navy background (`#0f0f1a` / `#1c1c2b`) with 80 pulsing pixel stars and floating planet glows.
2. **Hero Presentation:** The visitor sees Om Deshmukh's name, role (DevOps Engineer), a profile avatar with a dashed cyan border, and action buttons. The cyan (`#07cfd9`) accent provides strong contrast.
3. **Navigation Behavior:** Clicking top navigation items smoothly glides down the page to the target section. The header stays fixed with a blurred background.
4. **Scroll Engagement:** As the visitor scrolls down, cards and sections fade and slide upward using IntersectionObserver triggers.
5. **Interactive Feedback:** Cards elevate on hover with cyan glow shadows and subtle scale transforms.
6. **Footer Utility:** Visitors can copy or click direct mailto/tel links, or visit social profiles in external tabs.

---

## 7. Current Problems & Weaknesses

### 1. Design & Visual Identity
- **Thematic Mismatch:** The retro 8-bit arcade font (`Pixelify Sans`) and pixel aesthetic clash with the high-tech, mission-critical engineering domain of DevOps, Kubernetes, Cloud Infrastructure, and IaC.
- **Clashing Color Accents:** Neon cyan (`#07cfd9`) against dark blue-violet backgrounds creates high vibration, while body text in pixelated font reduces readability.
- **Orphaned Stylesheet:** `Home.new.css` exists in `src/components/`, containing an entirely separate pastel-purple theme that was abandoned, creating maintenance confusion.

### 2. Typography & Readability
- **Ubiquitous Pixel Font:** `Pixelify Sans` is applied across long multi-line paragraphs in the About and Project descriptions. Pixel fonts are designed for arcade titles, not dense body text, leading to high eye strain and reduced legibility.

### 3. User Experience (UX)
- **Broken Footer Anchor:** The quick link in `Footer.jsx` specifies `to="contact"`, but the corresponding target element in `Applayout.jsx` is named `footer`. Clicking "Contact" does not cleanly navigate.
- **Inconsistent Project Links:** Cards only have a single clickable link per project. Some point to a deployed site, while others point to GitHub. Visitors cannot inspect both the source code and the live demonstration for every project.
- **Unclean URLs:** Social links and resume links contain lengthy tracking query parameters (e.g. `utm_source=share`, `igsh=...`, `view?usp=drive_link`).

### 4. Performance & Core Web Vitals
- **Heavy Media Assets:** `aws.png` is an unoptimized **1.26 MB** PNG image. Total image payload across cards is heavy for a static portfolio.
- **Absence of Modern Image Optimization:** Images are delivered via standard `<img>` tags without WebP/AVIF formats, responsive `srcset`, or lazy loading priority hints (LCP image in hero is not prioritized).
- **80 Star DOM Nodes:** Hero stars are rendered as 80 separate `div` elements with inline styles and individual animation timers, incurring unnecessary DOM node overhead.

### 5. Accessibility (a11y)
- **Contrast Ratios:** Muted text (`#e5e7eb/70`) over dark backgrounds falls below WCAG AA contrast thresholds.
- **Heading Hierarchy:** Multiple sections use isolated `<h1>` tags (`Home`, `About`, `Projects`, `Skills`) without semantic landmark structuring.
- **Focus Indicators:** Custom interactive elements rely on hover effects without clear keyboard `:focus-visible` ring indicators.

### 6. Code Quality & Maintainability
- **Bloated Dependencies:** Three heavy npm packages (`@splinetool/react-spline`, `react-router-dom`, `react-circular-progressbar`) contribute dead weight to `node_modules` and lockfile.
- **Hardcoded Media Paths:** Media files are referenced via raw relative strings (`src="A3.png"`) rather than modular imports or optimized Next.js assets.
- **Missing Experience & Architecture Depth:** The portfolio describes Om as a DevOps Engineer deploying Kubernetes, Terraform, and CI/CD pipelines, but does not yet feature a dedicated Architecture / Infrastructure showcase or career timeline.

---

*End of Audit Document. This document serves strictly as a factual baseline for Phase 2.*
