import { coreModules } from '@/lib/programme-overview-data';

// Training days are charged at the same 5 hours/day rate as Creative Alliance's
// generic induction days (section A below) — the only day-rate precedent on this
// site. Not confirmed for these specific modules; revisit once actual delivery
// timings are set.
const HOURS_PER_TRAINING_DAY = 5;
const daysInModule = (duration: string) => parseInt(duration, 10) || 0;

export type PlanItem = {
  label: string;
  /** off-the-job hours attributed to this line */
  hours: number;
};

export type PlanSection = {
  /** single-letter key used in the overview and as the accordion id */
  key: string;
  title: string;
  /** one line shown when the section is expanded */
  blurb: string;
  items: PlanItem[];
};

// ST1483 v2.0's own key-information table sets a minimum of 466 off-the-job
// hours over a typical 18-month programme — both figures are confirmed from the
// occupational standard itself. The section-by-section breakdown below is not:
// only "Core induction training" is filled in, reused as-is from Creative
// Alliance's generic cross-programme induction (the same three days every
// apprentice completes, whatever their standard). Everything else is a
// placeholder until the core teaching, pathway-specific teaching and project
// hours are scoped — see ST1483-production-manager-research.md §4 and §7.
export const PLAN_TOTAL_HOURS = 466;
export const PROGRAMME_LENGTH = '18 months';

export const planSections: PlanSection[] = [
  {
    key: 'A',
    title: 'Core induction training',
    blurb:
      'The three induction days every Creative Alliance apprentice completes, whatever their programme.',
    items: [
      { label: 'Day 1 — Introduction to your apprenticeship', hours: 5 },
      { label: 'Day 2 — Prevent and safeguarding', hours: 5 },
      { label: 'Day 3 — Information, advice and guidance, and off-the-job learning', hours: 5 },
    ],
  },
  {
    key: 'B',
    title: 'Core modules',
    blurb: 'The three core modules, taken in any order, each ending in a piece of work.',
    items: coreModules.map((module) => ({
      label: `${module.month} — ${module.name} (${module.duration})`,
      hours: daysInModule(module.duration) * HOURS_PER_TRAINING_DAY,
    })),
  },
  {
    key: 'C',
    title: 'Option-specific teaching',
    blurb:
      'Taught content specific to each of the three options (screen & audio, post production, live arts), delivered after the shared core. Content in progress.',
    items: [],
  },
  {
    key: 'D',
    title: 'Portfolio and project work',
    blurb:
      'The introductory project, a bank of workplace projects, and the option-specific capstone. Content in progress.',
    items: [],
  },
  {
    key: 'E',
    title: 'Coaching and independent development',
    blurb: 'Structured time with your development coach, plus self-directed research and skills practice. Content in progress.',
    items: [],
  },
];

export const sectionHours = (section: PlanSection) =>
  section.items.reduce((sum, item) => sum + item.hours, 0);

export const planTotalHours = () =>
  planSections.reduce((sum, section) => sum + sectionHours(section), 0);

// Progress reviews are tracked and delivered, but are not off-the-job training,
// so they are shown alongside the plan rather than inside the total. Cadence not
// yet confirmed for this programme.
export const progressReviews = {
  title: 'Progress reviews',
  count: 0,
  hoursEach: 0,
  detail:
    'Cadence not yet confirmed for this programme. Reviews will be delivered in addition to the hours above and will not count toward the off-the-job total.',
};
