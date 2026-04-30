import { Metadata } from "next";
import AboutHero from "@/components/ui/AboutHero";
import { AIRoadmapSection } from "@/components/ui/ai-roadmap-section";
import roadmap from "@/data/ai-roadmap.json";

export const metadata: Metadata = {
  title: "AI Yol Haritası | ServiceCore",
  description:
    "ServiceCore'un yapay zeka yol haritası. 2026-2028 arasında planlanan 30 AI modülünü keşfedin ve gelişim sürecine geri bildiriminizle yön verin.",
};

export default function AIRoadmapPage() {
  return (
    <div className="bg-(--color-surface-base-dark) text-white selection:bg-(--color-brand-primary)/30">
      <AboutHero
        title={roadmap.hero.title}
        subtitle={roadmap.hero.badge}
        description={roadmap.hero.description}
      />
      <AIRoadmapSection data={roadmap} />
    </div>
  );
}
