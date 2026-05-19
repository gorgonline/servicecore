"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw, Home } from "lucide-react";

import errorData from "@/data/error.json";
import designTokens from "@/data/design-tokens.json";

// Next.js 16 global error boundary — root layout dahil tum hatalari yakalar.
// html ve body tag'i icermek ZORUNLU (root layout calismadigi senaryoda).
// Bu sayfa cok nadir tetiklenir; minimal tutuldu — runtimeTokens, framer-motion, Navbar/Footer YOK.
// Renk degerleri JSON import ile design-tokens.json'dan gelir (statik bundle, runtime zinciri yok).
interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const SURFACE_BASE = designTokens.colors.surface.base;
const BRAND_PRIMARY = designTokens.colors.brand.primary;
const AMBER = designTokens.colors.accent.amber.base;
const TEXT_PRIMARY = designTokens.colors.text.primary;
const TEXT_SECONDARY = designTokens.colors.text.secondary;

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error("[ServiceCore] Kritik hata:", error);
  }, [error]);

  return (
    <html lang="tr">
      <body
        className="antialiased"
        style={{ backgroundColor: SURFACE_BASE, margin: 0 }}
      >
        <main
          className="min-h-screen w-full flex items-center justify-center px-6 py-24"
          style={{ backgroundColor: SURFACE_BASE }}
        >
          <div className="max-w-md w-full flex flex-col items-center text-center gap-6">
            {/* Ikon rozeti */}
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center backdrop-blur-xl"
              style={{
                backgroundColor: `${AMBER}26`,
                border: `1px solid ${AMBER}4D`,
              }}
            >
              <AlertCircle className="w-6 h-6" style={{ color: AMBER }} />
            </div>

            {/* Baslik */}
            <h1
              className="text-2xl md:text-3xl font-bold tracking-tight"
              style={{ color: TEXT_PRIMARY }}
            >
              {errorData.globalError.title}
            </h1>

            {/* Aciklama */}
            <p
              className="text-base font-light leading-relaxed"
              style={{ color: TEXT_SECONDARY }}
            >
              {errorData.globalError.description}
            </p>

            {/* CTA'lar — 2 buton, framer-motion yok (root layout calismayabilir) */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
              <button
                type="button"
                onClick={() => reset()}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 30px -5px ${BRAND_PRIMARY}99`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 20px -5px ${BRAND_PRIMARY}80`;
                }}
                className="h-12 px-6 rounded-full font-medium text-white flex items-center gap-2 cursor-pointer transition-shadow"
                style={{
                  backgroundColor: BRAND_PRIMARY,
                  boxShadow: `0 0 20px -5px ${BRAND_PRIMARY}80`,
                }}
              >
                <RefreshCw className="w-4 h-4" />
                {errorData.globalError.primaryCta}
              </button>

              <Link
                href="/"
                className="h-12 px-6 rounded-full font-medium text-white flex items-center gap-2 cursor-pointer transition-colors"
                style={{
                  backgroundColor: designTokens.colors.surface.overlay,
                  border: `1px solid ${designTokens.colors.border.default}`,
                }}
              >
                <Home className="w-4 h-4" />
                {errorData.globalError.secondaryCta}
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
