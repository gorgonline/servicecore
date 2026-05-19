import {
  ServiceDetailPage,
  type ServiceDetailData,
} from "@/components/hizmetler/ServiceDetailPage";
import migration from "@/data/hizmet-icerikleri/migration.json";

export default function MigrationDetailPage() {
  return <ServiceDetailPage data={migration as ServiceDetailData} />;
}
