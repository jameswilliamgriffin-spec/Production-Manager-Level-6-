import { FileText } from 'lucide-react';
import type { Metadata } from 'next';
import { PageHero } from '@/components/page-hero';
import { RevealArticle, RevealListItem, ScrollReveal } from '@/components/motion-primitives';
import { ScrambleText } from '@/components/scramble-text';
import {
  ASSESSMENT_REF,
  assessmentStages,
  confirmedMethods,
  gradingNote,
  performanceDescriptorCategories,
  workingAssumption,
} from '@/lib/assessment-data';

export const metadata: Metadata = {
  title: 'Assessment | Production Manager Level 6',
  description:
    'How assessment works on the Level 6 Creative Industries Production Manager apprenticeship — the reform behind ST1483, the Assessment Outcomes, and the methods available.',
};

export default function EpaPage() {
  return (
    <main>
      <PageHero
        eyebrow="THE REFORM"
        title="Assessment"
        copy={<>ST1483 is a &ldquo;new model&rdquo; standard, built from the ground up under Skills England&rsquo;s post-2025 assessment reform. There is no single end-point gateway: assessment can happen at any appropriate point in the programme, done by an independent assessor from an approved Assessment Organisation — not by your employer or your training provider.</>}
        meta={<>Apprenticeship Assessment Plan {ASSESSMENT_REF}</>}
        image="/images/hero-professional-discussion.webp"
        imageAlt="Two colleagues in a professional discussion over a laptop"
      />

      <div className="ksb-bar">
        <div className="ksb-bar-inner epa-bar-inner">
          <nav className="ksb-jump" aria-label="Sections on this page">
            <a href="#how-it-works">How it works</a>
            <a href="#methods">Assessment methods</a>
            <a href="#grading">Grading</a>
          </nav>
          <p className="ksb-count">12 Assessment Outcomes · behaviours verified separately</p>
        </div>
      </div>

      <section
        id="how-it-works"
        className="ksb-section"
        aria-labelledby="how-it-works-heading"
      >
        <ScrollReveal className="ksb-section-head">
          <ScrambleText className="ksb-eyebrow" text="THE SHAPE OF IT" />
          <h2 id="how-it-works-heading">How it works</h2>
          <p>
            The old &ldquo;end-point&rdquo; framing is deliberately removed from this standard.
            You build evidence against the 12 Assessment Outcomes throughout the
            programme, and formal assessment can be completed once you and your
            employer agree you are ready — not only in a single closing window.
          </p>
        </ScrollReveal>
        <ol className="epa-stages">
          {assessmentStages.map((stage, index) => (
            <RevealListItem key={stage.number} className="epa-stage" delay={index * 0.07}>
              <span className="epa-stage-number">{stage.number}</span>
              <div>
                <span className="epa-stage-duration">{stage.duration}</span>
                <h3>{stage.title}</h3>
                <p>{stage.text}</p>
              </div>
            </RevealListItem>
          ))}
        </ol>
      </section>

      <section
        id="methods"
        className="ksb-section"
        aria-labelledby="methods-heading"
      >
        <ScrollReveal className="ksb-section-head">
          <ScrambleText className="ksb-eyebrow" text="WHAT YOU CAN BE ASSESSED BY" />
          <h2 id="methods-heading">Assessment methods</h2>
          <p>
            At least one project must be part of your assessment. Beyond that, the
            AAP allows the Assessment Organisation to draw on any of the methods
            below, provided every Assessment Outcome is covered in full — there is
            no official split telling you which method covers which outcome.
          </p>
        </ScrollReveal>

        {confirmedMethods.map((method, index) => (
          <RevealArticle key={method.id} id={method.id} className="epa-method epa-method-full" delay={index * 0.06}>
            <div className="epa-method-body">
              <span className={method.required ? 'epa-method-tag' : 'epa-method-tag is-optional'}>
                {method.required ? 'Mandatory' : 'Available'}
              </span>
              <h3>{method.title}</h3>
              <p className="epa-method-summary">{method.text}</p>
            </div>
          </RevealArticle>
        ))}

        <ScrollReveal className="epa-assumption">
          <span className="epa-assumption-status">{workingAssumption.status}</span>
          <h3>{workingAssumption.heading}</h3>
          {workingAssumption.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
          <a
            className="epa-proposal-download"
            href="/documents/pm-aim-apprenticeship-assessment-stakeholder-proposal.docx"
            download
          >
            <span className="epa-proposal-download-icon" aria-hidden="true">
              <FileText size={26} strokeWidth={1.4} />
            </span>
            <span className="epa-proposal-download-text">
              <strong>Read AIM&rsquo;s full stakeholder proposal</strong>
              <span>Apprenticeship Assessment Stakeholder Proposal Form · original document · .docx</span>
            </span>
            <span className="epa-proposal-download-arrow" aria-hidden="true">{'↓'}</span>
          </a>
        </ScrollReveal>
      </section>

      <section
        id="grading"
        className="ksb-section"
        aria-labelledby="grading-heading"
      >
        <ScrollReveal className="ksb-section-head">
          <ScrambleText className="ksb-eyebrow" text="HOW THE RESULT IS DECIDED" />
          <h2 id="grading-heading">Grading</h2>
          <p>
            Every Assessment Outcome is graded against six performance-descriptor
            categories, each with its own Pass and Distinction standard. The full
            descriptor wording sits in the AAP itself — reproduced here as
            categories only, not paraphrased.
          </p>
        </ScrollReveal>

        <div className="epa-descriptor-grid">
          {performanceDescriptorCategories.map((category) => (
            <div key={category} className="epa-descriptor-item">
              <i aria-hidden="true">{'—'}</i>
              {category}
            </div>
          ))}
        </div>

        <ScrollReveal>
          <h3 className="epa-subheading">Overall grade</h3>
          <p className="epa-grading-note">{gradingNote}</p>
        </ScrollReveal>
      </section>
    </main>
  );
}
