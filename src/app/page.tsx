import Link from 'next/link';
import { aboutMe, projects, skills, experiences, reviews } from '@/lib/data';
import { getAllBlogPosts } from '@/lib/mdx';
import HeroSection from '@/components/HeroSection';
import SkillsSection from '@/components/SkillsSection';
import ExperienceSection from '@/components/ExperienceSection';
import RecommendationTicker from '@/components/RecommendationTicker';
import FeaturedWorkGrid from '@/components/FeaturedWorkGrid';
import LatestArticlesGrid from '@/components/LatestArticlesGrid';
import SectionHeadingWithBar from '@/components/SectionHeadingWithBar';

export default async function Home() {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 2);
  const recentBlogs = (await getAllBlogPosts()).slice(0, 3);

  return (
    <div className="overflow-hidden">
      {/* Hero Section - muted bg */}
      <HeroSection aboutMe={aboutMe} />

      {/* Skills Section - white bg */}
      <SkillsSection skills={skills} />

      {/* Experience Section - muted bg */}
      <ExperienceSection experiences={experiences} />

      {/* Featured Work - white bg (1-0-1-0 rhythm) */}
      <section id="projects" className="py-24 mb-12 bg-[var(--bg-section)]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <SectionHeadingWithBar
              title="Featured Work"
              subtitle="Selected projects and case studies"
            />
            <Link
              href="/projects"
              className="btn-secondary group inline-flex items-center gap-2 px-5 py-2.5"
            >
              View All Projects
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <FeaturedWorkGrid projects={featuredProjects} />
        </div>
      </section>

      {/* Recent Articles - muted bg (1-0-1-0 rhythm) */}
      <section id="blog" className="py-24 mb-12 bg-[var(--bg-section-muted)]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <SectionHeadingWithBar
              title="Latest Articles"
              subtitle="Thoughts on architecture and development"
            />
            <Link
              href="/blog"
              className="btn-secondary group inline-flex items-center gap-2 px-5 py-2.5"
            >
              Read All Articles
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <LatestArticlesGrid posts={recentBlogs} />
        </div>
      </section>

      {/* Kind Words - white bg (1-0-1-0 rhythm) */}
      <RecommendationTicker reviews={reviews} />
    </div>
  );
}
