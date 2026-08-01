// Publishes the OpenAI Student Collective guide to the hub: uploads the PDF,
// seeds the resources row, and adds the metered-article content.
// Run from ~/joshualarosa-ai:  node scripts/add_openai.mjs
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

const SLUG = "openai-student-collective";
const APPLY = "https://openai.com/student-collective/";

const HL = (t) => `<span style="background:rgba(235,196,0,0.32);padding:1px 5px;border-radius:3px;font-weight:600;">${t}</span>`;
const BTN = `<a href="${APPLY}" style="display:block;text-align:center;background:#EBC400;color:#16130B;font-weight:700;padding:15px 22px;border-radius:12px;margin:18px 0 4px;text-decoration:none;">🎓 The official application — openai.com/student-collective →</a><p style="text-align:center;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#8C857A;margin:0 0 16px;">Closes August 10, 2026 · 11:59pm PT</p>`;
const Q = (label, text) => `<p style="border-left:4px solid #EBC400;background:rgba(235,196,0,0.08);padding:10px 14px;border-radius:0 8px 8px 0;margin:8px 0;"><strong style="font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#8C857A;display:block;">${label}</strong>${text}</p>`;

const teaser = `
<h3>OpenAI pays students to lead AI on campus</h3>
<p>The <strong>OpenAI Student Collective</strong> selects undergrads as ${HL("Campus Leads")} — you run AI workshops, weekly build sessions, and showcases at your own school, usually in pairs, with OpenAI training and backing you directly.</p>
<p>What selected Campus Leads get: a <strong>cash stipend every semester</strong> (paid at semester's end once your activities are done), <strong>event funding, credits, and merch</strong>, a <strong>ChatGPT subscription + Codex credits</strong>, <strong>direct access to the OpenAI team</strong> and the global lead network, and a shot at visiting <strong>OpenAI HQ in June 2027</strong>.</p>
<p>${HL("Every major can apply.")} No Codex experience, no AI portfolio — you need to genuinely use ChatGPT and be the kind of person who makes things happen on campus.</p>
<p><strong>The catch is the clock:</strong> applications close ${HL("August 10 at 11:59pm PT")} — and most students will hear about this after it's gone.</p>
${BTN}
<h3>The eligibility checklist</h3>
<ul>
<li><strong>18+</strong>, enrolled undergrad, <strong>graduating after December 2027</strong></li>
<li>A real ChatGPT/Codex user with <strong>4–6 hours a week</strong> to give, August 2026 – June 2027</li>
<li>Studying in the US, Canada, UK, France, Germany, India, Japan, or South Korea (with work authorization)</li>
<li>No other ambassador or intern role at the same time</li>
</ul>`;

const rest = `
<h3>The application, field by field</h3>
<p>The form: name, email, age, school, field of study, grad date, commitment confirmation, current roles/conflicts, your OpenAI tool usage, how you heard, LinkedIn/socials. You can apply solo or name a co-lead and apply as a pair — a real strategy, since leads work in pairs anyway.</p>
<p><strong>Then the real test — two 60-second videos:</strong></p>
${Q("Video 1", "“What's one way you use AI students should know?”")}
${Q("Video 2", "“What's something you helped make happen on campus?”")}
<p><strong>And two written questions</strong> — technically optional; competitively mandatory:</p>
${Q("Written 1", "The most important problem facing young people — and how you'd approach solving it.")}
${Q("Written 2", "Something you changed your mind about recently.")}
<p><strong>The silent disqualifier:</strong> video links must be set to ${HL("“anyone with the link can view”")} — a locked Drive link ends your application before a human sees it. Test in incognito before submitting.</p>
<h3>Win the videos</h3>
<ul>
<li><strong>Video 1 — a real workflow, not a party trick.</strong> Show your screen: concrete problem → exact steps → measurable result. "I turned my 300-page textbook into a daily quiz system that raised my midterm grade" beats "I summarize readings."</li>
<li><strong>Video 2 — initiative with numbers.</strong> The thing that exists on campus because of you: how many people, what changed.</li>
<li><strong>Talk like yourself</strong> — notes, not a script. Quiet room, decent light, phone at eye level. Content beats polish.</li>
</ul>
<p>Both questions test the same thing: <em>are you already doing this without the title?</em> The best applications feel like OpenAI would just be funding what you were doing anyway.</p>
<h3>Win the writing + the interview</h3>
<ul>
<li><strong>The problem essay:</strong> skip the headlines. Pick a narrow problem you've personally watched happen and bring a plan you could start next week.</li>
<li><strong>The changed-my-mind essay:</strong> an intellectual-honesty test — real reversal, real reasoning, no fake-humble picks.</li>
<li><strong>The interview (August):</strong> walk in with a semester plan built — four workshop topics, where build sessions happen, two campus partnerships, and how you'd promote it. Nobody else brings a written plan; it converts "interested student" into "already the Campus Lead."</li>
</ul>
<h3>The clock + your week</h3>
<ul>
<li><strong>Now → Aug 10, 11:59pm PT:</strong> the whole window · <strong>August:</strong> interviews · <strong>Late August:</strong> onboarding · <strong>Sept 2026 – June 2027:</strong> the program and the semester stipends.</li>
<li><strong>Day 1:</strong> confirm eligibility, pick your best workflow, outline both videos. <strong>Day 2:</strong> film both (one hour), upload, set link access, test incognito. <strong>Day 3:</strong> write and tighten both essays. <strong>Day 4:</strong> submit — not August 9th.</li>
</ul>
${BTN}
<p><em>Keeping it honest: this is a program, not an internship — OpenAI doesn't publish the stipend amount, stipends pay at semester's end after activities are done, and the HQ visit is an opportunity, not a guaranteed trip. Everything here comes from OpenAI's official program page.</em></p>`;

(async () => {
  const pdf = readFileSync(path.join(os.homedir(), "lead-magnets/openai-student-collective/pdf/openai-student-collective-guide.pdf"));
  const up = await sb.storage.from("pdfs").upload(`${SLUG}.pdf`, pdf, { contentType: "application/pdf", upsert: true });
  console.log("pdf upload:", up.error ? up.error.message : "ok");

  const row = {
    slug: SLUG,
    title: "Paid by OpenAI. On your campus.",
    description: "The full walkthrough for the OpenAI Student Collective — every requirement, every application question, the video strategy, and the interview plan. Applications close August 10 at 11:59pm PT.",
    whats_inside: [
      "What Campus Leads actually get (stipend, funding, HQ shot)",
      "The 60-second eligibility checklist",
      "Every application field + both video questions",
      "The video strategy that beats a thousand applicants",
      "Essay + interview prep with the semester-plan move",
      "The day-by-day plan to submit this week",
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
