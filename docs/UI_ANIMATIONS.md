# UI Animations Tracking

This document tracks every motion/animation enhancement on the site — both what already
exists in the codebase and anything proposed for the future — under a stable ID so any
single one can be quickly identified, discussed, and reverted without touching unrelated
motion.

**Rule for any future addition:** every new entry must respect `prefers-reduced-motion`
(disable or drastically reduce motion for users who request it), must be scoped to the
smallest reasonable unit of CSS/component code, and must reference its ID in a code comment
at the point of implementation so `grep`-ing the ID finds every affected file.

To revert an animation: find its row below, open each file in **Files**, and remove/revert
the change described in **Animation**. Update **Status** to `Reverted` rather than deleting
the row, so the history stays visible.

## Existing (already in the codebase)

| ID | Page/Component | Animation | Files | Purpose | Status |
|---|---|---|---|---|---|
| ANIM-001 | Projects grid (and Blog listing, same pattern) | Staggered entrance: `animation: fadeIn 0.6s ease-out {index * 0.1}s both` per card | `src/app/projects/page.tsx`, `src/app/globals.css` (`@keyframes fadeIn`) | Gentle reveal so the grid doesn't pop in all at once | Existing |
| ANIM-002 | SkillsSection, ExperienceSection, FeaturedWorkGrid, SectionHeadingWithBar underline | framer-motion `whileInView` scroll reveal (opacity/translateY on enter, animated underline width) | `src/components/SkillsSection.tsx`, `src/components/ExperienceSection.tsx`, `src/components/FeaturedWorkGrid.tsx`, `src/components/SectionHeadingWithBar.tsx` | Section-entrance polish as the user scrolls | Existing |
| ANIM-003 | ProjectCard, ReviewCard, ExperienceJobCard, RecommendationTicker cards | Hover lift + shadow (`hover:-translate-y-0.5`, `hover:shadow-[var(--shadow-hover)]` / `--shadow-teal`) | `src/components/ProjectCard.tsx`, `src/components/ReviewCard.tsx`, `src/components/ExperienceJobCard.tsx`, `src/components/RecommendationTicker.tsx` | Interaction feedback signalling a card is the same kind of clickable/focusable surface | Existing |
| ANIM-004 | RecommendationTicker ("Kind Words") | Infinite horizontal marquee (`animate-marquee`, 40s linear), pauses on hover | `src/components/RecommendationTicker.tsx`, `src/app/globals.css` (`@keyframes marquee`, `.animate-marquee`) | Passive motion to showcase testimonials without requiring interaction; pause-on-hover keeps it readable | Existing |
| ANIM-005 | Navbar | Animated active-link "dot" and hover "pill" background via framer-motion `layoutId` shared-layout transitions; scroll-progress bar (`useScroll`/`useSpring`) | `src/components/Navbar.tsx` | Nav feels responsive and alive without being distracting | Existing |
| ANIM-006 | Home Snapshot cards ("Engineer Behind the Code") | Hover lift + shadow, added as part of the Part 1 fix in this pass (`hover:-translate-y-0.5`, `transition-base`) | `src/components/HomeSnapshotSection.tsx` | Bring hover feedback in line with the Projects section's card convention | Existing (implemented this pass) |

## Proposed (not implemented — candidates for a future pass)

| ID | Page/Component | Animation | Files | Purpose | Priority | Effort |
|---|---|---|---|---|---|---|
| ANIM-007 | HomeSnapshotSection cards | Staggered fade/translate-in on scroll, mirroring ANIM-001's grid stagger (via framer-motion `whileInView`, matching ANIM-002's convention rather than introducing a new one) | `src/components/HomeSnapshotSection.tsx` | Currently these 3 cards appear instantly; a light stagger would match the polish already present on Skills/Experience/Featured Work | Low | Small |
| ANIM-008 | Breadcrumbs | Subtle opacity/translateY entrance on route change (very short, ~150ms) | `src/components/Breadcrumbs.tsx` | Softens the "hard cut" when navigating between detail pages; must stay near-instant so it doesn't read as a loading delay | Low | Small |
| ANIM-009 | Footer social icons | Small icon-level nudge (e.g. `scale-105`) layered onto the existing `hover:-translate-y-1` lift, to reinforce the "this is a link" affordance without adding a second competing motion | Low | `src/components/Footer.tsx` | Small |
| ANIM-010 | BlogCard / ProjectCard "read more" arrow | Icon micro-translate on hover (already present as `group-hover:translate-x-1`/`group-hover:gap-3` in some spots) — audit for consistency and extend to any card missing it | `src/components/BlogCard.tsx`, `src/components/ProjectCard.tsx` | Consistent "the arrow nudges forward" feedback across every card type | Low | Small |

All proposed items above are intentionally small (translate/opacity/scale only), consistent
with the existing motion vocabulary, and excluded from this implementation pass per the
project's Part 1 scope — they are documented here for a future, separate decision.
