"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import {
  Code,
  ArrowRight,
  CheckCircle2,
  MousePointer2,
  RefreshCw,
  Share2,
  ClipboardList,
  BookOpen,
  Zap,
  Filter,
  GitBranch,
  Type,
  Hash,
  Calendar,
  ListChecks,
  Paperclip,
  ToggleRight,
  ChevronRight,
  ChevronDown,
  LayoutGrid,
  Sliders,
  FileText,
  Palette,
  Layers,
  Users,
  Wallet,
  Server,
  Sparkles,
  Plus,
  Code2,
  Search,
  Settings,
} from "lucide-react";
import data from "@/data/low-code-gelistirme.json";
import PrivacyContact from "@/components/ui/privacy-contact";

export default function LowCodeGelistirmePage() {
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
              <Code size={14} />
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
                  <Code2 className="w-5 h-5 text-(--color-accent-blue-light)" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-(--color-accent-blue-light)">
                    Low-Code Form Tasarımcısı
                  </span>
                  <span className="text-lg lg:text-xl font-bold text-white tracking-tight">
                    Donanım Talebi Formu
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1 px-2 py-1 rounded-md bg-white/3 border border-white/8">
                  <RefreshCw className="w-2.5 h-2.5 text-(--color-text-muted)" />
                  <span className="text-[9px] font-mono text-(--color-text-muted)">taslak</span>
                </button>
                <button className="flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-(--color-accent-emerald-light)">
                  <CheckCircle2 className="w-2.5 h-2.5" />
                  <span className="text-[9px] font-semibold">Yayınla</span>
                </button>
              </div>
            </div>

            {/* 3-panel layout: Components | Canvas | Properties */}
            <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr_220px] gap-3 lg:gap-4 mb-5">
              {/* Left — Components palette */}
              <div className="rounded-2xl border border-white/10 bg-(--color-surface-elevated-solid) p-3 flex flex-col gap-1.5">
                <div className="flex items-center justify-between pb-1.5 border-b border-white/8">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-white">Bileşenler</span>
                  <Search className="w-2.5 h-2.5 text-(--color-text-muted)" />
                </div>
                {[
                  { icon: Type, label: "Metin", tone: "blue" },
                  { icon: Hash, label: "Sayı", tone: "cyan" },
                  { icon: ListChecks, label: "Seçim Listesi", tone: "purple" },
                  { icon: Calendar, label: "Tarih", tone: "amber" },
                  { icon: ToggleRight, label: "Onay Kutusu", tone: "emerald" },
                  { icon: Paperclip, label: "Dosya", tone: "rose" },
                ].map((c, i) => {
                  const Icon = c.icon;
                  const t: Record<string, string> = {
                    blue: "text-(--color-accent-blue-light)",
                    cyan: "text-(--color-accent-cyan-light)",
                    purple: "text-(--color-accent-purple-light)",
                    amber: "text-amber-300",
                    emerald: "text-(--color-accent-emerald-light)",
                    rose: "text-rose-300",
                  };
                  return (
                    <div key={i} className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-white/2 border border-white/5 hover:bg-white/4 cursor-grab transition-colors">
                      <Icon className={`w-3 h-3 ${t[c.tone]}`} />
                      <span className="text-[9px] font-medium text-white">{c.label}</span>
                      <span className="ml-auto text-[7px] font-mono text-(--color-text-muted)">⋮⋮</span>
                    </div>
                  );
                })}
              </div>

              {/* Middle — Form canvas */}
              <div className="rounded-2xl border border-white/10 bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between pb-1.5 border-b border-white/8">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-white">Form Önizleme</span>
                  <span className="text-[8px] font-mono text-(--color-text-muted)">5 alan · 1 koşul</span>
                </div>
                {/* Form preview */}
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-medium text-(--color-text-muted)">Talep Tipi <span className="text-(--color-accent-red-light)">*</span></span>
                    <div className="flex items-center justify-between px-2.5 py-1.5 rounded-md bg-white/3 border border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
                      <span className="text-[10px] text-white">Donanım</span>
                      <ChevronDown className="w-2.5 h-2.5 text-(--color-text-muted)" />
                    </div>
                    <span className="text-[7px] font-mono text-(--color-accent-blue-light)">▸ seçildi · özellikler sağda</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-medium text-(--color-text-muted)">Açıklama <span className="text-(--color-accent-red-light)">*</span></span>
                    <div className="px-2.5 py-2 rounded-md bg-white/3 border border-white/8 min-h-7">
                      <span className="text-[9px] text-(--color-text-muted)">Talebinizi açıklayın…</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-medium text-(--color-text-muted)">Aciliyet</span>
                      <div className="flex items-center justify-between px-2 py-1 rounded-md bg-white/3 border border-white/8">
                        <span className="text-[9px] text-white">Orta</span>
                        <ChevronDown className="w-2 h-2 text-(--color-text-muted)" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-medium text-(--color-text-muted)">Lokasyon</span>
                      <div className="flex items-center justify-between px-2 py-1 rounded-md bg-white/3 border border-white/8">
                        <span className="text-[9px] text-white">İstanbul HQ</span>
                        <ChevronDown className="w-2 h-2 text-(--color-text-muted)" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-md border border-dashed border-white/15 bg-white/2">
                    <Paperclip className="w-2.5 h-2.5 text-(--color-text-muted)" />
                    <span className="text-[9px] text-(--color-text-muted) flex-1">Dosya ekle (opsiyonel)</span>
                  </div>
                  {/* Conditional indicator */}
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-purple-500/10 border border-purple-500/25">
                    <GitBranch className="w-2.5 h-2.5 text-(--color-accent-purple-light)" />
                    <span className="text-[8px] font-mono text-(--color-text-muted)">Koşullu Görünürlük:</span>
                    <span className="text-[8px] font-medium text-white">Talep Tipi = &quot;Erişim&quot; → IP/Sistem alanları gösterilir</span>
                  </div>
                </div>
              </div>

              {/* Right — Properties */}
              <div className="rounded-2xl border border-white/10 bg-(--color-surface-elevated-solid) p-3 flex flex-col gap-2">
                <div className="flex items-center justify-between pb-1.5 border-b border-white/8">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-white">Bileşen Ayarları</span>
                  <Sliders className="w-2.5 h-2.5 text-(--color-text-muted)" />
                </div>
                <span className="text-[8px] font-mono uppercase tracking-wider text-(--color-accent-blue-light)">▸ Talep Tipi seçili</span>
                {[
                  { label: "İsim", value: "request_type" },
                  { label: "Etiket", value: "Talep Tipi" },
                  { label: "Tip", value: "Açılır Liste" },
                  { label: "Zorunlu", value: "Evet ✓" },
                  { label: "Varsayılan", value: "—" },
                  { label: "Genişlik", value: "100%" },
                ].map((p, i) => (
                  <div key={i} className="grid grid-cols-2 gap-1 items-center px-1.5 py-1 rounded-md bg-white/2 border border-white/5">
                    <span className="text-[8px] font-medium text-(--color-text-muted)">{p.label}</span>
                    <span className="text-[9px] font-mono text-white truncate text-right">{p.value}</span>
                  </div>
                ))}
                <div className="mt-auto pt-1.5 border-t border-white/8 flex items-center gap-1.5">
                  <GitBranch className="w-2.5 h-2.5 text-(--color-accent-purple-light)" />
                  <span className="text-[8px] font-mono text-(--color-text-muted) flex-1">Reactions</span>
                  <span className="text-[8px] font-mono font-bold text-(--color-accent-purple-light)">2 aktif</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="rounded-2xl border border-white/10 bg-(--color-surface-elevated-solid) p-3 flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-1.5">
                <MousePointer2 className="w-3 h-3 text-(--color-accent-blue-light)" />
                <span className="text-[9px] font-mono uppercase tracking-widest text-white">Sürükle-Bırak Tasarım</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Filter className="w-2.5 h-2.5 text-(--color-text-muted)" />
                <span className="text-[8px] font-mono text-(--color-text-muted)">Koşullu görünürlük + doğrulama + dinamik mantık</span>
              </div>
              <span className="text-[8px] font-mono text-(--color-accent-emerald-light)">● gerçek zamanlı önizleme</span>
            </div>

            <div className="absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-(--color-surface-base) to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* 2. ZIG-ZAG FEATURE BLOCKS */}
      <section className="py-24 relative z-20">
        <div className="container mx-auto px-6 lg:px-12 w-full max-w-7xl flex flex-col gap-32">
          {/* Feature 1: Tasarım araçları */}
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
                      <MousePointer2 className="w-3.5 h-3.5 text-(--color-accent-blue-light)" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white">Sürükle-Bırak Tasarım</span>
                    </div>
                    <span className="text-[8px] font-mono text-(--color-text-muted) px-1.5 py-0.5 rounded-full bg-blue-500/12 border border-blue-500/25">
                      No-code · 0 satır kod
                    </span>
                  </div>

                  {/* Drag interaction visualization */}
                  <div className="rounded-xl bg-(--color-surface-base) border border-white/8 p-3 flex flex-col gap-2">
                    <span className="text-[8px] font-mono uppercase tracking-wider text-(--color-text-muted)">Bileşen Paleti → Form Alanı</span>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { icon: Type, label: "Metin", drag: true, tone: "blue" },
                        { icon: Hash, label: "Sayı", tone: "cyan" },
                        { icon: ListChecks, label: "Liste", tone: "purple" },
                        { icon: Calendar, label: "Tarih", tone: "amber" },
                        { icon: ToggleRight, label: "Onay", tone: "emerald" },
                        { icon: Paperclip, label: "Dosya", tone: "rose" },
                      ].map((c, i) => {
                        const Icon = c.icon;
                        const t: Record<string, string> = {
                          blue: "bg-blue-500/15 border-blue-500/30 text-(--color-accent-blue-light)",
                          cyan: "bg-cyan-500/15 border-cyan-500/30 text-(--color-accent-cyan-light)",
                          purple: "bg-purple-500/15 border-purple-500/30 text-(--color-accent-purple-light)",
                          amber: "bg-amber-500/15 border-amber-500/30 text-amber-300",
                          emerald: "bg-emerald-500/15 border-emerald-500/30 text-(--color-accent-emerald-light)",
                          rose: "bg-rose-500/15 border-rose-500/30 text-rose-300",
                        };
                        return (
                          <div key={i} className={`rounded-md border p-2 flex flex-col items-center gap-1 ${t[c.tone]} ${c.drag ? "ring-2 ring-blue-500/40 cursor-grabbing -translate-y-0.5" : ""}`}>
                            <Icon className="w-3 h-3" />
                            <span className="text-[8px] font-semibold text-white">{c.label}</span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex items-center justify-center gap-1.5 py-0.5">
                      <ChevronDown className="w-3 h-3 text-(--color-accent-blue-light)" />
                      <span className="text-[8px] font-mono uppercase text-(--color-accent-blue-light)">sürükle-bırak</span>
                    </div>
                  </div>

                  {/* Properties detail */}
                  <div className="flex flex-col gap-1.5 flex-1">
                    <span className="text-[8px] font-mono uppercase tracking-wider text-(--color-text-muted)">Bileşen Özellikleri · Detay Yapılandırma</span>
                    {[
                      { icon: Settings, label: "Doğrulama Kuralları", value: "regex + min/max + zorunlu", tone: "blue" },
                      { icon: GitBranch, label: "Reactions", value: "alanlar arası koşullu ilişki", tone: "purple" },
                      { icon: Palette, label: "Dekorasyon", value: "tooltip · ikon · renk · gölge", tone: "amber" },
                      { icon: Layers, label: "Stil Ayarları", value: "margin · padding · border · opacity", tone: "emerald" },
                    ].map((p, i) => {
                      const Icon = p.icon;
                      const t: Record<string, string> = {
                        blue: "text-(--color-accent-blue-light)",
                        purple: "text-(--color-accent-purple-light)",
                        amber: "text-amber-300",
                        emerald: "text-(--color-accent-emerald-light)",
                      };
                      return (
                        <div key={i} className="grid grid-cols-[auto_1fr_auto] gap-2 items-center px-2.5 py-1.5 rounded-md bg-white/2 border border-white/5">
                          <Icon className={`w-3 h-3 ${t[p.tone]}`} />
                          <span className="text-[10px] font-medium text-white">{p.label}</span>
                          <span className="text-[8px] font-mono text-(--color-text-muted) text-right truncate max-w-32">{p.value}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-1.5 border-t border-white/8">
                    <span className="text-[8px] font-mono uppercase tracking-widest text-(--color-text-muted)">İş analisti & süreç sahibi</span>
                    <span className="text-[8px] font-mono font-bold text-(--color-accent-emerald-light)">doğrudan üretici</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-(--color-accent-blue-light)">
                <MousePointer2 size={32} />
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
              <div className="flex flex-wrap gap-2 pt-2">
                {[
                  { icon: Type, label: "Metin" },
                  { icon: Hash, label: "Sayı" },
                  { icon: ListChecks, label: "Seçim" },
                  { icon: Calendar, label: "Tarih" },
                  { icon: Paperclip, label: "Dosya" },
                  { icon: ToggleRight, label: "Anahtar" },
                ].map((tag, i) => {
                  const Icon = tag.icon;
                  return (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 text-[10px] font-medium px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-(--color-accent-blue-light)"
                    >
                      <Icon className="w-3 h-3" />
                      {tag.label}
                    </span>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Feature 2: Gerçek zamanlı özelleştirme (mock taslak/yayın) */}
          <motion.div
            animate="visible"
            variants={fadeUp}
            className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-emerald-500/5 to-cyan-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-emerald-500/10 blur-[50px] group-hover:bg-emerald-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full h-135 rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-(--color-surface-elevated-solid) flex flex-col p-8 gap-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] font-semibold uppercase tracking-widest text-(--color-text-muted)">
                      Form Versiyon Akışı
                    </span>
                    <span className="text-[10px] font-mono text-(--color-accent-emerald-light)">
                      anlık yayın
                    </span>
                  </div>

                  {[
                    {
                      v: "v1.0",
                      label: "İlk yayın",
                      date: "12 Mar",
                      status: "Yayında",
                      tone: "emerald",
                    },
                    {
                      v: "v1.1",
                      label: "Lokasyon alanı eklendi",
                      date: "21 Mar",
                      status: "Yayında",
                      tone: "emerald",
                    },
                    {
                      v: "v1.2",
                      label: "Aciliyet seçim listesi",
                      date: "08 Nis",
                      status: "Yayında",
                      tone: "emerald",
                    },
                    {
                      v: "v1.3",
                      label: "Maliyet alanı zorunlu",
                      date: "Bugün",
                      status: "Taslak",
                      tone: "orange",
                    },
                  ].map((row, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/3 border border-white/8"
                    >
                      <span
                        className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded shrink-0 w-12 text-center ${
                          row.tone === "emerald"
                            ? "bg-emerald-500/15 border border-emerald-500/30 text-(--color-accent-emerald-light)"
                            : "bg-orange-500/15 border border-orange-500/30 text-(--color-accent-orange-light)"
                        }`}
                      >
                        {row.v}
                      </span>
                      <div className="flex flex-col flex-1 min-w-0">
                        <span className="text-[10px] font-semibold text-white truncate">
                          {row.label}
                        </span>
                        <span className="text-[9px] text-(--color-text-muted)">
                          {row.date}
                        </span>
                      </div>
                      <span
                        className={`text-[9px] font-mono shrink-0 ${
                          row.tone === "emerald"
                            ? "text-(--color-accent-emerald-light)"
                            : "text-(--color-accent-orange-light)"
                        }`}
                      >
                        {row.status}
                      </span>
                    </div>
                  ))}

                  <button className="mt-auto rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-(--color-accent-emerald-light) text-[10px] font-semibold py-2 cursor-pointer">
                    Yayınla
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-(--color-accent-emerald-light)">
                <RefreshCw size={32} />
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

          {/* Feature 3: Entegrasyon (mock akış) */}
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
                      Form Veri Akışı
                    </span>
                    <span className="text-[10px] font-mono text-(--color-accent-purple-light)">
                      REST API
                    </span>
                  </div>

                  <div className="flex items-center gap-2 px-3 py-3 rounded-xl bg-linear-to-r from-purple-500/15 to-indigo-500/10 border border-purple-500/30">
                    <ClipboardList className="w-4 h-4 text-(--color-accent-purple-light)" />
                    <div className="flex flex-col flex-1">
                      <span className="text-[10px] font-bold text-white">
                        Memnuniyet Anketi
                      </span>
                      <span className="text-[9px] text-(--color-text-muted)">
                        342 yanıt · Bugün
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center my-1">
                    <div className="w-px h-4 bg-purple-500/40" />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: "ServiceCore", color: "blue" },
                      { label: "CRM", color: "orange" },
                      { label: "BI", color: "emerald" },
                    ].map((row, i) => (
                      <div
                        key={i}
                        className={`flex flex-col items-center gap-1 px-3 py-3 rounded-lg border ${
                          row.color === "blue"
                            ? "bg-blue-500/10 border-blue-500/20"
                            : row.color === "orange"
                              ? "bg-orange-500/10 border-orange-500/20"
                              : "bg-emerald-500/10 border-emerald-500/20"
                        }`}
                      >
                        <Share2
                          className={`w-3.5 h-3.5 ${
                            row.color === "blue"
                              ? "text-(--color-accent-blue-light)"
                              : row.color === "orange"
                                ? "text-(--color-accent-orange-light)"
                                : "text-(--color-accent-emerald-light)"
                          }`}
                        />
                        <span className="text-[9px] font-semibold text-white">
                          {row.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto pt-2 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[10px] font-medium text-(--color-text-muted)">
                      Akan veri
                    </span>
                    <span className="text-[10px] font-mono font-semibold text-(--color-accent-purple-light)">
                      gerçek zamanlı
                    </span>
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
            {/* Bento 1 - Veri toplama (wide, mock) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 lg:col-span-2 row-span-1 rounded-4xl bg-linear-to-br from-blue-500/10 to-transparent border border-white/10 p-8 hover:bg-white/4 transition-colors relative overflow-hidden group flex flex-col md:flex-row gap-6 items-center"
            >
              <div className="w-full md:w-1/2 flex flex-col justify-center shrink-0">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-(--color-accent-blue-light) flex items-center justify-center mb-6">
                  <ClipboardList />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {data.bento.items[0].title}
                </h3>
                <p className="text-sm text-(--color-text-secondary) font-light pr-4">
                  {data.bento.items[0].description}
                </p>
              </div>
              <div className="w-full md:w-1/2 h-45 md:h-full relative rounded-xl border border-white/10 overflow-hidden shadow-inner shrink-0 bg-(--color-surface-elevated-solid) group-hover:border-blue-500/40 transition-colors flex flex-col gap-2 p-4 justify-center">
                <span className="text-[9px] font-semibold uppercase tracking-widest text-(--color-text-muted) mb-1">
                  Bugünkü Yanıtlar
                </span>
                {[
                  { form: "Memnuniyet Anketi", count: 342 },
                  { form: "Çalışan Geri Bildirimi", count: 86 },
                  { form: "Tedarikçi Değerlendirme", count: 24 },
                ].map((row, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/3 border border-white/5"
                  >
                    <div className="flex items-center gap-2">
                      <ClipboardList className="w-3 h-3 text-(--color-accent-blue-light)" />
                      <span className="text-[10px] font-medium text-white">
                        {row.form}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-(--color-accent-blue-light)">
                      {row.count}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bento 2 - Onay / talep (normal, mock) */}
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
                  <div className="w-9 h-9 rounded-lg bg-orange-500/15 border border-orange-500/30 flex items-center justify-center">
                    <ClipboardList className="w-4 h-4 text-(--color-accent-orange-light)" />
                  </div>
                  <span className="text-[9px] font-medium text-(--color-text-secondary)">
                    Form
                  </span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-(--color-text-muted)" />
                <div className="flex flex-col items-center gap-1.5 flex-1">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-(--color-accent-emerald-light)" />
                  </div>
                  <span className="text-[9px] font-medium text-(--color-text-secondary)">
                    Onay
                  </span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-(--color-text-muted)" />
                <div className="flex flex-col items-center gap-1.5 flex-1">
                  <div className="w-9 h-9 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-(--color-accent-cyan-light)" />
                  </div>
                  <span className="text-[9px] font-medium text-(--color-text-secondary)">
                    Aksiyon
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Bento 3 - Eğitim & geri bildirim (normal, mock yıldız) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-(--color-accent-cyan-light) flex items-center justify-center mb-6 shrink-0">
                <BookOpen />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[2].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[2].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-2 justify-center">
                {[
                  { q: "İçerik kalitesi", r: 5 },
                  { q: "Eğitmen", r: 4 },
                  { q: "Süre", r: 3 },
                ].map((row, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/3 border border-white/5"
                  >
                    <span className="text-[10px] font-medium text-white">
                      {row.q}
                    </span>
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <div
                          key={s}
                          className={`w-1.5 h-1.5 rounded-full ${
                            s <= row.r
                              ? "bg-(--color-accent-cyan-light)"
                              : "bg-white/10"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bento 4 - Hızlı uygulama, esneklik, düşük maliyet (wide, mock kpi) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 lg:col-span-2 row-span-1 rounded-4xl bg-linear-to-br from-purple-500/10 to-transparent border border-white/10 p-8 hover:bg-white/4 transition-colors relative overflow-hidden group flex flex-col md:flex-row gap-6 items-center"
            >
              <div className="w-full md:w-1/2 flex flex-col justify-center shrink-0">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-(--color-accent-purple-light) flex items-center justify-center mb-6">
                  <Zap />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {data.bento.items[3].title}
                </h3>
                <p className="text-sm text-(--color-text-secondary) font-light pr-4">
                  {data.bento.items[3].description}
                </p>
              </div>
              <div className="w-full md:w-1/2 h-45 md:h-full relative rounded-xl border border-white/10 overflow-hidden shadow-inner shrink-0 bg-(--color-surface-elevated-solid) group-hover:border-purple-500/40 transition-colors p-4 grid grid-cols-3 gap-2 content-center">
                {[
                  { label: "Form süresi", value: "−85%", tone: "purple" },
                  { label: "Maliyet", value: "−60%", tone: "emerald" },
                  { label: "Esneklik", value: "x10", tone: "blue" },
                ].map((row, i) => (
                  <div
                    key={i}
                    className={`flex flex-col items-center gap-1 px-2 py-3 rounded-lg border ${
                      row.tone === "purple"
                        ? "bg-purple-500/10 border-purple-500/20"
                        : row.tone === "emerald"
                          ? "bg-emerald-500/10 border-emerald-500/20"
                          : "bg-blue-500/10 border-blue-500/20"
                    }`}
                  >
                    <span className="text-[9px] font-medium uppercase tracking-wider text-(--color-text-muted) text-center">
                      {row.label}
                    </span>
                    <span
                      className={`text-base font-bold ${
                        row.tone === "purple"
                          ? "text-(--color-accent-purple-light)"
                          : row.tone === "emerald"
                            ? "text-(--color-accent-emerald-light)"
                            : "text-(--color-accent-blue-light)"
                      }`}
                    >
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bento 5 - Koşullu görünürlük (normal, mock if/then) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 border border-white/10 bg-linear-to-br from-indigo-500/5 to-transparent rounded-4xl p-8 hover:bg-white/4 transition-colors flex flex-col overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-6 shrink-0">
                <Filter />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[4].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[4].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-2 justify-center">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                  <span className="text-[9px] font-mono font-bold text-indigo-400 px-1.5 py-0.5 rounded bg-indigo-500/15">
                    IF
                  </span>
                  <span className="text-[10px] text-white">tip = Donanım</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <span className="text-[9px] font-mono font-bold text-(--color-accent-emerald-light) px-1.5 py-0.5 rounded bg-emerald-500/15">
                    SHOW
                  </span>
                  <span className="text-[10px] text-white">marka, model alanı</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-orange-500/10 border border-orange-500/20">
                  <span className="text-[9px] font-mono font-bold text-(--color-accent-orange-light) px-1.5 py-0.5 rounded bg-orange-500/15">
                    HIDE
                  </span>
                  <span className="text-[10px] text-white">lisans tipi</span>
                </div>
              </div>
            </motion.div>

            {/* Bento 6 - Yayın & versiyon (normal, mock) */}
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
                <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <div className="flex items-center gap-2">
                    <GitBranch className="w-3 h-3 text-(--color-accent-emerald-light)" />
                    <span className="text-[10px] font-mono font-bold text-white">
                      v1.3
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-(--color-accent-emerald-light)">
                    yayında
                  </span>
                </div>
                <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/3 border border-white/5 opacity-70">
                  <div className="flex items-center gap-2">
                    <GitBranch className="w-3 h-3 text-(--color-text-muted)" />
                    <span className="text-[10px] font-mono text-white">
                      v1.2
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-(--color-text-muted)">
                    arşiv
                  </span>
                </div>
                <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/3 border border-white/5 opacity-70">
                  <div className="flex items-center gap-2">
                    <GitBranch className="w-3 h-3 text-(--color-text-muted)" />
                    <span className="text-[10px] font-mono text-white">
                      v1.1
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-(--color-text-muted)">
                    arşiv
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3.5 EDITOR — 3 panel + detail */}
      <section className="py-24 relative z-20 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-300 h-150 bg-blue-600/8 blur-[140px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-6 lg:px-12 w-full max-w-7xl relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
              <Sliders className="w-3.5 h-3.5 text-(--color-accent-blue-light)" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-(--color-accent-blue-light)">
                {data.editor.badge}
              </span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-white mb-6">
              {data.editor.titleLead}
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">
                {data.editor.titleAccent}
              </span>
            </h2>
            <p className="text-(--color-text-secondary) text-lg font-light leading-relaxed">
              {data.editor.description}
            </p>
          </div>

          {/* 3 panel cards */}
          <motion.div
            variants={staggerContainer}
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 mb-12"
          >
            {data.editor.panels.map((p) => {
              const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
                LayoutGrid, MousePointer2, Sliders,
              };
              const Icon = iconMap[p.icon] || Sliders;
              const t: Record<string, string> = {
                blue: "from-blue-500/15 to-blue-500/5 border-blue-500/25 text-(--color-accent-blue-light) shadow-[0_0_25px_rgba(59,130,246,0.12)]",
                purple: "from-purple-500/15 to-purple-500/5 border-purple-500/25 text-(--color-accent-purple-light) shadow-[0_0_25px_rgba(168,85,247,0.12)]",
                emerald: "from-emerald-500/15 to-emerald-500/5 border-emerald-500/25 text-(--color-accent-emerald-light) shadow-[0_0_25px_rgba(16,185,129,0.12)]",
              };
              return (
                <motion.div
                  key={p.id}
                  variants={fadeUp}
                  className={`rounded-3xl bg-linear-to-br ${t[p.tone]} border p-6 lg:p-7 flex flex-col gap-4 hover:-translate-y-1 transition-transform duration-300`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-bold text-white tracking-tight">{p.title}</h3>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-(--color-text-muted)">{p.subtitle}</span>
                  </div>
                  <p className="text-sm text-(--color-text-secondary) font-light leading-relaxed">{p.description}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Detail grid */}
          <motion.div
            variants={staggerContainer}
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4"
          >
            {data.editor.details.map((d) => {
              const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
                FileText, GitBranch, Palette, Layers,
              };
              const Icon = iconMap[d.icon] || FileText;
              return (
                <motion.div
                  key={d.id}
                  variants={fadeUp}
                  className="rounded-2xl border border-white/10 bg-white/2 backdrop-blur-xl p-5 flex flex-col gap-3"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-(--color-accent-blue-light)" />
                    </div>
                    <h3 className="text-sm font-bold text-white tracking-tight">{d.title}</h3>
                  </div>
                  <ul className="flex flex-col gap-1.5">
                    {d.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-1.5 text-[10px] text-(--color-text-secondary) font-light">
                        <CheckCircle2 className="w-2.5 h-2.5 text-(--color-text-muted) shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 3.6 USE CASES — 4 departman senaryosu */}
      <section className="py-24 relative z-20 overflow-hidden border-y border-white/5 bg-(--color-surface-base-dark)">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] mix-blend-screen pointer-events-none" />
        <div className="container mx-auto px-6 lg:px-12 w-full max-w-7xl relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-(--color-accent-purple-light)" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-(--color-accent-purple-light)">
                {data.useCases.badge}
              </span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-white mb-6">
              {data.useCases.titleLead}
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-400">
                {data.useCases.titleAccent}
              </span>
            </h2>
            <p className="text-(--color-text-secondary) text-lg font-light leading-relaxed">
              {data.useCases.description}
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
          >
            {data.useCases.items.map((u) => {
              const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
                Users, Wallet, Server, ClipboardList,
              };
              const Icon = iconMap[u.icon] || Users;
              const t: Record<string, string> = {
                blue: "from-blue-500/15 to-blue-500/5 border-blue-500/25 text-(--color-accent-blue-light) shadow-[0_0_25px_rgba(59,130,246,0.12)]",
                emerald: "from-emerald-500/15 to-emerald-500/5 border-emerald-500/25 text-(--color-accent-emerald-light) shadow-[0_0_25px_rgba(16,185,129,0.12)]",
                purple: "from-purple-500/15 to-purple-500/5 border-purple-500/25 text-(--color-accent-purple-light) shadow-[0_0_25px_rgba(168,85,247,0.12)]",
                amber: "from-amber-500/15 to-amber-500/5 border-amber-500/25 text-amber-300 shadow-[0_0_25px_rgba(245,158,11,0.12)]",
              };
              return (
                <motion.div
                  key={u.id}
                  variants={fadeUp}
                  className={`rounded-3xl bg-linear-to-br ${t[u.tone]} border p-6 flex flex-col gap-4 hover:-translate-y-1 transition-transform duration-300`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base lg:text-lg font-bold text-white tracking-tight">{u.title}</h3>
                  <p className="text-sm text-(--color-text-secondary) font-light leading-relaxed">{u.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-white/8">
                    {u.examples.map((ex, j) => (
                      <span key={j} className="text-[8px] font-mono px-1.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-(--color-text-secondary)">
                        {ex}
                      </span>
                    ))}
                  </div>
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
              <Code2 className="w-3.5 h-3.5 text-(--color-accent-blue-light)" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-(--color-accent-blue-light)">
                Low-Code Bilgi Bankası
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
                Code2, LayoutGrid, Plus, Sliders, Sparkles,
              };
              const Icon = iconMap[item.icon] || Code2;
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
                    <Code className="w-4 h-4 text-(--color-accent-blue-light)" />
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-text-overline)">
                      Low Code Geliştirme
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
                        Sürükle-Bırak
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                        <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-blue-base) shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                        Anlık Yayın
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                        <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-purple-base) shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
                        Düşük Maliyet
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
