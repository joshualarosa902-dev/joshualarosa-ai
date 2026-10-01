// Publishes the StudyGrid / GitHub-graph-for-college guide.
// Run from ~/joshualarosa-ai:  node scripts/add_studygrid.mjs
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

const SLUG = "github-study-tracker";
const APP = "https://studygrid-xqt7gma7.manus.space";
const CREDITS = "https://manus.im/redeem?c=JL024W26";

const HL = (t) => `<span style="background:rgba(235,196,0,0.32);padding:1px 5px;border-radius:3px;font-weight:600;">${t}</span>`;
const BTN = (href, label, sub) => `<a href="${href}" style="display:block;text-align:center;background:#EBC400;color:#16130B;font-weight:700;padding:15px 22px;border-radius:12px;margin:18px 0 4px;text-decoration:none;">${label}</a><p style="text-align:center;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#8C857A;margin:0 0 16px;">${sub}</p>`;
const DARK = (label, text) => `<pre style="white-space:pre-wrap;background:#16130B;color:#F4F1EA;border:1px solid rgba(235,196,0,0.5);border-radius:10px;padding:18px 20px;font-size:14px;line-height:1.6;overflow:auto;font-family:ui-monospace,Menlo,monospace;"><strong style="color:#EBC400;display:block;margin-bottom:10px;letter-spacing:.18em;font-size:11px;">${label}</strong>${text}</pre>`;

const PROMPT = `Build a polished, fully functional web app called [NAME] — a GitHub-style consistency tracker for [YOUR GOAL: college / a startup launch / a fitness plan].

DESIGN: I've attached a GitHub contribution graph as a reference. Recreate its structure as a real interactive component — small square cells, seven weekday rows, week columns, month labels, a Less→More legend — but give it an original identity: warm off-white background, white cards, charcoal text, green accents. Five intensity levels, neutral to deep green.

DATA: I've uploaded [my syllabi / my project plan]. Extract every task, deadline, and milestone into one dashboard, grouped into collections ([classes / projects / applications]). Show an editable review before saving; keep stated dates exact and never invent deadlines.

DASHBOARD: open on a big annual grid (last 12 months) with totals for activities, active days, and this week — then "Due this week" and collection cards with mini-grids. Each collection gets its own page, grid, and task list. Completing a task fills today's square exactly once; reopening removes it; future days never fill. Add a quick "log a session" action.

Make it excellent on a phone — full year visible, no horizontal scrolling — and add a "Share your year" button exporting a clean PNG of the grid and totals, no personal details.

Build end to end with accounts and persistent storage, then deploy to a live URL.`;

const teaser = `
<h3>A year of your grind, in one screenshot</h3>
<p>GitHub's contribution graph works because it makes consistency ${HL("visible")} — one glance shows a year of showing up, and an empty square stings just enough to make you not skip. Developers obsess over the streak. Students never got a version of that. So I used Manus to build one: upload your syllabi, and every assignment, exam, reading, and internship application becomes a square that ${HL("darkens as you complete more")} — one grid per class, with "due this week" sitting right next to the work you've already finished.</p>
${BTN(APP, "📊 StudyGrid — open my student app →", "The exact app from the video · free demo, no login needed")}
${BTN(CREDITS, "⚡ Claim your 1,000 free Manus credits →", "Sign up through my link · new users start with 1,000 credits + 300 free daily")}
<p>Poke around the app first — complete a demo task and watch today's square darken. Then grab the credits and build your own version with the exact prompt below.</p>`;

const rest = `
<h3>The 3-step build</h3>
<ul>
<li><strong>Sign up fresh through my link above</strong> — new Manus accounts start with 1,000 credits, plus 300 free daily credits for tweaks. That covers a solid build pass of this app.</li>
<li><strong>Start a new task with a reference screenshot</strong> — GitHub's contribution graph or a screenshot of my app both work. Manus reads the image for design inspiration.</li>
<li><strong>Upload your syllabi and paste the prompt</strong> — PDFs straight from your course pages. Manus extracts the assignments, exams, readings, and deadlines, shows you a review, then builds and deploys the app to a live link you can open on your phone.</li>
</ul>
<h3>The universal prompt</h3>
<p>This is the distilled version of the exact spec I used — fill the [BRACKETS] and it becomes any tracker:</p>
${DARK("THE UNIVERSAL GRID PROMPT", PROMPT)}
<p><strong>Adapting it:</strong> swap the syllabi for a business plan or project roadmap, and make the collections your clients, your habits, or your applications. Same grid, different grind. The checklist types become your reps — outreach sent, workouts done, chapters shipped.</p>
<h3>Make it stick</h3>
<ul>
<li><strong>Add it to your home screen</strong> — open your app link on your phone → Share → Add to Home Screen. Friction kills streaks.</li>
<li><strong>Check off one thing before noon</strong> — the first square of the day is the hardest. Reviewed lectures count.</li>
<li><strong>Screenshot it monthly</strong> — a filling grid is proof of work for grad apps, interviews, or just yourself in November.</li>
<li><strong>Set it to private</strong> — published Manus apps default to public. A dashboard with your real deadlines and applications should be private, or keep identifying info out.</li>
</ul>
<p>Bonus for students: Manus also runs a Campus program at manus.im/edu — verify with your school email and you can earn extra credits for classmates who join through you. Free way to keep building after the first 1,000.</p>
<p><em>Keeping it honest: the credits link is my partner link from the video — new users start with 1,000 credits either way, and this build uses a good chunk of them; bigger builds run on Manus's plans. Everything verified against Manus's live pages on October 1, 2026.</em></p>`;

(async () => {
  const pdf = readFileSync(path.join(os.homedir(), "lead-magnets/github-study-tracker/pdf/github-study-tracker-guide.pdf"));
  const up = await sb.storage.from("pdfs").upload(`${SLUG}.pdf`, pdf, { contentType: "application/pdf", upsert: true });
  console.log("pdf upload:", up.error ? up.error.message : "ok");

  const row = {
    slug: SLUG,
    title: "Build a GitHub-Style Study Tracker With Manus: The App, the Exact Prompt + 1,000 Free Credits",
    description: "A GitHub contribution graph for college — every assignment, exam, and internship application filling in squares as you complete them. Try the live StudyGrid app, claim 1,000 free Manus credits, and copy the universal prompt that builds your own version for school, business, or any goal.",
    whats_inside: [
      "The live StudyGrid app (free demo, no login)",
      "1,000 free Manus credits through the partner link",
      "The universal grid prompt, ready to adapt to any goal",
      "The 3-step build: reference image, syllabi, deploy",
      "The habits (and privacy setting) that make it stick",
    ],
    category: "AI Tools",
    cover_url: null,
    pdf_path: `${SLUG}.pdf`,
    video_url: APP,
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
