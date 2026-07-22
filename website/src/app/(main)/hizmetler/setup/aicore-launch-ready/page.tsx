import {
  ServiceDetailPage,
  type ServiceDetailData,
} from "@/components/hizmetler/ServiceDetailPage";
import aicoreLaunchReady from "@/data/hizmet-icerikleri/aicore-launch-ready.json";

export default function AicoreLaunchReadyDetailPage() {
  return <ServiceDetailPage data={aicoreLaunchReady as ServiceDetailData} />;
}
