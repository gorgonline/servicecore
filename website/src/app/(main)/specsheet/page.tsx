"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";
import {
  FileText,
  ArrowRight,
  ChevronDown,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import data from "@/data/specsheet.json";
import PrivacyContact from "@/components/ui/privacy-contact";

export default function SpecsheetPage() {
  const [activeTab, setActiveTab] = useState<string>(data.tabs[0].id);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const [activeModul, setActiveModul] = useState<string>(
    data.moduller[0].id
  );

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const activeModulData = data.moduller.find((m) => m.id === activeModul);

  return (
    <div className="min-h-screen bg-(--color-surface-base) selection:bg-(--color-brand-primary)/30 text-(--color-text-overline)">
      {/* HERO */}
      <section className="relative pt-32 pb-12 lg:pt-44 lg:pb-16 overflow-hidden w-full">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-300 pointer-events-none">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-150 h-150 bg-blue-600/20 blur-[120px] rounded-full mix-blend-screen" />
          <div className="absolute top-40 right-1/4 w-100 h-100 bg-purple-600/10 blur-[100px] rounded-full mix-blend-screen" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10 w-full max-w-7xl">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-(--color-accent-blue-light) text-xs font-black tracking-widest uppercase mb-8 shadow-inner"
            >
              <FileText size={14} />
              {data.hero.badge}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl lg:text-6xl font-bold text-white mb-4 tracking-tight leading-[1.1]"
            >
              {data.hero.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base lg:text-lg text-(--color-accent-blue-light) font-medium mb-4"
            >
              {data.hero.subtitle}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base lg:text-lg text-(--color-text-secondary) font-light leading-relaxed max-w-3xl"
            >
              {data.hero.description}
            </motion.p>
          </div>
        </div>
      </section>

      {/* TABS CONTAINER */}
      <section className="relative pb-24 z-20">
        <div className="container mx-auto px-6 lg:px-12 w-full max-w-7xl">
          <div className="rounded-3xl border border-white/10 bg-white/2 backdrop-blur-xl overflow-hidden shadow-2xl">
            {/* TAB LIST */}
            <div className="flex flex-col sm:flex-row border-b border-white/10 bg-white/3 overflow-x-auto">
              {data.tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-6 py-4 text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    activeTab === tab.id
                      ? "text-white"
                      : "text-(--color-text-secondary) hover:text-white"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute left-4 right-4 bottom-0 h-0.5 bg-(--color-brand-primary) rounded-full"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* TAB PANELS */}
            <div className="p-6 lg:p-10 min-h-100">
              <AnimatePresence mode="wait">
                {/* TAB 1: GENEL */}
                {activeTab === "genel" && (
                  <motion.div
                    key="genel"
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <h2 className="text-2xl lg:text-3xl font-bold text-white tracking-tight mb-8">
                      Genel Şartlar
                    </h2>
                    <div className="flex flex-col gap-4">
                      {data.genel.intro.map((p, i) => (
                        <div
                          key={i}
                          className="rounded-2xl border border-white/10 bg-white/2 hover:bg-white/4 transition-colors p-6"
                        >
                          <p className="text-sm lg:text-base text-(--color-text-secondary) font-light leading-relaxed">
                            {p}
                          </p>
                        </div>
                      ))}

                      {/* Accordion */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
                        {data.genel.accordion.map((item) => {
                          const isOpen = openAccordion === item.no;
                          const toneIdx = (item.no - 1) % 4;
                          const tones = [
                            "from-blue-500 to-indigo-600",
                            "from-emerald-500 to-emerald-700",
                            "from-purple-500 to-purple-700",
                            "from-rose-500 to-red-700",
                          ];
                          return (
                            <div
                              key={item.no}
                              className={`rounded-xl border border-white/10 bg-white/2 overflow-hidden transition-colors ${
                                isOpen ? "bg-white/5" : "hover:bg-white/4"
                              }`}
                            >
                              <button
                                onClick={() =>
                                  setOpenAccordion(isOpen ? null : item.no)
                                }
                                className="w-full flex items-center gap-3 p-3 text-left cursor-pointer"
                              >
                                <div
                                  className={`w-8 h-8 rounded-lg bg-linear-to-br ${tones[toneIdx]} flex items-center justify-center text-[11px] font-bold text-white shrink-0`}
                                >
                                  {item.no}
                                </div>
                                <span className="text-xs font-semibold text-white flex-1">
                                  {item.title}
                                </span>
                                <ChevronDown
                                  className={`w-4 h-4 text-(--color-text-muted) shrink-0 transition-transform ${
                                    isOpen ? "rotate-180" : ""
                                  }`}
                                />
                              </button>
                              <AnimatePresence>
                                {isOpen && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden"
                                  >
                                    <div className="px-4 pb-4 pt-1 border-t border-white/5">
                                      <p className="text-xs text-(--color-text-secondary) font-light leading-relaxed">
                                        {item.desc}
                                      </p>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>

                      {data.genel.outro.map((p, i) => (
                        <div
                          key={i}
                          className="rounded-2xl border border-white/10 bg-white/2 hover:bg-white/4 transition-colors p-6 mt-2"
                        >
                          <p className="text-sm lg:text-base text-(--color-text-secondary) font-light leading-relaxed">
                            {p}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* TAB 2: LISANS & TEKNIK */}
                {activeTab === "lisans" && (
                  <motion.div
                    key="lisans"
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <h2 className="text-2xl lg:text-3xl font-bold text-white tracking-tight mb-8">
                      Lisanslama & Teknik Altyapı
                    </h2>

                    <h3 className="text-lg font-semibold text-(--color-accent-blue-light) tracking-tight mb-4">
                      Lisanslama
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                      {data.lisans.map((item, i) => (
                        <div
                          key={i}
                          className="rounded-xl border border-white/10 bg-white/2 hover:bg-white/4 hover:border-blue-500/30 transition-colors p-5 flex items-start gap-3"
                        >
                          <CheckCircle2 className="w-4 h-4 text-(--color-accent-blue-light) shrink-0 mt-0.5" />
                          <p className="text-sm text-(--color-text-secondary) font-light leading-relaxed">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>

                    <h3 className="text-lg font-semibold text-(--color-accent-emerald-light) tracking-tight mb-4">
                      Teknik Altyapı
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {data.teknik.map((item, i) => (
                        <div
                          key={i}
                          className="rounded-xl border border-white/10 bg-white/2 hover:bg-white/4 hover:border-emerald-500/30 transition-colors p-4 flex items-start gap-3"
                        >
                          <span className="text-[10px] font-mono font-bold text-(--color-accent-emerald-light) px-1.5 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 shrink-0 mt-0.5">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <p className="text-xs text-(--color-text-secondary) font-light leading-relaxed">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* TAB 3: MODÜLLER */}
                {activeTab === "moduller" && (
                  <motion.div
                    key="moduller"
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <h2 className="text-2xl lg:text-3xl font-bold text-white tracking-tight mb-8">
                      Temel Modüller
                    </h2>
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Sidebar */}
                      <nav className="lg:w-64 lg:shrink-0">
                        <div className="rounded-xl border border-white/10 bg-white/2 p-2 lg:sticky lg:top-24 max-h-[60vh] lg:max-h-none overflow-y-auto">
                          <ul className="flex flex-col gap-1">
                            {data.moduller.map((m) => (
                              <li key={m.id}>
                                <button
                                  onClick={() => setActiveModul(m.id)}
                                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-2 ${
                                    activeModul === m.id
                                      ? "bg-blue-500/15 border border-blue-500/30 text-(--color-accent-blue-light)"
                                      : "text-(--color-text-secondary) hover:text-white hover:bg-white/3 border border-transparent"
                                  }`}
                                >
                                  <ChevronRight
                                    className={`w-3 h-3 shrink-0 transition-transform ${
                                      activeModul === m.id ? "translate-x-0.5" : ""
                                    }`}
                                  />
                                  <span className="flex-1">{m.title}</span>
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </nav>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        {activeModulData && (
                          <motion.div
                            key={activeModulData.id}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <h3 className="text-xl lg:text-2xl font-bold text-white tracking-tight mb-6">
                              {activeModulData.title}
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {activeModulData.items.map((item, i) => (
                                <div
                                  key={i}
                                  className="rounded-xl border border-white/10 bg-white/2 hover:bg-white/4 hover:border-blue-500/30 transition-colors p-4 flex items-start gap-3"
                                >
                                  <CheckCircle2 className="w-4 h-4 text-(--color-accent-blue-light) shrink-0 mt-0.5" />
                                  <p className="text-xs lg:text-sm text-(--color-text-secondary) font-light leading-relaxed">
                                    {item}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* TAB 4: BAKIM & DESTEK */}
                {activeTab === "bakim" && (
                  <motion.div
                    key="bakim"
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <h2 className="text-2xl lg:text-3xl font-bold text-white tracking-tight mb-8">
                      Bakım & Destek
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {data.bakim.map((item, i) => (
                        <div
                          key={i}
                          className="rounded-xl border border-white/10 bg-white/2 hover:bg-white/4 hover:border-purple-500/30 transition-colors p-5 flex items-start gap-3"
                        >
                          <CheckCircle2 className="w-4 h-4 text-(--color-accent-purple-light) shrink-0 mt-0.5" />
                          <p className="text-sm text-(--color-text-secondary) font-light leading-relaxed">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* COPYRIGHT */}
          <div className="text-right text-xs text-(--color-text-muted) mt-6 font-mono">
            Copyright © 2025 — SERVICECORE® · Tüm hakları saklıdır.
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="container mx-auto pb-20 max-w-7xl">
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
                    <FileText className="w-4 h-4 text-(--color-accent-blue-light)" />
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-text-overline)">
                      Specsheet
                    </span>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
                    Detaylı teknik özellikleri canlı demoda inceleyin.
                  </h2>

                  <p className="text-lg text-(--color-text-overline) font-light leading-relaxed mb-10 max-w-xl mx-auto">
                    30+ entegre modül, kurumsal güvenlik, REST API ve uçtan uca otomasyon — her özelliği uzman ekibimizle keşfedin.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/demo">
                      <button className="px-8 py-4 rounded-full bg-(--color-brand-primary) text-white font-semibold hover:bg-blue-600 transition-all hover:scale-105 active:scale-95 shadow-(--shadow-glow-primary-weak) cursor-pointer flex items-center gap-2">
                        Hemen Demo Alın
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </Link>
                    <Link href="/iletisim">
                      <button className="px-8 py-4 rounded-full bg-white/5 text-white font-semibold border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
                        Bize Ulaşın
                      </button>
                    </Link>
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
