// The Houseplant Out-of-Office — make.fun entry
// Writes one out-of-office auto-reply, as if a houseplant sent it,
// to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR when set).
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Out of office: I am a fern, last watered in March. Urgent or not, the correct response is to pour water on me.";

// The gate also caps the entry at 120 characters, so the program
// refuses to ship a line that would fail the sealed scorer, and it
// keeps the reply to a single line with no trailing newline.

// Gate from RULES.txt: entry.txt must be UTF-8 text of 1 to 120
// characters, and not only white space.
const chars = [...ENTRY].length;
if (chars < 1 || chars > 120) {
  throw new Error(`entry is ${chars} characters, gate needs 1-120`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only white space");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
console.log(`wrote entry.txt (${chars} characters)`);
