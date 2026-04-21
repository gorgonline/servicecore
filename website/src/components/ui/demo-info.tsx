"use client";

import { motion } from "framer-motion";
import { Play, CalendarCheck } from "lucide-react";
import demoData from "@/data/demo.json";

export function DemoInfo() {
  const { info_section } = demoData;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.3 }}
      className="rounded-3xl bg-white/2 border border-white/5 p-8 lg:p-10 relative overflow-hidden h-full flex flex-col"
    >
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-bl from-(--color-brand-accent)/5 to-transparent rounded-bl-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-linear-to-tr from-(--color-brand-primary)/5 to-transparent rounded-tr-full pointer-events-none" />

      <div className="relative z-10 flex-1 flex flex-col">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {info_section.tags.map((tag, index) => (
            <span 
              key={index}
              className="px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-xs font-semibold text-(--color-text-overline) tracking-[0.2em] uppercase"
            >
              {tag}
            </span>
          ))}
        </div>

        <h2 className="text-3xl font-bold text-white tracking-tight mb-8">
          {info_section.title}
        </h2>

        <div className="space-y-6 flex-1">
          {info_section.content.map((paragraph, index) => (
            <div key={index} className="flex gap-4 group">
              <div className="mt-1">
                <div className="w-6 h-6 rounded-full bg-(--color-brand-primary)/10 flex items-center justify-center border border-(--color-brand-primary)/20 group-hover:border-(--color-brand-primary)/40 group-hover:bg-(--color-brand-primary)/20 transition-all">
                  <Play className="w-3 h-3 text-(--color-brand-accent) ml-0.5" />
                </div>
              </div>
              <p className="text-(--color-text-secondary) font-light leading-relaxed">
                {paragraph}
              </p>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="mt-10 pt-8 border-t border-white/5">
          <a
            href={info_section.action_button.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium px-8 h-14 rounded-full transition-all group cursor-pointer"
          >
            <CalendarCheck className="w-5 h-5 text-(--color-brand-accent) group-hover:scale-110 transition-transform" />
            <span>{info_section.action_button.text}</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
