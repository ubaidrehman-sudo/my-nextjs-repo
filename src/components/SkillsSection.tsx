'use client';

import { Skill } from '@/lib/types';
import { getSkillIcon, getSkillColor } from '@/lib/skillIcons';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiMonitor, FiServer, FiDatabase, FiCloud, FiTool } from 'react-icons/fi';
import SectionHeadingWithBar from './SectionHeadingWithBar';

interface SkillsSectionProps {
    skills: Skill[];
}

const CATEGORY_CONFIG: { key: Skill['category']; title: string; Icon: typeof FiMonitor }[] = [
    { key: 'frontend', title: 'Frontend Development', Icon: FiMonitor },
    { key: 'backend', title: 'Backend Development', Icon: FiServer },
    { key: 'database', title: 'Database & Storage', Icon: FiDatabase },
    { key: 'cloud', title: 'Cloud & DevOps', Icon: FiCloud },
    { key: 'tools', title: 'Tools & Testing', Icon: FiTool },
];

export default function SkillsSection({ skills }: SkillsSectionProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

    const renderSkillBadge = (skill: Skill) => {
        const Icon = getSkillIcon(skill.name);
        const color = getSkillColor(skill.name);
        return (
            <div key={skill.id} className="skill-badge">
                {Icon && <Icon className="skill-icon" style={{ color }} />}
                <span className="skill-name">{skill.name}</span>
            </div>
        );
    };

    const renderCategory = (title: string, categorySkills: Skill[], Icon: typeof FiMonitor) => {
        if (categorySkills.length === 0) return null;

        return (
            <div className="mb-10">
                <div className="flex items-center gap-3 pb-3 mb-4 border-b-2 border-[var(--accent)]">
                    <Icon className="w-5 h-5 text-[var(--accent)] shrink-0" aria-hidden />
                    <h3 className="text-base font-semibold text-[var(--text-primary)]">{title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                    {categorySkills.map(renderSkillBadge)}
                </div>
            </div>
        );
    };

    return (
        <section
            id="skills"
            ref={sectionRef}
            className="py-24 mb-12 bg-[var(--bg-section)]"
        >
            <div className="max-w-7xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                >
                    <SectionHeadingWithBar
                        title="Skills & Technologies"
                        subtitle="I design and implement production-ready systems with modern tools and best practices."
                        className="mb-12"
                    />
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-12 gap-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
                >
                    {CATEGORY_CONFIG.map(({ key, title, Icon }) => {
                        const categorySkills = skills.filter((s) => s.category === key);
                        return renderCategory(title, categorySkills, Icon);
                    })}
                </motion.div>
            </div>
        </section>
    );
}
