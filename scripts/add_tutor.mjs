// Publishes the Claude AI Tutor guide to the hub: uploads the PDF,
// seeds the resources row, and adds the metered-article content.
// Run from ~/joshualarosa-ai:  node scripts/add_tutor.mjs
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

const SLUG = "claude-ai-tutor";
const REPO = "https://github.com/Egonex-AI/Understand-Anything";

const HL = (t) => `<span style="background:rgba(235,196,0,0.32);padding:1px 5px;border-radius:3px;font-weight:600;">${t}</span>`;
const BTN = `<a href="${REPO}" style="display:block;text-align:center;background:#EBC400;color:#16130B;font-weight:700;padding:15px 22px;border-radius:12px;margin:18px 0 4px;text-decoration:none;">⭐ Get the skill — Understand-Anything on GitHub →</a><p style="text-align:center;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#8C857A;margin:0 0 16px;">Free · open source · works with Claude Code</p>`;
const DARK = (label, text) => `<pre style="white-space:pre-wrap;background:#16130B;color:#F4F1EA;border:1px solid rgba(235,196,0,0.5);border-radius:10px;padding:18px 20px;font-size:14px;line-height:1.6;overflow:auto;font-family:ui-monospace,Menlo,monospace;"><strong style="color:#EBC400;display:block;margin-bottom:10px;letter-spacing:.18em;font-size:11px;">${label}</strong>${text}</pre>`;

const INSTALL = `/plugin marketplace add Egonex-AI/Understand-Anything
/plugin install understand-anything`;

const PROMPT = `You are now my personal tutor for [CLASS NAME]. You've just analyzed everything in this folder — my textbook, slides, and lecture materials. Build me a complete course from it:

1) Syllabus first: break the material into 6-10 sections, ordered from foundations to advanced, one line on what each covers.

2) Teach section by section. When I say "teach section N," explain it like a great professor: plain language first, then the technical version, with examples pulled from MY materials (cite the page or slide so I can check).

3) Quiz me after every section — 5 questions, mixed multiple-choice and short answer. Grade my answers, explain every miss, and re-teach my weak spots before we move on.

4) Track everything I get wrong and quietly weave those topics back into later quizzes until I stop missing them.

5) When I finish the last section, give me a final exam: 20 questions covering the whole course, weighted toward what I struggled with. Grade it out of 100 and tell me exactly what to review before the real exam.

Start now: show me the syllabus.`;

const teaser = `
<h3>Stop asking AI questions. Make it teach you.</h3>
<p>NotebookLM and ChatGPT answer whatever you ask — but ${HL("they wait for you to know what to ask")}. A real tutor doesn't wait. It structures the material, teaches it in order, tests you, and hammers your weak spots until they're gone.</p>
<p>That's what this setup builds: a free, open-source skill turns your class materials into an <strong>AI brain</strong> (a knowledge graph of every concept and how they connect), and one prompt turns Claude into the tutor that teaches from it — full lessons, section quizzes, and a final exam. Build it once, reuse it for <strong>every single class</strong>.</p>
<h3>Step 1 — Install the free skills (60 seconds)</h3>
${BTN}
<p>Open <strong>Claude Code</strong> (Anthropic's free-to-install coding agent — claude.com/claude-code) and run:</p>
${DARK("INSTALL COMMANDS", INSTALL)}`;

const rest = `
<h3>Step 2 — Drop everything into one folder</h3>
<p>One folder per class: the textbook PDF, lecture slides, your notes, problem sets, past exams. For <strong>YouTube videos or recorded lectures</strong>, tap "Show transcript," copy it, and paste it into a text file in the folder — the tutor treats it like any other source.</p>
<p>Why one folder matters: the skill builds one connected map of the whole class — so when it teaches chapter 6, it knows what chapter 3 covered and what the professor emphasized in lecture.</p>
<h3>Step 3 — One command builds the brain</h3>
<p>Open Claude Code inside that folder and run:</p>
${DARK("THE COMMAND", "/understand")}
<p>It reads everything, extracts every concept, and builds the knowledge graph. Bonus commands once it's built: <strong>/understand-chat</strong> (2am office hours, answers grounded in YOUR textbook) and <strong>/understand-dashboard</strong> (a clickable visual map of the whole class).</p>
<h3>Step 4 — Paste this. Meet your tutor.</h3>
<p>Swap in your class name and paste:</p>
${DARK("THE TUTOR PROMPT", PROMPT)}
<p>The "cite the page or slide" line is your safety net — every explanation points back to your actual materials, so you can verify anything before it matters on a real exam.</p>
<h3>The system — one build, every class, all semester</h3>
<ul>
<li><strong>New class?</strong> New folder → /understand → paste the prompt. Two minutes.</li>
<li><strong>New lecture drops?</strong> Add it to the folder — the brain updates incrementally.</li>
<li><strong>Exam week:</strong> take the 20-question final a few days early — what you miss IS your study list. Re-run old section quizzes (the tutor remembers what you struggled with).</li>
</ul>
<p><em>Straight talk: this is a study tool, not a shortcut around learning. AI can misread a formula — the page citations exist so you can check anything load-bearing against the actual textbook. Used honestly, it's the closest thing to a private tutor that costs nothing.</em></p>`;

(async () => {
  const pdf = readFileSync(path.join(os.homedir(), "lead-magnets/claude-ai-tutor/pdf/claude-ai-tutor-guide.pdf"));
  const up = await sb.storage.from("pdfs").upload(`${SLUG}.pdf`, pdf, { contentType: "application/pdf", upsert: true });
  console.log("pdf upload:", up.error ? up.error.message : "ok");

  const row = {
    slug: SLUG,
    title: "Any textbook. Your personal tutor.",
    description: "The exact Claude setup that turns any textbook, lecture, or YouTube video into an AI tutor that teaches you, quizzes you, and gives you a final exam — free, and reusable for every class.",
    whats_inside: [
      "The free open-source skill that builds the AI brain",
      "The two install commands (60 seconds)",
      "What goes in the class folder — including YouTube lectures",
      "The one command that builds the knowledge graph",
      "The exact tutor prompt — lessons, quizzes, final exam",
      "The every-class system + exam-week moves",
    ],
    category: "AI Tools",
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
