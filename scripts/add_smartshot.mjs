import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import path from "node:path";
import os from "node:os";

const ROOT = path.resolve(import.meta.dirname, "..");
const env = Object.fromEntries(
  readFileSync(path.join(ROOT, ".env.local"), "utf8").split("\n").filter((l) => l.includes("="))
    .map((l) => { const i = l.indexOf("="); return [l.slice(0, i).trim(), l.slice(i + 1).trim()]; })
);
const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

const pdf = readFileSync(path.join(os.homedir(), "lead-magnets/smart-shot-openart/pdf/smart-shot-openart-guide.pdf"));

const row = {
  slug: "smart-shot-openart",
  title: "Smart Shot: stop prompting, start directing",
  description: "How to direct cinematic AI video with OpenArt's Smart Shot (GPT Image 2 + Seedance 2.0) — plus my 10 best prompts.",
  whats_inside: [
    "What Smart Shot is and why it directs instead of guessing",
    "The full Shot Plan: character sheets, floor plan, storyboard, lenses, lighting",
    "How to go from one sentence to a finished scene",
    "10 paste-ready cinematic prompts",
  ],
  category: "AI Tools",
  cover_url: null,
  pdf_path: "smart-shot-openart.pdf",
  video_url: "https://openart.ai/features/smart-shot/",
  featured: true,
  published: true,
};

(async () => {
  const up = await sb.storage.from("pdfs").upload(row.pdf_path, pdf, { contentType: "application/pdf", upsert: true });
  console.log("pdf upload:", up.error ? up.error.message : "ok");
  const { error } = await sb.from("resources").upsert(row, { onConflict: "slug" });
  console.log("row upsert:", error ? error.message : "ok");
  const { count } = await sb.from("resources").select("slug", { count: "exact", head: true });
  console.log("total resources:", count);
})();
