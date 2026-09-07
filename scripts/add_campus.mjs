// Publishes the Claude Campus Ambassador guide.
// Run from ~/joshualarosa-ai:  node scripts/add_campus.mjs
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

const SLUG = "claude-campus-ambassador";
const APPLY = "https://form.typeform.com/to/ghysMPIY";
const PAGE = "https://claude.com/programs/campus";

const HL = (t) => `<span style="background:rgba(235,196,0,0.32);padding:1px 5px;border-radius:3px;font-weight:600;">${t}</span>`;
const BTN = (href, label, sub) => `<a href="${href}" style="display:block;text-align:center;background:#EBC400;color:#16130B;font-weight:700;padding:15px 22px;border-radius:12px;margin:18px 0 4px;text-decoration:none;">${label}</a><p style="text-align:center;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#8C857A;margin:0 0 16px;">${sub}</p>`;

const teaser = `
<h3>Paid to build the AI scene at your school</h3>
<p>The <strong>Claude Campus Ambassador program</strong> — run by Anthropic, the company behind Claude — is back for the 2026-27 school year, and the deal is real: ${HL("a $3,600 cash stipend")} for every selected ambassador, across all three tracks, for a full school year (September 2026 through June 2027). You get Anthropic guest speakers, API credits to share with your members, and a global ambassador community behind you. Last year's version put Builder Clubs on 60+ campuses, Ivies included.</p>
<p>It's free to apply, free to participate, and open to students <strong>worldwide</strong> — 18+, with work authorization in the country where you study.</p>
${BTN(APPLY, "🎓 Apply — Claude Campus Ambassadors →", "Official application · one form for all tracks · closes Sept 12, 11:59 PM PT")}
<p><strong>The clock matters more than usual:</strong> applications close ${HL("September 12, 2026 at 11:59 PM Pacific")}, and Anthropic says it reviews them on a rolling basis — meaning early applications hit an emptier pipeline. Here are the three tracks and how to actually get picked:</p>`;

const rest = `
<h3>The three tracks (same $3,600, different work)</h3>
<ul>
<li><strong>Undergrads — Claude Builder Club.</strong> Set up and lead your campus AI builders club: technical and non-technical workshops with Anthropic guest speakers, hackathons, demo nights, and API credits to share with members. No school restriction.</li>
<li><strong>Master's students — Claude Campus Conversations.</strong> Host discussion groups on AI and society, showcase what students build, and visit the Anthropic office. STEM and humanities both welcome.</li>
<li><strong>PhDs &amp; postdocs — Claude Science Workshops.</strong> Build a community of AI-native researchers and run workshops with Anthropic's math and science teams. One gate: you must ${HL("already be using Claude in your research")}.</li>
</ul>
<p>One catch on the graduate side: both the grad and PhD tracks ${HL("may pull from a smaller pool of schools")} during the pilot. No list is published anywhere — so apply regardless and let them decide.</p>
<h3>How to apply (one form, ten minutes)</h3>
<ul>
<li><strong>One Typeform covers every track</strong> — full program details at claude.com/programs/campus</li>
<li><strong>No expertise required</strong> except the PhD track's Claude-in-research requirement — "some AI fluency and Claude proficiency" is the bar</li>
<li><strong>Past ambassadors must reapply</strong> — flag it on the form if you were one</li>
<li><strong>Heads up:</strong> last year's process reportedly included an interview after the written application — unconfirmed for this cycle, but assume the form isn't the last step</li>
</ul>
<h3>What gets you picked</h3>
<p>Thousands will apply. The strong applications have three things:</p>
<ul>
<li><strong>Proof you build</strong> — a Claude project with a link beats "I'm passionate about AI" every single time. Even a small tool counts.</li>
<li><strong>Proof you gather people</strong> — any event, club, or community you've actually run. Ambassador = organizer first, builder second.</li>
<li><strong>A campus-specific plan</strong> — name the clubs, classes, and gaps at YOUR school. Generic answers read as generic.</li>
</ul>
<p>Don't have a Claude project yet? You have until September 12 — build one this weekend and put it in the application. My Claude tutorials and the free 511-lesson AI curriculum are all on the hub:</p>
${BTN("https://joshualarosa.ai/resources", "⚡ Free build guides → joshualarosa.ai →", "Claude tutorials · free curriculum · student offers · 50+ guides")}
<p><em>Keeping it honest: the stipend is "subject to program terms," and Anthropic hasn't published hours per week, selection timelines, or the pilot school lists. This is my independent guide — not affiliated with Anthropic. Verified against claude.com/programs/campus on September 7, 2026.</em></p>`;

(async () => {
  const pdf = readFileSync(path.join(os.homedir(), "lead-magnets/claude-campus-ambassador/pdf/claude-campus-ambassador-guide.pdf"));
  const up = await sb.storage.from("pdfs").upload(`${SLUG}.pdf`, pdf, { contentType: "application/pdf", upsert: true });
  console.log("pdf upload:", up.error ? up.error.message : "ok");

  const row = {
    slug: SLUG,
    title: "Claude Campus Ambassador Program 2026: $3,600 Stipend, All 3 Tracks & How to Apply by September 12",
    description: "Anthropic's Claude Campus Ambassador program is back — a $3,600 stipend to lead AI workshops, hackathons, and discussions at your school for the 2026-27 year. The official application link, eligibility for the undergrad, master's, and PhD tracks, and what gets applications picked before rolling review fills spots.",
    whats_inside: [
      "The official application link (one form, all tracks)",
      "All three tracks: Builder Clubs, Campus Conversations, Science Workshops",
      "Eligibility: worldwide, 18+, and the PhD track's hidden gate",
      "The rolling-review deadline math — why apply this week",
      "What strong applications include (from last year's cohort)",
    ],
    category: "Opportunities",
    cover_url: null,
    pdf_path: `${SLUG}.pdf`,
    video_url: PAGE,
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
