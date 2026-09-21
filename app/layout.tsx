import type { Metadata } from 'next';
import '@fontsource/nunito/300.css';
import '@fontsource/nunito/400.css';
import '@fontsource/nunito/500.css';
import '@fontsource/nunito/700.css';
import '@fontsource/oswald/300.css';
import '@fontsource/oswald/400.css';
import '@fontsource/oswald/500.css';
import { PageTransition } from '@/components/page-transition';
import { SiteIntro } from '@/components/site-intro';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import './globals.css';

// Resolves to a real deployed URL automatically on Vercel (VERCEL_URL is set at
// build time for every deployment); set NEXT_PUBLIC_SITE_URL once a custom
// domain is attached, and it'll take precedence over the Vercel-assigned one.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Production Manager Level 6 | Creative Alliance',
  description:
    'The programme home for the Level 6 Creative Industries Production Manager apprenticeship (ST1483) — pathways, projects, training and assessment.',
  openGraph: {
    title: 'Production Manager Level 6',
    description: 'Build production craft. Develop a specialism. Progress towards assessment.',
    images: ['/assets/creative-alliance.svg'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SiteIntro />
        <SiteHeader />
        <PageTransition>{children}</PageTransition>
        <SiteFooter />
      </body>
    </html>
  );
}
