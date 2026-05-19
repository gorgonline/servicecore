/**
 * Analytics yardimcisi — GA4 + Google Ads conversion + Consent Mode v2.
 *
 * Mimari:
 * - GA4 root layout'ta @next/third-parties ile yuklenir (sadece NEXT_PUBLIC_GA_MEASUREMENT_ID set ise)
 * - Google Ads global tag root layout'ta next/script ile yuklenir (sadece NEXT_PUBLIC_GADS_CONVERSION_ID set ise)
 * - Consent Mode v2 default'u "denied" — kullanici banner'da kabul edince "granted"a guncellenir
 * - Form conversion event'leri tesekkurler sayfasinda fire edilir (tek nokta, bot-safe)
 */

type ConsentState = "granted" | "denied";

interface ConsentUpdate {
  ad_storage: ConsentState;
  ad_user_data: ConsentState;
  ad_personalization: ConsentState;
  analytics_storage: ConsentState;
}

type GtagCommand =
  | ["consent", "default" | "update", ConsentUpdate]
  | ["event", string, Record<string, unknown>]
  | ["config", string, Record<string, unknown>?]
  | ["js", Date]
  | ["set", Record<string, unknown>];

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: GtagCommand) => void;
  }
}

export type FormConversionType = "demo" | "iletisim" | "analiz" | "partner";

const CONSENT_STORAGE_KEY = "sc-consent-v1";

export function isAnalyticsConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
}

export function isAdsConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_GADS_CONVERSION_ID);
}

/**
 * Banner'dan kullanici izni guncellemesi.
 * Granted = analytics_storage ve ad_* hepsi acik.
 * Denied = hicbiri guncellenmez; default "denied" durumu kalir.
 */
export function updateConsent(granted: boolean): void {
  if (typeof window === "undefined") return;
  const state: ConsentState = granted ? "granted" : "denied";
  window.gtag?.("consent", "update", {
    ad_storage: state,
    ad_user_data: state,
    ad_personalization: state,
    analytics_storage: state,
  });
  try {
    window.localStorage.setItem(
      CONSENT_STORAGE_KEY,
      JSON.stringify({ granted, at: Date.now() }),
    );
  } catch {
    // localStorage erisilemez (private mode vb.) — sessizce gec
  }
}

export function getStoredConsent(): { granted: boolean; at: number } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { granted: boolean; at: number };
    return parsed;
  } catch {
    return null;
  }
}

/**
 * GA4 lead event'i — tum formlar icin (demo dahil).
 * Google Ads conversion ayri fire edilir (sadece demo'da).
 */
export function trackFormSubmit(
  formType: FormConversionType,
  extra: Record<string, unknown> = {},
): void {
  if (typeof window === "undefined") return;
  window.gtag?.("event", "generate_lead", {
    form_type: formType,
    ...extra,
  });
}

/**
 * Google Ads conversion ping — sadece demo formunda kullanilir.
 * Conversion ID + Label "AW-XXXXX/LABEL" formatinda birlestirilir.
 */
export function trackAdsConversion(
  label: string,
  options: { value?: number; currency?: string; transactionId?: string } = {},
): void {
  if (typeof window === "undefined") return;
  const conversionId = process.env.NEXT_PUBLIC_GADS_CONVERSION_ID;
  if (!conversionId || !label) return;

  const payload: Record<string, unknown> = {
    send_to: `${conversionId}/${label}`,
  };
  if (options.value !== undefined) {
    payload.value = options.value;
    payload.currency = options.currency ?? "TRY";
  }
  if (options.transactionId) {
    payload.transaction_id = options.transactionId;
  }

  window.gtag?.("event", "conversion", payload);
}
