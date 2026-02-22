import { Skill } from '@/lib/types';

interface SkillCardProps {
    skill: Skill;
}

export default function SkillCard({ skill }: SkillCardProps) {
    return (
        <div className="border border-[var(--border-muted)] p-4 bg-[var(--bg-section)]">
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-[var(--text-primary)]">{skill.name}</h3>
                <span className="text-sm text-[var(--text-secondary)]">{skill.proficiency}%</span>
            </div>

            <div className="w-full bg-[var(--bg-section-muted)] h-2 border border-[var(--border-muted)]">
                <div
                    className="bg-[var(--foreground)] h-full transition-all"
                    style={{ width: `${skill.proficiency}%` }}
                />
            </div>

            <div className="mt-2">
                <span className="text-xs text-[var(--text-muted)] uppercase">{skill.category}</span>
            </div>
        </div>
    );
}
