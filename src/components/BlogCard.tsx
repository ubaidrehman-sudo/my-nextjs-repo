'use client';

import { BlogPost } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';

interface BlogCardProps {
  post: BlogPost;
  variant?: 'default' | 'compact';
}

export default function BlogCard({ post, variant = 'default' }: BlogCardProps) {
  const isCompact = variant === 'compact';

  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full min-w-0 rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]">
      <article className="h-full min-w-0 bg-[var(--bg-section)] rounded-2xl overflow-clip shadow-[var(--shadow-surface)] transition-base flex flex-col hover:shadow-[var(--shadow-teal)] hover:-translate-y-0.5">
        {/* Image area - strict clip; scale applied to wrapper to avoid border artifacts */}
        <div className={`relative w-full min-w-0 overflow-clip rounded-t-2xl bg-[var(--bg-section)] isolate ${isCompact ? 'aspect-[16/10]' : 'aspect-video'}`}>
          {post.image ? (
            <>
              <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105 origin-center">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover border-0 select-none"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-section-muted)] via-transparent to-transparent opacity-60 pointer-events-none" />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[var(--bg-section-muted)]">
              <span className="text-2xl font-bold text-[var(--foreground-muted)] opacity-20 group-hover:opacity-30 transition-opacity">
                {post.title.substring(0, 2).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        {/* CardBody - 3-side muted border (L, R, B) */}
        <div className={`flex flex-col flex-grow border-l border-r border-b border-[var(--border-muted)] rounded-b-2xl transition-base ${isCompact ? 'p-5' : 'p-6'}`}>
          {/* Category + reading time - uppercase, letter-spacing, muted */}
          <div className={`flex items-center justify-between gap-2 ${isCompact ? 'mb-2' : 'mb-3'}`}>
            <span className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-widest">
              {post.category || 'Article'}
            </span>
            {post.readingTime && (
              <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider">
                {post.readingTime}
              </span>
            )}
          </div>

          {/* Title - slightly smaller than Projects for lighter weight */}
          <h3 className={`font-bold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors line-clamp-2 ${isCompact ? 'text-base mb-2' : 'text-lg mb-3'}`}>
            {post.title}
          </h3>

          {/* Summary - 1–2 lines, architect-style */}
          <p className={`text-[var(--text-secondary)] text-sm leading-relaxed line-clamp-2 flex-grow ${isCompact ? 'mb-4' : 'mb-6'}`}>
            {post.excerpt}
          </p>

          {/* CTA - "Read Article →" */}
          <span className="text-sm font-medium text-[var(--accent)] flex items-center gap-2 mt-auto transition-all">
            Read Article
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </div>
      </article>
    </Link>
  );
}
