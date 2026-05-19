"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Check, Star } from "lucide-react";
import {
  buildServiceHref,
  type HizmetService,
} from "@/lib/hizmetler";
import { getAccentTone, HIZMET_ICON_MAP } from "./icon-map";
import { En } from "@/components/ui/En";

interface ServiceCardProps {
  service: HizmetService;
  /** Show featured ring around card */
  prominent?: boolean;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", damping: 20, stiffness: 140 },
  },
};

export function ServiceCard({ service, prominent = false }: ServiceCardProps) {
  const Icon = HIZMET_ICON_MAP[service.icon] ?? HIZMET_ICON_MAP.Rocket;
  const tone = getAccentTone(service.accentColor);
  const href = buildServiceHref(service);
  const isAnnual = service.paymentTerm === "annual";
  const paymentLabel = isAnnual ? "Yıllık abonelik" : "Tek seferlik";
  const ctaLabel = service.hasDetailPage ? "Detayları Gör" : "Demo İste";
  const ctaHref = service.hasDetailPage ? href : "/demo";

  return (
    <motion.article
      variants={fadeUp}
      id={service.slug}
      className="h-full scroll-mt-32"
    >
      <Link
        href={ctaHref}
        className={`group relative flex flex-col h-full rounded-3xl border bg-white/2 hover:bg-white/4 backdrop-blur-xl transition-all p-8 overflow-hidden cursor-pointer ${
          prominent
            ? `${tone.iconBorder} shadow-[0_0_30px_-12px_rgba(56,189,248,0.35)] hover:shadow-[0_0_45px_-12px_rgba(56,189,248,0.55)]`
            : "border-white/10 hover:border-white/20"
        }`}
      >
        <div
          className={`pointer-events-none absolute -inset-10 bg-linear-to-br ${tone.cardHoverGradient} to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
        />

        <div className="relative flex flex-col gap-5 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div
              className={`w-12 h-12 rounded-2xl ${tone.iconBg} border ${tone.iconBorder} flex items-center justify-center ${tone.iconText} shrink-0`}
            >
              <Icon className="w-5 h-5" />
            </div>
            <div className="flex flex-col items-end gap-1 shrink-0">
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold tracking-[0.16em] uppercase ${tone.badgeBg} border ${tone.badgeBorder} ${tone.badgeText}`}
              >
                {isAnnual ? <En>Annual</En> : paymentLabel}
              </span>
              {service.featured && (
                <span
                  className={`inline-flex items-center gap-1 text-[10px] font-mono ${tone.iconText}`}
                >
                  <Star className="w-3 h-3" fill="currentColor" />
                  Öne çıkan
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold text-white tracking-tight leading-tight">
              {service.name}
            </h3>
            <span className="text-[11px] font-mono text-(--color-text-muted) tracking-[0.16em] uppercase">
              <En>{service.code}</En>
            </span>
          </div>

          <p className="text-sm text-(--color-text-secondary) font-light leading-relaxed line-clamp-4">
            {service.shortDescription}
          </p>

          {service.valueProps && service.valueProps.length > 0 && (
            <ul className="flex flex-col gap-2 mt-1">
              {service.valueProps.slice(0, 4).map((prop, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-(--color-text-overline) font-light leading-snug">
                  <Check className={`w-3.5 h-3.5 ${tone.iconText} mt-0.5 shrink-0`} />
                  <span>{prop}</span>
                </li>
              ))}
            </ul>
          )}

          {service.whoFor && (
            <div className="mt-2 rounded-xl border border-white/8 bg-white/3 px-4 py-3">
              <div className="text-[10px] font-mono font-semibold tracking-[0.18em] uppercase text-(--color-text-muted) mb-1">
                Kimler için
              </div>
              <p className="text-xs text-(--color-text-overline) font-light leading-snug">
                {service.whoFor}
              </p>
            </div>
          )}
        </div>

        <div className="relative mt-6 pt-4 border-t border-white/8 flex items-center justify-between">
          <span
            className={`text-xs font-semibold ${tone.ctaText} group-hover:translate-x-0.5 transition-transform`}
          >
            {ctaLabel}
          </span>
          <ArrowRight
            className={`w-4 h-4 ${tone.ctaText} group-hover:translate-x-1 transition-transform`}
          />
        </div>
      </Link>
    </motion.article>
  );
}
