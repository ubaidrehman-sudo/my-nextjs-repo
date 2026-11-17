import Link from 'next/link';
import { FiShield, FiCpu, FiLayers } from 'react-icons/fi';
import { ArchitecturePillar, HomeAboutBridge } from '@/lib/types';
import SectionHeadingWithBar from './SectionHeadingWithBar';

interface ArchitectureAISectionProps {
    bridge: HomeAboutBridge;
    pillars: ArchitecturePillar[];
}

const iconMap: Record<ArchitecturePillar['iconKey'], React.ComponentType<{ className?: string }>> = {
    resilience: FiShield,
    ai: FiCpu,
    delivery: FiLayers,
};

export default function ArchitectureAISection({ bridge, pillars }: Readonly<ArchitectureAISectionProps>) {
    return (
        <section className="py-16 sm:py-20 md:py-24 mb-8 sm:mb-10 md:mb-12 bg-[var(--bg-section)]">
            <div className="max-w-7xl mx-auto px-4">
                <SectionHeadingWithBar
                    label={bridge.label}
                    title={bridge.title}
                    subtitle={bridge.subtitle}
                    className="mb-6 max-w-3xl"
                />
                <p className="text-[var(--text-secondary)] leading-relaxed max-w-3xl mb-6">
                    {bridge.intro}
                </p>
                <p className="mb-10 sm:mb-12">
                    <Link
                        href="/about"
                        className="text-sm font-semibold text-[var(--accent)] hover:underline underline-offset-4 inline-flex items-center gap-1.5 min-h-11"
                    >
                        {bridge.aboutLinkText}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </p>

                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 list-none p-0">
                    {pillars.map((pillar) => {
                        const Icon = iconMap[pillar.iconKey];

                        return (
                            <li
                                key={pillar.id}
                                className="bg-[var(--background-elevated)] border border-[var(--border-muted)] rounded-xl p-5 sm:p-6 transition-base hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-hover)] hover:-translate-y-0.5"
                                style={{ boxShadow: 'var(--shadow-surface)' }}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="shrink-0 w-11 h-11 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center">
                                        <Icon className="w-5 h-5 text-[var(--accent)]" aria-hidden />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs uppercase tracking-wider font-medium text-[var(--text-secondary)] mb-1">
                                            {pillar.label}
                                        </p>
                                        <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] mb-2 leading-snug">
                                            {pillar.title}
                                        </h3>
                                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                                            {pillar.description}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}
