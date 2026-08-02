// Publishes the Seedance Launch Films guide to the hub: uploads the PDF,
// seeds the resources row, and adds the metered-article content.
// Run from ~/joshualarosa-ai:  node scripts/add_launch.mjs
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

const SLUG = "seedance-launch-films";
const UTM = "https://higgsfield.ai/s/higgsfield-x-seedance-2-5-joshualarosa.ai-odJOjH";

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const PROMPT = esc(readFileSync(path.join(os.homedir(), "lead-magnets/seedance-launch-films/prompt.txt"), "utf8").trim());

const HL = (t) => `<span style="background:rgba(235,196,0,0.32);padding:1px 5px;border-radius:3px;font-weight:600;">${t}</span>`;
const BTN = `<a href="${UTM}" style="display:block;text-align:center;background:#EBC400;color:#16130B;font-weight:700;padding:15px 22px;border-radius:12px;margin:18px 0 4px;text-decoration:none;">🎬 Get the pre-sale — unlimited Seedance →</a><p style="text-align:center;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#8C857A;margin:0 0 16px;">Unlimited 2.0 now · 2.5 when it drops · 7 days</p>`;
const DARK = (label, text, size) => `<pre style="white-space:pre-wrap;background:#16130B;color:#F4F1EA;border:1px solid rgba(235,196,0,0.5);border-radius:10px;padding:18px 20px;font-size:${size || "13px"};line-height:1.55;overflow:auto;font-family:ui-monospace,Menlo,monospace;"><strong style="color:#EBC400;display:block;margin-bottom:10px;letter-spacing:.18em;font-size:11px;">${label}</strong>${text}</pre>`;

const EMAIL = esc(`Subject: made you a launch video

Hey [FIRST NAME], congrats on the [PRODUCT] launch. I checked it out on Product Hunt and honestly the product deserves a better video than the one on the page.

So I made you one. Here it is: [LINK]

It's a full launch film cut for social. If you want it, it's $1,000 for the final version with your tweaks, and I turn revisions around same day. If not, no stress, and good luck with the launch either way.`);

const teaser = `
<h3>Launch day is everything. Their video is an afterthought.</h3>
<p>Every day, founders launch on Product Hunt after months of building — and half of them ship with a ${HL("screen recording and free music")} as their launch video. Launch day is the one day everyone's watching, and their weakest asset is the thing everyone sees first.</p>
<p>That gap is the business: find those launches, turn their own brand assets into a <strong>cinematic launch film</strong> with Seedance on Higgsfield, and send the finished video straight to the founder. Not a pitch — the finished thing. A launch film is worth $1,000 to a founder who just shipped; close one a day for 10 days and that's ${HL("$10,000 before school starts")}.</p>
<h3>The window — unlimited Seedance for 7 days</h3>
<p>The economics work this well right now because Higgsfield's pre-sale gets you ${HL("unlimited Seedance 2.0")} plus <strong>2.5 when it releases</strong> for 7 days. Unlimited generations means every attempt is free — make ten films, send the best ones.</p>
${BTN}
<p>Setup: sign up through the button → open Seedance on Higgsfield → upload your references plus the master prompt below.</p>`;

const rest = `
<h3>Find the target</h3>
<p>Open <a href="https://www.producthunt.com">Product Hunt</a> and hunt today's and yesterday's launches. Your target: a <strong>genuinely useful app</strong> (one-sentence explainable), with a <strong>terrible or missing demo video</strong>, and <strong>signs of life</strong> (real upvotes, founder active in comments).</p>
<p><strong>Then raid the brand assets:</strong> the clean logo (site footer or press page), real product screenshots from every angle, brand colors, and their Product Hunt gallery. These become your @PRODUCT_REFERENCE and @DEMO_REFERENCE uploads — the prompt keeps their real interface pixel-faithful, which is why the result looks agency-made.</p>
<h3>The master prompt — copy and paste</h3>
<p>Fill only the seven INPUTS lines; the rest is the engine:</p>
${DARK("THE MASTER PROMPT", PROMPT, "12px")}
<p>The INVARIANTS block is why founders say yes: no invented features, no fake stats, their real interface preserved. You're selling a better version of the truth — nothing in the film they'd have to walk back.</p>
<h3>The close — send the film, not a pitch</h3>
<p><strong>Find the founder's email:</strong> Product Hunt profile, site footer, X/LinkedIn bio, or firstname@product domain. Founders on launch day read everything.</p>
${DARK("THE FOUNDER EMAIL", EMAIL)}
<ul>
<li><strong>Attach a watermarked or downscaled cut</strong> — the gift does the selling; $1,000 buys the clean file plus tweaks.</li>
<li><strong>They negotiate?</strong> $750 floor, or $1,000 with a second platform cut. Never free — the sample already was.</li>
<li><strong>They ghost?</strong> One bump at 24 hours, then next target. Volume is the strategy.</li>
</ul>
<p><em>Straight talk: "$1,000 a day" is the top of the funnel working perfectly, not a floor — cold outreach means plenty of nos, and your first sends are practice. The reason this converts at all is that you're the only person in their inbox who already did the work. Send more than you expect to close, and only send films you'd put your own name on.</em></p>`;

(async () => {
  const pdf = readFileSync(path.join(os.homedir(), "lead-magnets/seedance-launch-films/pdf/seedance-launch-films-guide.pdf"));
  const up = await sb.storage.from("pdfs").upload(`${SLUG}.pdf`, pdf, { contentType: "application/pdf", upsert: true });
  console.log("pdf upload:", up.error ? up.error.message : "ok");

  const row = {
    slug: SLUG,
    title: "One launch film. One $1,000 invoice.",
    description: "The Product Hunt launch-film system: find an app with a terrible demo, turn its brand assets into a cinematic launch film with Seedance on Higgsfield, and sell it straight to the founder — master prompt included.",
    whats_inside: [
      "The Product Hunt target checklist",
      "The brand-asset raid (what to save and why)",
      "The full 5-shot master prompt, verbatim",
      "The Seedance pre-sale window (unlimited for 7 days)",
      "The founder email that sells the finished film",
      "The pricing ladder and follow-up rules",
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
