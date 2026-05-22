"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import {
  LineChart,
  ArrowRight,
  CheckCircle2,
  Gauge,
  BookOpen,
  LayoutDashboard,
  Layers,
  Wand2,
  Target,
  Filter,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  Users,
  Clock,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import data from "@/data/raporlama-yonetimi.json";
import { En } from "@/components/ui/En";

export default function RaporlamaYonetimiPage() {
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
          <div className="absolute top-40 right-1/4 w-100 h-100 bg-emerald-600/10 blur-[100px] rounded-full mix-blend-screen" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10 w-full max-w-7xl">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16 lg:mb-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-(--color-accent-blue-light) text-xs font-black tracking-widest uppercase mb-8 shadow-inner"
            >
              <LineChart size={14} />
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
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-emerald-400">
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
            className="relative mx-auto rounded-4xl border border-white/10 bg-white/2 backdrop-blur-3xl p-4 lg:p-6 shadow-2xl overflow-hidden group w-full"
          >
            <div className="rounded-2xl border border-white/10 bg-(--color-surface-elevated-solid)/95 p-5 flex flex-col gap-4">
              {/* Toolbar */}
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <LineChart className="w-4 h-4 text-(--color-accent-blue-light)" />
                  <span className="text-sm font-semibold text-white">Service Analytics Console</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/15 text-(--color-accent-blue-light) border border-blue-500/30">CIO Görünümü</span>
                </div>
                <div className="flex items-center gap-3 text-[10px] font-mono text-(--color-text-muted)">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Son 30 gün</span>
                  <span className="flex items-center gap-1"><RefreshCw className="w-3 h-3 text-(--color-accent-emerald-light)" /> 14:32</span>
                </div>
              </div>

              {/* KPI Strip */}
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: "Hizmet Seviyesi Uyum", value: "94.2%", trend: "▲ 1.6pp", c: "text-(--color-accent-emerald-light) border-emerald-500/30 bg-emerald-500/10" },
                  { label: "MTTR", value: "2.4 sa", trend: "↓ 18 dk", c: "text-(--color-accent-blue-light) border-blue-500/30 bg-blue-500/10" },
                  { label: "İlk Çağrı Çözümü", value: "76%", trend: "▲ 4pp", c: "text-(--color-accent-cyan-light) border-cyan-500/30 bg-cyan-500/10" },
                  { label: "CSAT", value: "4.6 / 5", trend: "stabil", c: "text-(--color-accent-purple-light) border-purple-500/30 bg-purple-500/10" },
                ].map((k, i) => (
                  <div key={i} className={`rounded-lg border ${k.c} p-2.5`}>
                    <div className="text-[9px] uppercase tracking-wider opacity-80 mb-1">{k.label}</div>
                    <div className="flex items-baseline gap-2">
                      <div className="text-xl font-bold text-white font-mono leading-none">{k.value}</div>
                      <div className="text-[9px] font-mono opacity-80">{k.trend}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Body — 2 widgets */}
              <div className="grid grid-cols-12 gap-2">
                {/* Trend chart */}
                <div className="col-span-8 rounded-xl border border-white/5 bg-white/2 p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-3.5 h-3.5 text-(--color-accent-blue-light)" />
                      <span className="text-[11px] font-semibold text-white">Olay Hacmi · Çözüm Süresi</span>
                    </div>
                    <div className="flex items-center gap-2 text-[9px] font-mono text-(--color-text-muted)">
                      <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-sm bg-blue-400" /> Açılan</span>
                      <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-sm bg-purple-400" /> Çözülen</span>
                    </div>
                  </div>
                  <svg viewBox="0 0 320 80" className="w-full h-20">
                    <defs>
                      <linearGradient id="trendBlue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    {/* Grid */}
                    {[20, 40, 60].map((y) => (
                      <line key={y} x1="0" x2="320" y1={y} y2={y} stroke="rgba(255,255,255,0.04)" />
                    ))}
                    {/* Area */}
                    <path d="M0,55 L40,48 L80,52 L120,38 L160,42 L200,28 L240,32 L280,22 L320,18 L320,80 L0,80 Z" fill="url(#trendBlue)" />
                    {/* Line blue */}
                    <polyline fill="none" stroke="#60a5fa" strokeWidth="1.5" points="0,55 40,48 80,52 120,38 160,42 200,28 240,32 280,22 320,18" />
                    {/* Line purple */}
                    <polyline fill="none" stroke="#c084fc" strokeWidth="1.5" strokeDasharray="2 2" points="0,62 40,58 80,55 120,48 160,45 200,38 240,35 280,28 320,24" />
                  </svg>
                  <div className="flex justify-between text-[8px] font-mono text-(--color-text-muted) mt-1">
                    {["1.Hf", "2.Hf", "3.Hf", "4.Hf"].map((w) => <span key={w}>{w}</span>)}
                  </div>
                </div>

                {/* Donut + legend */}
                <div className="col-span-4 rounded-xl border border-white/5 bg-white/2 p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <PieChart className="w-3.5 h-3.5 text-(--color-accent-purple-light)" />
                    <span className="text-[11px] font-semibold text-white">Modül</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className="relative w-16 h-16 rounded-full shrink-0"
                      style={{
                        background:
                          "conic-gradient(#a855f7 0% 45%, #3b82f6 45% 75%, #06b6d4 75% 90%, #10b981 90% 100%)",
                      }}
                    >
                      <div className="absolute inset-2 rounded-full bg-(--color-surface-elevated-solid) flex items-center justify-center">
                        <span className="text-[9px] font-bold text-white font-mono">1.4k</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 text-[9px] flex-1">
                      {[
                        { l: "Olay", v: "45%", c: "bg-purple-400" },
                        { l: "İstek", v: "30%", c: "bg-blue-400" },
                        { l: "Problem", v: "15%", c: "bg-cyan-400" },
                        { l: "Değişiklik", v: "10%", c: "bg-emerald-400" },
                      ].map((s) => (
                        <div key={s.l} className="flex items-center gap-1.5">
                          <div className={`w-1.5 h-1.5 rounded-sm ${s.c}`} />
                          <span className="text-(--color-text-secondary)">{s.l}</span>
                          <span className="ml-auto font-mono text-white">{s.v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] font-mono text-(--color-text-muted)">
                <span>1.418 olay · 30g · 6 boyut</span>
                <span className="text-(--color-accent-blue-light)">ITIL4 · MRM</span>
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-(--color-surface-base) to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* 2. ZIG-ZAG FEATURE BLOCKS */}
      <section className="py-24 relative z-20">
        <div className="container mx-auto px-6 lg:px-12 w-full max-w-7xl flex flex-col gap-32">
          {/* Feature 1: MRM ITIL4 */}
          <motion.div
            animate="visible"
            variants={fadeUp}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-blue-500/5 to-cyan-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-blue-500/10 blur-[50px] group-hover:bg-blue-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full h-135 rounded-2xl overflow-hidden bg-(--color-surface-elevated-solid)/95 border border-white/10 shadow-2xl p-5 flex flex-col gap-3">
                  <div className="flex items-center justify-between pb-2.5 border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <Gauge className="w-4 h-4 text-(--color-accent-blue-light)" />
                      <span className="text-xs font-semibold text-white">ITIL4 · MRM Çatısı</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/15 text-(--color-accent-blue-light) border border-blue-500/30">4 Boyut · 7 Pratik</span>
                  </div>

                  {/* 4 ITIL4 Dimension cards */}
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { d: "Organizasyon & İnsan", v: "82%", c: "from-blue-500/20 border-blue-500/30 text-(--color-accent-blue-light)" },
                      { d: "Bilgi & Teknoloji", v: "94%", c: "from-cyan-500/20 border-cyan-500/30 text-(--color-accent-cyan-light)" },
                      { d: "Ortaklar & Tedarikçi", v: "78%", c: "from-purple-500/20 border-purple-500/30 text-(--color-accent-purple-light)" },
                      { d: "Değer Akışı & Süreç", v: "88%", c: "from-emerald-500/20 border-emerald-500/30 text-(--color-accent-emerald-light)" },
                    ].map((dim, i) => (
                      <div key={i} className={`rounded-lg bg-linear-to-br ${dim.c} border p-2.5`}>
                        <div className="text-[8px] uppercase tracking-wider opacity-80 mb-0.5">{dim.d}</div>
                        <div className="text-lg font-bold text-white font-mono leading-none">{dim.v}</div>
                      </div>
                    ))}
                  </div>

                  {/* Practice metrics */}
                  <div className="rounded-xl border border-white/5 bg-white/2 p-3 flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-semibold text-white flex items-center gap-1.5"><BarChart3 className="w-3 h-3 text-(--color-accent-blue-light)" /> ITIL4 Pratikleri · Metrik Skoru</span>
                      <span className="text-[9px] font-mono text-(--color-text-muted)">7 / 7</span>
                    </div>
                    <div className="space-y-1.5">
                      {[
                        { p: "Olay Yönetimi", s: 92 },
                        { p: "İstek Karşılama", s: 88 },
                        { p: "Problem Yönetimi", s: 76 },
                        { p: "Değişiklik Etkinleştirme", s: 84 },
                        { p: "Servis Seviye", s: 94 },
                        { p: "Bilgi Yönetimi", s: 71 },
                        { p: "Sürekli İyileştirme", s: 80 },
                      ].map((p, i) => (
                        <div key={i} className="space-y-0.5">
                          <div className="flex items-center justify-between text-[9px]">
                            <span className="text-white truncate">{p.p}</span>
                            <span className="font-mono text-(--color-accent-blue-light)">{p.s}</span>
                          </div>
                          <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                            <div className={`h-full rounded-full ${p.s >= 85 ? "bg-emerald-400" : p.s >= 75 ? "bg-blue-400" : "bg-amber-400"}`} style={{ width: `${p.s}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <div className="flex items-center gap-1.5 text-[9px] font-mono text-(--color-text-muted)">
                      <Sparkles className="w-3 h-3 text-(--color-accent-blue-light)" />
                      <span>Olgunluk skoru: <span className="text-(--color-accent-emerald-light) font-bold">85.6 / 100</span></span>
                    </div>
                    <span className="text-[9px] font-mono text-(--color-accent-blue-light)">v4 baseline</span>
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

          {/* Feature 2: Rapor Kitaplığı (mock list) */}
          <motion.div
            animate="visible"
            variants={fadeUp}
            className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-emerald-500/5 to-cyan-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-emerald-500/10 blur-[50px] group-hover:bg-emerald-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full h-135 rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-(--color-surface-elevated-solid) flex flex-col p-8 gap-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] font-semibold uppercase tracking-widest text-(--color-text-muted)">
                      Rapor Kitaplığı
                    </span>
                    <span className="text-[10px] font-mono text-(--color-accent-emerald-light)">
                      48 hazır rapor
                    </span>
                  </div>

                  {[
                    {
                      icon: Activity,
                      name: "Olay Hizmet Seviyesi Uyum Raporu",
                      cat: "Operasyonel",
                      tone: "blue",
                    },
                    {
                      icon: BarChart3,
                      name: "Servis Kalite Skoru",
                      cat: "Stratejik",
                      tone: "purple",
                    },
                    {
                      icon: Users,
                      name: "Teknisyen Yük Dağılımı",
                      cat: "Operasyonel",
                      tone: "blue",
                    },
                    {
                      icon: TrendingUp,
                      name: "Aylık İyileştirme Trendi",
                      cat: "Analitik",
                      tone: "emerald",
                    },
                    {
                      icon: PieChart,
                      name: "Kategori Bazlı Dağılım",
                      cat: "Operasyonel",
                      tone: "blue",
                    },
                    {
                      icon: Target,
                      name: "Hedef–Gerçekleşen KPI",
                      cat: "Stratejik",
                      tone: "purple",
                    },
                  ].map((row, i) => {
                    const Icon = row.icon;
                    return (
                      <div
                        key={i}
                        className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/3 border border-white/5"
                      >
                        <div className="flex items-center gap-2">
                          <Icon className="w-3.5 h-3.5 text-(--color-accent-emerald-light)" />
                          <span className="text-[11px] font-medium text-white">
                            {row.name}
                          </span>
                        </div>
                        <span
                          className={`text-[9px] font-mono font-semibold px-2 py-0.5 rounded-full border ${
                            row.tone === "blue"
                              ? "bg-blue-500/10 border-blue-500/20 text-(--color-accent-blue-light)"
                              : row.tone === "purple"
                                ? "bg-purple-500/10 border-purple-500/20 text-(--color-accent-purple-light)"
                                : "bg-emerald-500/10 border-emerald-500/20 text-(--color-accent-emerald-light)"
                          }`}
                        >
                          {row.cat}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-(--color-accent-emerald-light)">
                <BookOpen size={32} />
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

          {/* Feature 3: SRW + Dashboard widgets (mock) */}
          <motion.div
            animate="visible"
            variants={fadeUp}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-purple-500/5 to-indigo-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-purple-500/10 blur-[50px] group-hover:bg-purple-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full h-135 rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-(--color-surface-elevated-solid) p-6 grid grid-cols-2 gap-3">
                  {/* KPI widget */}
                  <div className="rounded-xl bg-white/3 border border-white/8 p-3 flex flex-col gap-1.5 hover:border-purple-500/30 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-semibold uppercase tracking-wider text-(--color-text-muted)">
                        Hizmet Seviyesi Uyumu
                      </span>
                      <Target className="w-3 h-3 text-(--color-accent-emerald-light)" />
                    </div>
                    <span className="text-2xl font-bold text-white tracking-tight">
                      94%
                    </span>
                    <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                      <div className="h-full w-[94%] bg-linear-to-r from-emerald-500/70 to-emerald-400/80" />
                    </div>
                  </div>

                  {/* Bar chart widget */}
                  <div className="rounded-xl bg-white/3 border border-white/8 p-3 flex flex-col gap-1.5 hover:border-purple-500/30 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-semibold uppercase tracking-wider text-(--color-text-muted)">
                        Olay Trendi
                      </span>
                      <BarChart3 className="w-3 h-3 text-(--color-accent-blue-light)" />
                    </div>
                    <div className="flex items-end gap-1 h-12">
                      {[40, 60, 35, 75, 50, 85, 65].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-t bg-linear-to-t from-blue-500/40 to-blue-400/80 border border-blue-500/30"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Pie widget */}
                  <div className="rounded-xl bg-white/3 border border-white/8 p-3 flex flex-col gap-1.5 hover:border-purple-500/30 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-semibold uppercase tracking-wider text-(--color-text-muted)">
                        Kategori
                      </span>
                      <PieChart className="w-3 h-3 text-(--color-accent-purple-light)" />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="relative w-12 h-12 rounded-full bg-conic from-purple-500/80 from-0% via-cyan-500/80 via-40% to-blue-500/80 to-100%">
                        <div className="absolute inset-2 rounded-full bg-(--color-surface-elevated-solid)" />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-1 text-[8px]">
                          <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-purple-light)" />
                          <span className="text-(--color-text-secondary)">
                            BT
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-[8px]">
                          <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-cyan-light)" />
                          <span className="text-(--color-text-secondary)">
                            İK
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-[8px]">
                          <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-blue-light)" />
                          <span className="text-(--color-text-secondary)">
                            Tesis
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Counter widget */}
                  <div className="rounded-xl bg-white/3 border border-white/8 p-3 flex flex-col gap-1.5 hover:border-purple-500/30 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-semibold uppercase tracking-wider text-(--color-text-muted)">
                        Aktif Olay
                      </span>
                      <Activity className="w-3 h-3 text-(--color-accent-orange-light)" />
                    </div>
                    <span className="text-2xl font-bold text-white tracking-tight">
                      127
                    </span>
                    <span className="text-[9px] font-mono text-(--color-accent-orange-light)">
                      +12% (haftalık)
                    </span>
                  </div>

                  {/* Line chart widget (wide) */}
                  <div className="col-span-2 rounded-xl bg-white/3 border border-white/8 p-3 flex flex-col gap-1.5 hover:border-purple-500/30 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-semibold uppercase tracking-wider text-(--color-text-muted)">
                        Aylık KPI Trendi
                      </span>
                      <span className="text-[9px] font-mono text-(--color-accent-purple-light)">
                        SRW ile üretildi
                      </span>
                    </div>
                    <svg viewBox="0 0 200 50" className="w-full h-12">
                      <defs>
                        <linearGradient
                          id="lineGrad"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="0%"
                        >
                          <stop offset="0%" stopColor="#a855f7" />
                          <stop offset="100%" stopColor="#22d3ee" />
                        </linearGradient>
                      </defs>
                      <polyline
                        fill="none"
                        stroke="url(#lineGrad)"
                        strokeWidth="2"
                        points="0,40 30,28 60,32 90,18 120,22 150,12 180,16 200,8"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-(--color-accent-purple-light)">
                <LayoutDashboard size={32} />
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
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[420px]"
          >
            {/* Bento 1 - Rapor tipleri (wide) */}
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
                  {
                    label: "Operasyonel",
                    desc: "Günlük takip",
                    icon: Activity,
                    tone: "blue",
                  },
                  {
                    label: "Stratejik",
                    desc: "Yönetim kararı",
                    icon: Target,
                    tone: "purple",
                  },
                  {
                    label: "Analitik",
                    desc: "Trend & tahmin",
                    icon: TrendingUp,
                    tone: "emerald",
                  },
                ].map((row, i) => {
                  const Icon = row.icon;
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/3 border border-white/8"
                    >
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                          row.tone === "blue"
                            ? "bg-blue-500/15 border border-blue-500/25 text-(--color-accent-blue-light)"
                            : row.tone === "purple"
                              ? "bg-purple-500/15 border border-purple-500/25 text-(--color-accent-purple-light)"
                              : "bg-emerald-500/15 border border-emerald-500/25 text-(--color-accent-emerald-light)"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col flex-1">
                        <span className="text-[11px] font-bold text-white">
                          {row.label}
                        </span>
                        <span className="text-[10px] font-medium text-(--color-text-muted)">
                          {row.desc}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Bento 2 - SRW (normal) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-(--color-accent-orange-light) flex items-center justify-center mb-6 shrink-0">
                <Wand2 />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[1].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[1].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-1.5 justify-center">
                {[
                  { step: "01", label: "Veri kaynağı seç" },
                  { step: "02", label: "Filtre tanımla" },
                  { step: "03", label: "Gruplama belirle" },
                  { step: "04", label: "Görselleştirme seç" },
                ].map((row, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/3 border border-white/5"
                  >
                    <span className="text-[9px] font-mono font-bold text-(--color-accent-orange-light) w-5">
                      {row.step}
                    </span>
                    <span className="text-[10px] font-medium text-white">
                      {row.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bento 3 - KPI (normal) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-(--color-accent-cyan-light) flex items-center justify-center mb-6 shrink-0">
                <Target />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[2].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[2].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-2 justify-center">
                {[
                  { kpi: "Hizmet Seviyesi Uyumu", target: 95, actual: 94 },
                  { kpi: "İlk Çağrı Çözümü", target: 70, actual: 76 },
                  { kpi: "Memnuniyet", target: 85, actual: 82 },
                ].map((row, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-medium text-white">{row.kpi}</span>
                      <span className="font-mono text-(--color-text-secondary)">
                        <span className="text-(--color-accent-cyan-light)">
                          {row.actual}%
                        </span>
                        <span className="text-(--color-text-muted)">
                          {" "}
                          / {row.target}%
                        </span>
                      </span>
                    </div>
                    <div className="h-1 rounded-full bg-white/5 overflow-hidden relative">
                      <div
                        className={`h-full ${
                          row.actual >= row.target
                            ? "bg-linear-to-r from-emerald-500/70 to-emerald-400/80"
                            : "bg-linear-to-r from-orange-500/70 to-orange-400/80"
                        }`}
                        style={{ width: `${row.actual}%` }}
                      />
                      <div
                        className="absolute top-0 bottom-0 w-px bg-white/40"
                        style={{ left: `${row.target}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bento 4 - Role özel Dashboard (wide) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 lg:col-span-2 row-span-1 rounded-4xl bg-linear-to-br from-purple-500/10 to-transparent border border-white/10 p-8 hover:bg-white/4 transition-colors relative overflow-hidden group flex flex-col md:flex-row gap-6 items-center"
            >
              <div className="w-full md:w-1/2 flex flex-col justify-center shrink-0">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-(--color-accent-purple-light) flex items-center justify-center mb-6">
                  <LayoutDashboard />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {data.bento.items[3].title}
                </h3>
                <p className="text-sm text-(--color-text-secondary) font-light pr-4">
                  {data.bento.items[3].description}
                </p>
              </div>
              <div className="w-full md:w-1/2 h-45 md:h-full relative rounded-xl border border-white/10 overflow-hidden shadow-inner shrink-0 bg-(--color-surface-elevated-solid) group-hover:border-purple-500/40 transition-colors p-5 flex flex-col gap-2 justify-center">
                {[
                  {
                    role: "CIO",
                    widgets: "Stratejik KPI",
                    icon: Target,
                    tone: "purple",
                  },
                  {
                    role: "Süreç Sahibi",
                    widgets: "Kalite metrikleri",
                    icon: Gauge,
                    tone: "blue",
                  },
                  {
                    role: "Takım Lideri",
                    widgets: "Yük dağılımı",
                    icon: Users,
                    tone: "cyan",
                  },
                  {
                    role: "Teknisyen",
                    widgets: "Bekleyen iş",
                    icon: Activity,
                    tone: "emerald",
                  },
                ].map((row, i) => {
                  const Icon = row.icon;
                  return (
                    <div
                      key={i}
                      className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/3 border border-white/8"
                    >
                      <div className="flex items-center gap-2">
                        <Icon
                          className={`w-3.5 h-3.5 ${
                            row.tone === "purple"
                              ? "text-(--color-accent-purple-light)"
                              : row.tone === "blue"
                                ? "text-(--color-accent-blue-light)"
                                : row.tone === "cyan"
                                  ? "text-(--color-accent-cyan-light)"
                                  : "text-(--color-accent-emerald-light)"
                          }`}
                        />
                        <span className="text-[11px] font-semibold text-white">
                          {row.role}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-(--color-text-muted)">
                        {row.widgets}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Bento 5 - Dinamik filtre (normal) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 border border-white/10 bg-linear-to-br from-indigo-500/5 to-transparent rounded-4xl p-8 hover:bg-white/4 transition-colors flex flex-col overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-6 shrink-0">
                <Filter />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[4].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[4].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-wrap content-center gap-2 justify-center">
                {[
                  "Müşteri",
                  "Kategori",
                  "Ekip",
                  "Servis",
                  "Zaman",
                  "Öncelik",
                  "Durum",
                ].map((tag, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-medium text-white px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Bento 6 - CI bağı (normal) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-(--color-accent-emerald-light) flex items-center justify-center mb-6 shrink-0">
                <TrendingUp />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[5].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[5].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-2 justify-center">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/3 border border-white/5">
                  <LineChart className="w-3.5 h-3.5 text-(--color-accent-emerald-light)" />
                  <span className="text-[11px] font-medium text-white flex-1">
                    Zayıflık tespiti
                  </span>
                </div>
                <div className="flex justify-center">
                  <div className="w-px h-3 bg-emerald-500/30" />
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/3 border border-white/5">
                  <Target className="w-3.5 h-3.5 text-(--color-accent-blue-light)" />
                  <span className="text-[11px] font-medium text-white flex-1">
                    İyileştirme insiyatifi
                  </span>
                </div>
                <div className="flex justify-center">
                  <div className="w-px h-3 bg-blue-500/30" />
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <TrendingUp className="w-3.5 h-3.5 text-(--color-accent-emerald-light)" />
                  <span className="text-[11px] font-semibold text-white flex-1">
                    CI Register
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
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="group relative flex flex-col justify-center overflow-hidden rounded-3xl bg-linear-to-br from-(--color-brand-primary) to-(--color-brand-purple) p-1 md:p-px"
            >
              <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative h-full flex flex-col items-center justify-center text-center rounded-[23px] bg-(--color-surface-elevated-solid)/90 backdrop-blur-3xl px-8 py-16 md:px-12">
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

                <div className="relative z-10 w-full">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 mx-auto">
                    <LineChart className="w-4 h-4 text-(--color-accent-blue-light)" />
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-text-overline)">
                      Ölçüm ve Raporlama
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
                        ITIL 4 MRM
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                        <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-blue-base) shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                        <En>Service Report Wizard</En>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                        <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-purple-base) shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
                        Role Özel Dashboard
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
