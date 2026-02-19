// Minimal dummy data for the portfolio
import { AboutMe, Project, Skill, Experience, Education, Review, Tool } from './types';

export const aboutMe: AboutMe = {
    name: 'John Doe',
    title: 'Full Stack Developer',
    bio: 'Passionate developer with expertise in building modern web applications. I love creating elegant solutions to complex problems and continuously learning new technologies.',
    email: 'john.doe@example.com',
    location: 'San Francisco, CA',
    social: {
        github: 'https://github.com/johndoe',
        linkedin: 'https://linkedin.com/in/johndoe',
        twitter: 'https://twitter.com/johndoe',
    },
};

export const projects: Project[] = [
    {
        id: '1',
        title: 'E-Commerce Platform',
        description: 'A full-featured e-commerce platform with payment integration, inventory management, and admin dashboard.',
        technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Stripe'],
        github: 'https://github.com/johndoe/ecommerce',
        link: 'https://ecommerce-demo.com',
        featured: true,
        role: 'Lead Full Stack Developer',
        problemStatement: 'The client needed a scalable solution to handle thousands of concurrent users during flash sales while maintaining sub-second page load times and real-time inventory updates.',
        priority: 1,
        hasPreview: true,
        image: '/images/projects/ecommerce.jpg' // Placeholder, will rely on hybrid approach if missing
    },
    {
        id: '2',
        title: 'Task Management App',
        description: 'Real-time collaborative task management application with team features and notifications.',
        technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
        github: 'https://github.com/johndoe/taskapp',
        featured: true,
        role: 'Frontend Architect',
        problemStatement: 'Remote teams struggled with staying in sync. The goal was to create a fluid, real-time collaboration space that feels instant and keeps everyone aligned without manual refreshes.',
        priority: 2,
        hasPreview: false
    },
    {
        id: '3',
        title: 'Weather Dashboard',
        description: 'Beautiful weather dashboard with forecasts, maps, and historical data visualization.',
        technologies: ['Vue.js', 'D3.js', 'OpenWeather API'],
        github: 'https://github.com/johndoe/weather',
        link: 'https://weather-demo.com',
        featured: false,
        role: 'UI/UX Developer',
        problemStatement: 'Weather data is often cluttered. I wanted to build a minimal, data-first interface that visualizes complex meteorological data in an intuitive way.',
        priority: 3,
        hasPreview: true
    },
];

export const skills: Skill[] = [
    // Frontend
    { id: '1', name: 'React', category: 'frontend', proficiency: 95 },
    { id: '2', name: 'Next.js', category: 'frontend', proficiency: 90 },
    { id: '3', name: 'TypeScript', category: 'frontend', proficiency: 92 },
    { id: '4', name: 'JavaScript', category: 'frontend', proficiency: 95 },
    { id: '5', name: 'Tailwind CSS', category: 'frontend', proficiency: 95 },
    { id: '6', name: 'Framer Motion', category: 'frontend', proficiency: 85 },
    { id: '7', name: 'HTML5/CSS3', category: 'frontend', proficiency: 98 },
    { id: '8', name: 'Redux', category: 'frontend', proficiency: 88 },
    { id: '9', name: 'GraphQL', category: 'frontend', proficiency: 82 },
    { id: '10', name: 'Vue.js', category: 'frontend', proficiency: 80 },

    // Backend
    { id: '11', name: 'Node.js', category: 'backend', proficiency: 90 },
    { id: '12', name: 'Express', category: 'backend', proficiency: 88 },
    { id: '13', name: 'NestJS', category: 'backend', proficiency: 85 },
    { id: '14', name: 'Python', category: 'backend', proficiency: 82 },
    { id: '15', name: 'Prisma', category: 'backend', proficiency: 85 },
    { id: '16', name: 'Socket.io', category: 'backend', proficiency: 80 },

    // Database
    { id: '17', name: 'PostgreSQL', category: 'database', proficiency: 85 },
    { id: '18', name: 'MongoDB', category: 'database', proficiency: 88 },
    { id: '19', name: 'Redis', category: 'database', proficiency: 78 },
    { id: '20', name: 'MySQL', category: 'database', proficiency: 80 },
    { id: '21', name: 'Firebase', category: 'database', proficiency: 82 },

    // Cloud & DevOps
    { id: '22', name: 'AWS', category: 'cloud', proficiency: 75 },
    { id: '23', name: 'Docker', category: 'cloud', proficiency: 80 },
    { id: '24', name: 'Kubernetes', category: 'cloud', proficiency: 70 },
    { id: '25', name: 'Vercel', category: 'cloud', proficiency: 90 },
    { id: '26', name: 'Nginx', category: 'cloud', proficiency: 75 },
    { id: '27', name: 'CI/CD', category: 'cloud', proficiency: 82 },

    // Tools & Testing
    { id: '28', name: 'Git', category: 'tools', proficiency: 95 },
    { id: '29', name: 'Jest', category: 'tools', proficiency: 85 },
    { id: '30', name: 'Vitest', category: 'tools', proficiency: 82 },
    { id: '31', name: 'Cypress', category: 'tools', proficiency: 78 },
    { id: '32', name: 'Figma', category: 'tools', proficiency: 88 },
    { id: '33', name: 'Postman', category: 'tools', proficiency: 90 },
];

export const experiences: Experience[] = [
    {
        id: '1',
        title: 'Senior Full Stack Developer',
        company: 'Tech Corp',
        location: 'San Francisco, CA',
        startDate: '2022-01',
        description: [
            'Architected and deployed a microservices-based platform serving 100K+ daily active users.',
            'Led a team of 5 developers, establishing code quality standards and CI/CD pipelines.',
            'Reduced server costs by 40% through serverless optimization and database caching strategies.',
        ],
        technologies: ['React', 'Next.js', 'Node.js', 'AWS', 'PostgreSQL'],
    },
    {
        id: '2',
        title: 'Full Stack Developer',
        company: 'StartupXYZ',
        location: 'Remote',
        startDate: '2020-03',
        endDate: '2021-12',
        description: [
            'Developed key features for an e-commerce platform including real-time inventory and payment processing.',
            'Collaborated with UX designers to implement responsive, accessible, and high-performance interfaces.',
            'Migrated legacy monorepo to a modular architecture, improving build times by 60%.',
        ],
        technologies: ['Vue.js', 'Express', 'MongoDB', 'Redis', 'Docker'],
    },
];

export const education: Education[] = [
    {
        id: '1',
        type: 'education',
        degree: 'Bachelor of Science in Computer Science',
        institution: 'University of Technology',
        location: 'California, USA',
        startDate: '2016-09',
        endDate: '2020-05',
        description: 'Specialized in Distributed Systems and Artificial Intelligence. Graduated with Honors.',
    },
    {
        id: '2',
        type: 'certification',
        degree: 'AWS Certified Solutions Architect',
        institution: 'Amazon Web Services',
        location: 'Online',
        startDate: '2021-06',
        endDate: '2021-06',
    },
];

export const reviews: Review[] = [
    {
        id: '1',
        name: 'Sarah Chen',
        role: 'Product Manager',
        company: 'Tech Corp',
        content: 'John is one of those rare developers who truly understands the product vision. He doesn\'t just write code; he builds solutions that delight users.',
    },
    {
        id: '2',
        name: 'Mike Johnson',
        role: 'CTO',
        company: 'StartupXYZ',
        content: 'Technical excellence aside, John\'s ability to communicate complex concepts to stakeholders is outstanding. A true asset to any engineering team.',
    },
    {
        id: '3',
        name: 'Emily Davis',
        role: 'Senior Designer',
        company: 'Creative Studio',
        content: 'I love working with John! He has a keen eye for design details and always pushes for the best possible user experience. Pixel-perfect implementation every time.',
    },
    {
        id: '4',
        name: 'David Wilson',
        role: 'Engineering Lead',
        company: 'Innovate Inc',
        content: 'John writes clean, maintainable code and is always eager to help others. His knowledge of modern frontend architecture helped us scale our app significantly.',
    },
];

export const tools: Tool[] = [
    { id: '1', name: 'VS Code', category: 'IDE' },
    { id: '2', name: 'Figma', category: 'Design' },
    { id: '3', name: 'Postman', category: 'Testing' },
    { id: '4', name: 'Notion', category: 'Productivity' },
    { id: '5', name: 'Docker', category: 'DevOps' },
    { id: '6', name: 'Git', category: 'Version Control' },
];
