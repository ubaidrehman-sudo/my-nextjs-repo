// Core data types for the portfolio

/** Facets used by the /projects filter chips */
export type ProjectTag = 'ai' | 'multi-tenant' | 'regulated';

/** One headline number on a case-study page. Only real, sourced figures. */
export interface ProjectStat {
    value: string;
    label: string;
}

export interface Project {
    slug: string;
    title: string;
    description: string;
    domain?: string;
    role?: string;
    year?: number;
    technologies: string[];
    tools?: string[];
    link?: string;
    /** Button text for `link`; defaults to "View Live Site". Use it when the link is the client's product site, not a demo. */
    linkLabel?: string;
    github?: string;
    image?: string;
    featured: boolean;
    longDescription?: string;
    problemStatement?: string;
    contributions?: string[];
    highlights?: string[];
    outcome?: string;
    architecture?: string[];
    /** Filter-chip facets on /projects */
    tags?: ProjectTag[];
    /** Up to 3 headline numbers shown as tiles under the cover image */
    stats?: ProjectStat[];
    /** What the AI does in this system, and where it deliberately does not */
    aiApproach?: string;
    priority?: number;
    hasPreview?: boolean;
}

export interface Skill {
    id: string;
    name: string;
    category: 'frontend' | 'backend' | 'database' | 'cloud' | 'ai' | 'tools' | 'other';
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
    /** Hero badge above name, e.g. "Open for collaborations" */
    status?: string;
    /** Tagline headline, e.g. "Building digital products with" */
    tagline?: string;
    /** Word to accent in tagline, e.g. "purpose." */
    taglineAccentWord?: string;
    /** Structured bio fields for emphasis (C2) */
    bioLead?: string;
    bioEmphasis?: string;
    bioRest?: string;
    /** Extended story for About page (I1) */
    story?: string[];
    /** Remote/global work framing (I2) */
    workStyle?: string;
    /** Core values or principles (I3) */
    values?: string[];
    /** Personal interests (I3) */
    interests?: string[];
}

/** One proof point in the hero stat strip */
export interface HeroStat {
    value: string;
    label: string;
}

/** One pillar in the home "Architecture, with AI where it counts" section */
export interface ArchitecturePillar {
    id: string;
    iconKey: 'resilience' | 'ai' | 'delivery';
    label: string;
    title: string;
    description: string;
}

/** Home page teaser block above snapshot cards (links to full About story) */
export interface HomeAboutBridge {
    label: string;
    title: string;
    subtitle?: string;
    intro: string;
    aboutLinkText: string;
}

export interface ContactChannel {
    id: string;
    type: 'email' | 'linkedin' | 'twitter' | 'github';
    label: string;
    value: string;
    href: string;
    description?: string;
}

export interface ContactFAQ {
    id: string;
    question: string;
    answer: string;
}
