'use client';

import { Experience } from '@/lib/types';
import Link from 'next/link';
import { motion } from 'framer-motion';
import SectionHeadingWithBar from './SectionHeadingWithBar';

interface ExperienceSectionProps {
    experiences: Experience[];
}

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
    // Take only the latest 2 experiences
    const latestExperiences = experiences.slice(0, 2);

    return (
        <section id="experience" className="py-24 mb-12 bg-[var(--bg-section-muted)]">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-end mb-12">
                    <SectionHeadingWithBar
                        title="Work Experience"
                        subtitle="Professional journey and roles"
                    />
                    <Link
                        href="/experience"
                        className="btn-secondary hidden md:inline-flex items-center gap-2 px-5 py-2.5 group"
                    >
                        View Full History
                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>

                <div className="space-y-6">
                    {latestExperiences.map((exp, index) => (
                        <motion.div
                            key={exp.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative pl-8 border-l-2 border-[color-mix(in_srgb,var(--accent)_15%,var(--border))] hover:border-[var(--accent)] transition-colors duration-300"
                        >
                            <span className="absolute -left-[5px] top-6 w-[9px] h-[9px] rounded-full bg-[var(--accent)]/40 group-hover:bg-[var(--accent)] transition-colors duration-300" />

                            <div className="bg-[var(--bg-section)] border border-[var(--border-muted)] rounded-xl p-6 shadow-[var(--shadow-surface)] transition-base hover:border-[var(--accent)] hover:shadow-[var(--shadow-hover)]">
                                <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-2">
                                    <h3 className="text-2xl font-bold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                                        {exp.title}
                                    </h3>
                                    <span className="text-[var(--foreground-muted)] text-lg">
                                        <span className="text-[var(--accent)] font-semibold">@</span> {exp.company}
                                    </span>
                                </div>

                                <div className="flex flex-col md:flex-row gap-4 md:items-center text-sm text-[var(--text-secondary)] font-medium mb-4 font-mono">
                                    <span>
                                        {exp.startDate} — {exp.endDate || 'Present'}
                                    </span>
                                    <span className="hidden md:inline text-[var(--border)]">|</span>
                                    <span>{exp.location}</span>
                                </div>

                                <p className="text-[var(--foreground-muted)] max-w-3xl leading-relaxed">
                                    {exp.description[0]} {/* Show only the first bullet point as summary */}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 md:hidden">
                    <Link
                        href="/experience"
                        className="btn-secondary flex items-center justify-center px-5 py-3 group"
                    >
                        View Full History
                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
