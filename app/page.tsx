import { Hero } from '@/components/hero';
import { ApprenticeshipOverview } from '@/components/apprenticeship-overview';
import { CursorField } from '@/components/cursor-field';
import { FrameCounter } from '@/components/frame-counter';
import { ProgrammeOverview } from '@/components/programme-overview';

export default function Home() {
  return (
    <main>
      <Hero />
      <ApprenticeshipOverview />
      <ProgrammeOverview />
      <CursorField />
      <FrameCounter />
    </main>
  );
}
