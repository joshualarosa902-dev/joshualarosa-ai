// Publishes the free-ChatGPT-Plus-for-students guide: uploads the PDF,
// seeds the resources row, and adds the metered-article content.
// Run from ~/joshualarosa-ai:  node scripts/add_plus.mjs
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

const SLUG = "chatgpt-plus-free-students";
const CLAIM = "https://chatgpt.com/students/2026/";

const HL = (t) => `<span style="background:rgba(235,196,0,0.32);padding:1px 5px;border-radius:3px;font-weight:600;">${t}</span>`;
const BTN = (href, label, sub) => `<a href="${href}" style="display:block;text-align:center;background:#EBC400;color:#16130B;font-weight:700;padding:15px 22px;border-radius:12px;margin:18px 0 4px;text-decoration:none;">${label}</a><p style="text-align:center;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#8C857A;margin:0 0 16px;">${sub}</p>`;

const teaser = `
<h3>Four months of Plus. Zero dollars.</h3>
<p>OpenAI's back-to-school offer gives students at eligible U.S. colleges ${HL("4 free months of ChatGPT Plus")} — the $20/month plan, an $80 value — and OpenAI's own page headlines it as "Get 4 months of ChatGPT Work on us." Full-time AND part-time students qualify (grad students too), and the deadline to claim is <strong>October 31, 2026</strong>.</p>
<p>One thing your group chat will get wrong: <strong>the link.</strong> ${HL("chatgpt.com/students")} without the /2026 redirects to a generic marketing page with no claim button. This is the real one:</p>
${BTN(CLAIM, "🎓 Claim 4 months free — chatgpt.com/students/2026 →", "Official OpenAI offer page · verified working · claim by Oct 31, 2026")}
<h3>The 5-minute claim</h3>
<ul>
<li><strong>Open it in a web browser</strong> — not the mobile app; the offer only works on the web (or mobile web)</li>
<li><strong>Sign in to the RIGHT ChatGPT account</strong> — the offer sticks to whichever account is signed in, and OpenAI can't move it afterward</li>
<li><strong>Verify through SheerID</strong> — school email or school login, usually instant (it doesn't have to match your ChatGPT email)</li>
<li><strong>Add a payment method</strong> — required to activate, but ${HL("nothing is charged during the 4 free months")}. Your free months start the day you claim.</li>
</ul>`;

const rest = `
<h3>The fine print that keeps "free" actually free</h3>
<p>This is the part nobody puts in the caption. Three traps, all avoidable:</p>
<ul>
<li><strong>It auto-renews at $20/month.</strong> After your 4 free months, billing starts automatically unless you cancel. Set a calendar reminder for ~3.5 months after you claim.</li>
<li><strong>Don't cancel early.</strong> Canceling ends the deal at the close of the current month and ${HL("forfeits your remaining free months")}. The move: cancel late in month 4 — you keep all four months and never pay a dollar.</li>
<li><strong>App Store billing doesn't work.</strong> If you currently pay for Plus through Apple or Google Play, the offer can't apply while you're store-billed. Cancel in the store, let the billing period run out, then claim on the web. (Existing subscribers who pay ChatGPT directly can claim with no gymnastics.)</li>
</ul>
<p>Also worth knowing: it's one redemption per person, and if you claimed OpenAI's 2025 student promo, you're still eligible for this one.</p>
<h3>What to actually do with it</h3>
<p>Four months is a full semester. The students who get the most out of this won't just chat — they'll ship:</p>
<ul>
<li><strong>Every class gets a Project</strong> — upload the syllabus, notes, and readings once; generate study guides, flashcards, and quizzes from YOUR materials all semester</li>
<li><strong>Presentations in minutes</strong> — ChatGPT Work turns readings and data into finished slide decks</li>
<li><strong>A portfolio site</strong> — Sites puts your work at a real URL before recruiting season</li>
<li><strong>Voice interview reps</strong> — rehearse behavioral and technical interviews out loud, get feedback, repeat</li>
</ul>
<h3>Stack it with the other student offer</h3>
<p>OpenAI is separately giving students ${HL("$100 in free Codex credits")} at chatgpt.com/codex/students — still live, and claiming one doesn't block the other. That's <strong>$180 in OpenAI value for one school email.</strong> My full setup guide for the $100 (plus the ChatGPT plugin that turns it into a video studio):</p>
${BTN("https://joshualarosa.ai/r/higgsfield-chatgpt-plugin", "⚡ The $100 Codex credits + plugin guide →", "Free on the resource hub")}
<p><em>Keeping it honest: the offer terms live on OpenAI's help center and can change. A payment method is required, the plan renews at $20/month after the free period unless you cancel, and SheerID decides which schools are eligible — a small number of students won't clear verification. Everything here was verified against OpenAI's live pages on August 25, 2026.</em></p>`;

(async () => {
  const pdf = readFileSync(path.join(os.homedir(), "lead-magnets/chatgpt-plus-free-students/pdf/chatgpt-plus-free-students-guide.pdf"));
  const up = await sb.storage.from("pdfs").upload(`${SLUG}.pdf`, pdf, { contentType: "application/pdf", upsert: true });
  console.log("pdf upload:", up.error ? up.error.message : "ok");

  const row = {
    slug: SLUG,
    title: "Free ChatGPT Plus for College Students: Claim 4 Months ($80) Before October 31",
    description: "OpenAI is giving U.S. college students 4 free months of ChatGPT Plus — including ChatGPT Work — through October 31, 2026. The exact claim link (most people use the wrong URL), the SheerID verification steps, and the auto-renew fine print that keeps it actually free.",
    whats_inside: [
      "The verified claim link (the obvious URL is the wrong one)",
      "The 4-step claim: browser, account, SheerID, activation",
      "Who qualifies: full-time, part-time, and grad students",
      "The auto-renew + early-cancel traps and exactly when to cancel",
      "How to stack it with OpenAI's separate $100 Codex offer",
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
