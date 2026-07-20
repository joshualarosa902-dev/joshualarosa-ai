// Publishes the Paper -> Live App guide to the hub: uploads the PDF,
// seeds the resources row, and adds the metered-article content.
// Run from ~/joshualarosa-ai:  node scripts/add_paperapp.mjs
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

const SLUG = "paper-to-app";
const UTM = "https://higgsfield.ai/s/higgsfield-app-builder-x-fable-5-joshualarosa.ai-giYmNP";
const DEMO = "https://forgetting-curve-1885.higgsfield.app";

const HL = (t) => `<span style="background:rgba(235,196,0,0.32);padding:1px 5px;border-radius:3px;font-weight:600;">${t}</span>`;
const BTN = (href, label, sub) => `<a href="${href}" style="display:block;text-align:center;background:#EBC400;color:#16130B;font-weight:700;padding:15px 22px;border-radius:12px;margin:18px 0 4px;text-decoration:none;">${label}</a><p style="text-align:center;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#8C857A;margin:0 0 16px;">${sub}</p>`;
const DARK = (label, text) => `<pre style="white-space:pre-wrap;background:#16130B;color:#F4F1EA;border:1px solid rgba(235,196,0,0.5);border-radius:10px;padding:18px 20px;font-size:13px;line-height:1.55;overflow:auto;font-family:ui-monospace,Menlo,monospace;"><strong style="color:#EBC400;display:block;margin-bottom:10px;letter-spacing:.18em;font-size:11px;">${label}</strong>${text}</pre>`;

const P1 = `I've attached [AUTHOR]'s [YEAR] paper "[PAPER TITLE]". Read the full paper, then use the Higgsfield MCP connector and its App Builder to create and deploy a live interactive web app that recreates [CORE RESULT — the paper's famous finding, e.g. "the forgetting curve"] and turns it into [HANDS-ON TOOL — a working tool visitors can use, e.g. "a spaced-repetition study tool"].

Workflow — use Higgsfield for everything:
1. Start by loading Higgsfield's website creation instructions so you follow their app builder flow correctly.
2. Create the app as a new Higgsfield website project named "[PROJECT-SLUG, lowercase-with-dashes]".
3. Build all features listed below, then deploy through Higgsfield and give me the live shareable URL.
4. I'll be watching in the preview — after deploying, confirm the site is live before finishing.

Part 1 — Recreate the paper's results:
- Extract the original data behind the core result from [SECTION/TABLE where the numbers live]: [LIST THE KEY VARIABLES]. If exact values aren't in the paper, use the standard published figures and say so on the page.
- Plot the result as [CHART TYPE]: x-axis "[X LABEL]", y-axis "[Y LABEL]".
- Mark and annotate each original data point on the chart with its actual value.
- Add a toggle that overlays [THE SECOND INSIGHT — e.g. "the spacing effect"].
- Include a short "About the experiment" panel explaining the method: [2–4 METHOD CONCEPTS] — in plain language a college student would understand.`;

const P2 = `Part 2 — Make it a usable tool:
- Let users [CREATE/ENTER THEIR OWN DATA — flashcards, habits, guesses, reaction-time trials].
- Apply the paper's actual model to that input: [THE MECHANIC — schedule reviews on the paper's intervals, score against the published baseline, predict their result].
- After each use, plot the user's personal results on top of the original [YEAR] data.
- Show a simple dashboard: [3 LIVE STATS that matter].

Design:
- [THEME — dark/light], clean modern typography, smooth chart animations.
- Mobile-friendly, since [AUDIENCE] will open this on their phones.
- One-page layout: result visualization on top, interactive tool below.

Deliverable:
A single live, deployed Higgsfield app with a public URL I can send to anyone. All data stored locally in the browser (no login required). When the link loads, the recreated [YEAR] result should render immediately with the annotated original data points.`;

const teaser = `
<h3>Don't cite the famous paper. Rebuild it.</h3>
<p>Every student cites Ebbinghaus. Almost nobody has ${HL("rebuilt him as software")}. This system takes any research paper and turns it into a live, interactive web app — the famous chart recreated with the original data, plus a working tool visitors can use on themselves.</p>
<p>See the finished example — a 140-year-old memory experiment, now a working spaced-repetition study tool:</p>
${BTN(DEMO, "🧠 forgetting-curve-1885.higgsfield.app →", "The worked example — Ebbinghaus (1885), live right now")}
<p>The stack: <strong>Claude</strong> reads the paper and does the thinking. <strong>Higgsfield's App Builder</strong> (connected through MCP) builds and deploys to a public URL. You paste one prompt.</p>
<h3>The setup — connect Higgsfield to Claude (100 free credits)</h3>
${BTN(UTM, "⚡ Sign up + get your Higgsfield MCP link →", "Start here — 100 free credits for new users")}
<p style="text-align:center;margin:-6px 0 16px;">Promo code: ${HL("HIGGSFIELD_HQMVB9R9")} — enter it when you sign up.</p>
<ul>
<li><strong>Copy the MCP link</strong> — sign up through the button and copy the connector link.</li>
<li><strong>Open Claude's connectors</strong> — Customize → Connectors.</li>
<li><strong>Add a custom connector</strong> — paste the link, confirm.</li>
<li><strong>Toggle green</strong> — Claude can now build and deploy real web apps through Higgsfield.</li>
</ul>`;

const rest = `
<h3>Pick your paper — the three rules</h3>
<ul>
<li><strong>It needs numbers you can plot.</strong> One strong chart beats ten weak ones.</li>
<li><strong>Visitors should be able to run the experiment on themselves.</strong> Stroop test, reaction time, loss-aversion bets. ${HL("If a visitor can generate a data point in under a minute, the app spreads.")}</li>
<li><strong>Old classics are ideal.</strong> Pre-1930 = public domain, famous names, simple methods — and nobody has seen them as software.</li>
</ul>
<p><strong>Starter shelf:</strong> Ebbinghaus 1885 (forgetting curve → flashcards) · Stroop 1935 (interference → play-it-yourself) · Yerkes-Dodson 1908 (arousal curve → focus tracker) · serial position effect (→ try-it-live) · Kahneman &amp; Tversky loss aversion (→ betting game).</p>
<h3>The universal prompt — part 1: recreate the results</h3>
<p>Two brackets decide everything: ${HL("[CORE RESULT]")} — the one finding worth recreating — and ${HL("[HANDS-ON TOOL]")} — a way for visitors to use the finding on themselves.</p>
${DARK("THE PROMPT · PART 1 OF 2", P1)}
<h3>Part 2: make it usable</h3>
${DARK("THE PROMPT · PART 2 OF 2", P2)}
<p>Paste both parts as ONE message, paper PDF attached, Higgsfield connector on. Claude reads, builds, deploys, and hands you the live URL.</p>
<h3>The worked example — the answer key</h3>
<ul>
<li><strong>Paper:</strong> Ebbinghaus, <em>Memory</em> (1885)</li>
<li><strong>[CORE RESULT]:</strong> the forgetting curve · <strong>[HANDS-ON TOOL]:</strong> spaced-repetition flashcards</li>
<li><strong>[SECOND INSIGHT]:</strong> the spacing effect · <strong>[MECHANIC]:</strong> review intervals pulled from the curve itself</li>
<li><strong>[3 LIVE STATS]:</strong> cards due today · current retention estimate · next scheduled review</li>
<li><strong>Result:</strong> <a href="${DEMO}">forgetting-curve-1885.higgsfield.app</a></li>
</ul>
<h3>Put it on your resume</h3>
<p>Use the classic student format — Education → Technical Skills → Experience → Projects — and write every bullet with the ${HL("X-Y-Z formula")}: <em>"Accomplished X (result), by doing Y (skills, actions, tools), as measured by Z (numbers, scale, users)."</em> Your Projects entry, pre-filled:</p>
${DARK("PROJECTS ENTRY · X-Y-Z FORMAT", `[Your App Name] | Builder & Developer
Link: [your-app].higgsfield.app

• Recreated [author]'s [year] [core result] as a live interactive web app (X), by prompting Claude with the Higgsfield App Builder MCP to extract, model, and deploy the paper's original data (Y), producing a public tool with [N] visitors and every original data point annotated (Z).

• Designed a hands-on [tool type] applying the paper's actual model to user input (X), using [the mechanic] (Y), measured by [live stat, e.g. retention estimates per session] (Z).`)}
<p><em>Straight talk: check the app's numbers against the paper before you share it broadly — AI can misread a table, and the whole flex is that YOUR recreation is faithful. Five minutes of checking protects the credibility that makes this impressive.</em></p>`;

(async () => {
  const pdf = readFileSync(path.join(os.homedir(), "lead-magnets/paper-to-app/pdf/paper-to-app-guide.pdf"));
  const up = await sb.storage.from("pdfs").upload(`${SLUG}.pdf`, pdf, { contentType: "application/pdf", upsert: true });
  console.log("pdf upload:", up.error ? up.error.message : "ok");

  const row = {
    slug: SLUG,
    title: "Any research paper. A live app in minutes.",
    description: "The exact Claude + Higgsfield App Builder system that turns any research paper into a live, shareable interactive web app — the setup, the universal prompt, and the worked example you can click right now.",
    whats_inside: [
      "The live worked example — Ebbinghaus 1885 as a working app",
      "The Higgsfield MCP connection (100 free credits)",
      "The 3 rules for picking a paper that spreads",
      "The universal fill-in-the-brackets prompt",
      "The worked-example answer key",
      "The resume template for shipping it as a project",
    ],
    category: "AI Tools",
    cover_url: null,
    pdf_path: `${SLUG}.pdf`,
    video_url: UTM,
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
