import { Experience } from '@/lib/types';

interface ExperienceTimelineProps {
    experiences: Experience[];
}

export default function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
    return (
        <div className="space-y-8 relative pl-4">
            {/* Timeline Line */}
            <div className="absolute left-[27px] top-2 bottom-2 w-px bg-[var(--border)]" />

            {experiences.map((exp, index) => (
                <div
                    key={exp.id}
                    className="relative pl-12 group"
                    style={{
                        animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`
                    }}
                >
                    {/* Timeline Dot */}
                    <span className="absolute left-[23px] top-2 w-[9px] h-[9px] rounded-full bg-[var(--background)] border-2 border-[var(--accent)] group-hover:bg-[var(--accent)] transition-colors duration-300 z-10" />

                    <div className="bg-[var(--background-elevated)] border border-[var(--border)] rounded-xl p-8 hover:border-[var(--accent)] hover:shadow-lg hover:shadow-[var(--accent)]/5 transition-all duration-300">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-[var(--foreground)]">{exp.title}</h3>
                                <div className="text-[var(--foreground-muted)] text-lg font-medium mt-1">
                                    <span className="text-[var(--accent)] font-semibold">{exp.company}</span>
                                    <span className="mx-2 text-[var(--border-strong)]">•</span>
                                    <span>{exp.location}</span>
                                </div>
                            </div>
                            <span className="text-sm font-mono text-[var(--accent-dark)] bg-[var(--accent)]/10 px-4 py-1.5 rounded-full whitespace-nowrap self-start">
                                {exp.startDate} — {exp.endDate || 'Present'}
                            </span>
                        </div>

                        <ul className="space-y-3 mb-6">
                            {exp.description.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-[var(--foreground-muted)] leading-relaxed">
                                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--accent)] flex-shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="flex flex-wrap gap-2 pt-4 border-t border-[var(--border)]">
                            {exp.technologies.map((tech) => (
                                <span
                                    key={tech}
                                    className="text-xs px-3 py-1 bg-[var(--background-soft)] border border-[var(--border)] text-[var(--foreground-muted)] rounded-full hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors cursor-default"
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
