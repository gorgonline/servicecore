"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Fragment } from "react";
import PrivacyContact from "../privacy-contact";
import { BackToTop } from "./back-to-top";
import { LegalFooterMeta } from "./legal-footer-meta";
import { LegalHero } from "./legal-hero";
import { LegalSection } from "./legal-section";
import { LegalToc } from "./legal-toc";
import { LegalTocMobile } from "./legal-toc-mobile";
import { runtimeTokens } from "@/lib/tokens";
import type { LegalDocumentData } from "./types";

interface LegalDocumentProps {
  data: LegalDocumentData;
}

export function LegalDocument({ data }: LegalDocumentProps) {
  const reduced = useReducedMotion();
  const { meta, intro, sections } = data;
  const firstChar = intro.charAt(0);
  const restOfIntro = intro.slice(1);

  return (
    <main className="relative min-h-screen bg-(--color-surface-base) text-white overflow-hidden">
      {/* Global background glows (start after hero) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[80vh] -left-32 w-150 h-150 rounded-full"
        style={{
          background: `radial-gradient(circle, ${runtimeTokens.colors.brand.purple}1A, transparent 70%)`,
          filter: "blur(150px)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[160vh] -right-32 w-150 h-150 rounded-full"
        style={{
          background: `radial-gradient(circle, ${runtimeTokens.colors.accent.blueBase}1A, transparent 70%)`,
          filter: "blur(150px)",
        }}
      />

      <LegalHero meta={meta} />

      <div className="relative max-w-295 mx-auto px-6 lg:px-8 py-20 lg:py-24">
        <LegalTocMobile sections={sections} />

        <div className="mt-8 xl:mt-0 xl:grid xl:grid-cols-[260px_1fr] xl:gap-x-16">
          <LegalToc sections={sections} />

          <div className="min-w-0">
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 20 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
              transition={{ type: "spring", stiffness: 240, damping: 28 }}
              className="mb-20"
            >
              <p className="max-w-prose text-[17px] md:text-lg font-light leading-[1.8] text-(--color-text-secondary) italic">
                <span
                  className="float-left mr-3 mt-1 text-[3.25rem] leading-[0.85] font-semibold not-italic text-white"
                  style={{
                    fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                  }}
                  aria-hidden="true"
                >
                  {firstChar}
                </span>
                <span className="sr-only">{firstChar}</span>
                {restOfIntro}
              </p>
            </motion.div>

            <div className="space-y-20 lg:space-y-24">
              {sections.map((section, index) => (
                <Fragment key={section.id}>
                  <LegalSection section={section} index={index} />
                </Fragment>
              ))}
            </div>

            <LegalFooterMeta meta={meta} />
          </div>
        </div>
      </div>

      <PrivacyContact />
      <BackToTop />
    </main>
  );
}
