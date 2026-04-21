import { ExpandedPricingSection } from "@/components/ui/expanded-pricing";
import AboutHero from "@/components/ui/AboutHero";
import pricingData from "@/data/pricing-pm.json";

export default function PlanlarPmPage() {
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
    </div>
  );
}
