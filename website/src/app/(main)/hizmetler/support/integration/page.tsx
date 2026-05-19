import {
  ServiceDetailPage,
  type ServiceDetailData,
} from "@/components/hizmetler/ServiceDetailPage";
import integration from "@/data/hizmet-icerikleri/integration.json";

export default function IntegrationDetailPage() {
  return <ServiceDetailPage data={integration as ServiceDetailData} />;
}
