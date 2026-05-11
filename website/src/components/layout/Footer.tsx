"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { MapPin, Phone, Printer, HeadphonesIcon, Linkedin, Youtube } from "lucide-react";
import aicoreData from "@/data/aicore.json";

interface AicoreToolEntry {
  slug: string;
  name: string;
  tier: string;
}

// AICORE: aicore.json'dan production tier'lari dinamik turetilir, beta'lar dislanir.
const aicoreProductionLinks = (aicoreData.tools as AicoreToolEntry[])
  .filter((tool) => tool.tier === "production")
  .map((tool) => ({ text: tool.name, href: `/aicore/${tool.slug}` }));

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
        { text: "Raporlama Yönetimi", href: "/raporlama-yonetimi" },
      ],
    },
    {
      title: "DİĞER MODÜLLER",
      hideTitle: true,
      links: [
        { text: "Görev Yönetimi", href: "/gorev-yonetimi" },
        { text: "Servis İlişkileri Yönetimi", href: "/servis-iliskileri-yonetimi" },
        { text: "Agile Proje ve SDLC Yönetimi", href: "/proje-yonetimi" },
        { text: "ESM Kurumsal Servis Yönetimi", href: "/esm" },
        { text: "Self Servis Portal", href: "/self-servis-portal" },
        { text: "Yönetim Paneli", href: "/yonetim-paneli" },
        { text: "Mobil Servis Yönetimi", href: "/mobil-servis-yonetimi" },
        { text: "Servis Otomasyonu", href: "/servis-otomasyonu" },
        { text: "İş Akışı Yönetimi", href: "/is-akisi-yonetimi" },
        { text: "Entegrasyon Modülü", href: "/entegrasyon-yonetimi" },
        { text: "Low Code Geliştirme Modülü", href: "/low-code-gelistirme" },
        { text: "Sözleşme Yönetimi", href: "/sozlesme-yonetimi" },
      ],
    },
    {
      title: "AICORE",
      links: aicoreProductionLinks,
    },
    {
      title: "ÇÖZÜMLER",
      links: [
        { text: "ESM — Enterprise Service Management", href: "/cozumler/esm" },
        { text: "ITSM — IT Service Management", href: "/cozumler/itsm" },
        { text: "CSS — Customer Service Support", href: "/cozumler/css" },
        { text: "APM — Agile Project Management", href: "/cozumler/apm" },
        { text: "SDLC — Software Development Lifecycle", href: "/cozumler/sdlc" },
        { text: "ITAM — IT Asset Management", href: "/cozumler/itam" },
        { text: "EAM — Enterprise Asset Management", href: "/cozumler/eam" },
        { text: "FSM — Field Service Management", href: "/cozumler/fsm" },
      ],
    },
    {
      title: "ANA MENÜ",
      links: [
        { text: "Hakkımızda", href: "/hakkimizda" },
        { text: "Rehberler", href: "/dokumanlar" },
        { text: "Referanslar", href: "/referanslar" },
        { text: "Datasheet", href: "/datasheet" },
        { text: "Specsheet", href: "/specsheet" },
        { text: "Demo", href: "/demo" },
        { text: "İş Ortaklığı", href: "/partnerlik" },
        { text: "Özellikler", href: "/cozumler/itsm" },
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
    <footer className="relative w-full overflow-hidden bg-(--color-surface-base) border-t border-white/5 pt-20 pb-8">
      <div className="absolute top-0 left-1/3 w-150 h-150 bg-(--color-accent-primary-5) blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-blue-500/20 to-transparent" />

      <motion.div
        variants={containerVariants}
        animate="visible"
        className="container relative z-10 mx-auto px-6 lg:px-12 max-w-350"
      >
        {/* Brand bloğu — üstte yatay, 3 eşit segment */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-8 pb-12 mb-12 border-b border-white/10"
        >
          <div className="md:col-span-4 flex flex-col">
            <Link href="/" className="flex items-center group cursor-pointer w-fit">
              <div className="w-11 h-11 bg-white/5 border border-white/10 backdrop-blur-md rounded-xl flex items-center justify-center group-hover:drop-shadow-[0_0_20px_rgba(0,112,243,0.5)] transition-all">
                <Image
                  src="/logo-v1.png"
                  alt="ServiceCore"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>
            </Link>
          </div>

          <div className="md:col-span-4 flex flex-col gap-4">
            {footerData.companyInfo.addresses.map((addr) => (
              <div key={addr.label} className="flex items-start gap-3">
                <MapPin className="shrink-0 w-4 h-4 mt-0.5 text-(--color-accent-blue-light)" />
                <div>
                  <span className="text-[11px] font-semibold text-slate-200 uppercase tracking-[0.15em] mr-2">{addr.label}</span>
                  <span className="text-sm text-(--color-text-secondary) leading-relaxed">{addr.value}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="md:col-span-4 flex flex-col gap-2">
            {footerData.companyInfo.contact.map((contact) => {
              const Icon = contact.icon;
              const isClickable = contact.label === "Tel" || contact.label === "Çağrı Merkezi" || contact.label === "Fax";
              const hrefValue = isClickable ? `tel:${contact.value.replace(/\s+/g, '')}` : undefined;

              const content = (
                <>
                  <Icon className="shrink-0 w-3.5 h-3.5 text-(--color-accent-cyan-light)" />
                  <span className="flex items-center justify-between w-36 text-[11px] font-semibold text-slate-300 uppercase tracking-[0.15em] whitespace-nowrap">
                    <span>{contact.label}</span>
                    <span>:</span>
                  </span>
                  <span className="ml-auto text-sm text-(--color-text-overline) font-medium">{contact.value}</span>
                </>
              );

              return isClickable ? (
                <a
                  key={contact.label}
                  href={hrefValue}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500/30 hover:bg-cyan-500/10 transition-colors cursor-pointer"
                >
                  {content}
                </a>
              ) : (
                <div key={contact.label} className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
                  {content}
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* 5 link kolonu — eşit grid, ferah aralık */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-12 mb-14">
          {footerData.columns.map((col, idx) => (
            <motion.div key={idx} variants={itemVariants} className="flex flex-col">
              <h3
                className={`text-[11px] font-semibold text-slate-200 uppercase tracking-[0.18em] mb-5 ${
                  "hideTitle" in col && col.hideTitle ? "invisible" : ""
                }`}
                aria-hidden={"hideTitle" in col && col.hideTitle ? true : undefined}
              >
                {col.title}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link, linkIdx) => {
                  const isExternal = /^https?:\/\//.test(link.href);
                  const className = "group inline-flex text-sm text-(--color-text-secondary) hover:text-white transition-colors leading-snug";
                  const inner = (
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
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

        {/* Alt çubuk — copyright + sosyal */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row items-center justify-between gap-5 pt-8 border-t border-white/10"
        >
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-2">
            <span className="text-xs text-(--color-text-muted) font-medium">
              {footerData.bottomBar.copyright}
            </span>
            <span className="hidden md:inline-block w-1 h-1 rounded-full bg-slate-700" />
            <span className="text-xs text-(--color-text-muted) font-medium">
              Türkiye&apos;de Geliştirildi 🇹🇷
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            {footerData.companyInfo.social.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-(--color-text-secondary) transition-all duration-300 ${social.bg} ${social.color}`}
                  aria-label={social.label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              )
            })}
          </div>
        </motion.div>

        {/* Yardımcı linkler bandı */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center md:justify-start gap-x-5 gap-y-2 pt-5"
        >
          {footerData.bottomBar.links.map((link, idx) => {
            const isExternal = /^https?:\/\//.test(link.href);
            const className = "text-xs text-(--color-text-muted) hover:text-white transition-colors";
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
