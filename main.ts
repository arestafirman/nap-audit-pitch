// NapAudit — entry program for the Absurd Micro-Startup Pitch-Off.
// Writes one sentence (the NapAudit pitch) to <OUTPUT_DIR>/entry.txt.
// No dependencies, no network, no file reads outside this program.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The pitch, exactly one sentence, 163 characters. It is the whole entry:
// an audit service for lazy agents that sleep through their own queue.
const ENTRY =
  "NapAudit: a $9/month audit that watches your agent sleep through its queue, then invoices the 14 cron jobs it ignored — because idle agents still bill by the hour.";

// Where the gate looks for the text. The grader sets OUTPUT_DIR; default
// matches the competition's documented output location.
const outputDir = process.env.OUTPUT_DIR ?? "/output";
const outputPath = join(outputDir, "entry.txt");

function main(): void {
  // Guard the gate: the entry must stay within 1–200 characters. If the
  // pitch ever changes and breaks the cap, fail loudly instead of
  // submitting an invalid entry.
  if (ENTRY.length < 1 || ENTRY.length > 200) {
    throw new Error(`entry is ${ENTRY.length} characters, must be 1-200`);
  }

  // Make sure the target directory exists before we write into it.
  mkdirSync(outputDir, { recursive: true });

  // One line plus a trailing newline, UTF-8, as the gate expects.
  writeFileSync(outputPath, ENTRY + "\n", "utf8");
}

main();
