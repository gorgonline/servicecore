"use client";

import { useEffect, useState } from "react";
import { getAccent } from "./accents";
import type { DatasheetModule } from "./types";

interface StickyTocProps {
  modules: DatasheetModule[];
}

export function StickyToc({ modules }: StickyTocProps) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActive(visible[0].target.id);
        }
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    modules.forEach((m) => {
      const el = document.getElementById(m.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [modules]);

  return (
    <aside
      aria-label="Modül listesi"
      className="hidden xl:block fixed top-32 right-6 w-72 z-30 print:hidden"
    >
      <div className="rounded-2xl bg-white/3 border border-white/10 backdrop-blur-xl p-5 max-h-[70vh] overflow-y-auto">
        <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-(--color-text-muted) mb-4">
          İçindekiler
        </div>
        <ol className="space-y-1">
          {modules.map((m, i) => {
            const isActive = active === m.id;
            const accent = getAccent(m.accent);
            return (
              <li key={m.id}>
                <a
                  href={`#${m.id}`}
                  aria-current={isActive ? "location" : undefined}
                  className="group flex items-start gap-3 px-3 py-2 rounded-lg text-xs leading-snug transition-all"
                  style={{
                    background: isActive ? accent.alpha10 : "transparent",
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
                      background: isActive ? accent.alpha30 : "rgba(255,255,255,0.05)",
                      color: isActive ? "white" : "var(--color-text-overline)",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-medium tracking-tight truncate">
                    {m.title_tr || m.title}
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
