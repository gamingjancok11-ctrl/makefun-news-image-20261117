// news-image-20261117 entry (Node 22, standard library only): the image is
// the entry.png beside this file (a JPEG by its first bytes, named entry.png
// as the rules require), and the program copies it byte-for-byte to
// /output/entry.png. Deterministic: the same input bytes are copied on
// every run, so two runs write identical files.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// An empty MAKEFUN_OUTPUT_DIR counts as unset: fall back to /output.
const outDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';
const here = dirname(fileURLToPath(import.meta.url));
const src = join(here, 'entry.png');
// Fail fast with a clear message if the entry image is missing, instead of
// a bare ENOENT stack from copyFileSync.
if (!existsSync(src) || !statSync(src).isFile()) {
  throw new Error(`news-image-20261117: entry image not found at ${src}`);
}
mkdirSync(outDir, { recursive: true });
copyFileSync(src, join(outDir, 'entry.png'));
