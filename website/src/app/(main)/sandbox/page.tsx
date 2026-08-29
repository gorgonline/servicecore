import type { Metadata } from "next";
import { FlaskConical } from "lucide-react";
import AddonCostPage from "@/components/ui/addon-cost-page";
import addonData from "@/data/addon-sayfalari/sandbox.json";

export const metadata: Metadata = {
  title: addonData.metaTitle,
  description: addonData.metaDescription,
  alternates: { canonical: "/sandbox" },
};

export default function SandboxPage() {
  return (
    <AddonCostPage data={addonData} badgeIcon={FlaskConical} glowColor="rgba(0,112,243,0.18)" />
  );
}
