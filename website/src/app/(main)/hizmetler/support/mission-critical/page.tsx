import {
  ServiceDetailPage,
  type ServiceDetailData,
} from "@/components/hizmetler/ServiceDetailPage";
import missionCritical from "@/data/hizmet-icerikleri/mission-critical.json";

export default function MissionCriticalDetailPage() {
  return <ServiceDetailPage data={missionCritical as ServiceDetailData} />;
}
