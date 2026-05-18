import { Metadata } from "next";
import sunumlarData from "@/data/sunumlar.json";
import AboutHero from "@/components/ui/AboutHero";
import { PresentationsGrid } from "@/components/ui/presentations-grid";
import PrivacyContact from "@/components/ui/privacy-contact";

export const metadata: Metadata = {
  title: "Sunumlar ve Kaynaklar | ServiceCore",
  description: "Servicecore servis yönetimi yaklaşımını, ürün yeteneklerini ve kurumsal hizmet kapsamını detaylı biçimde inceleyebileceğiniz tanıtım sunumları ve dokümanlar.",
};

export default function SunumlarPage() {
  return (
    <main className="min-h-screen bg-(--color-surface-base) selection:bg-blue-500/30 selection:text-white">
      <AboutHero 
        title={sunumlarData.intro.title}
        subtitle="KAYNAKLAR"
        description="Servicecore’un servis yönetimi dünyasını ve kurumsal çözümlerini keşfedin."
      />
      
      <div className="container mx-auto px-6 lg:px-12 pt-12 pb-24">
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <p className="text-(--color-text-secondary) text-lg md:text-xl leading-relaxed font-light">
            {sunumlarData.intro.description}
          </p>
        </div>
        
        <PresentationsGrid />
      </div>

      <PrivacyContact sheet="Soru" />
    </main>
  );
}
