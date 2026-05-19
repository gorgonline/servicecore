import type { CSSProperties } from "react";
import {
  Clock,
  Cookie,
  Database,
  FileText,
  ListChecks,
  Mail,
  Scale,
  Share2,
  ShieldCheck,
  Users,
} from "lucide-react";

const ICON_MAP = {
  "shield-check": ShieldCheck,
  database: Database,
  "share-2": Share2,
  users: Users,
  cookie: Cookie,
  "list-checks": ListChecks,
  clock: Clock,
  scale: Scale,
  mail: Mail,
  "file-text": FileText,
} as const;

interface IconRenderProps {
  className?: string;
  style?: CSSProperties;
  strokeWidth?: number;
}

/**
 * Renders Lucide icon for legal section by JSON string id.
 * Falls back to FileText if name is missing or unknown.
 */
export function renderLegalIcon(
  name: string | undefined,
  props: IconRenderProps,
) {
  const key = (name ?? "file-text") as keyof typeof ICON_MAP;
  const Comp = ICON_MAP[key] ?? ICON_MAP["file-text"];
  return <Comp {...props} />;
}
