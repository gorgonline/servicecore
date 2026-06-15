"use client";

/**
 * i18n bootstrap — playground
 *
 * i18next'i başlatır ve ServiceCore UI namespace'lerini kayıt eder.
 * Bu modül YALNIZCA playground'a aittir; packages/ui'ye import edilmez.
 *
 * Kullanım: bu dosyayı providers.tsx veya root layout'ta import et —
 * side-effect olarak çalışır, init bir kez tetiklenir.
 */

import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { SC_AUTH_NS, SC_LAYOUT_NS } from "@servicecoreui/ui";
import scAuth from "../locales/tr/sc-auth";
import scLayout from "../locales/tr/sc-layout";

if (!i18next.isInitialized) {
  void i18next.use(initReactI18next).init({
    lng: "tr",
    fallbackLng: "tr",
    // Namespace'leri önceden yükle — async yükleme YOK (playground SSR uyumu)
    ns: [SC_AUTH_NS, SC_LAYOUT_NS],
    defaultNS: SC_AUTH_NS,
    resources: {
      tr: {
        [SC_AUTH_NS]: scAuth,
        [SC_LAYOUT_NS]: scLayout,
      },
    },
    interpolation: {
      // React zaten XSS'e karşı koruma sağlar
      escapeValue: false,
    },
  });
}

export { i18next };
