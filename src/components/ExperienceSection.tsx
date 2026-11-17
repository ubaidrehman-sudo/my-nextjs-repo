'use client';

import { Experience } from '@/lib/types';
import Link from 'next/link';
import { motion } from 'framer-motion';
import SectionHeadingWithBar from './SectionHeadingWithBar';
import ExperienceJobCard from './ExperienceJobCard';

interface ExperienceSectionProps {
    experiences: Experience[];
}

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
    const latestExperiences = experiences.slice(0, 2);

    return (
        <section id="experience" className="py-24 mb-12 bg-[var(--bg-section)]">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-end mb-12">
                    <SectionHeadingWithBar
                        label="Career"
                        title="Work Experience"
                        subtitle="Professional journey and roles"
                    />
                    {/* Wrapper does the hiding: .btn-secondary sets its own display, which would override `hidden`.
                        On mobile the full-width button below the cards is used instead. */}
                    <div className="hidden md:block shrink-0">
                        <Link
                            href="/experience"
                            className="btn-secondary items-center gap-2 px-5 py-2.5 group whitespace-nowrap"
                        >
                            View Full History
                            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>

                <div className="space-y-6">
                    {latestExperiences.map((exp, index) => (
                        <motion.div
                            key={exp.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <ExperienceJobCard
                                experience={exp}
                                defaultCollapsed={true}
                            />
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 md:hidden">
                    <Link
                        href="/experience"
                        className="btn-secondary w-full min-h-11 justify-center group"
                    >
                        View Full History
                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
