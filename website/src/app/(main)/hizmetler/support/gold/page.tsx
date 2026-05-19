import {
  ServiceDetailPage,
  type ServiceDetailData,
} from "@/components/hizmetler/ServiceDetailPage";
import gold from "@/data/hizmet-icerikleri/gold.json";

export default function GoldDetailPage() {
  return <ServiceDetailPage data={gold as ServiceDetailData} />;
}
