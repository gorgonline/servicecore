"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import {
  Combine,
  ArrowRight,
  CheckCircle2,
  GitBranch,
  ShieldCheck,
  Boxes,
  Send,
  KeyRound,
  LineChart,
  Globe2,
  FileCheck,
  Building2,
  Headphones,
  Truck,
  Layers,
  ArrowRightLeft,
  Activity,
} from "lucide-react";
import data from "@/data/federasyon-motoru.json";

export default function FederasyonMotoruPage() {
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
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-150 h-150 bg-purple-600/20 blur-[120px] rounded-full mix-blend-screen" />
          <div className="absolute top-40 right-1/4 w-100 h-100 bg-indigo-600/10 blur-[100px] rounded-full mix-blend-screen" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10 w-full max-w-7xl">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16 lg:mb-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              lang="en"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-(--color-accent-purple-light) text-xs font-black tracking-widest uppercase mb-8 shadow-inner"
            >
              <Combine size={14} />
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
              <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-indigo-400">
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

          {/* Hero mock — Federation hub & spoke */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative mx-auto rounded-4xl border border-white/10 bg-white/2 backdrop-blur-3xl p-6 lg:p-10 shadow-2xl overflow-hidden group w-full"
          >
            <div className="relative w-full min-h-130 lg:min-h-170 flex items-center justify-center">
              {/* Decorative pulse rings */}
              <div className="absolute z-10 w-70 h-70 lg:w-95 lg:h-95 rounded-full border border-purple-500/15 pointer-events-none" />
              <div className="absolute z-10 w-110 h-110 lg:w-145 lg:h-145 rounded-full border border-purple-500/10 pointer-events-none" />

              {/* Center — Federation hub */}
              <div className="absolute z-30 w-44 h-44 lg:w-56 lg:h-56 rounded-4xl bg-linear-to-br from-purple-500/35 to-indigo-500/25 border border-purple-500/45 flex flex-col items-center justify-center backdrop-blur-xl shadow-[0_0_100px_rgba(168,85,247,0.5)] gap-2">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-2xl bg-purple-500/25 border border-purple-500/40 flex items-center justify-center">
                  <Combine className="w-5 h-5 lg:w-6 lg:h-6 text-(--color-accent-purple-light)" />
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <span lang="en" className="text-[9px] lg:text-[10px] font-semibold uppercase tracking-[0.25em] text-(--color-text-muted)">
                    Federation Hub
                  </span>
                  <span className="text-base lg:text-xl font-bold text-white tracking-tight">
                    ServiceCore
                  </span>
                  <span className="text-[9px] lg:text-[10px] font-light text-(--color-text-secondary)">
                    Orkestratör Katmanı
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-(--color-accent-emerald-light) shadow-[0_0_8px_currentColor] animate-pulse" />
                  <span className="text-[9px] lg:text-[10px] font-mono font-semibold text-(--color-accent-emerald-light) tracking-wider">
                    SENKRON
                  </span>
                </div>
              </div>

              {/* Connection lines — 8 radial spokes */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-0"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                {Array.from({ length: 8 }).map((_, i) => {
                  const angle = (i / 8) * Math.PI * 2 - Math.PI / 2;
                  const x = Number((50 + 40 * Math.cos(angle)).toFixed(3));
                  const y = Number((50 + 40 * Math.sin(angle)).toFixed(3));
                  return (
                    <line
                      key={i}
                      x1={x}
                      y1={y}
                      x2={50}
                      y2={50}
                      stroke="url(#fedGrad)"
                      strokeWidth="0.25"
                      strokeDasharray="0.6 0.6"
                      opacity="0.6"
                      vectorEffect="non-scaling-stroke"
                    />
                  );
                })}
                <defs>
                  <linearGradient
                    id="fedGrad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#a855f7" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0.25" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Tenant nodes — 8 federated organizations */}
              {[
                { label: "Birikim Holding", sub: "iştirak · TR-IST", icon: Building2, tone: "purple", health: "ok" },
                { label: "ABC Tekstil", sub: "iştirak · TR-BUR", icon: Building2, tone: "indigo", health: "ok" },
                { label: "Müşteri Tenant K2", sub: "MSP · TR-ANK", icon: Headphones, tone: "cyan", health: "warn" },
                { label: "Saha Operasyon", sub: "departman · TR-IZM", icon: Truck, tone: "emerald", health: "ok" },
                { label: "Müşteri Tenant K7", sub: "MSP · DE-FRA", icon: Headphones, tone: "blue", health: "ok" },
                { label: "Avrupa Bölge", sub: "iştirak · NL-AMS", icon: Globe2, tone: "sky", health: "ok" },
                { label: "BT Hizmet Birimi", sub: "departman · TR-IST", icon: Layers, tone: "rose", health: "ok" },
                { label: "Müşteri Tenant K9", sub: "MSP · TR-ANK", icon: Headphones, tone: "amber", health: "new" },
              ].map((tenant, i) => {
                const Icon = tenant.icon;
                const angle = (i / 8) * Math.PI * 2 - Math.PI / 2;
                const x = Number((50 + 40 * Math.cos(angle)).toFixed(3));
                const y = Number((50 + 40 * Math.sin(angle)).toFixed(3));
                const toneText: Record<string, string> = {
                  purple: "text-(--color-accent-purple-light)",
                  indigo: "text-indigo-300",
                  cyan: "text-(--color-accent-cyan-light)",
                  emerald: "text-(--color-accent-emerald-light)",
                  blue: "text-(--color-accent-blue-light)",
                  sky: "text-sky-300",
                  rose: "text-rose-300",
                  amber: "text-amber-300",
                };
                const toneIconBg: Record<string, string> = {
                  purple: "bg-purple-500/20 border-purple-500/30",
                  indigo: "bg-indigo-500/20 border-indigo-500/30",
                  cyan: "bg-cyan-500/20 border-cyan-500/30",
                  emerald: "bg-emerald-500/20 border-emerald-500/30",
                  blue: "bg-blue-500/20 border-blue-500/30",
                  sky: "bg-sky-500/20 border-sky-500/30",
                  rose: "bg-rose-500/20 border-rose-500/30",
                  amber: "bg-amber-500/20 border-amber-500/30",
                };
                const healthDot =
                  tenant.health === "warn"
                    ? "bg-amber-400 animate-pulse"
                    : tenant.health === "new"
                      ? "bg-purple-400 animate-pulse"
                      : "bg-(--color-accent-emerald-light)";
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
                      className={`w-8 h-8 lg:w-9 lg:h-9 rounded-lg ${toneIconBg[tenant.tone]} border ${toneText[tenant.tone]} flex items-center justify-center shrink-0`}
                    >
                      <Icon className="w-4 h-4 lg:w-4.5 lg:h-4.5" />
                    </div>
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs lg:text-sm font-bold text-white whitespace-nowrap">
                          {tenant.label}
                        </span>
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${healthDot} shadow-[0_0_8px_currentColor]`}
                        />
                      </div>
                      <span className="text-[9px] lg:text-[10px] font-mono text-(--color-text-muted) tracking-wider">
                        {tenant.sub}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. ZIG-ZAG */}
      <section className="py-24 relative z-20">
        <div className="container mx-auto px-6 lg:px-12 w-full max-w-7xl flex flex-col gap-32">
          {/* Feature 1: Tenant orkestrasyon — directory grid */}
          <motion.div
            animate="visible"
            variants={fadeUp}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-purple-500/5 to-indigo-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-purple-500/10 blur-[50px] group-hover:bg-purple-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full h-135 rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-(--color-surface-elevated-solid) flex flex-col p-5 gap-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/8">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-semibold uppercase tracking-widest text-(--color-text-muted)">
                        Federasyon Dizini
                      </span>
                      <span className="text-sm font-bold text-white">8 Tenant · 3 Tip</span>
                    </div>
                    <span className="text-[10px] font-mono text-(--color-accent-purple-light) px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20">
                      canlı
                    </span>
                  </div>

                  {/* Type breakdown */}
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: "İştirak", value: 3, tone: "purple" },
                      { label: "MSP Müşteri", value: 3, tone: "cyan" },
                      { label: "Departman", value: 2, tone: "emerald" },
                    ].map((s, i) => {
                      const t: Record<string, string> = {
                        purple: "text-(--color-accent-purple-light) bg-purple-500/10 border-purple-500/20",
                        cyan: "text-(--color-accent-cyan-light) bg-cyan-500/10 border-cyan-500/20",
                        emerald: "text-(--color-accent-emerald-light) bg-emerald-500/10 border-emerald-500/20",
                      };
                      return (
                        <div key={i} className={`rounded-lg border p-2 flex flex-col gap-0.5 ${t[s.tone]}`}>
                          <span className="text-[8px] font-medium uppercase tracking-wider text-(--color-text-muted)">
                            {s.label}
                          </span>
                          <span className="text-base font-bold tracking-tight">{s.value}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Tenant rows */}
                  <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-2 px-3 py-1.5 text-[8px] font-semibold uppercase tracking-widest text-(--color-text-muted) border-b border-white/5">
                    <span className="w-3.5">Tip</span>
                    <span>Tenant</span>
                    <span>Bölge</span>
                    <span>Politika</span>
                    <span>Durum</span>
                  </div>
                  <div className="flex flex-col gap-1.5 flex-1 overflow-hidden">
                    {[
                      { icon: Building2, name: "Birikim Holding", region: "TR-IST", policy: "v2.4", status: "senkron", tone: "emerald" },
                      { icon: Building2, name: "ABC Tekstil", region: "TR-BUR", policy: "v2.4", status: "senkron", tone: "emerald" },
                      { icon: Headphones, name: "Müşteri Tenant K2", region: "TR-ANK", policy: "v2.3", status: "geride", tone: "amber" },
                      { icon: Headphones, name: "Müşteri Tenant K7", region: "DE-FRA", policy: "v2.4", status: "senkron", tone: "emerald" },
                      { icon: Globe2, name: "Avrupa Bölge", region: "NL-AMS", policy: "v2.4", status: "senkron", tone: "emerald" },
                      { icon: Truck, name: "Saha Operasyon", region: "TR-IZM", policy: "v2.4", status: "senkron", tone: "emerald" },
                      { icon: Headphones, name: "Müşteri Tenant K9", region: "TR-ANK", policy: "v2.4-rc", status: "yeni", tone: "purple" },
                    ].map((row, i) => {
                      const Icon = row.icon;
                      const statusTone: Record<string, string> = {
                        emerald: "text-(--color-accent-emerald-light) bg-emerald-500/10 border-emerald-500/20",
                        amber: "text-amber-300 bg-amber-500/10 border-amber-500/20",
                        purple: "text-(--color-accent-purple-light) bg-purple-500/10 border-purple-500/20",
                      };
                      return (
                        <div
                          key={i}
                          className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-2 items-center px-3 py-2 rounded-lg bg-white/2 border border-white/5 hover:bg-white/4 hover:border-white/10 transition-colors"
                        >
                          <Icon className="w-3.5 h-3.5 text-(--color-accent-purple-light)" />
                          <span className="text-[10px] font-mono font-medium text-white truncate">
                            {row.name}
                          </span>
                          <span className="text-[9px] text-(--color-text-secondary) hidden sm:block font-mono">
                            {row.region}
                          </span>
                          <span className="text-[8px] font-mono text-white/70">
                            {row.policy}
                          </span>
                          <span className={`text-[8px] font-mono font-semibold px-1.5 py-0.5 rounded-full border ${statusTone[row.tone]}`}>
                            {row.status}
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
                <Combine size={32} />
              </div>
              <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight">
                {data.zigzag[0].titleLead}
                <br />
                <span className="text-(--color-accent-purple-light)">{data.zigzag[0].titleAccent}</span>
              </h2>
              <p className="text-lg text-(--color-text-secondary) leading-relaxed font-light">
                {data.zigzag[0].description}
              </p>
              <ul className="space-y-4">
                {data.zigzag[0].bullets.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-(--color-text-overline)">
                    <CheckCircle2 className="w-5 h-5 text-(--color-accent-purple-light) shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Feature 2: Cross-tenant ticket flow */}
          <motion.div
            animate="visible"
            variants={fadeUp}
            className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-indigo-500/5 to-blue-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-indigo-500/10 blur-[50px] group-hover:bg-indigo-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full h-135 rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-(--color-surface-elevated-solid) flex flex-col p-5 gap-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/8">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-semibold uppercase tracking-widest text-(--color-text-muted)">
                        Federe Bilet · INC-7821
                      </span>
                      <span className="text-sm font-bold text-white truncate">
                        SAP yavaşlık · Birikim Holding
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-indigo-300 px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                      P2 · aktif
                    </span>
                  </div>

                  {/* Hop timeline */}
                  <div className="flex flex-col gap-2 flex-1">
                    {[
                      {
                        tenant: "Birikim Holding",
                        role: "kaynak tenant",
                        action: "Bilet açıldı · L1 destek",
                        time: "09:12",
                        dur: "00:08",
                        active: false,
                      },
                      {
                        tenant: "BT Hizmet Birimi",
                        role: "departman federasyonu",
                        action: "Federe yönlendirme · SAP skill",
                        time: "09:20",
                        dur: "00:22",
                        active: false,
                      },
                      {
                        tenant: "Müşteri Tenant K7",
                        role: "DE-FRA · veri sınırı korundu",
                        action: "L3 SAP uzmanı atandı",
                        time: "09:42",
                        dur: "01:14",
                        active: true,
                      },
                      {
                        tenant: "Birikim Holding",
                        role: "kaynak tenant",
                        action: "Çözüm doğrulama · kullanıcıda",
                        time: "10:56",
                        dur: "—",
                        active: false,
                        pending: true,
                      },
                    ].map((hop, i, arr) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="flex flex-col items-center pt-1">
                          <div
                            className={`w-2.5 h-2.5 rounded-full ring-2 ${
                              hop.active
                                ? "bg-indigo-300 ring-indigo-400/40 shadow-[0_0_10px_rgba(129,140,248,0.7)]"
                                : hop.pending
                                  ? "bg-white/20 ring-white/15"
                                  : "bg-(--color-accent-emerald-light) ring-emerald-500/30"
                            }`}
                          />
                          {i < arr.length - 1 && (
                            <div className="w-px flex-1 mt-1 bg-linear-to-b from-indigo-500/40 to-indigo-500/0" />
                          )}
                        </div>
                        <div
                          className={`flex-1 px-3 py-2 rounded-lg border ${
                            hop.active
                              ? "bg-indigo-500/12 border-indigo-500/30"
                              : "bg-white/2 border-white/5"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2 mb-0.5">
                            <span className="text-[11px] font-bold text-white truncate">
                              {hop.tenant}
                            </span>
                            <div className="flex items-center gap-2 shrink-0">
                              <span className="text-[9px] font-mono text-(--color-text-muted) tabular-nums">
                                {hop.time}
                              </span>
                              <span className="text-[9px] font-mono text-white/80 tabular-nums">
                                {hop.dur}
                              </span>
                            </div>
                          </div>
                          <div className="text-[9px] font-mono uppercase tracking-wider text-(--color-text-muted) mb-0.5">
                            {hop.role}
                          </div>
                          <div className="text-[10px] text-white/85">{hop.action}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer summary */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="rounded-lg border border-white/8 bg-white/3 px-3 py-2">
                      <div className="text-[8px] font-mono tracking-[0.18em] text-(--color-text-muted)">
                        TENANT GEÇİŞİ
                      </div>
                      <div className="text-sm font-semibold text-white tabular-nums">3</div>
                    </div>
                    <div className="rounded-lg border border-white/8 bg-white/3 px-3 py-2">
                      <div className="text-[8px] font-mono tracking-[0.18em] text-(--color-text-muted)">
                        Hizmet Seviyesi
                      </div>
                      <div className="text-sm font-semibold text-(--color-accent-emerald-light) tabular-nums">%82</div>
                    </div>
                    <div className="rounded-lg border border-white/8 bg-white/3 px-3 py-2">
                      <div className="text-[8px] font-mono tracking-[0.18em] text-(--color-text-muted)">
                        VERİ KAPSAMI
                      </div>
                      <div className="text-sm font-semibold text-white">paylaşımlı</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-300">
                <GitBranch size={32} />
              </div>
              <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight">
                {data.zigzag[1].titleLead}
                <br />
                <span className="text-indigo-300">{data.zigzag[1].titleAccent}</span>
              </h2>
              <p className="text-lg text-(--color-text-secondary) leading-relaxed font-light">
                {data.zigzag[1].description}
              </p>
              <ul className="space-y-4">
                {data.zigzag[1].bullets.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-(--color-text-overline)">
                    <CheckCircle2 className="w-5 h-5 text-indigo-300 shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Feature 3: Policy & catalog federation */}
          <motion.div
            animate="visible"
            variants={fadeUp}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-cyan-500/5 to-sky-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-cyan-500/10 blur-[50px] group-hover:bg-cyan-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full h-135 rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-(--color-surface-elevated-solid) flex flex-col p-5 gap-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/8">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-semibold uppercase tracking-widest text-(--color-text-muted)">
                        Politika Yayını
                      </span>
                      <span className="text-sm font-bold text-white">
                        Onay Zinciri Politikası · v2.4
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-200 px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                      yayında
                    </span>
                  </div>

                  {/* Policy diff summary */}
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: "Eklendi", value: "+4", tone: "emerald" },
                      { label: "Değişti", value: "12", tone: "amber" },
                      { label: "Kaldırıldı", value: "−1", tone: "red" },
                    ].map((s, i) => {
                      const t: Record<string, string> = {
                        emerald: "text-(--color-accent-emerald-light) bg-emerald-500/10 border-emerald-500/20",
                        amber: "text-amber-300 bg-amber-500/10 border-amber-500/20",
                        red: "text-(--color-accent-red-light) bg-red-500/10 border-red-500/20",
                      };
                      return (
                        <div key={i} className={`rounded-lg border p-2 flex flex-col gap-0.5 ${t[s.tone]}`}>
                          <span className="text-[8px] font-medium uppercase tracking-wider text-(--color-text-muted)">
                            {s.label}
                          </span>
                          <span className="text-base font-bold tracking-tight tabular-nums">{s.value}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Distribution status */}
                  <div className="text-[9px] font-mono font-semibold tracking-widest text-(--color-text-muted)">
                    DAĞITIM DURUMU · 7 / 8 TENANT
                  </div>
                  <div className="flex flex-col gap-1.5 flex-1 overflow-hidden">
                    {[
                      { name: "Birikim Holding", status: "alındı", time: "09:04", tone: "emerald" },
                      { name: "ABC Tekstil", status: "alındı", time: "09:04", tone: "emerald" },
                      { name: "Müşteri Tenant K2", status: "geride", time: "—", tone: "amber" },
                      { name: "Avrupa Bölge", status: "alındı", time: "09:05", tone: "emerald" },
                      { name: "Müşteri Tenant K7", status: "alındı · istisna", time: "09:05", tone: "purple" },
                      { name: "Saha Operasyon", status: "alındı", time: "09:05", tone: "emerald" },
                      { name: "BT Hizmet Birimi", status: "alındı", time: "09:04", tone: "emerald" },
                    ].map((row, i) => {
                      const t: Record<string, string> = {
                        emerald: "text-(--color-accent-emerald-light) bg-emerald-500/10 border-emerald-500/20",
                        amber: "text-amber-300 bg-amber-500/10 border-amber-500/20",
                        purple: "text-(--color-accent-purple-light) bg-purple-500/10 border-purple-500/20",
                      };
                      return (
                        <div
                          key={i}
                          className="grid grid-cols-[1fr_auto_auto] gap-2 items-center px-3 py-1.5 rounded-md bg-white/2 border border-white/5"
                        >
                          <span className="text-[10px] font-mono text-white truncate">{row.name}</span>
                          <span className={`text-[8px] font-mono font-semibold px-1.5 py-0.5 rounded-full border ${t[row.tone]}`}>
                            {row.status}
                          </span>
                          <span className="text-[9px] font-mono text-(--color-text-muted) tabular-nums">{row.time}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-200">
                <ShieldCheck size={32} />
              </div>
              <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight">
                {data.zigzag[2].titleLead}
                <br />
                <span className="text-cyan-200">{data.zigzag[2].titleAccent}</span>
              </h2>
              <p className="text-lg text-(--color-text-secondary) leading-relaxed font-light">
                {data.zigzag[2].description}
              </p>
              <ul className="space-y-4">
                {data.zigzag[2].bullets.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-(--color-text-overline)">
                    <CheckCircle2 className="w-5 h-5 text-cyan-200 shrink-0 mt-1" />
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
            {/* Bento 1 — Realm dizini (wide) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 lg:col-span-2 row-span-1 rounded-4xl bg-linear-to-br from-purple-500/10 to-transparent border border-white/10 p-8 hover:bg-white/4 transition-colors relative overflow-hidden group flex flex-col md:flex-row gap-6 items-center"
            >
              <div className="w-full md:w-1/2 flex flex-col justify-center shrink-0">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-(--color-accent-purple-light) flex items-center justify-center mb-6">
                  <Boxes />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {data.bento.items[0].title}
                </h3>
                <p className="text-sm text-(--color-text-secondary) font-light pr-4">
                  {data.bento.items[0].description}
                </p>
              </div>
              <div className="w-full md:w-1/2 h-45 md:h-full relative rounded-xl border border-white/10 overflow-hidden shadow-inner shrink-0 bg-(--color-surface-elevated-solid) group-hover:border-purple-500/40 transition-colors flex flex-col gap-2 p-5 justify-center">
                {[
                  { name: "Birikim Holding", users: 412, tone: "purple", health: "ok" },
                  { name: "ABC Tekstil", users: 187, tone: "indigo", health: "ok" },
                  { name: "Müşteri Tenant K2", users: 64, tone: "cyan", health: "warn" },
                  { name: "Avrupa Bölge", users: 96, tone: "sky", health: "ok" },
                ].map((row, i) => {
                  const dotTone: Record<string, string> = {
                    ok: "bg-(--color-accent-emerald-light)",
                    warn: "bg-amber-400 animate-pulse",
                  };
                  const iconTone: Record<string, string> = {
                    purple: "text-(--color-accent-purple-light)",
                    indigo: "text-indigo-300",
                    cyan: "text-(--color-accent-cyan-light)",
                    sky: "text-sky-300",
                  };
                  return (
                    <div
                      key={i}
                      className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-white/3 border border-white/8"
                    >
                      <div className="flex items-center gap-2">
                        <Building2 className={`w-3.5 h-3.5 ${iconTone[row.tone]}`} />
                        <span className="text-[11px] font-medium text-white">{row.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-semibold text-white px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                          {row.users} kullanıcı
                        </span>
                        <span className={`w-1.5 h-1.5 rounded-full ${dotTone[row.health]} shadow-[0_0_6px_currentColor]`} />
                      </div>
                    </div>
                  );
                })}
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <span className="text-[9px] font-medium uppercase tracking-wider text-(--color-text-muted)">
                    Toplam
                  </span>
                  <span className="text-xs font-mono font-bold text-white">8 tenant · 1.2K kullanıcı</span>
                </div>
              </div>
            </motion.div>

            {/* Bento 2 — Politika yayını timeline */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center mb-6 shrink-0">
                <Send />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[1].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[1].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-2 justify-center">
                {[
                  { ver: "v2.4", date: "14 May", state: "yayında", tone: "indigo" },
                  { ver: "v2.3", date: "02 May", state: "yedek", tone: "neutral" },
                  { ver: "v2.2", date: "18 Nis", state: "yedek", tone: "neutral" },
                ].map((row, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg border ${
                      row.tone === "indigo"
                        ? "bg-indigo-500/12 border-indigo-500/30"
                        : "bg-white/2 border-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Send
                        className={`w-3 h-3 ${
                          row.tone === "indigo" ? "text-indigo-300" : "text-(--color-text-muted)"
                        }`}
                      />
                      <span className="text-[11px] font-mono font-semibold text-white">{row.ver}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-mono text-(--color-text-muted)">{row.date}</span>
                      <span
                        className={`text-[9px] font-mono font-semibold ${
                          row.tone === "indigo" ? "text-indigo-300" : "text-(--color-text-muted)"
                        }`}
                      >
                        {row.state}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bento 3 — Kimlik federasyonu */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-(--color-accent-cyan-light) flex items-center justify-center mb-6 shrink-0">
                <KeyRound />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[2].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[2].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-2 justify-center">
                {["SAML 2.0", "OIDC", "SCIM 2.0", "SSO · MFA"].map((p, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/2 border border-white/5"
                  >
                    <div className="flex items-center gap-2">
                      <KeyRound className="w-3 h-3 text-(--color-accent-cyan-light)" />
                      <span lang="en" className="text-[11px] font-mono font-medium text-white">{p}</span>
                    </div>
                    <span className="text-[9px] font-mono text-(--color-accent-emerald-light)">aktif</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bento 4 — Konsolide raporlama (wide) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 lg:col-span-2 row-span-1 rounded-4xl bg-linear-to-br from-emerald-500/10 to-transparent border border-white/10 p-8 hover:bg-white/4 transition-colors relative overflow-hidden group flex flex-col md:flex-row gap-6 items-center"
            >
              <div className="w-full md:w-1/2 flex flex-col justify-center shrink-0">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-(--color-accent-emerald-light) flex items-center justify-center mb-6">
                  <LineChart />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {data.bento.items[3].title}
                </h3>
                <p className="text-sm text-(--color-text-secondary) font-light pr-4">
                  {data.bento.items[3].description}
                </p>
              </div>
              <div className="w-full md:w-1/2 h-45 md:h-full relative rounded-xl border border-white/10 overflow-hidden shadow-inner shrink-0 bg-(--color-surface-elevated-solid) group-hover:border-emerald-500/40 transition-colors p-5 flex flex-col gap-2 justify-center">
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "Açık Olay", value: "412", tone: "blue" },
                    { label: "Hizmet Seviyesi", value: "%94", tone: "emerald" },
                    { label: "Ort. Çözüm", value: "3.2 sa", tone: "cyan" },
                    { label: "Memnuniyet", value: "4.6/5", tone: "purple" },
                  ].map((kpi, i) => {
                    const t: Record<string, string> = {
                      blue: "text-(--color-accent-blue-light)",
                      emerald: "text-(--color-accent-emerald-light)",
                      cyan: "text-(--color-accent-cyan-light)",
                      purple: "text-(--color-accent-purple-light)",
                    };
                    return (
                      <div key={i} className="rounded-lg border border-white/8 bg-white/3 px-3 py-2">
                        <div className="text-[8px] font-mono tracking-[0.18em] text-(--color-text-muted)">
                          {kpi.label.toLocaleUpperCase("tr-TR")}
                        </div>
                        <div className={`text-lg font-bold tabular-nums ${t[kpi.tone]}`}>
                          {kpi.value}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="rounded-lg border border-emerald-500/25 bg-emerald-500/8 px-3 py-2 flex items-center gap-2">
                  <Activity className="w-3 h-3 text-(--color-accent-emerald-light)" />
                  <span className="text-[10px] font-mono text-emerald-200">
                    8 tenant · konsolide görünüm
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Bento 5 — Veri ikametgahı */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 border border-white/10 bg-linear-to-br from-blue-500/5 to-transparent rounded-4xl p-8 hover:bg-white/4 transition-colors flex flex-col overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-(--color-accent-blue-light) flex items-center justify-center mb-6 shrink-0">
                <Globe2 />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[4].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[4].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-2 justify-center">
                {[
                  { region: "TR-IST", tenants: 3 },
                  { region: "TR-ANK", tenants: 2 },
                  { region: "DE-FRA", tenants: 1 },
                  { region: "NL-AMS", tenants: 1 },
                  { region: "TR-IZM", tenants: 1 },
                ].map((r, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-3 py-1.5 rounded-md bg-white/2 border border-white/5"
                  >
                    <div className="flex items-center gap-2">
                      <Globe2 className="w-3 h-3 text-(--color-accent-blue-light)" />
                      <span lang="en" className="text-[10px] font-mono text-white">{r.region}</span>
                    </div>
                    <span className="text-[9px] font-mono text-(--color-text-muted)">
                      {r.tenants} tenant
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bento 6 — Audit trail */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-(--color-accent-orange-light) flex items-center justify-center mb-6 shrink-0">
                <FileCheck />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[5].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[5].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-3 justify-center">
                {[
                  { date: "14 May 09:04", text: "Politika v2.4 yayınlandı · 7 tenant", icon: Send },
                  { date: "14 May 10:12", text: "INC-7821 federe devir · K7 tenant", icon: ArrowRightLeft },
                  { date: "13 May 17:30", text: "K2 için politika istisnası onaylandı", icon: ShieldCheck },
                ].map((row, i) => {
                  const Icon = row.icon;
                  return (
                    <div key={i} className="flex items-start gap-3">
                      <div className="flex flex-col items-center pt-1">
                        <div className="w-6 h-6 rounded-md bg-orange-500/15 border border-orange-500/30 flex items-center justify-center">
                          <Icon className="w-3 h-3 text-(--color-accent-orange-light)" />
                        </div>
                        {i < 2 && (
                          <div className="w-px flex-1 mt-1 bg-linear-to-b from-orange-500/30 to-orange-500/0" />
                        )}
                      </div>
                      <div className="flex flex-col flex-1 pb-2">
                        <span className="text-[9px] font-mono text-(--color-text-muted)">{row.date}</span>
                        <span className="text-[10px] font-medium text-white">{row.text}</span>
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
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

                <div className="relative z-10 w-full">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 mx-auto">
                    <Combine className="w-4 h-4 text-(--color-accent-purple-light)" />
                    <span lang="en" className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-text-overline)">
                      Federation Engine
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
                        <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-purple-base) shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
                        Tenant Federasyonu
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.6)]" />
                        Cross-Tenant Akış
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                        <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-cyan-base) shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
                        Politika & Katalog
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
