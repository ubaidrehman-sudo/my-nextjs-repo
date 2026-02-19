// Core data types for the portfolio

export interface Project {
    id: string;
    title: string;
    description: string;
    technologies: string[];
    link?: string;
    github?: string;
    image?: string;
    featured: boolean;
    longDescription?: string;
    highlights?: string[];
    role?: string;
    problemStatement?: string;
    priority?: number; // Lower number = higher priority in listing
    hasPreview?: boolean; // Whether the link has social preview
}

export interface Skill {
    id: string;
    name: string;
    category: 'frontend' | 'backend' | 'database' | 'cloud' | 'tools' | 'other';
    proficiency: number; // 0-100
}

export interface Experience {
    id: string;
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate?: string; // undefined means current
    description: string[];
    technologies: string[];
}

export interface Education {
    id: string;
    degree: string;
    institution: string;
    location: string;
    startDate: string;
    endDate: string;
    description?: string;
    type: 'education' | 'certification';
}

export interface Review {
    id: string;
    name: string;
    role: string;
    company: string;
    content: string;
    image?: string;
}

export interface Tool {
    id: string;
    name: string;
    category: string;
    icon?: string;
}

export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    tags: string[];
    image?: string;
    coverImage?: string;
    readingTime?: string;
    content?: string;
    author?: string;
    category?: string;
    priority?: number; // Lower number = higher priority in listing
}

export interface AboutMe {
    name: string;
    title: string;
    bio: string;
    email: string;
    location: string;
    avatar?: string;
    social: {
        github?: string;
        linkedin?: string;
        twitter?: string;
    };
}
