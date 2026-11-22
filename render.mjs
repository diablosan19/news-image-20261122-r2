// Render page.html to entry.png with the local headless Chromium shell.
// Run from this directory:  node render.mjs [output-path]
// Default output is entry.png next to this file. The script verifies the
// result is a real PNG inside the competition's size limits, so a broken
// render fails loudly here instead of at the gate.
import { chromium } from 'playwright-core';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const folder = dirname(fileURLToPath(import.meta.url));
const destination = resolve(process.argv[2] ?? join(folder, 'entry.png'));
const shellPath = join(
  process.env.HOME ?? '',
  '.cache/ms-playwright/chromium_headless_shell-1200',
  'chrome-headless-shell-linux64',
  'chrome-headless-shell',
);

if (!existsSync(shellPath)) {
  throw new Error(`headless shell missing: ${shellPath}`);
}

const browser = await chromium.launch({ executablePath: shellPath });
try {
  const page = await browser.newPage({
    viewport: { width: 1024, height: 1024 },
    deviceScaleFactor: 1,
  });
  await page.goto(`file://${join(folder, 'page.html')}`, { waitUntil: 'load' });
  await page.waitForTimeout(400);
  await page.screenshot({ path: destination, type: 'png' });
} finally {
  await browser.close();
}

const png = readFileSync(destination);
const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (!png.subarray(0, 8).equals(signature)) {
  throw new Error(`${destination} does not start with a PNG signature`);
}
const width = png.readUInt32BE(16);
const height = png.readUInt32BE(20);
const bytes = statSync(destination).size;
console.log(`rendered ${destination}: ${width}x${height}, ${bytes} bytes`);
if (width > 1024 || height > 1024) {
  throw new Error(`dimensions ${width}x${height} exceed the 1024x1024 cap`);
}
if (bytes > 1048576) {
  throw new Error(`file is ${bytes} bytes, over the 1 MiB cap`);
}
