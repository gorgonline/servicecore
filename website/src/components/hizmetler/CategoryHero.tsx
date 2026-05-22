"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { getAccentTone } from "./icon-map";

interface CategoryHeroProps {
  badge: ReactNode;
  badgeIcon: LucideIcon;
  titleLead: string;
  titleAccent: string;
  description: string;
  stat: string;
  accent: string;
  /** Breadcrumb segments — labels rendered left to right */
  breadcrumb: { label: string; href?: string }[];
}

export function CategoryHero({
  badge,
  badgeIcon: BadgeIcon,
  titleLead,
  titleAccent,
  description,
  stat,
  accent,
  breadcrumb,
}: CategoryHeroProps) {
  const tone = getAccentTone(accent);
  return (
    <section className="relative pt-32 pb-16 lg:pt-44 lg:pb-20 overflow-hidden w-full">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-300 pointer-events-none">
        <div className={`absolute -top-32 left-1/3 -translate-x-1/2 w-150 h-150 ${tone.glowBg} blur-[120px] rounded-full mix-blend-screen opacity-60`} />
        <div className="absolute top-40 right-1/4 w-100 h-100 bg-purple-600/10 blur-[100px] rounded-full mix-blend-screen" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10 w-full max-w-7xl">
        <nav
          aria-label="Sayfa hiyerarşisi"
          className="mb-8 flex items-center gap-2 text-[11px] font-mono text-(--color-text-muted)"
        >
          {breadcrumb.map((segment, idx) => {
            const isLast = idx === breadcrumb.length - 1;
            return (
              <span key={idx} className="flex items-center gap-2">
                {segment.href ? (
                  <Link
                    href={segment.href}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    {segment.label}
                  </Link>
                ) : (
                  <span className="text-white">{segment.label}</span>
                )}
                {!isLast && <ChevronRight className="w-3 h-3" />}
              </span>
            );
          })}
        </nav>

        <div className="flex flex-col items-start max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${tone.badgeBg} border ${tone.badgeBorder} ${tone.badgeText} text-xs font-black tracking-widest uppercase mb-8 shadow-inner`}
          >
            <BadgeIcon className="w-3.5 h-3.5" />
            {badge}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl lg:text-7xl font-bold text-white mb-8 tracking-tight leading-[1.05]"
          >
            {titleLead}{" "}
            <span
              className={`text-transparent bg-clip-text bg-linear-to-r ${tone.headerGradient}`}
            >
              {titleAccent}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg lg:text-xl text-(--color-text-secondary) font-light leading-relaxed max-w-3xl mb-10"
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center gap-2 text-xs font-mono text-(--color-text-muted) tracking-wider"
          >
            <span className={`${tone.badgeText} font-semibold`}>{stat}</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
