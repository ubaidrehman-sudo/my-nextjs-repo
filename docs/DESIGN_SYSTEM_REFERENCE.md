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
| `--accent` | `#0f766e` (Teal-700) | Primary accent, links, borders on hover |
| `--accent-hover` | `#115e59` (Teal-800) | Hover states |
| `--accent-light` | `#14b8a6` (Teal-500) | Light accents |
| `--accent-dark` | `#134e4a` (Teal-900) | Dark accents |
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
| `--gradient-primary` | `linear-gradient(135deg, #0f766e 0%, #0d9488 100%)` |
| `--gradient-vibrant` | `linear-gradient(135deg, #0f766e 0%, #115e59 100%)` |
| `--gradient-subtle` | `linear-gradient(135deg, #f0fdfa 0%, #f8fafc 100%)` |
| `--gradient-warm` | `linear-gradient(135deg, #0f766e 0%, #0d9488 100%)` |

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

Current implementation on home page (`src/app/page.tsx`):

| Order | Section | Background |
|-------|---------|------------|
| 1 | Hero | Muted (`--bg-section-muted`) |
| 2 | Home Snapshot | White (`--bg-section`) |
| 3 | Skills | Muted (`--bg-section-muted`) |
| 4 | Experience | White (`--bg-section`) |
| 5 | Featured Work | Muted (`--bg-section-muted`) |
| 6 | Latest Articles | White (`--bg-section`) |
| 7 | Kind Words (Recommendations) | Muted (`--bg-section-muted`) |
| 8 | Contact Strip | White (`--bg-section`) |
| 9 | Footer | Anchor gradient (`--bg-footer`) |

**Rule:** Adjacent full-width sections must alternate between muted and white backgrounds to create visual rhythm.

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

### Heading style convention

- **Text-width underline (default):** Section titles (Featured Work, Latest Articles, etc.) and listing page titles use a **text-width** gradient bar below the heading. The bar matches the width of the heading text via `w-fit max-w-full` wrapper. This is the default behavior of `SectionHeadingWithBar` (`underlineWidth='text'`).
- **Full-width underline (rare):** Use `underlineWidth='full'` prop on `SectionHeadingWithBar` for special cases requiring full-bleed underlines (e.g., category headers in Skills section).
- **In-page hierarchy:** Detail content headings (project detail h2s, blog MDX h1/h2) use `border-b-2 border-[var(--accent)]` for text-length underlines.
- **Hero heading:** No underline. The hero uses a tagline with one word in accent color (`tagline` + `taglineAccentWord` in `AboutMe`), or the name with shimmer. No bar under the hero headline.

### Section Headings (with gradient bar)

- **Component:** `SectionHeadingWithBar` (`src/components/SectionHeadingWithBar.tsx`) — client component that renders a heading (h1 or h2), an optional subtitle, an optional label (via `SectionLabel`), and a **text-width or full-width** gradient underline (2px height) that animates scaleX and opacity on scroll-in.
- **Usage:** Section intro headings on **home** (Featured Work, Latest Articles, Skills & Technologies, Work Experience, Kind Words) and on **listing pages** (Experience, Blog, Projects, About) for their main page title. **Not** used on blog or project **detail** pages (those keep existing title styling).
- **Props:** `title`, `subtitle?`, `label?`, `level?: 1 | 2`, `className?`, `subtitleClassName?`, `underlineWidth?: 'text' | 'full'` (default: `'text'`).
- **Bar:** 2px height, `var(--gradient-primary)`, rounded; `origin-left` scaleX 0.5 → 1 and opacity animate via Framer Motion when in view. When `underlineWidth='text'`, the bar is wrapped in `w-fit max-w-full` container; when `'full'`, it spans the full container width.

### Section Labels

- **Component:** `SectionLabel` (`src/components/SectionLabel.tsx`) — small pill-style label that appears above section headings.
- **Usage:** Optional badge for section context (e.g., "Portfolio", "Insights", "Career", "Technical Arsenal", "Who I Am").
- **Props:** `text`, `size?: 'hero' | 'section'`, `showDot?: boolean`, `className?`.
- **Styling:** Rounded-full pill with border, uppercase tracking, optional accent dot. Hero size is slightly larger than section size.

### Home Snapshot Cards

- **Component:** `HomeSnapshotSection` (`src/components/HomeSnapshotSection.tsx`) — displays 3 card highlights below the hero on home page.
- **Usage:** Quick stats/highlights (experience years, remote/global reach, education).
- **Data:** `homeSnapshotCards` in `data.ts` with `iconKey`, `label`, `value`, `caption`.
- **Styling:** 3-column grid (responsive), white cards on white section background, icons from `react-icons/fi`.

### Experience Components

- **Shared Card:** `ExperienceJobCard` (`src/components/ExperienceJobCard.tsx`) — unified job card used on both home and `/experience` page.
- **Props:** `experience`, `defaultCollapsed?: boolean` (home: `true`, full page: `true`), `showAnimation?`, `animationDelay?`.
- **Features:** Timeline dot, expandable bullets (shows 2 initially, "Show more" button), tech row, date range + tenure + "Current" pill.
- **Home Usage:** `ExperienceSection` shows latest 2 experiences, collapsed by default with expand capability.
- **Full Page Usage:** `ExperienceTimeline` shows all experiences with same card styling.

### Contact Components

- **Contact Strip:** `ContactStrip` (`src/components/ContactStrip.tsx`) — compact CTA on home page with email + LinkedIn buttons and link to full contact page.
- **Contact Page:** `src/app/contact/page.tsx` — full page with heading, status chips, email/LinkedIn cards (2-col), FAQ grid (2x2), bottom CTA band.
- **Data:** `contactChannels[]` and `contactFAQ[]` in `data.ts`.

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

### Skills Icon Mapping Convention

**Location:** `src/lib/skillIcons.tsx`

**Adding a new skill:**

1. Add the skill to `data.ts` skills array with appropriate category
2. Import the brand icon from `react-icons/si` (Simple Icons) for official technologies
3. Add mapping to `skillIconMap` object: `'SkillName': SiIconComponent`
4. Add official brand color to `skillColors` object: `'SkillName': '#hexcolor'`
5. If no official brand icon exists, use category fallback from `react-icons/fi`:
   - `FiCpu` for general computing/languages
   - `FiDatabase` for data storage
   - `FiServer` for backend/infrastructure
   - `FiCloud` for cloud services
   - `FiTool` for development tools

**Naming:** Use exact names as they appear in `data.ts` skills array. Match official brand capitalization (e.g., "Next.js" not "NextJS", "GraphQL" not "Graphql").

**Fallback:** `getSkillIcon()` returns `null` if no match found. The component handles this gracefully by not rendering an icon.

---

## 7. Animations & Micro-interactions

### CSS keyframes and utilities

| Class | Keyframe | Use |
|-------|----------|-----|
| `animate-fade-in-up` | `fadeIn` | Section entrances |
| `animate-pulse-glow` | `pulse-glow` | Subtle emphasis |
| `badge-blink` | `badge-blink` | Hero status badge: subtle opacity pulse |
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

**Focus Management:**
- [x] All interactive elements have `focus-visible:ring-2 focus-visible:ring-[var(--accent)]` with ring-offset
- [x] Navbar: logo, nav links, GitHub icon, mobile menu button, mobile drawer links
- [x] Footer: all quick links and social icons
- [x] Cards: ProjectCard, BlogCard with proper link focus
- [x] Buttons: CTAs, expand buttons, contact links
- [x] Experience cards: expand/collapse button with `aria-expanded` and `aria-controls`

**ARIA Labels:**
- [x] Decorative elements marked with `aria-hidden`
- [x] Icon-only buttons have `aria-label`
- [x] Mobile menu button has `aria-expanded`
- [x] Status pills and dots properly labeled

**Keyboard Navigation:**
- [x] All sections accessible via keyboard
- [x] Skip links for screen readers (implicit via semantic HTML)
- [x] Mobile menu fully keyboard navigable
- [x] Expandable content (experience bullets) keyboard accessible

**Color Contrast:**
- [x] All text meets WCAG AA standards
- [x] Accent color (#0f766e) provides sufficient contrast on white
- [x] Muted text (#94a3b8) on light backgrounds maintains readability

**Semantic HTML:**
- [x] Proper heading hierarchy (h1 → h2 → h3)
- [x] `<nav>`, `<footer>`, `<section>`, `<article>` elements used appropriately
- [x] Lists use `<ul>` and `<li>`
- [x] Buttons vs links correctly distinguished

### Documentation

- [x] Component inventory documented
- [x] Icon mapping conventions documented
- [ ] Component storybook or catalog (future)
- [ ] Figma design tokens export (optional)

---

---

## 11. Complete Component Inventory

### Core Layout Components

| Component | Path | Purpose |
|-----------|------|---------|
| `Navbar` | `src/components/Navbar.tsx` | Fixed top navigation with scroll-spy, responsive, context-aware routing |
| `Footer` | `src/components/Footer.tsx` | Site footer with quick links, contact, and social |
| `HeroSection` | `src/components/HeroSection.tsx` | Home page hero with tagline, bio, stats, and image |
| `SectionHeadingWithBar` | `src/components/SectionHeadingWithBar.tsx` | Section headings with optional label and animated underline |
| `SectionLabel` | `src/components/SectionLabel.tsx` | Pill-style labels for section context |

### Content Sections (Home)

| Component | Path | Purpose |
|-----------|------|---------|
| `HomeSnapshotSection` | `src/components/HomeSnapshotSection.tsx` | 3-card highlights below hero |
| `SkillsSection` | `src/components/SkillsSection.tsx` | Skills organized by category with icons |
| `ExperienceSection` | `src/components/ExperienceSection.tsx` | Latest 2 experiences on home |
| `FeaturedWorkGrid` | `src/components/FeaturedWorkGrid.tsx` | 3-column featured projects grid |
| `LatestArticlesGrid` | `src/components/LatestArticlesGrid.tsx` | 3-column blog posts grid |
| `RecommendationTicker` | `src/components/RecommendationTicker.tsx` | Client testimonials (grid or marquee) |
| `ContactStrip` | `src/components/ContactStrip.tsx` | Compact CTA strip on home |

### Shared/Reusable Components

| Component | Path | Purpose |
|-----------|------|---------|
| `ExperienceJobCard` | `src/components/ExperienceJobCard.tsx` | Unified job card with timeline dot, expandable bullets, tech tags |
| `ExperienceTimeline` | `src/components/ExperienceTimeline.tsx` | Full experience list wrapper |
| `ProjectCard` | `src/components/ProjectCard.tsx` | Project card with image, tech tags, external links |
| `BlogCard` | `src/components/BlogCard.tsx` | Blog post card with image and metadata |
| `BlogSearch` | `src/components/BlogSearch.tsx` | Client-side blog filtering |
| `Breadcrumbs` | `src/components/Breadcrumbs.tsx` | Semantic breadcrumb trail with chevron separators |

### Pages

| Route | Purpose | Key Features |
|-------|---------|--------------|
| `/` (home) | Main landing page | Hero, snapshot, skills, experience, featured work, articles, recommendations, contact strip |
| `/about` | Personal story and values | Extended narrative, values grid, interests, work style, experience link |
| `/experience` | Full work timeline | All experiences, education, certifications, recommendations |
| `/projects` | Project portfolio | All projects with filtering |
| `/projects/[slug]` | Project case study | Detailed project breakdown (readable slug URLs) |
| `/blog` | Blog index | All posts with search/filter |
| `/blog/[slug]` | Article detail | MDX content with custom styling |
| `/contact` | Contact page | Email/LinkedIn cards, FAQ grid, CTA band |

---

## 12. Detail Page Pattern

Used on `/projects/[slug]`. Blog detail (`/blog/[slug]`) will adopt the same structure in a follow-up.

### Shell

`min-h-screen pt-32 pb-20` — no full-bleed hero banner. The cover becomes an inline figure, which works identically for both project and blog detail.

### Layout (top to bottom, all inside `max-w-7xl mx-auto px-4`)

| Block | Component / element | Condition |
|---|---|---|
| **Breadcrumbs** | `<Breadcrumbs>` | Always |
| **Header block** (`max-w-4xl`) | Meta chips + h1 with accent dot + description + CTA row | Always |
| **Inline cover image** | `aspect-[16/9]`, `rounded-2xl`, gradient overlay at bottom | Only if `image` is set |
| **Project Statement** card | `longDescription` prose | If `longDescription` |
| **Two-column row** (12-col grid) | Key Highlights (lg:col-span-7) + Challenge/Outcome stack (lg:col-span-5) | If any of `highlights`, `problemStatement`, or `outcome` |
| **My Contribution** card | `contributions[]` bullet list | If `contributions` |
| **Architectural Decisions** card | `architecture[]` bullet list | If `architecture` |
| **Tech Stack** chip wall | `technologies[]` | Always |
| **Tools** chip wall | `tools[]` | If `tools` |
| **More Projects rail** | 2-card grid, divider top, `SectionLabel` + `SectionHeadingWithBar` | If other featured projects exist |

### Header block conventions

- **Meta chips:** `Domain`, `Year`, `Role` — each a rounded-full pill using `bg-[var(--bg-section-muted)]` + `border border-[var(--border-muted)]`, uppercase, `text-xs tracking-wide`. Render only when the field is present.
- **Title:** `font-serif text-5xl md:text-7xl font-bold` with a trailing `<span className="text-[var(--accent)]">.</span>` accent dot — the signature touch across detail pages.
- **Description:** `text-xl md:text-2xl text-[var(--text-secondary)]`.
- **CTAs:** `btn-primary` for "View Live Site" (external icon), `btn-secondary` for "View Source" (GitHub icon). Both conditional on field presence.

### Content card conventions

Every content card follows the same shell:

```
bg-[var(--bg-section)] border border-[var(--border-muted)] rounded-2xl shadow-[var(--shadow-surface)] p-8
```

Card header: icon in a `w-8 h-8 rounded-lg` square tinted with `bg-[color-mix(in_srgb,var(--accent)_10%,transparent)]`, icon itself in `text-[var(--accent)]`. Title `text-lg font-bold text-[var(--text-primary)]` beside it.

Each block uses `animate-fade-in-up` (existing utility) for scroll entrance consistency.

### Breadcrumbs component

**Component:** `Breadcrumbs` (`src/components/Breadcrumbs.tsx`)  
**Props:** `items: { label: string; href?: string }[]`  
**Semantics:** `<nav aria-label="Breadcrumb"><ol>` — last item gets `aria-current="page"` and `text-[var(--text-primary)]`; preceding items are muted links with `hover:text-[var(--accent)]`. Chevron `›` separator (`aria-hidden`).  
**Reuse:** Pass `[{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog' }, { label: title }]` on blog detail.

### More Projects rail

- Divider `border-t border-[var(--border-muted)] mt-24 pt-16`.
- Header row: `SectionLabel "Continue Exploring"` + `SectionHeadingWithBar "More Projects"` + `View all →` link right-aligned (hidden on mobile, shown inline below grid on mobile).
- 2-card `md:grid-cols-2` grid using `ProjectCard variant="compact"`.
- Selection: other `featured` projects, same-domain first, then by `priority`, capped at 2.

### Data model (`Project` type)

| Field | Type | Purpose |
|---|---|---|
| `slug` | `string` | Kebab-case URL segment (replaces `id`) |
| `year` | `number?` | Meta chip |
| `contributions` | `string[]?` | My Contribution bullets (replaces `approach`) |
| `outcome` | `string?` | The Outcome paragraph |
| `architecture` | `string[]?` | Architectural Decisions bullets |
| `tools` | `string[]?` | Tools chip wall (separate from `technologies`) |

### Blog detail (follow-up — not yet implemented)

When `/blog/[slug]` is redesigned, it will reuse:
- `Breadcrumbs` (`Home / Blog / {title}`)
- Header block with chips = `Category`, `Date`, `Reading time`
- Inline cover image figure
- Content body replaced by MDX `MarkdownRenderer`
- Tags chip wall + "More Articles" rail at the bottom

No additional design tokens or new visual language will be needed.

---

## Changelog (design system)

- **Apr 2026:** About page enrichment (Checklist I) — Added extended story fields (`story[]`, `workStyle`, `values[]`, `interests[]`) to `AboutMe` type. About page now includes: section label "Who I Am", multi-paragraph story, values grid with checkmarks, interests pills, remote/global work style card, and professional timeline link. Remote framing replaces plain location.
- **Apr 2026:** Complete portfolio implementation (Checklists A-H) — Home snapshot section (3 cards below hero), unified `ExperienceJobCard` with expandable bullets and tenure calculation, Skills section with category cards and full icon coverage, Contact page with FAQ and channels, `SectionLabel` component integrated with `SectionHeadingWithBar`, consistent section background alternation (grey→white rhythm), all components using CSS variables. Design system reference updated with component inventory and icon mapping conventions.
- **Mar 2025:** Hero redesign — content left / image right; blinking status badge (`.badge-blink`) above name; optional tagline with accent word; divider and hero stats row (years, projects, expertise); enhanced image card shadow. `AboutMe`: `status`, `tagline`, `taglineAccentWord`, `heroStats`. CTAs: Let's Connect (mailto) + Download CV. Heading style convention documented: full-length (section titles), text-length (detail h2s), hero (no underline, accent word).
- **Feb 2025:** Home page polish — hero name shimmer (`hero-name-shimmer`), hero background gradient mesh (`hero-bg-mesh`), `.btn-primary` and button hover glow in `globals.css`, scroll-triggered card reveals (Featured Work / Latest Articles), `SectionHeadingWithBar` for section titles on home and listing pages. Design system doc updated as source of truth.
- **Feb 2025:** Navbar — transparent state over blog/project hero with `.nav-over-hero-text` (text-shadow) for visibility on any image; context-aware nav (Work → `/projects`, Blog → `/blog` from other pages; scroll-to-section on home); scroll-spy on home for section highlighting; active link uses `--accent-light` when over hero; focus-visible ring on all nav interactive elements. Footer — unified column divider (`--accent`/40), social hover border teal, bottom bar divider `--accent`/25, "Built with" removed. Section heading bar — full-width 2px gradient underline with scale-in animation. Skill badges — icon brand colors via `getSkillColor`, teal hover on badge only.

---

*Last updated: April 2026*
