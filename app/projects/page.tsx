import type { Metadata } from 'next';
import { PageHero } from '@/components/page-hero';
import { ProjectsBrowser } from '@/components/projects-browser';

export const metadata: Metadata = {
  title: 'Projects | Production Manager Level 6',
  description:
    'The core pieces of work and option-specific project shelf for the Level 6 Creative Industries Production Manager apprenticeship — screen & audio, post production and live arts.',
};

export default function ProjectsPage() {
  return (
    <main>
      <PageHero
        className="projects-hero"
        eyebrow="THE PRODUCTION JOURNEY"
        title="Projects"
        copy={<>One piece of work per core module, produced after its training days. Then a shelf of option-specific briefs — pulled whenever real production work matches, in any order, for as long as the programme runs.</>}
        meta={<>3 CORE PIECES OF WORK &middot; 3 OPTION SHELVES</>}
      />
      <ProjectsBrowser />
    </main>
  );
}
