import type { ReactNode } from "react";

interface GlyphProps {
  stroke: string;
  fill: string;
}

/**
 * 96x96 abstract decorative glyphs for each module opener.
 * Each glyph references CSS variables for stroke/fill so accent rotation
 * happens via inline style on the wrapper.
 */
const MODULE_GLYPHS: Record<string, (props: GlyphProps) => ReactNode> = {
  // Service Desk -> 3 omnichannel orbits
  "service-desk-and-interaction-management": ({ stroke, fill }) => (
    <svg width="96" height="96" viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <circle cx="48" cy="48" r="36" stroke={stroke} strokeWidth="1.5" opacity="0.6" />
      <circle cx="48" cy="48" r="24" stroke={stroke} strokeWidth="1.5" opacity="0.85" />
      <circle cx="48" cy="48" r="12" stroke={stroke} strokeWidth="1.5" />
      <circle cx="48" cy="48" r="4" fill={fill} />
      <circle cx="84" cy="48" r="3" fill={stroke} />
      <circle cx="12" cy="48" r="3" fill={stroke} />
      <circle cx="48" cy="12" r="3" fill={stroke} />
    </svg>
  ),
  // Incident -> alarm wave
  "incident-management": ({ stroke, fill }) => (
    <svg width="96" height="96" viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <path
        d="M8 56 Q24 32 40 56 T72 56 T96 56"
        stroke={stroke}
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M8 70 Q24 50 40 70 T72 70"
        stroke={stroke}
        strokeWidth="1.5"
        opacity="0.5"
        fill="none"
      />
      <circle cx="48" cy="28" r="8" stroke={stroke} strokeWidth="1.5" fill={fill} />
      <line x1="48" y1="20" x2="48" y2="32" stroke={stroke} strokeWidth="1.5" />
    </svg>
  ),
  // Problem -> graph nodes
  "problem-management": ({ stroke, fill }) => (
    <svg width="96" height="96" viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <line x1="48" y1="48" x2="20" y2="20" stroke={stroke} strokeWidth="1.5" />
      <line x1="48" y1="48" x2="76" y2="20" stroke={stroke} strokeWidth="1.5" />
      <line x1="48" y1="48" x2="20" y2="76" stroke={stroke} strokeWidth="1.5" />
      <line x1="48" y1="48" x2="76" y2="76" stroke={stroke} strokeWidth="1.5" />
      <circle cx="48" cy="48" r="6" fill={fill} stroke={stroke} strokeWidth="1.5" />
      <circle cx="20" cy="20" r="4" fill={fill} stroke={stroke} strokeWidth="1.5" />
      <circle cx="76" cy="20" r="4" fill={fill} stroke={stroke} strokeWidth="1.5" />
      <circle cx="20" cy="76" r="4" fill={fill} stroke={stroke} strokeWidth="1.5" />
      <circle cx="76" cy="76" r="4" fill={fill} stroke={stroke} strokeWidth="1.5" />
    </svg>
  ),
  // Request -> flow arrow
  "request-management": ({ stroke, fill }) => (
    <svg width="96" height="96" viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <rect
        x="14"
        y="32"
        width="20"
        height="32"
        rx="2"
        stroke={stroke}
        strokeWidth="1.5"
        fill={fill}
      />
      <rect
        x="62"
        y="32"
        width="20"
        height="32"
        rx="2"
        stroke={stroke}
        strokeWidth="1.5"
      />
      <path
        d="M36 48 H58"
        stroke={stroke}
        strokeWidth="1.5"
      />
      <path
        d="M52 42 L60 48 L52 54"
        stroke={stroke}
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  ),
  // Change -> rotation
  "change-management": ({ stroke, fill }) => (
    <svg width="96" height="96" viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <path
        d="M72 32 A28 28 0 1 0 76 56"
        stroke={stroke}
        strokeWidth="1.5"
        fill="none"
      />
      <path d="M70 24 L74 32 L66 34" stroke={stroke} strokeWidth="1.5" fill="none" />
      <circle cx="48" cy="48" r="6" fill={fill} />
    </svg>
  ),
  // Asset -> 3D stack
  "asset-management": ({ stroke, fill }) => (
    <svg width="96" height="96" viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <path
        d="M48 16 L80 32 L48 48 L16 32 Z"
        stroke={stroke}
        strokeWidth="1.5"
        fill={fill}
      />
      <path
        d="M16 48 L48 64 L80 48"
        stroke={stroke}
        strokeWidth="1.5"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M16 64 L48 80 L80 64"
        stroke={stroke}
        strokeWidth="1.5"
        fill="none"
        opacity="0.4"
      />
    </svg>
  ),
  // Configuration -> grid
  "configuration-management-and-cmdb": ({ stroke, fill }) => (
    <svg width="96" height="96" viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <rect x="12" y="12" width="20" height="20" stroke={stroke} strokeWidth="1.5" fill={fill} />
      <rect x="38" y="12" width="20" height="20" stroke={stroke} strokeWidth="1.5" />
      <rect x="64" y="12" width="20" height="20" stroke={stroke} strokeWidth="1.5" />
      <rect x="12" y="38" width="20" height="20" stroke={stroke} strokeWidth="1.5" />
      <rect x="38" y="38" width="20" height="20" stroke={stroke} strokeWidth="1.5" fill={fill} />
      <rect x="64" y="38" width="20" height="20" stroke={stroke} strokeWidth="1.5" />
      <rect x="12" y="64" width="20" height="20" stroke={stroke} strokeWidth="1.5" />
      <rect x="38" y="64" width="20" height="20" stroke={stroke} strokeWidth="1.5" />
      <rect x="64" y="64" width="20" height="20" stroke={stroke} strokeWidth="1.5" fill={fill} />
    </svg>
  ),
  // Knowledge -> open book
  "knowledge-management": ({ stroke, fill }) => (
    <svg width="96" height="96" viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <path
        d="M12 20 L46 28 L46 80 L12 72 Z"
        stroke={stroke}
        strokeWidth="1.5"
        fill={fill}
      />
      <path
        d="M84 20 L50 28 L50 80 L84 72 Z"
        stroke={stroke}
        strokeWidth="1.5"
        fill={fill}
      />
      <line x1="20" y1="40" x2="40" y2="44" stroke={stroke} strokeWidth="1.2" />
      <line x1="20" y1="50" x2="40" y2="54" stroke={stroke} strokeWidth="1.2" />
      <line x1="56" y1="44" x2="76" y2="40" stroke={stroke} strokeWidth="1.2" />
      <line x1="56" y1="54" x2="76" y2="50" stroke={stroke} strokeWidth="1.2" />
    </svg>
  ),
  // Continual Improvement -> upward spiral
  "continual-improvement": ({ stroke, fill }) => (
    <svg width="96" height="96" viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <path
        d="M16 80 Q16 56 40 56 Q64 56 64 36 Q64 16 80 16"
        stroke={stroke}
        strokeWidth="1.5"
        fill="none"
      />
      <path d="M76 12 L82 16 L78 22" stroke={stroke} strokeWidth="1.5" fill="none" />
      <circle cx="40" cy="56" r="3" fill={fill} />
      <circle cx="64" cy="36" r="3" fill={fill} />
    </svg>
  ),
  // Reporting -> bar chart
  "measurement-and-reporting-management": ({ stroke, fill }) => (
    <svg width="96" height="96" viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <rect x="14" y="56" width="14" height="28" stroke={stroke} strokeWidth="1.5" fill={fill} />
      <rect x="34" y="40" width="14" height="44" stroke={stroke} strokeWidth="1.5" />
      <rect x="54" y="28" width="14" height="56" stroke={stroke} strokeWidth="1.5" fill={fill} />
      <rect x="74" y="16" width="14" height="68" stroke={stroke} strokeWidth="1.5" />
      <line x1="10" y1="84" x2="92" y2="84" stroke={stroke} strokeWidth="1.5" />
    </svg>
  ),
  // Catalog -> card shelf
  "service-catalog-management": ({ stroke, fill }) => (
    <svg width="96" height="96" viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <rect x="12" y="14" width="32" height="36" rx="2" stroke={stroke} strokeWidth="1.5" fill={fill} />
      <rect x="52" y="14" width="32" height="36" rx="2" stroke={stroke} strokeWidth="1.5" />
      <rect x="12" y="56" width="32" height="28" rx="2" stroke={stroke} strokeWidth="1.5" />
      <rect x="52" y="56" width="32" height="28" rx="2" stroke={stroke} strokeWidth="1.5" fill={fill} />
      <line x1="18" y1="24" x2="38" y2="24" stroke={stroke} strokeWidth="1.2" />
      <line x1="58" y1="24" x2="78" y2="24" stroke={stroke} strokeWidth="1.2" />
    </svg>
  ),
  // Hizmet Seviyesi -> gauge clock
  "service-level-management": ({ stroke, fill }) => (
    <svg width="96" height="96" viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <path
        d="M16 64 A32 32 0 0 1 80 64"
        stroke={stroke}
        strokeWidth="1.5"
        fill="none"
      />
      <line x1="48" y1="64" x2="68" y2="40" stroke={stroke} strokeWidth="2" />
      <circle cx="48" cy="64" r="3" fill={fill} stroke={stroke} strokeWidth="1.2" />
      <line x1="20" y1="64" x2="24" y2="64" stroke={stroke} strokeWidth="1.5" />
      <line x1="76" y1="64" x2="72" y2="64" stroke={stroke} strokeWidth="1.5" />
      <line x1="48" y1="36" x2="48" y2="40" stroke={stroke} strokeWidth="1.5" />
    </svg>
  ),
  // Service Automation -> gear
  "service-automation": ({ stroke, fill }) => (
    <svg width="96" height="96" viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <circle cx="48" cy="48" r="16" stroke={stroke} strokeWidth="1.5" fill={fill} />
      <circle cx="48" cy="48" r="6" stroke={stroke} strokeWidth="1.5" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 48 + Math.cos(rad) * 18;
        const y1 = 48 + Math.sin(rad) * 18;
        const x2 = 48 + Math.cos(rad) * 30;
        const y2 = 48 + Math.sin(rad) * 30;
        return (
          <line
            key={angle}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={stroke}
            strokeWidth="3"
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  ),
  // Self Service -> phone with chat bubble
  "self-service-portal": ({ stroke, fill }) => (
    <svg width="96" height="96" viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <rect x="30" y="14" width="36" height="68" rx="6" stroke={stroke} strokeWidth="1.5" fill={fill} />
      <line x1="40" y1="22" x2="56" y2="22" stroke={stroke} strokeWidth="1.5" />
      <rect x="36" y="30" width="24" height="32" rx="2" stroke={stroke} strokeWidth="1.5" />
      <circle cx="48" cy="74" r="3" stroke={stroke} strokeWidth="1.5" />
      <path
        d="M62 38 L80 38 L80 50 L72 50 L68 56 L68 50"
        stroke={stroke}
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  ),
  // Task Management -> kanban columns
  "task-management-workforce-and-talent-management": ({ stroke, fill }) => (
    <svg width="96" height="96" viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <rect x="10" y="14" width="22" height="68" rx="2" stroke={stroke} strokeWidth="1.5" />
      <rect x="37" y="14" width="22" height="68" rx="2" stroke={stroke} strokeWidth="1.5" />
      <rect x="64" y="14" width="22" height="68" rx="2" stroke={stroke} strokeWidth="1.5" />
      <rect x="14" y="22" width="14" height="14" rx="1" fill={fill} stroke={stroke} strokeWidth="1.2" />
      <rect x="14" y="42" width="14" height="14" rx="1" fill={fill} stroke={stroke} strokeWidth="1.2" />
      <rect x="41" y="22" width="14" height="14" rx="1" fill={fill} stroke={stroke} strokeWidth="1.2" />
      <rect x="68" y="22" width="14" height="14" rx="1" fill={fill} stroke={stroke} strokeWidth="1.2" />
      <rect x="68" y="42" width="14" height="14" rx="1" fill={fill} stroke={stroke} strokeWidth="1.2" />
      <rect x="68" y="62" width="14" height="14" rx="1" fill={fill} stroke={stroke} strokeWidth="1.2" />
    </svg>
  ),
  // Project Management -> Gantt
  "project-management": ({ stroke, fill }) => (
    <svg width="96" height="96" viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <line x1="12" y1="14" x2="12" y2="84" stroke={stroke} strokeWidth="1.2" />
      <line x1="12" y1="84" x2="86" y2="84" stroke={stroke} strokeWidth="1.2" />
      <rect x="18" y="22" width="32" height="8" rx="1" fill={fill} stroke={stroke} strokeWidth="1.2" />
      <rect x="32" y="36" width="40" height="8" rx="1" fill={fill} stroke={stroke} strokeWidth="1.2" />
      <rect x="46" y="50" width="30" height="8" rx="1" fill={fill} stroke={stroke} strokeWidth="1.2" />
      <rect x="24" y="64" width="44" height="8" rx="1" fill={fill} stroke={stroke} strokeWidth="1.2" />
    </svg>
  ),
  // ESM -> branching
  "enterprise-service-management": ({ stroke, fill }) => (
    <svg width="96" height="96" viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <circle cx="20" cy="48" r="6" fill={fill} stroke={stroke} strokeWidth="1.5" />
      <circle cx="76" cy="20" r="5" fill={fill} stroke={stroke} strokeWidth="1.5" />
      <circle cx="76" cy="48" r="5" fill={fill} stroke={stroke} strokeWidth="1.5" />
      <circle cx="76" cy="76" r="5" fill={fill} stroke={stroke} strokeWidth="1.5" />
      <path d="M26 48 L48 48 L70 20" stroke={stroke} strokeWidth="1.5" fill="none" />
      <path d="M48 48 L70 48" stroke={stroke} strokeWidth="1.5" fill="none" />
      <path d="M48 48 L70 76" stroke={stroke} strokeWidth="1.5" fill="none" />
    </svg>
  ),
};

/**
 * Renders a module glyph SVG. This helper avoids ESLint's
 * `react-hooks/static-components` rule by returning JSX directly instead of
 * exposing a component reference for in-render component creation.
 */
export function renderModuleGlyph(id: string, props: GlyphProps): ReactNode {
  const fn =
    MODULE_GLYPHS[id] ??
    MODULE_GLYPHS["service-desk-and-interaction-management"];
  return fn(props);
}
