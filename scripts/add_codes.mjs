// Publishes the "100 AI Video Codes" guide (comment FLOW): one photo → ChatGPT storyboard → Google Flow video, plus 100
// original codes. PDF and page content are built by ~/lead-magnets/ai-video-codes/build_codes.py (pdf/ + hub.json).
// Run from ~/joshualarosa-ai:  node scripts/add_codes.mjs
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

const SLUG = "ai-video-codes";
const SRC = path.join(os.homedir(), "lead-magnets/ai-video-codes");
const { teaser, rest } = JSON.parse(readFileSync(path.join(SRC, "hub.json"), "utf8"));

(async () => {
  const pdf = readFileSync(path.join(SRC, "pdf/ai-video-codes.pdf"));
  const up = await sb.storage.from("pdfs").upload(`${SLUG}.pdf`, pdf, { contentType: "application/pdf", upsert: true });
  console.log("pdf upload:", up.error ? up.error.message : "ok");

  const row = {
    slug: SLUG,
    title: "100 AI Video Codes: One Photo → ChatGPT Storyboard → Google Flow Cinematic Video",
    description: "The exact two prompts behind my cinematic AI edit (ChatGPT makes a one-cut-per-second storyboard from your photo, Google Flow turns it into the video), plus 100 copy-paste codes: storyboard prompts, edit effects, camera moves, lighting, film looks, color grades and Flow prompts.",
    whats_inside: [
      "My exact ChatGPT and Google Flow prompts",
      "10 storyboard prompts to paste with your photo",
      "15 edit effects (punch-in, paper rip, ghost trail, film burn…)",
      "Framing, camera moves, lighting, film looks, grades, settings, pace",
      "8 Flow prompts and how to stack codes",
    ],
    category: "AI Tools",
    cover_url: null,
    pdf_path: `${SLUG}.pdf`,
    video_url: null,
    featured: true,
    published: true,
  };
  const { error } = await sb.from("resources").upsert(row, { onConflict: "slug" });
  console.log("row upsert:", error ? error.message : "ok");

  const gcPath = path.join(ROOT, "lib", "guideContent.json");
  const gc = JSON.parse(readFileSync(gcPath, "utf8"));
  gc[SLUG] = { teaser, rest };
  writeFileSync(gcPath, JSON.stringify(gc, null, 1));
  console.log("guideContent.json updated; total entries:", Object.keys(gc).length);
})();
