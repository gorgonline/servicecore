import { LegalDocument } from "@/components/ui/legal/legal-document";
import privacyData from "@/data/privacy-policy.json";
import type { LegalDocumentData } from "@/components/ui/legal/types";

const data = privacyData as LegalDocumentData;

export default function GizlilikPage() {
  return <LegalDocument data={data} />;
}
