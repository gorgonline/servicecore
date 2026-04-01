"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";
import contactData from "@/data/contact.json";

export function ContactForm() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
      className="rounded-3xl bg-white/[0.02] border border-white/5 p-8 lg:p-10 relative overflow-hidden"
    >
      {/* Background Details */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-(--color-brand-primary)/5 to-transparent rounded-bl-full pointer-events-none" />
      
      <div className="relative z-10">
        <h2 className="text-2xl font-semibold text-white tracking-tight mb-8 flex items-center gap-3">
          <span className="w-8 h-px bg-gradient-to-r from-(--color-brand-primary) to-transparent"></span>
          {contactData.contactForm.title}
        </h2>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div className="space-y-2">
              <label htmlFor="firstName" className="block text-sm font-medium text-(--color-text-secondary) flex items-center gap-1">
                Ad <span className="text-(--color-accent-red-light)">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                required
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-(--color-border-active) focus:border-(--color-border-active) transition-all"
              />
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <label htmlFor="lastName" className="block text-sm font-medium text-(--color-text-secondary) flex items-center gap-1">
                Soyad <span className="text-(--color-accent-red-light)">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                required
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-(--color-border-active) focus:border-(--color-border-active) transition-all"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-(--color-text-secondary) flex items-center gap-1">
              E-Posta <span className="text-(--color-accent-red-light)">*</span>
            </label>
            <input
              type="email"
              id="email"
              placeholder="Firma e-posta adresiniz"
              required
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-(--color-border-active) focus:border-(--color-border-active) transition-all"
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-medium text-(--color-text-secondary) flex items-center gap-1">
              Telefon <span className="text-(--color-accent-red-light)">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="05XX XXX XX XX"
              required
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-(--color-border-active) focus:border-(--color-border-active) transition-all"
            />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label htmlFor="message" className="block text-sm font-medium text-(--color-text-secondary)">
              Mesaj
            </label>
            <textarea
              id="message"
              rows={4}
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-(--color-border-active) focus:border-(--color-border-active) transition-all resize-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-(--color-brand-primary) hover:bg-(--color-brand-primary)/90 text-white font-semibold px-8 h-14 rounded-full transition-all hover:shadow-(--shadow-glow-primary-weak) group cursor-pointer"
          >
            <span>{contactData.contactForm.buttonText}</span>
            <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </div>
    </motion.div>
  );
}
