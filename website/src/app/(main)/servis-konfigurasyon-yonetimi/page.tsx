"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Settings,
  ArrowRight,
  CheckCircle2,
  Network,
  Database,
  Share2,
  FileSignature,
  Wallet,
  Link2,
  LayoutGrid,
  RefreshCw,
  Server,
  Cpu,
  Monitor,
  Box,
  Cloud,
  Globe,
  HardDrive,
  Shield,
  Smartphone,
  Activity,
  Users,
} from "lucide-react";
import data from "@/data/servis-konfigurasyon-yonetimi.json";
import PrivacyContact from "@/components/ui/privacy-contact";

export default function ServisKonfigurasyonYonetimiPage() {
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
          <div className="absolute top-40 right-1/4 w-100 h-100 bg-cyan-600/10 blur-[100px] rounded-full mix-blend-screen" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10 w-full max-w-7xl">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16 lg:mb-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-(--color-accent-blue-light) text-xs font-black tracking-widest uppercase mb-8 shadow-inner"
            >
              <Settings size={14} />
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
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">
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
            <div className="relative w-full min-h-130 lg:min-h-170 flex items-center justify-center">
              {/* Decorative pulse rings */}
              <div className="absolute z-10 w-70 h-70 lg:w-95 lg:h-95 rounded-full border border-blue-500/15 pointer-events-none" />
              <div className="absolute z-10 w-110 h-110 lg:w-145 lg:h-145 rounded-full border border-blue-500/10 pointer-events-none" />

              {/* Center node — ServiceCore hub */}
              <div className="absolute z-30 w-44 h-44 lg:w-56 lg:h-56 rounded-4xl bg-linear-to-br from-blue-500/35 to-cyan-500/25 border border-blue-500/45 flex flex-col items-center justify-center backdrop-blur-xl shadow-[0_0_100px_rgba(59,130,246,0.55)] gap-2">
                <Image
                  src="/logo-v1.png"
                  alt="ServiceCore"
                  width={48}
                  height={48}
                  className="w-10 h-10 lg:w-12 lg:h-12 object-contain"
                />
                <div className="flex flex-col items-center gap-0.5">
                  <span className="text-[9px] lg:text-[10px] font-semibold uppercase tracking-[0.25em] text-(--color-text-muted)">
                    CMDB Hub
                  </span>
                  <span className="text-base lg:text-xl font-bold text-white tracking-tight">
                    ServiceCore
                  </span>
                  <span className="text-[9px] lg:text-[10px] font-light text-(--color-text-secondary)">
                    Servis Yönetim Platformu
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-(--color-accent-emerald-light) shadow-[0_0_8px_currentColor] animate-pulse" />
                  <span className="text-[9px] lg:text-[10px] font-mono font-semibold text-(--color-accent-emerald-light) tracking-wider">
                    AKTİF
                  </span>
                </div>
              </div>

              {/* Connection lines — 12 radial spokes */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-0"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                {Array.from({ length: 12 }).map((_, i) => {
                  const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
                  const x = Number((50 + 42 * Math.cos(angle)).toFixed(3));
                  const y = Number((50 + 42 * Math.sin(angle)).toFixed(3));
                  return (
                    <line
                      key={i}
                      x1={x}
                      y1={y}
                      x2={50}
                      y2={50}
                      stroke="url(#cmdbGradient)"
                      strokeWidth="0.25"
                      strokeDasharray="0.6 0.6"
                      opacity="0.6"
                      vectorEffect="non-scaling-stroke"
                    />
                  );
                })}
                <defs>
                  <linearGradient
                    id="cmdbGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.25" />
                  </linearGradient>
                </defs>
              </svg>

              {/* CI nodes — 12 varlık (saat yönü) */}
              {[
                { icon: Cpu, label: "Uygulama Sunucusu", rel: "runs-on", tone: "purple" },
                { icon: Cloud, label: "API Gateway", rel: "hosts", tone: "sky" },
                { icon: Monitor, label: "Self Servis Portal", rel: "uses", tone: "cyan" },
                { icon: Activity, label: "Monitoring", rel: "observes", tone: "teal" },
                { icon: Database, label: "Veri Ambarı", rel: "depends-on", tone: "indigo" },
                { icon: Smartphone, label: "Mobil Uygulama", rel: "consumes", tone: "rose" },
                { icon: Shield, label: "Güvenlik / FW", rel: "protects", tone: "red" },
                { icon: RefreshCw, label: "Yedekleme", rel: "backs-up", tone: "pink" },
                { icon: HardDrive, label: "Storage", rel: "stores-on", tone: "amber" },
                { icon: Box, label: "Container", rel: "deploys-on", tone: "violet" },
                { icon: Globe, label: "DNS / Network", rel: "routes", tone: "blue" },
                { icon: Server, label: "DB Sunucusu", rel: "runs-on", tone: "emerald" },
              ].map((node, i) => {
                const Icon = node.icon;
                const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
                const x = Number((50 + 42 * Math.cos(angle)).toFixed(3));
                const y = Number((50 + 42 * Math.sin(angle)).toFixed(3));
                const toneText: Record<string, string> = {
                  emerald: "text-(--color-accent-emerald-light)",
                  purple: "text-(--color-accent-purple-light)",
                  cyan: "text-(--color-accent-cyan-light)",
                  sky: "text-sky-300",
                  indigo: "text-indigo-300",
                  red: "text-(--color-accent-red-light)",
                  amber: "text-amber-300",
                  blue: "text-(--color-accent-blue-light)",
                  rose: "text-rose-300",
                  teal: "text-teal-300",
                  violet: "text-violet-300",
                  pink: "text-pink-300",
                };
                const toneDot: Record<string, string> = {
                  emerald: "bg-(--color-accent-emerald-light)",
                  purple: "bg-(--color-accent-purple-light)",
                  cyan: "bg-(--color-accent-cyan-light)",
                  sky: "bg-sky-300",
                  indigo: "bg-indigo-300",
                  red: "bg-(--color-accent-red-light)",
                  amber: "bg-amber-300",
                  blue: "bg-(--color-accent-blue-light)",
                  rose: "bg-rose-300",
                  teal: "bg-teal-300",
                  violet: "bg-violet-300",
                  pink: "bg-pink-300",
                };
                const toneIconBg: Record<string, string> = {
                  emerald: "bg-emerald-500/20 border-emerald-500/30",
                  purple: "bg-purple-500/20 border-purple-500/30",
                  cyan: "bg-cyan-500/20 border-cyan-500/30",
                  sky: "bg-sky-500/20 border-sky-500/30",
                  indigo: "bg-indigo-500/20 border-indigo-500/30",
                  red: "bg-red-500/20 border-red-500/30",
                  amber: "bg-amber-500/20 border-amber-500/30",
                  blue: "bg-blue-500/20 border-blue-500/30",
                  rose: "bg-rose-500/20 border-rose-500/30",
                  teal: "bg-teal-500/20 border-teal-500/30",
                  violet: "bg-violet-500/20 border-violet-500/30",
                  pink: "bg-pink-500/20 border-pink-500/30",
                };
                return (
                  <div
                    key={i}
                    className="absolute z-20 flex items-center gap-2.5 px-3 py-2.5 lg:px-4 lg:py-3 rounded-xl lg:rounded-2xl bg-(--color-surface-elevated-solid)/95 border border-white/15 backdrop-blur-xl shadow-xl hover:border-white/30 hover:scale-105 transition-all duration-300"
                    style={{
                      top: `${y}%`,
                      left: `${x}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <div
                      className={`w-8 h-8 lg:w-9 lg:h-9 rounded-lg ${toneIconBg[node.tone]} border ${toneText[node.tone]} flex items-center justify-center shrink-0`}
                    >
                      <Icon className="w-4 h-4 lg:w-4.5 lg:h-4.5" />
                    </div>
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs lg:text-sm font-bold text-white whitespace-nowrap">
                          {node.label}
                        </span>
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${toneDot[node.tone]} shadow-[0_0_8px_currentColor]`}
                        />
                      </div>
                      <span className="text-[9px] lg:text-[10px] font-mono text-(--color-text-muted) tracking-wider">
                        {node.rel}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. ZIG-ZAG FEATURE BLOCKS */}
      <section className="py-24 relative z-20">
        <div className="container mx-auto px-6 lg:px-12 w-full max-w-7xl flex flex-col gap-32">
          {/* Feature 1: Hizmet Haritası */}
          <motion.div
            animate="visible"
            variants={fadeUp}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-blue-500/5 to-cyan-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-blue-500/10 blur-[50px] group-hover:bg-blue-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full h-135 rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-(--color-surface-elevated-solid) flex flex-col p-5 gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-semibold uppercase tracking-widest text-(--color-text-muted)">
                      Hizmet Haritası
                    </span>
                    <span className="text-[10px] font-mono text-(--color-accent-blue-light)">
                      3 katman
                    </span>
                  </div>

                  {/* Topology layers */}
                  <div className="relative flex-1 flex flex-col justify-between py-3">
                    {/* SVG connection lines */}
                    <svg
                      className="absolute inset-0 w-full h-full pointer-events-none"
                      viewBox="0 0 400 400"
                      preserveAspectRatio="none"
                    >
                      {/* Layer 1 → Layer 2 */}
                      <line x1="100" y1="50" x2="100" y2="200" stroke="url(#mapGrad)" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.5" />
                      <line x1="100" y1="50" x2="200" y2="200" stroke="url(#mapGrad)" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.5" />
                      <line x1="300" y1="50" x2="200" y2="200" stroke="url(#mapGrad)" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.5" />
                      <line x1="300" y1="50" x2="300" y2="200" stroke="url(#mapGrad)" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.5" />
                      {/* Layer 2 → Layer 3 */}
                      <line x1="100" y1="200" x2="60" y2="350" stroke="url(#mapGrad)" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.5" />
                      <line x1="100" y1="200" x2="160" y2="350" stroke="url(#mapGrad)" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.5" />
                      <line x1="200" y1="200" x2="200" y2="350" stroke="url(#mapGrad)" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.5" />
                      <line x1="300" y1="200" x2="240" y2="350" stroke="url(#mapGrad)" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.5" />
                      <line x1="300" y1="200" x2="340" y2="350" stroke="url(#mapGrad)" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.5" />
                      <defs>
                        <linearGradient id="mapGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.7" />
                          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2" />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* Layer 1: Kullanıcı / Portal */}
                    <div className="relative z-10 flex justify-between gap-3">
                      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-500/15 border border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                        <Users className="w-3.5 h-3.5 text-(--color-accent-blue-light)" />
                        <div className="flex flex-col">
                          <span className="text-[8px] font-semibold uppercase tracking-wider text-(--color-text-muted)">L1 · Kullanıcı</span>
                          <span className="text-[11px] font-bold text-white">Müşteriler</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-500/15 border border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                        <Smartphone className="w-3.5 h-3.5 text-(--color-accent-blue-light)" />
                        <div className="flex flex-col">
                          <span className="text-[8px] font-semibold uppercase tracking-wider text-(--color-text-muted)">L1 · Portal</span>
                          <span className="text-[11px] font-bold text-white">Self Servis</span>
                        </div>
                      </div>
                    </div>

                    {/* Layer 2: Hizmetler */}
                    <div className="relative z-10 grid grid-cols-3 gap-2">
                      {[
                        { icon: Network, name: "ERP", tone: "purple" },
                        { icon: Cloud, name: "API", tone: "purple" },
                        { icon: Activity, name: "Monitor", tone: "purple" },
                      ].map((s, i) => {
                        const Icon = s.icon;
                        return (
                          <div
                            key={i}
                            className="flex flex-col items-center gap-1 px-2 py-2 rounded-xl bg-purple-500/15 border border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.18)]"
                          >
                            <Icon className="w-4 h-4 text-(--color-accent-purple-light)" />
                            <span className="text-[8px] font-semibold uppercase tracking-wider text-(--color-text-muted)">L2 · Servis</span>
                            <span className="text-[10px] font-bold text-white">{s.name}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Layer 3: Altyapı */}
                    <div className="relative z-10 grid grid-cols-5 gap-1.5">
                      {[
                        { icon: Server, label: "DB" },
                        { icon: HardDrive, label: "Disk" },
                        { icon: Cpu, label: "App" },
                        { icon: Globe, label: "DNS" },
                        { icon: Shield, label: "FW" },
                      ].map((n, i) => {
                        const Icon = n.icon;
                        return (
                          <div
                            key={i}
                            className="flex flex-col items-center gap-0.5 px-1 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/25"
                          >
                            <Icon className="w-3.5 h-3.5 text-(--color-accent-cyan-light)" />
                            <span className="text-[8px] font-semibold text-white">{n.label}</span>
                            <span className="text-[7px] font-mono text-(--color-text-muted)">L3</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-(--color-accent-blue-light)">
                <Network size={32} />
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

          {/* Feature 2: CMDB */}
          <motion.div
            animate="visible"
            variants={fadeUp}
            className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-emerald-500/5 to-cyan-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-emerald-500/10 blur-[50px] group-hover:bg-emerald-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full h-135 rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-(--color-surface-elevated-solid) flex flex-col p-5 gap-3">
                  {/* CMDB header */}
                  <div className="flex items-center justify-between pb-2 border-b border-white/8">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-semibold uppercase tracking-widest text-(--color-text-muted)">
                        CMDB · Konfigürasyon Kayıtları
                      </span>
                      <span className="text-sm font-bold text-white">
                        Tüm Varlıklar
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-(--color-accent-emerald-light) px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                      342 CI
                    </span>
                  </div>

                  {/* Stats row */}
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { label: "Sunucu", value: 86, tone: "blue" },
                      { label: "Uygulama", value: 124, tone: "purple" },
                      { label: "DB", value: 32, tone: "emerald" },
                      { label: "Diğer", value: 100, tone: "cyan" },
                    ].map((s, i) => {
                      const t: Record<string, string> = {
                        blue: "text-(--color-accent-blue-light) bg-blue-500/10 border-blue-500/20",
                        purple: "text-(--color-accent-purple-light) bg-purple-500/10 border-purple-500/20",
                        emerald: "text-(--color-accent-emerald-light) bg-emerald-500/10 border-emerald-500/20",
                        cyan: "text-(--color-accent-cyan-light) bg-cyan-500/10 border-cyan-500/20",
                      };
                      return (
                        <div key={i} className={`rounded-lg border p-2 flex flex-col gap-0.5 ${t[s.tone]}`}>
                          <span className="text-[8px] font-medium uppercase tracking-wider text-(--color-text-muted)">
                            {s.label}
                          </span>
                          <span className="text-base font-bold tracking-tight">
                            {s.value}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Table header */}
                  <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-2 px-3 py-1.5 text-[8px] font-semibold uppercase tracking-widest text-(--color-text-muted) border-b border-white/5">
                    <span className="w-3.5">Tip</span>
                    <span>Ad</span>
                    <span>Sahip</span>
                    <span>Durum</span>
                    <span>Son Güncelleme</span>
                  </div>

                  {/* Table rows */}
                  <div className="flex flex-col gap-1.5 flex-1 overflow-hidden">
                    {[
                      { icon: Server, name: "DB-PROD-04", owner: "BT Altyapı", status: "aktif", date: "29 Nis", tone: "emerald" },
                      { icon: Cpu, name: "ERP App Pool", owner: "Yazılım", status: "aktif", date: "28 Nis", tone: "emerald" },
                      { icon: Cloud, name: "API Gateway", owner: "DevOps", status: "aktif", date: "27 Nis", tone: "emerald" },
                      { icon: Database, name: "Veri Ambarı", owner: "Veri", status: "bakım", date: "26 Nis", tone: "amber" },
                      { icon: Monitor, name: "Self Servis Portal", owner: "Web", status: "aktif", date: "26 Nis", tone: "emerald" },
                      { icon: Shield, name: "FW-DMZ-01", owner: "Güvenlik", status: "uyarı", date: "25 Nis", tone: "red" },
                      { icon: HardDrive, name: "Storage Cluster", owner: "BT Altyapı", status: "aktif", date: "24 Nis", tone: "emerald" },
                    ].map((row, i) => {
                      const Icon = row.icon;
                      const statusTone: Record<string, string> = {
                        emerald: "text-(--color-accent-emerald-light) bg-emerald-500/10 border-emerald-500/20",
                        amber: "text-amber-300 bg-amber-500/10 border-amber-500/20",
                        red: "text-(--color-accent-red-light) bg-red-500/10 border-red-500/20",
                      };
                      return (
                        <div
                          key={i}
                          className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-2 items-center px-3 py-2 rounded-lg bg-white/2 border border-white/5 hover:bg-white/4 hover:border-white/10 transition-colors"
                        >
                          <Icon className="w-3.5 h-3.5 text-(--color-accent-emerald-light)" />
                          <span className="text-[10px] font-mono font-medium text-white truncate">
                            {row.name}
                          </span>
                          <span className="text-[9px] text-(--color-text-secondary) hidden sm:block">
                            {row.owner}
                          </span>
                          <span className={`text-[8px] font-mono font-semibold px-1.5 py-0.5 rounded-full border ${statusTone[row.tone]}`}>
                            {row.status}
                          </span>
                          <span className="text-[8px] font-mono text-(--color-text-muted)">
                            {row.date}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-(--color-accent-emerald-light)">
                <Database size={32} />
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

          {/* Feature 3: Süreç Entegrasyonu (mock visual) */}
          <motion.div
            animate="visible"
            variants={fadeUp}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-purple-500/5 to-indigo-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-purple-500/10 blur-[50px] group-hover:bg-purple-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full h-135 rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-(--color-surface-elevated-solid) flex flex-col p-8 gap-4">
                  {/* Service header */}
                  <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-linear-to-r from-purple-500/15 to-indigo-500/10 border border-purple-500/30">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                        <Network className="w-4 h-4 text-(--color-accent-purple-light)" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] font-semibold uppercase tracking-widest text-(--color-text-muted)">
                          Hizmet (CI)
                        </span>
                        <span className="text-sm font-bold text-white">
                          ERP Servisi
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-semibold text-(--color-accent-emerald-light) px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                      AKTİF
                    </span>
                  </div>

                  {/* Related processes */}
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: "Olaylar", value: 12, color: "blue" },
                      { label: "İstekler", value: 8, color: "cyan" },
                      { label: "Değişiklik", value: 3, color: "orange" },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="rounded-lg bg-white/2 border border-white/8 p-3 flex flex-col gap-1"
                      >
                        <span className="text-[9px] font-medium uppercase tracking-wider text-(--color-text-muted)">
                          {item.label}
                        </span>
                        <span
                          className={`text-2xl font-bold tracking-tight ${
                            item.color === "blue"
                              ? "text-(--color-accent-blue-light)"
                              : item.color === "cyan"
                                ? "text-(--color-accent-cyan-light)"
                                : "text-(--color-accent-orange-light)"
                          }`}
                        >
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Linked CIs */}
                  <div className="flex flex-col gap-2 flex-1">
                    <span className="text-[9px] font-semibold uppercase tracking-widest text-(--color-text-muted) mb-1">
                      Bağlı Varlıklar
                    </span>
                    {[
                      { icon: Server, name: "DB Sunucusu #04", rel: "runs-on" },
                      { icon: Cpu, name: "Uygulama Servisi", rel: "depends-on" },
                      { icon: Monitor, name: "Self Servis Portal", rel: "uses" },
                    ].map((row, i) => {
                      const Icon = row.icon;
                      return (
                        <div
                          key={i}
                          className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/2 border border-white/5"
                        >
                          <div className="flex items-center gap-2">
                            <Icon className="w-3.5 h-3.5 text-(--color-accent-purple-light)" />
                            <span className="text-[11px] font-medium text-white">
                              {row.name}
                            </span>
                          </div>
                          <span className="text-[9px] font-mono text-(--color-text-muted) px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20">
                            {row.rel}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-(--color-accent-purple-light)">
                <Share2 size={32} />
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
            {/* Bento 1 - Sözleşme tipleri (wide, mock) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 lg:col-span-2 row-span-1 rounded-4xl bg-linear-to-br from-blue-500/10 to-transparent border border-white/10 p-8 hover:bg-white/4 transition-colors relative overflow-hidden group flex flex-col md:flex-row gap-6 items-center"
            >
              <div className="w-full md:w-1/2 flex flex-col justify-center shrink-0">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-(--color-accent-blue-light) flex items-center justify-center mb-6">
                  <FileSignature />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {data.bento.items[0].title}
                </h3>
                <p className="text-sm text-(--color-text-secondary) font-light pr-4">
                  {data.bento.items[0].description}
                </p>
              </div>
              <div className="w-full md:w-1/2 h-45 md:h-full relative rounded-xl border border-white/10 overflow-hidden shadow-inner shrink-0 bg-(--color-surface-elevated-solid) group-hover:border-blue-500/40 transition-colors flex flex-col gap-2 p-5 justify-center">
                {[
                  { label: "Destek Anlaşması", count: 4, tone: "blue" },
                  { label: "Tedarikçi Anlaşması", count: 3, tone: "cyan" },
                  { label: "Müşteri Anlaşması", count: 7, tone: "emerald" },
                ].map((row, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-white/3 border border-white/8"
                  >
                    <div className="flex items-center gap-2">
                      <FileSignature
                        className={`w-3.5 h-3.5 ${
                          row.tone === "blue"
                            ? "text-(--color-accent-blue-light)"
                            : row.tone === "cyan"
                              ? "text-(--color-accent-cyan-light)"
                              : "text-(--color-accent-emerald-light)"
                        }`}
                      />
                      <span className="text-[11px] font-medium text-white">
                        {row.label}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono font-semibold text-white px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                      {row.count} aktif
                    </span>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <span className="text-[9px] font-medium uppercase tracking-wider text-(--color-text-muted)">
                    Toplam
                  </span>
                  <span className="text-xs font-mono font-bold text-white">
                    14 anlaşma
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Bento 2 - Harcama (normal, mock chart) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-(--color-accent-orange-light) flex items-center justify-center mb-6 shrink-0">
                <Wallet />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[1].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[1].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex items-end justify-between gap-2">
                {[55, 75, 40, 90, 65, 80].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t bg-linear-to-t from-orange-500/40 to-orange-400/80 border border-orange-500/30"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Bento 3 - İlişki tipleri (normal, mock) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-(--color-accent-cyan-light) flex items-center justify-center mb-6 shrink-0">
                <Link2 />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[2].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[2].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-2 justify-center">
                {["depends-on", "runs-on", "hosts", "uses"].map((rel, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/3 border border-white/5"
                  >
                    <div className="flex items-center gap-2">
                      <Link2 className="w-3.5 h-3.5 text-(--color-accent-cyan-light)" />
                      <span className="text-[11px] font-mono font-medium text-white">
                        {rel}
                      </span>
                    </div>
                    <span className="text-[9px] font-mono text-(--color-text-muted)">
                      {[42, 28, 16, 35][i]}x
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bento 4 - Etki Analizi (wide, mock) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 lg:col-span-2 row-span-1 rounded-4xl bg-linear-to-br from-purple-500/10 to-transparent border border-white/10 p-8 hover:bg-white/4 transition-colors relative overflow-hidden group flex flex-col md:flex-row gap-6 items-center"
            >
              <div className="w-full md:w-1/2 flex flex-col justify-center shrink-0">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-(--color-accent-purple-light) flex items-center justify-center mb-6">
                  <Network />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {data.bento.items[3].title}
                </h3>
                <p className="text-sm text-(--color-text-secondary) font-light pr-4">
                  {data.bento.items[3].description}
                </p>
              </div>
              <div className="w-full md:w-1/2 h-45 md:h-full relative rounded-xl border border-white/10 overflow-hidden shadow-inner shrink-0 bg-(--color-surface-elevated-solid) group-hover:border-purple-500/40 transition-colors p-5 flex flex-col gap-2.5 justify-center">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-500/15 border border-purple-500/30">
                  <RefreshCw className="w-3.5 h-3.5 text-(--color-accent-purple-light)" />
                  <span className="text-[11px] font-semibold text-white">
                    Planlanan Değişiklik
                  </span>
                </div>
                <div className="flex items-center gap-2 pl-5">
                  <div className="w-3 h-px bg-purple-500/40" />
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/3 border border-white/8 flex-1">
                    <Network className="w-3.5 h-3.5 text-(--color-accent-blue-light)" />
                    <span className="text-[11px] font-medium text-white">
                      ERP Servisi
                    </span>
                    <span className="ml-auto text-[9px] font-mono text-red-400">
                      kritik
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 pl-10">
                  <div className="w-3 h-px bg-blue-500/40" />
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/3 border border-white/8 flex-1">
                    <Server className="w-3.5 h-3.5 text-(--color-accent-emerald-light)" />
                    <span className="text-[11px] font-medium text-white">
                      DB Sunucusu
                    </span>
                    <span className="ml-auto text-[9px] font-mono text-(--color-accent-orange-light)">
                      orta
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 pl-10">
                  <div className="w-3 h-px bg-blue-500/40" />
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/3 border border-white/8 flex-1">
                    <Monitor className="w-3.5 h-3.5 text-(--color-accent-cyan-light)" />
                    <span className="text-[11px] font-medium text-white">
                      Self Servis Portal
                    </span>
                    <span className="ml-auto text-[9px] font-mono text-(--color-accent-emerald-light)">
                      düşük
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bento 5 - CI Kütüphanesi (normal, mock grid) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 border border-white/10 bg-linear-to-br from-indigo-500/5 to-transparent rounded-4xl p-8 hover:bg-white/4 transition-colors flex flex-col overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-6 shrink-0">
                <LayoutGrid />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[4].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[4].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 grid grid-cols-3 gap-2">
                {[
                  { icon: Network, label: "Hizmet" },
                  { icon: Cpu, label: "Uygulama" },
                  { icon: Server, label: "Sunucu" },
                  { icon: Monitor, label: "İstemci" },
                  { icon: Database, label: "DB" },
                  { icon: Box, label: "Diğer" },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={i}
                      className="rounded-lg bg-white/3 border border-white/8 flex flex-col items-center justify-center gap-1.5 p-2 hover:border-indigo-500/40 transition-colors"
                    >
                      <Icon className="w-4 h-4 text-indigo-400" />
                      <span className="text-[9px] font-medium text-(--color-text-secondary)">
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Bento 6 - Güncellik (normal, mock audit) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-(--color-accent-emerald-light) flex items-center justify-center mb-6 shrink-0">
                <RefreshCw />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[5].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[5].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-3 justify-center">
                {[
                  { date: "29 Nis 14:22", text: "İlişki tipi güncellendi" },
                  { date: "27 Nis 09:10", text: "Yeni CI eklendi" },
                  { date: "24 Nis 17:05", text: "Bağımlılık değişti" },
                ].map((row, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="flex flex-col items-center pt-1">
                      <div className="w-2 h-2 rounded-full bg-(--color-accent-emerald-light) ring-2 ring-emerald-500/20" />
                      {i < 2 && (
                        <div className="w-px flex-1 mt-1 bg-linear-to-b from-emerald-500/40 to-emerald-500/0" />
                      )}
                    </div>
                    <div className="flex flex-col flex-1 pb-2">
                      <span className="text-[10px] font-mono text-(--color-text-muted)">
                        {row.date}
                      </span>
                      <span className="text-xs font-medium text-white">
                        {row.text}
                      </span>
                    </div>
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
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

                <div className="relative z-10 w-full">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 mx-auto">
                    <Settings className="w-4 h-4 text-(--color-accent-blue-light)" />
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-text-overline)">
                      Servis Konfigürasyon Yönetimi
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
                        CMDB
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                        <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-blue-base) shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                        Hizmet Haritası
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                        <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-purple-base) shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
                        Etki Analizi
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
