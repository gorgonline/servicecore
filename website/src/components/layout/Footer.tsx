"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { MapPin, Phone, Printer, HeadphonesIcon, Linkedin, Youtube } from "lucide-react";

const footerData = {

  companyInfo: {
    name: "Servicecore Bilgi Teknolojileri A.Ş.",
    addresses: [
      {
        label: "Merkez",
        value: "Metropol Istanbul A Blok 2E Kat: 21 Daire: 331 Ataşehir Istanbul",
      },
      {
        label: "ArGe",
        value: "Zaim Teknopark / Halkalı Cad No:281/23 Ofis No:118 Küçükçekmece/İstanbul",
      },
    ],
    contact: [
      {
        label: "Tel",
        value: "0216 599 07 72",
        icon: Phone
      },
      {
        label: "Fax",
        value: "0216 599 01 17",
        icon: Printer
      },
      {
        label: "Çağrı Merkezi",
        value: "444CORE",
        icon: HeadphonesIcon
      },
    ],
    social: [
      {
        label: "Linkedin",
        href: "https://www.linkedin.com/company/servicecoresw/",
        icon: Linkedin,
        color: "hover:text-blue-500",
        bg: "hover:bg-blue-500/10 hover:border-blue-500/30"
      },
      {
        label: "Youtube",
        href: "https://www.youtube.com/@ServicecoreSM",
        icon: Youtube,
        color: "hover:text-red-500",
        bg: "hover:bg-red-500/10 hover:border-red-500/30"
      },
    ],
  },
  columns: [
    {
      title: "MODÜLLER",
      links: [
        { text: "Hizmet Masası ve Etkileşim Yönetimi", href: "/etkilesim-yonetimi" },
        { text: "Olay Yönetimi", href: "/olay-yonetimi" },
        { text: "Problem Yönetimi", href: "/problem-yonetimi" },
        { text: "İstek Yönetimi", href: "/istek-yonetimi" },
        { text: "Bilgi ve Doküman Yönetimi", href: "/bilgi-bankasi" },
        { text: "Değişiklik Yönetimi", href: "/degisiklik-yonetimi" },
        { text: "Varlık Yönetimi", href: "/varlik-yonetimi" },
        { text: "Servis Konfigürasyon Yönetimi", href: "/servis-konfigurasyon-yonetimi" },
        { text: "Sürekli İyileştirme", href: "/surekli-iyilestirme" },
        { text: "Servis Katalog Yönetimi", href: "/servis-katalog-yonetimi" },
        { text: "Servis Seviye Yönetimi", href: "/servis-seviye-yonetimi" },
        { text: "Servis Otomasyonu", href: "/servis-otomasyonu" },
        { text: "Raporlama Yönetimi", href: "/raporlama-yonetimi" },
      ],
    },
    {
      title: "DİĞER MODÜLLER",
      links: [
        { text: "Görev Yönetimi", href: "/gorev-yonetimi" },
        { text: "Servis İlişkileri Yönetimi", href: "/servis-iliskileri-yonetimi" },
        { text: "Agile Proje ve SDLC Yönetimi", href: "/proje-yonetimi" },
        { text: "ESM Kurumsal Servis Yönetimi", href: "/esm" },
        { text: "Self Servis Portal", href: "/self-servis-portal" },
        { text: "Yönetim Paneli", href: "/yonetim-paneli" },
        { text: "Mobil Servis Yönetimi", href: "/mobil-servis-yonetimi" },
        { text: "İş Akışı Yönetimi", href: "/is-akisi-yonetimi" },
        { text: "Entegrasyon Modülü", href: "/entegrasyon-yonetimi" },
        { text: "Low Code Geliştirme Modülü", href: "/low-code-gelistirme" },
        { text: "Sözleşme Yönetimi", href: "/sozlesme-yonetimi" },
        { text: "AI Yol Haritası", href: "/ai-yol-haritasi" },
      ],
    },
    {
      title: "ANA MENÜ",
      links: [
        { text: "Hakkımızda", href: "/hakkimizda" },
        { text: "Rehberler", href: "/dokumanlar" },
        { text: "Workshoplar", href: "/workshoplar" },
        { text: "Referanslar", href: "/referanslar" },
        { text: "Datasheet", href: "https://www.servicecore.app/media/pages/footer/02c880903c-1740047247/datasheet.pdf" },
        { text: "Specsheet", href: "/specsheet" },
        { text: "Demo", href: "/demo" },
        { text: "İş Ortaklığı", href: "/partnerlik" },
        { text: "Özellikler", href: "/ozellikler" },
        { text: "Planlar & Lisanslama", href: "/planlar" },
        { text: "Modüller", href: "/moduller" },
        { text: "Fark Var", href: "/fark-var" },
        { text: "Destek Kanalları", href: "/destek-kanallari" },
        { text: "İletişim", href: "/iletisim" },
      ],
    },
  ],
  bottomBar: {
    links: [
      { text: "Motto", href: "/motto" },
      { text: "Fark Var!", href: "/fark-var" },
      { text: "Destek Kanalları", href: "/destek-kanallari" },
      { text: "Dökümanlar", href: "/dokumanlar" },
      { text: "Sunumlar", href: "/sunumlar" },
      { text: "Güncellemeler", href: "/guncellemeler" },
      { text: "Destek Portalı", href: "https://support.servicecore.app" },
      { text: "Partnerlik", href: "/partnerlik" },
      { text: "Gizlilik - KVKK", href: "/gizlilik" },
    ],
    copyright: "Copyright © 2025, Servicecore | All Rights Reserved",
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-(--color-surface-base) border-t border-white/5 pt-24 pb-12">
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-1/4 w-150 h-150 bg-(--color-accent-primary-5) blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-125 h-125 bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-blue-500/20 to-transparent" />

      <motion.div
        variants={containerVariants}
        animate="visible"
        className="container relative z-10 mx-auto px-6 lg:px-12 max-w-350"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* Column 1: Brand & Contact Info (takes up more space) */}
          <motion.div variants={itemVariants} className="lg:col-span-5 flex flex-col pr-0 lg:pr-12">
            <Link href="/" className="flex items-center group cursor-pointer mb-8 w-fit">
              <div className="w-12 h-12 bg-white/5 border border-white/10 backdrop-blur-md rounded-xl flex items-center justify-center group-hover:drop-shadow-[0_0_20px_rgba(0,112,243,0.5)] transition-all">
                <Image 
                  src="/logo-v1.png" 
                  alt="ServiceCore" 
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
            </Link>
            
            <p className="text-(--color-text-secondary) font-light leading-relaxed mb-8 max-w-md">
              Hizmet Yönetimini Kolaylaştırın. Servicecore ile karmaşık süreçleri otomatikleştirin ve işletmenizin gerçek potansiyelini ortaya çıkarın.
            </p>

            <div className="space-y-6 mb-10">
              {footerData.companyInfo.addresses.map((addr) => (
                <div key={addr.label} className="flex items-start gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-(--color-accent-blue-light)">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200 mb-1">{addr.label}</h4>
                    <p className="text-sm text-(--color-text-secondary) leading-relaxed max-w-xs">{addr.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 mt-auto">
              {footerData.companyInfo.contact.map((contact) => {
                const Icon = contact.icon;
                const isClickable = contact.label === "Tel" || contact.label === "Çağrı Merkezi" || contact.label === "Fax";
                const hrefValue = isClickable ? `tel:${contact.value.replace(/\s+/g, '')}` : undefined;
                
                const content = (
                  <>
                    <Icon className="w-4 h-4 text-(--color-accent-cyan-light)" />
                    <span className="text-sm text-(--color-text-overline) font-medium">{contact.value}</span>
                  </>
                );

                return isClickable ? (
                  <a 
                    key={contact.label} 
                    href={hrefValue} 
                    className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-slate-900/50 border border-white/5 backdrop-blur-sm hover:border-cyan-500/30 hover:bg-cyan-500/10 transition-colors cursor-pointer"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={contact.label} className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-slate-900/50 border border-white/5 backdrop-blur-sm">
                    {content}
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* Link Columns */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {footerData.columns.map((col, idx) => (
              <motion.div key={idx} variants={itemVariants} className="flex flex-col">
                <h3 className="text-xs font-bold text-slate-100 uppercase tracking-[0.2em] mb-8 pb-4 border-b border-white/10">
                  {col.title}
                </h3>
                <ul className="space-y-4">
                  {col.links.map((link, linkIdx) => {
                    const isExternal = /^https?:\/\//.test(link.href);
                    const className = "group flex items-center text-sm text-(--color-text-secondary) hover:text-(--color-accent-cyan-light) transition-colors";
                    const inner = (
                      <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5 overflow-visible">
                        {link.text}
                      </span>
                    );
                    return (
                      <li key={linkIdx}>
                        {isExternal ? (
                          <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
                            {inner}
                          </a>
                        ) : (
                          <Link href={link.href} className={className}>
                            {inner}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Bar Segment 1: Copyright & Socials */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col md:flex-row items-center justify-between gap-6 pt-10 pb-6 border-t border-white/10"
        >
          <div className="flex flex-col md:flex-row items-center gap-4">
            <Link href="/" className="flex items-center group cursor-pointer lg:hidden mb-2">
              <div className="w-10 h-10 bg-white/5 border border-white/10 backdrop-blur-md rounded-lg flex items-center justify-center">
                <Image src="/logo-v1.png" alt="ServiceCore" width={24} height={24} className="w-6 h-6 object-contain" />
              </div>
            </Link>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-2">
              <span className="text-sm text-(--color-text-muted) font-medium whitespace-nowrap">
                {footerData.bottomBar.copyright}
              </span>
              <span className="hidden md:inline-block w-1.5 h-1.5 rounded-full bg-slate-700" />
              <span className="text-sm text-(--color-text-muted) font-medium">
                Türkiye&apos;de Geliştirildi 🇹🇷
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {footerData.companyInfo.social.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-(--color-text-secondary) transition-all duration-300 ${social.bg} ${social.color}`}
                  aria-label={social.label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              )
            })}
          </div>
        </motion.div>

        {/* Bottom Bar Segment 2: Links */}
        <motion.div
           variants={itemVariants} 
           className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-3 pt-6 w-full border-t border-white/5"
        >
          {footerData.bottomBar.links.map((link, idx) => {
            const isExternal = /^https?:\/\//.test(link.href);
            const className = "text-sm text-(--color-text-secondary) hover:text-white transition-colors";
            return isExternal ? (
              <a key={idx} href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
                {link.text}
              </a>
            ) : (
              <Link key={idx} href={link.href} className={className}>
                {link.text}
              </Link>
            );
          })}
        </motion.div>
      </motion.div>
    </footer>
  );
}
