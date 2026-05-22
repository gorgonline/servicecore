import React from "react";
import { ServiceCoreHero } from "./components/servicecore-hero";
import { InteractiveSupportMetrics } from "./components/interactive-support-metrics";
import { PremiumComparisonMatrix } from "./components/premium-comparison-matrix";
import PrivacyContact from "@/components/ui/privacy-contact";

export const metadata = {
  title: "Premium BT Destek Kanalları ve Destek Paketleri | ServiceCore",
  description: "ServiceCore'un kurumsal BT destek kanallarını keşfedin. Kesintisiz operasyonlar için Onpremises ve Bulut uyumlu yenilikçi destek paketlerimizi inceleyin.",
};

export default function DestekKanallariPage() {
  return (
    <main className="min-h-screen bg-(--color-surface-base) selection:bg-(--color-brand-primary)/30 selection:text-white">
      <ServiceCoreHero />
      <InteractiveSupportMetrics />
      <PremiumComparisonMatrix />

      <PrivacyContact />
    </main>
  );
}
