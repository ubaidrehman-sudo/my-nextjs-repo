import Link from 'next/link';
import { HomeAboutBridge, SnapshotCard } from '@/lib/types';
import { FiBriefcase, FiCheckCircle, FiAward } from 'react-icons/fi';
import SectionHeadingWithBar from './SectionHeadingWithBar';

interface HomeSnapshotSectionProps {
    bridge: HomeAboutBridge;
    cards: SnapshotCard[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    experience: FiBriefcase,
    projects: FiCheckCircle,
    education: FiAward,
};

export default function HomeSnapshotSection({ bridge, cards }: HomeSnapshotSectionProps) {
    return (
        <section className="py-24 mb-12 bg-[var(--bg-section)]">
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
                <p className="mb-12">
                    <Link
                        href="/about"
                        className="text-sm font-semibold text-[var(--accent)] hover:underline underline-offset-4 inline-flex items-center gap-1.5"
                    >
                        {bridge.aboutLinkText}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {cards.map((card) => {
                        const Icon = iconMap[card.iconKey] || FiBriefcase;

                        return (
                            <div
                                key={card.id}
                                className="bg-[var(--background-elevated)] border border-[var(--border-muted)] rounded-xl p-6 transition-all duration-300 hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-hover)]"
                                style={{ boxShadow: 'var(--shadow-surface)' }}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="shrink-0 w-11 h-11 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center">
                                        <Icon className="w-5 h-5 text-[var(--accent)]" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs uppercase tracking-wider font-medium text-[var(--text-muted)] mb-1">
                                            {card.label}
                                        </p>
                                        <p className="text-xl font-bold text-[var(--text-primary)] mb-1.5 leading-snug">
                                            {card.value}
                                        </p>
                                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                                            {card.caption}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
