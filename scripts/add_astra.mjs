// Publishes the GPT-6 Astra student guide.
// Run from ~/joshualarosa-ai:  node scripts/add_astra.mjs
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

const SLUG = "gpt-6-astra-free-students";
const CLAIM = "https://chatgpt.com/students/2026/";
const UTM = "https://higgsfield.ai/s/higgsfield-plugin-in-chatgpt-ig-joshualarosa.ai-upuioD";

const HL = (t) => `<span style="background:rgba(235,196,0,0.32);padding:1px 5px;border-radius:3px;font-weight:600;">${t}</span>`;
const BTN = (href, label, sub) => `<a href="${href}" style="display:block;text-align:center;background:#EBC400;color:#16130B;font-weight:700;padding:15px 22px;border-radius:12px;margin:18px 0 4px;text-decoration:none;">${label}</a><p style="text-align:center;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#8C857A;margin:0 0 16px;">${sub}</p>`;
const DARK = (label, text) => `<pre style="white-space:pre-wrap;background:#16130B;color:#F4F1EA;border:1px solid rgba(235,196,0,0.5);border-radius:10px;padding:18px 20px;font-size:14px;line-height:1.6;overflow:auto;font-family:ui-monospace,Menlo,monospace;"><strong style="color:#EBC400;display:block;margin-bottom:10px;letter-spacing:.18em;font-size:11px;">${label}</strong>${text}</pre>`;

const LESSON = `I've attached my notes on [CONCEPT]. Create a 60-second faceless explainer video that teaches it visually: open with the one-sentence intuition, build the idea step by step with clean motion graphics and labeled diagrams, show one concrete example, and end with a 3-question recap. Narrated, 9:16 vertical, calm pacing, high-contrast text readable on a phone.`;
const HAND = `Using Blender, build a 3D humanoid robot hand: articulated fingers with visible joints, servo housings, and cable channels. Then create an exploded-view version with every component separated along its assembly axis, each part labeled. Export renders of both views plus the project file — this is for my engineering portfolio, so prioritize clean topology and realistic proportions over speed.`;

const teaser = `
<h3>OpenAI's new flagship — and the $0 way to touch it</h3>
<p><strong>GPT-6 Astra</strong> launched September 3, and the benchmark from the video is real: it ${HL("saturates ARC-AGI-3 at 99.9%")} on OpenAI's harness — and even on ARC Prize's neutral leaderboard it roughly <strong>doubles</strong> the next-best frontier model, hitting human parity. ARC Prize called it "the best model we've ever tested."</p>
<p>The free play: OpenAI's student offer — ${HL("4 free months of ChatGPT Plus")}, claim by <strong>October 31, 2026</strong> — and on Plus, Astra runs inside <strong>ChatGPT Work and Codex</strong> (the build-things modes; the regular-chat version, GPT-6 Pro, costs $100-200/month). Metered access to a $100/month model for $0.</p>
${BTN(CLAIM, "🎓 Claim 4 months free — chatgpt.com/students/2026 →", "Official OpenAI student offer · claim by Oct 31, 2026 · full + part-time eligible")}
<p>The claim takes five minutes: open it in a web browser (not the app), sign in to the right ChatGPT account, verify through SheerID, add a payment method. Nothing is charged during the 4 months.</p>`;

const rest = `
<h3>Keep it free</h3>
<p>After the 4 months it ${HL("auto-renews at $20/month")} unless you cancel — and canceling early forfeits your remaining free months, so the move is canceling late in month 4. One redemption per student, US degree-granting schools, and it's a claim-and-verify flow — no application essays.</p>
<h3>The three plays (honestly labeled)</h3>
<ul>
<li><strong>1 — Notes into study games (ChatGPT, built in).</strong> Interactive quizzes and flashcards from your uploads are a native ChatGPT feature — photograph the notes, ask for a quiz game. No plugin needed.</li>
<li><strong>2 — Concepts into visual lessons (Higgsfield plugin).</strong> The plugin's marquee feature: narrated faceless explainer videos. One confusing concept in, a 60-second lesson out.</li>
<li><strong>3 — The portfolio piece (Astra in ChatGPT Work).</strong> Astra drives real software — OpenAI's own launch demo shows it modeling in Blender. That's your robot hand.</li>
</ul>
${BTN(UTM, "⚡ Set up the Higgsfield plugin →", "ChatGPT → Plugins → search Higgsfield → Add · requires a Higgsfield account")}
<p>Straight up: Higgsfield is a ${HL("paid tool")} — generations cost credits, and the free student offer covers ChatGPT only. Plays 1 and 3 cost you nothing.</p>
<h3>The prompts</h3>
${DARK("THE VISUAL LESSON — HIGGSFIELD PLUGIN", LESSON)}
${DARK("THE ROBOT HAND — ASTRA IN CHATGPT WORK", HAND)}
<p>One efficiency note: Astra burns its usage allowance faster than older models (roughly 5-45 messages per 5-hour window on Plus) — plan the build in one message, let it work, and save revisions for what matters.</p>
<p><em>Keeping it honest: the offer terms live on OpenAI's help center and can change; a card is required and it renews at $20/month unless canceled. Astra access on Plus is capped and lives in Work/Codex, not the regular chat picker. The Higgsfield link is my partner link from the video. Everything verified against OpenAI's and Higgsfield's live pages on September 11, 2026.</em></p>`;

(async () => {
  const pdf = readFileSync(path.join(os.homedir(), "lead-magnets/gpt6-astra-students/pdf/gpt-6-astra-free-students-guide.pdf"));
  const up = await sb.storage.from("pdfs").upload(`${SLUG}.pdf`, pdf, { contentType: "application/pdf", upsert: true });
  console.log("pdf upload:", up.error ? up.error.message : "ok");

  const row = {
    slug: SLUG,
    title: "GPT-6 Astra Free for Students: Claim 4 Months Before October 31 (+ the Higgsfield Study Setup)",
    description: "OpenAI's new flagship GPT-6 Astra is included in the free 4-month student offer — inside ChatGPT Work and Codex. The claim link, where Astra actually lives on the free plan, the Higgsfield plugin setup, and the exact prompts for visual lessons and a portfolio-grade 3D build.",
    whats_inside: [
      "The verified claim link and the 5-minute claim",
      "Where Astra actually lives on the free plan (and its limits)",
      "The honest ARC-AGI-3 numbers behind the graph",
      "Three student plays, each labeled with the right tool",
      "The visual-lesson and robot-hand prompts, verbatim",
    ],
    category: "AI Tools",
    cover_url: null,
    pdf_path: `${SLUG}.pdf`,
    video_url: UTM,
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
