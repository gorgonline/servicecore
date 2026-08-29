import type { Metadata } from "next";
import { Network } from "lucide-react";
import AddonCostPage from "@/components/ui/addon-cost-page";
import addonData from "@/data/addon-sayfalari/failover.json";

export const metadata: Metadata = {
  title: addonData.metaTitle,
  description: addonData.metaDescription,
  alternates: { canonical: "/failover" },
};

export default function FailoverPage() {
  return (
    <AddonCostPage data={addonData} badgeIcon={Network} glowColor="rgba(56,189,248,0.18)" />
  );
}
