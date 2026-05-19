"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

interface ServiceCTAProps {
  badge: string;
  badgeIcon: LucideIcon;
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  /** Gradient direction for the outer ring */
  gradientFrom?: string;
  gradientTo?: string;
}

export function ServiceCTA({
  badge,
  badgeIcon: BadgeIcon,
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  gradientFrom = "from-(--color-brand-primary)",
  gradientTo = "to-(--color-brand-purple)",
}: ServiceCTAProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="container mx-auto pb-24 max-w-7xl mt-24 lg:mt-32">
          <motion.div
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`group relative flex flex-col justify-center overflow-hidden rounded-3xl bg-linear-to-br ${gradientFrom} ${gradientTo} p-1 md:p-px`}
          >
            <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative h-full flex flex-col items-center justify-center text-center rounded-[23px] bg-(--color-surface-elevated-solid)/90 backdrop-blur-3xl px-8 py-14 md:px-12 md:py-16">
              <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
              <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

              <div className="relative z-10 w-full">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 mx-auto">
                  <BadgeIcon className="w-4 h-4 text-(--color-accent-blue-light)" />
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-text-overline)">
                    {badge}
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
                  {title}
                </h2>

                <p className="text-lg text-(--color-text-overline) font-light leading-relaxed mb-10 max-w-xl mx-auto">
                  {description}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href={primaryHref}>
                    <button className="px-8 py-4 rounded-full bg-(--color-brand-primary) text-white font-semibold hover:bg-blue-600 transition-all hover:scale-105 active:scale-95 shadow-(--shadow-glow-primary-weak) cursor-pointer flex items-center gap-2">
                      {primaryLabel}
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </Link>
                  <Link href={secondaryHref}>
                    <button className="px-8 py-4 rounded-full bg-white/5 text-white font-semibold border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
                      {secondaryLabel}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
