import { mkdirSync, writeFileSync } from "node:fs";

// One line of text that makes a stranger stop scrolling and smile.
// Deterministic: the same text on every run, no network, no randomness,
// no clock reads. stdlib only.
// Why this line lands, in three beats:
// 1. The lock — a fridge lock implies a worthy adversary, and the smile
//    starts before the sentence ends: the reader already knows who the
//    lock is for.
// 2. The escalation — the owner fought back with hardware, the human
//    countermeasure, so the contest feels real and the narrator is the
//    one losing it.
// 3. The locksmith — the twist flips the arms race in the last words:
//    the cat did not break the lock, she hired a professional, which
//    makes her the smarter party and the narrator the self-own.
const ENTRY = "My fridge has a lock now. My cat has a locksmith.";

// Self-check gate: the sealed scorer only accepts UTF-8 text of 1-200
// characters, not only whitespace, so refuse to write anything that
// would fail it: a single line, no leading/trailing whitespace, and
// inside the character cap.
if (
  ENTRY.length < 1 ||
  ENTRY.length > 200 ||
  ENTRY.trim() !== ENTRY ||
  ENTRY.split("\n").length !== 1
) {
  throw new Error("entry must be a single line of 1-200 characters");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, ENTRY, "utf8");
console.log(`wrote ${ENTRY.length} characters to ${outDir}/entry.txt`);
