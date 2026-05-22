"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import {
  Sliders,
  ArrowRight,
  CheckCircle2,
  Settings,
  Users,
  Boxes,
  Gauge,
  Zap,
  Plus,
  ClipboardList,
  CalendarClock,
  Tags,
  Bell,
  FileText,
  ShieldCheck,
  MessageSquare,
  LayoutDashboard,
  Layers,
  Eye,
  ChevronRight,
  ChevronDown,
  Search,
  Mail,
  Phone,
  MessagesSquare,
  Building2,
  Briefcase,
  Wallet,
  Server,
  Cpu,
  Database,
  Network,
  Globe,
  Activity,
  AlertCircle,
  TrendingUp,
  Crown,
  HardDrive,
  Truck,
  Megaphone,
  Handshake,
} from "lucide-react";
import data from "@/data/yonetim-paneli.json";
import PrivacyContact from "@/components/ui/privacy-contact";

export default function YonetimPaneliPage() {
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
              <Sliders size={14} />
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
                  <Sliders className="w-5 h-5 text-(--color-accent-blue-light)" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-(--color-accent-blue-light)">
                    Yönetim Paneli · Admin
                  </span>
                  <span className="text-lg lg:text-xl font-bold text-white tracking-tight">
                    Sistem Yapılandırması
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-(--color-text-muted)">6 kategori · 40+ ayar</span>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-(--color-accent-emerald-light) shadow-[0_0_8px_currentColor] animate-pulse" />
                  <span className="text-[9px] font-mono uppercase tracking-widest text-(--color-accent-emerald-light)">canlı</span>
                </div>
              </div>
            </div>

            {/* 4 Pillar cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-5">
              {data.hero.pillars.map((p, i) => {
                const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
                  LayoutDashboard, Layers, Zap, Eye,
                };
                const Icon = iconMap[p.icon] || LayoutDashboard;
                const t: Record<string, string> = {
                  blue: "from-blue-500/15 to-blue-500/5 border-blue-500/25 text-(--color-accent-blue-light) shadow-[0_0_25px_rgba(59,130,246,0.12)]",
                  purple: "from-purple-500/15 to-purple-500/5 border-purple-500/25 text-(--color-accent-purple-light) shadow-[0_0_25px_rgba(168,85,247,0.12)]",
                  amber: "from-amber-500/15 to-amber-500/5 border-amber-500/25 text-amber-300 shadow-[0_0_25px_rgba(245,158,11,0.12)]",
                  emerald: "from-emerald-500/15 to-emerald-500/5 border-emerald-500/25 text-(--color-accent-emerald-light) shadow-[0_0_25px_rgba(16,185,129,0.12)]",
                };
                return (
                  <div key={i} className={`rounded-2xl bg-linear-to-br ${t[p.tone]} border p-3 lg:p-4 flex flex-col gap-2`}>
                    <Icon className="w-5 h-5" />
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm lg:text-base font-bold text-white">{p.title}</span>
                      <span className="text-[9px] font-mono text-(--color-text-muted)">{p.desc}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Admin layout: sidebar + main */}
            <div className="rounded-2xl border border-white/10 bg-(--color-surface-elevated-solid) p-4 flex gap-3">
              {/* Sidebar — categories */}
              <div className="w-44 shrink-0 flex flex-col gap-1 border-r border-white/8 pr-3">
                <span className="text-[8px] font-semibold uppercase tracking-widest text-(--color-text-muted) mb-1 px-1">
                  Kategoriler
                </span>
                {[
                  { icon: Settings, label: "Genel Yönetim", active: true, count: 11, tone: "blue" },
                  { icon: Users, label: "Organizasyon", count: 6, tone: "emerald" },
                  { icon: Boxes, label: "Varlık & CMDB", count: 7, tone: "purple" },
                  { icon: Sliders, label: "Gelişmiş Ayarlar", count: 12, tone: "amber" },
                  { icon: FileText, label: "Formlar", count: 1, tone: "cyan" },
                  { icon: Handshake, label: "Hizmet İlişkileri", count: 3, tone: "rose" },
                ].map((c, i) => {
                  const Icon = c.icon;
                  const dot: Record<string, string> = {
                    blue: "text-(--color-accent-blue-light)",
                    emerald: "text-(--color-accent-emerald-light)",
                    purple: "text-(--color-accent-purple-light)",
                    amber: "text-amber-300",
                    cyan: "text-(--color-accent-cyan-light)",
                    rose: "text-rose-300",
                  };
                  return (
                    <div
                      key={i}
                      className={`flex items-center gap-2 px-2 py-1.5 rounded-lg ${
                        c.active
                          ? "bg-blue-500/15 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                          : "border border-transparent hover:bg-white/3"
                      }`}
                    >
                      <Icon className={`w-3 h-3 shrink-0 ${c.active ? dot[c.tone] : "text-(--color-text-muted)"}`} />
                      <span className={`text-[10px] font-medium truncate flex-1 ${c.active ? "text-white" : "text-(--color-text-secondary)"}`}>
                        {c.label}
                      </span>
                      <span className="text-[8px] font-mono text-(--color-text-muted) shrink-0">{c.count}</span>
                    </div>
                  );
                })}
              </div>

              {/* Main — settings cards */}
              <div className="flex-1 flex flex-col gap-2 min-w-0">
                <div className="flex items-center justify-between pb-2 border-b border-white/8">
                  <div className="flex items-center gap-1.5">
                    <Settings className="w-3 h-3 text-(--color-accent-blue-light)" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white">Genel Yönetim Ayarları</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Search className="w-3 h-3 text-(--color-text-muted)" />
                    <span className="text-[8px] font-mono text-(--color-text-muted)">11 ayar</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                  {[
                    { icon: Settings, label: "Tema, Dil, Saat Dilimi", tone: "blue" },
                    { icon: Bell, label: "Uyarı & Bildirimler", tone: "purple" },
                    { icon: ClipboardList, label: "Süreç Şablonları", tone: "cyan" },
                    { icon: MessagesSquare, label: "Hazır Cevaplar", tone: "emerald" },
                    { icon: ShieldCheck, label: "Validasyon Kuralları", tone: "amber" },
                    { icon: Megaphone, label: "Duyurular", tone: "rose" },
                    { icon: CalendarClock, label: "İş Saatleri", tone: "indigo" },
                    { icon: Building2, label: "Konum & Alt Şirket", tone: "blue" },
                    { icon: Activity, label: "Denetim Günlükleri", tone: "amber" },
                  ].map((s, i) => {
                    const Icon = s.icon;
                    const t: Record<string, string> = {
                      blue: "text-(--color-accent-blue-light) bg-blue-500/10 border-blue-500/20",
                      purple: "text-(--color-accent-purple-light) bg-purple-500/10 border-purple-500/20",
                      cyan: "text-(--color-accent-cyan-light) bg-cyan-500/10 border-cyan-500/20",
                      emerald: "text-(--color-accent-emerald-light) bg-emerald-500/10 border-emerald-500/20",
                      amber: "text-amber-300 bg-amber-500/10 border-amber-500/20",
                      rose: "text-rose-300 bg-rose-500/10 border-rose-500/20",
                      indigo: "text-indigo-300 bg-indigo-500/10 border-indigo-500/20",
                    };
                    return (
                      <div key={i} className={`flex items-center gap-2 px-2.5 py-2 rounded-lg border ${t[s.tone]}`}>
                        <Icon className="w-3 h-3 shrink-0" />
                        <span className="text-[9px] font-medium text-white truncate flex-1">{s.label}</span>
                        <ChevronRight className="w-2.5 h-2.5 text-(--color-text-muted) shrink-0" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-(--color-surface-base) to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* 2. ZIG-ZAG FEATURE BLOCKS */}
      <section className="py-24 relative z-20">
        <div className="container mx-auto px-6 lg:px-12 w-full max-w-7xl flex flex-col gap-32">
          {/* Feature 1: Genel Yönetim */}
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
                      <Settings className="w-3.5 h-3.5 text-(--color-accent-blue-light)" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white">Şablonlar & Bildirimler</span>
                    </div>
                    <span className="text-[8px] font-mono text-(--color-accent-blue-light) px-1.5 py-0.5 rounded-full bg-blue-500/12 border border-blue-500/25">
                      Aktif
                    </span>
                  </div>

                  {/* Notification channels */}
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[8px] font-mono uppercase tracking-wider text-(--color-text-muted)">Bildirim Kanalları</span>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { icon: Mail, label: "E-posta", on: true, tone: "blue" },
                        { icon: Phone, label: "SMS", on: true, tone: "emerald" },
                        { icon: MessagesSquare, label: "Teams", on: true, tone: "purple" },
                      ].map((c, i) => {
                        const Icon = c.icon;
                        const t: Record<string, string> = {
                          blue: "text-(--color-accent-blue-light) bg-blue-500/12 border-blue-500/25",
                          emerald: "text-(--color-accent-emerald-light) bg-emerald-500/12 border-emerald-500/25",
                          purple: "text-(--color-accent-purple-light) bg-purple-500/12 border-purple-500/25",
                        };
                        return (
                          <div key={i} className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg border ${t[c.tone]}`}>
                            <Icon className="w-3 h-3" />
                            <span className="text-[9px] font-medium text-white flex-1">{c.label}</span>
                            <div className="w-3 h-1.5 rounded-full bg-(--color-accent-emerald-light) shadow-[0_0_6px_currentColor]" />
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Quick Create templates */}
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[8px] font-mono uppercase tracking-wider text-(--color-text-muted)">Süreç Şablonları (Quick Create)</span>
                    {[
                      { icon: AlertCircle, name: "Olay Şablonu", desc: "VPN sorunu · 4 alan", tone: "red" },
                      { icon: ClipboardList, name: "İstek Şablonu", desc: "Donanım talebi · 6 alan", tone: "blue" },
                      { icon: TrendingUp, name: "İyileştirme Şablonu", desc: "Süreç önerisi · 3 alan", tone: "purple" },
                    ].map((t, i) => {
                      const Icon = t.icon;
                      const tone: Record<string, string> = {
                        red: "text-(--color-accent-red-light)",
                        blue: "text-(--color-accent-blue-light)",
                        purple: "text-(--color-accent-purple-light)",
                      };
                      return (
                        <div key={i} className="flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-white/2 border border-white/5">
                          <Icon className={`w-3 h-3 ${tone[t.tone]}`} />
                          <div className="flex flex-col flex-1 min-w-0">
                            <span className="text-[10px] font-semibold text-white">{t.name}</span>
                            <span className="text-[8px] font-mono text-(--color-text-muted) truncate">{t.desc}</span>
                          </div>
                          <ChevronRight className="w-2.5 h-2.5 text-(--color-text-muted)" />
                        </div>
                      );
                    })}
                  </div>

                  {/* Validation + duyuru */}
                  <div className="grid grid-cols-2 gap-2 mt-auto">
                    <div className="flex flex-col gap-1 px-2.5 py-2 rounded-lg bg-amber-500/8 border border-amber-500/20">
                      <div className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3 h-3 text-amber-300" />
                        <span className="text-[8px] font-mono uppercase tracking-wider text-(--color-text-muted)">Validasyon</span>
                      </div>
                      <span className="text-base font-bold text-white">24 kural</span>
                    </div>
                    <div className="flex flex-col gap-1 px-2.5 py-2 rounded-lg bg-rose-500/8 border border-rose-500/20">
                      <div className="flex items-center gap-1.5">
                        <Megaphone className="w-3 h-3 text-rose-300" />
                        <span className="text-[8px] font-mono uppercase tracking-wider text-(--color-text-muted)">Duyuru</span>
                      </div>
                      <span className="text-base font-bold text-white">3 aktif</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-(--color-accent-blue-light)">
                <Settings size={32} />
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
                  { icon: Bell, label: "Bildirim Şablonları" },
                  { icon: FileText, label: "Quick Create" },
                  { icon: MessageSquare, label: "Hazır Cevaplar" },
                  { icon: ShieldCheck, label: "Validasyon" },
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

          {/* Feature 2: Organizasyon */}
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
                      <Users className="w-3.5 h-3.5 text-(--color-accent-emerald-light)" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white">Organizasyon Şeması</span>
                    </div>
                    <span className="text-[8px] font-mono text-(--color-text-muted)">1.284 kullanıcı · 24 grup</span>
                  </div>

                  {/* Org chart */}
                  <div className="flex flex-col gap-1.5 flex-1">
                    {/* Top: CEO/Yönetim */}
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-500/12 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                      <Crown className="w-3.5 h-3.5 text-(--color-accent-purple-light)" />
                      <div className="flex flex-col flex-1">
                        <span className="text-[10px] font-bold text-white">Yönetim · CAB</span>
                        <span className="text-[8px] font-mono text-(--color-text-muted)">5 onaylayan, 3 danışman</span>
                      </div>
                      <ShieldCheck className="w-3 h-3 text-(--color-accent-purple-light)" />
                    </div>

                    {/* Departments */}
                    <span className="text-[8px] font-mono uppercase tracking-wider text-(--color-text-muted) mt-1 px-1">Departmanlar</span>
                    {[
                      { icon: Server, name: "BT Departmanı", users: 124, technicians: 18, tone: "blue" },
                      { icon: Briefcase, name: "İK", users: 87, technicians: 6, tone: "cyan" },
                      { icon: Wallet, name: "Finans", users: 52, technicians: 4, tone: "emerald" },
                      { icon: Building2, name: "Tesis", users: 41, technicians: 8, tone: "amber" },
                    ].map((d, i) => {
                      const Icon = d.icon;
                      const tone: Record<string, string> = {
                        blue: "text-(--color-accent-blue-light)",
                        cyan: "text-(--color-accent-cyan-light)",
                        emerald: "text-(--color-accent-emerald-light)",
                        amber: "text-amber-300",
                      };
                      return (
                        <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/2 border border-white/5">
                          <Icon className={`w-3 h-3 ${tone[d.tone]}`} />
                          <span className="text-[10px] font-medium text-white flex-1">{d.name}</span>
                          <div className="flex items-center gap-1 text-[8px] font-mono">
                            <Users className="w-2 h-2 text-(--color-text-muted)" />
                            <span className="text-(--color-text-secondary)">{d.users}</span>
                            <span className="text-(--color-text-muted) mx-1">·</span>
                            <ShieldCheck className="w-2 h-2 text-(--color-text-muted)" />
                            <span className="text-(--color-text-secondary)">{d.technicians} tek.</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Roles matrix */}
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[8px] font-mono uppercase tracking-wider text-(--color-text-muted)">Rol Matrisi (8 rol)</span>
                    <div className="grid grid-cols-4 gap-1">
                      {[
                        { name: "Admin", color: "purple" },
                        { name: "Yönetici", color: "blue" },
                        { name: "Kıdemli Tek.", color: "cyan" },
                        { name: "Teknisyen", color: "emerald" },
                        { name: "Onaylayan", color: "amber" },
                        { name: "Danışman", color: "rose" },
                        { name: "Son Kul.", color: "indigo" },
                        { name: "Misafir", color: "amber" },
                      ].map((r, i) => {
                        const t: Record<string, string> = {
                          purple: "bg-purple-500/15 border-purple-500/30 text-(--color-accent-purple-light)",
                          blue: "bg-blue-500/15 border-blue-500/30 text-(--color-accent-blue-light)",
                          cyan: "bg-cyan-500/15 border-cyan-500/30 text-(--color-accent-cyan-light)",
                          emerald: "bg-emerald-500/15 border-emerald-500/30 text-(--color-accent-emerald-light)",
                          amber: "bg-amber-500/15 border-amber-500/30 text-amber-300",
                          rose: "bg-rose-500/15 border-rose-500/30 text-rose-300",
                          indigo: "bg-indigo-500/15 border-indigo-500/30 text-indigo-300",
                        };
                        return (
                          <div key={i} className={`text-[8px] font-semibold text-center px-1.5 py-1 rounded-md border ${t[r.color]}`}>
                            {r.name}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-(--color-accent-emerald-light)">
                <Users size={32} />
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

          {/* Feature 3: Varlık & Konfigürasyon */}
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
                      <Boxes className="w-3.5 h-3.5 text-(--color-accent-purple-light)" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white">Varlık & CMDB Yapılandırması</span>
                    </div>
                    <span className="text-[8px] font-mono text-(--color-text-muted)">342 CI · 7 ayar başlığı</span>
                  </div>

                  {/* Asset types grid */}
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[8px] font-mono uppercase tracking-wider text-(--color-text-muted)">Varlık Türleri</span>
                    <div className="grid grid-cols-4 gap-1.5">
                      {[
                        { icon: Server, name: "Sunucu", count: 86, tone: "blue" },
                        { icon: Cpu, name: "Uygulama", count: 124, tone: "purple" },
                        { icon: Database, name: "Veritabanı", count: 32, tone: "emerald" },
                        { icon: HardDrive, name: "Storage", count: 28, tone: "amber" },
                        { icon: Network, name: "Network", count: 42, tone: "cyan" },
                        { icon: Globe, name: "DNS", count: 14, tone: "indigo" },
                        { icon: Briefcase, name: "Lisans", count: 86, tone: "rose" },
                        { icon: Truck, name: "Diğer", count: 24, tone: "amber" },
                      ].map((a, i) => {
                        const Icon = a.icon;
                        const t: Record<string, string> = {
                          blue: "from-blue-500/15 to-blue-500/5 border-blue-500/25 text-(--color-accent-blue-light)",
                          purple: "from-purple-500/15 to-purple-500/5 border-purple-500/25 text-(--color-accent-purple-light)",
                          emerald: "from-emerald-500/15 to-emerald-500/5 border-emerald-500/25 text-(--color-accent-emerald-light)",
                          amber: "from-amber-500/15 to-amber-500/5 border-amber-500/25 text-amber-300",
                          cyan: "from-cyan-500/15 to-cyan-500/5 border-cyan-500/25 text-(--color-accent-cyan-light)",
                          indigo: "from-indigo-500/15 to-indigo-500/5 border-indigo-500/25 text-indigo-300",
                          rose: "from-rose-500/15 to-rose-500/5 border-rose-500/25 text-rose-300",
                        };
                        return (
                          <div key={i} className={`rounded-lg bg-linear-to-br ${t[a.tone]} border p-2 flex flex-col items-center gap-1`}>
                            <Icon className="w-3 h-3" />
                            <span className="text-[8px] font-semibold text-white">{a.name}</span>
                            <span className="text-[7px] font-mono text-(--color-text-muted)">{a.count}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Relationship types (CMDB) */}
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[8px] font-mono uppercase tracking-wider text-(--color-text-muted)">İlişki Türleri (CMDB)</span>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        { rel: "depends-on", count: 42, tone: "blue" },
                        { rel: "runs-on", count: 28, tone: "emerald" },
                        { rel: "hosts", count: 16, tone: "purple" },
                        { rel: "uses", count: 35, tone: "cyan" },
                      ].map((r, i) => {
                        const t: Record<string, string> = {
                          blue: "text-(--color-accent-blue-light)",
                          emerald: "text-(--color-accent-emerald-light)",
                          purple: "text-(--color-accent-purple-light)",
                          cyan: "text-(--color-accent-cyan-light)",
                        };
                        return (
                          <div key={i} className="flex items-center justify-between px-2.5 py-1.5 rounded-md bg-white/2 border border-white/5">
                            <div className="flex items-center gap-1.5">
                              <Network className={`w-2.5 h-2.5 ${t[r.tone]}`} />
                              <span className="text-[10px] font-mono font-medium text-white">{r.rel}</span>
                            </div>
                            <span className="text-[8px] font-mono text-(--color-text-muted)">{r.count}x</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Suppliers + contracts */}
                  <div className="grid grid-cols-2 gap-2 mt-auto">
                    <div className="flex flex-col gap-1 px-2.5 py-2 rounded-lg bg-purple-500/8 border border-purple-500/20">
                      <div className="flex items-center gap-1.5">
                        <Truck className="w-3 h-3 text-(--color-accent-purple-light)" />
                        <span className="text-[8px] font-mono uppercase tracking-wider text-(--color-text-muted)">Tedarikçiler</span>
                      </div>
                      <span className="text-base font-bold text-white">18</span>
                    </div>
                    <div className="flex flex-col gap-1 px-2.5 py-2 rounded-lg bg-cyan-500/8 border border-cyan-500/20">
                      <div className="flex items-center gap-1.5">
                        <FileText className="w-3 h-3 text-(--color-accent-cyan-light)" />
                        <span className="text-[8px] font-mono uppercase tracking-wider text-(--color-text-muted)">Sözleşmeler</span>
                      </div>
                      <span className="text-base font-bold text-white">42</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-(--color-accent-purple-light)">
                <Boxes size={32} />
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
            {/* Bento 1 - Hizmet Seviyesi & Kapatma (wide, görselli) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 lg:col-span-2 row-span-1 rounded-4xl bg-linear-to-br from-blue-500/10 to-transparent border border-white/10 p-8 hover:bg-white/4 transition-colors relative overflow-hidden group flex flex-col md:flex-row gap-6 items-center"
            >
              <div className="w-full md:w-1/2 flex flex-col justify-center shrink-0">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-(--color-accent-blue-light) flex items-center justify-center mb-6">
                  <Gauge />
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
                    <Gauge className="w-3 h-3 text-(--color-accent-blue-light)" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white">Hizmet Seviyesi Politikaları</span>
                  </div>
                  <span className="text-[8px] font-mono text-(--color-text-muted)">3 policy</span>
                </div>
                {/* Policies */}
                {[
                  { name: "Premium", target: "P1·P2", percent: 96, tone: "blue" },
                  { name: "Standart", target: "P3", percent: 92, tone: "cyan" },
                  { name: "Best-Effort", target: "P4", percent: 85, tone: "emerald" },
                ].map((p, i) => {
                  const tone: Record<string, string> = {
                    blue: "from-blue-500 to-cyan-400 text-(--color-accent-blue-light)",
                    cyan: "from-cyan-500 to-cyan-400 text-(--color-accent-cyan-light)",
                    emerald: "from-emerald-500 to-emerald-400 text-(--color-accent-emerald-light)",
                  };
                  const [grad, color] = tone[p.tone].split(" text-");
                  return (
                    <div key={i} className="flex flex-col gap-1">
                      <div className="grid grid-cols-[1fr_auto_auto] gap-1.5 items-center">
                        <span className="text-[10px] font-semibold text-white">{p.name}</span>
                        <span className="text-[8px] font-mono text-(--color-text-muted)">{p.target}</span>
                        <span className={`text-[10px] font-mono font-bold text-${color} w-10 text-right`}>%{p.percent}</span>
                      </div>
                      <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                        <div className={`h-full bg-linear-to-r ${grad} rounded-full`} style={{ width: `${p.percent}%` }} />
                      </div>
                    </div>
                  );
                })}
                {/* Kapatma kuralları */}
                <div className="mt-auto flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-blue-500/10 border border-blue-500/20">
                  <CheckCircle2 className="w-2.5 h-2.5 text-(--color-accent-blue-light)" />
                  <span className="text-[9px] font-medium text-white flex-1">Otomatik Kapatma Kuralları</span>
                  <span className="text-[8px] font-mono font-bold text-(--color-accent-blue-light)">12 aktif</span>
                </div>
              </div>
            </motion.div>

            {/* Bento 2 - Otomasyon (normal, mock) */}
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
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-2 justify-center">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-orange-500/10 border border-orange-500/20">
                  <span className="text-[9px] font-mono font-bold text-(--color-accent-orange-light) px-1.5 py-0.5 rounded bg-orange-500/15">
                    IF
                  </span>
                  <span className="text-[10px] text-white">öncelik = Yüksek</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <span className="text-[9px] font-mono font-bold text-(--color-accent-emerald-light) px-1.5 py-0.5 rounded bg-emerald-500/15">
                    THEN
                  </span>
                  <span className="text-[10px] text-white">L2 takıma ata</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <span className="text-[9px] font-medium uppercase tracking-wider text-(--color-text-muted)">
                    Aktif kural
                  </span>
                  <span className="text-[10px] font-mono font-bold text-white">
                    32 adet
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Bento 3 - Ek alanlar (normal, mock) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-(--color-accent-cyan-light) flex items-center justify-center mb-6 shrink-0">
                <Plus />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[2].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[2].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-1.5 justify-center">
                {[
                  { name: "Maliyet Merkezi", type: "Text" },
                  { name: "Proje Kodu", type: "Picklist" },
                  { name: "Risk Skoru", type: "Number" },
                  { name: "Lokasyon", type: "Lookup" },
                ].map((row, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-white/3 border border-white/5"
                  >
                    <span className="text-[10px] font-medium text-white">
                      {row.name}
                    </span>
                    <span className="text-[9px] font-mono text-(--color-accent-cyan-light) px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                      {row.type}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bento 4 - Anket & İş Akışı (wide, mock) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 lg:col-span-2 row-span-1 rounded-4xl bg-linear-to-br from-purple-500/10 to-transparent border border-white/10 p-8 hover:bg-white/4 transition-colors relative overflow-hidden group flex flex-col md:flex-row gap-6 items-center"
            >
              <div className="w-full md:w-1/2 flex flex-col justify-center shrink-0">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-(--color-accent-purple-light) flex items-center justify-center mb-6">
                  <ClipboardList />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {data.bento.items[3].title}
                </h3>
                <p className="text-sm text-(--color-text-secondary) font-light pr-4">
                  {data.bento.items[3].description}
                </p>
              </div>
              <div className="w-full md:w-1/2 h-45 md:h-full relative rounded-xl border border-white/10 overflow-hidden shadow-inner shrink-0 bg-(--color-surface-elevated-solid) group-hover:border-purple-500/40 transition-colors p-5 flex flex-col gap-2 justify-center">
                <span className="text-[9px] font-semibold uppercase tracking-widest text-(--color-text-muted)">
                  Memnuniyet Anketi
                </span>
                <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/3 border border-white/8">
                  <span className="text-[10px] font-medium text-white">
                    Genel deneyim
                  </span>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${
                          i <= 4
                            ? "bg-(--color-accent-purple-light)"
                            : "bg-white/10"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/3 border border-white/8">
                  <span className="text-[10px] font-medium text-white">
                    Çözüm hızı
                  </span>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${
                          i <= 5
                            ? "bg-(--color-accent-purple-light)"
                            : "bg-white/10"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-1 mt-1 border-t border-white/5">
                  <span className="text-[9px] font-medium uppercase tracking-wider text-(--color-text-muted)">
                    Kapanış sonrası
                  </span>
                  <span className="text-[10px] font-mono text-(--color-accent-emerald-light)">
                    otomatik gönder
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Bento 5 - Zamanlanmış (normal, mock) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 border border-white/10 bg-linear-to-br from-indigo-500/5 to-transparent rounded-4xl p-8 hover:bg-white/4 transition-colors flex flex-col overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-6 shrink-0">
                <CalendarClock />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[4].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[4].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-2 justify-center">
                {[
                  { task: "Aylık bakım", repeat: "her ayın 1'i" },
                  { task: "Yedekleme kontrolü", repeat: "haftalık" },
                  { task: "Lisans denetim", repeat: "yıllık" },
                ].map((row, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/3 border border-white/5"
                  >
                    <div className="flex items-center gap-2">
                      <CalendarClock className="w-3 h-3 text-indigo-400" />
                      <span className="text-[10px] font-medium text-white">
                        {row.task}
                      </span>
                    </div>
                    <span className="text-[9px] font-mono text-indigo-400">
                      {row.repeat}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bento 6 - Global Statuslar (normal, mock) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-(--color-accent-emerald-light) flex items-center justify-center mb-6 shrink-0">
                <Tags />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[5].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[5].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-wrap content-center gap-2 justify-center">
                {[
                  { label: "Yeni", color: "blue" },
                  { label: "İşlemde", color: "orange" },
                  { label: "Beklemede", color: "amber" },
                  { label: "Çözüldü", color: "cyan" },
                  { label: "Tamamlandı", color: "emerald" },
                  { label: "İptal", color: "red" },
                ].map((row, i) => (
                  <span
                    key={i}
                    className={`text-[10px] font-medium px-2.5 py-1 rounded-full border ${
                      row.color === "blue"
                        ? "bg-blue-500/10 border-blue-500/20 text-(--color-accent-blue-light)"
                        : row.color === "orange"
                          ? "bg-orange-500/10 border-orange-500/20 text-(--color-accent-orange-light)"
                          : row.color === "amber"
                            ? "bg-amber-500/10 border-amber-500/20 text-amber-300"
                            : row.color === "cyan"
                              ? "bg-cyan-500/10 border-cyan-500/20 text-(--color-accent-cyan-light)"
                              : row.color === "emerald"
                                ? "bg-emerald-500/10 border-emerald-500/20 text-(--color-accent-emerald-light)"
                                : "bg-red-500/10 border-red-500/20 text-red-400"
                    }`}
                  >
                    {row.label}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3.5 CATEGORIES — tüm 6 kategori detay grid */}
      <section className="py-24 relative z-20 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-300 h-150 bg-blue-600/8 blur-[140px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-6 lg:px-12 w-full max-w-7xl relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
              <LayoutDashboard className="w-3.5 h-3.5 text-(--color-accent-blue-light)" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-(--color-accent-blue-light)">
                Tüm Yapılandırma Yetkinlikleri
              </span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-white mb-6">
              {data.categories.sectionTitle}
            </h2>
            <p className="text-(--color-text-secondary) text-lg font-light leading-relaxed">
              {data.categories.sectionSubtitle}
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6"
          >
            {data.categories.groups.map((g) => {
              const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
                Settings, Users, Boxes, Sliders, FileText, Handshake,
              };
              const Icon = iconMap[g.icon] || Settings;
              const t: Record<string, { card: string; icon: string; chip: string; itemBg: string }> = {
                blue: {
                  card: "from-blue-500/12 to-blue-500/3 border-blue-500/25 shadow-[0_0_25px_rgba(59,130,246,0.1)]",
                  icon: "bg-blue-500/20 border-blue-500/35 text-(--color-accent-blue-light)",
                  chip: "bg-blue-500/15 border-blue-500/30 text-(--color-accent-blue-light)",
                  itemBg: "hover:bg-blue-500/8",
                },
                emerald: {
                  card: "from-emerald-500/12 to-emerald-500/3 border-emerald-500/25 shadow-[0_0_25px_rgba(16,185,129,0.1)]",
                  icon: "bg-emerald-500/20 border-emerald-500/35 text-(--color-accent-emerald-light)",
                  chip: "bg-emerald-500/15 border-emerald-500/30 text-(--color-accent-emerald-light)",
                  itemBg: "hover:bg-emerald-500/8",
                },
                purple: {
                  card: "from-purple-500/12 to-purple-500/3 border-purple-500/25 shadow-[0_0_25px_rgba(168,85,247,0.1)]",
                  icon: "bg-purple-500/20 border-purple-500/35 text-(--color-accent-purple-light)",
                  chip: "bg-purple-500/15 border-purple-500/30 text-(--color-accent-purple-light)",
                  itemBg: "hover:bg-purple-500/8",
                },
                amber: {
                  card: "from-amber-500/12 to-amber-500/3 border-amber-500/25 shadow-[0_0_25px_rgba(245,158,11,0.1)]",
                  icon: "bg-amber-500/20 border-amber-500/35 text-amber-300",
                  chip: "bg-amber-500/15 border-amber-500/30 text-amber-300",
                  itemBg: "hover:bg-amber-500/8",
                },
                cyan: {
                  card: "from-cyan-500/12 to-cyan-500/3 border-cyan-500/25 shadow-[0_0_25px_rgba(6,182,212,0.1)]",
                  icon: "bg-cyan-500/20 border-cyan-500/35 text-(--color-accent-cyan-light)",
                  chip: "bg-cyan-500/15 border-cyan-500/30 text-(--color-accent-cyan-light)",
                  itemBg: "hover:bg-cyan-500/8",
                },
                rose: {
                  card: "from-rose-500/12 to-rose-500/3 border-rose-500/25 shadow-[0_0_25px_rgba(244,63,94,0.1)]",
                  icon: "bg-rose-500/20 border-rose-500/35 text-rose-300",
                  chip: "bg-rose-500/15 border-rose-500/30 text-rose-300",
                  itemBg: "hover:bg-rose-500/8",
                },
              };
              const tone = t[g.tone];
              return (
                <motion.div
                  key={g.id}
                  variants={fadeUp}
                  className={`rounded-3xl bg-linear-to-br ${tone.card} border p-6 lg:p-7 flex flex-col gap-4`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0 ${tone.icon}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col gap-1 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg lg:text-xl font-bold text-white tracking-tight">{g.title}</h3>
                        <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full border ${tone.chip}`}>
                          {g.items.length}
                        </span>
                      </div>
                      <span className="text-[11px] text-(--color-text-muted) font-light">{g.subtitle}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    {g.items.map((item, j) => (
                      <div
                        key={j}
                        className={`flex items-start gap-2.5 px-3 py-2 rounded-lg bg-white/2 border border-white/5 transition-colors ${tone.itemBg}`}
                      >
                        <CheckCircle2 className="w-3 h-3 text-(--color-text-secondary) shrink-0 mt-0.5" />
                        <div className="flex flex-col flex-1 min-w-0">
                          <span className="text-[11px] font-semibold text-white">{item.title}</span>
                          <span className="text-[10px] text-(--color-text-muted) font-light">{item.desc}</span>
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
              <Sliders className="w-3.5 h-3.5 text-(--color-accent-blue-light)" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-(--color-accent-blue-light)">
                Yönetim Paneli Bilgi Bankası
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
                LayoutDashboard, Settings, Users, Boxes, Zap,
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
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

                <div className="relative z-10 w-full">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 mx-auto">
                    <Sliders className="w-4 h-4 text-(--color-accent-blue-light)" />
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-text-overline)">
                      Yönetim Paneli
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
                        Genel Yönetim
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                        <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-blue-base) shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                        Organizasyon
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                        <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-purple-base) shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
                        CMDB & Hizmet Seviyesi
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
