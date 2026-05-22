"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import {
  Waypoints,
  ArrowRight,
  CheckCircle2,
  Layers,
  Route,
  Filter,
  Target,
  History,
  Share2,
  AlertTriangle,
  Presentation,
  Network,
  Server,
  Database,
  Cpu,
  Cloud,
  Shield,
  HardDrive,
  Globe,
  Smartphone,
  Users,
  Activity,
  Boxes,
  Search,
} from "lucide-react";
import data from "@/data/servis-topoloji-kesif.json";
import PrivacyContact from "@/components/ui/privacy-contact";

export default function ServisTopolojiKesifPage() {
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
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-150 h-150 bg-indigo-600/20 blur-[120px] rounded-full mix-blend-screen" />
          <div className="absolute top-40 right-1/4 w-100 h-100 bg-purple-600/10 blur-[100px] rounded-full mix-blend-screen" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10 w-full max-w-7xl">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16 lg:mb-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              lang="en"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-black tracking-widest uppercase mb-8 shadow-inner"
            >
              <Waypoints size={14} />
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
              <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-purple-400">
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

          {/* Hero mock — Multi-layer interactive topology explorer */}
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
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-500/15 text-indigo-300 ring-1 ring-indigo-500/30">
                    <Waypoints className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-[11px] font-mono font-semibold tracking-[0.18em] text-white truncate">
                    SERVICE TOPOLOGIES EXPLORER
                  </span>
                </div>
                <div className="hidden md:flex items-center gap-2">
                  <span className="text-[10px] font-mono text-(--color-text-muted)">412 düğüm · 871 bağlantı</span>
                  <span className="w-px h-3 bg-white/15" />
                  <span className="text-[10px] font-mono text-emerald-300">canlı</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
              </div>

              {/* Lens / search row */}
              <div className="flex items-center gap-3 px-5 py-3 border-b border-white/8 bg-white/1.5">
                <div className="flex-1 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/8">
                  <Search className="w-3.5 h-3.5 text-(--color-text-muted)" />
                  <span className="text-xs text-white/60 font-mono">CRM Servisi · etki alanı</span>
                </div>
                {[
                  { label: "iş servisi", on: true },
                  { label: "uygulama", on: true },
                  { label: "altyapı", on: true },
                  { label: "ağ", on: false },
                ].map((l, i) => (
                  <span
                    key={i}
                    className={`hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-mono ${
                      l.on
                        ? "bg-indigo-500/12 border-indigo-500/30 text-indigo-200"
                        : "bg-white/3 border-white/8 text-(--color-text-muted)"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        l.on ? "bg-indigo-400" : "bg-white/20"
                      }`}
                    />
                    {l.label}
                  </span>
                ))}
              </div>

              {/* Main canvas */}
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] flex-1">
                <div className="relative overflow-hidden min-h-110">
                  <div
                    className="absolute inset-0 opacity-50"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)",
                      backgroundSize: "28px 28px",
                    }}
                  />
                  <div
                    className="absolute -top-32 -left-20 w-96 h-96 rounded-full pointer-events-none opacity-30"
                    style={{
                      background: "radial-gradient(circle, rgba(99,102,241,0.45), transparent 70%)",
                      filter: "blur(60px)",
                    }}
                  />

                  {/* Layer labels (vertical rail) */}
                  <div className="absolute left-4 top-6 bottom-6 flex flex-col justify-between text-[9px] font-mono font-semibold tracking-[0.2em] text-(--color-text-muted) z-10">
                    <span>L1 · İŞ SERVİSİ</span>
                    <span>L2 · UYGULAMA</span>
                    <span>L3 · ALTYAPI</span>
                    <span>L4 · AĞ</span>
                  </div>

                  {/* SVG curves */}
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    viewBox="0 0 720 440"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient id="pathGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#818cf8" stopOpacity="0.85" />
                        <stop offset="100%" stopColor="#a855f7" stopOpacity="0.25" />
                      </linearGradient>
                      <linearGradient id="dimGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
                        <stop offset="100%" stopColor="#ffffff" stopOpacity="0.06" />
                      </linearGradient>
                    </defs>
                    {/* L1 → L2 */}
                    <path d="M360,70 C360,110 220,130 220,170" stroke="url(#pathGrad)" strokeWidth="2" fill="none" />
                    <path d="M360,70 C360,110 500,130 500,170" stroke="url(#dimGrad)" strokeWidth="1.2" strokeDasharray="4 4" fill="none" />
                    {/* L2 → L3 */}
                    <path d="M220,200 C220,240 140,260 140,290" stroke="url(#pathGrad)" strokeWidth="2" fill="none" />
                    <path d="M220,200 C220,240 310,260 310,290" stroke="url(#dimGrad)" strokeWidth="1.2" strokeDasharray="4 4" fill="none" />
                    <path d="M500,200 C500,240 580,260 580,290" stroke="url(#dimGrad)" strokeWidth="1.2" strokeDasharray="4 4" fill="none" />
                    {/* L3 → L4 */}
                    <path d="M140,320 C140,360 200,380 200,400" stroke="url(#pathGrad)" strokeWidth="2" fill="none" />
                    <path d="M310,320 C310,360 400,380 400,400" stroke="url(#dimGrad)" strokeWidth="1.2" strokeDasharray="4 4" fill="none" />
                    <path d="M580,320 C580,360 540,380 540,400" stroke="url(#dimGrad)" strokeWidth="1.2" strokeDasharray="4 4" fill="none" />
                  </svg>

                  {/* L1 — Business service (focus) */}
                  <div
                    className="absolute z-20 -translate-x-1/2 -translate-y-1/2 px-3.5 py-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/45 ring-2 ring-indigo-400/40 shadow-[0_0_40px_-8px_rgba(99,102,241,0.6)] flex items-center gap-2.5"
                    style={{ left: "50%", top: "16%" }}
                  >
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/30 text-indigo-200 border border-indigo-500/40">
                      <Globe className="w-4 h-4" />
                    </span>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-indigo-200">İş Servisi</span>
                      <span className="text-sm font-bold text-white whitespace-nowrap">CRM</span>
                    </div>
                    <span className="ml-2 px-1.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[9px] font-mono font-semibold text-emerald-200">
                      AKTİF
                    </span>
                  </div>

                  {/* L2 — Application nodes */}
                  <TopoNode x="30%" y="40%" icon={<Cpu className="w-3.5 h-3.5" />} title="CRM API" sub="depends-on" tone="purple" active />
                  <TopoNode x="69%" y="40%" icon={<Cloud className="w-3.5 h-3.5" />} title="CRM Web" sub="hosts" tone="purple" />

                  {/* L3 — Infrastructure nodes */}
                  <TopoNode x="19%" y="66%" icon={<Server className="w-3.5 h-3.5" />} title="SRV-APP-04" sub="runs-on" tone="cyan" active />
                  <TopoNode x="43%" y="66%" icon={<Database className="w-3.5 h-3.5" />} title="DB-CRM-01" sub="stores" tone="cyan" warn />
                  <TopoNode x="80%" y="66%" icon={<HardDrive className="w-3.5 h-3.5" />} title="STORE-IST-11" sub="backs-up" tone="cyan" />

                  {/* L4 — Network nodes */}
                  <TopoNode x="28%" y="91%" icon={<Network className="w-3.5 h-3.5" />} title="VLAN-CRM" sub="routes" tone="sky" active />
                  <TopoNode x="55%" y="91%" icon={<Shield className="w-3.5 h-3.5" />} title="FW-EDGE-02" sub="protects" tone="sky" />
                  <TopoNode x="75%" y="91%" icon={<Globe className="w-3.5 h-3.5" />} title="DNS-INT-01" sub="resolves" tone="sky" />
                </div>

                {/* Right panel */}
                <div className="border-t lg:border-t-0 lg:border-l border-white/8 px-4 py-4 space-y-4 bg-white/1.5">
                  <div>
                    <div className="text-[9px] font-mono font-semibold tracking-[0.22em] text-indigo-300">
                      ETKİ HALKASI
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <div className="rounded-xl border border-white/8 bg-white/3 px-3 py-2">
                        <div className="text-[9px] font-mono tracking-[0.18em] text-(--color-text-muted)">
                          BAĞIMLI
                        </div>
                        <div className="text-lg font-semibold text-white tabular-nums">14</div>
                      </div>
                      <div className="rounded-xl border border-white/8 bg-white/3 px-3 py-2">
                        <div className="text-[9px] font-mono tracking-[0.18em] text-(--color-text-muted)">
                          KULLANICI
                        </div>
                        <div className="text-lg font-semibold text-white tabular-nums">2.1K</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-[9px] font-mono font-semibold tracking-[0.22em] text-(--color-text-muted)">
                      KRİTİK YOL
                    </div>
                    <div className="mt-2 space-y-1.5">
                      {[
                        { node: "CRM", tone: "indigo" },
                        { node: "CRM API", tone: "purple" },
                        { node: "DB-CRM-01", tone: "amber" },
                        { node: "VLAN-CRM", tone: "sky" },
                      ].map((r, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 px-2.5 py-1.5 rounded-md border border-white/8 bg-white/3"
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              r.tone === "indigo"
                                ? "bg-indigo-400"
                                : r.tone === "purple"
                                  ? "bg-purple-400"
                                  : r.tone === "amber"
                                    ? "bg-amber-400 animate-pulse"
                                    : "bg-sky-400"
                            }`}
                          />
                          <span className="text-[11px] text-white/85 truncate">{r.node}</span>
                          {i < 3 && <span className="ml-auto text-[9px] font-mono text-(--color-text-muted)">↓</span>}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl border border-amber-500/30 bg-amber-500/8 p-3">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono font-semibold tracking-[0.16em] text-amber-200 mb-1">
                      <AlertTriangle className="w-3 h-3" />
                      TEK NOKTA UYARISI
                    </div>
                    <p className="text-[11px] text-white/80 leading-snug">
                      DB-CRM-01 yedeksiz çalışıyor. Alternatif yol önerilmedi.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. ZIG-ZAG FEATURE BLOCKS */}
      <section className="py-24 relative z-20">
        <div className="container mx-auto px-6 lg:px-12 w-full max-w-7xl flex flex-col gap-32">
          {/* Feature 1: Etkileşimli harita */}
          <motion.div
            animate="visible"
            variants={fadeUp}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-indigo-500/5 to-purple-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-indigo-500/10 blur-[50px] group-hover:bg-indigo-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full h-135 rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-(--color-surface-elevated-solid) flex flex-col p-5 gap-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/8">
                    <span className="text-[9px] font-semibold uppercase tracking-widest text-(--color-text-muted)">
                      Düğüm Detayı · ERP Servisi
                    </span>
                    <span className="text-[10px] font-mono text-indigo-300 px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                      drilldown
                    </span>
                  </div>

                  {/* Toggle row */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {[
                      { label: "Olaylar", on: true },
                      { label: "İstekler", on: true },
                      { label: "Değişiklik", on: true },
                      { label: "Sözleşme", on: false },
                      { label: "Hizmet Seviyesi", on: true },
                      { label: "Bütçe", on: false },
                    ].map((c, i) => (
                      <button
                        key={i}
                        className={`px-2 py-1 rounded-full border text-[9px] font-mono cursor-pointer transition-colors ${
                          c.on
                            ? "bg-indigo-500/15 border-indigo-500/30 text-indigo-200"
                            : "bg-white/3 border-white/8 text-(--color-text-muted) hover:bg-white/5"
                        }`}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>

                  {/* Linked records */}
                  <div className="flex flex-col gap-1.5 flex-1 overflow-hidden">
                    {[
                      { icon: Activity, label: "INC-4421 · ERP yavaşlık", tag: "P2", tone: "amber", meta: "12 dk" },
                      { icon: Boxes, label: "REQ-9802 · Yeni kullanıcı erişimi", tag: "iş", tone: "indigo", meta: "2 sa" },
                      { icon: Activity, label: "INC-4407 · Login hatası", tag: "P3", tone: "blue", meta: "4 sa" },
                      { icon: Boxes, label: "CHG-1107 · Yedek node ekleme", tag: "CAB", tone: "purple", meta: "yarın" },
                      { icon: Activity, label: "INC-4385 · API gecikme", tag: "kapandı", tone: "emerald", meta: "1 gün" },
                    ].map((row, i) => {
                      const Icon = row.icon;
                      const tagTone: Record<string, string> = {
                        amber: "text-amber-300 bg-amber-500/10 border-amber-500/20",
                        blue: "text-(--color-accent-blue-light) bg-blue-500/10 border-blue-500/20",
                        indigo: "text-indigo-300 bg-indigo-500/10 border-indigo-500/20",
                        purple: "text-(--color-accent-purple-light) bg-purple-500/10 border-purple-500/20",
                        emerald: "text-(--color-accent-emerald-light) bg-emerald-500/10 border-emerald-500/20",
                      };
                      return (
                        <div
                          key={i}
                          className="grid grid-cols-[auto_1fr_auto_auto] gap-2.5 items-center px-3 py-2.5 rounded-lg bg-white/2 border border-white/5 hover:bg-white/4 hover:border-white/10 transition-colors"
                        >
                          <Icon className="w-3.5 h-3.5 text-indigo-300" />
                          <span className="text-[11px] font-medium text-white truncate">
                            {row.label}
                          </span>
                          <span
                            className={`text-[8px] font-mono font-semibold px-1.5 py-0.5 rounded-full border ${tagTone[row.tone]}`}
                          >
                            {row.tag}
                          </span>
                          <span className="text-[9px] font-mono text-(--color-text-muted)">
                            {row.meta}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="rounded-lg border border-indigo-500/25 bg-indigo-500/8 px-3 py-2 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-indigo-200">
                      Düğümle bağlantılı 18 kayıt
                    </span>
                    <span className="text-[10px] font-mono text-white/70">
                      hepsini gör →
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-300">
                <Waypoints size={32} />
              </div>
              <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight">
                {data.zigzag[0].titleLead}
                <br />
                <span className="text-indigo-300">{data.zigzag[0].titleAccent}</span>
              </h2>
              <p className="text-lg text-(--color-text-secondary) leading-relaxed font-light">
                {data.zigzag[0].description}
              </p>
              <ul className="space-y-4">
                {data.zigzag[0].bullets.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-(--color-text-overline)">
                    <CheckCircle2 className="w-5 h-5 text-indigo-300 shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Feature 2: Katmanlı görünüm */}
          <motion.div
            animate="visible"
            variants={fadeUp}
            className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-cyan-500/5 to-sky-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-cyan-500/10 blur-[50px] group-hover:bg-cyan-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full h-135 rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-(--color-surface-elevated-solid) flex flex-col p-5 gap-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/8">
                    <span className="text-[9px] font-semibold uppercase tracking-widest text-(--color-text-muted)">
                      Katmanlı Görünüm
                    </span>
                    <span className="text-[10px] font-mono text-cyan-300 px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                      4 katman
                    </span>
                  </div>

                  {/* Layer rows */}
                  <div className="flex-1 flex flex-col gap-2.5">
                    {/* L1 */}
                    <div className="rounded-xl border border-indigo-500/25 bg-indigo-500/8 px-3 py-2.5">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[9px] font-mono font-semibold tracking-widest text-indigo-200">
                          L1 · İŞ SERVİSİ
                        </span>
                        <span className="text-[9px] font-mono text-(--color-text-muted)">2</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {["CRM", "ERP"].map((s, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5 border border-white/8 text-[10px] font-semibold text-white"
                          >
                            <Globe className="w-3 h-3 text-indigo-300" />
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* L2 */}
                    <div className="rounded-xl border border-purple-500/25 bg-purple-500/8 px-3 py-2.5">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[9px] font-mono font-semibold tracking-widest text-(--color-accent-purple-light)">
                          L2 · UYGULAMA
                        </span>
                        <span className="text-[9px] font-mono text-(--color-text-muted)">4</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {[
                          { name: "CRM API", icon: Cpu },
                          { name: "CRM Web", icon: Cloud },
                          { name: "ERP API", icon: Cpu },
                          { name: "ERP Web", icon: Cloud },
                        ].map((a, i) => {
                          const Icon = a.icon;
                          return (
                            <span
                              key={i}
                              className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5 border border-white/8 text-[10px] font-semibold text-white"
                            >
                              <Icon className="w-3 h-3 text-(--color-accent-purple-light)" />
                              {a.name}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* L3 */}
                    <div className="rounded-xl border border-cyan-500/25 bg-cyan-500/8 px-3 py-2.5">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[9px] font-mono font-semibold tracking-widest text-cyan-200">
                          L3 · ALTYAPI
                        </span>
                        <span className="text-[9px] font-mono text-(--color-text-muted)">6</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {[
                          { name: "SRV-APP-04", icon: Server },
                          { name: "SRV-APP-05", icon: Server },
                          { name: "DB-CRM-01", icon: Database },
                          { name: "DB-ERP-01", icon: Database },
                          { name: "STORE-IST-11", icon: HardDrive },
                          { name: "STORE-IST-14", icon: HardDrive },
                        ].map((a, i) => {
                          const Icon = a.icon;
                          return (
                            <span
                              key={i}
                              className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5 border border-white/8 text-[10px] font-semibold text-white"
                            >
                              <Icon className="w-3 h-3 text-cyan-200" />
                              {a.name}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* L4 */}
                    <div className="rounded-xl border border-sky-500/25 bg-sky-500/8 px-3 py-2.5">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[9px] font-mono font-semibold tracking-widest text-sky-200">
                          L4 · AĞ
                        </span>
                        <span className="text-[9px] font-mono text-(--color-text-muted)">3</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {[
                          { name: "VLAN-CRM", icon: Network },
                          { name: "FW-EDGE-02", icon: Shield },
                          { name: "DNS-INT-01", icon: Globe },
                        ].map((a, i) => {
                          const Icon = a.icon;
                          return (
                            <span
                              key={i}
                              className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5 border border-white/8 text-[10px] font-semibold text-white"
                            >
                              <Icon className="w-3 h-3 text-sky-200" />
                              {a.name}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-200">
                <Layers size={32} />
              </div>
              <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight">
                {data.zigzag[1].titleLead}
                <br />
                <span className="text-cyan-200">{data.zigzag[1].titleAccent}</span>
              </h2>
              <p className="text-lg text-(--color-text-secondary) leading-relaxed font-light">
                {data.zigzag[1].description}
              </p>
              <ul className="space-y-4">
                {data.zigzag[1].bullets.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-(--color-text-overline)">
                    <CheckCircle2 className="w-5 h-5 text-cyan-200 shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Feature 3: Yol bulma */}
          <motion.div
            animate="visible"
            variants={fadeUp}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-purple-500/5 to-pink-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-purple-500/10 blur-[50px] group-hover:bg-purple-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full h-135 rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-(--color-surface-elevated-solid) flex flex-col p-5 gap-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/8">
                    <span className="text-[9px] font-semibold uppercase tracking-widest text-(--color-text-muted)">
                      Yol Bul · A → B
                    </span>
                    <span className="text-[10px] font-mono text-(--color-accent-purple-light) px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20">
                      3 yol bulundu
                    </span>
                  </div>

                  {/* From/To */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-lg border border-white/8 bg-white/3 px-3 py-2">
                      <div className="text-[8px] font-mono tracking-[0.18em] text-(--color-text-muted)">A</div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <Users className="w-3 h-3 text-indigo-300" />
                        <span className="text-[11px] font-semibold text-white">Şube Müşterileri</span>
                      </div>
                    </div>
                    <div className="rounded-lg border border-white/8 bg-white/3 px-3 py-2">
                      <div className="text-[8px] font-mono tracking-[0.18em] text-(--color-text-muted)">B</div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <Database className="w-3 h-3 text-cyan-200" />
                        <span className="text-[11px] font-semibold text-white">DB-CRM-01</span>
                      </div>
                    </div>
                  </div>

                  {/* Path list */}
                  <div className="flex flex-col gap-2 flex-1 overflow-hidden">
                    {/* Best path */}
                    <div className="rounded-xl border border-purple-500/35 bg-purple-500/10 p-3">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[9px] font-mono font-semibold tracking-widest text-(--color-accent-purple-light)">
                          EN KISA YOL · 4 atlama
                        </span>
                        <span className="text-[9px] font-mono text-emerald-300">tercih</span>
                      </div>
                      <div className="flex items-center gap-1 flex-wrap">
                        {[
                          { name: "Müşteri", icon: Users },
                          { name: "Mobil", icon: Smartphone },
                          { name: "CRM Web", icon: Cloud },
                          { name: "CRM API", icon: Cpu },
                          { name: "DB-CRM-01", icon: Database },
                        ].map((p, i, arr) => {
                          const Icon = p.icon;
                          return (
                            <span key={i} className="inline-flex items-center gap-1">
                              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-[9px] font-mono text-white">
                                <Icon className="w-2.5 h-2.5 text-(--color-accent-purple-light)" />
                                {p.name}
                              </span>
                              {i < arr.length - 1 && (
                                <span className="text-[9px] text-(--color-accent-purple-light)">→</span>
                              )}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* Alt paths */}
                    {[
                      {
                        title: "ALTERNATİF 1 · 5 atlama",
                        chain: ["Müşteri", "Mobil", "API GW", "CRM API", "Cache", "DB-CRM-01"],
                      },
                      {
                        title: "ALTERNATİF 2 · 6 atlama",
                        chain: ["Müşteri", "Şube", "VPN", "CRM Web", "CRM API", "DB-CRM-01"],
                      },
                    ].map((alt, i) => (
                      <div
                        key={i}
                        className="rounded-lg border border-white/8 bg-white/2 p-2.5"
                      >
                        <div className="text-[9px] font-mono font-semibold tracking-widest text-(--color-text-muted) mb-1">
                          {alt.title}
                        </div>
                        <div className="flex items-center gap-1 flex-wrap">
                          {alt.chain.map((p, j, arr) => (
                            <span key={j} className="inline-flex items-center gap-1">
                              <span className="text-[9px] font-mono text-white/80 px-1.5 py-0.5 rounded-md bg-white/3 border border-white/8">
                                {p}
                              </span>
                              {j < arr.length - 1 && (
                                <span className="text-[9px] text-(--color-text-muted)">→</span>
                              )}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-lg border border-red-500/25 bg-red-500/8 px-3 py-2 flex items-center gap-2">
                    <AlertTriangle className="w-3 h-3 text-(--color-accent-red-light)" />
                    <span className="text-[10px] font-mono text-(--color-accent-red-light)">
                      DB-CRM-01 alternatif yedeği yok · SPOF
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-(--color-accent-purple-light)">
                <Route size={32} />
              </div>
              <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight">
                {data.zigzag[2].titleLead}
                <br />
                <span className="text-(--color-accent-purple-light)">{data.zigzag[2].titleAccent}</span>
              </h2>
              <p className="text-lg text-(--color-text-secondary) leading-relaxed font-light">
                {data.zigzag[2].description}
              </p>
              <ul className="space-y-4">
                {data.zigzag[2].bullets.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-(--color-text-overline)">
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
            {/* Bento 1 - Lens (wide) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 lg:col-span-2 row-span-1 rounded-4xl bg-linear-to-br from-indigo-500/10 to-transparent border border-white/10 p-8 hover:bg-white/4 transition-colors relative overflow-hidden group flex flex-col md:flex-row gap-6 items-center"
            >
              <div className="w-full md:w-1/2 flex flex-col justify-center shrink-0">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center mb-6">
                  <Filter />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {data.bento.items[0].title}
                </h3>
                <p className="text-sm text-(--color-text-secondary) font-light pr-4">
                  {data.bento.items[0].description}
                </p>
              </div>
              <div className="w-full md:w-1/2 h-45 md:h-full relative rounded-xl border border-white/10 overflow-hidden shadow-inner shrink-0 bg-(--color-surface-elevated-solid) group-hover:border-indigo-500/40 transition-colors flex flex-col gap-2 p-5 justify-center">
                {[
                  { label: "Üretim · Kritik", count: 38, active: true },
                  { label: "Geliştirme", count: 64, active: false },
                  { label: "Mali · SOX kapsam", count: 17, active: false },
                  { label: "Sadece açık olaylı", count: 6, active: false },
                ].map((row, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg border ${
                      row.active
                        ? "bg-indigo-500/12 border-indigo-500/30"
                        : "bg-white/3 border-white/8"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Filter
                        className={`w-3.5 h-3.5 ${
                          row.active ? "text-indigo-300" : "text-(--color-text-muted)"
                        }`}
                      />
                      <span className="text-[11px] font-medium text-white">{row.label}</span>
                    </div>
                    <span className="text-[10px] font-mono font-semibold text-white px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                      {row.count} CI
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bento 2 - Etki halkası */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-(--color-accent-purple-light) flex items-center justify-center mb-6 shrink-0">
                <Target />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[1].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[1].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) flex items-center justify-center">
                <div className="absolute w-32 h-32 rounded-full border border-purple-500/15" />
                <div className="absolute w-22 h-22 rounded-full border border-purple-500/25" />
                <div className="absolute w-12 h-12 rounded-full border border-purple-500/45 bg-purple-500/15 shadow-[0_0_25px_rgba(168,85,247,0.45)]" />
                <div className="absolute w-12 h-12 flex items-center justify-center">
                  <Network className="w-5 h-5 text-(--color-accent-purple-light)" />
                </div>
                {[0, 60, 120, 180, 240, 300].map((deg, i) => {
                  const rad = (deg * Math.PI) / 180;
                  const x = 50 + 30 * Math.cos(rad);
                  const y = 50 + 30 * Math.sin(rad);
                  return (
                    <div
                      key={i}
                      className="absolute w-2.5 h-2.5 rounded-full bg-purple-300/80 shadow-[0_0_8px_rgba(216,180,254,0.6)]"
                      style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
                    />
                  );
                })}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[9px] font-mono">
                  <span className="text-(--color-text-muted)">bağımlı</span>
                  <span className="text-white font-semibold tabular-nums">14 CI · 2.1K kullanıcı</span>
                </div>
              </div>
            </motion.div>

            {/* Bento 3 - Zaman yolculuğu */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-(--color-accent-cyan-light) flex items-center justify-center mb-6 shrink-0">
                <History />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[2].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[2].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-3 justify-center">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono tracking-widest text-(--color-text-muted)">
                    1 OCAK
                  </span>
                  <span className="text-[9px] font-mono tracking-widest text-cyan-200">
                    14 MAYIS
                  </span>
                </div>
                <div className="relative h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div className="absolute inset-y-0 left-0 right-1/3 bg-linear-to-r from-cyan-500/30 to-cyan-400/80" />
                  <div className="absolute left-2/3 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cyan-300 ring-2 ring-cyan-400/40 shadow-[0_0_10px_rgba(103,232,249,0.7)]" />
                </div>
                <div className="flex flex-col gap-1.5">
                  {[
                    { date: "14 May", text: "DB-CRM-01 SPOF rapor edildi" },
                    { date: "03 May", text: "Yedek node devreye alındı" },
                    { date: "12 Nis", text: "CRM API v2 yayında" },
                  ].map((r, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 px-2 py-1 rounded bg-white/2 border border-white/5"
                    >
                      <span className="text-[8px] font-mono text-cyan-200 w-12 shrink-0">
                        {r.date}
                      </span>
                      <span className="text-[10px] text-white/80 truncate">{r.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Bento 4 - Snapshot / paylaşım (wide) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 lg:col-span-2 row-span-1 rounded-4xl bg-linear-to-br from-emerald-500/10 to-transparent border border-white/10 p-8 hover:bg-white/4 transition-colors relative overflow-hidden group flex flex-col md:flex-row gap-6 items-center"
            >
              <div className="w-full md:w-1/2 flex flex-col justify-center shrink-0">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-(--color-accent-emerald-light) flex items-center justify-center mb-6">
                  <Share2 />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {data.bento.items[3].title}
                </h3>
                <p className="text-sm text-(--color-text-secondary) font-light pr-4">
                  {data.bento.items[3].description}
                </p>
              </div>
              <div className="w-full md:w-1/2 h-45 md:h-full relative rounded-xl border border-white/10 overflow-hidden shadow-inner shrink-0 bg-(--color-surface-elevated-solid) group-hover:border-emerald-500/40 transition-colors p-5 flex flex-col gap-2 justify-center">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/12 border border-emerald-500/25">
                  <Share2 className="w-3.5 h-3.5 text-(--color-accent-emerald-light)" />
                  <span className="text-[11px] font-mono text-white truncate flex-1">
                    sc.app/topo/snap-4a91d
                  </span>
                  <span className="text-[9px] font-mono text-(--color-accent-emerald-light)">
                    kilitli
                  </span>
                </div>
                <div className="rounded-lg border border-white/8 bg-white/2 px-3 py-2 flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-purple-500/25 border border-purple-500/35 flex items-center justify-center text-[9px] font-bold text-purple-200 shrink-0">
                    SB
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-[10px] font-semibold text-white">Salih Bayraktar</span>
                    <span className="text-[10px] text-white/70 truncate">
                      DB-CRM-01 üzerine yorum bıraktı
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-(--color-text-muted)">2 dk</span>
                </div>
                <div className="rounded-lg border border-white/8 bg-white/2 px-3 py-2 flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-indigo-500/25 border border-indigo-500/35 flex items-center justify-center text-[9px] font-bold text-indigo-200 shrink-0">
                    EK
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-[10px] font-semibold text-white">Esra Korkmaz</span>
                    <span className="text-[10px] text-white/70 truncate">
                      Alternatif yol önerisi ekledi
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-(--color-text-muted)">5 dk</span>
                </div>
              </div>
            </motion.div>

            {/* Bento 5 - SPOF uyarısı */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 border border-white/10 bg-linear-to-br from-orange-500/5 to-transparent rounded-4xl p-8 hover:bg-white/4 transition-colors flex flex-col overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-(--color-accent-orange-light) flex items-center justify-center mb-6 shrink-0">
                <AlertTriangle />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[4].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[4].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-2 justify-center">
                {[
                  { name: "DB-CRM-01", risk: "yüksek", tone: "red" },
                  { name: "FW-EDGE-02", risk: "orta", tone: "amber" },
                  { name: "DNS-INT-01", risk: "düşük", tone: "emerald" },
                ].map((r, i) => {
                  const t: Record<string, string> = {
                    red: "border-red-500/25 bg-red-500/8 text-(--color-accent-red-light)",
                    amber: "border-amber-500/25 bg-amber-500/8 text-amber-300",
                    emerald: "border-emerald-500/25 bg-emerald-500/8 text-(--color-accent-emerald-light)",
                  };
                  return (
                    <div
                      key={i}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg border ${t[r.tone]}`}
                    >
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-3 h-3" />
                        <span className="text-[11px] font-mono font-medium text-white">
                          {r.name}
                        </span>
                      </div>
                      <span className="text-[9px] font-mono font-semibold uppercase tracking-wider">
                        {r.risk}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Bento 6 - Sunum modu */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-(--color-accent-blue-light) flex items-center justify-center mb-6 shrink-0">
                <Presentation />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[5].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[5].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-2 justify-center">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[9px] font-mono tracking-widest text-(--color-text-muted)">
                    SAHNE
                  </span>
                  <span className="text-[9px] font-mono text-(--color-accent-blue-light)">3 / 6</span>
                </div>
                {[
                  { num: "01", text: "İş servisine bakış" },
                  { num: "02", text: "Kritik bağımlılıklar" },
                  { num: "03", text: "Yol ve etki", active: true },
                  { num: "04", text: "Risk ve aksiyon" },
                ].map((s, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
                      s.active
                        ? "bg-blue-500/12 border-blue-500/30"
                        : "bg-white/2 border-white/5"
                    }`}
                  >
                    <span
                      className={`text-[10px] font-mono font-bold ${
                        s.active ? "text-(--color-accent-blue-light)" : "text-(--color-text-muted)"
                      }`}
                    >
                      {s.num}
                    </span>
                    <span className="text-[11px] font-medium text-white truncate">{s.text}</span>
                    {s.active && (
                      <span className="ml-auto text-[9px] font-mono text-(--color-accent-blue-light)">
                        ▶
                      </span>
                    )}
                  </div>
                ))}
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
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

                <div className="relative z-10 w-full">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 mx-auto">
                    <Waypoints className="w-4 h-4 text-indigo-300" />
                    <span lang="en" className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-text-overline)">
                      Service Topologies Explorer
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
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.6)]" />
                        Etkileşimli Harita
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                        <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-cyan-base) shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
                        Katmanlı Görünüm
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                        <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-purple-base) shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
                        Yol Bulucu
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <PrivacyContact />
    </div>
  );
}

interface TopoNodeProps {
  x: string;
  y: string;
  icon: React.ReactNode;
  title: string;
  sub: string;
  tone: "purple" | "cyan" | "sky";
  active?: boolean;
  warn?: boolean;
}

function TopoNode({ x, y, icon, title, sub, tone, active = false, warn = false }: TopoNodeProps) {
  const toneStyles: Record<TopoNodeProps["tone"], { bg: string; border: string; text: string; ring: string }> = {
    purple: {
      bg: "bg-purple-500/15",
      border: "border-purple-500/35",
      text: "text-(--color-accent-purple-light)",
      ring: "ring-purple-400/40",
    },
    cyan: {
      bg: "bg-cyan-500/15",
      border: "border-cyan-500/35",
      text: "text-cyan-200",
      ring: "ring-cyan-400/40",
    },
    sky: {
      bg: "bg-sky-500/15",
      border: "border-sky-500/35",
      text: "text-sky-200",
      ring: "ring-sky-400/40",
    },
  };
  const t = toneStyles[tone];
  const ringClass = active
    ? `ring-2 ${t.ring} shadow-[0_0_25px_-6px_rgba(168,85,247,0.5)]`
    : "";
  return (
    <div
      className={`absolute z-20 -translate-x-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-lg border ${t.bg} ${t.border} ${ringClass} backdrop-blur-sm flex items-center gap-2`}
      style={{ left: x, top: y }}
    >
      <span className={`inline-flex items-center justify-center w-6 h-6 rounded-md bg-white/8 ${t.text}`}>
        {icon}
      </span>
      <div className="flex flex-col min-w-0">
        <span className="text-[10px] font-semibold text-white whitespace-nowrap flex items-center gap-1">
          {title}
          {warn && <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />}
        </span>
        <span className="text-[8px] font-mono text-(--color-text-muted) whitespace-nowrap">
          {sub}
        </span>
      </div>
    </div>
  );
}
