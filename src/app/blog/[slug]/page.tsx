import { getBlogPost, getAllBlogPosts } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import { generateSEO, generateBlogPostSchema } from '@/lib/seo';
import { SITE_URL, BLOG_ENABLED } from '@/lib/site';
import Link from 'next/link';
import Image from 'next/image';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import Breadcrumbs from '@/components/Breadcrumbs';

export async function generateStaticParams() {
    if (!BLOG_ENABLED) return [];
    const posts = await getAllBlogPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    if (!BLOG_ENABLED) return {};

    const { slug } = await params;
    const post = await getBlogPost(slug);

    if (!post) {
        return {};
    }

    return generateSEO({
        title: post.title,
        description: post.excerpt,
        image: post.image,
        url: `${SITE_URL}/blog/${slug}`,
        type: 'article',
        publishedTime: post.date,
        tags: post.tags,
    });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    if (!BLOG_ENABLED) notFound();

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
        url: `${SITE_URL}/blog/${slug}`,
    });

    return (
        <div className="min-h-screen pb-20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostSchema) }}
            />

            {/* Hero Image - no text on image */}
            <div className="relative w-full h-56 sm:h-[400px] mb-8 sm:mb-12 bg-[var(--bg-section)] border-b border-[var(--border-muted)] overflow-hidden">
                {post.image ? (
                    <>
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent opacity-50" />
                    </>
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[var(--background-elevated)] to-[var(--background-soft)]" />
                )}
            </div>

            {/* Header Content */}
            <div className="max-w-7xl mx-auto px-4 mb-16">
                <Breadcrumbs items={[
                    { label: 'Home', href: '/' },
                    { label: 'Blog', href: '/blog' },
                    { label: post.title },
                ]} />
                <Link
                    href="/blog"
                    className="btn-secondary group inline-flex items-center gap-2 px-5 py-2.5"
                >
                    <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Blog
                </Link>

                <div className="max-w-4xl mt-8">
                    {post.category && (
                        <span className="text-sm font-bold text-[var(--accent)] uppercase tracking-wider">
                            {post.category}
                        </span>
                    )}
                    <h1 className="text-3xl sm:text-5xl md:text-7xl font-serif font-bold text-[var(--text-primary)] mb-6 leading-tight mt-2 break-words">
                        {post.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-[var(--text-secondary)] leading-relaxed">
                        {post.excerpt}
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2">
                    <article className="prose-custom">
                        <MarkdownRenderer content={post.content} />
                    </article>
                </div>

                {/* Sidebar - metadata */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24 p-6 bg-[var(--bg-section)] border border-[var(--border-muted)] rounded-2xl shadow-[var(--shadow-surface)] transition-base hover:shadow-[var(--shadow-hover)] border-t-2 border-t-[var(--accent)] space-y-6">
                        {post.category && (
                            <div>
                                <h3 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">Category</h3>
                                <p className="text-base font-semibold text-[var(--text-primary)]">{post.category}</p>
                            </div>
                        )}
                        <div>
                            <h3 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">Published</h3>
                            <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                                <svg className="w-4 h-4 text-[var(--text-muted)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <time dateTime={post.date}>{post.date}</time>
                            </div>
                        </div>
                        {post.author && (
                            <div>
                                <h3 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">Author</h3>
                                <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                                    <svg className="w-4 h-4 text-[var(--text-muted)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <span>{post.author}</span>
                                </div>
                            </div>
                        )}
                        {post.readingTime && (
                            <div>
                                <h3 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">Read Time</h3>
                                <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                                    <svg className="w-4 h-4 text-[var(--text-muted)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>{post.readingTime}</span>
                                </div>
                            </div>
                        )}
                        <div className="pt-6 border-t border-[var(--border-muted)]">
                            <h3 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-3">Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map((tag) => (
                                    <Link
                                        key={tag}
                                        href="/blog"
                                        className="text-xs px-3 py-1 bg-[var(--bg-section-muted)] border border-[var(--border-muted)] text-[var(--text-secondary)] rounded-lg hover:border-[var(--accent)] hover:text-[var(--accent)] transition-base"
                                    >
                                        #{tag}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
