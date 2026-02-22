'use client';

import { motion } from 'framer-motion';
import { BlogPost } from '@/lib/types';
import BlogCard from './BlogCard';

interface LatestArticlesGridProps {
    posts: BlogPost[];
}

export default function LatestArticlesGrid({ posts }: LatestArticlesGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
                <motion.div
                    key={post.slug}
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
                    <BlogCard post={post} />
                </motion.div>
            ))}
        </div>
    );
}
