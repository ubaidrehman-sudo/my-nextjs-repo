import { projects } from '@/lib/data';
import ProjectCard from '@/components/ProjectCard';
import SectionHeadingWithBar from '@/components/SectionHeadingWithBar';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Projects',
    description: 'Showcase of my web development projects and experiments.',
};

const PROJECTS_PER_PAGE = 6;

export default async function ProjectsPage({
    searchParams,
}: Readonly<{
    searchParams: Promise<{ page?: string }>;
}>) {
    const { page } = await searchParams;

    // Sort projects by priority (lower number = higher priority), then by featured status
    const sortedProjects = [...projects].sort((a, b) => {
        if (a.priority !== b.priority) {
            return (a.priority || 999) - (b.priority || 999);
        }
        // If priorities are equal (or undefined), featured ones come first
        if (a.featured !== b.featured) {
            return a.featured ? -1 : 1;
        }
        return 0;
    });

    const totalPages = Math.max(1, Math.ceil(sortedProjects.length / PROJECTS_PER_PAGE));
    const currentPage = Math.min(Math.max(1, Number(page) || 1), totalPages);
    const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
    const pagedProjects = sortedProjects.slice(startIndex, startIndex + PROJECTS_PER_PAGE);

    return (
        <div className="max-w-7xl mx-auto px-4 py-16 pt-32">
            <div className="flex justify-between items-end mb-12">
                <SectionHeadingWithBar
                    title="Projects"
                    subtitle="A collection of my work, ranging from full-stack applications to experimental UI designs."
                    level={1}
                    subtitleClassName="max-w-2xl"
                />
                <Link
                    href="/"
                    className="btn-secondary group inline-flex items-center gap-2 px-5 py-2.5 hidden md:inline-flex"
                >
                    <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Home
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {pagedProjects.map((project, index) => (
                    <div
                        key={project.slug}
                        className="min-w-0"
                        style={{
                            animation: `fadeIn 0.6s ease-out ${index * 0.1}s both`
                        }}
                    >
                        <ProjectCard project={project} />
                    </div>
                ))}
            </div>

            {totalPages > 1 && (
                <nav
                    aria-label="Projects pagination"
                    className="flex items-center justify-center gap-2 mt-16"
                >
                    <Link
                        href={currentPage > 1 ? `/projects?page=${currentPage - 1}` : '#'}
                        aria-disabled={currentPage === 1}
                        className={`inline-flex items-center justify-center w-10 h-10 rounded-lg border transition-colors ${currentPage === 1
                            ? 'pointer-events-none opacity-40 border-[var(--border-muted)] text-[var(--text-muted)]'
                            : 'border-[var(--border-muted)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
                            }`}
                        aria-label="Previous page"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </Link>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                        <Link
                            key={pageNum}
                            href={`/projects?page=${pageNum}`}
                            aria-current={pageNum === currentPage ? 'page' : undefined}
                            className={`inline-flex items-center justify-center w-10 h-10 rounded-lg border text-sm font-medium transition-colors ${pageNum === currentPage
                                ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]'
                                : 'border-[var(--border-muted)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
                                }`}
                        >
                            {pageNum}
                        </Link>
                    ))}

                    <Link
                        href={currentPage < totalPages ? `/projects?page=${currentPage + 1}` : '#'}
                        aria-disabled={currentPage === totalPages}
                        className={`inline-flex items-center justify-center w-10 h-10 rounded-lg border transition-colors ${currentPage === totalPages
                            ? 'pointer-events-none opacity-40 border-[var(--border-muted)] text-[var(--text-muted)]'
                            : 'border-[var(--border-muted)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
                            }`}
                        aria-label="Next page"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </nav>
            )}
        </div>
    );
}
