'use client';

import { useState } from 'react';
import { Project, ProjectTag } from '@/lib/types';
import { PROJECT_TAG_LABELS } from '@/lib/projects';
import ProjectCard from './ProjectCard';

type Filter = 'all' | ProjectTag;

interface ProjectsExplorerProps {
    projects: Project[];
}

export default function ProjectsExplorer({ projects }: Readonly<ProjectsExplorerProps>) {
    const [active, setActive] = useState<Filter>('all');

    const filters: { key: Filter; label: string; count: number }[] = [
        { key: 'all', label: 'All', count: projects.length },
        ...(Object.keys(PROJECT_TAG_LABELS) as ProjectTag[])
            .map((tag) => ({
                key: tag as Filter,
                label: PROJECT_TAG_LABELS[tag],
                count: projects.filter((p) => p.tags?.includes(tag)).length,
            }))
            .filter((f) => f.count > 0),
    ];

    const visible = active === 'all' ? projects : projects.filter((p) => p.tags?.includes(active));

    return (
        <>
            <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2 mb-8 sm:mb-10">
                {filters.map((f) => {
                    const isActive = f.key === active;
                    return (
                        <button
                            key={f.key}
                            type="button"
                            onClick={() => setActive(f.key)}
                            aria-pressed={isActive}
                            className={`inline-flex items-center gap-2 min-h-11 px-4 rounded-full border text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 ${isActive
                                ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]'
                                : 'border-[var(--border-strong)] bg-[var(--bg-section)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
                                }`}
                        >
                            {f.label}
                            <span className="text-xs font-semibold" aria-hidden>{f.count}</span>
                        </button>
                    );
                })}
            </div>

            <p className="sr-only" aria-live="polite">
                Showing {visible.length} of {projects.length} projects
            </p>

            <div key={active} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {visible.map((project, index) => (
                    <div
                        key={project.slug}
                        className="min-w-0"
                        style={{ animation: `fadeIn 0.6s ease-out ${Math.min(index, 6) * 0.08}s both` }}
                    >
                        <ProjectCard project={project} headingLevel="h2" />
                    </div>
                ))}
            </div>
        </>
    );
}
