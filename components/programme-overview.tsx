'use client';

import { Clapperboard, Layers, Theater } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useState } from 'react';
import { KsbChipRow } from '@/components/ksb-refs';
import { MagneticCta } from '@/components/magnetic-cta';
import { ScrambleText } from '@/components/scramble-text';
import { SectionRule } from '@/components/section-rule';
import { coreModules, optionWork, type OptionWork } from '@/lib/programme-overview-data';

const ease = [0.22, 1, 0.36, 1] as const;

const optionIcons: Record<OptionWork['id'], typeof Clapperboard> = {
  'screen-audio': Clapperboard,
  post: Layers,
  'live-arts': Theater,
};

const optionNameById = new Map(optionWork.map((option) => [option.id, option.name]));

function CoreToOptionsConnector() {
  return (
    <div className="po-connector" aria-hidden="true">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        <line x1="16.66" y1="0" x2="50" y2="50" />
        <line x1="50" y1="0" x2="50" y2="50" />
        <line x1="83.33" y1="0" x2="50" y2="50" />
        <line x1="50" y1="50" x2="16.66" y2="100" />
        <line x1="50" y1="50" x2="50" y2="100" />
        <line x1="50" y1="50" x2="83.33" y2="100" />
      </svg>
      <span className="po-connector-node">Core complete</span>
    </div>
  );
}

/** Toggling a Set of open keys — any number of cards can be open at once,
 *  independent of each other, rather than an accordion that closes siblings. */
function useOpenSet() {
  const [open, setOpen] = useState<Set<string>>(new Set());
  function toggle(key: string) {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }
  return { open, toggle };
}

export function ProgrammeOverview() {
  const reduceMotion = useReducedMotion();
  const reveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 28 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.15 },
        transition: { duration: 0.75, ease },
      };

  const modulePanels = useOpenSet();
  const briefPanels = useOpenSet();

  return (
    <section id="programme-overview" className="programme-overview">
      <SectionRule />

      <motion.div className="pm-header po-header" {...reveal}>
        <ScrambleText className="pm-eyebrow" text="PROGRAMME OVERVIEW" />
        <h2>How it all fits together.</h2>
        <p>
          Three core modules, taken in any order, each with one document to produce. Then a shelf of
          option-specific work — screen &amp; audio, post production, or live arts — pulled whenever real
          production work matches, in any order, for as long as the programme runs.
        </p>
        <div className="po-cta-row">
          <MagneticCta href="/projects">
            Projects
            <i aria-hidden="true">{'↗︎'}</i>
          </MagneticCta>
          <MagneticCta href="/training">
            Training
            <i aria-hidden="true">{'↗︎'}</i>
          </MagneticCta>
        </div>
      </motion.div>

      <motion.div className="po-core" {...reveal}>
        <h3 className="po-subhead">Core modules</h3>
        <p className="po-options-intro po-core-intro">
          Embedded into the workplace, you will build a portfolio of work that is unique to you and your
          workplace. Reflecting and building off your projects and written up — no fixed order, no fixed
          timing. Click a brief for what it means in practice.
        </p>
        <div className="po-module-grid">
          {coreModules.map((module) => {
            const isOpen = modulePanels.open.has(module.id);
            const panelId = `po-module-panel-${module.id}`;
            return (
              <div className="po-module-card" key={module.id}>
                <span className="po-module-month">{module.month} &middot; {module.duration}</span>
                <h4>{module.name}</h4>
                <p className="po-module-overview">{module.summary}</p>

                <button
                  type="button"
                  className="po-card-toggle"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => modulePanels.toggle(module.id)}
                >
                  {isOpen ? 'Show less' : 'Training & piece of work'}
                  <span className="po-card-chevron" aria-hidden="true" />
                </button>

                <div className="po-card-panel-outer" data-open={isOpen || undefined}>
                  <div className="po-card-panel-clip">
                    <div className="po-card-panel" id={panelId} inert={!isOpen}>
                      <div className="po-module-training">
                        <span className="po-label">Training</span>
                        {module.trainingDays.map((trainingDay) => (
                          <div className="po-training-day" key={trainingDay.day}>
                            <p className="po-training-day-head">
                              <strong>{trainingDay.day}</strong> &mdash; {trainingDay.focus}
                            </p>
                            <ul>
                              {trainingDay.topics.map((topic) => (
                                <li key={topic}>{topic}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      <div className="po-module-work">
                        <span className="po-label">Piece of work</span>
                        <p className="po-module-work-title">{module.pieceOfWorkTitle}</p>
                        <p>{module.pieceOfWorkDescription}</p>
                        <ul className="po-pathway-pieces">
                          {module.pathwayPieceTitles.map((piece) => (
                            <li key={piece.optionId}>
                              <span>{optionNameById.get(piece.optionId)}</span>
                              <strong>{piece.title}</strong>
                            </li>
                          ))}
                        </ul>
                        <KsbChipRow ids={module.ksbIds} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      <CoreToOptionsConnector />

      <motion.div className="po-options" {...reveal}>
        <h3 className="po-subhead">Option-specific work</h3>
        <p className="po-options-intro">
          Once a real piece of production work matches one of the briefs below, it&rsquo;s pulled off the
          shelf and written up — no fixed order, no fixed timing. Click a brief for what it means in practice.
        </p>
        <div className="po-option-columns">
          {optionWork.map((option) => {
            const Icon = optionIcons[option.id];
            const allBriefs = [
              ...option.briefs,
              { title: option.flexName, summary: option.flexDescription, ksbIds: option.flexKsbIds, isFlexible: true as const },
            ];
            return (
              <div className="po-option-column" key={option.id}>
                <div className="po-option-head">
                  <span className="po-option-icon" aria-hidden="true">
                    <Icon size={22} strokeWidth={1.5} />
                  </span>
                  <h4>{option.name}</h4>
                </div>
                <div className="po-project-chain">
                  {allBriefs.map((brief) => {
                    const key = `${option.id}::${brief.title}`;
                    const isOpen = briefPanels.open.has(key);
                    return (
                      <button
                        type="button"
                        key={key}
                        className={brief.isFlexible ? 'po-project-card is-flexible' : 'po-project-card'}
                        aria-expanded={isOpen}
                        onClick={() => briefPanels.toggle(key)}
                      >
                        <span className="po-project-card-head">
                          <strong>{brief.title}</strong>
                          <span className="po-card-chevron" aria-hidden="true" />
                        </span>
                        <span className="po-card-panel-outer" data-open={isOpen || undefined}>
                          <span className="po-card-panel-clip">
                            <span className="po-card-panel" inert={!isOpen}>
                              {brief.summary}
                              <KsbChipRow ids={brief.ksbIds} />
                            </span>
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
