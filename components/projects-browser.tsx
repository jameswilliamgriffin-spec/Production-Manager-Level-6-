'use client';

import { CalendarClock, Clapperboard, Layers, Scale, Theater, Users } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import Image from 'next/image';
import { useState } from 'react';
import { KsbFullList } from '@/components/ksb-refs';
import { PageHeroShader } from '@/components/page-hero-shader';
import { projectCategories, type ProjectCategory } from '@/lib/project-data';

const ease = [0.22, 1, 0.36, 1] as const;

const coreIcons: Record<string, typeof CalendarClock> = {
  'planning-resourcing': CalendarClock,
  'legal-regulatory-sustainable': Scale,
  'leadership-stakeholders': Users,
};

const pathwayIcons: Record<string, typeof Clapperboard> = {
  'screen-audio': Clapperboard,
  post: Layers,
  'live-arts': Theater,
};

const pathwayImages: Record<string, { src: string; alt: string }> = {
  'screen-audio': { src: '/images/option-screen-audio-office.webp', alt: 'A broadcast production office with schedules and multi-monitor workstations' },
  post: { src: '/images/option-post-suite.webp', alt: 'A post-production suite with an editor reviewing footage on multiple screens' },
  'live-arts': { src: '/images/option-live-arts-backstage.webp', alt: 'A stage manager backstage with a headset and running sheet during a technical rehearsal' },
};

// The shader now runs as a colour-grade wash over the photo (soft-light blend,
// see .pjb-pathway-banner-shader) rather than being the image itself — same
// three brand colours every time, just re-weighted per option.
const pathwayShaderColors: Record<string, string[]> = {
  'screen-audio': ['#0a0f0f', '#f78f21', '#f9a83f', '#b85a14', '#1d9df0'],
  post: ['#080d14', '#1d9df0', '#378ade', '#2f6fd9', '#0c2b52'],
  'live-arts': ['#0a0f0f', '#f78f21', '#0a3552', '#b85a14', '#1d9df0'],
};

function CoreProjects({ core }: { core: ProjectCategory }) {
  const reduceMotion = useReducedMotion();
  const reveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 22 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.6, ease },
      };

  return (
    <div className="pjb-core">
      <div className="pjb-section-head">
        <span className="pjb-eyebrow">CORE &middot; ANY ORDER</span>
        <h2>Core projects</h2>
        <p>{core.intro}</p>
      </div>
      <div className="pjb-core-grid">
        {core.items.map((item, index) => {
          const Icon = coreIcons[item.id];
          return (
            <motion.div className="pjb-core-card" key={item.id} {...reveal} transition={{ ...reveal.transition, delay: index * 0.06 }}>
              {Icon && (
                <span className="pjb-core-icon" aria-hidden="true">
                  <Icon size={22} strokeWidth={1.5} />
                </span>
              )}
              <strong>{item.title}</strong>
              {item.meta && <em>{item.meta}</em>}
              <span>{item.description}</span>
              <KsbFullList ids={item.ksbIds} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function PathwayProjects({ pathways }: { pathways: ProjectCategory[] }) {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const active = pathways[activeIndex];
  const Icon = pathwayIcons[active.id];

  return (
    <div className="pjb-pathways">
      <div className="pjb-section-head">
        <span className="pjb-eyebrow">YOUR OPTION</span>
        <h2>Option-specific projects</h2>
        <p>Pulled off the shelf whenever real production work matches one of the briefs below, in any order.</p>
      </div>

      <div className="pjb-switcher" role="tablist" aria-label="Choose an option">
        {pathways.map((pathway, index) => {
          const TabIcon = pathwayIcons[pathway.id];
          const isActive = index === activeIndex;
          return (
            <button
              key={pathway.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls="pjb-pathway-panel"
              className={isActive ? 'is-active' : undefined}
              onClick={() => setActiveIndex(index)}
            >
              {TabIcon && <TabIcon size={20} strokeWidth={1.5} aria-hidden="true" />}
              <span>{pathway.label}</span>
            </button>
          );
        })}
      </div>

      <div id="pjb-pathway-panel" role="tabpanel" aria-label={`${active.label} projects`}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.id}
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: reduceMotion ? 0 : 0.4, ease }}
          >
            <div className={`pjb-pathway-banner pjb-pathway-banner--${active.id}`}>
              <Image
                className="pjb-pathway-banner-plate"
                src={pathwayImages[active.id].src}
                alt={pathwayImages[active.id].alt}
                fill
                sizes="(max-width: 900px) 100vw, 1200px"
              />
              <div className="pjb-pathway-banner-shader" aria-hidden="true">
                <PageHeroShader colors={pathwayShaderColors[active.id]} />
              </div>
              <div className="pjb-pathway-banner-scrim" aria-hidden="true" />
              <div className="pjb-pathway-banner-content">
                {Icon && (
                  <span className="pjb-pathway-banner-icon" aria-hidden="true">
                    <Icon size={30} strokeWidth={1.3} />
                  </span>
                )}
                <h3>{active.label}</h3>
              </div>
            </div>

            <div className="pjb-pathway-grid">
              {active.items.map((item) => (
                <div key={item.id} className={item.isFlexible ? 'pjb-project-card is-flexible' : 'pjb-project-card'}>
                  <span className="pjb-project-number">{item.number}</span>
                  <strong>{item.title}</strong>
                  <span>{item.description}</span>
                  <KsbFullList ids={item.ksbIds} />
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function ProjectsBrowser() {
  const core = projectCategories[0];
  const pathways = projectCategories.slice(1);

  return (
    <section className="projects-browser" aria-labelledby="projects-browser-heading">
      <h2 id="projects-browser-heading" className="sr-only">
        Apprenticeship projects
      </h2>
      <CoreProjects core={core} />
      <PathwayProjects pathways={pathways} />
    </section>
  );
}
