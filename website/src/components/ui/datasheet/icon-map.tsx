import type { CSSProperties } from "react";
import {
  Activity,
  AlertCircle,
  BookOpen,
  Box,
  Briefcase,
  FileText,
  GitBranch,
  HelpCircle,
  LineChart,
  ListTodo,
  MessageSquare,
  RefreshCw,
  Settings,
  Smartphone,
  Store,
  Terminal,
  TrendingUp,
} from "lucide-react";

const ICON_MAP = {
  Activity,
  AlertCircle,
  BookOpen,
  Box,
  Briefcase,
  FileText,
  GitBranch,
  HelpCircle,
  LineChart,
  ListTodo,
  MessageSquare,
  RefreshCw,
  Settings,
  Smartphone,
  Store,
  Terminal,
  TrendingUp,
} as const;

interface IconRenderProps {
  className?: string;
  style?: CSSProperties;
  strokeWidth?: number;
}

/**
 * Returns rendered Lucide icon JSX. Avoids the "components created during render"
 * lint rule by exposing a render function rather than a component reference.
 */
export function renderModuleIcon(
  name: string | undefined,
  props: IconRenderProps,
) {
  const key = (name ?? "MessageSquare") as keyof typeof ICON_MAP;
  const Comp = ICON_MAP[key] ?? ICON_MAP.MessageSquare;
  return <Comp {...props} />;
}
