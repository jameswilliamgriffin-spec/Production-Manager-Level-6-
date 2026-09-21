// KSB reference data for ST1483 v2.0 (Creative Industries Production Manager).
//
// `text` is the official wording from the occupational standard, transcribed from
// the research notes compiled from https://skillsengland.education.gov.uk/apprenticeships/st1483-v2-0.
// Preserve it verbatim in any compliance-sensitive output.
//
// `scope` records who a KSB applies to:
//   core         - every apprentice, whichever option
//   screen-audio - Option 1, Junior production manager (screen and audio) only
//   post         - Option 2, Junior post production manager only
//   live-arts    - Option 3, Assistant production manager (live arts) only
//   screen-post  - shared by Option 1 and Option 2, but not Option 3 (K11, S11, S12)
//
// The AAP does not yet mark which KSBs are "bold" (mandatory-in-every-assessment)
// vs sampled — that detail sits in the source AAP PDF and has not been pulled in
// here. Do not infer a bold/sampled split from this file.

export const STANDARD_REF = 'ST1483 v2.0';

export type KsbType = 'K' | 'S' | 'B';
export type KsbScope = 'core' | 'screen-audio' | 'post' | 'live-arts' | 'screen-post';

export type Ksb = {
  id: string;
  type: KsbType;
  scope: KsbScope;
  text: string;
};

export type PathwayId = 'screen-audio' | 'post' | 'live-arts';

export const pathways: { id: PathwayId; number: string; name: string; specialism: string; scopes: KsbScope[] }[] = [
  { id: 'screen-audio', number: '01', name: 'Junior Production Manager', specialism: 'Screen & Audio', scopes: ['screen-audio', 'screen-post'] },
  { id: 'post', number: '02', name: 'Junior Post Production Manager', specialism: 'Post & VFX', scopes: ['post', 'screen-post'] },
  { id: 'live-arts', number: '03', name: 'Assistant Production Manager', specialism: 'Live Arts', scopes: ['live-arts'] },
];

export const typeLabels: Record<KsbType, { label: string; plural: string }> = {
  K: { label: 'Knowledge', plural: 'Knowledge' },
  S: { label: 'Skill', plural: 'Skills' },
  B: { label: 'Behaviour', plural: 'Behaviours' },
};

export const ksbs: Ksb[] = [
  // --- Core Knowledge (all apprentices) ---
  { id: 'K1', type: 'K', scope: 'core', text: 'Methods to analyse and interpret a creative concept into a production schedule and budget.' },
  { id: 'K2', type: 'K', scope: 'core', text: "Organisational vision, culture and values and the impact on the production manager's role." },
  { id: 'K3', type: 'K', scope: 'core', text: 'Structures of production teams and departments, and the interdependencies between these, both internal and external (reporting lines, information sharing).' },
  { id: 'K4', type: 'K', scope: 'core', text: 'Strategies to build engagement, improve motivation and develop a high performance, collaborative culture; including managing conflict within a production environment.' },
  { id: 'K5', type: 'K', scope: 'core', text: 'Legal and ethical policies/practices for different types of employment contracts (working time directives, pay rates, remote workers, union requirements).' },
  { id: 'K6', type: 'K', scope: 'core', text: 'Legal and regulatory requirements applicable to productions (copyright, IP, use of technology, safeguarding).' },
  { id: 'K7', type: 'K', scope: 'core', text: 'Financial governance and legal requirements, and production procurement strategies (e.g. tendering).' },
  { id: 'K8', type: 'K', scope: 'core', text: 'Risks and issues that may arise for a production and ways they may be mitigated or resolved.' },
  { id: 'K9', type: 'K', scope: 'core', text: 'Importance of environmental sustainability and departmental processes (e.g. Albert Carbon Calculator for screen, Theatre Green Book, Purple Guide).' },
  { id: 'K10', type: 'K', scope: 'core', text: 'Logistical requirements for working in different locations (local authorities, local experts, time zones).' },

  // --- Core Skills ---
  { id: 'S1', type: 'S', scope: 'core', text: 'Manage day-to-day running of production activities, ensuring deadlines are met and putting measures in place for potential issues.' },
  { id: 'S2', type: 'S', scope: 'core', text: 'Record, process and monitor financial transactions using organisational tools/procedures.' },
  { id: 'S3', type: 'S', scope: 'core', text: 'Ensure Health & Safety legislation and guidelines are adhered to (risk assessments, safety/security policies).' },
  { id: 'S4', type: 'S', scope: 'core', text: 'Adapt presentation and communication styles to suit varied audiences.' },
  { id: 'S5', type: 'S', scope: 'core', text: 'Use techniques to influence and persuade others to achieve required production outcomes.' },
  { id: 'S6', type: 'S', scope: 'core', text: 'Operate within agreed organisational policies, standards and procedures (EDI, recruitment, procurement, GDPR).' },
  { id: 'S7', type: 'S', scope: 'core', text: 'Provide reports/updates to stakeholders, flagging issues and presenting potential solutions.' },
  { id: 'S8', type: 'S', scope: 'core', text: 'Review production/portfolio of work iteratively for continuous improvement (budget efficiency, design process, technology, timelines).' },
  { id: 'S9', type: 'S', scope: 'core', text: 'Use and promote sustainable practices per industry standard recommendations.' },
  { id: 'S10', type: 'S', scope: 'core', text: 'Consider logistical requirements for productions using multiple/different locations (local experts, local authority requirements, time zone implications).' },

  // --- Core Behaviours ---
  { id: 'B1', type: 'B', scope: 'core', text: 'Adapts positively to challenging situations and changing work priorities/patterns, ensuring key deadlines are met.' },
  { id: 'B2', type: 'B', scope: 'core', text: 'Acts inclusively when collaborating with colleagues, clients and customers; shares best practice; maintains professional conduct.' },
  { id: 'B3', type: 'B', scope: 'core', text: 'Promotes and upholds an environment of trust, respect and safeguarding for colleagues, clients and customers.' },
  { id: 'B4', type: 'B', scope: 'core', text: 'Acts with integrity, giving due regard to legal, ethical and regulatory requirements.' },
  { id: 'B5', type: 'B', scope: 'core', text: 'Conceptualises creative ideas and the creative vision for the production; analyses problems; uses initiative and innovation for creative solutions.' },
  { id: 'B6', type: 'B', scope: 'core', text: 'Demonstrates commitment to continuous professional development; maintains knowledge/skills in relation to industry developments.' },
  { id: 'B7', type: 'B', scope: 'core', text: 'Takes personal responsibility to ensure production outcomes are met in a sustainable way.' },

  // --- Option 1: Junior production manager – screen and audio ---
  { id: 'K11', type: 'K', scope: 'screen-post', text: 'End-to-end production workflow from pre-production through to distribution, and how stages/departments interact.' },
  { id: 'K12', type: 'K', scope: 'screen-audio', text: 'Key issues and challenges relating to multiplatform and/or media asset management in production management.' },
  { id: 'K13', type: 'K', scope: 'screen-audio', text: 'Effects of production activities (acquisition, studio production, outside broadcasting, location filming, editing, processing, VFX).' },
  { id: 'K14', type: 'K', scope: 'screen-audio', text: 'Role of production finance; how to produce greenlight documents and progress reports, including key cost drivers and forecasting.' },
  { id: 'K15', type: 'K', scope: 'screen-audio', text: 'Importance and legal requirements of production insurance policies and completion financing.' },
  { id: 'K16', type: 'K', scope: 'screen-audio', text: 'Post production process for delivering to a variety of broadcasters; how to produce post production schedules for a variety of series/genres.' },
  { id: 'K17', type: 'K', scope: 'screen-audio', text: 'Elements of channel, brand or franchise identity and how they are applied.' },
  { id: 'K18', type: 'K', scope: 'screen-audio', text: 'International production requirements (language versioning, delivery standard conversions).' },
  { id: 'K19', type: 'K', scope: 'screen-audio', text: 'Moral/ethical issues and best practice for incorporating AI within productions.' },

  { id: 'S11', type: 'S', scope: 'screen-post', text: 'Plan the production workflow; agree timelines/responsibilities with each department.' },
  { id: 'S12', type: 'S', scope: 'screen-post', text: 'Plan and schedule content for projects (scripted, unscripted, multiplatform).' },
  { id: 'S13', type: 'S', scope: 'screen-audio', text: 'Ensure content is cleared for relevant/required rights (music, archive material).' },
  { id: 'S14', type: 'S', scope: 'screen-audio', text: 'Monitor/evaluate key issues and risks relating to compliance, delivery standards, rights, finance, budgeting, editorial policy.' },
  { id: 'S15', type: 'S', scope: 'screen-audio', text: 'Identify, plan and source production/post production resources (camera equipment, editing, remote working tech, sound, VFX) cost- and time-effectively.' },
  { id: 'S16', type: 'S', scope: 'screen-audio', text: 'Ensure programme deliverables meet technical standards (format, quality) for domestic or international delivery.' },

  // --- Option 2: Junior post production manager ---
  { id: 'K20', type: 'K', scope: 'post', text: 'Methods to produce and maintain a project plan that delivers client objectives while setting internal targets.' },
  { id: 'K21', type: 'K', scope: 'post', text: 'Workflow of both live-action and CG based projects and the functions of relevant departments within that workflow.' },
  { id: 'K22', type: 'K', scope: 'post', text: 'Capabilities/utilisation of project management tools, databases and software (Shotgun, Filemaker, MS Project, Excel, scheduling systems).' },
  { id: 'K23', type: 'K', scope: 'post', text: 'Specialist technology and software used for post production workflows.' },
  { id: 'K24', type: 'K', scope: 'post', text: 'Approaches to vendor, client and internal colleague (incl. global sites) relationship management — negotiating, influencing, networking.' },
  { id: 'K25', type: 'K', scope: 'post', text: 'Importance of client management and potential impact on reputation and brand.' },

  { id: 'S17', type: 'S', scope: 'post', text: 'Make informed and project-critical decisions on resource allocations relating to post production.' },
  { id: 'S18', type: 'S', scope: 'post', text: 'Manage the production coordinator(s), ensuring project logistics are well organised.' },
  { id: 'S19', type: 'S', scope: 'post', text: 'Communicate with the edit support team and edit assistants re faults, work-arounds or upgrades.' },
  { id: 'S20', type: 'S', scope: 'post', text: 'Liaise with technical support and assist resolving issues in technical areas to maintain high service levels.' },
  { id: 'S21', type: 'S', scope: 'post', text: 'Actualise work orders to track completed work; prepare cost reports/invoices.' },
  { id: 'S22', type: 'S', scope: 'post', text: 'Ensure content meets industry technical requirements and post production delivery standards (format, quality).' },
  { id: 'S23', type: 'S', scope: 'post', text: "Proactively manage the reputation between project and client — identify scheduling/budget issues that could cause harm, implement changes to protect the studio's brand." },

  // --- Option 3: Assistant production manager – live arts ---
  { id: 'K26', type: 'K', scope: 'live-arts', text: 'Individual challenges posed by different forms of live performance (plays, musicals, dance, opera, festivals, circus, performance art).' },
  { id: 'K27', type: 'K', scope: 'live-arts', text: 'Live arts production process from concept through to delivery of a production/event to an audience.' },
  { id: 'K28', type: 'K', scope: 'live-arts', text: 'Contribution of technical departments and their interactions during production (lighting, sound, video, stage management, automation, staging).' },
  { id: 'K29', type: 'K', scope: 'live-arts', text: 'Materials used to construct scenery/staging — opportunities/challenges (cost, durability, environmental impact, availability, specialist installers, regulations).' },
  { id: 'K30', type: 'K', scope: 'live-arts', text: 'Processes for technical surveys of a venue/performance location to ensure suitability; methods to communicate findings.' },
  { id: 'K31', type: 'K', scope: 'live-arts', text: 'Logistics involved with touring productions (technical riders, carnets, manifests); liaising with venue staff.' },
  { id: 'K32', type: 'K', scope: 'live-arts', text: 'Organisations and industry bodies associated with live arts and how a junior production manager might interact with them.' },

  { id: 'S24', type: 'S', scope: 'live-arts', text: 'Analyse and interpret technical drawings and creative designs (scale models, 3D visualisations, technical specifications).' },
  { id: 'S25', type: 'S', scope: 'live-arts', text: 'Apply industry-specific H&S legislation (CDM regs) and local authority licensing requirements.' },
  { id: 'S26', type: 'S', scope: 'live-arts', text: 'Liaise with technical, producing and creative departments plus specialist contractors (design, logistics, staffing, H&S).' },
  { id: 'S27', type: 'S', scope: 'live-arts', text: 'Produce and distribute technical design information using digital design software (e.g. AutoCAD).' },
  { id: 'S28', type: 'S', scope: 'live-arts', text: 'Schedule, hold and chair meetings throughout production (white cards/initial designs, model box/design sharings, production meetings, CDM/toolbox talks, notes sessions, debriefs).' },
  { id: 'S29', type: 'S', scope: 'live-arts', text: 'Produce, distribute, discuss, maintain and implement the production schedule, ensuring all departments and build/fit-up/technical rehearsal stages are represented.' },
  { id: 'S30', type: 'S', scope: 'live-arts', text: 'Manage delivery of physical aspects of the production from concept through to delivery to an audience.' },
];

export const coreKsbs = ksbs.filter((k) => k.scope === 'core');

export function ksbsForPathway(id: PathwayId): Ksb[] {
  const pathway = pathways.find((p) => p.id === id);
  if (!pathway) return [];
  return ksbs.filter((k) => pathway.scopes.includes(k.scope));
}

export function byType(list: Ksb[], type: KsbType): Ksb[] {
  return list.filter((k) => k.type === type);
}

// Assessment Outcomes from the ST1483 v2.0 Apprenticeship Assessment Plan (AAP).
// ST1483 is a "new model" standard assessed against Assessment Outcomes rather than
// the older two-method/weighting-table format, so AOs (not occupational "duties")
// are the grouping used here — they are the AAP's own structure, not an invented one.
// `ksbs` reproduces each AO's official KSB mapping from the AAP.
export type AssessmentOutcome = {
  id: string;
  scope: 'core' | PathwayId;
  title: string;
  text: string;
  ksbs: string[];
};

export const assessmentOutcomes: AssessmentOutcome[] = [
  { id: 'AO1', scope: 'core', title: 'Production planning, scheduling and resource management', text: 'Plans, schedules, coordinates and adjusts production activities across locations/studios/OBs; manages resources, budgets, financial processes; procurement strategies; iterative planning.', ksbs: ['K1', 'K7', 'K8', 'K10', 'S1', 'S2', 'S8', 'S10'] },
  { id: 'AO2', scope: 'core', title: 'Legal, regulatory, ethical and sustainable requirements', text: 'Adheres to legal/regulatory/ethical/sustainability requirements; H&S, safeguarding, copyright/IP, employment obligations; embeds sustainability guidance.', ksbs: ['K5', 'K6', 'K9', 'S3', 'S6', 'S9'] },
  { id: 'AO3', scope: 'core', title: 'Team leadership, collaboration and stakeholder engagement', text: 'Liaises with internal teams/external partners; manages interdependencies, resolves conflict; reports/escalates with proposed solutions.', ksbs: ['K2', 'K3', 'K4', 'S4', 'S5', 'S7'] },

  { id: 'AO4', scope: 'screen-audio', title: 'Production workflow, scheduling and coordination', text: 'Plans/organises production workflows, coordinating timelines and interdependent departments; scheduling, content planning, workflow analysis.', ksbs: ['K11', 'K12', 'K13', 'S11', 'S12'] },
  { id: 'AO5', scope: 'screen-audio', title: 'Finance, compliance, rights and risk management', text: 'Prepares/manages financial documentation, forecasting, insurance; compliance with standards/rights/editorial policy; risk identification/mitigation.', ksbs: ['K14', 'K15', 'S13', 'S14'] },
  { id: 'AO6', scope: 'screen-audio', title: 'Technical delivery, post production, brand and international requirements', text: 'Sources/manages/schedules post production resources; technical delivery standards for domestic/international broadcasters; brand identity; responsible AI use.', ksbs: ['K16', 'K17', 'K18', 'K19', 'S15', 'S16'] },

  { id: 'AO7', scope: 'post', title: 'Production and post production workflow, planning and coordination', text: 'Develops/maintains project and workflow plans across live-action/CG pipelines; coordinates departments; aligns post-production activity to client objectives/internal targets.', ksbs: ['K11', 'K20', 'K21', 'S11', 'S12'] },
  { id: 'AO8', scope: 'post', title: 'Post production technology, tools and technical standards', text: 'Uses agreed software/PM tools to allocate resources, communicate technical issues, support pipeline efficiency; resolves faults; ensures deliverables meet spec.', ksbs: ['K22', 'K23', 'S17', 'S19', 'S20', 'S22'] },
  { id: 'AO9', scope: 'post', title: 'Client, vendor and project oversight', text: 'Manages stakeholder relationships (communication, reputation, brand expectations); oversees logistics, cost reporting, admin for accurate/timely/client-aligned delivery.', ksbs: ['K24', 'K25', 'S18', 'S21', 'S23'] },

  { id: 'AO10', scope: 'live-arts', title: 'Production process and technical coordination', text: 'Supports development of live productions, interpreting production documentation/technical designs; coordinates technical departments; facilitates creative/producing/technical communication.', ksbs: ['K26', 'K27', 'K28', 'K32', 'S24', 'S26', 'S28'] },
  { id: 'AO11', scope: 'live-arts', title: 'Venue surveys and production requirements', text: 'Conducts technical surveys of venues, communicates findings; applies H&S regs; coordinates compliance across single/multiple venues.', ksbs: ['K30', 'K31', 'S25'] },
  { id: 'AO12', scope: 'live-arts', title: 'Production and scenic delivery', text: 'Plans/manages logistics, liaises with venue teams, oversees technical schedules for build/fit-up/rehearsals; physical/operational delivery.', ksbs: ['K29', 'S27', 'S29', 'S30'] },
];

export const coreAssessmentOutcomes = assessmentOutcomes.filter((ao) => ao.scope === 'core');

export function assessmentOutcomesForPathway(id: PathwayId): AssessmentOutcome[] {
  return assessmentOutcomes.filter((ao) => ao.scope === id);
}
