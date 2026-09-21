// Projects page content — built from the same source as the homepage's
// "Programme overview" section (lib/programme-overview-data.ts), not duplicated,
// so the two pages can't drift apart. Core = the three module pieces of work.
// Each option = its shelf of situation-triggered briefs plus its flexible slot.

import { coreModules, optionWork } from '@/lib/programme-overview-data';

export type ProjectItem = {
  id: string;
  number: string;
  title: string;
  description: string;
  /** The real-workplace situation that triggers picking this project up —
   *  only set for option-specific briefs, not the core pieces of work
   *  (which sit on a fixed delivery calendar rather than being pulled). */
  trigger?: string;
  meta?: string;
  isFlexible?: boolean;
  ksbIds: string[];
};

export type ProjectCategory = {
  id: string;
  number: string;
  label: string;
  intro: string;
  items: ProjectItem[];
};

const pad = (n: number) => String(n).padStart(2, '0');

export const projectCategories: ProjectCategory[] = [
  {
    id: 'core',
    number: '00',
    label: 'Core',
    intro: 'One piece of work per core module, taken in any order — each a single knowledge-based document, produced after that module’s training days.',
    items: coreModules.map((module, index) => ({
      id: module.id,
      number: pad(index + 1),
      title: module.pieceOfWorkTitle,
      description: module.pieceOfWorkDescription,
      meta: `${module.name} · ${module.month}`,
      ksbIds: module.ksbIds,
    })),
  },
  ...optionWork.map((option, optionIndex) => ({
    id: option.id,
    number: pad(optionIndex + 1),
    label: option.name,
    intro: 'Pulled off the shelf whenever real production work matches one of the briefs below, in any order — no fixed timing.',
    items: [
      ...option.briefs.map((brief, briefIndex) => ({
        id: `${option.id}-${briefIndex}`,
        number: pad(briefIndex + 1),
        title: brief.title,
        description: brief.summary,
        trigger: brief.trigger,
        ksbIds: brief.ksbIds,
      })),
      {
        id: `${option.id}-flex`,
        number: pad(option.briefs.length + 1),
        title: option.flexName,
        description: option.flexDescription,
        isFlexible: true,
        ksbIds: option.flexKsbIds,
      },
    ],
  })),
];
