'use client';

import { BlogPost } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

interface BlogCardProps {
    post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link
            href={`/blog/${post.slug}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <article className="h-full bg-[var(--background-elevated)] border border-[var(--border)] rounded-2xl overflow-hidden group hover:border-[var(--accent)] hover:shadow-lg transition-all duration-300 flex flex-col hover:shadow-[var(--accent)]/10 hover:-translate-y-1">
                {/* Image */}
                {post.image && (
                    <div className="relative h-48 w-full overflow-hidden bg-[var(--background-elevated)]">
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background-soft)] via-transparent to-transparent opacity-60" />
                    </div>
                )}

                {/* Content */}
                <div className="p-6">
                    {/* Category & Reading Time */}
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-medium text-[var(--accent)] uppercase tracking-wider">
                            {post.category}
                        </span>
                        {post.readingTime && (
                            <span className="text-xs text-[var(--foreground-muted)]">
                                {post.readingTime}
                            </span>
                        )}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold mb-2 text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors duration-300 line-clamp-2">
                        {post.title}
                    </h3>

                    {/* Date & Author */}
                    <div className="flex items-center gap-2 text-sm text-[var(--foreground-muted)] mb-3">
                        <time dateTime={post.date}>{post.date}</time>
                        {post.author && (
                            <>
                                <span>•</span>
                                <span>{post.author}</span>
                            </>
                        )}
                    </div>

                    {/* Excerpt */}
                    <p className="text-[var(--foreground-muted)] mb-4 line-clamp-2 leading-relaxed">
                        {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag) => (
                            <span
                                key={tag}
                                className="text-xs px-2 py-1 bg-[var(--background-elevated)] border border-[var(--border)] text-[var(--foreground-muted)] rounded-sm"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>

                    {/* Read More Indicator */}
                    <div className="mt-4 flex items-center gap-2 text-sm font-medium text-[var(--accent)]">
                        <span>Read more</span>
                        <svg
                            className={`w-4 h-4 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </article>
        </Link>
    );
}
