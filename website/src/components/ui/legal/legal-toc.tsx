"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";
import { getAccent } from "../datasheet/accents";
import { useActiveSection } from "./use-active-section";
import type { LegalSection } from "./types";

interface LegalTocProps {
  sections: LegalSection[];
}

export function LegalToc({ sections }: LegalTocProps) {
  const ids = useMemo(() => sections.map((s) => s.id), [sections]);
  const active = useActiveSection({ ids });
  const reduced = useReducedMotion();

  return (
    <aside
      aria-label="Doküman içindekiler"
      className="hidden xl:block sticky top-28 self-start w-65 print:hidden"
    >
      <div className="rounded-2xl bg-white/2 border border-white/10 backdrop-blur-xl p-5 max-h-[70vh] overflow-y-auto">
        <div className="text-[10px] font-mono font-semibold tracking-[0.22em] text-(--color-text-muted) mb-4">
          İÇİNDEKİLER
        </div>
        <ol className="space-y-1 relative">
          {sections.map((section, i) => {
            const isActive = active === section.id;
            const accent = getAccent(section.accent);
            const number = String(i + 1).padStart(2, "0");
            return (
              <li key={section.id} className="relative">
                {isActive && !reduced && (
                  <motion.span
                    layoutId="legal-toc-active-pill"
                    className="absolute inset-0 rounded-lg"
                    style={{
                      background: accent.alpha10,
                      borderLeft: `2px solid ${accent.base}`,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 320,
                      damping: 28,
                    }}
                  />
                )}
                {isActive && reduced && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-lg"
                    style={{
                      background: accent.alpha10,
                      borderLeft: `2px solid ${accent.base}`,
                    }}
                  />
                )}
                <a
                  href={`#${section.id}`}
                  aria-current={isActive ? "location" : undefined}
                  className="relative flex items-start gap-3 px-3 py-2 rounded-lg text-xs leading-snug transition-colors cursor-pointer"
                  style={{
                    color: isActive
                      ? "var(--color-text-primary)"
                      : "var(--color-text-secondary)",
                  }}
                >
                  <span
                    className="shrink-0 inline-flex items-center justify-center w-5 h-5 rounded font-mono text-[9px] font-semibold mt-0.5 transition-colors"
                    style={{
                      background: isActive
                        ? accent.alpha30
                        : "rgba(255,255,255,0.05)",
                      color: isActive
                        ? "white"
                        : "var(--color-text-overline)",
                    }}
                  >
                    {number}
                  </span>
                  <span className="font-medium tracking-tight">
                    {section.title}
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </aside>
  );
}
