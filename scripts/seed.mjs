// Seeds the resources table + uploads placeholder PDFs to the private bucket.
// Run: node scripts/seed.mjs   (reads keys from .env.local)
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";

const env = Object.fromEntries(
  readFileSync(new URL("../.env.local", import.meta.url), "utf8")
    .split("\n").filter((l) => l.includes("=")).map((l) => {
      const i = l.indexOf("="); return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    })
);

const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

const RESOURCES = [
  { slug: "ai-hook-vault", title: "The AI hook vault", description: "50 openers that stop the scroll, pulled from my best-performing videos.", whats_inside: ["50 plug-and-play hooks", "The 6 hook patterns that go viral", "How to adapt any hook to your niche"], category: "Hooks", featured: true },
  { slug: "founder-story-formula", title: "Founder story formula", description: "The exact structure behind every viral founder story edit I make.", whats_inside: ["The 4-act story spine", "Where to put the emotional turn", "A fill-in-the-blank template"], category: "Storytelling", featured: true },
  { slug: "daily-content-engine", title: "Daily content engine", description: "The system I use to never run out of ideas, hooks, or scripts.", whats_inside: ["The idea capture workflow", "My AI prompt stack", "A weekly content calendar"], category: "Systems", featured: true },
  { slug: "viral-script-template", title: "Viral script template", description: "A short-form script skeleton that keeps retention high to the last frame.", whats_inside: ["Hook to tension to payoff structure", "Pacing and cut markers", "Two worked examples"], category: "Scripts", featured: false },
  { slug: "ai-tool-stack", title: "My AI tool stack", description: "Every tool I actually use to research, write, edit, and ship content.", whats_inside: ["The full stack by stage", "What each tool is for", "Free vs paid picks"], category: "Tools", featured: false },
  { slug: "cold-dm-playbook", title: "Brand deal DM playbook", description: "The messages and rates I use to land paid collabs as a creator.", whats_inside: ["Outreach and reply scripts", "How I price collabs", "Red flags to walk away from"], category: "Growth", featured: false },
];

function buildPdf(text) {
  const objs = [
    "<</Type/Catalog/Pages 2 0 R>>",
    "<</Type/Pages/Kids[3 0 R]/Count 1>>",
    "<</Type/Page/Parent 2 0 R/MediaBox[0 0 360 160]/Contents 4 0 R/Resources<</Font<</F1 5 0 R>>>>>>",
  ];
  const stream = `BT /F1 16 Tf 24 90 Td (${text}) Tj 0 -28 Td /F1 10 Tf (joshualarosa.ai - sample placeholder) Tj ET`;
  objs.push(`<</Length ${stream.length}>>\nstream\n${stream}\nendstream`);
  objs.push("<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>");
  let pdf = "%PDF-1.4\n";
  const offsets = [];
  objs.forEach((o, i) => { offsets.push(pdf.length); pdf += `${i + 1} 0 obj\n${o}\nendobj\n`; });
  const xrefPos = pdf.length;
  pdf += `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n`;
  offsets.forEach((off) => { pdf += String(off).padStart(10, "0") + " 00000 n \n"; });
  pdf += `trailer\n<</Size ${objs.length + 1}/Root 1 0 R>>\nstartxref\n${xrefPos}\n%%EOF`;
  return Buffer.from(pdf, "latin1");
}

(async () => {
  // sanity check the table exists
  const { error: probe } = await sb.from("resources").select("slug").limit(1);
  if (probe) { console.error("resources table not ready:", probe.message); process.exit(1); }

  for (const r of RESOURCES) {
    const pdf_path = `${r.slug}.pdf`;
    const up = await sb.storage.from("pdfs").upload(pdf_path, buildPdf(r.title), {
      contentType: "application/pdf", upsert: true,
    });
    const row = { ...r, pdf_path, cover_url: null, video_url: null, published: true };
    const { error } = await sb.from("resources").upsert(row, { onConflict: "slug" });
    console.log(r.slug, "->", error ? "ROW ERR: " + error.message : "row ok", up.error ? "PDF ERR: " + up.error.message : "pdf ok");
  }

  const { data, count } = await sb.from("resources").select("slug", { count: "exact" });
  console.log("total published rows:", count ?? data?.length);
})();
