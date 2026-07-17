// Publishes the 2027 Internship Boards guide to the hub: uploads the PDF,
// seeds the resources row, and adds the metered-article content.
// Run from ~/joshualarosa-ai:  node scripts/add_board.mjs
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

const SLUG = "2027-internship-boards";

const HL = (t) => `<span style="background:rgba(235,196,0,0.32);padding:1px 5px;border-radius:3px;font-weight:600;">${t}</span>`;
const DARK = (label, text) => `<pre style="white-space:pre-wrap;background:#16130B;color:#F4F1EA;border:1px solid rgba(235,196,0,0.5);border-radius:10px;padding:18px 20px;font-size:14px;line-height:1.6;overflow:auto;font-family:ui-monospace,Menlo,monospace;"><strong style="color:#EBC400;display:block;margin-bottom:10px;letter-spacing:.18em;font-size:11px;">${label}</strong>${text}</pre>`;
const B = (name, url, desc) => `<li><strong><a href="${url}">${name}</a></strong> — ${desc}</li>`;

const P1 = `Search every major company careers page and internship job board for Summer 2027 internships in [YOUR FIELD]. For each one give me: the company, the exact role, the direct application link, and the date applications open (or "already open"). Include the top companies that haven't opened yet — those are the ones I want to be first on.`;
const P2 = `Turn this into a tracker table sorted by which applications open first. Columns: company, role, open date, direct application link, status. Put everything that's already open at the top.`;
const P3 = `Every morning, recheck all of these boards and company pages and flag any new Summer 2027 roles the same day they open. Show me only what's new since yesterday, with direct application links.`;

const teaser = `
<h3>Early applicants win — even less-qualified ones</h3>
<p>Here's what nobody tells you about internship recruiting: ${HL("the people who apply early are more likely to get the job, even when they're less qualified")}. Applications get reviewed as they arrive — by the time most students "get around to it," the class is half-filled.</p>
<p>And the 2027 cycle is opening <strong>right now</strong> — top companies post Summer 2027 roles starting in July and August of 2026, a full year early. Almost nobody in your class knows that.</p>
<h3>The three prompts — one tracker that never sleeps</h3>
<p><strong>Prompt 1 — the sweep.</strong> Swap in your field:</p>
${DARK("PROMPT 1 · SEARCH", P1)}
<p><strong>Prompt 2 — the tracker:</strong></p>
${DARK("PROMPT 2 · TRACKER", P2)}`;

const rest = `
<p><strong>Prompt 3 — the trick that puts you first in line:</strong></p>
${DARK("PROMPT 3 · DAILY RECHECK", P3)}
<p>Prompt 3 works best with ChatGPT's scheduled Tasks feature — set it to run every morning. No paid plan? Run it manually with your coffee; 30 seconds, same job.</p>
<h3>Start here — the two boards that cover almost everyone</h3>
<ul>
${B("Summer 2027 Tech Internships — Vansh & Ouckah", "https://github.com/vanshb03/Summer2027-Internships", "the big one, already live for the 2027 cycle, updated constantly across majors.")}
${B("SpeedyApply — 2027 AI & College Jobs", "https://github.com/speedyapply/2027-AI-College-Jobs", "already on its 2027 cycle — AI-focused roles across majors.")}
</ul>
<p><em>Heads up: some boards below still fly a "2026" flag in the URL — that's just the repo name; they're the live boards and roll to the new cycle in place. Every link was verified working this week.</em></p>
<h3>Software · engineering</h3>
<ul>
${B("SpeedyApply — 2027 SWE College Jobs", "https://github.com/speedyapply/2027-SWE-College-Jobs", "already on the 2027 cycle, pure SWE.")}
${B("Jobright — Software Engineer Internships", "https://github.com/jobright-ai/2026-Software-Engineer-Internship", "updated daily with direct links.")}
${B("Jobright — Engineering Internships", "https://github.com/jobright-ai/2026-Engineer-Internship", "mechanical, electrical, civil, and more.")}
</ul>
<h3>Product · data · analytics</h3>
<ul>
${B("Simplify — Product Management Internships", "https://github.com/SimplifyJobs/Summer2026-Internships/blob/dev/README.md#-product-management-internship-roles", "the PM section of Simplify's master board.")}
${B("Jobright — Product Management Internships", "https://github.com/jobright-ai/2026-Product-Management-Internship", "dedicated PM feed.")}
${B("Jobright — Data Analysis Internships", "https://github.com/jobright-ai/2026-Data-Analysis-Internship", "data analyst and adjacent roles.")}
${B("Jobright — Business Analyst Internships", "https://github.com/jobright-ai/2026-Business-Analyst-Internship", "BA roles — consulting-track students look here too.")}
</ul>
<h3>Finance · quant · consulting</h3>
<ul>
${B("Northwestern FinTech — 2027 Quant Internships", "https://github.com/northwesternfintech/2027QuantInternships", "already on the 2027 cycle — THE quant board; these open earliest and close fastest.")}
${B("Jobright — Consulting Internships", "https://github.com/jobright-ai/2026-Consultant-Internship", "the big firms and boutiques.")}
</ul>
<h3>Marketing · design · sales · creative</h3>
<ul>
${B("Jobright — Marketing Internships", "https://github.com/jobright-ai/2026-Marketing-Internship", "marketing roles updated daily.")}
${B("Jobright — Design Internships", "https://github.com/jobright-ai/2026-Design-Internship", "product design, UX, visual.")}
${B("Jobright — Sales Internships", "https://github.com/jobright-ai/2026-Sales-Internship", "sales and biz dev.")}
${B("Jobright — Art Internships", "https://github.com/jobright-ai/2026-Art-Internship", "art and creative production.")}
</ul>
<h3>Education · public sector · HR · legal · off-season</h3>
<ul>
${B("Jobright — Education Internships", "https://github.com/jobright-ai/2026-Education-Internship", "education and ed-tech.")}
${B("Jobright — Public Sector Internships", "https://github.com/jobright-ai/2026-Public-Sector-Internship", "government roles.")}
${B("Jobright — HR Internships", "https://github.com/jobright-ai/2026-HR-Internship", "people and HR.")}
${B("Jobright — Legal Internships", "https://github.com/jobright-ai/2026-Legal-Internship", "rare to find aggregated anywhere else.")}
${B("Off-Season Internships", "https://github.com/sharunkumar/Summer-Internships/blob/dev/README-Off-Season.md", "recruiting late or off-cycle? This one's yours.")}
</ul>
<h3>The 10-minute daily system</h3>
<ul>
<li><strong>Morning:</strong> run Prompt 3 (or open your starred boards). Anything new in your lane?</li>
<li><strong>Same day:</strong> apply before lunch — ${HL("a same-day decent application beats a next-week perfect one")}.</li>
<li><strong>Weekly:</strong> re-run Prompt 1 to catch companies your tracker missed.</li>
</ul>
<p><em>Straight talk: ChatGPT sometimes invents links or dates — that's why the boards exist. Treat ChatGPT as your radar and the boards as ground truth: apply through the boards' direct links, and verify open dates on the company's careers page when it matters.</em></p>`;

(async () => {
  const pdf = readFileSync(path.join(os.homedir(), "lead-magnets/2027-internship-boards/pdf/2027-internship-boards-guide.pdf"));
  const up = await sb.storage.from("pdfs").upload(`${SLUG}.pdf`, pdf, { contentType: "application/pdf", upsert: true });
  console.log("pdf upload:", up.error ? up.error.message : "ok");

  const row = {
    slug: SLUG,
    title: "Apply first. Get the internship.",
    description: "The ChatGPT prompts that find every Summer 2027 internship before it opens, plus 20 live job boards — verified, categorized by major, and built for applying the second roles drop.",
    whats_inside: [
      "Why early applicants win (even less-qualified ones)",
      "The 3 ChatGPT prompts — sweep, tracker, daily recheck",
      "The 2 boards that cover almost every major",
      "18 more boards by field — SWE, PM, data, quant, marketing, legal",
      "The 10-minute daily application system",
    ],
    category: "Career",
    cover_url: null,
    pdf_path: `${SLUG}.pdf`,
    video_url: null,
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
