"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import {
  UserCircle,
  ArrowRight,
  CheckCircle2,
  LayoutDashboard,
  BookMarked,
  MessageSquare,
  BookOpen,
  Boxes,
  Megaphone,
  Workflow,
  CalendarClock,
  Search,
  Bell,
  ChevronRight,
  ChevronDown,
  Clock,
  AlertCircle,
  Mail,
  FileText,
  Sparkles,
  Headphones,
  Plus,
  Laptop,
  Wifi,
  Lock,
  Smartphone,
  Zap,
  Layers,
  Gauge,
  Code2,
  Filter,
  Eye,
  X,
  HardDrive,
  GraduationCap,
} from "lucide-react";
import data from "@/data/self-servis-portal.json";

export default function SelfServisPortalPage() {
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
              <UserCircle size={14} />
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
            {/* Portal toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-5 pb-5 border-b border-white/8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                  <UserCircle className="w-5 h-5 text-(--color-accent-blue-light)" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-(--color-accent-blue-light)">
                    Self Servis Portal
                  </span>
                  <span className="text-lg lg:text-xl font-bold text-white tracking-tight">
                    Hoş geldin Ahmet Y.
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-md bg-white/3 border border-white/8">
                  <Search className="w-2.5 h-2.5 text-(--color-text-muted)" />
                  <span className="text-[9px] font-mono text-(--color-text-muted)">hizmet ara…</span>
                </div>
                <div className="relative">
                  <Bell className="w-4 h-4 text-(--color-text-secondary)" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500 border border-(--color-surface-base) text-[7px] font-bold text-white flex items-center justify-center">3</span>
                </div>
              </div>
            </div>

            {/* Portal main grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-4 mb-5">
              {/* Left: Quick action cards */}
              <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-2.5">
                {[
                  { icon: AlertCircle, label: "Olay Bildir", desc: "Arıza/sorun", tone: "red" },
                  { icon: Plus, label: "Talep Aç", desc: "Hizmet iste", tone: "blue" },
                  { icon: Sparkles, label: "İyileştirme", desc: "Öneri ver", tone: "purple" },
                  { icon: BookOpen, label: "Bilgi Bankası", desc: "Çözüm bul", tone: "emerald" },
                  { icon: BookMarked, label: "Servis Katalog", desc: "12 hizmet", tone: "cyan" },
                  { icon: Boxes, label: "Varlıklarım", desc: "3 zimmet", tone: "amber" },
                  { icon: CheckCircle2, label: "Onaylarım", desc: "2 bekleyen", tone: "indigo" },
                  { icon: Clock, label: "Geçmişim", desc: "18 kayıt", tone: "teal" },
                ].map((a, i) => {
                  const Icon = a.icon;
                  const t: Record<string, string> = {
                    red: "from-red-500/15 to-red-500/5 border-red-500/25 text-(--color-accent-red-light)",
                    blue: "from-blue-500/15 to-blue-500/5 border-blue-500/25 text-(--color-accent-blue-light)",
                    purple: "from-purple-500/15 to-purple-500/5 border-purple-500/25 text-(--color-accent-purple-light)",
                    emerald: "from-emerald-500/15 to-emerald-500/5 border-emerald-500/25 text-(--color-accent-emerald-light)",
                    cyan: "from-cyan-500/15 to-cyan-500/5 border-cyan-500/25 text-(--color-accent-cyan-light)",
                    amber: "from-amber-500/15 to-amber-500/5 border-amber-500/25 text-amber-300",
                    indigo: "from-indigo-500/15 to-indigo-500/5 border-indigo-500/25 text-indigo-300",
                    teal: "from-teal-500/15 to-teal-500/5 border-teal-500/25 text-teal-300",
                  };
                  return (
                    <div key={i} className={`rounded-2xl bg-linear-to-br ${t[a.tone]} border p-3 flex flex-col gap-2 hover:-translate-y-0.5 transition-transform`}>
                      <Icon className="w-5 h-5" />
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[11px] font-bold text-white">{a.label}</span>
                        <span className="text-[8px] font-mono text-(--color-text-muted)">{a.desc}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right: My open requests */}
              <div className="rounded-2xl border border-white/10 bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-2">
                <div className="flex items-center justify-between pb-2 border-b border-white/8">
                  <div className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-(--color-accent-blue-light)" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white">Açık Kayıtlarım</span>
                  </div>
                  <span className="text-[8px] font-mono font-bold text-(--color-accent-blue-light) px-1.5 py-0.5 rounded-full bg-blue-500/12 border border-blue-500/25">
                    4
                  </span>
                </div>
                {[
                  { id: "#4218", title: "VPN bağlantı sorunu", status: "Devam", tone: "amber", time: "2dk" },
                  { id: "REQ-872", title: "Yeni laptop talebi", status: "Onayda", tone: "blue", time: "1sa" },
                  { id: "REQ-870", title: "Mail grup üyeliği", status: "Açık", tone: "cyan", time: "3sa" },
                  { id: "#4209", title: "Yazıcı arızası", status: "Çözüldü", tone: "emerald", time: "1g" },
                ].map((r, i) => {
                  const t: Record<string, string> = {
                    amber: "text-amber-300 bg-amber-500/10 border-amber-500/20",
                    blue: "text-(--color-accent-blue-light) bg-blue-500/10 border-blue-500/20",
                    cyan: "text-(--color-accent-cyan-light) bg-cyan-500/10 border-cyan-500/20",
                    emerald: "text-(--color-accent-emerald-light) bg-emerald-500/10 border-emerald-500/20",
                  };
                  return (
                    <div key={i} className="grid grid-cols-[auto_1fr_auto_auto] gap-1.5 items-center px-2 py-1.5 rounded-lg bg-white/2 border border-white/5">
                      <span className="text-[8px] font-mono text-(--color-text-muted)">{r.id}</span>
                      <span className="text-[10px] font-medium text-white truncate">{r.title}</span>
                      <span className={`text-[7px] font-mono font-semibold px-1 py-0.5 rounded-full border ${t[r.tone]}`}>
                        {r.status}
                      </span>
                      <span className="text-[8px] font-mono text-(--color-text-muted)">{r.time}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Active announcement banner */}
            <div className="rounded-2xl border border-purple-500/30 bg-linear-to-r from-purple-500/12 to-pink-500/8 p-3 flex items-center gap-3 shadow-[0_0_20px_rgba(168,85,247,0.12)]">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center shrink-0">
                <Megaphone className="w-4 h-4 text-(--color-accent-purple-light)" />
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-[8px] font-mono uppercase tracking-wider text-(--color-accent-purple-light)">Aktif Duyuru · Cumartesi 22:00 — Pazar 06:00</span>
                <span className="text-[11px] font-semibold text-white">Mail sunucusu planlı bakım — kesinti beklenmektedir</span>
              </div>
              <X className="w-3.5 h-3.5 text-(--color-text-muted) shrink-0" />
            </div>

            <div className="absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-(--color-surface-base) to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* 2. ZIG-ZAG FEATURE BLOCKS */}
      <section className="py-24 relative z-20">
        <div className="container mx-auto px-6 lg:px-12 w-full max-w-7xl flex flex-col gap-32">
          {/* Feature 1: Dinamik arayüz + kayıt oluşturma */}
          <motion.div
            animate="visible"
            variants={fadeUp}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-blue-500/5 to-cyan-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-blue-500/10 blur-[50px] group-hover:bg-blue-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full h-135 rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-(--color-surface-elevated-solid) flex flex-col p-5 gap-3">
                  {/* Form header */}
                  <div className="flex items-center justify-between pb-2 border-b border-white/8">
                    <div className="flex items-center gap-1.5">
                      <Plus className="w-3.5 h-3.5 text-(--color-accent-blue-light)" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white">Yeni Talep · Dinamik Form</span>
                    </div>
                    <span className="text-[8px] font-mono text-(--color-text-muted)">admin tarafından özelleştirildi</span>
                  </div>

                  {/* Form fields */}
                  <div className="flex flex-col gap-2.5 flex-1">
                    {/* Talep tipi */}
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-medium uppercase tracking-wider text-(--color-text-muted)">Talep Tipi</span>
                      <div className="grid grid-cols-3 gap-1.5">
                        {[
                          { icon: AlertCircle, label: "Olay", active: false, tone: "red" },
                          { icon: Plus, label: "İstek", active: true, tone: "blue" },
                          { icon: Sparkles, label: "İyileştirme", active: false, tone: "purple" },
                        ].map((t, i) => {
                          const Icon = t.icon;
                          const tone: Record<string, string> = {
                            red: "text-(--color-accent-red-light)",
                            blue: "text-(--color-accent-blue-light) bg-blue-500/15 border-blue-500/35 shadow-[0_0_15px_rgba(59,130,246,0.15)]",
                            purple: "text-(--color-accent-purple-light)",
                          };
                          return (
                            <div key={i} className={`flex items-center gap-1 px-2 py-1.5 rounded-lg border ${t.active ? tone[t.tone] : "bg-white/2 border-white/8"}`}>
                              <Icon className={`w-3 h-3 ${t.active ? "" : tone[t.tone]}`} />
                              <span className={`text-[9px] font-medium ${t.active ? "text-white" : "text-(--color-text-secondary)"}`}>{t.label}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Kategori */}
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-medium uppercase tracking-wider text-(--color-text-muted)">Kategori</span>
                      <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/3 border border-white/8">
                        <span className="text-[10px] text-white">Donanım Talebi</span>
                        <ChevronDown className="w-3 h-3 text-(--color-text-muted)" />
                      </div>
                    </div>

                    {/* Açıklama */}
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-medium uppercase tracking-wider text-(--color-text-muted)">Açıklama</span>
                      <div className="px-3 py-2 rounded-lg bg-white/3 border border-white/8 min-h-10">
                        <span className="text-[9px] text-(--color-text-secondary)">Yazılım ekibi için yeni dizüstü bilgisayar tahsisi…</span>
                      </div>
                    </div>

                    {/* Custom fields grid */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col gap-1">
                        <span className="text-[9px] font-medium uppercase tracking-wider text-(--color-text-muted)">Aciliyet</span>
                        <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-white/3 border border-white/8">
                          <span className="text-[10px] text-white">Orta</span>
                          <ChevronDown className="w-2.5 h-2.5 text-(--color-text-muted)" />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[9px] font-medium uppercase tracking-wider text-(--color-text-muted)">Lokasyon</span>
                        <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-white/3 border border-white/8">
                          <span className="text-[10px] text-white">İstanbul HQ</span>
                          <ChevronDown className="w-2.5 h-2.5 text-(--color-text-muted)" />
                        </div>
                      </div>
                    </div>

                    {/* File attachment */}
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-dashed border-white/15 bg-white/2">
                      <FileText className="w-3 h-3 text-(--color-text-muted)" />
                      <span className="text-[9px] text-(--color-text-muted) flex-1">Dosya ekle (opsiyonel)</span>
                      <span className="text-[8px] font-mono text-(--color-accent-blue-light)">+ ek</span>
                    </div>
                  </div>

                  {/* Submit button */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/8">
                    <span className="text-[8px] font-mono text-(--color-text-muted)">5 alan · 2 dosya</span>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/20 border border-blue-500/40 text-(--color-accent-blue-light) shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                      <span className="text-[10px] font-semibold">Gönder</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-(--color-accent-blue-light)">
                <LayoutDashboard size={32} />
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

          {/* Feature 2: Katalog & talep */}
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
                      <BookMarked className="w-3.5 h-3.5 text-(--color-accent-emerald-light)" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white">Yetkili Servis Kataloğu</span>
                    </div>
                    <span className="text-[8px] font-mono font-bold text-(--color-accent-emerald-light) px-1.5 py-0.5 rounded-full bg-emerald-500/12 border border-emerald-500/25">
                      8 hizmet
                    </span>
                  </div>
                  <div className="flex items-center gap-1 flex-wrap">
                    <Filter className="w-2.5 h-2.5 text-(--color-text-muted)" />
                    {[
                      { label: "Tümü", active: true },
                      { label: "BT", active: false },
                      { label: "İK", active: false },
                      { label: "Donanım", active: false },
                    ].map((c, i) => (
                      <span
                        key={i}
                        className={`text-[8px] font-medium px-1.5 py-0.5 rounded-full border ${
                          c.active
                            ? "bg-emerald-500/15 border-emerald-500/30 text-(--color-accent-emerald-light)"
                            : "bg-white/3 border-white/8 text-(--color-text-muted)"
                        }`}
                      >
                        {c.label}
                      </span>
                    ))}
                  </div>
                  <div className="flex-1 grid grid-cols-2 gap-2 overflow-hidden">
                    {[
                      { icon: Laptop, name: "Donanım Talebi", sla: "3 gün", auth: true, tone: "blue" },
                      { icon: Lock, name: "Erişim Yetkisi", sla: "4 saat", auth: true, tone: "purple" },
                      { icon: Mail, name: "Mail Hesabı", sla: "1 gün", auth: true, tone: "emerald" },
                      { icon: Wifi, name: "VPN Erişimi", sla: "2 saat", auth: true, tone: "cyan" },
                      { icon: GraduationCap, name: "Eğitim", sla: "5 gün", auth: true, tone: "amber" },
                      { icon: Smartphone, name: "Mobil Cihaz", sla: "5 gün", auth: false, tone: "rose" },
                    ].map((s, i) => {
                      const Icon = s.icon;
                      const t: Record<string, string> = {
                        blue: "from-blue-500/15 to-blue-500/5 border-blue-500/25 text-(--color-accent-blue-light)",
                        purple: "from-purple-500/15 to-purple-500/5 border-purple-500/25 text-(--color-accent-purple-light)",
                        emerald: "from-emerald-500/15 to-emerald-500/5 border-emerald-500/25 text-(--color-accent-emerald-light)",
                        cyan: "from-cyan-500/15 to-cyan-500/5 border-cyan-500/25 text-(--color-accent-cyan-light)",
                        amber: "from-amber-500/15 to-amber-500/5 border-amber-500/25 text-amber-300",
                        rose: "from-rose-500/15 to-rose-500/5 border-rose-500/25 text-rose-300",
                      };
                      return (
                        <div
                          key={i}
                          className={`rounded-xl bg-linear-to-br ${t[s.tone]} border p-2.5 flex flex-col gap-2 ${s.auth ? "hover:-translate-y-0.5 transition-transform" : "opacity-40"}`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="w-7 h-7 rounded-md bg-white/8 flex items-center justify-center">
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            {s.auth ? (
                              <span className="text-[7px] font-mono text-(--color-accent-emerald-light) px-1 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/25">
                                YETKİLİ
                              </span>
                            ) : (
                              <Lock className="w-2.5 h-2.5 text-(--color-text-muted)" />
                            )}
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <span className="text-[10px] font-bold text-white">{s.name}</span>
                            <div className="flex items-center gap-1">
                              <Clock className="w-2 h-2 text-(--color-text-muted)" />
                              <span className="text-[8px] font-mono text-(--color-text-muted)">Hizmet Seviyesi {s.sla}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-white/8">
                    <span className="text-[8px] font-mono uppercase tracking-widest text-(--color-text-muted)">Atamalar otomatik</span>
                    <div className="flex items-center gap-1">
                      <Workflow className="w-2.5 h-2.5 text-(--color-accent-emerald-light)" />
                      <span className="text-[8px] font-mono text-(--color-accent-emerald-light)">sistem yönlendirir</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-(--color-accent-emerald-light)">
                <BookMarked size={32} />
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

          {/* Feature 3: Görüşmeler & not ekleme */}
          <motion.div
            animate="visible"
            variants={fadeUp}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-purple-500/5 to-indigo-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-purple-500/10 blur-[50px] group-hover:bg-purple-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full h-135 rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-(--color-surface-elevated-solid) flex flex-col p-5 gap-3">
                  {/* Record header */}
                  <div className="flex items-center justify-between pb-2 border-b border-white/8">
                    <div className="flex items-center gap-2">
                      <span className="text-[8px] font-mono text-(--color-text-muted)">REQ-872</span>
                      <span className="text-[11px] font-bold text-white">Yeni laptop talebi</span>
                    </div>
                    <span className="text-[8px] font-mono font-semibold text-(--color-accent-blue-light) px-1.5 py-0.5 rounded-full bg-blue-500/12 border border-blue-500/25">
                      ONAYDA
                    </span>
                  </div>

                  {/* Watchers */}
                  <div className="flex items-center gap-1.5">
                    <Eye className="w-2.5 h-2.5 text-(--color-text-muted)" />
                    <span className="text-[8px] font-mono uppercase tracking-wider text-(--color-text-muted)">Paylaşılan:</span>
                    {[
                      { name: "Ahmet Y.", tone: "blue" },
                      { name: "Selin K.", tone: "purple" },
                      { name: "BT Ekibi", tone: "emerald" },
                    ].map((w, i) => {
                      const t: Record<string, string> = {
                        blue: "bg-blue-500/15 border-blue-500/30 text-(--color-accent-blue-light)",
                        purple: "bg-purple-500/15 border-purple-500/30 text-(--color-accent-purple-light)",
                        emerald: "bg-emerald-500/15 border-emerald-500/30 text-(--color-accent-emerald-light)",
                      };
                      return (
                        <span key={i} className={`text-[8px] font-medium px-1.5 py-0.5 rounded-full border ${t[w.tone]}`}>
                          {w.name}
                        </span>
                      );
                    })}
                  </div>

                  {/* Conversation timeline */}
                  <div className="flex-1 flex flex-col gap-2.5 overflow-hidden">
                    {/* User msg */}
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shrink-0">
                        <UserCircle className="w-3 h-3 text-(--color-accent-blue-light)" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[9px] font-semibold text-white">Ahmet Y. (siz)</span>
                          <span className="text-[8px] font-mono text-(--color-text-muted)">14 Nis · 09:14</span>
                        </div>
                        <div className="text-[9px] text-(--color-text-secondary) px-2 py-1.5 rounded-md bg-white/3 border border-white/8 mt-1">
                          Yazılım ekibi için yeni dizüstü bilgisayar tahsisi gerekiyor.
                        </div>
                      </div>
                    </div>

                    {/* Agent msg */}
                    <div className="flex items-start gap-2 flex-row-reverse">
                      <div className="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center shrink-0">
                        <Headphones className="w-3 h-3 text-(--color-accent-purple-light)" />
                      </div>
                      <div className="flex-1 min-w-0 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <span className="text-[8px] font-mono text-(--color-text-muted)">14 Nis · 09:18</span>
                          <span className="text-[9px] font-semibold text-white">Selin K. · BT</span>
                        </div>
                        <div className="inline-block text-[9px] text-(--color-text-secondary) px-2 py-1.5 rounded-md bg-purple-500/8 border border-purple-500/20 mt-1 text-left">
                          Talep alındı, model seçeneklerini paylaşacağım. Yönetici onayı bekliyor.
                        </div>
                      </div>
                    </div>

                    {/* System update */}
                    <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-amber-500/8 border border-amber-500/20">
                      <CheckCircle2 className="w-2.5 h-2.5 text-amber-300" />
                      <span className="text-[8px] font-mono uppercase tracking-wider text-amber-300">Yönetici Onayı</span>
                      <span className="text-[8px] text-white">Mehmet B. → Onay verildi</span>
                      <span className="ml-auto text-[8px] font-mono text-(--color-text-muted)">15 Nis · 11:24</span>
                    </div>

                    {/* User note */}
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shrink-0">
                        <UserCircle className="w-3 h-3 text-(--color-accent-blue-light)" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[9px] font-semibold text-white">Ahmet Y.</span>
                          <span className="text-[8px] font-mono text-(--color-text-muted)">15 Nis · 14:02 · not</span>
                        </div>
                        <div className="text-[9px] text-(--color-text-secondary) px-2 py-1.5 rounded-md bg-white/3 border border-white/8 mt-1">
                          16 GB RAM, 512 GB SSD tercih ediyorum.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* New note input */}
                  <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-white/10 bg-white/2">
                    <MessageSquare className="w-3 h-3 text-(--color-text-muted)" />
                    <span className="text-[9px] text-(--color-text-muted) flex-1">Not ekle veya yeniden aç…</span>
                    <button className="px-2 py-0.5 rounded-md bg-purple-500/15 border border-purple-500/30 text-[8px] font-semibold text-(--color-accent-purple-light)">
                      Gönder
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-(--color-accent-purple-light)">
                <MessageSquare size={32} />
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
            {/* Bento 1 - Onay (wide, görselli) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 lg:col-span-2 row-span-1 rounded-4xl bg-linear-to-br from-blue-500/10 to-transparent border border-white/10 p-8 hover:bg-white/4 transition-colors relative overflow-hidden group flex flex-col md:flex-row gap-6 items-center"
            >
              <div className="w-full md:w-1/2 flex flex-col justify-center shrink-0">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-(--color-accent-blue-light) flex items-center justify-center mb-6">
                  <CheckCircle2 />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {data.bento.items[0].title}
                </h3>
                <p className="text-sm text-(--color-text-secondary) font-light pr-4">
                  {data.bento.items[0].description}
                </p>
              </div>
              <div className="w-full md:w-1/2 h-45 md:h-full relative rounded-xl border border-white/10 overflow-hidden shadow-inner shrink-0 bg-(--color-surface-elevated-solid) group-hover:border-blue-500/40 transition-colors p-4 flex flex-col gap-2">
                <div className="flex items-center justify-between pb-2 border-b border-white/8">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-(--color-accent-blue-light)" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white">Onay Bekleyen</span>
                  </div>
                  <span className="text-[8px] font-mono font-bold text-(--color-accent-blue-light) px-1.5 py-0.5 rounded-full bg-blue-500/12 border border-blue-500/25">2</span>
                </div>
                {[
                  { id: "REQ-872", title: "Yeni laptop talebi", from: "Ahmet Y.", amount: "32.500₺" },
                  { id: "REQ-869", title: "Yazılım lisansı", from: "Mert K.", amount: "8.200₺" },
                ].map((r, i) => (
                  <div key={i} className="flex flex-col gap-1.5 px-2.5 py-2 rounded-lg bg-blue-500/8 border border-blue-500/20">
                    <div className="grid grid-cols-[auto_1fr_auto] gap-1.5 items-center">
                      <span className="text-[8px] font-mono text-(--color-text-muted)">{r.id}</span>
                      <span className="text-[10px] font-medium text-white truncate">{r.title}</span>
                      <span className="text-[8px] font-mono font-bold text-(--color-accent-blue-light)">{r.amount}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[8px] text-(--color-text-muted) flex-1 truncate">İsteyen: {r.from}</span>
                      <button className="text-[8px] font-semibold px-1.5 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-(--color-accent-emerald-light)">
                        Onay
                      </button>
                      <button className="text-[8px] font-semibold px-1.5 py-0.5 rounded-md bg-red-500/15 border border-red-500/30 text-(--color-accent-red-light)">
                        Red
                      </button>
                    </div>
                  </div>
                ))}
                <div className="mt-auto flex items-center justify-between pt-1 border-t border-white/8">
                  <span className="text-[8px] font-mono text-(--color-text-muted)">Tek panel · bağlam dolu</span>
                  <ChevronRight className="w-3 h-3 text-(--color-text-muted)" />
                </div>
              </div>
            </motion.div>

            {/* Bento 2 - Bilgi bankası (normal, görselli) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-(--color-accent-orange-light) flex items-center justify-center mb-6 shrink-0">
                <BookOpen />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[1].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[1].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-3 flex flex-col gap-2">
                <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-white/3 border border-white/8">
                  <Search className="w-3 h-3 text-(--color-text-muted)" />
                  <span className="text-[10px] text-(--color-text-secondary) flex-1">vpn bağlanmıyor</span>
                  <Sparkles className="w-2.5 h-2.5 text-(--color-accent-orange-light)" />
                </div>
                <div className="flex items-center gap-1 mb-1">
                  <Sparkles className="w-2.5 h-2.5 text-(--color-accent-orange-light)" />
                  <span className="text-[8px] font-mono uppercase tracking-wider text-(--color-accent-orange-light)">AI Önerileri</span>
                </div>
                {[
                  { title: "VPN sertifika yenileme prosedürü", views: 124, match: 96 },
                  { title: "Auth zaman aşımı çözümü", views: 87, match: 84 },
                  { title: "VPN istemci kurulum rehberi", views: 56, match: 71 },
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-white/2 border border-white/5">
                    <BookOpen className="w-2.5 h-2.5 text-(--color-accent-orange-light) shrink-0" />
                    <span className="text-[10px] font-medium text-white truncate flex-1">{s.title}</span>
                    <span className="text-[8px] font-mono font-bold text-(--color-accent-emerald-light)">%{s.match}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bento 3 - Varlıklar (normal, görselli) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-(--color-accent-cyan-light) flex items-center justify-center mb-6 shrink-0">
                <Boxes />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[2].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[2].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-3 flex flex-col gap-1.5">
                <div className="flex items-center justify-between pb-1.5 border-b border-white/8">
                  <span className="text-[8px] font-mono uppercase tracking-wider text-(--color-text-muted)">3 Zimmet</span>
                  <span className="text-[8px] font-mono font-bold text-(--color-accent-emerald-light) px-1 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/25">aktif</span>
                </div>
                {[
                  { icon: Laptop, name: "MacBook Pro 16'", code: "AST-104", status: "kullanımda", tone: "emerald" },
                  { icon: Smartphone, name: "iPhone 14 Pro", code: "AST-218", status: "kullanımda", tone: "emerald" },
                  { icon: HardDrive, name: "Dell Monitor 27'", code: "AST-052", status: "yeni", tone: "blue" },
                ].map((a, i) => {
                  const Icon = a.icon;
                  const t: Record<string, string> = {
                    emerald: "text-(--color-accent-emerald-light) bg-emerald-500/10 border-emerald-500/20",
                    blue: "text-(--color-accent-blue-light) bg-blue-500/10 border-blue-500/20",
                  };
                  return (
                    <div key={i} className="grid grid-cols-[auto_1fr_auto_auto] gap-1.5 items-center px-2 py-1.5 rounded-md bg-white/2 border border-white/5">
                      <Icon className="w-3 h-3 text-(--color-accent-cyan-light)" />
                      <span className="text-[10px] font-medium text-white truncate">{a.name}</span>
                      <span className="text-[8px] font-mono text-(--color-text-muted)">{a.code}</span>
                      <span className={`text-[7px] font-mono font-bold px-1 py-0.5 rounded-full border ${t[a.tone]}`}>{a.status}</span>
                    </div>
                  );
                })}
                <button className="mt-auto flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-md bg-cyan-500/10 border border-cyan-500/25 text-(--color-accent-cyan-light)">
                  <AlertCircle className="w-2.5 h-2.5" />
                  <span className="text-[9px] font-semibold">Varlık üzerinden arıza bildir</span>
                </button>
              </div>
            </motion.div>

            {/* Bento 4 - Duyuru (wide, görselli) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 lg:col-span-2 row-span-1 rounded-4xl bg-linear-to-br from-purple-500/10 to-transparent border border-white/10 p-8 hover:bg-white/4 transition-colors relative overflow-hidden group flex flex-col md:flex-row gap-6 items-center"
            >
              <div className="w-full md:w-1/2 flex flex-col justify-center shrink-0">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-(--color-accent-purple-light) flex items-center justify-center mb-6">
                  <Megaphone />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {data.bento.items[3].title}
                </h3>
                <p className="text-sm text-(--color-text-secondary) font-light pr-4">
                  {data.bento.items[3].description}
                </p>
              </div>
              <div className="w-full md:w-1/2 h-45 md:h-full relative rounded-xl border border-white/10 overflow-hidden shadow-inner shrink-0 bg-(--color-surface-elevated-solid) group-hover:border-purple-500/40 transition-colors p-4 flex flex-col gap-2">
                {/* Popup announcement (mock modal) */}
                <div className="rounded-xl border border-purple-500/35 bg-linear-to-br from-purple-500/15 to-pink-500/8 p-3 flex flex-col gap-2 shadow-[0_0_20px_rgba(168,85,247,0.15)]">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center shrink-0">
                      <Megaphone className="w-3.5 h-3.5 text-(--color-accent-purple-light)" />
                    </div>
                    <div className="flex flex-col flex-1">
                      <span className="text-[8px] font-mono uppercase tracking-wider text-(--color-accent-purple-light)">Aktif Duyuru · POPUP</span>
                      <span className="text-[10px] font-bold text-white">Mail sunucusu planlı bakım</span>
                    </div>
                    <X className="w-3 h-3 text-(--color-text-muted)" />
                  </div>
                  <p className="text-[9px] text-(--color-text-secondary) leading-relaxed">
                    Cumartesi 22:00 — Pazar 06:00 arasında planlı bakım yapılacaktır. Bu süre içinde mail erişiminde kesinti yaşanabilir.
                  </p>
                  <div className="flex items-center gap-1.5 pt-1.5 border-t border-purple-500/20">
                    <Clock className="w-2.5 h-2.5 text-(--color-text-muted)" />
                    <span className="text-[8px] font-mono text-(--color-text-muted) flex-1">8 saat sonra başlıyor</span>
                    <button className="text-[8px] font-semibold px-2 py-0.5 rounded-md bg-purple-500/20 border border-purple-500/40 text-white">Anladım</button>
                  </div>
                </div>
                {/* Other live announcements */}
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-amber-500/8 border border-amber-500/20">
                  <Bell className="w-2.5 h-2.5 text-amber-300" />
                  <span className="text-[9px] text-white">VPN kullanımı %85&apos;e ulaştı</span>
                </div>
              </div>
            </motion.div>

            {/* Bento 5 - Otomatik atama (normal, mock) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 border border-white/10 bg-linear-to-br from-indigo-500/5 to-transparent rounded-4xl p-8 hover:bg-white/4 transition-colors flex flex-col overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-6 shrink-0">
                <Workflow />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[4].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[4].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-2 justify-center">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/3 border border-white/8">
                  <UserCircle className="w-3.5 h-3.5 text-(--color-accent-blue-light)" />
                  <span className="text-[11px] font-medium text-white flex-1">
                    Kullanıcı talep açar
                  </span>
                </div>
                <div className="flex justify-center">
                  <div className="w-px h-3 bg-indigo-500/40" />
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-500/15 border border-indigo-500/30">
                  <Workflow className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="text-[11px] font-semibold text-white flex-1">
                    Sistem otomatik atar
                  </span>
                  <span className="text-[9px] font-mono text-indigo-400">
                    auto
                  </span>
                </div>
                <div className="flex justify-center">
                  <div className="w-px h-3 bg-emerald-500/40" />
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <CheckCircle2 className="w-3.5 h-3.5 text-(--color-accent-emerald-light)" />
                  <span className="text-[11px] font-medium text-white flex-1">
                    Kullanıcı süreçten haberdar
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Bento 6 - Duyuru zamanlama (normal, görselli) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-(--color-accent-emerald-light) flex items-center justify-center mb-6 shrink-0">
                <CalendarClock />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[5].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[5].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-3 flex flex-col gap-2">
                <div className="flex items-center justify-between pb-1.5 border-b border-white/8">
                  <div className="flex items-center gap-1.5">
                    <CalendarClock className="w-3 h-3 text-(--color-accent-emerald-light)" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white">Planlı Duyurular</span>
                  </div>
                  <span className="text-[8px] font-mono text-(--color-text-muted)">3 zamanlanmış</span>
                </div>
                {[
                  { date: "Cmt 22:00 — Pzr 06:00", title: "Mail bakım", state: "yaklaşıyor", tone: "amber" },
                  { date: "Pzt 09:00 — Çar 18:00", title: "ERP eğitim duyurusu", state: "aktif", tone: "emerald" },
                  { date: "12 Nis · tüm gün", title: "Yeni VPN politikası", state: "yayında", tone: "blue" },
                ].map((d, i) => {
                  const t: Record<string, string> = {
                    amber: "bg-amber-500/8 border-amber-500/20",
                    emerald: "bg-emerald-500/8 border-emerald-500/20",
                    blue: "bg-blue-500/8 border-blue-500/20",
                  };
                  const dot: Record<string, string> = {
                    amber: "bg-amber-300",
                    emerald: "bg-(--color-accent-emerald-light)",
                    blue: "bg-(--color-accent-blue-light)",
                  };
                  return (
                    <div key={i} className={`flex flex-col gap-1 px-2 py-1.5 rounded-md border ${t[d.tone]}`}>
                      <div className="flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${dot[d.tone]} shadow-[0_0_6px_currentColor]`} />
                        <span className="text-[10px] font-medium text-white truncate flex-1">{d.title}</span>
                        <span className="text-[7px] font-mono uppercase text-(--color-text-muted)">{d.state}</span>
                      </div>
                      <span className="text-[8px] font-mono text-(--color-text-muted) pl-3">{d.date}</span>
                    </div>
                  );
                })}
                <div className="mt-auto pt-1 border-t border-white/8 flex items-center gap-1">
                  <Workflow className="w-2.5 h-2.5 text-(--color-text-muted)" />
                  <span className="text-[8px] font-mono text-(--color-text-muted)">Tekrarlayan kayıtların önüne geçer</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3.5 FLEXY ADVANCED PORTAL */}
      <section className="py-24 relative z-20 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-300 h-150 bg-purple-600/10 blur-[140px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-6 lg:px-12 w-full max-w-7xl relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
              <Code2 className="w-3.5 h-3.5 text-(--color-accent-purple-light)" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-(--color-accent-purple-light)">
                {data.flexy.badge}
              </span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-white mb-6">
              {data.flexy.titleLead}
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-400">
                {data.flexy.titleAccent}
              </span>
            </h2>
            <p className="text-(--color-text-secondary) text-lg font-light leading-relaxed">
              {data.flexy.description}
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
          >
            {data.flexy.highlights.map((h) => {
              const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
                Zap, Layers, Gauge, Smartphone, Code2, Sparkles,
              };
              const Icon = iconMap[h.icon] || Zap;
              const t: Record<string, string> = {
                blue: "from-blue-500/15 to-blue-500/5 border-blue-500/25 text-(--color-accent-blue-light) shadow-[0_0_25px_rgba(59,130,246,0.12)]",
                purple: "from-purple-500/15 to-purple-500/5 border-purple-500/25 text-(--color-accent-purple-light) shadow-[0_0_25px_rgba(168,85,247,0.12)]",
                emerald: "from-emerald-500/15 to-emerald-500/5 border-emerald-500/25 text-(--color-accent-emerald-light) shadow-[0_0_25px_rgba(16,185,129,0.12)]",
                cyan: "from-cyan-500/15 to-cyan-500/5 border-cyan-500/25 text-(--color-accent-cyan-light) shadow-[0_0_25px_rgba(6,182,212,0.12)]",
                indigo: "from-indigo-500/15 to-indigo-500/5 border-indigo-500/25 text-indigo-300 shadow-[0_0_25px_rgba(99,102,241,0.12)]",
                amber: "from-amber-500/15 to-amber-500/5 border-amber-500/25 text-amber-300 shadow-[0_0_25px_rgba(245,158,11,0.12)]",
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
              <BookOpen className="w-3.5 h-3.5 text-(--color-accent-blue-light)" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-(--color-accent-blue-light)">
                Self Servis Bilgi Bankası
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
                BookOpen, BookMarked, Zap, Layers, Gauge,
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
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

                <div className="relative z-10 w-full">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 mx-auto">
                    <UserCircle className="w-4 h-4 text-(--color-accent-blue-light)" />
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-text-overline)">
                      Self Servis Portal
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
                        Dinamik Arayüz
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                        <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-blue-base) shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                        Yetkili Katalog
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                        <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-purple-base) shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
                        Onay & Duyuru
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
