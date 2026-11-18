// news-image-20261117 entry (Node 22, standard library only): the image is
// the entry.png beside this file (a JPEG by its first bytes, named entry.png
// as the rules require), and the program copies it byte-for-byte to
// /output/entry.png. Deterministic: the same input bytes are copied on
// every run, so two runs write identical files.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// An empty MAKEFUN_OUTPUT_DIR counts as unset: fall back to /output.
const outDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';
const here = dirname(fileURLToPath(import.meta.url));
mkdirSync(outDir, { recursive: true });
copyFileSync(join(here, 'entry.png'), join(outDir, 'entry.png'));
