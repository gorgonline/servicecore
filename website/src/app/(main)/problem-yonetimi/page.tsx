"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  HelpCircle,
  Search,
  GitBranch,
  Link2,
  AlertTriangle,
  Filter,
  BookOpen,
  MessageSquare,
  Clock,
  ArrowRight,
  CheckCircle2,
  Layers,
  Users,
  Sparkles,
  Activity,
  TrendingUp,
  AlertCircle,
  ChevronRight,
  ArrowDown,
  Zap,
  RefreshCw,
  Eye,
  Star,
  Target,
  CornerDownRight,
} from "lucide-react";
import data from "@/data/problem-yonetimi.json";

export default function ProblemYonetimiPage() {
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
              <HelpCircle size={14} />
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
            className="relative mx-auto rounded-4xl border border-white/10 bg-white/2 backdrop-blur-3xl p-4 lg:p-6 shadow-2xl overflow-hidden group w-full max-h-125"
          >
            <Image
              src="/images/problem-modulu/index.png"
              alt={data.hero.imageAlt}
              width={1426}
              height={636}
              className="block w-full h-auto rounded-2xl group-hover:scale-[1.01] transition-transform duration-700"
              priority
            />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-(--color-surface-base) to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* 2. ZIG-ZAG FEATURE BLOCKS */}
      <section className="py-24 relative z-20">
        <div className="container mx-auto px-6 lg:px-12 w-full max-w-7xl flex flex-col gap-32">
          {/* Feature 1: ITIL4 Reactive & Proaktif — blue */}
          <motion.div
            animate="visible"
            variants={fadeUp}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-blue-500/5 to-cyan-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-blue-500/10 blur-[50px] group-hover:bg-blue-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full h-112.5 rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-(--color-surface-elevated-solid) flex flex-col p-5 gap-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/8">
                    <div className="flex items-center gap-1.5">
                      <RefreshCw className="w-3.5 h-3.5 text-(--color-accent-blue-light)" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white">ITIL4 Yaşam Döngüsü</span>
                    </div>
                    <span className="text-[8px] font-mono text-(--color-text-muted)">tetikleyiciler</span>
                  </div>

                  {/* Two columns: Reactive vs Proactive */}
                  <div className="grid grid-cols-2 gap-2.5 flex-1">
                    {/* REACTIVE */}
                    <div className="flex flex-col gap-2 rounded-xl bg-red-500/8 border border-red-500/25 p-3 shadow-[0_0_20px_rgba(239,68,68,0.1)]">
                      <div className="flex items-center justify-between pb-1 border-b border-red-500/15">
                        <div className="flex items-center gap-1.5">
                          <AlertCircle className="w-3 h-3 text-(--color-accent-red-light)" />
                          <span className="text-[10px] font-bold uppercase tracking-widest text-(--color-accent-red-light)">Reactive</span>
                        </div>
                        <span className="text-[7px] font-mono text-(--color-text-muted)">olay sonrası</span>
                      </div>
                      {/* Stage 1: Olay grup */}
                      <div className="flex flex-col gap-1">
                        <span className="text-[8px] font-mono uppercase tracking-wider text-(--color-text-muted)">5 olay tekrar</span>
                        <div className="flex flex-col gap-0.5">
                          {["#4218", "#4217", "#4214"].map((id, i) => (
                            <div key={i} className="flex items-center gap-1 px-1.5 py-1 rounded-md bg-white/3 border border-white/8">
                              <AlertCircle className="w-2.5 h-2.5 text-(--color-accent-red-light)" />
                              <span className="text-[8px] font-mono text-(--color-text-muted)">{id}</span>
                              <span className="text-[8px] text-white truncate flex-1">VPN sertifika</span>
                            </div>
                          ))}
                          <span className="text-[7px] font-mono text-(--color-text-muted) text-center">+ 2 daha</span>
                        </div>
                      </div>
                      {/* Arrow */}
                      <div className="flex items-center justify-center gap-1 py-0.5">
                        <ArrowDown className="w-3 h-3 text-(--color-accent-red-light)" />
                        <span className="text-[7px] font-mono uppercase text-(--color-accent-red-light)">birleştir</span>
                      </div>
                      {/* Output */}
                      <div className="rounded-lg bg-blue-500/12 border border-blue-500/30 p-2 flex flex-col gap-0.5">
                        <span className="text-[7px] font-mono uppercase tracking-wider text-(--color-text-muted)">Problem oluştu</span>
                        <div className="flex items-center gap-1.5">
                          <HelpCircle className="w-3 h-3 text-(--color-accent-blue-light)" />
                          <span className="text-[10px] font-bold text-white">P-018</span>
                        </div>
                      </div>
                    </div>

                    {/* PROACTIVE */}
                    <div className="flex flex-col gap-2 rounded-xl bg-emerald-500/8 border border-emerald-500/25 p-3 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                      <div className="flex items-center justify-between pb-1 border-b border-emerald-500/15">
                        <div className="flex items-center gap-1.5">
                          <TrendingUp className="w-3 h-3 text-(--color-accent-emerald-light)" />
                          <span className="text-[10px] font-bold uppercase tracking-widest text-(--color-accent-emerald-light)">Proaktif</span>
                        </div>
                        <span className="text-[7px] font-mono text-(--color-text-muted)">olay öncesi</span>
                      </div>
                      {/* Stage 1: Trend signal */}
                      <div className="flex flex-col gap-1">
                        <span className="text-[8px] font-mono uppercase tracking-wider text-(--color-text-muted)">AI Trend</span>
                        <div className="flex items-end gap-0.5 h-10">
                          {[1, 2, 1, 3, 2, 4, 5].map((v, i) => (
                            <div
                              key={i}
                              className={`flex-1 rounded-t bg-linear-to-t ${i >= 5 ? "from-emerald-500 to-emerald-400" : "from-emerald-500/40 to-emerald-400/60"} border border-emerald-500/30`}
                              style={{ height: `${(v / 5) * 100}%` }}
                            />
                          ))}
                        </div>
                        <div className="flex items-center gap-1 px-1.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                          <Activity className="w-2.5 h-2.5 text-(--color-accent-emerald-light) animate-pulse" />
                          <span className="text-[8px] font-medium text-white">CPU sürekli %85+</span>
                        </div>
                      </div>
                      {/* Arrow */}
                      <div className="flex items-center justify-center gap-1 py-0.5">
                        <ArrowDown className="w-3 h-3 text-(--color-accent-emerald-light)" />
                        <span className="text-[7px] font-mono uppercase text-(--color-accent-emerald-light)">öngör</span>
                      </div>
                      {/* Output */}
                      <div className="rounded-lg bg-blue-500/12 border border-blue-500/30 p-2 flex flex-col gap-0.5">
                        <span className="text-[7px] font-mono uppercase tracking-wider text-(--color-text-muted)">Önerilen Problem</span>
                        <div className="flex items-center gap-1.5">
                          <HelpCircle className="w-3 h-3 text-(--color-accent-blue-light)" />
                          <span className="text-[10px] font-bold text-white">P-019</span>
                          <Sparkles className="w-2.5 h-2.5 text-(--color-accent-purple-light) ml-auto" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer lifecycle bar */}
                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/8">
                    {[
                      { label: "Tespit", icon: Eye },
                      { label: "Analiz", icon: Search },
                      { label: "Çözüm", icon: Zap },
                      { label: "Kapanış", icon: CheckCircle2 },
                    ].map((s, i, arr) => {
                      const Icon = s.icon;
                      return (
                        <div key={i} className="flex items-center gap-1.5 flex-1">
                          <div className="w-5 h-5 rounded-md bg-blue-500/15 border border-blue-500/30 flex items-center justify-center shrink-0">
                            <Icon className="w-2.5 h-2.5 text-(--color-accent-blue-light)" />
                          </div>
                          <span className="text-[8px] font-semibold text-white">{s.label}</span>
                          {i < arr.length - 1 && (
                            <ChevronRight className="w-2.5 h-2.5 text-(--color-text-muted) ml-auto" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-(--color-accent-blue-light)">
                <HelpCircle size={32} />
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

          {/* Feature 2: Kök Neden Analizi — emerald */}
          <motion.div
            animate="visible"
            variants={fadeUp}
            className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-emerald-500/5 to-cyan-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-emerald-500/10 blur-[50px] group-hover:bg-emerald-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full h-112.5 rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-(--color-surface-elevated-solid) flex flex-col p-5 gap-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/8">
                    <div className="flex items-center gap-1.5">
                      <Search className="w-3.5 h-3.5 text-(--color-accent-emerald-light)" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white">Kök Neden Analizi</span>
                    </div>
                    <span className="text-[8px] font-mono text-(--color-accent-emerald-light) px-1.5 py-0.5 rounded-full bg-emerald-500/12 border border-emerald-500/25">
                      P-018
                    </span>
                  </div>

                  {/* Symptom */}
                  <div className="rounded-xl bg-red-500/10 border border-red-500/25 p-3 flex items-center gap-2 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
                    <AlertTriangle className="w-4 h-4 text-(--color-accent-red-light) shrink-0" />
                    <div className="flex flex-col flex-1 min-w-0">
                      <span className="text-[8px] font-mono uppercase tracking-wider text-(--color-text-muted)">Belirti</span>
                      <span className="text-[11px] font-semibold text-white">VPN bağlantı kopması — 5 olay tekrar</span>
                    </div>
                  </div>

                  {/* 5 Whys cascade */}
                  <div className="flex flex-col gap-1.5 flex-1">
                    <span className="text-[8px] font-mono uppercase tracking-wider text-(--color-text-muted) mb-0.5">5 Neden Tekniği</span>
                    {[
                      { q: "Neden bağlantı kopuyor?", a: "Sertifika doğrulaması başarısız", tone: "amber" },
                      { q: "Neden doğrulama başarısız?", a: "Sertifika süresi dolmuş", tone: "amber" },
                      { q: "Neden süresi dolmuş?", a: "Otomatik yenileme job'u çalışmamış", tone: "amber" },
                      { q: "Neden job çalışmadı?", a: "Cron servis durmuş, alarm kapalı", tone: "amber" },
                      { q: "Kök neden", a: "Monitoring kuralı eksik · cron izlenmiyor", tone: "emerald", root: true },
                    ].map((w, i) => {
                      const tone: Record<string, string> = {
                        amber: "border-amber-500/20 bg-amber-500/5",
                        emerald: "border-emerald-500/35 bg-emerald-500/12 shadow-[0_0_15px_rgba(16,185,129,0.2)]",
                      };
                      return (
                        <div
                          key={i}
                          className={`grid grid-cols-[auto_1fr_auto] gap-2 items-center px-2.5 py-1.5 rounded-lg border ${tone[w.tone]}`}
                          style={{ marginLeft: `${i * 8}px` }}
                        >
                          <CornerDownRight className={`w-3 h-3 ${w.root ? "text-(--color-accent-emerald-light)" : "text-amber-300"}`} />
                          <div className="flex flex-col min-w-0">
                            <span className="text-[8px] font-mono uppercase text-(--color-text-muted)">
                              {w.q}
                            </span>
                            <span className={`text-[10px] font-semibold ${w.root ? "text-white" : "text-(--color-text-secondary)"} truncate`}>
                              {w.a}
                            </span>
                          </div>
                          {w.root && (
                            <Target className="w-3.5 h-3.5 text-(--color-accent-emerald-light) shrink-0" />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Known Error + Etki */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-lg bg-purple-500/10 border border-purple-500/25 p-2 flex flex-col gap-0.5">
                      <div className="flex items-center gap-1.5">
                        <BookOpen className="w-3 h-3 text-(--color-accent-purple-light)" />
                        <span className="text-[8px] font-mono uppercase tracking-wider text-(--color-text-muted)">Known Error</span>
                      </div>
                      <span className="text-[10px] font-bold text-white">KE-2034</span>
                      <span className="text-[8px] text-(--color-text-secondary) truncate">Workaround: manuel cron tetikle</span>
                    </div>
                    <div className="rounded-lg bg-blue-500/10 border border-blue-500/25 p-2 flex flex-col gap-0.5">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3 h-3 text-(--color-accent-blue-light)" />
                        <span className="text-[8px] font-mono uppercase tracking-wider text-(--color-text-muted)">İş Etkisi</span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-base font-bold text-white">42</span>
                        <span className="text-[8px] text-(--color-text-muted)">kullanıcı</span>
                      </div>
                      <span className="text-[8px] text-(--color-text-secondary)">Kritik · saatlik</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-(--color-accent-emerald-light)">
                <Search size={32} />
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

          {/* Feature 3: Change ile Kalıcı Çözüm — purple */}
          <motion.div
            animate="visible"
            variants={fadeUp}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-purple-500/5 to-indigo-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-purple-500/10 blur-[50px] group-hover:bg-purple-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full h-112.5 rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-(--color-surface-elevated-solid) flex flex-col p-5 gap-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/8">
                    <div className="flex items-center gap-1.5">
                      <GitBranch className="w-3.5 h-3.5 text-(--color-accent-purple-light)" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white">Kalıcı Çözüm Akışı</span>
                    </div>
                    <span className="text-[8px] font-mono text-(--color-text-muted)">otomatik · zincirleme</span>
                  </div>

                  {/* Stage 1: Problem */}
                  <div className="rounded-xl bg-blue-500/10 border border-blue-500/30 p-2.5 flex items-center gap-2 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shrink-0">
                      <HelpCircle className="w-4 h-4 text-(--color-accent-blue-light)" />
                    </div>
                    <div className="flex flex-col flex-1 min-w-0">
                      <span className="text-[8px] font-mono uppercase tracking-wider text-(--color-text-muted)">Problem · kök neden tanımlandı</span>
                      <span className="text-[11px] font-semibold text-white truncate">P-018 · VPN sertifika otomatik yenileme eksik</span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex items-center justify-center gap-2">
                    <ArrowDown className="w-3.5 h-3.5 text-(--color-accent-purple-light)" />
                    <span className="text-[8px] font-mono uppercase tracking-widest text-(--color-accent-purple-light)">değişikliğe dönüştür</span>
                    <ArrowDown className="w-3.5 h-3.5 text-(--color-accent-purple-light)" />
                  </div>

                  {/* Stage 2: Change Request */}
                  <div className="rounded-xl bg-purple-500/12 border border-purple-500/30 p-3 flex flex-col gap-2 shadow-[0_0_20px_rgba(168,85,247,0.15)]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <RefreshCw className="w-3.5 h-3.5 text-(--color-accent-purple-light)" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-(--color-accent-purple-light)">Change Request</span>
                        <span className="text-[10px] font-mono font-bold text-white">CR-2451</span>
                      </div>
                      <span className="text-[8px] font-mono font-semibold text-(--color-accent-emerald-light) px-1.5 py-0.5 rounded-full bg-emerald-500/12 border border-emerald-500/25">
                        ONAYLANDI
                      </span>
                    </div>
                    <span className="text-[10px] text-(--color-text-secondary)">Cron monitoring kuralı + alarm + sertifika rotasyonu</span>
                    {/* Approval steps */}
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { role: "CAB", done: true },
                        { role: "Yönetici", done: true },
                        { role: "Uygulama", done: true, active: true },
                      ].map((s, i) => (
                        <div
                          key={i}
                          className={`flex items-center gap-1 px-2 py-1 rounded-md border ${s.active ? "bg-emerald-500/15 border-emerald-500/30" : "bg-white/3 border-white/8"}`}
                        >
                          <CheckCircle2 className={`w-2.5 h-2.5 ${s.done ? "text-(--color-accent-emerald-light)" : "text-(--color-text-muted)"}`} />
                          <span className="text-[9px] font-medium text-white">{s.role}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex items-center justify-center gap-2">
                    <ArrowDown className="w-3.5 h-3.5 text-(--color-accent-emerald-light)" />
                    <span className="text-[8px] font-mono uppercase tracking-widest text-(--color-accent-emerald-light)">olayları otomatik kapat</span>
                    <ArrowDown className="w-3.5 h-3.5 text-(--color-accent-emerald-light)" />
                  </div>

                  {/* Stage 3: Cascading incident close */}
                  <div className="flex flex-col gap-1 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] font-mono uppercase tracking-wider text-(--color-text-muted)">Bağlı Olaylar (5)</span>
                      <span className="text-[8px] font-mono font-bold text-(--color-accent-emerald-light)">5/5 kapatıldı</span>
                    </div>
                    {[
                      { id: "#4218", title: "VPN bağlantı sorunu", time: "auto · 09:45" },
                      { id: "#4217", title: "Mail server gecikmesi", time: "auto · 09:45" },
                      { id: "#4214", title: "Disk %95 dolu", time: "auto · 09:46" },
                      { id: "#4205", title: "AD parola sync hatası", time: "auto · 09:46" },
                    ].map((r, i) => (
                      <div
                        key={i}
                        className="grid grid-cols-[auto_auto_1fr_auto_auto] gap-2 items-center px-2 py-1.5 rounded-lg bg-emerald-500/5 border border-emerald-500/15"
                      >
                        <CheckCircle2 className="w-3 h-3 text-(--color-accent-emerald-light)" />
                        <span className="text-[8px] font-mono text-(--color-text-muted)">{r.id}</span>
                        <span className="text-[10px] font-medium text-white truncate line-through opacity-60">{r.title}</span>
                        <span className="text-[7px] font-mono font-bold text-(--color-accent-emerald-light) px-1 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/25">
                          ÇÖZÜLDÜ
                        </span>
                        <span className="text-[8px] font-mono text-(--color-text-muted)">{r.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-(--color-accent-purple-light)">
                <GitBranch size={32} />
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

      {/* 3. BENTO GRID — 6 kart */}
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[520px]"
          >
            {/* Bento Item 1 - Olay-Problem Bağıntı (full-width split, cyan) — problemcozum.png */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 md:col-span-2 lg:col-span-3 row-span-1 rounded-4xl bg-linear-to-br from-cyan-500/10 to-transparent border border-white/10 p-8 hover:bg-white/4 transition-colors relative overflow-hidden group flex flex-col md:flex-row gap-8 items-stretch"
            >
              <div className="w-full md:w-1/3 flex flex-col justify-center shrink-0">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-(--color-accent-cyan-light) flex items-center justify-center mb-6">
                  <Link2 />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {data.bento.items[0].title}
                </h3>
                <p className="text-sm text-(--color-text-secondary) font-light">
                  {data.bento.items[0].description}
                </p>
              </div>
              <div className="w-full md:w-2/3 h-60 md:h-auto relative rounded-xl border border-white/10 overflow-hidden shadow-inner shrink-0 group-hover:border-cyan-500/40 transition-colors bg-(--color-surface-elevated-solid) p-4 flex flex-col md:flex-row gap-3 items-stretch">
                {/* Left — incidents */}
                <div className="flex-1 flex flex-col gap-2 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <AlertCircle className="w-3 h-3 text-(--color-accent-red-light)" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white">Çoklu Olay</span>
                    </div>
                    <span className="text-[8px] font-mono font-bold text-(--color-accent-red-light) px-1.5 py-0.5 rounded-full bg-red-500/12 border border-red-500/25">
                      5 kayıt
                    </span>
                  </div>
                  <div className="flex flex-col gap-1.5 flex-1 overflow-hidden">
                    {[
                      { id: "#4218", title: "VPN bağlantı sorunu", time: "09:14" },
                      { id: "#4217", title: "VPN sertifika hatası", time: "09:08" },
                      { id: "#4214", title: "Auth zaman aşımı", time: "08:57" },
                      { id: "#4205", title: "VPN bağlantı düşmesi", time: "08:42" },
                      { id: "#4198", title: "VPN sertifika kontrol", time: "08:30" },
                    ].map((r, i) => (
                      <div
                        key={i}
                        className="grid grid-cols-[auto_auto_1fr_auto] gap-2 items-center px-2 py-1.5 rounded-lg bg-red-500/8 border border-red-500/20"
                      >
                        <AlertCircle className="w-2.5 h-2.5 text-(--color-accent-red-light)" />
                        <span className="text-[8px] font-mono text-(--color-text-muted)">{r.id}</span>
                        <span className="text-[10px] font-medium text-white truncate">{r.title}</span>
                        <span className="text-[8px] font-mono text-(--color-text-muted)">{r.time}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 pt-1 border-t border-white/8">
                    <Activity className="w-2.5 h-2.5 text-(--color-accent-cyan-light)" />
                    <span className="text-[8px] font-mono uppercase tracking-wider text-(--color-text-muted)">Aynı semptom · 30 dk</span>
                  </div>
                </div>

                {/* Connector */}
                <div className="hidden md:flex flex-col items-center justify-center gap-1 px-1">
                  <Link2 className="w-4 h-4 text-(--color-accent-cyan-light)" />
                  <ArrowRight className="w-4 h-4 text-(--color-accent-cyan-light)" />
                  <span className="text-[8px] font-mono uppercase tracking-widest text-(--color-accent-cyan-light) writing-mode-vertical [writing-mode:vertical-rl] rotate-180">
                    birleştir
                  </span>
                </div>
                <div className="md:hidden flex items-center justify-center py-1">
                  <ArrowDown className="w-4 h-4 text-(--color-accent-cyan-light)" />
                  <span className="text-[8px] font-mono uppercase tracking-widest text-(--color-accent-cyan-light) ml-2">birleştir</span>
                </div>

                {/* Right — single problem */}
                <div className="flex-1 flex flex-col gap-2 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <HelpCircle className="w-3 h-3 text-(--color-accent-blue-light)" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white">Tek Problem</span>
                    </div>
                    <span className="text-[8px] font-mono font-bold text-(--color-accent-blue-light) px-1.5 py-0.5 rounded-full bg-blue-500/12 border border-blue-500/25">
                      P-018
                    </span>
                  </div>
                  {/* Problem card */}
                  <div className="rounded-lg bg-blue-500/12 border border-blue-500/30 p-2.5 flex flex-col gap-1.5 shadow-[0_0_20px_rgba(59,130,246,0.15)]">
                    <div className="flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5 text-(--color-accent-blue-light)" />
                      <span className="text-[10px] font-bold text-white">VPN sertifika otomatik yenileme</span>
                    </div>
                    <span className="text-[9px] text-(--color-text-secondary)">Cron job durmuş, monitoring eksik</span>
                    <div className="flex items-center gap-2 pt-1 border-t border-blue-500/15">
                      <span className="text-[8px] font-mono text-(--color-text-muted)">Bağlı:</span>
                      <span className="text-[8px] font-mono font-bold text-(--color-accent-blue-light)">5 olay</span>
                      <Target className="w-2.5 h-2.5 text-(--color-accent-emerald-light) ml-auto" />
                      <span className="text-[8px] font-mono font-semibold text-(--color-accent-emerald-light)">RCA tamam</span>
                    </div>
                  </div>
                  {/* Linked metrics */}
                  <div className="grid grid-cols-2 gap-1.5">
                    <div className="rounded-md bg-white/3 border border-white/8 p-1.5 flex flex-col">
                      <span className="text-[7px] font-mono uppercase tracking-wider text-(--color-text-muted)">Etki</span>
                      <span className="text-[10px] font-bold text-white">42 kullanıcı</span>
                    </div>
                    <div className="rounded-md bg-white/3 border border-white/8 p-1.5 flex flex-col">
                      <span className="text-[7px] font-mono uppercase tracking-wider text-(--color-text-muted)">Tekrar</span>
                      <span className="text-[10px] font-bold text-white">12 kez · 30g</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/25 mt-auto">
                    <BookOpen className="w-3 h-3 text-(--color-accent-purple-light)" />
                    <span className="text-[9px] font-semibold text-white flex-1">Known Error</span>
                    <span className="text-[9px] font-mono font-bold text-(--color-accent-purple-light)">KE-2034</span>
                    <ChevronRight className="w-2.5 h-2.5 text-(--color-text-muted)" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bento Item 2 - Öncelik & Sınıflandırma (normal, orange) — görselsiz */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col justify-start relative overflow-hidden"
            >
              <div className="absolute -inset-16 bg-orange-500/5 blur-[70px] pointer-events-none" />
              <div className="relative w-12 h-12 rounded-xl bg-orange-500/20 text-(--color-accent-orange-light) flex items-center justify-center mb-6 shrink-0">
                <AlertTriangle />
              </div>
              <h3 className="relative text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[1].title}
              </h3>
              <p className="relative text-sm text-(--color-text-secondary) shrink-0 font-light mb-6">
                {data.bento.items[1].description}
              </p>
              <div className="relative mt-auto flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-xs font-medium text-(--color-accent-orange-light)">
                  <AlertTriangle size={12} />
                  Öncelik
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-xs font-medium text-(--color-accent-orange-light)">
                  <Sparkles size={12} />
                  Aciliyet
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-xs font-medium text-(--color-accent-orange-light)">
                  <Layers size={12} />
                  İş Etkisi
                </span>
              </div>
            </motion.div>

            {/* Bento Item 3 - Filtreleme (normal, amber) — index.png */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-6 shrink-0">
                <Filter />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[2].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[2].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-3 flex flex-col gap-2">
                {/* Saved view tabs */}
                <div className="flex items-center gap-1 border-b border-white/8 pb-2 overflow-hidden">
                  {[
                    { label: "Aktif", icon: Eye, active: false },
                    { label: "Known Error", icon: Star, active: true },
                    { label: "Yüksek", icon: AlertTriangle, active: false },
                  ].map((t, i) => {
                    const Icon = t.icon;
                    return (
                      <div
                        key={i}
                        className={`flex items-center gap-1 px-2 py-1 rounded-md text-[9px] font-medium ${
                          t.active
                            ? "bg-amber-500/15 border border-amber-500/30 text-amber-300"
                            : "text-(--color-text-muted) border border-transparent"
                        }`}
                      >
                        <Icon className="w-2.5 h-2.5" />
                        <span>{t.label}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Filter chips */}
                <div className="flex items-center gap-1 flex-wrap">
                  <Filter className="w-2.5 h-2.5 text-(--color-text-muted)" />
                  {[
                    { label: "Durum: Açık", tone: "blue" },
                    { label: "Etki: Yüksek", tone: "red" },
                  ].map((c, i) => {
                    const t: Record<string, string> = {
                      blue: "bg-blue-500/12 border-blue-500/25 text-(--color-accent-blue-light)",
                      red: "bg-red-500/12 border-red-500/25 text-(--color-accent-red-light)",
                    };
                    return (
                      <span
                        key={i}
                        className={`text-[8px] font-medium px-1.5 py-0.5 rounded-full border ${t[c.tone]}`}
                      >
                        {c.label}
                      </span>
                    );
                  })}
                </div>

                {/* Problem rows */}
                <div className="flex-1 flex flex-col gap-1 overflow-hidden">
                  {[
                    { id: "P-018", title: "VPN sertifika yenileme cron eksik", linked: 5, status: "RCA Devam", tone: "amber" },
                    { id: "P-017", title: "ERP raporlama timeout", linked: 3, status: "KE", tone: "purple" },
                    { id: "P-016", title: "Mail server gecikme", linked: 8, status: "Çözüldü", tone: "emerald" },
                    { id: "P-015", title: "Disk kapasite uyarısı yok", linked: 4, status: "RCA Devam", tone: "amber" },
                    { id: "P-014", title: "AD parola sync hatası", linked: 2, status: "KE", tone: "purple" },
                  ].map((r, i) => {
                    const t: Record<string, string> = {
                      amber: "text-amber-300 bg-amber-500/10 border-amber-500/20",
                      purple: "text-(--color-accent-purple-light) bg-purple-500/10 border-purple-500/20",
                      emerald: "text-(--color-accent-emerald-light) bg-emerald-500/10 border-emerald-500/20",
                    };
                    return (
                      <div
                        key={i}
                        className="grid grid-cols-[auto_1fr_auto_auto] gap-1.5 items-center px-2 py-1.5 rounded-lg bg-white/2 border border-white/5"
                      >
                        <span className="text-[8px] font-mono font-bold text-(--color-accent-blue-light)">{r.id}</span>
                        <span className="text-[10px] font-medium text-white truncate">{r.title}</span>
                        <span className="text-[8px] font-mono text-(--color-text-muted)">↳{r.linked}</span>
                        <span className={`text-[8px] font-mono font-semibold px-1 py-0.5 rounded-full border ${t[r.tone]}`}>
                          {r.status}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Bento Item 4 - KB Entegrasyon (normal, indigo) — görselsiz */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col justify-start relative overflow-hidden"
            >
              <div className="absolute -inset-16 bg-indigo-500/5 blur-[70px] pointer-events-none" />
              <div className="relative w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-6 shrink-0">
                <BookOpen />
              </div>
              <h3 className="relative text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[3].title}
              </h3>
              <p className="relative text-sm text-(--color-text-secondary) shrink-0 font-light mb-6">
                {data.bento.items[3].description}
              </p>
              <div className="relative mt-auto space-y-2">
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.6)]" />
                  <span className="text-xs text-(--color-text-secondary) font-light">
                    Geçici çözüm (Workaround)
                  </span>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.6)]" />
                  <span className="text-xs text-(--color-text-secondary) font-light">
                    Kalıcı çözüm arşivi
                  </span>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.6)]" />
                  <span className="text-xs text-(--color-text-secondary) font-light">
                    Kurumsal hafıza
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Bento Item 5 - İletişim AMF (normal, red) — görselsiz */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col justify-start relative overflow-hidden"
            >
              <div className="absolute -inset-16 bg-red-500/5 blur-[70px] pointer-events-none" />
              <div className="relative w-12 h-12 rounded-xl bg-red-500/20 text-(--color-accent-red-light) flex items-center justify-center mb-6 shrink-0">
                <MessageSquare />
              </div>
              <h3 className="relative text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[4].title}
              </h3>
              <p className="relative text-sm text-(--color-text-secondary) shrink-0 font-light mb-6">
                {data.bento.items[4].description}
              </p>
              <div className="relative mt-auto flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-medium text-(--color-accent-red-light)">
                  <MessageSquare size={12} />
                  AMF®
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-medium text-(--color-accent-red-light)">
                  <Users size={12} />
                  Conversations
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-medium text-(--color-accent-red-light)">
                  <Sparkles size={12} />
                  Şeffaflık
                </span>
              </div>
            </motion.div>

            {/* Bento Item 6 - Efor ATS & STE (normal, emerald) — görselsiz */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col justify-start relative overflow-hidden"
            >
              <div className="absolute -inset-16 bg-emerald-500/5 blur-[70px] pointer-events-none" />
              <div className="relative w-12 h-12 rounded-xl bg-emerald-500/20 text-(--color-accent-emerald-light) flex items-center justify-center mb-6 shrink-0">
                <Clock />
              </div>
              <h3 className="relative text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[5].title}
              </h3>
              <p className="relative text-sm text-(--color-text-secondary) shrink-0 font-light mb-6">
                {data.bento.items[5].description}
              </p>
              <div className="relative mt-auto space-y-2">
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
                  <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-emerald-light) shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                  <span className="text-xs text-(--color-text-secondary) font-light">
                    ATS® otomatik efor hesabı
                  </span>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
                  <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-emerald-light) shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                  <span className="text-xs text-(--color-text-secondary) font-light">
                    STE® iş sırası dengeleme
                  </span>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
                  <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-emerald-light) shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                  <span className="text-xs text-(--color-text-secondary) font-light">
                    Kapasite planlama verisi
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
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

                <div className="relative z-10 w-full">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 mx-auto">
                    <HelpCircle className="w-4 h-4 text-(--color-accent-blue-light)" />
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-text-overline)">
                      Problem Yönetimi
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
                        Kök Neden Analizi
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                        <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-purple-base) shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
                        Known Error
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
