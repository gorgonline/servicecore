"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import {
  Plug,
  ArrowRight,
  CheckCircle2,
  Boxes,
  Workflow,
  Activity,
  Bell,
  ArrowRightLeft,
  KeyRound,
  GitBranch,
  Webhook,
  Clock,
  MousePointerClick,
  Search,
  ChevronRight,
  Database,
  Cloud,
  MessagesSquare,
  Building2,
  Filter,
  Repeat,
  AlertTriangle,
  CheckCheck,
} from "lucide-react";
import data from "@/data/entegrasyon-sistemi.json";

export default function EntegrasyonSistemiPage() {
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
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    <div className="min-h-screen bg-(--color-surface-base) selection:bg-(--color-brand-primary)/30 text-(--color-text-overline)">
      {/* 1. HERO */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden w-full">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-300 pointer-events-none">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-150 h-150 bg-orange-600/20 blur-[120px] rounded-full mix-blend-screen" />
          <div className="absolute top-40 right-1/4 w-100 h-100 bg-amber-600/10 blur-[100px] rounded-full mix-blend-screen" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10 w-full max-w-7xl">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16 lg:mb-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              lang="en"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-(--color-accent-orange-light) text-xs font-black tracking-widest uppercase mb-8 shadow-inner"
            >
              <Plug size={14} />
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
              <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-amber-400">
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

          {/* Hero mock — Flow designer studio */}
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
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-orange-500/15 text-(--color-accent-orange-light) ring-1 ring-orange-500/30">
                    <Plug className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-[11px] font-mono font-semibold tracking-[0.18em] text-white truncate">
                    AKIŞ TASARIMI · SAP → SERVICECORE OLAY KAYDI
                  </span>
                </div>
                <div className="hidden md:flex items-center gap-2">
                  <span className="text-[10px] font-mono text-(--color-text-muted)">v4 · taslak</span>
                  <span className="w-px h-3 bg-white/15" />
                  <span className="text-[10px] font-mono text-(--color-accent-emerald-light)">son çalıştırma %98 başarı</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-(--color-accent-emerald-light) animate-pulse" />
                </div>
              </div>

              {/* Main: 3-column layout */}
              <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_240px] flex-1">
                {/* Left — Connector library */}
                <div className="border-b lg:border-b-0 lg:border-r border-white/8 px-3 py-3 space-y-3 bg-white/1.5">
                  <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-white/5 border border-white/8">
                    <Search className="w-3 h-3 text-(--color-text-muted)" />
                    <span className="text-[10px] text-white/60 font-mono">connector ara…</span>
                  </div>
                  <div>
                    <div className="text-[8px] font-mono font-semibold tracking-[0.2em] text-(--color-text-muted) px-1 mb-1.5">
                      KURUMSAL
                    </div>
                    <div className="space-y-1">
                      {[
                        { name: "SAP S/4HANA", icon: Building2, active: true, tone: "orange" },
                        { name: "Oracle EBS", icon: Building2, tone: "amber" },
                        { name: "Dynamics 365", icon: Cloud, tone: "blue" },
                        { name: "Salesforce", icon: Cloud, tone: "cyan" },
                      ].map((c, i) => {
                        const Icon = c.icon;
                        return (
                          <div
                            key={i}
                            className={`flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer ${
                              c.active
                                ? "bg-orange-500/15 border border-orange-500/30"
                                : "bg-white/2 border border-white/5 hover:bg-white/4"
                            }`}
                          >
                            <Icon
                              className={`w-3 h-3 ${
                                c.active
                                  ? "text-(--color-accent-orange-light)"
                                  : "text-(--color-text-muted)"
                              }`}
                            />
                            <span className="text-[10px] font-medium text-white truncate">
                              {c.name}
                            </span>
                            {c.active && (
                              <span className="ml-auto w-1.5 h-1.5 rounded-full bg-(--color-accent-orange-light)" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <div className="text-[8px] font-mono font-semibold tracking-[0.2em] text-(--color-text-muted) px-1 mb-1.5">
                      İLETİŞİM
                    </div>
                    <div className="space-y-1">
                      {[
                        { name: "Microsoft Teams", icon: MessagesSquare },
                        { name: "Slack", icon: MessagesSquare },
                        { name: "Webhook", icon: Webhook },
                      ].map((c, i) => {
                        const Icon = c.icon;
                        return (
                          <div
                            key={i}
                            className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-white/2 border border-white/5"
                          >
                            <Icon className="w-3 h-3 text-(--color-text-muted)" />
                            <span className="text-[10px] font-medium text-white truncate">
                              {c.name}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <div className="text-[8px] font-mono font-semibold tracking-[0.2em] text-(--color-text-muted) px-1 mb-1.5">
                      DEPO / VERİTABANI
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-white/2 border border-white/5">
                        <Database className="w-3 h-3 text-(--color-text-muted)" />
                        <span className="text-[10px] font-medium text-white truncate">
                          PostgreSQL
                        </span>
                      </div>
                      <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-white/2 border border-white/5">
                        <Database className="w-3 h-3 text-(--color-text-muted)" />
                        <span className="text-[10px] font-medium text-white truncate">
                          S3 Bucket
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Center — Canvas */}
                <div className="relative overflow-hidden min-h-110">
                  <div
                    className="absolute inset-0 opacity-50"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)",
                      backgroundSize: "24px 24px",
                    }}
                  />
                  <div
                    className="absolute -top-20 left-1/4 w-72 h-72 rounded-full pointer-events-none opacity-30"
                    style={{
                      background: "radial-gradient(circle, rgba(249,115,22,0.4), transparent 70%)",
                      filter: "blur(50px)",
                    }}
                  />

                  {/* SVG connectors */}
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    viewBox="0 0 600 440"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f97316" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.4" />
                      </linearGradient>
                      <linearGradient id="branchGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.7" />
                        <stop offset="100%" stopColor="#ef4444" stopOpacity="0.5" />
                      </linearGradient>
                    </defs>
                    {/* Trigger → Filter */}
                    <path d="M150,140 C190,140 210,140 250,140" stroke="url(#flowGrad)" strokeWidth="2" fill="none" />
                    {/* Filter → Map */}
                    <path d="M350,140 C390,140 410,140 450,140" stroke="url(#flowGrad)" strokeWidth="2" fill="none" />
                    {/* Map → Decision */}
                    <path d="M450,180 C450,220 380,240 320,260" stroke="url(#flowGrad)" strokeWidth="2" fill="none" />
                    {/* Decision → Success */}
                    <path d="M320,300 C320,340 380,360 450,360" stroke="url(#flowGrad)" strokeWidth="2" fill="none" />
                    {/* Decision → Error (branch) */}
                    <path d="M280,300 C240,340 200,360 150,360" stroke="url(#branchGrad)" strokeWidth="2" strokeDasharray="4 3" fill="none" />
                  </svg>

                  {/* Nodes */}
                  <FlowNode
                    x="20%"
                    y="32%"
                    icon={<Bell className="w-3.5 h-3.5" />}
                    title="SAP Trigger"
                    sub="record updated"
                    tone="orange"
                    badge="webhook"
                  />
                  <FlowNode
                    x="50%"
                    y="32%"
                    icon={<Filter className="w-3.5 h-3.5" />}
                    title="Filtre"
                    sub="severity ≥ P2"
                    tone="amber"
                  />
                  <FlowNode
                    x="78%"
                    y="32%"
                    icon={<ArrowRightLeft className="w-3.5 h-3.5" />}
                    title="Alan Eşleme"
                    sub="14 alan · 3 formül"
                    tone="amber"
                    active
                  />
                  <FlowNode
                    x="50%"
                    y="63%"
                    icon={<GitBranch className="w-3.5 h-3.5" />}
                    title="Karar"
                    sub="müşteri tipi?"
                    tone="yellow"
                  />
                  <FlowNode
                    x="78%"
                    y="86%"
                    icon={<CheckCheck className="w-3.5 h-3.5" />}
                    title="Olay Oluştur"
                    sub="ServiceCore · INC"
                    tone="emerald"
                  />
                  <FlowNode
                    x="20%"
                    y="86%"
                    icon={<AlertTriangle className="w-3.5 h-3.5" />}
                    title="Hata Akışı"
                    sub="DLQ + Slack"
                    tone="red"
                    dashed
                  />
                </div>

                {/* Right — Inspector / mapping */}
                <div className="border-t lg:border-t-0 lg:border-l border-white/8 px-4 py-4 space-y-3 bg-white/1.5">
                  <div className="text-[9px] font-mono font-semibold tracking-[0.22em] text-(--color-accent-orange-light)">
                    SEÇİLİ ADIM
                  </div>
                  <div className="rounded-xl border border-orange-500/30 bg-orange-500/8 p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <ArrowRightLeft className="w-3.5 h-3.5 text-(--color-accent-orange-light)" />
                      <span className="text-[11px] font-semibold text-white">Alan Eşleme</span>
                    </div>
                    <div className="text-[9px] font-mono text-(--color-text-muted)">
                      14 alan eşlendi · 3 formül
                    </div>
                  </div>

                  {/* Mapping preview */}
                  <div className="space-y-1.5">
                    {[
                      { src: "sap.priority", dst: "incident.priority", tone: "emerald" },
                      { src: "sap.user_id", dst: "incident.reporter", tone: "emerald" },
                      { src: "sap.ts", dst: "incident.createdAt", tone: "emerald" },
                      { src: "sap.code+desc", dst: "incident.title", tone: "amber" },
                      { src: "—", dst: "incident.tags", tone: "muted" },
                    ].map((m, i) => {
                      const tone: Record<string, string> = {
                        emerald: "border-emerald-500/25 bg-emerald-500/8",
                        amber: "border-amber-500/30 bg-amber-500/8",
                        muted: "border-white/8 bg-white/2",
                      };
                      return (
                        <div
                          key={i}
                          className={`rounded-md border px-2 py-1.5 ${tone[m.tone]}`}
                        >
                          <div className="flex items-center gap-1 text-[9px] font-mono">
                            <span className="text-white/85 truncate">{m.src}</span>
                            <ChevronRight className="w-2.5 h-2.5 text-(--color-text-muted) shrink-0" />
                            <span className="text-white truncate">{m.dst}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="rounded-xl border border-white/8 bg-white/3 p-3">
                    <div className="text-[9px] font-mono tracking-[0.18em] text-(--color-text-muted) mb-1">
                      ÖRNEK YÜK ÖNİZLEME
                    </div>
                    <p className="text-[10px] font-mono text-emerald-200 leading-snug">
                      <span className="text-(--color-text-muted)">incident.title:</span>{" "}
                      &quot;E-101 · SAP modülü açılmıyor&quot;
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
          {/* Feature 1: Connector katalog */}
          <motion.div
            animate="visible"
            variants={fadeUp}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-orange-500/5 to-amber-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-orange-500/10 blur-[50px] group-hover:bg-orange-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full h-135 rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-(--color-surface-elevated-solid) flex flex-col p-5 gap-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/8">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-semibold uppercase tracking-widest text-(--color-text-muted)">
                        Connector Kütüphanesi
                      </span>
                      <span className="text-sm font-bold text-white">42 hazır connector</span>
                    </div>
                    <span className="text-[10px] font-mono text-(--color-accent-orange-light) px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20">
                      yeni: SAP Ariba
                    </span>
                  </div>

                  {/* Category tabs */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {[
                      { label: "Tümü", on: true },
                      { label: "Kurumsal" },
                      { label: "İletişim" },
                      { label: "Depo / DB" },
                      { label: "Kimlik" },
                      { label: "İzleme" },
                    ].map((c, i) => (
                      <span
                        key={i}
                        className={`px-2 py-0.5 rounded-full border text-[9px] font-mono ${
                          c.on
                            ? "bg-orange-500/15 border-orange-500/30 text-(--color-accent-orange-light)"
                            : "bg-white/3 border-white/8 text-(--color-text-muted)"
                        }`}
                      >
                        {c.label}
                      </span>
                    ))}
                  </div>

                  {/* Grid */}
                  <div className="grid grid-cols-3 gap-2 flex-1 overflow-hidden">
                    {[
                      { name: "SAP S/4HANA", icon: Building2, tone: "orange", verified: true, uses: 124 },
                      { name: "Salesforce", icon: Cloud, tone: "cyan", verified: true, uses: 96 },
                      { name: "Dynamics 365", icon: Cloud, tone: "blue", verified: true, uses: 88 },
                      { name: "Microsoft Teams", icon: MessagesSquare, tone: "purple", verified: true, uses: 71 },
                      { name: "Slack", icon: MessagesSquare, tone: "amber", verified: true, uses: 62 },
                      { name: "Jira Cloud", icon: Workflow, tone: "blue", verified: true, uses: 55 },
                      { name: "PostgreSQL", icon: Database, tone: "indigo", verified: true, uses: 48 },
                      { name: "Azure AD", icon: KeyRound, tone: "cyan", verified: true, uses: 42 },
                      { name: "Webhook (HTTP)", icon: Webhook, tone: "emerald", verified: true, uses: 188 },
                    ].map((c, i) => {
                      const Icon = c.icon;
                      const t: Record<string, string> = {
                        orange: "text-(--color-accent-orange-light) bg-orange-500/10 border-orange-500/25",
                        cyan: "text-(--color-accent-cyan-light) bg-cyan-500/10 border-cyan-500/25",
                        blue: "text-(--color-accent-blue-light) bg-blue-500/10 border-blue-500/25",
                        purple: "text-(--color-accent-purple-light) bg-purple-500/10 border-purple-500/25",
                        amber: "text-amber-300 bg-amber-500/10 border-amber-500/25",
                        indigo: "text-indigo-300 bg-indigo-500/10 border-indigo-500/25",
                        emerald: "text-(--color-accent-emerald-light) bg-emerald-500/10 border-emerald-500/25",
                      };
                      return (
                        <div
                          key={i}
                          className="rounded-lg border border-white/8 bg-white/2 p-2.5 flex flex-col gap-1.5 hover:bg-white/4 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div className={`w-7 h-7 rounded-md flex items-center justify-center border ${t[c.tone]}`}>
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            {c.verified && (
                              <CheckCheck className="w-3 h-3 text-(--color-accent-emerald-light)" />
                            )}
                          </div>
                          <span className="text-[10px] font-semibold text-white truncate">
                            {c.name}
                          </span>
                          <span className="text-[8px] font-mono text-(--color-text-muted)">
                            {c.uses} kullanım
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-(--color-accent-orange-light)">
                <Boxes size={32} />
              </div>
              <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight">
                {data.zigzag[0].titleLead}
                <br />
                <span className="text-(--color-accent-orange-light)">{data.zigzag[0].titleAccent}</span>
              </h2>
              <p className="text-lg text-(--color-text-secondary) leading-relaxed font-light">
                {data.zigzag[0].description}
              </p>
              <ul className="space-y-4">
                {data.zigzag[0].bullets.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-(--color-text-overline)">
                    <CheckCircle2 className="w-5 h-5 text-(--color-accent-orange-light) shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Feature 2: Flow designer (canvas) */}
          <motion.div
            animate="visible"
            variants={fadeUp}
            className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-amber-500/5 to-yellow-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-amber-500/10 blur-[50px] group-hover:bg-amber-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full h-135 rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-(--color-surface-elevated-solid) flex flex-col p-5 gap-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/8">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-semibold uppercase tracking-widest text-(--color-text-muted)">
                        Tetikleyici Tipleri
                      </span>
                      <span className="text-sm font-bold text-white">4 tip · birden fazla aynı akışta</span>
                    </div>
                    <span className="text-[10px] font-mono text-amber-300 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                      canlı önizleme
                    </span>
                  </div>

                  {/* Trigger types */}
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { icon: Clock, name: "Zamanlı (cron)", desc: "0 */15 * * *", tone: "amber" },
                      { icon: Bell, name: "Olay tabanlı", desc: "record updated", tone: "orange" },
                      { icon: Webhook, name: "Webhook", desc: "POST /hooks/sap", tone: "purple" },
                      { icon: MousePointerClick, name: "Manuel", desc: "operatör butonu", tone: "blue" },
                    ].map((t, i) => {
                      const Icon = t.icon;
                      const tone: Record<string, { bg: string; text: string; border: string }> = {
                        amber: { bg: "bg-amber-500/8", text: "text-amber-300", border: "border-amber-500/25" },
                        orange: { bg: "bg-orange-500/8", text: "text-(--color-accent-orange-light)", border: "border-orange-500/25" },
                        purple: { bg: "bg-purple-500/8", text: "text-(--color-accent-purple-light)", border: "border-purple-500/25" },
                        blue: { bg: "bg-blue-500/8", text: "text-(--color-accent-blue-light)", border: "border-blue-500/25" },
                      };
                      const tn = tone[t.tone];
                      return (
                        <div
                          key={i}
                          className={`rounded-xl border ${tn.bg} ${tn.border} p-3 flex flex-col gap-1`}
                        >
                          <div className="flex items-center gap-2">
                            <Icon className={`w-3.5 h-3.5 ${tn.text}`} />
                            <span className="text-[11px] font-semibold text-white">{t.name}</span>
                          </div>
                          <span className="text-[9px] font-mono text-(--color-text-muted)">
                            {t.desc}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Mapping panel */}
                  <div className="text-[9px] font-mono font-semibold tracking-widest text-(--color-text-muted) pt-1">
                    ALAN EŞLEME · 14 / 18
                  </div>
                  <div className="flex flex-col gap-1.5 flex-1 overflow-hidden">
                    {[
                      { src: "sap.priority_code", dst: "incident.priority", mode: "lookup", tone: "amber" },
                      { src: "sap.user_id", dst: "incident.reporter", mode: "1:1", tone: "emerald" },
                      { src: "sap.created_ts", dst: "incident.createdAt", mode: "format", tone: "amber" },
                      { src: "sap.code + ' · ' + sap.desc", dst: "incident.title", mode: "ifade", tone: "amber" },
                      { src: "[sap.tags]", dst: "incident.tags", mode: "1:n", tone: "emerald" },
                    ].map((m, i) => {
                      const t: Record<string, string> = {
                        emerald: "text-(--color-accent-emerald-light) bg-emerald-500/10 border-emerald-500/20",
                        amber: "text-amber-300 bg-amber-500/10 border-amber-500/20",
                      };
                      return (
                        <div
                          key={i}
                          className="grid grid-cols-[1fr_auto_1fr_auto] gap-2 items-center px-3 py-1.5 rounded-md bg-white/2 border border-white/5"
                        >
                          <span className="text-[9px] font-mono text-white/85 truncate">{m.src}</span>
                          <ChevronRight className="w-3 h-3 text-(--color-text-muted)" />
                          <span className="text-[9px] font-mono text-white truncate">{m.dst}</span>
                          <span className={`text-[8px] font-mono font-semibold px-1.5 py-0.5 rounded-full border ${t[m.tone]}`}>
                            {m.mode}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-300">
                <Workflow size={32} />
              </div>
              <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight">
                {data.zigzag[1].titleLead}
                <br />
                <span className="text-amber-300">{data.zigzag[1].titleAccent}</span>
              </h2>
              <p className="text-lg text-(--color-text-secondary) leading-relaxed font-light">
                {data.zigzag[1].description}
              </p>
              <ul className="space-y-4">
                {data.zigzag[1].bullets.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-(--color-text-overline)">
                    <CheckCircle2 className="w-5 h-5 text-amber-300 shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Feature 3: Execution monitor */}
          <motion.div
            animate="visible"
            variants={fadeUp}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-red-500/5 to-orange-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-red-500/10 blur-[50px] group-hover:bg-red-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full h-135 rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-(--color-surface-elevated-solid) flex flex-col p-5 gap-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/8">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-semibold uppercase tracking-widest text-(--color-text-muted)">
                        Çalıştırma · Son 24 Saat
                      </span>
                      <span className="text-sm font-bold text-white">1.842 çalıştırma · %98.2 başarı</span>
                    </div>
                    <span className="text-[10px] font-mono text-(--color-accent-emerald-light) px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                      canlı
                    </span>
                  </div>

                  {/* KPI tiles */}
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: "Başarılı", value: "1.812", tone: "emerald" },
                      { label: "Yeniden Deneme", value: "24", tone: "amber" },
                      { label: "Başarısız", value: "6", tone: "red" },
                    ].map((k, i) => {
                      const t: Record<string, string> = {
                        emerald: "text-(--color-accent-emerald-light) bg-emerald-500/10 border-emerald-500/20",
                        amber: "text-amber-300 bg-amber-500/10 border-amber-500/20",
                        red: "text-(--color-accent-red-light) bg-red-500/10 border-red-500/20",
                      };
                      return (
                        <div key={i} className={`rounded-lg border p-2 ${t[k.tone]}`}>
                          <div className="text-[8px] font-mono uppercase tracking-wider text-(--color-text-muted)">
                            {k.label}
                          </div>
                          <div className="text-base font-bold tabular-nums">{k.value}</div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Timeline bar */}
                  <div>
                    <div className="text-[9px] font-mono tracking-widest text-(--color-text-muted) mb-1">
                      ZAMAN ÇİZELGESİ · 00:00 → 23:59
                    </div>
                    <div className="grid grid-cols-24 gap-px h-7">
                      {Array.from({ length: 24 }).map((_, i) => {
                        const failed = i === 9 || i === 17;
                        const retry = i === 6 || i === 14;
                        return (
                          <div
                            key={i}
                            className={`rounded-sm ${
                              failed
                                ? "bg-red-500/60"
                                : retry
                                  ? "bg-amber-500/60"
                                  : "bg-emerald-500/45"
                            }`}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* Recent runs */}
                  <div className="text-[9px] font-mono font-semibold tracking-widest text-(--color-text-muted) pt-1">
                    SON ÇALIŞTIRMALAR
                  </div>
                  <div className="flex flex-col gap-1.5 flex-1 overflow-hidden">
                    {[
                      { id: "RUN-91842", flow: "SAP → Olay", state: "başarılı", time: "14:22:08", dur: "1.2s", tone: "emerald" },
                      { id: "RUN-91841", flow: "Teams uyarı", state: "başarılı", time: "14:21:55", dur: "0.4s", tone: "emerald" },
                      { id: "RUN-91840", flow: "SAP → Olay", state: "yeniden", time: "14:20:31", dur: "2.8s", tone: "amber" },
                      { id: "RUN-91839", flow: "AD senkron", state: "başarılı", time: "14:18:00", dur: "5.1s", tone: "emerald" },
                      { id: "RUN-91838", flow: "Webhook", state: "başarısız", time: "14:17:42", dur: "—", tone: "red" },
                    ].map((row, i) => {
                      const t: Record<string, string> = {
                        emerald: "text-(--color-accent-emerald-light) bg-emerald-500/10 border-emerald-500/20",
                        amber: "text-amber-300 bg-amber-500/10 border-amber-500/20",
                        red: "text-(--color-accent-red-light) bg-red-500/10 border-red-500/20",
                      };
                      return (
                        <div
                          key={i}
                          className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-2 items-center px-3 py-1.5 rounded-md bg-white/2 border border-white/5"
                        >
                          <span className="text-[9px] font-mono text-(--color-text-muted) tabular-nums">
                            {row.id}
                          </span>
                          <span className="text-[10px] font-mono text-white truncate">{row.flow}</span>
                          <span className="text-[9px] font-mono text-white/70 tabular-nums">{row.time}</span>
                          <span className="text-[9px] font-mono text-white/85 tabular-nums">{row.dur}</span>
                          <span className={`text-[8px] font-mono font-semibold px-1.5 py-0.5 rounded-full border ${t[row.tone]}`}>
                            {row.state}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-(--color-accent-red-light)">
                <Activity size={32} />
              </div>
              <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight">
                {data.zigzag[2].titleLead}
                <br />
                <span className="text-(--color-accent-red-light)">{data.zigzag[2].titleAccent}</span>
              </h2>
              <p className="text-lg text-(--color-text-secondary) leading-relaxed font-light">
                {data.zigzag[2].description}
              </p>
              <ul className="space-y-4">
                {data.zigzag[2].bullets.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-(--color-text-overline)">
                    <CheckCircle2 className="w-5 h-5 text-(--color-accent-red-light) shrink-0 mt-1" />
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
            {/* Bento 1 — Connector catalog (wide) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 lg:col-span-2 row-span-1 rounded-4xl bg-linear-to-br from-orange-500/10 to-transparent border border-white/10 p-8 hover:bg-white/4 transition-colors relative overflow-hidden group flex flex-col md:flex-row gap-6 items-center"
            >
              <div className="w-full md:w-1/2 flex flex-col justify-center shrink-0">
                <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-(--color-accent-orange-light) flex items-center justify-center mb-6">
                  <Boxes />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {data.bento.items[0].title}
                </h3>
                <p className="text-sm text-(--color-text-secondary) font-light pr-4">
                  {data.bento.items[0].description}
                </p>
              </div>
              <div className="w-full md:w-1/2 h-45 md:h-full relative rounded-xl border border-white/10 overflow-hidden shadow-inner shrink-0 bg-(--color-surface-elevated-solid) group-hover:border-orange-500/40 transition-colors grid grid-cols-3 gap-1.5 p-4">
                {[
                  { icon: Building2, name: "SAP" },
                  { icon: Cloud, name: "Salesforce" },
                  { icon: Cloud, name: "Dynamics" },
                  { icon: MessagesSquare, name: "Teams" },
                  { icon: MessagesSquare, name: "Slack" },
                  { icon: Workflow, name: "Jira" },
                  { icon: Database, name: "PostgreSQL" },
                  { icon: KeyRound, name: "Azure AD" },
                  { icon: Webhook, name: "Webhook" },
                ].map((c, i) => {
                  const Icon = c.icon;
                  return (
                    <div
                      key={i}
                      className="flex flex-col items-center justify-center gap-1 rounded-md bg-white/3 border border-white/8 p-2 hover:border-orange-500/40 transition-colors"
                    >
                      <Icon className="w-4 h-4 text-(--color-accent-orange-light)" />
                      <span className="text-[8px] font-mono text-white/85">{c.name}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Bento 2 — Trigger tipleri */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center mb-6 shrink-0">
                <Bell />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[1].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[1].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-2 justify-center">
                {[
                  { icon: Clock, name: "Cron", val: "0 */15 * * *" },
                  { icon: Bell, name: "Olay", val: "record updated" },
                  { icon: Webhook, name: "Webhook", val: "POST /hooks" },
                  { icon: MousePointerClick, name: "Manuel", val: "operatör butonu" },
                ].map((r, i) => {
                  const Icon = r.icon;
                  return (
                    <div
                      key={i}
                      className="flex items-center justify-between px-3 py-1.5 rounded-md bg-white/2 border border-white/5"
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="w-3 h-3 text-amber-300" />
                        <span className="text-[10px] font-medium text-white">{r.name}</span>
                      </div>
                      <span className="text-[9px] font-mono text-(--color-text-muted)">{r.val}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Bento 3 — Alan eşleme */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-yellow-500/20 text-yellow-300 flex items-center justify-center mb-6 shrink-0">
                <ArrowRightLeft />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[2].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[2].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-1.5 justify-center">
                {[
                  { src: "sap.priority", dst: "incident.priority", mode: "lookup" },
                  { src: "sap.user", dst: "incident.reporter", mode: "1:1" },
                  { src: "sap.ts", dst: "incident.createdAt", mode: "format" },
                  { src: "sap.code+desc", dst: "incident.title", mode: "ifade" },
                ].map((m, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-[1fr_auto_1fr] gap-1.5 items-center px-2.5 py-1 rounded-md bg-white/2 border border-white/5"
                  >
                    <span className="text-[9px] font-mono text-white/85 truncate">{m.src}</span>
                    <ChevronRight className="w-2.5 h-2.5 text-yellow-300" />
                    <span className="text-[9px] font-mono text-white truncate">{m.dst}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bento 4 — Execution timeline (wide) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 lg:col-span-2 row-span-1 rounded-4xl bg-linear-to-br from-red-500/10 to-transparent border border-white/10 p-8 hover:bg-white/4 transition-colors relative overflow-hidden group flex flex-col md:flex-row gap-6 items-center"
            >
              <div className="w-full md:w-1/2 flex flex-col justify-center shrink-0">
                <div className="w-12 h-12 rounded-xl bg-red-500/20 text-(--color-accent-red-light) flex items-center justify-center mb-6">
                  <Activity />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {data.bento.items[3].title}
                </h3>
                <p className="text-sm text-(--color-text-secondary) font-light pr-4">
                  {data.bento.items[3].description}
                </p>
              </div>
              <div className="w-full md:w-1/2 h-45 md:h-full relative rounded-xl border border-white/10 overflow-hidden shadow-inner shrink-0 bg-(--color-surface-elevated-solid) group-hover:border-red-500/40 transition-colors p-5 flex flex-col gap-3 justify-center">
                <div className="flex items-center gap-2">
                  <Repeat className="w-3.5 h-3.5 text-amber-300" />
                  <span className="text-[10px] font-mono text-amber-200">
                    Yeniden deneme · üstel · 3 deneme
                  </span>
                </div>
                <div className="grid grid-cols-24 gap-px h-6">
                  {Array.from({ length: 24 }).map((_, i) => {
                    const failed = i === 9 || i === 17;
                    const retry = i === 6 || i === 14;
                    return (
                      <div
                        key={i}
                        className={`rounded-sm ${
                          failed
                            ? "bg-red-500/60"
                            : retry
                              ? "bg-amber-500/60"
                              : "bg-emerald-500/40"
                        }`}
                      />
                    );
                  })}
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-md bg-emerald-500/8 border border-emerald-500/20 px-2 py-1">
                    <div className="text-[8px] font-mono text-(--color-text-muted)">BAŞARI</div>
                    <div className="text-[11px] font-mono font-bold text-(--color-accent-emerald-light)">%98.2</div>
                  </div>
                  <div className="rounded-md bg-amber-500/8 border border-amber-500/20 px-2 py-1">
                    <div className="text-[8px] font-mono text-(--color-text-muted)">RETRY</div>
                    <div className="text-[11px] font-mono font-bold text-amber-300">24</div>
                  </div>
                  <div className="rounded-md bg-red-500/8 border border-red-500/20 px-2 py-1">
                    <div className="text-[8px] font-mono text-(--color-text-muted)">DLQ</div>
                    <div className="text-[11px] font-mono font-bold text-(--color-accent-red-light)">2</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bento 5 — Secret vault */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 border border-white/10 bg-linear-to-br from-blue-500/5 to-transparent rounded-4xl p-8 hover:bg-white/4 transition-colors flex flex-col overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-(--color-accent-blue-light) flex items-center justify-center mb-6 shrink-0">
                <KeyRound />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[4].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[4].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-2 justify-center">
                {[
                  { name: "SAP_API_KEY", method: "API Key" },
                  { name: "AZURE_OAUTH", method: "OAuth 2.0" },
                  { name: "SF_CLIENT_CERT", method: "mTLS" },
                  { name: "SLACK_BOT_TOKEN", method: "Bearer" },
                ].map((r, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-3 py-1.5 rounded-md bg-white/2 border border-white/5"
                  >
                    <div className="flex items-center gap-2">
                      <KeyRound className="w-3 h-3 text-(--color-accent-blue-light)" />
                      <span lang="en" className="text-[10px] font-mono text-white">{r.name}</span>
                    </div>
                    <span className="text-[9px] font-mono text-(--color-text-muted)">{r.method}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bento 6 — Versiyonlama */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-(--color-accent-emerald-light) flex items-center justify-center mb-6 shrink-0">
                <GitBranch />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[5].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[5].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-2 justify-center">
                {[
                  { ver: "v4", date: "14 May", state: "yayında", tone: "emerald" },
                  { ver: "v3", date: "08 May", state: "yedek", tone: "muted" },
                  { ver: "v2", date: "02 May", state: "yedek", tone: "muted" },
                  { ver: "v1", date: "24 Nis", state: "ilk", tone: "muted" },
                ].map((r, i) => {
                  const t: Record<string, string> = {
                    emerald: "bg-emerald-500/12 border-emerald-500/30 text-(--color-accent-emerald-light)",
                    muted: "bg-white/2 border-white/8 text-(--color-text-muted)",
                  };
                  return (
                    <div
                      key={i}
                      className={`flex items-center justify-between px-3 py-1.5 rounded-md border ${t[r.tone]}`}
                    >
                      <div className="flex items-center gap-2">
                        <GitBranch className="w-3 h-3" />
                        <span className="text-[10px] font-mono font-semibold text-white">{r.ver}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono text-(--color-text-muted) tabular-nums">{r.date}</span>
                        <span className="text-[9px] font-mono font-semibold">{r.state}</span>
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
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-orange-500/10 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />

                <div className="relative z-10 w-full">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 mx-auto">
                    <Plug className="w-4 h-4 text-(--color-accent-orange-light)" />
                    <span lang="en" className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-text-overline)">
                      Integration System
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
                        <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-orange-base) shadow-[0_0_8px_rgba(249,115,22,0.6)]" />
                        Connector Katalog
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
                        Akış Tasarımı
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                        <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-red-base) shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
                        Canlı Çalıştırma
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

interface FlowNodeProps {
  x: string;
  y: string;
  icon: React.ReactNode;
  title: string;
  sub: string;
  tone: "orange" | "amber" | "yellow" | "emerald" | "red";
  active?: boolean;
  dashed?: boolean;
  badge?: string;
}

function FlowNode({ x, y, icon, title, sub, tone, active = false, dashed = false, badge }: FlowNodeProps) {
  const toneStyles: Record<FlowNodeProps["tone"], { bg: string; border: string; text: string; ring: string }> = {
    orange: {
      bg: "bg-orange-500/15",
      border: "border-orange-500/35",
      text: "text-(--color-accent-orange-light)",
      ring: "ring-orange-400/40",
    },
    amber: {
      bg: "bg-amber-500/15",
      border: "border-amber-500/35",
      text: "text-amber-300",
      ring: "ring-amber-400/40",
    },
    yellow: {
      bg: "bg-yellow-500/15",
      border: "border-yellow-500/35",
      text: "text-yellow-300",
      ring: "ring-yellow-400/40",
    },
    emerald: {
      bg: "bg-emerald-500/15",
      border: "border-emerald-500/35",
      text: "text-(--color-accent-emerald-light)",
      ring: "ring-emerald-400/40",
    },
    red: {
      bg: "bg-red-500/12",
      border: "border-red-500/30",
      text: "text-(--color-accent-red-light)",
      ring: "ring-red-400/40",
    },
  };
  const t = toneStyles[tone];
  const ringClass = active
    ? `ring-2 ${t.ring} shadow-[0_0_25px_-6px_rgba(249,115,22,0.5)]`
    : "";
  const dashClass = dashed ? "border-dashed" : "";
  return (
    <div
      className={`absolute z-20 -translate-x-1/2 -translate-y-1/2 px-3 py-2 rounded-xl border ${t.bg} ${t.border} ${ringClass} ${dashClass} backdrop-blur-sm flex items-center gap-2.5`}
      style={{ left: x, top: y }}
    >
      <span className={`inline-flex items-center justify-center w-7 h-7 rounded-md bg-white/8 ${t.text}`}>
        {icon}
      </span>
      <div className="flex flex-col min-w-0">
        <span className="text-[11px] font-semibold text-white whitespace-nowrap">{title}</span>
        <span className="text-[9px] font-mono text-(--color-text-muted) whitespace-nowrap">
          {sub}
        </span>
      </div>
      {badge && (
        <span className={`ml-1 text-[8px] font-mono font-semibold px-1.5 py-0.5 rounded-full border ${t.border} ${t.text} bg-white/5`}>
          {badge}
        </span>
      )}
    </div>
  );
}
