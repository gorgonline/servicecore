"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  MousePointerClick,
  BookOpen,
  FileText,
  Gauge,
  CheckCircle2,
  ListChecks,
  Plug,
  Eye,
  Clock,
  Repeat,
  ArrowRight,
  Search,
  ChevronRight,
  Mail,
  Database,
  Server,
  Users,
  Shield,
  Boxes,
  Calendar,
  User,
  AlertCircle,
  TrendingUp,
  Sparkles,
  Building2,
  Lock,
  Workflow,
  Hash,
} from "lucide-react";
import data from "@/data/istek-yonetimi.json";
import PrivacyContact from "@/components/ui/privacy-contact";

export default function IstekYonetimiPage() {
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
              <MousePointerClick size={14} />
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
              src="/images/istek-modulu/index.png"
              alt={data.hero.imageAlt}
              width={1416}
              height={586}
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
          {/* Feature 1: Katalog Merkezi — blue */}
          <motion.div
            animate="visible"
            variants={fadeUp}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-blue-500/5 to-cyan-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-blue-500/10 blur-[50px] group-hover:bg-blue-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full h-112.5 rounded-2xl overflow-hidden bg-(--color-surface-elevated-solid)/95 border border-white/10 shadow-2xl p-5 flex flex-col gap-4">
                  {/* Toolbar */}
                  <div className="flex items-center justify-between gap-3 pb-3 border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-(--color-accent-blue-light)" />
                      <span className="text-xs font-semibold text-white tracking-wide">Servis Kataloğu</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/15 text-(--color-accent-blue-light) border border-blue-500/30">v3.2</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] text-(--color-text-muted) min-w-50">
                      <Search className="w-3 h-3" />
                      <span className="font-mono">Hizmet ara…</span>
                    </div>
                  </div>

                  {/* Channel ribbon */}
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { label: "Portal", icon: BookOpen, count: "184" },
                      { label: "E-posta", icon: Mail, count: "92" },
                      { label: "Etkileşim", icon: MousePointerClick, count: "56" },
                      { label: "API", icon: Plug, count: "28" },
                    ].map((ch, i) => {
                      const Icon = ch.icon;
                      return (
                        <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/3 border border-white/5">
                          <div className="w-6 h-6 rounded-md bg-blue-500/15 flex items-center justify-center text-(--color-accent-blue-light) shrink-0">
                            <Icon className="w-3 h-3" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-[10px] text-(--color-text-muted) truncate">{ch.label}</div>
                            <div className="text-xs font-bold text-white font-mono">{ch.count}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Body */}
                  <div className="grid grid-cols-12 gap-3 flex-1 min-h-0">
                    {/* Sidebar */}
                    <div className="col-span-4 rounded-xl border border-white/5 bg-white/2 p-3 flex flex-col gap-1.5">
                      <div className="text-[9px] font-bold uppercase tracking-widest text-(--color-text-muted) mb-1 px-1">Kategoriler</div>
                      {[
                        { name: "BT Hizmetleri", count: 42, active: true },
                        { name: "İK & Onboarding", count: 18 },
                        { name: "Tesis & Saha", count: 14 },
                        { name: "Finans Talepleri", count: 9 },
                        { name: "Erişim & Güvenlik", count: 24 },
                      ].map((c, i) => (
                        <div key={i} className={`flex items-center justify-between px-2.5 py-2 rounded-md text-[11px] ${c.active ? "bg-blue-500/15 border border-blue-500/30 text-white" : "text-(--color-text-secondary) hover:bg-white/3"}`}>
                          <span className="truncate font-medium">{c.name}</span>
                          <span className="font-mono text-[9px] text-(--color-text-muted)">{c.count}</span>
                        </div>
                      ))}
                    </div>

                    {/* Service grid */}
                    <div className="col-span-8 grid grid-cols-2 gap-2 content-start">
                      {[
                        { name: "Yeni Çalışan Onboarding", sla: "P1", icon: User, color: "text-(--color-accent-blue-light) bg-blue-500/15 border-blue-500/30" },
                        { name: "VPN Erişim Talebi", sla: "P2", icon: Shield, color: "text-(--color-accent-purple-light) bg-purple-500/15 border-purple-500/30" },
                        { name: "Yazılım Kurulum", sla: "P2", icon: Boxes, color: "text-(--color-accent-emerald-light) bg-emerald-500/15 border-emerald-500/30" },
                        { name: "Donanım Tedarik", sla: "P3", icon: Server, color: "text-(--color-accent-orange-light) bg-orange-500/15 border-orange-500/30" },
                        { name: "Toplantı Odası", sla: "P3", icon: Calendar, color: "text-(--color-accent-cyan-light) bg-cyan-500/15 border-cyan-500/30" },
                        { name: "Şifre Sıfırlama", sla: "P1", icon: Lock, color: "text-(--color-accent-red-light) bg-red-500/15 border-red-500/30" },
                      ].map((s, i) => {
                        const Icon = s.icon;
                        return (
                          <div key={i} className="rounded-lg border border-white/5 bg-white/2 p-2.5 flex items-center gap-2.5 hover:border-blue-500/30 transition-colors">
                            <div className={`w-7 h-7 rounded-md border flex items-center justify-center shrink-0 ${s.color}`}>
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-[11px] font-semibold text-white truncate">{s.name}</div>
                              <div className="text-[9px] text-(--color-text-muted) font-mono">Hizmet Seviyesi · {s.sla}</div>
                            </div>
                            <ChevronRight className="w-3 h-3 text-(--color-text-muted) shrink-0" />
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

          {/* Feature 2: Kullanıcı Form — emerald */}
          <motion.div
            animate="visible"
            variants={fadeUp}
            className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-emerald-500/5 to-cyan-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-emerald-500/10 blur-[50px] group-hover:bg-emerald-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full h-112.5 rounded-2xl overflow-hidden bg-(--color-surface-elevated-solid)/95 border border-white/10 shadow-2xl p-5 flex flex-col gap-4">
                  {/* Toolbar */}
                  <div className="flex items-center justify-between pb-3 border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-(--color-accent-emerald-light)" />
                      <span className="text-xs font-semibold text-white">Katalog Form Tasarımı</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-(--color-accent-emerald-light) border border-emerald-500/30">Sürüm 4 · Yayında</span>
                  </div>

                  <div className="grid grid-cols-12 gap-3 flex-1 min-h-0">
                    {/* Tree */}
                    <div className="col-span-4 rounded-xl border border-white/5 bg-white/2 p-3 flex flex-col gap-1">
                      <div className="text-[9px] font-bold uppercase tracking-widest text-(--color-text-muted) mb-1 px-1">Servis Ağacı</div>
                      <div className="flex items-center gap-1.5 px-2 py-1.5 text-[11px] text-white">
                        <ChevronRight className="w-3 h-3 text-(--color-accent-emerald-light) rotate-90" />
                        <Boxes className="w-3 h-3 text-(--color-accent-emerald-light)" />
                        <span className="font-semibold">BT Hizmetleri</span>
                      </div>
                      <div className="flex items-center gap-1.5 pl-6 py-1.5 text-[11px] text-(--color-text-secondary)">
                        <ChevronRight className="w-3 h-3 rotate-90 text-(--color-text-muted)" />
                        <span>Erişim Yönetimi</span>
                      </div>
                      <div className="flex items-center gap-1.5 pl-10 py-1.5 text-[11px] bg-emerald-500/15 rounded-md border border-emerald-500/30 text-white">
                        <Sparkles className="w-3 h-3 text-(--color-accent-emerald-light)" />
                        <span className="font-semibold">VPN Erişim</span>
                      </div>
                      <div className="flex items-center gap-1.5 pl-10 py-1.5 text-[11px] text-(--color-text-muted)">
                        <span>Sistem Hesabı</span>
                      </div>
                      <div className="flex items-center gap-1.5 pl-6 py-1.5 text-[11px] text-(--color-text-secondary)">
                        <ChevronRight className="w-3 h-3 text-(--color-text-muted)" />
                        <span>Donanım</span>
                      </div>
                      <div className="flex items-center gap-1.5 pl-6 py-1.5 text-[11px] text-(--color-text-secondary)">
                        <ChevronRight className="w-3 h-3 text-(--color-text-muted)" />
                        <span>Yazılım Kurulumu</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-2 py-1.5 text-[11px] text-(--color-text-secondary) mt-1">
                        <ChevronRight className="w-3 h-3 text-(--color-text-muted)" />
                        <Boxes className="w-3 h-3 text-(--color-text-muted)" />
                        <span>İK Hizmetleri</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-2 py-1.5 text-[11px] text-(--color-text-secondary)">
                        <ChevronRight className="w-3 h-3 text-(--color-text-muted)" />
                        <Boxes className="w-3 h-3 text-(--color-text-muted)" />
                        <span>Tesis Yönetimi</span>
                      </div>
                    </div>

                    {/* Form preview */}
                    <div className="col-span-8 rounded-xl border border-white/5 bg-white/2 p-4 flex flex-col gap-3 overflow-hidden">
                      <div className="flex items-center gap-2 pb-2 border-b border-white/5">
                        <Shield className="w-3.5 h-3.5 text-(--color-accent-emerald-light)" />
                        <span className="text-[11px] font-semibold text-white">VPN Erişim Talep Formu</span>
                        <span className="ml-auto text-[9px] font-mono text-(--color-text-muted)">5 alan · 2 zorunlu</span>
                      </div>

                      <div className="space-y-2.5">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] text-(--color-text-secondary) font-medium">Erişim Türü</span>
                            <span className="text-[9px] text-(--color-accent-red-light)">*</span>
                          </div>
                          <div className="flex items-center justify-between gap-2 px-3 py-1.5 rounded-md bg-(--color-surface-base) border border-emerald-500/30">
                            <span className="text-[10px] text-white font-mono">Tam Tünel — Standart</span>
                            <ChevronRight className="w-3 h-3 text-(--color-text-muted) rotate-90" />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] text-(--color-text-secondary) font-medium">Süre</span>
                              <span className="text-[9px] text-(--color-accent-red-light)">*</span>
                            </div>
                            <div className="px-3 py-1.5 rounded-md bg-(--color-surface-base) border border-white/10 text-[10px] text-white font-mono">90 gün</div>
                          </div>
                          <div className="space-y-1">
                            <span className="text-[10px] text-(--color-text-secondary) font-medium">Lokasyon</span>
                            <div className="px-3 py-1.5 rounded-md bg-(--color-surface-base) border border-white/10 text-[10px] text-(--color-text-muted) font-mono">Türkiye / İstanbul</div>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <span className="text-[10px] text-(--color-text-secondary) font-medium">Gerekçe</span>
                          <div className="px-3 py-2 rounded-md bg-(--color-surface-base) border border-white/10 text-[10px] text-(--color-text-muted) leading-relaxed h-12">
                            Saha ekibinin müşteri sistemlerine güvenli erişimi için…
                          </div>
                        </div>

                        <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-emerald-500/10 border border-emerald-500/30">
                          <CheckCircle2 className="w-3 h-3 text-(--color-accent-emerald-light)" />
                          <span className="text-[10px] text-(--color-accent-emerald-light) font-medium">Doğrulama geçti — onay akışına hazır</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-(--color-accent-emerald-light)">
                <FileText size={32} />
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

          {/* Feature 3: Hizmet Seviyesi, Atama, Yetki — purple */}
          <motion.div
            animate="visible"
            variants={fadeUp}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-purple-500/5 to-indigo-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-purple-500/10 blur-[50px] group-hover:bg-purple-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full h-112.5 rounded-2xl overflow-hidden bg-(--color-surface-elevated-solid)/95 border border-white/10 shadow-2xl p-5 flex flex-col gap-4">
                  {/* Toolbar */}
                  <div className="flex items-center justify-between pb-3 border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <Gauge className="w-4 h-4 text-(--color-accent-purple-light)" />
                      <span className="text-xs font-semibold text-white">Hizmet Seviyesi · Atama · Yetki Matrisi</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/15 text-(--color-accent-purple-light) border border-purple-500/30">12 kural aktif</span>
                  </div>

                  {/* Priority cards */}
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { p: "P1", label: "Kritik", t: "1 sa", c: "border-red-500/30 bg-red-500/10 text-(--color-accent-red-light)" },
                      { p: "P2", label: "Yüksek", t: "4 sa", c: "border-orange-500/30 bg-orange-500/10 text-(--color-accent-orange-light)" },
                      { p: "P3", label: "Standart", t: "24 sa", c: "border-blue-500/30 bg-blue-500/10 text-(--color-accent-blue-light)" },
                    ].map((s, i) => (
                      <div key={i} className={`rounded-lg border ${s.c} p-2.5`}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-bold font-mono">{s.p}</span>
                          <AlertCircle className="w-3 h-3 opacity-70" />
                        </div>
                        <div className="text-[10px] text-(--color-text-secondary) mb-0.5">{s.label}</div>
                        <div className="text-base font-bold text-white font-mono leading-none">{s.t}</div>
                      </div>
                    ))}
                  </div>

                  {/* Assignment rules table */}
                  <div className="rounded-xl border border-white/5 bg-white/2 overflow-hidden">
                    <div className="px-3 py-2 border-b border-white/5 flex items-center gap-2">
                      <Workflow className="w-3.5 h-3.5 text-(--color-accent-purple-light)" />
                      <span className="text-[11px] font-semibold text-white">Atama Kuralları</span>
                    </div>
                    <div className="grid grid-cols-12 px-3 py-1.5 text-[9px] uppercase tracking-wider text-(--color-text-muted) bg-white/2 border-b border-white/5">
                      <span className="col-span-4">Hizmet</span>
                      <span className="col-span-2">Öncelik</span>
                      <span className="col-span-3">Grup</span>
                      <span className="col-span-3">Yetki</span>
                    </div>
                    {[
                      { svc: "VPN Erişim", pri: "P2", group: "Network Ops", role: "Onaycı + Yönetici" },
                      { svc: "Yeni Çalışan", pri: "P1", group: "İK Servis Masası", role: "Tüm Departmanlar" },
                      { svc: "Şifre Sıfırlama", pri: "P1", group: "Service Desk L1", role: "Self-Servis" },
                      { svc: "Donanım Tedarik", pri: "P3", group: "Satınalma", role: "Bütçe Onayı" },
                    ].map((r, i) => (
                      <div key={i} className="grid grid-cols-12 px-3 py-2 text-[10px] border-b border-white/5 last:border-0 hover:bg-white/2">
                        <span className="col-span-4 text-white font-medium truncate">{r.svc}</span>
                        <span className="col-span-2 font-mono text-(--color-accent-purple-light)">{r.pri}</span>
                        <span className="col-span-3 text-(--color-text-secondary) truncate">{r.group}</span>
                        <span className="col-span-3 text-(--color-text-muted) truncate">{r.role}</span>
                      </div>
                    ))}
                  </div>

                  {/* Authority matrix */}
                  <div className="rounded-xl border border-white/5 bg-white/2 p-3 flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Lock className="w-3.5 h-3.5 text-(--color-accent-purple-light)" />
                      <span className="text-[11px] font-semibold text-white">Rol Bazlı Yetki Matrisi</span>
                    </div>
                    <div className="grid grid-cols-4 gap-1.5">
                      {[
                        { role: "Yönetici", access: "Tam Erişim", c: "bg-purple-500/15 text-(--color-accent-purple-light) border-purple-500/30" },
                        { role: "Departman", access: "Sınırlı", c: "bg-blue-500/15 text-(--color-accent-blue-light) border-blue-500/30" },
                        { role: "Çalışan", access: "Standart", c: "bg-emerald-500/15 text-(--color-accent-emerald-light) border-emerald-500/30" },
                        { role: "Misafir", access: "Yalnız Görüntüle", c: "bg-white/5 text-(--color-text-muted) border-white/10" },
                      ].map((m, i) => (
                        <div key={i} className={`rounded-md border ${m.c} px-2 py-1.5`}>
                          <div className="text-[9px] font-bold uppercase tracking-wider">{m.role}</div>
                          <div className="text-[9px] mt-0.5 opacity-80">{m.access}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-(--color-accent-purple-light)">
                <Gauge size={32} />
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

      {/* 3. BENTO GRID — 6 kart */}
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
            {/* Bento Item 1 - Onay Akışları (full-width split, cyan) — onayservis.png */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 md:col-span-2 lg:col-span-3 row-span-1 rounded-4xl bg-linear-to-br from-cyan-500/10 to-transparent border border-white/10 p-8 hover:bg-white/4 transition-colors relative overflow-hidden group flex flex-col md:flex-row gap-8 items-stretch"
            >
              <div className="w-full md:w-1/3 flex flex-col justify-center shrink-0">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-(--color-accent-cyan-light) flex items-center justify-center mb-6">
                  <CheckCircle2 />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {data.bento.items[0].title}
                </h3>
                <p className="text-sm text-(--color-text-secondary) font-light">
                  {data.bento.items[0].description}
                </p>
              </div>
              <div className="w-full md:w-2/3 h-60 md:h-auto relative rounded-xl border border-white/10 overflow-hidden shadow-inner shrink-0 group-hover:border-cyan-500/40 transition-colors bg-(--color-surface-elevated-solid)/95 p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between pb-2 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-(--color-accent-cyan-light)" />
                    <span className="text-[11px] font-semibold text-white">Onay Akışı · REQ-4827</span>
                  </div>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/15 text-(--color-accent-cyan-light) border border-cyan-500/30">2/4 onaylandı</span>
                </div>

                <div className="flex items-center justify-between gap-1 flex-1">
                  {[
                    { stage: "Yönetici", actor: "M. Demir", status: "ok" },
                    { stage: "Bütçe", actor: "Finans", status: "ok" },
                    { stage: "Güvenlik", actor: "InfoSec", status: "active" },
                    { stage: "BT Direktör", actor: "G. Kaya", status: "wait" },
                  ].map((s, i, arr) => (
                    <div key={i} className="flex items-center gap-1 flex-1 min-w-0">
                      <div className={`flex-1 rounded-lg border p-2 min-w-0 ${
                        s.status === "ok" ? "bg-emerald-500/10 border-emerald-500/30" :
                        s.status === "active" ? "bg-cyan-500/15 border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.25)]" :
                        "bg-white/3 border-white/10"
                      }`}>
                        <div className="flex items-center gap-1.5 mb-1">
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                            s.status === "ok" ? "bg-emerald-500/30 text-(--color-accent-emerald-light)" :
                            s.status === "active" ? "bg-cyan-500/30 text-(--color-accent-cyan-light)" :
                            "bg-white/5 text-(--color-text-muted)"
                          }`}>
                            {s.status === "ok" ? <CheckCircle2 className="w-2.5 h-2.5" /> : <Clock className="w-2.5 h-2.5" />}
                          </div>
                          <span className="text-[9px] font-bold text-white truncate">{s.stage}</span>
                        </div>
                        <div className="text-[8px] text-(--color-text-muted) truncate font-mono">{s.actor}</div>
                      </div>
                      {i < arr.length - 1 && (
                        <ChevronRight className="w-3 h-3 text-(--color-text-muted) shrink-0" />
                      )}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="rounded-md bg-white/3 border border-white/5 p-2">
                    <div className="text-[8px] uppercase tracking-wider text-(--color-text-muted) mb-0.5">Tetikleyici</div>
                    <div className="text-[10px] text-white font-mono">tutar &gt; 50.000 TL</div>
                  </div>
                  <div className="rounded-md bg-white/3 border border-white/5 p-2">
                    <div className="text-[8px] uppercase tracking-wider text-(--color-text-muted) mb-0.5">Tip</div>
                    <div className="text-[10px] text-white font-mono">Sıralı + Paralel</div>
                  </div>
                  <div className="rounded-md bg-white/3 border border-white/5 p-2">
                    <div className="text-[8px] uppercase tracking-wider text-(--color-text-muted) mb-0.5">AD Senkron</div>
                    <div className="text-[10px] text-(--color-accent-emerald-light) font-mono">aktif</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bento Item 2 - Görev Akış (wide, indigo) — gorev.png */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 lg:col-span-2 row-span-1 rounded-4xl bg-linear-to-br from-indigo-500/10 to-transparent border border-white/10 p-8 hover:bg-white/4 transition-colors relative overflow-hidden group flex flex-col md:flex-row gap-6 items-center"
            >
              <div className="w-full md:w-1/2 flex flex-col justify-center shrink-0">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-6">
                  <ListChecks />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {data.bento.items[1].title}
                </h3>
                <p className="text-sm text-(--color-text-secondary) font-light pr-4">
                  {data.bento.items[1].description}
                </p>
              </div>
              <div className="w-full md:w-1/2 h-45 md:h-full relative rounded-xl border border-white/10 overflow-hidden shadow-inner shrink-0 group-hover:border-indigo-500/40 transition-colors bg-(--color-surface-elevated-solid)/95 p-3 flex flex-col gap-2">
                <div className="flex items-center justify-between pb-1.5 border-b border-white/5">
                  <div className="flex items-center gap-1.5">
                    <ListChecks className="w-3 h-3 text-indigo-400" />
                    <span className="text-[10px] font-semibold text-white">Onboarding Paketi</span>
                  </div>
                  <span className="text-[9px] font-mono text-(--color-text-muted)">5 görev</span>
                </div>
                <div className="space-y-1 flex-1 overflow-hidden">
                  {[
                    { name: "AD hesabı oluştur", status: "ok", dep: null },
                    { name: "E-posta provizyon", status: "ok", dep: "AD" },
                    { name: "Donanım hazırla", status: "active", dep: null },
                    { name: "VPN profili tanımla", status: "wait", dep: "Donanım" },
                    { name: "Eğitim ataması", status: "wait", dep: null },
                  ].map((t, i) => (
                    <div key={i} className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-white/2 border border-white/5">
                      <div className={`w-3 h-3 rounded-sm border flex items-center justify-center shrink-0 ${
                        t.status === "ok" ? "bg-emerald-500/30 border-emerald-500/50" :
                        t.status === "active" ? "bg-indigo-500/30 border-indigo-500/50" :
                        "border-white/15"
                      }`}>
                        {t.status === "ok" && <CheckCircle2 className="w-2 h-2 text-(--color-accent-emerald-light)" />}
                      </div>
                      <span className={`text-[9px] flex-1 truncate ${t.status === "wait" ? "text-(--color-text-muted)" : "text-white"}`}>{t.name}</span>
                      {t.dep && (
                        <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-(--color-text-muted) border border-white/10">↳ {t.dep}</span>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-1.5 border-t border-white/5 text-[9px]">
                  <span className="text-(--color-text-muted) font-mono">İlerleme</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-20 h-1 rounded-full bg-white/5 overflow-hidden">
                      <div className="h-full w-2/5 bg-indigo-400 rounded-full" />
                    </div>
                    <span className="text-indigo-400 font-bold font-mono">40%</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bento Item 3 - Entegrasyon (normal, orange) — cmdb.png */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-(--color-accent-orange-light) flex items-center justify-center mb-6 shrink-0">
                <Plug />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[2].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[2].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid)/95 p-3 flex flex-col gap-2">
                <div className="flex items-center gap-1.5 pb-1.5 border-b border-white/5">
                  <Plug className="w-3 h-3 text-(--color-accent-orange-light)" />
                  <span className="text-[10px] font-semibold text-white">Entegrasyon Hub</span>
                  <span className="ml-auto text-[8px] font-mono text-(--color-accent-emerald-light)">● senkron</span>
                </div>
                <div className="relative flex-1 flex items-center justify-center">
                  {/* Center node */}
                  <div className="relative z-10 w-14 h-14 rounded-full bg-orange-500/15 border border-orange-500/40 flex items-center justify-center text-(--color-accent-orange-light) shadow-[0_0_20px_rgba(251,146,60,0.25)]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  {/* Spokes */}
                  {[
                    { icon: Database, label: "CMDB", pos: "top-0 left-1/2 -translate-x-1/2 -translate-y-1" },
                    { icon: Building2, label: "ERP", pos: "top-1/2 right-0 -translate-y-1/2 translate-x-1" },
                    { icon: Users, label: "AD", pos: "bottom-0 right-1/4 translate-y-1" },
                    { icon: Mail, label: "CRM", pos: "bottom-0 left-1/4 translate-y-1" },
                    { icon: Server, label: "Monitoring", pos: "top-1/2 left-0 -translate-y-1/2 -translate-x-1" },
                  ].map((s, i) => {
                    const Icon = s.icon;
                    return (
                      <div key={i} className={`absolute ${s.pos} flex flex-col items-center gap-0.5`}>
                        <div className="w-7 h-7 rounded-md bg-white/5 border border-white/15 flex items-center justify-center text-(--color-text-secondary)">
                          <Icon className="w-3 h-3" />
                        </div>
                        <span className="text-[7px] font-mono text-(--color-text-muted)">{s.label}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center justify-between pt-1.5 border-t border-white/5 text-[8px] font-mono">
                  <span className="text-(--color-text-muted)">5 sistem · 12 webhook</span>
                  <span className="text-(--color-accent-orange-light)">REST · Event</span>
                </div>
              </div>
            </motion.div>

            {/* Bento Item 4 - İzlenebilirlik (normal, amber) — akis.png */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-6 shrink-0">
                <Eye />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[3].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[3].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid)/95 p-3 flex flex-col gap-2">
                <div className="flex items-center gap-1.5 pb-1.5 border-b border-white/5">
                  <Eye className="w-3 h-3 text-amber-400" />
                  <span className="text-[10px] font-semibold text-white">Değer Akışı · REQ-4827</span>
                </div>
                <div className="relative flex-1 pl-3">
                  <div className="absolute left-1.5 top-1 bottom-1 w-px bg-linear-to-b from-amber-500/40 via-amber-500/20 to-transparent" />
                  {[
                    { time: "09:14", label: "Talep açıldı", actor: "portal", c: "bg-amber-400" },
                    { time: "09:18", label: "Triyaj — atama", actor: "otomatik", c: "bg-amber-400" },
                    { time: "09:42", label: "Onay zinciri", actor: "yönetici", c: "bg-amber-400" },
                    { time: "11:05", label: "Görev başladı", actor: "ops ekibi", c: "bg-amber-300" },
                    { time: "—", label: "Teslimat", actor: "bekliyor", c: "bg-white/15" },
                  ].map((s, i) => (
                    <div key={i} className="relative pl-4 pb-2 last:pb-0">
                      <div className={`absolute left-0 top-1 w-1.5 h-1.5 rounded-full ${s.c} ${s.c === "bg-white/15" ? "" : "shadow-[0_0_6px_rgba(251,191,36,0.6)]"}`} />
                      <div className="flex items-center gap-2 text-[9px]">
                        <span className="text-(--color-text-muted) font-mono w-10 shrink-0">{s.time}</span>
                        <span className="text-white font-medium truncate flex-1">{s.label}</span>
                      </div>
                      <div className="text-[8px] text-(--color-text-muted) ml-12 font-mono">{s.actor}</div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-1.5 border-t border-white/5 text-[8px] font-mono">
                  <span className="text-(--color-text-muted)">5 olay · 1 zaman ekseni</span>
                  <span className="text-amber-400">Hizmet Seviyesi · 78%</span>
                </div>
              </div>
            </motion.div>

            {/* Bento Item 5 - Geçmiş & Efor (normal, red) — gecmis.png */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-red-500/20 text-(--color-accent-red-light) flex items-center justify-center mb-6 shrink-0">
                <Clock />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[4].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[4].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid)/95 p-3 flex flex-col gap-2">
                <div className="flex items-center gap-1.5 pb-1.5 border-b border-white/5">
                  <Clock className="w-3 h-3 text-(--color-accent-red-light)" />
                  <span className="text-[10px] font-semibold text-white">Activity Log</span>
                  <span className="ml-auto text-[8px] font-mono text-(--color-text-muted)">14 olay</span>
                </div>
                <div className="space-y-1 flex-1 overflow-hidden text-[9px]">
                  {[
                    { actor: "M. Demir", action: "Onay verdi", target: "1. aşama", time: "09:42", c: "text-(--color-accent-emerald-light)" },
                    { actor: "Otomasyon", action: "Görev üretti", target: "5 adım", time: "09:43", c: "text-(--color-accent-cyan-light)" },
                    { actor: "G. Yıldız", action: "Atama aldı", target: "Network", time: "09:48", c: "text-(--color-accent-blue-light)" },
                    { actor: "G. Yıldız", action: "Efor girdi", target: "45 dk", time: "10:33", c: "text-(--color-accent-orange-light)" },
                    { actor: "InfoSec", action: "Güvenlik notu", target: "ek", time: "11:01", c: "text-(--color-accent-purple-light)" },
                  ].map((e, i) => (
                    <div key={i} className="flex items-center gap-2 px-2 py-1 rounded-md bg-white/2 border border-white/5">
                      <Hash className={`w-2.5 h-2.5 shrink-0 ${e.c}`} />
                      <span className="text-white font-medium truncate w-16">{e.actor}</span>
                      <span className="text-(--color-text-secondary) truncate flex-1">{e.action}</span>
                      <span className="text-(--color-text-muted) font-mono shrink-0">{e.target}</span>
                      <span className="text-(--color-text-muted) font-mono shrink-0">{e.time}</span>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-1.5 pt-1.5 border-t border-white/5">
                  <div className="rounded-md bg-red-500/10 border border-red-500/20 px-2 py-1">
                    <div className="text-[8px] text-(--color-text-muted) uppercase tracking-wider">Toplam Efor</div>
                    <div className="text-[11px] font-bold text-white font-mono">3 sa 12 dk</div>
                  </div>
                  <div className="rounded-md bg-white/2 border border-white/5 px-2 py-1">
                    <div className="text-[8px] text-(--color-text-muted) uppercase tracking-wider">Aktör</div>
                    <div className="text-[11px] font-bold text-white font-mono">5 kayıt</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bento Item 6 - Tekrarlayan Talep İçgörüleri (normal, purple) — tekrarlananistek.png */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-(--color-accent-purple-light) flex items-center justify-center mb-6 shrink-0">
                <Repeat />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[5].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[5].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid)/95 p-3 flex flex-col gap-2">
                <div className="flex items-center gap-1.5 pb-1.5 border-b border-white/5">
                  <Repeat className="w-3 h-3 text-(--color-accent-purple-light)" />
                  <span className="text-[10px] font-semibold text-white">En Sık Talepler · 30g</span>
                  <TrendingUp className="ml-auto w-3 h-3 text-(--color-accent-purple-light)" />
                </div>

                <div className="space-y-1.5 flex-1">
                  {[
                    { name: "Şifre Sıfırlama", count: 184, w: "w-full" },
                    { name: "VPN Erişim", count: 142, w: "w-4/5" },
                    { name: "Yazılım Kurulum", count: 96, w: "w-3/5" },
                    { name: "Toplantı Odası", count: 71, w: "w-2/5" },
                    { name: "Donanım Tedarik", count: 38, w: "w-1/4" },
                  ].map((b, i) => (
                    <div key={i} className="space-y-0.5">
                      <div className="flex items-center justify-between text-[9px]">
                        <span className="text-white font-medium truncate">{b.name}</span>
                        <span className="text-(--color-text-muted) font-mono">{b.count}</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <div className={`${b.w} h-full bg-linear-to-r from-purple-500 to-purple-300 rounded-full`} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-md bg-purple-500/10 border border-purple-500/30">
                  <Sparkles className="w-3 h-3 text-(--color-accent-purple-light) shrink-0" />
                  <span className="text-[9px] text-(--color-accent-purple-light) leading-tight">
                    <span className="font-bold">Otomasyon önerisi:</span> Şifre sıfırlama %62 oran, self-servise aday.
                  </span>
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
                    <MousePointerClick className="w-4 h-4 text-(--color-accent-blue-light)" />
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-text-overline)">
                      İstek Yönetimi
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
                        ITIL 4 Uyumu
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                        <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-blue-base) shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                        Katalog Odaklı
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                        <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-purple-base) shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
                        Otomatik Onay
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
