'use client';

import { Experience } from '@/lib/types';
import { useState } from 'react';

interface ExperienceTimelineProps {
    experiences: Experience[];
}

const INITIAL_BULLETS = 2;

export default function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
    const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

    const toggleExpand = (id: string) => {
        setExpandedIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    return (
        <div className="space-y-6">
            {experiences.map((exp, index) => (
                <div
                    key={exp.id}
                    className="group relative pl-8 border-l-2 border-[color-mix(in_srgb,var(--accent)_15%,var(--border))] hover:border-[var(--accent)] transition-colors duration-300"
                    style={{
                        animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`
                    }}
                >
                    {/* Timeline Dot - matches home page */}
                    <span className="absolute -left-[5px] top-6 w-[9px] h-[9px] rounded-full bg-[var(--accent)]/40 group-hover:bg-[var(--accent)] transition-colors duration-300 z-10" />

                    <div className="bg-[var(--bg-section)] border border-[var(--border-muted)] rounded-xl p-6 shadow-[var(--shadow-surface)] hover:border-[var(--accent)] hover:shadow-[var(--shadow-hover)] transition-base">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-[var(--foreground)]">{exp.title}</h3>
                                <div className="text-[var(--foreground-muted)] text-lg font-medium mt-1">
                                    <span className="text-[var(--accent)] font-semibold">{exp.company}</span>
                                    <span className="mx-2 text-[var(--border-strong)]">•</span>
                                    <span>{exp.location}</span>
                                </div>
                            </div>
                            <span className="text-sm font-mono text-[var(--text-secondary)] bg-[var(--accent)]/10 px-4 py-1.5 rounded-full whitespace-nowrap self-start">
                                {exp.startDate} — {exp.endDate || 'Present'}
                            </span>
                        </div>

                        <ul className="space-y-2 mb-4">
                            {(expandedIds.has(exp.id) ? exp.description : exp.description.slice(0, INITIAL_BULLETS)).map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-[var(--foreground-muted)] leading-relaxed">
                                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--accent)] flex-shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        {exp.description.length > INITIAL_BULLETS && (
                            <button
                                type="button"
                                onClick={() => toggleExpand(exp.id)}
                                className="text-sm font-medium text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors mb-4"
                            >
                                {expandedIds.has(exp.id) ? 'Show less' : `Show more (+${exp.description.length - INITIAL_BULLETS})`}
                            </button>
                        )}

                        <div className="flex flex-wrap gap-2 pt-4 border-t border-[var(--border-muted)]">
                            {exp.technologies.map((tech) => (
                                <span
                                    key={tech}
                                    className="text-xs px-3 py-1 bg-[var(--bg-section-muted)] border border-[var(--border-muted)] text-[var(--text-secondary)] rounded-full hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors cursor-default"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
