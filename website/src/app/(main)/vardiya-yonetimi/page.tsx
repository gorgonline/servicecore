"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import {
  CalendarClock,
  ArrowRight,
  CheckCircle2,
  BellRing,
  ArrowRightLeft,
  LayoutTemplate,
  AlertTriangle,
  Timer,
  Sparkles,
  CalendarDays,
  ArrowLeftRight,
  User,
  Phone,
  Crown,
  ShieldCheck,
  Coffee,
  Plane,
} from "lucide-react";
import data from "@/data/vardiya-yonetimi.json";

const DAYS = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"] as const;

const SHIFT_GRID: Array<{
  shift: string;
  hours: string;
  cells: Array<{
    level: "L1" | "L2" | "L3";
    count: number;
    tone: "emerald" | "cyan" | "purple" | "amber" | "muted";
  }>;
}> = [
  {
    shift: "Gece",
    hours: "00–08",
    cells: [
      { level: "L1", count: 4, tone: "emerald" },
      { level: "L1", count: 4, tone: "emerald" },
      { level: "L1", count: 4, tone: "emerald" },
      { level: "L1", count: 3, tone: "amber" },
      { level: "L1", count: 4, tone: "emerald" },
      { level: "L1", count: 3, tone: "amber" },
      { level: "L1", count: 3, tone: "amber" },
    ],
  },
  {
    shift: "Sabah",
    hours: "08–16",
    cells: [
      { level: "L2", count: 8, tone: "cyan" },
      { level: "L2", count: 8, tone: "cyan" },
      { level: "L2", count: 8, tone: "cyan" },
      { level: "L2", count: 7, tone: "cyan" },
      { level: "L2", count: 9, tone: "cyan" },
      { level: "L2", count: 5, tone: "muted" },
      { level: "L2", count: 5, tone: "muted" },
    ],
  },
  {
    shift: "Akşam",
    hours: "16–24",
    cells: [
      { level: "L2", count: 6, tone: "cyan" },
      { level: "L2", count: 6, tone: "cyan" },
      { level: "L2", count: 6, tone: "cyan" },
      { level: "L2", count: 5, tone: "cyan" },
      { level: "L2", count: 6, tone: "cyan" },
      { level: "L2", count: 4, tone: "muted" },
      { level: "L2", count: 4, tone: "muted" },
    ],
  },
  {
    shift: "L3 Nöbet",
    hours: "00–24",
    cells: [
      { level: "L3", count: 2, tone: "purple" },
      { level: "L3", count: 2, tone: "purple" },
      { level: "L3", count: 2, tone: "purple" },
      { level: "L3", count: 1, tone: "amber" },
      { level: "L3", count: 2, tone: "purple" },
      { level: "L3", count: 1, tone: "amber" },
      { level: "L3", count: 1, tone: "amber" },
    ],
  },
];

const CELL_TONE: Record<string, { bg: string; border: string; text: string }> = {
  emerald: {
    bg: "bg-emerald-500/12",
    border: "border-emerald-500/30",
    text: "text-(--color-accent-emerald-light)",
  },
  cyan: {
    bg: "bg-cyan-500/12",
    border: "border-cyan-500/30",
    text: "text-(--color-accent-cyan-light)",
  },
  purple: {
    bg: "bg-purple-500/12",
    border: "border-purple-500/30",
    text: "text-(--color-accent-purple-light)",
  },
  amber: {
    bg: "bg-amber-500/12",
    border: "border-amber-500/30",
    text: "text-amber-300",
  },
  muted: {
    bg: "bg-white/3",
    border: "border-white/8",
    text: "text-(--color-text-muted)",
  },
};

export default function VardiyaYonetimiPage() {
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen bg-(--color-surface-base) selection:bg-(--color-brand-primary)/30 text-(--color-text-overline)">
      {/* 1. HERO */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden w-full">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-300 pointer-events-none">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-150 h-150 bg-emerald-600/20 blur-[120px] rounded-full mix-blend-screen" />
          <div className="absolute top-40 right-1/4 w-100 h-100 bg-cyan-600/10 blur-[100px] rounded-full mix-blend-screen" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10 w-full max-w-7xl">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16 lg:mb-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-(--color-accent-emerald-light) text-xs font-black tracking-widest uppercase mb-8 shadow-inner"
            >
              <CalendarClock size={14} />
              {data.hero.badge}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl lg:text-7xl font-bold text-white mb-8 tracking-tight leading-[1.1]"
            >
              {data.hero.titleLead}
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-cyan-400">
                {data.hero.titleAccent}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg lg:text-xl text-(--color-text-secondary) font-light leading-relaxed max-w-3xl"
            >
              {data.hero.description}
            </motion.p>
          </div>

          {/* Hero mock — Weekly shift schedule + on-call panel */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative mx-auto rounded-4xl border border-white/10 bg-white/2 backdrop-blur-3xl p-4 lg:p-6 shadow-2xl overflow-hidden w-full"
          >
            <div className="relative w-full min-h-150 lg:min-h-180 rounded-3xl border border-white/8 bg-(--color-surface-elevated-solid) overflow-hidden flex flex-col">
              {/* Toolbar */}
              <div className="flex items-center justify-between gap-4 px-5 py-3 border-b border-white/8 bg-white/2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-500/15 text-(--color-accent-emerald-light) ring-1 ring-emerald-500/30">
                    <CalendarClock className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-[11px] font-mono font-semibold tracking-[0.18em] text-white truncate">
                    HAFTA · 12 — 18 MAYIS 2026
                  </span>
                </div>
                <div className="hidden md:flex items-center gap-2">
                  <span className="text-[10px] font-mono text-(--color-text-muted)">3 ekip · 14 vardiya · 28 kişi</span>
                  <span className="w-px h-3 bg-white/15" />
                  <span className="text-[10px] font-mono text-emerald-300">%92 kapsam</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-(--color-accent-emerald-light) animate-pulse" />
                </div>
              </div>

              {/* Filter chips */}
              <div className="flex items-center gap-2 px-5 py-3 border-b border-white/8 bg-white/1.5">
                {[
                  { label: "L1 · Çağrı", on: true, tone: "emerald" },
                  { label: "L2 · Destek", on: true, tone: "cyan" },
                  { label: "L3 · Uzman", on: true, tone: "purple" },
                  { label: "Saha", on: false, tone: "blue" },
                  { label: "Sadece nöbet", on: false, tone: "amber" },
                ].map((c, i) => {
                  const t: Record<string, string> = {
                    emerald: "bg-emerald-500/12 border-emerald-500/30 text-(--color-accent-emerald-light)",
                    cyan: "bg-cyan-500/12 border-cyan-500/30 text-(--color-accent-cyan-light)",
                    purple: "bg-purple-500/12 border-purple-500/30 text-(--color-accent-purple-light)",
                    blue: "bg-blue-500/12 border-blue-500/30 text-(--color-accent-blue-light)",
                    amber: "bg-amber-500/12 border-amber-500/30 text-amber-300",
                  };
                  return (
                    <span
                      key={i}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-mono ${
                        c.on ? t[c.tone] : "bg-white/3 border-white/8 text-(--color-text-muted)"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          c.on
                            ? c.tone === "emerald"
                              ? "bg-(--color-accent-emerald-light)"
                              : c.tone === "cyan"
                                ? "bg-(--color-accent-cyan-light)"
                                : c.tone === "purple"
                                  ? "bg-(--color-accent-purple-light)"
                                  : c.tone === "blue"
                                    ? "bg-(--color-accent-blue-light)"
                                    : "bg-amber-300"
                            : "bg-white/20"
                        }`}
                      />
                      {c.label}
                    </span>
                  );
                })}
              </div>

              {/* Main: grid + side panel */}
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] flex-1">
                {/* Schedule grid */}
                <div className="relative overflow-hidden p-5">
                  {/* Day header row */}
                  <div className="grid grid-cols-[110px_repeat(7,minmax(0,1fr))] gap-1.5 mb-2">
                    <div className="text-[9px] font-mono font-semibold tracking-[0.2em] text-(--color-text-muted) pl-1">
                      VARDİYA
                    </div>
                    {DAYS.map((d, i) => (
                      <div
                        key={d}
                        className={`text-center text-[10px] font-mono font-semibold tracking-wider ${
                          i >= 5 ? "text-amber-300" : "text-white/85"
                        }`}
                      >
                        {d}
                        <div className="text-[8px] text-(--color-text-muted) tabular-nums">
                          {12 + i}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Shift rows */}
                  <div className="flex flex-col gap-1.5">
                    {SHIFT_GRID.map((row, ri) => (
                      <div
                        key={ri}
                        className="grid grid-cols-[110px_repeat(7,minmax(0,1fr))] gap-1.5"
                      >
                        <div className="flex flex-col justify-center pl-1 py-2">
                          <span className="text-[11px] font-semibold text-white truncate">
                            {row.shift}
                          </span>
                          <span className="text-[9px] font-mono text-(--color-text-muted) tabular-nums">
                            {row.hours}
                          </span>
                        </div>
                        {row.cells.map((cell, ci) => {
                          const t = CELL_TONE[cell.tone];
                          return (
                            <div
                              key={ci}
                              className={`rounded-md border ${t.bg} ${t.border} flex flex-col items-center justify-center py-2 px-1 min-h-14 hover:scale-[1.04] transition-transform cursor-pointer`}
                            >
                              <span className={`text-[9px] font-mono font-semibold tracking-wider ${t.text}`}>
                                {cell.level}
                              </span>
                              <span className="text-base font-bold text-white tabular-nums leading-tight">
                                {cell.count}
                              </span>
                              {cell.tone === "amber" && (
                                <span className="text-[8px] font-mono text-amber-300 leading-none">
                                  eksik
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>

                  {/* Bottom strip — kapsam */}
                  <div className="mt-4 rounded-xl border border-white/8 bg-white/2 px-4 py-3 flex items-center gap-4">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-mono tracking-widest text-(--color-text-muted)">
                        HAFTALIK KAPSAM
                      </span>
                      <span className="text-sm font-semibold text-(--color-accent-emerald-light) tabular-nums">
                        %92
                      </span>
                    </div>
                    <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full bg-linear-to-r from-emerald-500/60 to-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.6)]"
                        style={{ width: "92%" }}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-3 h-3 text-amber-300" />
                      <span className="text-[10px] font-mono text-amber-300">3 boşluk</span>
                    </div>
                  </div>
                </div>

                {/* Right panel — on-call */}
                <div className="border-t lg:border-t-0 lg:border-l border-white/8 px-4 py-4 space-y-4 bg-white/1.5">
                  <div>
                    <div className="text-[9px] font-mono font-semibold tracking-[0.22em] text-(--color-accent-emerald-light)">
                      AKTİF NÖBET
                    </div>
                    <div className="mt-2 rounded-xl border border-emerald-500/30 bg-emerald-500/8 p-3">
                      <div className="flex items-center gap-2 mb-1.5">
                        <Crown className="w-3.5 h-3.5 text-(--color-accent-emerald-light)" />
                        <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-200">
                          Birincil
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full bg-emerald-500/25 border border-emerald-500/40 flex items-center justify-center text-[11px] font-bold text-emerald-100">
                          MK
                        </div>
                        <div className="flex flex-col min-w-0 flex-1">
                          <span className="text-[12px] font-semibold text-white truncate">
                            Murat Kara
                          </span>
                          <div className="flex items-center gap-1.5">
                            <Phone className="w-2.5 h-2.5 text-(--color-text-muted)" />
                            <span className="text-[9px] font-mono text-(--color-text-muted) tabular-nums">
                              +90 532 ••• 41 22
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-2 rounded-xl border border-white/8 bg-white/3 p-3">
                      <div className="flex items-center gap-2 mb-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-(--color-text-muted)" />
                        <span className="text-[10px] font-mono uppercase tracking-wider text-(--color-text-muted)">
                          İkincil
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full bg-white/8 border border-white/15 flex items-center justify-center text-[11px] font-bold text-white/85">
                          EŞ
                        </div>
                        <div className="flex flex-col min-w-0 flex-1">
                          <span className="text-[12px] font-semibold text-white truncate">
                            Esra Şahin
                          </span>
                          <div className="flex items-center gap-1.5">
                            <Phone className="w-2.5 h-2.5 text-(--color-text-muted)" />
                            <span className="text-[9px] font-mono text-(--color-text-muted) tabular-nums">
                              +90 533 ••• 18 09
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-[9px] font-mono font-semibold tracking-[0.22em] text-(--color-text-muted)">
                      ROTASYON · 4 HAFTA
                    </div>
                    <div className="mt-2 space-y-1.5">
                      {[
                        { name: "M. Kara", count: 4 },
                        { name: "E. Şahin", count: 3 },
                        { name: "K. Yılmaz", count: 3 },
                        { name: "A. Doğan", count: 2 },
                      ].map((p, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between px-2.5 py-1.5 rounded-md border border-white/8 bg-white/2"
                        >
                          <div className="flex items-center gap-2">
                            <User className="w-3 h-3 text-(--color-text-muted)" />
                            <span className="text-[11px] text-white/85 truncate">{p.name}</span>
                          </div>
                          <span className="text-[9px] font-mono text-emerald-200">
                            {p.count}x nöbet
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl border border-amber-500/30 bg-amber-500/8 p-3">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono font-semibold tracking-[0.16em] text-amber-200 mb-1">
                      <AlertTriangle className="w-3 h-3" />
                      KAPSAM BOŞLUĞU
                    </div>
                    <p className="text-[11px] text-white/80 leading-snug">
                      Per 15 May · L1 gece vardiyası 1 kişi eksik. Yetkinlik uygun 3 aday önerildi.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. ZIG-ZAG */}
      <section className="py-24 relative z-20">
        <div className="container mx-auto px-6 lg:px-12 w-full max-w-7xl flex flex-col gap-32">
          {/* Feature 1: Drag-drop plan + assignment suggestions */}
          <motion.div
            animate="visible"
            variants={fadeUp}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-emerald-500/5 to-cyan-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-emerald-500/10 blur-[50px] group-hover:bg-emerald-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full h-135 rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-(--color-surface-elevated-solid) flex flex-col p-5 gap-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/8">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-semibold uppercase tracking-widest text-(--color-text-muted)">
                        Atama Önerisi · Per 15 May · L1 Gece
                      </span>
                      <span className="text-sm font-bold text-white">
                        1 kişi eksik · 3 aday önerildi
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-300 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                      AI öneri
                    </span>
                  </div>

                  {/* Suggestion list */}
                  <div className="flex flex-col gap-2 flex-1 overflow-hidden">
                    {[
                      {
                        name: "Kemal Yılmaz",
                        initials: "KY",
                        score: 96,
                        skills: ["L1", "SAP", "Türkçe"],
                        meta: "Bu ay 2 gece · uygun",
                        tone: "emerald",
                      },
                      {
                        name: "Ayşe Doğan",
                        initials: "AD",
                        score: 88,
                        skills: ["L1", "Active Directory"],
                        meta: "Önceki vardiya akşam",
                        tone: "cyan",
                      },
                      {
                        name: "Bora Çetin",
                        initials: "BÇ",
                        score: 74,
                        skills: ["L1", "L2 hazır"],
                        meta: "Bu hafta fazla mesai sınırına yakın",
                        tone: "amber",
                      },
                      {
                        name: "Selim Aksoy",
                        initials: "SA",
                        score: 0,
                        skills: ["İzin"],
                        meta: "Yıllık izin · 14–17 May",
                        tone: "muted",
                        disabled: true,
                      },
                    ].map((c, i) => {
                      const toneStyles: Record<string, { wrap: string; avatar: string; score: string }> = {
                        emerald: {
                          wrap: "bg-emerald-500/8 border-emerald-500/25",
                          avatar: "bg-emerald-500/25 border-emerald-500/40 text-emerald-100",
                          score: "text-(--color-accent-emerald-light)",
                        },
                        cyan: {
                          wrap: "bg-cyan-500/8 border-cyan-500/25",
                          avatar: "bg-cyan-500/25 border-cyan-500/40 text-cyan-100",
                          score: "text-(--color-accent-cyan-light)",
                        },
                        amber: {
                          wrap: "bg-amber-500/8 border-amber-500/25",
                          avatar: "bg-amber-500/25 border-amber-500/40 text-amber-100",
                          score: "text-amber-300",
                        },
                        muted: {
                          wrap: "bg-white/2 border-white/8 opacity-60",
                          avatar: "bg-white/8 border-white/15 text-(--color-text-muted)",
                          score: "text-(--color-text-muted)",
                        },
                      };
                      const t = toneStyles[c.tone];
                      return (
                        <div
                          key={i}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border ${t.wrap}`}
                        >
                          <div
                            className={`w-9 h-9 rounded-full border flex items-center justify-center text-[11px] font-bold shrink-0 ${t.avatar}`}
                          >
                            {c.initials}
                          </div>
                          <div className="flex flex-col min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-[12px] font-semibold text-white truncate">
                                {c.name}
                              </span>
                              {c.disabled && (
                                <Plane className="w-3 h-3 text-(--color-text-muted)" />
                              )}
                            </div>
                            <span className="text-[9px] font-mono text-(--color-text-muted) truncate">
                              {c.meta}
                            </span>
                          </div>
                          <div className="flex flex-col items-end gap-0.5">
                            <span className={`text-[14px] font-bold tabular-nums ${t.score}`}>
                              {c.score > 0 ? `%${c.score}` : "—"}
                            </span>
                            <div className="flex items-center gap-1">
                              {c.skills.slice(0, 2).map((s, j) => (
                                <span
                                  key={j}
                                  className="text-[8px] font-mono px-1.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/80"
                                >
                                  {s}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="rounded-lg border border-emerald-500/25 bg-emerald-500/8 px-3 py-2 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-emerald-200">
                      Kemal Yılmaz&apos;ı ata · uyum %96
                    </span>
                    <span className="text-[10px] font-mono text-white/70">
                      onayla →
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-(--color-accent-emerald-light)">
                <CalendarClock size={32} />
              </div>
              <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight">
                {data.zigzag[0].titleLead}
                <br />
                <span className="text-(--color-accent-emerald-light)">{data.zigzag[0].titleAccent}</span>
              </h2>
              <p className="text-lg text-(--color-text-secondary) leading-relaxed font-light">
                {data.zigzag[0].description}
              </p>
              <ul className="space-y-4">
                {data.zigzag[0].bullets.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-(--color-text-overline)">
                    <CheckCircle2 className="w-5 h-5 text-(--color-accent-emerald-light) shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Feature 2: On-call rotation timeline */}
          <motion.div
            animate="visible"
            variants={fadeUp}
            className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-cyan-500/5 to-blue-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-cyan-500/10 blur-[50px] group-hover:bg-cyan-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full h-135 rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-(--color-surface-elevated-solid) flex flex-col p-5 gap-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/8">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-semibold uppercase tracking-widest text-(--color-text-muted)">
                        L3 Nöbet Rotasyonu · 4 Hafta
                      </span>
                      <span className="text-sm font-bold text-white">12 May → 8 Haz</span>
                    </div>
                    <span className="text-[10px] font-mono text-(--color-accent-cyan-light) px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                      adil dağılım
                    </span>
                  </div>

                  {/* Week rows */}
                  <div className="flex flex-col gap-2 flex-1">
                    {[
                      {
                        week: "Hafta 1 · 12 May",
                        primary: { name: "Murat Kara", initials: "MK", tone: "emerald" },
                        secondary: { name: "Esra Şahin", initials: "EŞ", tone: "cyan" },
                        active: true,
                      },
                      {
                        week: "Hafta 2 · 19 May",
                        primary: { name: "Esra Şahin", initials: "EŞ", tone: "cyan" },
                        secondary: { name: "Kemal Yılmaz", initials: "KY", tone: "purple" },
                      },
                      {
                        week: "Hafta 3 · 26 May",
                        primary: { name: "Kemal Yılmaz", initials: "KY", tone: "purple" },
                        secondary: { name: "Ayşe Doğan", initials: "AD", tone: "blue" },
                      },
                      {
                        week: "Hafta 4 · 02 Haz",
                        primary: { name: "Ayşe Doğan", initials: "AD", tone: "blue" },
                        secondary: { name: "Murat Kara", initials: "MK", tone: "emerald" },
                      },
                    ].map((w, i) => {
                      const toneAvatar: Record<string, string> = {
                        emerald: "bg-emerald-500/25 border-emerald-500/40 text-emerald-100",
                        cyan: "bg-cyan-500/25 border-cyan-500/40 text-cyan-100",
                        purple: "bg-purple-500/25 border-purple-500/40 text-purple-100",
                        blue: "bg-blue-500/25 border-blue-500/40 text-blue-100",
                      };
                      return (
                        <div
                          key={i}
                          className={`rounded-xl border px-3 py-2.5 ${
                            w.active
                              ? "bg-cyan-500/10 border-cyan-500/30"
                              : "bg-white/2 border-white/5"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-(--color-text-muted)">
                              {w.week}
                            </span>
                            {w.active && (
                              <span className="text-[9px] font-mono text-cyan-200 px-1.5 py-0.5 rounded-full border border-cyan-500/30 bg-cyan-500/10">
                                aktif
                              </span>
                            )}
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex items-center gap-2">
                              <Crown className="w-3 h-3 text-(--color-accent-emerald-light) shrink-0" />
                              <div
                                className={`w-7 h-7 rounded-full border flex items-center justify-center text-[10px] font-bold shrink-0 ${toneAvatar[w.primary.tone]}`}
                              >
                                {w.primary.initials}
                              </div>
                              <span className="text-[11px] font-medium text-white truncate">
                                {w.primary.name}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <ShieldCheck className="w-3 h-3 text-(--color-text-muted) shrink-0" />
                              <div
                                className={`w-7 h-7 rounded-full border flex items-center justify-center text-[10px] font-bold shrink-0 ${toneAvatar[w.secondary.tone]}`}
                              >
                                {w.secondary.initials}
                              </div>
                              <span className="text-[11px] font-medium text-white/85 truncate">
                                {w.secondary.name}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Eskalasyon zinciri */}
                  <div className="rounded-lg border border-white/8 bg-white/2 px-3 py-2">
                    <div className="text-[9px] font-mono uppercase tracking-widest text-(--color-text-muted) mb-1.5">
                      ESKALASYON ZİNCİRİ
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {["Birincil", "İkincil", "Operasyon Lideri", "Servis Yöneticisi"].map((step, i, arr) => (
                        <span key={i} className="inline-flex items-center gap-1.5">
                          <span className="text-[10px] font-mono text-white/80 px-2 py-0.5 rounded-md bg-white/3 border border-white/8">
                            {step}
                          </span>
                          {i < arr.length - 1 && (
                            <span className="text-[10px] text-(--color-accent-cyan-light)">→</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-(--color-accent-cyan-light)">
                <BellRing size={32} />
              </div>
              <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight">
                {data.zigzag[1].titleLead}
                <br />
                <span className="text-(--color-accent-cyan-light)">{data.zigzag[1].titleAccent}</span>
              </h2>
              <p className="text-lg text-(--color-text-secondary) leading-relaxed font-light">
                {data.zigzag[1].description}
              </p>
              <ul className="space-y-4">
                {data.zigzag[1].bullets.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-(--color-text-overline)">
                    <CheckCircle2 className="w-5 h-5 text-(--color-accent-cyan-light) shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Feature 3: Handover note */}
          <motion.div
            animate="visible"
            variants={fadeUp}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-blue-500/5 to-indigo-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-blue-500/10 blur-[50px] group-hover:bg-blue-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full h-135 rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-(--color-surface-elevated-solid) flex flex-col p-5 gap-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/8">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-semibold uppercase tracking-widest text-(--color-text-muted)">
                        Vardiya Devri · 14 May 16:00
                      </span>
                      <span className="text-sm font-bold text-white">Sabah → Akşam</span>
                    </div>
                    <span className="text-[10px] font-mono text-(--color-accent-blue-light) px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20">
                      okunuyor
                    </span>
                  </div>

                  {/* Handover checklist */}
                  <div className="flex flex-col gap-1.5 flex-1 overflow-hidden">
                    {[
                      {
                        section: "AÇIK OLAYLAR · 3",
                        items: [
                          { text: "INC-7821 SAP yavaşlık · L3'te beklemede", done: true },
                          { text: "INC-7834 E-posta sunucu uyarısı · gözlem", done: true },
                          { text: "INC-7842 VPN bağlantı şikayetleri · araştırma", done: false },
                        ],
                      },
                      {
                        section: "PLANLI DEĞİŞİKLİK",
                        items: [
                          { text: "CHG-1207 DB yedek node ekleme · 22:00", done: false },
                        ],
                      },
                      {
                        section: "VIP / KRİTİK",
                        items: [
                          { text: "Birikim CFO ofisi · CRM erişim takibi", done: true },
                          { text: "K7 Müşteri Tenant · DE bölge Hizmet Seviyesi yakın", done: false },
                        ],
                      },
                    ].map((sec, si) => (
                      <div key={si} className="flex flex-col gap-1">
                        <div className="text-[9px] font-mono font-semibold tracking-widest text-(--color-text-muted) pt-1">
                          {sec.section}
                        </div>
                        {sec.items.map((it, ii) => (
                          <div
                            key={ii}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${
                              it.done
                                ? "bg-emerald-500/8 border-emerald-500/20"
                                : "bg-white/2 border-white/5"
                            }`}
                          >
                            <CheckCircle2
                              className={`w-3.5 h-3.5 shrink-0 ${
                                it.done
                                  ? "text-(--color-accent-emerald-light)"
                                  : "text-(--color-text-muted)"
                              }`}
                            />
                            <span
                              className={`text-[11px] truncate ${
                                it.done ? "text-white/85" : "text-white"
                              }`}
                            >
                              {it.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-lg border border-white/8 bg-white/3 px-3 py-2">
                      <div className="text-[8px] font-mono tracking-[0.18em] text-(--color-text-muted)">
                        DEVREDEN
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <User className="w-3 h-3 text-(--color-accent-blue-light)" />
                        <span className="text-[11px] font-semibold text-white">
                          Murat Kara · L2
                        </span>
                      </div>
                    </div>
                    <div className="rounded-lg border border-blue-500/25 bg-blue-500/8 px-3 py-2">
                      <div className="text-[8px] font-mono tracking-[0.18em] text-(--color-accent-blue-light)">
                        DEVRALAN
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <User className="w-3 h-3 text-(--color-accent-blue-light)" />
                        <span className="text-[11px] font-semibold text-white">
                          Esra Şahin · L2
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-(--color-accent-blue-light)">
                <ArrowRightLeft size={32} />
              </div>
              <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight">
                {data.zigzag[2].titleLead}
                <br />
                <span className="text-(--color-accent-blue-light)">{data.zigzag[2].titleAccent}</span>
              </h2>
              <p className="text-lg text-(--color-text-secondary) leading-relaxed font-light">
                {data.zigzag[2].description}
              </p>
              <ul className="space-y-4">
                {data.zigzag[2].bullets.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-(--color-text-overline)">
                    <CheckCircle2 className="w-5 h-5 text-(--color-accent-blue-light) shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. BENTO */}
      <section className="py-24 border-y border-white/5 bg-(--color-surface-base-dark) relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] mix-blend-screen pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-12 w-full max-w-7xl relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-24">
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-white mb-6">
              {data.bento.sectionTitle}
            </h2>
            <p className="text-(--color-text-secondary) text-lg font-light leading-relaxed">
              {data.bento.sectionSubtitle}
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[420px]"
          >
            {/* Bento 1 — Şablon kütüphanesi (wide) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 lg:col-span-2 row-span-1 rounded-4xl bg-linear-to-br from-emerald-500/10 to-transparent border border-white/10 p-8 hover:bg-white/4 transition-colors relative overflow-hidden group flex flex-col md:flex-row gap-6 items-center"
            >
              <div className="w-full md:w-1/2 flex flex-col justify-center shrink-0">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-(--color-accent-emerald-light) flex items-center justify-center mb-6">
                  <LayoutTemplate />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {data.bento.items[0].title}
                </h3>
                <p className="text-sm text-(--color-text-secondary) font-light pr-4">
                  {data.bento.items[0].description}
                </p>
              </div>
              <div className="w-full md:w-1/2 h-45 md:h-full relative rounded-xl border border-white/10 overflow-hidden shadow-inner shrink-0 bg-(--color-surface-elevated-solid) group-hover:border-emerald-500/40 transition-colors flex flex-col gap-2 p-5 justify-center">
                {[
                  { name: "3+1 vardiya", desc: "3 gün çalış · 1 gün izin", active: true },
                  { name: "2+2 sürekli", desc: "2 gündüz · 2 gece · 2 izin" },
                  { name: "Hafta sonu yoğun", desc: "Cmt-Paz çift kapasite" },
                  { name: "L3 7/24 nöbet", desc: "haftalık rotasyon · birincil + ikincil" },
                ].map((tpl, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg border ${
                      tpl.active
                        ? "bg-emerald-500/12 border-emerald-500/30"
                        : "bg-white/3 border-white/8"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <LayoutTemplate
                        className={`w-3.5 h-3.5 ${
                          tpl.active ? "text-(--color-accent-emerald-light)" : "text-(--color-text-muted)"
                        }`}
                      />
                      <div className="flex flex-col">
                        <span className="text-[11px] font-semibold text-white">{tpl.name}</span>
                        <span className="text-[9px] font-mono text-(--color-text-muted)">{tpl.desc}</span>
                      </div>
                    </div>
                    {tpl.active && (
                      <span className="text-[9px] font-mono text-emerald-200 px-1.5 py-0.5 rounded-full bg-emerald-500/12 border border-emerald-500/25">
                        kullanımda
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bento 2 — Kapsam boşluğu */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center mb-6 shrink-0">
                <AlertTriangle />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[1].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[1].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-2 justify-center">
                {[
                  { day: "Per 15 May", shift: "L1 Gece", missing: 1, tone: "amber" },
                  { day: "Cmt 17 May", shift: "L1 Gündüz", missing: 1, tone: "amber" },
                  { day: "Paz 18 May", shift: "L3 Nöbet", missing: 1, tone: "red" },
                ].map((g, i) => {
                  const t: Record<string, string> = {
                    amber: "border-amber-500/30 bg-amber-500/8 text-amber-300",
                    red: "border-red-500/30 bg-red-500/8 text-(--color-accent-red-light)",
                  };
                  return (
                    <div
                      key={i}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg border ${t[g.tone]}`}
                    >
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-3 h-3" />
                        <span className="text-[10px] font-mono text-white">{g.day}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-white/80">{g.shift}</span>
                        <span className="text-[9px] font-mono font-semibold uppercase">
                          {g.missing} eksik
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Bento 3 — Fazla mesai */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-(--color-accent-orange-light) flex items-center justify-center mb-6 shrink-0">
                <Timer />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[2].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[2].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-2.5 justify-center">
                {[
                  { name: "Bora Çetin", hours: 42, limit: 45, tone: "amber" },
                  { name: "Murat Kara", hours: 38, limit: 45, tone: "emerald" },
                  { name: "Esra Şahin", hours: 35, limit: 45, tone: "emerald" },
                  { name: "Selim Aksoy", hours: 28, limit: 45, tone: "emerald" },
                ].map((p, i) => {
                  const pct = Math.min(100, Math.round((p.hours / p.limit) * 100));
                  const bar: Record<string, string> = {
                    amber: "from-amber-500/60 to-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.5)]",
                    emerald: "from-emerald-500/60 to-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.4)]",
                  };
                  return (
                    <div key={i} className="flex flex-col gap-1">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-medium text-white">{p.name}</span>
                        <span
                          className={`font-mono tabular-nums ${
                            p.tone === "amber" ? "text-amber-300" : "text-(--color-accent-emerald-light)"
                          }`}
                        >
                          {p.hours}/{p.limit} sa
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <div
                          className={`h-full bg-linear-to-r ${bar[p.tone]}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Bento 4 — Yetkinlik bazlı atama (wide) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 lg:col-span-2 row-span-1 rounded-4xl bg-linear-to-br from-cyan-500/10 to-transparent border border-white/10 p-8 hover:bg-white/4 transition-colors relative overflow-hidden group flex flex-col md:flex-row gap-6 items-center"
            >
              <div className="w-full md:w-1/2 flex flex-col justify-center shrink-0">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-(--color-accent-cyan-light) flex items-center justify-center mb-6">
                  <Sparkles />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {data.bento.items[3].title}
                </h3>
                <p className="text-sm text-(--color-text-secondary) font-light pr-4">
                  {data.bento.items[3].description}
                </p>
              </div>
              <div className="w-full md:w-1/2 h-45 md:h-full relative rounded-xl border border-white/10 overflow-hidden shadow-inner shrink-0 bg-(--color-surface-elevated-solid) group-hover:border-cyan-500/40 transition-colors p-5 grid grid-cols-2 gap-2">
                {[
                  { name: "Kemal Yılmaz", skills: ["SAP", "L2", "AD"], match: 96 },
                  { name: "Ayşe Doğan", skills: ["L1", "AD"], match: 88 },
                  { name: "Murat Kara", skills: ["L2", "Saha"], match: 82 },
                  { name: "Selim Aksoy", skills: ["L1", "Ağ"], match: 71 },
                ].map((p, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-white/8 bg-white/2 px-3 py-2 flex flex-col gap-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-semibold text-white truncate">
                        {p.name}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-(--color-accent-cyan-light) tabular-nums">
                        %{p.match}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {p.skills.map((s, j) => (
                        <span
                          key={j}
                          className="text-[8px] font-mono px-1.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-200"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bento 5 — İzin entegrasyonu */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 border border-white/10 bg-linear-to-br from-indigo-500/5 to-transparent rounded-4xl p-8 hover:bg-white/4 transition-colors flex flex-col overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center mb-6 shrink-0">
                <CalendarDays />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[4].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[4].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-2 justify-center">
                {[
                  { who: "Selim Aksoy", type: "Yıllık izin", date: "14–17 May", icon: Plane },
                  { who: "Esra Şahin", type: "Mazeret", date: "16 May", icon: Coffee },
                  { who: "Tüm ekip", type: "19 Mayıs · resmi tatil", date: "19 May", icon: CalendarDays },
                ].map((r, i) => {
                  const Icon = r.icon;
                  return (
                    <div
                      key={i}
                      className="flex items-center justify-between px-3 py-1.5 rounded-md bg-white/2 border border-white/5"
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="w-3 h-3 text-indigo-300" />
                        <div className="flex flex-col">
                          <span className="text-[10px] font-medium text-white">{r.who}</span>
                          <span className="text-[8px] font-mono text-(--color-text-muted)">{r.type}</span>
                        </div>
                      </div>
                      <span className="text-[9px] font-mono text-indigo-200 tabular-nums">{r.date}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Bento 6 — Takas talepleri */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-(--color-accent-purple-light) flex items-center justify-center mb-6 shrink-0">
                <ArrowLeftRight />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[5].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[5].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-2 justify-center">
                {[
                  { from: "K. Yılmaz", to: "M. Kara", shift: "16 May Akşam", state: "onay bekliyor", tone: "amber" },
                  { from: "A. Doğan", to: "B. Çetin", shift: "18 May Sabah", state: "kabul", tone: "emerald" },
                  { from: "E. Şahin", to: "S. Aksoy", shift: "20 May Gece", state: "ret", tone: "red" },
                ].map((r, i) => {
                  const t: Record<string, string> = {
                    emerald: "text-(--color-accent-emerald-light) bg-emerald-500/10 border-emerald-500/20",
                    amber: "text-amber-300 bg-amber-500/10 border-amber-500/20",
                    red: "text-(--color-accent-red-light) bg-red-500/10 border-red-500/20",
                  };
                  return (
                    <div key={i} className="rounded-lg border border-white/8 bg-white/2 px-3 py-2">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-medium text-white">{r.from}</span>
                        <ArrowLeftRight className="w-3 h-3 text-(--color-accent-purple-light)" />
                        <span className="text-[10px] font-medium text-white">{r.to}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono text-(--color-text-muted)">{r.shift}</span>
                        <span className={`text-[8px] font-mono font-semibold px-1.5 py-0.5 rounded-full border ${t[r.tone]}`}>
                          {r.state}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 4. CTA */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="container mx-auto pb-20 max-w-7xl mt-32">
            <motion.div
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="group relative flex flex-col justify-center overflow-hidden rounded-3xl bg-linear-to-br from-(--color-brand-primary) to-(--color-brand-purple) p-1 md:p-px"
            >
              <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative h-full flex flex-col items-center justify-center text-center rounded-[23px] bg-(--color-surface-elevated-solid)/90 backdrop-blur-3xl px-8 py-16 md:px-12">
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

                <div className="relative z-10 w-full">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 mx-auto">
                    <CalendarClock className="w-4 h-4 text-(--color-accent-emerald-light)" />
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-text-overline)">
                      Vardiya Yönetimi
                    </span>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
                    {data.cta.title}
                  </h2>

                  <p className="text-lg text-(--color-text-overline) font-light leading-relaxed mb-10 max-w-xl mx-auto">
                    {data.cta.description}
                  </p>

                  <div className="flex flex-col items-center gap-8">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <Link href={data.cta.primaryHref}>
                        <button className="px-8 py-4 rounded-full bg-(--color-brand-primary) text-white font-semibold hover:bg-blue-600 transition-all hover:scale-105 active:scale-95 shadow-(--shadow-glow-primary-weak) cursor-pointer flex items-center gap-2">
                          {data.cta.primaryLabel}
                          <ArrowRight className="w-5 h-5" />
                        </button>
                      </Link>
                      <Link href={data.cta.secondaryHref}>
                        <button className="px-8 py-4 rounded-full bg-white/5 text-white font-semibold border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
                          {data.cta.secondaryLabel}
                        </button>
                      </Link>
                    </div>

                    <div className="flex flex-wrap justify-center gap-8 text-(--color-text-muted)">
                      <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                        <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-emerald-base) shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                        Haftalık Plan
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                        <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-cyan-base) shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
                        On-Call Rotasyonu
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                        <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-blue-base) shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                        Vardiya Devri
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}
