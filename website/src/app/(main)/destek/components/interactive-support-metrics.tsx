"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { PhoneCall, MapPin, Mail, MessageSquareText, FileText, Blocks, Handshake, Zap } from "lucide-react";
import destekData from "@/data/destek-kanallari.json";

const IconsMap: Record<string, React.ReactNode> = {
  "email": <Mail className="w-5 h-5 text-(--color-accent-emerald-light) mt-1 shrink-0" strokeWidth={1.5} />,
  "portal": <MessageSquareText className="w-5 h-5 text-(--color-brand-primary) mt-1 shrink-0" strokeWidth={1.5} />,
  "phone": <PhoneCall className="w-5 h-5 text-(--color-accent-blue-light) mt-1 shrink-0" strokeWidth={1.5} />,
  "kb": <FileText className="w-5 h-5 text-(--color-text-secondary) mt-1 shrink-0" strokeWidth={1.5} />,
  "panel": <Blocks className="w-5 h-5 text-(--color-text-overline) mt-1 shrink-0" strokeWidth={1.5} />
};

const getChannelIcon = (index: number) => {
  const keys = ["email", "portal", "phone", "kb", "panel"];
  return IconsMap[keys[index]] || <Zap className="w-5 h-5 text-(--color-brand-primary) mt-1 shrink-0" strokeWidth={1.5} />;
};

export function InteractiveSupportMetrics() {
  const { maintenanceServices, supportChannels, additionalSupport } = destekData;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
       transition: { type: "spring", stiffness: 100, damping: 20 }
    }
  };

  return (
    <section id="channels" className="relative w-full py-24 bg-(--color-surface-base)">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
        
        <motion.div
           variants={containerVariants}
           animate="show"
           className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >

          {/* Left Column - Main Intro & Additional Support (Spans 7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-8">
             
             {/* Maintenance Services Card */}
             <motion.div 
               variants={itemVariants}
               whileHover={{ y: -4, boxShadow: "0 20px 40px -10px rgba(0,112,243,0.15)", borderColor: "rgba(255,255,255,0.1)" }}
               className="p-8 md:p-10 rounded-4xl bg-white/2 border border-white/5 relative overflow-hidden group transition-all duration-300"
             >
                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-(--color-brand-primary) via-emerald-500 to-transparent opacity-50" />
                
                <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">
                  {maintenanceServices.title}
                </h2>
                
                <div className="space-y-4 text-(--color-text-secondary) font-light leading-relaxed">
                  {maintenanceServices.description.split("\\n\\n").slice(0, 3).map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
             </motion.div>

             {/* Additional External/Remote Support Card */}
             <motion.div 
               variants={itemVariants}
               whileHover={{ y: -4, borderColor: "rgba(255,255,255,0.1)" }}
               className="p-8 md:p-10 rounded-4xl bg-linear-to-br from-(--color-surface-elevated-dark) to-(--color-surface-base) border border-white/5 relative"
             >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <Handshake className="w-6 h-6 text-(--color-accent-emerald-light)" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    {additionalSupport.title}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {additionalSupport.description.split("\\n\\n").slice(1).map((item, index) => {
                    const cleanText = item.replace("• ", "");
                    return (
                      <div key={index} className="flex gap-3 p-4 rounded-xl bg-white/2 border border-white/4">
                        <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-emerald-base) mt-2 shrink-0" />
                        <span className="text-sm text-(--color-text-overline) font-light leading-relaxed">
                          {cleanText}
                        </span>
                      </div>
                    );
                  })}
                </div>
             </motion.div>
          </div>

          {/* Right Column - Support Channels List (Spans 5 cols) */}
          <div className="lg:col-span-5 h-full">
            <motion.div 
               variants={itemVariants}
               className="h-full flex flex-col p-8 md:p-10 rounded-4xl bg-white/2 border border-white/5 relative shadow-[0_0_80px_-20px_rgba(0,112,243,0.05)]"
             >
                <div className="flex flex-col mb-8">
                   <h3 className="text-xl font-semibold text-white mb-2 flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-(--color-brand-primary)" />
                      {supportChannels.title}
                   </h3>
                   <p className="text-sm text-(--color-text-secondary) leading-relaxed font-light">
                      Hızlı, güvenli ve proaktif destek ağlarımızı kullanarak uzmanlarımıza ulaşın.
                   </p>
                </div>

                <div className="flex flex-col gap-3 grow">
                  {supportChannels.items.map((channel, index) => (
                    <div 
                      key={index} 
                      className="group flex gap-4 p-4 rounded-2xl hover:bg-white/4 border border-transparent hover:border-white/5 transition-colors duration-300 cursor-pointer"
                    >
                      {getChannelIcon(index)}
                      <div>
                        <h5 className="font-medium text-slate-200 mb-1 group-hover:text-(--color-brand-primary) transition-colors">
                          {channel.channel}
                        </h5>
                        <p className="text-[13px] text-(--color-text-secondary) leading-relaxed font-light">
                          {channel.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-6 rounded-xl bg-(--color-brand-primary)/10 border border-(--color-brand-primary)/20">
                  <p className="text-base text-(--color-text-overline) leading-relaxed text-left">
                    {supportChannels.disclaimer}
                  </p>
                </div>
             </motion.div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
