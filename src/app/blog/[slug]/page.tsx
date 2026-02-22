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
        <div className="min-h-screen pb-20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostSchema) }}
            />

            {/* Hero Image - no text on image */}
            <div className="relative w-full h-[400px] mb-12 bg-[var(--bg-section)] border-b border-[var(--border-muted)] overflow-hidden">
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
                    <div className="w-full h-full bg-gradient-to-br from-[var(--background-elevated)] to-[var(--background-soft)] relative">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent)]/8 blur-3xl rounded-full translate-x-20 -translate-y-20" />
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--accent)]/8 blur-3xl rounded-full -translate-x-20 translate-y-20" />
                        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-[var(--accent)]/5 blur-2xl rounded-full -translate-x-1/2 -translate-y-1/2" />
                    </div>
                )}
            </div>

            {/* Header Content */}
            <div className="max-w-7xl mx-auto px-4 mb-16">
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
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-[var(--text-primary)] mb-6 leading-tight mt-2">
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
                    <div className="sticky top-24 p-6 bg-[var(--bg-section)] border border-[var(--border-muted)] rounded-2xl shadow-[var(--shadow-surface)] transition-base hover:border-[var(--accent)] hover:shadow-[var(--shadow-teal)] border-t-4 border-t-[var(--accent)] space-y-6">
                        {post.category && (
                            <div>
                                <h3 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">Category</h3>
                                <p className="text-base font-semibold text-[var(--text-primary)]">{post.category}</p>
                            </div>
                        )}
                        <div>
                            <h3 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">Published</h3>
                            <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                                <svg className="w-4 h-4 text-[var(--accent)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <time dateTime={post.date}>{post.date}</time>
                            </div>
                        </div>
                        {post.author && (
                            <div>
                                <h3 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">Author</h3>
                                <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                                    <svg className="w-4 h-4 text-[var(--accent)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                                    <svg className="w-4 h-4 text-[var(--accent)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
