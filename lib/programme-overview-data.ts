// Content for the homepage "Programme overview" section. Core module content
// (titles, training-day breakdown, piece of work) supplied directly for the
// build — not the placeholder summaries from ST1483-production-manager-research.md
// §9, which this supersedes for display purposes (the KSB mapping in §9 still
// holds; only the presented copy has changed). Option-specific work is still
// sourced from §10, agreed in principle 21 Sept 2026.
//
// Delivery months follow the working "once a year, evenly spaced" calendar
// discussed but not yet formally confirmed: Module 1 = February (the one fixed
// point agreed so far), Module 2 = June, Module 3 = October.

export type TrainingDay = {
  day: string;
  focus: string;
  topics: string[];
};

export type PathwayPieceTitle = {
  optionId: 'screen-audio' | 'post' | 'live-arts';
  title: string;
};

export type CoreModule = {
  id: string;
  month: string;
  duration: string;
  name: string;
  summary: string;
  trainingDays: TrainingDay[];
  pieceOfWorkTitle: string;
  pieceOfWorkDescription: string;
  /** The same underlying deliverable, named the way each option's own industry
   *  would actually call it — not a separate brief, just its real-world name. */
  pathwayPieceTitles: PathwayPieceTitle[];
  image: string;
  imageAlt: string;
};

export const coreModules: CoreModule[] = [
  {
    id: 'planning-resourcing',
    month: 'February',
    duration: '2 days',
    name: 'Production and Planning: Keys to Success',
    summary: 'This module looks at the management of productions in live events and screen & audio productions. The objective is to give learners an understanding of high-level production techniques and theories and how to apply them — mapping out a production from brief to budget.',
    trainingDays: [
      {
        day: 'Day 1',
        focus: 'Foundational learning around production understanding',
        topics: [
          'Production theories — critical path, production triangle, theory of constraints, systems theory',
          'Mapping out a production — creative brief analysis, resources needed, scheduling',
          'Budgeting',
        ],
      },
      {
        day: 'Day 2',
        focus: 'Deep dive into logistical planning of productions',
        topics: [
          'Analysis of resources and potential issues',
          'Supplier selection and management',
          'Developing a logistics plan',
          'Planning for disruptions',
        ],
      },
    ],
    pieceOfWorkTitle: 'The Production Plan',
    pieceOfWorkDescription: 'A production management plan — schedule, budget, a procurement decision, a risk register, and a logistics plan if the production spans multiple locations.',
    pathwayPieceTitles: [
      { optionId: 'screen-audio', title: 'The Shooting Schedule' },
      { optionId: 'post', title: 'The Post Schedule' },
      { optionId: 'live-arts', title: 'The Production Book' },
    ],
    image: '/images/training-seminar.webp',
    imageAlt: 'A seminar-style training session with a group around a table',
  },
  {
    id: 'legal-regulatory-sustainable',
    month: 'June',
    duration: '2 days',
    name: 'Legal, Sustainable, Regulatory & Ethical Productions',
    summary: 'This module covers the legal, regulatory, ethical and sustainability requirements every production manager needs to know — from contracts, copyright and safeguarding through to health & safety and sustainable production practice.',
    trainingDays: [
      {
        day: 'Day 1',
        focus: 'Legal, sustainable, regulatory and ethical productions',
        topics: [
          'Legal and regulatory — employee/freelancer/contractor differences, employment rights, ownership of creative work, insurance, managing teams and schedules',
          'Copyright and intellectual property — ownership from script to final product, releases, usage and fees, AI and uncertain ownership',
          'Safeguarding and GDPR compliance — responsibilities to employees, contributors, children and animals, management of data and footage',
        ],
      },
      {
        day: 'Day 2',
        focus: 'Health, safety and sustainability',
        topics: [
          'Health and safety — legal responsibility, managing risk, briefing the crew, welfare and working hours',
          'Sustainability — Albert, Theatre Green Book, Purple Guide, using sustainability for pitches and grants',
        ],
      },
    ],
    pieceOfWorkTitle: 'Compliance & Sustainability Audit',
    pieceOfWorkDescription: 'A compliance and sustainability audit of a real or recent production, using a recognised industry tool — Albert Calculator, Theatre Green Book or Purple Guide, as appropriate.',
    pathwayPieceTitles: [
      { optionId: 'screen-audio', title: 'The Albert Audit' },
      { optionId: 'post', title: 'The Post Compliance Audit' },
      { optionId: 'live-arts', title: 'The Green Book Audit' },
    ],
    image: '/images/training-portfolio-review.webp',
    imageAlt: 'Reviewing a portfolio of evidence documents at a desk',
  },
  {
    id: 'leadership-stakeholders',
    month: 'October',
    duration: '1 day',
    name: 'Understanding Your Role as a Leader',
    summary: 'Leading a team is one of the most difficult elements of a role to get right, but a fully productive team is essential to a successful project. This module looks at techniques and theories to better understand your team and how to motivate them.',
    trainingDays: [
      {
        day: 'Day 1',
        focus: 'Leadership as a concept',
        topics: [
          'Organisational culture and how it influences management',
          'Your role and its place in the hierarchy — on stage, on shoot, in studio',
          'Stakeholder mapping',
          'Theories of leadership, applied to real, pressurised situations',
          'Managing conflict and ensuring resolution',
        ],
      },
    ],
    pieceOfWorkTitle: 'Leadership & Team Briefing',
    pieceOfWorkDescription: 'An organisational and team-structure briefing — vision and culture and their effect on the PM role, team and department structure and interdependencies, and engagement, motivation and conflict strategies.',
    pathwayPieceTitles: [
      { optionId: 'screen-audio', title: 'The Crew Briefing' },
      { optionId: 'post', title: 'The Studio Briefing' },
      { optionId: 'live-arts', title: 'The Company Briefing' },
    ],
    image: '/images/training-121-coaching.webp',
    imageAlt: 'A development coach and learner in a one-to-one coaching session',
  },
];

export type OptionBrief = {
  title: string;
  trigger: string;
  isFlexible?: boolean;
};

export type OptionWork = {
  id: 'screen-audio' | 'post' | 'live-arts';
  name: string;
  briefs: OptionBrief[];
  flexName: string;
  flexDescription: string;
};

// §10 — a shelf of situation-triggered briefs per option, pulled whenever real
// work matches, in any order. Synoptic K+S together, unlike the core modules
// above. Each option's fifth slot is deliberately not called a "wildcard" — it's
// named from real terminology in that world.
export const optionWork: OptionWork[] = [
  {
    id: 'screen-audio',
    name: 'Screen & audio',
    briefs: [
      { title: 'Plan and coordinate a production workflow', trigger: 'Pulled whenever the learner is planning or scheduling content and agreeing timelines and responsibilities across departments.' },
      { title: 'Manage a financial or compliance risk', trigger: 'Pulled whenever the learner is handling a real financial, rights-clearance or compliance issue on a live production.' },
      { title: 'Source and manage production or post-production resources', trigger: 'Pulled whenever the learner is resourcing a shoot or post job cost- and time-effectively.' },
      { title: 'Deliver to a technical, brand or international standard', trigger: 'Pulled whenever the learner is navigating delivery standards, brand or franchise requirements, international versioning, or an AI-related production decision.' },
    ],
    flexName: 'As Directed',
    flexDescription: 'Standard call-sheet and contract language for work assigned at the point of need rather than pre-scheduled.',
  },
  {
    id: 'post',
    name: 'Post production',
    briefs: [
      { title: 'Develop or maintain a post-production project plan', trigger: 'Pulled whenever the learner is building or maintaining a project plan that balances client objectives against internal targets, coordinating live-action and CG workflow.' },
      { title: 'Make a resourcing decision using post-production tools', trigger: 'Pulled whenever the learner is using project management tools or databases to allocate resources or make a project-critical call.' },
      { title: 'Resolve or escalate a technical issue', trigger: 'Pulled whenever the learner is liaising with edit support or technical specialists on a fault, workaround or upgrade, and checking deliverables meet spec.' },
      { title: 'Manage a client or vendor relationship', trigger: "Pulled whenever the learner is managing coordinators or logistics, preparing cost reports or invoices, or protecting the studio's reputation with a client or vendor." },
    ],
    flexName: 'Change Order',
    flexDescription: 'The real post and VFX-facility term for work requested outside the originally agreed scope.',
  },
  {
    id: 'live-arts',
    name: 'Live arts',
    briefs: [
      { title: "Interpret a live production's technical designs", trigger: 'Pulled whenever the learner is analysing technical drawings, scale models or 3D visualisations, and working out how technical departments contribute and interact.' },
      { title: 'Coordinate and chair a live production meeting', trigger: 'Pulled whenever the learner is scheduling or chairing a production meeting — white cards, model box sharing, a toolbox talk, a notes session, a debrief — across creative, producing, technical and contractor stakeholders.' },
      { title: 'Survey a venue or plan touring logistics', trigger: 'Pulled whenever the learner is conducting a technical venue survey or planning touring logistics — riders, carnets, manifests — applying H&S and CDM licensing requirements.' },
      { title: 'Manage scenic materials and delivery', trigger: 'Pulled whenever the learner is working a scenery or staging materials decision, or producing and implementing a production schedule across build, fit-up and technical rehearsal.' },
    ],
    flexName: 'On the Day',
    flexDescription: 'Theatre and events shorthand for what comes up reactively during build, fit-up or tech week, as opposed to what was planned in advance.',
  },
];
