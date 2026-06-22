import pw from '/Users/leventusta/Desktop/servicecore/website/node_modules/playwright/index.js';
const { chromium } = pw;
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const target = process.argv[2] || 'post';
const size = Number(process.argv[3] || 1200);

const browser = await chromium.launch();
const page = await browser.newPage({ deviceScaleFactor: 2 });
await page.setViewportSize({ width: size, height: size });
await page.goto(pathToFileURL(path.join(dir, target + '.html')).href, { waitUntil: 'networkidle' });
try { await page.evaluate(() => document.fonts.ready); } catch {}
await page.waitForTimeout(400);
const el = await page.$('.card');
await el.screenshot({ path: path.join(dir, target + '.png') });
await browser.close();
console.log('rendered', target + '.png', size + 'x' + size);
