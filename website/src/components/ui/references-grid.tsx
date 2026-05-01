"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import referencesData from "@/data/references.json";

/* ── Animation Variants ── */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.03 },
  },
};

const logoItemVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 20 },
  },
};

const detailContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const detailItemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

/* ═══════════════════════════════════════════
   Logo Grid — Transparent white cards
   ═══════════════════════════════════════════ */
export function ReferencesLogoGrid() {
  return (
    <div className="space-y-24">
      {referencesData.categories.map((category) => (
        <section key={category.id}>
          {/* Section Header */}
          <div className="flex items-center gap-4 mb-12">
            <div className="flex items-center gap-3">
              <span className="flex h-2 w-2 rounded-full bg-(--color-brand-primary)" />
              <h2 className="text-xs font-semibold tracking-[0.2em] text-(--color-text-overline) uppercase">
                {category.title}
              </h2>
            </div>
            <div className="flex-1 h-px bg-linear-to-r from-white/10 to-transparent" />
          </div>

          {/* Logo Cards Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "50px" }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
          >
            {category.references.map((ref) => (
              <motion.div
                key={ref.name}
                variants={logoItemVariants}
                className="group"
              >
                <div className="relative flex items-center justify-center h-24 rounded-2xl bg-white/90 backdrop-blur-md border border-white/20 shadow-xl transition-all duration-500 hover:bg-white hover:-translate-y-1 hover:shadow-white/10 overflow-hidden p-6">
                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-linear-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/[0.04] group-hover:to-purple-500/[0.04] transition-all duration-700" />
                  
                  <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
                    <Image
                      src={ref.logo}
                      alt={ref.name}
                      width={120}
                      height={48}
                      className="object-contain max-h-12 w-auto transition-transform duration-500 group-hover:scale-105"
                      style={{ maxWidth: "85%" }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════
   Detail Grid — Reference stories
   ═══════════════════════════════════════════ */

const accentColors = [
  "from-blue-500/10 via-transparent to-transparent border-blue-500/20 hover:border-blue-500/40",
  "from-purple-500/10 via-transparent to-transparent border-purple-500/20 hover:border-purple-500/40",
  "from-emerald-500/10 via-transparent to-transparent border-emerald-500/20 hover:border-emerald-500/40",
  "from-orange-500/10 via-transparent to-transparent border-orange-500/20 hover:border-orange-500/40",
  "from-pink-500/10 via-transparent to-transparent border-pink-500/20 hover:border-pink-500/40",
  "from-cyan-500/10 via-transparent to-transparent border-cyan-500/20 hover:border-cyan-500/40",
];

export function ReferencesDetailGrid() {
  return (
    <section>
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-12">
        <div className="flex items-center gap-3">
          <span className="flex h-2 w-2 rounded-full bg-(--color-brand-secondary)" />
          <h2 className="text-xs font-semibold tracking-[0.2em] text-(--color-text-overline) uppercase">
            Servicecore Referans Detayları
          </h2>
        </div>
        <div className="flex-1 h-px bg-linear-to-r from-white/10 to-transparent" />
      </div>

      {/* Detail Cards */}
      <motion.div
        variants={detailContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "50px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {referencesData.detailedReferences.map((ref, idx) => {
          const accent = accentColors[idx % accentColors.length];
          return (
            <motion.div
              key={ref.id}
              variants={detailItemVariants}
              className="group h-full"
            >
              <div
                className={`relative h-full flex flex-col p-8 rounded-[28px] bg-white/2 border transition-all duration-500 hover:bg-white/4 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden ${accent}`}
              >
                {/* Background gradient on hover */}
                <div
                  className={`absolute inset-0 bg-linear-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${accent.split(" ")[0]} ${accent.split(" ")[1]} ${accent.split(" ")[2]}`}
                />

                {/* Decorative blur */}
                <div className="absolute -right-16 -top-16 w-32 h-32 rounded-full bg-white/5 blur-3xl group-hover:bg-white/10 transition-colors duration-700" />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Logo */}
                  <div className="mb-6 h-14 flex items-center">
                    <Image
                      src={ref.logo}
                      alt={ref.name}
                      width={140}
                      height={50}
                      className="object-contain max-h-12 w-auto brightness-0 invert"
                      style={{ maxWidth: "160px" }}
                    />
                  </div>

                  {/* Company Name */}
                  <h3 className="text-xl font-semibold text-white mb-4 tracking-tight group-hover:text-(--color-accent-blue-light) transition-colors duration-300">
                    {ref.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-(--color-text-secondary) font-light leading-relaxed flex-grow">
                    {ref.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
