"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";
import demoData from "@/data/demo.json";

export function DemoForm() {
  const { form_section } = demoData;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
      className="rounded-3xl bg-white/2 border border-white/5 p-8 lg:p-10 relative overflow-hidden"
    >
      {/* Background Details */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-bl from-(--color-brand-primary)/5 to-transparent rounded-bl-full pointer-events-none" />
      
      <div className="relative z-10">
        <h2 className="text-2xl font-semibold text-white tracking-tight mb-8 flex items-center gap-3">
          <span className="w-8 h-px bg-linear-to-r from-(--color-brand-primary) to-transparent"></span>
          {form_section.title}
        </h2>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div className="space-y-2">
              <label htmlFor="ad" className="block text-sm font-medium text-(--color-text-secondary) flex items-center gap-1">
                {form_section.fields[0].label} <span className="text-(--color-accent-red-light)">*</span>
              </label>
              <input
                type="text"
                id="ad"
                required
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-(--color-border-active) focus:border-(--color-border-active) transition-all"
              />
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <label htmlFor="soyad" className="block text-sm font-medium text-(--color-text-secondary) flex items-center gap-1">
                {form_section.fields[1].label} <span className="text-(--color-accent-red-light)">*</span>
              </label>
              <input
                type="text"
                id="soyad"
                required
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-(--color-border-active) focus:border-(--color-border-active) transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="eposta" className="block text-sm font-medium text-(--color-text-secondary) flex items-center gap-1">
                {form_section.fields[2].label} <span className="text-(--color-accent-red-light)">*</span>
              </label>
              <input
                type="email"
                id="eposta"
                placeholder={form_section.fields[2].placeholder}
                required
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-(--color-border-active) focus:border-(--color-border-active) transition-all"
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label htmlFor="telefon" className="block text-sm font-medium text-(--color-text-secondary) flex items-center gap-1">
                {form_section.fields[3].label} <span className="text-(--color-accent-red-light)">*</span>
              </label>
              <input
                type="tel"
                id="telefon"
                placeholder={form_section.fields[3].placeholder}
                required
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-(--color-border-active) focus:border-(--color-border-active) transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Date */}
            <div className="space-y-2">
              <label htmlFor="tarih" className="block text-sm font-medium text-(--color-text-secondary) flex items-center gap-1">
                {form_section.fields[4].label} <span className="text-(--color-accent-red-light)">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="tarih"
                  required
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-(--color-border-active) focus:border-(--color-border-active) transition-all [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
                />
              </div>
            </div>

            {/* Time */}
            <div className="space-y-2">
              <label htmlFor="saat" className="block text-sm font-medium text-(--color-text-secondary) flex items-center gap-1">
                {form_section.fields[5].label} <span className="text-(--color-accent-red-light)">*</span>
              </label>
              <div className="relative">
                <input
                  type="time"
                  id="saat"
                  required
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-(--color-border-active) focus:border-(--color-border-active) transition-all [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-(--color-brand-primary) hover:bg-(--color-brand-primary)/90 text-white font-semibold px-8 h-14 rounded-full transition-all hover:shadow-(--shadow-glow-primary-weak) group mt-4 cursor-pointer"
          >
            <span>{form_section.submit_button.text}</span>
            <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </div>
    </motion.div>
  );
}
