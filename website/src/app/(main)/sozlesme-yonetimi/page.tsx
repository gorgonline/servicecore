"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import {
  FileSignature,
  ArrowRight,
  CheckCircle2,
  Building2,
  Truck,
  ShieldCheck,
  FolderOpen,
  Bell,
  Users,
  Tags,
  LineChart,
  Plus,
  FileText,
  Boxes,
  Wallet,
  GitBranch,
  History,
  Repeat,
  ChevronDown,
  ChevronRight,
  Search,
  CalendarDays,
  AlertCircle,
  Activity,
} from "lucide-react";
import data from "@/data/sozlesme-yonetimi.json";

export default function SozlesmeYonetimiPage() {
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
              <FileSignature size={14} />
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
                  <FileSignature className="w-5 h-5 text-(--color-accent-blue-light)" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-(--color-accent-blue-light)">
                    Sözleşme Yönetimi · Contract Management
                  </span>
                  <span className="text-lg lg:text-xl font-bold text-white tracking-tight">
                    Tüm Sözleşmeler
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-(--color-text-muted)">86 sözleşme · 3 tip</span>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-(--color-accent-emerald-light) shadow-[0_0_8px_currentColor] animate-pulse" />
                  <span className="text-[9px] font-mono uppercase tracking-widest text-(--color-accent-emerald-light)">canlı</span>
                </div>
              </div>
            </div>

            {/* KPI metric row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-5">
              {[
                { icon: Building2, label: "OLA (İç Destek)", value: "24", trend: "aktif", tone: "blue" },
                { icon: Truck, label: "Tedarikçi", value: "32", trend: "aktif", tone: "emerald" },
                { icon: ShieldCheck, label: "SLA (Müşteri)", value: "30", trend: "aktif", tone: "purple" },
                { icon: Bell, label: "30g İçinde Yenileme", value: "8", trend: "uyarı", tone: "amber" },
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

            {/* Contract table */}
            <div className="rounded-2xl border border-white/10 bg-(--color-surface-elevated-solid) p-4 mb-5">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/8">
                <div className="flex items-center gap-1.5">
                  <FileSignature className="w-3.5 h-3.5 text-(--color-accent-blue-light)" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white">Sözleşme Listesi · Yenilenecekler</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Search className="w-2.5 h-2.5 text-(--color-text-muted)" />
                  <span className="text-[8px] font-mono text-(--color-text-muted)">5 / 86</span>
                </div>
              </div>

              <div className="grid grid-cols-[auto_auto_1fr_auto_auto_auto] gap-2 px-3 py-1.5 text-[8px] font-semibold uppercase tracking-widest text-(--color-text-muted) bg-white/2 border border-white/5 rounded-md">
                <span>CNR</span>
                <span>Tip</span>
                <span>Sözleşme</span>
                <span>Maliyet</span>
                <span>Bitiş</span>
                <span>Durum</span>
              </div>
              <div className="flex flex-col gap-1.5 mt-1.5">
                {[
                  { cnr: "CNR-218", type: "OLA", typeIcon: Building2, name: "BT → İK Servis Sözleşmesi", cost: "—", end: "08 May 2026", status: "yaklaşıyor", typeTone: "blue", statusTone: "amber" },
                  { cnr: "CNR-217", type: "SLA", typeIcon: ShieldCheck, name: "Acme Premium 7/24", cost: "240k₺", end: "12 Ara 2026", status: "aktif", typeTone: "purple", statusTone: "emerald" },
                  { cnr: "CNR-215", type: "Tedarikçi", typeIcon: Truck, name: "Microsoft 365 Lisans", cost: "180k₺", end: "21 May 2026", status: "yaklaşıyor", typeTone: "emerald", statusTone: "amber" },
                  { cnr: "CNR-212", type: "Tedarikçi", typeIcon: Truck, name: "Cisco Network Bakım", cost: "92k₺", end: "03 Haz 2026", status: "yaklaşıyor", typeTone: "emerald", statusTone: "amber" },
                  { cnr: "CNR-208", type: "OLA", typeIcon: Building2, name: "BT → Finans Destek", cost: "—", end: "15 May 2026", status: "kritik", typeTone: "blue", statusTone: "red" },
                ].map((r, i) => {
                  const TypeIcon = r.typeIcon;
                  const typeT: Record<string, string> = {
                    blue: "text-(--color-accent-blue-light) bg-blue-500/12 border-blue-500/25",
                    emerald: "text-(--color-accent-emerald-light) bg-emerald-500/12 border-emerald-500/25",
                    purple: "text-(--color-accent-purple-light) bg-purple-500/12 border-purple-500/25",
                  };
                  const statusT: Record<string, string> = {
                    emerald: "text-(--color-accent-emerald-light) bg-emerald-500/10 border-emerald-500/20",
                    amber: "text-amber-300 bg-amber-500/10 border-amber-500/20",
                    red: "text-(--color-accent-red-light) bg-red-500/10 border-red-500/20",
                  };
                  return (
                    <div key={i} className="grid grid-cols-[auto_auto_1fr_auto_auto_auto] gap-2 items-center px-3 py-2 rounded-lg bg-white/2 border border-white/5 hover:bg-white/4 transition-colors">
                      <span className="text-[8px] font-mono font-bold text-(--color-accent-blue-light)">{r.cnr}</span>
                      <span className={`text-[8px] font-mono font-semibold px-1.5 py-0.5 rounded-full border flex items-center gap-1 ${typeT[r.typeTone]}`}>
                        <TypeIcon className="w-2.5 h-2.5" />
                        {r.type}
                      </span>
                      <span className="text-[10px] font-medium text-white truncate">{r.name}</span>
                      <span className="text-[9px] font-mono font-semibold text-(--color-accent-amber-light) hidden sm:block">{r.cost}</span>
                      <span className="text-[8px] font-mono text-(--color-text-muted)">{r.end}</span>
                      <span className={`text-[8px] font-mono font-semibold px-1.5 py-0.5 rounded-full border ${statusT[r.statusTone]}`}>{r.status}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Lifecycle horizontal preview */}
            <div className="rounded-2xl border border-white/10 bg-(--color-surface-elevated-solid) p-3 flex items-center justify-between gap-2 overflow-x-auto">
              {[
                { label: "Oluştur", icon: Plus },
                { label: "Detay", icon: FileText },
                { label: "Onay", icon: CheckCircle2 },
                { label: "Varlık", icon: Boxes },
                { label: "Finans", icon: Wallet },
                { label: "İlişki", icon: GitBranch },
                { label: "Bildirim", icon: Bell },
                { label: "Geçmiş", icon: History },
              ].map((s, i, arr) => {
                const Icon = s.icon;
                return (
                  <div key={i} className="flex items-center gap-1 shrink-0">
                    <div className="w-6 h-6 rounded-md bg-blue-500/15 border border-blue-500/30 flex items-center justify-center">
                      <Icon className="w-3 h-3 text-(--color-accent-blue-light)" />
                    </div>
                    <span className="text-[9px] font-semibold text-white whitespace-nowrap">{s.label}</span>
                    {i < arr.length - 1 && <ChevronRight className="w-2.5 h-2.5 text-(--color-text-muted) ml-1" />}
                  </div>
                );
              })}
            </div>

            <div className="absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-(--color-surface-base) to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* 2. ZIG-ZAG FEATURE BLOCKS */}
      <section className="py-24 relative z-20">
        <div className="container mx-auto px-6 lg:px-12 w-full max-w-7xl flex flex-col gap-32">
          {/* Feature 1: OLA */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "100px" }}
            variants={fadeUp}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-blue-500/5 to-cyan-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-blue-500/10 blur-[50px] group-hover:bg-blue-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full h-135 rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-(--color-surface-elevated-solid) flex flex-col p-5 gap-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/8">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center">
                        <Building2 className="w-4 h-4 text-(--color-accent-blue-light)" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[8px] font-mono uppercase tracking-wider text-(--color-text-muted)">OLA · Kurum İçi Destek</span>
                        <span className="text-[12px] font-bold text-white">CNR-218 · BT → İK Destek</span>
                      </div>
                    </div>
                    <span className="text-[8px] font-mono font-semibold text-(--color-accent-emerald-light) px-1.5 py-0.5 rounded-full bg-emerald-500/12 border border-emerald-500/25">
                      AKTİF
                    </span>
                  </div>

                  {/* Parties */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-lg bg-blue-500/8 border border-blue-500/20 p-2.5 flex flex-col gap-1">
                      <span className="text-[8px] font-mono uppercase tracking-wider text-(--color-text-muted)">Hizmet Veren</span>
                      <div className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3 h-3 text-(--color-accent-blue-light)" />
                        <span className="text-[10px] font-bold text-white">BT Departmanı</span>
                      </div>
                      <span className="text-[8px] text-(--color-text-secondary)">18 teknisyen · L1-L3</span>
                    </div>
                    <div className="rounded-lg bg-purple-500/8 border border-purple-500/20 p-2.5 flex flex-col gap-1">
                      <span className="text-[8px] font-mono uppercase tracking-wider text-(--color-text-muted)">Hizmet Alan</span>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3 h-3 text-(--color-accent-purple-light)" />
                        <span className="text-[10px] font-bold text-white">İK Departmanı</span>
                      </div>
                      <span className="text-[8px] text-(--color-text-secondary)">87 kullanıcı · 3 lokasyon</span>
                    </div>
                  </div>

                  {/* SLA targets */}
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[8px] font-mono uppercase tracking-wider text-(--color-text-muted)">Kapsam & SLA Hedefleri</span>
                    {[
                      { label: "Yanıt Süresi (P1)", target: "15 dk", percent: 96, tone: "emerald" },
                      { label: "Çözüm Süresi (P2)", target: "4 saat", percent: 92, tone: "emerald" },
                      { label: "Eskalasyon", target: "30 dk", percent: 88, tone: "amber" },
                    ].map((t, i) => {
                      const tone: Record<string, string> = {
                        emerald: "from-emerald-500 to-emerald-400 text-(--color-accent-emerald-light)",
                        amber: "from-amber-500 to-amber-400 text-amber-300",
                      };
                      const [grad, color] = tone[t.tone].split(" text-");
                      return (
                        <div key={i} className="flex flex-col gap-1">
                          <div className="flex items-center justify-between text-[10px]">
                            <span className="font-medium text-white">{t.label}</span>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-semibold text-white">{t.target}</span>
                              <span className={`font-mono font-bold text-${color} w-10 text-right`}>%{t.percent}</span>
                            </div>
                          </div>
                          <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                            <div className={`h-full bg-linear-to-r ${grad} rounded-full`} style={{ width: `${t.percent}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Files & docs */}
                  <div className="flex items-center gap-2 px-2.5 py-2 rounded-md bg-white/2 border border-white/5">
                    <FolderOpen className="w-3 h-3 text-(--color-accent-blue-light)" />
                    <span className="text-[9px] text-white flex-1">Ek Belgeler</span>
                    <span className="text-[8px] font-mono text-(--color-text-muted)">3 dosya · 2.4 MB</span>
                    <ChevronRight className="w-2.5 h-2.5 text-(--color-text-muted)" />
                  </div>

                  {/* Footer chip */}
                  <div className="flex items-center justify-between pt-1 border-t border-white/8 mt-auto">
                    <div className="flex items-center gap-1.5">
                      <CalendarDays className="w-2.5 h-2.5 text-(--color-text-muted)" />
                      <span className="text-[8px] font-mono text-(--color-text-muted)">12 Ara 2025 — 12 Ara 2026</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Repeat className="w-2.5 h-2.5 text-(--color-accent-emerald-light)" />
                      <span className="text-[8px] font-mono font-bold text-(--color-accent-emerald-light)">Otomatik yenileme</span>
                    </div>
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

          {/* Feature 2: Tedarikçi */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "100px" }}
            variants={fadeUp}
            className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-emerald-500/5 to-cyan-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-emerald-500/10 blur-[50px] group-hover:bg-emerald-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full h-135 rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-(--color-surface-elevated-solid) flex flex-col p-5 gap-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/8">
                    <div className="flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-(--color-accent-emerald-light)" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white">Tedarikçi Sözleşmeleri</span>
                    </div>
                    <span className="text-[8px] font-mono font-bold text-(--color-accent-emerald-light) px-1.5 py-0.5 rounded-full bg-emerald-500/12 border border-emerald-500/25">
                      18 tedarikçi · 32 sözleşme
                    </span>
                  </div>

                  {/* Supplier list */}
                  <div className="flex flex-col gap-1.5 flex-1">
                    {[
                      { supplier: "Microsoft", contract: "M365 E5 · 250 lisans", cost: "180k₺", end: "21 May 2026", urgency: "yenileme", performance: 96 },
                      { supplier: "Cisco", contract: "Network Bakım Anlaşması", cost: "92k₺", end: "03 Haz 2026", urgency: "yenileme", performance: 94 },
                      { supplier: "Dell", contract: "Sunucu Garanti", cost: "240k₺", end: "12 Ara 2026", urgency: "aktif", performance: 91 },
                      { supplier: "VMware", contract: "vSphere Lisans", cost: "120k₺", end: "08 Eyl 2026", urgency: "aktif", performance: 88 },
                      { supplier: "Symantec", contract: "Endpoint Güvenlik", cost: "65k₺", end: "15 Eki 2026", urgency: "aktif", performance: 92 },
                    ].map((s, i) => {
                      const urg: Record<string, string> = {
                        yenileme: "text-amber-300 bg-amber-500/10 border-amber-500/20",
                        aktif: "text-(--color-accent-emerald-light) bg-emerald-500/10 border-emerald-500/20",
                      };
                      return (
                        <div key={i} className="flex flex-col gap-1.5 px-2.5 py-2 rounded-lg bg-white/2 border border-white/5">
                          <div className="grid grid-cols-[auto_1fr_auto_auto] gap-2 items-center">
                            <Truck className="w-3 h-3 text-(--color-accent-emerald-light)" />
                            <div className="flex flex-col min-w-0">
                              <span className="text-[10px] font-bold text-white truncate">{s.supplier}</span>
                              <span className="text-[8px] font-mono text-(--color-text-muted) truncate">{s.contract}</span>
                            </div>
                            <span className="text-[9px] font-mono font-bold text-amber-300">{s.cost}</span>
                            <span className={`text-[7px] font-mono font-semibold px-1 py-0.5 rounded-full border ${urg[s.urgency]}`}>{s.urgency}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[7px] font-mono text-(--color-text-muted)">PERFORMANS</span>
                            <div className="h-1 flex-1 rounded-full bg-white/5 overflow-hidden">
                              <div className="h-full bg-linear-to-r from-emerald-500 to-emerald-400 rounded-full" style={{ width: `${s.performance}%` }} />
                            </div>
                            <span className="text-[8px] font-mono font-bold text-(--color-accent-emerald-light)">%{s.performance}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-1.5 border-t border-white/8">
                    <span className="text-[8px] font-mono uppercase tracking-widest text-(--color-text-muted)">Toplam Tedarik Maliyeti</span>
                    <span className="text-[10px] font-mono font-bold text-amber-300">697k₺ / yıl</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-(--color-accent-emerald-light)">
                <Truck size={32} />
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

          {/* Feature 3: SLA Müşteri */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "100px" }}
            variants={fadeUp}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-purple-500/5 to-indigo-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-purple-500/10 blur-[50px] group-hover:bg-purple-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full h-135 rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-(--color-surface-elevated-solid) flex flex-col p-5 gap-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/8">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-(--color-accent-purple-light)" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white">SLA · Müşteri Hizmet Sözleşmeleri</span>
                    </div>
                    <span className="text-[8px] font-mono text-(--color-text-muted)">3 katman · 30 müşteri</span>
                  </div>

                  {/* SLA tier matrix */}
                  <div className="flex flex-col gap-2 flex-1">
                    {[
                      { tier: "Premium · 7/24", customers: 8, sla: 98, response: "15dk", resolve: "2sa", tone: "purple" },
                      { tier: "Standart · Mesai", customers: 14, sla: 94, response: "30dk", resolve: "4sa", tone: "blue" },
                      { tier: "Best-Effort", customers: 8, sla: 87, response: "1sa", resolve: "8sa", tone: "emerald" },
                    ].map((s, i) => {
                      const tone: Record<string, string> = {
                        purple: "from-purple-500/15 to-purple-500/5 border-purple-500/25 text-(--color-accent-purple-light) shadow-[0_0_15px_rgba(168,85,247,0.12)]",
                        blue: "from-blue-500/15 to-blue-500/5 border-blue-500/25 text-(--color-accent-blue-light) shadow-[0_0_15px_rgba(59,130,246,0.12)]",
                        emerald: "from-emerald-500/15 to-emerald-500/5 border-emerald-500/25 text-(--color-accent-emerald-light) shadow-[0_0_15px_rgba(16,185,129,0.12)]",
                      };
                      return (
                        <div key={i} className={`rounded-xl bg-linear-to-br ${tone[s.tone]} border p-3 flex flex-col gap-2`}>
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-white">{s.tier}</span>
                            <span className="text-[8px] font-mono text-(--color-text-muted)">{s.customers} müşteri</span>
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            <div className="flex flex-col gap-0.5">
                              <span className="text-[7px] font-mono uppercase text-(--color-text-muted)">SLA Uyum</span>
                              <span className="text-base font-bold text-white">%{s.sla}</span>
                            </div>
                            <div className="flex flex-col gap-0.5">
                              <span className="text-[7px] font-mono uppercase text-(--color-text-muted)">Yanıt</span>
                              <span className="text-base font-mono font-bold text-white">{s.response}</span>
                            </div>
                            <div className="flex flex-col gap-0.5">
                              <span className="text-[7px] font-mono uppercase text-(--color-text-muted)">Çözüm</span>
                              <span className="text-base font-mono font-bold text-white">{s.resolve}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Eskalasyon banner */}
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/25 mt-auto">
                    <AlertCircle className="w-3 h-3 text-amber-300 shrink-0" />
                    <span className="text-[9px] font-medium text-white flex-1">Bu ay 3 SLA ihlali · 1 eskalasyon</span>
                    <Activity className="w-2.5 h-2.5 text-amber-300" />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-(--color-accent-purple-light)">
                <ShieldCheck size={32} />
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
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[420px]"
          >
            {/* Bento 1 - Merkezi arşiv (wide, mock) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 lg:col-span-2 row-span-1 rounded-4xl bg-linear-to-br from-blue-500/10 to-transparent border border-white/10 p-8 hover:bg-white/4 transition-colors relative overflow-hidden group flex flex-col md:flex-row gap-6 items-center"
            >
              <div className="w-full md:w-1/2 flex flex-col justify-center shrink-0">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-(--color-accent-blue-light) flex items-center justify-center mb-6">
                  <FolderOpen />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {data.bento.items[0].title}
                </h3>
                <p className="text-sm text-(--color-text-secondary) font-light pr-4">
                  {data.bento.items[0].description}
                </p>
              </div>
              <div className="w-full md:w-1/2 h-45 md:h-full relative rounded-xl border border-white/10 overflow-hidden shadow-inner shrink-0 bg-(--color-surface-elevated-solid) group-hover:border-blue-500/40 transition-colors flex flex-col gap-2 p-4 justify-center">
                {[
                  { name: "Yıllık Bakım Sözleşmesi", type: "OLA", tone: "blue" },
                  { name: "Donanım Tedarik Anlaşması", type: "Tedarikçi", tone: "emerald" },
                  { name: "Premium Destek SLA", type: "SLA", tone: "purple" },
                  { name: "Yazılım Lisans Sözleşmesi", type: "Tedarikçi", tone: "emerald" },
                ].map((row, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/3 border border-white/5"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <FileSignature className="w-3 h-3 text-(--color-accent-blue-light) shrink-0" />
                      <span className="text-[10px] font-medium text-white truncate">
                        {row.name}
                      </span>
                    </div>
                    <span
                      className={`text-[9px] font-mono shrink-0 ml-2 px-1.5 py-0.5 rounded-full border ${
                        row.tone === "blue"
                          ? "bg-blue-500/10 border-blue-500/20 text-(--color-accent-blue-light)"
                          : row.tone === "emerald"
                            ? "bg-emerald-500/10 border-emerald-500/20 text-(--color-accent-emerald-light)"
                            : "bg-purple-500/10 border-purple-500/20 text-(--color-accent-purple-light)"
                      }`}
                    >
                      {row.type}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bento 2 - Yenileme uyarıları (normal, mock) */}
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
                  { name: "Premium Destek", days: 12, tone: "warn" },
                  { name: "Yazılım Lisans", days: 87, tone: "ok" },
                  { name: "Donanım Bakım", days: 3, tone: "alert" },
                ].map((row, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/3 border border-white/5"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <Bell
                        className={`w-3 h-3 shrink-0 ${
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

            {/* Bento 3 - Kapsam & SLA hedefleri (normal, mock) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-(--color-accent-cyan-light) flex items-center justify-center mb-6 shrink-0">
                <ShieldCheck />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[2].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[2].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-2 justify-center">
                {[
                  { label: "Yanıt süresi", value: "30 dk" },
                  { label: "Çözüm süresi", value: "4 sa" },
                  { label: "Çalışma saati", value: "7/24" },
                  { label: "Eskalasyon", value: "L2 → L3" },
                ].map((row, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-white/3 border border-white/5"
                  >
                    <span className="text-[10px] font-medium text-white">
                      {row.label}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-(--color-accent-cyan-light)">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bento 4 - Taraf & iletişim (wide, mock) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 lg:col-span-2 row-span-1 rounded-4xl bg-linear-to-br from-purple-500/10 to-transparent border border-white/10 p-8 hover:bg-white/4 transition-colors relative overflow-hidden group flex flex-col md:flex-row gap-6 items-center"
            >
              <div className="w-full md:w-1/2 flex flex-col justify-center shrink-0">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-(--color-accent-purple-light) flex items-center justify-center mb-6">
                  <Users />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {data.bento.items[3].title}
                </h3>
                <p className="text-sm text-(--color-text-secondary) font-light pr-4">
                  {data.bento.items[3].description}
                </p>
              </div>
              <div className="w-full md:w-1/2 h-45 md:h-full relative rounded-xl border border-white/10 overflow-hidden shadow-inner shrink-0 bg-(--color-surface-elevated-solid) group-hover:border-purple-500/40 transition-colors p-4 flex flex-col gap-2 justify-center">
                {[
                  {
                    role: "Operasyonel sorumlu",
                    name: "M. Demir",
                    tone: "purple",
                  },
                  {
                    role: "Yasal temsilci",
                    name: "A. Yıldız",
                    tone: "blue",
                  },
                  {
                    role: "Fatura muhatabı",
                    name: "S. Kara",
                    tone: "emerald",
                  },
                ].map((row, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/3 border border-white/8"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold ${
                        row.tone === "purple"
                          ? "bg-purple-500/15 border border-purple-500/30 text-(--color-accent-purple-light)"
                          : row.tone === "blue"
                            ? "bg-blue-500/15 border border-blue-500/30 text-(--color-accent-blue-light)"
                            : "bg-emerald-500/15 border border-emerald-500/30 text-(--color-accent-emerald-light)"
                      }`}
                    >
                      {row.name.charAt(0)}
                    </div>
                    <div className="flex flex-col flex-1 min-w-0">
                      <span className="text-[11px] font-bold text-white truncate">
                        {row.name}
                      </span>
                      <span className="text-[9px] font-medium text-(--color-text-muted)">
                        {row.role}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bento 5 - Sözleşme tipi sınıflandırması (normal, mock) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 border border-white/10 bg-linear-to-br from-indigo-500/5 to-transparent rounded-4xl p-8 hover:bg-white/4 transition-colors flex flex-col overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-6 shrink-0">
                <Tags />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[4].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[4].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-2 justify-center">
                {[
                  { type: "OLA", count: 18, tone: "blue" },
                  { type: "Tedarikçi", count: 42, tone: "emerald" },
                  { type: "SLA (Müşteri)", count: 64, tone: "purple" },
                ].map((row, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/3 border border-white/5"
                  >
                    <div className="flex items-center gap-2">
                      <Tags
                        className={`w-3 h-3 ${
                          row.tone === "blue"
                            ? "text-(--color-accent-blue-light)"
                            : row.tone === "emerald"
                              ? "text-(--color-accent-emerald-light)"
                              : "text-(--color-accent-purple-light)"
                        }`}
                      />
                      <span className="text-[10px] font-medium text-white">
                        {row.type}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-white">
                      {row.count}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bento 6 - Raporlama (normal, mock) */}
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
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex items-end justify-between gap-2">
                {[60, 75, 50, 88, 70, 92].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t bg-linear-to-t from-emerald-500/40 to-emerald-400/80 border border-emerald-500/30"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3.5 LIFECYCLE — 8 stages */}
      <section className="py-24 relative z-20 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-300 h-150 bg-blue-600/8 blur-[140px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-6 lg:px-12 w-full max-w-7xl relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
              <History className="w-3.5 h-3.5 text-(--color-accent-blue-light)" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-(--color-accent-blue-light)">
                {data.lifecycle.badge}
              </span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-white mb-6">
              {data.lifecycle.titleLead}
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">
                {data.lifecycle.titleAccent}
              </span>
            </h2>
            <p className="text-(--color-text-secondary) text-lg font-light leading-relaxed">
              {data.lifecycle.description}
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5"
          >
            {data.lifecycle.stages.map((s) => {
              const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
                Plus, FileText, CheckCircle2, Boxes, Wallet, GitBranch, Bell, History,
              };
              const Icon = iconMap[s.icon] || Plus;
              const t: Record<string, string> = {
                blue: "from-blue-500/15 to-blue-500/5 border-blue-500/25 text-(--color-accent-blue-light) shadow-[0_0_25px_rgba(59,130,246,0.12)]",
                cyan: "from-cyan-500/15 to-cyan-500/5 border-cyan-500/25 text-(--color-accent-cyan-light) shadow-[0_0_25px_rgba(6,182,212,0.12)]",
                emerald: "from-emerald-500/15 to-emerald-500/5 border-emerald-500/25 text-(--color-accent-emerald-light) shadow-[0_0_25px_rgba(16,185,129,0.12)]",
                purple: "from-purple-500/15 to-purple-500/5 border-purple-500/25 text-(--color-accent-purple-light) shadow-[0_0_25px_rgba(168,85,247,0.12)]",
                amber: "from-amber-500/15 to-amber-500/5 border-amber-500/25 text-amber-300 shadow-[0_0_25px_rgba(245,158,11,0.12)]",
                indigo: "from-indigo-500/15 to-indigo-500/5 border-indigo-500/25 text-indigo-300 shadow-[0_0_25px_rgba(99,102,241,0.12)]",
                rose: "from-rose-500/15 to-rose-500/5 border-rose-500/25 text-rose-300 shadow-[0_0_25px_rgba(244,63,94,0.12)]",
                teal: "from-teal-500/15 to-teal-500/5 border-teal-500/25 text-teal-300 shadow-[0_0_25px_rgba(20,184,166,0.12)]",
              };
              return (
                <motion.div
                  key={s.id}
                  variants={fadeUp}
                  className={`rounded-2xl bg-linear-to-br ${t[s.tone]} border p-5 flex flex-col gap-3 hover:-translate-y-1 transition-transform duration-300`}
                >
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-2xl font-bold text-white/15 tracking-tight">{s.step}</span>
                  </div>
                  <h3 className="text-sm lg:text-base font-bold text-white tracking-tight">{s.title}</h3>
                  <ul className="flex flex-col gap-1.5">
                    {s.items.map((item, j) => (
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

      {/* 3.6 FAQ */}
      <section className="py-24 relative z-20">
        <div className="container mx-auto px-6 lg:px-12 w-full max-w-4xl">
          <div className="text-center mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
              <FileSignature className="w-3.5 h-3.5 text-(--color-accent-blue-light)" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-(--color-accent-blue-light)">
                Sözleşme Bilgi Bankası
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
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "100px" }}
            className="flex flex-col gap-3"
          >
            {data.faq.items.map((item, i) => {
              const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
                FileSignature, Tags, Repeat, CheckCircle2, GitBranch,
              };
              const Icon = iconMap[item.icon] || FileSignature;
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
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="group relative flex flex-col justify-center overflow-hidden rounded-3xl bg-linear-to-br from-(--color-brand-primary) to-(--color-brand-purple) p-1 md:p-px"
            >
              <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative h-full flex flex-col items-center justify-center text-center rounded-[23px] bg-(--color-surface-elevated-solid)/90 backdrop-blur-3xl px-8 py-16 md:px-12">
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

                <div className="relative z-10 w-full">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 mx-auto">
                    <FileSignature className="w-4 h-4 text-(--color-accent-blue-light)" />
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-text-overline)">
                      Sözleşme Yönetimi
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
                        OLA
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                        <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-blue-base) shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                        Tedarikçi
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                        <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-purple-base) shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
                        SLA
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
