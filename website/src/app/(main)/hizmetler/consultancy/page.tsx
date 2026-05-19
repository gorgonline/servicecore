import { notFound } from "next/navigation";
import { CategoryPage } from "@/components/hizmetler/CategoryPage";
import { getCategoryBySlug } from "@/lib/hizmetler";

export default function ConsultancyCategoryPage() {
  const category = getCategoryBySlug("consultancy");
  if (!category) notFound();

  return (
    <CategoryPage
      category={category}
      heroStat="4 hizmet · uzman danışman + proje yönetimi disiplini"
      prefaceTitle="Danışmanlık Disiplini"
      prefaceLead="Süreç mimarisinden özel modül tasarımına, proje yönetimi disiplininden Fast Track VIP Sprint paketine kadar 4 uzman danışmanlık hizmeti. Karmaşık kararları netleştirir, dönüşüm hızını arttırır."
      processSteps={[
        {
          label: "Initial",
          detail: "Tanımsız, kişiye bağımlı süreçler.",
          iconKey: "AlertOctagon",
        },
        {
          label: "Repeatable",
          detail: "Tekrarlanabilir ama belgesiz süreçler.",
          iconKey: "RefreshCw",
        },
        {
          label: "Defined",
          detail: "Belgelenmiş, standart süreçler.",
          iconKey: "ListChecks",
        },
        {
          label: "Optimized",
          detail: "Ölçülen, sürekli iyileştirilen süreçler.",
          iconKey: "Activity",
        },
      ]}
      processTitle="Süreç olgunluk modeli."
      ctaTitle="Süreç olgunluğunuzu birlikte yükseltelim."
      ctaDescription="Uzman danışmanlarımız ITIL4 disiplinine sadık olgunluk yol haritası hazırlasın, projelerinizi proje yönetimi disipliniyle yürütsün."
      ctaBadge="Danışmanlık Hizmetleri"
    />
  );
}
