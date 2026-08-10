// Minimal dummy data for the portfolio
import { AboutMe, Project, Skill, Experience, Education, Review, Tool, SnapshotCard, ContactChannel, ContactFAQ, HomeAboutBridge } from './types';

export const aboutMe: AboutMe = {
    name: 'John Doe',
    title: 'Senior Solution Architect',
    bio: 'I design and deliver enterprise-grade distributed systems. From cloud-native architectures to platform modernization, I turn complex technical challenges into resilient, scalable solutions.',
    email: 'john.doe@example.com',
    location: 'San Francisco, CA',
    social: {
        github: 'https://github.com/johndoe',
        linkedin: 'https://linkedin.com/in/johndoe',
        twitter: 'https://twitter.com/johndoe',
    },
    status: 'Available for engagements',
    tagline: 'Architecting systems that',
    taglineAccentWord: 'scale.',
    bioLead: 'I design and deliver',
    bioEmphasis: 'enterprise-grade distributed systems.',
    bioRest: 'From cloud-native architectures to platform modernization, I turn complex technical challenges into resilient, scalable solutions.',
    story: [
        'I started my career building high-throughput financial systems at Stripe, where I learned that great architecture isn\'t about the latest framework—it\'s about understanding trade-offs, planning for failure, and designing systems that teams can actually maintain.',
        'Over the past 12 years, I\'ve worked across startups and Fortune 500 companies, always focused on the same challenge: how do we build systems that scale reliably while keeping teams productive? I\'ve led migrations from monoliths to microservices, designed event-driven platforms processing millions of events per day, and helped engineering teams adopt modern cloud-native patterns without disrupting their business.',
        'What drives me is the intersection of technical depth and business impact. I believe the best architectures emerge from deep collaboration with product, engineering, and leadership—not from ivory tower design docs. I bring both the technical expertise to design complex distributed systems and the communication skills to build consensus around them.',
    ],
    workStyle: 'Remote-first and globally distributed. I collaborate with teams across time zones, from San Francisco to Sydney to London.',
    values: [
        'Simplicity over cleverness',
        'Pragmatic trade-offs',
        'Systems thinking',
        'Continuous learning',
    ],
    interests: [
        'Distributed systems',
        'Event-driven architecture',
        'Developer experience',
        'Technical writing',
        'Mentorship',
        'Open source',
    ],
};

export const homeAboutBridge: HomeAboutBridge = {
    label: 'Who I am',
    title: 'Engineer behind the code',
    subtitle: 'Context before we dive into tools, work history, and projects',
    intro:
        'I care about trade-offs, failure modes, and systems teams can run in production—not slide-deck architecture. Here is a quick snapshot; the longer arc lives on my About page.',
    aboutLinkText: 'Read my story',
};

export const homeSnapshotCards: SnapshotCard[] = [
    {
        id: '1',
        iconKey: 'experience',
        label: 'Experience',
        value: '12+ Years',
        caption: 'Enterprise architecture across fintech, SaaS, and data platforms at Stripe, Atlassian, and Accenture',
    },
    {
        id: '2',
        iconKey: 'projects',
        label: 'Projects Delivered',
        value: '40+',
        caption: 'End-to-end architecture for Fortune 500 clients — from cloud-native migrations to real-time data pipelines',
    },
    {
        id: '3',
        iconKey: 'education',
        label: 'Specialization',
        value: 'Cloud & Distributed Systems',
        caption: 'AWS & GCP certified. M.S. Computer Science, Stanford. Focused on scalable, resilient architecture.',
    },
];

export const projects: Project[] = [
    {
        slug: 'enterprise-event-driven-platform',
        title: 'Enterprise Event-Driven Platform',
        description: 'Designed a cloud-native, event-driven architecture handling 2M+ events/day for a Fortune 500 financial services client.',
        domain: 'FinTech',
        role: 'Lead Solution Architect',
        year: 2023,
        technologies: ['AWS', 'Kafka', 'Kubernetes', 'TypeScript', 'Terraform', 'PostgreSQL'],
        tools: ['Confluent Cloud', 'OpenTelemetry', 'Grafana', 'PagerDuty', 'ArgoCD'],
        featured: true,
        problemStatement: 'The client\'s monolithic platform couldn\'t scale for real-time transaction processing. Latency spikes during peak hours caused SLA violations and revenue loss.',
        longDescription: 'Led the decomposition of a legacy monolith into 18 bounded-context microservices communicating via Apache Kafka. Designed CQRS and event sourcing patterns for audit-critical financial workflows, enabling full auditability and replay capability across all transaction types.',
        contributions: [
            'Mapped domain boundaries using Event Storming workshops with stakeholders',
            'Designed event-driven architecture with Kafka, Schema Registry, and dead-letter queues',
            'Implemented blue-green deployments on EKS with zero-downtime releases',
            'Established observability stack with OpenTelemetry, Grafana, and PagerDuty',
            'Defined architecture governance standards adopted by 8 delivery teams',
        ],
        highlights: ['99.99% uptime SLA', 'Sub-50ms P95 latency', '2M+ events/day', 'Zero-downtime deployments'],
        outcome: 'Eliminated SLA breaches entirely within 3 months of go-live. The platform now handles 3× peak-season load with no manual intervention, saving the client an estimated $4M/year in penalties and support costs.',
        architecture: [
            'CQRS + event sourcing for all audit-critical financial workflows',
            'Schema Registry with backward/forward compatibility enforcement',
            'Exactly-once delivery guarantees via Kafka transactions and idempotent consumers',
            'Circuit-breaker and bulkhead patterns on all downstream service calls',
        ],
        priority: 1,
        hasPreview: false,
        image: '/images/projects/ecommerce.jpg',
        link: 'https://example.com/event-platform',
    },
    {
        slug: 'multi-tenant-saas-migration',
        title: 'Multi-Tenant SaaS Migration',
        description: 'Architected the migration of a legacy on-premise HR platform to a multi-tenant cloud-native SaaS product serving 200+ enterprise clients.',
        domain: 'Enterprise SaaS',
        role: 'Principal Architect',
        year: 2022,
        technologies: ['Azure', 'Node.js', 'React', 'PostgreSQL', 'Redis', 'Docker'],
        tools: ['Azure DevOps', 'Terraform', 'Vault', 'LaunchDarkly'],
        featured: true,
        problemStatement: 'A 15-year-old on-premise HR platform needed to become a modern SaaS product without disrupting 200+ existing enterprise customers or their compliance requirements.',
        longDescription: 'Designed and led the multi-phase migration of a monolithic HR application to a fully multi-tenant SaaS architecture on Azure. The project spanned 18 months and involved coordinating across 5 engineering squads with zero customer-facing downtime.',
        contributions: [
            'Designed tenant isolation strategy using schema-per-tenant with shared compute',
            'Built a feature-flag-driven migration path for zero-disruption cutover',
            'Implemented OAuth2/OIDC federation for enterprise SSO requirements',
            'Authored the data residency and compliance framework for EU and APAC regions',
        ],
        highlights: ['200+ tenants migrated', 'SOC 2 Type II compliant', '60% infrastructure cost reduction'],
        outcome: 'All 200+ enterprise tenants migrated with zero data loss. Infrastructure costs fell by 60% within 6 months. The platform achieved SOC 2 Type II certification, unblocking $12M in new enterprise deals.',
        architecture: [
            'Schema-per-tenant isolation with shared connection pooling via PgBouncer',
            'Row-level security policies as a second isolation layer for defence-in-depth',
            'Async job queue (Bull + Redis) for tenant-scoped background workloads',
            'Feature flags (LaunchDarkly) controlling per-tenant capability rollout',
        ],
        priority: 2,
        hasPreview: false,
        link: 'https://example.com/saas-platform',
    },
    {
        slug: 'real-time-analytics-pipeline',
        title: 'Real-Time Analytics Pipeline',
        description: 'Built a streaming analytics platform processing clickstream and telemetry data for product intelligence across 50M+ monthly active users.',
        domain: 'Data Engineering',
        role: 'Data Architecture Lead',
        year: 2024,
        technologies: ['GCP', 'Apache Flink', 'BigQuery', 'Python', 'Dataflow', 'dbt'],
        tools: ['Looker', 'Airflow', 'Great Expectations', 'dbt Cloud'],
        featured: true,
        problemStatement: 'Product teams relied on batch-processed dashboards with 24-hour lag. Leadership needed real-time insights to make data-driven decisions during feature rollouts.',
        longDescription: 'Designed a hybrid lambda architecture combining Apache Flink streaming with a dbt + BigQuery batch layer. Introduced a self-serve analytics framework that reduced time-to-insight for product teams from days to under a minute.',
        contributions: [
            'Designed lambda architecture with streaming (Flink) and batch (dbt + BigQuery) layers',
            'Implemented CDC pipelines from operational databases to the analytics warehouse',
            'Built self-serve dashboard framework reducing time-to-insight from days to minutes',
            'Introduced data quality contracts using Great Expectations, blocking bad data at ingestion',
        ],
        highlights: ['50M+ MAU processed', 'Sub-second latency', 'Real-time dashboards', '99.9% pipeline uptime'],
        outcome: 'Product teams now run experiments and read results in real time. Feature rollout decisions that previously took 48 hours of analyst work now complete in under 2 minutes, accelerating the release cadence by 3×.',
        architecture: [
            'Lambda architecture: streaming (Flink on Dataflow) + batch (dbt + BigQuery) with unified query layer',
            'CDC pipelines using Debezium to capture operational DB changes with sub-second latency',
            'Data quality gate at ingestion using Great Expectations; failing records routed to quarantine',
            'Partitioned BigQuery tables with clustering on user_id for sub-second analytical queries at scale',
        ],
        priority: 3,
        hasPreview: false,
        link: 'https://example.com/analytics-platform',
    },
];

export const skills: Skill[] = [
    // Frontend
    { id: '1', name: 'React', category: 'frontend', proficiency: 90 },
    { id: '2', name: 'Next.js', category: 'frontend', proficiency: 88 },
    { id: '3', name: 'TypeScript', category: 'frontend', proficiency: 95 },
    { id: '4', name: 'GraphQL', category: 'frontend', proficiency: 88 },

    // Backend
    { id: '11', name: 'Node.js', category: 'backend', proficiency: 92 },
    { id: '12', name: 'Java', category: 'backend', proficiency: 85 },
    { id: '13', name: 'Go', category: 'backend', proficiency: 80 },
    { id: '14', name: 'Python', category: 'backend', proficiency: 85 },
    { id: '15', name: 'Kafka', category: 'backend', proficiency: 90 },
    { id: '16', name: 'gRPC', category: 'backend', proficiency: 82 },

    // Database
    { id: '17', name: 'PostgreSQL', category: 'database', proficiency: 95 },
    { id: '18', name: 'MongoDB', category: 'database', proficiency: 85 },
    { id: '19', name: 'Redis', category: 'database', proficiency: 90 },
    { id: '20', name: 'DynamoDB', category: 'database', proficiency: 85 },
    { id: '21', name: 'BigQuery', category: 'database', proficiency: 82 },

    // Cloud & DevOps
    { id: '22', name: 'AWS', category: 'cloud', proficiency: 95 },
    { id: '23', name: 'Docker', category: 'cloud', proficiency: 92 },
    { id: '24', name: 'Kubernetes', category: 'cloud', proficiency: 90 },
    { id: '25', name: 'Terraform', category: 'cloud', proficiency: 88 },
    { id: '26', name: 'GCP', category: 'cloud', proficiency: 82 },
    { id: '27', name: 'CI/CD', category: 'cloud', proficiency: 90 },

    // Tools & Practices
    { id: '28', name: 'Git', category: 'tools', proficiency: 95 },
    { id: '29', name: 'Datadog', category: 'tools', proficiency: 85 },
    { id: '30', name: 'ArgoCD', category: 'tools', proficiency: 80 },
    { id: '31', name: 'Grafana', category: 'tools', proficiency: 85 },
];

export const experiences: Experience[] = [
    {
        id: '1',
        title: 'Senior Solution Architect',
        company: 'Accenture',
        location: 'San Francisco, CA',
        startDate: '2021-01',
        description: [
            'Lead architecture for cloud-native transformations across Fortune 500 clients in financial services and healthcare.',
            'Designed event-driven microservice architectures handling 2M+ events/day with 99.99% uptime SLAs.',
            'Established architecture governance frameworks adopted by 8 delivery teams across 3 geographies.',
            'Reduced infrastructure costs by 60% through right-sizing, spot instance strategies, and serverless adoption.',
        ],
        technologies: ['AWS', 'Kubernetes', 'Kafka', 'Terraform', 'TypeScript', 'PostgreSQL'],
    },
    {
        id: '2',
        title: 'Principal Engineer',
        company: 'Atlassian',
        location: 'Sydney, Australia (Remote)',
        startDate: '2018-06',
        endDate: '2020-12',
        description: [
            'Owned technical strategy for the platform team, driving the migration from monolith to microservices.',
            'Designed multi-tenant data isolation patterns supporting 200K+ teams on a shared infrastructure.',
            'Mentored 12 senior engineers and led architecture review boards for cross-team initiatives.',
        ],
        technologies: ['Java', 'React', 'AWS', 'DynamoDB', 'GraphQL', 'Docker'],
    },
    {
        id: '3',
        title: 'Staff Software Engineer',
        company: 'Stripe',
        location: 'San Francisco, CA',
        startDate: '2015-03',
        endDate: '2018-05',
        description: [
            'Built high-throughput payment processing pipelines handling $10B+ in annual transaction volume.',
            'Designed idempotency and exactly-once delivery patterns for mission-critical financial workflows.',
            'Led the API platform team, defining standards adopted across 40+ internal services.',
        ],
        technologies: ['Ruby', 'Go', 'PostgreSQL', 'Redis', 'Kafka', 'Kubernetes'],
    },
];

export const education: Education[] = [
    {
        id: '1',
        type: 'education',
        degree: 'Master of Science in Computer Science',
        institution: 'Stanford University',
        location: 'California, USA',
        startDate: '2011-09',
        endDate: '2013-06',
        description: 'Specialized in Distributed Systems and Database Internals. Research focus on consensus algorithms.',
    },
    {
        id: '2',
        type: 'education',
        degree: 'Bachelor of Science in Computer Engineering',
        institution: 'University of Michigan',
        location: 'Ann Arbor, MI',
        startDate: '2007-09',
        endDate: '2011-05',
        description: 'Dean\'s List. Senior thesis on fault-tolerant distributed storage systems.',
    },
    {
        id: '3',
        type: 'certification',
        degree: 'AWS Certified Solutions Architect — Professional',
        institution: 'Amazon Web Services',
        location: 'Online',
        startDate: '2022-03',
        endDate: '2022-03',
    },
    {
        id: '4',
        type: 'certification',
        degree: 'Google Cloud Professional Cloud Architect',
        institution: 'Google Cloud',
        location: 'Online',
        startDate: '2023-01',
        endDate: '2023-01',
    },
];

export const reviews: Review[] = [
    {
        id: '1',
        name: 'Sarah Chen',
        role: 'VP of Engineering',
        company: 'Accenture',
        content: 'John is the architect you want on your most critical programs. He sees the full picture — from business constraints to operational reality — and designs systems that actually work at scale.',
    },
    {
        id: '2',
        name: 'Mike Johnson',
        role: 'CTO',
        company: 'Series B Fintech',
        content: 'We brought John in to untangle our architecture before a major funding round. He mapped our entire system, identified the bottlenecks, and delivered a migration plan that we executed with zero downtime.',
    },
    {
        id: '3',
        name: 'Priya Patel',
        role: 'Director of Platform',
        company: 'Atlassian',
        content: 'John\'s ability to bridge the gap between engineering teams and business stakeholders is rare. He doesn\'t just design technically sound systems — he builds consensus around them.',
    },
    {
        id: '4',
        name: 'David Wilson',
        role: 'Engineering Manager',
        company: 'Stripe',
        content: 'John set the standard for our API platform. His architecture decisions from three years ago still hold up today, which tells you everything about how thoughtfully he approaches system design.',
    },
];

export const tools: Tool[] = [
    { id: '1', name: 'IntelliJ IDEA', category: 'IDE' },
    { id: '2', name: 'VS Code', category: 'IDE' },
    { id: '3', name: 'Miro', category: 'Architecture' },
    { id: '4', name: 'Confluence', category: 'Documentation' },
    { id: '5', name: 'Docker', category: 'DevOps' },
    { id: '6', name: 'Git', category: 'Version Control' },
];

export const contactChannels: ContactChannel[] = [
    {
        id: '1',
        type: 'email',
        label: 'Email',
        value: aboutMe.email,
        href: `mailto:${aboutMe.email}`,
        description: 'For consulting inquiries, architecture reviews, or collaboration opportunities',
    },
    {
        id: '2',
        type: 'linkedin',
        label: 'LinkedIn',
        value: 'linkedin.com/in/johndoe',
        href: aboutMe.social.linkedin || '',
        description: 'Connect professionally and see my career timeline',
    },
];

export const contactFAQ: ContactFAQ[] = [
    {
        id: '1',
        question: 'What type of projects do you take on?',
        answer: 'I focus on enterprise architecture consulting, cloud-native transformations, and system design for scaling challenges. Ideal engagements involve distributed systems, event-driven architectures, or platform modernization.',
    },
    {
        id: '2',
        question: 'What is your typical engagement model?',
        answer: 'I work as a fractional architect or technical advisor, typically 10-20 hours per week for 3-6 months. I can also provide short-term architecture reviews and design sprints.',
    },
    {
        id: '3',
        question: 'Do you work with startups or only enterprises?',
        answer: 'Both! I love helping startups architect for scale before it becomes a crisis, and I bring enterprise-grade patterns to companies ready to mature their systems.',
    },
    {
        id: '4',
        question: 'How quickly do you typically respond?',
        answer: 'I aim to respond to inquiries within 24-48 hours. For active engagements, I maintain regular communication cadences aligned with your team\'s sprint cycles.',
    },
];
