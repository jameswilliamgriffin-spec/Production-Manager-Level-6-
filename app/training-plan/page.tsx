import type { Metadata } from 'next';
import { PageHero } from '@/components/page-hero';
import { TrainingPlanBrowser } from '@/components/training-plan-browser';
import { PLAN_TOTAL_HOURS, PROGRAMME_LENGTH } from '@/lib/training-plan-data';

export const metadata: Metadata = {
  title: 'Training Plan | Production Manager Level 6',
  description:
    'The Level 6 Creative Industries Production Manager training plan — a minimum of 466 hours of off-the-job training across induction, core knowledge sessions, option-specific teaching, coaching, and portfolio and project work.',
};

export default function TrainingPlanPage() {
  return (
    <main>
      <PageHero
        eyebrow="THE LEARNING JOURNEY"
        title="Training Plan"
        copy={
          <>
            The plan sets out how your off-the-job training is made up across the apprenticeship — the
            induction days, the taught knowledge sessions, option-specific teaching, coaching, and portfolio
            and project work. It opens on the overview; expand a section for the detail. Only the induction
            block and the overall hours minimum are confirmed so far — the rest is still being scoped.
          </>
        }
        meta={`${PLAN_TOTAL_HOURS}+ OFF-THE-JOB HOURS (MINIMUM) · ${PROGRAMME_LENGTH}`}
      />
      <TrainingPlanBrowser />
    </main>
  );
}
