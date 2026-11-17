import { MetadataRoute } from 'next';
import { projects } from '@/lib/data';
import { getAllBlogPosts } from '@/lib/mdx';
import { SITE_URL, BLOG_ENABLED } from '@/lib/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = SITE_URL;

    const posts = BLOG_ENABLED ? await getAllBlogPosts() : [];

    const blogPosts = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    const routes = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 1,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/projects`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/experience`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        },
        ...(BLOG_ENABLED
            ? [
                {
                    url: `${baseUrl}/blog`,
                    lastModified: new Date(),
                    changeFrequency: 'weekly' as const,
                    priority: 0.9,
                },
            ]
            : []),
    ];

    const projectRoutes = projects.map((project) => ({
        url: `${baseUrl}/projects/${project.slug}`,
        // Use the project's own year rather than "now" so lastModified is truthful.
        lastModified: project.year ? new Date(`${project.year}-01-01`) : undefined,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    return [...routes, ...projectRoutes, ...blogPosts];
}
