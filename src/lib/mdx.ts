import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { BlogPost } from './types';

const contentDirectory = path.join(process.cwd(), 'content', 'blogs');

export async function getAllBlogPosts(): Promise<BlogPost[]> {
    // Ensure content directory exists
    if (!fs.existsSync(contentDirectory)) {
        return [];
    }

    const files = fs.readdirSync(contentDirectory);

    const posts = files
        .filter((file) => file.endsWith('.mdx'))
        .map((file) => {
            const slug = file.replace('.mdx', '');
            const filePath = path.join(contentDirectory, file);
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            const { data, content } = matter(fileContent);
            const stats = readingTime(content);

            return {
                slug,
                title: data.title || 'Untitled',
                date: data.date || new Date().toISOString(),
                excerpt: data.excerpt || '',
                tags: data.tags || [],
                image: data.image,
                readingTime: stats.text,
                author: data.author || 'Anonymous',
                category: data.category || 'Uncategorized',
                priority: data.priority || 999,
            } as BlogPost;
        })
        // Sort by priority first (lower number = higher priority), then by date
        .sort((a, b) => {
            if (a.priority !== b.priority) {
                return (a.priority || 999) - (b.priority || 999);
            }
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });

    return posts;
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
    try {
        const filePath = path.join(contentDirectory, `${slug}.mdx`);

        if (!fs.existsSync(filePath)) {
            return null;
        }

        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data, content } = matter(fileContent);
        const stats = readingTime(content);

        return {
            slug,
            title: data.title || 'Untitled',
            date: data.date || new Date().toISOString(),
            excerpt: data.excerpt || '',
            tags: data.tags || [],
            image: data.image,
            readingTime: stats.text,
            content,
            author: data.author || 'Anonymous',
            category: data.category || 'Uncategorized',
            priority: data.priority || 999,
        };
    } catch (error) {
        console.error(`Error reading blog post ${slug}:`, error);
        return null;
    }
}

export async function searchBlogPosts(query: string): Promise<BlogPost[]> {
    const allPosts = await getAllBlogPosts();

    if (!query) {
        return allPosts;
    }

    const lowerQuery = query.toLowerCase();

    return allPosts.filter((post) => {
        const titleMatch = post.title.toLowerCase().includes(lowerQuery);
        const excerptMatch = post.excerpt.toLowerCase().includes(lowerQuery);
        const tagMatch = post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery));

        return titleMatch || excerptMatch || tagMatch;
    });
}

export async function getBlogsByTag(tag: string): Promise<BlogPost[]> {
    const allPosts = await getAllBlogPosts();

    return allPosts.filter((post) =>
        post.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
    );
}

export async function getAllTags(): Promise<string[]> {
    const allPosts = await getAllBlogPosts();
    const tags = new Set<string>();

    allPosts.forEach((post) => {
        post.tags.forEach((tag) => tags.add(tag));
    });

    return Array.from(tags).sort();
}
