"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, MinusCircle, AlertCircle } from "lucide-react";
import { En } from "@/components/ui/En";
import data from "@/data/jira-karsilastirma.json";

type CellStatus = "available" | "partial" | "unavailable";

interface ComparisonCell {
  status: CellStatus;
  note: string;
}

interface ComparisonRow {
  feature: string;
  category: string;
  jira: ComparisonCell;
  servicecore: ComparisonCell;
}

const statusConfig: Record<
  CellStatus,
  {
    Icon: typeof CheckCircle2;
    label: string;
    tone: string;
    bg: string;
    iconColor: string;
  }
> = {
  available: {
    Icon: CheckCircle2,
    label: "Var",
    tone: "text-(--color-accent-emerald-light)",
    bg: "bg-emerald-500/10 border-emerald-500/20",
    iconColor: "text-(--color-accent-emerald-light)",
  },
  partial: {
    Icon: AlertCircle,
    label: "Kısmi",
    tone: "text-amber-300",
    bg: "bg-amber-500/10 border-amber-500/20",
    iconColor: "text-amber-300",
  },
  unavailable: {
    Icon: MinusCircle,
    label: "Yok",
    tone: "text-(--color-accent-red-light)",
    bg: "bg-red-500/10 border-red-500/20",
    iconColor: "text-(--color-accent-red-light)",
  },
};

function StatusCell({ cell, isHero }: { cell: ComparisonCell; isHero: boolean }) {
  const cfg = statusConfig[cell.status];
  const Icon = cfg.Icon;
  return (
    <div
      className={`flex flex-col items-center gap-2 text-center ${
        isHero ? "" : ""
      }`}
    >
      <div
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${cfg.bg}`}
      >
        <Icon className={`w-3.5 h-3.5 ${cfg.iconColor}`} />
        <span className={`text-[10px] font-bold uppercase tracking-wider ${cfg.tone}`}>
          {cfg.label}
        </span>
      </div>
      <span className="text-xs text-(--color-text-secondary) font-light leading-snug max-w-xs">
        {cell.note}
      </span>
    </div>
  );
}

export function JiraComparisonTable() {
  const reduceMotion = useReducedMotion();
  const { id, badge, subtitle, headers, legend, rows, summary } = data.comparison;
  const typedRows = rows as ComparisonRow[];

  return (
    <section
      id={id}
      className="relative w-full py-24 lg:py-32 overflow-hidden bg-(--color-surface-base-dark)"
    >
      {/* Ambience */}
      <div className="absolute top-0 inset-x-0 h-px w-full bg-linear-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-100 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-(--color-brand-primary)/10 via-transparent to-transparent pointer-events-none blur-[100px]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-(--color-accent-blue-light) text-xs font-black tracking-widest uppercase mb-6 shadow-inner">
            {badge}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            <En>Jira</En>{" "}
            <span className="text-(--color-text-muted) font-light">vs</span>{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-(--color-brand-primary) to-(--color-accent-cyan-light)">
              ServiceCore
            </span>
          </h2>
          <p className="text-base md:text-lg text-(--color-text-secondary) font-light leading-relaxed">
            {subtitle}
          </p>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-10"
        >
          {legend.map((item, i) => {
            const cfg = statusConfig[item.symbol as CellStatus];
            const Icon = cfg.Icon;
            return (
              <div
                key={i}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${cfg.bg}`}
              >
                <Icon className={`w-3.5 h-3.5 ${cfg.iconColor}`} />
                <span className="text-xs text-(--color-text-overline) font-medium">
                  {item.label}
                </span>
              </div>
            );
          })}
        </motion.div>

        {/* Table (desktop) */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="hidden md:block w-full"
        >
          <div className="w-full rounded-2xl border border-white/10 bg-white/2 backdrop-blur-xl overflow-hidden relative shadow-2xl">
            {/* Header row */}
            <div className="grid grid-cols-[1.4fr_1fr_1fr] border-b border-white/10 bg-(--color-surface-elevated-dark)/80 backdrop-blur-md sticky top-0 z-20">
              <div className="p-5 lg:p-6 flex items-end border-r border-white/5 bg-(--color-surface-elevated-dark)">
                <h3 className="text-xs lg:text-sm font-semibold text-(--color-text-secondary) uppercase tracking-widest">
                  {headers[0]}
                </h3>
              </div>
              <div className="p-5 lg:p-6 flex flex-col items-center justify-end text-center border-r border-white/5 relative">
                <span className="text-[10px] font-bold tracking-widest uppercase text-(--color-text-muted) mb-2">
                  Atlassian
                </span>
                <h3 className="text-lg lg:text-xl font-bold text-(--color-text-overline)">
                  <En>Jira</En>
                </h3>
              </div>
              <div className="p-5 lg:p-6 flex flex-col items-center justify-end text-center relative bg-linear-to-t from-(--color-brand-primary)/12 to-transparent">
                <div className="absolute top-0 inset-x-0 h-1 bg-linear-to-r from-(--color-brand-primary) to-(--color-accent-cyan-light) shadow-[0_0_15px_rgba(0,112,243,0.5)]" />
                <span className="text-[10px] font-bold tracking-widest uppercase text-(--color-accent-cyan-light) mb-2">
                  Önerilen
                </span>
                <h3 className="text-lg lg:text-xl font-bold text-white">ServiceCore</h3>
              </div>
            </div>

            {/* Body rows */}
            <div className="flex flex-col">
              {typedRows.map((row, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
                  className="grid grid-cols-[1.4fr_1fr_1fr] border-b border-white/5 last:border-b-0 transition-colors duration-200 group relative"
                >
                  {/* Feature */}
                  <div className="p-5 lg:p-6 flex flex-col gap-1 justify-center border-r border-white/5 bg-(--color-surface-elevated-dark)/40">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-(--color-text-muted)">
                      {row.category}
                    </span>
                    <span className="text-sm lg:text-base font-medium text-white group-hover:text-white transition-colors">
                      {row.feature}
                    </span>
                  </div>
                  {/* Jira */}
                  <div className="p-5 lg:p-6 flex items-center justify-center border-r border-white/5">
                    <StatusCell cell={row.jira} isHero={false} />
                  </div>
                  {/* ServiceCore */}
                  <div className="p-5 lg:p-6 flex items-center justify-center bg-(--color-brand-primary)/2">
                    <StatusCell cell={row.servicecore} isHero />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Mobile cards */}
        <div className="md:hidden flex flex-col gap-4">
          {typedRows.map((row, idx) => (
            <motion.div
              key={idx}
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: Math.min(idx * 0.03, 0.3) }}
              className="rounded-2xl border border-white/10 bg-white/2 backdrop-blur-xl p-5 flex flex-col gap-4"
            >
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-(--color-text-muted)">
                  {row.category}
                </span>
                <h4 className="text-base font-semibold text-white tracking-tight">
                  {row.feature}
                </h4>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <div className="rounded-xl border border-white/8 bg-white/3 p-4 flex flex-col gap-2">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-(--color-text-muted)">
                    <En>Jira</En>
                  </span>
                  <StatusCell cell={row.jira} isHero={false} />
                </div>
                <div className="rounded-xl border border-(--color-brand-primary)/30 bg-(--color-brand-primary)/5 p-4 flex flex-col gap-2">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-(--color-accent-cyan-light)">
                    ServiceCore
                  </span>
                  <StatusCell cell={row.servicecore} isHero />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5 flex flex-col gap-1">
            <span className="text-[10px] font-bold tracking-widest uppercase text-(--color-accent-red-light)">
              <En>Jira</En> · Yok
            </span>
            <span className="text-3xl font-bold text-white tabular-nums tracking-tight">
              {summary.jiraGapCount}
            </span>
            <span className="text-[11px] text-(--color-text-secondary) font-light">
              kabiliyet eksik veya kapsam dışı
            </span>
          </div>
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5 flex flex-col gap-1">
            <span className="text-[10px] font-bold tracking-widest uppercase text-amber-300">
              <En>Jira</En> · Kısmi
            </span>
            <span className="text-3xl font-bold text-white tabular-nums tracking-tight">
              {summary.jiraPartialCount}
            </span>
            <span className="text-[11px] text-(--color-text-secondary) font-light">
              kabiliyet ek satın alma gerektirir
            </span>
          </div>
          <div className="rounded-2xl border border-white/8 bg-white/3 p-5 flex flex-col gap-1">
            <span className="text-[10px] font-bold tracking-widest uppercase text-(--color-text-muted)">
              <En>Jira</En> · Native
            </span>
            <span className="text-3xl font-bold text-white tabular-nums tracking-tight">
              {summary.jiraNativeCount}
            </span>
            <span className="text-[11px] text-(--color-text-secondary) font-light">
              kabiliyet lisansa dahil
            </span>
          </div>
          <div className="rounded-2xl border border-(--color-brand-primary)/30 bg-(--color-brand-primary)/8 p-5 flex flex-col gap-1">
            <span className="text-[10px] font-bold tracking-widest uppercase text-(--color-accent-cyan-light)">
              <En>ServiceCore · Native</En>
            </span>
            <span className="text-3xl font-bold text-white tabular-nums tracking-tight">
              {summary.serviceCoreNativeCount}
            </span>
            <span className="text-[11px] text-(--color-text-secondary) font-light">
              kabiliyet tek lisansa dahil
            </span>
          </div>
        </motion.div>

        {summary.note && (
          <p className="mt-6 text-center text-sm text-(--color-text-secondary) font-light max-w-2xl mx-auto">
            {summary.note}
          </p>
        )}
      </div>
    </section>
  );
}
