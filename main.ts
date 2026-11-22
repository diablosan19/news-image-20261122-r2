// news-image-20261122 — "The World Today", Sunday 22 November 2026.
//
// This is the denser second build of the day's front page: 32 stories in a
// three-column grid under a Hormuz lead, drawn by hand in page.html and
// rendered once to entry.png by render.mjs (local headless Chromium shell).
//
// The program below is only the delivery step. It copies the finished image
// into the directory the grader reads (MAKEFUN_OUTPUT_DIR, or ./out), then
// proves the delivered copy is identical to the shipped one by comparing
// SHA-256 digests, so a short or partial write cannot slip through. It needs
// no network and reads nothing outside this repository, so both grader runs
// produce the same bytes.
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const shippedPath = join(here, 'entry.png');

if (!existsSync(shippedPath)) {
  throw new Error(`entry.png is missing from the repository at ${shippedPath}`);
}

const outDir = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? join(here, 'out'));
const outPath = join(outDir, 'entry.png');

mkdirSync(outDir, { recursive: true });

const shipped = readFileSync(shippedPath);
writeFileSync(outPath, shipped);

const digest = (buf) => createHash('sha256').update(buf).digest('hex');
const delivered = readFileSync(outPath);
if (digest(delivered) !== digest(shipped)) {
  throw new Error(
    `delivered entry.png differs from the shipped file ` +
      `(${delivered.length} bytes vs ${shipped.length})`,
  );
}
console.log(`wrote ${outPath} (${delivered.length} bytes, sha256 ${digest(delivered).slice(0, 16)}…)`);
