import { IconType } from 'react-icons';
import {
    SiNextdotjs,
    SiReact,
    SiTypescript,
    SiTailwindcss,
    SiFramer,
    SiHtml5,
    SiCss3,
    SiRedux,
    SiGraphql,
    SiNodedotjs,
    SiPostgresql,
    SiMongodb,
    SiDocker,
    SiAmazon,
    SiGit,
    SiRedis,
    SiPrisma,
    SiJest,
    SiJavascript,
    SiPython,
    SiExpress,
    SiNestjs,
    SiSocketdotio,
    SiVercel,
    SiGithub,
    SiFigma,
    SiPostman,
    SiNotion,
    SiWebpack,
    SiVite,
    SiBabel,
    SiEslint,
    SiPrettier,
    SiNginx,
    SiKubernetes,
    SiJenkins,
    SiGitlab,
    SiLinux,
    SiUbuntu,
    SiMysql,
    SiFirebase,
    SiSupabase,
    SiStripe,
    SiCloudflare,
    SiNetlify,
    SiHeroku,
    SiDigitalocean,
    SiTrello,
    SiSlack,
    SiDiscord,
    SiZoom,
    SiConfluence,
    SiJira,
    SiAsana,
    SiMiro,
    SiCanva,
    SiAdobephotoshop,
    SiAdobeillustrator,
    SiAdobexd,
    SiSketch,
    SiInvision,
    SiStorybook,
    SiCypress,
    SiVitest,
    SiTestinglibrary,
    SiSass,
    SiLess,
    SiStyledcomponents,
    SiChakraui,
    SiMui,
    SiAntdesign,
    SiBootstrap,
    SiVuedotjs,
    SiAngular,
    SiSvelte,
    SiNuxtdotjs,
    SiGatsby,
    SiRemix,
    SiAstro,
    SiSolid,
    SiQwik,
    SiElectron,
    SiFlutter,
    SiSwift,
    SiKotlin,
    SiAndroid,
    SiIos,
    SiApple,
    SiMacos,
    SiFirefox,
    SiSafari,
    SiOpera,
    SiBrave,
    SiGo,
    SiApachekafka,
    SiAmazondynamodb,
    SiGooglecloud,
    SiTerraform,
    SiDatadog,
    SiGrafana,
    SiLangchain,
    SiOpenai,
    SiAnthropic,
    SiFastapi,
} from 'react-icons/si';
import { FiCpu, FiDatabase, FiServer, FiLayers } from 'react-icons/fi';

/**
 * Skill Icon Mapping System
 * 
 * CONVENTION FOR ADDING NEW SKILLS:
 * 1. Import the brand icon from 'react-icons/si' (Simple Icons) for official technologies
 * 2. Add the skill name → icon mapping to skillIconMap below
 * 3. Add the brand's official color to skillColors (find official colors on brand sites or brandcolors.net)
 * 4. If no official brand icon exists, use a category fallback from 'react-icons/fi' (Feather Icons):
 *    - FiCpu for general computing/languages
 *    - FiDatabase for data storage
 *    - FiServer for backend/infrastructure
 *    - FiCloud for cloud services
 *    - FiTool for development tools
 * 
 * NAMING:
 * - Use exact names as they appear in data.ts skills array
 * - Match official brand capitalization (e.g., "Next.js" not "NextJS", "GraphQL" not "Graphql")
 * 
 * MISSING_ICON_FALLBACK:
 * - The getSkillIcon() helper returns null if no match is found
 * - SkillsSection component should handle null gracefully or use category fallback
 */

// Mapping of skill names to their corresponding icons
export const skillIconMap: Record<string, IconType> = {
    // Frontend Frameworks & Libraries
    'Next.js': SiNextdotjs,
    'React': SiReact,
    'Vue.js': SiVuedotjs,
    'Angular': SiAngular,
    'Svelte': SiSvelte,
    'Nuxt.js': SiNuxtdotjs,
    'Gatsby': SiGatsby,
    'Remix': SiRemix,
    'Astro': SiAstro,
    'Solid': SiSolid,
    'Qwik': SiQwik,

    // Languages
    'TypeScript': SiTypescript,
    'JavaScript': SiJavascript,
    'Python': SiPython,
    'Java': FiCpu,
    'Go': SiGo,
    'FastAPI': SiFastapi,

    // Styling
    'Tailwind CSS': SiTailwindcss,
    'CSS3': SiCss3,
    'HTML5': SiHtml5,
    'HTML5/CSS3': SiHtml5,
    'Sass': SiSass,
    'SCSS': SiSass,
    'Less': SiLess,
    'Styled Components': SiStyledcomponents,

    // UI Libraries
    'Chakra UI': SiChakraui,
    'Material UI': SiMui,
    'MUI': SiMui,
    'Ant Design': SiAntdesign,
    'Bootstrap': SiBootstrap,

    // Animation
    'Framer Motion': SiFramer,

    // State Management
    'Redux': SiRedux,
    'GraphQL': SiGraphql,

    // Backend
    'Node.js': SiNodedotjs,
    'Express': SiExpress,
    'Express.js': SiExpress,
    'NestJS': SiNestjs,
    'Nest.js': SiNestjs,
    'Socket.io': SiSocketdotio,
    'Kafka': SiApachekafka,
    'BullMQ': FiLayers,
    'gRPC': FiServer,

    // Databases
    'PostgreSQL': SiPostgresql,
    'MongoDB': SiMongodb,
    'Redis': SiRedis,
    'MySQL': SiMysql,
    'Prisma': SiPrisma,
    'Firebase': SiFirebase,
    'Supabase': SiSupabase,
    'DynamoDB': SiAmazondynamodb,
    'BigQuery': SiGooglecloud,

    // DevOps & Tools
    'Docker': SiDocker,
    'Kubernetes': SiKubernetes,
    'AWS': SiAmazon,
    'AWS Bedrock': SiAmazon,
    'GCP': SiGooglecloud,
    'Terraform': SiTerraform,
    'Vercel': SiVercel,
    'Netlify': SiNetlify,
    'Heroku': SiHeroku,
    'DigitalOcean': SiDigitalocean,
    'Cloudflare': SiCloudflare,
    'Nginx': SiNginx,
    'Datadog': SiDatadog,
    'ArgoCD': FiServer,
    'Grafana': SiGrafana,

    // Version Control & CI/CD
    'Git': SiGit,
    'GitHub': SiGithub,
    'GitLab': SiGitlab,
    'Jenkins': SiJenkins,
    'CI/CD': SiGithub,
    'GitHub Actions': SiGithub,

    // Testing
    'Jest': SiJest,
    'Vitest': SiVitest,
    'Cypress': SiCypress,
    'Testing Library': SiTestinglibrary,

    // Build Tools
    'Webpack': SiWebpack,
    'Vite': SiVite,
    'Babel': SiBabel,
    'ESLint': SiEslint,
    'Prettier': SiPrettier,

    // Design & Collaboration
    'Figma': SiFigma,
    'Adobe Photoshop': SiAdobephotoshop,
    'Adobe Illustrator': SiAdobeillustrator,
    'Adobe XD': SiAdobexd,
    'Sketch': SiSketch,
    'InVision': SiInvision,
    'Canva': SiCanva,
    'Miro': SiMiro,

    // Productivity

    'Postman': SiPostman,
    'Notion': SiNotion,
    'Trello': SiTrello,
    'Jira': SiJira,
    'Asana': SiAsana,
    'Confluence': SiConfluence,
    'Slack': SiSlack,
    'Discord': SiDiscord,
    'Zoom': SiZoom,

    // Mobile
    'Flutter': SiFlutter,
    'Swift': SiSwift,
    'Kotlin': SiKotlin,
    'Android': SiAndroid,
    'iOS': SiIos,

    // OS
    'Linux': SiLinux,
    'Ubuntu': SiUbuntu,
    'macOS': SiMacos,
    'Apple': SiApple,

    // Browsers
    'Firefox': SiFirefox,
    'Safari': SiSafari,
    'Opera': SiOpera,
    'Brave': SiBrave,

    // Other
    'Storybook': SiStorybook,
    'Electron': SiElectron,
    'Stripe': SiStripe,

    // AI & GenAI
    'LangChain': SiLangchain,
    'OpenAI API': SiOpenai,
    'Anthropic Claude': SiAnthropic,
    'Anthropic API': SiAnthropic,
    'RAG Pipelines': FiCpu,
    'Vector DBs (Pinecone)': FiDatabase,
    'Prompt Engineering': FiCpu,
};

// Brand colors for each technology (official brand colors)
export const skillColors: Record<string, string> = {
    'Next.js': '#000000',
    'React': '#61DAFB',
    'Vue.js': '#4FC08D',
    'Angular': '#DD0031',
    'Svelte': '#FF3E00',
    'TypeScript': '#3178C6',
    'JavaScript': '#F7DF1E',
    'Python': '#3776AB',
    'Java': '#007396',
    'Go': '#00ADD8',
    'FastAPI': '#009688',
    'Tailwind CSS': '#06B6D4',
    'CSS3': '#1572B6',
    'HTML5': '#E34F26',
    'Sass': '#CC6699',
    'Framer Motion': '#0055FF',
    'Redux': '#764ABC',
    'GraphQL': '#E10098',
    'Node.js': '#339933',
    'Express': '#000000',
    'NestJS': '#E0234E',
    'Socket.io': '#010101',
    'Kafka': '#231F20',
    'BullMQ': '#DC382D',
    'gRPC': '#244C5A',
    'PostgreSQL': '#4169E1',
    'MongoDB': '#47A248',
    'Redis': '#DC382D',
    'MySQL': '#4479A1',
    'Prisma': '#2D3748',
    'Firebase': '#FFCA28',
    'Supabase': '#3ECF8E',
    'DynamoDB': '#4053D6',
    'BigQuery': '#669DF6',
    'Docker': '#2496ED',
    'Kubernetes': '#326CE5',
    'AWS': '#FF9900',
    'GCP': '#4285F4',
    'Terraform': '#7B42BC',
    'Vercel': '#000000',
    'Git': '#F05032',
    'GitHub': '#181717',
    'Jest': '#C21325',
    'Vitest': '#6E9F18',
    'Cypress': '#17202C',
    'Figma': '#F24E1E',
    'VS Code': '#007ACC',
    'Postman': '#FF6C37',
    'Notion': '#000000',
    'Stripe': '#008CDD',
    'Material UI': '#007FFF',
    'Chakra UI': '#319795',
    'Bootstrap': '#7952B3',
    'Webpack': '#8DD6F9',
    'Vite': '#646CFF',
    'ESLint': '#4B32C3',
    'Prettier': '#F7B93E',
    'Storybook': '#FF4785',
    'React Native': '#61DAFB',
    'Flutter': '#02569B',
    'Electron': '#47848F',
    'Datadog': '#632CA6',
    'ArgoCD': '#EF7B4D',
    'Grafana': '#F46800',
    'LangChain': '#1C3C3C',
    'OpenAI API': '#412991',
    'Anthropic Claude': '#D97757',
    'Anthropic API': '#D97757',
    'Vector DBs (Pinecone)': '#000000',
};

// Helper function to get icon for a skill
export const getSkillIcon = (skillName: string): IconType | null => {
    return skillIconMap[skillName] || null;
};

// Helper function to get color for a skill
export const getSkillColor = (skillName: string): string => {
    return skillColors[skillName] || '#06b6d4'; // Default to cyan if not found
};
