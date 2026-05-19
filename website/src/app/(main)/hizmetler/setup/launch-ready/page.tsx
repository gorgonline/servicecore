import {
  ServiceDetailPage,
  type ServiceDetailData,
} from "@/components/hizmetler/ServiceDetailPage";
import launchReady from "@/data/hizmet-icerikleri/launch-ready.json";

export default function LaunchReadyDetailPage() {
  return <ServiceDetailPage data={launchReady as ServiceDetailData} />;
}
