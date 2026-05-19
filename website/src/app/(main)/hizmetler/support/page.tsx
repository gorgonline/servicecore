import { notFound } from "next/navigation";
import { CategoryPage } from "@/components/hizmetler/CategoryPage";
import { getCategoryBySlug } from "@/lib/hizmetler";

export default function SupportCategoryPage() {
  const category = getCategoryBySlug("support");
  if (!category) notFound();

  return (
    <CategoryPage
      category={category}
      heroStat="10 hizmet · 6 proje bazlı + 4 yıllık abonelik"
      annualLayout
      prefaceTitle="Destek Portföyü"
      prefaceLead="Entegrasyon ve göçüm operasyonlarından raporlama, saha desteği ve özellik geliştirmeye; Silver, Gold, Platinum ve Mission Critical yıllık paketlere kadar uzanan 10 destek hizmeti."
      ctaTitle="Servis sürekliliğini birlikte güvence altına alalım."
      ctaDescription="Destek seviyenizi ihtiyaçlarınıza göre kalibre edelim. Continuous Delivery, health-check ve dedicated teknisyen seçenekleriyle yola çıkın."
      ctaBadge="Destek Hizmetleri"
    />
  );
}
