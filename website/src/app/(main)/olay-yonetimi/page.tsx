"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Zap,
  LayoutGrid,
  MessageSquare,
  Layers,
  CheckSquare,
  Sparkles,
  Repeat,
  Boxes,
  ShieldCheck,
  Clock,
  AlertTriangle,
  Activity,
  ChevronRight,
  Bell,
  Users,
  FileText,
  History,
  Pin,
  Mail,
  Phone,
  MessageCircle,
  Server,
  Database,
  TrendingUp,
  GitBranch,
  Filter,
  Search,
  Headphones,
} from "lucide-react";
import data from "@/data/olay-yonetimi.json";

export default function OlayYonetimiPage() {
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
              <AlertCircle size={14} />
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
            className="relative mx-auto rounded-4xl border border-white/10 bg-white/2 backdrop-blur-3xl p-4 lg:p-6 shadow-2xl overflow-hidden group w-full max-h-125"
          >
            <Image
              src="/images/olay-modulu/Index.png"
              alt={data.hero.imageAlt}
              width={1427}
              height={512}
              className="block w-full h-auto rounded-2xl group-hover:scale-[1.01] transition-transform duration-700"
              priority
            />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-(--color-surface-base) to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* 2. ZIG-ZAG FEATURE BLOCKS */}
      <section className="py-24 relative z-20">
        <div className="container mx-auto px-6 lg:px-12 w-full max-w-7xl flex flex-col gap-32">
          {/* Feature 1: Merkezi Yönetim — blue */}
          <motion.div
            animate="visible"
            variants={fadeUp}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-blue-500/5 to-cyan-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-blue-500/10 blur-[50px] group-hover:bg-blue-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full h-112.5 rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-(--color-surface-elevated-solid) flex flex-col p-5 gap-3">
                  {/* Toolbar */}
                  <div className="flex items-center justify-between pb-2 border-b border-white/8">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-semibold uppercase tracking-widest text-(--color-text-muted)">
                        Aktif Olaylar
                      </span>
                      <span className="text-xs font-bold text-white">42</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-(--color-accent-emerald-light) shadow-[0_0_8px_currentColor] animate-pulse" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-white/3 border border-white/8">
                        <Search className="w-2.5 h-2.5 text-(--color-text-muted)" />
                        <span className="text-[8px] font-mono text-(--color-text-muted)">ara</span>
                      </div>
                      <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-white/3 border border-white/8">
                        <Filter className="w-2.5 h-2.5 text-(--color-text-muted)" />
                        <span className="text-[8px] font-mono text-(--color-text-muted)">filtre</span>
                      </div>
                      <div className="relative">
                        <Bell className="w-3.5 h-3.5 text-(--color-accent-blue-light)" />
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500 border border-(--color-surface-elevated-solid) text-[6px] font-bold text-white flex items-center justify-center">3</span>
                      </div>
                    </div>
                  </div>

                  {/* Source channels */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[8px] font-mono uppercase tracking-widest text-(--color-text-muted) mr-1">Kaynaklar</span>
                    {[
                      { icon: Mail, label: "E-posta", n: 12, tone: "blue" },
                      { icon: MessageCircle, label: "Chat", n: 8, tone: "cyan" },
                      { icon: Phone, label: "Telefon", n: 6, tone: "emerald" },
                      { icon: Activity, label: "Monitoring", n: 16, tone: "purple" },
                    ].map((c, i) => {
                      const Icon = c.icon;
                      const t: Record<string, string> = {
                        blue: "text-(--color-accent-blue-light) bg-blue-500/10 border-blue-500/25",
                        cyan: "text-(--color-accent-cyan-light) bg-cyan-500/10 border-cyan-500/25",
                        emerald: "text-(--color-accent-emerald-light) bg-emerald-500/10 border-emerald-500/25",
                        purple: "text-(--color-accent-purple-light) bg-purple-500/10 border-purple-500/25",
                      };
                      return (
                        <div key={i} className={`flex items-center gap-1 px-1.5 py-0.5 rounded-md border ${t[c.tone]}`}>
                          <Icon className="w-2.5 h-2.5" />
                          <span className="text-[8px] font-medium text-white">{c.label}</span>
                          <span className="text-[8px] font-mono">{c.n}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Table header */}
                  <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-2 px-3 py-1.5 text-[8px] font-semibold uppercase tracking-widest text-(--color-text-muted) bg-white/2 border border-white/5 rounded-md">
                    <span className="w-8">ID</span>
                    <span>Başlık</span>
                    <span>Atanan</span>
                    <span>Önc.</span>
                    <span>Hizmet Seviyesi</span>
                  </div>

                  {/* Incident rows */}
                  <div className="flex flex-col gap-1.5 flex-1 overflow-hidden">
                    {[
                      { id: "#4218", title: "VPN bağlantı sorunu — istek yanıtsız", assignee: "Ahmet Y.", priority: "Yüksek", sla: "1s 22d", priorityTone: "red", slaTone: "amber" },
                      { id: "#4217", title: "Mail sunucu gecikme alarmı", assignee: "Selin K.", priority: "Kritik", sla: "0s 18d", priorityTone: "red", slaTone: "red" },
                      { id: "#4216", title: "ERP raporlama hatası", assignee: "Ekip BT", priority: "Orta", sla: "3s 45d", priorityTone: "amber", slaTone: "emerald" },
                      { id: "#4215", title: "Yazıcı arızası — Kat 4", assignee: "Saha", priority: "Düşük", sla: "6s 10d", priorityTone: "cyan", slaTone: "emerald" },
                      { id: "#4214", title: "Disk %95 dolu — DB sunucu", assignee: "Sistem", priority: "Yüksek", sla: "2s 03d", priorityTone: "red", slaTone: "amber" },
                    ].map((r, i) => {
                      const pTone: Record<string, string> = {
                        red: "text-(--color-accent-red-light) bg-red-500/10 border-red-500/20",
                        amber: "text-amber-300 bg-amber-500/10 border-amber-500/20",
                        cyan: "text-(--color-accent-cyan-light) bg-cyan-500/10 border-cyan-500/20",
                      };
                      const sTone: Record<string, string> = {
                        red: "text-(--color-accent-red-light)",
                        amber: "text-amber-300",
                        emerald: "text-(--color-accent-emerald-light)",
                      };
                      return (
                        <div
                          key={i}
                          className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-2 items-center px-3 py-2 rounded-lg bg-white/2 border border-white/5 hover:bg-white/4 transition-colors"
                        >
                          <span className="text-[9px] font-mono text-(--color-text-muted) w-8">{r.id}</span>
                          <span className="text-[10px] font-medium text-white truncate">{r.title}</span>
                          <span className="text-[9px] text-(--color-text-secondary) hidden sm:block">{r.assignee}</span>
                          <span className={`text-[8px] font-mono font-semibold px-1.5 py-0.5 rounded-full border ${pTone[r.priorityTone]}`}>
                            {r.priority}
                          </span>
                          <span className={`text-[9px] font-mono font-bold ${sTone[r.slaTone]}`}>{r.sla}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-(--color-accent-blue-light)">
                <AlertCircle size={32} />
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

          {/* Feature 2: Tespit & Hizmet Seviyesi — emerald */}
          <motion.div
            animate="visible"
            variants={fadeUp}
            className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-emerald-500/5 to-cyan-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-emerald-500/10 blur-[50px] group-hover:bg-emerald-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full h-112.5 rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-(--color-surface-elevated-solid) flex flex-col p-5 gap-3">
                  {/* Top metrics */}
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: "Aktif Olay", value: 42, icon: AlertCircle, tone: "blue" },
                      { label: "Hizmet Seviyesi İçinde", value: "%87", icon: CheckCircle2, tone: "emerald" },
                      { label: "İhlal Riski", value: 5, icon: AlertTriangle, tone: "red", pulse: true },
                    ].map((m, i) => {
                      const Icon = m.icon;
                      const t: Record<string, string> = {
                        blue: "text-(--color-accent-blue-light) bg-blue-500/10 border-blue-500/20",
                        emerald: "text-(--color-accent-emerald-light) bg-emerald-500/10 border-emerald-500/20",
                        red: "text-(--color-accent-red-light) bg-red-500/10 border-red-500/20",
                      };
                      return (
                        <div key={i} className={`rounded-xl border p-3 flex flex-col gap-1 ${t[m.tone]} ${m.pulse ? "shadow-[0_0_20px_rgba(239,68,68,0.2)]" : ""}`}>
                          <div className="flex items-center justify-between">
                            <Icon className="w-3.5 h-3.5" />
                            {m.pulse && (
                              <span className="w-1.5 h-1.5 rounded-full bg-(--color-accent-red-light) shadow-[0_0_8px_currentColor] animate-pulse" />
                            )}
                          </div>
                          <span className="text-[8px] font-medium uppercase tracking-wider text-(--color-text-muted)">
                            {m.label}
                          </span>
                          <span className="text-xl font-bold tracking-tight text-white">{m.value}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Hizmet Seviyesi list header */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[9px] font-semibold uppercase tracking-widest text-white">
                      Hizmet Seviyesi Geri Sayım
                    </span>
                    <Clock className="w-3 h-3 text-(--color-text-muted)" />
                  </div>

                  {/* Hizmet Seviyesi countdown rows */}
                  <div className="flex flex-col gap-2 flex-1 overflow-hidden">
                    {[
                      { id: "#4217", title: "Mail sunucu gecikmesi", remaining: "0s 18d", percent: 92, tone: "red", risk: "İHLAL YAKIN" },
                      { id: "#4218", title: "VPN bağlantı sorunu", remaining: "1s 22d", percent: 68, tone: "amber", risk: "RİSK" },
                      { id: "#4214", title: "Disk %95 dolu", remaining: "2s 03d", percent: 55, tone: "amber", risk: "RİSK" },
                      { id: "#4216", title: "ERP raporlama hatası", remaining: "3s 45d", percent: 28, tone: "emerald", risk: "İYİ" },
                      { id: "#4215", title: "Yazıcı arızası — Kat 4", remaining: "6s 10d", percent: 12, tone: "emerald", risk: "İYİ" },
                    ].map((r, i) => {
                      const barColor: Record<string, string> = {
                        red: "from-red-500 to-red-400",
                        amber: "from-amber-500 to-amber-400",
                        emerald: "from-emerald-500 to-emerald-400",
                      };
                      const textColor: Record<string, string> = {
                        red: "text-(--color-accent-red-light)",
                        amber: "text-amber-300",
                        emerald: "text-(--color-accent-emerald-light)",
                      };
                      const badgeColor: Record<string, string> = {
                        red: "text-(--color-accent-red-light) bg-red-500/12 border-red-500/25",
                        amber: "text-amber-300 bg-amber-500/12 border-amber-500/25",
                        emerald: "text-(--color-accent-emerald-light) bg-emerald-500/12 border-emerald-500/25",
                      };
                      return (
                        <div key={i} className="flex flex-col gap-1.5 px-3 py-2 rounded-lg bg-white/2 border border-white/5">
                          <div className="flex items-center gap-2">
                            <span className="text-[8px] font-mono text-(--color-text-muted)">{r.id}</span>
                            <span className="text-[10px] font-medium text-white truncate flex-1">{r.title}</span>
                            <span className={`text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-full border ${badgeColor[r.tone]}`}>
                              {r.risk}
                            </span>
                            <span className={`text-[10px] font-mono font-bold ${textColor[r.tone]} w-12 text-right`}>{r.remaining}</span>
                          </div>
                          {/* Progress bar */}
                          <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                            <div
                              className={`h-full bg-linear-to-r ${barColor[r.tone]} rounded-full`}
                              style={{ width: `${r.percent}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-(--color-accent-emerald-light)">
                <Zap size={32} />
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

          {/* Feature 3: Modern UI — purple (kare/kompakt görsel, frame + max-h-full w-auto) */}
          <motion.div
            animate="visible"
            variants={fadeUp}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-purple-500/5 to-indigo-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-purple-500/10 blur-[50px] group-hover:bg-purple-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full h-112.5 rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-(--color-surface-elevated-solid) flex flex-col p-4 gap-3">
                  {/* Toolbar */}
                  <div className="flex items-center justify-between pb-1">
                    <div className="flex items-center gap-2">
                      <LayoutGrid className="w-3.5 h-3.5 text-(--color-accent-purple-light)" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white">Kart Görünümü</span>
                    </div>
                    <span className="text-[8px] font-mono text-(--color-text-muted)">drag · drop</span>
                  </div>

                  {/* Kanban board */}
                  <div className="grid grid-cols-3 gap-2 flex-1 overflow-hidden">
                    {[
                      {
                        title: "Yeni",
                        count: 4,
                        tone: "blue",
                        cards: [
                          { id: "#4218", title: "VPN bağlantı sorunu", priority: "Yüksek", channel: "E-posta", channelIcon: Mail, channelTone: "blue" },
                          { id: "#4219", title: "Mail gelmedi", priority: "Orta", channel: "Chat", channelIcon: MessageCircle, channelTone: "cyan" },
                        ],
                      },
                      {
                        title: "Devam Eden",
                        count: 3,
                        tone: "amber",
                        cards: [
                          { id: "#4216", title: "ERP raporlama hatası", priority: "Orta", channel: "Telefon", channelIcon: Phone, channelTone: "emerald" },
                          { id: "#4214", title: "Disk %95 dolu — DB", priority: "Kritik", channel: "Monitoring", channelIcon: Activity, channelTone: "purple" },
                        ],
                      },
                      {
                        title: "Çözüldü",
                        count: 7,
                        tone: "emerald",
                        cards: [
                          { id: "#4210", title: "Yazıcı arızası", priority: "Düşük", channel: "Saha", channelIcon: Headphones, channelTone: "cyan" },
                          { id: "#4209", title: "AD parola reset", priority: "Orta", channel: "Self-Servis", channelIcon: Users, channelTone: "blue" },
                        ],
                      },
                    ].map((col, ci) => {
                      const headerTone: Record<string, string> = {
                        blue: "text-(--color-accent-blue-light) bg-blue-500/12 border-blue-500/25",
                        amber: "text-amber-300 bg-amber-500/12 border-amber-500/25",
                        emerald: "text-(--color-accent-emerald-light) bg-emerald-500/12 border-emerald-500/25",
                      };
                      const priorityTone: Record<string, string> = {
                        Kritik: "text-(--color-accent-red-light) bg-red-500/15 border-red-500/30",
                        Yüksek: "text-(--color-accent-red-light) bg-red-500/10 border-red-500/20",
                        Orta: "text-amber-300 bg-amber-500/10 border-amber-500/20",
                        Düşük: "text-(--color-accent-cyan-light) bg-cyan-500/10 border-cyan-500/20",
                      };
                      const channelTone: Record<string, string> = {
                        blue: "text-(--color-accent-blue-light)",
                        cyan: "text-(--color-accent-cyan-light)",
                        emerald: "text-(--color-accent-emerald-light)",
                        purple: "text-(--color-accent-purple-light)",
                      };
                      return (
                        <div key={ci} className="flex flex-col gap-2 min-w-0">
                          {/* Column header */}
                          <div className={`flex items-center justify-between px-2 py-1.5 rounded-lg border ${headerTone[col.tone]}`}>
                            <span className="text-[9px] font-bold uppercase tracking-wider text-white truncate">{col.title}</span>
                            <span className="text-[9px] font-mono font-bold">{col.count}</span>
                          </div>
                          {/* Cards */}
                          <div className="flex flex-col gap-1.5 flex-1">
                            {col.cards.map((c, i) => {
                              const ChIcon = c.channelIcon;
                              return (
                                <div
                                  key={i}
                                  className="rounded-lg bg-white/3 border border-white/8 p-2 flex flex-col gap-1.5 hover:bg-white/5 hover:border-white/15 transition-colors shadow-sm"
                                >
                                  <div className="flex items-center gap-1">
                                    <span className="text-[8px] font-mono text-(--color-text-muted)">{c.id}</span>
                                    <ChIcon className={`w-2.5 h-2.5 ml-auto ${channelTone[c.channelTone]}`} />
                                  </div>
                                  <span className="text-[10px] font-semibold text-white leading-tight">
                                    {c.title}
                                  </span>
                                  <div className="flex items-center justify-between">
                                    <span className={`text-[7px] font-mono font-semibold px-1.5 py-0.5 rounded-full border ${priorityTone[c.priority]}`}>
                                      {c.priority}
                                    </span>
                                    <div className="w-4 h-4 rounded-full bg-purple-500/30 border border-purple-500/40 flex items-center justify-center">
                                      <span className="text-[7px] font-bold text-white">A</span>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                            {/* Empty drop slot */}
                            <div className="rounded-lg border border-dashed border-white/10 h-8 flex items-center justify-center">
                              <span className="text-[8px] font-mono text-(--color-text-muted)">+ kart</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Footer indicator */}
                  <div className="flex items-center justify-between pt-1 border-t border-white/8">
                    <span className="text-[8px] font-mono uppercase tracking-widest text-(--color-text-muted)">
                      14 olay · gerçek zamanlı
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-(--color-accent-emerald-light) shadow-[0_0_8px_currentColor] animate-pulse" />
                      <span className="text-[8px] font-mono text-(--color-accent-emerald-light)">canlı</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-(--color-accent-purple-light)">
                <LayoutGrid size={32} />
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

      {/* 3. BENTO GRID — 8 kart */}
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[520px]"
          >
            {/* Bento Item 1 - İletişim (wide, cyan) — gecmis.png */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 lg:col-span-2 row-span-1 rounded-4xl bg-linear-to-br from-cyan-500/10 to-transparent border border-white/10 p-8 hover:bg-white/4 transition-colors relative overflow-hidden group flex flex-col md:flex-row gap-6 items-center"
            >
              <div className="w-full md:w-1/2 flex flex-col justify-center shrink-0">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-(--color-accent-cyan-light) flex items-center justify-center mb-6">
                  <MessageSquare />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {data.bento.items[0].title}
                </h3>
                <p className="text-sm text-(--color-text-secondary) font-light pr-4">
                  {data.bento.items[0].description}
                </p>
              </div>
              <div className="w-full md:w-1/2 h-45 md:h-full relative rounded-xl border border-white/10 overflow-hidden shadow-inner shrink-0 group-hover:border-cyan-500/40 transition-colors bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-2">
                {/* Header */}
                <div className="flex items-center justify-between pb-2 border-b border-white/8">
                  <div className="flex items-center gap-1.5">
                    <History className="w-3 h-3 text-(--color-accent-cyan-light)" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white">Olay Geçmişi</span>
                  </div>
                  <span className="text-[8px] font-mono text-(--color-text-muted)">#4218</span>
                </div>

                {/* Timeline */}
                <div className="flex-1 flex flex-col gap-2 overflow-hidden">
                  {[
                    { icon: AlertCircle, action: "Olay açıldı", actor: "Müşteri (e-posta)", time: "09:14", tone: "blue" },
                    { icon: Users, action: "Atandı: Ahmet Y.", actor: "Sistem", time: "09:15", tone: "purple" },
                    { icon: MessageSquare, action: "İlk yanıt gönderildi", actor: "Ahmet Y.", time: "09:18", tone: "cyan" },
                    { icon: Phone, action: "Kanal: telefon görüşmesi", actor: "Müşteri", time: "09:24", tone: "emerald" },
                    { icon: FileText, action: "Worklog: VPN sertifika yenilendi", actor: "Ahmet Y.", time: "09:28", tone: "amber" },
                    { icon: CheckCircle2, action: "Çözüldü ve kapatıldı", actor: "Ahmet Y.", time: "09:31", tone: "emerald" },
                  ].map((row, i, arr) => {
                    const Icon = row.icon;
                    const tone: Record<string, string> = {
                      blue: "bg-blue-500/15 border-blue-500/30 text-(--color-accent-blue-light)",
                      purple: "bg-purple-500/15 border-purple-500/30 text-(--color-accent-purple-light)",
                      cyan: "bg-cyan-500/15 border-cyan-500/30 text-(--color-accent-cyan-light)",
                      emerald: "bg-emerald-500/15 border-emerald-500/30 text-(--color-accent-emerald-light)",
                      amber: "bg-amber-500/15 border-amber-500/30 text-amber-300",
                    };
                    return (
                      <div key={i} className="flex items-start gap-2">
                        <div className="flex flex-col items-center pt-0.5">
                          <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${tone[row.tone]}`}>
                            <Icon className="w-2.5 h-2.5" />
                          </div>
                          {i < arr.length - 1 && (
                            <div className="w-px flex-1 mt-0.5 bg-linear-to-b from-white/15 to-white/0 min-h-2.5" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0 pb-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[9px] font-semibold text-white truncate">{row.action}</span>
                            <span className="text-[8px] font-mono text-(--color-text-muted) shrink-0">{row.time}</span>
                          </div>
                          <span className="text-[8px] text-(--color-text-secondary)">{row.actor}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Bento Item 2 - Toplu işlem (normal, orange) — gorusmeler.png */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-(--color-accent-orange-light) flex items-center justify-center mb-6 shrink-0">
                <Layers />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[1].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[1].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-3 flex flex-col gap-2">
                {/* Header — Conversations */}
                <div className="flex items-center justify-between pb-2 border-b border-white/8">
                  <div className="flex items-center gap-1.5">
                    <MessageCircle className="w-3 h-3 text-(--color-accent-orange-light)" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white">Görüşmeler</span>
                  </div>
                  <span className="text-[8px] font-mono text-(--color-accent-orange-light) px-1.5 py-0.5 rounded-full bg-orange-500/12 border border-orange-500/25">
                    3 yeni
                  </span>
                </div>

                {/* Conversation list */}
                <div className="flex-1 flex flex-col gap-1.5 overflow-hidden">
                  {[
                    {
                      icon: Mail,
                      channel: "E-posta",
                      from: "Müşteri",
                      preview: "VPN'e bağlanamıyorum, acil...",
                      time: "09:14",
                      unread: 1,
                      tone: "blue",
                    },
                    {
                      icon: Headphones,
                      channel: "Ajan",
                      from: "Ahmet Y.",
                      preview: "Hemen kontrol ediyorum, 5 dk...",
                      time: "09:18",
                      unread: 0,
                      tone: "purple",
                    },
                    {
                      icon: Phone,
                      channel: "Telefon",
                      from: "Müşteri",
                      preview: "Sertifika hatası alıyorum sürekli",
                      time: "09:24",
                      unread: 1,
                      tone: "emerald",
                    },
                    {
                      icon: Headphones,
                      channel: "Ajan",
                      from: "Ahmet Y.",
                      preview: "Sertifika yenilendi, deneyebilir misiniz?",
                      time: "09:28",
                      unread: 0,
                      tone: "purple",
                    },
                    {
                      icon: CheckCircle2,
                      channel: "Sistem",
                      from: "Otomatik",
                      preview: "Olay çözüldü olarak işaretlendi",
                      time: "09:31",
                      unread: 1,
                      tone: "emerald",
                    },
                  ].map((c, i) => {
                    const Icon = c.icon;
                    const tone: Record<string, string> = {
                      blue: "text-(--color-accent-blue-light) bg-blue-500/12 border-blue-500/25",
                      purple: "text-(--color-accent-purple-light) bg-purple-500/12 border-purple-500/25",
                      emerald: "text-(--color-accent-emerald-light) bg-emerald-500/12 border-emerald-500/25",
                    };
                    return (
                      <div
                        key={i}
                        className={`flex items-start gap-2 px-2 py-1.5 rounded-lg bg-white/2 border ${c.unread ? "border-white/15" : "border-white/5"} hover:bg-white/4 transition-colors`}
                      >
                        <div className={`w-6 h-6 rounded-md border flex items-center justify-center shrink-0 ${tone[c.tone]}`}>
                          <Icon className="w-3 h-3" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[9px] font-semibold text-white truncate">{c.from}</span>
                            <span className="text-[8px] font-mono text-(--color-text-muted) shrink-0">{c.time}</span>
                          </div>
                          <span className="text-[9px] text-(--color-text-secondary) truncate block">
                            {c.preview}
                          </span>
                        </div>
                        {c.unread > 0 && (
                          <span className="w-1.5 h-1.5 rounded-full bg-(--color-accent-orange-light) shadow-[0_0_8px_currentColor] mt-1 shrink-0" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Bento Item 3 - Quick Actions (normal, amber) — varlik.png, object-contain */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-6 shrink-0">
                <Zap />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[2].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[2].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-3 flex flex-col gap-2">
                <div className="flex items-center justify-between pb-2 border-b border-white/8">
                  <div className="flex items-center gap-1.5">
                    <Pin className="w-3 h-3 text-amber-300" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white">Sabitli Aksiyonlar</span>
                  </div>
                  <span className="text-[8px] font-mono text-(--color-text-muted)">⌘K</span>
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  {[
                    { icon: TrendingUp, label: "Önceliği Yükselt", shortcut: "⌘↑", tone: "red" },
                    { icon: Users, label: "Sahibi Değiştir", shortcut: "⌘U", tone: "blue" },
                    { icon: AlertTriangle, label: "Eskalasyon", shortcut: "⌘E", tone: "amber" },
                    { icon: FileText, label: "KB Makalesi Ekle", shortcut: "⌘K", tone: "cyan" },
                    { icon: GitBranch, label: "Probleme Dönüştür", shortcut: "⌘P", tone: "purple" },
                    { icon: CheckCircle2, label: "Çözüm + Kapat", shortcut: "⌘⏎", tone: "emerald" },
                  ].map((a, i) => {
                    const Icon = a.icon;
                    const tone: Record<string, string> = {
                      red: "text-(--color-accent-red-light) bg-red-500/12 border-red-500/20",
                      blue: "text-(--color-accent-blue-light) bg-blue-500/12 border-blue-500/20",
                      amber: "text-amber-300 bg-amber-500/12 border-amber-500/20",
                      cyan: "text-(--color-accent-cyan-light) bg-cyan-500/12 border-cyan-500/20",
                      purple: "text-(--color-accent-purple-light) bg-purple-500/12 border-purple-500/20",
                      emerald: "text-(--color-accent-emerald-light) bg-emerald-500/12 border-emerald-500/20",
                    };
                    return (
                      <div
                        key={i}
                        className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-white/2 border border-white/5 hover:bg-white/4 transition-colors"
                      >
                        <div className={`w-6 h-6 rounded-md border flex items-center justify-center shrink-0 ${tone[a.tone]}`}>
                          <Icon className="w-3 h-3" />
                        </div>
                        <span className="text-[10px] font-medium text-white flex-1">{a.label}</span>
                        <span className="text-[8px] font-mono text-(--color-text-muted) px-1.5 py-0.5 rounded bg-white/3 border border-white/8">
                          {a.shortcut}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Bento Item 4 - Görev & Worklog (wide, indigo) — worklog.png */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 lg:col-span-2 row-span-1 rounded-4xl bg-linear-to-br from-indigo-500/10 to-transparent border border-white/10 p-8 hover:bg-white/4 transition-colors relative overflow-hidden group flex flex-col md:flex-row gap-6 items-center"
            >
              <div className="w-full md:w-1/2 flex flex-col justify-center shrink-0">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-6">
                  <CheckSquare />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {data.bento.items[3].title}
                </h3>
                <p className="text-sm text-(--color-text-secondary) font-light pr-4">
                  {data.bento.items[3].description}
                </p>
              </div>
              <div className="w-full md:w-1/2 h-45 md:h-full relative rounded-xl border border-white/10 overflow-hidden shadow-inner shrink-0 group-hover:border-indigo-500/40 transition-colors bg-(--color-surface-elevated-solid) p-3 flex flex-col gap-2">
                {/* Header */}
                <div className="flex items-center justify-between pb-2 border-b border-white/8">
                  <div className="flex items-center gap-1.5">
                    <CheckSquare className="w-3 h-3 text-indigo-300" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white">Görev & Worklog</span>
                  </div>
                  <span className="text-[8px] font-mono font-semibold text-indigo-300 px-1.5 py-0.5 rounded-full bg-indigo-500/12 border border-indigo-500/25">
                    Bugün 4s 30d
                  </span>
                </div>

                {/* Tasks */}
                <div className="flex flex-col gap-1.5 flex-1 overflow-hidden">
                  {[
                    { task: "Sertifika yenileme", owner: "Ahmet Y.", effort: "1s 15d", status: "done" },
                    { task: "Log analizi", owner: "Selin K.", effort: "2s 00d", status: "done" },
                    { task: "Test ve doğrulama", owner: "Ahmet Y.", effort: "0s 45d", status: "active", dep: 2 },
                    { task: "KB makalesi yazımı", owner: "Ekip BT", effort: "0s 30d", status: "pending", dep: 3 },
                  ].map((t, i) => {
                    const isDone = t.status === "done";
                    const isActive = t.status === "active";
                    return (
                      <div
                        key={i}
                        className="grid grid-cols-[auto_1fr_auto_auto] gap-2 items-center px-2 py-1.5 rounded-lg bg-white/2 border border-white/5"
                      >
                        <div className="flex items-center gap-1">
                          {isDone ? (
                            <CheckSquare className="w-3 h-3 text-(--color-accent-emerald-light)" />
                          ) : isActive ? (
                            <div className="w-3 h-3 rounded border border-indigo-300 bg-indigo-500/20 animate-pulse" />
                          ) : (
                            <div className="w-3 h-3 rounded border border-white/15 bg-white/3" />
                          )}
                          {t.dep && (
                            <span className="text-[7px] font-mono text-(--color-text-muted)" title="bağımlılık">
                              ↳{t.dep}
                            </span>
                          )}
                        </div>
                        <span className={`text-[10px] font-medium truncate ${isDone ? "text-(--color-text-muted) line-through" : "text-white"}`}>
                          {t.task}
                        </span>
                        <span className="text-[8px] font-mono text-(--color-text-secondary)">{t.owner}</span>
                        <span className="text-[8px] font-mono font-semibold text-indigo-300">{t.effort}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Total bar */}
                <div className="flex items-center justify-between pt-1.5 border-t border-white/8">
                  <span className="text-[8px] font-mono uppercase tracking-widest text-(--color-text-muted)">Toplam efor</span>
                  <span className="text-[10px] font-mono font-bold text-white">4s 30d / 8s 00d</span>
                </div>
              </div>
            </motion.div>

            {/* Bento Item 5 - Çözüm AI (normal, purple) — cozum.png, object-contain */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-(--color-accent-purple-light) flex items-center justify-center mb-6 shrink-0">
                <Sparkles />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[4].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[4].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-3 flex flex-col gap-2">
                <div className="flex items-center justify-between pb-2 border-b border-white/8">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-(--color-accent-purple-light)" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white">AI Önerileri</span>
                  </div>
                  <span className="text-[8px] font-mono text-(--color-accent-purple-light)">analiz · 0.4s</span>
                </div>

                <div className="flex flex-col gap-1.5 flex-1">
                  {[
                    { icon: FileText, type: "KB Makalesi", title: "VPN sertifika yenileme prosedürü", match: 96 },
                    { icon: History, type: "Geçmiş Çözüm", title: "Olay #4180 — aynı semptom çözüldü", match: 89 },
                    { icon: Zap, type: "Otomasyon", title: "AD parola reset · self-servis", match: 72 },
                    { icon: Headphones, type: "Uzman", title: "Selin K. — bu konuda 18 olay çözdü", match: 64 },
                  ].map((s, i) => {
                    const Icon = s.icon;
                    const matchTone = s.match >= 90 ? "text-(--color-accent-emerald-light)" : s.match >= 80 ? "text-amber-300" : "text-(--color-accent-cyan-light)";
                    const barTone = s.match >= 90 ? "from-emerald-500 to-emerald-400" : s.match >= 80 ? "from-amber-500 to-amber-400" : "from-cyan-500 to-cyan-400";
                    return (
                      <div
                        key={i}
                        className="flex flex-col gap-1.5 px-2.5 py-2 rounded-lg bg-purple-500/5 border border-purple-500/15 hover:border-purple-500/30 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-md border border-purple-500/30 bg-purple-500/15 flex items-center justify-center shrink-0">
                            <Icon className="w-3 h-3 text-(--color-accent-purple-light)" />
                          </div>
                          <div className="flex flex-col flex-1 min-w-0">
                            <span className="text-[8px] font-mono uppercase tracking-wider text-(--color-text-muted)">
                              {s.type}
                            </span>
                            <span className="text-[10px] font-semibold text-white truncate">{s.title}</span>
                          </div>
                          <span className={`text-[10px] font-mono font-bold ${matchTone}`}>{s.match}%</span>
                        </div>
                        <div className="h-0.5 rounded-full bg-white/5 overflow-hidden">
                          <div className={`h-full bg-linear-to-r ${barTone}`} style={{ width: `${s.match}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Bento Item 6 - Tekrar & Problem (normal, red) — tekrarlananolay.png */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-red-500/20 text-(--color-accent-red-light) flex items-center justify-center mb-6 shrink-0">
                <Repeat />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[5].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[5].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-3 flex flex-col gap-2.5">
                <div className="flex items-center justify-between pb-2 border-b border-white/8">
                  <div className="flex items-center gap-1.5">
                    <Repeat className="w-3 h-3 text-(--color-accent-red-light)" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white">Tekrar Örüntüsü</span>
                  </div>
                  <span className="text-[8px] font-mono font-semibold text-(--color-accent-red-light) px-1.5 py-0.5 rounded-full bg-red-500/12 border border-red-500/25 animate-pulse">
                    12x
                  </span>
                </div>

                {/* Frequency mini bar chart */}
                <div className="flex flex-col gap-1">
                  <span className="text-[8px] font-medium uppercase tracking-wider text-(--color-text-muted)">Son 7 gün · sıklık</span>
                  <div className="flex items-end gap-1 h-12">
                    {[2, 1, 3, 1, 2, 4, 5].map((v, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                        <div
                          className={`w-full rounded-t bg-linear-to-t ${i >= 5 ? "from-red-500 to-red-400" : "from-red-500/40 to-red-400/60"} border border-red-500/30`}
                          style={{ height: `${(v / 5) * 100}%` }}
                        />
                        <span className="text-[7px] font-mono text-(--color-text-muted)">{["P","S","Ç","P","C","C","P"][i]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pattern detail */}
                <div className="rounded-lg bg-red-500/8 border border-red-500/20 p-2 flex flex-col gap-1">
                  <div className="flex items-center gap-1.5">
                    <AlertTriangle className="w-3 h-3 text-(--color-accent-red-light)" />
                    <span className="text-[9px] font-bold text-white">Aynı semptom · 30 gün</span>
                  </div>
                  <span className="text-[9px] text-(--color-text-secondary)">
                    &quot;VPN sertifika hatası&quot; — 12 kez tekrarladı, 4 farklı kullanıcı
                  </span>
                </div>

                {/* CTA */}
                <div className="mt-auto flex items-center justify-between gap-2 px-2.5 py-2 rounded-lg bg-purple-500/12 border border-purple-500/30 hover:border-purple-500/50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-1.5">
                    <GitBranch className="w-3 h-3 text-(--color-accent-purple-light)" />
                    <span className="text-[10px] font-semibold text-white">Probleme Dönüştür</span>
                  </div>
                  <ChevronRight className="w-3 h-3 text-(--color-accent-purple-light)" />
                </div>
              </div>
            </motion.div>

            {/* Bento Item 7 - CMDB İlişki (normal, cyan) — iliski.png, object-contain */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-(--color-accent-cyan-light) flex items-center justify-center mb-6 shrink-0">
                <Boxes />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[6].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[6].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-3 flex flex-col gap-2">
                <div className="flex items-center justify-between pb-2 border-b border-white/8">
                  <div className="flex items-center gap-1.5">
                    <Boxes className="w-3 h-3 text-(--color-accent-cyan-light)" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white">Etkilenen Varlıklar</span>
                  </div>
                  <span className="text-[8px] font-mono text-(--color-text-muted)">CMDB · 4 CI</span>
                </div>

                {/* Source incident */}
                <div className="flex items-center gap-2 px-2.5 py-2 rounded-lg bg-blue-500/10 border border-blue-500/25 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                  <AlertCircle className="w-3.5 h-3.5 text-(--color-accent-blue-light) shrink-0" />
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="text-[8px] font-mono text-(--color-text-muted)">Olay #4218</span>
                    <span className="text-[10px] font-semibold text-white truncate">VPN bağlantı sorunu</span>
                  </div>
                </div>

                {/* Dependency chain */}
                <div className="flex flex-col gap-1 flex-1">
                  {[
                    { icon: Server, label: "VPN Gateway", rel: "etkileniyor", level: 1, tone: "red" },
                    { icon: Database, label: "Auth Sunucusu", rel: "bağımlı", level: 2, tone: "amber" },
                    { icon: Boxes, label: "ERP Servisi", rel: "kullanır", level: 2, tone: "amber" },
                    { icon: Users, label: "42 son kullanıcı", rel: "etkilenir", level: 3, tone: "cyan" },
                  ].map((c, i) => {
                    const Icon = c.icon;
                    const tone: Record<string, string> = {
                      red: "text-(--color-accent-red-light) bg-red-500/12 border-red-500/25",
                      amber: "text-amber-300 bg-amber-500/12 border-amber-500/25",
                      cyan: "text-(--color-accent-cyan-light) bg-cyan-500/12 border-cyan-500/25",
                    };
                    return (
                      <div key={i} className="flex items-center gap-1.5" style={{ paddingLeft: `${c.level * 8}px` }}>
                        <ChevronRight className="w-2.5 h-2.5 text-(--color-text-muted) shrink-0" />
                        <div className={`flex items-center gap-1.5 px-2 py-1.5 rounded-md border flex-1 ${tone[c.tone]}`}>
                          <Icon className="w-2.5 h-2.5" />
                          <span className="text-[9px] font-semibold text-white truncate flex-1">{c.label}</span>
                          <span className="text-[7px] font-mono text-(--color-text-muted)">{c.rel}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-1.5 border-t border-white/8">
                  <span className="text-[8px] font-mono uppercase tracking-widest text-(--color-text-muted)">Etki kapsamı</span>
                  <span className="text-[9px] font-mono font-bold text-(--color-accent-red-light)">YÜKSEK</span>
                </div>
              </div>
            </motion.div>

            {/* Bento Item 8 - Kapatma & Hizmet Seviyesi (normal, emerald) — kapatmakurallari.png, object-contain */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-(--color-accent-emerald-light) flex items-center justify-center mb-6 shrink-0">
                <ShieldCheck />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[7].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[7].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-3 flex flex-col gap-2">
                <div className="flex items-center justify-between pb-2 border-b border-white/8">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3 h-3 text-(--color-accent-emerald-light)" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white">Kapatma Kontrol Listesi</span>
                  </div>
                  <span className="text-[8px] font-mono font-semibold text-(--color-accent-emerald-light) px-1.5 py-0.5 rounded-full bg-emerald-500/12 border border-emerald-500/25">
                    4/5 hazır
                  </span>
                </div>

                {/* Checklist */}
                <div className="flex flex-col gap-1.5 flex-1">
                  {[
                    { label: "Çözüm dökümante edildi", done: true },
                    { label: "Müşteri onayı alındı", done: true },
                    { label: "Hizmet Seviyesi içinde tamamlandı", done: true, badge: "00:17 / 04:00" },
                    { label: "OLA hedefi karşılandı", done: true },
                    { label: "KB makalesi güncellendi", done: false },
                  ].map((c, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border ${c.done ? "bg-emerald-500/8 border-emerald-500/20" : "bg-white/2 border-white/8"}`}
                    >
                      {c.done ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-(--color-accent-emerald-light) shrink-0" />
                      ) : (
                        <div className="w-3.5 h-3.5 rounded-full border border-white/20 bg-white/5 shrink-0" />
                      )}
                      <span className={`text-[10px] font-medium flex-1 ${c.done ? "text-white" : "text-(--color-text-muted)"}`}>
                        {c.label}
                      </span>
                      {c.badge && (
                        <span className="text-[8px] font-mono font-bold text-(--color-accent-emerald-light)">
                          {c.badge}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {/* CSAT */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-2 flex flex-col gap-0.5">
                    <span className="text-[8px] font-medium uppercase tracking-wider text-(--color-text-muted)">CSAT</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-base font-bold text-white">4.8</span>
                      <span className="text-[8px] font-mono text-(--color-text-muted)">/ 5</span>
                    </div>
                  </div>
                  <div className="rounded-lg bg-blue-500/10 border border-blue-500/20 p-2 flex flex-col gap-0.5">
                    <span className="text-[8px] font-medium uppercase tracking-wider text-(--color-text-muted)">MTTR</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-base font-bold text-white">17</span>
                      <span className="text-[8px] font-mono text-(--color-text-muted)">dk</span>
                    </div>
                  </div>
                </div>
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
                    <AlertCircle className="w-4 h-4 text-(--color-accent-blue-light)" />
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-text-overline)">
                      Olay Yönetimi
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
                        ITIL 4 Uyumlu
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                        <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-blue-base) shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                        MTTR İyileştirme
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                        <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-purple-base) shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
                        Hizmet Seviyesi Garantisi
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
