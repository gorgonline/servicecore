#!/usr/bin/env node
/**
 * Datasheet PDF üretici.
 *
 * Akış:
 *  1. Next dev server'ı başlat (PORT=3030)
 *  2. Sunucu hazır olunca /datasheet sayfasını Chromium ile aç
 *  3. printBackground:true ile A4 PDF üret (koyu tema gradient/glass korunur)
 *  4. public/datasheet.pdf olarak yaz
 *  5. Server'ı kapat
 *
 * Kullanım: cd website && npm run pdf
 */

import { chromium } from "@playwright/test";
import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const OUT_PATH = path.join(ROOT, "public", "datasheet.pdf");
const PORT = 3030;
const URL = `http://localhost:${PORT}/datasheet-pdf`;
const STARTUP_TIMEOUT_MS = 60_000;

async function waitForServer(url, timeoutMs) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url);
      if (res.status === 200) return true;
    } catch {
      // henüz hazır değil
    }
    await sleep(500);
  }
  throw new Error(`Server ${url} ${timeoutMs}ms içinde ayağa kalkmadı`);
}

function startDev() {
  const proc = spawn("npm", ["run", "dev", "--", "--port", String(PORT)], {
    cwd: ROOT,
    env: { ...process.env, PORT: String(PORT) },
    stdio: ["ignore", "pipe", "pipe"],
  });
  proc.stdout.on("data", (d) => process.stdout.write(`[dev] ${d}`));
  proc.stderr.on("data", (d) => process.stderr.write(`[dev:err] ${d}`));
  return proc;
}

async function generate() {
  console.log("→ Next dev server başlatılıyor (port " + PORT + ")...");
  const dev = startDev();

  try {
    console.log("→ Server hazır olması bekleniyor...");
    await waitForServer(URL, STARTUP_TIMEOUT_MS);
    console.log("✓ Server hazır.");

    console.log("→ Chromium başlatılıyor...");
    const browser = await chromium.launch();
    const context = await browser.newContext({
      viewport: { width: 1400, height: 1800 },
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();

    console.log("→ /datasheet-pdf açılıyor...");
    await page.goto(URL, { waitUntil: "networkidle", timeout: 60_000 });

    // Print medya emülasyonu — @page kuralı print modunda devreye girer
    await page.emulateMedia({ media: "print" });

    console.log("→ PDF üretiliyor...");
    await page.pdf({
      path: OUT_PATH,
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
    });

    await browser.close();

    const { statSync } = await import("node:fs");
    const sizeKB = (statSync(OUT_PATH).size / 1024).toFixed(1);
    console.log(`✓ PDF üretildi: ${OUT_PATH} (${sizeKB} KB)`);
  } finally {
    console.log("→ Dev server kapatılıyor...");
    dev.kill("SIGTERM");
    // çocuk süreçleri de temizle
    try {
      const { execSync } = await import("node:child_process");
      execSync("pkill -f 'next dev' || true", { stdio: "ignore" });
    } catch {}
  }
}

generate().catch((err) => {
  console.error("✗ PDF üretimi başarısız:", err);
  process.exit(1);
});
