'use client';

import { motion, useReducedMotion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'OVERVIEW', href: '/#programme-overview' },
  { label: "KSB'S", href: '/ksbs' },
  { label: 'PROJECTS', href: '/projects' },
  { label: 'TRAINING', href: '/training' },
  { label: 'ASSESSMENT', href: '/assessment' },
  { label: 'TRAINING PLAN', href: '/training-plan' },
];

export function SiteHeader() {
  const reduceMotion = useReducedMotion();
  const pathname = usePathname();

  return (
    <motion.header className="site-header" initial={reduceMotion ? false : { y: -72 }} animate={{ y: 0 }} transition={{ duration: 0.56, ease: [0.22, 1, 0.36, 1] }}>
      <Link className="brand-lockup" href="/" aria-label="Production Manager home">
        <Image className="creative-alliance-mark" src="/assets/creative-alliance.svg" width={38} height={38} alt="" priority />
        <span className="brand-wordmark">
          <strong>Creative Alliance</strong>
          <em>Production Manager &middot; ST1483</em>
        </span>
      </Link>
      <nav className="main-nav" aria-label="Main navigation">
        {navItems.map((item) => {
          const active = pathname === item.href.split('#')[0];
          return (
            <Link
              key={item.label}
              href={item.href}
              className={active ? 'is-active' : undefined}
              aria-current={active ? 'page' : undefined}
            >
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </motion.header>
  );
}
