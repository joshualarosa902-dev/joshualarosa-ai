// Rebrand + render all lead magnets, upload to Supabase, seed resource rows.
// Run: node scripts/batch_rebrand.mjs   (reads keys from .env.local)
import { createClient } from "@supabase/supabase-js";
import { readFileSync, mkdirSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import os from "node:os";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const HOME = os.homedir();
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const REBRAND_DIR = path.join(ROOT, "rebrand");
mkdirSync(REBRAND_DIR, { recursive: true });

const env = Object.fromEntries(
  readFileSync(path.join(ROOT, ".env.local"), "utf8")
    .split("\n").filter((l) => l.includes("=")).map((l) => {
      const i = l.indexOf("="); return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    })
);
const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

const CATEGORY = {
  "llm-council": "Claude", "top-4-claude-skills": "Claude", "stop-slop": "Claude",
  "5-claude-skills-for-beginners": "Claude", "claude-code-hidden-features": "Claude",
  "claude-higgsfield-video-pipeline": "Claude", "claude-code-blotato-social-automation": "Claude",
  "claude-workout-coach": "Claude", "top-25-claude-skills-2026": "Claude",
  "ai-second-brain-students": "AI Tools", "intern-stack": "AI Tools", "build-your-ai-stack": "AI Tools",
  "14-ai-tools-every-student-needs": "AI Tools", "5-ai-design-tools": "AI Tools",
  "20-ai-agents-viral-launch-videos": "Marketing", "5-free-marketing-resources": "Marketing",
  "5-free-ai-marketing-tools": "Marketing", "top-5-free-marketing-certifications": "Marketing",
  "polsia-side-hustle-playbook": "Make Money", "ai-ugc-agency-playbook": "Make Money",
  "startup-accelerators-2026": "Make Money", "5-free-tools-to-make-10k": "Make Money",
  "yc-500k-startups-summer-2026": "Make Money", "1k-websites-for-local-businesses": "Make Money",
  "free-student-tools": "Students & Career", "5-free-certifications-before-graduation": "Students & Career",
  "top-5-student-certifications": "Students & Career", "4-free-resume-project-resources": "Students & Career",
  "5-free-ai-courses-before-graduation": "Students & Career", "5-free-subscriptions-before-finals": "Students & Career",
  "harvard-ai-agent-manager-2026": "Students & Career", "top-5-free-ai-internships": "Students & Career",
  "chatgpt-secret-codes": "ChatGPT", "chatgpt-codes-for-students": "ChatGPT", "chatgpt-prompts-get-hired": "ChatGPT",
};
const FEATURED = new Set(["top-25-claude-skills-2026", "chatgpt-prompts-get-hired", "polsia-side-hustle-playbook"]);
const PLACEHOLDERS = ["ai-hook-vault", "founder-story-formula", "daily-content-engine", "viral-script-template", "ai-tool-stack", "cold-dm-playbook"];

const registry = JSON.parse(readFileSync(path.join(HOME, "lead-magnets/lead-magnets.json"), "utf8"));
const magnets = registry.lead_magnets;

const rows = [];
let ok = 0, skipped = [];

for (const m of magnets) {
  const slug = m.slug;
  const htmlSrc = (m.html_path || "").replace(/^~/, HOME);
  if (!htmlSrc || !existsSync(htmlSrc)) { skipped.push(`${slug} (no html)`); continue; }
  const outHtml = path.join(REBRAND_DIR, `${slug}.html`);
  const outPdf = path.join(REBRAND_DIR, `${slug}.pdf`);
  try {
    execFileSync("python3", [path.join(ROOT, "scripts/rebrand_magnet.py"), htmlSrc, outHtml], { stdio: "ignore" });
    execFileSync(CHROME, ["--headless=new", "--disable-gpu", "--no-pdf-header-footer",
      "--run-all-compositor-stages-before-draw", "--virtual-time-budget=9000",
      `--print-to-pdf=${outPdf}`, `file://${outHtml}`], { stdio: "ignore" });
    const buf = readFileSync(outPdf);
    const up = await sb.storage.from("pdfs").upload(`${slug}.pdf`, buf, { contentType: "application/pdf", upsert: true });
    if (up.error) { skipped.push(`${slug} (upload: ${up.error.message})`); continue; }
    rows.push({
      slug, title: m.topic || slug, description: m.subtitle || "", whats_inside: [],
      category: CATEGORY[slug] || "AI Tools", cover_url: null, pdf_path: `${slug}.pdf`,
      video_url: m.deployed_url || null, featured: FEATURED.has(slug), published: true,
    });
    ok++;
    console.log(`✓ ${slug}  [${CATEGORY[slug] || "AI Tools"}]  ${(buf.length/1024).toFixed(0)}kb`);
  } catch (e) {
    skipped.push(`${slug} (${String(e.message).slice(0, 60)})`);
  }
}

// remove placeholders (rows + files), then upsert all real resources
await sb.from("resources").delete().in("slug", PLACEHOLDERS);
await sb.storage.from("pdfs").remove(PLACEHOLDERS.map((s) => `${s}.pdf`));
const { error: upErr } = await sb.from("resources").upsert(rows, { onConflict: "slug" });

const { count } = await sb.from("resources").select("slug", { count: "exact", head: true });
console.log(`\nrendered+uploaded: ${ok}`);
if (skipped.length) console.log("skipped:", skipped.join(", "));
console.log("upsert:", upErr ? upErr.message : "ok");
console.log("total resources in db:", count);
