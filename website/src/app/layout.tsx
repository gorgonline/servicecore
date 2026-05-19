import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import CookieConsent from "@/components/ui/cookie-consent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ServiceCore | Enterprise IT Service Management",
  description: "ITSM ve Proje Yönetimini tek platformda birleştirin.",
};

// Consent Mode v2 — GA/Ads scriptlerinden ONCE calismali. Default deny.
// Kullanici banner'da kabul edince lib/analytics updateConsent ile "granted"a cekilir.
const CONSENT_DEFAULT_SCRIPT = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  wait_for_update: 500
});
`.trim();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const adsId = process.env.NEXT_PUBLIC_GADS_CONVERSION_ID;

  return (
    <html lang="tr" className="overflow-x-hidden">
      <head>
        <Script
          id="consent-default"
          strategy="beforeInteractive"
        >
          {CONSENT_DEFAULT_SCRIPT}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        {children}
        <CookieConsent />
        {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
        {adsId ? (
          <Script
            id="google-ads-tag"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${adsId}`}
          />
        ) : null}
        {adsId ? (
          <Script id="google-ads-config" strategy="afterInteractive">
            {`gtag('js', new Date()); gtag('config', '${adsId}');`}
          </Script>
        ) : null}
      </body>
    </html>
  );
}
