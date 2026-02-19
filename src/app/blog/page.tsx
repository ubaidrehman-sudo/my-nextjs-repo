import { getAllBlogPosts } from '@/lib/mdx';
import BlogSearch from '@/components/BlogSearch';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog',
    description: 'Articles about web development, programming, and technology',
};

export default async function BlogPage() {
    const posts = await getAllBlogPosts();

    return (
        <div className="max-w-7xl mx-auto px-4 py-16 pt-32">
            <div className="mb-12">
                <h1 className="text-5xl font-bold mb-4 text-[var(--foreground)]">Blog</h1>
                <p className="text-lg text-[var(--foreground-muted)] max-w-2xl">
                    Thoughts on web development, programming, and technology. Explore articles covering everything from frontend frameworks to backend architecture.
                </p>
            </div>

            <BlogSearch initialPosts={posts} />
        </div>
    );
}
