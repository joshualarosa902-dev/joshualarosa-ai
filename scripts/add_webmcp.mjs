// Publishes the WebMCP Challenge guide: uploads the PDF, seeds the
// resources row, and adds the metered-article content.
// Run from ~/joshualarosa-ai:  node scripts/add_webmcp.mjs
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

const SLUG = "webmcp-challenge";
const ENTRY = "https://webmcp.devpost.com/";

const HL = (t) => `<span style="background:rgba(235,196,0,0.32);padding:1px 5px;border-radius:3px;font-weight:600;">${t}</span>`;
const BTN = (href, label, sub) => `<a href="${href}" style="display:block;text-align:center;background:#EBC400;color:#16130B;font-weight:700;padding:15px 22px;border-radius:12px;margin:18px 0 4px;text-decoration:none;">${label}</a><p style="text-align:center;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#8C857A;margin:0 0 16px;">${sub}</p>`;

const teaser = `
<h3>OpenAI will pay you to build a website</h3>
<p>The WebMCP Challenge is OpenAI's new 10-day hackathon: build a site that ${HL("hands ChatGPT real controls")} — instead of the AI clicking around your page and hoping, your site exposes tools it can call directly. That's WebMCP, the open web standard OpenAI just adopted, and about 2,000 people registered in the first day.</p>
<p>What each of the <strong>10 winners</strong> takes home:</p>
<ul>
<li>${HL("$3,500 cash")} — $3,000 from OpenAI + $500 from Netlify</li>
<li><strong>A Codex Micro keyboard</strong> — OpenAI's sold-out $230 macropad</li>
<li><strong>One year of ChatGPT Pro</strong> — for up to 3 team members</li>
<li><strong>~$15,000 in credits</strong> — $10K Cloudflare, $4,200 Vercel, $300 Render, plus Shopify gear and Google AI Ultra</li>
<li><strong>A spotlight from @OpenAIDevs</strong> — recruiter bait, by design</li>
</ul>
${BTN(ENTRY, "🏆 Enter free — webmcp.devpost.com →", "Official entry page · deadline September 3 at 1:00 PM PT")}
<p><strong>One catch on the deadline:</strong> OpenAI's own tweet said 5 PM PT, but the official rules and the live countdown both say ${HL("1:00 PM PT on September 3")}. Trust the rules — four hours late is still late.</p>`;

const rest = `
<h3>What a valid entry needs</h3>
<p>Judges run a pass/fail check before scoring anything. Your submission must have all four:</p>
<ul>
<li><strong>A working live URL</strong> — testable in ChatGPT's desktop in-app browser, or Chrome with the WebMCP flag enabled</li>
<li><strong>A public open-source repo</strong> — GitHub/GitLab/Bitbucket with a visible license file</li>
<li><strong>A YouTube demo under 3 minutes</strong> — public, with audio, showing ChatGPT actually driving your site</li>
<li><strong>A write-up</strong> — what your site does and how WebMCP powers it</li>
</ul>
<p>Judging is four equal criteria: WebMCP leverage, execution, potential impact, and creativity. One submission per person, no edits after the deadline. Existing projects only count if ${HL("meaningfully extended with WebMCP during the window")} — commit history is your evidence. And you must be 18+ (age of majority where you live); some countries are excluded.</p>
<h3>How to build it</h3>
<ul>
<li><strong>Build with Codex</strong> — OpenAI's promoted path; there's a Devpost plugin inside Codex that walks you through the rules and submission flow</li>
<li><strong>Host anywhere</strong> — ChatGPT Sites, Cloudflare, Vercel, Render, Netlify are all officially allowed. Heads up: Sites needs a paid ChatGPT plan — but students get ${HL("4 months of Plus free")} right now, which unlocks it at $0:</li>
</ul>
${BTN("https://joshualarosa.ai/r/chatgpt-plus-free-students", "🎓 The free ChatGPT Plus claim guide →", "Free on the resource hub · claim by Oct 31")}
<h3>Three student app ideas that fit the judging</h3>
<p>Winning entries solve "a real problem for a real audience." You're a student — your unfair advantage is that you ARE the audience:</p>
<ul>
<li><strong>1 — Internship Tracker.</strong> ChatGPT finds roles, compares them to your resume, and watches every deadline. Tools to register: save_role, compare_roles, list_deadlines.</li>
<li><strong>2 — Degree Planner.</strong> ChatGPT builds your semester: checks prereqs, catches time conflicts, saves the plan. Tools: search_courses, check_conflicts, save_plan.</li>
<li><strong>3 — Campus Textbook Exchange.</strong> ChatGPT lists your books, finds campus buyers, and negotiates inside price ranges you set. Tools: list_item, search_listings, make_offer.</li>
</ul>
<p>None of these resemble OpenAI's showcase demos (3D modeling, crosswords, travel apps) — that's the point. Different lane, real users, easy demo video.</p>
<p><em>Keeping it honest: rules and prizes live on Devpost and can change; winners handle their own tax forms; and ~2,000 registered doesn't mean 2,000 finished submissions — most hackathon registrants never ship. Submitting anything complete puts you in a much smaller pool than the counter suggests. Verified against the official rules and OpenAI's pages on August 26, 2026.</em></p>`;

(async () => {
  const pdf = readFileSync(path.join(os.homedir(), "lead-magnets/webmcp-challenge/pdf/webmcp-challenge-guide.pdf"));
  const up = await sb.storage.from("pdfs").upload(`${SLUG}.pdf`, pdf, { contentType: "application/pdf", upsert: true });
  console.log("pdf upload:", up.error ? up.error.message : "ok");

  const row = {
    slug: SLUG,
    title: "OpenAI WebMCP Challenge: $35,000 Hackathon Rules, Deadline + Student Project Ideas",
    description: "OpenAI's 10-day WebMCP Challenge pays the top 10 projects $3,500 cash each plus a Codex Micro, a year of ChatGPT Pro, and ~$15K in credits. The entry link, the real deadline (it's not the one in OpenAI's tweet), every submission requirement, and three student app ideas built to fit the judging.",
    whats_inside: [
      "The official entry link and the real Sep 3, 1PM PT deadline",
      "The full top-10 prize stack, itemized",
      "All four submission requirements judges check first",
      "The 18+ and existing-project rules most entrants miss",
      "Three student app ideas with the WebMCP tools to register",
    ],
    category: "Opportunities",
    cover_url: null,
    pdf_path: `${SLUG}.pdf`,
    video_url: ENTRY,
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
