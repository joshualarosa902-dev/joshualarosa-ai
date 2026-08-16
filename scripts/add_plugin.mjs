// Publishes the Higgsfield ChatGPT Plugin guide to the hub: uploads the PDF,
// seeds the resources row, and adds the metered-article content.
// Run from ~/joshualarosa-ai:  node scripts/add_plugin.mjs
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

const SLUG = "higgsfield-chatgpt-plugin";
const UTM = "https://higgsfield.ai/s/higgsfield-plugin-in-chatgpt-ig-joshualarosa.ai-upuioD";
const CODEX = "https://chatgpt.com/codex/students";

const HL = (t) => `<span style="background:rgba(235,196,0,0.32);padding:1px 5px;border-radius:3px;font-weight:600;">${t}</span>`;
const BTN = (href, label, sub) => `<a href="${href}" style="display:block;text-align:center;background:#EBC400;color:#16130B;font-weight:700;padding:15px 22px;border-radius:12px;margin:18px 0 4px;text-decoration:none;">${label}</a><p style="text-align:center;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#8C857A;margin:0 0 16px;">${sub}</p>`;
const DARK = (label, text) => `<pre style="white-space:pre-wrap;background:#16130B;color:#F4F1EA;border:1px solid rgba(235,196,0,0.5);border-radius:10px;padding:18px 20px;font-size:14px;line-height:1.6;overflow:auto;font-family:ui-monospace,Menlo,monospace;"><strong style="color:#EBC400;display:block;margin-bottom:10px;letter-spacing:.18em;font-size:11px;">${label}</strong>${text}</pre>`;

const FLYOVER = `I've attached photos of [LOCATION — e.g. Arrowhead Golf Course]. Using Higgsfield with Seedance, create one continuous cinematic aerial flyover video of this exact location.

Keep every real detail from the photos — the terrain, colors, buildings, and layout must match the references. Start wide and high like a drone establishing shot, glide forward over the most scenic stretch, then descend into a slow low pass across the signature feature, and end on a hero view with soft golden-hour light.

Smooth drone-style motion only: no cuts that break the illusion of one flight, no warped geometry, no invented buildings. Format 9:16 vertical, broadcast-grade color, subtle wind and ambient sound. It should look like a professional drone pilot shot it this morning.`;

const teaser = `
<h3>Free money, then free hands</h3>
<p>This is a two-move play, and your student email is the key to both. <strong>Move 1:</strong> OpenAI gives university students ${HL("$100 in free Codex credits")} (2,500 credits), claimed in minutes with your school email. <strong>Move 2:</strong> plug <strong>Higgsfield</strong> into ChatGPT — suddenly your chat doesn't just talk about images and video, it ${HL("generates them inline")}: Seedance 2.5, Sora, Veo, Kling, Nano Banana, Seedream, with motion presets, camera controls, and character consistency.</p>
<p>You describe. ChatGPT reasons and structures. Higgsfield generates. Idea to finished asset in one conversation.</p>
<h3>Move 1 — claim the $100</h3>
${BTN(CODEX, "🎓 Claim your $100 — chatgpt.com/codex/students →", "Official OpenAI student offer · verified working")}
<ul>
<li>Sign in at the link with your regular ChatGPT account</li>
<li>Verify through SheerID — usually instant with your university email (US/Canada degree-granting schools)</li>
<li>${HL("2,500 credits ($100)")} land automatically. One claim per student; credits expire 12 months after granting — claim now, use them.</li>
</ul>`;

const rest = `
<h3>Move 2 — install Higgsfield inside ChatGPT (five clicks)</h3>
<ol>
<li>Open <strong>ChatGPT</strong> (web or desktop)</li>
<li>Click <strong>Plugins</strong> in the left sidebar</li>
<li>Click <strong>Search plugins</strong> and type <strong>Higgsfield</strong></li>
<li>Click <strong>Add</strong> and sign in to your Higgsfield account — new users get a ${HL("3-day free trial")}</li>
<li><strong>Allow access.</strong> Done — the connector is live in your chat.</li>
</ol>
${BTN(UTM, "⚡ Set up Higgsfield + start the free trial →", "3-day free trial for new users · the setup link from the video")}
<h3>What you just unlocked</h3>
<p>Native ChatGPT image generation is one model. The plugin hands your chat <strong>Seedance 2.5, Sora, Veo, Kling, Nano Banana, Seedream and more</strong> — plus the parts that make outputs look pro: <strong>motion presets</strong> (real camera moves, not random drift), <strong>camera controls</strong> (you direct the shot), and <strong>character consistency</strong> (same face and product in every generation). And because it's all in one thread, iteration is conversational: "make the light warmer and slow the camera down" → revised video, same chat.</p>
<h3>The worked example — one prompt, a full aerial flyover</h3>
<p>The golf-course video from the reel: a few photos in, one prompt, a complete cinematic flyover out. Swap in any location, campus, business, or property:</p>
${DARK("THE FLYOVER PROMPT", FLYOVER)}
<p>The "keep every real detail from the photos" line is what separates a flyover of THE place from a flyover of A place. Feed it 3–6 photos from different angles.</p>
<h3>Make it count</h3>
<ul>
<li><strong>Class projects that look funded</strong> — pitch videos, demos, b-roll nobody else has.</li>
<li><strong>Your own content</strong> — the flyover trick works on your campus, gym, city.</li>
<li><strong>Paid work</strong> — local businesses pay real money for these videos; the flyover prompt plus a business's own photos is a sellable deliverable (see the dealership-commercial and launch-film guides on this site).</li>
<li><strong>The Codex side</strong> — your $100 also builds: use Codex to ship the website or app that goes with the content.</li>
</ul>
<p><em>Keeping it honest: the $100 is OpenAI's official student offer (US/Canada university students, one claim, 12-month expiry) — terms live on OpenAI's help center and can change. The Higgsfield trial is 3 days for new users; generation beyond that runs on Higgsfield's plans. Both setups take minutes — do them in the same sitting.</em></p>`;

(async () => {
  const pdf = readFileSync(path.join(os.homedir(), "lead-magnets/higgsfield-chatgpt-plugin/pdf/higgsfield-chatgpt-plugin-guide.pdf"));
  const up = await sb.storage.from("pdfs").upload(`${SLUG}.pdf`, pdf, { contentType: "application/pdf", upsert: true });
  console.log("pdf upload:", up.error ? up.error.message : "ok");

  const row = {
    slug: SLUG,
    title: "OpenAI's $100 Student Credits + the Higgsfield ChatGPT Plugin Setup",
    description: "Claim OpenAI's $100 in free Codex credits with your student email, then plug Higgsfield into ChatGPT to unlock Seedance 2.5, Sora, Veo, Kling and more — full video production inside one chat. Setup steps, the flyover prompt, and the 3-day free trial link.",
    whats_inside: [
      "The $100 OpenAI student credits claim (verified link + steps)",
      "The 5-click Higgsfield plugin install in ChatGPT",
      "What you unlock: Seedance 2.5, Sora, Veo, Kling + camera controls",
      "The cinematic flyover prompt from the video",
      "Ways students turn the stack into paid work",
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
