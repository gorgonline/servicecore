"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import {
  Building2,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Users,
  LayoutDashboard,
  Eye,
  ListChecks,
  Workflow,
  MonitorSmartphone,
  LineChart,
  Briefcase,
  Wallet,
  Truck,
  Megaphone,
  Server,
  Crown,
  HeadphonesIcon,
  UserSquare2,
  Globe,
  BookOpen,
  Scale,
  LayoutGrid,
  ChevronDown,
  Activity,
  TrendingUp,
  Clock,
  Grid3x3,
  Settings,
  Bell,
  ChevronRight,
  Search,
} from "lucide-react";
import data from "@/data/esm-kurumsal-servis-yonetimi.json";
import { En } from "@/components/ui/En";
import PrivacyContact from "@/components/ui/privacy-contact";

export default function EsmPage() {
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
              <Building2 size={14} />
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
                  ESM Operasyon Panosu
                </span>
                <span className="text-lg lg:text-xl font-bold text-white tracking-tight">
                  Multitenant Servis Yönetimi
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-(--color-text-muted)">5 kiracı · 6 departman</span>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-(--color-accent-emerald-light) shadow-[0_0_8px_currentColor] animate-pulse" />
                  <span className="text-[9px] font-mono uppercase tracking-widest text-(--color-accent-emerald-light)">canlı</span>
                </div>
              </div>
            </div>

            {/* KPI metric row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-5">
              {[
                { icon: Activity, label: "Toplam Talep", value: "542", trend: "+8%", tone: "blue" },
                { icon: Users, label: "Aktif Kullanıcı", value: "1.284", trend: "+124", tone: "purple" },
                { icon: TrendingUp, label: "Hizmet Seviyesi Uyumu", value: "%94", trend: "+2.1", tone: "emerald" },
                { icon: Clock, label: "Ort. Çözüm", value: "23dk", trend: "−6dk", tone: "amber", down: true },
              ].map((m, i) => {
                const Icon = m.icon;
                const tone: Record<string, string> = {
                  blue: "from-blue-500/15 to-blue-500/5 border-blue-500/25 text-(--color-accent-blue-light) shadow-[0_0_25px_rgba(59,130,246,0.12)]",
                  purple: "from-purple-500/15 to-purple-500/5 border-purple-500/25 text-(--color-accent-purple-light) shadow-[0_0_25px_rgba(168,85,247,0.12)]",
                  emerald: "from-emerald-500/15 to-emerald-500/5 border-emerald-500/25 text-(--color-accent-emerald-light) shadow-[0_0_25px_rgba(16,185,129,0.12)]",
                  amber: "from-amber-500/15 to-amber-500/5 border-amber-500/25 text-amber-300 shadow-[0_0_25px_rgba(245,158,11,0.12)]",
                };
                const trendTone = m.down ? "text-(--color-accent-emerald-light)" : "text-(--color-accent-emerald-light)";
                return (
                  <div key={i} className={`rounded-2xl bg-linear-to-br ${tone[m.tone]} border p-3 lg:p-4 flex flex-col gap-2`}>
                    <div className="flex items-center justify-between">
                      <Icon className="w-4 h-4" />
                      <span className={`text-[9px] font-mono font-semibold ${trendTone}`}>{m.trend}</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[8px] font-medium uppercase tracking-wider text-(--color-text-muted)">{m.label}</span>
                      <span className="text-2xl lg:text-3xl font-bold tracking-tight text-white">{m.value}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Multitenant departman grid */}
            <div className="rounded-2xl border border-white/10 bg-(--color-surface-elevated-solid) p-4 mb-5">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/8">
                <div className="flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-(--color-accent-blue-light)" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white">Aktif Kiracılar (Departmanlar)</span>
                </div>
                <span className="text-[8px] font-mono text-(--color-text-muted)">tek panel · merkezi yönetim</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5">
                {[
                  { icon: Server, name: "BT", users: 124, sla: 96, tone: "blue" },
                  { icon: Briefcase, name: "İK", users: 87, sla: 94, tone: "cyan" },
                  { icon: Wallet, name: "Finans", users: 52, sla: 91, tone: "emerald" },
                  { icon: Building2, name: "Tesis", users: 41, sla: 93, tone: "orange" },
                  { icon: Truck, name: "Lojistik", users: 33, sla: 89, tone: "purple" },
                  { icon: Megaphone, name: "Pazarlama", users: 18, sla: 95, tone: "indigo" },
                ].map((d, i) => {
                  const Icon = d.icon;
                  const t: Record<string, string> = {
                    blue: "from-blue-500/15 to-blue-500/5 border-blue-500/25 text-(--color-accent-blue-light)",
                    cyan: "from-cyan-500/15 to-cyan-500/5 border-cyan-500/25 text-(--color-accent-cyan-light)",
                    emerald: "from-emerald-500/15 to-emerald-500/5 border-emerald-500/25 text-(--color-accent-emerald-light)",
                    orange: "from-orange-500/15 to-orange-500/5 border-orange-500/25 text-(--color-accent-orange-light)",
                    purple: "from-purple-500/15 to-purple-500/5 border-purple-500/25 text-(--color-accent-purple-light)",
                    indigo: "from-indigo-500/15 to-indigo-500/5 border-indigo-500/25 text-indigo-300",
                  };
                  return (
                    <div
                      key={i}
                      className={`rounded-xl bg-linear-to-br ${t[d.tone]} border p-3 flex flex-col gap-2 hover:-translate-y-0.5 transition-transform`}
                    >
                      <div className="flex items-center justify-between">
                        <Icon className="w-4 h-4" />
                        <span className="text-[7px] font-mono font-bold text-(--color-accent-emerald-light)">●</span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs font-bold text-white">{d.name}</span>
                        <span className="text-[8px] font-mono text-(--color-text-muted)">{d.users} kullanıcı</span>
                        <span className="text-[8px] font-mono text-white">Hizmet Seviyesi %{d.sla}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3-katmanlı yapı şeması */}
            <div className="rounded-2xl border border-white/10 bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-2">
              <div className="flex items-center justify-between pb-2 border-b border-white/8">
                <div className="flex items-center gap-1.5">
                  <Workflow className="w-3.5 h-3.5 text-(--color-accent-purple-light)" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white"><En>ESM</En> 3-Katmanlı Mimari</span>
                </div>
                <span className="text-[8px] font-mono text-(--color-text-muted)">portal → center → departmanlar</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { icon: MonitorSmartphone, label: "Self-Servis Portal", desc: "Çalışan & Müşteri", tone: "cyan" },
                  { icon: LayoutDashboard, label: "ESM Center", desc: "Multitenant Yönetim", tone: "blue" },
                  { icon: Building2, label: "Departman Modülleri", desc: "BT · İK · Finans …", tone: "purple" },
                ].map((s, i) => {
                  const Icon = s.icon;
                  const t: Record<string, string> = {
                    cyan: "bg-cyan-500/10 border-cyan-500/25 text-(--color-accent-cyan-light)",
                    blue: "bg-blue-500/10 border-blue-500/25 text-(--color-accent-blue-light)",
                    purple: "bg-purple-500/10 border-purple-500/25 text-(--color-accent-purple-light)",
                  };
                  return (
                    <div key={i} className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${t[s.tone]}`}>
                      <Icon className="w-4 h-4 shrink-0" />
                      <div className="flex flex-col min-w-0">
                        <span className="text-[10px] font-bold text-white truncate">{s.label}</span>
                        <span className="text-[8px] font-mono text-(--color-text-muted) truncate">{s.desc}</span>
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
          {/* Feature 1: ESM Tanımı */}
          <motion.div
            animate="visible"
            variants={fadeUp}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-blue-500/5 to-cyan-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-blue-500/10 blur-[50px] group-hover:bg-blue-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full h-135 rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-(--color-surface-elevated-solid) flex items-center justify-center p-6">
                  <div className="relative w-full h-full flex items-center justify-center">
                    {/* Decorative pulse rings */}
                    <div className="absolute z-10 w-60 h-60 rounded-full border border-blue-500/15 pointer-events-none" />
                    <div className="absolute z-10 w-90 h-90 rounded-full border border-blue-500/10 pointer-events-none" />

                    {/* Center node — ESM Center */}
                    <div className="absolute z-30 w-32 h-32 rounded-3xl bg-linear-to-br from-blue-500/35 to-cyan-500/25 border border-blue-500/45 flex flex-col items-center justify-center backdrop-blur-xl shadow-[0_0_60px_rgba(59,130,246,0.45)] gap-1">
                      <Building2 className="w-7 h-7 text-(--color-accent-blue-light)" />
                      <span className="text-[8px] font-semibold uppercase tracking-[0.2em] text-(--color-text-muted)">
                        ESM
                      </span>
                      <span className="text-xs font-bold text-white tracking-tight">
                        Center
                      </span>
                      <span className="text-[7px] font-mono text-(--color-accent-emerald-light)">
                        ● aktif
                      </span>
                    </div>

                    {/* Connection lines — 6 radial spokes */}
                    <svg
                      className="absolute inset-0 w-full h-full pointer-events-none z-0"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                    >
                      {Array.from({ length: 6 }).map((_, i) => {
                        const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
                        const x = Number((50 + 40 * Math.cos(angle)).toFixed(3));
                        const y = Number((50 + 40 * Math.sin(angle)).toFixed(3));
                        return (
                          <line
                            key={i}
                            x1={x}
                            y1={y}
                            x2={50}
                            y2={50}
                            stroke="url(#esmHubGradient)"
                            strokeWidth="0.25"
                            strokeDasharray="0.6 0.6"
                            opacity="0.6"
                            vectorEffect="non-scaling-stroke"
                          />
                        );
                      })}
                      <defs>
                        <linearGradient id="esmHubGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.85" />
                          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.25" />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* Department nodes — 6 radial */}
                    {[
                      { icon: Server, label: "BT", users: 124, tone: "blue" },
                      { icon: Wallet, label: "Finans", users: 52, tone: "emerald" },
                      { icon: Truck, label: "Lojistik", users: 33, tone: "purple" },
                      { icon: Megaphone, label: "Pazarlama", users: 18, tone: "indigo" },
                      { icon: Building2, label: "Tesis", users: 41, tone: "orange" },
                      { icon: Briefcase, label: "İK", users: 87, tone: "cyan" },
                    ].map((node, i) => {
                      const Icon = node.icon;
                      const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
                      const x = Number((50 + 40 * Math.cos(angle)).toFixed(3));
                      const y = Number((50 + 40 * Math.sin(angle)).toFixed(3));
                      const toneText: Record<string, string> = {
                        blue: "text-(--color-accent-blue-light)",
                        emerald: "text-(--color-accent-emerald-light)",
                        purple: "text-(--color-accent-purple-light)",
                        indigo: "text-indigo-300",
                        orange: "text-(--color-accent-orange-light)",
                        cyan: "text-(--color-accent-cyan-light)",
                      };
                      const toneIconBg: Record<string, string> = {
                        blue: "bg-blue-500/20 border-blue-500/30",
                        emerald: "bg-emerald-500/20 border-emerald-500/30",
                        purple: "bg-purple-500/20 border-purple-500/30",
                        indigo: "bg-indigo-500/20 border-indigo-500/30",
                        orange: "bg-orange-500/20 border-orange-500/30",
                        cyan: "bg-cyan-500/20 border-cyan-500/30",
                      };
                      return (
                        <div
                          key={i}
                          className="absolute z-20 flex items-center gap-2 px-3 py-2 rounded-xl bg-(--color-surface-elevated-solid)/95 border border-white/15 backdrop-blur-xl shadow-xl hover:scale-105 transition-all duration-300"
                          style={{
                            top: `${y}%`,
                            left: `${x}%`,
                            transform: "translate(-50%, -50%)",
                          }}
                        >
                          <div className={`w-7 h-7 rounded-lg ${toneIconBg[node.tone]} border ${toneText[node.tone]} flex items-center justify-center shrink-0`}>
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-white">{node.label}</span>
                            <span className="text-[8px] font-mono text-(--color-text-muted)">
                              {node.users} kullanıcı
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-(--color-accent-blue-light)">
                <Building2 size={32} />
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

          {/* Feature 2: Neden ESM */}
          <motion.div
            animate="visible"
            variants={fadeUp}
            className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-emerald-500/5 to-cyan-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-emerald-500/10 blur-[50px] group-hover:bg-emerald-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full h-135 rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-(--color-surface-elevated-solid) flex flex-col p-4 gap-3">
                  {/* Top toolbar with 9-dot menu */}
                  <div className="flex items-center justify-between pb-2 border-b border-white/8">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                        <Grid3x3 className="w-4 h-4 text-(--color-accent-emerald-light)" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[8px] font-mono uppercase tracking-widest text-(--color-text-muted)">9-Nokta Menü</span>
                        <span className="text-[10px] font-bold text-white">ESM Center</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Search className="w-3 h-3 text-(--color-text-muted)" />
                      <Bell className="w-3 h-3 text-(--color-text-muted)" />
                      <Settings className="w-3 h-3 text-(--color-text-muted)" />
                    </div>
                  </div>

                  <div className="flex gap-3 flex-1 overflow-hidden">
                    {/* Sidebar — kiracı listesi */}
                    <div className="w-32 shrink-0 flex flex-col gap-1 border-r border-white/8 pr-3">
                      <span className="text-[8px] font-semibold uppercase tracking-widest text-(--color-text-muted) mb-1 px-1">
                        Kiracılar
                      </span>
                      {[
                        { icon: Server, name: "BT", active: true, count: 124, tone: "blue" },
                        { icon: Briefcase, name: "İK", count: 87, tone: "cyan" },
                        { icon: Wallet, name: "Finans", count: 52, tone: "emerald" },
                        { icon: Building2, name: "Tesis", count: 41, tone: "orange" },
                        { icon: Truck, name: "Lojistik", count: 33, tone: "purple" },
                      ].map((t, i) => {
                        const Icon = t.icon;
                        const dot: Record<string, string> = {
                          blue: "bg-(--color-accent-blue-light)",
                          cyan: "bg-(--color-accent-cyan-light)",
                          emerald: "bg-(--color-accent-emerald-light)",
                          orange: "bg-(--color-accent-orange-light)",
                          purple: "bg-(--color-accent-purple-light)",
                        };
                        return (
                          <div
                            key={i}
                            className={`flex items-center gap-2 px-2 py-1.5 rounded-lg ${
                              t.active
                                ? "bg-emerald-500/15 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                                : "border border-transparent hover:bg-white/3"
                            }`}
                          >
                            <Icon className={`w-3 h-3 shrink-0 ${t.active ? "text-(--color-accent-emerald-light)" : "text-(--color-text-muted)"}`} />
                            <span className={`text-[10px] font-medium truncate flex-1 ${t.active ? "text-white" : "text-(--color-text-secondary)"}`}>
                              {t.name}
                            </span>
                            <span className={`w-1.5 h-1.5 rounded-full ${dot[t.tone]} shadow-[0_0_6px_currentColor]`} />
                          </div>
                        );
                      })}
                      <div className="mt-1 px-2 py-1 text-[8px] font-mono text-(--color-text-muted)">
                        +9 kiracı daha
                      </div>
                    </div>

                    {/* Active tenant detail */}
                    <div className="flex-1 flex flex-col gap-2 min-w-0">
                      {/* Tenant header */}
                      <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-linear-to-r from-emerald-500/15 to-cyan-500/8 border border-emerald-500/30">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                            <Server className="w-3.5 h-3.5 text-(--color-accent-emerald-light)" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[8px] font-mono uppercase tracking-wider text-(--color-text-muted)">Aktif Kiracı</span>
                            <span className="text-[11px] font-bold text-white">BT Departmanı</span>
                          </div>
                        </div>
                        <span className="text-[8px] font-mono font-semibold text-(--color-accent-emerald-light) px-1.5 py-0.5 rounded-full bg-emerald-500/12 border border-emerald-500/25">
                          AKTİF
                        </span>
                      </div>

                      {/* Tenant metrics */}
                      <div className="grid grid-cols-3 gap-1.5">
                        {[
                          { label: "Kullanıcı", value: 124 },
                          { label: "Hizmet", value: 18 },
                          { label: "Açık Talep", value: 42 },
                        ].map((m, i) => (
                          <div key={i} className="rounded-lg bg-white/3 border border-white/8 p-2 flex flex-col gap-0.5">
                            <span className="text-[7px] font-medium uppercase tracking-wider text-(--color-text-muted)">{m.label}</span>
                            <span className="text-base font-bold tracking-tight text-white">{m.value}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tenant config rows */}
                      <div className="flex flex-col gap-1.5 flex-1">
                        <span className="text-[8px] font-semibold uppercase tracking-widest text-(--color-text-muted) px-1">
                          Yapılandırma
                        </span>
                        {[
                          { icon: ListChecks, label: "Hizmet Kataloğu", value: "18 hizmet", tone: "blue" },
                          { icon: Workflow, label: "İş Akışları", value: "12 aktif", tone: "purple" },
                          { icon: Users, label: "Roller & Yetkiler", value: "8 rol", tone: "cyan" },
                          { icon: TrendingUp, label: "Hizmet Seviyesi Politikaları", value: "Premium · P1-P4", tone: "emerald" },
                          { icon: MonitorSmartphone, label: "Self-Servis Portal", value: "etkin", tone: "indigo" },
                        ].map((r, i) => {
                          const Icon = r.icon;
                          const t: Record<string, string> = {
                            blue: "text-(--color-accent-blue-light)",
                            purple: "text-(--color-accent-purple-light)",
                            cyan: "text-(--color-accent-cyan-light)",
                            emerald: "text-(--color-accent-emerald-light)",
                            indigo: "text-indigo-300",
                          };
                          return (
                            <div key={i} className="grid grid-cols-[auto_1fr_auto_auto] gap-2 items-center px-2 py-1.5 rounded-lg bg-white/2 border border-white/5">
                              <Icon className={`w-3 h-3 ${t[r.tone]}`} />
                              <span className="text-[10px] font-medium text-white truncate">{r.label}</span>
                              <span className="text-[8px] font-mono text-(--color-text-secondary)">{r.value}</span>
                              <ChevronRight className="w-2.5 h-2.5 text-(--color-text-muted)" />
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
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-(--color-accent-emerald-light)">
                <Sparkles size={32} />
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

          {/* Feature 3: Kim Faydalanır (mock roles) */}
          <motion.div
            animate="visible"
            variants={fadeUp}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-purple-500/5 to-indigo-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-purple-500/10 blur-[50px] group-hover:bg-purple-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full h-135 rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-(--color-surface-elevated-solid) flex flex-col p-8 gap-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] font-semibold uppercase tracking-widest text-(--color-text-muted)">
                      Roller ve Faydalar
                    </span>
                    <span className="text-[10px] font-mono text-(--color-accent-purple-light)">
                      tek panel
                    </span>
                  </div>

                  {[
                    {
                      icon: Crown,
                      role: "İşletme Liderleri & Yöneticiler",
                      benefit: "Operasyon görünürlüğü, bilinçli karar",
                      tone: "purple",
                    },
                    {
                      icon: Server,
                      role: "BT Departmanları",
                      benefit: "Ölçeklenebilir & güçlü çözümler",
                      tone: "blue",
                    },
                    {
                      icon: Users,
                      role: "İK · Finans · Diğer Birimler",
                      benefit: "Kolay talep yönetimi, kalite",
                      tone: "cyan",
                    },
                    {
                      icon: UserSquare2,
                      role: "Çalışanlar & Son Kullanıcılar",
                      benefit: "Self-servis portal, hızlı çözüm",
                      tone: "emerald",
                    },
                    {
                      icon: Globe,
                      role: "Dış Paydaşlar & Müşteriler",
                      benefit: "Entegre, duyarlı hizmet",
                      tone: "orange",
                    },
                  ].map((row, i) => {
                    const Icon = row.icon;
                    return (
                      <div
                        key={i}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/2 border border-white/8"
                      >
                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                            row.tone === "purple"
                              ? "bg-purple-500/15 border border-purple-500/25 text-(--color-accent-purple-light)"
                              : row.tone === "blue"
                                ? "bg-blue-500/15 border border-blue-500/25 text-(--color-accent-blue-light)"
                                : row.tone === "cyan"
                                  ? "bg-cyan-500/15 border border-cyan-500/25 text-(--color-accent-cyan-light)"
                                  : row.tone === "emerald"
                                    ? "bg-emerald-500/15 border border-emerald-500/25 text-(--color-accent-emerald-light)"
                                    : "bg-orange-500/15 border border-orange-500/25 text-(--color-accent-orange-light)"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col flex-1 min-w-0">
                          <span className="text-[11px] font-bold text-white truncate">
                            {row.role}
                          </span>
                          <span className="text-[10px] font-medium text-(--color-text-muted) truncate">
                            {row.benefit}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-(--color-accent-purple-light)">
                <Users size={32} />
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
            {/* Bento 1 - Tek panel (wide, departman kartları) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 lg:col-span-2 row-span-1 rounded-4xl bg-linear-to-br from-blue-500/10 to-transparent border border-white/10 p-8 hover:bg-white/4 transition-colors relative overflow-hidden group flex flex-col md:flex-row gap-6 items-center"
            >
              <div className="w-full md:w-1/2 flex flex-col justify-center shrink-0">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-(--color-accent-blue-light) flex items-center justify-center mb-6">
                  <LayoutDashboard />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {data.bento.items[0].title}
                </h3>
                <p className="text-sm text-(--color-text-secondary) font-light pr-4">
                  {data.bento.items[0].description}
                </p>
              </div>
              <div className="w-full md:w-1/2 h-45 md:h-full relative rounded-xl border border-white/10 overflow-hidden shadow-inner shrink-0 bg-(--color-surface-elevated-solid) group-hover:border-blue-500/40 transition-colors p-3 grid grid-cols-3 gap-2">
                {[
                  { icon: Server, label: "BT", count: 124, tone: "blue" },
                  { icon: Briefcase, label: "İK", count: 87, tone: "cyan" },
                  { icon: Wallet, label: "Finans", count: 52, tone: "emerald" },
                  { icon: Building2, label: "Tesis", count: 41, tone: "orange" },
                  { icon: Truck, label: "Lojistik", count: 33, tone: "purple" },
                  { icon: Megaphone, label: "Pazarlama", count: 18, tone: "indigo" },
                ].map((row, i) => {
                  const Icon = row.icon;
                  return (
                    <div
                      key={i}
                      className="flex flex-col items-center justify-center gap-1 rounded-lg bg-white/3 border border-white/8 p-2 hover:border-blue-500/30 transition-colors"
                    >
                      <Icon
                        className={`w-3.5 h-3.5 ${
                          row.tone === "blue"
                            ? "text-(--color-accent-blue-light)"
                            : row.tone === "cyan"
                              ? "text-(--color-accent-cyan-light)"
                              : row.tone === "emerald"
                                ? "text-(--color-accent-emerald-light)"
                                : row.tone === "orange"
                                  ? "text-(--color-accent-orange-light)"
                                  : row.tone === "purple"
                                    ? "text-(--color-accent-purple-light)"
                                    : "text-indigo-400"
                        }`}
                      />
                      <span className="text-[9px] font-semibold text-white">
                        {row.label}
                      </span>
                      <span className="text-[10px] font-mono text-(--color-text-muted)">
                        {row.count}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Bento 2 - Operasyonel şeffaflık (normal) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-(--color-accent-orange-light) flex items-center justify-center mb-6 shrink-0">
                <Eye />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[1].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[1].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-2 justify-center">
                {[
                  { dept: "BT", load: 78, tone: "blue" },
                  { dept: "İK", load: 42, tone: "cyan" },
                  { dept: "Finans", load: 65, tone: "emerald" },
                  { dept: "Tesis", load: 88, tone: "orange" },
                ].map((row, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-medium text-white">{row.dept}</span>
                      <span className="font-mono text-(--color-text-secondary)">
                        {row.load}% kapasite
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          row.tone === "blue"
                            ? "bg-linear-to-r from-blue-500/70 to-blue-400/80"
                            : row.tone === "cyan"
                              ? "bg-linear-to-r from-cyan-500/70 to-cyan-400/80"
                              : row.tone === "emerald"
                                ? "bg-linear-to-r from-emerald-500/70 to-emerald-400/80"
                                : "bg-linear-to-r from-orange-500/70 to-red-400/80"
                        }`}
                        style={{ width: `${row.load}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bento 3 - Standartlaştırılmış süreçler (normal) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-(--color-accent-cyan-light) flex items-center justify-center mb-6 shrink-0">
                <ListChecks />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[2].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[2].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-1.5 justify-center">
                {[
                  "Talep alımı",
                  "Sınıflandırma",
                  "Onay akışı",
                  "Atama",
                  "Çözüm & kapanış",
                ].map((step, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/3 border border-white/5"
                  >
                    <span className="text-[9px] font-mono font-bold text-(--color-accent-cyan-light) w-5">
                      0{i + 1}
                    </span>
                    <span className="text-[10px] font-medium text-white">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bento 4 - Otomasyon (wide) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 lg:col-span-2 row-span-1 rounded-4xl bg-linear-to-br from-purple-500/10 to-transparent border border-white/10 p-8 hover:bg-white/4 transition-colors relative overflow-hidden group flex flex-col md:flex-row gap-6 items-center"
            >
              <div className="w-full md:w-1/2 flex flex-col justify-center shrink-0">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-(--color-accent-purple-light) flex items-center justify-center mb-6">
                  <Workflow />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {data.bento.items[3].title}
                </h3>
                <p className="text-sm text-(--color-text-secondary) font-light pr-4">
                  {data.bento.items[3].description}
                </p>
              </div>
              <div className="w-full md:w-1/2 h-45 md:h-full relative rounded-xl border border-white/10 overflow-hidden shadow-inner shrink-0 bg-(--color-surface-elevated-solid) group-hover:border-purple-500/40 transition-colors p-5 flex flex-col gap-2 justify-center">
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1 px-3 py-2.5 rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <span className="text-[9px] font-semibold uppercase tracking-wider text-(--color-text-muted)">
                      Manuel
                    </span>
                    <span className="text-base font-bold text-white">−68%</span>
                  </div>
                  <div className="flex flex-col gap-1 px-3 py-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <span className="text-[9px] font-semibold uppercase tracking-wider text-(--color-text-muted)">
                      Yanıt Süresi
                    </span>
                    <span className="text-base font-bold text-white">−42%</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/3 border border-white/5">
                  <Workflow className="w-3.5 h-3.5 text-(--color-accent-purple-light)" />
                  <span className="text-[10px] font-medium text-white flex-1">
                    Özelleştirilmiş iş akışları
                  </span>
                  <span className="text-[10px] font-mono text-(--color-text-muted)">
                    32 aktif
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Bento 5 - Self-servis portal (normal) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 border border-white/10 bg-linear-to-br from-indigo-500/5 to-transparent rounded-4xl p-8 hover:bg-white/4 transition-colors flex flex-col overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-6 shrink-0">
                <MonitorSmartphone />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[4].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[4].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-2 justify-center">
                {[
                  { icon: HeadphonesIcon, label: "Talep Aç" },
                  { icon: Briefcase, label: "İK Hizmeti" },
                  { icon: Wallet, label: "Avans Talebi" },
                  { icon: Building2, label: "Tesis Bakım" },
                ].map((row, i) => {
                  const Icon = row.icon;
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/3 border border-white/5"
                    >
                      <Icon className="w-3.5 h-3.5 text-indigo-400" />
                      <span className="text-[10px] font-medium text-white flex-1">
                        {row.label}
                      </span>
                      <ArrowRight className="w-3 h-3 text-(--color-text-muted)" />
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Bento 6 - Veri tabanlı içgörüler (normal) */}
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
                <svg viewBox="0 0 200 50" className="w-full h-12">
                  <defs>
                    <linearGradient
                      id="esmLineGrad"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#22d3ee" />
                    </linearGradient>
                  </defs>
                  <polyline
                    fill="none"
                    stroke="url(#esmLineGrad)"
                    strokeWidth="2"
                    points="0,40 30,30 60,34 90,18 120,22 150,12 180,16 200,8"
                  />
                </svg>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-medium text-(--color-text-secondary)">
                    Memnuniyet trendi
                  </span>
                  <span className="font-mono font-bold text-(--color-accent-emerald-light)">
                    +18% (çeyreklik)
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3.5 SSS / FAQ */}
      <section className="py-24 relative z-20">
        <div className="container mx-auto px-6 lg:px-12 w-full max-w-4xl">
          <div className="text-center mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
              <BookOpen className="w-3.5 h-3.5 text-(--color-accent-blue-light)" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-(--color-accent-blue-light)">
                ESM Bilgi Bankası
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
            animate="visible"
            className="flex flex-col gap-3"
          >
            {data.faq.items.map((item, i) => {
              const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
                BookOpen,
                Scale,
                Users,
                Sparkles,
                LayoutGrid,
              };
              const Icon = iconMap[item.icon] || BookOpen;
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
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="group relative flex flex-col justify-center overflow-hidden rounded-3xl bg-linear-to-br from-(--color-brand-primary) to-(--color-brand-purple) p-1 md:p-px"
            >
              <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative h-full flex flex-col items-center justify-center text-center rounded-[23px] bg-(--color-surface-elevated-solid)/90 backdrop-blur-3xl px-8 py-16 md:px-12">
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

                <div className="relative z-10 w-full">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 mx-auto">
                    <Building2 className="w-4 h-4 text-(--color-accent-blue-light)" />
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-text-overline)">
                      ESM Kurumsal Servis Yönetimi
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
                        Tek Panel
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                        <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-blue-base) shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                        Departman Entegrasyonu
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                        <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-purple-base) shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
                        Otomasyon & Self-Servis
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
