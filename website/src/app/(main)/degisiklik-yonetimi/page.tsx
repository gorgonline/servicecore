"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import {
  GitBranch,
  ArrowRight,
  CheckCircle2,
  LayoutDashboard,
  ShieldCheck,
  Workflow,
  Share2,
  Mail,
  Boxes,
  ClipboardCheck,
  LineChart,
  Calendar,
  AlertTriangle,
  Users,
  ChevronRight,
  Sparkles,
  Database,
} from "lucide-react";
import data from "@/data/degisiklik-yonetimi.json";
import PrivacyContact from "@/components/ui/privacy-contact";

export default function DegisiklikYonetimiPage() {
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
            className="relative mx-auto rounded-4xl border border-white/10 bg-white/2 backdrop-blur-3xl p-4 lg:p-6 shadow-2xl overflow-hidden group w-full"
          >
            <div className="rounded-2xl border border-white/10 bg-(--color-surface-elevated-solid)/95 p-5 flex flex-col gap-4">
              {/* Toolbar */}
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <GitBranch className="w-4 h-4 text-(--color-accent-blue-light)" />
                  <span className="text-sm font-semibold text-white">Change Management Console</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/15 text-(--color-accent-blue-light) border border-blue-500/30">CHG / RFC v4</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-(--color-text-muted)">
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]" /> CAB · canlı</span>
                </div>
              </div>

              {/* KPI Strip */}
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: "Aktif RFC", value: "42", trend: "+8", c: "text-(--color-accent-blue-light) border-blue-500/30 bg-blue-500/10" },
                  { label: "CAB · Bekleyen", value: "12", trend: "5 acil", c: "text-(--color-accent-purple-light) border-purple-500/30 bg-purple-500/10" },
                  { label: "Başarı Oranı", value: "94%", trend: "▲ 2pp", c: "text-(--color-accent-emerald-light) border-emerald-500/30 bg-emerald-500/10" },
                  { label: "Yüksek Risk", value: "3", trend: "izleniyor", c: "text-(--color-accent-red-light) border-red-500/30 bg-red-500/10" },
                ].map((k, i) => (
                  <div key={i} className={`rounded-lg border ${k.c} p-2.5`}>
                    <div className="text-[9px] uppercase tracking-wider opacity-80 mb-1">{k.label}</div>
                    <div className="flex items-baseline gap-2">
                      <div className="text-xl font-bold text-white font-mono leading-none">{k.value}</div>
                      <div className="text-[9px] font-mono opacity-80">{k.trend}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Body — Table */}
              <div className="rounded-xl border border-white/5 bg-white/2 overflow-hidden">
                <div className="grid grid-cols-12 px-3 py-1.5 text-[9px] uppercase tracking-wider text-(--color-text-muted) bg-white/2 border-b border-white/5">
                  <span className="col-span-2">RFC</span>
                  <span className="col-span-4">Başlık</span>
                  <span className="col-span-2">Risk</span>
                  <span className="col-span-2">CAB</span>
                  <span className="col-span-2">Pencere</span>
                </div>
                {[
                  { id: "CHG-2841", title: "Auth Service v4.2 — production rollout", risk: "Düşük", cab: "Onaylandı", win: "Cmt 02:00", risKc: "text-(--color-accent-emerald-light)", cabC: "text-(--color-accent-emerald-light)" },
                  { id: "CHG-2839", title: "DB index migration · accounts", risk: "Yüksek", cab: "Bekliyor", win: "Pzt 01:30", risKc: "text-(--color-accent-red-light)", cabC: "text-amber-400" },
                  { id: "CHG-2837", title: "Firewall kuralları — VPN segment", risk: "Orta", cab: "Dinamik", win: "Çar 23:00", risKc: "text-amber-400", cabC: "text-(--color-accent-purple-light)" },
                  { id: "CHG-2835", title: "TLS sertifikası yenileme", risk: "Düşük", cab: "Standart", win: "Per 04:00", risKc: "text-(--color-accent-emerald-light)", cabC: "text-(--color-accent-blue-light)" },
                ].map((r, i) => (
                  <div key={i} className="grid grid-cols-12 px-3 py-2 text-[10px] border-b border-white/5 last:border-0 hover:bg-white/2 items-center">
                    <span className="col-span-2 font-mono text-(--color-accent-blue-light)">{r.id}</span>
                    <span className="col-span-4 text-white font-medium truncate">{r.title}</span>
                    <span className={`col-span-2 font-mono ${r.risKc}`}>{r.risk}</span>
                    <span className={`col-span-2 font-mono ${r.cabC}`}>{r.cab}</span>
                    <span className="col-span-2 font-mono text-(--color-text-muted)">{r.win}</span>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] font-mono text-(--color-text-muted)">
                <span>4/42 kayıt · son güncelleme 14:32</span>
                <span className="text-(--color-accent-blue-light)">ITIL4 · Risk-Based</span>
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-(--color-surface-base) to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* 2. ZIG-ZAG FEATURE BLOCKS */}
      <section className="py-24 relative z-20">
        <div className="container mx-auto px-6 lg:px-12 w-full max-w-7xl flex flex-col gap-32">
          {/* Feature 1: Merkezi Yönetim */}
          <motion.div
            animate="visible"
            variants={fadeUp}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-blue-500/5 to-cyan-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-blue-500/10 blur-[50px] group-hover:bg-blue-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full h-135 rounded-2xl overflow-hidden bg-(--color-surface-elevated-solid)/95 border border-white/10 shadow-2xl p-5 flex flex-col gap-4">
                  {/* Title bar */}
                  <div className="flex items-center justify-between pb-3 border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <LayoutDashboard className="w-4 h-4 text-(--color-accent-blue-light)" />
                      <span className="text-xs font-semibold text-white">RFC · CHG-2841</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-(--color-accent-emerald-light) border border-emerald-500/30">Planlama</span>
                    </div>
                    <span className="text-[10px] font-mono text-(--color-text-muted)">v1.3 · 4 onaycı</span>
                  </div>

                  {/* Form-like meta */}
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { l: "Tip", v: "Standart" },
                      { l: "Kategori", v: "Application" },
                      { l: "Öncelik", v: "Yüksek" },
                      { l: "Etki", v: "Orta" },
                    ].map((m, i) => (
                      <div key={i} className="rounded-md bg-white/3 border border-white/5 px-3 py-1.5">
                        <div className="text-[9px] uppercase tracking-wider text-(--color-text-muted)">{m.l}</div>
                        <div className="text-[11px] text-white font-mono">{m.v}</div>
                      </div>
                    ))}
                  </div>

                  {/* Plan timeline */}
                  <div className="rounded-xl border border-white/5 bg-white/2 p-3 flex flex-col gap-2 flex-1">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-(--color-accent-blue-light)" />
                      <span className="text-[11px] font-semibold text-white">Uygulama Planı</span>
                      <span className="ml-auto text-[9px] font-mono text-(--color-text-muted)">5 adım · 2sa pencere</span>
                    </div>
                    {[
                      { time: "01:00", step: "Bakım moduna geçir", owner: "Ops", c: "bg-blue-400" },
                      { time: "01:15", step: "Veritabanı yedeği", owner: "DBA", c: "bg-blue-400" },
                      { time: "01:30", step: "Sürüm dağıt", owner: "Release", c: "bg-blue-400" },
                      { time: "02:00", step: "Doğrulama testleri", owner: "QA", c: "bg-blue-400" },
                      { time: "02:45", step: "Üretime aç + smoke", owner: "Ops", c: "bg-blue-400" },
                    ].map((p, i) => (
                      <div key={i} className="grid grid-cols-12 gap-2 items-center px-2 py-1 rounded-md hover:bg-white/2">
                        <span className="col-span-2 text-[9px] font-mono text-(--color-accent-blue-light)">{p.time}</span>
                        <div className="col-span-7 flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full ${p.c} shadow-[0_0_6px_rgba(96,165,250,0.6)]`} />
                          <span className="text-[10px] text-white truncate">{p.step}</span>
                        </div>
                        <span className="col-span-3 text-[9px] font-mono text-(--color-text-muted) text-right">{p.owner}</span>
                      </div>
                    ))}
                  </div>

                  {/* Bottom: rollback + risk score */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-md bg-emerald-500/10 border border-emerald-500/30 p-2.5">
                      <div className="flex items-center gap-1.5 mb-1">
                        <ShieldCheck className="w-3 h-3 text-(--color-accent-emerald-light)" />
                        <span className="text-[9px] uppercase tracking-wider text-(--color-accent-emerald-light)">Geri Dönüş</span>
                      </div>
                      <div className="text-[10px] text-white font-mono">Snapshot · 8 dk RTO</div>
                    </div>
                    <div className="rounded-md bg-amber-500/10 border border-amber-500/30 p-2.5">
                      <div className="flex items-center gap-1.5 mb-1">
                        <AlertTriangle className="w-3 h-3 text-amber-400" />
                        <span className="text-[9px] uppercase tracking-wider text-amber-400">Risk Skoru</span>
                      </div>
                      <div className="text-[10px] text-white font-mono">3.2 / 10 · Düşük-Orta</div>
                    </div>
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

          {/* Feature 2: Risk Analizi & Danışma */}
          <motion.div
            animate="visible"
            variants={fadeUp}
            className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-emerald-500/5 to-cyan-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-emerald-500/10 blur-[50px] group-hover:bg-emerald-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full h-135 rounded-2xl overflow-hidden bg-(--color-surface-elevated-solid)/95 border border-white/10 shadow-2xl p-5 flex flex-col gap-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-(--color-accent-emerald-light)" />
                      <span className="text-xs font-semibold text-white">Risk Analizi & Danışma</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-(--color-accent-emerald-light) border border-emerald-500/30">CAB · Dinamik</span>
                  </div>

                  {/* Risk gauges */}
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: "İş Etkisi", val: 70, c: "from-amber-500 to-orange-500" },
                      { label: "Olasılık", val: 35, c: "from-emerald-500 to-emerald-400" },
                      { label: "Skor", val: 55, c: "from-yellow-500 to-amber-400" },
                    ].map((r, i) => (
                      <div key={i} className="rounded-lg border border-white/5 bg-white/2 p-2.5">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[9px] uppercase tracking-wider text-(--color-text-muted)">{r.label}</span>
                          <span className="text-[10px] font-mono text-white">{r.val}</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                          <div className={`h-full bg-linear-to-r ${r.c} rounded-full`} style={{ width: `${r.val}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Advisory roster */}
                  <div className="rounded-xl border border-white/5 bg-white/2 p-3 flex flex-col gap-2 flex-1">
                    <div className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-(--color-accent-emerald-light)" />
                      <span className="text-[11px] font-semibold text-white">Dinamik Danışma Grubu</span>
                      <span className="ml-auto text-[9px] font-mono text-(--color-text-muted)">5 üye · 3 onaylı</span>
                    </div>
                    {[
                      { ad: "M. Yıldız", role: "Güvenlik Mimarı", status: "ok", domain: "InfoSec" },
                      { ad: "A. Çelik", role: "Veritabanı Lideri", status: "ok", domain: "DBA" },
                      { ad: "S. Demir", role: "Network Mühendisi", status: "ok", domain: "Network" },
                      { ad: "G. Kaya", role: "Application Owner", status: "wait", domain: "App" },
                      { ad: "B. Aksoy", role: "Compliance Lideri", status: "wait", domain: "Risk" },
                    ].map((m, i) => (
                      <div key={i} className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-white/2 border border-white/5">
                        <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-[8px] font-bold text-(--color-accent-emerald-light) shrink-0">
                          {m.ad.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[10px] text-white font-medium truncate">{m.ad}</div>
                          <div className="text-[9px] text-(--color-text-muted) truncate font-mono">{m.role}</div>
                        </div>
                        <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-(--color-text-secondary) border border-white/10">{m.domain}</span>
                        <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${m.status === "ok" ? "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]" : "bg-amber-400"}`} />
                      </div>
                    ))}
                  </div>

                  {/* Rollback playbook */}
                  <div className="rounded-md bg-emerald-500/10 border border-emerald-500/30 px-3 py-2 flex items-center gap-2">
                    <Sparkles className="w-3 h-3 text-(--color-accent-emerald-light)" />
                    <span className="text-[10px] text-(--color-accent-emerald-light) font-medium leading-tight">
                      Geri dönüş playbook&apos;u hazır · 12 adım, otomasyon ile tetiklenebilir.
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-(--color-accent-emerald-light)">
                <ShieldCheck size={32} />
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

          {/* Feature 3: Dinamik İş Akışı */}
          <motion.div
            animate="visible"
            variants={fadeUp}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-purple-500/5 to-indigo-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-purple-500/10 blur-[50px] group-hover:bg-purple-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full h-135 rounded-2xl overflow-hidden bg-(--color-surface-elevated-solid)/95 border border-white/10 shadow-2xl p-5 flex flex-col gap-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <Workflow className="w-4 h-4 text-(--color-accent-purple-light)" />
                      <span className="text-xs font-semibold text-white">Akış Tasarımcısı</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/15 text-(--color-accent-purple-light) border border-purple-500/30">Standart Akış · v3</span>
                  </div>

                  {/* Workflow canvas */}
                  <div className="rounded-xl border border-white/5 bg-white/2 p-4 flex-1 relative overflow-hidden">
                    {/* Grid background */}
                    <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(rgba(168,85,247,0.15) 1px, transparent 1px)", backgroundSize: "16px 16px" }} />

                    <div className="relative h-full flex flex-col gap-3">
                      {/* Row 1 */}
                      <div className="flex items-center gap-2">
                        <div className="rounded-lg bg-blue-500/15 border border-blue-500/40 px-3 py-2 text-[10px] text-white font-mono shadow-[0_0_15px_rgba(59,130,246,0.2)]">▶ RFC Açıldı</div>
                        <div className="flex-1 h-px bg-linear-to-r from-blue-500/60 to-purple-500/60" />
                        <div className="rounded-lg bg-purple-500/15 border border-purple-500/40 px-3 py-2 text-[10px] text-white font-mono">⬢ Risk Değerlendir</div>
                        <div className="flex-1 h-px bg-linear-to-r from-purple-500/60 to-amber-500/60" />
                        <div className="rounded-lg bg-amber-500/15 border border-amber-500/40 px-3 py-2 text-[10px] text-white font-mono">◇ CAB Onay</div>
                      </div>

                      {/* Branch label */}
                      <div className="flex items-center gap-2 pl-4">
                        <div className="w-px h-6 bg-purple-500/40" />
                        <span className="text-[9px] font-mono text-(--color-accent-purple-light)">if risk &gt; 6 → Acil CAB</span>
                      </div>

                      {/* Row 2 — branch */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-md bg-white/3 border border-white/10 p-2.5 space-y-1">
                          <div className="text-[9px] uppercase tracking-wider text-(--color-text-muted)">Düşük Risk Yolu</div>
                          <div className="text-[10px] text-white font-mono">Auto-approve → Plan</div>
                        </div>
                        <div className="rounded-md bg-amber-500/10 border border-amber-500/30 p-2.5 space-y-1">
                          <div className="text-[9px] uppercase tracking-wider text-amber-400">Yüksek Risk Yolu</div>
                          <div className="text-[10px] text-white font-mono">Acil CAB + 24sa lead</div>
                        </div>
                      </div>

                      {/* Row 3 — execute */}
                      <div className="flex items-center gap-2">
                        <div className="rounded-lg bg-emerald-500/15 border border-emerald-500/40 px-3 py-2 text-[10px] text-white font-mono">▶ Görevler Üret</div>
                        <div className="flex-1 h-px bg-linear-to-r from-emerald-500/60 to-cyan-500/60" />
                        <div className="rounded-lg bg-cyan-500/15 border border-cyan-500/40 px-3 py-2 text-[10px] text-white font-mono">⬢ Uygula</div>
                        <div className="flex-1 h-px bg-linear-to-r from-cyan-500/60 to-emerald-500/60" />
                        <div className="rounded-lg bg-emerald-500/15 border border-emerald-500/40 px-3 py-2 text-[10px] text-white font-mono">✓ PIR</div>
                      </div>
                    </div>
                  </div>

                  {/* Trigger summary */}
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { l: "Tetikleyici", v: "Tip = Standart" },
                      { l: "Adım", v: "8 düğüm" },
                      { l: "Otomasyon", v: "%72" },
                    ].map((s, i) => (
                      <div key={i} className="rounded-md bg-white/3 border border-white/5 px-2.5 py-1.5">
                        <div className="text-[9px] uppercase tracking-wider text-(--color-text-muted)">{s.l}</div>
                        <div className="text-[10px] text-white font-mono">{s.v}</div>
                      </div>
                    ))}
                  </div>
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
            {/* Bento Item 1 - Entegrasyon (wide) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 lg:col-span-2 row-span-1 rounded-4xl bg-linear-to-br from-blue-500/10 to-transparent border border-white/10 p-8 hover:bg-white/4 transition-colors relative overflow-hidden group flex flex-col md:flex-row gap-6 items-center"
            >
              <div className="w-full md:w-1/2 flex flex-col justify-center shrink-0">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-(--color-accent-blue-light) flex items-center justify-center mb-6">
                  <Share2 />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {data.bento.items[0].title}
                </h3>
                <p className="text-sm text-(--color-text-secondary) font-light pr-4">
                  {data.bento.items[0].description}
                </p>
              </div>
              <div className="w-full md:w-1/2 h-45 md:h-full relative rounded-xl border border-white/10 overflow-hidden shadow-inner shrink-0 bg-(--color-surface-elevated-solid) group-hover:border-blue-500/40 transition-colors p-3 flex flex-col gap-2">
                <div className="flex items-center gap-1.5 pb-1.5 border-b border-white/5">
                  <Share2 className="w-3 h-3 text-(--color-accent-blue-light)" />
                  <span className="text-[10px] font-semibold text-white">Köken İzleri · CHG-2841</span>
                  <span className="ml-auto text-[8px] font-mono text-(--color-text-muted)">3 modül</span>
                </div>
                <div className="space-y-1.5 flex-1">
                  {[
                    { mod: "Olay", id: "INC-9214", title: "Auth latency spike", c: "text-(--color-accent-red-light) bg-red-500/10 border-red-500/30" },
                    { mod: "Problem", id: "PRB-104", title: "Token refresh kuyruğu", c: "text-amber-400 bg-amber-500/10 border-amber-500/30" },
                    { mod: "İstek", id: "REQ-4827", title: "Sürüm güncelleme talebi", c: "text-(--color-accent-blue-light) bg-blue-500/10 border-blue-500/30" },
                  ].map((s, i) => (
                    <div key={i} className={`rounded-md border ${s.c} p-2 flex items-center gap-2`}>
                      <span className="text-[8px] font-bold uppercase tracking-wider w-12 shrink-0">{s.mod}</span>
                      <span className="text-[9px] font-mono shrink-0 opacity-80">{s.id}</span>
                      <span className="text-[10px] text-white truncate flex-1">{s.title}</span>
                      <ChevronRight className="w-3 h-3 opacity-60 shrink-0" />
                    </div>
                  ))}
                </div>
                <div className="rounded-md bg-blue-500/10 border border-blue-500/30 px-2 py-1.5 flex items-center justify-between">
                  <span className="text-[9px] text-(--color-accent-blue-light) font-semibold">Kanıt Zinciri</span>
                  <span className="text-[9px] font-mono text-white">3 → 1 birleşik</span>
                </div>
              </div>
            </motion.div>

            {/* Bento Item 2 - E-posta onay (normal, görselsiz mock) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-(--color-accent-orange-light) flex items-center justify-center mb-6 shrink-0">
                <Mail />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[1].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[1].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-3 flex flex-col gap-2">
                <div className="flex items-center gap-1.5 pb-1.5 border-b border-white/5">
                  <Mail className="w-3 h-3 text-(--color-accent-orange-light)" />
                  <span className="text-[10px] font-semibold text-white">Onay E-postası</span>
                </div>
                <div className="rounded-md bg-white/3 border border-white/5 p-2 space-y-1">
                  <div className="flex items-center justify-between text-[8px] font-mono">
                    <span className="text-(--color-text-muted)">Kime: m.demir@</span>
                    <span className="text-(--color-text-muted)">14:42</span>
                  </div>
                  <div className="text-[9px] text-white font-semibold">CHG-2841 onayınız bekleniyor</div>
                  <div className="text-[8px] text-(--color-text-secondary) leading-tight line-clamp-2">
                    Auth Service v4.2 sürüm dağıtımı için onayınız gerekiyor. Risk: düşük.
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  <div className="rounded-md bg-emerald-500/15 border border-emerald-500/40 px-2 py-1.5 text-center text-[9px] font-bold text-(--color-accent-emerald-light) font-mono">✓ Onayla</div>
                  <div className="rounded-md bg-red-500/15 border border-red-500/40 px-2 py-1.5 text-center text-[9px] font-bold text-(--color-accent-red-light) font-mono">✗ Reddet</div>
                </div>
                <div className="flex-1 flex flex-col justify-end gap-1">
                  <div className="text-[8px] uppercase tracking-wider text-(--color-text-muted)">Zaman çizelgesi</div>
                  <div className="flex items-center gap-1">
                    {["13:02 gönderildi", "13:14 açıldı", "14:42 onaylandı"].map((t, i) => (
                      <div key={i} className="flex-1 rounded-sm bg-orange-500/15 border border-orange-500/30 px-1.5 py-1 text-[7px] text-(--color-accent-orange-light) font-mono text-center truncate">{t}</div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bento Item 3 - CMDB (normal, görselli) */}
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
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-3 flex flex-col gap-2">
                <div className="flex items-center gap-1.5 pb-1.5 border-b border-white/5">
                  <Boxes className="w-3 h-3 text-(--color-accent-cyan-light)" />
                  <span className="text-[10px] font-semibold text-white">Etki Haritası</span>
                  <span className="ml-auto text-[8px] font-mono text-(--color-text-muted)">5 CI</span>
                </div>
                <div className="space-y-1 flex-1">
                  {[
                    { ci: "auth-service", type: "Application", impact: "Doğrudan", c: "text-(--color-accent-red-light) bg-red-500/10 border-red-500/30" },
                    { ci: "user-db", type: "Database", impact: "Bağımlı", c: "text-amber-400 bg-amber-500/10 border-amber-500/30" },
                    { ci: "api-gateway", type: "Service", impact: "Dolaylı", c: "text-(--color-accent-blue-light) bg-blue-500/10 border-blue-500/30" },
                    { ci: "web-portal", type: "Frontend", impact: "Düşük", c: "text-(--color-accent-emerald-light) bg-emerald-500/10 border-emerald-500/30" },
                  ].map((c, i) => (
                    <div key={i} className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-white/2 border border-white/5">
                      <Database className="w-2.5 h-2.5 text-(--color-accent-cyan-light) shrink-0" />
                      <span className="text-[9px] text-white font-mono truncate flex-1">{c.ci}</span>
                      <span className="text-[8px] text-(--color-text-muted) shrink-0">{c.type}</span>
                      <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded border shrink-0 ${c.c}`}>{c.impact}</span>
                    </div>
                  ))}
                </div>
                <div className="rounded-md bg-cyan-500/10 border border-cyan-500/30 px-2 py-1.5 text-[9px] text-(--color-accent-cyan-light) font-medium">
                  Bağımlılık tutarlılığı: <span className="font-mono">98%</span>
                </div>
              </div>
            </motion.div>

            {/* Bento Item 4 - PIR (wide, görselli) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 lg:col-span-2 row-span-1 rounded-4xl bg-linear-to-br from-purple-500/10 to-transparent border border-white/10 p-8 hover:bg-white/4 transition-colors relative overflow-hidden group flex flex-col md:flex-row gap-6 items-center"
            >
              <div className="w-full md:w-1/2 flex flex-col justify-center shrink-0">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-(--color-accent-purple-light) flex items-center justify-center mb-6">
                  <ClipboardCheck />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {data.bento.items[3].title}
                </h3>
                <p className="text-sm text-(--color-text-secondary) font-light pr-4">
                  {data.bento.items[3].description}
                </p>
              </div>
              <div className="w-full md:w-1/2 h-45 md:h-full relative rounded-xl border border-white/10 overflow-hidden shadow-inner shrink-0 group-hover:border-purple-500/40 transition-colors bg-(--color-surface-elevated-solid) p-3 flex flex-col gap-2">
                <div className="flex items-center gap-1.5 pb-1.5 border-b border-white/5">
                  <ClipboardCheck className="w-3 h-3 text-(--color-accent-purple-light)" />
                  <span className="text-[10px] font-semibold text-white">PIR · CHG-2820</span>
                  <span className="ml-auto text-[8px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/15 text-(--color-accent-emerald-light) border border-emerald-500/30">Başarılı</span>
                </div>

                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { l: "Hedef", v: "✓ 4/4", c: "text-(--color-accent-emerald-light) bg-emerald-500/10 border-emerald-500/30" },
                    { l: "Kesinti", v: "0 dk", c: "text-(--color-accent-emerald-light) bg-emerald-500/10 border-emerald-500/30" },
                    { l: "Sapma", v: "+4 dk", c: "text-amber-400 bg-amber-500/10 border-amber-500/30" },
                  ].map((m, i) => (
                    <div key={i} className={`rounded-md border ${m.c} p-1.5 text-center`}>
                      <div className="text-[8px] uppercase tracking-wider opacity-80">{m.l}</div>
                      <div className="text-[10px] font-bold font-mono">{m.v}</div>
                    </div>
                  ))}
                </div>

                <div className="space-y-1 flex-1">
                  <div className="text-[8px] uppercase tracking-wider text-(--color-text-muted) px-1">Öğrenilen Dersler</div>
                  {[
                    "Pre-warm cache 8 dk önce başlatılmalı",
                    "Smoke test seti 3 yeni endpoint kapsasın",
                    "DB migration window 30dk → 45dk genişletilsin",
                  ].map((l, i) => (
                    <div key={i} className="flex items-center gap-1.5 px-1.5 py-1 rounded-md bg-white/2 border border-white/5">
                      <Sparkles className="w-2.5 h-2.5 text-(--color-accent-purple-light) shrink-0" />
                      <span className="text-[9px] text-white truncate">{l}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Bento Item 5 - Sürüm & Proje (normal, görselsiz mock) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 border border-white/10 bg-linear-to-br from-indigo-500/5 to-transparent rounded-4xl p-8 hover:bg-white/4 transition-colors flex flex-col overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-6 shrink-0">
                <GitBranch />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[4].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[4].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) flex flex-col items-stretch justify-center gap-3 px-5 py-4">
                <div className="flex items-center w-full">
                  <div className="w-9 h-9 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shrink-0">
                    <GitBranch className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div className="flex-1 h-px mx-2 bg-linear-to-r from-indigo-500/60 to-purple-500/60" />
                  <div className="w-9 h-9 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center shrink-0">
                    <Workflow className="w-4 h-4 text-(--color-accent-purple-light)" />
                  </div>
                  <div className="flex-1 h-px mx-2 bg-linear-to-r from-purple-500/60 to-emerald-500/60" />
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-(--color-accent-emerald-light)" />
                  </div>
                </div>
                <div className="flex items-center justify-between text-[10px] font-medium text-(--color-text-secondary) tracking-wide">
                  <span className="w-9 text-center">Değişiklik</span>
                  <span className="w-9 text-center">Proje</span>
                  <span className="w-9 text-center">Sürüm</span>
                </div>
              </div>
            </motion.div>

            {/* Bento Item 6 - Raporlama (normal, görselsiz mock) */}
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
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) flex items-end justify-between gap-2 p-4">
                <div className="w-full flex items-end justify-between gap-1.5 h-full">
                  {[40, 65, 30, 80, 55, 70, 45].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t bg-linear-to-t from-emerald-500/40 to-emerald-400/80 border border-emerald-500/30"
                      style={{ height: `${h}%` }}
                    />
                  ))}
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
                  <GitBranch className="w-4 h-4 text-(--color-accent-blue-light)" />
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-text-overline)">Değişiklik Yönetimi</span>
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
                      ITIL 4 Uyumu
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                      <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-blue-base) shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                      Risk Kontrolü
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                      <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-purple-base) shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
                      CAB & Advisory
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
