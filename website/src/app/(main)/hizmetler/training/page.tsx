import { notFound } from "next/navigation";
import { CategoryPage } from "@/components/hizmetler/CategoryPage";
import { getCategoryBySlug } from "@/lib/hizmetler";

export default function TrainingCategoryPage() {
  const category = getCategoryBySlug("training");
  if (!category) notFound();

  return (
    <CategoryPage
      category={category}
      heroStat="5 program · sertifika + sınav + uygulamalı atölye"
      prefaceTitle="Eğitim Yol Haritası"
      prefaceLead="ITIL4 Foundation, CSSM-A yönetici, CSSM-P teknisyen, ürün ve ITIL pratikleri ve raporlama-dashboard programları ile takımlarınızın servis yönetimi yetkinliğini sertifikalandırın."
      processSteps={[
        {
          label: "ITIL4 Foundation",
          detail:
            "Servis yönetimi temelleri, yaşam döngüsü ve 34 pratik bilgisi.",
          iconKey: "BookCheck",
        },
        {
          label: "CSSM-P Teknisyen",
          detail:
            "ServiceCore üzerinde teknisyen, süreç ve servis yöneticisi pratikleri.",
          iconKey: "Wrench",
        },
        {
          label: "CSSM-A Yönetici",
          detail:
            "Sistem yönetimi, konfigürasyon ve özelleştirme akışları.",
          iconKey: "ShieldCheck",
        },
        {
          label: "Uzmanlaşma",
          detail:
            "Raporlama, dashboard tasarımı ve ITIL pratik uygulama eğitimleri.",
          iconKey: "BarChart3",
        },
      ]}
      processTitle="Sertifika yol haritası."
      ctaTitle="Takımınızın yetkinliğini sertifikalandıralım."
      ctaDescription="Akredite eğitmen kadromuz, online ve sınıf formatlarındaki programlarımızla servis yönetimi kapasitenizi kalıcı hale getirelim."
      ctaBadge="Eğitim Hizmetleri"
    />
  );
}
