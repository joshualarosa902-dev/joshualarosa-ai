// Publishes the Fable 5 Client System guide to the hub: uploads the PDF,
// seeds the resources row, and adds the metered-article content.
// Run from ~/joshualarosa-ai:  node scripts/add_fable.mjs
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

const SLUG = "fable-5-client-system";
const UTM = "https://higgsfield.ai/s/higgsfield-mcp-v3-earning-series-joshualarosa.ai-nDeYAA";

const BTN = `<a href="${UTM}" style="display:block;text-align:center;background:#EBC400;color:#16130B;font-weight:700;padding:15px 22px;border-radius:12px;margin:18px 0 4px;text-decoration:none;">🖇 Claim your 100 free credits + MCP link →</a><p style="text-align:center;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#8C857A;margin:0 0 16px;">3-day free trial · new users get 100 credits</p>`;
const HL = (t) => `<span style="background:rgba(235,196,0,0.32);padding:1px 5px;border-radius:3px;font-weight:600;">${t}</span>`;
const DARK = (label, text) => `<pre style="white-space:pre-wrap;background:#16130B;color:#F4F1EA;border:1px solid rgba(235,196,0,0.5);border-radius:10px;padding:18px 20px;font-size:14px;line-height:1.6;overflow:auto;font-family:ui-monospace,Menlo,monospace;"><strong style="color:#EBC400;display:block;margin-bottom:10px;letter-spacing:.18em;font-size:11px;">${label}</strong>${text}</pre>`;

const PROMPT = `You're my AI creative director, and this is a client pitch I need to win.

Attached is a screenshot of [BUSINESS NAME]'s Instagram — a [NICHE, e.g. coffee shop] in [CITY].

1) Research first: figure out what they sell, who actually buys it, and what the best competitors in their niche are doing on social that they aren't.

2) Then use Higgsfield to build them a full sample campaign — spend my free credits where they'll impress most:
- Professional product shots in a style that fits their brand
- Lifestyle shots with AI models using/wearing their products
- 2-3 short vertical promo clips they could post as reels

3) Package everything like an agency deliverable: a two-week posting calendar, a caption + hashtags for every post, and the order to post them in.

The bar: when the owner opens this, they should think "this looks like a $500 campaign" — and immediately wonder what a full month would look like. Show me the plan before you generate, then execute it.`;

const DM = `Hey [NAME] — I put together a quick content pack for [BUSINESS] and wanted you to have it. No charge, no catch.

Inside: professional product shots, a couple of short reels, and a 2-week posting plan with captions written out.

[attach your 2-3 best pieces]

It's yours to post either way. If it brings people in, I'll build you next month's — want me to send the full pack?`;

const teaser = `
<h3>The most talked-about model is back — briefly free</h3>
<p><strong>Claude Fable 5</strong> is the model the whole internet went wild over — state-of-the-art on the benchmarks, so capable that U.S. regulators restricted it days after release. Now it's back online, and there's a ${HL("3-day window")} to run it with Higgsfield completely free.</p>
<p>The combo that matters: <strong>Fable 5 is the brain. Higgsfield gives it hands.</strong> Connect them and Claude doesn't just describe the photos and videos a brand needs — it actually generates them: product shots, AI model photoshoots, promo reels, full campaigns from one prompt.</p>
${BTN}
<h3>Give Fable 5 its hands — 60 seconds</h3>
<ul>
<li><strong>Grab your MCP link</strong> — sign up through the free-credits link above and copy the Higgsfield MCP connector link.</li>
<li><strong>Open Claude's connectors</strong> — hit Customize, then Connectors.</li>
<li><strong>Add a custom connector</strong> — paste your link.</li>
<li><strong>Flip it on</strong> — toggle green. That's Fable 5 with hands, and 100 credits to spend.</li>
</ul>`;

const rest = `
<h3>Ugly marketing is your business model</h3>
<p>Everyone else is using Fable 5 to code. You're using it to land a ${HL("$500-level client")} with zero design skills and zero money:</p>
<ul>
<li><strong>Find a local business with ugly marketing</strong> — coffee shop, clothing brand, gym. Blurry photos and a dead feed are your opening.</li>
<li><strong>Screenshot their Instagram</strong> — the grid is your brief.</li>
<li><strong>Run the exact prompt below</strong> — Fable 5 researches the niche, Higgsfield generates the campaign.</li>
<li><strong>Deliver it as a free sample</strong> — the DM script below does the selling.</li>
</ul>
<p>What you make in 5 minutes is what a small agency would charge $500+ and take a week to deliver. You're not selling AI — you're selling the result.</p>
<h3>The exact prompt</h3>
<p>Fill in the three brackets, attach the screenshot, and send:</p>
${DARK("THE PROMPT", PROMPT)}
<p>The "show me the plan before you generate" line is the credit-saver — you approve the shot list before any credits get spent.</p>
<h3>The DM that turns a sample into a client</h3>
${DARK("THE OUTREACH DM", DM)}
<p><strong>Then the ladder:</strong> no reply in 3 days → one follow-up, then move on. They bite → first paid pack at ${HL("$300–500 flat")} for a month of content. They love it → monthly retainer. Two or three retainers is rent money — from a free trial.</p>
<h3>100 credits, 3 days — the battle plan</h3>
<ul>
<li><strong>One business done brilliantly beats five done half.</strong> Spend most credits making one sample unmistakably professional.</li>
<li><strong>Day 1:</strong> connect, pick your target, run the prompt. <strong>Day 2:</strong> package + send the DM. <strong>Day 3:</strong> follow-ups + a second sample if credits remain.</li>
<li><strong>10 niches with famously ugly feeds:</strong> coffee shops, barbershops, gyms, nail &amp; lash studios, local clothing brands, restaurants, car detailers, juice bars, boutiques, real-estate agents.</li>
</ul>
${BTN}
<p><em>Straight talk: "$500 in 5 minutes" is the value of what you deliver, not a guaranteed payday — landing the client still takes real outreach, and most yeses come after a few nos. The system works because the sample is real. Send more than one.</em></p>`;

(async () => {
  const pdf = readFileSync(path.join(os.homedir(), "lead-magnets/fable-5-client-system/pdf/fable-5-client-system-guide.pdf"));
  const up = await sb.storage.from("pdfs").upload(`${SLUG}.pdf`, pdf, { contentType: "application/pdf", upsert: true });
  console.log("pdf upload:", up.error ? up.error.message : "ok");

  const row = {
    slug: SLUG,
    title: "Fable 5 is back. Go land a client.",
    description: "The exact Claude Fable 5 + Higgsfield system students are using to build $500-level sample campaigns in minutes — the setup, the exact prompt, the outreach DM, and the free-credits link.",
    whats_inside: [
      "The 60-second Fable 5 × Higgsfield MCP connection",
      "The exact client-campaign prompt",
      "The outreach DM that turns samples into paying clients",
      "The $300–500 pricing ladder",
      "The 3-day / 100-credit battle plan + 10 target niches",
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
