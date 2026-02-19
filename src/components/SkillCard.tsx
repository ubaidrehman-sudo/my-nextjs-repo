import { Skill } from '@/lib/types';

interface SkillCardProps {
    skill: Skill;
}

export default function SkillCard({ skill }: SkillCardProps) {
    return (
        <div className="border border-gray-200 p-4">
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">{skill.name}</h3>
                <span className="text-sm text-gray-600">{skill.proficiency}%</span>
            </div>

            <div className="w-full bg-gray-100 h-2 border border-gray-300">
                <div
                    className="bg-black h-full transition-all"
                    style={{ width: `${skill.proficiency}%` }}
                />
            </div>

            <div className="mt-2">
                <span className="text-xs text-gray-500 uppercase">{skill.category}</span>
            </div>
        </div>
    );
}
