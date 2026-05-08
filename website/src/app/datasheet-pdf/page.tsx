import type { Metadata } from "next";
import { DatasheetPdfTemplate } from "@/components/ui/datasheet-pdf-template";

export const metadata: Metadata = {
  title: "Servicecore Datasheet — PDF",
  robots: { index: false, follow: false },
};

export default function DatasheetPdfPage() {
  return <DatasheetPdfTemplate />;
}
