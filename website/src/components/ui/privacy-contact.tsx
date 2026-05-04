"use client";

import { motion } from "framer-motion";
import { Mail, ArrowRight, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PrivacyContact() {
  return (
    <div className="container mx-auto px-6 lg:px-12 pb-40 max-w-7xl">
      <motion.div
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="group relative flex flex-col justify-center overflow-hidden rounded-3xl bg-linear-to-br from-(--color-brand-primary) to-(--color-brand-purple) p-1 md:p-px"
      >
        <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative h-full flex flex-col items-center justify-center text-center rounded-[23px] bg-(--color-surface-elevated-solid)/90 backdrop-blur-3xl px-8 py-16 md:px-12">
          {/* Background Glows */}
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 w-full">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 mx-auto">
              <MessageSquare className="w-4 h-4 text-(--color-accent-cyan-light)" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-text-overline)">İletişim</span>
            </div>

            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
              Sorularınız mı var?
            </h3>

            <p className="text-lg text-(--color-text-overline) font-light leading-relaxed mb-10 max-w-xl mx-auto">
              Gizlilik politikamız veya verilerinizin işlenmesiyle ilgili herhangi bir sorunuz varsa, uzman ekibimiz size yardımcı olmaktan mutluluk duyacaktır.
            </p>

            <div className="flex flex-col items-center gap-6">
              <a href="mailto:info@servicecore.com.tr" className="cursor-pointer">
                <Button variant="cta" size="lg">
                  <Mail className="w-5 h-5 mr-3" />
                  info@servicecore.com.tr
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>

              <div className="flex flex-wrap justify-center gap-8 text-(--color-text-muted)">
                <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                  Hızlı Yanıt
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                  <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-blue-base) shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                  Uzman Destek
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                  <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-purple-base) shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
                  7/24 Erişim
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
