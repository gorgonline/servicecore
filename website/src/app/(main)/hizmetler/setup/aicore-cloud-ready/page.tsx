import {
  ServiceDetailPage,
  type ServiceDetailData,
} from "@/components/hizmetler/ServiceDetailPage";
import aicoreCloudReady from "@/data/hizmet-icerikleri/aicore-cloud-ready.json";

export default function AicoreCloudReadyDetailPage() {
  return <ServiceDetailPage data={aicoreCloudReady as ServiceDetailData} />;
}
