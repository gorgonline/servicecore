"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Cookie, Check, X } from "lucide-react";

import tokens from "@/data/design-tokens.json";
import consentData from "@/data/cookie-consent.json";
import { getStoredConsent, updateConsent } from "@/lib/analytics";

export default function CookieConsent() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);

  // Mount sonrasi localStorage'a bak — onceden karar verildiyse banner cikmasin.
  useEffect(() => {
    const stored = getStoredConsent();
    if (stored === null) {
      setVisible(true);
    }
  }, []);

  function handleAccept() {
    updateConsent(true);
    setVisible(false);
  }

  function handleReject() {
    updateConsent(false);
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-live="polite"
          aria-label="Çerez tercihleri"
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 40 }}
          animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: 40 }}
          transition={
            reduced
              ? { duration: 0.1 }
              : { type: "spring", stiffness: 300, damping: 28 }
          }
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-50"
        >
          <div
            className="rounded-2xl border backdrop-blur-xl p-6 shadow-2xl"
            style={{
              backgroundColor: tokens.colors.surface.overlay,
              borderColor: tokens.colors.border.default,
              boxShadow: `0 20px 60px -10px ${tokens.colors.brand.primary}33`,
            }}
          >
            <div className="flex items-start gap-3 mb-4">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: `${tokens.colors.brand.primary}1F`,
                }}
              >
                <Cookie
                  className="w-4 h-4"
                  style={{ color: tokens.colors.brand.primary }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div
                  className="text-[11px] font-mono font-semibold uppercase tracking-[0.2em] mb-1"
                  style={{ color: tokens.colors.text.muted }}
                >
                  {consentData.badge}
                </div>
                <h2 className="text-base font-semibold tracking-tight text-white">
                  {consentData.title}
                </h2>
              </div>
            </div>

            <p
              className="text-sm font-light leading-relaxed mb-5"
              style={{ color: tokens.colors.text.secondary }}
            >
              {consentData.description}
            </p>

            <div className="flex flex-col-reverse sm:flex-row gap-2">
              <button
                type="button"
                onClick={handleReject}
                className="flex-1 inline-flex items-center justify-center gap-2 h-11 px-4 rounded-full bg-white/5 border border-white/10 text-white font-medium text-sm hover:bg-white/10 hover:border-white/20 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-brand-primary) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-surface-base)"
              >
                <X className="w-4 h-4" />
                {consentData.rejectLabel}
              </button>
              <button
                type="button"
                onClick={handleAccept}
                className="flex-1 inline-flex items-center justify-center gap-2 h-11 px-4 rounded-full text-white font-medium text-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-brand-primary) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-surface-base)"
                style={{
                  backgroundColor: tokens.colors.brand.primary,
                  boxShadow: `0 0 20px -5px ${tokens.colors.brand.primary}99`,
                }}
              >
                <Check className="w-4 h-4" />
                {consentData.acceptLabel}
              </button>
            </div>

            <div className="mt-4 text-center">
              <Link
                href={consentData.detailsHref}
                className="text-xs font-medium underline-offset-4 hover:underline transition-colors cursor-pointer"
                style={{ color: tokens.colors.text.muted }}
              >
                {consentData.detailsLabel}
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
