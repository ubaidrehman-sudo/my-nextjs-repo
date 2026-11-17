import Link from 'next/link';
import { aboutMe, projects, skills, experiences, reviews, heroStats, architecturePillars, homeAboutBridge } from '@/lib/data';
import HeroSection from '@/components/HeroSection';
import ArchitectureAISection from '@/components/ArchitectureAISection';
import SkillsSection from '@/components/SkillsSection';
import ExperienceSection from '@/components/ExperienceSection';
import RecommendationTicker from '@/components/RecommendationTicker';
import FeaturedWorkGrid from '@/components/FeaturedWorkGrid';
import SectionHeadingWithBar from '@/components/SectionHeadingWithBar';
import ContactSection from '@/components/ContactSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default async function Home() {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <div className="overflow-hidden">
      {/* Hero Section - muted bg */}
      <HeroSection aboutMe={aboutMe} stats={heroStats} />

      {/* Architecture + AI Section - white bg */}
      <ArchitectureAISection bridge={homeAboutBridge} pillars={architecturePillars} />

      {/* Skills Section - muted bg */}
      <SkillsSection skills={skills} />

      {/* Experience Section - white bg */}
      <ExperienceSection experiences={experiences} />

      {/* Featured Work - muted bg */}
      <section id="projects" className="py-16 sm:py-24 mb-8 sm:mb-12 bg-[var(--bg-section-muted)]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-8 sm:mb-12">
            <SectionHeadingWithBar
              label="Portfolio"
              title="Featured Work"
              subtitle="Selected projects and case studies"
            />
            <Link
              href="/projects"
              className="btn-secondary group inline-flex items-center gap-2 px-5 py-2.5 self-start sm:self-auto"
            >
              View All Projects
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <FeaturedWorkGrid projects={featuredProjects} />
        </div>
      </section>

      {/* Kind Words - muted bg */}
      <RecommendationTicker reviews={reviews} />

      <ContactSection />
    </div>
  );
}
