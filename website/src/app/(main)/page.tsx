import HeroSection from "@/components/ui/HeroSection";
import { ModulesGrid } from "@/components/ui/modules-grid";
import { SolutionsSection } from "@/components/ui/solutions-section";
import { StatsSection } from "@/components/ui/stats-section";
import { DifferentiatorsSection } from "@/components/ui/differentiators-section";
import { PricingSection } from "@/components/ui/pricing-section";
import { FaqSection } from "@/components/ui/faq-section";
import { SupportCtaSection } from "@/components/ui/support-cta-section";
import PrivacyContact from "@/components/ui/privacy-contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-(--color-surface-base)">
      <HeroSection />

      {/* Modules Grid - Phase 1 */}
      <ModulesGrid />

      {/* Ürün Ailesi / Çözümler */}
      <SolutionsSection />

      {/* Animated Metrics */}
      <StatsSection />

      {/* Fark Yaratan Yetenekler */}
      <DifferentiatorsSection />

      {/* Pricing Comparison Section */}
      <PricingSection />

      {/* Sıkça Sorulan Sorular */}
      <FaqSection />

      {/* Support & Demo CTA Section */}
      <SupportCtaSection />

      <PrivacyContact />
    </main>
  );
}
