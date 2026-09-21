'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import type { RefObject } from 'react';
import { useRef, useState } from 'react';
import { projectCategories } from '@/lib/project-data';

const ease = [0.22, 1, 0.36, 1] as const;

function moveFocus(
  event: React.KeyboardEvent,
  index: number,
  length: number,
  select: (index: number) => void,
  refs: RefObject<(HTMLButtonElement | null)[]>,
) {
  const targets: Record<string, number> = {
    ArrowRight: index + 1,
    ArrowLeft: index - 1,
    Home: 0,
    End: length - 1,
  };
  const requested = targets[event.key];
  if (requested === undefined) return;

  event.preventDefault();
  const next = (requested + length) % length;
  select(next);
  refs.current[next]?.focus();
  refs.current[next]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
}

export function ProjectsBrowser() {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = projectCategories[activeIndex];
  const panelId = `project-panel-${active.id}`;

  return (
    <section className="projects-browser" aria-labelledby="projects-browser-heading">
      <h2 id="projects-browser-heading" className="sr-only">
        Apprenticeship projects
      </h2>

      <div className="project-tabs-meta" aria-hidden="true">
        <span>PROJECT INDEX</span>
        <span>CORE PIECES OF WORK &middot; OPTION-SPECIFIC SHELF</span>
      </div>

      <div className="project-tabs-wrap">
        <div className="project-tab-list" role="tablist" aria-label="Choose a category">
          {projectCategories.map((category, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={category.id}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                id={`project-tab-${category.id}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={panelId}
                tabIndex={isActive ? 0 : -1}
                className={isActive ? 'is-active' : undefined}
                onClick={() => setActiveIndex(index)}
                onKeyDown={(event) =>
                  moveFocus(event, index, projectCategories.length, setActiveIndex, tabRefs)
                }
              >
                <span className="project-tab-number">{category.number}</span>
                {isActive && <span className="project-tab-label">{category.label}</span>}
              </button>
            );
          })}
        </div>
      </div>

      <div
        id={panelId}
        className="project-category-panel"
        role="tabpanel"
        aria-labelledby={`project-tab-${active.id}`}
        tabIndex={0}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.id}
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: reduceMotion ? 0 : 0.4, ease }}
          >
            <div className="project-category-heading">
              <span className="project-category-eyebrow">{active.label}</span>
              <p className="project-category-intro">{active.intro}</p>
            </div>

            <ul className="project-item-list">
              {active.items.map((item) => (
                <li key={item.id} className={item.isFlexible ? 'project-item is-flexible' : 'project-item'}>
                  <span className="project-item-number">{item.number}</span>
                  <div className="project-item-body">
                    <strong>{item.title}</strong>
                    {item.meta && <em>{item.meta}</em>}
                    <span>{item.description}</span>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
