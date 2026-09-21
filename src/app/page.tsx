import Link from 'next/link';
import { aboutMe, projects, skills, experiences, reviews, homeSnapshotCards, homeAboutBridge } from '@/lib/data';
import HeroSection from '@/components/HeroSection';
import HomeSnapshotSection from '@/components/HomeSnapshotSection';
import SkillsSection from '@/components/SkillsSection';
import ExperienceSection from '@/components/ExperienceSection';
import RecommendationTicker from '@/components/RecommendationTicker';
import FeaturedWorkGrid from '@/components/FeaturedWorkGrid';
import SectionHeadingWithBar from '@/components/SectionHeadingWithBar';
import ContactSection from '@/components/ContactSection';

export default async function Home() {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <div className="overflow-hidden">
      {/* Hero Section - muted bg */}
      <HeroSection aboutMe={aboutMe} />

      {/* Snapshot Section - white bg */}
      <HomeSnapshotSection bridge={homeAboutBridge} cards={homeSnapshotCards} />

      {/* Skills Section - muted bg */}
      <SkillsSection skills={skills} />

      {/* Experience Section - white bg */}
      <ExperienceSection experiences={experiences} />

      {/* Featured Work - muted bg */}
      <section id="projects" className="py-24 mb-12 bg-[var(--bg-section-muted)]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <SectionHeadingWithBar
              label="Portfolio"
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

      {/* Kind Words - muted bg */}
      <RecommendationTicker reviews={reviews} />

      <ContactSection />
    </div>
  );
}
