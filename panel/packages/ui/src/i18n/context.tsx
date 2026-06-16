"use client";

import { createContext, useCallback, useContext, type ReactNode } from "react";
import type { LocalizationMessages, TranslateFn } from "./messages";

const LocalizationContext = createContext<LocalizationMessages | null>(null);

export interface LocalizationProviderProps {
  /** Tüketicinin düz key-value dil nesnesi (aktif locale için çözülmüş). */
  messages: LocalizationMessages;
  children: ReactNode;
}

/** `{ad}` placeholder'larını vars ile doldurur. */
function interpolate(text: string, vars?: Record<string, string | number>): string {
  if (!vars) return text;
  return text.replace(/\{(\w+)\}/g, (_m, k: string) => (k in vars ? String(vars[k]) : `{${k}}`));
}

/**
 * Uygulamayı saran lokalizasyon sağlayıcısı. Dil nesnesi BURADAN içeri akar;
 * kütüphane hiçbir çeviri tutmaz. Locale değişince tüketici yeni `messages` verir.
 */
export function LocalizationProvider({ messages, children }: LocalizationProviderProps) {
  return <LocalizationContext.Provider value={messages}>{children}</LocalizationContext.Provider>;
}

/**
 * Bileşenler string'lerini buradan okur: `const t = useLocalization(); t("dataTable.search")`.
 * Sağlayıcı yoksa fail-fast. Anahtar eksikse anahtarın kendisini döner (sessiz boş yerine).
 */
export function useLocalization(): TranslateFn {
  const messages = useContext(LocalizationContext);
  const t = useCallback<TranslateFn>(
    (key, vars) => interpolate(messages?.[key] ?? key, vars),
    [messages],
  );
  if (!messages) {
    throw new Error(
      "[@servicecoreui/ui] useLocalization, bir <LocalizationProvider> bulamadı. " +
        "Uygulamanı `import { LocalizationProvider } from '@servicecoreui/ui/i18n'` ile sar " +
        "ve `messages` prop'una kendi düz dil nesneni ver.",
    );
  }
  return t;
}
