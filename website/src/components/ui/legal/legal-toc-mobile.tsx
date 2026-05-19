"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { ChevronDown, ListOrdered } from "lucide-react";
import { getAccent } from "../datasheet/accents";
import { useActiveSection } from "./use-active-section";
import type { LegalSection } from "./types";

interface LegalTocMobileProps {
  sections: LegalSection[];
}

export function LegalTocMobile({ sections }: LegalTocMobileProps) {
  const ids = useMemo(() => sections.map((s) => s.id), [sections]);
  const active = useActiveSection({ ids });
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);

  // Close panel when active section changes via scroll.
  useEffect(() => {
    if (!open) return;
    setOpen(false);
    // We only react to active changes, not toggle.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const activeSection = sections.find((s) => s.id === active) ?? sections[0];
  const activeIndex = sections.findIndex((s) => s.id === activeSection?.id);
  const activeAccent = getAccent(activeSection?.accent);
  const activeNumber = String(
    (activeIndex >= 0 ? activeIndex : 0) + 1,
  ).padStart(2, "0");

  const panelTransition = reduced
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 320, damping: 30 };

  return (
    <div className="xl:hidden sticky top-20 z-40 print:hidden">
      <div className="rounded-2xl bg-white/2 border border-white/10 backdrop-blur-xl overflow-hidden">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-controls="legal-toc-mobile-panel"
          className="w-full flex items-center gap-3 px-4 py-3 text-left cursor-pointer"
        >
          <span
            aria-hidden="true"
            className="shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-md"
            style={{
              background: activeAccent.alpha10,
              color: activeAccent.light,
            }}
          >
            <ListOrdered className="w-3.5 h-3.5" strokeWidth={1.75} />
          </span>
          <span className="flex-1 min-w-0 flex items-center gap-2">
            <span
              lang="en"
              className="text-[10px] font-mono font-semibold tracking-[0.2em]"
              style={{ color: activeAccent.light }}
            >
              BÖLÜM {activeNumber}
            </span>
            <span className="text-white/30 text-xs">/</span>
            <span className="truncate text-sm font-medium text-white">
              {activeSection?.title ?? "İçindekiler"}
            </span>
          </span>
          <ChevronDown
            className="shrink-0 w-4 h-4 text-(--color-text-muted) transition-transform"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
            strokeWidth={1.75}
            aria-hidden="true"
          />
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id="legal-toc-mobile-panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={panelTransition}
              className="overflow-hidden border-t border-white/10"
            >
              <ol className="max-h-[60vh] overflow-y-auto p-3 space-y-1">
                {sections.map((section, i) => {
                  const isActive = active === section.id;
                  const accent = getAccent(section.accent);
                  const number = String(i + 1).padStart(2, "0");
                  return (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        aria-current={isActive ? "location" : undefined}
                        className="flex items-start gap-3 px-3 py-2 rounded-lg transition-colors cursor-pointer"
                        style={{
                          background: isActive
                            ? accent.alpha10
                            : "transparent",
                          borderLeft: `2px solid ${
                            isActive ? accent.base : "transparent"
                          }`,
                          color: isActive
                            ? "var(--color-text-primary)"
                            : "var(--color-text-secondary)",
                        }}
                      >
                        <span
                          className="shrink-0 inline-flex items-center justify-center w-5 h-5 rounded font-mono text-[9px] font-semibold mt-0.5"
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
                        <span className="text-xs leading-snug font-medium tracking-tight">
                          {section.title}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ol>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
