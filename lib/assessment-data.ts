// Assessment content for ST1483 v2.0, taken from the Apprenticeship Assessment Plan
// (AAP) research notes compiled 20 Sept 2026. ST1483 is a "new model" standard built
// under Skills England's post-2025 assessment reform: there is no fixed end-point
// gateway, no confirmed Assessment Organisation (AO) yet, and no fixed method table
// the way older standards (e.g. ST1325) have. Keep the confirmed AAP facts below
// clearly separate from the AIM-pattern working assumption — the assumption is
// professional judgement, not something the AAP itself states, and must not be
// presented as settled.

export const ASSESSMENT_REF = 'ST1483 v2.0 AAP';

export type AssessmentStage = {
  number: string;
  title: string;
  duration: string;
  text: string;
};

// Replaces the old "on-programme / gateway / EPA" three-step model: ST1483 removes
// the single end-point gateway window in favour of assessment "at any appropriate
// point" during the programme, and Behaviours are verified separately by the
// employer rather than tested through the K/S assessment methods.
export const assessmentStages: AssessmentStage[] = [
  {
    number: '01',
    title: 'On-programme',
    duration: 'Typically 18 months',
    text: 'You train towards the KSBs and build a portfolio of evidence mapped to the 12 Assessment Outcomes as you go — not in a rush at the end.',
  },
  {
    number: '02',
    title: 'Assessment, at any appropriate point',
    duration: 'Flexible — not a single end-point gateway',
    text: 'ST1483 deliberately drops the old "end-point" framing. Assessment methods can be completed whenever you are ready for them, rather than all bunched into one gateway window.',
  },
  {
    number: '03',
    title: 'Behaviours, verified throughout',
    duration: 'Employer-led, ongoing',
    text: 'B1–B7 are confirmed by your employer as you demonstrate them at work, tracked as a separate strand alongside — not tested through — the Knowledge and Skills assessment methods.',
  },
];

export type ConfirmedMethod = {
  id: string;
  title: string;
  required: boolean;
  text: string;
};

// The AAP's own menu of assessment methods. At least one project is mandatory;
// everything else is drawn from this list at the discretion of whichever
// Assessment Organisation eventually takes on ST1483. This is the confirmed
// menu, not a prediction of which items will be used.
export const confirmedMethods: ConfirmedMethod[] = [
  { id: 'project', title: 'Project', required: true, text: 'At least one project must be part of the assessment for every apprentice, whichever option.' },
  { id: 'discussion', title: 'Professional discussion', required: false, text: 'A structured two-way conversation with an assessor, typically underpinned by a portfolio of evidence.' },
  { id: 'portfolio', title: 'Portfolio', required: false, text: 'A body of evidence built up during the programme, usually used to underpin another method rather than graded alone.' },
  { id: 'qa', title: 'Question and answer', required: false, text: 'A structured set of questions probing knowledge and understanding.' },
  { id: 'presentation', title: 'Presentation', required: false, text: 'A prepared presentation on a piece of work, typically followed by questioning.' },
  { id: 'additional-projects', title: 'Additional projects', required: false, text: 'Further project-based evidence beyond the mandatory first project, where the AO judges it necessary to cover the Assessment Outcomes in full.' },
];

export type WorkingAssumption = {
  heading: string;
  status: string;
  paragraphs: string[];
};

// Reviewed from AIM Assessment's own "Apprenticeship Assessment Stakeholder
// Proposal Form" for ST1483 v2.0 (21 Sept 2026). Every substantive row in that
// document is marked "all stakeholders agree" — but the QAD reviewer and
// specialist developer fields are still blank, and no Assessment Organisation is
// yet formally registered against ST1483, so treat this as AIM's settled
// proposal, not yet a formally confirmed spec. This replaces an earlier guess
// (drawn from AIM's pattern on sibling standards, which predicted a project plus
// a professional discussion) that turned out not to match what AIM actually
// proposed for this standard — see ST1483-production-manager-research.md §6/§8.
export const workingAssumption: WorkingAssumption = {
  heading: "AIM's proposal — largely agreed, not yet formally registered",
  status: 'No Assessment Organisation is currently registered against ST1483. Starts are not possible until one is in place.',
  paragraphs: [
    'AIM propose three linked methods, not the two-method "project plus professional discussion" pattern used on their sibling standards. A mandatory Project (a report written up over 5 weeks) and a Portfolio (compiled digitally throughout the programme) are each independently graded and contribute 50% of the overall grade. A 60-minute online Question & Answer, split into two fixed 30-minute halves, plugs any gaps left in the project report and the portfolio respectively — a structured, gap-filling Q&A, not an open professional discussion.',
    '100% of assessment is marked directly by AIM, with no training-provider marking, and around 70% of the grading criteria are synoptic — combining Knowledge and Skills together rather than testing them in isolation. Each method is graded Fail, Pass or Distinction; all pass criteria are needed for a pass, all pass and distinction criteria for a distinction.',
    'Readiness requires at least 6 months in learning and a signed Apprentice Assessment Readiness Declaration. For retake purposes specifically, an apprentice needs at least 2 completed production-management projects, each capable on its own of covering all of the project method’s grading criteria.',
  ],
};

// The AAP's own six performance-descriptor categories (Pass and Distinction apply
// across all 12 Assessment Outcomes). Full descriptor wording sits in the AAP PDF
// and has deliberately not been paraphrased here — pull it in verbatim when the
// grading detail is needed rather than reproducing a loose summary.
export const performanceDescriptorCategories: string[] = [
  'Applied Knowledge',
  'Applied Skills',
  'Regulatory and Procedural Awareness',
  'Communication and Collaboration',
  'Information Use and Decision Making',
  'Responsibility and Autonomy',
];

export const gradingNote =
  'Grading is Pass / Distinction, applied per method and combined into an overall grade — no separate numeric weighting table appears in the AAP, which is simpler than the older EPA-gateway format used by standards such as ST0525 or ST0792. Exactly how a Fail is handled, and how two method grades combine, is set by the Assessment Organisation’s own assessment strategy once one is confirmed for ST1483.';
