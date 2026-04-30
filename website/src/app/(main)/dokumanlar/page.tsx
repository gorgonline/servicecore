"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  UserCircle, 
  Settings, 
  Link as LinkIcon, 
  RefreshCw, 
  Download, 
  Monitor, 
  PlayCircle,
  ExternalLink,
  ChevronRight
} from "lucide-react";

const docsData = {
  header: {
    title: "Servicecore Dokümantasyon ve Eğitim Merkezi",
    description: "Kapsamlı dokümantasyon, admin, teknisyen ve kullanıcılar için ürün kılavuzları ile tüm işlemler elinizin altında..."
  },
  guides: [
    {
      title: "TEKNİSYEN KILAVUZU",
      description: "Teknisyenler için tüm modüller",
      url: "https://docs.servicecore.app/docs/category/tekni%CC%87syen",
      icon: Settings,
      color: "text-(--color-accent-blue-light)",
      bg: "bg-blue-500/10"
    },
    {
      title: "KULLANICI KILAVUZU",
      description: "Son kullanıcı ekranları",
      url: "https://docs.servicecore.app/docs/category/kullanici/",
      icon: UserCircle,
      color: "text-(--color-accent-emerald-light)",
      bg: "bg-emerald-500/10"
    },
    {
      title: "YÖNETİCİ KILAVUZU",
      description: "Tüm admin ayarları kılavuzu",
      url: "https://docs.servicecore.app/docs/category/y%C3%B6neti%CC%87ci%CC%87/",
      icon: BookOpen,
      color: "text-(--color-accent-purple-light)",
      bg: "bg-purple-500/10"
    },
    {
      title: "ENTEGRASYON KILAVUZU",
      description: "Entegrasyonlar ile ilgili tüm bilgiler",
      url: "https://docs.servicecore.app/docs/category/entegrasyon/",
      icon: LinkIcon,
      color: "text-(--color-accent-orange-light)",
      bg: "bg-orange-500/10"
    },
    {
      title: "MIGRATION KILAVUZU",
      description: "Migration kuralları",
      url: "https://docs.servicecore.app/docs/category/migration/",
      icon: RefreshCw,
      color: "text-(--color-accent-cyan-light)",
      bg: "bg-cyan-500/10"
    },
    {
      title: "KURULUM KILAVUZU",
      description: "Kurulum esnasında gerekli bilgiler",
      url: "https://docs.servicecore.app/docs/category/kurulum/",
      icon: Download,
      color: "text-rose-400",
      bg: "bg-rose-500/10"
    },
    {
      title: "ESM KILAVUZU",
      description: "ESM tanıtımı ve kullanımı",
      url: "https://docs.servicecore.app/docs/category/ESM/",
      icon: Monitor,
      color: "text-indigo-400",
      bg: "bg-indigo-500/10"
    },
    {
      title: "CSSM-A ADMINISTRATOR",
      description: "Admin Eğitim Videoları",
      url: "https://docs.servicecore.app/docs/category/admin-e%C4%9Fi%CC%87ti%CC%87mleri%CC%87/",
      icon: PlayCircle,
      color: "text-amber-400",
      bg: "bg-amber-500/10"
    },
    {
      title: "CSSM-P PRACTITIONER",
      description: "Teknisyen Eğitim Videoları",
      url: "https://docs.servicecore.app/docs/category/tekni%CC%87syen-e%C4%9Fi%CC%87ti%CC%87mleri%CC%87/",
      icon: PlayCircle,
      color: "text-teal-400",
      bg: "bg-teal-500/10"
    }
  ]
};

export default function DokumanlarPage() {
  return (
    <main className="min-h-screen bg-(--color-surface-base) pt-32 pb-20 overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-5%] w-[35%] h-[35%] bg-purple-600/10 blur-[100px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tight">
              {docsData.header.title}
            </h1>
            <p className="text-xl text-(--color-text-secondary) font-light leading-relaxed max-w-3xl mx-auto">
              {docsData.header.description}
            </p>
          </motion.div>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {docsData.guides.map((guide, idx) => {
            const Icon = guide.icon;
            return (
              <motion.a
                key={idx}
                href={guide.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative block p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all duration-300 overflow-hidden"
              >
                {/* Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-2xl ${guide.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-7 h-7 ${guide.color}`} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2 group-hover:text-(--color-accent-blue-light) transition-colors">
                    {guide.title}
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  
                  <p className="text-(--color-text-secondary) leading-relaxed font-light mb-6">
                    {guide.description}
                  </p>
                  
                  <div className="flex items-center text-sm font-semibold text-white/50 group-hover:text-white transition-colors">
                    Kılavuzu İncele
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Decorative background shape */}
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors duration-500" />
              </motion.a>
            );
          })}
        </div>

        {/* Bottom Contact Section */}
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
              {/* Background Glows */}
              <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
              <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

              <div className="relative z-10 w-full">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 mx-auto">
                  <PlayCircle className="w-4 h-4 text-(--color-accent-cyan-light)" />
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-text-overline)">Destek & Eğitim</span>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
                  Aradığınızı bulamadınız mı?
                </h2>

                <p className="text-lg text-(--color-text-overline) font-light leading-relaxed mb-10 max-w-xl mx-auto">
                  Teknik ekibimiz size yardımcı olmaktan mutluluk duyar. Destek portalımız üzerinden bize ulaşabilir veya eğitim talebinde bulunabilirsiniz.
                </p>

                <div className="flex flex-col items-center gap-8">
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a 
                      href="https://support.servicecore.com.tr" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-8 py-4 rounded-full bg-(--color-brand-primary) text-white font-semibold hover:bg-blue-600 transition-all hover:scale-105 active:scale-95 shadow-(--shadow-glow-primary-weak)"
                    >
                      Destek Portalına Git
                    </a>
                    <a 
                      href="/iletisim" 
                      className="px-8 py-4 rounded-full bg-white/5 text-white font-semibold border border-white/10 hover:bg-white/10 transition-all"
                    >
                      Bize Ulaşın
                    </a>
                  </div>

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
                      Eğitim Desteği
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
