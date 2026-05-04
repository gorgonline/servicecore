"use client";

import { motion } from "framer-motion";
import { ArrowRight, Headphones, CalendarCheck, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function SupportCtaSection() {
  return (
    <section className="relative w-full py-24 lg:py-32 overflow-hidden border-t border-white/5">
      {/* Background Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-(--color-brand-primary)/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-0 right-0 w-125 h-125 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-stretch">
          
          {/* Support Services Card */}
          <motion.div
            transition={{ duration: 0.6 }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-(--color-surface-elevated-solid)/50 backdrop-blur-xl border border-white/10 p-8 md:p-10 hover:border-white/20 transition-colors"
          >
            <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
                <Headphones className="w-4 h-4 text-(--color-accent-cyan-light)" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-text-overline)">Destek Ekibi</span>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">
                Servicecore Profesyonel <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-(--color-accent-blue-base) font-bold">Destek Hizmetleri</span>
              </h2>
              
              <p className="text-(--color-text-secondary) font-light leading-relaxed mb-8">
                İşletmelerin operasyonel süreçlerini optimize etmek ve en yüksek verimliliği sağlamak için tasarlanmıştır. Uzman kadromuzla hızlı, yerel ve vizyoner destek sunarak konforlu bir çalışma ortamı yaratıyoruz.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                    <ShieldCheck className="w-4 h-4 text-(--color-accent-blue-light)" />
                  </div>
                  <span className="text-sm font-medium text-(--color-text-overline)">Stratejik ve Teknik Danışmanlık</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                    <Zap className="w-4 h-4 text-(--color-accent-cyan-light)" />
                  </div>
                  <span className="text-sm font-medium text-(--color-text-overline)">Hızlı ve Kesintisiz Çözümler</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-auto pt-6 border-t border-white/10">
              <Link href="/destek-kanallari" className="inline-flex items-center text-sm font-semibold text-white group/link hover:text-(--color-accent-cyan-light) transition-colors">
                Profesyonel Destek Kanalları
                <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Demo CTA Card */}
          <motion.div
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group relative flex flex-col justify-center overflow-hidden rounded-3xl bg-linear-to-br from-(--color-brand-primary) to-(--color-brand-purple) p-1 md:p-px"
          >
            <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative h-full flex flex-col items-center justify-center text-center rounded-[23px] bg-(--color-surface-elevated-solid)/90 backdrop-blur-3xl px-8 py-16 md:px-12">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-8 border border-white/20 shadow-inner">
                <CalendarCheck className="w-8 h-8 text-white" />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                Danışman Rehberliğinde Demo
              </h2>
              
              <p className="text-lg text-(--color-text-overline) font-light leading-relaxed mb-10 max-w-md">
                ITSM uzmanlarımız ve danışmanlarımız eşliğinde, sizin süreçlerinize özel demo oturumları aracılığıyla ürünümüzün tüm ayrıntılarını keşfedin.
              </p>
              
              <Link href="/demo">
                <Button variant="cta" size="lg">
                  Hemen Demo İste
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              
              <p className="mt-6 text-xs text-(--color-text-muted) font-semibold tracking-[0.2em] uppercase">
                Kredi Kartı Gerekmez • Ücretsiz Ön Görüşme
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
