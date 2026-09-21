'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useRef, useState } from 'react';
import { Counter } from '@/components/counter';
import { coreModules } from '@/lib/programme-overview-data';

const ease = [0.22, 1, 0.36, 1] as const;

export function TrainingBrowser() {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  // Click peels the panel open and reveals the full day-by-day breakdown. Clicking
  // the active module again collapses it; clicking another switches straight to
  // its breakdown.
  const [expanded, setExpanded] = useState(false);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const panelRef = useRef<HTMLDivElement>(null);
  const active = coreModules[activeIndex];

  function preview(index: number) {
    if (expanded) return;
    setActiveIndex(index);
  }

  function revealPanel() {
    if (typeof window === 'undefined' || window.innerWidth > 760) return;
    requestAnimationFrame(() =>
      panelRef.current?.scrollIntoView({
        behavior: reduceMotion ? 'auto' : 'smooth',
        block: 'start',
      }),
    );
  }

  function selectOrToggle(index: number) {
    if (index === activeIndex) {
      setExpanded((v) => {
        if (!v) revealPanel();
        return !v;
      });
    } else {
      setActiveIndex(index);
      setExpanded(true);
      revealPanel();
    }
  }

  function onKeyDown(event: React.KeyboardEvent, index: number) {
    const destinations: Record<string, number> = {
      ArrowDown: index + 1,
      ArrowRight: index + 1,
      ArrowUp: index - 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: coreModules.length - 1,
    };
    const requested = destinations[event.key];
    if (requested === undefined) return;

    event.preventDefault();
    const next = (requested + coreModules.length) % coreModules.length;
    setActiveIndex(next);
    buttonRefs.current[next]?.focus();
  }

  return (
    <section className="training-page-content" aria-labelledby="training-modules-heading">
      <h2 id="training-modules-heading" className="sr-only">
        Core training modules
      </h2>
      <div className="pathway-system training-page-system">
        <div className="pathway-header">
          <span>MODULE SELECTOR</span>
          <span><Counter value={coreModules.length} pad={2} /> MODULES &middot; ANY ORDER</span>
          <span>CLICK TO OPEN</span>
        </div>

        <div className="pathway-list training-page-list" role="tablist" aria-label="Core modules" aria-orientation="vertical">
          {coreModules.map((module, index) => {
            const isActive = activeIndex === index;
            return (
              <motion.button
                ref={(node) => {
                  buttonRefs.current[index] = node;
                }}
                id={`training-tab-${module.id}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-expanded={isActive && expanded}
                aria-controls="training-section-panel"
                tabIndex={isActive ? 0 : -1}
                key={module.id}
                className={isActive ? 'is-active' : ''}
                onMouseEnter={() => preview(index)}
                onFocus={() => preview(index)}
                onClick={() => selectOrToggle(index)}
                onKeyDown={(event) => onKeyDown(event, index)}
                {...(reduceMotion
                  ? {}
                  : {
                      initial: { opacity: 0, x: -24 },
                      whileInView: { opacity: 1, x: 0 },
                      viewport: { once: true, amount: 0.55 },
                      transition: { duration: 0.55, delay: index * 0.06, ease },
                    })}
              >
                <span className="pathway-number">{module.month.slice(0, 3).toUpperCase()}</span>
                <span className="pathway-name">
                  {module.name}
                  <strong>{module.duration}</strong>
                </span>
                <span className="pathway-arrow" aria-hidden="true">
                  {'↗︎'}
                </span>
              </motion.button>
            );
          })}
        </div>

        <div
          id="training-section-panel"
          ref={panelRef}
          className={`pathway-visual training-page-visual${expanded ? ' is-expanded' : ''}`}
          role="tabpanel"
          aria-labelledby={`training-tab-${active.id}`}
          tabIndex={0}
        >
          <div className="pathway-frame training-page-frame" aria-hidden={expanded || undefined}>
            <div className="pathway-frame-inner">
              <AnimatePresence mode="wait">
                <motion.img
                  key={active.image}
                  src={active.image}
                  alt={active.imageAlt}
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
                key={active.id}
                className="pathway-ghost"
                aria-hidden="true"
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 0.1, y: 0 }}
                exit={reduceMotion ? {} : { opacity: 0, y: -24 }}
                transition={{ duration: 0.5, ease }}
              >
                {active.month.slice(0, 3).toUpperCase()}
              </motion.span>
            </AnimatePresence>
            <div className="visual-index">
              <span>MODULE</span>
              <strong>{active.duration}</strong>
              <i />
            </div>
            <div className="visual-coordinates" aria-hidden="true">
              <span>
                <i>CREATIVE ALLIANCE</i>52.4862° N&nbsp;&nbsp;/&nbsp;&nbsp;1.8904° W
              </span>
            </div>
            <div className="frame-corners" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>

          <div className="pathway-detail training-page-detail">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? {} : { opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease }}
              >
                <span className="detail-eyebrow">
                  {active.month.toUpperCase()} &middot; {active.duration.toUpperCase()}
                </span>
                <h3>{active.name}</h3>
                <p>{active.summary}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="training-breakdown-wrap">
            <div className="training-breakdown" inert={!expanded}>
              <motion.div
                key={active.id}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease }}
              >
                <p className="tb-label">Training</p>
                {active.trainingDays.map((trainingDay) => (
                  <div className="tb-day" key={trainingDay.day}>
                    <p className="tb-day-head">
                      <strong>{trainingDay.day}</strong> &mdash; {trainingDay.focus}
                    </p>
                    <ul className="tb-covers">
                      {trainingDay.topics.map((topic) => (
                        <li key={topic}>{topic}</li>
                      ))}
                    </ul>
                  </div>
                ))}

                <p className="tb-label">Piece of work</p>
                <p className="tb-work-title">{active.pieceOfWorkTitle}</p>
                <p className="pb-lead">{active.pieceOfWorkDescription}</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
