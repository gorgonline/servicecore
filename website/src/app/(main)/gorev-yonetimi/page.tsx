"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import {
  CheckCircle2,
  ArrowRight,
  ListTodo,
  Cpu,
  LayoutGrid,
  AlertTriangle,
  Users,
  Clock,
  Scale,
  Plus,
  Users2,
  CircleDashed,
  CircleDot,
  Circle,
  TrendingDown,
  Shuffle,
  EyeOff,
  CalendarX,
  Frown,
  Lock,
  XCircle,
  ChevronDown,
  ChevronRight,
  Filter,
  Activity,
  Zap,
  Headphones,
  AlertCircle,
  Briefcase,
  Server,
  RefreshCw,
} from "lucide-react";
import data from "@/data/gorev-yonetimi.json";

export default function GorevYonetimiPage() {
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
              <CheckCircle2 size={14} />
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
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                  <LayoutGrid className="w-5 h-5 text-(--color-accent-blue-light)" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-(--color-accent-blue-light)">
                    Görev Yönetimi · Kanban
                  </span>
                  <span className="text-lg lg:text-xl font-bold text-white tracking-tight">
                    Olay Modülü Görevleri
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-(--color-text-muted)">42 görev · 18 teknisyen</span>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-(--color-accent-emerald-light) shadow-[0_0_8px_currentColor] animate-pulse" />
                  <span className="text-[9px] font-mono uppercase tracking-widest text-(--color-accent-emerald-light)">canlı</span>
                </div>
              </div>
            </div>

            {/* Filter chips + module switcher */}
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Filter className="w-3 h-3 text-(--color-text-muted)" />
              <span className="text-[8px] font-mono uppercase tracking-widest text-(--color-text-muted)">Modül:</span>
              {[
                { label: "Olay", icon: AlertCircle, active: true, tone: "blue" },
                { label: "İstek", icon: Plus, tone: "cyan" },
                { label: "Problem", icon: AlertTriangle, tone: "purple" },
                { label: "Değişiklik", icon: RefreshCw, tone: "amber" },
                { label: "Proje", icon: Briefcase, tone: "emerald" },
              ].map((c, i) => {
                const Icon = c.icon;
                const t: Record<string, string> = {
                  blue: "bg-blue-500/15 border-blue-500/35 text-(--color-accent-blue-light) shadow-[0_0_10px_rgba(59,130,246,0.15)]",
                  cyan: "text-(--color-accent-cyan-light)",
                  purple: "text-(--color-accent-purple-light)",
                  amber: "text-amber-300",
                  emerald: "text-(--color-accent-emerald-light)",
                };
                return (
                  <span
                    key={i}
                    className={`flex items-center gap-1 text-[9px] font-medium px-2 py-1 rounded-full border ${
                      c.active ? t[c.tone] : `bg-white/3 border-white/8 ${t[c.tone]}`
                    }`}
                  >
                    <Icon className="w-2.5 h-2.5" />
                    {c.label}
                  </span>
                );
              })}
            </div>

            {/* Kanban board — 4 columns */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
              {[
                {
                  title: "Yeni",
                  count: 8,
                  tone: "blue",
                  cards: [
                    { id: "T-4218", title: "VPN sertifika incele", priority: "Yüksek", owner: "AY", time: "2dk" },
                    { id: "T-4217", title: "Mail server log", priority: "Orta", owner: "SK", time: "8dk" },
                  ],
                },
                {
                  title: "Devam Eden",
                  count: 12,
                  tone: "amber",
                  cards: [
                    { id: "T-4214", title: "DB performans test", priority: "Kritik", owner: "MB", time: "3sa" },
                    { id: "T-4210", title: "AD parola sync", priority: "Yüksek", owner: "AY", time: "5sa" },
                  ],
                },
                {
                  title: "İncelemede",
                  count: 6,
                  tone: "purple",
                  cards: [
                    { id: "T-4205", title: "Onay bekliyor", priority: "Orta", owner: "BE", time: "1g" },
                  ],
                },
                {
                  title: "Tamamlandı",
                  count: 16,
                  tone: "emerald",
                  cards: [
                    { id: "T-4198", title: "Yazıcı bakım", priority: "Düşük", owner: "AY", time: "1g" },
                    { id: "T-4196", title: "VPN reset", priority: "Yüksek", owner: "SK", time: "1g" },
                  ],
                },
              ].map((col, ci) => {
                const headerT: Record<string, string> = {
                  blue: "bg-blue-500/12 border-blue-500/25 text-(--color-accent-blue-light)",
                  amber: "bg-amber-500/12 border-amber-500/25 text-amber-300",
                  purple: "bg-purple-500/12 border-purple-500/25 text-(--color-accent-purple-light)",
                  emerald: "bg-emerald-500/12 border-emerald-500/25 text-(--color-accent-emerald-light)",
                };
                const pT: Record<string, string> = {
                  Kritik: "text-(--color-accent-red-light) bg-red-500/15 border-red-500/30",
                  Yüksek: "text-(--color-accent-red-light) bg-red-500/10 border-red-500/20",
                  Orta: "text-amber-300 bg-amber-500/10 border-amber-500/20",
                  Düşük: "text-(--color-accent-cyan-light) bg-cyan-500/10 border-cyan-500/20",
                };
                return (
                  <div key={ci} className="flex flex-col gap-2 min-w-0">
                    <div className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg border ${headerT[col.tone]}`}>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-white truncate">{col.title}</span>
                      <span className="text-[9px] font-mono font-bold">{col.count}</span>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      {col.cards.map((c, i) => (
                        <div
                          key={i}
                          className="rounded-lg bg-white/3 border border-white/8 p-2 flex flex-col gap-1.5 hover:bg-white/5 hover:border-white/15 transition-colors shadow-sm"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[8px] font-mono text-(--color-text-muted)">{c.id}</span>
                            <span className="text-[7px] font-mono text-(--color-text-muted)">{c.time}</span>
                          </div>
                          <span className="text-[10px] font-semibold text-white leading-tight">{c.title}</span>
                          <div className="flex items-center justify-between">
                            <span className={`text-[7px] font-mono font-semibold px-1.5 py-0.5 rounded-full border ${pT[c.priority]}`}>
                              {c.priority}
                            </span>
                            <div className="w-4 h-4 rounded-full bg-purple-500/30 border border-purple-500/40 flex items-center justify-center">
                              <span className="text-[6px] font-bold text-white">{c.owner}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="rounded-lg border border-dashed border-white/10 h-8 flex items-center justify-center">
                        <span className="text-[8px] font-mono text-(--color-text-muted)">+ kart</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer indicators */}
            <div className="rounded-2xl border border-white/10 bg-(--color-surface-elevated-solid) p-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <Cpu className="w-3 h-3 text-(--color-accent-purple-light)" />
                  <span className="text-[9px] font-mono uppercase tracking-widest text-white">WTE®</span>
                  <span className="text-[8px] text-(--color-text-muted)">aktif · yetkinlik bazlı atama</span>
                </div>
                <span className="hidden md:inline text-(--color-text-muted)">·</span>
                <div className="hidden md:flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-(--color-accent-cyan-light)" />
                  <span className="text-[9px] font-mono uppercase tracking-widest text-white">STE®</span>
                  <span className="text-[8px] text-(--color-text-muted)">otomatik süre takibi</span>
                </div>
              </div>
              <span className="text-[8px] font-mono text-(--color-text-muted)">sürükle · bırak</span>
            </div>

            <div className="absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-(--color-surface-base) to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* 2. ZIG-ZAG FEATURE BLOCKS */}
      <section className="py-24 relative z-20">
        <div className="container mx-auto px-6 lg:px-12 w-full max-w-7xl flex flex-col gap-32">
          {/* Feature 1: Merkezi Koordinasyon */}
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
                <div className="relative w-full h-135 rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-(--color-surface-elevated-solid) flex flex-col p-5 gap-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/8">
                    <div className="flex items-center gap-1.5">
                      <ListTodo className="w-3.5 h-3.5 text-(--color-accent-blue-light)" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white">Çapraz Modül Görev Listesi</span>
                    </div>
                    <span className="text-[8px] font-mono font-bold text-(--color-accent-blue-light) px-1.5 py-0.5 rounded-full bg-blue-500/12 border border-blue-500/25">
                      tek panel · 8 görev
                    </span>
                  </div>

                  {/* Module breakdown */}
                  <div className="grid grid-cols-5 gap-1.5">
                    {[
                      { icon: AlertCircle, name: "Olay", count: 18, tone: "blue" },
                      { icon: Plus, name: "İstek", count: 12, tone: "cyan" },
                      { icon: AlertTriangle, name: "Problem", count: 4, tone: "purple" },
                      { icon: RefreshCw, name: "Değiş.", count: 6, tone: "amber" },
                      { icon: Briefcase, name: "Proje", count: 2, tone: "emerald" },
                    ].map((m, i) => {
                      const Icon = m.icon;
                      const t: Record<string, string> = {
                        blue: "from-blue-500/15 to-blue-500/5 border-blue-500/25 text-(--color-accent-blue-light)",
                        cyan: "from-cyan-500/15 to-cyan-500/5 border-cyan-500/25 text-(--color-accent-cyan-light)",
                        purple: "from-purple-500/15 to-purple-500/5 border-purple-500/25 text-(--color-accent-purple-light)",
                        amber: "from-amber-500/15 to-amber-500/5 border-amber-500/25 text-amber-300",
                        emerald: "from-emerald-500/15 to-emerald-500/5 border-emerald-500/25 text-(--color-accent-emerald-light)",
                      };
                      return (
                        <div key={i} className={`rounded-lg bg-linear-to-br ${t[m.tone]} border p-2 flex flex-col items-center gap-0.5`}>
                          <Icon className="w-3 h-3" />
                          <span className="text-[8px] font-semibold text-white">{m.name}</span>
                          <span className="text-[7px] font-mono text-(--color-text-muted)">{m.count}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Cross-module task list */}
                  <div className="flex flex-col gap-1.5 flex-1 overflow-hidden">
                    {[
                      { id: "T-4218", source: "Olay", title: "VPN sertifika incele", owner: "Ahmet Y.", due: "2sa", srcIcon: AlertCircle, srcTone: "blue" },
                      { id: "T-4214", source: "Olay", title: "DB performans testi", owner: "Mehmet B.", due: "kritik", srcIcon: AlertCircle, srcTone: "blue" },
                      { id: "T-3892", source: "Değişiklik", title: "Cron job yenileme", owner: "Selin K.", due: "1g", srcIcon: RefreshCw, srcTone: "amber" },
                      { id: "T-3845", source: "Problem", title: "Kök neden analizi yaz", owner: "Bora E.", due: "3g", srcIcon: AlertTriangle, srcTone: "purple" },
                      { id: "T-2918", source: "Proje", title: "ESM modül kurulumu", owner: "BT Ekibi", due: "5g", srcIcon: Briefcase, srcTone: "emerald" },
                      { id: "T-2912", source: "İstek", title: "Yeni laptop hazırla", owner: "Ahmet Y.", due: "2g", srcIcon: Plus, srcTone: "cyan" },
                    ].map((t, i) => {
                      const SIcon = t.srcIcon;
                      const tone: Record<string, string> = {
                        blue: "text-(--color-accent-blue-light)",
                        cyan: "text-(--color-accent-cyan-light)",
                        purple: "text-(--color-accent-purple-light)",
                        amber: "text-amber-300",
                        emerald: "text-(--color-accent-emerald-light)",
                      };
                      const dueT = t.due === "kritik" ? "text-(--color-accent-red-light)" : "text-(--color-text-secondary)";
                      return (
                        <div key={i} className="grid grid-cols-[auto_auto_1fr_auto_auto] gap-2 items-center px-2.5 py-1.5 rounded-lg bg-white/2 border border-white/5">
                          <span className="text-[8px] font-mono text-(--color-text-muted)">{t.id}</span>
                          <div className="flex items-center gap-1">
                            <SIcon className={`w-2.5 h-2.5 ${tone[t.srcTone]}`} />
                            <span className={`text-[8px] font-mono font-semibold ${tone[t.srcTone]}`}>{t.source}</span>
                          </div>
                          <span className="text-[10px] font-medium text-white truncate">{t.title}</span>
                          <span className="text-[8px] font-mono text-(--color-text-secondary)">{t.owner}</span>
                          <span className={`text-[9px] font-mono font-bold ${dueT}`}>{t.due}</span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between pt-1.5 border-t border-white/8">
                    <span className="text-[8px] font-mono uppercase tracking-widest text-(--color-text-muted)">Tüm modüller · tek görev kayıt</span>
                    <span className="text-[8px] font-mono text-(--color-accent-blue-light)">42 aktif</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-(--color-accent-blue-light)">
                <ListTodo size={32} />
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

          {/* Feature 2: WTE & STE */}
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
                <div className="relative w-full h-135 rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-(--color-surface-elevated-solid) flex flex-col p-5 gap-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/8">
                    <div className="flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-(--color-accent-emerald-light)" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white">WTE® · İş Gücü Motoru</span>
                    </div>
                    <span className="text-[8px] font-mono font-bold text-(--color-accent-emerald-light) px-1.5 py-0.5 rounded-full bg-emerald-500/12 border border-emerald-500/25">
                      yetkinlik bazlı atama
                    </span>
                  </div>

                  {/* Yeni gelen görev — atama önerisi */}
                  <div className="rounded-xl bg-blue-500/10 border border-blue-500/25 p-3 flex flex-col gap-2 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] font-mono uppercase tracking-wider text-(--color-text-muted)">Yeni Görev</span>
                      <span className="text-[8px] font-mono font-bold text-(--color-accent-blue-light)">T-4218</span>
                    </div>
                    <span className="text-[11px] font-bold text-white">VPN sertifika analiz ve yenileme</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[7px] font-mono uppercase text-(--color-text-muted)">YETKİNLİK:</span>
                      <span className="text-[8px] font-medium px-1.5 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-(--color-accent-purple-light)">VPN</span>
                      <span className="text-[8px] font-medium px-1.5 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-(--color-accent-purple-light)">PKI</span>
                      <span className="text-[8px] font-medium px-1.5 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-(--color-accent-purple-light)">Network</span>
                    </div>
                  </div>

                  {/* Teknisyen önerileri (WTE skor) */}
                  <div className="flex flex-col gap-1.5 flex-1">
                    <span className="text-[8px] font-mono uppercase tracking-wider text-(--color-text-muted)">Önerilen Teknisyenler · WTE Skor</span>
                    {[
                      { name: "Ahmet Y.", level: "Kıdemli", workload: 60, score: 96, recommended: true, tone: "emerald" },
                      { name: "Selin K.", level: "Uzman", workload: 85, score: 88, recommended: false, tone: "amber" },
                      { name: "Bora E.", level: "Mid", workload: 45, score: 72, recommended: false, tone: "blue" },
                      { name: "Mehmet B.", level: "Junior", workload: 30, score: 51, recommended: false, tone: "blue" },
                    ].map((t, i) => {
                      const tone: Record<string, string> = {
                        emerald: "from-emerald-500 to-emerald-400 text-(--color-accent-emerald-light)",
                        amber: "from-amber-500 to-amber-400 text-amber-300",
                        blue: "from-blue-500 to-cyan-400 text-(--color-accent-blue-light)",
                      };
                      const [grad, color] = tone[t.tone].split(" text-");
                      return (
                        <div key={i} className={`flex flex-col gap-1.5 px-2.5 py-2 rounded-lg ${t.recommended ? "bg-emerald-500/10 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.15)]" : "bg-white/2 border border-white/5"}`}>
                          <div className="grid grid-cols-[auto_1fr_auto_auto] gap-2 items-center">
                            <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                              <span className="text-[7px] font-bold text-(--color-accent-blue-light)">{t.name.split(" ").map(s => s[0]).join("")}</span>
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="text-[10px] font-bold text-white">{t.name}</span>
                              <span className="text-[8px] font-mono text-(--color-text-muted)">{t.level}</span>
                            </div>
                            {t.recommended && (
                              <span className="text-[7px] font-mono font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-(--color-accent-emerald-light)">
                                ÖNERİLEN
                              </span>
                            )}
                            <span className={`text-[10px] font-mono font-bold text-${color} w-8 text-right`}>{t.score}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[7px] font-mono uppercase text-(--color-text-muted) w-12">İŞ YÜKÜ</span>
                            <div className="h-1 flex-1 rounded-full bg-white/5 overflow-hidden">
                              <div className={`h-full bg-linear-to-r ${grad} rounded-full`} style={{ width: `${t.workload}%` }} />
                            </div>
                            <span className="text-[8px] font-mono text-(--color-text-secondary) w-8 text-right">%{t.workload}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Auto-assign banner */}
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/25 mt-auto">
                    <Zap className="w-3 h-3 text-(--color-accent-emerald-light) shrink-0" />
                    <span className="text-[9px] font-medium text-white flex-1">Otomatik atama: <strong>Ahmet Y.</strong> (yetkinlik + iş yükü dengeli)</span>
                    <ChevronRight className="w-2.5 h-2.5 text-(--color-text-muted)" />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-(--color-accent-emerald-light)">
                <Cpu size={32} />
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

          {/* Feature 3: Sürece Özel Kanban (mock kanban board) */}
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
                <div className="relative w-full h-135 rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-(--color-surface-elevated-solid) flex flex-col p-6 gap-3">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <LayoutGrid className="w-3.5 h-3.5 text-(--color-accent-purple-light)" />
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-(--color-text-muted)">
                        Olay Süreci · Kanban
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {["Olay", "İstek", "Değişiklik"].map((t, i) => (
                        <span
                          key={i}
                          className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${
                            i === 0
                              ? "bg-purple-500/15 border-purple-500/30 text-(--color-accent-purple-light)"
                              : "bg-white/3 border-white/8 text-(--color-text-muted)"
                          }`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 flex-1">
                    {/* Yapılacak */}
                    <div className="flex flex-col gap-2 rounded-xl bg-white/2 border border-white/5 p-2">
                      <div className="flex items-center justify-between px-1">
                        <div className="flex items-center gap-1.5">
                          <Circle className="w-3 h-3 text-(--color-text-muted)" />
                          <span className="text-[10px] font-semibold text-white">
                            Yapılacak
                          </span>
                        </div>
                        <span className="text-[9px] font-mono text-(--color-text-muted)">
                          4
                        </span>
                      </div>
                      {[
                        "Sunucu yeniden başlat",
                        "Log analizi",
                        "Kullanıcı onayı",
                        "DB temizliği",
                      ].map((t, i) => (
                        <div
                          key={i}
                          className="px-2 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20"
                        >
                          <span className="text-[10px] text-white">{t}</span>
                        </div>
                      ))}
                    </div>

                    {/* İşlemde */}
                    <div className="flex flex-col gap-2 rounded-xl bg-white/2 border border-white/5 p-2">
                      <div className="flex items-center justify-between px-1">
                        <div className="flex items-center gap-1.5">
                          <CircleDashed className="w-3 h-3 text-(--color-accent-orange-light) animate-spin-slow" />
                          <span className="text-[10px] font-semibold text-white">
                            İşlemde
                          </span>
                        </div>
                        <span className="text-[9px] font-mono text-(--color-text-muted)">
                          3
                        </span>
                      </div>
                      {[
                        "Patch uygulama",
                        "Yetki revizyonu",
                        "Kapasite testi",
                      ].map((t, i) => (
                        <div
                          key={i}
                          className="px-2 py-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20"
                        >
                          <span className="text-[10px] text-white">{t}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tamamlandı */}
                    <div className="flex flex-col gap-2 rounded-xl bg-white/2 border border-white/5 p-2">
                      <div className="flex items-center justify-between px-1">
                        <div className="flex items-center gap-1.5">
                          <CircleDot className="w-3 h-3 text-(--color-accent-emerald-light)" />
                          <span className="text-[10px] font-semibold text-white">
                            Tamam
                          </span>
                        </div>
                        <span className="text-[9px] font-mono text-(--color-text-muted)">
                          5
                        </span>
                      </div>
                      {[
                        "Backup doğrula",
                        "Bildirim gönder",
                        "Loglama aç",
                      ].map((t, i) => (
                        <div
                          key={i}
                          className="px-2 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20"
                        >
                          <span className="text-[10px] text-white">{t}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <span className="text-[10px] font-medium text-(--color-text-muted)">
                      Sürece özel pano
                    </span>
                    <span className="text-[10px] font-mono text-(--color-accent-purple-light)">
                      sürükle-bırak
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-(--color-accent-purple-light)">
                <LayoutGrid size={32} />
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
            {/* Bento 1 - Kayıtsız işin maliyeti (wide, görselli) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 lg:col-span-2 row-span-1 rounded-4xl bg-linear-to-br from-blue-500/10 to-transparent border border-white/10 p-8 hover:bg-white/4 transition-colors relative overflow-hidden group flex flex-col md:flex-row gap-6 items-center"
            >
              <div className="w-full md:w-1/2 flex flex-col justify-center shrink-0">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-(--color-accent-blue-light) flex items-center justify-center mb-6">
                  <AlertTriangle />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {data.bento.items[0].title}
                </h3>
                <p className="text-sm text-(--color-text-secondary) font-light pr-4">
                  {data.bento.items[0].description}
                </p>
              </div>
              <div className="w-full md:w-1/2 h-45 md:h-full relative rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-2">
                <div className="flex items-center justify-between pb-2 border-b border-white/8">
                  <div className="flex items-center gap-1.5">
                    <EyeOff className="w-3 h-3 text-(--color-accent-red-light)" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white">Kayıtsız İşin Maliyeti</span>
                  </div>
                  <span className="text-[8px] font-mono font-bold text-(--color-accent-red-light) px-1.5 py-0.5 rounded-full bg-red-500/12 border border-red-500/25 animate-pulse">
                    görünmez
                  </span>
                </div>

                {/* Kayıtsız sources */}
                <div className="flex flex-col gap-1.5 flex-1">
                  {[
                    { icon: Headphones, label: "Sözlü takip", count: "?", tone: "red" },
                    { icon: Plus, label: "E-posta zincirleri", count: "?", tone: "amber" },
                    { icon: Users, label: "Slack/Teams sohbetleri", count: "?", tone: "purple" },
                    { icon: Server, label: "Platform dışı görevler", count: "?", tone: "rose" },
                  ].map((s, i) => {
                    const Icon = s.icon;
                    const tone: Record<string, string> = {
                      red: "text-(--color-accent-red-light) bg-red-500/8 border-red-500/20",
                      amber: "text-amber-300 bg-amber-500/8 border-amber-500/20",
                      purple: "text-(--color-accent-purple-light) bg-purple-500/8 border-purple-500/20",
                      rose: "text-rose-300 bg-rose-500/8 border-rose-500/20",
                    };
                    return (
                      <div key={i} className={`grid grid-cols-[auto_1fr_auto] gap-2 items-center px-2 py-1.5 rounded-md border ${tone[s.tone]}`}>
                        <Icon className="w-3 h-3" />
                        <span className="text-[10px] font-medium text-white truncate">{s.label}</span>
                        <span className="text-[10px] font-mono font-bold">{s.count}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Çözüm banner */}
                <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-emerald-500/10 border border-emerald-500/25 mt-auto">
                  <CheckCircle2 className="w-3 h-3 text-(--color-accent-emerald-light) shrink-0" />
                  <span className="text-[9px] font-semibold text-white flex-1">ServiceCore: hepsi kayıt altında</span>
                  <Activity className="w-2.5 h-2.5 text-(--color-accent-emerald-light)" />
                </div>
              </div>
            </motion.div>

            {/* Bento 2 - Yetkinlik bazlı atama (normal) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-(--color-accent-orange-light) flex items-center justify-center mb-6 shrink-0">
                <Users />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[1].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[1].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-2 justify-center">
                {[
                  { name: "A. Yıldız", skill: "Linux · DB", score: 92 },
                  { name: "M. Demir", skill: "Network", score: 87 },
                  { name: "S. Kara", skill: "Windows", score: 74 },
                ].map((row, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/3 border border-white/5"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-orange-500/15 border border-orange-500/25 flex items-center justify-center text-[10px] font-bold text-(--color-accent-orange-light)">
                        {row.name.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-semibold text-white">
                          {row.name}
                        </span>
                        <span className="text-[9px] text-(--color-text-muted)">
                          {row.skill}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-(--color-accent-orange-light)">
                      {row.score}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bento 3 - STE efor takibi (normal) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-(--color-accent-cyan-light) flex items-center justify-center mb-6 shrink-0">
                <Clock />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[2].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[2].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-2 justify-center">
                {[
                  { task: "Patch uygulama", h: "1sa 25dk" },
                  { task: "Log analizi", h: "0sa 42dk" },
                  { task: "Yetki revizyonu", h: "2sa 10dk" },
                  { task: "Backup doğrula", h: "0sa 18dk" },
                ].map((row, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/3 border border-white/5"
                  >
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3 text-(--color-accent-cyan-light)" />
                      <span className="text-[10px] font-medium text-white">
                        {row.task}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono font-semibold text-(--color-accent-cyan-light)">
                      {row.h}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bento 4 - İş yükü dengeleme (wide, mock) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 lg:col-span-2 row-span-1 rounded-4xl bg-linear-to-br from-purple-500/10 to-transparent border border-white/10 p-8 hover:bg-white/4 transition-colors relative overflow-hidden group flex flex-col md:flex-row gap-6 items-center"
            >
              <div className="w-full md:w-1/2 flex flex-col justify-center shrink-0">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-(--color-accent-purple-light) flex items-center justify-center mb-6">
                  <Scale />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {data.bento.items[3].title}
                </h3>
                <p className="text-sm text-(--color-text-secondary) font-light pr-4">
                  {data.bento.items[3].description}
                </p>
              </div>
              <div className="w-full md:w-1/2 h-45 md:h-full relative rounded-xl border border-white/10 overflow-hidden shadow-inner shrink-0 bg-(--color-surface-elevated-solid) group-hover:border-purple-500/40 transition-colors p-4 flex flex-col gap-2 justify-center">
                {[
                  { name: "A. Yıldız", load: 88, tone: "red" },
                  { name: "M. Demir", load: 64, tone: "purple" },
                  { name: "S. Kara", load: 42, tone: "cyan" },
                  { name: "E. Aksoy", load: 22, tone: "emerald" },
                ].map((row, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-medium text-white">{row.name}</span>
                      <span className="font-mono text-(--color-text-secondary)">
                        {row.load}% kapasite
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          row.tone === "red"
                            ? "bg-linear-to-r from-red-500/70 to-orange-400/80"
                            : row.tone === "purple"
                              ? "bg-linear-to-r from-purple-500/70 to-purple-400/80"
                              : row.tone === "cyan"
                                ? "bg-linear-to-r from-cyan-500/70 to-cyan-400/80"
                                : "bg-linear-to-r from-emerald-500/70 to-emerald-400/80"
                        }`}
                        style={{ width: `${row.load}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bento 5 - Süreç dışı aktivite (normal) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 border border-white/10 bg-linear-to-br from-indigo-500/5 to-transparent rounded-4xl p-8 hover:bg-white/4 transition-colors flex flex-col overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-6 shrink-0">
                <Plus />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[4].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[4].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-2 justify-center">
                {[
                  "Toplantı hazırlığı",
                  "Doküman güncelleme",
                  "Tedarikçi koordinasyonu",
                  "İç eğitim",
                ].map((row, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/3 border border-white/5"
                  >
                    <Plus className="w-3 h-3 text-indigo-400" />
                    <span className="text-[10px] font-medium text-white flex-1">
                      {row}
                    </span>
                    <span className="text-[9px] font-mono text-(--color-text-muted)">
                      ad hoc
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bento 6 - Süreçler boyunca işbirliği (normal) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-(--color-accent-emerald-light) flex items-center justify-center mb-6 shrink-0">
                <Users2 />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[5].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[5].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-2 justify-center">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/3 border border-white/5">
                  <span className="text-[9px] font-mono font-bold text-(--color-accent-blue-light) px-1.5 py-0.5 rounded bg-blue-500/15">
                    Olay
                  </span>
                  <span className="text-[10px] font-medium text-white flex-1">
                    L1 → L2 devir
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/3 border border-white/5">
                  <span className="text-[9px] font-mono font-bold text-(--color-accent-purple-light) px-1.5 py-0.5 rounded bg-purple-500/15">
                    Problem
                  </span>
                  <span className="text-[10px] font-medium text-white flex-1">
                    RCA çalışması paylaşıldı
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/3 border border-white/5">
                  <span className="text-[9px] font-mono font-bold text-(--color-accent-emerald-light) px-1.5 py-0.5 rounded bg-emerald-500/15">
                    Değişiklik
                  </span>
                  <span className="text-[10px] font-medium text-white flex-1">
                    Uygulama görevi atandı
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3.5 CHALLENGES — Kayıtsız iş 10 sorun */}
      <section className="py-24 relative z-20 overflow-hidden border-y border-white/5 bg-(--color-surface-base-dark)">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] mix-blend-screen pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-300 h-150 bg-red-600/8 blur-[140px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-6 lg:px-12 w-full max-w-7xl relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 mb-6">
              <AlertTriangle className="w-3.5 h-3.5 text-(--color-accent-red-light)" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-(--color-accent-red-light)">
                {data.challenges.badge}
              </span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-white mb-6">
              {data.challenges.titleLead}
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-red-400 to-orange-400">
                {data.challenges.titleAccent}
              </span>
            </h2>
            <p className="text-(--color-text-secondary) text-lg font-light leading-relaxed">
              {data.challenges.description}
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-4"
          >
            {data.challenges.items.map((c, i) => {
              const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
                Scale, AlertTriangle, TrendingDown, Shuffle, EyeOff, Users, CalendarX, Frown, Lock, XCircle,
              };
              const Icon = iconMap[c.icon] || AlertTriangle;
              const t: Record<string, string> = {
                red: "from-red-500/15 to-red-500/5 border-red-500/25 text-(--color-accent-red-light)",
                amber: "from-amber-500/15 to-amber-500/5 border-amber-500/25 text-amber-300",
                purple: "from-purple-500/15 to-purple-500/5 border-purple-500/25 text-(--color-accent-purple-light)",
                orange: "from-orange-500/15 to-orange-500/5 border-orange-500/25 text-(--color-accent-orange-light)",
                indigo: "from-indigo-500/15 to-indigo-500/5 border-indigo-500/25 text-indigo-300",
                blue: "from-blue-500/15 to-blue-500/5 border-blue-500/25 text-(--color-accent-blue-light)",
                cyan: "from-cyan-500/15 to-cyan-500/5 border-cyan-500/25 text-(--color-accent-cyan-light)",
                rose: "from-rose-500/15 to-rose-500/5 border-rose-500/25 text-rose-300",
              };
              return (
                <motion.div
                  key={c.id}
                  variants={fadeUp}
                  className={`rounded-2xl bg-linear-to-br ${t[c.tone]} border p-4 flex flex-col gap-3 hover:-translate-y-0.5 transition-transform`}
                >
                  <div className="flex items-start justify-between">
                    <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-2xl font-bold text-white/15 tracking-tight">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="text-xs lg:text-sm font-semibold text-white tracking-tight leading-tight">{c.title}</h3>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Solution banner */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-12 max-w-3xl mx-auto rounded-2xl border border-emerald-500/30 bg-linear-to-r from-emerald-500/12 to-cyan-500/8 p-5 flex items-center gap-4 shadow-[0_0_30px_rgba(16,185,129,0.15)]"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6 text-(--color-accent-emerald-light)" />
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-(--color-accent-emerald-light)">Çözüm</span>
              <p className="text-sm lg:text-base font-medium text-white leading-relaxed">
                Tüm bu sorunların ortadan kaldırılması için merkezi bir kaynak/iş gücü ve görev yönetimi gereklidir. Bunu sağlamak üzere geliştirilen <strong className="text-(--color-accent-emerald-light)">WTE® motoru</strong> ServiceCore Görev Yönetimi&apos;nde hizmetinizdedir.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3.6 FAQ */}
      <section className="py-24 relative z-20">
        <div className="container mx-auto px-6 lg:px-12 w-full max-w-4xl">
          <div className="text-center mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
              <ListTodo className="w-3.5 h-3.5 text-(--color-accent-blue-light)" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-(--color-accent-blue-light)">
                Görev Yönetimi Bilgi Bankası
              </span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-white mb-6">
              {data.faq.sectionTitle}
            </h2>
            <p className="text-(--color-text-secondary) text-lg font-light leading-relaxed">
              {data.faq.sectionSubtitle}
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "100px" }}
            className="flex flex-col gap-3"
          >
            {data.faq.items.map((item, i) => {
              const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
                ListTodo, Cpu, AlertTriangle, LayoutGrid, Clock,
              };
              const Icon = iconMap[item.icon] || ListTodo;
              return (
                <motion.details
                  key={item.id}
                  variants={fadeUp}
                  className="group rounded-2xl border border-white/10 bg-white/2 backdrop-blur-xl hover:bg-white/4 transition-colors overflow-hidden"
                  open={i === 0}
                >
                  <summary className="flex items-center gap-4 px-6 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center shrink-0 text-(--color-accent-blue-light)">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="flex-1 text-base lg:text-lg font-semibold text-white">
                      {item.question}
                    </h3>
                    <ChevronDown className="w-5 h-5 text-(--color-text-muted) shrink-0 transition-transform duration-300 group-open:rotate-180" />
                  </summary>
                  <div className="px-6 pb-6 pl-20">
                    <p className="text-sm lg:text-base text-(--color-text-secondary) font-light leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </motion.details>
              );
            })}
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
                    <CheckCircle2 className="w-4 h-4 text-(--color-accent-blue-light)" />
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-text-overline)">
                      Görev Yönetimi
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
                        WTE® Motoru
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                        <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-blue-base) shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                        STE® Zaman
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                        <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-purple-base) shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
                        Sürece Özel Kanban
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
