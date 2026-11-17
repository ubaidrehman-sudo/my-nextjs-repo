import { ProjectStat } from '@/lib/types';

interface StatTilesProps {
    stats: ProjectStat[];
}

export default function StatTiles({ stats }: Readonly<StatTilesProps>) {
    if (stats.length === 0) return null;

    return (
        <dl className="flex flex-wrap gap-3 sm:gap-4 mb-10 sm:mb-12 animate-fade-in-up">
            {stats.map((stat) => (
                <div
                    key={stat.label}
                    className="flex-1 min-w-[9.5rem] rounded-xl border border-[var(--border-muted)] bg-[var(--bg-section)] p-4 sm:p-5"
                    style={{ boxShadow: 'var(--shadow-surface)' }}
                >
                    <dd className="text-2xl sm:text-3xl font-bold text-[var(--accent)] leading-tight">
                        {stat.value}
                    </dd>
                    <dt className="text-sm text-[var(--text-secondary)] leading-snug mt-1.5 font-normal">
                        {stat.label}
                    </dt>
                </div>
            ))}
        </dl>
    );
}
