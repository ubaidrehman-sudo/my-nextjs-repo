'use client';

import { Skill } from '@/lib/types';
import { motion } from 'framer-motion';
import { getSkillIcon, getSkillColor } from '@/lib/skillIcons';

interface SkillsSectionProps {
    skills: Skill[];
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
    // Group skills by category
    const frontendSkills = skills.filter(s => s.category === 'frontend');
    const backendSkills = skills.filter(s => s.category === 'backend');
    const databaseSkills = skills.filter(s => s.category === 'database');
    const cloudSkills = skills.filter(s => s.category === 'cloud');
    const toolsSkills = skills.filter(s => s.category === 'tools');

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring" as const,
                stiffness: 100,
                damping: 15
            }
        }
    };

    const renderSkillBadge = (skill: Skill) => {
        const Icon = getSkillIcon(skill.name);
        const brandColor = getSkillColor(skill.name);

        // Convert hex to RGB for CSS variables
        const hexToRgb = (hex: string) => {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result
                ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
                : '20, 184, 166';
        };

        return (
            <div
                key={skill.id}
                className="skill-badge group"
                style={{
                    '--skill-color': brandColor,
                    '--skill-color-rgb': hexToRgb(brandColor)
                } as React.CSSProperties}
            >
                {/* Icon */}
                {Icon && (
                    <Icon
                        className="skill-icon"
                        style={{ color: brandColor }}
                    />
                )}

                {/* Skill Name */}
                <span className="skill-name">{skill.name}</span>

                {/* Shimmer Effect */}
                <div className="skill-shimmer"></div>
            </div>
        );
    };

    const renderCategory = (title: string, categorySkills: Skill[], gradient: string, icon: string) => {
        if (categorySkills.length === 0) return null;

        return (
            <div className="mb-12">
                {/* Category Header with Gradient */}
                <div className="flex items-center gap-4 mb-6">
                    <div
                        className="flex items-center gap-3 px-4 py-2 rounded-full"
                        style={{
                            background: gradient,
                            boxShadow: '0 4px 12px rgba(20, 184, 166, 0.15)'
                        }}
                    >
                        <span className="text-2xl">{icon}</span>
                        <h3 className="text-lg font-bold text-white">
                            {title}
                        </h3>
                    </div>
                    <span className="h-px bg-gradient-to-r from-[var(--border)] to-transparent flex-grow"></span>
                </div>

                {/* Skills Grid */}
                <div className="flex flex-wrap gap-3">
                    {categorySkills.map(renderSkillBadge)}
                </div>
            </div>
        );
    };

    return (
        <section id="skills" className="py-20 border-b border-[var(--border)] relative overflow-hidden">
            {/* Background Gradient Orbs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-teal-200/30 to-cyan-200/30 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl -z-10"></div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        className="inline-flex flex-col items-center gap-4"
                    >
                        {/* Decorative Line */}
                        <div className="flex items-center gap-3">
                            <span className="h-1 w-12 rounded-full bg-gradient-to-r from-transparent via-teal-500 to-transparent"></span>
                            <span className="px-4 py-1 rounded-full text-sm font-medium text-teal-600 bg-teal-50 border border-teal-200">
                                Tech Stack
                            </span>
                            <span className="h-1 w-12 rounded-full bg-gradient-to-r from-transparent via-teal-500 to-transparent"></span>
                        </div>

                        {/* Main Title with Gradient */}
                        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
                            Skills & Technologies
                        </h2>

                        {/* Subtitle */}
                        <p className="text-[var(--foreground-muted)] max-w-2xl">
                            A comprehensive toolkit for building modern, scalable, and performant applications
                        </p>
                    </motion.div>
                </div>

                {/* Skills Categories */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
                    {/* Frontend */}
                    {renderCategory(
                        'Frontend Development',
                        frontendSkills,
                        'linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)',
                        '🎨'
                    )}

                    {/* Backend */}
                    {renderCategory(
                        'Backend Development',
                        backendSkills,
                        'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
                        '⚙️'
                    )}

                    {/* Database */}
                    {renderCategory(
                        'Database & Storage',
                        databaseSkills,
                        'linear-gradient(135deg, #f97316 0%, #fb923c 100%)',
                        '🗄️'
                    )}

                    {/* Cloud & DevOps */}
                    {renderCategory(
                        'Cloud & DevOps',
                        cloudSkills,
                        'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)',
                        '☁️'
                    )}

                    {/* Tools & Testing */}
                    {renderCategory(
                        'Tools & Testing',
                        toolsSkills,
                        'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
                        '🛠️'
                    )}
                </div>
            </div>
        </section>
    );
}
