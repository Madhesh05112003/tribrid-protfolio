# TRI·BRID — Engineering Portfolio

A single-page portfolio for a working prototype: the **Self-Recharging Solar Tri-Brid Vehicle with
Integrated IoT, Electric, Petrol & LPG Systems**, built by three ECE undergraduates at Dhanalakshmi
College of Engineering (2025).

The site tells the project as a build story rather than a report: problem → concept → fabrication →
control logic → validation → impact.

## Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 — design tokens in `@theme`, no config file |
| Motion | `motion` (Framer Motion successor) + `lenis` smooth scroll |
| Fonts | Anton (display), Inter (body), JetBrains Mono (data) via `next/font` |
| Hosting | Any static host — the page is fully prerendered |

No 3D, no animation library beyond `motion`. Everything visual is CSS or SVG.

## Getting started

```bash
bun install
bun run dev        # http://localhost:3000
```

```bash
bun run build      # production build
bun run start      # serve the build
bun run lint       # eslint
bunx tsc --noEmit  # typecheck
```

## Layout

```
src/
├── app/
│   ├── layout.tsx          # fonts, metadata, smooth scroll, nav
│   ├── page.tsx            # section composition
│   └── globals.css         # design tokens, range input, marquee, motion primitives
├── components/
│   ├── Hero.tsx            # art-directed split: type left, vehicle right
│   ├── Problem.tsx         # 01 — why hybrids stalled
│   ├── Concept.tsx         # 02 — animated energy-flow topology (SVG)
│   ├── BuildLog.tsx        # 03 — sticky media viewer + 9 fabrication stages
│   ├── ModeSwitcher.tsx    # 04 — interactive speed-to-mode simulator
│   ├── TripleCharge.tsx    # 05 — solar / grid / light-coil convergence
│   ├── IotBrain.tsx        # 06 — live telemetry dashboard + BOM
│   ├── RoadTest.tsx        # 07 — video reel + test checklist
│   ├── Impact.tsx          # 08 — outcomes and roadmap
│   ├── Gallery.tsx         # 09 — 21-frame archive with keyboard-accessible lightbox
│   ├── Credits.tsx         # 10 — team, guide, PDFs, footer
│   ├── SiteNav.tsx         # scroll progress + IntersectionObserver section tracking
│   ├── SmoothScroll.tsx    # Lenis, disabled under prefers-reduced-motion
│   └── ui/                 # Reveal, Media (Img/Clip), SectionHeader, Marquee
├── content/project.ts      # ALL copy, specs and media metadata
└── public/
    ├── media/img/          # AVIF + WebP at every width the source supports
    ├── media/vid/          # WebM + MP4 + poster frames
    └── docs/               # project report and research paper
```

### Content

Every figure on the page comes from `src/content/project.ts`, which is the single source of truth.
Specs are traceable to the project report and the research paper — do not inline numbers into
components, and do not reintroduce the claims that the source slide deck copied in from an unrelated
project (driver-fatigue detection, ADAS, Raspberry Pi, CNG, MATLAB/Simulink). Those were removed
deliberately because they contradict the report.

## Media pipeline

`public/media` is generated, not hand-managed:

```bash
./scripts/build-media.sh [SOURCE_DIR]
```

`SOURCE_DIR` defaults to the repository's parent directory, which is where the raw camera files live.
The script de-duplicates identical frames, strips EXIF/GPS, converts HEIC, emits AVIF + WebP at
640/1024/1600/2200 px plus a blurred LQIP, and transcodes video to capped 1280px WebM + MP4 with
poster frames. Re-running it is safe.

Requires `imagemagick` (with AVIF and HEIC delegates), `ffmpeg` and `ffprobe`.

> **Note:** commits include ~58 MB of optimised media and ~4 MB of PDFs, so the repository is
> self-contained and deploys without a build-time fetch. If you would rather keep history lean, add
> `public/media` and `public/docs` to `.gitignore` and run the script in CI instead.

## Accessibility & performance notes

- Every interactive element is a real `<button>`, `<a>` or `<input type="range">` — the mode
  simulator is fully keyboard operable and announces `aria-valuetext`.
- The lightbox traps Escape and responds to arrow keys; the gallery grid is a list of labelled buttons.
- `prefers-reduced-motion` disables Lenis, all scroll reveals, the marquee and the SVG flow animation.
- Images carry explicit `width`/`height` and `srcSet`, so there is no layout shift and no wasted bytes.
- The hero uses a diffused copy of the same frame as an ambient backdrop, avoiding an extra request.

**Known limitation:** at 320×568 (iPhone SE, 1st gen) the hero is ~50 px taller than the viewport, so
the marquee strip sits just below the fold. Everything remains readable and there is no horizontal
overflow at any tested width (320 → 1920 px).

## Credits

Chandrasekhar M · Jana Pradap S · Madheshwaran A K — Department of Electronics & Communication
Engineering. Project guide: Dr. Balamurugan S, M.E., Ph.D.
