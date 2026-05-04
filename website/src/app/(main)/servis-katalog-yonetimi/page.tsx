"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import {
  BookOpen,
  ArrowRight,
  CheckCircle2,
  SlidersHorizontal,
  Workflow,
  FileText,
  Clock,
  Layers,
  RefreshCw,
  Mail,
  Server,
  Wifi,
  Laptop,
  Lock,
  ChevronRight,
  Users,
  GraduationCap,
  Smartphone,
  Building2,
  CreditCard,
  HeartHandshake,
} from "lucide-react";
import data from "@/data/servis-katalog-yonetimi.json";

export default function ServisKatalogYonetimiPage() {
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
              <BookOpen size={14} />
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
            {/* Catalog header */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6 pb-5 border-b border-white/8">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-(--color-accent-blue-light)">
                  Servis Katalog
                </span>
                <span className="text-lg lg:text-xl font-bold text-white tracking-tight">
                  Tüm Hizmetler
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-(--color-text-muted)">
                  12 hizmet
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-(--color-accent-emerald-light)">
                  aktif
                </span>
              </div>
            </div>

            {/* Catalog cards grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
              {[
                { icon: Laptop, name: "Donanım Talebi", category: "BT", sla: "3 gün", tone: "blue" },
                { icon: Lock, name: "Erişim Yetkisi", category: "Güvenlik", sla: "4 saat", tone: "purple" },
                { icon: Mail, name: "Mail Hesabı", category: "İK / BT", sla: "1 gün", tone: "emerald" },
                { icon: Wifi, name: "VPN Erişimi", category: "Network", sla: "2 saat", tone: "cyan" },
                { icon: GraduationCap, name: "Eğitim Talebi", category: "İK", sla: "5 gün", tone: "amber" },
                { icon: Smartphone, name: "Mobil Cihaz", category: "BT", sla: "5 gün", tone: "pink" },
                { icon: Server, name: "Sunucu Tahsis", category: "Altyapı", sla: "7 gün", tone: "indigo" },
                { icon: HeartHandshake, name: "Onboarding", category: "İK", sla: "1 gün", tone: "rose" },
                { icon: CreditCard, name: "Avans Talebi", category: "Finans", sla: "2 gün", tone: "orange" },
                { icon: Building2, name: "Ofis Tahsisi", category: "Tesis", sla: "3 gün", tone: "teal" },
                { icon: FileText, name: "Sözleşme Talebi", category: "Hukuk", sla: "4 gün", tone: "sky" },
                { icon: RefreshCw, name: "Yazılım Lisans", category: "BT", sla: "2 gün", tone: "violet" },
              ].map((item, i) => {
                const Icon = item.icon;
                const toneMap: Record<string, { bg: string; border: string; text: string; iconBg: string; glow: string }> = {
                  blue: { bg: "from-blue-500/15 to-blue-500/5", border: "border-blue-500/25 hover:border-blue-500/50", text: "text-(--color-accent-blue-light)", iconBg: "bg-blue-500/20", glow: "shadow-[0_0_20px_rgba(59,130,246,0.15)]" },
                  purple: { bg: "from-purple-500/15 to-purple-500/5", border: "border-purple-500/25 hover:border-purple-500/50", text: "text-(--color-accent-purple-light)", iconBg: "bg-purple-500/20", glow: "shadow-[0_0_20px_rgba(168,85,247,0.15)]" },
                  emerald: { bg: "from-emerald-500/15 to-emerald-500/5", border: "border-emerald-500/25 hover:border-emerald-500/50", text: "text-(--color-accent-emerald-light)", iconBg: "bg-emerald-500/20", glow: "shadow-[0_0_20px_rgba(16,185,129,0.15)]" },
                  cyan: { bg: "from-cyan-500/15 to-cyan-500/5", border: "border-cyan-500/25 hover:border-cyan-500/50", text: "text-(--color-accent-cyan-light)", iconBg: "bg-cyan-500/20", glow: "shadow-[0_0_20px_rgba(6,182,212,0.15)]" },
                  amber: { bg: "from-amber-500/15 to-amber-500/5", border: "border-amber-500/25 hover:border-amber-500/50", text: "text-amber-300", iconBg: "bg-amber-500/20", glow: "shadow-[0_0_20px_rgba(245,158,11,0.15)]" },
                  pink: { bg: "from-pink-500/15 to-pink-500/5", border: "border-pink-500/25 hover:border-pink-500/50", text: "text-pink-300", iconBg: "bg-pink-500/20", glow: "shadow-[0_0_20px_rgba(236,72,153,0.15)]" },
                  indigo: { bg: "from-indigo-500/15 to-indigo-500/5", border: "border-indigo-500/25 hover:border-indigo-500/50", text: "text-indigo-300", iconBg: "bg-indigo-500/20", glow: "shadow-[0_0_20px_rgba(99,102,241,0.15)]" },
                  rose: { bg: "from-rose-500/15 to-rose-500/5", border: "border-rose-500/25 hover:border-rose-500/50", text: "text-rose-300", iconBg: "bg-rose-500/20", glow: "shadow-[0_0_20px_rgba(244,63,94,0.15)]" },
                  orange: { bg: "from-orange-500/15 to-orange-500/5", border: "border-orange-500/25 hover:border-orange-500/50", text: "text-(--color-accent-orange-light)", iconBg: "bg-orange-500/20", glow: "shadow-[0_0_20px_rgba(249,115,22,0.15)]" },
                  teal: { bg: "from-teal-500/15 to-teal-500/5", border: "border-teal-500/25 hover:border-teal-500/50", text: "text-teal-300", iconBg: "bg-teal-500/20", glow: "shadow-[0_0_20px_rgba(20,184,166,0.15)]" },
                  sky: { bg: "from-sky-500/15 to-sky-500/5", border: "border-sky-500/25 hover:border-sky-500/50", text: "text-sky-300", iconBg: "bg-sky-500/20", glow: "shadow-[0_0_20px_rgba(14,165,233,0.15)]" },
                  violet: { bg: "from-violet-500/15 to-violet-500/5", border: "border-violet-500/25 hover:border-violet-500/50", text: "text-violet-300", iconBg: "bg-violet-500/20", glow: "shadow-[0_0_20px_rgba(139,92,246,0.15)]" },
                };
                const t = toneMap[item.tone];
                return (
                  <div
                    key={i}
                    className={`rounded-2xl bg-linear-to-br ${t.bg} border ${t.border} p-3 lg:p-4 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-0.5 ${t.glow}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className={`w-9 h-9 rounded-lg ${t.iconBg} ${t.text} flex items-center justify-center`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[8px] font-semibold uppercase tracking-wider text-(--color-text-muted)">
                        {item.category}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs lg:text-sm font-bold text-white leading-tight">
                        {item.name}
                      </span>
                      <div className="flex items-center gap-1.5 text-[9px] text-(--color-text-muted)">
                        <Clock className="w-2.5 h-2.5" />
                        <span className="font-mono">SLA {item.sla}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-(--color-surface-base) to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* 2. ZIG-ZAG FEATURE BLOCKS */}
      <section className="py-24 relative z-20">
        <div className="container mx-auto px-6 lg:px-12 w-full max-w-7xl flex flex-col gap-32">
          {/* Feature 1: Çok Katmanlı Katalog */}
          <motion.div
            animate="visible"
            variants={fadeUp}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-blue-500/5 to-cyan-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-blue-500/10 blur-[50px] group-hover:bg-blue-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full h-135 rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-(--color-surface-elevated-solid) flex p-4 gap-3">
                  {/* Category sidebar */}
                  <div className="w-32 shrink-0 flex flex-col gap-1.5 border-r border-white/8 pr-3">
                    <span className="text-[8px] font-semibold uppercase tracking-widest text-(--color-text-muted) mb-1 px-2">
                      Kategoriler
                    </span>
                    {[
                      { icon: Layers, label: "BT Hizmetleri", active: true, count: 24 },
                      { icon: Users, label: "İK", count: 8 },
                      { icon: CreditCard, label: "Finans", count: 6 },
                      { icon: Building2, label: "Tesis", count: 5 },
                      { icon: Lock, label: "Güvenlik", count: 4 },
                      { icon: FileText, label: "Hukuk", count: 3 },
                    ].map((cat, i) => {
                      const Icon = cat.icon;
                      return (
                        <div
                          key={i}
                          className={`flex items-center justify-between gap-2 px-2 py-1.5 rounded-lg ${
                            cat.active
                              ? "bg-blue-500/15 border border-blue-500/30"
                              : "bg-transparent border border-transparent hover:bg-white/3"
                          }`}
                        >
                          <div className="flex items-center gap-1.5 min-w-0">
                            <Icon
                              className={`w-3 h-3 shrink-0 ${
                                cat.active
                                  ? "text-(--color-accent-blue-light)"
                                  : "text-(--color-text-muted)"
                              }`}
                            />
                            <span
                              className={`text-[10px] font-medium truncate ${
                                cat.active ? "text-white" : "text-(--color-text-secondary)"
                              }`}
                            >
                              {cat.label}
                            </span>
                          </div>
                          <span className="text-[8px] font-mono text-(--color-text-muted) shrink-0">
                            {cat.count}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Catalog cards (BT Hizmetleri) */}
                  <div className="flex-1 flex flex-col gap-3 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-white">
                        BT Hizmetleri · 24
                      </span>
                      <span className="text-[8px] font-mono text-(--color-text-muted)">
                        L1 → L3
                      </span>
                    </div>

                    {/* Sub-category groups */}
                    <div className="flex-1 grid grid-cols-2 gap-2 overflow-hidden">
                      {[
                        { icon: Laptop, name: "Donanım", count: 8, tone: "blue" },
                        { icon: Lock, name: "Erişim", count: 6, tone: "purple" },
                        { icon: Mail, name: "İletişim", count: 4, tone: "emerald" },
                        { icon: Wifi, name: "Network", count: 3, tone: "cyan" },
                        { icon: Server, name: "Altyapı", count: 2, tone: "indigo" },
                        { icon: RefreshCw, name: "Yazılım", count: 1, tone: "amber" },
                      ].map((sub, i) => {
                        const Icon = sub.icon;
                        const toneText: Record<string, string> = {
                          blue: "text-(--color-accent-blue-light)",
                          purple: "text-(--color-accent-purple-light)",
                          emerald: "text-(--color-accent-emerald-light)",
                          cyan: "text-(--color-accent-cyan-light)",
                          indigo: "text-indigo-300",
                          amber: "text-amber-300",
                        };
                        const toneBg: Record<string, string> = {
                          blue: "bg-blue-500/15",
                          purple: "bg-purple-500/15",
                          emerald: "bg-emerald-500/15",
                          cyan: "bg-cyan-500/15",
                          indigo: "bg-indigo-500/15",
                          amber: "bg-amber-500/15",
                        };
                        return (
                          <div
                            key={i}
                            className="rounded-lg bg-white/3 border border-white/8 p-2.5 flex flex-col gap-1.5 hover:border-white/20 transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <div
                                className={`w-7 h-7 rounded-md ${toneBg[sub.tone]} ${toneText[sub.tone]} flex items-center justify-center`}
                              >
                                <Icon className="w-3.5 h-3.5" />
                              </div>
                              <span className="text-[8px] font-mono text-(--color-text-muted)">
                                {sub.count} hizmet
                              </span>
                            </div>
                            <span className="text-[10px] font-semibold text-white">
                              {sub.name}
                            </span>
                            <div className="flex items-center gap-1 text-[8px] text-(--color-text-muted) font-medium">
                              <ChevronRight className="w-2 h-2" />
                              <span>Alt kalemler</span>
                            </div>
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
                <BookOpen size={32} />
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

          {/* Feature 2: Özelleştirme (form mock) */}
          <motion.div
            animate="visible"
            variants={fadeUp}
            className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-emerald-500/5 to-cyan-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-emerald-500/10 blur-[50px] group-hover:bg-emerald-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full h-135 rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-(--color-surface-elevated-solid) flex flex-col p-8 gap-4">
                  {/* Service header */}
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] font-semibold uppercase tracking-widest text-(--color-text-muted)">
                      Yeni Donanım Talebi
                    </span>
                    <span className="text-[10px] font-mono text-(--color-accent-emerald-light) px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                      Aktif
                    </span>
                  </div>

                  {/* Form fields mock */}
                  <div className="flex flex-col gap-2.5">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-medium text-(--color-text-muted)">
                        Donanım Tipi
                      </span>
                      <div className="px-3 py-2 rounded-lg bg-white/3 border border-white/8 text-[11px] text-white">
                        Dizüstü bilgisayar
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-medium text-(--color-text-muted)">
                        Kullanım Amacı
                      </span>
                      <div className="px-3 py-2 rounded-lg bg-white/3 border border-white/8 text-[11px] text-white">
                        Yazılım geliştirme
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-medium text-(--color-text-muted)">
                          Aciliyet
                        </span>
                        <div className="px-3 py-2 rounded-lg bg-white/3 border border-white/8 text-[11px] text-white">
                          Orta
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-medium text-(--color-text-muted)">
                          Lokasyon
                        </span>
                        <div className="px-3 py-2 rounded-lg bg-white/3 border border-white/8 text-[11px] text-white">
                          İstanbul HQ
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SLA + Approval summary */}
                  <div className="grid grid-cols-2 gap-2 mt-auto">
                    <div className="flex flex-col gap-1 px-3 py-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-(--color-accent-emerald-light)" />
                        <span className="text-[9px] font-semibold uppercase tracking-wider text-(--color-text-muted)">
                          SLA
                        </span>
                      </div>
                      <span className="text-xs font-bold text-white">
                        3 iş günü
                      </span>
                    </div>
                    <div className="flex flex-col gap-1 px-3 py-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3 h-3 text-(--color-accent-cyan-light)" />
                        <span className="text-[9px] font-semibold uppercase tracking-wider text-(--color-text-muted)">
                          Onay
                        </span>
                      </div>
                      <span className="text-xs font-bold text-white">
                        2 aşamalı
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-(--color-accent-emerald-light)">
                <SlidersHorizontal size={32} />
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

          {/* Feature 3: İş Akışı + Otomatik Görev Dağıtımı */}
          <motion.div
            animate="visible"
            variants={fadeUp}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-purple-500/5 to-indigo-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-purple-500/10 blur-[50px] group-hover:bg-purple-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full h-135 rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-(--color-surface-elevated-solid) flex flex-col p-8 gap-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] font-semibold uppercase tracking-widest text-(--color-text-muted)">
                      Servis İş Akışı
                    </span>
                    <span className="text-[10px] font-mono text-(--color-accent-purple-light)">
                      otomatik
                    </span>
                  </div>

                  {/* Workflow steps */}
                  {[
                    {
                      title: "Talep oluşturuldu",
                      assignee: "Kullanıcı",
                      icon: FileText,
                      tone: "blue",
                      done: true,
                    },
                    {
                      title: "Yönetici onayı",
                      assignee: "Departman Müdürü",
                      icon: CheckCircle2,
                      tone: "emerald",
                      done: true,
                    },
                    {
                      title: "Donanım tahsis",
                      assignee: "BT Teknisyeni",
                      icon: Laptop,
                      tone: "purple",
                      active: true,
                    },
                    {
                      title: "Hesap & yetki",
                      assignee: "Sistem Yöneticisi",
                      icon: Lock,
                      tone: "indigo",
                    },
                    {
                      title: "Teslim & kapanış",
                      assignee: "BT Destek",
                      icon: Users,
                      tone: "cyan",
                    },
                  ].map((step, i) => {
                    const Icon = step.icon;
                    const isDone = step.done;
                    const isActive = step.active;
                    return (
                      <div key={i} className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                            isDone
                              ? "bg-emerald-500/15 border border-emerald-500/30 text-(--color-accent-emerald-light)"
                              : isActive
                                ? "bg-purple-500/20 border border-purple-500/40 text-(--color-accent-purple-light) shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                                : "bg-white/3 border border-white/8 text-(--color-text-muted)"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 flex items-center justify-between px-3 py-2 rounded-lg bg-white/2 border border-white/5">
                          <div className="flex flex-col">
                            <span className="text-[11px] font-semibold text-white">
                              {step.title}
                            </span>
                            <span className="text-[9px] font-medium text-(--color-text-muted)">
                              {step.assignee}
                            </span>
                          </div>
                          {isDone && (
                            <span className="text-[9px] font-mono text-(--color-accent-emerald-light)">
                              tamam
                            </span>
                          )}
                          {isActive && (
                            <span className="text-[9px] font-mono text-(--color-accent-purple-light) animate-pulse">
                              işlemde
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-(--color-accent-purple-light)">
                <Workflow size={32} />
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
            {/* Bento 1 - Talep Formları (wide, mock) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 lg:col-span-2 row-span-1 rounded-4xl bg-linear-to-br from-blue-500/10 to-transparent border border-white/10 p-8 hover:bg-white/4 transition-colors relative overflow-hidden group flex flex-col md:flex-row gap-6 items-center"
            >
              <div className="w-full md:w-1/2 flex flex-col justify-center shrink-0">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-(--color-accent-blue-light) flex items-center justify-center mb-6">
                  <FileText />
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
                  { icon: Laptop, name: "Donanım Talebi", fields: 6 },
                  { icon: Lock, name: "Erişim Yetkisi", fields: 4 },
                  { icon: Mail, name: "Mail Hesabı", fields: 3 },
                  { icon: Wifi, name: "VPN Erişimi", fields: 5 },
                ].map((row, i) => {
                  const Icon = row.icon;
                  return (
                    <div
                      key={i}
                      className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/3 border border-white/5"
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="w-3.5 h-3.5 text-(--color-accent-blue-light)" />
                        <span className="text-[11px] font-medium text-white">
                          {row.name}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-(--color-text-muted)">
                        {row.fields} alan
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Bento 2 - Onay Akışı (normal, mock) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-(--color-accent-orange-light) flex items-center justify-center mb-6 shrink-0">
                <CheckCircle2 />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[1].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[1].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex items-center justify-between gap-2">
                <div className="flex flex-col items-center gap-1.5 flex-1">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-(--color-accent-emerald-light)" />
                  </div>
                  <span className="text-[9px] font-medium text-(--color-text-secondary)">
                    Müdür
                  </span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-(--color-text-muted)" />
                <div className="flex flex-col items-center gap-1.5 flex-1">
                  <div className="w-9 h-9 rounded-lg bg-orange-500/15 border border-orange-500/30 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-(--color-accent-orange-light) animate-pulse" />
                  </div>
                  <span className="text-[9px] font-medium text-(--color-text-secondary)">
                    Direktör
                  </span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-(--color-text-muted)" />
                <div className="flex flex-col items-center gap-1.5 flex-1">
                  <div className="w-9 h-9 rounded-lg bg-white/3 border border-white/8 flex items-center justify-center">
                    <Users className="w-4 h-4 text-(--color-text-muted)" />
                  </div>
                  <span className="text-[9px] font-medium text-(--color-text-muted)">
                    BT
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Bento 3 - SLA (normal, mock) */}
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
                  { service: "Donanım", sla: "3 iş günü" },
                  { service: "Erişim", sla: "4 saat" },
                  { service: "Mail Hesabı", sla: "1 iş günü" },
                  { service: "VPN", sla: "2 saat" },
                ].map((row, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/3 border border-white/5"
                  >
                    <span className="text-[11px] font-medium text-white">
                      {row.service}
                    </span>
                    <span className="text-[10px] font-mono font-semibold text-(--color-accent-cyan-light)">
                      {row.sla}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bento 4 - İş akışı (wide, mock) */}
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
              <div className="w-full md:w-1/2 h-45 md:h-full relative rounded-xl border border-white/10 overflow-hidden shadow-inner shrink-0 bg-(--color-surface-elevated-solid) group-hover:border-purple-500/40 transition-colors p-5 flex flex-col gap-2.5 justify-center">
                <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-purple-500/15 border border-purple-500/30">
                  <div className="flex items-center gap-2">
                    <Workflow className="w-3.5 h-3.5 text-(--color-accent-purple-light)" />
                    <span className="text-[11px] font-semibold text-white">
                      Servis tetiklendi
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-(--color-text-muted)">
                    auto
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/3 border border-white/8">
                    <Users className="w-3.5 h-3.5 text-(--color-accent-blue-light)" />
                    <div className="flex flex-col">
                      <span className="text-[10px] font-semibold text-white">
                        Görev #1
                      </span>
                      <span className="text-[9px] text-(--color-text-muted)">
                        BT Destek
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/3 border border-white/8">
                    <Server className="w-3.5 h-3.5 text-(--color-accent-emerald-light)" />
                    <div className="flex flex-col">
                      <span className="text-[10px] font-semibold text-white">
                        Görev #2
                      </span>
                      <span className="text-[9px] text-(--color-text-muted)">
                        Sistem
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/3 border border-white/8">
                    <Lock className="w-3.5 h-3.5 text-(--color-accent-cyan-light)" />
                    <div className="flex flex-col">
                      <span className="text-[10px] font-semibold text-white">
                        Görev #3
                      </span>
                      <span className="text-[9px] text-(--color-text-muted)">
                        Güvenlik
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <CheckCircle2 className="w-3.5 h-3.5 text-(--color-accent-emerald-light)" />
                    <div className="flex flex-col">
                      <span className="text-[10px] font-semibold text-white">
                        Kapanış
                      </span>
                      <span className="text-[9px] text-(--color-text-muted)">
                        Otomatik
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bento 5 - Çok katmanlı hiyerarşi (normal, tree mock) */}
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
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-1.5 justify-center text-[11px]">
                <div className="flex items-center gap-2 text-white font-semibold">
                  <Layers className="w-3.5 h-3.5 text-indigo-400" />
                  BT Hizmetleri
                </div>
                <div className="flex items-center gap-2 pl-5 text-(--color-text-secondary)">
                  <ChevronRight className="w-3 h-3" />
                  Donanım
                </div>
                <div className="flex items-center gap-2 pl-10 text-(--color-text-muted)">
                  <ChevronRight className="w-3 h-3" />
                  Dizüstü Talebi
                </div>
                <div className="flex items-center gap-2 pl-10 text-(--color-text-muted)">
                  <ChevronRight className="w-3 h-3" />
                  Monitör Talebi
                </div>
                <div className="flex items-center gap-2 pl-5 text-(--color-text-secondary)">
                  <ChevronRight className="w-3 h-3" />
                  Erişim & Hesap
                </div>
                <div className="flex items-center gap-2 pl-10 text-(--color-text-muted)">
                  <ChevronRight className="w-3 h-3" />
                  VPN Erişimi
                </div>
              </div>
            </motion.div>

            {/* Bento 6 - Güncellik & versiyon (normal, mock) */}
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
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-2 justify-center">
                {[
                  { v: "v2.4", date: "29 Nis", note: "Yeni alan eklendi" },
                  { v: "v2.3", date: "21 Nis", note: "SLA güncellendi" },
                  { v: "v2.2", date: "12 Nis", note: "Onaycı revize edildi" },
                ].map((row, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/3 border border-white/5"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-(--color-accent-emerald-light) px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                        {row.v}
                      </span>
                      <span className="text-[10px] font-medium text-white">
                        {row.note}
                      </span>
                    </div>
                    <span className="text-[9px] font-mono text-(--color-text-muted)">
                      {row.date}
                    </span>
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
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

                <div className="relative z-10 w-full">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 mx-auto">
                    <BookOpen className="w-4 h-4 text-(--color-accent-blue-light)" />
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-text-overline)">
                      Servis Katalog Yönetimi
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
                        Standartlaştırma
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                        <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-blue-base) shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                        Otomatik İş Akışı
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                        <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-purple-base) shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
                        Servise Özel SLA
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
