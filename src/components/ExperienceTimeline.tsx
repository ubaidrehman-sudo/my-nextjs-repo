'use client';

import { Experience } from '@/lib/types';
import ExperienceJobCard from './ExperienceJobCard';

interface ExperienceTimelineProps {
    experiences: Experience[];
}

export default function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
    return (
        <div className="space-y-6">
            {experiences.map((exp, index) => (
                <ExperienceJobCard
                    key={exp.id}
                    experience={exp}
                    defaultCollapsed={true}
                    showAnimation={true}
                    animationDelay={index * 0.1}
                />
            ))}
        </div>
    );
}
