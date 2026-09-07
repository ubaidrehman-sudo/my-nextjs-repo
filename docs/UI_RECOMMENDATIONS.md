# UI Recommendations (Not Implemented)

This document captures the Part 2 (broader UI/positioning) and Part 3 (animation) review
findings from the portfolio UI audit. Nothing here has been implemented — these are
recommendations only, to be prioritized and actioned separately. For the fixes that *were*
implemented in that pass, see git history / the corresponding plan; for animation tracking
specifically, see [`UI_ANIMATIONS.md`](./UI_ANIMATIONS.md).

Positioning context: the site should read as a **Solution Architect / Forward Deployed
Engineer / strong backend-full-stack engineer / AI-GenAI engineer** — someone technically
deep who can also engage with product and business problems.

---

## Part 2 — UI & Content Recommendations

| # | Area/Page | Current Observation | Suggested Improvement | Why It Improves the Portfolio | Priority | Effort |
|---|---|---|---|---|---|---|
| 1 | Sitewide identity (Hero, `layout.tsx` metadata) | Hero says "Senior Solution Architect"; `layout.tsx` SEO metadata (title/description/keywords/OG/Twitter) says "Full Stack Developer" — two different positionings, neither mentioning AI/GenAI or FDE | Pick one consistent positioning statement and propagate it to Hero copy, `layout.tsx` metadata, OG/Twitter tags, and keywords | A visitor and a search engine currently get conflicting signals about who this person is; inconsistent identity undermines credibility before content is even read | High | Small |
| 2 | Skills data (`src/lib/data.ts`) | No AI/GenAI/LLM skills or keywords anywhere in `skills[]` (27 items across Frontend/Backend/Database/Cloud/Tools — no AI-specific category) despite that being core positioning | Add a dedicated AI/GenAI category (e.g. LangChain, vector DBs, prompt engineering, model provider APIs, RAG patterns) | Directly supports the "AI/GenAI engineer" identity; currently the skills list reads as generic full-stack | High | Medium |
| 3 | All content (`src/lib/data.ts`) | Data is explicitly placeholder/dummy: "John Doe", `example.com` links, fake companies (Stripe, Atlassian, Accenture) with fabricated metrics | Replace with real name, real employers/projects, real case-study or repo links | Fake data undermines credibility the moment a reader clicks through or recognizes the placeholder pattern | High | Large |
| 4 | Contact section framing (`ContactSection.tsx`) | FAQ and copy read as fractional-consultant/advisory ("engagement model", "architecture reviews", "consulting... advisory roles") | Rebalance toward hands-on delivery framing consistent with FDE/engineer positioning, without dropping the advisory angle entirely | Advisory-only framing undersells hands-on technical depth for an FDE-style role | Medium | Small |
| 5 | Dead/duplicate code | `SkillCard.tsx` (percentage-bar variant) is unused (SkillsSection uses `.skill-badge` chips instead); `tools[]` data is unused; Education is rendered twice with different markup (`EducationSection.tsx` vs. inline in `experience/page.tsx`) | Remove unused components/data, or consolidate Education into one shared component reused by both call sites | Reduces maintenance surface and risk of the two Education renderings silently drifting apart | Low | Small |
| 6 | Architecture/system-design storytelling (Project detail pages) | Projects already have rich text (architecture bullets, problem/outcome, contributions) but no diagrams or visuals | Add a simple architecture/system diagram for 1-2 flagship projects | For a Solution Architect/FDE positioning, a visual system diagram is a stronger credibility signal than prose alone | Medium | Medium |
| 7 | Responsive depth (About, Skills pages) | These sections lean on a single grid-column breakpoint toggle (`grid-cols-1 md:grid-cols-2`) rather than tuned spacing/typography per breakpoint, unlike Hero/Contact which have denser breakpoint coverage | Add finer `sm:`/`md:` tuning (spacing, font-size) to About and Skills sections | Currently functional but visibly less polished on tablet-width viewports than the rest of the site | Low | Small |
| 8 | Testimonials data usage | `reviews[]` in `data.ts` is used by `RecommendationTicker`, but a separate `ReviewCard.tsx` component with near-identical markup appears unused/orphaned | Confirm via import search whether `ReviewCard.tsx` has any remaining call site; remove if truly dead | Avoids two components maintaining the same visual pattern independently | Low | Small |

---

## Part 3 — Animation / Motion Recommendations

Full tracking table with stable IDs lives in [`UI_ANIMATIONS.md`](./UI_ANIMATIONS.md). Summary:

### Animations already present (keep as-is)
- **ANIM-001** — Projects/Blog grid staggered `fadeIn` entrance
- **ANIM-002** — framer-motion `whileInView` scroll reveal (Skills/Experience/Featured Work/heading underline)
- **ANIM-003** — Card hover lift + shadow (ProjectCard, ReviewCard, ExperienceJobCard, RecommendationTicker)
- **ANIM-004** — Testimonial marquee, pauses on hover
- **ANIM-005** — Navbar active-dot/hover-pill shared-layout transitions + scroll-progress bar
- **ANIM-006** — HomeSnapshotSection hover lift (added as part of the Part 1 UI fixes)

None of these need adjustment — they're restrained, purposeful, and already respect the site's motion vocabulary (translate/opacity/scale, no bounce/spin/parallax).

### New subtle animations recommended (not implemented)

| ID | Where | Why It Adds Value | Effort |
|---|---|---|---|
| ANIM-007 | HomeSnapshotSection cards | Currently appear instantly; a light scroll-triggered stagger (matching ANIM-001/002's existing convention) would bring them in line with the polish already present on Skills/Experience/Featured Work | Small |
| ANIM-008 | Breadcrumbs | Subtle opacity/translateY entrance (~150ms) softens the "hard cut" when navigating between detail pages — must stay near-instant so it doesn't read as a loading delay | Small |
| ANIM-009 | Footer social icons | A small icon-level `scale` on hover, layered onto the existing `-translate-y-1` lift, reinforces the "this is a link" affordance | Small |
| ANIM-010 | BlogCard / ProjectCard "read more" arrow | Icon micro-translate on hover already exists in some spots (`group-hover:translate-x-1`) — audit and extend consistently across every card type | Small |

All proposed additions are intentionally small (translate/opacity/scale only), consistent
with the existing motion vocabulary, and must respect `prefers-reduced-motion` if implemented.

---

## Notes / Risks (carried over from the Part 1 implementation pass)

- `https://yourportfolio.com` is a pre-existing placeholder domain used site-wide (`layout.tsx`, `sitemap.ts`, `seo.ts`, blog pages) — needs a real domain whenever the site goes live.
- `ProjectCard.tsx` and `BlogCard.tsx` both suppress `focus-visible` outlines with no replacement (`outline-none focus-visible:outline-none ring-0`) — an accessibility gap on the two most important interactive cards on the site. Not yet fixed; Part 1 added proper focus-visible rings elsewhere (Breadcrumbs links, "View all" links) as a partial precedent for closing this gap later.
- `src/components/Navigation.tsx` is dead/unused legacy code (not imported anywhere in `src/app`) — harmless, but a cleanup candidate.
