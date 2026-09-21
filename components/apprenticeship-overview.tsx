'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useRef, useState } from 'react';
import { Counter } from '@/components/counter';
import { ScrambleHeading } from '@/components/scramble-heading';
import { ScrambleText } from '@/components/scramble-text';
import { SectionEnd } from '@/components/section-end';
import { SectionRule } from '@/components/section-rule';
import { usePointerParallax } from '@/hooks/use-pointer-parallax';

const CA_COORD = '52.4862° N / 1.8904° W';

const ease = [0.22, 1, 0.36, 1] as const;

// Option summaries are plain-English overviews grounded in ST1483 v2.0 (occupation
// summary and each option's specialist responsibilities, from the research notes).
// `number` is our own public-facing display order, matching the standard's own
// Option 1 / 2 / 3 numbering.
const pathways = [
  {
    number: '01',
    title: 'Junior Production Manager',
    specialism: 'Screen & Audio',
    image: '/images/option-screen-audio-office.webp',
    alt: 'A broadcast production office with schedules and multi-monitor workstations',
    tags: ['SCHEDULING', 'FINANCE', 'DELIVERY'],
    summary:
      'Oversees all operational and logistical elements of a screen or audio production — film, TV, commercials, radio, podcasts. Leads the production team, may manage production co-ordinators, and plans the workflow from pre-production through to delivery of the final content.',
    detail:
      'Plans the workflow across every department a production touches, from acquisition and studio production through to post and delivery. You agree timelines and responsibilities, track the risks that could derail a schedule — compliance, rights, finance, editorial policy — and make sure what finally goes out the door meets the delivery standard the broadcaster or client actually asked for.',
    does: [
      'Plan the production workflow and agree timelines and responsibilities with each department',
      'Plan and schedule scripted, unscripted and multiplatform content',
      'Clear content for the rights it needs — music, archive material',
      'Monitor risk across compliance, delivery standards, rights, finance and editorial policy',
      'Source production and post production resources cost- and time-effectively',
      'Check deliverables meet technical standards for domestic and international delivery',
    ],
    techniques: ['GREENLIGHT DOCS', 'DELIVERY STANDARDS', 'RIGHTS CLEARANCE', 'BRAND IDENTITY', 'RESPONSIBLE AI', 'INTERNATIONAL VERSIONING'],
    progression:
      'Builds toward production manager, line producer or post producer roles across film, TV, commercials and audio.',
  },
  {
    number: '02',
    title: 'Junior Post Production Manager',
    specialism: 'Post & VFX',
    image: '/images/option-post-suite.webp',
    alt: 'A post-production suite with an editor reviewing footage on multiple screens',
    tags: ['WORKFLOW', 'CLIENT', 'PIPELINE'],
    summary:
      'Works closely with producers and supervisors to build and run the post schedule, tracking workflow through departments so internal and external deadlines are met. Leads the post team day-to-day and is often the link between the production company and post/VFX suppliers.',
    detail:
      'Sits between the client and the post facility. You maintain a project plan that delivers what the client asked for while holding the internal targets that keep the studio’s own operation healthy, across both live-action and CG-based workflows. When something breaks — a fault, a resourcing gap, a reputational risk — you are the one who spots it early and manages the fix.',
    does: [
      'Make project-critical decisions on post production resource allocation',
      'Manage production co-ordinators and keep project logistics organised',
      'Communicate with edit support and edit assistants on faults, work-arounds and upgrades',
      'Liaise with technical support to resolve issues and maintain service levels',
      'Actualise work orders and prepare cost reports and invoices',
      "Protect the studio's reputation — flag scheduling or budget issues that could cause harm early",
    ],
    techniques: ['SHOTGUN', 'FILEMAKER', 'MS PROJECT', 'LIVE-ACTION + CG WORKFLOW', 'VENDOR RELATIONS', 'CLIENT MANAGEMENT'],
    progression:
      'Leads to post production supervisor, post producer or line producer roles.',
  },
  {
    number: '03',
    title: 'Assistant Production Manager',
    specialism: 'Live Arts',
    image: '/images/option-live-arts-backstage.webp',
    alt: 'A stage manager backstage with a headset and running sheet during a technical rehearsal',
    tags: ['TECHNICAL', 'VENUES', 'TOURING'],
    summary:
      'Supports the technical director in realising every technical element of a production design — for live performance and live events — within agreed budget, time and technical parameters, across theatres, touring venues and non-traditional spaces.',
    detail:
      'Turns a designer’s vision into a production a technical department can actually build and run. You read technical drawings and creative designs, survey venues for suitability, chair the meetings that keep every department represented, and hold the schedule together across build, fit-up and technical rehearsal — wherever in the world the tour takes it.',
    does: [
      'Analyse and interpret technical drawings and creative designs — scale models, 3D visualisations, technical specifications',
      'Apply CDM regulations and local authority licensing requirements',
      'Liaise with technical, producing and creative departments and specialist contractors',
      'Produce and distribute technical design information',
      'Schedule, hold and chair production meetings — white cards, model box sharings, toolbox talks, notes sessions, debriefs',
      'Produce and maintain the production schedule across build, fit-up and technical rehearsal stages',
    ],
    techniques: ['AUTOCAD', 'CDM REGS', 'TOURING LOGISTICS', 'VENUE SURVEYS', 'SCENIC MATERIALS', 'LICENSING'],
    progression:
      'Builds toward production manager or technical director roles across theatre, touring and live events.',
  },
];

// Decorative marquee under the hero. Rendered twice so the track can loop on a
// translateX(-50%) with no visible seam.
const disciplines = [
  'PRODUCTION MANAGEMENT',
  'SCHEDULING',
  'BUDGETING & FINANCE',
  'SCREEN & AUDIO',
  'POST PRODUCTION',
  'LIVE ARTS',
  'RISK & COMPLIANCE',
  'STAKEHOLDER ENGAGEMENT',
  'PROCUREMENT',
  'SUSTAINABILITY',
  'LOGISTICS',
  'RIGHTS CLEARANCE',
  'VENUE SURVEYS',
  'TOURING',
  'GREENLIGHT DOCS',
  'DELIVERY STANDARDS',
  'CLIENT MANAGEMENT',
  'TEAM LEADERSHIP',
  'HEALTH & SAFETY',
  'CONTRACTS & EMPLOYMENT LAW',
];

export function ApprenticeshipOverview() {
  const reduceMotion = useReducedMotion();
  const [activePathway, setActivePathway] = useState(0);
  // Click peels the panel open and reveals the full option breakdown. Clicking
  // the open option again collapses it; clicking another switches straight to
  // its breakdown. Same interaction as the training page.
  const [expanded, setExpanded] = useState(false);
  const visualRef = useRef<HTMLDivElement>(null);
  const active = pathways[activePathway];
  const reveal = reduceMotion ? {} : { initial: { opacity: 0, y: 42 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.18 }, transition: { duration: 0.8, ease } };

  // Hover / focus previews an option — but only while nothing is open, so moving
  // the cursor across the list toward the panel can't clip another option.
  function preview(index: number) {
    if (expanded) return;
    setActivePathway(index);
  }

  // On mobile the panel sits below the list, so bring it into view on open.
  function revealPanel() {
    if (typeof window === 'undefined' || window.innerWidth > 760) return;
    requestAnimationFrame(() =>
      visualRef.current?.scrollIntoView({
        behavior: reduceMotion ? 'auto' : 'smooth',
        block: 'start',
      }),
    );
  }

  function selectOrToggle(index: number) {
    if (index === activePathway) {
      setExpanded((v) => {
        if (!v) revealPanel();
        return !v;
      });
    } else {
      setActivePathway(index);
      setExpanded(true);
      revealPanel();
    }
  }

  // Cursor-position parallax on the option panel, plus a live coordinate readout
  // (the CREATIVE ALLIANCE line drifts with the cursor, snapping back on leave).
  const coordRef = useRef<HTMLSpanElement>(null);
  const { frameRef, targetRef } = usePointerParallax<HTMLDivElement, HTMLDivElement>({
    maxX: 6,
    maxY: 4,
    onMove: (nx, ny) => {
      const el = coordRef.current;
      if (el) {
        el.textContent = `${(52.4862 + ny * 0.16).toFixed(4)}° N / ${(1.8904 - nx * 0.16).toFixed(4)}° W`;
      }
    },
    onLeave: () => {
      if (coordRef.current) coordRef.current.textContent = CA_COORD;
    },
  });

  return (
    <section id="overview" className="overview grid-field">
      <SectionRule />
      <div className="discipline-strip" aria-hidden="true">
        <div className="discipline-track">
          {[0, 1].map((copy) => (
            <div className="discipline-group" key={copy}>
              {disciplines.map((label) => (
                <span className="discipline-item" key={`${copy}-${label}`}>
                  {label}
                  <i />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <motion.div className="overview-heading" {...reveal}>
        <TechLabel label="PROGRAMME OVERVIEW" />
        <ScrambleHeading lines={[{ text: 'BUILT AROUND' }, { text: 'THE WORK.', accent: true }]} />
        <p className="overview-definition">
          A Level 6 apprenticeship for people running the organisational side of a production — developing
          the planning, financial governance and leadership skills needed to schedule and deliver work across
          screen, post and live performance.
        </p>
        <aside>
          <span>3 OPTIONS</span>
          <p>One shared occupational standard. Three specialist options through the programme.</p>
        </aside>
      </motion.div>

      <div id="pathways" className="pathway-system">
        <motion.div className="pathway-intro" {...reveal}>
          <h2>Three specialist<br /><span>options.</span></h2>
          <p>
            Your option is set by the specialism of your employer — screen &amp; audio, post production, or
            live arts. The core above applies to everyone before you split into it.
          </p>
        </motion.div>
        <div className="pathway-header">
          <span>OPTION SELECTOR</span><span><Counter value={3} pad={2} /> OPTIONS</span><span>CLICK TO OPEN</span>
        </div>
        <div className="pathway-list">
          <motion.div
            className="pathway-rail"
            aria-hidden="true"
            {...(reduceMotion
              ? {}
              : {
                  initial: { scaleY: 0 },
                  whileInView: { scaleY: 1 },
                  viewport: { once: true, amount: 0.4 },
                  transition: { duration: 0.7, ease },
                })}
          >
            <span
              className="pathway-rail-head"
              style={{ '--rail-i': activePathway } as React.CSSProperties}
            />
          </motion.div>
          {pathways.map((pathway, index) => (
            <motion.button
              type="button"
              key={pathway.number}
              className={activePathway === index ? 'is-active' : ''}
              aria-pressed={activePathway === index}
              aria-expanded={activePathway === index && expanded}
              aria-controls="pathway-panel"
              data-cursor-label="VIEW OPTION →"
              onMouseEnter={() => preview(index)}
              onFocus={() => preview(index)}
              onClick={() => selectOrToggle(index)}
              {...(reduceMotion ? {} : { initial: { opacity: 0, x: -28 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true, amount: 0.55 }, transition: { duration: 0.65, delay: index * 0.08, ease } })}
            >
              <span className="pathway-number">{pathway.number}</span>
              <span className="pathway-name">{pathway.title}<strong>{pathway.specialism}</strong></span>
              <span className="pathway-tags">{pathway.tags.map((tag) => <i key={tag}>{tag}</i>)}</span>
              <span className="pathway-arrow" aria-hidden="true">{'↗︎'}</span>
            </motion.button>
          ))}
        </div>
        <div
          id="pathway-panel"
          ref={visualRef}
          className={`pathway-visual pathway-visual--expand${expanded ? ' is-expanded' : ''}`}
        >
          <div
            className="pathway-frame"
            ref={frameRef}
            data-cursor-label="INSPECT"
            aria-hidden={expanded || undefined}
          >
            <div className="pathway-frame-inner" ref={targetRef}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={active.image}
                  src={active.image}
                  alt={active.alt}
                  initial={reduceMotion ? false : { opacity: 0, scale: 1.05, clipPath: 'inset(0 0 100% 0)' }}
                  animate={{ opacity: 1, scale: 1, clipPath: 'inset(0 0 0% 0)' }}
                  exit={reduceMotion ? {} : { opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
                  transition={{ duration: 0.55, ease }}
                />
              </AnimatePresence>
            </div>
            <div className="pathway-grade" aria-hidden="true" />
            <AnimatePresence mode="wait">
              <motion.span
                key={active.number}
                className="pathway-ghost"
                aria-hidden="true"
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 0.1, y: 0 }}
                exit={reduceMotion ? {} : { opacity: 0, y: -24 }}
                transition={{ duration: 0.5, ease }}
              >
                {active.number}
              </motion.span>
            </AnimatePresence>
            <div className="visual-index"><span>OPTION</span><strong>{active.number}</strong><i /></div>
            <div className="visual-coordinates" aria-hidden="true">
              <span><i>CREATIVE ALLIANCE</i><span ref={coordRef}>{CA_COORD}</span></span>
            </div>
            <div className="frame-corners" aria-hidden="true"><i /><i /><i /><i /></div>
          </div>
          <div className="pathway-detail">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.number}
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? {} : { opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease }}
              >
                <span className="detail-eyebrow">OPTION {active.number} / {active.specialism}</span>
                <h3>{active.title}</h3>
                <p>{active.summary}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="pathway-breakdown-wrap">
            <div className="pathway-breakdown" inert={!expanded}>
              <motion.div
                key={active.number}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease }}
              >
                <p className="pb-lede">{active.detail}</p>

                <p className="tb-label">What you&rsquo;ll be doing</p>
                <ul className="tb-covers">
                  {active.does.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <p className="tb-label">Tools and topics you&rsquo;ll build</p>
                <ul className="pb-tags">
                  {active.techniques.map((technique) => (
                    <li key={technique}>{technique}</li>
                  ))}
                </ul>

                <p className="tb-label">Where it leads</p>
                <p className="pb-lead">{active.progression}</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <SectionEnd seq="02" label="Programme · Options" />
    </section>
  );
}

function TechLabel({ label }: { label: string }) {
  return <div className="tech-label"><i /><ScrambleText text={label} /></div>;
}
