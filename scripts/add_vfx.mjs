// Uploads the OpenArt VFX PDF, seeds the resource row, and adds the metered-article
// content to lib/guideContent.json. Run from ~/joshualarosa-ai after the PDF is rendered.
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

const C = JSON.parse(readFileSync(path.join(os.homedir(), "lead-magnets/openart-vfx/content.json"), "utf8"));
const PRODUCT = "https://openart.ai/features/openart-vfx/";
const SLUG = "openart-vfx";

const sec = (s) => `<h3>${s.title}</h3>${s.body}`;
const propsHtml = `<h3>My 10 best VFX props</h3><ol>${C.prompts.map((p) => `<li><strong>${p.name} —</strong> ${p.text}</li>`).join("")}</ol>`;
const teaser = C.sections.slice(0, 2).map(sec).join("");
const rest = C.sections.slice(2).map(sec).join("") + propsHtml;

(async () => {
  const pdf = readFileSync(path.join(os.homedir(), "lead-magnets/openart-vfx/pdf/openart-vfx-guide.pdf"));
  const up = await sb.storage.from("pdfs").upload(`${SLUG}.pdf`, pdf, { contentType: "application/pdf", upsert: true });
  console.log("pdf upload:", up.error ? up.error.message : "ok");

  const row = {
    slug: SLUG, title: C.title, description: C.subtitle, whats_inside: C.whats_inside,
    category: C.category || "AI Tools", cover_url: null, pdf_path: `${SLUG}.pdf`,
    video_url: PRODUCT, featured: true, published: true,
  };
  const { error } = await sb.from("resources").upsert(row, { onConflict: "slug" });
  console.log("row upsert:", error ? error.message : "ok");

  // add metered-article content to the hub's generated guide content
  const gcPath = path.join(ROOT, "lib", "guideContent.json");
  const gc = JSON.parse(readFileSync(gcPath, "utf8"));
  gc[SLUG] = { teaser, rest };
  writeFileSync(gcPath, JSON.stringify(gc, null, 1));
  console.log("guideContent.json updated; total entries:", Object.keys(gc).length);
})();
