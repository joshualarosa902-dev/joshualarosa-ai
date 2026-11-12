// Publishes the free AI certificates guide (comment RESUME, Nov 2026 reel): the five from the reel plus the "20 plus
// more" he promises in it, each read on the provider's own page on Nov 12, 2026. PDF and page content are built by
// ~/lead-magnets/free-ai-certificates-resume/build_certs.py (pdf/ + hub-<slug>.json).
// Run from ~/joshualarosa-ai:  node scripts/add_ai_certificates.mjs
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

const SLUG = "free-ai-certificates-resume";
const SRC = path.join(os.homedir(), "lead-magnets/free-ai-certificates-resume");
const { teaser, rest, n, n_more } = JSON.parse(readFileSync(path.join(SRC, `hub-${SLUG}.json`), "utf8"));

(async () => {
  if (!(n >= 25 && n_more >= 20)) throw new Error(`the reel promises the 5 plus 20 or more; the guide has ${n} (${n_more} more)`);
  if (/[–—]/.test(teaser + rest)) throw new Error("no dashes in the guide");
  if ((teaser + rest).includes("skilljar")) throw new Error("the old Anthropic course site closes in December 2026: no skilljar links");
  const pdf = readFileSync(path.join(SRC, "pdf", `${SLUG}.pdf`));
  const up = await sb.storage.from("pdfs").upload(`${SLUG}.pdf`, pdf, { contentType: "application/pdf", upsert: true });
  console.log("pdf upload:", up.error ? up.error.message : "ok");

  const row = {
    slug: SLUG,
    title: `${n} free AI certificates. Every one checked.`,
    description: `The 5 from the video plus ${n_more} more certificates and badges you can earn for $0, from OpenAI, Google, Anthropic, Microsoft, IBM and more. What you get, how long it takes and the catch on every one. Each page checked in November 2026.`,
    whats_inside: [
      "The 5 from the video, with the official links",
      `${n_more} more, grouped by what you want to prove`,
      "What you earn, how long it takes and the catch on each",
      "The ones that look free and aren't, with prices",
      "Three resume stacks you can copy",
    ],
    category: "Career",
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
