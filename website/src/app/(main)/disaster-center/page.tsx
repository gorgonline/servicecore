import type { Metadata } from "next";
import { ShieldAlert } from "lucide-react";
import AddonCostPage from "@/components/ui/addon-cost-page";
import addonData from "@/data/addon-sayfalari/disaster-center.json";

export const metadata: Metadata = {
  title: addonData.metaTitle,
  description: addonData.metaDescription,
  alternates: { canonical: "/disaster-center" },
};

export default function DisasterCenterPage() {
  return (
    <AddonCostPage data={addonData} badgeIcon={ShieldAlert} glowColor="rgba(249,115,22,0.16)" />
  );
}
