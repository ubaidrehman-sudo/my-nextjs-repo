'use client';

import { useState, useMemo } from 'react';
import { BlogPost } from '@/lib/types';
import BlogCard from './BlogCard';

interface BlogSearchProps {
    initialPosts: BlogPost[];
}

const POSTS_PER_PAGE = 6;

export default function BlogSearch({ initialPosts }: BlogSearchProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    // Get all unique tags
    const allTags = useMemo(() =>
        Array.from(new Set(initialPosts.flatMap((post) => post.tags))).sort(),
        [initialPosts]
    );

    // Filter posts based on search and tag
    const filteredPosts = useMemo(() => {
        return initialPosts.filter((post) => {
            const matchesSearch = searchQuery
                ? post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
                post.category?.toLowerCase().includes(searchQuery.toLowerCase())
                : true;

            const matchesTag = selectedTag
                ? post.tags.includes(selectedTag)
                : true;

            return matchesSearch && matchesTag;
        });
    }, [initialPosts, searchQuery, selectedTag]);

    // Pagination
    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
    const paginatedPosts = useMemo(() => {
        const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
        return filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
    }, [filteredPosts, currentPage]);

    // Reset to page 1 when filters change
    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
        setCurrentPage(1);
    };

    const handleTagChange = (tag: string | null) => {
        setSelectedTag(tag);
        setCurrentPage(1);
    };

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedTag(null);
        setCurrentPage(1);
    };

    return (
        <div>
            {/* Search and Filter Section */}
            <div className="mb-12 space-y-6">
                {/* Search Input */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search blogs by title, category, or tags..."
                        value={searchQuery}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className="w-full px-6 py-4 bg-[var(--bg-section)] border border-[var(--border-muted)] rounded-2xl text-[var(--foreground)] placeholder:text-[var(--foreground-muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all duration-300 shadow-[var(--shadow-surface)] hover:border-[var(--accent)]"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => handleSearchChange('')}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--foreground-muted)] hover:text-[var(--accent)] transition-colors p-1"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>

                {/* Tag Filters */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-[var(--foreground-muted)] uppercase tracking-wider">
                            Filter by Tag
                        </h3>
                        {(selectedTag || searchQuery) && (
                            <button
                                onClick={clearFilters}
                                className="text-sm text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors font-medium"
                            >
                                Clear all filters
                            </button>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => handleTagChange(null)}
                            className={`text-sm px-4 py-2 rounded-full border transition-all duration-300 ${selectedTag === null
                                ? 'bg-[var(--accent)] text-white border-[var(--accent)] shadow-lg shadow-[var(--accent)]/20'
                                : 'bg-[var(--background-elevated)] text-[var(--foreground-muted)] border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
                                }`}
                        >
                            All ({initialPosts.length})
                        </button>
                        {allTags.map((tag) => {
                            const count = initialPosts.filter(p => p.tags.includes(tag)).length;
                            return (
                                <button
                                    key={tag}
                                    onClick={() => handleTagChange(tag)}
                                    className={`text-sm px-4 py-2 rounded-full border transition-all duration-300 ${selectedTag === tag
                                        ? 'bg-[var(--accent)] text-white border-[var(--accent)] shadow-lg shadow-[var(--accent)]/20'
                                        : 'bg-[var(--background-elevated)] text-[var(--foreground-muted)] border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
                                        }`}
                                >
                                    {tag} ({count})
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Results Count */}
                <div className="text-sm text-[var(--foreground-muted)] pl-1">
                    Showing <span className="font-medium text-[var(--foreground)]">{paginatedPosts.length}</span> of <span className="font-medium text-[var(--foreground)]">{filteredPosts.length}</span> {filteredPosts.length === 1 ? 'post' : 'posts'}
                </div>
            </div>

            {/* Blog Grid */}
            {filteredPosts.length === 0 ? (
                <div className="text-center py-20 bg-[var(--background-soft)] rounded-3xl border border-[var(--border)] border-dashed">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--background-elevated)] border border-[var(--border)] mb-4">
                        <svg className="w-8 h-8 text-[var(--foreground-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">No posts found</h3>
                    <p className="text-[var(--foreground-muted)] mb-6">
                        Try adjusting your search or filter criteria
                    </p>
                    <button
                        onClick={clearFilters}
                        className="px-6 py-2 bg-[var(--accent)] text-white rounded-full font-medium hover:bg-[var(--accent-hover)] transition-colors shadow-lg shadow-[var(--accent)]/20"
                    >
                        Clear filters
                    </button>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {paginatedPosts.map((post, index) => (
                            <div
                                key={post.slug}
                                className="min-w-0"
                                style={{
                                    animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`
                                }}
                            >
                                <BlogCard post={post} />
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex flex-col items-center gap-4 py-8">
                            <div className="inline-flex items-center gap-1 p-2 rounded-2xl bg-[var(--bg-section)] border border-[var(--border-muted)] shadow-[var(--shadow-surface)]">
                                <button
                                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-[var(--foreground)] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--accent)]/10 hover:text-[var(--accent)] hover:border-[var(--accent)] border border-transparent transition-all duration-300"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    Prev
                                </button>

                                <div className="flex items-center gap-1 mx-1">
                                    {(() => {
                                        const pages: (number | 'ellipsis')[] = [];
                                        if (totalPages <= 7) {
                                            for (let i = 1; i <= totalPages; i++) pages.push(i);
                                        } else {
                                            const showFirst = currentPage <= 3;
                                            const showLast = currentPage >= totalPages - 2;
                                            if (showFirst) {
                                                for (let i = 1; i <= 4; i++) pages.push(i);
                                                pages.push('ellipsis');
                                                pages.push(totalPages);
                                            } else if (showLast) {
                                                pages.push(1);
                                                pages.push('ellipsis');
                                                for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
                                            } else {
                                                pages.push(1);
                                                pages.push('ellipsis');
                                                for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
                                                pages.push('ellipsis');
                                                pages.push(totalPages);
                                            }
                                        }
                                        return pages.map((page, idx) =>
                                            page === 'ellipsis' ? (
                                                <span key={`e-${idx}`} className="w-8 h-8 flex items-center justify-center text-[var(--text-muted)]">
                                                    ···
                                                </span>
                                            ) : (
                                                <button
                                                    key={page}
                                                    onClick={() => setCurrentPage(page)}
                                                    className={`min-w-[2.25rem] h-9 px-3 rounded-xl font-medium text-sm transition-all duration-300 ${
                                                        currentPage === page
                                                            ? 'bg-[var(--accent)] text-white border border-[var(--accent)] shadow-md shadow-[var(--accent)]/25'
                                                            : 'text-[var(--foreground)] border border-transparent hover:bg-[var(--accent)]/10 hover:text-[var(--accent)] hover:border-[var(--accent)]'
                                                    }`}
                                                >
                                                    {page}
                                                </button>
                                            )
                                        );
                                    })()}
                                </div>

                                <button
                                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-[var(--foreground)] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--accent)]/10 hover:text-[var(--accent)] hover:border-[var(--accent)] border border-transparent transition-all duration-300"
                                >
                                    Next
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                            <p className="text-xs text-[var(--text-muted)]">
                                Page {currentPage} of {totalPages}
                            </p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
