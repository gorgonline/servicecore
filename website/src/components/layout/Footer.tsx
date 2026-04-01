"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { MapPin, Phone, Printer, HeadphonesIcon, Github, Linkedin, Youtube, ArrowRight } from "lucide-react";

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
        { text: "Servis Masası ve Etkileşim Yönetimi", href: "/moduller/etkilesim-yonetimi" },
        { text: "Olay Yönetimi", href: "/moduller/olay-yonetimi" },
        { text: "Problem Yönetimi", href: "/moduller/problem-yonetimi" },
        { text: "İstek Yönetimi", href: "/moduller/istek-yonetimi" },
        { text: "Değişiklik Yönetimi", href: "/moduller/degisiklik-yonetimi" },
        { text: "Varlık Yönetimi", href: "/moduller/varlik-yonetimi" },
        { text: "Konfigürasyon Yönetimi", href: "/moduller/servis-konfigurasyon-yonetimi" },
        { text: "Servis Katalog Yönetimi", href: "/moduller/servis-katalog-yonetimi" },
        { text: "Sözleşme Yönetimi", href: "/ozellikler/sozlesme-yonetimi" },
        { text: "Yönetim Paneli", href: "/moduller/yonetim-paneli" },
        { text: "Servis İlişkileri Yönetimi", href: "/moduller/musteri-takip-servisi" },
        { text: "Entegrasyon Yönetimi", href: "/moduller/entegrasyon-yonetimi" },
      ],
    },
    {
      title: "DİĞER MODÜLLER",
      links: [
        { text: "Servis Seviye Yönetimi", href: "/moduller/servis-seviye-yonetimi" },
        { text: "Self Servis Portal", href: "/moduller/self-servis-portal" },
        { text: "Servis Otomasyonu", href: "/moduller/servis-otomasyonu" },
        { text: "Ölçüm ve Raporlama Yönetimi", href: "/moduller/olcum-ve-raporlama-yonetimi" },
        { text: "Hizmet Gösterge Paneli", href: "/moduller/yonetim-paneli" },
        { text: "Bilgi Yönetimi", href: "/moduller/bilgi-yonetimi" },
        { text: "Sürekli İyileştirme", href: "/ozellikler/surekli-iyilestirme" },
        { text: "Proje Yönetimi", href: "/ozellikler/proje-yonetimi" },
        { text: "Low Code", href: "/moduller/low-code-gelistirme-modulu" },
        { text: "Mobil Servis", href: "/moduller/mobil-servis-yonetimi" },
        { text: "İş Akış", href: "/moduller/isakisyonetimi" },
        { text: "ESM Kurumsal", href: "/moduller/esm" },
      ],
    },
    {
      title: "ANA MENÜ",
      links: [
        { text: "Hakkımızda", href: "/hakkimizda" },
        { text: "Rehberler", href: "https://docs.servicecore.app" },
        { text: "Referanslar", href: "/referanslar" },
        { text: "Datasheet", href: "/datasheet" },
        { text: "Specsheet", href: "/specsheet" },
        { text: "Demo", href: "/demo" },
        { text: "İş Ortaklığı", href: "/partnerlik" },
        { text: "Kurslar", href: "/kurslar" },
        { text: "Özellikler", href: "/ozellikler" },
        { text: "Planlar & Lisanslama", href: "/planlar" },
        { text: "Modüller", href: "/moduller" },
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
      { text: "Destek Portalı", href: "https://support.servicecore.com.tr" },
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
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-(--color-accent-primary-5) blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="container relative z-10 mx-auto px-6 lg:px-12 max-w-[1400px]"
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
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-(--color-accent-blue-light)">
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
                  {col.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <Link
                        href={link.href}
                        className="group flex items-center text-sm text-(--color-text-secondary) hover:text-(--color-accent-cyan-light) transition-colors"
                      >
                        <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5 overflow-visible">
                          {link.text}
                        </span>
                      </Link>
                    </li>
                  ))}
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
                <img src="/logo-v1.png" alt="ServiceCore" className="w-6 h-6 object-contain" />
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
          {footerData.bottomBar.links.map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              className="text-sm text-(--color-text-secondary) hover:text-white transition-colors"
            >
              {link.text}
            </Link>
          ))}
        </motion.div>
      </motion.div>
    </footer>
  );
}
