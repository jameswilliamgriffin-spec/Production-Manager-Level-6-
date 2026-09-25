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
  /** Core Knowledge KSBs this piece of work evidences — see research notes §9. */
  ksbIds: string[];
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
    pieceOfWorkDescription: 'To analyse an upcoming production or a previous production. Deep dive into how the organisation processes all elements of the production; scheduling, communication, budget, procurement, legal and health and safety, logistics and multiple locations. From this analysis suggest improvements or changes, backed up by academic theories and evidence you have collected.',
    pathwayPieceTitles: [
      { optionId: 'screen-audio', title: 'The Shooting Schedule' },
      { optionId: 'post', title: 'The Post Schedule' },
      { optionId: 'live-arts', title: 'The Production Book' },
    ],
    ksbIds: ['K1', 'K7', 'K8', 'K10'],
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
    pieceOfWorkDescription: 'A compliance and sustainability audit of a real or recent production, using a recognised industry tools to ensure you are meeting the expected standard eg Albert Calculator, Theatre Green Book or Purple Guide, as appropriate.',
    pathwayPieceTitles: [
      { optionId: 'screen-audio', title: 'The Albert Audit' },
      { optionId: 'post', title: 'The Post Compliance Audit' },
      { optionId: 'live-arts', title: 'The Green Book Audit' },
    ],
    ksbIds: ['K5', 'K6', 'K9'],
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
    pieceOfWorkTitle: 'Who you are as a leader',
    pieceOfWorkDescription: 'Build a manifesto for you to establish your understanding of who you want to be as a leader in reference to your organisation. Develop a working learning contract to establish your goals as a leader and then put forward a plan using academic leadership theories on why you want to do this and how this will benefit you, your role and your team. Then conclude on how it is going to impact your organisation.',
    pathwayPieceTitles: [
      { optionId: 'screen-audio', title: 'The Crew Briefing' },
      { optionId: 'post', title: 'The Studio Briefing' },
      { optionId: 'live-arts', title: 'The Company Briefing' },
    ],
    ksbIds: ['K2', 'K3', 'K4'],
    image: '/images/training-121-coaching.webp',
    imageAlt: 'A development coach and learner in a one-to-one coaching session',
  },
];

export type OptionBrief = {
  title: string;
  /** What the piece of work actually is — shown on the projects page. */
  summary: string;
  /** The real-workplace situation that triggers picking this brief up —
   *  shown on the homepage overview. */
  trigger: string;
  /** KSBs this brief evidences — see research notes §10. */
  ksbIds: string[];
  isFlexible?: boolean;
};

export type OptionWork = {
  id: 'screen-audio' | 'post' | 'live-arts';
  name: string;
  briefs: OptionBrief[];
  flexName: string;
  flexDescription: string;
  /** The core Skills deferred from §9's knowledge-only module pieces of work —
   *  evidenced as real workplace instances rather than a constructed document,
   *  so they live here rather than against any single named brief. Same list
   *  in every option: these are core-scope, not pathway-specific. */
  flexKsbIds: string[];
};

const deferredCoreSkillIds = ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9', 'S10'];

// §10 — a shelf of situation-triggered briefs per option, pulled whenever real
// work matches, in any order. Synoptic K+S together, unlike the core modules
// above. Each option's fifth slot is deliberately not called a "wildcard" — it's
// named from real terminology in that world.
export const optionWork: OptionWork[] = [
  {
    id: 'screen-audio',
    name: 'Screen & audio',
    briefs: [
      { title: 'Plan and coordinate workflow', summary: 'Push your skills and deepen your understanding of managing a production workflow — evidencing and building on scheduling, logistics and crew management across multiple departments. Practise production techniques in depth, giving you a solid foundation of knowledge and skill in one of the core parts of the role.', trigger: 'Pulled whenever the learner is planning or scheduling content and agreeing timelines and responsibilities across departments.', ksbIds: ['K11', 'K12', 'K13', 'S11', 'S12'] },
      { title: 'Manage a financial or compliance risk', summary: 'Every production carries financial and legal risk, and as a production manager you need to understand exactly where your responsibilities sit. Learn how your organisation manages its budgets, and build a deep understanding of its policies and procedures so you can shape how your team stays compliant.', trigger: 'Pulled whenever the learner is handling a real financial, rights-clearance or compliance issue on a live production.', ksbIds: ['K14', 'K15', 'S13', 'S14'] },
      { title: 'Source and manage production or post-production resources', summary: 'Build a deep network of suppliers, crew and resources you can call on. Learn how to store, update and put a strong professional network to work — sourcing what a production needs, cost- and time-effectively.', trigger: 'Pulled whenever the learner is resourcing a shoot or post job cost- and time-effectively.', ksbIds: ['K16', 'S15'] },
      { title: 'Deliver to a technical, brand or international standard', summary: 'When delivering your production, you’ll need to evidence a strong understanding of delivery and broadcast standards, client management and brand requirements — making sure what goes out the door is exactly what was asked for.', trigger: 'Pulled whenever the learner is navigating delivery standards, brand or franchise requirements, international versioning, or an AI-related production decision.', ksbIds: ['K17', 'K18', 'K19', 'S16'] },
    ],
    flexName: 'As Directed',
    flexDescription: 'Standard call-sheet and contract language for work assigned at the point of need rather than pre-scheduled — used here to pick up whatever KSBs haven’t yet been evidenced by the four briefs above, so nothing is left outstanding by the end of the programme.',
    flexKsbIds: deferredCoreSkillIds,
  },
  {
    id: 'post',
    name: 'Post production',
    briefs: [
      { title: 'Develop or maintain a post-production project plan', summary: 'Take ownership of a live project plan for a live-action or CG job, balancing what the client wants against the internal targets that keep the studio healthy. Build your understanding of how every department feeds into the pipeline, and develop the coordination skills that keep a complex post schedule on track.', trigger: 'Pulled whenever the learner is building or maintaining a project plan that balances client objectives against internal targets, coordinating live-action and CG workflow.', ksbIds: ['K11', 'K20', 'K21', 'S11', 'S12'] },
      { title: 'Make a resourcing decision using post-production tools', summary: 'Get hands-on with the project management tools and databases your studio relies on, and make a real, project-critical resourcing call. Build the confidence to justify what you allocate, why, and how you checked it against the brief.', trigger: 'Pulled whenever the learner is using project management tools or databases to allocate resources or make a project-critical call.', ksbIds: ['K22', 'S17'] },
      { title: 'Resolve or escalate a technical issue', summary: 'Sharpen your troubleshooting instincts on a real technical fault, workaround or upgrade. Learn how to raise it with edit support or technical specialists, push it through to resolution, and check the fix against delivery spec.', trigger: 'Pulled whenever the learner is liaising with edit support or technical specialists on a fault, workaround or upgrade, and checking deliverables meet spec.', ksbIds: ['K23', 'S19', 'S20', 'S22'] },
      { title: 'Manage a client or vendor relationship', summary: 'Step into managing a real client or vendor relationship — keeping coordinators and logistics on track, preparing cost reports or invoices, and learning to spot and flag issues early to protect the studio’s reputation.', trigger: "Pulled whenever the learner is managing coordinators or logistics, preparing cost reports or invoices, or protecting the studio's reputation with a client or vendor.", ksbIds: ['K24', 'K25', 'S18', 'S21', 'S23'] },
    ],
    flexName: 'Change Order',
    flexDescription: 'The real post and VFX-facility term for work requested outside the originally agreed scope — used here to pick up whatever KSBs haven’t yet been evidenced by the four briefs above, so nothing is left outstanding by the end of the programme.',
    flexKsbIds: deferredCoreSkillIds,
  },
  {
    id: 'live-arts',
    name: 'Live arts',
    briefs: [
      { title: "Interpret a live production's technical designs", summary: 'Get to grips with a set of technical drawings, a scale model or a 3D visualisation, and work out exactly what each technical department needs from it. Build your understanding of how lighting, sound, set and stage management interact around a shared design.', trigger: 'Pulled whenever the learner is analysing technical drawings, scale models or 3D visualisations, and working out how technical departments contribute and interact.', ksbIds: ['K27', 'K28', 'S24'] },
      { title: 'Coordinate and chair a live production meeting', summary: 'Take the chair on a real production meeting — a white card session, a model box sharing, a toolbox talk or a notes session — and develop the confidence to run the room. Write up the discussion and actions afterwards, and build the stakeholder-management skills that keep a company aligned.', trigger: 'Pulled whenever the learner is scheduling or chairing a production meeting — white cards, model box sharing, a toolbox talk, a notes session, a debrief — across creative, producing, technical and contractor stakeholders.', ksbIds: ['K26', 'K32', 'S26', 'S28'] },
      { title: 'Survey a venue or plan touring logistics', summary: 'Get out to a real venue and run a technical survey, or build a touring logistics plan — riders, carnets, manifests — checked against H&S and CDM licensing requirements. Develop the practical, on-the-ground skills that keep a tour or a get-in running smoothly.', trigger: 'Pulled whenever the learner is conducting a technical venue survey or planning touring logistics — riders, carnets, manifests — applying H&S and CDM licensing requirements.', ksbIds: ['K30', 'K31', 'S25'] },
      { title: 'Manage scenic materials and delivery', summary: 'Make a real call on scenic materials, or build a production schedule spanning build, fit-up and technical rehearsal — accounting for every department’s slot in it. Develop the planning instincts that keep a get-in on time and on budget.', trigger: 'Pulled whenever the learner is working a scenery or staging materials decision, or producing and implementing a production schedule across build, fit-up and technical rehearsal.', ksbIds: ['K29', 'S27', 'S29', 'S30'] },
    ],
    flexName: 'On the Day',
    flexDescription: 'Theatre and events shorthand for what comes up reactively during build, fit-up or tech week, as opposed to what was planned in advance — used here to pick up whatever KSBs haven’t yet been evidenced by the four briefs above, so nothing is left outstanding by the end of the programme.',
    flexKsbIds: deferredCoreSkillIds,
  },
];
