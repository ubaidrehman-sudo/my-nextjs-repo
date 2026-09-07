'use client';

import { Experience } from '@/lib/types';
import { useState } from 'react';

interface ExperienceJobCardProps {
    experience: Experience;
    defaultCollapsed?: boolean;
    showAnimation?: boolean;
    animationDelay?: number;
}

const INITIAL_BULLETS = 2;

function calculateTenure(startDate: string, endDate?: string): string {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    
    const months = (end.getFullYear() - start.getFullYear()) * 12 + 
                   (end.getMonth() - start.getMonth());
    
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years === 0) {
        return `${remainingMonths} ${remainingMonths === 1 ? 'mo' : 'mos'}`;
    }
    if (remainingMonths === 0) {
        return `${years} ${years === 1 ? 'yr' : 'yrs'}`;
    }
    return `${years} ${years === 1 ? 'yr' : 'yrs'} ${remainingMonths} ${remainingMonths === 1 ? 'mo' : 'mos'}`;
}

export default function ExperienceJobCard({
    experience,
    defaultCollapsed = true,
    showAnimation = false,
    animationDelay = 0,
}: ExperienceJobCardProps) {
    const [isExpanded, setIsExpanded] = useState(!defaultCollapsed);
    const hasMoreBullets = experience.description.length > INITIAL_BULLETS;
    const visibleBullets = isExpanded ? experience.description : experience.description.slice(0, INITIAL_BULLETS);
    const tenure = calculateTenure(experience.startDate, experience.endDate);
    const isCurrent = !experience.endDate;

    return (
        <div
            className="group relative pl-8 border-l-2 border-[var(--border-muted)] hover:border-[var(--border-strong)] transition-colors duration-300"
            style={showAnimation ? {
                animation: `fadeIn 0.5s ease-out ${animationDelay}s both`
            } : undefined}
        >
            <span className="absolute -left-[5px] top-6 w-[9px] h-[9px] rounded-full bg-[var(--border-strong)] group-hover:bg-[var(--accent)] transition-colors duration-300 z-10" />

            <div className="bg-[var(--bg-section)] border border-[var(--border-muted)] rounded-xl p-6 shadow-[var(--shadow-surface)] hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-hover)] transition-base">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                        <h3 className="text-xl font-bold text-[var(--foreground)]">{experience.title}</h3>
                        <div className="text-[var(--foreground-muted)] text-lg font-medium mt-1">
                            <span className="text-[var(--text-primary)] font-semibold">{experience.company}</span>
                            <span className="mx-2 text-[var(--border-strong)]">•</span>
                            <span>{experience.location}</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-start md:items-end gap-2">
                        <span className="text-sm font-mono text-[var(--text-secondary)] bg-[var(--background-soft)] border border-[var(--border-muted)] px-4 py-1.5 rounded-full whitespace-nowrap">
                            {experience.startDate} — {experience.endDate || 'Present'}
                        </span>
                        <span className="text-xs font-medium text-[var(--text-secondary)]">
                            {tenure}
                            {isCurrent && (
                                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20">
                                    Current
                                </span>
                            )}
                        </span>
                    </div>
                </div>

                <ul className="space-y-2 mb-4" id={`exp-details-${experience.id}`}>
                    {visibleBullets.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-[var(--foreground-muted)] leading-relaxed">
                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--border-strong)] flex-shrink-0" aria-hidden />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>

                {hasMoreBullets && (
                    <button
                        type="button"
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-sm font-medium text-[var(--accent)] hover:text-[var(--accent-hover)] hover:underline underline-offset-2 transition-colors mb-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 rounded"
                        aria-expanded={isExpanded}
                        aria-controls={`exp-details-${experience.id}`}
                    >
                        {isExpanded ? 'Show less' : `Show more (+${experience.description.length - INITIAL_BULLETS})`}
                    </button>
                )}

                <div className="flex flex-wrap gap-2 pt-4 border-t border-[var(--border-muted)]">
                    {experience.technologies.map((tech) => (
                        <span
                            key={tech}
                            className="text-xs px-3 py-1 bg-[var(--bg-section-muted)] border border-[var(--border-muted)] text-[var(--text-secondary)] rounded-full hover:border-[var(--border-strong)] transition-colors cursor-default"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
