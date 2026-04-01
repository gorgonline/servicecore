"use client";

import { motion } from "framer-motion";

interface Principle {
  title: string;
  description: string;
}

interface MethodologyTimelineProps {
  title: string;
  principles: Principle[];
}

export default function MethodologyTimeline({ title, principles }: MethodologyTimelineProps) {
  return (
    <section className="py-24 bg-(--color-surface-base) relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center">
        <div className="max-w-3xl mb-16 mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl lg:text-4xl font-bold text-white tracking-tight mb-6"
          >
            {title}
          </motion.h2>
          <div className="h-1 w-16 bg-(--color-accent-blue-base) rounded-full mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {principles.map((principle, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="relative group p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all duration-300 text-left"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-(--color-accent-blue-light) font-bold mb-6 group-hover:bg-(--color-accent-blue-base) group-hover:text-white group-hover:scale-110 transition-all duration-300 ease-out">
                {idx + 1}
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-4 tracking-tight">
                {principle.title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) font-light leading-relaxed">
                {principle.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
