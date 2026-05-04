"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import {
  GitBranch,
  ArrowRight,
  CheckCircle2,
  Workflow,
  Filter,
  Network,
  Zap,
  Activity,
  Globe,
  Database,
  Bell,
  Plus,
  RefreshCw,
  GitPullRequest,
  Mail,
  UserCheck,
  Shuffle,
  Repeat,
  Code2,
  ChevronDown,
  ChevronRight,
  Search,
  Users,
  Clock,
  Send,
  Layers,
  Server,
  X,
  Play,
} from "lucide-react";
import data from "@/data/is-akisi-yonetimi.json";

export default function IsAkisiYonetimiPage() {
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
              <GitBranch size={14} />
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
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                  <Workflow className="w-5 h-5 text-(--color-accent-blue-light)" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-(--color-accent-blue-light)">
                    İş Akışı Tasarımcısı · No-code
                  </span>
                  <span className="text-lg lg:text-xl font-bold text-white tracking-tight">
                    Yönetici Onaylı Atama Akışı
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/3 border border-white/8">
                  <Play className="w-2.5 h-2.5 text-(--color-accent-emerald-light)" />
                  <span className="text-[9px] font-mono text-(--color-text-muted)">çalışıyor</span>
                </div>
                <span className="text-[10px] font-mono text-(--color-text-muted)">12 aktif workflow</span>
              </div>
            </div>

            {/* Visual workflow canvas — 8 step horizontal flow with branches */}
            <div className="rounded-2xl border border-white/10 bg-(--color-surface-elevated-solid) p-5 mb-5">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/8">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white">Akış Şeması · Sürükle-Bırak</span>
                <span className="text-[8px] font-mono text-(--color-text-muted)">8 adım · 2 dallanma</span>
              </div>

              {/* Step row */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {[
                  { icon: Play, label: "Tetikle", desc: "Kayıt oluşturuldu", tone: "emerald" },
                  { icon: RefreshCw, label: "Durum Ata", desc: "İlk durum", tone: "blue" },
                  { icon: UserCheck, label: "Yönetici Onayı", desc: "AD'den çek", tone: "purple" },
                  { icon: GitBranch, label: "Çatal", desc: "Onay/Red", tone: "amber" },
                  { icon: Users, label: "Teknisyen Ata", desc: "Otomatik atama", tone: "cyan" },
                  { icon: Bell, label: "Bildirim", desc: "Email + SMS", tone: "indigo" },
                  { icon: CheckCircle2, label: "Tamamla", desc: "Audit log", tone: "emerald" },
                ].map((s, i, arr) => {
                  const Icon = s.icon;
                  const t: Record<string, string> = {
                    emerald: "from-emerald-500/15 to-emerald-500/5 border-emerald-500/30 text-(--color-accent-emerald-light)",
                    blue: "from-blue-500/15 to-blue-500/5 border-blue-500/30 text-(--color-accent-blue-light)",
                    purple: "from-purple-500/15 to-purple-500/5 border-purple-500/30 text-(--color-accent-purple-light)",
                    amber: "from-amber-500/15 to-amber-500/5 border-amber-500/30 text-amber-300",
                    cyan: "from-cyan-500/15 to-cyan-500/5 border-cyan-500/30 text-(--color-accent-cyan-light)",
                    indigo: "from-indigo-500/15 to-indigo-500/5 border-indigo-500/30 text-indigo-300",
                  };
                  return (
                    <div key={i} className="flex items-center gap-2 shrink-0">
                      <div className={`rounded-xl bg-linear-to-br ${t[s.tone]} border p-2.5 flex flex-col items-center gap-1 min-w-22 shadow-[0_0_15px_rgba(59,130,246,0.08)]`}>
                        <Icon className="w-4 h-4" />
                        <span className="text-[9px] font-bold text-white whitespace-nowrap">{s.label}</span>
                        <span className="text-[7px] font-mono text-(--color-text-muted) text-center">{s.desc}</span>
                      </div>
                      {i < arr.length - 1 && (
                        <ChevronRight className="w-3 h-3 text-(--color-text-muted) shrink-0" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Branch sub-flow */}
              <div className="mt-3 pt-3 border-t border-white/8 flex items-center gap-2 flex-wrap">
                <span className="text-[8px] font-mono uppercase tracking-widest text-(--color-text-muted)">Çatal sonrası alt akış (Red →):</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[8px] font-medium px-2 py-0.5 rounded-md bg-red-500/12 border border-red-500/25 text-(--color-accent-red-light)">
                    <X className="w-2 h-2 inline mr-1" />
                    Red
                  </span>
                  <ChevronRight className="w-2.5 h-2.5 text-(--color-text-muted)" />
                  <span className="text-[8px] font-medium px-2 py-0.5 rounded-md bg-white/3 border border-white/8 text-(--color-text-secondary)">Sonlandır</span>
                  <ChevronRight className="w-2.5 h-2.5 text-(--color-text-muted)" />
                  <span className="text-[8px] font-medium px-2 py-0.5 rounded-md bg-white/3 border border-white/8 text-(--color-text-secondary)">Talep Sahibine Bildir</span>
                </div>
              </div>
            </div>

            {/* Bottom panels — palette + properties */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-4">
              <div className="rounded-2xl border border-white/10 bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-2">
                <div className="flex items-center justify-between pb-1.5 border-b border-white/8">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-white">Bileşen Paleti</span>
                  <Search className="w-2.5 h-2.5 text-(--color-text-muted)" />
                </div>
                {[
                  { icon: Play, label: "Tetikleyici", count: 6 },
                  { icon: Filter, label: "Koşul / Query", count: 4 },
                  { icon: UserCheck, label: "Onay", count: 3 },
                  { icon: Zap, label: "Aksiyon", count: 12 },
                  { icon: Globe, label: "Entegrasyon", count: 5 },
                ].map((p, i) => {
                  const Icon = p.icon;
                  return (
                    <div key={i} className="grid grid-cols-[auto_1fr_auto] gap-2 items-center px-2 py-1 rounded-md bg-white/2 border border-white/5 hover:bg-white/4 transition-colors">
                      <Icon className="w-3 h-3 text-(--color-accent-blue-light)" />
                      <span className="text-[9px] font-medium text-white">{p.label}</span>
                      <span className="text-[8px] font-mono text-(--color-text-muted)">{p.count}</span>
                    </div>
                  );
                })}
              </div>

              <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-2">
                <div className="flex items-center justify-between pb-1.5 border-b border-white/8">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-white">Aktif Workflow&apos;lar · Çalışma İstatistikleri</span>
                  <span className="text-[8px] font-mono font-bold text-(--color-accent-emerald-light) px-1.5 py-0.5 rounded-full bg-emerald-500/12 border border-emerald-500/25">12 aktif</span>
                </div>
                {[
                  { name: "İstek Onaylı Atama", runs: 1284, success: 96, tone: "emerald" },
                  { name: "Yüksek Öncelik Eskalasyon", runs: 142, success: 99, tone: "emerald" },
                  { name: "Değişiklik CAB Onayı", runs: 86, success: 92, tone: "emerald" },
                  { name: "TicketAutoAssignAction", runs: 4218, success: 98, tone: "emerald" },
                ].map((w, i) => (
                  <div key={i} className="grid grid-cols-[1fr_auto_auto] gap-2 items-center px-2 py-1.5 rounded-md bg-white/2 border border-white/5">
                    <span className="text-[10px] font-medium text-white truncate">{w.name}</span>
                    <span className="text-[9px] font-mono text-(--color-text-muted)">{w.runs.toLocaleString("tr-TR")} çalışma</span>
                    <span className="text-[10px] font-mono font-bold text-(--color-accent-emerald-light)">%{w.success}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-(--color-surface-base) to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* 2. ZIG-ZAG FEATURE BLOCKS */}
      <section className="py-24 relative z-20">
        <div className="container mx-auto px-6 lg:px-12 w-full max-w-7xl flex flex-col gap-32">
          {/* Feature 1: No-code & merkezi */}
          <motion.div
            animate="visible"
            variants={fadeUp}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-blue-500/5 to-cyan-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-blue-500/10 blur-[50px] group-hover:bg-blue-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full h-135 rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-(--color-surface-elevated-solid) flex flex-col p-5 gap-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/8">
                    <div className="flex items-center gap-1.5">
                      <Workflow className="w-3.5 h-3.5 text-(--color-accent-blue-light)" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white">Workflow Kütüphanesi</span>
                    </div>
                    <button className="flex items-center gap-1 px-2 py-1 rounded-md bg-blue-500/15 border border-blue-500/30 text-(--color-accent-blue-light)">
                      <Plus className="w-2.5 h-2.5" />
                      <span className="text-[8px] font-semibold">Yeni Workflow</span>
                    </button>
                  </div>

                  {/* Module filter chips */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <Filter className="w-2.5 h-2.5 text-(--color-text-muted)" />
                    {[
                      { label: "Tümü", count: 24, active: true },
                      { label: "İstek", count: 8 },
                      { label: "Değişiklik", count: 6 },
                      { label: "İyileştirme", count: 4 },
                      { label: "Olay", count: 6 },
                    ].map((c, i) => (
                      <span
                        key={i}
                        className={`text-[8px] font-medium px-1.5 py-0.5 rounded-full border ${
                          c.active
                            ? "bg-blue-500/15 border-blue-500/30 text-(--color-accent-blue-light)"
                            : "bg-white/3 border-white/8 text-(--color-text-muted)"
                        }`}
                      >
                        {c.label} <span className="font-mono">{c.count}</span>
                      </span>
                    ))}
                  </div>

                  {/* Table header */}
                  <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-2 px-2.5 py-1 text-[8px] font-semibold uppercase tracking-widest text-(--color-text-muted) bg-white/2 border border-white/5 rounded-md">
                    <span className="w-3.5">M</span>
                    <span>Workflow Adı</span>
                    <span>Trigger</span>
                    <span>Durum</span>
                    <span>Çalışma</span>
                  </div>

                  {/* Workflow rows */}
                  <div className="flex flex-col gap-1.5 flex-1 overflow-hidden">
                    {[
                      { module: "İSTEK", title: "Yönetici Onaylı Atama", trigger: "Kayıt oluştur", status: "aktif", runs: "1.284", mTone: "blue" },
                      { module: "İSTEK", title: "TicketAutoAssign · Round-Robin", trigger: "Kayıt oluştur", status: "aktif", runs: "4.218", mTone: "blue" },
                      { module: "DEĞİŞ.", title: "CAB Onayı (3-aşamalı)", trigger: "CR submit", status: "aktif", runs: "86", mTone: "amber" },
                      { module: "OLAY", title: "Yüksek Öncelik Eskalasyon", trigger: "Öncelik = Yüksek", status: "aktif", runs: "142", mTone: "red" },
                      { module: "İYİL.", title: "5 Soruluk Değerlendirme", trigger: "CI oluştur", status: "aktif", runs: "62", mTone: "purple" },
                      { module: "OLAY", title: "Otomatik KB Önerisi", trigger: "Açıklama doldur", status: "test", runs: "—", mTone: "red" },
                    ].map((r, i) => {
                      const mT: Record<string, string> = {
                        blue: "text-(--color-accent-blue-light) bg-blue-500/12 border-blue-500/25",
                        amber: "text-amber-300 bg-amber-500/12 border-amber-500/25",
                        red: "text-(--color-accent-red-light) bg-red-500/12 border-red-500/25",
                        purple: "text-(--color-accent-purple-light) bg-purple-500/12 border-purple-500/25",
                      };
                      const sT = r.status === "aktif" ? "text-(--color-accent-emerald-light) bg-emerald-500/10 border-emerald-500/20" : "text-amber-300 bg-amber-500/10 border-amber-500/20";
                      return (
                        <div key={i} className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-2 items-center px-2.5 py-1.5 rounded-lg bg-white/2 border border-white/5 hover:bg-white/4 transition-colors">
                          <span className={`text-[7px] font-mono font-bold px-1.5 py-0.5 rounded-full border ${mT[r.mTone]}`}>{r.module}</span>
                          <span className="text-[10px] font-medium text-white truncate">{r.title}</span>
                          <span className="text-[8px] font-mono text-(--color-text-muted)">{r.trigger}</span>
                          <span className={`text-[8px] font-mono font-semibold px-1.5 py-0.5 rounded-full border ${sT}`}>{r.status}</span>
                          <span className="text-[8px] font-mono text-(--color-text-secondary) w-12 text-right">{r.runs}</span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between pt-1.5 border-t border-white/8">
                    <span className="text-[8px] font-mono uppercase tracking-widest text-(--color-text-muted)">Toplam · No-code tasarım</span>
                    <span className="text-[8px] font-mono font-bold text-white">24 workflow · 6.792 çalışma</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-(--color-accent-blue-light)">
                <Workflow size={32} />
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

          {/* Feature 2: Koşul motoru */}
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
                      <Filter className="w-3.5 h-3.5 text-(--color-accent-emerald-light)" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white">Query Condition Builder</span>
                    </div>
                    <span className="text-[8px] font-mono text-(--color-accent-emerald-light) px-1.5 py-0.5 rounded-full bg-emerald-500/12 border border-emerald-500/25">
                      AND/OR · Çok Katmanlı
                    </span>
                  </div>

                  {/* Visual builder — AND/OR tree */}
                  <div className="rounded-xl border border-white/8 bg-white/2 p-3 flex flex-col gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[7px] font-mono font-bold text-(--color-accent-emerald-light) px-1.5 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30">VEYA</span>
                      <span className="text-[8px] font-mono text-(--color-text-muted)">aşağıdakilerden biri sağlanırsa</span>
                    </div>
                    <div className="pl-4 flex flex-col gap-1.5 border-l border-emerald-500/30">
                      {/* AND group 1 */}
                      <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-2 flex flex-col gap-1.5">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[7px] font-mono font-bold text-(--color-accent-blue-light) px-1.5 py-0.5 rounded-md bg-blue-500/15 border border-blue-500/30">VE</span>
                          <span className="text-[8px] font-mono text-(--color-text-muted)">grup 1</span>
                        </div>
                        <div className="grid grid-cols-[auto_auto_1fr] gap-1.5 items-center px-2 py-1 rounded-md bg-white/3 border border-white/5">
                          <span className="text-[8px] font-mono text-(--color-text-muted)">Öncelik</span>
                          <span className="text-[8px] font-mono text-(--color-accent-blue-light)">eşittir</span>
                          <span className="text-[8px] font-mono font-bold text-white">Yüksek</span>
                        </div>
                        <div className="grid grid-cols-[auto_auto_1fr] gap-1.5 items-center px-2 py-1 rounded-md bg-white/3 border border-white/5">
                          <span className="text-[8px] font-mono text-(--color-text-muted)">Kategori</span>
                          <span className="text-[8px] font-mono text-(--color-accent-blue-light)">içerir</span>
                          <span className="text-[8px] font-mono font-bold text-white">VPN</span>
                        </div>
                      </div>
                      {/* AND group 2 */}
                      <div className="rounded-lg border border-purple-500/20 bg-purple-500/5 p-2 flex flex-col gap-1.5">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[7px] font-mono font-bold text-(--color-accent-purple-light) px-1.5 py-0.5 rounded-md bg-purple-500/15 border border-purple-500/30">VE</span>
                          <span className="text-[8px] font-mono text-(--color-text-muted)">grup 2</span>
                        </div>
                        <div className="grid grid-cols-[auto_auto_1fr] gap-1.5 items-center px-2 py-1 rounded-md bg-white/3 border border-white/5">
                          <span className="text-[8px] font-mono text-(--color-text-muted)">Müşteri Tipi</span>
                          <span className="text-[8px] font-mono text-(--color-accent-purple-light)">eşittir</span>
                          <span className="text-[8px] font-mono font-bold text-white">Premium</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Script editor mock */}
                  <div className="flex-1 rounded-xl border border-white/8 bg-(--color-surface-base) p-3 flex flex-col gap-1 overflow-hidden">
                    <div className="flex items-center justify-between pb-1 border-b border-white/8">
                      <div className="flex items-center gap-1.5">
                        <Code2 className="w-3 h-3 text-(--color-accent-cyan-light)" />
                        <span className="text-[9px] font-bold uppercase tracking-widest text-white">Script Editor (JS / C#)</span>
                      </div>
                      <span className="text-[7px] font-mono text-(--color-text-muted)">script.js</span>
                    </div>
                    <pre className="text-[9px] font-mono text-(--color-text-secondary) leading-relaxed pt-1">
{`// kuruma özel kural
function shouldEscalate(record) {
  const tier = record.customer.tier;
  if (tier === "Premium" && record.priority > 2) {
    return { result: "True", action: "auto-assign-L3" };
  }
  return { result: "False" };
}`}
                    </pre>
                  </div>

                  {/* Result branches */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="rounded-md bg-emerald-500/10 border border-emerald-500/25 p-2 flex flex-col gap-0.5">
                      <span className="text-[7px] font-mono font-bold uppercase text-(--color-accent-emerald-light)">True</span>
                      <span className="text-[8px] text-white">Eskalasyon</span>
                    </div>
                    <div className="rounded-md bg-blue-500/10 border border-blue-500/25 p-2 flex flex-col gap-0.5">
                      <span className="text-[7px] font-mono font-bold uppercase text-(--color-accent-blue-light)">False</span>
                      <span className="text-[8px] text-white">Standart akış</span>
                    </div>
                    <div className="rounded-md bg-red-500/10 border border-red-500/25 p-2 flex flex-col gap-0.5">
                      <span className="text-[7px] font-mono font-bold uppercase text-(--color-accent-red-light)">Fail</span>
                      <span className="text-[8px] text-white">Alternatif aksiyon</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-(--color-accent-emerald-light)">
                <Filter size={32} />
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

          {/* Feature 3: Onay süreçleri */}
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
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-(--color-accent-purple-light)" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white">3-Aşamalı Onay Zinciri</span>
                    </div>
                    <span className="text-[8px] font-mono text-(--color-accent-purple-light) px-1.5 py-0.5 rounded-full bg-purple-500/12 border border-purple-500/25">
                      Sıralı · Çoklu Onaycı
                    </span>
                  </div>

                  {/* Approval chain */}
                  <div className="flex flex-col gap-2">
                    {[
                      { stage: "1", role: "Müdür", name: "Mehmet B.", channel: "Portal", status: "onayladı", time: "09:18", tone: "emerald" },
                      { stage: "2", role: "Direktör", name: "Selin K.", channel: "E-posta", status: "onayladı", time: "10:24", tone: "emerald" },
                      { stage: "3", role: "CFO", name: "Bora E.", channel: "Reply (e-posta)", status: "bekliyor", time: "—", tone: "amber" },
                    ].map((s, i, arr) => {
                      const tone: Record<string, string> = {
                        emerald: "border-emerald-500/30 bg-emerald-500/8 shadow-[0_0_15px_rgba(16,185,129,0.1)]",
                        amber: "border-amber-500/30 bg-amber-500/8 shadow-[0_0_15px_rgba(245,158,11,0.1)] animate-pulse",
                      };
                      const sIcon = s.status === "onayladı" ? CheckCircle2 : Clock;
                      const SIcon = sIcon;
                      const sTone = s.status === "onayladı" ? "text-(--color-accent-emerald-light)" : "text-amber-300";
                      return (
                        <div key={i}>
                          <div className={`rounded-xl border p-3 flex items-center gap-3 ${tone[s.tone]}`}>
                            <div className="w-9 h-9 rounded-full bg-blue-500/15 border border-blue-500/30 flex items-center justify-center shrink-0">
                              <span className="text-[10px] font-bold text-(--color-accent-blue-light)">{s.stage}</span>
                            </div>
                            <div className="flex flex-col flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-[8px] font-mono uppercase tracking-wider text-(--color-text-muted)">{s.role}</span>
                                <span className="text-[10px] font-bold text-white">{s.name}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Mail className="w-2.5 h-2.5 text-(--color-text-muted)" />
                                <span className="text-[8px] font-mono text-(--color-text-secondary)">{s.channel}</span>
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-0.5">
                              <SIcon className={`w-3.5 h-3.5 ${sTone}`} />
                              <span className={`text-[8px] font-mono font-bold uppercase ${sTone}`}>{s.status}</span>
                              <span className="text-[7px] font-mono text-(--color-text-muted)">{s.time}</span>
                            </div>
                          </div>
                          {i < arr.length - 1 && (
                            <div className="flex justify-center py-0.5">
                              <ChevronDown className="w-3 h-3 text-(--color-text-muted)" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Email reply mock */}
                  <div className="flex-1 rounded-xl border border-white/8 bg-(--color-surface-base) p-3 flex flex-col gap-2 overflow-hidden">
                    <div className="flex items-center justify-between pb-1 border-b border-white/8">
                      <div className="flex items-center gap-1.5">
                        <Mail className="w-3 h-3 text-(--color-accent-purple-light)" />
                        <span className="text-[8px] font-mono uppercase tracking-widest text-white">CFO E-postası — Yanıtla ile Onay</span>
                      </div>
                      <Send className="w-2.5 h-2.5 text-(--color-text-muted)" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[8px] font-mono text-(--color-text-muted)">Konu: [REQ-872] 32.500₺ donanım talebi onayınızı bekliyor</span>
                      <p className="text-[9px] text-(--color-text-secondary) leading-relaxed">
                        E-postaya <strong className="text-(--color-accent-emerald-light)">ONAY</strong> veya <strong className="text-(--color-accent-red-light)">RED</strong> yazarak yanıtlayın. Açıklama eklemeniz zorunludur. Onay timeline&apos;a otomatik düşer.
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 mt-auto">
                      <button className="flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-(--color-accent-emerald-light)">
                        <CheckCircle2 className="w-2.5 h-2.5" />
                        <span className="text-[8px] font-semibold">ONAY</span>
                      </button>
                      <button className="flex items-center gap-1 px-2 py-1 rounded-md bg-red-500/15 border border-red-500/30 text-(--color-accent-red-light)">
                        <X className="w-2.5 h-2.5" />
                        <span className="text-[8px] font-semibold">RED</span>
                      </button>
                      <span className="ml-auto text-[7px] font-mono text-(--color-text-muted)">açıklama zorunlu · timeline&apos;a düşer</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-(--color-accent-purple-light)">
                <CheckCircle2 size={32} />
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
            {/* Bento 1 - Akış kontrolü (wide, görselli) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 lg:col-span-2 row-span-1 rounded-4xl bg-linear-to-br from-blue-500/10 to-transparent border border-white/10 p-8 hover:bg-white/4 transition-colors relative overflow-hidden group flex flex-col md:flex-row gap-6 items-center"
            >
              <div className="w-full md:w-1/2 flex flex-col justify-center shrink-0">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-(--color-accent-blue-light) flex items-center justify-center mb-6">
                  <Network />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {data.bento.items[0].title}
                </h3>
                <p className="text-sm text-(--color-text-secondary) font-light pr-4">
                  {data.bento.items[0].description}
                </p>
              </div>
              <div className="w-full md:w-1/2 h-45 md:h-full relative rounded-xl border border-white/10 overflow-hidden shadow-inner shrink-0 bg-(--color-surface-elevated-solid) group-hover:border-blue-500/40 transition-colors p-4 flex flex-col gap-2">
                <div className="flex items-center justify-between pb-1.5 border-b border-white/8">
                  <div className="flex items-center gap-1.5">
                    <Network className="w-3 h-3 text-(--color-accent-blue-light)" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white">Fork & Join</span>
                  </div>
                  <span className="text-[8px] font-mono text-(--color-text-muted)">Wait All / Wait Any</span>
                </div>
                {/* Fork visual */}
                <div className="flex-1 flex flex-col justify-center gap-2">
                  <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-md bg-blue-500/12 border border-blue-500/30 self-center w-32">
                    <GitBranch className="w-2.5 h-2.5 text-(--color-accent-blue-light)" />
                    <span className="text-[9px] font-semibold text-white">Fork (3 kola)</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    {[
                      { label: "Onay Kolu", icon: UserCheck, tone: "purple" },
                      { label: "Atama Kolu", icon: Users, tone: "emerald" },
                      { label: "Bildirim Kolu", icon: Bell, tone: "amber" },
                    ].map((b, i) => {
                      const Icon = b.icon;
                      const t: Record<string, string> = {
                        purple: "bg-purple-500/12 border-purple-500/25 text-(--color-accent-purple-light)",
                        emerald: "bg-emerald-500/12 border-emerald-500/25 text-(--color-accent-emerald-light)",
                        amber: "bg-amber-500/12 border-amber-500/25 text-amber-300",
                      };
                      return (
                        <div key={i} className={`flex flex-col items-center gap-1 px-1 py-1.5 rounded-md border ${t[b.tone]}`}>
                          <Icon className="w-3 h-3" />
                          <span className="text-[7px] font-semibold text-white text-center leading-tight">{b.label}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-md bg-emerald-500/12 border border-emerald-500/30 self-center w-32">
                    <CheckCircle2 className="w-2.5 h-2.5 text-(--color-accent-emerald-light)" />
                    <span className="text-[9px] font-semibold text-white">Join · Wait All</span>
                  </div>
                </div>
                {/* Switch case footer */}
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/2 border border-white/5 mt-auto">
                  <Layers className="w-2.5 h-2.5 text-(--color-accent-cyan-light)" />
                  <span className="text-[8px] font-mono text-white">Switch-case · match-first</span>
                  <span className="ml-auto text-[7px] font-mono text-(--color-text-muted)">+ break + loop</span>
                </div>
              </div>
            </motion.div>

            {/* Bento 2 - Otomatik aksiyon (normal, görselli) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-(--color-accent-orange-light) flex items-center justify-center mb-6 shrink-0">
                <Zap />
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
                    <Zap className="w-3 h-3 text-(--color-accent-orange-light)" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white">Aksiyon Kütüphanesi</span>
                  </div>
                  <span className="text-[8px] font-mono font-bold text-(--color-accent-orange-light)">12</span>
                </div>
                {[
                  { icon: RefreshCw, label: "Durum Güncelle", count: 4 },
                  { icon: Users, label: "Teknisyen Ata (Round-Robin)", count: 8 },
                  { icon: CheckCircle2, label: "Ticket Kapat", count: 3 },
                  { icon: Bell, label: "Bildirim Gönder", count: 6 },
                  { icon: Database, label: "Alan/Field Değiştir", count: 12 },
                ].map((a, i) => {
                  const Icon = a.icon;
                  return (
                    <div key={i} className="grid grid-cols-[auto_1fr_auto] gap-2 items-center px-2 py-1.5 rounded-md bg-white/2 border border-white/5">
                      <Icon className="w-3 h-3 text-(--color-accent-orange-light)" />
                      <span className="text-[9px] font-medium text-white">{a.label}</span>
                      <span className="text-[7px] font-mono text-(--color-text-muted)">{a.count}x</span>
                    </div>
                  );
                })}
                <div className="mt-auto pt-1.5 border-t border-white/8 flex items-center gap-1.5">
                  <Shuffle className="w-2.5 h-2.5 text-(--color-text-muted)" />
                  <span className="text-[8px] font-mono text-(--color-text-muted)">Round-robin + Load balancing</span>
                </div>
              </div>
            </motion.div>

            {/* Bento 3 - İçerik tetikleyici (normal, mock) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-(--color-accent-cyan-light) flex items-center justify-center mb-6 shrink-0">
                <Activity />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[2].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[2].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-1.5 justify-center">
                {[
                  { icon: Plus, label: "Not eklendi" },
                  { icon: Mail, label: "E-posta eklendi" },
                  { icon: GitPullRequest, label: "Dosya yüklendi" },
                  { icon: RefreshCw, label: "Activity log güncellendi" },
                ].map((row, i) => {
                  const Icon = row.icon;
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/3 border border-white/5"
                    >
                      <Icon className="w-3 h-3 text-(--color-accent-cyan-light)" />
                      <span className="text-[10px] font-medium text-white flex-1">
                        {row.label}
                      </span>
                      <span className="text-[9px] font-mono text-(--color-text-muted)">
                        trigger
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Bento 4 - HTTP & subflow (wide, görselli) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 lg:col-span-2 row-span-1 rounded-4xl bg-linear-to-br from-purple-500/10 to-transparent border border-white/10 p-8 hover:bg-white/4 transition-colors relative overflow-hidden group flex flex-col md:flex-row gap-6 items-center"
            >
              <div className="w-full md:w-1/2 flex flex-col justify-center shrink-0">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-(--color-accent-purple-light) flex items-center justify-center mb-6">
                  <Globe />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {data.bento.items[3].title}
                </h3>
                <p className="text-sm text-(--color-text-secondary) font-light pr-4">
                  {data.bento.items[3].description}
                </p>
              </div>
              <div className="w-full md:w-1/2 h-45 md:h-full relative rounded-xl border border-white/10 overflow-hidden shadow-inner shrink-0 bg-(--color-surface-elevated-solid) group-hover:border-purple-500/40 transition-colors p-4 flex flex-col gap-2">
                <div className="flex items-center justify-between pb-1.5 border-b border-white/8">
                  <div className="flex items-center gap-1.5">
                    <Globe className="w-3 h-3 text-(--color-accent-purple-light)" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white">Entegrasyon Aksiyonları</span>
                  </div>
                  <span className="text-[8px] font-mono font-bold text-(--color-accent-purple-light) px-1.5 py-0.5 rounded-full bg-purple-500/12 border border-purple-500/25">
                    Custom HTTP
                  </span>
                </div>
                {/* HTTP request mock */}
                <div className="rounded-md bg-(--color-surface-base) border border-white/8 p-2 flex flex-col gap-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[7px] font-mono font-bold uppercase text-(--color-accent-emerald-light) px-1.5 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30">POST</span>
                    <span className="text-[8px] font-mono text-(--color-text-secondary) truncate">https://erp.api/v2/orders</span>
                  </div>
                  <pre className="text-[7px] font-mono text-(--color-text-muted) leading-tight">{`{
  "ticketId": "{{record.id}}",
  "amount": "{{record.cost}}"
}`}</pre>
                </div>
                {/* Other actions */}
                <div className="grid grid-cols-3 gap-1 mt-auto">
                  {[
                    { icon: Workflow, label: "Subflow", tone: "blue" },
                    { icon: Code2, label: "Run JS", tone: "cyan" },
                    { icon: Server, label: "Integration", tone: "amber" },
                  ].map((a, i) => {
                    const Icon = a.icon;
                    const t: Record<string, string> = {
                      blue: "bg-blue-500/12 border-blue-500/25 text-(--color-accent-blue-light)",
                      cyan: "bg-cyan-500/12 border-cyan-500/25 text-(--color-accent-cyan-light)",
                      amber: "bg-amber-500/12 border-amber-500/25 text-amber-300",
                    };
                    return (
                      <div key={i} className={`flex items-center gap-1 px-1.5 py-1 rounded-md border ${t[a.tone]}`}>
                        <Icon className="w-2.5 h-2.5" />
                        <span className="text-[8px] font-semibold text-white truncate">{a.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Bento 5 - Veri & görev (normal, mock) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 border border-white/10 bg-linear-to-br from-indigo-500/5 to-transparent rounded-4xl p-8 hover:bg-white/4 transition-colors flex flex-col overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-6 shrink-0">
                <Database />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[4].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[4].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-2 justify-center">
                {[
                  { label: "Custom field", op: "enable" },
                  { label: "Veri güncelle", op: "update" },
                  { label: "Metadata", op: "set" },
                  { label: "Görev oluştur", op: "create" },
                ].map((row, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/3 border border-white/5"
                  >
                    <span className="text-[10px] font-medium text-white">
                      {row.label}
                    </span>
                    <span className="text-[9px] font-mono text-indigo-400 px-1.5 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
                      {row.op}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bento 6 - Bildirim & audit (normal, görselli) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-(--color-accent-emerald-light) flex items-center justify-center mb-6 shrink-0">
                <Bell />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[5].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[5].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-3 flex flex-col gap-1.5">
                <div className="flex items-center justify-between pb-1.5 border-b border-white/8">
                  <div className="flex items-center gap-1.5">
                    <Bell className="w-3 h-3 text-(--color-accent-emerald-light)" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white">Audit Trail</span>
                  </div>
                  <span className="text-[8px] font-mono text-(--color-text-muted)">REQ-872 · 4 adım</span>
                </div>
                {[
                  { time: "09:14", icon: Play, action: "Akış başladı", actor: "Sistem", tone: "blue" },
                  { time: "09:15", icon: UserCheck, action: "Yönetici onayı gönderildi", actor: "→ Mehmet B.", tone: "purple" },
                  { time: "09:18", icon: CheckCircle2, action: "Onaylandı", actor: "Mehmet B.", tone: "emerald" },
                  { time: "09:18", icon: Send, action: "Bildirim · E-posta + SMS", actor: "→ Ahmet Y.", tone: "amber" },
                ].map((s, i) => {
                  const Icon = s.icon;
                  const tone: Record<string, string> = {
                    blue: "text-(--color-accent-blue-light)",
                    purple: "text-(--color-accent-purple-light)",
                    emerald: "text-(--color-accent-emerald-light)",
                    amber: "text-amber-300",
                  };
                  return (
                    <div key={i} className="grid grid-cols-[auto_auto_1fr_auto] gap-1.5 items-center px-2 py-1.5 rounded-md bg-white/2 border border-white/5">
                      <span className="text-[7px] font-mono text-(--color-text-muted) w-8">{s.time}</span>
                      <Icon className={`w-2.5 h-2.5 ${tone[s.tone]}`} />
                      <span className="text-[9px] font-medium text-white truncate">{s.action}</span>
                      <span className="text-[7px] font-mono text-(--color-text-secondary) truncate">{s.actor}</span>
                    </div>
                  );
                })}
                <div className="mt-auto pt-1.5 border-t border-white/8 flex items-center justify-between">
                  <span className="text-[8px] font-mono text-(--color-text-muted)">Email + SMS + Teams</span>
                  <span className="text-[8px] font-mono font-bold text-(--color-accent-emerald-light)">tüm adımlar loglu</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3.5 SCENARIOS — 3 örnek senaryo */}
      <section className="py-24 relative z-20 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-300 h-150 bg-blue-600/8 blur-[140px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-6 lg:px-12 w-full max-w-7xl relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
              <Workflow className="w-3.5 h-3.5 text-(--color-accent-blue-light)" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-(--color-accent-blue-light)">
                {data.scenarios.badge}
              </span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-white mb-6">
              {data.scenarios.titleLead}
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">
                {data.scenarios.titleAccent}
              </span>
            </h2>
            <p className="text-(--color-text-secondary) text-lg font-light leading-relaxed">
              {data.scenarios.description}
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6"
          >
            {data.scenarios.items.map((s) => {
              const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
                UserCheck, Shuffle, Repeat,
              };
              const Icon = iconMap[s.icon] || Workflow;
              const t: Record<string, { card: string; icon: string; chip: string }> = {
                blue: {
                  card: "from-blue-500/12 to-blue-500/3 border-blue-500/25 shadow-[0_0_25px_rgba(59,130,246,0.1)]",
                  icon: "bg-blue-500/20 border-blue-500/35 text-(--color-accent-blue-light)",
                  chip: "bg-blue-500/15 border-blue-500/30 text-(--color-accent-blue-light)",
                },
                purple: {
                  card: "from-purple-500/12 to-purple-500/3 border-purple-500/25 shadow-[0_0_25px_rgba(168,85,247,0.1)]",
                  icon: "bg-purple-500/20 border-purple-500/35 text-(--color-accent-purple-light)",
                  chip: "bg-purple-500/15 border-purple-500/30 text-(--color-accent-purple-light)",
                },
                emerald: {
                  card: "from-emerald-500/12 to-emerald-500/3 border-emerald-500/25 shadow-[0_0_25px_rgba(16,185,129,0.1)]",
                  icon: "bg-emerald-500/20 border-emerald-500/35 text-(--color-accent-emerald-light)",
                  chip: "bg-emerald-500/15 border-emerald-500/30 text-(--color-accent-emerald-light)",
                },
              };
              const tone = t[s.tone];
              return (
                <motion.div
                  key={s.id}
                  variants={fadeUp}
                  className={`rounded-3xl bg-linear-to-br ${tone.card} border p-6 flex flex-col gap-4`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0 ${tone.icon}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col gap-1 flex-1 min-w-0">
                      <h3 className="text-base lg:text-lg font-bold text-white tracking-tight leading-tight">{s.title}</h3>
                      <span className="text-[11px] text-(--color-text-muted) font-light">{s.subtitle}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    {s.steps.map((step, j, arr) => (
                      <div key={j} className="flex items-start gap-2">
                        <div className="flex flex-col items-center pt-0.5">
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${tone.chip}`}>
                            <span className="text-[8px] font-mono font-bold text-white">{j + 1}</span>
                          </div>
                          {j < arr.length - 1 && <div className="w-px flex-1 mt-0.5 bg-white/10 min-h-2.5" />}
                        </div>
                        <div className="flex-1 min-w-0 pb-1.5">
                          <span className="text-[10px] font-semibold text-white block">{step.label}</span>
                          <span className="text-[9px] text-(--color-text-muted) font-light leading-relaxed">{step.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
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
              <Workflow className="w-3.5 h-3.5 text-(--color-accent-blue-light)" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-(--color-accent-blue-light)">
                İş Akışı Bilgi Bankası
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
                Workflow, CheckCircle2, Network, Shuffle, Code2,
              };
              const Icon = iconMap[item.icon] || Workflow;
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
                    <GitBranch className="w-4 h-4 text-(--color-accent-blue-light)" />
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-text-overline)">
                      İş Akışı Yönetimi
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
                        No-Code
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                        <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-blue-base) shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                        Query Condition
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                        <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-purple-base) shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
                        Fork & Join
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
