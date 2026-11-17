import { getAllBlogPosts } from '@/lib/mdx';
import BlogSearch from '@/components/BlogSearch';
import SectionHeadingWithBar from '@/components/SectionHeadingWithBar';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BLOG_ENABLED } from '@/lib/site';

export const metadata: Metadata = {
    title: 'Blog',
    description: 'Articles about web development, programming, and technology',
    alternates: { canonical: '/blog' },
};

export default async function BlogPage() {
    if (!BLOG_ENABLED) notFound();

    const posts = await getAllBlogPosts();

    return (
        <div className="max-w-7xl mx-auto px-4 py-16 pt-24 sm:pt-32">
            <div className="flex justify-between items-end mb-12">
                <SectionHeadingWithBar
                    title="Blog"
                    subtitle="Thoughts on web development, programming, and technology. Explore articles covering everything from frontend frameworks to backend architecture."
                    level={1}
                    subtitleClassName="max-w-2xl"
                />
                <div className="hidden md:block shrink-0">
                    <Link
                        href="/"
                        className="btn-secondary group px-5 py-2.5 whitespace-nowrap"
                    >
                        Back to Home
                        <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                        </svg>
                    </Link>
                </div>
            </div>

            <BlogSearch initialPosts={posts} />
        </div>
    );
}
