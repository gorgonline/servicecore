import { Metadata } from "next";
import referencesData from "@/data/references.json";
import AboutHero from "@/components/ui/AboutHero";
import { ReferencesLogoGrid, ReferencesDetailGrid } from "@/components/ui/references-grid";
import PrivacyContact from "@/components/ui/privacy-contact";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Referanslar ve Başarı Öyküleri | ServiceCore",
  description:
    "Servicecore ITSM ve ESM çözümlerini kullanan 600.000+ müşteriye ulaşan kurumsal referanslarımız. Toyota, Roketsan, Boyner ve daha fazlası.",
};

export default function ReferanslarPage() {
  return (
    <main className="min-h-screen bg-(--color-surface-base) selection:bg-blue-500/30 selection:text-white">
      <AboutHero
        title={referencesData.intro.title}
        subtitle={referencesData.intro.subtitle}
        description={referencesData.intro.description}
      />

      {/* Intro Description */}
      <div className="container mx-auto px-6 lg:px-12 pt-12 pb-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-(--color-text-secondary) text-lg md:text-xl leading-relaxed font-light">
            {referencesData.intro.subDescription}
          </p>
        </div>
      </div>

      {/* Logo Grids by Category */}
      <div className="container mx-auto px-6 lg:px-12 py-16">
        <ReferencesLogoGrid />
      </div>

      {/* Detailed References */}
      <div className="container mx-auto px-6 lg:px-12 py-16">
        <ReferencesDetailGrid />
      </div>

      {/* CTA */}
      <PrivacyContact />
    </main>
  );
}
