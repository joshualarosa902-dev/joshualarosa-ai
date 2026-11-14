// Publishes the OpenMAIC setup guide (comment CLASSROOM, Nov 2026 reel "failing a class"). PDF and page content are built by
// ~/lead-magnets/openmaic-ai-classroom-setup/build_openmaic.py (pdf/ + hub-<slug>.json).
// Run from ~/joshualarosa-ai:  node scripts/add_openmaic_classroom.mjs   (only after Joshua says to publish)
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

const SLUG = "openmaic-ai-classroom-setup";
const SRC = path.join(os.homedir(), "lead-magnets", SLUG);
const { teaser, rest } = JSON.parse(readFileSync(path.join(SRC, `hub-${SLUG}.json`), "utf8"));

(async () => {
  if (/[–—]/.test(teaser + rest)) throw new Error("no dashes in the guide");
  if (!teaser.includes("open.maic.chat") || !teaser.includes("github.com/THU-MAIC/OpenMAIC")) throw new Error("the reel promises the link: it must be in the free part");
  const pdf = readFileSync(path.join(SRC, "pdf", `${SLUG}.pdf`));
  const up = await sb.storage.from("pdfs").upload(`${SLUG}.pdf`, pdf, { contentType: "application/pdf", upsert: true });
  console.log("pdf upload:", up.error ? up.error.message : "ok");

  const row = {
    slug: SLUG,
    title: "Your own AI classroom. The OpenMAIC setup.",
    description: "The free, open source AI classroom from the video: an AI teacher, AI classmates and a quiz for whatever topic you're stuck on. The live demo steps, what to type, how to run it yourself with Claude, and what it really costs. Checked in November 2026.",
    whats_inside: [
      "The link and the 5 steps to your first lesson on the live demo",
      "What the demo really gives you for free",
      "Prompts that work, and five ways to use it this week",
      "How to run it yourself with a Claude key, line by line",
      "What it costs and what it won't do",
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
