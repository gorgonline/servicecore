"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  Users,
  Trophy,
  ChevronDown,
  Sparkles,
  Mail,
  ArrowRight,
  CircleCheckBig,
  Phone,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import ServiceCoreHero from "@/components/ui/ServiceCoreHero";
import egitimlerData from "@/data/egitimler.json";
import { submitForm } from "@/lib/forms";
import { useFormGuard } from "@/hooks/useFormGuard";

type Status = "idle" | "loading" | "success" | "error";

const iconMap = {
  Calendar,
  Clock,
  Users,
  Trophy
};

const AccordionItem = ({ title, content }: { title: string; content: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/5 last:border-0 group/acc">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between text-left transition-all outline-none"
      >
        <span className="text-base font-medium text-(--color-text-overline) group-hover/acc:text-(--color-accent-blue-light) transition-colors">
          {title}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="text-(--color-text-muted) group-hover/acc:text-(--color-accent-blue-light) transition-colors w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/5 group-hover/acc:border-blue-500/20"
        >
          <ChevronDown size={18} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pb-6 pt-2 text-sm text-(--color-text-secondary) font-light leading-relaxed pr-8">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function EgitimlerPage() {
  const { egitimler } = egitimlerData;
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const guard = useFormGuard();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      Ad: String(formData.get("ad") ?? ""),
      Soyad: String(formData.get("soyad") ?? ""),
      Firma: String(formData.get("firma") ?? ""),
      "İş Ünvanı": String(formData.get("unvan") ?? ""),
      "E-posta": String(formData.get("eposta") ?? ""),
      Telefon: String(formData.get("telefon") ?? ""),
    };

    setStatus("loading");
    setErrorMessage("");
    const result = await submitForm("Eğitim", data, guard.collect());
    if (result.ok) {
      setStatus("success");
      form.reset();
    } else {
      setStatus("error");
      setErrorMessage(result.error);
    }
  }

  return (
    <div className="min-h-screen bg-(--color-surface-base) text-white overflow-x-hidden selection:bg-blue-500/30">
      
      {/* 1. HERO SECTION */}
      <ServiceCoreHero 
        title={egitimler.hero.title}
        highlightedWord="Eğitimleri"
        subtitle={egitimler.hero.description}
        badge={egitimler.hero.badge}
      />

      {/* 2. PROGRAMLAR VE MÜFREDAT (Full Width Section for each program) */}
      <section className="w-full relative z-10 -mt-24 mb-16 space-y-32">
        {egitimler.programs.map((program, pIndex) => (
          <div key={program.id} className="w-full relative pt-12">
            
            {/* Visual Separation Mesh for each program */}
            <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-blue-500/20 to-transparent" />
            <div className={`absolute -top-32 ${pIndex % 2 === 0 ? '-left-64' : '-right-64'} w-200 h-200 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none`} />

            <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                
                {/* Left: Main Program Card */}
                <motion.div
                  className="lg:col-span-7 relative group"
                >
                  <div className="absolute -inset-1 bg-linear-to-br from-blue-500/10 to-transparent rounded-[3rem] blur-lg group-hover:from-blue-500/20 transition duration-1000" />
                  <div className="relative bg-(--color-surface-elevated-solid)/80 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 lg:p-14 h-full shadow-2xl flex flex-col justify-between overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full group-hover:bg-blue-500/20 transition-colors duration-700" />
                    
                    <div className="relative z-10 flex justify-between items-start mb-8 gap-6 lg:gap-10">
                      <div className="space-y-3 flex-1">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-(--color-accent-blue-light) text-xs font-black tracking-widest uppercase shadow-inner">
                          {program.code}
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-white">{program.title}</h2>
                      </div>
                      
                      {/* Premium Certified Badge (Image) */}
                      <div className="w-24 h-24 lg:w-32 lg:h-32 shrink-0 relative flex items-center justify-center drop-shadow-[0_0_15px_rgba(59,130,246,0.15)] group-hover:drop-shadow-[0_0_30px_rgba(59,130,246,0.4)] group-hover:scale-110 transition-all duration-700">
                        <Image 
                          src={`/images/egitimler/${program.id}.png`}
                          alt={`${program.code} Sertifikası`}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                    
                    <p className="relative z-10 text-(--color-text-secondary) font-light leading-relaxed text-lg max-w-2xl">
                      {program.description}
                    </p>
                  </div>
                </motion.div>

                {/* Right: Info Cards */}
                <div className="lg:col-span-5 grid grid-cols-2 gap-4 lg:gap-6">
                  {program.info_cards.map((card, idx) => {
                    const Icon = iconMap[card.icon as keyof typeof iconMap] || Calendar;
                    return (
                      <motion.div
                        transition={{ delay: idx * 0.1 }}
                        key={idx}
                        className="bg-white/2 backdrop-blur-md border border-white/5 rounded-[2.5rem] p-8 flex flex-col justify-between hover:bg-white/4 hover:border-blue-500/30 transition-all duration-500 group relative overflow-hidden"
                      >
                         <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-2xl rounded-full group-hover:bg-blue-500/10 transition-colors duration-500" />
                         <div className="flex justify-between items-start mb-8 relative z-10">
                            <div className="p-3 rounded-2xl bg-blue-500/5 border border-white/5 text-(--color-accent-blue-light) group-hover:bg-(--color-accent-blue-base) group-hover:text-white group-hover:border-blue-400 transition-all duration-500 shadow-xl">
                               <Icon size={24} />
                            </div>
                            <div className="text-(--color-text-muted)"><Icon size={48} className="opacity-[0.03] absolute -right-2 -top-2" /></div>
                         </div>
                         <div className="relative z-10">
                           <div className="text-[10px] font-black uppercase tracking-[0.2em] text-(--color-text-muted) mb-2">{card.label}</div>
                           <div className="text-lg font-bold text-white tracking-tight">{card.value}</div>
                         </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Curriculum Accordion (Below the cards, integrated smoothly) */}
              <motion.div
                className="max-w-5xl mx-auto w-full mt-16"
              >
                <div className="flex items-center gap-6 mb-10">
                  <div className="h-px grow bg-linear-to-r from-transparent via-white/10 to-white/10" />
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-blue-400/70 shrink-0">
                    {program.curriculum_title}
                  </h3>
                  <div className="h-px grow bg-linear-to-l from-transparent via-white/10 to-white/10" />
                </div>
                
                <div className="bg-linear-to-br from-(--color-surface-elevated-solid)/50 to-transparent border border-white/5 rounded-[2.5rem] p-8 lg:p-10 shadow-xl backdrop-blur-sm">
                  {program.curriculum.map((item, idx) => (
                    <AccordionItem key={idx} title={item.title} content={item.content} />
                  ))}
                </div>
              </motion.div>

            </div>
          </div>
        ))}
      </section>



      {/* 4. KATILIM BİLGİLERİ VE FORM (Full Width Split Screen) */}
      <section className="w-full relative overflow-hidden bg-(--color-surface-elevated-solid) border-t border-white/10 mt-24">
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-blue-500/40 to-transparent" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-200 h-200 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-350 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-200">
            
            {/* LEFT: INFO */}
            <div className="py-24 px-6 lg:px-12 xl:pr-24 flex flex-col justify-center relative z-10">
              <motion.div
                className="space-y-14"
              >
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-(--color-accent-blue-light) text-[10px] font-black uppercase tracking-widest mb-8">
                    <CircleCheckBig size={14} />
                    Katılım Bilgileri
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-8 text-white">
                    {egitimler.participation_info.title}
                  </h2>
                  
                  <div className="space-y-8">
                    {egitimler.participation_info.items.map((item, idx) => (
                      <div key={idx} className="flex gap-6 group">
                         <div className="mt-1 w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-xs font-black text-(--color-text-muted) group-hover:text-white group-hover:bg-blue-500/20 group-hover:border-blue-500/40 transition-all duration-300 shadow-inner group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                           {idx + 1}
                         </div>
                         <p className="text-(--color-text-overline) text-lg font-light leading-relaxed group-hover:text-white transition-colors">
                           {item}
                         </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Support Info Box */}
                <div className="p-8 lg:p-10 rounded-[2.5rem] bg-white/2 border border-white/10 relative overflow-hidden group hover:border-blue-500/30 transition-colors backdrop-blur-sm">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full" />
                  <div className="flex items-center gap-6 relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-(--color-surface-base) border border-white/10 flex items-center justify-center text-(--color-accent-blue-light) shadow-2xl group-hover:bg-(--color-accent-blue-base) group-hover:text-white transition-colors duration-500">
                      <Mail size={28} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">Kurumsal İletişim</h4>
                      <div className="flex flex-col gap-2 mt-3">
                        <a href="mailto:info@servicecore.app" className="text-(--color-text-secondary) hover:text-(--color-accent-blue-light) transition-colors flex items-center gap-2 text-sm font-medium">
                          <Mail size={16} /> info@servicecore.app
                        </a>
                        <a href="tel:444CORE" className="text-(--color-text-secondary) hover:text-(--color-accent-blue-light) transition-colors flex items-center gap-2 text-sm font-medium">
                          <Phone size={16} /> 444 CORE
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* RIGHT: FORM */}
            <div className="py-24 px-6 lg:px-12 xl:pl-24 flex flex-col justify-center relative bg-(--color-surface-base)/50 border-t lg:border-t-0 lg:border-l border-white/5 backdrop-blur-2xl">
              <motion.div
                className="w-full max-w-xl mx-auto lg:mr-auto lg:ml-0"
              >
                <div className="relative p-10 lg:p-12 rounded-[3rem] bg-white/2 border border-white/10 shadow-2xl group focus-within:border-blue-500/40 transition-colors duration-500">
                  <h3 className="text-2xl lg:text-3xl font-bold mb-10 flex items-center gap-3 text-white">
                    <Sparkles size={24} className="text-(--color-accent-blue-light)" />
                    Ön Kayıt Talep Formu
                  </h3>

                  <form className="grid gap-6" onSubmit={handleSubmit}>
                    {guard.field}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="ad" className="text-[10px] font-bold uppercase tracking-[0.2em] text-(--color-text-secondary) ml-2">Ad*</label>
                        <input id="ad" name="ad" type="text" required disabled={status === "loading"} className="w-full bg-(--color-surface-base) border border-white/10 rounded-2xl py-4 px-6 outline-none text-white focus:border-(--color-accent-blue-base) focus:bg-blue-500/5 transition-all font-medium placeholder:text-(--color-text-dim) shadow-inner focus:shadow-[0_0_20px_rgba(59,130,246,0.1)] disabled:opacity-60" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="soyad" className="text-[10px] font-bold uppercase tracking-[0.2em] text-(--color-text-secondary) ml-2">Soyad*</label>
                        <input id="soyad" name="soyad" type="text" required disabled={status === "loading"} className="w-full bg-(--color-surface-base) border border-white/10 rounded-2xl py-4 px-6 outline-none text-white focus:border-(--color-accent-blue-base) focus:bg-blue-500/5 transition-all font-medium placeholder:text-(--color-text-dim) shadow-inner focus:shadow-[0_0_20px_rgba(59,130,246,0.1)] disabled:opacity-60" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="firma" className="text-[10px] font-bold uppercase tracking-[0.2em] text-(--color-text-secondary) ml-2">Firma Adı*</label>
                        <input id="firma" name="firma" type="text" required disabled={status === "loading"} className="w-full bg-(--color-surface-base) border border-white/10 rounded-2xl py-4 px-6 outline-none text-white focus:border-(--color-accent-blue-base) focus:bg-blue-500/5 transition-all font-medium placeholder:text-(--color-text-dim) shadow-inner focus:shadow-[0_0_20px_rgba(59,130,246,0.1)] disabled:opacity-60" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="unvan" className="text-[10px] font-bold uppercase tracking-[0.2em] text-(--color-text-secondary) ml-2">İş Ünvanı*</label>
                        <input id="unvan" name="unvan" type="text" required disabled={status === "loading"} className="w-full bg-(--color-surface-base) border border-white/10 rounded-2xl py-4 px-6 outline-none text-white focus:border-(--color-accent-blue-base) focus:bg-blue-500/5 transition-all font-medium placeholder:text-(--color-text-dim) shadow-inner focus:shadow-[0_0_20px_rgba(59,130,246,0.1)] disabled:opacity-60" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="eposta" className="text-[10px] font-bold uppercase tracking-[0.2em] text-(--color-text-secondary) ml-2">E-Posta Adresi*</label>
                      <input id="eposta" name="eposta" type="email" required disabled={status === "loading"} className="w-full bg-(--color-surface-base) border border-white/10 rounded-2xl py-4 px-6 outline-none text-white focus:border-(--color-accent-blue-base) focus:bg-blue-500/5 transition-all font-medium placeholder:text-(--color-text-dim) shadow-inner focus:shadow-[0_0_20px_rgba(59,130,246,0.1)] disabled:opacity-60" />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="telefon" className="text-[10px] font-bold uppercase tracking-[0.2em] text-(--color-text-secondary) ml-2">Telefon Numarası*</label>
                      <input id="telefon" name="telefon" type="tel" required disabled={status === "loading"} className="w-full bg-(--color-surface-base) border border-white/10 rounded-2xl py-4 px-6 outline-none text-white focus:border-(--color-accent-blue-base) focus:bg-blue-500/5 transition-all font-medium placeholder:text-(--color-text-dim) shadow-inner focus:shadow-[0_0_20px_rgba(59,130,246,0.1)] disabled:opacity-60" />
                    </div>

                    {status === "success" && (
                      <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-(--color-accent-emerald-light)">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span className="text-sm font-medium">Kayıt talebiniz alındı. En kısa sürede iletişime geçeceğiz.</span>
                      </div>
                    )}
                    {status === "error" && (
                      <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-red-500/10 border border-red-500/30 text-(--color-accent-red-light)">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span className="text-sm font-medium">Bir hata oluştu: {errorMessage || "Lütfen tekrar deneyin."}</span>
                      </div>
                    )}

                    <button type="submit" disabled={status === "loading"} className="w-full py-5 rounded-2xl bg-(--color-accent-blue-base) hover:bg-blue-400 text-white font-black uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] flex items-center justify-center gap-3 group/btn transition-all mt-6 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer">
                      {status === "loading" ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          <span>Gönderiliyor…</span>
                        </>
                      ) : (
                        <>
                          <span>Kayıt Talebi Gönder</span>
                          <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
