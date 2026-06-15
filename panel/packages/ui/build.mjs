// Build script — esbuild ile ESM + CJS + CSS bundle.
//
// Neden tsup değil:
//   tsup default loader ayarı esbuild'in .module.css auto-detection'ını eziyor.
//   Direkt esbuild ile CSS Modules class adları hash'lenir, JS bundle class-map alır.
//
// Entry çıktıları:
//   dist/index.{js,cjs,d.ts}      Ana barrel — tüm public API — "use client" banner'lı
//   dist/custom.{js,cjs,d.ts}     Backward-compat — ./custom alt-yolu (ana barrel tercih et)
//   dist/styles.css               Tüm CSS Modules tek dosyada, class adları namespaced
//   dist/tokens.css               Raw CSS değişkenleri (--sc-*)

import { build } from "esbuild";
import { rm, mkdir, copyFile, rename, readdir, stat } from "node:fs/promises";
import { dirname, join } from "node:path";

const ROOT = dirname(new URL(import.meta.url).pathname);
const DIST = join(ROOT, "dist");

const EXTERNAL = [
  "react",
  "react-dom",
  "react/jsx-runtime",
  "antd",
  "@carbon/icons-react",
  "clsx",
  "recharts",
];

const SHARED = {
  bundle: true,
  sourcemap: true,
  target: "es2022",
  external: EXTERNAL,
  treeShaking: true,
  logLevel: "info",
  jsx: "automatic",
};

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  // 1. Temizle
  if (await exists(DIST)) await rm(DIST, { recursive: true, force: true });
  await mkdir(DIST, { recursive: true });

  // 2. Entry'ler — "use client" banner'lı (AntD + Recharts client-only)
  const ENTRY = {
    ...SHARED,
    entryPoints: { index: "src/index.ts", custom: "src/custom.ts" },
    outdir: "dist",
    banner: { js: '"use client";' },
  };

  await build({ ...ENTRY, format: "esm", outExtension: { ".js": ".js" } });
  await build({ ...ENTRY, format: "cjs", outExtension: { ".js": ".cjs" } });

  // 3. tokens.css raw kopyala (dist/tokens.css + dist/theme/tokens.css — geriye dönük uyum)
  await copyFile(
    join(ROOT, "src/theme/tokens.css"),
    join(DIST, "tokens.css"),
  );

  // 4. CSS çıktılarını tek dosyada birleştir: dist/styles.css
  // ESM build index.css üretiyor; rename et.
  const fs = await import("node:fs/promises");
  const cssFiles = [];
  for (const file of await readdir(DIST)) {
    if (file.endsWith(".css") && file !== "styles.css" && file !== "tokens.css") {
      cssFiles.push(join(DIST, file));
    }
  }

  if (cssFiles.length === 1) {
    // Tek CSS — direkt rename
    await rename(cssFiles[0], join(DIST, "styles.css"));
    const map = cssFiles[0] + ".map";
    if (await exists(map)) await rename(map, join(DIST, "styles.css.map"));
  } else if (cssFiles.length > 1) {
    // Birden fazla CSS — concat
    let combined = "";
    for (const f of cssFiles) {
      combined += await fs.readFile(f, "utf-8") + "\n";
      await rm(f);
      const map = f + ".map";
      if (await exists(map)) await rm(map);
    }
    await fs.writeFile(join(DIST, "styles.css"), combined);
  }

  console.log("✓ Build complete. Files in dist/:");
  for (const f of (await readdir(DIST)).sort()) {
    console.log("  " + f);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
