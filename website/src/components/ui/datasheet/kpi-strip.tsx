"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import type { DatasheetKpi } from "./types";

interface KpiStripProps {
  kpis: DatasheetKpi[];
}

export function KpiStrip({ kpis }: KpiStripProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative py-20 print:py-8 print:break-inside-avoid border-y border-white/5"
    >
      <div className="mx-auto max-w-5xl px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-10 print:grid-cols-4 print:gap-x-6">
          {kpis.map((k, i) => (
            <KpiTile key={`${k.label}-${i}`} kpi={k} animate={inView} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface KpiTileProps {
  kpi: DatasheetKpi;
  animate: boolean;
  delay: number;
}

function KpiTile({ kpi, animate, delay }: KpiTileProps) {
  const reduced = useReducedMotion();
  const numericTarget = parseNumeric(kpi.value);
  const [display, setDisplay] = useState<string>(
    reduced || numericTarget === null ? kpi.value : "0",
  );

  useEffect(() => {
    if (!animate) return;
    if (reduced || numericTarget === null) {
      setDisplay(kpi.value);
      return;
    }
    const duration = 900;
    const start = performance.now();
    let raf = 0;

    function tick(now: number) {
      const elapsed = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - elapsed, 3);
      const current = Math.round((numericTarget ?? 0) * eased);
      setDisplay(formatNumeric(current, kpi.value));
      if (elapsed < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setDisplay(kpi.value);
      }
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [animate, kpi.value, numericTarget, reduced]);

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 8 }}
      animate={animate ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className="break-inside-avoid"
    >
      <div className="text-[10px] font-mono tracking-[0.22em] uppercase text-(--color-text-muted) mb-3">
        {kpi.label}
      </div>
      <div className="flex items-baseline gap-1 mb-2">
        <span className="text-4xl lg:text-5xl font-mono font-semibold tracking-tight text-white print:text-[26pt]">
          {display}
        </span>
        {kpi.suffix && (
          <span className="text-xl font-mono font-medium text-(--color-brand-accent) print:text-[14pt]">
            {kpi.suffix}
          </span>
        )}
      </div>
      <div className="text-xs font-light text-(--color-text-muted) leading-relaxed">
        {kpi.detail}
      </div>
    </motion.div>
  );
}

function parseNumeric(raw: string): number | null {
  if (!raw) return null;
  if (/^\d+M$/.test(raw)) return null;
  const cleaned = raw.replace(/\./g, "").replace(/,/g, "");
  const n = parseInt(cleaned, 10);
  if (Number.isNaN(n)) return null;
  return n;
}

function formatNumeric(n: number, source: string): string {
  if (source.includes(".")) {
    return n.toLocaleString("tr-TR");
  }
  return String(n);
}
