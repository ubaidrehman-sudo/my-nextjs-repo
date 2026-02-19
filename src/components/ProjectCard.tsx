'use client';

import { Project } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link
            href={`/projects/${project.id}`}
            className="group block h-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <article className="h-full bg-[var(--background-elevated)] border border-[var(--border)] rounded-2xl overflow-hidden group hover:border-[var(--accent)] hover:shadow-lg transition-all duration-300 flex flex-col">
                {/* Image or Gradient Placeholder */}
                <div className="relative h-48 w-full overflow-hidden bg-[var(--background-elevated)] border-b border-[var(--border)]">
                    {project.image ? (
                        <>
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--background-soft)] via-transparent to-transparent opacity-60" />
                        </>
                    ) : (
                        <div className={`w-full h-full bg-gradient-to-br from-[var(--background-elevated)] to-[var(--background)] flex items-center justify-center p-6 group-hover:scale-105 transition-transform duration-500`}>
                            <div className="text-center">
                                <span className="text-4xl font-bold text-[var(--foreground-muted)] opacity-20 group-hover:opacity-40 transition-opacity">
                                    {project.title.substring(0, 2).toUpperCase()}
                                </span>
                            </div>
                            {/* Decorative accent lines */}
                            <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--accent)]/5 blur-2xl rounded-full translate-x-10 -translate-y-10" />
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[var(--accent)]/5 blur-3xl rounded-full -translate-x-10 translate-y-10" />
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors duration-300">
                            {project.title}
                        </h3>
                    </div>

                    <p className="text-[var(--foreground-muted)] mb-6 line-clamp-2 leading-relaxed text-sm flex-grow">
                        {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.slice(0, 4).map((tech) => (
                            <span
                                key={tech}
                                className="text-xs px-2 py-1 bg-[var(--background-elevated)] border border-[var(--border)] text-[var(--foreground-muted)] rounded-sm"
                            >
                                {tech}
                            </span>
                        ))}
                        {project.technologies.length > 4 && (
                            <span className="text-xs px-2 py-1 text-[var(--foreground-muted)]">
                                +{project.technologies.length - 4}
                            </span>
                        )}
                    </div>

                    {/* Links */}
                    <div className="flex items-center justify-between pt-4 border-t border-[var(--border)] mt-auto">
                        <span className="text-sm font-medium text-[var(--accent)] flex items-center gap-2 group-hover:gap-3 transition-all">
                            View Details
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </span>

                        <div className="flex gap-3">
                            {project.github && (
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.open(project.github, '_blank');
                                    }}
                                    className="p-2 text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--background-elevated)] rounded-full transition-colors"
                                    title="View GitHub"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            )}
                            {project.link && (
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.open(project.link, '_blank');
                                    }}
                                    className="p-2 text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--background-elevated)] rounded-full transition-colors"
                                    title="View Live Site"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    );
}
