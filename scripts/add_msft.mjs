// Publishes the Copilot Ambassador guide to the hub: uploads the PDF,
// seeds the resources row, and adds the metered-article content.
// Run from ~/joshualarosa-ai:  node scripts/add_msft.mjs
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

const SLUG = "copilot-ambassador";
const APPLY = "https://oncampusnation.com/job/microsoft-copilot-ambassador-fall-2026/";
const AGENCY = "info@thecampusagency.com";

const HL = (t) => `<span style="background:rgba(235,196,0,0.32);padding:1px 5px;border-radius:3px;font-weight:600;">${t}</span>`;
const BTN = `<a href="${APPLY}" style="display:block;text-align:center;background:#EBC400;color:#16130B;font-weight:700;padding:15px 22px;border-radius:12px;margin:18px 0 4px;text-decoration:none;">🪟 The official Fall 2026 application →</a><p style="text-align:center;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#8C857A;margin:0 0 16px;">Rolling admissions · spots fill as they go · apply early</p>`;
const DARK = (label, text) => `<pre style="white-space:pre-wrap;background:#16130B;color:#F4F1EA;border:1px solid rgba(235,196,0,0.5);border-radius:10px;padding:18px 20px;font-size:14px;line-height:1.6;overflow:auto;font-family:ui-monospace,Menlo,monospace;"><strong style="color:#EBC400;display:block;margin-bottom:10px;letter-spacing:.18em;font-size:11px;">${label}</strong>${text}</pre>`;

const TEMPLATE = `I'm a full-time [year and major] student at [school] and a regular Copilot user. I connect with students through [club, campus role, organization, or social account], where I have [specific proof of reach or involvement].

I would introduce Copilot through [one realistic event or workshop idea] and show its value with [one specific student use case or content idea].

In a previous project, I [brief measurable example of leadership, content, or event experience].

I'm comfortable committing 3 to 5 hours per week and completing the requirements for the [Social + Events or Events Only] track.`;

const teaser = `
<h3>Microsoft pays students to run Copilot on campus</h3>
<p>The <strong>Copilot Student Ambassador</strong> program (via Microsoft's recruitment partner, The Campus Agency) pays students to host events, create content, and connect directly with the Copilot team — ${HL("every major welcome")}, no computer science required.</p>
<ul>
<li><strong>8 weeks</strong>, about <strong>3–5 hours/week</strong></li>
<li><strong>Up to $1,500</strong> — the stated maximum, paid on completing the program and all assigned work</li>
<li><strong>Extra bonuses possible</strong> for top performers (not guaranteed)</li>
<li>Full-time <strong>undergrads and grad students</strong> at eligible accredited four-year schools</li>
<li><strong>No published deadline</strong> — rolling since June, ${HL("spots fill as they go")}. Waiting is how you miss it.</li>
</ul>
${BTN}
<h3>The eligibility self-check</h3>
<p>You appear to meet the baseline if: you're full-time at a four-year school, you actually use Copilot (with one real use case you can talk about), you can give 3–5 hrs/week for 8 weeks, you can do events or content, and you can handle training, meetings, and deadlines. No minimum GPA, follower count, or prior experience is listed anywhere.</p>`;

const rest = `
<h3>The school question — read before you count on this</h3>
<p>Microsoft's wording says "affiliated" four-year schools, and ${HL("there is no public Fall 2026 school list")}. How to actually confirm yours: open the application → create your OnCampusNation profile → check whether the portal accepts your school → if missing or unclear, email <strong>${AGENCY}</strong> directly. Don't trust the Fall 2025 list — the current posting doesn't repeat it.</p>
<h3>Pick your track</h3>
<ul>
<li><strong>Social + Events:</strong> three Instagram Reels on student Copilot uses + staff two campus tables + one session for a student org.</li>
<li><strong>Events Only:</strong> staff two tables + run three presentations/workshops. No Reels — camera-shy but great in a room? This one's yours.</li>
</ul>
<p>Both tracks include product training, engagement goals, required meetings, and campaign rules/reporting. The quiet win: content, events, and brand-advocacy experience with Microsoft's name on it, plus a cohort network across 100+ campuses.</p>
<h3>Prepare before you open the portal</h3>
<ul>
<li>One-page resume; school, degree, major, grad date</li>
<li>Working links to Instagram/socials (set viewable, then test them)</li>
<li>2–3 examples of campus leadership, clubs, events, or content</li>
<li>One specific Copilot use case — "I like AI" is not a use case</li>
<li>One realistic event idea for YOUR campus + one Reel concept (if Social + Events)</li>
<li>A professional email you check — invites land there and in spam</li>
</ul>
<h3>The application + the template</h3>
<p>Open the application → create your account → complete the online resume if asked → attach everything → ${HL("check every link works")} → submit early → watch inbox and spam.</p>
${DARK("THE APPLICATION TEMPLATE", TEMPLATE)}
<p><strong>What separates the picked from the passed:</strong> lead with proof (an event you ran, a club, content you made), quantify honestly (real numbers, even small), propose one specific activation for your specific campus, and never exaggerate — following, involvement, or usage.</p>
<h3>Straight answers</h3>
<ul>
<li><strong>Is $1,500 guaranteed on selection?</strong> No — it's the max, paid on completing everything.</li>
<li><strong>Grad students?</strong> Yes. <strong>Part-time?</strong> Listing says full-time. <strong>Community college?</strong> Four-year per current criteria — email the agency if unusual.</li>
<li><strong>International students?</strong> Work-authorization rules aren't clearly published — confirm with the agency first.</li>
<li><strong>Is this Microsoft Learn Student Ambassadors?</strong> No — separate program. This is the paid Fall 2026 Copilot campaign.</li>
</ul>
${BTN}
<p><em>Independent resource by Joshua LaRosa — not affiliated with or endorsed by Microsoft, Copilot, The Campus Agency, or OnCampusNation. Details can change; verify against the official application before applying. Last verified August 2, 2026.</em></p>`;

(async () => {
  const pdf = readFileSync(path.join(os.homedir(), "lead-magnets/copilot-ambassador/pdf/copilot-ambassador-guide.pdf"));
  const up = await sb.storage.from("pdfs").upload(`${SLUG}.pdf`, pdf, { contentType: "application/pdf", upsert: true });
  console.log("pdf upload:", up.error ? up.error.message : "ok");

  const row = {
    slug: SLUG,
    title: "Up to $1,500 from Microsoft. To bring Copilot to campus.",
    description: "The full walkthrough for the Copilot Student Ambassador program (Fall 2026) — eligibility, both tracks, the prep checklist, the application template, and the school-eligibility check. Rolling admissions: waiting is how you miss it.",
    whats_inside: [
      "The program fact sheet (8 weeks, 3–5 hrs, up to $1,500)",
      "The eligibility self-check + the school-confirmation method",
      "Both ambassador tracks compared",
      "The 10-minute prep checklist",
      "The fill-in application template",
      "Straight-answer FAQ (money, grads, international)",
    ],
    category: "Career",
    cover_url: null,
    pdf_path: `${SLUG}.pdf`,
    video_url: APPLY,
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
