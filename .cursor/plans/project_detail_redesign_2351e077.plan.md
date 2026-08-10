---
name: Project Detail Redesign
overview: Redesign `/projects/[slug]` to match the reference layout (breadcrumb, meta chips, title with accent dot, inline cover, conditional content cards, more-projects rail), introduce readable URL slugs, and add a reusable `Breadcrumbs` component so the same structure can later be applied to blog detail.
todos:
  - id: types-data
    content: "Update Project type: rename `id` → `slug`, rename `approach` → `contributions`, add optional `year`, `outcome`, `architecture[]`, `tools[]`. Update sample projects in data.ts with kebab-case slugs and populate new fields."
    status: pending
  - id: breadcrumbs
    content: Create reusable `Breadcrumbs` component with chevron separators, semantic nav/ol, aria-current on last item.
    status: pending
  - id: rename-route
    content: Rename `src/app/projects/[id]/` → `src/app/projects/[slug]/` and rewrite `page.tsx` with the new layout (breadcrumb, header block, inline cover, conditional content cards, more-projects rail).
    status: pending
  - id: update-links
    content: Swap all `project.id` references to `project.slug` in `ProjectCard`, `FeaturedWorkGrid`, projects index page, and sitemap entries.
    status: pending
  - id: docs
    content: Document the new detail-page pattern (header + inline cover + conditional content cards + more-projects rail) in `DESIGN_SYSTEM_REFERENCE.md` and note that blog detail will adopt the same structure in a follow-up.
    status: pending
isProject: false
---

## Goals

- Replace the current detail page with a layout that matches the reference (breadcrumb, chip row, big serif title with accent dot, inline cover image, narrative sections, more-projects rail).
- Use readable URL slugs (`/projects/enterprise-event-driven-platform`) instead of numeric IDs.
- Every section is **conditional** — renders only when data exists, in a consistent style across projects (and later, blog).
- Reuse the existing design tokens, `SectionLabel`, `SectionHeadingWithBar`, `ProjectCard`, animations, and serif title convention. No new visual language.

---

## Final layout (top to bottom)

All inside a single `min-h-screen pt-32 pb-20` shell — no more full-bleed hero banner; the cover image becomes an inline figure (matches reference and works identically for blog).

1. **Breadcrumbs** — `Home / Projects / {title}` (new component, custom approach: chevron `›` separators, muted links, current page in `--text-primary`, semantic `<nav><ol>`).
2. **Header block** (`max-w-4xl`, `animate-fade-in-up`):
   - Meta chip row using `SectionLabel`-style pills — `Domain`, `Year`, `Role` (each renders only if present).
   - `h1` `font-serif text-5xl md:text-7xl` with `{title}` + a trailing accent dot `<span className="text-[var(--accent)]">.</span>` (the reference's signature touch).
   - Description paragraph (`text-xl md:text-2xl text-[var(--text-secondary)]`).
   - CTA row: `View Live Site` (`btn-primary` with external icon) and `View Source` (`btn-secondary` with GitHub icon). Each conditional.
3. **Inline cover image** (`max-w-7xl`, `rounded-2xl`, `shadow-[var(--shadow-hover)]`, `border border-[var(--border-muted)]`, `aspect-[16/9]`) — only if `image` is set. Gentle gradient overlay at bottom for depth.
4. **Content stack** (`max-w-7xl`, `space-y-10`) — every block is conditional:
   - **Project Statement** — prose card from `longDescription`.
   - **Two-column row**:
     - **Key Highlights** (`lg:col-span-7`) — bullets from `highlights[]`, check-circle icon header.
     - Right column (`lg:col-span-5`, stacked):
       - **The Challenge** (paragraph card, lightbulb icon) from `problemStatement`.
       - **The Outcome** (paragraph card, trophy icon) from new `outcome` field.
   - **My Contribution** — bullets from new `contributions[]` (renamed from existing `approach[]`), accent dot bullets.
   - **Architectural Decisions** — bullets from new `architecture[]` field, with a small `</>` icon header.
   - **Tech Stack** — chip wall from `technologies[]` (always renders since type requires it).
   - **Tools** — chip wall from new `tools[]` field, only if present.
5. **More Projects rail** (`max-w-7xl`, divider on top, `mt-24 pt-16`):
   - `SectionLabel` "Continue Exploring" + `SectionHeadingWithBar` "More Projects" + `View all →` link on the right.
   - 2-card grid of related projects (other featured projects, current excluded; falls back to first N if no domain match).
   - Uses existing `ProjectCard`.

Card styling for all content cards: `card-base` + `card-hover` patterns from `[docs/DESIGN_SYSTEM_REFERENCE.md](docs/DESIGN_SYSTEM_REFERENCE.md)` — `bg-[var(--bg-section)]`, `border border-[var(--border-muted)]`, `rounded-2xl`, `shadow-[var(--shadow-surface)]`, with a soft icon-tinted header (icon in a rounded square tinted with `--accent`/10).

Animations: each block uses `animate-fade-in-up` (existing util) for consistency with the rest of the site. No new keyframes needed.

---

## Data model changes — `[src/lib/types.ts](src/lib/types.ts)`

Rename `id` to `slug` on `Project` and add new optional fields. All additions are optional so existing data keeps working; sections only render when populated.

```ts
export interface Project {
    slug: string;                    // renamed from `id`, kebab-case
    title: string;
    description: string;             // short subtitle under hero title
    domain?: string;                 // e.g. "FinTech" — chip
    role?: string;                   // e.g. "Lead Architect" — chip
    year?: number;                   // e.g. 2024 — chip
    technologies: string[];          // Tech Stack
    tools?: string[];                // new — separate Tools chip wall
    link?: string;
    github?: string;
    image?: string;
    featured: boolean;
    longDescription?: string;        // Project Statement paragraph
    problemStatement?: string;       // The Challenge paragraph
    contributions?: string[];        // renamed from `approach[]` — My Contribution bullets
    highlights?: string[];           // Key Highlights bullets
    outcome?: string;                // new — The Outcome paragraph
    architecture?: string[];         // new — Architectural Decisions bullets
    priority?: number;
    hasPreview?: boolean;
}
```

Note: rename `approach` → `contributions` (one field, semantic name). The user's existing list calls this "my contribution".

---

## Files to change / add

- **Add** `[src/components/Breadcrumbs.tsx](src/components/Breadcrumbs.tsx)` — reusable, takes `items: { label: string; href?: string }[]`. Semantic `<nav aria-label="Breadcrumb"><ol>`, chevron separator, last item `aria-current="page"` in `--text-primary`, others muted links with `hover:text-[var(--accent)]`.
- **Rename folder** `src/app/projects/[id]/` → `src/app/projects/[slug]/`.
- **Rewrite** `[src/app/projects/[slug]/page.tsx](src/app/projects/[slug]/page.tsx)` per the layout above. Uses `params: Promise<{ slug: string }>`, looks up `projects.find(p => p.slug === slug)`, `generateStaticParams` returns slugs. `generateMetadata` unchanged in spirit.
- **Update** `[src/lib/types.ts](src/lib/types.ts)` per the schema above.
- **Update** `[src/lib/data.ts](src/lib/data.ts)`:
  - Replace numeric `id: '1'` etc. with `slug: 'enterprise-event-driven-platform'` and similar for the other two sample projects.
  - Rename existing `approach` arrays to `contributions`.
  - Add `year`, `outcome`, `architecture[]`, `tools[]` to each sample so the new sections are exercised.
- **Update** `[src/components/ProjectCard.tsx](src/components/ProjectCard.tsx)` — change `href={`/projects/${project.id}`}` to `href={`/projects/${project.slug}`}`.
- **Update** `[src/components/FeaturedWorkGrid.tsx](src/components/FeaturedWorkGrid.tsx)` — same swap if it references `project.id`.
- **Update** `[src/app/projects/page.tsx](src/app/projects/page.tsx)` — same swap if it links by id.
- **Update** `[src/app/sitemap.ts](src/app/sitemap.ts)` — add per-project entries `${baseUrl}/projects/${project.slug}`.
- **Update** `[docs/DESIGN_SYSTEM_REFERENCE.md](docs/DESIGN_SYSTEM_REFERENCE.md)` — add a "Detail page pattern" subsection documenting the breadcrumb + header + inline cover + content stack convention, and note that blog detail will adopt the same structure next.

---

## Reusability for blog (next step, not in this PR)

The new `Breadcrumbs` component, the header block (`label chip row + serif title with accent dot + description + CTAs`), the inline cover image figure, and the conditional content-card pattern are all framework-agnostic on data. When we redesign `src/app/blog/[slug]/page.tsx` later, we will:

- Reuse `Breadcrumbs` (`Home / Blog / {title}`).
- Reuse the header block with chips = `Category`, `Date`, `Reading time`.
- Reuse the inline cover image figure.
- Replace the content cards with the MDX body (`MarkdownRenderer`) and keep a "Tags" chip wall + a "More Articles" rail at the bottom.

No further refactor needed — the patterns above are already self-contained.

---

## Out of scope (call out explicitly)

- Dark mode for the new page (the codebase has not enabled dark mode yet — design tokens already handle it when added).
- Replacing the existing blog detail page (deferred to a follow-up per your note).
- Adding real project copy / images — sample data updates are illustrative only.