import {
  ServiceDetailPage,
  type ServiceDetailData,
} from "@/components/hizmetler/ServiceDetailPage";
import aicoreDestek from "@/data/hizmet-icerikleri/aicore-destek.json";

export default function AicoreDestekDetailPage() {
  return <ServiceDetailPage data={aicoreDestek as ServiceDetailData} />;
}
