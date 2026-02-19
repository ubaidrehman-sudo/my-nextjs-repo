import { getBlogPost, getAllBlogPosts } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import { generateSEO, generateBlogPostSchema } from '@/lib/seo';
import Link from 'next/link';
import Image from 'next/image';
import MarkdownRenderer from '@/components/MarkdownRenderer';

export async function generateStaticParams() {
    const posts = await getAllBlogPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getBlogPost(slug);

    if (!post) {
        return {};
    }

    return generateSEO({
        title: post.title,
        description: post.excerpt,
        image: post.image,
        url: `https://yourportfolio.com/blog/${slug}`,
        type: 'article',
        publishedTime: post.date,
        tags: post.tags,
    });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getBlogPost(slug);

    if (!post || !post.content) {
        notFound();
    }

    const blogPostSchema = generateBlogPostSchema({
        title: post.title,
        description: post.excerpt,
        date: post.date,
        image: post.image,
        url: `https://yourportfolio.com/blog/${slug}`,
    });

    return (
        <div className="min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostSchema) }}
            />

            {/* Header Image */}
            {/* Header Image */}
            {post.image && (
                <div className="relative w-full h-[400px] mb-8">
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Decorative gradient only - no content */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent opacity-50" />
                </div>
            )}

            <div className="max-w-4xl mx-auto px-4 py-12">
                {/* Navigation: Back to Blog */}
                <div className="mb-8">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[var(--foreground-muted)] bg-[var(--background-elevated)] border border-[var(--border)] rounded-full hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-300 group shadow-sm hover:shadow-md"
                    >
                        <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Blog
                    </Link>
                </div>

                <article>
                    <header className="mb-12 pb-8 border-b border-[var(--border)]">
                        {/* Category */}
                        {post.category && (
                            <div className="mb-4">
                                <span className="text-sm font-bold text-[var(--accent)] uppercase tracking-wider">
                                    {post.category}
                                </span>
                            </div>
                        )}

                        {/* Title */}
                        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-[var(--foreground)] leading-tight">
                            {post.title}
                        </h1>

                        {/* Metadata */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--foreground-muted)] mb-6">
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <time dateTime={post.date}>{post.date}</time>
                            </div>

                            {post.author && (
                                <>
                                    <span>•</span>
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        <span>Published by {post.author}</span>
                                    </div>
                                </>
                            )}

                            {post.readingTime && (
                                <>
                                    <span>•</span>
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>{post.readingTime}</span>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="text-xs px-3 py-1 bg-[var(--background-elevated)] border border-[var(--border)] text-[var(--foreground-muted)] rounded-sm"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </header>

                    {/* Content */}
                    <div className="prose prose-invert prose-lg max-w-none
                        prose-headings:text-[var(--foreground)] 
                        prose-p:text-[var(--foreground-muted)] 
                        prose-a:text-[var(--accent)] prose-a:no-underline hover:prose-a:underline
                        prose-strong:text-[var(--foreground)]
                        prose-code:text-[var(--accent)] prose-code:bg-[var(--background-elevated)] prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                        prose-pre:bg-[var(--background-elevated)] prose-pre:border prose-pre:border-[var(--border)]
                        prose-ul:text-[var(--foreground-muted)]
                        prose-ol:text-[var(--foreground-muted)]
                        prose-li:text-[var(--foreground-muted)]
                    ">
                        <MarkdownRenderer content={post.content} />
                    </div>
                </article>
            </div>
        </div>
    );
}
