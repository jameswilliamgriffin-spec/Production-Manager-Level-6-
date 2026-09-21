'use client';

import { MeshGradient } from '@paper-design/shaders-react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useEffect, useState } from 'react';
import { HeroDotField } from '@/components/hero-dot-field';
import { isIntroDone, subscribeIntro } from '@/lib/intro-state';

const ease = [0.22, 1, 0.36, 1] as const;

// Ink keeps most of the field dark so the plate and headline stay dominant.
// Creative Alliance orange leads the colour, a deeper amber gives it falloff,
// and the sky blue keeps it tied to the brand.
const shaderColors = ['#0a0f0f', '#f78f21', '#f9a83f', '#b85a14', '#8bb1ca'];

export function Hero() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const imageY = useTransform(scrollYProgress, [0, 0.32], ['0%', reduceMotion ? '0%' : '10%']);

  // Hold the entrance until the opening overlay has lifted, so the title lines
  // don't rise behind it. Reduced motion (and any missed signal) settles at once.
  const [entered, setEntered] = useState(() => isIntroDone());
  useEffect(() => {
    if (reduceMotion) {
      setEntered(true);
      return;
    }
    const unsubscribe = subscribeIntro(() => setEntered(true));
    const safety = window.setTimeout(() => setEntered(true), 4200);
    return () => {
      unsubscribe();
      window.clearTimeout(safety);
    };
  }, [reduceMotion]);

  const go = reduceMotion || entered;

  return (
    <section id="top" className="hero">
      <motion.div
        className="hero-image-wrap"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1, ease }}
      >
        <MeshGradient
          className="hero-shader"
          colors={shaderColors}
          distortion={0.9}
          swirl={0.7}
          grainMixer={0.3}
          grainOverlay={0.15}
          speed={reduceMotion ? 0 : 0.8}
          frame={reduceMotion ? 8000 : 0}
          maxPixelCount={1600 * 900}
        />
        <motion.img
          style={{ y: imageY }}
          src="/images/hero-production-office.webp"
          alt="A production office mid-shift — schedules on the wall, a team at multi-monitor workstations"
        />
        <div className="image-grade" aria-hidden="true" />
      </motion.div>

      <HeroDotField />

      <div className="hero-content">
        <motion.h1 className="hero-title">
          {['Production Manager', 'Level 6.'].map((line, index) => (
            <span className="title-line" key={line}>
              <motion.span
                initial={reduceMotion ? false : { y: '110%' }}
                animate={{ y: go ? 0 : '110%' }}
                transition={{ duration: 0.85, delay: go ? 0.12 + index * 0.1 : 0, ease }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <motion.div
          className="hero-intro"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: go ? 1 : 0, y: go ? 0 : 18 }}
          transition={{ duration: 0.7, delay: go ? 0.5 : 0, ease }}
        >
          <p>
            An 18-month production-led programme for emerging production managers across screen &amp; audio,
            post production and live arts — combining workplace practice, structured training and
            preparation for assessment.
          </p>
          <p className="collaboration-line">Delivered by Creative Alliance.</p>
        </motion.div>
      </div>
    </section>
  );
}
