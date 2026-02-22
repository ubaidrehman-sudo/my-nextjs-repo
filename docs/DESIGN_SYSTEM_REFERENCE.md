# Portfolio Design System Reference

**Source of truth** for styling, theming, typography, and future enhancements.

---

## 1. Color Palette & Theming

### Primary Tokens (CSS Variables in `globals.css`)

| Token | Value | Usage |
|-------|-------|-------|
| `--background` | `#f8fafc` (Slate-50) | Page background |
| `--background-soft` | `#f1f5f9` (Slate-100) | Subtle section backgrounds |
| `--background-elevated` | `#ffffff` | Cards, elevated surfaces |
| `--foreground` | `#0f172a` (Slate-900) | Primary text |
| `--text-primary` | `#0f172a` | Headings, emphasis |
| `--text-secondary` | `#475569` | Body text |
| `--text-muted` | `#94a3b8` | Labels, tertiary text |

### Accent Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--accent` | `#14b8a6` (Teal-500) | Primary accent, links, borders on hover |
| `--accent-hover` | `#0d9488` (Teal-600) | Hover states |
| `--accent-light` | `#5eead4` (Teal-300) | Light accents |
| `--accent-dark` | `#0f766e` (Teal-700) | Dark accents |
| `--accent-orange` | `#f97316` | Highlights (use sparingly) |
| `--accent-purple` | `#a855f7` | Special elements |
| `--accent-pink` | `#ec4899` | Vibrant touches |

### Borders & Backgrounds

| Token | Purpose |
|-------|---------|
| `--border`, `--border-muted` | Default borders |
| `--border-strong` | Emphasized borders |
| `--bg-page`, `--bg-section`, `--bg-section-muted` | Section rhythm |

---

## 2. Shadows

| Token | Usage |
|-------|-------|
| `--shadow-surface` | Cards at rest |
| `--shadow-hover` | Cards on hover, elevated surfaces |
| `--shadow-modal` | Dialogs, overlays |
| `--shadow-teal` | Accent glow on focus/hover |

---

## 3. Gradients

| Token | Definition |
|-------|------------|
| `--gradient-primary` | `linear-gradient(135deg, #14b8a6, #06b6d4)` |
| `--gradient-vibrant` | Teal → Purple → Pink |
| `--gradient-subtle` | Soft teal tints |
| `--gradient-warm` | Teal → Orange |

**Utilities:** `gradient-primary`, `gradient-text`, `gradient-vibrant`, `glass-effect`

---

## 4. Typography & Fonts

### Current Setup

- **Body font:** System font stack: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`
- **Class:** `font-sans` on body; `font-serif` used for hero and blog/project titles

### Typography Scale (Recommendations)

| Context | Size | Token/Class |
|---------|------|-------------|
| Page titles (Blog, Projects) | 5xl–7xl | `text-5xl md:text-7xl` |
| Section headers | 3xl–4xl | `text-3xl` or `text-4xl` |
| Card titles | xl–2xl | `text-xl` |
| Body text | base | Default |
| Labels, metadata | xs–sm | `text-xs`, `text-sm` |

### Future Enhancements (Typography)

- [ ] Add `--font-display` and `--font-body` tokens
- [ ] Consider Google Fonts: Inter, Geist, or Source Serif for headings
- [ ] Standardize heading hierarchy across all pages
- [ ] Document when to use `font-serif` vs `font-sans`

---

## 5. Section Rhythm & Layout

### Content Widths

| Width | Usage |
|-------|-------|
| `max-w-7xl` | Index pages, grid layouts (Blog, Projects, Home) |
| `max-w-4xl` | Prose, detail content (About, Experience, single post) |

### Section Background Alternation

- Hero → muted
- Skills → white
- Experience → muted
- Featured Work → white
- Articles → muted
- Kind Words → white
- Footer → anchor (`--bg-footer`)

### Spacing

- Section padding: `py-24`, `mb-12`
- Navbar offset: `pt-32` on index pages

---

## 6. Component Patterns

### Cards

- **Base:** `border border-[var(--border-muted)]`, `shadow-[var(--shadow-surface)]`
- **Hover:** `border-[var(--accent)]`, `translateY(-2px)`, `shadow-[var(--shadow-hover)]`
- **Utility classes:** `card-base`, `card-hover`

### Buttons

- **Primary:** `.btn-primary` — filled teal, hover darker; **hover glow:** `box-shadow` includes `0 0 20px rgba(20, 184, 166, 0.25)`. Use for main CTAs (e.g. Watch Video).
- **Secondary:** `.btn-secondary` — outline, hover teal border and lift; **hover glow:** same teal glow as primary for consistency. Use for View All, Back to Home, Download Resume, etc.
- Both button styles are defined in `globals.css` so hover glow is **app-wide** wherever these classes are used.

### Section Headings (with gradient bar)

- **Component:** `SectionHeadingWithBar` (`src/components/SectionHeadingWithBar.tsx`) — client component that renders a heading (h1 or h2), an optional subtitle, and a **full-width** teal–cyan gradient underline (2px height) that animates scaleX and opacity on scroll-in.
- **Usage:** Section intro headings on **home** (Featured Work, Latest Articles, Skills & Technologies, Work Experience, Kind Words) and on **listing pages** (Experience, Blog, Projects, About) for their main page title. **Not** used on blog or project **detail** pages (those keep existing title styling).
- **Props:** `title`, `subtitle?`, `level?: 1 | 2`, `className?`, `subtitleClassName?`.
- **Bar:** 2px height, full width, `var(--gradient-primary)`, rounded; `origin-left` scaleX 0.5 → 1 and opacity animate via Framer Motion when in view.

### Navbar

- **Component:** `Navbar` (`src/components/Navbar.tsx`) — fixed top bar with logo, nav links, and optional GitHub icon.
- **States:** (1) **Default (e.g. home):** `bg-[var(--background)]/80`, foreground/muted text; (2) **Scrolled:** `bg-[var(--background)]/95` with backdrop blur; (3) **Over hero (blog/project detail, before scroll):** `bg-gradient-to-b from-black/70 to-transparent`, white text with `.nav-over-hero-text` for legibility on any hero image.
- **Visibility over hero:** `.nav-over-hero-text` in `globals.css` applies a dark text-shadow so white nav text stays readable on light or busy hero images. Logo, links, and GitHub icon get this class when `isTransparent`.
- **Context-aware navigation:** On **home**, Work and Blog scroll to `#projects` and `#blog`; Skills/Experience use `/#skills`, `/#experience`. On **other pages**, nav items go to their page (e.g. Work → `/projects`, Blog → `/blog`); Skills/Experience go to `/#skills`, `/#experience` (home + hash).
- **Scroll-spy (home only):** The nav item for the section currently in view is highlighted (active dot + accent or accent-light text). Section IDs: `skills`, `experience`, `projects`, `blog`.
- **Active when over hero:** Active link uses `--accent-light` and `.nav-over-hero-text` so it stands out on dark/busy heroes.
- **Focus:** All interactive elements (logo, nav links, GitHub, mobile button, drawer links) use `focus-visible:ring-2 focus-visible:ring-[var(--accent)]` and ring-offset for keyboard users.

### Footer

- **Component:** `Footer` (`src/components/Footer.tsx`) — multi-column footer with name/bio, Quick Links, Contact, and Connect (social icons).
- **Column headers:** All use the same left accent divider: `border-l-2 border-[var(--accent)]/40` (Quick Links, Contact, Connect).
- **Social links:** Rounded square icons; **hover border** is teal (`border-[var(--accent)]`) for all (GitHub, LinkedIn, Twitter). Icon and background hover colors remain per-platform.
- **Bottom bar:** Single copyright line; divider above uses `border-t border-[var(--accent)]/25`. "Built with" line removed.

### Skill Badges

- **Badge:** Base — white bg (`--bg-section`), muted border, padding ~6px 12px. Hover — teal border, `translateY(-1px)`, shadow, 3% accent tint.
- **Icons:** Each skill icon uses its **brand color** (e.g. GraphQL pink) via `getSkillColor(skill.name)` in `SkillsSection`; color applied with inline `style`, unchanged on hover. Hover styling applies only to the badge (border, lift, tint), not the icon color.

---

## 7. Animations & Micro-interactions

### CSS keyframes and utilities

| Class | Keyframe | Use |
|-------|----------|-----|
| `animate-fade-in-up` | `fadeIn` | Section entrances |
| `animate-pulse-glow` | `pulse-glow` | Subtle emphasis |
| `animate-marquee` | `marquee` | Recommendation ticker |
| `hero-name-shimmer` | `shimmer` | Hero name: faint highlight sweep every ~6s (background-clip: text) |
| `hero-bg-mesh` | `heroMesh` | Hero background: single drifting gradient mesh over ~20s, low opacity |

**Transition:** `--transition-base`: `220ms cubic-bezier(0.4, 0, 0.2, 1)`

### Scroll-triggered behavior (Framer Motion)

- **Featured Work / Latest Articles (home):** Cards use `whileInView` with staggered delay (`index * 0.1s`) so they reveal as the user scrolls. Implemented in `FeaturedWorkGrid.tsx` and `LatestArticlesGrid.tsx`.
- **Section heading bar:** Gradient bar under section titles animates width 0 → 48px when the heading enters view (see Section Headings in Component Patterns).

---

## 8. Prose Styling (Blog Content)

`.prose-custom` defines styles for:

- **h1, h2:** Accent border-bottom
- **p:** `text-secondary`, line-height 1.75
- **ul, ol:** Left padding, list styling
- **a:** Accent color, underline on hover
- **blockquote:** Left border, muted background
- **img:** Rounded, bordered, shadowed

---

## 9. Code Syntax Highlighting

- Theme: GitHub dark (`#0d1117` background)
- Keywords, strings, comments use standard HLJS palette

---

## 10. Future Enhancements

### Styling

- [ ] Dark mode: Add `[data-theme="dark"]` overrides for all tokens
- [ ] RTL support if needed
- [ ] Reduced motion: `prefers-reduced-motion` media query

### Theming

- [ ] Theme switcher (light/dark/system)
- [ ] Optional accent color picker (keep teal as default)

### Fonts

- [ ] Load custom font (e.g., Geist, Inter) for headings
- [ ] Typography scale documented and applied consistently

### Accessibility

- [ ] Verify contrast for gradient text (`gradient-text` utility)
- [x] Focus styles for navbar (logo, links, GitHub, mobile menu) — `focus-visible:ring-2` with accent

### Documentation

- [ ] Component storybook or catalog
- [ ] Figma design tokens export (optional)

---

---

## Changelog (design system)

- **Feb 2025:** Home page polish — hero name shimmer (`hero-name-shimmer`), hero background gradient mesh (`hero-bg-mesh`), `.btn-primary` and button hover glow in `globals.css`, scroll-triggered card reveals (Featured Work / Latest Articles), `SectionHeadingWithBar` for section titles on home and listing pages. Design system doc updated as source of truth.
- **Feb 2025:** Navbar — transparent state over blog/project hero with `.nav-over-hero-text` (text-shadow) for visibility on any image; context-aware nav (Work → `/projects`, Blog → `/blog` from other pages; scroll-to-section on home); scroll-spy on home for section highlighting; active link uses `--accent-light` when over hero; focus-visible ring on all nav interactive elements. Footer — unified column divider (`--accent`/40), social hover border teal, bottom bar divider `--accent`/25, "Built with" removed. Section heading bar — full-width 2px gradient underline with scale-in animation. Skill badges — icon brand colors via `getSkillColor`, teal hover on badge only.

---

*Last updated: February 2025*
