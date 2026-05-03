"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Gauge,
  Share2,
  Clock,
  Layers,
  FilePlus2,
  ListOrdered,
  CalendarClock,
  Target,
  AlertCircle,
  MousePointerClick,
  TrendingUp,
  AlertTriangle,
  Bell,
} from "lucide-react";
import data from "@/data/servis-seviye-yonetimi.json";

export default function ServisSeviyeYonetimiPage() {
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
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden w-full">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-300 pointer-events-none">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-150 h-150 bg-blue-600/20 blur-[120px] rounded-full mix-blend-screen" />
          <div className="absolute top-40 right-1/4 w-100 h-100 bg-purple-600/10 blur-[100px] rounded-full mix-blend-screen" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10 w-full max-w-7xl">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16 lg:mb-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-(--color-accent-blue-light) text-xs font-black tracking-widest uppercase mb-8 shadow-inner"
            >
              <Activity size={14} />
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
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">
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

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative mx-auto rounded-4xl border border-white/10 bg-white/2 backdrop-blur-3xl p-6 lg:p-10 shadow-2xl overflow-hidden group w-full"
          >
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-5 pb-5 border-b border-white/8">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-(--color-accent-blue-light)">
                  SLA Operasyon Panosu
                </span>
                <span className="text-lg lg:text-xl font-bold text-white tracking-tight">
                  Servis Seviye Yönetimi
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-(--color-text-muted)">son 30 gün</span>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-(--color-accent-emerald-light) shadow-[0_0_8px_currentColor] animate-pulse" />
                  <span className="text-[9px] font-mono uppercase tracking-widest text-(--color-accent-emerald-light)">canlı</span>
                </div>
              </div>
            </div>

            {/* KPI metric row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-5">
              {[
                { icon: TrendingUp, label: "SLA Uyumu", value: "%94", trend: "+2.1", tone: "emerald" },
                { icon: AlertTriangle, label: "İhlal Sayısı", value: "8", trend: "-3", tone: "red", down: true },
                { icon: AlertCircle, label: "Aktif Olay", value: "42", trend: "+5", tone: "blue" },
                { icon: Clock, label: "Ortalama MTTR", value: "17dk", trend: "-4dk", tone: "purple", down: true },
              ].map((m, i) => {
                const Icon = m.icon;
                const tone: Record<string, string> = {
                  emerald: "from-emerald-500/15 to-emerald-500/5 border-emerald-500/25 text-(--color-accent-emerald-light) shadow-[0_0_25px_rgba(16,185,129,0.12)]",
                  red: "from-red-500/15 to-red-500/5 border-red-500/25 text-(--color-accent-red-light) shadow-[0_0_25px_rgba(239,68,68,0.12)]",
                  blue: "from-blue-500/15 to-blue-500/5 border-blue-500/25 text-(--color-accent-blue-light) shadow-[0_0_25px_rgba(59,130,246,0.12)]",
                  purple: "from-purple-500/15 to-purple-500/5 border-purple-500/25 text-(--color-accent-purple-light) shadow-[0_0_25px_rgba(168,85,247,0.12)]",
                };
                const trendTone = m.down ? "text-(--color-accent-emerald-light)" : (m.tone === "red" || m.tone === "blue") ? "text-(--color-accent-red-light)" : "text-(--color-accent-emerald-light)";
                return (
                  <div key={i} className={`rounded-2xl bg-linear-to-br ${tone[m.tone]} border p-3 lg:p-4 flex flex-col gap-2`}>
                    <div className="flex items-center justify-between">
                      <Icon className="w-4 h-4" />
                      <span className={`text-[9px] font-mono font-semibold ${trendTone}`}>
                        {m.trend}
                      </span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[8px] font-medium uppercase tracking-wider text-(--color-text-muted)">
                        {m.label}
                      </span>
                      <span className="text-2xl lg:text-3xl font-bold tracking-tight text-white">
                        {m.value}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Split: Policy Compliance + Risk altındaki kayıtlar */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4 mb-5">
              {/* Left — Policy Compliance */}
              <div className="rounded-2xl border border-white/10 bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-2">
                <div className="flex items-center justify-between pb-2 border-b border-white/8">
                  <div className="flex items-center gap-1.5">
                    <Gauge className="w-3.5 h-3.5 text-(--color-accent-blue-light)" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white">Policy Uyumu</span>
                  </div>
                  <span className="text-[8px] font-mono text-(--color-text-muted)">3 policy</span>
                </div>
                {[
                  { name: "Premium", target: "P1·P2", percent: 96, count: 12, tone: "blue" },
                  { name: "Standart", target: "P3", percent: 92, count: 24, tone: "cyan" },
                  { name: "Best-Effort", target: "P4", percent: 85, count: 6, tone: "emerald" },
                ].map((p, i) => {
                  const barTone: Record<string, string> = {
                    blue: "from-blue-500 to-cyan-400",
                    cyan: "from-cyan-500 to-cyan-400",
                    emerald: "from-emerald-500 to-emerald-400",
                  };
                  const textTone: Record<string, string> = {
                    blue: "text-(--color-accent-blue-light)",
                    cyan: "text-(--color-accent-cyan-light)",
                    emerald: "text-(--color-accent-emerald-light)",
                  };
                  return (
                    <div key={i} className="flex flex-col gap-1.5 px-1 py-1">
                      <div className="grid grid-cols-[1fr_auto_auto] gap-2 items-center">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-semibold text-white">{p.name}</span>
                          <span className="text-[8px] font-mono text-(--color-text-muted)">{p.target}</span>
                        </div>
                        <span className="text-[8px] font-mono text-(--color-text-muted)">{p.count} kayıt</span>
                        <span className={`text-[12px] font-mono font-bold ${textTone[p.tone]} w-10 text-right`}>%{p.percent}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <div className={`h-full bg-linear-to-r ${barTone[p.tone]} rounded-full`} style={{ width: `${p.percent}%` }} />
                      </div>
                    </div>
                  );
                })}
                {/* Lifecycle footer */}
                <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/8 mt-1">
                  {[
                    { label: "Tanımla", icon: FilePlus2 },
                    { label: "Atama", icon: Share2 },
                    { label: "Takip", icon: Activity },
                    { label: "Rapor", icon: Target },
                  ].map((s, i, arr) => {
                    const Icon = s.icon;
                    return (
                      <div key={i} className="flex items-center gap-1 flex-1">
                        <div className="w-5 h-5 rounded-md bg-blue-500/15 border border-blue-500/30 flex items-center justify-center shrink-0">
                          <Icon className="w-2.5 h-2.5 text-(--color-accent-blue-light)" />
                        </div>
                        <span className="text-[8px] font-medium text-white">{s.label}</span>
                        {i < arr.length - 1 && (
                          <span className="text-[8px] text-(--color-text-muted) ml-auto">›</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right — Risk altındaki kayıtlar */}
              <div className="rounded-2xl border border-white/10 bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-2">
                <div className="flex items-center justify-between pb-2 border-b border-white/8">
                  <div className="flex items-center gap-1.5">
                    <Bell className="w-3.5 h-3.5 text-(--color-accent-red-light)" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white">Risk Altındaki Kayıtlar</span>
                  </div>
                  <span className="text-[8px] font-mono font-bold text-(--color-accent-red-light) px-1.5 py-0.5 rounded-full bg-red-500/12 border border-red-500/25 animate-pulse">
                    5 kritik
                  </span>
                </div>
                {[
                  { id: "INC-2412", title: "ERP API timeout", policy: "Premium · P1", remaining: "0s 18d", percent: 92, tone: "red" },
                  { id: "REQ-0871", title: "VPN erişim talebi", policy: "Premium · P2", remaining: "1s 22d", percent: 76, tone: "amber" },
                  { id: "INC-2410", title: "Mail gecikme", policy: "Standart · P3", remaining: "2s 03d", percent: 64, tone: "amber" },
                  { id: "INC-2409", title: "AD parola sync", policy: "Standart · P3", remaining: "3s 45d", percent: 38, tone: "emerald" },
                  { id: "REQ-0869", title: "Yazılım lisans", policy: "Best-Effort · P4", remaining: "6s 10d", percent: 18, tone: "emerald" },
                ].map((r, i) => {
                  const barTone: Record<string, string> = {
                    red: "from-red-500 to-red-400",
                    amber: "from-amber-500 to-amber-400",
                    emerald: "from-emerald-500 to-emerald-400",
                  };
                  const textTone: Record<string, string> = {
                    red: "text-(--color-accent-red-light)",
                    amber: "text-amber-300",
                    emerald: "text-(--color-accent-emerald-light)",
                  };
                  return (
                    <div key={i} className="flex flex-col gap-1 px-2 py-1.5 rounded-lg bg-white/2 border border-white/5">
                      <div className="grid grid-cols-[auto_1fr_auto_auto] gap-2 items-center">
                        <span className="text-[8px] font-mono text-(--color-text-muted)">{r.id}</span>
                        <span className="text-[10px] font-medium text-white truncate">{r.title}</span>
                        <span className="text-[8px] font-mono text-(--color-text-muted)">{r.policy}</span>
                        <span className={`text-[10px] font-mono font-bold ${textTone[r.tone]} w-12 text-right`}>{r.remaining}</span>
                      </div>
                      <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                        <div className={`h-full bg-linear-to-r ${barTone[r.tone]} rounded-full`} style={{ width: `${r.percent}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom — Multi-level SLA targets */}
            <div className="rounded-2xl border border-white/10 bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-(--color-accent-purple-light)" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white">Multi-Level SLA Hedefleri · Aktif Kayıt</span>
                </div>
                <span className="text-[8px] font-mono text-(--color-text-muted)">3 paralel hedef</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Yanıt Süresi", target: "30 dk", percent: 95, current: "28dk", tone: "emerald" },
                  { label: "Ara Hedef", target: "2 sa", percent: 70, current: "1s 24dk", tone: "amber" },
                  { label: "Çözüm Süresi", target: "8 sa", percent: 40, current: "3s 12dk", tone: "blue" },
                ].map((s, i) => {
                  const tone: Record<string, string> = {
                    emerald: "text-(--color-accent-emerald-light) from-emerald-500 to-emerald-400",
                    amber: "text-amber-300 from-amber-500 to-amber-400",
                    blue: "text-(--color-accent-blue-light) from-blue-500 to-cyan-400",
                  };
                  const [colorClass, gradFrom, gradTo] = tone[s.tone].split(" ");
                  return (
                    <div key={i} className="flex flex-col gap-1.5 px-3 py-2 rounded-lg bg-white/2 border border-white/8">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-medium text-(--color-text-secondary)">{s.label}</span>
                        <span className={`text-[10px] font-mono font-bold ${colorClass}`}>{s.target}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <div className={`h-full bg-linear-to-r ${gradFrom} ${gradTo} rounded-full`} style={{ width: `${s.percent}%` }} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[8px] font-mono text-(--color-text-muted)">harcanan</span>
                        <span className="text-[9px] font-mono font-semibold text-white">{s.current}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-(--color-surface-base) to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* 2. ZIG-ZAG FEATURE BLOCKS */}
      <section className="py-24 relative z-20">
        <div className="container mx-auto px-6 lg:px-12 w-full max-w-7xl flex flex-col gap-32">
          {/* Feature 1: SLA Policy */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "100px" }}
            variants={fadeUp}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-blue-500/5 to-cyan-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-blue-500/10 blur-[50px] group-hover:bg-blue-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full h-135 rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-(--color-surface-elevated-solid) flex flex-col p-4 gap-3">
                  {/* Toolbar */}
                  <div className="flex items-center justify-between pb-2 border-b border-white/8">
                    <div className="flex items-center gap-1.5">
                      <Gauge className="w-3.5 h-3.5 text-(--color-accent-blue-light)" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white">SLA Policy Yönetimi</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-[8px] font-mono text-(--color-text-muted)">3 policy</span>
                      <span className="text-[8px] font-mono font-semibold text-(--color-accent-blue-light) px-1.5 py-0.5 rounded-md bg-blue-500/12 border border-blue-500/25">
                        + Yeni
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3 flex-1 overflow-hidden">
                    {/* Left — policy list */}
                    <div className="w-1/3 flex flex-col gap-1.5 border-r border-white/8 pr-3">
                      <span className="text-[8px] font-semibold uppercase tracking-widest text-(--color-text-muted) mb-0.5 px-1">
                        Policy&apos;ler
                      </span>
                      {[
                        { name: "Premium", desc: "Kritik müşteri", count: 12, active: true, tone: "blue" },
                        { name: "Standart", desc: "Genel servis", count: 24, active: false, tone: "cyan" },
                        { name: "Best-Effort", desc: "Düşük öncelik", count: 6, active: false, tone: "emerald" },
                      ].map((p, i) => {
                        const tone: Record<string, string> = {
                          blue: "bg-blue-500/15 border-blue-500/35 shadow-[0_0_15px_rgba(59,130,246,0.15)]",
                          cyan: "border-transparent hover:bg-white/3",
                          emerald: "border-transparent hover:bg-white/3",
                        };
                        const dot: Record<string, string> = {
                          blue: "bg-(--color-accent-blue-light)",
                          cyan: "bg-(--color-accent-cyan-light)",
                          emerald: "bg-(--color-accent-emerald-light)",
                        };
                        return (
                          <div
                            key={i}
                            className={`flex flex-col gap-0.5 px-2 py-1.5 rounded-lg border ${p.active ? tone.blue : tone[p.tone]}`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1.5">
                                <span className={`w-1.5 h-1.5 rounded-full ${dot[p.tone]} shadow-[0_0_6px_currentColor]`} />
                                <span className={`text-[10px] font-bold ${p.active ? "text-white" : "text-(--color-text-secondary)"}`}>
                                  {p.name}
                                </span>
                              </div>
                              <span className="text-[8px] font-mono text-(--color-text-muted)">{p.count}</span>
                            </div>
                            <span className="text-[8px] text-(--color-text-muted) pl-3">{p.desc}</span>
                          </div>
                        );
                      })}

                      {/* Linked services */}
                      <div className="mt-2 pt-2 border-t border-white/5 flex flex-col gap-1">
                        <span className="text-[8px] font-semibold uppercase tracking-widest text-(--color-text-muted) mb-0.5 px-1">
                          Bağlı Servisler
                        </span>
                        {["E-posta Sistemi", "ERP Servisi", "CRM"].map((s, i) => (
                          <div key={i} className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/2 border border-white/5">
                            <Share2 className="w-2.5 h-2.5 text-(--color-accent-blue-light)" />
                            <span className="text-[9px] text-white truncate">{s}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right — active policy detail */}
                    <div className="flex-1 flex flex-col gap-2 min-w-0">
                      {/* Detail header */}
                      <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-linear-to-r from-blue-500/15 to-cyan-500/8 border border-blue-500/30">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                            <Gauge className="w-3.5 h-3.5 text-(--color-accent-blue-light)" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[8px] font-mono uppercase tracking-wider text-(--color-text-muted)">Aktif Policy</span>
                            <span className="text-[11px] font-bold text-white">Premium · 12 kayıt</span>
                          </div>
                        </div>
                        <span className="text-[8px] font-mono font-semibold text-(--color-accent-emerald-light) px-1.5 py-0.5 rounded-full bg-emerald-500/12 border border-emerald-500/25">
                          AKTİF
                        </span>
                      </div>

                      {/* SLA matrix */}
                      <div className="flex flex-col gap-1">
                        <span className="text-[8px] font-semibold uppercase tracking-widest text-(--color-text-muted) mb-0.5">
                          Öncelik Matrisi
                        </span>
                        <div className="grid grid-cols-[auto_1fr_1fr_1fr] gap-1 px-2 py-1 text-[8px] font-semibold uppercase tracking-wider text-(--color-text-muted) bg-white/3 border border-white/5 rounded-md">
                          <span className="w-8">Önc.</span>
                          <span>Yanıt</span>
                          <span>Çözüm</span>
                          <span>Eskal.</span>
                        </div>
                        {[
                          { p: "P1", color: "red", response: "15dk", resolve: "2sa", esc: "30dk" },
                          { p: "P2", color: "orange", response: "30dk", resolve: "4sa", esc: "1sa" },
                          { p: "P3", color: "cyan", response: "1sa", resolve: "8sa", esc: "2sa" },
                          { p: "P4", color: "emerald", response: "4sa", resolve: "24sa", esc: "8sa" },
                        ].map((r, i) => {
                          const tone: Record<string, string> = {
                            red: "bg-red-500/15 text-(--color-accent-red-light) border-red-500/30",
                            orange: "bg-orange-500/15 text-(--color-accent-orange-light) border-orange-500/30",
                            cyan: "bg-cyan-500/15 text-(--color-accent-cyan-light) border-cyan-500/30",
                            emerald: "bg-emerald-500/15 text-(--color-accent-emerald-light) border-emerald-500/30",
                          };
                          return (
                            <div key={i} className="grid grid-cols-[auto_1fr_1fr_1fr] gap-1 px-2 py-1.5 items-center bg-white/2 border border-white/5 rounded-md">
                              <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${tone[r.color]} w-8 text-center`}>
                                {r.p}
                              </span>
                              <span className="text-[10px] font-mono font-semibold text-white">{r.response}</span>
                              <span className="text-[10px] font-mono font-semibold text-white">{r.resolve}</span>
                              <span className="text-[10px] font-mono font-semibold text-(--color-accent-orange-light)">{r.esc}</span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Notification rules */}
                      <div className="flex flex-col gap-1 mt-1">
                        <span className="text-[8px] font-semibold uppercase tracking-widest text-(--color-text-muted) mb-0.5">
                          Bildirim Kuralları
                        </span>
                        {[
                          { trigger: "%50 ulaşılınca", action: "Sahibe e-posta", tone: "cyan" },
                          { trigger: "%80 ulaşılınca", action: "Yöneticiye uyarı", tone: "orange" },
                          { trigger: "İhlal anında", action: "CAB + SMS", tone: "red" },
                        ].map((n, i) => {
                          const tone: Record<string, string> = {
                            cyan: "text-(--color-accent-cyan-light)",
                            orange: "text-(--color-accent-orange-light)",
                            red: "text-(--color-accent-red-light)",
                          };
                          return (
                            <div key={i} className="grid grid-cols-[1fr_auto_1fr] gap-2 items-center px-2 py-1.5 rounded-md bg-white/2 border border-white/5">
                              <span className="text-[9px] font-medium text-white truncate">{n.trigger}</span>
                              <span className={`text-[9px] font-mono ${tone[n.tone]}`}>→</span>
                              <span className="text-[9px] text-(--color-text-secondary) truncate">{n.action}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-(--color-accent-blue-light)">
                <Gauge size={32} />
              </div>
              <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight">
                {data.zigzag[0].titleLead}
                <br />
                <span className="text-(--color-accent-blue-light)">
                  {data.zigzag[0].titleAccent}
                </span>
              </h2>
              <p className="text-lg text-(--color-text-secondary) leading-relaxed font-light">
                {data.zigzag[0].description}
              </p>
              <ul className="space-y-4">
                {data.zigzag[0].bullets.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-(--color-text-overline)"
                  >
                    <CheckCircle2 className="w-5 h-5 text-(--color-accent-blue-light) shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Feature 2: Incident & Request Entegrasyonu (mock) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "100px" }}
            variants={fadeUp}
            className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-emerald-500/5 to-cyan-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-emerald-500/10 blur-[50px] group-hover:bg-emerald-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full h-135 rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-(--color-surface-elevated-solid) flex flex-col p-8 gap-3">
                  {/* SLM center node */}
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] font-semibold uppercase tracking-widest text-(--color-text-muted)">
                      SLA Policy Eşleşmesi
                    </span>
                    <span className="text-[10px] font-mono text-(--color-accent-emerald-light)">
                      otomatik
                    </span>
                  </div>

                  <div className="flex items-center justify-center px-4 py-3 rounded-xl bg-linear-to-r from-emerald-500/15 to-cyan-500/10 border border-emerald-500/30 mb-2">
                    <div className="flex items-center gap-2">
                      <Gauge className="w-4 h-4 text-(--color-accent-emerald-light)" />
                      <span className="text-sm font-bold text-white">
                        SLM Modülü
                      </span>
                    </div>
                  </div>

                  {/* Incident integration */}
                  <div className="flex items-start gap-3 px-3 py-3 rounded-lg bg-white/2 border border-white/8">
                    <div className="w-9 h-9 rounded-lg bg-blue-500/15 border border-blue-500/25 flex items-center justify-center shrink-0">
                      <AlertCircle className="w-4 h-4 text-(--color-accent-blue-light)" />
                    </div>
                    <div className="flex-1 flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-white">
                          Olay #INC-2412
                        </span>
                        <span className="text-[9px] font-mono text-(--color-accent-blue-light)">
                          Yüksek
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-(--color-text-muted)">
                          SLA Policy → Premium-P1
                        </span>
                        <span className="font-mono text-white">2sa kaldı</span>
                      </div>
                      <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                        <div className="h-full w-3/4 bg-linear-to-r from-blue-500/70 to-cyan-400/80" />
                      </div>
                    </div>
                  </div>

                  {/* Request integration */}
                  <div className="flex items-start gap-3 px-3 py-3 rounded-lg bg-white/2 border border-white/8">
                    <div className="w-9 h-9 rounded-lg bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center shrink-0">
                      <MousePointerClick className="w-4 h-4 text-(--color-accent-emerald-light)" />
                    </div>
                    <div className="flex-1 flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-white">
                          İstek #REQ-0871
                        </span>
                        <span className="text-[9px] font-mono text-(--color-accent-emerald-light)">
                          Standart
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-(--color-text-muted)">
                          SLA Policy → Standart-P3
                        </span>
                        <span className="font-mono text-white">
                          1 gün 4sa kaldı
                        </span>
                      </div>
                      <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                        <div className="h-full w-2/5 bg-linear-to-r from-emerald-500/70 to-cyan-400/80" />
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/5 mt-auto">
                    <span className="text-[10px] font-medium text-(--color-text-muted)">
                      Önceliklendirme
                    </span>
                    <span className="text-[10px] font-semibold text-(--color-accent-emerald-light)">
                      kural bazlı, otomatik
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-(--color-accent-emerald-light)">
                <Share2 size={32} />
              </div>
              <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight">
                {data.zigzag[1].titleLead}
                <br />
                <span className="text-(--color-accent-emerald-light)">
                  {data.zigzag[1].titleAccent}
                </span>
              </h2>
              <p className="text-lg text-(--color-text-secondary) leading-relaxed font-light">
                {data.zigzag[1].description}
              </p>
              <ul className="space-y-4">
                {data.zigzag[1].bullets.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-(--color-text-overline)"
                  >
                    <CheckCircle2 className="w-5 h-5 text-(--color-accent-emerald-light) shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Feature 3: Due Date Otomasyonu (mock calendar) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "100px" }}
            variants={fadeUp}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-purple-500/5 to-indigo-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-purple-500/10 blur-[50px] group-hover:bg-purple-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full h-135 rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-(--color-surface-elevated-solid) flex flex-col p-8 gap-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] font-semibold uppercase tracking-widest text-(--color-text-muted)">
                      Due Date Hesaplaması
                    </span>
                    <span className="text-[10px] font-mono text-(--color-accent-purple-light)">
                      auto
                    </span>
                  </div>

                  {/* Inputs */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col gap-1 px-3 py-2.5 rounded-lg bg-white/3 border border-white/8">
                      <span className="text-[9px] font-medium uppercase tracking-wider text-(--color-text-muted)">
                        Açılış
                      </span>
                      <span className="text-xs font-mono font-bold text-white">
                        Cum 17:42
                      </span>
                    </div>
                    <div className="flex flex-col gap-1 px-3 py-2.5 rounded-lg bg-blue-500/10 border border-blue-500/20">
                      <span className="text-[9px] font-medium uppercase tracking-wider text-(--color-text-muted)">
                        SLA Hedefi
                      </span>
                      <span className="text-xs font-mono font-bold text-(--color-accent-blue-light)">
                        8 saat
                      </span>
                    </div>
                  </div>

                  {/* Calculation parameters */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/2 border border-white/5">
                      <CalendarClock className="w-3.5 h-3.5 text-(--color-accent-cyan-light)" />
                      <span className="text-[10px] font-medium text-white flex-1">
                        Çalışma saati
                      </span>
                      <span className="text-[10px] font-mono text-(--color-text-muted)">
                        09:00 — 18:00
                      </span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/2 border border-white/5">
                      <CalendarClock className="w-3.5 h-3.5 text-(--color-accent-orange-light)" />
                      <span className="text-[10px] font-medium text-white flex-1">
                        Hafta sonu
                      </span>
                      <span className="text-[10px] font-mono text-(--color-accent-orange-light)">
                        sayaç dur
                      </span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/2 border border-white/5">
                      <CalendarClock className="w-3.5 h-3.5 text-red-400" />
                      <span className="text-[10px] font-medium text-white flex-1">
                        Resmi tatil (1 Mayıs)
                      </span>
                      <span className="text-[10px] font-mono text-red-400">
                        sayaç dur
                      </span>
                    </div>
                  </div>

                  {/* Result */}
                  <div className="flex items-center justify-between mt-auto px-4 py-3 rounded-xl bg-linear-to-r from-purple-500/20 to-indigo-500/15 border border-purple-500/40 shadow-[0_0_30px_rgba(168,85,247,0.15)]">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-(--color-accent-purple-light)" />
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-(--color-text-muted)">
                        Due Date
                      </span>
                    </div>
                    <span className="text-sm font-mono font-bold text-white">
                      Salı 14:42
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-(--color-accent-purple-light)">
                <Clock size={32} />
              </div>
              <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight">
                {data.zigzag[2].titleLead}
                <br />
                <span className="text-(--color-accent-purple-light)">
                  {data.zigzag[2].titleAccent}
                </span>
              </h2>
              <p className="text-lg text-(--color-text-secondary) leading-relaxed font-light">
                {data.zigzag[2].description}
              </p>
              <ul className="space-y-4">
                {data.zigzag[2].bullets.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-(--color-text-overline)"
                  >
                    <CheckCircle2 className="w-5 h-5 text-(--color-accent-purple-light) shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. BENTO GRID */}
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
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[420px]"
          >
            {/* Bento 1 - Multi-Level SLA (wide) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 lg:col-span-2 row-span-1 rounded-4xl bg-linear-to-br from-blue-500/10 to-transparent border border-white/10 p-8 hover:bg-white/4 transition-colors relative overflow-hidden group flex flex-col md:flex-row gap-6 items-center"
            >
              <div className="w-full md:w-1/2 flex flex-col justify-center shrink-0">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-(--color-accent-blue-light) flex items-center justify-center mb-6">
                  <Layers />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {data.bento.items[0].title}
                </h3>
                <p className="text-sm text-(--color-text-secondary) font-light pr-4">
                  {data.bento.items[0].description}
                </p>
              </div>
              <div className="w-full md:w-1/2 h-45 md:h-full relative rounded-xl border border-white/10 overflow-hidden shadow-inner shrink-0 bg-(--color-surface-elevated-solid) group-hover:border-blue-500/40 transition-colors flex flex-col gap-2 p-4 justify-center">
                {[
                  { level: "Yanıt Süresi", target: "30dk", pct: 95 },
                  { level: "Ara Hedef", target: "2sa", pct: 70 },
                  { level: "Çözüm Süresi", target: "8sa", pct: 40 },
                ].map((row, i) => (
                  <div key={i} className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="font-medium text-(--color-text-secondary)">
                        {row.level}
                      </span>
                      <span className="font-mono font-semibold text-white">
                        {row.target}
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full bg-linear-to-r from-blue-500/70 to-cyan-400/80 rounded-full"
                        style={{ width: `${row.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <span className="text-[9px] font-medium uppercase tracking-wider text-(--color-text-muted)">
                    Aynı kayıt
                  </span>
                  <span className="text-[10px] font-mono font-bold text-white">
                    3 paralel hedef
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Bento 2 - Kolay SLA Girişi (normal) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-(--color-accent-orange-light) flex items-center justify-center mb-6 shrink-0">
                <FilePlus2 />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[1].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[1].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-2 justify-center">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-medium text-(--color-text-muted)">
                    Servis
                  </span>
                  <div className="px-3 py-2 rounded-lg bg-white/3 border border-white/8 text-[11px] text-white">
                    E-posta Sistemi
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-medium text-(--color-text-muted)">
                      Yanıt
                    </span>
                    <div className="px-3 py-2 rounded-lg bg-orange-500/10 border border-orange-500/20 text-[11px] font-mono font-bold text-(--color-accent-orange-light)">
                      30 dk
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-medium text-(--color-text-muted)">
                      Çözüm
                    </span>
                    <div className="px-3 py-2 rounded-lg bg-orange-500/10 border border-orange-500/20 text-[11px] font-mono font-bold text-(--color-accent-orange-light)">
                      4 sa
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bento 3 - Kural Bazlı Öncelik (normal) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-(--color-accent-cyan-light) flex items-center justify-center mb-6 shrink-0">
                <ListOrdered />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[2].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[2].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-2 justify-center">
                {[
                  { p: "P1", label: "Kritik", color: "red" },
                  { p: "P2", label: "Yüksek", color: "orange" },
                  { p: "P3", label: "Orta", color: "cyan" },
                  { p: "P4", label: "Düşük", color: "emerald" },
                ].map((row, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/3 border border-white/5"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                          row.color === "red"
                            ? "bg-red-500/15 text-red-400 border border-red-500/30"
                            : row.color === "orange"
                              ? "bg-orange-500/15 text-(--color-accent-orange-light) border border-orange-500/30"
                              : row.color === "cyan"
                                ? "bg-cyan-500/15 text-(--color-accent-cyan-light) border border-cyan-500/30"
                                : "bg-emerald-500/15 text-(--color-accent-emerald-light) border border-emerald-500/30"
                        }`}
                      >
                        {row.p}
                      </span>
                      <span className="text-[11px] font-medium text-white">
                        {row.label}
                      </span>
                    </div>
                    <span className="text-[9px] font-mono text-(--color-text-muted)">
                      kural #{i + 1}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bento 4 - Çalışma Takvimi (wide) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 lg:col-span-2 row-span-1 rounded-4xl bg-linear-to-br from-purple-500/10 to-transparent border border-white/10 p-8 hover:bg-white/4 transition-colors relative overflow-hidden group flex flex-col md:flex-row gap-6 items-center"
            >
              <div className="w-full md:w-1/2 flex flex-col justify-center shrink-0">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-(--color-accent-purple-light) flex items-center justify-center mb-6">
                  <CalendarClock />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {data.bento.items[3].title}
                </h3>
                <p className="text-sm text-(--color-text-secondary) font-light pr-4">
                  {data.bento.items[3].description}
                </p>
              </div>
              <div className="w-full md:w-1/2 h-45 md:h-full relative rounded-xl border border-white/10 overflow-hidden shadow-inner shrink-0 bg-(--color-surface-elevated-solid) group-hover:border-purple-500/40 transition-colors p-4 flex flex-col gap-1.5 justify-center">
                <div className="grid grid-cols-7 gap-1.5">
                  {["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"].map(
                    (d, i) => (
                      <span
                        key={i}
                        className="text-[9px] font-semibold uppercase tracking-wider text-(--color-text-muted) text-center"
                      >
                        {d}
                      </span>
                    )
                  )}
                </div>
                <div className="grid grid-cols-7 gap-1.5">
                  {[
                    { active: true },
                    { active: true },
                    { active: true, holiday: true },
                    { active: true },
                    { active: true },
                    { active: false },
                    { active: false },
                  ].map((cell, i) => (
                    <div
                      key={i}
                      className={`aspect-square rounded-lg border flex items-center justify-center text-[10px] font-mono ${
                        cell.holiday
                          ? "bg-red-500/15 border-red-500/30 text-red-400"
                          : cell.active
                            ? "bg-purple-500/15 border-purple-500/30 text-white"
                            : "bg-white/2 border-white/5 text-(--color-text-muted)"
                      }`}
                    >
                      {cell.holiday ? "T" : cell.active ? "✓" : "—"}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-2 mt-1 border-t border-white/5 text-[9px] font-medium">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-sm bg-purple-500/30 border border-purple-500/40" />
                    <span className="text-(--color-text-secondary)">Mesai</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-sm bg-red-500/30 border border-red-500/40" />
                    <span className="text-(--color-text-secondary)">Tatil</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-sm bg-white/5 border border-white/10" />
                    <span className="text-(--color-text-secondary)">
                      Hafta sonu
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bento 5 - Servis Kalite Metrikleri (normal) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 border border-white/10 bg-linear-to-br from-indigo-500/5 to-transparent rounded-4xl p-8 hover:bg-white/4 transition-colors flex flex-col overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-6 shrink-0">
                <Target />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[4].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[4].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-3 justify-center">
                <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-3.5 h-3.5 text-(--color-accent-emerald-light)" />
                    <span className="text-[11px] font-medium text-white">
                      SLA uyumu
                    </span>
                  </div>
                  <span className="text-sm font-mono font-bold text-(--color-accent-emerald-light)">
                    %94
                  </span>
                </div>
                <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-orange-500/10 border border-orange-500/20">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-3.5 h-3.5 text-(--color-accent-orange-light)" />
                    <span className="text-[11px] font-medium text-white">
                      İhlal sayısı
                    </span>
                  </div>
                  <span className="text-sm font-mono font-bold text-(--color-accent-orange-light)">
                    8
                  </span>
                </div>
                <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                  <div className="flex items-center gap-2">
                    <ListOrdered className="w-3.5 h-3.5 text-(--color-accent-cyan-light)" />
                    <span className="text-[11px] font-medium text-white">
                      Eskalasyon
                    </span>
                  </div>
                  <span className="text-sm font-mono font-bold text-(--color-accent-cyan-light)">
                    3
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Bento 6 - Otomatik Due Date (normal) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-(--color-accent-emerald-light) flex items-center justify-center mb-6 shrink-0">
                <Clock />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[5].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[5].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-2 justify-center">
                <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/3 border border-white/5">
                  <span className="text-[10px] font-medium text-(--color-text-muted)">
                    Açılış
                  </span>
                  <span className="text-[11px] font-mono text-white">
                    Pzt 10:15
                  </span>
                </div>
                <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/3 border border-white/5">
                  <span className="text-[10px] font-medium text-(--color-text-muted)">
                    SLA
                  </span>
                  <span className="text-[11px] font-mono text-white">4 sa</span>
                </div>
                <div className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-(--color-accent-emerald-light)">
                    Due Date
                  </span>
                  <span className="text-[11px] font-mono font-bold text-white">
                    Pzt 14:15
                  </span>
                </div>
                <div className="flex items-center justify-between text-[9px] pt-1">
                  <span className="font-medium text-(--color-text-muted)">
                    Otomatik yazıldı
                  </span>
                  <span className="font-mono text-(--color-accent-emerald-light)">
                    ✓
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 4. CTA BANNER */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="container mx-auto pb-20 max-w-7xl mt-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="group relative flex flex-col justify-center overflow-hidden rounded-3xl bg-linear-to-br from-(--color-brand-primary) to-(--color-brand-purple) p-1 md:p-px"
            >
              <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative h-full flex flex-col items-center justify-center text-center rounded-[23px] bg-(--color-surface-elevated-solid)/90 backdrop-blur-3xl px-8 py-16 md:px-12">
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

                <div className="relative z-10 w-full">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 mx-auto">
                    <Activity className="w-4 h-4 text-(--color-accent-blue-light)" />
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-text-overline)">
                      Servis Seviye Yönetimi
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
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                        Multi-Level SLA
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                        <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-blue-base) shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                        Otomatik Önceliklendirme
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                        <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-purple-base) shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
                        Takvim Hassas Due Date
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
