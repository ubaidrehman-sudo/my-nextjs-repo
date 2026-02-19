import Link from 'next/link';
import { aboutMe, projects, skills, experiences, education, reviews } from '@/lib/data';
import { getAllBlogPosts } from '@/lib/mdx';
import ProjectCard from '@/components/ProjectCard';
import BlogCard from '@/components/BlogCard';
import HeroSection from '@/components/HeroSection';
import SkillsSection from '@/components/SkillsSection';
import ExperienceSection from '@/components/ExperienceSection';
import EducationSection from '@/components/EducationSection';
import RecommendationTicker from '@/components/RecommendationTicker';

export default async function Home() {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 2);
  const recentBlogs = (await getAllBlogPosts()).slice(0, 2);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <HeroSection aboutMe={aboutMe} />

      {/* Skills Section */}
      <SkillsSection skills={skills} />

      {/* Experience Section */}
      <ExperienceSection experiences={experiences} />

      {/* Featured Projects */}
      <section id="projects" className="py-20 border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[var(--foreground)]">Featured Work</h2>
            <Link
              href="/projects"
              className="group flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--border)] bg-[var(--background-elevated)] text-[var(--foreground)] font-medium hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-300"
            >
              View All Projects
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((project, index) => (
              <div
                key={project.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <EducationSection education={education} />

      {/* Recent Blog Posts */}
      <section id="blog" className="py-20 border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[var(--foreground)]">Latest Articles</h2>
            <Link
              href="/blog"
              className="group flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--border)] bg-[var(--background-elevated)] text-[var(--foreground)] font-medium hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-300"
            >
              Read All Articles
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {recentBlogs.map((post, index) => (
              <div
                key={post.slug}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <BlogCard post={post} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommendation Ticker */}
      <RecommendationTicker reviews={reviews} />
    </div>
  );
}
