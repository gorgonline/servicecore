import {
  ServiceDetailPage,
  type ServiceDetailData,
} from "@/components/hizmetler/ServiceDetailPage";
import platinum from "@/data/hizmet-icerikleri/platinum.json";

export default function PlatinumDetailPage() {
  return <ServiceDetailPage data={platinum as ServiceDetailData} />;
}
