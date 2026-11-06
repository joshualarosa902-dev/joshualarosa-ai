// Publishes the Higgsfield MCP × Claude guide (comment CLAUDE): the setup and the seven effect commands. PDF and page
// content are built by ~/lead-magnets/higgsfield-claude-commands/build_hf.py (pdf/ + hub-<slug>.json).
// Run from ~/joshualarosa-ai:  node scripts/add_higgsfield_commands.mjs
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

const SLUG = "higgsfield-commands-claude";
const SRC = path.join(os.homedir(), "lead-magnets/higgsfield-claude-commands");
const { teaser, rest } = JSON.parse(readFileSync(path.join(SRC, `hub-${SLUG}.json`), "utf8"));

(async () => {
  if (!(teaser + rest).includes("JJfYIW")) throw new Error("the guide must use the UTM link");
  const pdf = readFileSync(path.join(SRC, "pdf", `${SLUG}.pdf`));
  const up = await sb.storage.from("pdfs").upload(`${SLUG}.pdf`, pdf, { contentType: "application/pdf", upsert: true });
  console.log("pdf upload:", up.error ? up.error.message : "ok");

  const row = {
    slug: SLUG,
    title: "One Command in Claude, Your Video Edited: The Higgsfield Command List + Setup",
    description: "The full setup for the Higgsfield MCP in Claude and seven effects you run by typing one command on a clip of you talking: /tier-list, /text-behind, /freeze-frame, /over-the-shoulder, /glass-graph, /captions and /grade-wipe. Copy-ready lines, filming tips and what it really cost me.",
    whats_inside: [
      "The 4-step setup in Claude, with the server URL",
      "All 7 commands with a copy-ready line for each",
      "What to say on camera for each effect",
      "What it really cost me (2 credits for 2 clips)",
      "A 3-day free trial for new users",
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
