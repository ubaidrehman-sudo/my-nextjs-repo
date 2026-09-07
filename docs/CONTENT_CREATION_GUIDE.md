# Content Creation & Architecture Guide

One guide for adding and structuring content on this portfolio: blog posts, projects, and
everything else (About, Experience, Education, Skills, Contact). No coding experience
required for the "add a blog post" or "add a project" workflows; the later sections explain
*why* things are structured the way they are, and what a healthier structure would look like
if the site grows past a handful of projects.

For visual/styling conventions (colors, spacing, component patterns), see
[`DESIGN_SYSTEM_REFERENCE.md`](./DESIGN_SYSTEM_REFERENCE.md) — this guide is about **content**,
that one is about **design**.

---

## Table of Contents

1. [How Content Is Structured Today (at a glance)](#1-how-content-is-structured-today-at-a-glance)
2. [Writing a Blog Post](#2-writing-a-blog-post)
3. [Adding a New Project](#3-adding-a-new-project)
4. [Editing About / Experience / Education / Skills / Contact](#4-editing-about--experience--education--skills--contact)
5. [Creating a New Page](#5-creating-a-new-page)
6. [Images: Size, Format & Where to Put Them](#6-images-size-format--where-to-put-them)
7. [Formatting Content: Bullets, Paragraphs, Links & More](#7-formatting-content-bullets-paragraphs-links--more)
8. [Recommendation: Moving Projects to a File-per-Item Model](#8-recommendation-moving-projects-to-a-file-per-item-model)
9. [Quick Reference Checklists](#9-quick-reference-checklists)

---

## 1. How Content Is Structured Today (at a glance)

| Content type | Where it lives | Structure | Adding a new item |
|---|---|---|---|
| **Blog posts** | `content/blogs/*.mdx` — one file per post | File-per-item. The **filename is the URL slug** (no separate `slug` field). | Drop a new `.mdx` file in the folder — no registration needed, it's picked up automatically. |
| **Projects** | `src/lib/data.ts` — one array (`projects`) | Single flat array, all projects in one file. | Add an object to the array (see §3). |
| **Skills** | `src/lib/data.ts` — one array (`skills`) | Single flat array. | Add an object to the array. |
| **Work Experience** | `src/lib/data.ts` — one array (`experiences`) | Single flat array. | Add an object to the array. |
| **Education / Certifications** | `src/lib/data.ts` — one array (`education`), split by a `type` field | Single flat array. | Add an object with `type: 'education'` or `type: 'certification'`. |
| **Testimonials ("Kind Words")** | `src/lib/data.ts` — one array (`reviews`) | Single flat array. | Add an object to the array. |
| **About Me** (bio, story, values, interests, status) | `src/lib/data.ts` — one object (`aboutMe`) | Single object. | Edit fields directly. |
| **Contact channels & FAQ** | `src/lib/data.ts` — two arrays (`contactChannels`, `contactFAQ`) | Single flat arrays. | Add an object to the relevant array. |
| **Home page snapshot cards / bridge copy** | `src/lib/data.ts` (`homeSnapshotCards`, `homeAboutBridge`) | Small objects/arrays. | Edit directly. |

**The short version:** blogs already use a scalable "one file per post" pattern. Everything
else — projects included — lives together in a single file, `src/lib/data.ts`. That file is
the one place to open for almost any content change except blog posts. Section 8 below
explains why the projects array in particular is a good candidate to split out the same way
blogs already are, once the number of projects grows.

**Two known dead/unused fields**, safe to ignore when writing content: `Project.hasPreview`
and `BlogPost.coverImage` are defined in the TypeScript types but not read by any page —
setting them has no effect today.

---

## 2. Writing a Blog Post

### Step 1: Create the file

- Go to the folder: **`content/blogs/`**
- Create a new file named: `your-blog-title.mdx`
  - Example: `my-first-nextjs-app.mdx`
  - Use lowercase, hyphens instead of spaces
  - **The filename *is* the URL slug** — there's no separate slug field. This file becomes:
    `yoursite.com/blog/my-first-nextjs-app`

### Step 2: Add the header (frontmatter)

At the **very top** of the file, between `---` lines, add:

```yaml
---
title: "Your Blog Title Here"
date: "2024-02-20"
excerpt: "A short 1–2 sentence summary that shows in the blog list."
tags: ["tag1", "tag2", "tag3"]
image: "/images/blog/your-image.jpg"
author: "Your Name"
category: "Frontend Development"
priority: 10
---
```

| Field | Required? | What to write |
|---|---|---|
| `title` | Recommended | The blog title (in quotes). Falls back to "Untitled" if omitted. |
| `date` | Recommended | Publication date: `YYYY-MM-DD`. Falls back to today's date if omitted — but omitting it makes new-vs-old sorting unreliable, so always set it. |
| `excerpt` | Recommended | 1–2 sentences describing the post; shows in the list view and as the meta description. Falls back to an empty string. |
| `tags` | Recommended | List of tags: `["react", "nextjs"]`. Falls back to an empty array. |
| `image` | Optional | Cover image path (see [Images](#6-images-size-format--where-to-put-them)). No fallback — the post simply renders without a hero image. |
| `author` | Optional | Your name. Falls back to "Anonymous". |
| `category` | Optional | e.g. "Programming", "Frontend". Falls back to "Uncategorized". |
| `priority` | Optional | Lower number = shown first in the listing, ties broken by date. Falls back to `999` (shown last). |

Every field above has a safe fallback, so a technically-minimally-valid post can omit all of
them — but `title`/`date`/`excerpt`/`tags` should always be set in practice, since skipping
them just produces a worse-looking list entry rather than an error.

### Step 3: Write the content

Below the `---` block, write your post using Markdown (see [Section 7](#7-formatting-content-bullets-paragraphs-links--more)).

Reading time and the blog index/search/tag-filter/pagination all update automatically — there
is no separate step to "publish" a post beyond saving the file.

---

## 3. Adding a New Project

Projects are stored in **`src/lib/data.ts`**, not in separate files (see [Section 8](#8-recommendation-moving-projects-to-a-file-per-item-model) for why that may be worth changing later).

### Step 1: Open the data file

- Open **`src/lib/data.ts`**
- Find the `projects` array
- Add a new object (comma after the previous one). This example reflects the **current**
  project shape (matches the live `Project` type in `src/lib/types.ts` — note this uses
  `slug`, not `id`, and includes fields like `contributions`, `architecture`, and `outcome`
  that didn't exist in earlier versions of this guide):

```typescript
{
    slug: 'your-project-slug',              // becomes the URL: /projects/your-project-slug
    title: 'Your Project Name',
    description: 'A short 1–2 sentence summary shown on cards.',
    domain: 'E-Commerce',                   // optional — shows as a meta chip
    role: 'Full Stack Developer',           // optional — shows as a meta chip
    year: 2024,                             // optional — shows as a meta chip
    technologies: ['React', 'Next.js', 'TypeScript'], // required — always rendered as "Tech Stack"
    tools: ['Figma', 'Postman'],            // optional — renders a "Tools" card if present
    featured: true,                         // true = shown on homepage Featured Work + eligible for "More Projects"
    problemStatement: 'What problem did you solve?',      // optional — renders "The Challenge" card
    longDescription: 'A longer description of the project.', // optional — renders "Project Statement" card
    contributions: [
        'What you personally did, point one',
        'What you personally did, point two',
    ],                                       // optional — renders "My Contribution" card
    highlights: ['Feature 1', 'Feature 2'], // optional — renders "Key Highlights" card
    architecture: [
        'Key architectural decision one',
        'Key architectural decision two',
    ],                                       // optional — renders "Architectural Decisions" card
    outcome: 'The measurable business/technical result.',  // optional — renders "The Outcome" card
    priority: 1,                            // optional — lower number = shown first
    image: '/images/projects/your-project.jpg', // optional — cover image; card falls back to initials if absent
    link: 'https://your-live-site.com',      // optional — "View Live Site" button
    github: 'https://github.com/you/your-repo', // optional — "View Source" button
}
```

| Field | Required? | Notes |
|---|---|---|
| `slug` | **Yes** | Unique, URL-safe (kebab-case). This is the project's identity — it drives the route `/projects/{slug}` and must not collide with another project's slug. |
| `title` | **Yes** | Project name. |
| `description` | **Yes** | Short summary — always shown on cards and at the top of the detail page. |
| `technologies` | **Yes** | Array — always rendered as the "Tech Stack" card, no conditional. |
| `featured` | **Yes** | `true` = shown on the homepage Featured Work grid and eligible to appear in another project's "More Projects" rail; `false` = only listed on `/projects`. |
| `domain`, `role`, `year` | Optional | Each independently renders a small meta chip if present. |
| `link`, `github` | Optional | Each independently renders a CTA button; the button row itself only appears if at least one is set. |
| `image` | Optional | Cover image; card shows an initials placeholder if absent. Only **one** of the current three sample projects actually has an image today — worth fixing when real content goes in. |
| `longDescription` | Optional | Renders "Project Statement". |
| `problemStatement` / `outcome` | Optional | Each independently renders "The Challenge" / "The Outcome"; together with `highlights` these three share a two-column row that only appears if at least one is set. |
| `highlights` | Optional | Array — renders "Key Highlights" if non-empty. |
| `contributions` | Optional | Array — renders "My Contribution" if non-empty. |
| `architecture` | Optional | Array — renders "Architectural Decisions" if non-empty. Good place for system-design/technical-depth content. |
| `tools` | Optional | Array — renders a "Tools" card if non-empty (distinct from `technologies`; use this for supporting tools like Figma/Postman/Jira rather than core tech stack). |
| `priority` | Optional | Lower number sorts first on the `/projects` listing. |

Saving the file is the entire "publish" step — no build/registration needed, `generateStaticParams` picks up every entry in the array automatically.

---

## 4. Editing About / Experience / Education / Skills / Contact

All of these live as objects/arrays in **`src/lib/data.ts`**, alongside `projects`. There is
no separate file per item for any of these (unlike blog posts) — open `data.ts`, find the
relevant export, and edit in place:

- **`aboutMe`** — one object: name, title, bio, email, location, social links, status pill
  text, hero tagline, and the `story` (paragraphs array), `values` (array), `interests`
  (array), `workStyle` fields used on the About page.
- **`experiences`** — array of jobs, each with `title, company, location, startDate, endDate?,
  description[] (bullet points), technologies[]`. Used both on the Home page (first 2 shown)
  and the full `/experience` page.
- **`education`** — array of entries, each with `type: 'education' | 'certification'` — this
  single field is what separates the "Education" list from the "Certifications" list on
  `/experience`. Add a new entry with the right `type` and it lands in the correct section
  automatically.
- **`skills`** — array of `{ id, name, category, proficiency }`. `category` must be one of
  `'frontend' | 'backend' | 'database' | 'cloud' | 'tools' | 'other'` (see
  [`UI_RECOMMENDATIONS.md`](./UI_RECOMMENDATIONS.md) for a note on adding an AI/GenAI-specific
  category here).
- **`reviews`** — array of testimonials shown in "Kind Words": `{ name, role, company,
  content }`.
- **`contactChannels`** / **`contactFAQ`** — arrays feeding the Contact section's channel
  cards and FAQ grid.
- **`homeSnapshotCards`** / **`homeAboutBridge`** — the 3 stat cards and intro copy in the
  "Engineer Behind the Code" home section.

**Known inconsistency to be aware of:** `src/components/EducationSection.tsx` is a separate,
prop-driven component that also renders education data, but it's not currently wired up to
`/experience` (that page inlines its own near-identical markup instead). If you edit education
formatting, you may need to update both places — see `UI_RECOMMENDATIONS.md` item #5 for the
cleanup recommendation.

---

## 5. Creating a New Page

Since this is a Next.js App Router project, creating a page is based on the folder structure.

1. **Create a folder**: go to `src/app/` and create a new folder with your route name (e.g. `services`).
2. **Create a file**: inside that folder, create `page.tsx`.
3. **Add code**:
    ```tsx
    import { Metadata } from 'next';

    export const metadata: Metadata = {
        title: 'Services', // becomes "Services | <site title>"
        description: 'My professional services...',
    };

    export default function ServicesPage() {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20">
                <h1 className="text-4xl font-serif font-bold mb-6">Our Services</h1>
                {/* Your content here — reuse SectionHeadingWithBar, existing card patterns, etc. */}
            </div>
        );
    }
    ```
4. **Update the Navbar**: add the link to `src/components/Navbar.tsx`'s `navLinks` array (and, if it's a home-page anchor section rather than a standalone route, to `HOME_SECTION_IDS` and the `scrollToSection`/`getIsActive` helpers — see how `Blog` was wired in as a working example of both patterns).
5. **Update the Footer** (optional): add to `quickLinks` in `src/components/Footer.tsx` if it should appear there too.
6. **Update the sitemap** (optional but recommended): add the route to `src/app/sitemap.ts`.

For styling, reuse existing shared components (`SectionHeadingWithBar`, `SectionLabel`,
`Breadcrumbs`, `.btn-primary`/`.btn-secondary`) and tokens documented in
[`DESIGN_SYSTEM_REFERENCE.md`](./DESIGN_SYSTEM_REFERENCE.md) rather than inventing new ones.

---

## 6. Images: Size, Format & Where to Put Them

### Where to put images

- **Blog images:** `public/images/blog/`
- **Project images:** `public/images/projects/`
- **Hero/portrait images:** `public/images/` (root)

Create these folders if they don't exist.

### Recommended sizes

| Use | Width | Height | Aspect ratio | Format |
|---|---|---|---|---|
| Author portrait (Hero) | 800px | 1000px | 4:5 (portrait) | JPG/WebP |
| Blog cover image | 1200px | 630px | 1.91:1 (social standard) | JPG, PNG, WebP |
| In-article images | 800px | 500px | ~16:10 | JPG, PNG, WebP |
| Project cover image | 1200px | 675px | 16:9 | JPG, PNG, WebP |
| Project card thumbnail | 600px | 338px | 16:9 | JPG, PNG, WebP |
| OG/social share image | 1200px | 630px | 1.91:1 | PNG |

### Quick tips

- Use JPG for photos, PNG for logos/screenshots, WebP when possible for smaller file size.
- Compress/optimize images before uploading to keep the site fast.
- Blog and project cover images at 1200×630 / 1200×675 double nicely as social-share (OG) images.

### How to reference images

Paths start with `/` and point into `public/`:
- `public/images/blog/photo.jpg` → use `/images/blog/photo.jpg`
- `public/images/projects/dashboard.png` → use `/images/projects/dashboard.png`

---

## 7. Formatting Content: Bullets, Paragraphs, Links & More

Blog posts use **Markdown**. Here's a cheat sheet.

### Paragraphs

Leave a blank line between paragraphs:

```
This is the first paragraph.

This is the second paragraph.
```

### Headings

- `#` = largest heading (usually the title)
- `##` = section
- `###` = subsection

```
# Main Title
## Section Title
### Subsection Title
```

### Bullet lists

Use `-` or `*` and a space:

```
- First item
- Second item
- Third item
```

**Bold** in a bullet:

```
- **Important point** with more text
```

### Numbered lists

```
1. First step
2. Second step
3. Third step
```

### Links

Format: `[Link text](URL)`

```
Check out [Next.js docs](https://nextjs.org/docs).
```

### Images inside blog posts

Format: `![Alt text](image-path)`

```
![Description of image](/images/blog/my-screenshot.png)
```

### Bold and italic

- **Bold:** `**text**`
- *Italic:* `*text*`

### Code (inline)

Wrap code in backticks: `` `code` ``

```
Use the `npm run dev` command to start the server.
```

### Code block

Use three backticks and optionally add a language:

````
```javascript
const greeting = "Hello, World!";
console.log(greeting);
```
````

### Blockquote (quote)

```
> This is a quoted sentence or block of text.
```

> **Note:** blog bodies are rendered through a Markdown-to-React parser
> (`markdown-to-JSX`, via `src/components/MarkdownRenderer.tsx`), not through Next's MDX
> compiler — so live/interactive React components cannot be embedded inside a post body
> today, even though the file extension is `.mdx`. Plain Markdown (as above) is fully
> supported and is all that's needed for standard posts.

---

## 8. Recommendation: Moving Projects to a File-per-Item Model

This is a **suggestion for later, not a required change** — the current single-array setup
in `data.ts` works fine at 3 projects. It's worth revisiting once the count grows past
roughly 6–8, because each project entry is already fairly large (title, description, up to
~5 long-form arrays of prose), and every edit to any one project requires opening the same
shared file as every other content type.

**Why the blog's pattern is worth copying for projects:**
- One file per item is easier to review in git (a diff shows exactly which project changed).
- Non-technical contributors can edit/add a project without touching a large TypeScript file
  full of other unrelated data.
- It naturally caps how large any single file gets, no matter how many projects exist.

**What that would look like, concretely** (not yet implemented):
- A new folder, e.g. `content/projects/`, with one file per project: `content/projects/your-project-slug.mdx` (or `.json`, if no long-form Markdown body is needed inside the project detail page beyond the existing structured fields).
- Frontmatter mirroring today's `Project` fields (`title`, `description`, `domain`, `role`, `year`, `technologies`, `tools`, `featured`, `priority`, `image`, `link`, `github`), with `problemStatement` / `longDescription` / `outcome` either as more frontmatter fields or as headed sections in the Markdown body.
- `contributions` / `highlights` / `architecture` as Markdown bullet lists in the body (parsed the same way blog tags/lists already are), or kept as YAML array frontmatter fields if you'd rather keep them structured — either works with the existing `gray-matter` approach used by `src/lib/mdx.ts`.
- The **filename becomes the slug**, exactly like blog posts — no separate `slug` field needed, removing one chance for a typo/mismatch.
- A `getAllProjects()` / `getProject(slug)` pair in `src/lib/mdx.ts` (or a new `src/lib/projects.ts` alongside it), modeled directly on the existing `getAllBlogPosts()` / `getBlogPost()` functions — same directory-scan-at-request-time approach, same sort-by-`priority`-then-fallback pattern.
- `src/app/projects/page.tsx` and `src/app/projects/[slug]/page.tsx` would then call these new functions instead of importing the `projects` array from `data.ts` — the page components and their conditional-rendering logic (described in §3's table) would not need to change at all, since the same fields would just arrive from a different source.

This is the same shape of change already proven out by the blog system — it is not a new
pattern to invent, just applying the existing one to a second content type. Everything else
in this guide (About, Experience, Skills, Contact) is small and object-shaped enough that it
likely doesn't need this treatment; only Projects (and possibly a future case-study-heavy
section) benefit from file-per-item at this site's scale.

---

## 9. Quick Reference Checklists

### Blog post checklist

- [ ] Create `content/blogs/your-slug.mdx`
- [ ] Add frontmatter (title, date, excerpt, tags, image)
- [ ] Put images in `public/images/blog/`
- [ ] Use Markdown for the body (headings, bullets, links, images)
- [ ] Save and preview — no other steps needed

### Project checklist

- [ ] Add a new object to `projects` in `src/lib/data.ts`
- [ ] Use a unique, URL-safe `slug` (not `id`)
- [ ] Add a cover image to `public/images/projects/`
- [ ] Reference the image path as `/images/projects/filename.jpg`
- [ ] Set `featured: true` to show it on the homepage

### Image checklist

- [ ] Resize to the recommended dimensions (Section 6)
- [ ] Save in `public/images/blog/` or `public/images/projects/`
- [ ] Use a path starting with `/images/...`

### New page checklist

- [ ] Create `src/app/<route>/page.tsx` with a `metadata` export
- [ ] Reuse shared components/tokens rather than one-off styling
- [ ] Add the link to `Navbar.tsx` (and `Footer.tsx` if relevant)
- [ ] Add the route to `sitemap.ts`

---

*Need a live example? Check existing posts in `content/blogs/` or projects in
`src/lib/data.ts` — both currently have real, working entries to copy from.*
