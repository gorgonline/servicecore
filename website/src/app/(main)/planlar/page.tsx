import { ExpandedPricingSection } from "@/components/ui/expanded-pricing";
import AboutHero from "@/components/ui/AboutHero";
import pricingData from "@/data/pricing-itsm.json";
import { HelpCircle } from "lucide-react";

export default function PlanlarPage() {
  return (
    <div className="bg-(--color-surface-base-dark) text-white selection:bg-(--color-brand-primary)/30">
      {/* Hero Section */}
      <AboutHero
        title={pricingData.hero.title}
        subtitle={pricingData.hero.subtitle}
        description={pricingData.hero.description}
      />

      {/* Expanded Pricing Grid */}
      <ExpandedPricingSection data={pricingData} />

      {/* FAQ Section */}
      <section className="py-24 bg-(--color-surface-base) relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/5 to-transparent" />
        <div className="mx-auto max-w-4xl px-6 lg:px-12 relative z-10">
          <div className="flex items-center gap-4 mb-12">
            <div className="p-3 rounded-xl bg-(--color-brand-primary)/10 border border-(--color-brand-primary)/20">
              <HelpCircle className="w-6 h-6 text-(--color-brand-primary)" />
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight">Sıkça Sorulan Sorular</h2>
          </div>

          <div className="grid gap-6">
            {pricingData.faq.map((item, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-white/2 border border-white/5 hover:border-white/10 transition-colors group"
              >
                <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-(--color-brand-primary) transition-colors">
                  {item.question}
                </h3>
                <p className="text-(--color-text-secondary) leading-relaxed font-light">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
