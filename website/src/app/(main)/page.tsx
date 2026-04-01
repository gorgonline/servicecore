import HeroSection from "@/components/ui/HeroSection";
import { LogoCloud } from "@/components/ui/logo-cloud";
import { ModulesGrid } from "@/components/ui/modules-grid";
import { StatsSection } from "@/components/ui/stats-section";
import { PricingSection } from "@/components/ui/pricing-section";
import { SupportCtaSection } from "@/components/ui/support-cta-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-(--color-surface-base) pb-32">
      <HeroSection />
      
      {/* Trusted By / Logo Cloud Section */}
      <section className="relative mx-auto pt-16 max-w-7xl px-6 lg:px-12 w-full">
        <h2 className="mb-12 text-center font-medium text-lg text-(--color-text-secondary) tracking-tight md:text-xl">
          Başarılı müşterilerimiz ve <span className="font-semibold text-white">mutlu kullanıcılarımız.</span>
        </h2>
        <LogoCloud className="mx-auto" />
      </section>

      {/* Modules Grid - Phase 1 */}
      <ModulesGrid />

      {/* Animated Metrics */}
      <StatsSection />

      {/* Pricing Comparison Section */}
      <PricingSection />

      {/* Support & Demo CTA Section */}
      <SupportCtaSection />
    </main>
  );
}
