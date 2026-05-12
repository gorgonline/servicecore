"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import {
  Terminal,
  ArrowRight,
  CheckCircle2,
  Workflow,
  GitBranch,
  Layers,
  Filter,
  Zap,
  Sparkles,
  RefreshCw,
  BookOpen,
  Mail,
  Bell,
  Webhook,
  Users,
  Plus,
  ChevronRight,
  Activity,
  Clock,
  Hash,
  CircuitBoard,
} from "lucide-react";
import data from "@/data/servis-otomasyonu.json";

export default function ServisOtomasyonuPage() {
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
              <Terminal size={14} />
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
                  <CircuitBoard className="w-4 h-4 text-(--color-accent-blue-light)" />
                  <span className="text-sm font-semibold text-white">SARE · Automation Rule Engine</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/15 text-(--color-accent-blue-light) border border-blue-500/30">v3.4 · canlı</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-(--color-text-muted)">
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]" /> 142 kural · aktif</span>
                </div>
              </div>

              {/* KPI Strip */}
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: "Aktif Kural", value: "142", trend: "+6 hafta", c: "text-(--color-accent-blue-light) border-blue-500/30 bg-blue-500/10" },
                  { label: "Bugün Tetiklenen", value: "1.842", trend: "▲ 12%", c: "text-(--color-accent-emerald-light) border-emerald-500/30 bg-emerald-500/10" },
                  { label: "Manuel Tasarruf", value: "284sa", trend: "30g", c: "text-(--color-accent-purple-light) border-purple-500/30 bg-purple-500/10" },
                  { label: "Hata", value: "0.3%", trend: "↓ stabil", c: "text-amber-400 border-amber-500/30 bg-amber-500/10" },
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

              {/* Body — Recent triggers */}
              <div className="rounded-xl border border-white/5 bg-white/2 overflow-hidden">
                <div className="grid grid-cols-12 px-3 py-1.5 text-[9px] uppercase tracking-wider text-(--color-text-muted) bg-white/2 border-b border-white/5">
                  <span className="col-span-1">#</span>
                  <span className="col-span-4">Kural</span>
                  <span className="col-span-2">Modül</span>
                  <span className="col-span-3">Aksiyon</span>
                  <span className="col-span-2">Süre</span>
                </div>
                {[
                  { id: "R042", name: "Kritik öncelik → L2 ata", mod: "Olay", action: "Atama + SMS", time: "120 ms", c: "text-(--color-accent-emerald-light)" },
                  { id: "R028", name: "Hizmet Seviyesi &lt; 30dk → eskalasyon", mod: "İstek", action: "Webhook + Bildirim", time: "84 ms", c: "text-(--color-accent-emerald-light)" },
                  { id: "R017", name: "Kategori = VIP → öncelik+1", mod: "Etkileşim", action: "Alan güncelle", time: "45 ms", c: "text-(--color-accent-emerald-light)" },
                  { id: "R009", name: "Mesai dışı → nöbetçi", mod: "Olay", action: "Atama + Mail", time: "98 ms", c: "text-(--color-accent-emerald-light)" },
                ].map((r, i) => (
                  <div key={i} className="grid grid-cols-12 px-3 py-2 text-[10px] border-b border-white/5 last:border-0 hover:bg-white/2 items-center">
                    <span className="col-span-1 font-mono text-(--color-text-muted)">{r.id}</span>
                    <span className="col-span-4 text-white font-medium truncate" dangerouslySetInnerHTML={{ __html: r.name }} />
                    <span className="col-span-2 font-mono text-(--color-text-secondary)">{r.mod}</span>
                    <span className="col-span-3 font-mono text-(--color-accent-cyan-light) truncate">{r.action}</span>
                    <span className={`col-span-2 font-mono ${r.c}`}>{r.time}</span>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] font-mono text-(--color-text-muted)">
                <span>4/1.842 olay · son 60 sn</span>
                <span className="text-(--color-accent-blue-light)">IF · AND · THEN · ELSE</span>
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-(--color-surface-base) to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* 2. ZIG-ZAG FEATURE BLOCKS */}
      <section className="py-24 relative z-20">
        <div className="container mx-auto px-6 lg:px-12 w-full max-w-7xl flex flex-col gap-32">
          {/* Feature 1: SARE */}
          <motion.div
            animate="visible"
            variants={fadeUp}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-blue-500/5 to-cyan-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-blue-500/10 blur-[50px] group-hover:bg-blue-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full h-135 rounded-2xl overflow-hidden bg-(--color-surface-elevated-solid)/95 border border-white/10 shadow-2xl p-5 flex flex-col gap-3">
                  <div className="flex items-center justify-between pb-2.5 border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <CircuitBoard className="w-4 h-4 text-(--color-accent-blue-light)" />
                      <span className="text-xs font-semibold text-white">SARE · Kural Tasarımcısı</span>
                    </div>
                    <span className="text-[10px] font-mono text-(--color-text-muted)">142 kural</span>
                  </div>

                  <div className="grid grid-cols-12 gap-2 flex-1 min-h-0">
                    {/* Rule list */}
                    <div className="col-span-5 rounded-lg border border-white/5 bg-white/2 p-2 flex flex-col gap-1 overflow-hidden">
                      <div className="flex items-center justify-between px-1 mb-0.5">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-(--color-text-muted)">Kural Listesi</span>
                        <Plus className="w-3 h-3 text-(--color-accent-blue-light)" />
                      </div>
                      {[
                        { id: "R042", name: "Kritik öncelik atama", on: true, sel: true },
                        { id: "R038", name: "VIP otomatik etiket", on: true },
                        { id: "R028", name: "Hizmet Seviyesi eşik eskalasyon", on: true },
                        { id: "R024", name: "Tekrar talep birleştir", on: true },
                        { id: "R017", name: "Kategori → grup yönlendir", on: true },
                        { id: "R012", name: "Mesai dışı nöbetçi", on: true },
                        { id: "R009", name: "Yeni çalışan paketi", on: false },
                        { id: "R005", name: "Mail bildirim şablonu", on: true },
                      ].map((r, i) => (
                        <div key={i} className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-[10px] ${r.sel ? "bg-blue-500/15 border border-blue-500/30" : "border border-transparent hover:bg-white/3"}`}>
                          <span className="font-mono text-[8px] text-(--color-text-muted) w-7 shrink-0">{r.id}</span>
                          <span className="flex-1 truncate text-white">{r.name}</span>
                          <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${r.on ? "bg-emerald-400 shadow-[0_0_4px_rgba(52,211,153,0.6)]" : "bg-(--color-text-muted)"}`} />
                        </div>
                      ))}
                    </div>

                    {/* Rule detail */}
                    <div className="col-span-7 rounded-lg border border-blue-500/30 bg-blue-500/5 p-3 flex flex-col gap-2 overflow-hidden">
                      <div className="flex items-center justify-between pb-1.5 border-b border-white/5">
                        <div className="flex items-center gap-1.5">
                          <Hash className="w-3 h-3 text-(--color-accent-blue-light)" />
                          <span className="text-[10px] font-bold text-white font-mono">R042 · Kritik öncelik atama</span>
                        </div>
                        <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/15 text-(--color-accent-emerald-light) border border-emerald-500/30">aktif</span>
                      </div>

                      <div className="space-y-1.5">
                        <div className="rounded-md bg-blue-500/10 border border-blue-500/30 px-2 py-1.5">
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="text-[8px] font-mono font-bold text-(--color-accent-blue-light) px-1 py-0.5 rounded bg-blue-500/20">WHEN</span>
                            <span className="text-[9px] text-(--color-text-secondary)">Kayıt oluşturuldu</span>
                          </div>
                          <div className="text-[9px] font-mono text-white pl-2">modül = Olay</div>
                        </div>

                        <div className="rounded-md bg-cyan-500/10 border border-cyan-500/30 px-2 py-1.5 space-y-0.5">
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="text-[8px] font-mono font-bold text-(--color-accent-cyan-light) px-1 py-0.5 rounded bg-cyan-500/20">IF</span>
                            <span className="text-[9px] text-(--color-text-secondary)">Tüm koşullar</span>
                          </div>
                          <div className="text-[9px] font-mono text-white pl-2">öncelik = &quot;Kritik&quot;</div>
                          <div className="text-[9px] font-mono text-white pl-2">+ kategori = &quot;Üretim&quot;</div>
                        </div>

                        <div className="rounded-md bg-emerald-500/10 border border-emerald-500/30 px-2 py-1.5 space-y-0.5">
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="text-[8px] font-mono font-bold text-(--color-accent-emerald-light) px-1 py-0.5 rounded bg-emerald-500/20">THEN</span>
                            <span className="text-[9px] text-(--color-text-secondary)">3 aksiyon</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-[9px] text-white pl-2"><Users className="w-2.5 h-2.5 text-(--color-accent-emerald-light)" /> L2 takıma ata</div>
                          <div className="flex items-center gap-1.5 text-[9px] text-white pl-2"><Mail className="w-2.5 h-2.5 text-(--color-accent-emerald-light)" /> Yöneticiye e-posta</div>
                          <div className="flex items-center gap-1.5 text-[9px] text-white pl-2"><Bell className="w-2.5 h-2.5 text-(--color-accent-emerald-light)" /> SMS bildirim</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-white/5 mt-auto">
                        <div className="rounded bg-white/3 border border-white/5 px-1.5 py-1 text-center">
                          <div className="text-[7px] uppercase tracking-wider text-(--color-text-muted)">Çağrı</div>
                          <div className="text-[10px] font-bold text-white font-mono">18 / 24sa</div>
                        </div>
                        <div className="rounded bg-white/3 border border-white/5 px-1.5 py-1 text-center">
                          <div className="text-[7px] uppercase tracking-wider text-(--color-text-muted)">Süre</div>
                          <div className="text-[10px] font-bold text-(--color-accent-emerald-light) font-mono">120 ms</div>
                        </div>
                        <div className="rounded bg-white/3 border border-white/5 px-1.5 py-1 text-center">
                          <div className="text-[7px] uppercase tracking-wider text-(--color-text-muted)">Hata</div>
                          <div className="text-[10px] font-bold text-(--color-accent-emerald-light) font-mono">0</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[9px] font-mono text-(--color-text-muted)">
                    <span className="flex items-center gap-1.5"><Activity className="w-3 h-3 text-(--color-accent-blue-light)" /> Sürüm geçmişi · 12 revizyon</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> son 14:32</span>
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

          {/* Feature 2: Koşul → Aksiyon (mock IF/THEN flow) */}
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
                      Otomasyon Kuralı #042
                    </span>
                    <span className="text-[10px] font-mono text-(--color-accent-emerald-light) px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                      Aktif
                    </span>
                  </div>

                  {/* IF / WHEN block */}
                  <div className="px-3 py-2.5 rounded-xl bg-blue-500/10 border border-blue-500/30">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[9px] font-mono font-bold text-(--color-accent-blue-light) px-1.5 py-0.5 rounded bg-blue-500/20">
                        IF
                      </span>
                      <span className="text-[10px] font-medium text-(--color-text-secondary)">
                        Koşul karşılandığında
                      </span>
                    </div>
                    <div className="flex flex-col gap-1 pl-2">
                      <div className="text-[11px] text-white">
                        <span className="font-mono text-(--color-accent-cyan-light)">
                          öncelik
                        </span>{" "}
                        ={" "}
                        <span className="font-mono text-(--color-accent-orange-light)">
                          &quot;Kritik&quot;
                        </span>
                      </div>
                      <div className="text-[11px] text-white">
                        <span className="font-mono text-(--color-accent-cyan-light)">
                          kategori
                        </span>{" "}
                        ={" "}
                        <span className="font-mono text-(--color-accent-orange-light)">
                          &quot;Üretim Sistemi&quot;
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Connector */}
                  <div className="flex justify-center">
                    <ChevronRight className="w-4 h-4 text-(--color-text-muted) rotate-90" />
                  </div>

                  {/* THEN block */}
                  <div className="px-3 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[9px] font-mono font-bold text-(--color-accent-emerald-light) px-1.5 py-0.5 rounded bg-emerald-500/20">
                        THEN
                      </span>
                      <span className="text-[10px] font-medium text-(--color-text-secondary)">
                        Aksiyonları çalıştır
                      </span>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-white/3 border border-white/5">
                        <Users className="w-3 h-3 text-(--color-accent-emerald-light)" />
                        <span className="text-[10px] text-white">
                          L2 takımına ata
                        </span>
                      </div>
                      <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-white/3 border border-white/5">
                        <Mail className="w-3 h-3 text-(--color-accent-blue-light)" />
                        <span className="text-[10px] text-white">
                          Yöneticiye e-posta gönder
                        </span>
                      </div>
                      <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-white/3 border border-white/5">
                        <Bell className="w-3 h-3 text-(--color-accent-orange-light)" />
                        <span className="text-[10px] text-white">
                          SMS bildirimi tetikle
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/5 mt-auto">
                    <span className="text-[10px] font-medium text-(--color-text-muted)">
                      Son 24 saat
                    </span>
                    <span className="text-[10px] font-mono font-semibold text-(--color-accent-emerald-light)">
                      18 kez tetiklendi
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-(--color-accent-emerald-light)">
                <GitBranch size={32} />
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

          {/* Feature 3: Çok katmanlı kurallar (mock layered tree) */}
          <motion.div
            animate="visible"
            variants={fadeUp}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-purple-500/5 to-indigo-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-purple-500/10 blur-[50px] group-hover:bg-purple-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full h-135 rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-(--color-surface-elevated-solid) flex flex-col p-8 gap-2.5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] font-semibold uppercase tracking-widest text-(--color-text-muted)">
                      Çok Katmanlı Kural Ağacı
                    </span>
                    <span className="text-[10px] font-mono text-(--color-accent-purple-light)">
                      3 katman
                    </span>
                  </div>

                  {/* Root condition */}
                  <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-purple-500/15 border border-purple-500/30">
                    <Filter className="w-4 h-4 text-(--color-accent-purple-light)" />
                    <div className="flex flex-col flex-1">
                      <span className="text-[11px] font-bold text-white">
                        Modül = Olay
                      </span>
                      <span className="text-[9px] text-(--color-text-muted)">
                        kök koşul
                      </span>
                    </div>
                  </div>

                  {/* Branch 1 */}
                  <div className="flex flex-col gap-2 pl-5 border-l border-purple-500/20 ml-3">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/3 border border-white/8">
                      <span className="text-[9px] font-mono font-bold text-(--color-accent-blue-light) px-1.5 py-0.5 rounded bg-blue-500/15">
                        VE
                      </span>
                      <span className="text-[11px] text-white flex-1">
                        Etki = Yüksek
                      </span>
                    </div>
                    <div className="flex flex-col gap-1.5 pl-5 border-l border-blue-500/20 ml-3">
                      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                        <Zap className="w-3 h-3 text-(--color-accent-emerald-light)" />
                        <span className="text-[10px] text-white">
                          Major Incident&apos;a yükselt
                        </span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                        <Bell className="w-3 h-3 text-(--color-accent-emerald-light)" />
                        <span className="text-[10px] text-white">
                          Yönetim ekibine bildirim
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Branch 2 */}
                  <div className="flex flex-col gap-2 pl-5 border-l border-purple-500/20 ml-3">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/3 border border-white/8">
                      <span className="text-[9px] font-mono font-bold text-(--color-accent-cyan-light) px-1.5 py-0.5 rounded bg-cyan-500/15">
                        VEYA
                      </span>
                      <span className="text-[11px] text-white flex-1">
                        Hizmet Seviyesi &lt; 1sa
                      </span>
                    </div>
                    <div className="flex flex-col gap-1.5 pl-5 border-l border-cyan-500/20 ml-3">
                      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                        <Webhook className="w-3 h-3 text-(--color-accent-emerald-light)" />
                        <span className="text-[10px] text-white">
                          Eskalasyon webhook tetikle
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-(--color-accent-purple-light)">
                <Layers size={32} />
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
            {/* Bento 1 - Görsel kural tasarımcısı (wide) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 lg:col-span-2 row-span-1 rounded-4xl bg-linear-to-br from-blue-500/10 to-transparent border border-white/10 p-8 hover:bg-white/4 transition-colors relative overflow-hidden group flex flex-col md:flex-row gap-6 items-center"
            >
              <div className="w-full md:w-1/2 flex flex-col justify-center shrink-0">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-(--color-accent-blue-light) flex items-center justify-center mb-6">
                  <Filter />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {data.bento.items[0].title}
                </h3>
                <p className="text-sm text-(--color-text-secondary) font-light pr-4">
                  {data.bento.items[0].description}
                </p>
              </div>
              <div className="w-full md:w-1/2 h-45 md:h-full relative rounded-xl border border-white/10 overflow-hidden shadow-inner shrink-0 bg-(--color-surface-elevated-solid) group-hover:border-blue-500/40 transition-colors flex flex-col gap-1.5 p-4 justify-center">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <span className="text-[9px] font-mono font-bold text-(--color-accent-blue-light) px-1.5 py-0.5 rounded bg-blue-500/20">
                    IF
                  </span>
                  <span className="text-[10px] text-white">öncelik = Kritik</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 ml-4">
                  <span className="text-[9px] font-mono font-bold text-(--color-accent-cyan-light) px-1.5 py-0.5 rounded bg-cyan-500/20">
                    AND
                  </span>
                  <span className="text-[10px] text-white">çalışma saati dışı</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <span className="text-[9px] font-mono font-bold text-(--color-accent-emerald-light) px-1.5 py-0.5 rounded bg-emerald-500/20">
                    THEN
                  </span>
                  <span className="text-[10px] text-white">nöbetçi takıma ata</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-orange-500/10 border border-orange-500/20">
                  <span className="text-[9px] font-mono font-bold text-(--color-accent-orange-light) px-1.5 py-0.5 rounded bg-orange-500/20">
                    ELSE
                  </span>
                  <span className="text-[10px] text-white">L1 kuyruğuna gönder</span>
                </div>
              </div>
            </motion.div>

            {/* Bento 2 - Çoklu tetikleyici (normal) */}
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
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-1.5 justify-center">
                {[
                  { label: "Kayıt oluşturuldu", icon: Plus },
                  { label: "Alan değişti", icon: RefreshCw },
                  { label: "Durum güncellendi", icon: GitBranch },
                  { label: "Hizmet Seviyesi eşiği aşıldı", icon: Bell },
                  { label: "Zaman bazlı koşul", icon: Workflow },
                ].map((row, i) => {
                  const Icon = row.icon;
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/3 border border-white/5"
                    >
                      <Icon className="w-3 h-3 text-(--color-accent-orange-light)" />
                      <span className="text-[10px] font-medium text-white">
                        {row.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Bento 3 - Aksiyon paleti (normal) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-(--color-accent-cyan-light) flex items-center justify-center mb-6 shrink-0">
                <Sparkles />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[2].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[2].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 grid grid-cols-3 gap-2 content-center">
                {[
                  { icon: RefreshCw, label: "Alan" },
                  { icon: Users, label: "Atama" },
                  { icon: Mail, label: "E-posta" },
                  { icon: Plus, label: "Görev" },
                  { icon: Bell, label: "Eskalasyon" },
                  { icon: Webhook, label: "Webhook" },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={i}
                      className="rounded-lg bg-white/3 border border-white/8 flex flex-col items-center justify-center gap-1.5 p-2 hover:border-cyan-500/40 transition-colors"
                    >
                      <Icon className="w-4 h-4 text-(--color-accent-cyan-light)" />
                      <span className="text-[9px] font-medium text-(--color-text-secondary)">
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Bento 4 - Çok katmanlı kurallar (wide) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 lg:col-span-2 row-span-1 rounded-4xl bg-linear-to-br from-purple-500/10 to-transparent border border-white/10 p-8 hover:bg-white/4 transition-colors relative overflow-hidden group flex flex-col md:flex-row gap-6 items-center"
            >
              <div className="w-full md:w-1/2 flex flex-col justify-center shrink-0">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-(--color-accent-purple-light) flex items-center justify-center mb-6">
                  <Layers />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {data.bento.items[3].title}
                </h3>
                <p className="text-sm text-(--color-text-secondary) font-light pr-4">
                  {data.bento.items[3].description}
                </p>
              </div>
              <div className="w-full md:w-1/2 h-45 md:h-full relative rounded-xl border border-white/10 overflow-hidden shadow-inner shrink-0 bg-(--color-surface-elevated-solid) group-hover:border-purple-500/40 transition-colors p-5 flex flex-col gap-2 justify-center">
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex flex-col items-center gap-1 px-2 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <span className="text-[9px] font-mono font-bold text-(--color-accent-blue-light)">
                      Katman 1
                    </span>
                    <span className="text-[10px] font-medium text-white">
                      Kök Koşul
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1 px-2 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                    <span className="text-[9px] font-mono font-bold text-(--color-accent-cyan-light)">
                      Katman 2
                    </span>
                    <span className="text-[10px] font-medium text-white">
                      Alt Koşul
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1 px-2 py-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <span className="text-[9px] font-mono font-bold text-(--color-accent-purple-light)">
                      Katman 3
                    </span>
                    <span className="text-[10px] font-medium text-white">
                      İstisna
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/3 border border-white/8">
                  <span className="text-[10px] font-medium text-(--color-text-secondary)">
                    Paralel aksiyon
                  </span>
                  <span className="text-[10px] font-mono font-bold text-white">
                    4 eylem
                  </span>
                </div>
                <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/3 border border-white/8">
                  <span className="text-[10px] font-medium text-(--color-text-secondary)">
                    Sıralı aksiyon
                  </span>
                  <span className="text-[10px] font-mono font-bold text-white">
                    3 eylem
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Bento 5 - Dinamik güncelleme (normal) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 border border-white/10 bg-linear-to-br from-indigo-500/5 to-transparent rounded-4xl p-8 hover:bg-white/4 transition-colors flex flex-col overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-6 shrink-0">
                <RefreshCw />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[4].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[4].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-2 justify-center">
                {[
                  { field: "Durum", before: "Yeni", after: "İşlemde" },
                  { field: "Sorumlu", before: "—", after: "L2 Takım" },
                  { field: "Etiket", before: "—", after: "kritik" },
                ].map((row, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/3 border border-white/5"
                  >
                    <span className="text-[10px] font-medium text-(--color-text-muted) w-14">
                      {row.field}
                    </span>
                    <span className="text-[10px] font-mono text-(--color-text-secondary) line-through">
                      {row.before}
                    </span>
                    <ChevronRight className="w-3 h-3 text-(--color-text-muted)" />
                    <span className="text-[10px] font-mono font-semibold text-indigo-400">
                      {row.after}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bento 6 - Kural kütüphanesi (normal) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-(--color-accent-emerald-light) flex items-center justify-center mb-6 shrink-0">
                <BookOpen />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[5].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[5].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-1.5 justify-center">
                {[
                  "Kritik olay eskalasyonu",
                  "Otomatik atama",
                  "Hizmet Seviyesi ihlal uyarısı",
                  "Kategori bazlı yönlendirme",
                  "Durum geçiş bildirimi",
                ].map((rule, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-white/3 border border-white/5"
                  >
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-3 h-3 text-(--color-accent-emerald-light)" />
                      <span className="text-[10px] font-medium text-white">
                        {rule}
                      </span>
                    </div>
                    <span className="text-[9px] font-mono text-(--color-accent-emerald-light)">
                      hazır
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
                    <Terminal className="w-4 h-4 text-(--color-accent-blue-light)" />
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-text-overline)">
                      Servis Otomasyonu
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
                        SARE Motoru
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                        <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-blue-base) shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                        Kural Tabanlı
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                        <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-purple-base) shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
                        Çok Katmanlı
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
