// Publishes the AI Engineering from Scratch curriculum guide.
// Run from ~/joshualarosa-ai:  node scripts/add_course.mjs
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

const SLUG = "ai-engineering-from-scratch";
const REPO = "https://github.com/rohitg00/ai-engineering-from-scratch";

const HL = (t) => `<span style="background:rgba(235,196,0,0.32);padding:1px 5px;border-radius:3px;font-weight:600;">${t}</span>`;
const BTN = (href, label, sub) => `<a href="${href}" style="display:block;text-align:center;background:#EBC400;color:#16130B;font-weight:700;padding:15px 22px;border-radius:12px;margin:18px 0 4px;text-decoration:none;">${label}</a><p style="text-align:center;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#8C857A;margin:0 0 16px;">${sub}</p>`;

const teaser = `
<h3>An AI engineering degree, sitting free on GitHub</h3>
<p><strong>AI Engineering from Scratch</strong> is a complete curriculum: ${HL("511 lessons across 20 phases")} — roughly 330 hours by the repo's own count — running from math and classical machine learning all the way to pre-training a mini-GPT, building AI agents, and shipping MCP servers. In Python, TypeScript, Rust, or Julia.</p>
<p>And it's actually free. MIT license, no paywall, no signup, no email wall — even the 6-volume book edition is a free download. It's sitting at <strong>50,000+ GitHub stars</strong>, built by Rohit Ghumare, a Google Developer Expert whose previous project earned 27K stars.</p>
${BTN(REPO, "💻 Get the free curriculum →", "github.com/rohitg00/ai-engineering-from-scratch · MIT · no signup")}
<p>The trap with a 330-hour curriculum: treating it like a Netflix series you'll "get through." Nearly every lesson ships a reusable artifact — ${HL("a prompt, a skill, an agent, or an MCP server you keep")} — and the whole game is collecting those artifacts in public. Here's the exact way I'd run it as a beginner:</p>`;

const rest = `
<h3>Step 1 — fork it, then do Phase 0 in one sitting</h3>
<p>Fork the repo to YOUR GitHub — your fork becomes the public record of everything you build. Then knock out Phase 0 (12 setup lessons: terminal, Git, environment) in one sitting. Boring, essential, done.</p>
<p>Prefer a website to a repo? The official companion site <strong>aiengineeringfromscratch.com</strong> has the same 511 lessons with placement quizzes — also free, no signup.</p>
<h3>Step 2 — pick ONE lane, not all 511 lessons</h3>
<p>Nobody does a 330-hour curriculum linearly. Route by goal:</p>
<ul>
<li><strong>Build AI agents (fastest to impressive):</strong> Phase 0 → Phase 13 (Tools &amp; Protocols — MCP servers, 31 lessons) → Phase 14 (Agent Engineering, 42 lessons). Roughly 100 hours to artifacts almost nobody your age has.</li>
<li><strong>Understand LLMs for real:</strong> Phase 0 → 1 (Math) → 3 (Deep Learning) → 7 (Transformers) → 10 (LLMs from Scratch — ${HL("you pre-train a 124M-parameter mini-GPT")}). The credibility route.</li>
<li><strong>Employable this year:</strong> Phase 0 → 13 → 14 → 17 (Infrastructure &amp; Production) → one Phase 19 capstone (there are 85) shipped and deployed. That's a resume section, not a bullet.</li>
</ul>
<h3>Step 3 — keep every artifact</h3>
<p>Each lesson's <strong>outputs/</strong> folder is portfolio material. Commit it, push it, pin the repo on your profile. "Completed an AI course" is a line recruiters skip — agents, a mini-GPT, and MCP servers they can click into is proof.</p>
<h3>Stack it with the free student offers</h3>
<p>The skills this teaches are exactly what's paying right now — OpenAI's WebMCP hackathon pays $3,500 per winning MCP-powered site, students get ${HL("$100 in free Codex credits")} to build with, and ChatGPT Plus is free for 4 months. All three guides:</p>
${BTN("https://joshualarosa.ai/resources", "⚡ All the free guides → joshualarosa.ai →", "Codex $100 · free Plus · WebMCP hackathon · 50+ more")}
<p><em>Keeping it honest: the ~330 hours is the repo's own estimate — the 85 capstone projects add hundreds more. The Claude certification prep inside is free but not affiliated with Anthropic. And on the stat you'll see in the repo's README ("84% of students use AI, 18% feel prepared") — it's uncited; the sourced versions are ~9 in 10 students using AI (Digital Education Council, 27,000+ students) and about 1 in 4 recent grads feeling fully prepared to use it at work (Hult Workplace Intelligence). Everything here was verified against the live repo on August 27, 2026.</em></p>`;

(async () => {
  const pdf = readFileSync(path.join(os.homedir(), "lead-magnets/ai-engineering-scratch/pdf/ai-engineering-from-scratch-guide.pdf"));
  const up = await sb.storage.from("pdfs").upload(`${SLUG}.pdf`, pdf, { contentType: "application/pdf", upsert: true });
  console.log("pdf upload:", up.error ? up.error.message : "ok");

  const row = {
    slug: SLUG,
    title: "AI Engineering From Scratch: The Free 511-Lesson GitHub Curriculum (Beginner Roadmap)",
    description: "A complete AI engineering curriculum — 511 lessons, 20 phases, ~330 hours — free on GitHub with no signup. Math through mini-GPTs, AI agents, and MCP servers, with nearly every lesson shipping a portfolio artifact. The link plus the exact beginner path by goal.",
    whats_inside: [
      "The repo link (MIT, free, 50K+ stars) and the official site",
      "The fork-first setup that turns lessons into a public portfolio",
      "Three goal-based routes through the 20 phases",
      "The agents + MCP lane that pairs with the WebMCP hackathon",
      "Honest notes: real hours, real stats, what's not affiliated",
    ],
    category: "Free Courses",
    cover_url: null,
    pdf_path: `${SLUG}.pdf`,
    video_url: REPO,
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
