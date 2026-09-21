import type { Metadata } from 'next';
import { PageHero } from '@/components/page-hero';
import { TrainingBrowser } from '@/components/training-browser';

export const metadata: Metadata = {
  title: 'Training | Production Manager Level 6',
  description:
    'The three core training modules for the Level 6 Creative Industries Production Manager apprenticeship — taken in any order, each with its own day-by-day breakdown.',
};

export default function TrainingPage() {
  return (
    <main>
      <PageHero
        eyebrow="ON-PROGRAMME DEVELOPMENT"
        title="Training"
        copy={<>Three core modules, taken in any order depending on when you join. Each runs across one or two taught days and sets up the piece of work that follows it.</>}
        meta={<>3 MODULES &middot; 5 TRAINING DAYS &middot; ANY ORDER</>}
      />
      <TrainingBrowser />
    </main>
  );
}
