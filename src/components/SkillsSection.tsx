'use client';

import { Skill } from '@/lib/types';
import { getSkillIcon, getSkillColor } from '@/lib/skillIcons';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiMonitor, FiServer, FiDatabase, FiCloud, FiTool, FiCpu } from 'react-icons/fi';
import SectionHeadingWithBar from './SectionHeadingWithBar';

interface SkillsSectionProps {
    skills: Skill[];
}

const CATEGORY_CONFIG: { key: Skill['category']; title: string; Icon: typeof FiMonitor }[] = [
    { key: 'backend', title: 'Backend Development', Icon: FiServer },
    { key: 'cloud', title: 'Cloud & DevOps', Icon: FiCloud },
    { key: 'database', title: 'Database & Storage', Icon: FiDatabase },
    { key: 'ai', title: 'AI & GenAI', Icon: FiCpu },
    { key: 'frontend', title: 'Frontend Development', Icon: FiMonitor },
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
                {Icon && <Icon className="skill-icon" style={{ color }} aria-hidden="true" />}
                <span className="skill-name">{skill.name}</span>
            </div>
        );
    };

    const renderCategory = (title: string, categorySkills: Skill[], Icon: typeof FiMonitor, key: string) => {
        if (categorySkills.length === 0) return null;

        return (
            <div key={key} className="bg-[var(--bg-section)] border border-[var(--border-muted)] rounded-lg p-4 sm:p-5 md:p-6 shadow-[var(--shadow-surface)]">
                <div className="flex items-center gap-2.5 sm:gap-3 pb-2.5 sm:pb-3 mb-3 sm:mb-4 border-b-2 border-[var(--accent)]">
                    <Icon className="w-5 h-5 text-[var(--accent)] shrink-0" aria-hidden />
                    <h3 className="text-sm sm:text-base font-semibold text-[var(--text-primary)]">{title}</h3>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {categorySkills.map(renderSkillBadge)}
                </div>
            </div>
        );
    };

    return (
        <section
            id="skills"
            ref={sectionRef}
            className="py-16 sm:py-20 md:py-24 mb-8 sm:mb-10 md:mb-12 bg-[var(--bg-section-muted)]"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                >
                    <SectionHeadingWithBar
                        label="Technical Arsenal"
                        title="Skills & Technologies"
                        subtitle="Backend and cloud architecture first, with AI and GenAI tooling where it earns its place."
                        className="mb-8 sm:mb-10 md:mb-12"
                    />
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
                >
                    {CATEGORY_CONFIG.map(({ key, title, Icon }) => {
                        const categorySkills = skills.filter((s) => s.category === key);
                        return renderCategory(title, categorySkills, Icon, key);
                    })}
                </motion.div>
            </div>
        </section>
    );
}
