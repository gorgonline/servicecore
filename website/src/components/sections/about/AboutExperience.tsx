"use client";

import { motion } from "framer-motion";
import { Clock, Building2, Lightbulb, Rocket, type LucideIcon } from "lucide-react";

interface Section {
  id: string;
  title: string;
  items: string[];
}

interface AboutExperienceProps {
  sections: Section[];
}

const icons: Record<string, LucideIcon> = {
  tecrube: Clock,
  temeller: Building2,
  yenilik: Lightbulb,
  basari: Rocket,
};

export default function AboutExperience({ sections }: AboutExperienceProps) {
  return (
    <section className="py-24 bg-(--color-surface-base) relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="space-y-24">
          {sections.map((section, idx) => (
            <ExperienceRow
              key={section.id}
              section={section}
              isEven={idx % 2 === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceRow({
  section,
  isEven,
}: {
  section: Section;
  isEven: boolean;
}) {
  const Icon = icons[section.id] || Rocket;

  return (
    <div
      className={`flex flex-col lg:flex-row gap-8 lg:gap-16 items-center ${
        isEven ? "" : "lg:flex-row-reverse"
      }`}
    >
      {/* Content Side */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "50px" }}
        transition={{ duration: 0.6 }}
        className="flex-1 space-y-6"
      >
        <div className="flex items-center gap-4">
          {/* Icon Box with Pulse-Glow */}
          <div
            className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-(--color-accent-blue-light)"
            style={{ animation: "pulse-glow 4.5s ease-in-out infinite" }}
          >
            <Icon size={24} />
          </div>
          <span className="text-xs font-bold tracking-[0.2em] text-blue-500 uppercase">
            {section.id}
          </span>
        </div>

        {/* Thin separator for visual rhythm */}
        <div className="h-px w-16 bg-linear-to-r from-blue-500/30 to-transparent" />

        <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
          {section.title}
        </h2>

        <div className="space-y-4 max-w-2xl">
          {section.items.map((item, i) => (
            <p
              key={i}
              className="text-base lg:text-lg text-(--color-text-secondary) font-light leading-relaxed"
            >
              {item}
            </p>
          ))}
        </div>
      </motion.div>

      {/* Visual Side — Decorated Icon Showcase */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "50px" }}
        transition={{ duration: 0.6 }}
        className="flex-1 w-full aspect-video md:aspect-video relative group overflow-hidden rounded-2xl bg-white/2 border border-white/5"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-purple-500/5 group-hover:from-blue-500/8 group-hover:to-purple-500/8 transition-all duration-700" />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Center composition */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-32 h-32 flex items-center justify-center">
            {/* Outer rotating dashed ring */}
            <div
              className="absolute inset-[-12px] rounded-full border border-dashed border-blue-500/15"
              style={{ animation: "rotate-ring 25s linear infinite" }}
            />

            {/* Middle static ring */}
            <div className="absolute inset-[-4px] rounded-full border border-blue-500/8" />

            {/* Glow layer */}
            <div className="absolute inset-0 bg-blue-500/10 blur-2xl rounded-full scale-150" />

            {/* Inner subtle ring */}
            <div className="absolute inset-2 rounded-full border border-blue-400/5" />

            {/* Icon with entrance animation */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
                delay: 0.3,
              }}
              className="relative z-10"
            >
              <Icon
                size={48}
                className="text-blue-500/40"
                strokeWidth={1.5}
              />
            </motion.div>

            {/* Corner accent dots */}
            <div className="absolute -top-6 -right-6 w-1.5 h-1.5 rounded-full bg-blue-500/20" />
            <div className="absolute -bottom-6 -left-6 w-1.5 h-1.5 rounded-full bg-blue-500/20" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
