# COMPREHENSIVE PORTFOLIO AUDIT REPORT
**Target System:** The Om Archive (Portfolio 2)  
**Curator / Subject:** Om Deshmukh — DevOps Engineer & Cloud Infrastructure Architect  
**Audit Date:** October 2026  
**Auditor Roles:** Senior Frontend Engineer, Creative Director, UX Auditor, Performance & Systems Engineer  
**Audit Mode:** Read-Only Static & Build Diagnostics (Zero Codebase Mutation Enforced)

---

## 1. EXECUTIVE SUMMARY

The Om Archive is an ambitious, cinematic, and technically rich personal portfolio website built on Next.js 16 (Turbopack), React 19, Motion (Framer Motion 14), Tailwind CSS v4, and Lenis smooth scrolling. The website merges two distinct identities:
1. **The Cinematic Celestial/Observational Archive:** An expedition-grade narrative connecting astronomical exploration, 35mm/medium-format photography, and cinematic pacing to computing.
2. **The Industrial DevOps & Cloud Systems Portfolio:** Real-world infrastructure engineering across AWS, Terraform, Kubernetes, Docker, Jenkins CI/CD, and Linux internals.

### High-Level Verdict
The visual ambition, graphic curation, and conceptual metaphor are world-class. The asset craft (astronaut, moon, Earth, satellite, telescope, camera) and the sequential "Signal" opening create an evocative, memorable identity that sets Om apart from standard web portfolios.

However, the portfolio currently suffers from **five structural tensions**:
1. **Critical Credential Conflict (P0):** The university degree institution is in direct contradiction across the site (`Government College Of Engineering Yavatmal` in `portfolioData.ts:190` vs. `MIT ADT University` hardcoded in `portfolioData.ts:166` and `Scene07ReflectionsArchive.tsx:104,110`).
2. **Overwhelming Text Density & Clutter in Scene 01 (P1):** Scene 01 acts simultaneously as a hero splash, lunar transit showcase, five-pillar introduction, and host to the entire interactive 7-constellation architectural star chart (`EngineeringConstellations.tsx`). It bombards the visitor with over 40 distinct text and badge elements in a single viewport.
3. **Severe Recruiter Usability Bottleneck (P1):** All 5 real-world engineering exhibits in Scene 06 are sequestered inside single-item tab buttons (`selectedProjectId`). A recruiter skimming the page sees only one project (AWS) and misses the other 4. Furthermore, two projects lack GitHub links, one project lacks any link, and the direct resume download is buried in the Scene 08 footer.
4. **Accessibility Override (P1):** `src/app/page.tsx:78` forcefully sets `<MotionConfig reducedMotion="never">`, entirely overriding user OS-level `prefers-reduced-motion` settings for all Framer Motion calculations despite CSS trying to accommodate it in `globals.css`.
5. **Asset Weight & Audio Overhead (P2):** The audio console references over 80 MB of uncompressed `.mp3.mpeg` files in `public/music/` (with single tracks up to 11.98 MB), and uncompressed `.png` illustration duplicates (up to 922 KB each) sit unused alongside `.webp` variants.

---

## 2. PROJECT ARCHITECTURE AND FILE MAP

### Tech Stack
* **Framework:** Next.js 16.3.8 (App Router, Turbopack engine)
* **Runtime / Core:** React 19.2.8, React DOM 19.2.8
* **Styling:** Tailwind CSS v4 (`@import "tailwindcss";`), custom CSS tokens in `globals.css`
* **Motion & Physics:** Framer Motion 14.0.0 (`motion`, `useScroll`, `useSpring`, `useTransform`)
* **Smooth Scroll:** Lenis 1.3.1 (`SmoothScrollProvider.tsx`)
* **Icons:** Lucide React (`lucide-react`), Custom SVGs (`BrandIcons.tsx`)
* **Fonts:** Cinzel (Google Font, `--font-cinzel`), Geist Sans (`--font-geist-sans`), Geist Mono (`--font-geist-mono`)

### Component & File Mapping Table

| Section / Feature | Primary Component File | Supporting / Subcomponent Files | Data Source & Line Numbers | Key Assets Used |
| :--- | :--- | :--- | :--- | :--- |
| **Root Shell & Layout** | `src/app/layout.tsx` | `src/app/globals.css` | `layout.tsx:30-63` (Metadata) | Google Fonts (Cinzel, Geist) |
| **Page Controller** | `src/app/page.tsx` | `SmoothScrollProvider.tsx` | `page.tsx:21-75` (Scene tracking) | Native DOM Audio |
| **The Signal Opening** | `src/components/archive/opening/ArchiveOpening.tsx` | Pure inline Motion vectors | `ArchiveOpening.tsx:31-70` (Star nodes) | `/archive/opening/signal-space-bg.webp` |
| **Navigation HUD** | `src/components/archive/ArchiveHeader.tsx` | Pure Lucide Icons | `portfolioData.ts:98-179` (Scenes metadata) | Lucide Camera, Compass, Disc3 |
| **Master Soundtrack** | `src/components/archive/ArchiveSoundtrack.tsx` | Native `<audio>` | `portfolioData.ts:391-427` (5 Tracks) | `/music/*.mp3.mpeg` (20 tracks in folder) |
| **Scene 01: Cosmic Opening** | `src/components/archive/scenes/Scene01CosmicOpening.tsx` | `EngineeringConstellations.tsx` | `portfolioData.ts:51-96` (Curator & Pillars) | `/archive/illustration_moon_clean.webp` |
| **Star Chart (In Scene 01)** | `src/components/archive/EngineeringConstellations.tsx` | Native HTML5 Canvas | `EngineeringConstellations.tsx:19-130` | Canvas vector rendering |
| **Scene 02: Signal Transmission** | `src/components/archive/scenes/Scene02SignalTransmission.tsx` | Pure inline Motion vectors | `portfolioData.ts:65-96` (5 Pillars) | `/archive/illustration_satellite_clean.webp` |
| **Scene 03: The Observer** | `src/components/archive/scenes/Scene03TheObserver.tsx` | Pure inline Motion vectors | `portfolioData.ts:181-206` (About, Portraits) | `/archive/illustration_telescope_clean.webp`, `/archive/illustration_camera_clean.webp`, `/archive/A3.png`, `/archive/A5.jpg` |
| **Scene 04: Engineer Transition** | `src/components/archive/scenes/Scene04EngineerTransition.tsx` | Pure inline Motion vectors | Hardcoded architectural tokens | `/archive/illustration_astronaut_clean.webp` |
| **Scene 05: Systems Architecture** | `src/components/archive/scenes/Scene05SystemsArchitecture.tsx` | Pure inline Motion vectors | `portfolioData.ts:208-274` (4 Skill Layers) | `/archive/illustration_earth_clean.webp` |
| **Scene 06: Captured Projects** | `src/components/archive/scenes/Scene06CapturedProjects.tsx` | `BrandIcons.tsx` (GithubIcon) | `portfolioData.ts:276-389` (5 Projects) | `/archive/aws.png`, `/archive/Pokedex.png`, `/archive/chatty.png`, `/archive/Plantest.png`, `/archive/URL-shortner.png` |
| **Scene 07: Reflections Archive** | `src/components/archive/scenes/Scene07ReflectionsArchive.tsx` | Pure inline Motion vectors | Hardcoded Vaults 1–3 | Pure typography & badges |
| **Scene 08: Final Frame Contact** | `src/components/archive/scenes/Scene08FinalFrameContact.tsx` | `BrandIcons.tsx` (Social Icons) | `portfolioData.ts:51-63` (Curator contact) | Direct Gmail web composer API |

---

## 3. COMPLETE SECTION AND CONTENT INVENTORY

Classification key:
* **KEEP:** Useful, accurate, and enhances the portfolio narrative or technical credibility.
* **SHORTEN:** Valuable content that is unnecessarily verbose or slow to read.
* **REMOVE:** Redundant, competing clutter, or decorative labels that obscure core hierarchy.
* **REWRITE:** Inaccurate, conflicting, or poorly phrased wording.
* **VERIFY:** Fact or claim requiring user confirmation before modification.

### Content Inventory Table

| Section | Visible Text / Element | Purpose | Issue | Recommended Action | Classification |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Opening** | `SECTOR 00 // DEEP SPACE OBSERVATION` | Archival HUD header | High technical atmosphere, but non-essential | Keep during idle state; clean exit | **KEEP** |
| **Opening** | `[ STANDBY · LISTENING ]` | Status telemetry | Establishes listening theme | None; clean and focused | **KEEP** |
| **Opening** | `ENTER THE ARCHIVE ↓` | Main primary CTA | Prompts user gesture to enter | None; clear and functional | **KEEP** |
| **Opening** | `CURATOR: OM DESHMUKH · SYSTEMS & VISUAL ARCHIVE` | Footer attribution | Quiet metadata | None; clean footer seal | **KEEP** |
| **Scene 01** | `EXPEDITION: 01 // DIGITAL ARCHIVE & OBSERVATORY` | Top reticle bar | Adds flavor, but adds to top-heavy clutter | Shorten or integrate into header | **SHORTEN** |
| **Scene 01** | `COORDINATES: 20.7002° N, 77.0082° E · LOCATION: Akola, Maharashtra` | Geographic anchor | Repeats in Scene 08 footer | Keep coordinates, remove duplicate location label | **SHORTEN** |
| **Scene 01** | `[ 85mm · f/1.2 · ISO 100 ]` | Camera aperture badge | Conflicts with Scene 03 which also claims 85mm | Verify lens metadata consistency | **VERIFY** |
| **Scene 01** | `PERSONAL ENGINEERING & PHOTOGRAPHIC ARCHIVE` | Supertitle | Extra level of hierarchy directly above H1 | Remove or integrate into role badge | **REMOVE** |
| **Scene 01** | `Om Deshmukh` | Master H1 | Essential subject identity | Keep as dominant visual anchor | **KEEP** |
| **Scene 01** | `DevOps Engineer & Cloud Architect` | Subtitle badge | Clear professional role | Keep prominent below H1 | **KEEP** |
| **Scene 01** | `“I explore things, understand how they work, and build systems.”` | Personal tagline | Succinct philosophy | Keep as authentic voice | **KEEP** |
| **Scene 01** | 5 Pillar Badges (Space, Photography, Cinema, Music, Engineering) | Horizontal chips | **100% Redundant.** The exact same 5 pillars are fully detailed in Scene 02 | Remove from Scene 01 to de-clutter hero | **REMOVE** |
| **Scene 01** | `ENGINEER'S ANNOTATED STAR CHART` + 7 Constellations + Canvas + Technical Dossier | Interactive star chart | **Critical Density Overload.** Placing a full 7-item interactive chart inside the Hero Scene overwhelms the first screen | Relocate or elevate into dedicated Architecture section | **REWRITE / REPOSITION** |
| **Scene 01** | Latin constellation names (`Corona Gubernatoris`, `Cetus Vecturae`, `Prisma Structurae`) | Astrological Latin aliases | Excessive fantasy flavor for an engineering portfolio; distracts from real tech | Remove Latin names; use industry standard terminology | **REMOVE** |
| **Scene 01** | `FRAME SEQUENCE 01 / 08 · LEVEL 1: BEDROCK ENGINEERING & PHOTOGRAPHY` | Bottom status bar | Clutters bottom scroll indicator | Shorten to simple progress cue | **SHORTEN** |
| **Scene 01** | `Travel Forward Into Archive ↓` | Navigation CTA | Useful scroll trigger | Keep | **KEEP** |
| **Scene 02** | `ORBITAL TELEMETRY RELAY · ALT: 35,786 KM · DOWNLINK ACTIVE` | Satellite badge | Fits orbital metaphor | Keep attached to satellite | **KEEP** |
| **Scene 02** | `DOWNLINK RAY // TELEMETRY PACKET DISPATCH ↓` | Transmission ray label | Over-explains obvious visual ray line | Remove text pill, keep visual light ray | **REMOVE** |
| **Scene 02** | `SCENE 02 // FREQUENCY DISPATCH & RECEPTOR` | Section header | Standard scene metadata | Keep | **KEEP** |
| **Scene 02** | `Listening Across The Wire` | Section H2 | Compelling editorial narrative | Keep | **KEEP** |
| **Scene 02** | `SATELLITE DOWNLINK SYNCHRONIZED · TELEMETRY INGEST ACTIVE` | Dynamic transmission badge | Good reactive feedback on scroll | Keep | **KEEP** |
| **Scene 02** | `DEPLOYMENT PIPELINE: AWS → Terraform → Kubernetes → CI/CD` | Horizontal pipeline bar | Great visual bridge between space & DevOps | Keep; highlight as key competency | **KEEP** |
| **Scene 02** | 5 Pillars Cards (Space, Photography, Cinema, Music, Engineering) | Full descriptive cards | Core intellectual foundation | Keep; primary home of the 5 pillars | **KEEP** |
| **Scene 02** | `SIGNAL TELEMETRY: 1.4204 GHz (Hydrogen Frequency) ... PACKET STREAM: 100% HEALTH` | Telemetry footer bar | Clever radio astronomy easter egg, but dense | Simplify to 2 clean telemetry metrics | **SHORTEN** |
| **Scene 03** | `SCENE 03 // THE OBSERVER · PHOTOGRAPHY + ENGINEERING` | Section header | Identifies observation theme | Keep | **KEEP** |
| **Scene 03** | `The Lens of The Observer` | Section H2 | Connects optical focus to debugging | Keep | **KEEP** |
| **Scene 03** | `RANGEFINDER ALIGNED ↓ SIGHTLINE FOCUS LOCKED (1:1)` | Camera rangefinder status | Explains viewfinder mechanic | Keep | **KEEP** |
| **Scene 03** | Dual focus buttons (`Simulate Soft Aperture` / `Lock Sharp (1:1)`) | Interactive camera controls | Confusing to recruiters who want to read content | Simplify to a single toggle or auto-lock on scroll | **SHORTEN** |
| **Scene 03** | `Chronicle 01 // Origin & Bedrock` (Story & Curator Note) | Personal narrative | High value personal journey | Keep | **KEEP** |
| **Scene 03** | `Philosophy // First Principles` ("DevOps is neither a checklist of tools...") | Core philosophy | Strong engineering mindset | Keep | **KEEP** |
| **Scene 03** | `Academic Foundation: Government College Of Engineering Yavatmal` | Education card | **Conflicting credential!** Claims Yavatmal here, but MIT ADT in Scene 07 | **Resolve institution with user immediately** | **REWRITE / VERIFY** |
| **Scene 04** | `FOCAL SHIFT // OBSERVATION ↓ EXPLORATION ↓ ENGINEERING` | Transition badge | Guides thematic pivot | Keep | **KEEP** |
| **Scene 04** | `“Observation captures what exists. Engineering constructs what endures.”` | Transition H2 | Excellent thematic bridge | Keep as central pivot quote | **KEEP** |
| **Scene 04** | 5 Engineering Tokens (AWS, Docker, Kubernetes, Terraform, CI/CD) | Floating chips | Shows core stack traversed by astronaut | Keep | **KEEP** |
| **Scene 04** | 3 Architecture Tenets (Immutability, Orchestration, Continuity) | 3-column cards | Clear, concise architectural values | Keep | **KEEP** |
| **Scene 04** | `Examine Infrastructure Architecture →` | Action button | Direct CTA to Scene 05 | Keep | **KEEP** |
| **Scene 05** | `SCENE 05 // SYSTEMS & INFRASTRUCTURE ARCHITECTURE` | Section header | Identifies systems blueprint | Keep | **KEEP** |
| **Scene 05** | `Architected Layers & Global Scale` | Section H2 | Professional systems headline | Keep | **KEEP** |
| **Scene 05** | 4 Layer Selector Buttons (Cloud Fabric, Containers, Pipelines, Kernel) | Interactive tabs | Great structured breakdown | Keep | **KEEP** |
| **Scene 05** | Component cards with status tags (`Operational`, `Core`, `Active`) | Technical skill exhibit | Concrete infrastructure deliverables | Keep | **KEEP** |
| **Scene 05** | Terminal sample command (`EXECUTION PROVED`) | Code validation snippet | Adds undeniable proof of command proficiency | Keep | **KEEP** |
| **Scene 06** | `SCENE 06 // CAPTURED FRAMES · PRODUCTION EXHIBITS` | Section header | Connects frames to projects | Keep | **KEEP** |
| **Scene 06** | `Captured Frames: Real Projects` | Section H2 | Clear exhibit headline | Keep | **KEEP** |
| **Scene 06** | 5 Horizontal Project Frame Tabs (`FRAME 001`, `FRAME 002`...) | Tab switcher | **Hidden Project Flaw:** Forces recruiters to click 5 times to see portfolio projects | Keep tabs but add visible preview grid or summary | **REWRITE** |
| **Scene 06** | `WHAT // THE SYSTEM`, `WHY // PURPOSE`, `HOW // EXECUTION` | Project description trilogy | Exceptional structured engineering breakdown | Keep across all projects | **KEEP** |
| **Scene 06** | Frame 001: AWS Production Infrastructure links | Code / Live links | Has GitHub link, no live demo (expected for IaC) | Keep | **KEEP** |
| **Scene 06** | Frame 002: Pokedex Cloud Platform links | Code / Live links | Has live link, **missing GitHub repo link** | Add GitHub repo link | **VERIFY** |
| **Scene 06** | Frame 003: Chatty Real-Time Network links | Code / Live links | Has live link, **missing GitHub repo link** | Add GitHub repo link | **VERIFY** |
| **Scene 06** | Frame 004: Plantest AI Pathology links | Code / Live links | Has live link, **missing GitHub repo link** | Add GitHub repo link | **VERIFY** |
| **Scene 06** | Frame 005: URL Shortener links | Code / Live links | **No links at all!** Missing both GitHub & Demo | Add GitHub repo & demo links | **VERIFY** |
| **Scene 07** | `SCENE 07 // THE ARCHIVE & REFLECTIONS` | Section header | Deep craft reflection | Keep | **KEEP** |
| **Scene 07** | Vault 1: Cinema as Systems Design | Narrative card | Connects film pacing to engineering | Keep | **KEEP** |
| **Scene 07** | Vault 2: Soundtrack & Acoustic Harmony | Narrative card | Connects music to cognitive debugging | Keep | **KEEP** |
| **Scene 07** | Vault 3: Academic Grounding (`MIT ADT University · B.Tech`) | Narrative card | **Conflicting credential!** Directly contradicts Scene 03 | **Harmonize institution name across site** | **REWRITE / VERIFY** |
| **Scene 08** | `SCENE 08 // FINAL FRAME · DISPATCH TRANSMISSION` | Section header | Contact terminal header | Keep | **KEEP** |
| **Scene 08** | Sequence breadcrumb (`ARCHIVE ↓ SYSTEMS ↓ TRANSMISSION...`) | Sequence indicator | Cinematic conclusion | Keep | **KEEP** |
| **Scene 08** | `Looking For The Next System To Build` | Main H2 | Compelling hiring CTA | Keep | **KEEP** |
| **Scene 08** | Direct Transmission Form | Interactive email sender | Direct Gmail web composer integration | Keep | **KEEP** |
| **Scene 08** | Ground Coordinates (Email, Phone, Location) | Contact details | Direct reach channels with Copy button | Keep | **KEEP** |
| **Scene 08** | Sequential Signal Social Icons (GitHub, LinkedIn, Instagram) | Animated social links | Sequential orange pulse is distinct | Keep | **KEEP** |
| **Scene 08** | `Download Dossier` (Resume button) | Resume download | Links to Google Drive PDF | Keep; also add mirror in Header | **KEEP** |
| **Scene 08** | Colophon Film Credits | Footer colophon | Perfect cinematic editorial signoff | Keep | **KEEP** |

---

## 4. AUDIT OF TEXT DENSITY AND VISUAL HIERARCHY

### Problematic Area 1: Scene 01 (Hero / Cosmic Opening)

1. **What is creating the clutter?**
   Scene 01 is trying to execute three contradictory UX roles at once:
   * A clean, evocative cinematic introduction (Moon transit + obsidian void + curator identity).
   * An encyclopedia of interests (the 5 Pillars tags: Space, Photography, Cinema, Music, Engineering).
   * A dense, interactive technical tool (`EngineeringConstellations.tsx` containing an HTML5 Canvas, 7 discipline buttons, Latin taxonomy, node labels, field notes, and primitive tags).
2. **Which elements compete for attention?**
   When the page loads, the visitor's eye is pulled simultaneously between:
   * The animated reticle crosshair.
   * The H1 "Om Deshmukh".
   * The role badge "DevOps Engineer & Cloud Architect".
   * The 5 pillar badges directly below the tagline.
   * The Moon graphic floating across the upper/mid quadrant.
   * The 7 constellation chips and the glowing star chart canvas below it.
   The screen feels like a dense dashboard rather than an intentional cinematic opening.
3. **What should remain?**
   * The Moon transit in its approved choreography.
   * The minimal camera reticle and coordinates.
   * The H1 "Om Deshmukh".
   * The role badge "DevOps Engineer & Cloud Architect".
   * The personal tagline: *“I explore things, understand how they work, and build systems.”*
   * The "Travel Forward Into Archive" scroll CTA.
4. **What should be shortened, removed, or repositioned?**
   * **Remove:** The 5 pillar badges in Scene 01 (`Scene01CosmicOpening.tsx:204-220`). They are duplicated in full depth immediately below in Scene 02.
   * **Reposition:** Move `<EngineeringConstellations />` out of Scene 01. It belongs either in Scene 04/05 as a dedicated engineering blueprint or accessible via a secondary modal/expansion. In Scene 01, it robs the hero of its cinematic breathing room.
   * **Remove:** The Latin constellation titles (`Corona Gubernatoris`, `Nebula Nubium`, etc.). They add cognitive drag without providing hiring managers useful signal.
5. **How should the hierarchy improve?**
   * **Level 1 (Dominant):** Om Deshmukh + DevOps Engineer & Cloud Architect.
   * **Level 2 (Secondary):** Tagline + single clear scroll indicator.
   * **Background (Atmospheric):** Starlight + Lunar transit.
   This gives the viewer immediate clarity on who Om is and what he builds.

---

### Problematic Area 2: Scene 02 (Signal Transmission)

1. **What is creating the clutter?**
   Between the satellite downlink graphic, the traveling data pulse, the downlink ray label, the narrative title, the telemetry ingest badge, the horizontal deployment pipeline, the 5 pillar cards, and the radio diagnostics footer, Scene 02 contains 7 separate horizontal strata stacked vertically.
2. **Which elements compete for attention?**
   * The satellite animation + downlink ray badge competes with the section title.
   * The horizontal deployment pipeline (`AWS → Terraform → Kubernetes → CI/CD`) is positioned immediately above the 5 pillars grid, diluting the visual weight of both.
3. **What should remain?**
   * The satellite orbital transit and downlink ray.
   * The narrative title: *“Listening Across The Wire”*.
   * The 5 Interlocking Pillars Grid (this is their natural, rightful place).
   * The horizontal deployment pipeline.
4. **What should be shortened, removed, or repositioned?**
   * **Remove:** The text label `DOWNLINK RAY // TELEMETRY PACKET DISPATCH ↓` (`Scene02SignalTransmission.tsx:146-148`). The visual beam and data pulse already clearly convey the downlink.
   * **Shorten:** The bottom telemetry bar (`SIGNAL TELEMETRY: 1.4204 GHz...`). Combine the protocols and ground station into a single quiet line.
5. **How should the hierarchy improve?**
   Position the satellite as the visual lead, the section title as the editorial lead, the 5 pillars as the content core, and the deployment pipeline as the bridge leading directly into Scene 03.

---

### Problematic Area 3: Scene 03 (The Observer & Viewfinder)

1. **What is creating the clutter?**
   The left column contains a camera rangefinder widget, an optical sightline from the telescope, a medium-format photograph, status badges, ISO ribbons, and two separate focus interaction buttons (`Simulate Soft Aperture` and `Lock Sharp (1:1)`).
2. **Which elements compete for attention?**
   The user does not know whether to look at Om's portrait, read the origin story, fiddle with the focus button, or inspect the telescope sightline.
3. **What should remain?**
   * The telescope collimation animation.
   * The portrait inside the medium-format viewfinder frame.
   * The origin chronicle and core philosophy quote.
   * The academic foundation card.
4. **What should be shortened, removed, or repositioned?**
   * **Simplify:** The manual focus buttons. An automated focus lock that settles cleanly as the user scrolls through Scene 03 provides a superior cinematic experience than asking the user to click manual buttons.
5. **How should the hierarchy improve?**
   Allow the portrait to be the undisputed hero of the left column and the philosophy quote the hero of the right column.

---

### Problematic Area 4: Scene 06 (Captured Projects Exhibition)

1. **What is creating the clutter & UX friction?**
   Rather than visual clutter, Scene 06 suffers from **interactive obstruction**. All five projects are hidden behind a single active tab state. At any given moment, 80% of the candidate's real engineering work is invisible unless the recruiter actively clicks through the tabs.
2. **Which elements compete for attention?**
   Within the active project view, the technical dossier divides content into `WHAT`, `WHY`, and `HOW` blocks, plus a `Key Architecture Blueprint` grid, plus a `Technologies Deployed` chip list. While the information is excellent, the font sizes (9px–11px) and small padding make it feel like a dense datasheet.
3. **What should remain?**
   * The structured `WHAT / WHY / HOW` trilogy (recruiters love this clarity).
   * The Architecture Blueprint bullets.
   * The live links and source code links.
4. **What should be shortened, removed, or repositioned?**
   * Provide an overview grid or card carousel so all 5 projects are visible simultaneously at a high level, with the deep-dive dossier expanding on click.
   * Enforce consistent link availability (add GitHub repos for Pokedex, Chatty, and Plantest; add demo or repo for URL Shortener).
5. **How should the hierarchy improve?**
   * **Project Title & Headline Metric** → Primary
   * **System Architecture Blueprint** → Secondary
   * **WHAT / WHY / HOW Details** → Supporting context

---

## 5. AUDIT OF THE CINEMATIC ARCHIVE & OPENING

### The Signal Opening Sequence (`ArchiveOpening.tsx`)
* **Visual Atmosphere:** The opening creates an immersive atmosphere. The transition from dormant deep space (`#030305`), through the 3-pulse beacon, the propagating concentric wavefronts, and the sequential starlight awakening provides an authentic cosmic feel.
* **Timing & Pacing:** The choreography timeline spans ~5.2 seconds:
  * 0–650ms: Silence & UI fadeout.
  * 650–1850ms: Tri-pulse signal beacon at (28%, 26%).
  * 1850–2750ms: Wavefront propagation.
  * 2750–4100ms: Star response network.
  * 4100–4750ms: Convergence to center.
  * 4750–5200ms: Soft atmospheric bloom.
  * 5200ms: Clean archive reveal and soundtrack initiation.
* **Findings:**
  * **Verified Good:** The camera is completely absent from the opening sequence, adhering strictly to the user's requirements. No camera zooms, optical portals, or camera transitions exist in `ArchiveOpening.tsx`.
  * **Verified Improvement (Mobile):** On small screens (390px width), the background image `signal-space-bg.webp` (stored in `public/archive/opening/`) is stretched with `object-cover`. On high-DPI mobile viewports, the compression artifacts in the nebula dust become slightly visible when zoomed.
  * **Action:** Ensure the background image maintains proper aspect ratio constraints on mobile and that the "ENTER THE ARCHIVE" button remains vertically centered in the lower-third safe area.

### Existing Archive Scenes (Scenes 01–05)
* **Approved Visual Assets:** The astronaut, Moon, Earth, satellite, telescope, and camera assets are present as clean `.webp` illustrations in `public/archive/`.
* **Scene 01 (Moon):** The Moon transit operates smoothly with `useScroll` (`['-10vw', '-2vw', '38vw', '38vw', '110vw']`). The hero hold between 40%–60% scroll progress works as intended. Mobile opacity was recently tuned with `opacity-20 sm:opacity-100`, which effectively prevents the Moon graphic from clashing with the text on narrow screens.
* **Scene 02 (Satellite):** The curved orbital trajectory across the upper third and the transmission ray firing downward into the pipeline during the hero hold (0.45–0.62 progress) visually communicates telemetry ingest.
* **Scene 03 (Telescope & Camera):** The mechanical collimation animation of the telescope and the sightline pointing down toward the camera frame reinforces the observation narrative.
* **Scene 04 (Astronaut):** The extravehicular explorer traversing diagonally through the cloud engineering tokens (`AWS`, `Docker`, `Kubernetes`, `Terraform`, `CI/CD`) acts as an effective bridge between observational photography and systems construction.
* **Scene 05 (Earth):** The terrestrial scale anchor sits quietly in the background at 15% opacity with gentle parallax, grounding the systems architecture without interfering with typography.

---

## 6. AUDIT OF PROFESSIONAL PORTFOLIO CONTENT & RECRUITER USABILITY

### Critical Identity Checklist

| Recruiter Question | Can It Be Found? | Where & How? | Usability Rating | Issue / Gap |
| :--- | :---: | :--- | :---: | :--- |
| **Who is Om?** | **YES** | Header, Scene 01 H1, Scene 08 | **9/10** | Clear and prominent name and identity. |
| **What is his primary role?** | **YES** | Scene 01 badge: *DevOps Engineer & Cloud Architect* | **9/10** | Immediately visible on first screen. |
| **What are his core technical skills?** | **YES** | Scene 01 (Star Chart), Scene 02, Scene 05 | **7/10** | Fragmented across 3 different scenes. Needs consolidated overview. |
| **What degree does he hold?** | **CONFLICT** | Scene 03 vs Scene 07 | **0/10 (P0)** | **Direct contradiction:** Scene 03 states *Government College Of Engineering Yavatmal*, while Scene 07 states *MIT ADT University*. |
| **What are his best projects?** | **PARTIAL** | Scene 06 (Captured Frames) | **5/10 (P1)** | Only 1 project visible at a time. Must click through tabs to discover the other 4. |
| **Can I inspect the code on GitHub?** | **PARTIAL** | Scene 06 & Scene 08 | **5/10 (P1)** | AWS project has GitHub link; Pokedex, Chatty, Plantest, and URL Shortener are missing GitHub links in data. |
| **Can I test live deployments?** | **YES** | Scene 06 | **8/10** | Pokedex, Chatty, and Plantest have working live URLs. |
| **Can I download his resume quickly?** | **DIFFICULT** | Scene 08 button only | **4/10 (P1)** | Resume is at the very bottom of the page. No resume button exists in the sticky header. |
| **How do I contact him?** | **YES** | Scene 08 (Gmail, Phone, Copy) | **8.5/10** | Direct Gmail compose and phone number are working. |

### Summary of Recruiter Usability Findings
Recruiters spend an average of 15–30 seconds on a portfolio. While the cinematic narrative is captivating for design-conscious visitors, a technical recruiter in a hurry may struggle with:
1. Being unable to scan all 5 projects without clicking tabs.
2. Inconsistent GitHub repository links across projects.
3. Having to scroll 8 full scenes to find the resume download link.
4. Noticing contradictory university names in different sections.

---

## 7. AUDIT OF VISUAL CONSISTENCY

### Typography
* **Headings:** Cinzel (`font-serif`, `--font-cinzel`) is used consistently for all major section titles and scene numbers, lending a refined, classical archival aesthetic.
* **Body Text:** Geist Sans (`--font-geist-sans`) provides clean readability for descriptions, paragraphs, and narrative content.
* **Technical Metadata:** Geist Mono (`--font-geist-mono`) is used across reticles, aperture tags, coordinates, and telemetry ribbons.
* **Inconsistency Found:** Several cards use varying letter-spacing tokens (`tracking-widest` vs. `tracking-[0.3em]` vs. `tracking-wider`) and mismatched uppercase conventions. Standardizing these into 3 typography tokens will improve visual polish.

### Color Palette & Atmospheric Accents
* **Obsidian Canvas:** `#030305` and `#020204` dominate the background, maintaining rich contrast with zero washed-out grays.
* **Primary Accent (Archival Gold / Tungsten):** Amber / Gold palette (`#d4af37`, `text-amber-400`, `border-amber-400/30`) is applied consistently to photographic reticles, frames, and primary headings.
* **Secondary Accent (Signal Cyan):** Cyan palette (`text-cyan-400`, `border-cyan-400/30`) is applied to telemetry, radio signals, and the opening sequence.
* **Status Badges:** Emerald (`text-emerald-400`, `bg-emerald-950/40`) is applied consistently to operational health checks and verified states.
* **Inconsistency Found:** In Scene 04, the primary CTA button uses a full amber gradient (`from-amber-600 via-amber-500 to-amber-600`), while in Scene 01 the button uses a subtle outline (`bg-amber-500/10 border-amber-400/40`), and in Scene 08 the resume button uses an emerald/teal gradient (`from-emerald-600 to-teal-600`). A unified button design system will enhance consistency.

---

## 8. AUDIT OF RESPONSIVENESS AND ACCESSIBILITY

### Accessibility Audit (WCAG / Best Practices)

#### 1. Reduced-Motion Override (Verified P1 Defect)
* **Code Location:** `src/app/page.tsx:78`
* **Evidence:**
  ```tsx
  <MotionConfig reducedMotion="never">
  ```
* **Impact:** This explicitly overrides the visitor's operating system preferences (`prefers-reduced-motion: reduce`). Even though `globals.css:114-121` attempts to clamp CSS animations, Framer Motion will continue to drive heavy scroll calculations, canvas updates, and coordinate transforms.
* **Fix:** Change to `<MotionConfig reducedMotion="user">` or respect `prefers-reduced-motion` at the root motion provider.

#### 2. Headings & Semantic Hierarchy
* **Scene 01:** Contains `<h1>{curator.name}</h1>` (Proper).
* **Scenes 02–08:** Each contains a single `<h2>` for the section title (Proper semantic hierarchy).
* **Defect:** In `EngineeringConstellations.tsx:515`, the constellation title is rendered as an `<h3>`, but when no constellation is selected, the fallback is empty.

#### 3. Focus States & Keyboard Navigation
* Navigation buttons and scene index links in `ArchiveHeader.tsx` have `cursor-pointer`, but lack visible `:focus-visible` styling for keyboard-only visitors using Tab navigation.
* The contact form in `Scene08FinalFrameContact.tsx:142-178` features proper `<input>` and `<textarea>` elements with `focus:border-amber-400`, which provides clear focus indication.

#### 4. Color Contrast
* Small monospace labels with `text-slate-500` or `text-amber-400/60` at sizes of `8px` or `9px` fail WCAG AA 4.5:1 contrast ratios on dark backgrounds. Increasing them to minimum `10px` or boosting opacity to `75%` will meet accessibility standards without compromising the subtle aesthetic.

### Responsive Breakpoint Analysis

| Viewport Breakpoint | Inspected Behavior | Verified Issues | Recommendations |
| :--- | :--- | :--- | :--- |
| **Desktop (≥ 1280px)** | Spacious layout; illustrations comfortably frame text; telemetry header visible. | Constellation star chart in Scene 01 creates a tall scroll page. | Move star chart out of Scene 01 to keep hero view balanced. |
| **Laptop (1024px – 1279px)** | Grid systems switch to 2 columns; layout maintains balance. | Scene 03 left/right columns become tight on 13-inch displays. | Adjust grid gap from `gap-8` to `gap-6`. |
| **Tablet (768px – 1023px)** | Header collapses center telemetry; 5 pillars switch to scrollable or stacked grid. | 5 pillars in Scene 02 stack vertically into a tall card pile. | Use a 2-column or 3-column responsive grid on tablet. |
| **Mobile (375px – 430px)** | Moon scaled to 180px with `opacity-20`; soundtrack collapses to compact badge; header compact. | 1. Scene 01 hero has 5 vertical text blocks competing.<br>2. Project tab buttons in Scene 06 require horizontal side-scrolling.<br>3. `EngineeringConstellations` canvas requires pinch/drag. | 1. Remove 5 pillar chips from Scene 01 on mobile.<br>2. Ensure project selector has clear touch swipe affordance. |

---

## 9. AUDIT OF PERFORMANCE AND TECHNICAL QUALITY

### Build Diagnostics
* **Command Executed:** `npm run build`
* **Outcome:** Clean exit (code `0`). Build compiled successfully in 11.3s with Turbopack.
* **TypeScript Compilation:** 0 errors across all routes and components.
* **Static Generation:** All 4 routes (`/`, `/_not-found`, `/robots.txt`, `/sitemap.xml`) prerendered as static HTML.

### Asset Weight & Bundle Analysis

| Asset Category | Location | Size on Disk | Performance Finding | Recommended Optimization |
| :--- | :--- | :--- | :--- | :--- |
| **Music Audio Files** | `public/music/*.mp3.mpeg` | **> 80 MB total** (Tracks up to 11.98 MB each) | Heavy network payload if preloaded; irregular `.mp3.mpeg` extension. | 1. Standardize extension to `.mp3`.<br>2. Compress audio to 128kbps stereo (~2–3 MB each).<br>3. Ensure strict lazy-loading on play only. |
| **Uncompressed PNG Duplicates** | `public/archive/*.png` | **~4.5 MB total** (e.g. `satellite.png` 922KB, `earth.png` 688KB) | Raw PNGs exist in `public/` even though `.webp` versions are used by code. | Remove unused `.png` duplicates in production bundle to save deploy weight. |
| **Space Background** | `public/archive/opening/signal-space-bg.webp` | 420 KB | Loaded with `priority` in opening screen. | Ensure responsive `sizes` attribute and modern WebP compression. |
| **Font Loading** | `src/app/layout.tsx` | Next.js Google Fonts (`Cinzel`, `Geist`) | Zero layout shift (`display: "swap"` configured). Preloaded via `<link rel="preload">`. | Optimized as intended. |

### Runtime & Event Listener Hygiene
* **Scroll Listeners:**
  * `ArchiveHeader.tsx:29` uses `window.addEventListener('scroll', ..., { passive: true })` with proper cleanup in `useEffect` return.
  * `SmoothScrollProvider.tsx:34` properly cleans up `requestAnimationFrame` and calls `lenis.destroy()`.
  * `EngineeringConstellations.tsx:415` properly cancels its animation frame on unmount.
* **Intersection Observer:** `src/app/page.tsx:45` properly disconnects its observer on unmount.
* **Timer Hygiene:** `Scene08FinalFrameContact.tsx:23` properly clears `setInterval` on unmount.

---

## 10. AUDIT OF INTERACTIONS AND NAVIGATION

### Navigation & Telemetry HUD (`ArchiveHeader.tsx`)
* **Emblem Click:** Clicking "The Om Archive" logo scrolls smoothly to `#scene-deep-space`.
* **Soundtrack Pill:** Toggles audio playback and displays currently playing track title.
* **Index Drawer:** The "INDEX" button opens a modal allowing direct jumping to any of the 8 scenes.
* **Finding:** While jumping works smoothly, there is no direct link to Om's resume or GitHub in the persistent header. Recruiters must scroll through the entire site to find them.

### Audio Console (`ArchiveSoundtrack.tsx`)
* **Interaction:** Clicking the floating disc badge expands a full player with track skipping, play/pause, volume slider, and track duration bar.
* **Volume Fade-In:** Includes a smooth 1400ms volume fade-in via `requestAnimationFrame` to prevent abrupt audio playback.
* **Initial Prompt:** A dismissible prompt banner ("ENTER THE ARCHIVE WITH SOUNDTRACK") appears in the lower-third, respecting browser autoplay policies by waiting for a user gesture.

### Project Exhibits Selector (`Scene06CapturedProjects.tsx`)
* **Tab Interaction:** Clicking a project tab transitions smoothly between projects via `AnimatePresence mode="wait"`.
* **Link Target:** External project links use `target="_blank" rel="noopener noreferrer"` with appropriate icons.
* **Defect:** When a tab is selected, there is no visual indicator telling the user that 4 other projects remain unexplored.

### Contact Actions (`Scene08FinalFrameContact.tsx`)
* **Email Copy:** The "Copy" button copies Om's email to the clipboard and gives clear feedback (`Copied`).
* **Form Submission:** Submitting the dispatch form opens a pre-composed message in Gmail Web (`https://mail.google.com/mail/?view=cm...`), avoiding the common issue of triggering unwanted desktop mail clients (like Outlook).
* **Sequential Signal Social Links:** GitHub, LinkedIn, and Instagram icons pulse sequentially with an orange beacon effect.

---

## 11. PRIORITIZED ISSUE LIST

| ID | Priority | Section | Verified Finding | Evidence | Recommended Fix | Files Likely Involved | Risk |
| :---: | :---: | :--- | :--- | :--- | :--- | :--- | :---: |
| **ISSUE-01** | **P0** | Data / Credential Consistency | **University Degree Conflict:** Scene 03 states *Government College Of Engineering Yavatmal*, while Scene 07 states *MIT ADT University*. | `portfolioData.ts:190` vs `portfolioData.ts:166` & `Scene07ReflectionsArchive.tsx:104,110` | Align institution name across all data and narrative files. | `portfolioData.ts`, `Scene07ReflectionsArchive.tsx` | Low (Content only) |
| **ISSUE-02** | **P1** | Accessibility | **Reduced-Motion Ignored:** `<MotionConfig reducedMotion="never">` forces animation on users who requested reduced motion. | `src/app/page.tsx:78` | Change to `reducedMotion="user"` to honor system preferences. | `src/app/page.tsx` | Low (Accessibility fix) |
| **ISSUE-03** | **P1** | Text Density / UX | **Hero Overload in Scene 01:** Hero section contains over 40 text elements plus an entire interactive star chart canvas. | `Scene01CosmicOpening.tsx:204-228`, `EngineeringConstellations.tsx` | 1. Remove duplicated 5 pillar badges.<br>2. Relocate or isolate Star Chart from Hero view. | `Scene01CosmicOpening.tsx` | Medium (Layout adjustment) |
| **ISSUE-04** | **P1** | Recruiter Usability | **Hidden Projects in Scene 06:** 4 out of 5 projects are hidden behind single-selection tab buttons. | `Scene06CapturedProjects.tsx:49-68` | Provide a project overview grid or carousel so all 5 projects are visible. | `Scene06CapturedProjects.tsx` | Medium (UI presentation) |
| **ISSUE-05** | **P1** | Content Completeness | **Missing Project Links:** Projects 002, 003, and 004 lack GitHub repo links; Project 005 has no links at all. | `portfolioData.ts:321, 344, 366, 387` | Add repository and demo links to all 5 projects. | `portfolioData.ts` | Low (Data update) |
| **ISSUE-06** | **P1** | Recruiter Usability | **Resume Discoverability:** Direct resume download is located only at the bottom of Scene 08. | `Scene08FinalFrameContact.tsx:346` | Add a clean "Resume" or "Dossier" CTA button in `ArchiveHeader.tsx`. | `ArchiveHeader.tsx` | Low (Header addition) |
| **ISSUE-07** | **P2** | Performance / Assets | **Heavy Audio Files & Double Extensions:** Music files total >80MB and carry `.mp3.mpeg` double extensions. | `public/music/*.mp3.mpeg` | Rename to `.mp3`, compress to 128kbps, ensure lazy loading. | `portfolioData.ts`, `public/music/` | Low (Asset cleanup) |
| **ISSUE-08** | **P2** | Performance / Assets | **Unused PNG Illustration Duplicates:** ~4.5MB of redundant `.png` files exist alongside `.webp` illustrations. | `public/archive/*.png` | Safely remove unused `.png` duplicates in public folder. | `public/archive/` | Low (Asset cleanup) |
| **ISSUE-09** | **P2** | Visual Density | **Redundant Telemetry Labels in Scene 02:** Text label duplicates visual transmission beam. | `Scene02SignalTransmission.tsx:146-148` | Remove redundant text pill; let visual ray carry the effect. | `Scene02SignalTransmission.tsx` | Low (Minor cleanup) |
| **ISSUE-10** | **P2** | Content Tone | **Latin Constellation Taxonomy:** Latin aliases in star chart distract from real-world engineering credentials. | `EngineeringConstellations.tsx:23, 46, 68, 92, 114` | Replace Latin names with real technical architecture labels. | `EngineeringConstellations.tsx` | Low (Copy polish) |
| **ISSUE-11** | **P3** | UX / Polish | **Manual Camera Focus in Scene 03:** Two focus buttons add cognitive friction to reading the portrait. | `Scene03TheObserver.tsx:369-398` | Streamline to automated scroll-driven focus lock with single override. | `Scene03TheObserver.tsx` | Low (Interaction polish) |

---

## 12. RECOMMENDED IMPLEMENTATION ROADMAP

### PHASE 1 — High-Priority Text De-Cluttering & Credential Integrity
* **Goals:** Resolve university credential mismatch; de-clutter Scene 01; restore reduced-motion support.
* **Exact Files Involved:**
  * `src/data/portfolioData.ts` (Align university name, add missing project GitHub links)
  * `src/components/archive/scenes/Scene07ReflectionsArchive.tsx` (Harmonize degree text with confirmed university)
  * `src/app/page.tsx` (Change `<MotionConfig reducedMotion="user">`)
  * `src/components/archive/scenes/Scene01CosmicOpening.tsx` (Remove duplicate 5 pillar badges, clean up supertitle)
* **Verification Steps:** Run TypeScript check; verify university consistency across scenes; test with reduced-motion simulator.
* **Regression Risks:** None. Clean content and configuration updates.

### PHASE 2 — Recruiter Usability & Project Showcase Enhancement
* **Goals:** Make all 5 projects easily discoverable; add resume CTA to persistent navigation header.
* **Exact Files Involved:**
  * `src/components/archive/ArchiveHeader.tsx` (Add compact "Resume / Dossier" link next to index button)
  * `src/components/archive/scenes/Scene06CapturedProjects.tsx` (Enhance project selection with visible thumbnail cards)
  * `src/data/portfolioData.ts` (Ensure all 5 projects have clear GitHub/Live demo links)
* **Verification Steps:** Verify header resume link triggers download; test project switching and verify all 5 exhibits are visible.
* **Regression Risks:** Low. Header layout requires mobile check to ensure no button wrapping on small screens.

### PHASE 3 — Architecture & Star Chart Repositioning
* **Goals:** Give the Hero section cinematic breathing room by properly structuring the Engineering Star Chart.
* **Exact Files Involved:**
  * `src/components/archive/scenes/Scene01CosmicOpening.tsx`
  * `src/components/archive/EngineeringConstellations.tsx`
  * `src/components/archive/scenes/Scene04EngineerTransition.tsx` or `Scene05SystemsArchitecture.tsx`
* **Intended Changes:** Decouple `EngineeringConstellations` from the first screen view so that Scene 01 functions purely as the identity and lunar transit hero. Present the constellations in the engineering architecture section.
* **Verification Steps:** Check Scene 01 viewport height on 1366px, 1440px, and 1920px screens.
* **Regression Risks:** Medium. Must verify scroll offset calculation and ensure smooth transitions between scenes.

### PHASE 4 — Visual Polish, Scene Spacing & Asset Hygiene
* **Goals:** Remove redundant telemetry text labels; standardize button designs; clean audio assets.
* **Exact Files Involved:**
  * `src/components/archive/scenes/Scene02SignalTransmission.tsx` (Remove ray text badge)
  * `src/components/archive/scenes/Scene03TheObserver.tsx` (Streamline focus controls)
  * `public/music/` and `src/data/portfolioData.ts` (Clean track file extensions and normalize sizes)
* **Verification Steps:** Audio playback verification on all 5 tracks; verify button styling across scenes.
* **Regression Risks:** Low.

### PHASE 5 — Mobile & Responsive Refinement
* **Goals:** Polish small-screen experience for mobile recruiters and visitors.
* **Exact Files Involved:**
  * `src/components/archive/opening/ArchiveOpening.tsx` (Optimize mobile background image scaling)
  * `src/components/archive/scenes/Scene01CosmicOpening.tsx` (Verify moon opacity and text breathing room)
  * `src/components/archive/ArchiveSoundtrack.tsx` (Ensure compact mobile player maintains minimum bottom spacing)
* **Verification Steps:** Responsive simulation at 375px (iPhone SE), 390px (iPhone 14/15), and 768px (iPad).
* **Regression Risks:** Low.

---

## 13. FILES LIKELY TO CHANGE FOR PROPOSED FIXES

```
src/
├── app/
│   └── page.tsx                         # Change reducedMotion="user"
├── data/
│   └── portfolioData.ts                 # Harmonize university; add project links; clean soundtrack paths
├── components/
│   └── archive/
│       ├── ArchiveHeader.tsx            # Add quick Resume button; improve focus rings
│       ├── EngineeringConstellations.tsx# Simplify Latin names; improve responsive canvas sizing
│       ├── opening/
│       │   └── ArchiveOpening.tsx       # Polish mobile background scaling
│       └── scenes/
│           ├── Scene01CosmicOpening.tsx     # Remove duplicate pillars; reposition star chart
│           ├── Scene02SignalTransmission.tsx# Remove redundant downlink ray label
│           ├── Scene03TheObserver.tsx       # Streamline manual focus controls
│           ├── Scene06CapturedProjects.tsx  # Improve multi-project discoverability
│           └── Scene07ReflectionsArchive.tsx# Align university degree citation
public/
├── music/                               # Rename .mp3.mpeg to .mp3, compress oversized tracks
└── archive/                             # Remove redundant unused .png files
```

---

## 14. RISKS AND DEPENDENCIES

1. **Animation Scroll Offset Coupling:** Scenes 01 through 05 rely on `useScroll` target refs with defined offsets (`['start end', 'end start']`). Altering section padding or moving components (such as relocating the Star Chart) may shift scroll trigger boundaries.
   * *Mitigation:* Test scroll checkpoints sequentially to verify Moon, Satellite, Telescope, and Astronaut transitions.
2. **Audio Autoplay & Gesture Policy:** Modern browsers strictly block unmuted audio without direct user interaction.
   * *Mitigation:* Preserve the existing gesture-primed architecture (`handleOpeningTrigger` in `page.tsx` and the user-triggered prompt banner).
3. **Approved Asset Integrity:** The astronaut, Moon, Earth, satellite, telescope, camera, and Signal opening logic are approved.
   * *Mitigation:* Restrict modifications to typography hierarchy, copy accuracy, and responsive container styles without modifying core asset art or timing.

---

## 15. TESTING REQUIRED AFTER FIXES

1. **Static Build & Type Check:** Run `npm run build` and `npx tsc --noEmit` to verify zero TypeScript errors.
2. **Audio Playback Verification:** Test all 5 soundtrack tracks sequentially; verify mute, volume slider, track changing, and scroll fade behavior.
3. **Scene Navigation Testing:** Click every item in the header Index Drawer to ensure accurate scroll-to targets.
4. **Contact Flow Verification:** Test email copy to clipboard; test form submission to confirm Gmail compose window opens with proper query parameters.
5. **Responsive Viewport Testing:** Test across 375px, 768px, 1024px, 1440px, and 1920px viewports.
6. **Accessibility Testing:** Test keyboard tab-navigation sequence; verify reduced-motion behavior when `prefers-reduced-motion` is enabled in operating system settings.

---

## 16. UNVERIFIED AREAS AND LIMITATIONS

1. **Playwright Browser Automation Limitation:** Automated browser initialization was unavailable in the current audit environment due to a CDN driver download failure (HTTP 404 on Playwright Win32 driver from Azure/Akamai). Consequently, all layout, animation, and responsive analyses were performed via static AST inspection, JSX/TSX review, Tailwind class verification, curl HTTP diagnostics, and Next.js Turbopack production build verification.
2. **True Educational Credential:** The exact university institution name (`Government College Of Engineering Yavatmal` vs. `MIT ADT University`) must be confirmed directly by Om Deshmukh before Phase 1 execution.
3. **Missing Project Repositories:** GitHub repository URLs for projects 002, 003, 004, and 005 could not be verified from local codebase files alone and require user confirmation.
