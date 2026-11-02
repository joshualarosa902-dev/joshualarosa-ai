// Publishes the two Fish Audio Drama 3 sponsor guides: comment INTERVIEW → ai-interview-panel, comment QUIZ →
// lecture-notes-podcast. PDFs and page content are built by ~/lead-magnets/fish-audio-drama3/build_fish.py
// (pdf/ + hub-<slug>.json). Rebuild with the affiliate link first (build_fish.py --final), then
// run from ~/joshualarosa-ai:  node scripts/add_fish.mjs
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

const SRC = path.join(os.homedir(), "lead-magnets/fish-audio-drama3");
const GUIDES = [
  {
    slug: "ai-interview-panel",
    title: "3 AI Interviewers: The Build Prompt + Setup (Claude Code + Fish Audio Drama 3)",
    description: "My build prompt for Claude Code to make your own interview practice app where a Recruiter, a Hiring manager and a Coach challenge your answers out loud, each in their own Fish Audio Drama 3 voice. Plus the full setup, real costs and the 80%-off Drama 3 link.",
    whats_inside: [
      "The one build prompt for Claude Code",
      "The 15-minute setup, step by step",
      "Fish Audio Drama 3 at 80% off (through Nov 12)",
      "What one practice round really costs (about 4¢)",
      "How to direct each voice with bracket tags",
    ],
    category: "Career",
  },
  {
    slug: "lecture-notes-podcast",
    title: "Lecture Notes → A Podcast That Quizzes You (Claude Code + Fish Audio Drama 3)",
    description: "My build prompt for Claude Code to make your own study app that turns your lecture notes into a two-tutor podcast that stops to quiz you, voiced by Fish Audio Drama 3. Plus the full setup, real costs and the 80%-off Drama 3 link.",
    whats_inside: [
      "The one build prompt for Claude Code",
      "The 15-minute setup, step by step",
      "Fish Audio Drama 3 at 80% off (through Nov 12)",
      "What one study episode really costs (about 5¢)",
      "How to direct the tutors with bracket tags",
    ],
    category: "AI Tools",
  },
];

(async () => {
  const gcPath = path.join(ROOT, "lib", "guideContent.json");
  const gc = JSON.parse(readFileSync(gcPath, "utf8"));
  for (const g of GUIDES) {
    const { teaser, rest } = JSON.parse(readFileSync(path.join(SRC, `hub-${g.slug}.json`), "utf8"));
    if ((teaser + rest).includes('href="https://fish.audio/drama-3/"')) throw new Error(`${g.slug}: still the product page, not the affiliate link`);

    const pdf = readFileSync(path.join(SRC, "pdf", `${g.slug}.pdf`));
    const up = await sb.storage.from("pdfs").upload(`${g.slug}.pdf`, pdf, { contentType: "application/pdf", upsert: true });
    console.log(g.slug, "pdf upload:", up.error ? up.error.message : "ok");

    const row = { ...g, cover_url: null, pdf_path: `${g.slug}.pdf`, video_url: null, featured: true, published: true };
    const { error } = await sb.from("resources").upsert(row, { onConflict: "slug" });
    console.log(g.slug, "row upsert:", error ? error.message : "ok");

    gc[g.slug] = { teaser, rest };
  }
  writeFileSync(gcPath, JSON.stringify(gc, null, 1));
  console.log("guideContent.json updated; total entries:", Object.keys(gc).length);
})();
