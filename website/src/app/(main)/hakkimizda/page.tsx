import { Metadata } from "next";
import aboutData from "@/data/about-us.json";
import AboutHero from "@/components/ui/AboutHero";
import AboutExperience from "@/components/sections/about/AboutExperience";
import DesignPhilosophyGrid from "@/components/sections/about/DesignPhilosophyGrid";
import MethodologyTimeline from "@/components/sections/about/MethodologyTimeline";

export const metadata: Metadata = {
  title: "Hakkımızda | ServiceCore",
  description: "Servis yönetimi mühendisliğinde çeyrek asırlık tecrübe ve yalın tasarım ilkelerimizle geleceği inşa ediyoruz.",
};

export default function HakkimizdaPage() {
  return (
    <main className="min-h-screen bg-(--color-surface-base)">
      <AboutHero 
        title={aboutData.hero.title}
        subtitle={aboutData.hero.subtitle}
        description={aboutData.hero.description}
      />
      
      <AboutExperience sections={aboutData.about.sections} />
      
      <DesignPhilosophyGrid 
        title={aboutData.designPrinciples.title}
        principles={aboutData.designPrinciples.principles}
      />
      
      <MethodologyTimeline 
        title={aboutData.implementationPrinciples.title}
        principles={aboutData.implementationPrinciples.principles}
      />
    </main>
  );
}
