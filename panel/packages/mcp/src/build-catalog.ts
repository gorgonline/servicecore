/**
 * Build-time scanner — packages/ui/src/ klasörünü tarar,
 * her component için spec'i çıkarır, dist/catalog.json üretir.
 *
 * Çıktı: { components: { Button: { source, types?, css?, description } }, tokens, version }
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MCP_ROOT = path.resolve(__dirname, "..");
const UI_SRC = path.resolve(MCP_ROOT, "../ui/src");
const UI_PKG = JSON.parse(
  fs.readFileSync(path.resolve(MCP_ROOT, "../ui/package.json"), "utf-8"),
) as { version: string; name: string };

interface ComponentSpec {
  name: string;
  source: string;
  types?: string;
  css?: string;
  description: string;
}

interface Catalog {
  uiPackage: string;
  uiVersion: string;
  generatedAt: string;
  components: Record<string, ComponentSpec>;
  tokens: string;
  rules: string;
}

function extractDescription(source: string): string {
  const match = source.match(/\/\*\*\s*([\s\S]*?)\*\//);
  if (!match || !match[1]) return "";
  return match[1]
    .split("\n")
    .map((l) => l.replace(/^\s*\*\s?/, "").trim())
    .filter((l) => l.length > 0 && !l.startsWith("@"))
    .join(" ")
    .slice(0, 300);
}

/** Tek bir klasörden (<dir>/<name>.tsx + opsiyonel .types.ts/.module.css) spec çıkar. */
function specFromDir(dir: string, name: string): ComponentSpec | null {
  const tsxPath = path.join(dir, `${name}.tsx`);
  if (!fs.existsSync(tsxPath)) return null;

  const typesPath = path.join(dir, `${name}.types.ts`);
  const cssPath = path.join(dir, `${name}.module.css`);
  const source = fs.readFileSync(tsxPath, "utf-8");
  const types = fs.existsSync(typesPath) ? fs.readFileSync(typesPath, "utf-8") : undefined;
  const css = fs.existsSync(cssPath) ? fs.readFileSync(cssPath, "utf-8") : undefined;

  const spec: ComponentSpec = {
    name,
    source,
    description: extractDescription(types ?? source),
  };
  if (types !== undefined) spec.types = types;
  if (css !== undefined) spec.css = css;
  return spec;
}

function scanComponents(): Record<string, ComponentSpec> {
  const components: Record<string, ComponentSpec> = {};

  const add = (dir: string, name: string) => {
    const spec = specFromDir(dir, name);
    if (spec) components[name] = spec;
  };

  for (const entry of fs.readdirSync(UI_SRC, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    if (!/^[A-Z]/.test(entry.name)) continue;
    if (entry.name === "theme") continue;

    const dir = path.join(UI_SRC, entry.name);
    // 1) Top-level bileşen: src/<Ad>/<Ad>.tsx
    add(dir, entry.name);

    // 2) Nested bileşenler: src/<Kapsayıcı>/<Alt>/<Alt>.tsx (ör. Charts/BarChart).
    //    Scanner tek seviye iner; kapsayıcının kendi .tsx'i yoksa (Charts gibi) yalnız alt'lar girer.
    for (const sub of fs.readdirSync(dir, { withFileTypes: true })) {
      if (!sub.isDirectory()) continue;
      if (!/^[A-Z]/.test(sub.name)) continue;
      add(path.join(dir, sub.name), sub.name);
    }
  }

  return components;
}

function readTokens(): string {
  const tokensPath = path.join(UI_SRC, "theme", "tokens.css");
  if (!fs.existsSync(tokensPath)) return "";
  return fs.readFileSync(tokensPath, "utf-8");
}

function readRules(): string {
  const rulesPath = path.resolve(MCP_ROOT, "design-rules.md");
  if (!fs.existsSync(rulesPath)) return "";
  return fs.readFileSync(rulesPath, "utf-8");
}

const catalog: Catalog = {
  uiPackage: UI_PKG.name,
  uiVersion: UI_PKG.version,
  generatedAt: "build-time",
  components: scanComponents(),
  tokens: readTokens(),
  rules: readRules(),
};

const distDir = path.resolve(MCP_ROOT, "dist");
if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });

const out = path.join(distDir, "catalog.json");
fs.writeFileSync(out, JSON.stringify(catalog, null, 2));

console.log(
  `[mcp] catalog written: ${Object.keys(catalog.components).length} components, ${(JSON.stringify(catalog).length / 1024).toFixed(1)}kB`,
);
