'use client';

import { Education } from '@/lib/types';

interface EducationSectionProps {
    education: Education[];
}

export default function EducationSection({ education }: EducationSectionProps) {
    return (
        <section className="py-20 border-b border-[var(--border)]">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-serif font-bold text-[var(--foreground)] mb-10">Education & Certifications</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {education.map((edu) => (
                        <div key={edu.id} className="p-6 bg-[var(--background-soft)] border border-[var(--border)] rounded-lg hover:border-[var(--accent)] transition-colors">
                            <h3 className="text-lg font-bold text-[var(--foreground)] mb-1">{edu.degree}</h3>
                            <p className="text-[var(--accent)] mb-2">{edu.institution}</p>
                            <p className="text-sm text-[var(--foreground-muted)] font-mono mb-4">
                                {edu.startDate} — {edu.endDate}
                            </p>
                            {edu.description && (
                                <p className="text-sm text-[var(--foreground-muted)] opacity-80">{edu.description}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
