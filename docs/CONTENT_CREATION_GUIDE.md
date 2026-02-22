# Content Creation Guide: Blogs & Projects

A simple guide for adding blogs and projects to your portfolio. No coding experience required.

---

## Table of Contents

1. [Writing a Blog Post](#1-writing-a-blog-post)
2. [Adding a New Project](#2-adding-a-new-project)
3. [Images: Size, Format & Where to Put Them](#3-images-size-format--where-to-put-them)
4. [Formatting Content: Bullets, Paragraphs, Links & More](#4-formatting-content-bullets-paragraphs-links--more)
5. [Quick Reference](#5-quick-reference)

---

## 1. Writing a Blog Post

### Step 1: Create the file

- Go to the folder: **`content/blogs/`**
- Create a new file named: `your-blog-title.mdx`  
  - Example: `my-first-nextjs-app.mdx`  
  - Use lowercase, hyphens instead of spaces  
  - The filename becomes the URL: `yoursite.com/blog/my-first-nextjs-app`

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

| Field   | Required? | What to write                                      |
|---------|-----------|-----------------------------------------------------|
| title   | Yes       | The blog title (in quotes)                          |
| date    | Yes       | Publication date: `YYYY-MM-DD`                      |
| excerpt | Yes       | 1–2 sentences describing the post                  |
| tags    | Yes       | List of tags: `["react", "nextjs"]`                  |
| image   | Optional  | Cover image path (see [Images](#3-images-size-format--where-to-put-them)) |
| author  | Optional  | Your name                                           |
| category| Optional  | e.g. "Programming", "Frontend"                        |
| priority| Optional  | Lower number = shown first in list (default: 999)   |

### Step 3: Write the content

Below the `---` block, write your post using simple formatting (see Section 4).

---

## 2. Adding a New Project

Projects are stored in **`src/lib/data.ts`**, not in separate files.

### Step 1: Open the data file

- Open **`src/lib/data.ts`**
- Find the `projects` array
- Add a new object (comma after the previous one):

```javascript
{
    id: '4',
    title: 'Your Project Name',
    description: 'A short 1–2 sentence summary.',
    domain: 'E-Commerce',
    technologies: ['React', 'Next.js', 'TypeScript'],
    github: 'https://github.com/you/your-repo',
    link: 'https://your-live-site.com',
    featured: true,
    role: 'Full Stack Developer',
    problemStatement: 'What problem did you solve?',
    longDescription: 'A longer description of the project.',
    approach: [
        'First thing you did',
        'Second thing you did',
        'Third thing you did'
    ],
    highlights: ['Feature 1', 'Feature 2'],
    priority: 1,
    hasPreview: true,
    image: '/images/projects/your-project.jpg'
}
```

| Field            | Required? | What to write                                           |
|-----------------|-----------|---------------------------------------------------------|
| id              | Yes       | Unique number as string: `'4'`, `'5'`, etc.             |
| title           | Yes       | Project name                                            |
| description     | Yes       | Short summary (shows on cards)                          |
| technologies    | Yes       | Array: `['React', 'Node.js']`                           |
| featured        | Yes       | `true` = shown on homepage; `false` = only on Projects  |
| domain          | Optional  | e.g. "E-Commerce", "SaaS", "Productivity"               |
| github          | Optional  | Link to source code                                     |
| link            | Optional  | Link to live site                                       |
| role            | Optional  | Your role                                               |
| problemStatement| Optional  | The challenge you solved                                |
| longDescription | Optional  | Longer overview                                         |
| approach        | Optional  | Bullet points of what you did                            |
| highlights      | Optional  | Key features                                            |
| priority        | Optional  | Lower = shown first                                     |
| image           | Optional  | Path to project image (see below)                       |

---

## 3. Images: Size, Format & Where to Put Them

### Where to put images

- **Blog images:** `public/images/blog/`
- **Project images:** `public/images/projects/`

Create these folders if they don’t exist.

### Recommended sizes

| Use                     | Width  | Height | Aspect ratio | Format |
|-------------------------|--------|--------|--------------|--------|
| Blog cover image        | 1200px | 630px  | 1.9:1        | JPG, PNG, WebP |
| In-article images       | 800px  | 500px  | ~16:10       | JPG, PNG, WebP |
| Project cover image     | 1200px | 675px  | 16:9         | JPG, PNG, WebP |
| Project card thumbnail  | 600px  | 338px  | 16:9         | JPG, PNG, WebP |

### Quick tips

- **Blog cover:** 1200×630 works well for social sharing (Facebook, Twitter, LinkedIn).
- **Project cards:** 16:9 (e.g. 1200×675) keeps cards consistent.
- Use JPG for photos, PNG for logos/screenshots, WebP when possible for smaller size.

### How to reference images

- Paths start with `/` and point to `public/`:
  - `public/images/blog/photo.jpg` → use `/images/blog/photo.jpg`
  - `public/images/projects/dashboard.png` → use `/images/projects/dashboard.png`

---

## 4. Formatting Content: Bullets, Paragraphs, Links & More

Blog posts use **Markdown**. Here’s a cheat sheet.

### Paragraphs

Simply leave a blank line between paragraphs:

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

---

## 5. Quick Reference

### Blog post checklist

- [ ] Create `content/blogs/your-slug.mdx`
- [ ] Add frontmatter (title, date, excerpt, tags, image)
- [ ] Put images in `public/images/blog/`
- [ ] Use Markdown for body (headings, bullets, links, images)
- [ ] Save and run the site to preview

### Project checklist

- [ ] Add a new object to `projects` in `src/lib/data.ts`
- [ ] Use unique `id`
- [ ] Add cover image to `public/images/projects/`
- [ ] Reference image path: `/images/projects/filename.jpg`
- [ ] Set `featured: true` to show on homepage

### Image checklist

- [ ] Resize to recommended dimensions
- [ ] Save in `public/images/blog/` or `public/images/projects/`
- [ ] Use path starting with `/images/...`

---

*Need help? Check existing posts in `content/blogs/` or projects in `src/lib/data.ts` as examples.*
