import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroSection from "@/components/ui/HeroSection";
import { LogoCloud } from "@/components/ui/logo-cloud";
import { ModulesGrid } from "@/components/ui/modules-grid";
import { StatsSection } from "@/components/ui/stats-section";
import { PricingSection } from "@/components/ui/pricing-section";
import { SupportCtaSection } from "@/components/ui/support-cta-section";
import PrivacyContact from "@/components/ui/privacy-contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-(--color-surface-base) pb-32">
      <HeroSection />
      
      {/* Trusted By / Logo Cloud Section */}
      <section className="relative mx-auto pt-16 max-w-7xl px-6 lg:px-12 w-full">
        <h2 className="mb-12 text-center font-medium text-lg text-(--color-text-secondary) tracking-tight md:text-xl">
          Başarılı projelerimiz ve <span className="font-semibold text-white">bazı mutlu müşterilerimiz.</span>
        </h2>
        <LogoCloud className="mx-auto" />
        <div className="mt-12 flex justify-center">
          <Link
            href="/referanslar"
            className="group inline-flex h-11 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 font-medium text-sm text-white transition-all duration-300 hover:border-white/20 hover:bg-white/10 cursor-pointer"
          >
            Diğer Referans Müşterilerimiz
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* Modules Grid - Phase 1 */}
      <ModulesGrid />

      {/* Animated Metrics */}
      <StatsSection />

      {/* Pricing Comparison Section */}
      <PricingSection />

      {/* Support & Demo CTA Section */}
      <SupportCtaSection />

      <PrivacyContact />
    </main>
  );
}
