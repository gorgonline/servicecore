import { Metadata } from "next";
import datasheetData from "@/data/datasheet.json";
import { DatasheetContent } from "@/components/ui/datasheet-content";

export const metadata: Metadata = {
  title: "Datasheet | ServiceCore",
  description: datasheetData.meta.subtitle,
};

export default function DatasheetPage() {
  return <DatasheetContent />;
}
