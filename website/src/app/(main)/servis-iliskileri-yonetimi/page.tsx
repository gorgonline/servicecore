"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import {
  Users,
  ArrowRight,
  CheckCircle2,
  UserSquare2,
  FileSignature,
  Share2,
  LayoutDashboard,
  Bell,
  LineChart,
  ShieldCheck,
  Mail,
  Phone,
  CalendarDays,
  Briefcase,
  HeadphonesIcon,
  Crown,
  Wallet,
  Calculator,
  Repeat,
  Clock,
  Tags,
  Sparkles,
  ChevronDown,
  Search,
  Building2,
  Activity,
} from "lucide-react";
import data from "@/data/servis-iliskileri-yonetimi.json";
import { En } from "@/components/ui/En";
import PrivacyContact from "@/components/ui/privacy-contact";

export default function ServisIliskileriYonetimiPage() {
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
              <Users size={14} />
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
                  <Users className="w-5 h-5 text-(--color-accent-blue-light)" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-(--color-accent-blue-light)">
                    SRM · Servis İlişkileri Yönetimi
                  </span>
                  <span className="text-lg lg:text-xl font-bold text-white tracking-tight">
                    Müşteri Hesapları & Sözleşmeler
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-(--color-text-muted)">42 müşteri · 86 sözleşme</span>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-(--color-accent-emerald-light) shadow-[0_0_8px_currentColor] animate-pulse" />
                  <span className="text-[9px] font-mono uppercase tracking-widest text-(--color-accent-emerald-light)">canlı</span>
                </div>
              </div>
            </div>

            {/* KPI metric row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-5">
              {[
                { icon: Building2, label: "Aktif Müşteri", value: "42", trend: "+3", tone: "blue" },
                { icon: FileSignature, label: "Aktif Sözleşme", value: "86", trend: "+12", tone: "emerald" },
                { icon: Users, label: "Yetkili Kişi", value: "284", trend: "+18", tone: "purple" },
                { icon: Bell, label: "Yenilenecek (30g)", value: "8", trend: "kritik", tone: "amber" },
              ].map((m, i) => {
                const Icon = m.icon;
                const t: Record<string, string> = {
                  blue: "from-blue-500/15 to-blue-500/5 border-blue-500/25 text-(--color-accent-blue-light) shadow-[0_0_25px_rgba(59,130,246,0.12)]",
                  emerald: "from-emerald-500/15 to-emerald-500/5 border-emerald-500/25 text-(--color-accent-emerald-light) shadow-[0_0_25px_rgba(16,185,129,0.12)]",
                  purple: "from-purple-500/15 to-purple-500/5 border-purple-500/25 text-(--color-accent-purple-light) shadow-[0_0_25px_rgba(168,85,247,0.12)]",
                  amber: "from-amber-500/15 to-amber-500/5 border-amber-500/25 text-amber-300 shadow-[0_0_25px_rgba(245,158,11,0.12)]",
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

            {/* Customer table */}
            <div className="rounded-2xl border border-white/10 bg-(--color-surface-elevated-solid) p-4 mb-5">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/8">
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-(--color-accent-blue-light)" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white">Müşteri Hesapları</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Search className="w-2.5 h-2.5 text-(--color-text-muted)" />
                  <span className="text-[8px] font-mono text-(--color-text-muted)">5 / 42 görüntüleniyor</span>
                </div>
              </div>

              <div className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-2 px-3 py-1.5 text-[8px] font-semibold uppercase tracking-widest text-(--color-text-muted) bg-white/2 border border-white/5 rounded-md">
                <span className="w-3.5">Tip</span>
                <span>Müşteri</span>
                <span>Sözleşme</span>
                <span>Plan</span>
                <span>Hizmet Seviyesi</span>
                <span>Bitiş</span>
              </div>
              <div className="flex flex-col gap-1.5 mt-1.5">
                {[
                  { icon: Crown, name: "Acme Corp", contract: "Premium", plan: "24/7 · Sınırsız", sla: 98, end: "12 Ara 2026", tone: "purple" },
                  { icon: Building2, name: "Globex Ltd.", contract: "Standart", plan: "Mesai · 80sa/ay", sla: 94, end: "08 Eyl 2026", tone: "blue" },
                  { icon: Briefcase, name: "Initech AŞ", contract: "Premium", plan: "24/7 · 200sa/ay", sla: 96, end: "21 Kas 2026", tone: "purple" },
                  { icon: Building2, name: "Soylent Corp", contract: "Best-Effort", plan: "Saatlik fakture", sla: 87, end: "03 Eki 2026", tone: "emerald" },
                  { icon: Building2, name: "Hooli Inc.", contract: "Standart", plan: "Mesai · 60sa/ay", sla: 91, end: "15 May 2026", tone: "amber" },
                ].map((r, i) => {
                  const Icon = r.icon;
                  const tone: Record<string, string> = {
                    purple: "text-(--color-accent-purple-light) bg-purple-500/12 border-purple-500/25",
                    blue: "text-(--color-accent-blue-light) bg-blue-500/12 border-blue-500/25",
                    emerald: "text-(--color-accent-emerald-light) bg-emerald-500/12 border-emerald-500/25",
                    amber: "text-amber-300 bg-amber-500/12 border-amber-500/25",
                  };
                  const slaTone = r.sla >= 95 ? "text-(--color-accent-emerald-light)" : r.sla >= 90 ? "text-amber-300" : "text-(--color-accent-red-light)";
                  return (
                    <div key={i} className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-2 items-center px-3 py-2 rounded-lg bg-white/2 border border-white/5 hover:bg-white/4 transition-colors">
                      <Icon className={`w-3 h-3 ${tone[r.tone].split(" ")[0]}`} />
                      <span className="text-[10px] font-medium text-white truncate">{r.name}</span>
                      <span className={`text-[8px] font-mono font-semibold px-1.5 py-0.5 rounded-full border ${tone[r.tone]}`}>{r.contract}</span>
                      <span className="text-[9px] text-(--color-text-secondary) hidden sm:block">{r.plan}</span>
                      <span className={`text-[10px] font-mono font-bold ${slaTone}`}>%{r.sla}</span>
                      <span className="text-[8px] font-mono text-(--color-text-muted)">{r.end}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer chips */}
            <div className="rounded-2xl border border-white/10 bg-(--color-surface-elevated-solid) p-3 flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <Activity className="w-3 h-3 text-(--color-text-muted)" />
                <span className="text-[9px] font-mono uppercase tracking-widest text-(--color-text-muted)">SRM 360°:</span>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {[
                  { label: "Hesap", icon: Building2, tone: "blue" },
                  { label: "Kişiler", icon: Users, tone: "cyan" },
                  { label: "Sözleşme", icon: FileSignature, tone: "emerald" },
                  { label: "Plan", icon: Wallet, tone: "amber" },
                  { label: "Varlık", icon: Briefcase, tone: "purple" },
                  { label: "Kayıt", icon: Bell, tone: "rose" },
                ].map((c, i) => {
                  const Icon = c.icon;
                  const t: Record<string, string> = {
                    blue: "text-(--color-accent-blue-light) bg-blue-500/10 border-blue-500/20",
                    cyan: "text-(--color-accent-cyan-light) bg-cyan-500/10 border-cyan-500/20",
                    emerald: "text-(--color-accent-emerald-light) bg-emerald-500/10 border-emerald-500/20",
                    amber: "text-amber-300 bg-amber-500/10 border-amber-500/20",
                    purple: "text-(--color-accent-purple-light) bg-purple-500/10 border-purple-500/20",
                    rose: "text-rose-300 bg-rose-500/10 border-rose-500/20",
                  };
                  return (
                    <span key={i} className={`flex items-center gap-1 text-[9px] font-medium px-1.5 py-0.5 rounded-full border ${t[c.tone]}`}>
                      <Icon className="w-2.5 h-2.5" />
                      {c.label}
                    </span>
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
          {/* Feature 1: Kayıt Takibi */}
          <motion.div
            animate="visible"
            variants={fadeUp}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-blue-500/5 to-cyan-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-blue-500/10 blur-[50px] group-hover:bg-blue-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full h-135 rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-(--color-surface-elevated-solid) flex flex-col p-5 gap-3">
                  {/* Customer header */}
                  <div className="flex items-center justify-between pb-2 border-b border-white/8">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-purple-500/15 border border-purple-500/30 flex items-center justify-center">
                        <Crown className="w-4 h-4 text-(--color-accent-purple-light)" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[8px] font-mono uppercase tracking-wider text-(--color-text-muted)">Müşteri Hesabı · <En>Premium</En></span>
                        <span className="text-[12px] font-bold text-white">Acme Corporation</span>
                      </div>
                    </div>
                    <span className="text-[8px] font-mono font-semibold text-(--color-accent-emerald-light) px-1.5 py-0.5 rounded-full bg-emerald-500/12 border border-emerald-500/25">
                      AKTİF
                    </span>
                  </div>

                  {/* 3 metric */}
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { label: "Kişi", value: 12 },
                      { label: "Açık Kayıt", value: 8 },
                      { label: "Varlık", value: 24 },
                    ].map((m, i) => (
                      <div key={i} className="rounded-md bg-white/3 border border-white/8 p-2 flex flex-col gap-0.5">
                        <span className="text-[7px] font-mono uppercase tracking-wider text-(--color-text-muted)">{m.label}</span>
                        <span className="text-base font-bold tracking-tight text-white">{m.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tab navigation mock */}
                  <div className="flex items-center gap-1 border-b border-white/8 pb-2">
                    {[
                      { label: "Kişiler", active: true, icon: Users },
                      { label: "Sözleşmeler", icon: FileSignature },
                      { label: "Varlıklar", icon: Briefcase },
                      { label: "Kayıtlar", icon: Bell },
                    ].map((t, i) => {
                      const Icon = t.icon;
                      return (
                        <div
                          key={i}
                          className={`flex items-center gap-1 px-2 py-1 rounded-md text-[9px] font-medium ${
                            t.active
                              ? "bg-blue-500/15 border border-blue-500/30 text-(--color-accent-blue-light)"
                              : "text-(--color-text-muted) border border-transparent"
                          }`}
                        >
                          <Icon className="w-2.5 h-2.5" />
                          <span>{t.label}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Contacts list */}
                  <div className="flex flex-col gap-1.5 flex-1 overflow-hidden">
                    {[
                      { name: "Mehmet Demir", role: "BT Müdürü", auth: "Yetkili Kullanıcı", tone: "purple" },
                      { name: "Ayşe Kaya", role: "Satın Alma", auth: "Grup Yetkilisi", tone: "blue" },
                      { name: "Can Yıldız", role: "Operasyon", auth: "Standart", tone: "emerald" },
                      { name: "Selin Arda", role: "Finans", auth: "Standart", tone: "emerald" },
                    ].map((c, i) => {
                      const tone: Record<string, string> = {
                        purple: "text-(--color-accent-purple-light) bg-purple-500/10 border-purple-500/20",
                        blue: "text-(--color-accent-blue-light) bg-blue-500/10 border-blue-500/20",
                        emerald: "text-(--color-accent-emerald-light) bg-emerald-500/10 border-emerald-500/20",
                      };
                      return (
                        <div key={i} className="grid grid-cols-[auto_1fr_auto_auto] gap-2 items-center px-2.5 py-1.5 rounded-lg bg-white/2 border border-white/5">
                          <div className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                            <span className="text-[7px] font-bold text-(--color-accent-blue-light)">{c.name.split(" ").map(s => s[0]).join("")}</span>
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-[10px] font-medium text-white truncate">{c.name}</span>
                            <span className="text-[8px] font-mono text-(--color-text-muted) truncate">{c.role}</span>
                          </div>
                          <span className={`text-[7px] font-mono font-semibold px-1.5 py-0.5 rounded-full border ${tone[c.tone]}`}>{c.auth}</span>
                          <Mail className="w-2.5 h-2.5 text-(--color-text-muted)" />
                        </div>
                      );
                    })}
                  </div>

                  {/* Yetkili teknisyen badge */}
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-500/8 border border-amber-500/25 mt-auto">
                    <ShieldCheck className="w-3 h-3 text-amber-300 shrink-0" />
                    <span className="text-[9px] font-medium text-white flex-1">Yetkili Teknisyen: Ahmet Y. (Premium uzman)</span>
                    <Crown className="w-2.5 h-2.5 text-amber-300" />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-(--color-accent-blue-light)">
                <UserSquare2 size={32} />
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

          {/* Feature 2: Sözleşme Yönetimi */}
          <motion.div
            animate="visible"
            variants={fadeUp}
            className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-emerald-500/5 to-cyan-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-emerald-500/10 blur-[50px] group-hover:bg-emerald-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full h-135 rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-(--color-surface-elevated-solid) flex flex-col p-5 gap-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/8">
                    <div className="flex items-center gap-1.5">
                      <FileSignature className="w-3.5 h-3.5 text-(--color-accent-emerald-light)" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white">Yeni Hizmet Seviyesi / OLA Sözleşmesi</span>
                    </div>
                    <span className="text-[8px] font-mono text-(--color-text-muted)">SLM ile entegre</span>
                  </div>

                  {/* Form fields */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col gap-1">
                      <span className="text-[8px] font-mono uppercase tracking-wider text-(--color-text-muted)">Müşteri Hesabı</span>
                      <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-white/3 border border-white/8">
                        <div className="flex items-center gap-1.5">
                          <Crown className="w-3 h-3 text-(--color-accent-purple-light)" />
                          <span className="text-[10px] text-white">Acme Corp</span>
                        </div>
                        <ChevronDown className="w-2.5 h-2.5 text-(--color-text-muted)" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[8px] font-mono uppercase tracking-wider text-(--color-text-muted)">Sözleşme Türü</span>
                      <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/25">
                        <span className="text-[10px] font-semibold text-(--color-accent-emerald-light)">Hizmet Seviyesi · Premium</span>
                        <ChevronDown className="w-2.5 h-2.5 text-(--color-text-muted)" />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-[8px] font-mono uppercase tracking-wider text-(--color-text-muted)">Sözleşme Adı</span>
                    <div className="px-2.5 py-1.5 rounded-lg bg-white/3 border border-white/8">
                      <span className="text-[10px] text-white">Acme Premium 7/24 Destek 2026</span>
                    </div>
                  </div>

                  {/* Date range */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col gap-1">
                      <span className="text-[8px] font-mono uppercase tracking-wider text-(--color-text-muted)">Başlangıç</span>
                      <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/3 border border-white/8">
                        <CalendarDays className="w-3 h-3 text-(--color-accent-blue-light)" />
                        <span className="text-[10px] font-mono text-white">12 Ara 2025</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[8px] font-mono uppercase tracking-wider text-(--color-text-muted)">Bitiş</span>
                      <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/3 border border-white/8">
                        <CalendarDays className="w-3 h-3 text-(--color-accent-blue-light)" />
                        <span className="text-[10px] font-mono text-white">12 Ara 2026</span>
                      </div>
                    </div>
                  </div>

                  {/* Notification rules */}
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[8px] font-mono uppercase tracking-wider text-(--color-text-muted)">Bilgilendirme Kuralları</span>
                    {[
                      { trigger: "Bitiş öncesi", days: "30 gün", target: "Müşteri + Yönetici", tone: "blue" },
                      { trigger: "Bitiş öncesi", days: "7 gün", target: "Tüm yetkililer + e-posta", tone: "amber" },
                      { trigger: "Bitiş sonrası", days: "1 gün", target: "Yenileme uyarısı", tone: "red" },
                    ].map((n, i) => {
                      const tone: Record<string, string> = {
                        blue: "text-(--color-accent-blue-light)",
                        amber: "text-amber-300",
                        red: "text-(--color-accent-red-light)",
                      };
                      return (
                        <div key={i} className="grid grid-cols-[auto_auto_1fr] gap-2 items-center px-2.5 py-1.5 rounded-md bg-white/2 border border-white/5">
                          <Bell className={`w-2.5 h-2.5 ${tone[n.tone]}`} />
                          <div className="flex flex-col">
                            <span className="text-[9px] font-medium text-white">{n.trigger}</span>
                            <span className={`text-[8px] font-mono font-bold ${tone[n.tone]}`}>{n.days}</span>
                          </div>
                          <span className="text-[9px] text-(--color-text-secondary) text-right truncate">{n.target}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Auto renewal toggle */}
                  <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/25 mt-auto">
                    <div className="flex items-center gap-1.5">
                      <Repeat className="w-3 h-3 text-(--color-accent-emerald-light)" />
                      <span className="text-[9px] font-semibold text-white">Otomatik Yenileme</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[8px] font-mono text-(--color-accent-emerald-light)">aktif</span>
                      <div className="w-6 h-3 rounded-full bg-emerald-500/40 border border-emerald-500/60 relative">
                        <div className="absolute right-0.5 top-0.5 w-2 h-2 rounded-full bg-(--color-accent-emerald-light)" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-(--color-accent-emerald-light)">
                <FileSignature size={32} />
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

          {/* Feature 3: Entegre Süreç (mock) */}
          <motion.div
            animate="visible"
            variants={fadeUp}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-purple-500/5 to-indigo-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-purple-500/10 blur-[50px] group-hover:bg-purple-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full h-135 rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-(--color-surface-elevated-solid) flex flex-col p-8 gap-3">
                  {/* Customer card */}
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] font-semibold uppercase tracking-widest text-(--color-text-muted)">
                      Entegre Müşteri Görünümü
                    </span>
                    <span className="text-[10px] font-mono text-(--color-accent-purple-light)">
                      tek panel
                    </span>
                  </div>

                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-linear-to-r from-purple-500/15 to-indigo-500/10 border border-purple-500/30">
                    <div className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-sm font-bold text-(--color-accent-purple-light)">
                      A
                    </div>
                    <div className="flex flex-col flex-1">
                      <span className="text-sm font-bold text-white">
                        Acme Holding A.Ş.
                      </span>
                      <span className="text-[10px] text-(--color-text-muted)">
                        Premium Müşteri · 3 sözleşme aktif
                      </span>
                    </div>
                  </div>

                  {/* Sozlesme */}
                  <div className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <div className="flex items-center gap-2">
                      <FileSignature className="w-3.5 h-3.5 text-(--color-accent-emerald-light)" />
                      <span className="text-[11px] font-semibold text-white">
                        Yıllık Bakım Sözleşmesi
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-(--color-accent-emerald-light)">
                      yenilemeye 47 gün
                    </span>
                  </div>

                  {/* Active records */}
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: "Olay", count: 3, tone: "blue" },
                      { label: "İstek", count: 12, tone: "cyan" },
                      { label: "Değişiklik", count: 1, tone: "orange" },
                    ].map((row, i) => (
                      <div
                        key={i}
                        className="rounded-lg bg-white/2 border border-white/5 p-2 flex flex-col gap-0.5"
                      >
                        <span className="text-[9px] font-medium uppercase tracking-wider text-(--color-text-muted)">
                          {row.label}
                        </span>
                        <span
                          className={`text-xl font-bold tracking-tight ${
                            row.tone === "blue"
                              ? "text-(--color-accent-blue-light)"
                              : row.tone === "cyan"
                                ? "text-(--color-accent-cyan-light)"
                                : "text-(--color-accent-orange-light)"
                          }`}
                        >
                          {row.count}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Recent interactions */}
                  <div className="flex flex-col gap-1.5 flex-1">
                    <span className="text-[9px] font-semibold uppercase tracking-widest text-(--color-text-muted) mb-1">
                      Son Etkileşimler
                    </span>
                    {[
                      {
                        icon: Mail,
                        text: "Yenileme teklifi gönderildi",
                        time: "2g önce",
                      },
                      {
                        icon: Phone,
                        text: "Telefon görüşmesi — kapsam genişletme",
                        time: "5g önce",
                      },
                      {
                        icon: CalendarDays,
                        text: "Yıllık review toplantısı planlandı",
                        time: "1h önce",
                      },
                    ].map((row, i) => {
                      const Icon = row.icon;
                      return (
                        <div
                          key={i}
                          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/2 border border-white/5"
                        >
                          <Icon className="w-3 h-3 text-(--color-accent-purple-light)" />
                          <span className="text-[10px] font-medium text-white flex-1">
                            {row.text}
                          </span>
                          <span className="text-[9px] font-mono text-(--color-text-muted)">
                            {row.time}
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
            {/* Bento 1 - Merkezi Yönetim (wide, mock unified) */}
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
              <div className="w-full md:w-1/2 h-45 md:h-full relative rounded-xl border border-white/10 overflow-hidden shadow-inner shrink-0 bg-(--color-surface-elevated-solid) group-hover:border-blue-500/40 transition-colors flex flex-col gap-2 p-4 justify-center">
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col items-center gap-1 px-3 py-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <UserSquare2 className="w-4 h-4 text-(--color-accent-blue-light)" />
                    <span className="text-[9px] font-semibold uppercase tracking-wider text-(--color-text-muted)">
                      Müşteri
                    </span>
                    <span className="text-base font-bold text-white">218</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 px-3 py-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <FileSignature className="w-4 h-4 text-(--color-accent-emerald-light)" />
                    <span className="text-[9px] font-semibold uppercase tracking-wider text-(--color-text-muted)">
                      Sözleşme
                    </span>
                    <span className="text-base font-bold text-white">124</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 px-3 py-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                    <Mail className="w-4 h-4 text-(--color-accent-cyan-light)" />
                    <span className="text-[9px] font-semibold uppercase tracking-wider text-(--color-text-muted)">
                      Etkileşim
                    </span>
                    <span className="text-base font-bold text-white">1.4K</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 px-3 py-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <Share2 className="w-4 h-4 text-(--color-accent-purple-light)" />
                    <span className="text-[9px] font-semibold uppercase tracking-wider text-(--color-text-muted)">
                      Talep
                    </span>
                    <span className="text-base font-bold text-white">372</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bento 2 - Otomatik bildirim (normal) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-(--color-accent-orange-light) flex items-center justify-center mb-6 shrink-0">
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
                  { name: "Acme Yıllık Bakım", days: 12, tone: "warn" },
                  { name: "Beta Lisans", days: 87, tone: "ok" },
                  { name: "Gamma Destek", days: 3, tone: "alert" },
                ].map((row, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/3 border border-white/5"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <Bell
                        className={`w-3.5 h-3.5 shrink-0 ${
                          row.tone === "alert"
                            ? "text-red-400"
                            : row.tone === "warn"
                              ? "text-(--color-accent-orange-light)"
                              : "text-(--color-accent-emerald-light)"
                        }`}
                      />
                      <span className="text-[10px] font-medium text-white truncate">
                        {row.name}
                      </span>
                    </div>
                    <span
                      className={`text-[10px] font-mono font-bold shrink-0 ml-2 ${
                        row.tone === "alert"
                          ? "text-red-400"
                          : row.tone === "warn"
                            ? "text-(--color-accent-orange-light)"
                            : "text-(--color-accent-emerald-light)"
                      }`}
                    >
                      {row.days}g
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bento 3 - Raporlama (normal) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-(--color-accent-cyan-light) flex items-center justify-center mb-6 shrink-0">
                <LineChart />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[2].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[2].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex items-end justify-between gap-2">
                {[55, 70, 45, 85, 62, 78, 88].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t bg-linear-to-t from-cyan-500/40 to-cyan-400/80 border border-cyan-500/30"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Bento 4 - Entegre talep akışı (wide) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 lg:col-span-2 row-span-1 rounded-4xl bg-linear-to-br from-purple-500/10 to-transparent border border-white/10 p-8 hover:bg-white/4 transition-colors relative overflow-hidden group flex flex-col md:flex-row gap-6 items-center"
            >
              <div className="w-full md:w-1/2 flex flex-col justify-center shrink-0">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-(--color-accent-purple-light) flex items-center justify-center mb-6">
                  <Share2 />
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
                  <UserSquare2 className="w-3.5 h-3.5 text-(--color-accent-purple-light)" />
                  <span className="text-[11px] font-semibold text-white">
                    Müşteri Kaydı
                  </span>
                </div>
                <div className="flex items-center gap-2 pl-5">
                  <div className="w-3 h-px bg-purple-500/40" />
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/3 border border-white/8 flex-1">
                    <FileSignature className="w-3.5 h-3.5 text-(--color-accent-emerald-light)" />
                    <span className="text-[11px] font-medium text-white">
                      Sözleşme & Hizmet Seviyesi
                    </span>
                    <span className="ml-auto text-[9px] font-mono text-(--color-text-muted)">
                      kapsam
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 pl-10">
                  <div className="w-3 h-px bg-emerald-500/40" />
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/3 border border-white/8 flex-1">
                    <Share2 className="w-3.5 h-3.5 text-(--color-accent-blue-light)" />
                    <span className="text-[11px] font-medium text-white">
                      IT Talebi
                    </span>
                    <span className="ml-auto text-[9px] font-mono text-(--color-text-muted)">
                      otomatik bağ
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bento 5 - Kim için ideal (normal) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 border border-white/10 bg-linear-to-br from-indigo-500/5 to-transparent rounded-4xl p-8 hover:bg-white/4 transition-colors flex flex-col overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-6 shrink-0">
                <Users />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[4].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[4].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-2 justify-center">
                {[
                  { icon: Briefcase, label: "Satış & Pazarlama" },
                  { icon: HeadphonesIcon, label: "BT Destek Ekipleri" },
                  { icon: Crown, label: "İşletme Yöneticileri" },
                ].map((row, i) => {
                  const Icon = row.icon;
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-white/3 border border-white/5"
                    >
                      <div className="w-7 h-7 rounded-lg bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center">
                        <Icon className="w-3.5 h-3.5 text-indigo-400" />
                      </div>
                      <span className="text-[11px] font-medium text-white">
                        {row.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Bento 6 - Güçlü ilişkiler (normal) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-(--color-accent-emerald-light) flex items-center justify-center mb-6 shrink-0">
                <ShieldCheck />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[5].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[5].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-2 justify-center">
                {[
                  { label: "Memnuniyet", value: "94%" },
                  { label: "Yenileme oranı", value: "88%" },
                  { label: "Hata payı", value: "−72%" },
                ].map((row, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/3 border border-white/5"
                  >
                    <span className="text-[11px] font-medium text-white">
                      {row.label}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-(--color-accent-emerald-light)">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3.5 SERVICE PLANS */}
      <section className="py-24 relative z-20 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-300 h-150 bg-purple-600/8 blur-[140px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-6 lg:px-12 w-full max-w-7xl relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
              <Wallet className="w-3.5 h-3.5 text-(--color-accent-purple-light)" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-(--color-accent-purple-light)">
                {data.servicePlans.badge}
              </span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-white mb-6">
              {data.servicePlans.titleLead}
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-400">
                {data.servicePlans.titleAccent}
              </span>
            </h2>
            <p className="text-(--color-text-secondary) text-lg font-light leading-relaxed">
              {data.servicePlans.description}
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
          >
            {data.servicePlans.highlights.map((h) => {
              const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
                Wallet, Calculator, Repeat, Clock, Tags, Sparkles,
              };
              const Icon = iconMap[h.icon] || Wallet;
              const t: Record<string, string> = {
                blue: "from-blue-500/15 to-blue-500/5 border-blue-500/25 text-(--color-accent-blue-light) shadow-[0_0_25px_rgba(59,130,246,0.12)]",
                emerald: "from-emerald-500/15 to-emerald-500/5 border-emerald-500/25 text-(--color-accent-emerald-light) shadow-[0_0_25px_rgba(16,185,129,0.12)]",
                purple: "from-purple-500/15 to-purple-500/5 border-purple-500/25 text-(--color-accent-purple-light) shadow-[0_0_25px_rgba(168,85,247,0.12)]",
                amber: "from-amber-500/15 to-amber-500/5 border-amber-500/25 text-amber-300 shadow-[0_0_25px_rgba(245,158,11,0.12)]",
                cyan: "from-cyan-500/15 to-cyan-500/5 border-cyan-500/25 text-(--color-accent-cyan-light) shadow-[0_0_25px_rgba(6,182,212,0.12)]",
                rose: "from-rose-500/15 to-rose-500/5 border-rose-500/25 text-rose-300 shadow-[0_0_25px_rgba(244,63,94,0.12)]",
              };
              return (
                <motion.div
                  key={h.id}
                  variants={fadeUp}
                  className={`rounded-3xl bg-linear-to-br ${t[h.tone]} border p-6 lg:p-7 flex flex-col gap-4 hover:-translate-y-1 transition-transform duration-300`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-tight">{h.title}</h3>
                  <p className="text-sm text-(--color-text-secondary) font-light leading-relaxed">{h.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 3.6 FAQ */}
      <section className="py-24 relative z-20">
        <div className="container mx-auto px-6 lg:px-12 w-full max-w-4xl">
          <div className="text-center mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
              <Users className="w-3.5 h-3.5 text-(--color-accent-blue-light)" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-(--color-accent-blue-light)">
                SRM Bilgi Bankası
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
                LayoutDashboard, UserSquare2, Users, FileSignature, ShieldCheck,
              };
              const Icon = iconMap[item.icon] || LayoutDashboard;
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
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

                <div className="relative z-10 w-full">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 mx-auto">
                    <Users className="w-4 h-4 text-(--color-accent-blue-light)" />
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-text-overline)">
                      Servis İlişkileri Yönetimi
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
                        Merkezi Yönetim
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                        <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-blue-base) shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                        Sözleşme Otomasyonu
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                        <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-purple-base) shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
                        IT Talep Entegrasyonu
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
