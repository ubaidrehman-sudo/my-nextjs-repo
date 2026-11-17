// Single source of truth for the public site URL.
// Set NEXT_PUBLIC_SITE_URL in the deployment environment (e.g. https://your-domain.com).
// TODO: replace the fallback with the real production domain.
export const SITE_URL = (
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yourportfolio.com'
).replace(/\/$/, '');

// The posts in content/blogs are template placeholders (author "John Doe", generic tutorials)
// that don't match the Solution Architect positioning, so the blog is switched off.
// While false: /blog and /blog/[slug] return 404, nothing is pre-rendered, and the sitemap
// omits them. Flip to true once real posts replace the placeholders; no other change needed.
export const BLOG_ENABLED = false;
