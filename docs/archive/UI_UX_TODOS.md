# UI/UX Implementation Todos

**Source:** Merged from [UI_UX_ANALYSIS_FINDINGS.md](UI_UX_ANALYSIS_FINDINGS.md) + [my_takes.md](my_takes.md)

---

## Milestone Summary

| Milestone | After Todo # | What You'll See | Total to Reach |
|-----------|--------------|-----------------|----------------|
| **A. Page works** | 7 | Build runs; no broken animations; About in nav; mobile menu works | 7 |
| **B. Foundation visible** | 22 | Tokens, section rhythm, unified headings. Home looks more structured | 22 |
| **C. Hero tangible** | 32 | Hero fully refined. First section with new design system | 32 |
| **D. Full home screen** | 65 | Hero, Skills, Experience, Featured Work, Education, Articles, Kind Words, Footer — all redesigned | 65 |
| **E. Complete** | 72 | + Cleanup, design docs, other pages | 72 |

---

## Phase 0 — Critical Fixes (7 todos)

*After these: run `npm run build` and `npm run dev` — page works, no broken classes.*

- [ ] **0.1** Add `.animate-fade-in-up` to globals.css (use existing `fadeIn` keyframe)
- [ ] **0.2** Add `.animate-pulse-glow` to globals.css (use existing `pulse-glow` keyframe)
- [ ] **0.3** Add About link to Navbar navLinks
- [ ] **0.4** Implement mobile menu in Navbar (drawer/dropdown with nav links)
- [ ] **0.5** Fix Experience page: remove invalid `reverse` from `flex-grow reverse`
- [ ] **0.6** About page: replace `hover:text-gray-600` with `hover:text-[var(--foreground)]`; add `pt-32`
- [ ] **0.7** Footer: replace `#0077b5` and `#1DA1F2` with `var(--accent)` or design token

---

## Phase 1 — Foundation: Design System (15 todos)

*After these: home sections use tokens, rhythm, and unified headings. VISIBLE on home.*

- [ ] **1.1** Extend globals.css tokens: add `--primary-500`, `--primary-600`, `--text-primary`, `--text-secondary`, `--text-muted`, `--bg-page`, `--bg-section`, `--bg-section-muted`, `--border-muted` (map to/from existing --accent, --foreground)
- [ ] **1.2** Remove all hardcoded hex colors from components; use tokens only
- [ ] **1.3** Add shadow system: 3 levels — Surface, Hover, Modal (replace/consolidate existing)
- [ ] **1.4** Add global transition: `220ms cubic-bezier(0.4, 0, 0.2, 1)`; remove fast/bounce
- [ ] **1.5** Define border + hover activation: base = muted border + surface shadow; hover = teal border + translateY(-2px) + hover shadow
- [ ] **1.6** Apply section background rhythm to home: Hero→muted, Skills→white, Experience→muted, Featured Work→muted, Articles→white, Kind Words→muted, Footer→anchor
- [ ] **1.7** Standardize all section headings: left-aligned, same font/weight/size, same spacing
- [ ] **1.8** Remove centered headings from SkillsSection and others
- [ ] **1.9** Remove badge labels above headings (e.g. "Tech Stack" pill)
- [ ] **1.10** Remove decorative separators (lines, dots) from section headers
- [ ] **1.11** SkillsSection: remove purple/orange/pink category pills
- [ ] **1.12** SkillsSection: replace with neutral surfaces + teal accent only on hover
- [ ] **1.13** Add standardized section structure: `<h2>Title</h2><p>Subtext</p>` everywhere
- [ ] **1.14** Apply py-24, mb-12 consistently for sections
- [ ] **1.15** ExperienceSection + EducationSection: align with rhythm and heading system

---

## Phase 2 — Hero Section (10 todos)

*After these: Hero is fully refined. Tangible "first impression" change.*

- [x] **2.1** Hero layout: two-column (40% left / 60% right); stack vertically on mobile
- [x] **2.2** Hero min-height: 100vh, flex, align-items center
- [x] **2.3** Replace decorative orbs with soft radial teal glow (opacity max 5%); remove dotted/animated backgrounds
- [x] **2.4** Name typography: `clamp(2.5rem, 5vw, 4rem)`, weight 700/800
- [x] **2.5** Title line: static text (Option A) or subtle slow blink (Option B); no typing animation
- [x] **2.6** Update bio/positioning statement to architect tone (max 2 lines)
- [x] **2.7** Primary button: filled teal, hover darker; Secondary: outline, hover teal border + 3% tint
- [x] **2.8** Image card: base = muted border + L1 shadow; hover = translateY(-2px), teal border, L2 shadow
- [x] **2.9** Hero spacing: Name→12px→Title, Title→16px→Statement, Statement→24px→Buttons; navbar gap = navbarHeight + 24px
- [x] **2.10** Micro-interactions: fade-in on load, slight lift only; no parallax, bounce, overshoot

---

## Phase 3 — Skills Section (8 todos)

*After these: Skills feels structured, neutral, enterprise-ready.*

- [x] **3.1** Skills section structure: left heading, subtext, skills-grid
- [x] **3.2** Remove multi-color category headers (purple, orange, pink, rainbow)
- [x] **3.3** Add neutral group headers: Icon + text, border-bottom, no colored backgrounds
- [x] **3.4** Skill chips: white bg, muted border, 6px 12px padding; hover: teal border, translateY(-1px), 3% tint
- [x] **3.5** No solid teal pills or filled accent backgrounds on chips
- [x] **3.6** Grid: 2 columns desktop (3 max), 2 tablet, 1 mobile
- [x] **3.7** Copy: architect-style subtext (e.g. "I design and implement production-ready systems...")
- [x] **3.8** Micro-interactions: subtle fade-in on scroll, chip border on hover only; no glow, shimmer, animated icons

---

## Phase 4 — Featured Work (10 todos)

*After these: Projects feel case-study grade.*

- [x] **4.1** Section layout: heading left, View All button right; py-24, mb-12
- [x] **4.2** Grid: 2 columns desktop, large vertical spacing; 1 column tablet
- [x] **4.3** Card base: white, muted border, L1 shadow; hover: translateY(-2px), teal border, L2
- [x] **4.4** Entire card clickable → detail page; overlay icon buttons → external links (stopPropagation)
- [x] **4.5** Image: 16:9 aspect ratio, real screenshots where possible
- [x] **4.6** Overlay icon buttons: small, outline, white 90% opacity; hover teal border
- [x] **4.7** Title + description: strategic, architectural copy (problem + layer)
- [x] **4.8** Tech tags: neutral styling only; no colored category tags
- [x] **4.9** CTA: "View Case Study →" not "View Details"
- [x] **4.10** Maintain section rhythm (muted bg)

---

## Phase 5 — Articles Section (8 todos)

*After these: Articles feel thought-leadership, not bloggy.*

- [x] **5.1** Section structure: heading left, button right; same as Featured Work
- [x] **5.2** Grid: 3 columns desktop, 2 tablet, 1 mobile
- [x] **5.3** Card: same radius, shadow scale, hover lift, border activation as Projects
- [x] **5.4** Article card: ImageArea, CardBody (category + reading time, title, summary, CTA)
- [x] **5.5** Lighter visual weight than Projects: slightly smaller title, more whitespace
- [x] **5.6** Category/metadata: uppercase, letter-spacing, muted; no bright teal badge
- [x] **5.7** Summary: 1–2 lines, architect-style; CTA "Read Article →"
- [x] **5.8** Section rhythm: white bg (alternate from Featured Work muted)

---

## Phase 6 — Kind Words + Footer (7 todos)

*After these: Full home screen redesigned.*

- [x] **6.1** Kind Words: left heading, subtext; py-24, mb-12; bg-section-muted
- [x] **6.2** Testimonial cards: white, muted border, L1; hover: lift, teal border, L2
- [x] **6.3** Replace marquee with grid (if <4) or calm horizontal scroll / slow auto-slide
- [x] **6.4** Optional: large quote icon background at 3–4% opacity
- [x] **6.5** Footer: slightly darker anchor bg (e.g. #e8eceb); 3–4 columns desktop
- [x] **6.6** Footer: name, positioning statement, quick links, social; tone serious
- [x] **6.7** Footer links: muted base; hover teal, subtle underline

---

## Phase 7 — Cleanup & Docs (7 todos)

*After these: polish and documentation complete.*

- [ ] **7.1** Remove SkillCard component or migrate to design tokens
- [ ] **7.2** Remove Navigation.tsx if unused
- [ ] **7.3** Video placeholder: replace with real video or remove Intro Video CTA
- [ ] **7.4** Add animation-delay utilities if needed (e.g. .delay-100, .delay-200)
- [ ] **7.5** Create docs/DESIGN_SYSTEM.md (typography, widths, tokens, animations)
- [ ] **7.6** Apply fixes to About, Blog, Projects, Experience pages (tokens, headings)
- [ ] **7.7** Verify contrast for gradient text; fix if needed

---

## Todo Count by Phase

| Phase | Count |
|-------|-------|
| 0 | 7 |
| 1 | 15 |
| 2 | 10 |
| 3 | 8 |
| 4 | 10 |
| 5 | 8 |
| 6 | 7 |
| 7 | 7 |
| **Total** | **72** |

---

## Quick Reference: When to Test

- **After 7 todos (Phase 0):** `npm run build` — everything works, no broken animations.
- **After 22 todos (Phase 0 + 1):** First tangible home redesign — tokens, rhythm, headings.
- **After 32 todos (+ Phase 2):** Hero section fully refined.
- **After 65 todos (+ Phases 3–6):** Full home screen redesigned end-to-end.
- **After 72 todos:** Complete (cleanup + docs).
