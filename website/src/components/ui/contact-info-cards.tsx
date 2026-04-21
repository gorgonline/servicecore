"use client";

import { motion } from "framer-motion";
import {
  Building2,
  MapPin,
  PhoneCall,
  Mail,
  Phone,
  Printer,
  ExternalLink
} from "lucide-react";
import contactData from "@/data/contact.json";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

export function ContactInfoCards() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-6"
    >
      {/* Primary Company Info Card */}
      <motion.div variants={itemVariants}>
        <div className="rounded-3xl bg-white/2 border border-white/5 p-8 relative overflow-hidden group hover:border-blue-500/30 transition-colors">
          <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-12 w-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-(--color-accent-blue-light)">
                <Building2 className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-semibold text-white tracking-tight">
                {contactData.company.name}
              </h2>
            </div>

            <div className="space-y-6">
              {contactData.company.locations.map((loc, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <MapPin className="w-5 h-5 text-(--color-text-muted) shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-(--color-text-overline) block mb-1">{loc.type}:</span>
                    <span className="text-(--color-text-secondary) font-light text-sm leading-relaxed block">{loc.address}</span>
                  </div>
                </div>
              ))}
              
              <div className="flex gap-4 items-center pt-2">
                <a href="tel:4442673" className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-(--color-accent-blue-light) hover:bg-blue-500/20 hover:text-blue-300 transition-colors">
                  <PhoneCall className="w-4 h-4" />
                  <span className="font-medium text-sm">Çağrı Merkezi : {contactData.company.callCenter}</span>
                </a>
              </div>
            </div>
            
            <div className="absolute bottom-6 right-6 opacity-30 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-building"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Grid for Smaller Info Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Support Call/Email Info */}
        <div className="rounded-3xl bg-white/2 border border-white/5 p-6 relative overflow-hidden group hover:border-(--color-brand-accent)/30 transition-colors">
            <div className="absolute inset-0 bg-linear-to-br from-(--color-brand-accent)/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-medium text-(--color-text-overline)">Müşteri Destek</span>
                    <Phone className="w-4 h-4 text-(--color-text-muted)" />
                  </div>
                  <a href={`tel:${contactData.contactInfo.find(c => c.title === "Müşteri Destek")?.value.replace(/\s+/g, '')}`} className="text-(--color-brand-accent) font-medium text-lg hover:text-white transition-colors block">
                    {contactData.contactInfo.find(c => c.title === "Müşteri Destek")?.value}
                  </a>
                </div>
            </div>
        </div>

        <div className="rounded-3xl bg-white/2 border border-white/5 p-6 relative overflow-hidden group hover:border-(--color-brand-accent)/30 transition-colors">
            <div className="absolute inset-0 bg-linear-to-br from-(--color-brand-accent)/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-medium text-(--color-text-overline)">Satış Destek</span>
                    <Mail className="w-4 h-4 text-(--color-text-muted)" />
                  </div>
                  <a href={`tel:${contactData.contactInfo.find(c => c.title === "Satış Destek")?.value.replace(/\s+/g, '')}`} className="text-(--color-brand-accent) font-medium text-lg hover:text-white transition-colors block">
                    {contactData.contactInfo.find(c => c.title === "Satış Destek")?.value}
                  </a>
                </div>
            </div>
        </div>

        <div className="rounded-3xl bg-white/2 border border-white/5 p-6 relative overflow-hidden group hover:border-(--color-brand-accent)/30 transition-colors">
            <div className="absolute inset-0 bg-linear-to-br from-(--color-brand-accent)/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-medium text-(--color-text-overline)">Muhasebe</span>
                    <Building2 className="w-4 h-4 text-(--color-text-muted)" />
                  </div>
                  <a href={`tel:${contactData.contactInfo.find(c => c.title === "Muhasebe")?.value.replace(/\s+/g, '')}`} className="text-(--color-brand-accent) font-medium text-lg hover:text-white transition-colors block">
                    {contactData.contactInfo.find(c => c.title === "Muhasebe")?.value}
                  </a>
                </div>
            </div>
        </div>

        <div className="rounded-3xl bg-white/2 border border-white/5 p-6 relative overflow-hidden group hover:border-(--color-brand-accent)/30 transition-colors">
            <div className="absolute inset-0 bg-linear-to-br from-(--color-brand-accent)/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-medium text-(--color-text-overline)">Fax</span>
                    <Printer className="w-4 h-4 text-(--color-text-muted)" />
                  </div>
                  <span className="text-(--color-brand-accent) font-medium text-lg block">
                    {contactData.contactInfo.find(c => c.title === "Fax")?.value}
                  </span>
                </div>
            </div>
        </div>
      </motion.div>

      {/* Support Opening Card */}
      <motion.div variants={itemVariants}>
        <div className="rounded-3xl bg-white/2 border border-white/5 p-8 relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
            <div className="absolute inset-0 bg-linear-to-br from-emerald-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
                <h3 className="text-xl font-semibold text-white mb-4 tracking-tight">
                {contactData.support.title}
                </h3>
                <p className="text-sm text-(--color-text-secondary) font-light leading-relaxed">
                    <a href={`mailto:${contactData.support.email}`} className="text-(--color-accent-emerald-light) font-medium hover:text-emerald-300 transition-colors">{contactData.support.email}</a>
                    {" "} adresine gönderilen emaillerde soru ve sorun detayı açıkça belirtilerek destek alınabilir. Bu adrese gönderilen epostalar otomatik olarak çağrı kaydı oluşturur ve destek ekipleri tarafından destek paketi kapsamında taahhüt edilen sürelerde müdahale edilir.
                </p>
                
                <div className="absolute bottom-6 right-6 opacity-30 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-check"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2-1 4-3 5.92-4.92a2 2 0 0 1 2.16 0C15 2 17 4 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>
                </div>
            </div>
        </div>
      </motion.div>

      {/* Quick Links List */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contactData.links.map((link, idx) => {
              const isExternal = link.url.startsWith('http');
              const Component = isExternal ? 'a' : Link;
              
              return (
                <Component 
                  key={idx} 
                  href={link.url} 
                  {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="flex items-center justify-between p-4 rounded-2xl bg-white/2 border border-white/5 group hover:bg-white/4 hover:border-white/10 transition-all font-medium"
                >
                  <span className="text-sm font-medium text-(--color-text-overline) group-hover:text-white transition-colors">{link.title}</span>
                  <ExternalLink className="w-4 h-4 text-(--color-text-muted) group-hover:text-(--color-brand-accent) transition-colors" />
                </Component>
              );
          })}
      </motion.div>
      


    </motion.div>
  );
}
