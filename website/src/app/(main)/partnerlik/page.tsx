"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import {
  CheckCircle2,
  Send,
  Mail,
  Phone,
  Sparkles,
  Loader2,
  AlertCircle,
} from "lucide-react";
import ServiceCoreHero from "@/components/ui/ServiceCoreHero";
import partnershipData from "@/data/partnership.json";
import { submitForm } from "@/lib/forms";

type Status = "idle" | "loading" | "success" | "error";

export default function PartnerlikPage() {
  const { partnership_program } = partnershipData;
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      Ad: String(formData.get("ad") ?? ""),
      Soyad: String(formData.get("soyad") ?? ""),
      "E-posta": String(formData.get("eposta") ?? ""),
      Telefon: String(formData.get("telefon") ?? ""),
      Mesaj: String(formData.get("mesaj") ?? ""),
    };

    setStatus("loading");
    setErrorMessage("");
    const result = await submitForm("Partnerlik", data);
    if (result.ok) {
      setStatus("success");
      form.reset();
    } else {
      setStatus("error");
      setErrorMessage(result.error);
    }
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <div className="min-h-screen bg-(--color-surface-base) text-white selection:bg-blue-500/30">
      
      {/* HERO SECTION */}
      <ServiceCoreHero 
        title={partnership_program.title}
        highlightedWord="İşbirliği"
        subtitle={partnership_program.description}
        badge="İş Ortaklığı Programı"
      />

      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          
          {/* LEFT COLUMN: ADVANTAGES */}
          <motion.div
            className="space-y-12"
          >
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-6">
                {partnership_program.advantages_title}
              </h2>
              <p className="text-(--color-text-secondary) text-lg font-light leading-relaxed mb-10">
                {partnership_program.advantages_description}
              </p>

              <motion.ul
                variants={containerVariants}
                animate="visible"
                className="space-y-5"
              >
                {partnership_program.benefits.map((benefit, idx) => (
                  <motion.li 
                    key={idx} 
                    variants={itemVariants}
                    className="flex items-start gap-4 group"
                  >
                    <div className="mt-1 w-5 h-5 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-(--color-accent-blue-light) shrink-0 group-hover:bg-(--color-accent-blue-base) group-hover:text-white transition-all">
                      <CheckCircle2 size={12} strokeWidth={3} />
                    </div>
                    <span className="text-(--color-text-overline) font-medium group-hover:text-white transition-colors">
                      {benefit.text}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>

            {/* Footer Note / Contact Info */}
            <div className="p-8 rounded-3xl bg-white/2 border border-white/5 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/50" />
              <p className="text-(--color-text-secondary) font-light leading-relaxed mb-6">
                {partnership_program.footer_note}
              </p>
              <div className="flex flex-wrap gap-6 text-sm font-bold uppercase tracking-widest text-(--color-accent-blue-light)">
                <a href={`mailto:${partnership_program.call_to_action.email.toLowerCase()}`} className="flex items-center gap-2 hover:text-white transition-colors lowercase">
                  <Mail size={16} />
                  <span>{partnership_program.call_to_action.email.toLowerCase()}</span>
                </a>
                <a href={`tel:${partnership_program.call_to_action.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 hover:text-white transition-colors">
                  <Phone size={16} />
                  <span>{partnership_program.call_to_action.phone}</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: FORM */}
          <motion.div
            className="sticky top-32"
          >
            <div className="relative p-10 rounded-[2.5rem] bg-(--color-surface-elevated-solid)/50 border border-white/10 backdrop-blur-3xl shadow-2xl overflow-hidden group">
              {/* Decorative Background */}
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500/5 blur-[80px] rounded-full group-hover:bg-blue-500/10 transition-all duration-700" />
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                  <Sparkles size={20} className="text-(--color-accent-blue-light)" />
                  {partnership_program.form_title}
                </h3>

                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="ad" className="text-[10px] font-black uppercase tracking-widest text-(--color-text-muted) ml-4">Ad*</label>
                      <input id="ad" name="ad" type="text" required disabled={status === "loading"} className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 outline-none focus:border-blue-500/50 focus:bg-white/8 transition-all font-medium disabled:opacity-60" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="soyad" className="text-[10px] font-black uppercase tracking-widest text-(--color-text-muted) ml-4">Soyad*</label>
                      <input id="soyad" name="soyad" type="text" required disabled={status === "loading"} className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 outline-none focus:border-blue-500/50 focus:bg-white/8 transition-all font-medium disabled:opacity-60" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="eposta" className="text-[10px] font-black uppercase tracking-widest text-(--color-text-muted) ml-4">E-Posta*</label>
                    <input id="eposta" name="eposta" type="email" required disabled={status === "loading"} placeholder="jane@example.com" className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 outline-none focus:border-blue-500/50 focus:bg-white/8 transition-all font-medium disabled:opacity-60" />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="telefon" className="text-[10px] font-black uppercase tracking-widest text-(--color-text-muted) ml-4">Telefon*</label>
                    <input id="telefon" name="telefon" type="tel" required disabled={status === "loading"} placeholder="05XX XXX XXXX" className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 outline-none focus:border-blue-500/50 focus:bg-white/8 transition-all font-medium disabled:opacity-60" />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="mesaj" className="text-[10px] font-black uppercase tracking-widest text-(--color-text-muted) ml-4">Mesaj</label>
                    <textarea id="mesaj" name="mesaj" rows={4} disabled={status === "loading"} className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 outline-none focus:border-blue-500/50 focus:bg-white/8 transition-all font-medium resize-none disabled:opacity-60" />
                  </div>

                  {status === "success" && (
                    <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-(--color-accent-emerald-light)">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span className="text-sm font-medium">Başvurunuz alındı. Ekibimiz en kısa sürede iletişime geçecek.</span>
                    </div>
                  )}
                  {status === "error" && (
                    <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-red-500/10 border border-red-500/30 text-(--color-accent-red-light)">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span className="text-sm font-medium">Bir hata oluştu: {errorMessage || "Lütfen tekrar deneyin."}</span>
                    </div>
                  )}

                  <button type="submit" disabled={status === "loading"} className="w-full py-5 rounded-2xl bg-(--color-accent-blue-base) hover:bg-blue-600 text-white font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3 group/btn transition-all mt-8 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer">
                    {status === "loading" ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        <span>Gönderiliyor…</span>
                      </>
                    ) : (
                      <>
                        <span>Gönder</span>
                        <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </motion.div>

        </div>
      </main>

      {/* FOOTER DECORATION */}
      <div className="h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}
