'use client';

import { motion } from 'framer-motion';
import { Project } from '@/lib/types';
import ProjectCard from './ProjectCard';

interface FeaturedWorkGridProps {
    projects: Project[];
}

export default function FeaturedWorkGrid({ projects }: FeaturedWorkGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {projects.map((project, index) => (
                <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{
                        duration: 0.5,
                        delay: index * 0.1,
                        ease: [0.4, 0, 0.2, 1],
                    }}
                    className="min-w-0"
                >
                    <ProjectCard project={project} />
                </motion.div>
            ))}
        </div>
    );
}
