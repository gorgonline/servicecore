#!/usr/bin/env node

/**
 * LinkedIn HTML → PNG converter
 *
 * Usage:
 *   node linkedin/html-to-png.mjs linkedin/posts/2026-04-13_genel-tanitim/varyant-1.html
 *   node linkedin/html-to-png.mjs linkedin/posts/2026-04-13_genel-tanitim/  (klasördeki tüm HTML'ler)
 *   node linkedin/html-to-png.mjs  (tüm posts/ altındaki HTML'ler)
 */

import puppeteer from "puppeteer";
import { readdir, stat } from "node:fs/promises";
import { resolve, extname, basename, dirname, join } from "node:path";

const VIEWPORT = { width: 1200, height: 628, deviceScaleFactor: 2 };

async function collectHtmlFiles(input) {
  const target = resolve(input);
  const info = await stat(target);

  if (info.isFile() && extname(target) === ".html") {
    return [target];
  }

  if (info.isDirectory()) {
    const entries = await readdir(target, { recursive: true });
    return entries
      .filter((e) => extname(e) === ".html")
      .map((e) => join(target, e));
  }

  return [];
}

async function convert(browser, htmlPath) {
  const page = await browser.newPage();
  await page.setViewport(VIEWPORT);

  const fileUrl = `file://${htmlPath}`;
  await page.goto(fileUrl, { waitUntil: "networkidle0", timeout: 15000 });

  const canvas = await page.$(".canvas");
  if (!canvas) {
    console.error(`  ✗ .canvas elementi bulunamadı: ${basename(htmlPath)}`);
    await page.close();
    return null;
  }

  const pngName = basename(htmlPath, ".html") + ".png";
  const pngPath = join(dirname(htmlPath), pngName);

  await canvas.screenshot({ path: pngPath, type: "png" });
  await page.close();

  return pngPath;
}

async function main() {
  const input = process.argv[2] || "linkedin/posts";
  const files = await collectHtmlFiles(resolve(input));

  if (files.length === 0) {
    console.log("HTML dosyası bulunamadı.");
    process.exit(1);
  }

  console.log(`\n${files.length} HTML dosyası bulundu.\n`);

  const browser = await puppeteer.launch({ headless: true });

  for (const file of files) {
    const shortPath = file.replace(resolve(".") + "/", "");
    process.stdout.write(`  → ${shortPath} ... `);

    const result = await convert(browser, file);
    if (result) {
      const outShort = result.replace(resolve(".") + "/", "");
      console.log(`✓ ${outShort}`);
    }
  }

  await browser.close();
  console.log("\nTamamlandı.\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
