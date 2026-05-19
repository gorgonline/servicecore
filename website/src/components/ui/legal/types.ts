import type { AccentName } from "../datasheet/types";

export type LegalKind = "legal" | "policy" | "terms";

export interface LegalMeta {
  kind: LegalKind | string;
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  lastUpdated: string;
  lastUpdatedLabel: string;
  version: string;
  reading_time_minutes: number;
}

export interface LegalSection {
  id: string;
  title: string;
  accent: AccentName | string;
  icon: string;
  content: string;
  purposes?: string[];
  rights?: string[];
}

export interface LegalDocumentData {
  meta: LegalMeta;
  intro: string;
  title?: string;
  sections: LegalSection[];
}
