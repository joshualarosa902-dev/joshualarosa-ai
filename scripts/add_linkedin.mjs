// Publishes the LinkedIn agent skill pack guide.
// Run from ~/joshualarosa-ai:  node scripts/add_linkedin.mjs
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

const SLUG = "claude-linkedin-skills";
const REPO = "https://github.com/Jakeschincariol/linkedin-agent-skill";

const HL = (t) => `<span style="background:rgba(235,196,0,0.32);padding:1px 5px;border-radius:3px;font-weight:600;">${t}</span>`;
const BTN = (href, label, sub) => `<a href="${href}" style="display:block;text-align:center;background:#EBC400;color:#16130B;font-weight:700;padding:15px 22px;border-radius:12px;margin:18px 0 4px;text-decoration:none;">${label}</a><p style="text-align:center;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#8C857A;margin:0 0 16px;">${sub}</p>`;
const DARK = (label, text) => `<pre style="white-space:pre-wrap;background:#16130B;color:#F4F1EA;border:1px solid rgba(235,196,0,0.5);border-radius:10px;padding:18px 20px;font-size:14px;line-height:1.6;overflow:auto;font-family:ui-monospace,Menlo,monospace;"><strong style="color:#EBC400;display:block;margin-bottom:10px;letter-spacing:.18em;font-size:11px;">${label}</strong>${text}</pre>`;

const P_POST = `/li-post  I'm a [MAJOR] student. Turn this class project into a LinkedIn post: [2-3 sentences on what you built, the problem, and one specific result with a number]. Audience: recruiters and people in [INDUSTRY]. Give me 3 first lines from the hook formulas, then the full post, plain language, no hashtags in the body.`;
const P_PROFILE = `/li-profile  Here's my current headline, About section, and experience: [PASTE]. I'm a [YEAR] [MAJOR] student targeting [ROLE] internships. Score it out of 100, then rewrite the weakest two sections so a recruiter understands what I can do in 5 seconds.`;
const P_DM = `/li-dm  I want to message [NAME], a [SCHOOL] alum who's a [ROLE] at [COMPANY]. We've never spoken. Write a connection note under 200 characters, a first message that asks one specific question about their path, and two short follow-ups spaced a week apart. No "I'd love to pick your brain."`;
const P_PLAN = `/li-plan  I'm a [MAJOR] student targeting [ROLE] internships for [SEASON]. I can post 3-4 times this week. Plan the week: which post ideas (pull from my class projects: [LIST 2-3]), what days and times, and 10 specific people or accounts in [INDUSTRY] I should be commenting on.`;

const teaser = `
<h3>Eleven skills, one job each</h3>
<p>A Claude <em>skill</em> is a reusable instruction file — install it once, call it by name. The LinkedIn agent skill pack is ${HL("11 of them, MIT-licensed and free")}, built by Jake Schincariol and sitting on GitHub with 2,000+ stars. Together they cover the whole LinkedIn job: <strong>/li-post</strong> turns one idea into a post with 3 hook options from 21 formulas, <strong>/li-comment</strong> and <strong>/li-reply</strong> handle the engagement, <strong>/li-dm</strong> writes the networking messages you never know how to start, <strong>/li-profile</strong> scores your profile out of 100 and rewrites the weak parts, <strong>/li-plan</strong> lays out the week and the 10 people to engage, and <strong>/li-human</strong> — the humanizer — strips 113 stock AI words and phrases before you ever see the draft. Plus /li-carousel, /li-repurpose, /li-inbox, and /li-audit.</p>
<p>The rule that makes it safe: the pack drafts, you review, you post. It never publishes for you.</p>
${BTN(REPO, "💼 Get all 11 skills — GitHub →", "github.com/Jakeschincariol/linkedin-agent-skill · MIT · free · no signup")}`;

const rest = `
<h3>The setup that actually works</h3>
<p>Heads up first: pasting the repo link into a Claude chat and asking it to "install this" does nothing — that's a known issue with the pack's own README. Here's what works:</p>
<ul>
<li><strong>Claude app — one step, all 11.</strong> Customize → Plugins → Add → Add marketplace → enter <strong>Jakeschincariol/linkedin-agent-skill</strong> → Add. Then type <strong>/</strong> in any chat and pick <strong>linkedin-agent:li-post</strong> (plugin installs use the <em>linkedin-agent:</em> prefix). Keep "code execution and file creation" on in Settings — that's what lets the humanizer's scripts run.</li>
<li><strong>Claude Code — two commands.</strong> <code>/plugin marketplace add Jakeschincariol/linkedin-agent-skill</code>, then <code>/plugin install linkedin-agent</code>.</li>
<li><strong>Phone or no install — paste one.</strong> Open any skill's SKILL.md on GitHub, copy it, paste it at the top of a new chat, then ask for what you want. Works on any plan anywhere; you lose the humanizer's scripts, so /li-human is mostly pointless this way.</li>
</ul>
<p>On plans: per Anthropic's help center and pricing page, ${HL("free Claude accounts can add plugins and upload skills")}. A couple of older Anthropic doc pages still say Pro+, so if your free account is missing the menu, use the paste method.</p>
<h3>How it sounds like you (not the humanizer)</h3>
<p>The "give it examples of your writing" feature is a file called <strong>voice.md</strong>, not /li-human. Paste three of your own posts and say ${HL("“write my voice.md from these”")} — /li-post reads it before every draft and refuses to invent a voice. On the Claude app, keep that file in a Project so every chat can see it. The humanizer is separate: it runs automatically inside /li-post, removing stock phrases, em-dashes, and hidden characters, then flags structural tells like "It's not X, it's Y."</p>
<h3>The student prompts</h3>
${DARK("/LI-POST — CLASS PROJECT TO POST", P_POST)}
${DARK("/LI-PROFILE — THE REWRITE", P_PROFILE)}
${DARK("/LI-DM — THE ALUMNI MESSAGE", P_DM)}
${DARK("/LI-PLAN — THE WEEK", P_PLAN)}
<h3>The weekly loop</h3>
<ul>
<li><strong>Once:</strong> your voice.md.</li>
<li><strong>Monday:</strong> /li-plan — it recommends four posts a week, not seven, with engage-only days.</li>
<li><strong>Draft days:</strong> /li-post (humanizer runs inside it), then you read it. Every time.</li>
<li><strong>Daily:</strong> /li-comment on 5 of the 10 people — comments are where recruiters notice students.</li>
<li><strong>Friday:</strong> /li-audit — rank the week, keep what worked.</li>
</ul>
<p><em>Keeping it honest: this is a third-party MIT pack by Jake Schincariol, not an Anthropic feature — Anthropic doesn't review uploaded skills, so read the skill files before installing. The humanizer is a plain-language editor, not an AI detector; the pack itself says not to treat posts as undetectable. One of its rules ("put the link in the first comment") is reported outdated on LinkedIn. Skills free, Claude access separate. Independent guide, not affiliated with Anthropic or the authors. Verified October 15, 2026.</em></p>`;

(async () => {
  const pdf = readFileSync(path.join(os.homedir(), "lead-magnets/linkedin-skill-pack/pdf/claude-linkedin-skills-guide.pdf"));
  const up = await sb.storage.from("pdfs").upload(`${SLUG}.pdf`, pdf, { contentType: "application/pdf", upsert: true });
  console.log("pdf upload:", up.error ? up.error.message : "ok");

  const row = {
    slug: SLUG,
    title: "Claude LinkedIn Agent Skill Pack: 11 Free Skills, the Setup That Works + Student Prompts",
    description: "Eleven free, MIT-licensed Claude skills that write LinkedIn posts from your class projects (21 hook formulas), draft comments and networking DMs, score your profile out of 100, plan your week, and humanize every draft. The GitHub link, the install route that actually works on a free plan, how voice.md makes it sound like you, and four student prompts.",
    whats_inside: [
      "All 11 skills and what each one does",
      "The one-step plugin install (and the README advice that doesn't work)",
      "voice.md: how the pack learns your writing",
      "Four student prompts: post, profile, alumni DM, weekly plan",
      "The weekly loop and the honest limits of the humanizer",
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
