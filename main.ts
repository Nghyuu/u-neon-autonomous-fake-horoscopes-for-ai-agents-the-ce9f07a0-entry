import { readFileSync, writeFileSync, mkdirSync, chmodSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const text = readFileSync(join(here, "entry.txt"), "utf8");
// Gate: the horoscope must be 1-200 characters of non-whitespace text.
const chars = [...text.replace(/\n$/, "")];
if (chars.length < 1 || chars.length > 200 || text.trim().length === 0) {
  throw new Error(`entry.txt must hold 1-200 characters, got ${chars.length}`);
}
const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, text, "utf8");
chmodSync(outPath, 0o644);
