import {
  ServiceDetailPage,
  type ServiceDetailData,
} from "@/components/hizmetler/ServiceDetailPage";
import quickstart from "@/data/hizmet-icerikleri/quickstart.json";

export default function QuickstartDetailPage() {
  return <ServiceDetailPage data={quickstart as ServiceDetailData} />;
}
