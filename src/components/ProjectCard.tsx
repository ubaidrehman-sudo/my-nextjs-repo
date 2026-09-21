'use client';

import { Project } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';

interface ProjectCardProps {
    project: Project;
    variant?: 'default' | 'compact';
}

export default function ProjectCard({ project, variant = 'default' }: ProjectCardProps) {
    const displayDescription = project.problemStatement || project.description;
    const hasExternalLinks = project.github || project.link;
    const isCompact = variant === 'compact';

    const handleExternalClick = (e: React.MouseEvent, url: string) => {
        e.preventDefault();
        e.stopPropagation();
        window.open(url, '_blank');
    };

    return (
        <Link href={`/projects/${project.slug}`} className="group block h-full min-w-0 rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]">
            <article className="h-full min-w-0 bg-[var(--bg-section)] rounded-2xl overflow-clip shadow-[var(--shadow-surface)] transition-base flex flex-col hover:shadow-[var(--shadow-teal)] hover:-translate-y-0.5">
                {/* Image area - strict clip; scale applied to wrapper to avoid border artifacts */}
                <div className={`relative w-full min-w-0 overflow-clip rounded-t-2xl bg-[var(--bg-section)] isolate ${isCompact ? 'aspect-[16/9]' : 'aspect-video'}`}>
                    {project.image ? (
                        <>
                            <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105 origin-center">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover border-0 select-none"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-section-muted)] via-transparent to-transparent opacity-60 pointer-events-none" />
                        </>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[var(--bg-section-muted)]">
                            <span className="text-4xl font-bold text-[var(--foreground-muted)] opacity-20 group-hover:opacity-30 transition-opacity">
                                {project.title.substring(0, 2).toUpperCase()}
                            </span>
                        </div>
                    )}
                </div>

                {/* Content - 3-side muted border (L, R, B) */}
                <div className={`flex flex-col flex-grow border-l border-r border-b border-[var(--border-muted)] rounded-b-2xl transition-base ${isCompact ? 'p-5' : 'p-6'}`}>
                    {project.role && (
                        <p className="text-xs uppercase tracking-wider text-[var(--text-muted)] mb-2">
                            {project.role}
                        </p>
                    )}
                    <h3 className={`font-bold text-[var(--foreground)] mb-2 group-hover:text-[var(--accent)] transition-colors ${isCompact ? 'text-lg' : 'text-xl'}`}>
                        {project.title}
                    </h3>

                    <p className={`text-[var(--text-secondary)] line-clamp-2 leading-relaxed text-sm flex-grow ${isCompact ? 'mb-4' : 'mb-6'}`}>
                        {displayDescription}
                    </p>

                    {/* Tech tags - neutral only */}
                    <div className={`flex flex-wrap gap-2 ${isCompact ? 'mb-4' : 'mb-6'}`}>
                        {project.technologies.slice(0, isCompact ? 3 : 4).map((tech) => (
                            <span
                                key={tech}
                                className="text-xs px-2.5 py-1 bg-[var(--bg-section-muted)] border border-[var(--border-muted)] text-[var(--text-secondary)] rounded"
                            >
                                {tech}
                            </span>
                        ))}
                        {project.technologies.length > (isCompact ? 3 : 4) && (
                            <span className="text-xs px-2 py-1 text-[var(--text-muted)]">
                                +{project.technologies.length - (isCompact ? 3 : 4)}
                            </span>
                        )}
                    </div>

                    {/* CTA + external links (below image, in content area) */}
                    <div className={`flex items-center justify-between gap-4 mt-auto border-t border-[var(--border-muted)] ${isCompact ? 'pt-3' : 'pt-4'}`}>
                        <span className="text-sm font-medium text-[var(--accent)] flex items-center gap-2 transition-all">
                            View Case Study
                            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </span>

                        {hasExternalLinks && (
                            <div className="flex gap-2">
                                {project.link && (
                                    <button
                                        type="button"
                                        onClick={(e) => handleExternalClick(e, project.link!)}
                                        className="p-2 rounded-lg border border-[var(--border-muted)] bg-[var(--bg-section)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--foreground)] transition-base"
                                        title="View Live Site"
                                        aria-label="View live site"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </button>
                                )}
                                {project.github && (
                                    <button
                                        type="button"
                                        onClick={(e) => handleExternalClick(e, project.github!)}
                                        className="p-2 rounded-lg border border-[var(--border-muted)] bg-[var(--bg-section)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--foreground)] transition-base"
                                        title="View GitHub"
                                        aria-label="View on GitHub"
                                    >
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </article>
        </Link>
    );
}
