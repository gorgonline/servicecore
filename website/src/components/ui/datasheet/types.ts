export type DatasheetItemKind = "para" | "bullet" | "feature" | "subheading";

export type AccentName =
  | "blue"
  | "red"
  | "amber"
  | "cyan"
  | "purple"
  | "orange"
  | "sky"
  | "pink"
  | "emerald";

export interface DatasheetItem {
  kind: DatasheetItemKind;
  number?: number | null;
  text?: string;
  title?: string;
  checks?: string[];
}

export interface DatasheetModule {
  id: string;
  title: string;
  pages: number[];
  items: DatasheetItem[];
  accent: AccentName;
  icon: string;
  title_tr: string;
  tagline: string;
}

export interface DatasheetMeta {
  source: string;
  title: string;
  subtitle: string;
  platform_label: string;
  extracted_modules: number;
  version: string;
  release_date: string;
  release_date_iso: string;
  page_count: number;
  language: string;
  company_full: string;
  company_location: string;
}

export interface DatasheetCover {
  eyebrow: string;
  title_main: string;
  title_accent: string;
  lede: string;
  description: string;
  primary_cta: { label: string; action: string };
  secondary_cta: { label: string; href: string };
}

export interface DatasheetKpi {
  value: string;
  suffix?: string;
  label: string;
  detail: string;
}

export interface DatasheetExecutiveSummary {
  lead_drop_cap: string;
  paragraphs: string[];
  highlight: string;
}

export interface DatasheetClosing {
  eyebrow: string;
  title: string;
  description: string;
  ctas: { label: string; href: string; variant: "primary" | "secondary" }[];
  links: { label: string; href: string }[];
}

export interface DatasheetContact {
  docs: string;
  email: string;
  phone: string;
  url: string;
}
