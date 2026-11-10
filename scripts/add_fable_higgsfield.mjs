// Publishes the Fable 5.2 × Higgsfield setup guide (comment FABLE): connecting the Higgsfield MCP to Claude, starter
// prompts and what the free trial really is. PDF and page content are built by
// ~/lead-magnets/higgsfield-fable-claude/build_fable.py (pdf/ + hub-<slug>.json).
// Run from ~/joshualarosa-ai:  node scripts/add_fable_higgsfield.mjs
import { createClient } from "@supabase/supabase-js";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import os from "node:os";

const ROOT = path.resolve(import.meta.dirname, "..");
const env = Object.fromEntries(
  readFileSync(path.join(ROOT, ".env.local"), "utf8").split("\n").filter((l) => l.includes("="))
    .map((l) => { const i = l.indexOf("="); return [l.slice(0, i).trim(), l.slice(i + 1).trim()]; })
);
const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

const SLUG = "higgsfield-fable-claude-setup";
const SRC = path.join(os.homedir(), "lead-magnets/higgsfield-fable-claude");
const { teaser, rest } = JSON.parse(readFileSync(path.join(SRC, `hub-${SLUG}.json`), "utf8"));

(async () => {
  if (!(teaser + rest).includes("yLfFTI")) throw new Error("the guide must use the UTM link");
  const pdf = readFileSync(path.join(SRC, "pdf", `${SLUG}.pdf`));
  const up = await sb.storage.from("pdfs").upload(`${SLUG}.pdf`, pdf, { contentType: "application/pdf", upsert: true });
  console.log("pdf upload:", up.error ? up.error.message : "ok");

  const row = {
    slug: SLUG,
    title: "AI Video Inside Claude: The Fable 5.2 × Higgsfield Setup",
    description: "How to connect Higgsfield to Claude with Fable 5.2 and make AI videos by describing them. The 5-step setup with the server URL, six prompts you can copy, what Higgsfield says is possible, and what the 3-day free trial really is.",
    whats_inside: [
      "The 5-step setup in Claude, with the server URL",
      "6 starter prompts you can copy",
      "What Higgsfield says you can make with Fable 5.2",
      "Tips, fixes and the one-line Claude Code setup",
      "The 3-day free trial for new users, and how to cancel it",
    ],
    category: "AI Tools",
    cover_url: null, pdf_path: `${SLUG}.pdf`, video_url: null, featured: true, published: true,
  };
  const { error } = await sb.from("resources").upsert(row, { onConflict: "slug" });
  console.log("row upsert:", error ? error.message : "ok");

  const gcPath = path.join(ROOT, "lib", "guideContent.json");
  const gc = JSON.parse(readFileSync(gcPath, "utf8"));
  gc[SLUG] = { teaser, rest };
  writeFileSync(gcPath, JSON.stringify(gc, null, 1));
  console.log("guideContent.json updated; total entries:", Object.keys(gc).length);
})();
