import { notFound } from "next/navigation";
import { CategoryPage } from "@/components/hizmetler/CategoryPage";
import { getCategoryBySlug } from "@/lib/hizmetler";

export default function SetupCategoryPage() {
  const category = getCategoryBySlug("setup");
  if (!category) notFound();

  return (
    <CategoryPage
      category={category}
      heroStat="6 hizmet · sunucu hazırlığından SLA policelerine"
      prefaceTitle="Kurulum Portföyü"
      prefaceLead="Anahtar teslim implementasyondan hızlı başlangıç paketine, felaket kurtarmadan failover topolojisine kadar 6 farklı kurulum profili. Her paket, ITIL4 disiplinine sadık şekilde tasarlanır ve uzman danışmanlarımızla uygulamalı olarak teslim edilir."
      processSteps={[
        {
          label: "Keşif",
          detail:
            "İhtiyaç analizi, paydaş görüşmeleri ve mevcut durumun haritalanması.",
          iconKey: "Search",
        },
        {
          label: "Tasarım",
          detail:
            "ITIL4 referans modeline uygun mimari, akış ve konfigürasyon planı.",
          iconKey: "ListChecks",
        },
        {
          label: "Kurulum",
          detail:
            "Sunucu hazırlığı, uygulama yapılandırması ve sistem entegrasyonu.",
          iconKey: "Wrench",
        },
        {
          label: "Eğitim",
          detail:
            "CSSM-A yönetici ve CSSM-P teknisyen eğitimleri ile sahiplik aktarımı.",
          iconKey: "GraduationCap",
        },
      ]}
      processTitle="Kurulum süreci nasıl işler?"
      ctaTitle="Kurulum planlamasını birlikte yapalım."
      ctaDescription="Mevcut altyapınızı inceleyelim, doğru kurulum paketini önerelim ve uçtan uca devreye almayı sizinle birlikte yürütelim."
      ctaBadge="Kurulum Hizmetleri"
    />
  );
}
