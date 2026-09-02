// Publishes the AI resume tailoring tool guide (Enter Pro build).
// Run from ~/joshualarosa-ai:  node scripts/add_resume.mjs
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

const SLUG = "ai-resume-tailoring-tool";
const TOOL = "https://7a2d6edc78fc4a67b1968c5f9dddb6f6.prod.enterapp.pro";
const CREDITS = "https://enter.converge.ai/s/HIKeIB";

const HL = (t) => `<span style="background:rgba(235,196,0,0.32);padding:1px 5px;border-radius:3px;font-weight:600;">${t}</span>`;
const BTN = (href, label, sub) => `<a href="${href}" style="display:block;text-align:center;background:#EBC400;color:#16130B;font-weight:700;padding:15px 22px;border-radius:12px;margin:18px 0 4px;text-decoration:none;">${label}</a><p style="text-align:center;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#8C857A;margin:0 0 16px;">${sub}</p>`;
const DARK = (label, text) => `<pre style="white-space:pre-wrap;background:#16130B;color:#F4F1EA;border:1px solid rgba(235,196,0,0.5);border-radius:10px;padding:18px 20px;font-size:14px;line-height:1.6;overflow:auto;font-family:ui-monospace,Menlo,monospace;"><strong style="color:#EBC400;display:block;margin-bottom:10px;letter-spacing:.18em;font-size:11px;">${label}</strong>${text}</pre>`;

const PROMPT = `Build an AI resume tailoring tool where users paste their existing resume and a job description, and the AI rewrites bullet points to better match the role's keywords and requirements, highlights the most relevant skills, suggests what to remove or tighten, and provides an ATS compatibility score along with a clean, download-ready version. Design the interface to feel like a focused professional editor rather than a flashy generator, with a structured two-panel layout, clear revision highlights, subtle typography hierarchy, calm neutral colors, and an overall polished document-editing experience that feels precise, trustworthy, and career-oriented. Generate elegant editorial-style visuals, subtle professional background images, or refined graphic elements, and include a large hero illustration or background image so the page feels visually rich, modern, and polished.`;

const teaser = `
<h3>The filter you never see</h3>
<p>Over ${HL("97% of Fortune 500 companies")} run applications through applicant-tracking software. It rarely "rejects" you outright — it filters and ranks, which is worse: <strong>90%+ of employers use it to sort candidates before any human review</strong>, and 88% admit qualified people get screened out just for not matching the job description's language (Harvard Business School, "Hidden Workers"). An untailored resume doesn't get rejected. It gets buried.</p>
<p>So I built a tool that does the tailoring for me — and you can use it right now, free, no sign-up:</p>
${BTN(TOOL, "📄 Open the AI resume tool →", "Free · no sign-up · your text stays in your session")}
<p>Paste your resume, paste the job description, hit <strong>Run Analysis</strong> — it returns the missing keywords, rewritten bullet points matched to the role's language, an ATS-readiness score with prioritized revisions, and a clean download-ready version. Minutes per application instead of a rewrite every time.</p>`;

const rest = `
<h3>Build your own version — no code, ~10 minutes</h3>
<p>The tool was built on <strong>Enter Pro</strong>, Converge AI's AI app builder. One prompt in, a live deployed app out. The exact run:</p>
<ul>
<li><strong>Claim 200 free credits</strong> through my invite link below — that's roughly one full app build (use them within the week, they expire)</li>
<li><strong>Turn on Plan Mode</strong> — it maps the architecture and features before writing any code; approve the plan, then it builds</li>
<li><strong>Paste the prompt below</strong> — Enter Pro's built-in design system handles the polished interface</li>
<li><strong>Publish</strong> — one click puts it on a live URL you can send to anyone (or put on your resume — meta, but it works)</li>
</ul>
${BTN(CREDITS, "⚡ Get 200 free Enter Pro credits →", "My invite link from the video · new accounts only")}
<h3>The exact prompt</h3>
${DARK("THE RESUME TOOL PROMPT", PROMPT)}
<p>The second half is the secret — the design paragraph is why the result looks like a product instead of a school project. Keep it verbatim, and swap only the first sentence to build any other tool (flashcard maker, cover-letter matcher, interview-prep coach — same skeleton).</p>
<h3>Use it honestly</h3>
<p>Two things worth knowing: the tool's score is a ${HL("keyword-match estimate")} — no third-party tool can see an employer's actual ATS, so use it directionally. And tailoring means matching the language of jobs you're actually qualified for — rewriting bullets, not inventing them. Recruiters can smell fiction; keyword-matched truth is the whole play.</p>
<p><em>Transparency: the credits link is my referral link from the video — new sign-ups through it get the 200 credits, and it supports the channel. Both links verified live on August 29, 2026.</em></p>`;

(async () => {
  const pdf = readFileSync(path.join(os.homedir(), "lead-magnets/ai-resume-tailor/pdf/ai-resume-tailoring-tool-guide.pdf"));
  const up = await sb.storage.from("pdfs").upload(`${SLUG}.pdf`, pdf, { contentType: "application/pdf", upsert: true });
  console.log("pdf upload:", up.error ? up.error.message : "ok");

  const row = {
    slug: SLUG,
    title: "Free AI Resume Tailoring Tool + the Exact Prompt to Build Your Own (No Code)",
    description: "Use a free AI tool that tailors your resume to any job description — missing keywords, rewritten bullets, and an ATS-readiness score in minutes. Then build your own version on Enter Pro with the exact prompt from the video and 200 free credits.",
    whats_inside: [
      "The live resume tool (free, no sign-up)",
      "Why tailoring wins: the sourced ATS reality",
      "The 4-step Enter Pro build with Plan Mode",
      "The exact prompt, verbatim — plus how to remix it",
      "200 free Enter Pro credits via the invite link",
    ],
    category: "AI Tools",
    cover_url: null,
    pdf_path: `${SLUG}.pdf`,
    video_url: TOOL,
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
