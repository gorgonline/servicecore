import {
  ServiceDetailPage,
  type ServiceDetailData,
} from "@/components/hizmetler/ServiceDetailPage";
import silver from "@/data/hizmet-icerikleri/silver.json";

export default function SilverDetailPage() {
  return <ServiceDetailPage data={silver as ServiceDetailData} />;
}
