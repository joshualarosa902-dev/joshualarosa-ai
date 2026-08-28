// Publishes the free Google AI Pro for students guide.
// Run from ~/joshualarosa-ai:  node scripts/add_google.mjs
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

const SLUG = "google-ai-pro-free-students";
const CLAIM = "https://one.google.com/ai-student";

const HL = (t) => `<span style="background:rgba(235,196,0,0.32);padding:1px 5px;border-radius:3px;font-weight:600;">${t}</span>`;
const BTN = (href, label, sub) => `<a href="${href}" style="display:block;text-align:center;background:#EBC400;color:#16130B;font-weight:700;padding:15px 22px;border-radius:12px;margin:18px 0 4px;text-decoration:none;">${label}</a><p style="text-align:center;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#8C857A;margin:0 0 16px;">${sub}</p>`;

const teaser = `
<h3>Twelve months of Google AI Pro. Zero dollars.</h3>
<p>Google's student offer is back for 2026: ${HL("a full year of Google AI Pro free")} — the $19.99/month plan, about $240 of value — for U.S. college students, redeemable until <strong>December 31, 2026</strong>. What that unlocks:</p>
<ul>
<li><strong>Gemini Spark</strong> — Google's 24/7 personal AI agent that keeps working while your laptop is closed. Normally an Ultra-tier feature.</li>
<li><strong>4x higher Gemini limits</strong> — plus Gemini inside Gmail and Docs</li>
<li><strong>5 TB of storage</strong> — across Drive, Gmail, and Photos</li>
<li><strong>Study notebooks</strong> — upload syllabi and lecture notes; Gemini builds personalized lessons, quizzes, and even your calendar from the syllabus</li>
<li><strong>Google Health Premium</strong> — the bonus perk nobody mentions</li>
</ul>
<p>One catch your group chat will get wrong: ${HL("gemini.google.com/students")} just opens the Gemini app. The actual claim flow lives here:</p>
${BTN(CLAIM, "✨ Claim 12 months free — one.google.com/ai-student →", "Official Google claim flow · verified working · redeem by Dec 31, 2026")}`;

const rest = `
<h3>The 4-step claim</h3>
<ul>
<li><strong>Sign in with a PERSONAL Google account</strong> — school-issued Workspace for Education accounts can't claim yet (Google says support is "rolling out in coming weeks")</li>
<li><strong>Verify through SheerID</strong> — school email or enrollment docs, usually instant</li>
<li><strong>Add a payment method</strong> — required to activate, but ${HL("nothing is charged during the 12 months")}</li>
<li><strong>Done</strong> — Spark, notebooks, and the 5 TB land immediately. Your year starts the day you claim.</li>
</ul>
<p>Eligibility: college students 18+. Already claimed the 2025 version? Google's FAQ says you can qualify again — verification just runs yearly.</p>
<h3>The fine print that keeps "free" actually free</h3>
<ul>
<li><strong>It auto-charges $19.99/month after the year.</strong> Set a calendar reminder for ~11 months after you claim. (Google's terms say a cancelled plan "may remain active" through the free year — likely, but "may" isn't a promise; the reminder is the guaranteed play.)</li>
<li><strong>Wrong billing = locked out.</strong> Google One family plans, Google Fi, Pixel bundles, and app-store billing are excluded — switch billing first.</li>
<li><strong>Don't fill all 5 TB.</strong> If you go over your normal quota and later cancel, uploads freeze across Gmail/Drive/Photos until you delete files or pay.</li>
</ul>
<h3>International students: read this before commenting "it doesn't work"</h3>
<p>The offer exists in <strong>140+ countries</strong>, but it's a different plan outside the U.S.: ${HL("Google AI Plus free for a year")} — 2x limits (not 4x), 400 GB (not 5 TB), no Spark — renewing around $4.99/month local equivalent. Same claim link, same SheerID check. And six countries get no student offer at all: <strong>Canada</strong>, Albania, Bolivia, Hong Kong, Macau, Tunisia.</p>
<h3>Stack it with the OpenAI offers</h3>
<p>Google's $240 + OpenAI's 4 free months of ChatGPT Plus + $100 in Codex credits = ${HL("roughly $400 in free AI")} for one school email this semester:</p>
${BTN("https://joshualarosa.ai/r/chatgpt-plus-free-students", "🎓 The free ChatGPT Plus claim guide →", "Free on the resource hub · claim by Oct 31")}
<p><em>Keeping it honest: a card is required at sign-up, the plan renews at $19.99/month unless you cancel, and SheerID decides eligibility. Everything here was verified against Google's live offer terms and blog on August 28, 2026.</em></p>`;

(async () => {
  const pdf = readFileSync(path.join(os.homedir(), "lead-magnets/google-ai-pro-students/pdf/google-ai-pro-free-students-guide.pdf"));
  const up = await sb.storage.from("pdfs").upload(`${SLUG}.pdf`, pdf, { contentType: "application/pdf", upsert: true });
  console.log("pdf upload:", up.error ? up.error.message : "ok");

  const row = {
    slug: SLUG,
    title: "Free Google AI Pro for College Students: Claim 12 Months ($240) Before December 31",
    description: "Google is giving U.S. college students a full year of AI Pro free — Gemini Spark, 4x limits, 5 TB — through December 31, 2026. The real claim link (the obvious URL just opens the app), the SheerID steps, what international students actually get, and the auto-renew fine print.",
    whats_inside: [
      "The verified claim link (the obvious URL is the wrong one)",
      "The 4-step claim: personal account, SheerID, activation",
      "What's inside: Gemini Spark, 5 TB, study notebooks, Health Premium",
      "The auto-renew, billing, and storage traps to avoid",
      "The international version (AI Plus) and who's excluded entirely",
    ],
    category: "AI Tools",
    cover_url: null,
    pdf_path: `${SLUG}.pdf`,
    video_url: CLAIM,
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
