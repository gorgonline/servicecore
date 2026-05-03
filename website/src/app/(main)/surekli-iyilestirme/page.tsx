"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import {
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ListChecks,
  MessageSquare,
  HelpCircle,
  ListOrdered,
  Users,
  GitBranch,
  Layers,
  LineChart,
  Search,
  Scale,
  MessagesSquare,
  Target,
  Clock,
  Wallet,
  AlertTriangle,
  Compass,
  Eye,
  Map,
  Zap,
  RefreshCw,
  ChevronDown,
  ChevronRight,
  Filter,
  AlertCircle,
  Plus,
} from "lucide-react";
import data from "@/data/surekli-iyilestirme.json";

export default function SurekliIyilestirmePage() {
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
              <TrendingUp size={14} />
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
            className="relative mx-auto rounded-4xl border border-white/10 bg-white/2 backdrop-blur-3xl p-6 lg:p-10 shadow-2xl overflow-hidden group w-full"
          >
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-5 pb-5 border-b border-white/8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                  <TrendingUp className="w-5 h-5 text-(--color-accent-blue-light)" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-(--color-accent-blue-light)">
                    CI Register · Continual Improvement
                  </span>
                  <span className="text-lg lg:text-xl font-bold text-white tracking-tight">
                    İyileştirme İnsiyatifleri
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-(--color-text-muted)">ITIL4 CI Practice · son 90 gün</span>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-(--color-accent-emerald-light) shadow-[0_0_8px_currentColor] animate-pulse" />
                  <span className="text-[9px] font-mono uppercase tracking-widest text-(--color-accent-emerald-light)">canlı</span>
                </div>
              </div>
            </div>

            {/* KPI metric row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-5">
              {[
                { icon: Sparkles, label: "Toplam İnsiyatif", value: "62", trend: "+12", tone: "blue" },
                { icon: ListChecks, label: "Değerlendirmede", value: "18", trend: "+5", tone: "amber" },
                { icon: GitBranch, label: "Devreye Alındı", value: "24", trend: "+3", tone: "purple" },
                { icon: CheckCircle2, label: "Başarı Oranı", value: "%87", trend: "+4", tone: "emerald" },
              ].map((m, i) => {
                const Icon = m.icon;
                const t: Record<string, string> = {
                  blue: "from-blue-500/15 to-blue-500/5 border-blue-500/25 text-(--color-accent-blue-light) shadow-[0_0_25px_rgba(59,130,246,0.12)]",
                  amber: "from-amber-500/15 to-amber-500/5 border-amber-500/25 text-amber-300 shadow-[0_0_25px_rgba(245,158,11,0.12)]",
                  purple: "from-purple-500/15 to-purple-500/5 border-purple-500/25 text-(--color-accent-purple-light) shadow-[0_0_25px_rgba(168,85,247,0.12)]",
                  emerald: "from-emerald-500/15 to-emerald-500/5 border-emerald-500/25 text-(--color-accent-emerald-light) shadow-[0_0_25px_rgba(16,185,129,0.12)]",
                };
                return (
                  <div key={i} className={`rounded-2xl bg-linear-to-br ${t[m.tone]} border p-3 lg:p-4 flex flex-col gap-2`}>
                    <div className="flex items-center justify-between">
                      <Icon className="w-4 h-4" />
                      <span className="text-[9px] font-mono font-semibold text-(--color-accent-emerald-light)">{m.trend}</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[8px] font-medium uppercase tracking-wider text-(--color-text-muted)">{m.label}</span>
                      <span className="text-2xl lg:text-3xl font-bold tracking-tight text-white">{m.value}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CI Register table */}
            <div className="rounded-2xl border border-white/10 bg-(--color-surface-elevated-solid) p-4 mb-5">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/8">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-(--color-accent-blue-light)" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white">Aktif İnsiyatifler · 5 / 62</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Filter className="w-2.5 h-2.5 text-(--color-text-muted)" />
                  <span className="text-[8px] font-mono text-(--color-text-muted)">değerlendirme aşamasında</span>
                </div>
              </div>

              <div className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-2 px-3 py-1.5 text-[8px] font-semibold uppercase tracking-widest text-(--color-text-muted) bg-white/2 border border-white/5 rounded-md">
                <span className="w-12">ID</span>
                <span>İnsiyatif</span>
                <span>Aşama</span>
                <span>Puan</span>
                <span>Sahip</span>
                <span>Kaynak</span>
              </div>
              <div className="flex flex-col gap-1.5 mt-1.5">
                {[
                  { id: "CI-2412", title: "Self-servis portal AI öneri motoru", stage: "İstişare", score: 87, owner: "Selin K.", source: "Rapor", stageTone: "purple", scoreTone: "emerald" },
                  { id: "CI-2410", title: "VPN sertifika otomatik yenileme", stage: "Değerlendirme", score: 92, owner: "Ahmet Y.", source: "Olay", stageTone: "amber", scoreTone: "emerald" },
                  { id: "CI-2408", title: "Mobil uygulama push bildirim", stage: "Analiz", score: 64, owner: "Mert K.", source: "Müşteri", stageTone: "blue", scoreTone: "amber" },
                  { id: "CI-2405", title: "Knowledge Base çoklu dil desteği", stage: "Değerlendirme", score: 78, owner: "Bora E.", source: "Ekip", stageTone: "amber", scoreTone: "amber" },
                  { id: "CI-2401", title: "Raporlama panosunda sürükle-bırak", stage: "İstişare", score: 71, owner: "Selin K.", source: "Anket", stageTone: "purple", scoreTone: "amber" },
                ].map((r, i) => {
                  const stageT: Record<string, string> = {
                    blue: "text-(--color-accent-blue-light) bg-blue-500/10 border-blue-500/20",
                    amber: "text-amber-300 bg-amber-500/10 border-amber-500/20",
                    purple: "text-(--color-accent-purple-light) bg-purple-500/10 border-purple-500/20",
                  };
                  const scoreT: Record<string, string> = {
                    emerald: "text-(--color-accent-emerald-light)",
                    amber: "text-amber-300",
                  };
                  return (
                    <div key={i} className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-2 items-center px-3 py-2 rounded-lg bg-white/2 border border-white/5 hover:bg-white/4 transition-colors">
                      <span className="text-[9px] font-mono font-bold text-(--color-accent-blue-light) w-12">{r.id}</span>
                      <span className="text-[10px] font-medium text-white truncate">{r.title}</span>
                      <span className={`text-[8px] font-mono font-semibold px-1.5 py-0.5 rounded-full border ${stageT[r.stageTone]}`}>{r.stage}</span>
                      <span className={`text-[10px] font-mono font-bold ${scoreT[r.scoreTone]}`}>{r.score}</span>
                      <span className="text-[9px] text-(--color-text-secondary) hidden sm:block">{r.owner}</span>
                      <span className="text-[8px] font-mono text-(--color-text-muted) px-1 py-0.5 rounded bg-white/3 border border-white/8">{r.source}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer flow */}
            <div className="rounded-2xl border border-white/10 bg-(--color-surface-elevated-solid) p-3 flex items-center justify-between gap-2">
              {[
                { label: "Analiz", icon: Search },
                { label: "Değerlendirme", icon: Scale },
                { label: "İstişare", icon: MessagesSquare },
                { label: "Implementation", icon: GitBranch },
                { label: "Did we get there?", icon: CheckCircle2 },
              ].map((s, i, arr) => {
                const Icon = s.icon;
                return (
                  <div key={i} className="flex items-center gap-1.5 flex-1 min-w-0">
                    <div className="w-6 h-6 rounded-md bg-blue-500/15 border border-blue-500/30 flex items-center justify-center shrink-0">
                      <Icon className="w-3 h-3 text-(--color-accent-blue-light)" />
                    </div>
                    <span className="text-[9px] font-semibold text-white truncate">{s.label}</span>
                    {i < arr.length - 1 && <ChevronRight className="w-2.5 h-2.5 text-(--color-text-muted) ml-auto shrink-0" />}
                  </div>
                );
              })}
            </div>

            <div className="absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-(--color-surface-base) to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* 2. ZIG-ZAG FEATURE BLOCKS */}
      <section className="py-24 relative z-20">
        <div className="container mx-auto px-6 lg:px-12 w-full max-w-7xl flex flex-col gap-32">
          {/* Feature 1: CI Register */}
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
                      <Sparkles className="w-3.5 h-3.5 text-(--color-accent-blue-light)" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white">CI Register · Yeni İnsiyatif</span>
                    </div>
                    <span className="text-[8px] font-mono font-bold text-(--color-accent-blue-light) px-1.5 py-0.5 rounded-full bg-blue-500/12 border border-blue-500/25">
                      CI-2412
                    </span>
                  </div>

                  {/* Insiyatif başlığı */}
                  <div className="rounded-xl bg-blue-500/10 border border-blue-500/25 p-3 flex flex-col gap-1.5 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                    <span className="text-[8px] font-mono uppercase tracking-wider text-(--color-text-muted)">İyileştirme Önerisi</span>
                    <span className="text-[12px] font-bold text-white">Self-servis portal AI öneri motoru</span>
                    <span className="text-[9px] text-(--color-text-secondary)">Kullanıcı kayıt açarken AI ile hazır KB makalelerinden otomatik çözüm önerisi sunulması</span>
                  </div>

                  {/* Kaynak ve sahip */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col gap-1 px-2.5 py-2 rounded-lg bg-white/2 border border-white/5">
                      <span className="text-[8px] font-mono uppercase tracking-wider text-(--color-text-muted)">Kaynak</span>
                      <div className="flex items-center gap-1.5">
                        <LineChart className="w-3 h-3 text-(--color-accent-emerald-light)" />
                        <span className="text-[10px] font-semibold text-white">Servis Raporu</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 px-2.5 py-2 rounded-lg bg-white/2 border border-white/5">
                      <span className="text-[8px] font-mono uppercase tracking-wider text-(--color-text-muted)">CI Sahibi</span>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3 h-3 text-(--color-accent-purple-light)" />
                        <span className="text-[10px] font-semibold text-white">Selin K.</span>
                      </div>
                    </div>
                  </div>

                  {/* Hedef etkisi */}
                  <div className="flex flex-col gap-1.5 flex-1">
                    <span className="text-[8px] font-mono uppercase tracking-wider text-(--color-text-muted)">Etki Alanı</span>
                    {[
                      { label: "Kullanıcı Memnuniyeti", percent: 85, tone: "emerald" },
                      { label: "Operasyonel Verimlilik", percent: 72, tone: "blue" },
                      { label: "Maliyet Etkisi", percent: 58, tone: "amber" },
                      { label: "Stratejik Hedef Uyum", percent: 91, tone: "purple" },
                    ].map((e, i) => {
                      const tone: Record<string, string> = {
                        emerald: "from-emerald-500 to-emerald-400 text-(--color-accent-emerald-light)",
                        blue: "from-blue-500 to-cyan-400 text-(--color-accent-blue-light)",
                        amber: "from-amber-500 to-amber-400 text-amber-300",
                        purple: "from-purple-500 to-pink-400 text-(--color-accent-purple-light)",
                      };
                      const [grad, color] = tone[e.tone].split(" text-");
                      return (
                        <div key={i} className="flex flex-col gap-1">
                          <div className="flex items-center justify-between text-[10px]">
                            <span className="font-medium text-white">{e.label}</span>
                            <span className={`font-mono font-bold text-${color}`}>%{e.percent}</span>
                          </div>
                          <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                            <div className={`h-full bg-linear-to-r ${grad} rounded-full`} style={{ width: `${e.percent}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Footer chip */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/8">
                    <span className="text-[8px] font-mono uppercase tracking-widest text-(--color-text-muted)">Toplam İnsiyatif</span>
                    <span className="text-[10px] font-mono font-bold text-white">62 kayıt · CI Register</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-(--color-accent-blue-light)">
                <Sparkles size={32} />
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

          {/* Feature 2: Üç Aşamalı Değerlendirme */}
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
                <div className="relative w-full h-135 rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-(--color-surface-elevated-solid) flex flex-col p-8 gap-4">
                  {/* Phase header */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] font-semibold uppercase tracking-widest text-(--color-text-muted)">
                      Karar Verme Akışı
                    </span>
                    <span className="text-[10px] font-mono text-(--color-accent-emerald-light)">
                      3 aşama
                    </span>
                  </div>

                  {/* Three phases */}
                  {[
                    {
                      step: "01",
                      icon: Search,
                      title: "Analiz",
                      desc: "Kurum hedeflerine katkı, kapsam ve gereksinim netliği",
                      tone: "blue",
                    },
                    {
                      step: "02",
                      icon: Scale,
                      title: "Değerlendirme",
                      desc: "Fayda, efor, maliyet ve risk somut hesaplanır",
                      tone: "emerald",
                    },
                    {
                      step: "03",
                      icon: MessagesSquare,
                      title: "İstişare-Danışma",
                      desc: "İlgili süreçlerin görüşü çok sesli kurulda toplanır",
                      tone: "purple",
                    },
                  ].map((p, i) => {
                    const Icon = p.icon;
                    return (
                      <div
                        key={i}
                        className="flex items-start gap-4 px-4 py-4 rounded-xl bg-white/2 border border-white/8 hover:border-emerald-500/30 transition-colors"
                      >
                        <div
                          className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                            p.tone === "blue"
                              ? "bg-blue-500/15 border border-blue-500/25 text-(--color-accent-blue-light)"
                              : p.tone === "emerald"
                                ? "bg-emerald-500/15 border border-emerald-500/25 text-(--color-accent-emerald-light)"
                                : "bg-purple-500/15 border border-purple-500/25 text-(--color-accent-purple-light)"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-white">
                              {p.title}
                            </span>
                            <span className="text-[10px] font-mono text-(--color-text-muted)">
                              {p.step}
                            </span>
                          </div>
                          <span className="text-[11px] font-light text-(--color-text-secondary) mt-0.5">
                            {p.desc}
                          </span>
                        </div>
                      </div>
                    );
                  })}

                  {/* CI Manager footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/5 mt-auto">
                    <span className="text-[10px] font-medium text-(--color-text-muted)">
                      Liderlik
                    </span>
                    <span className="text-[10px] font-semibold text-white">
                      CI Yöneticisi
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-(--color-accent-emerald-light)">
                <ListChecks size={32} />
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

          {/* Feature 3: Interaction Entegrasyonu */}
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
                <div className="relative w-full h-135 rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-(--color-surface-elevated-solid) flex flex-col p-5 gap-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/8">
                    <div className="flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-(--color-accent-purple-light)" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white">Interaction → CI Yönlendirme</span>
                    </div>
                    <span className="text-[8px] font-mono text-(--color-text-muted)">3 etkileşim türü</span>
                  </div>

                  {/* Etkileşim türleri */}
                  <div className="flex flex-col gap-2">
                    <span className="text-[8px] font-mono uppercase tracking-wider text-(--color-text-muted)">Gelen Talepler · Otomatik Sınıflandırma</span>
                    {[
                      { id: "INT-2418", title: "VPN bağlantım yok", type: "Olay", route: "Incident Modülü", icon: AlertCircle, tone: "red" },
                      { id: "INT-2419", title: "Yeni laptop talebi", type: "İstek", route: "Request Modülü (katalog)", icon: Plus, tone: "blue" },
                      { id: "INT-2420", title: "AI ile çözüm öner", type: "Öneri", route: "CI Modülü (insiyatif)", icon: Sparkles, tone: "purple", highlight: true },
                    ].map((row, i) => {
                      const Icon = row.icon;
                      const tone: Record<string, string> = {
                        red: "bg-red-500/8 border-red-500/20 text-(--color-accent-red-light)",
                        blue: "bg-blue-500/8 border-blue-500/20 text-(--color-accent-blue-light)",
                        purple: "bg-purple-500/12 border-purple-500/35 text-(--color-accent-purple-light) shadow-[0_0_15px_rgba(168,85,247,0.15)]",
                      };
                      return (
                        <div key={i} className={`flex flex-col gap-1.5 rounded-lg border p-2.5 ${tone[row.tone]}`}>
                          <div className="grid grid-cols-[auto_auto_1fr_auto] gap-2 items-center">
                            <Icon className="w-3 h-3" />
                            <span className="text-[8px] font-mono text-(--color-text-muted)">{row.id}</span>
                            <span className="text-[10px] font-medium text-white truncate">{row.title}</span>
                            <span className="text-[7px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-white/5 border border-white/10">
                              {row.type}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 pt-1 border-t border-white/8">
                            <ArrowRight className="w-2.5 h-2.5 text-(--color-text-muted)" />
                            <span className="text-[9px] text-white">{row.route}</span>
                            {row.highlight && <Sparkles className="w-2.5 h-2.5 text-(--color-accent-purple-light) ml-auto" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Engage layer */}
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-linear-to-r from-purple-500/12 to-indigo-500/8 border border-purple-500/30 mt-auto shadow-[0_0_20px_rgba(168,85,247,0.12)]">
                    <Layers className="w-3.5 h-3.5 text-(--color-accent-purple-light) shrink-0" />
                    <div className="flex flex-col flex-1 min-w-0">
                      <span className="text-[8px] font-mono uppercase tracking-wider text-(--color-text-muted)">ITIL4 Service Value System</span>
                      <span className="text-[10px] font-bold text-white">Engage katmanı · CI sürecinin liderliği</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-(--color-accent-purple-light)">
                <MessageSquare size={32} />
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
            {/* Bento 1 - Beş Soruluk Çerçeve (wide, 5 questions mock) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 lg:col-span-2 row-span-1 rounded-4xl bg-linear-to-br from-blue-500/10 to-transparent border border-white/10 p-8 hover:bg-white/4 transition-colors relative overflow-hidden group flex flex-col md:flex-row gap-6 items-center"
            >
              <div className="w-full md:w-1/2 flex flex-col justify-center shrink-0">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-(--color-accent-blue-light) flex items-center justify-center mb-6">
                  <HelpCircle />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {data.bento.items[0].title}
                </h3>
                <p className="text-sm text-(--color-text-secondary) font-light pr-4">
                  {data.bento.items[0].description}
                </p>
              </div>
              <div className="w-full md:w-1/2 h-45 md:h-full relative rounded-xl border border-white/10 overflow-hidden shadow-inner shrink-0 bg-(--color-surface-elevated-solid) group-hover:border-blue-500/40 transition-colors flex flex-col gap-1.5 p-4 justify-center">
                {[
                  "Hedeflere katkı",
                  "Somut faydalar",
                  "Gereken efor",
                  "Maliyetler",
                  "Yapma–yapmama riskleri",
                ].map((q, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/3 border border-white/5"
                  >
                    <span className="text-[9px] font-mono font-bold text-(--color-accent-blue-light) w-5">
                      0{i + 1}
                    </span>
                    <span className="text-[11px] font-medium text-white">
                      {q}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bento 2 - Puantaj (normal, görselli) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-(--color-accent-orange-light) flex items-center justify-center mb-6 shrink-0">
                <ListOrdered />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[1].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[1].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-3 flex flex-col gap-1.5">
                <div className="flex items-center justify-between pb-1.5 border-b border-white/8">
                  <div className="flex items-center gap-1.5">
                    <ListOrdered className="w-3 h-3 text-(--color-accent-orange-light)" />
                    <span className="text-[9px] font-bold uppercase tracking-widest text-white">Puantaj · CI-2412</span>
                  </div>
                  <span className="text-[8px] font-mono font-bold text-(--color-accent-emerald-light) px-1.5 py-0.5 rounded-full bg-emerald-500/12 border border-emerald-500/25">87/100</span>
                </div>
                {[
                  { label: "Hedef Katkı", weight: 30, score: 27, tone: "blue" },
                  { label: "Fayda", weight: 25, score: 22, tone: "emerald" },
                  { label: "Efor", weight: 15, score: 12, tone: "amber" },
                  { label: "Maliyet", weight: 15, score: 13, tone: "cyan" },
                  { label: "Risk", weight: 15, score: 13, tone: "purple" },
                ].map((c, i) => {
                  const pct = (c.score / c.weight) * 100;
                  const tone: Record<string, string> = {
                    blue: "from-blue-500 to-cyan-400",
                    emerald: "from-emerald-500 to-emerald-400",
                    amber: "from-amber-500 to-amber-400",
                    cyan: "from-cyan-500 to-cyan-400",
                    purple: "from-purple-500 to-pink-400",
                  };
                  return (
                    <div key={i} className="flex flex-col gap-0.5">
                      <div className="flex items-center justify-between text-[9px]">
                        <span className="font-medium text-white">{c.label}</span>
                        <span className="font-mono text-(--color-text-muted)">{c.score}/{c.weight}</span>
                      </div>
                      <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                        <div className={`h-full bg-linear-to-r ${tone[c.tone]} rounded-full`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
                <div className="mt-auto pt-1.5 border-t border-white/8 flex items-center gap-1.5">
                  <Plus className="w-2.5 h-2.5 text-(--color-text-muted)" />
                  <span className="text-[8px] font-mono text-(--color-text-muted) flex-1">Kuruma özgü kriter</span>
                  <span className="text-[8px] font-mono font-bold text-(--color-accent-orange-light)">+ ekle</span>
                </div>
              </div>
            </motion.div>

            {/* Bento 3 - Katkı sağlayan süreçler (normal, mock chips) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-(--color-accent-cyan-light) flex items-center justify-center mb-6 shrink-0">
                <Users />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[2].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[2].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-wrap content-center gap-2 justify-center">
                {[
                  "İş Analizi",
                  "SLM",
                  "İlişki",
                  "Portföy",
                  "Risk",
                  "Finans",
                  "Katalog",
                  "İstek",
                ].map((tag, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-medium text-white px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Bento 4 - Değişiklik veya Proje (wide, görselli) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 lg:col-span-2 row-span-1 rounded-4xl bg-linear-to-br from-purple-500/10 to-transparent border border-white/10 p-8 hover:bg-white/4 transition-colors relative overflow-hidden group flex flex-col md:flex-row gap-6 items-center"
            >
              <div className="w-full md:w-1/2 flex flex-col justify-center shrink-0">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-(--color-accent-purple-light) flex items-center justify-center mb-6">
                  <GitBranch />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {data.bento.items[3].title}
                </h3>
                <p className="text-sm text-(--color-text-secondary) font-light pr-4">
                  {data.bento.items[3].description}
                </p>
              </div>
              <div className="w-full md:w-1/2 h-45 md:h-full relative rounded-xl border border-white/10 overflow-hidden shadow-inner shrink-0 bg-(--color-surface-elevated-solid) group-hover:border-purple-500/40 transition-colors p-5 flex flex-col gap-3 justify-center">
                {/* CI -> Change/Project flow */}
                <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-linear-to-r from-blue-500/15 to-blue-500/5 border border-blue-500/30">
                  <Sparkles className="w-3.5 h-3.5 text-(--color-accent-blue-light)" />
                  <span className="text-[11px] font-semibold text-white">
                    İyileştirme İnsiyatifi
                  </span>
                  <span className="ml-auto text-[9px] font-mono text-(--color-text-muted)">
                    onaylandı
                  </span>
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-px h-4 bg-linear-to-b from-blue-500/40 to-purple-500/40" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-white/3 border border-white/8">
                    <GitBranch className="w-3.5 h-3.5 text-(--color-accent-purple-light)" />
                    <span className="text-[11px] font-medium text-white">
                      Değişiklik
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-white/3 border border-white/8">
                    <Layers className="w-3.5 h-3.5 text-(--color-accent-cyan-light)" />
                    <span className="text-[11px] font-medium text-white">
                      Proje
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bento 5 - Engage Katmanı (normal, mock layered) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 border border-white/10 bg-linear-to-br from-indigo-500/5 to-transparent rounded-4xl p-8 hover:bg-white/4 transition-colors flex flex-col overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-6 shrink-0">
                <Layers />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[4].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[4].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-1.5 justify-center">
                {[
                  { name: "Plan", o: 0.3 },
                  { name: "Improve", o: 0.45 },
                  { name: "Engage", o: 1, active: true },
                  { name: "Design & Transition", o: 0.45 },
                  { name: "Deliver & Support", o: 0.3 },
                ].map((row, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${
                      row.active
                        ? "bg-indigo-500/15 border-indigo-500/40"
                        : "bg-white/2 border-white/5"
                    }`}
                    style={{ opacity: row.o }}
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        row.active ? "bg-indigo-400" : "bg-white/30"
                      }`}
                    />
                    <span
                      className={`text-[11px] ${
                        row.active
                          ? "text-white font-semibold"
                          : "text-(--color-text-secondary) font-medium"
                      }`}
                    >
                      {row.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bento 6 - Rapor + Öneri kaynakları (normal, mock combined) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-(--color-accent-emerald-light) flex items-center justify-center mb-6 shrink-0">
                <LineChart />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[5].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[5].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-2 justify-center">
                <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/3 border border-white/5">
                  <div className="flex items-center gap-2">
                    <LineChart className="w-3.5 h-3.5 text-(--color-accent-emerald-light)" />
                    <span className="text-[11px] font-medium text-white">
                      Rapor sonuçları
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-semibold text-(--color-accent-emerald-light)">
                    +24
                  </span>
                </div>
                <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/3 border border-white/5">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-3.5 h-3.5 text-(--color-accent-blue-light)" />
                    <span className="text-[11px] font-medium text-white">
                      Kullanıcı önerisi
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-semibold text-(--color-accent-blue-light)">
                    +18
                  </span>
                </div>
                <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/3 border border-white/5">
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-(--color-accent-purple-light)" />
                    <span className="text-[11px] font-medium text-white">
                      Teknik ekip
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-semibold text-(--color-accent-purple-light)">
                    +9
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <span className="text-[9px] font-medium uppercase tracking-wider text-(--color-text-muted)">
                    CI Register
                  </span>
                  <span className="text-xs font-mono font-bold text-white">
                    51 insiyatif
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3.5 BEŞ SORULUK ÇERÇEVE */}
      <section className="py-24 relative z-20 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-300 h-150 bg-blue-600/8 blur-[140px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-6 lg:px-12 w-full max-w-7xl relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
              <HelpCircle className="w-3.5 h-3.5 text-(--color-accent-blue-light)" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-(--color-accent-blue-light)">
                Değer Odaklı Eleme
              </span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-white mb-6">
              {data.fiveQuestions.sectionTitle}
            </h2>
            <p className="text-(--color-text-secondary) text-lg font-light leading-relaxed">
              {data.fiveQuestions.sectionSubtitle}
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
          >
            {data.fiveQuestions.items.map((q) => {
              const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
                Target, Sparkles, Clock, Wallet, AlertTriangle,
              };
              const Icon = iconMap[q.icon] || Target;
              const t: Record<string, string> = {
                blue: "from-blue-500/15 to-blue-500/5 border-blue-500/25 text-(--color-accent-blue-light) shadow-[0_0_25px_rgba(59,130,246,0.12)]",
                emerald: "from-emerald-500/15 to-emerald-500/5 border-emerald-500/25 text-(--color-accent-emerald-light) shadow-[0_0_25px_rgba(16,185,129,0.12)]",
                amber: "from-amber-500/15 to-amber-500/5 border-amber-500/25 text-amber-300 shadow-[0_0_25px_rgba(245,158,11,0.12)]",
                cyan: "from-cyan-500/15 to-cyan-500/5 border-cyan-500/25 text-(--color-accent-cyan-light) shadow-[0_0_25px_rgba(6,182,212,0.12)]",
                red: "from-red-500/15 to-red-500/5 border-red-500/25 text-(--color-accent-red-light) shadow-[0_0_25px_rgba(239,68,68,0.12)]",
              };
              return (
                <motion.div
                  key={q.id}
                  variants={fadeUp}
                  className={`rounded-3xl bg-linear-to-br ${t[q.tone]} border p-6 lg:p-7 flex flex-col gap-4 hover:-translate-y-1 transition-transform duration-300`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-3xl font-bold text-white/15 tracking-tight ml-auto">{q.number}</span>
                  </div>
                  <h3 className="text-base lg:text-lg font-bold text-white tracking-tight leading-tight">{q.title}</h3>
                  <p className="text-sm text-(--color-text-secondary) font-light leading-relaxed">{q.answer}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 3.6 ITIL4 CI MODEL */}
      <section className="py-24 relative z-20 overflow-hidden border-y border-white/5 bg-(--color-surface-base-dark)">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] mix-blend-screen pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-300 h-150 bg-purple-600/8 blur-[140px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-6 lg:px-12 w-full max-w-7xl relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
              <RefreshCw className="w-3.5 h-3.5 text-(--color-accent-purple-light)" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-(--color-accent-purple-light)">
                {data.ciModel.badge}
              </span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-white mb-6">
              {data.ciModel.titleLead}
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-400">
                {data.ciModel.titleAccent}
              </span>
            </h2>
            <p className="text-(--color-text-secondary) text-lg font-light leading-relaxed">
              {data.ciModel.description}
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "100px" }}
            className="flex flex-col lg:flex-row items-stretch gap-2 lg:gap-3"
          >
            {data.ciModel.steps.map((s, i, arr) => {
              const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
                Compass, Eye, Target, Map, Zap, CheckCircle2, RefreshCw,
              };
              const Icon = iconMap[s.icon] || Compass;
              const isLast = i === arr.length - 1;
              return (
                <motion.div
                  key={s.id}
                  variants={fadeUp}
                  className="flex flex-col lg:flex-row items-stretch gap-2 lg:gap-3 lg:flex-1"
                >
                  <div className="flex-1 rounded-2xl border border-white/10 bg-white/2 backdrop-blur-xl p-4 flex flex-col items-center gap-2 hover:bg-white/4 hover:border-purple-500/30 transition-colors text-center">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-(--color-accent-purple-light) shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[8px] font-mono uppercase tracking-widest text-(--color-text-muted)">
                      Adım {i + 1}
                    </span>
                    <h3 className="text-sm font-bold text-white tracking-tight leading-tight">{s.title}</h3>
                    <p className="text-[10px] text-(--color-text-secondary) font-light leading-relaxed">{s.desc}</p>
                  </div>
                  {!isLast && (
                    <>
                      <ChevronRight className="hidden lg:block w-4 h-4 text-(--color-text-muted) self-center shrink-0" />
                      <ChevronDown className="lg:hidden w-4 h-4 text-(--color-text-muted) self-center shrink-0" />
                    </>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 3.7 FAQ */}
      <section className="py-24 relative z-20">
        <div className="container mx-auto px-6 lg:px-12 w-full max-w-4xl">
          <div className="text-center mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-(--color-accent-blue-light)" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-(--color-accent-blue-light)">
                CI Bilgi Bankası
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
                Sparkles, Scale, ListChecks, MessageSquare, GitBranch,
              };
              const Icon = iconMap[item.icon] || Sparkles;
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
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

                <div className="relative z-10 w-full">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 mx-auto">
                    <TrendingUp className="w-4 h-4 text-(--color-accent-blue-light)" />
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-text-overline)">
                      Sürekli İyileştirme
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
                        ITIL 4 Uyumu
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                        <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-blue-base) shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                        CI Register
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                        <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-purple-base) shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
                        Değer Odaklılık
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
