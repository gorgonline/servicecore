// Build script — esbuild ile ESM + CJS + CSS bundle.
//
// Neden tsup değil:
//   tsup default loader ayarı esbuild'in .module.css auto-detection'ını eziyor.
//   Direkt esbuild ile CSS Modules class adları hash'lenir, JS bundle class-map alır.
//
// İki tier'lı çıktı:
//   dist/index.{js,cjs,d.ts}      Server-safe — typography + tokens (AntD bağımlılığı yok)
//   dist/custom.{js,cjs,d.ts}     ServiceCore'a özel bileşenler — "use client" banner'lı
//                                  (composite'ler AntD wrap kullanır; client-only)
//   dist/wraps.{js,cjs,d.ts}      AntD wraps — "use client" banner'lı, client-only
//   dist/theme/index.{js,cjs}     Theme + tokens (server-safe)
//   dist/styles.css               Tüm CSS Modules tek dosyada, class adları namespaced
//   dist/theme/tokens.css         Raw CSS değişkenleri (--sc-*)

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
  // i18n tek paylaşılan modül olmalı (singleton React context). Her bundle'a
  // gömülürse her birinde ayrı context instance olur → Provider eşleşmez.
  // External → runtime'da hepsi tek dist/i18n'i import eder.
  "@servicecoreui/ui/i18n",
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
  await mkdir(join(DIST, "theme"), { recursive: true });

  // 2. Server-safe entry'ler (index + theme) — banner yok
  await build({
    ...SHARED,
    entryPoints: {
      index: "src/index.ts",
      "asset/icons": "src/asset/icons.ts",
      "theme/index": "src/theme/index.ts",
      // DAHİLİ (public exports.'ta değil) — playground typography demoları alias hedefi
      "typography/index": "src/typography/index.ts",
    },
    format: "esm",
    outdir: "dist",
    outExtension: { ".js": ".js" },
  });

  await build({
    ...SHARED,
    entryPoints: {
      index: "src/index.ts",
      "asset/icons": "src/asset/icons.ts",
      "theme/index": "src/theme/index.ts",
      // DAHİLİ (public exports.'ta değil) — playground typography demoları alias hedefi
      "typography/index": "src/typography/index.ts",
    },
    format: "cjs",
    outdir: "dist",
    outExtension: { ".js": ".cjs" },
  });

  // 3. Client entry'ler — "use client" banner'lı
  //    wraps (AntD) · custom (ServiceCore-özel) · charts (Recharts) · features (sayfa yapıtaşları)
  const WRAPS = {
    ...SHARED,
    entryPoints: {
      // Public domain feature subpath'leri — dist src'yi yansıtır (theme/index gibi)
      "feature/auth/index": "src/feature/auth/index.ts",
      "feature/settings/index": "src/feature/settings/index.ts",
      "feature/system/index": "src/feature/system/index.ts",
      "feature/sla/index": "src/feature/sla/index.ts",
      "feature/notification/index": "src/feature/notification/index.ts",
      "feature/time/index": "src/feature/time/index.ts",
      // Lokalizasyon (Provider + hook + tip) — public
      "i18n/index": "src/i18n/index.ts",
      // Dahili/geçiş toplayıcıları (katmanlar-arası; primitive-gizleme adımında silinecek)
      "_internal/wraps": "src/_internal/wraps.ts",
      "_internal/custom": "src/_internal/custom.ts",
      "_internal/charts": "src/_internal/charts.ts",
      "_internal/features": "src/_internal/features.ts",
    },
    outdir: "dist",
    banner: { js: '"use client";' },
  };

  await build({ ...WRAPS, format: "esm", outExtension: { ".js": ".js" } });
  await build({ ...WRAPS, format: "cjs", outExtension: { ".js": ".cjs" } });

  // 4. tokens.css raw kopyala
  await copyFile(
    join(ROOT, "src/theme/tokens.css"),
    join(DIST, "theme/tokens.css"),
  );

  // 5. CSS çıktılarını tek dosyada birleştir: dist/styles.css
  // ESM build her entry için bir CSS üretti (index.css ve muhtemelen wraps.css).
  // Hepsini styles.css'e topla.
  const fs = await import("node:fs/promises");
  // Nested entry'ler (feature/<domain>, _internal/*, typography/) CSS'lerini alt
  // klasörlere yazar; hepsini özyineli topla. theme/ (raw tokens.css) hariç.
  const cssFiles = [];
  const collectCss = async (dir) => {
    for (const e of await readdir(dir, { withFileTypes: true })) {
      const p = join(dir, e.name);
      if (e.isDirectory()) {
        if (p === join(DIST, "theme")) continue; // tokens.css ayrı export, birleştirme
        await collectCss(p);
      } else if (e.name.endsWith(".css") && p !== join(DIST, "styles.css")) {
        cssFiles.push(p);
      }
    }
  };
  await collectCss(DIST);

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
