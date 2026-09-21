'use client';

import { motion, useReducedMotion } from 'motion/react';
import Image from 'next/image';

const ease = [0.22, 1, 0.36, 1] as const;

const COURSE_NAME = 'Production Manager Level 6';

// Employers named behind ST1483 in the occupational standard, credited as text
// rather than a co-brand logo lockup — this is a group of employers, not a single
// partner organisation the way the sibling VFX microsite has one.
const STANDARD_EMPLOYERS = 'Chichester Festival Theatre, BBC, Framestore, ITV, Sony, ScreenSkills';

type SocialLink = {
  label: string;
  handle: string;
  icon: 'instagram' | 'linkedin' | 'facebook' | 'x';
  href: string;
};

const creativeAllianceSocials: SocialLink[] = [
  {
    label: 'Instagram',
    handle: '@Creative_Alliance',
    icon: 'instagram',
    href: 'https://www.instagram.com/creative_alliance/',
  },
  {
    label: 'LinkedIn',
    handle: 'Creative Alliance',
    icon: 'linkedin',
    href: 'https://www.linkedin.com/company/west-midlands-creative-alliance/',
  },
  {
    label: 'Facebook',
    handle: '@CreativeAllianceUK',
    icon: 'facebook',
    href: 'https://www.facebook.com/CreativeAllianceUK/',
  },
  {
    label: 'X',
    handle: '@Create_Alliance',
    icon: 'x',
    href: 'https://x.com/Create_Alliance',
  },
];

function SocialIcon({ network }: { network: SocialLink['icon'] }) {
  if (network === 'instagram') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (network === 'linkedin') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="6" cy="6.5" r="1.25" fill="currentColor" stroke="none" />
        <path d="M6 10v8.5M10.5 18.5V10m0 3.7c.4-2.3 1.8-3.7 3.9-3.7 2.3 0 3.6 1.5 3.6 4.3v4.2" />
      </svg>
    );
  }

  if (network === 'facebook') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M14 21v-8h3l.45-3H14V8.35c0-1.45.58-2.35 2.4-2.35H18V3.25c-.7-.1-1.55-.2-2.55-.2-3.15 0-5.1 1.9-5.1 5.1V10H8v3h2.35v8H14Z"
          fill="currentColor"
          stroke="none"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 4 19 20M19 4 5 20" />
    </svg>
  );
}

function SocialLinks({
  organisation,
  links,
}: {
  organisation: string;
  links: SocialLink[];
}) {
  return (
    <nav className="site-footer-socials" aria-label={`${organisation} social media`}>
      {links.map((social) => (
        <a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          title={`${social.label} · ${social.handle}`}
          aria-label={`${organisation} on ${social.label}, ${social.handle} (opens in a new tab)`}
        >
          <SocialIcon network={social.icon} />
        </a>
      ))}
    </nav>
  );
}

export function SiteFooter() {
  const reduceMotion = useReducedMotion();
  const reveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 22 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.18 },
        transition: { duration: 0.65, ease },
      };

  return (
    <footer className="site-footer">
      <motion.div className="site-footer-heading" {...reveal}>
        <p>{COURSE_NAME}</p>
        <span>ST1483 · LEVEL 6</span>
      </motion.div>

      <div className="site-footer-partners">
        <motion.section className="site-footer-partner site-footer-partner-ca" aria-labelledby="footer-ca-heading" {...reveal}>
          <div className="site-footer-partner-brand">
            <Image
              src="/assets/creative-alliance.svg"
              width={62}
              height={62}
              alt=""
              className="site-footer-ca-logo"
            />
            <div>
              <span>TRAINING PROVIDER</span>
              <h2 id="footer-ca-heading">Creative Alliance</h2>
            </div>
          </div>

          <div className="site-footer-partner-body">
            <address>
              <span>LG1–LG2, Zellig</span>
              <span>Birmingham</span>
              <span>B9 4AT</span>
            </address>

            <div className="site-footer-contact">
              <a href="tel:+441217530049">0121 753 0049</a>
              <a href="mailto:info@creativealliance.org.uk">info@creativealliance.org.uk</a>
              <SocialLinks organisation="Creative Alliance" links={creativeAllianceSocials} />
            </div>
          </div>
        </motion.section>
      </div>

      <motion.div
        className="site-footer-credits"
        {...(reduceMotion ? {} : { ...reveal, transition: { duration: 0.65, delay: 0.08, ease } })}
      >
        <span>Standard developed with</span>
        <span>{STANDARD_EMPLOYERS}</span>
      </motion.div>
    </footer>
  );
}
