// Publishes the OpenArt Director Dealerships guide to the hub: uploads the PDF,
// seeds the resources row, and adds the metered-article content.
// Run from ~/joshualarosa-ai:  node scripts/add_direct.mjs
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

const SLUG = "openart-director-dealerships";
const UTM = "https://openart.ai/director?utm_source=instagram&utm_medium=influencer&utm_campaign=infl-instagram--na-acq-web&ref=joshua-director";

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const HL = (t) => `<span style="background:rgba(235,196,0,0.32);padding:1px 5px;border-radius:3px;font-weight:600;">${t}</span>`;
const BTN = `<a href="${UTM}" style="display:block;text-align:center;background:#EBC400;color:#16130B;font-weight:700;padding:15px 22px;border-radius:12px;margin:18px 0 4px;text-decoration:none;">🎬 Open OpenArt Director →</a><p style="text-align:center;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#8C857A;margin:0 0 16px;">openart.ai/director — where the whole system runs</p>`;
const DARK = (label, text, size) => `<pre style="white-space:pre-wrap;background:#16130B;color:#F4F1EA;border:1px solid rgba(235,196,0,0.5);border-radius:10px;padding:18px 20px;font-size:${size || "13px"};line-height:1.55;overflow:auto;font-family:ui-monospace,Menlo,monospace;"><strong style="color:#EBC400;display:block;margin-bottom:10px;letter-spacing:.18em;font-size:11px;">${label}</strong>${text}</pre>`;

const UNIVERSAL = esc(`Create a cinematic 4K automotive commercial using the uploaded vehicle image or images as the strict visual reference. Begin with a wide front three-quarter hero shot. Use a smooth, steady gimbal-style camera that slowly glides toward the vehicle at a low angle. Gracefully orbit around the front, highlighting the headlights, grille, hood, paintwork, wheels, brake calipers, body lines, and premium exterior details. Continue tracking along the side before curving around the rear and finishing on a powerful full-vehicle hero shot.

If interior reference images are provided, naturally open the driver's door and glide into the cabin, revealing the steering wheel, dashboard, displays, center console, materials, stitching, and seats. Finish from the driver's perspective as the interior lighting and dashboard softly illuminate. If no interior references are provided, remain outside the vehicle and do not invent an interior.

Place the vehicle in a clean, premium automotive environment that complements its original appearance. Use warm natural light, a subtle golden-hour glow, realistic reflections across the paint and glass, soft cinematic shadows, shallow depth of field, smooth cinematic motion, and crisp photorealistic detail.

Keep the vehicle's make, model, generation, body shape, paint color, trim, wheels, badges, grille, headlights, proportions, interior, and every other visible design feature completely consistent with the uploaded references in every shot. Do not redesign, recolor, modify, or invent any part of the vehicle.

Keep the pacing refined, aspirational, and believable, like an official commercial from a premium automotive brand. Avoid warped body panels, distorted wheels, changing paint, inconsistent badges, flickering reflections, duplicate vehicles, floating parts, impossible camera paths, unnatural door movement, sudden lighting changes, or unrealistic physics.

Add tasteful cinematic sound design with subtle ignition, door, cabin, tire, road, and engine sounds only when visually appropriate, paired with a restrained luxury instrumental score. No people, dialogue, voiceover, captions, prices, added logos, watermarks, plate numbers, body modifications, or extra accessories.

Format vertically in 9:16 for TikTok and Instagram Reels. End on a clean, stable full-vehicle hero frame with room for the dealership's logo and call to action to be added later.`);

const PORSCHE = esc(`Create a 20-second vertical cinematic dealership commercial for the exact Lava Orange 2020 Porsche 911 Carrera S shown in the reference. Keep the car's body shape, Lava Orange paint, black wheels, Aerokit, headlights, proportions, and interior consistent in every shot. Open with a dark showroom reveal, move into a low-angle rolling shot through a modern city at blue hour, cut to close-ups of the headlights, wheels, rear light bar, and orange bodywork, then finish with a powerful hero stop beneath clean architectural lighting. Premium, masculine, believable automotive advertising. No people, no dialogue, no plate numbers, no new body modifications, no color changes, no distorted wheels, and no extra logos. Add a restrained luxury electronic score, ignition sound, subtle turbo and road ambience, and cinematic impacts. Format 9:16. End on a clean hero frame suitable for a dealership CTA.`);

const EMAIL = esc(`Subject: made a video for your [CAR] listing

Hey, I came across the [YEAR MAKE MODEL] you have listed and made a commercial for it. Here's a preview: [WATERMARKED LINK]

If you want it, the full clean version is $1,000 and comes with four alternate opening hooks cut for Reels and TikTok, so you can test which one moves the car. I can have the final files to you today.

Either way, that's a beautiful car. Good luck with the sale.`);

const teaser = `
<h3>Six-figure inventory. Phone-camera videos.</h3>
<p>Walk through exotic dealership Instagram pages and you'll see the same thing everywhere: ${HL("$200,000 cars filmed like marketplace furniture")}. That gap is the business — you take one listing they already photographed professionally, turn it into a cinematic commercial with OpenArt Director, and sell them the finished video for ${HL("$1,000")}.</p>
<p><strong>The math from the video:</strong> close two a day for 28 days and that's $56,000 — Porsche 911 money before the month is out. That's the system at full sprint; the machine that gets you there is below.</p>
<h3>The tool — you vibe direct, it films</h3>
<p><strong>OpenArt Director</strong>: upload reference images of the exact car, describe the commercial, and it directs the whole thing — camera moves, lighting, sound design, score — with videos up to <strong>five minutes long</strong>.</p>
${BTN}
<p>Upload the listing's photos → paste the universal prompt below → generate, keep the best take, watermark it for the pitch.</p>`;

const rest = `
<h3>Find the target — the dealership checklist</h3>
<ul>
<li><strong>Expensive inventory</strong> — a $1,000 video against a $200K listing is a rounding error.</li>
<li><strong>Terrible or missing video</strong> — phone pans, slideshows, or nothing. The bigger the gap, the easier the close.</li>
<li><strong>Active on Instagram</strong> — their profile's ${HL("email button")} is your sales channel.</li>
</ul>
<p>Collect references from ONE listing — hero angles plus interior if shown. Work with photos you're authorized to use: you're making a private, watermarked preview <em>for the dealership that owns the car and the photos</em> — that's why the pitch lands as a favor, not a liberty.</p>
<h3>The universal automotive prompt</h3>
${DARK("THE UNIVERSAL PROMPT", UNIVERSAL, "12px")}
<h3>The worked example — the exact Porsche prompt</h3>
<p>Verbatim from the video (Lava Orange 2020 911 Carrera S). Steal its structure for car-specific versions: name the exact paint/wheels/trim, write the shot order, ban the failure modes, end on a logo-ready frame:</p>
${DARK("THE PORSCHE 911 PROMPT · VERBATIM", PORSCHE, "12px")}
<h3>The close — the email button is the whole funnel</h3>
${DARK("THE PITCH EMAIL", EMAIL)}
<ul>
<li><strong>Watermarked preview</strong> — the gift sells; $1,000 buys the clean files.</li>
<li><strong>Four alternate hooks</strong> — same commercial, four 3-second openings. Minutes of work, double the deliverable.</li>
<li><strong>Negotiate?</strong> $750 floor. <strong>They love it?</strong> Pitch monthly: one commercial per new arrival, $2,500/month.</li>
<li><strong>Silence?</strong> One bump at 24 hours, then next dealership. There are thousands.</li>
</ul>
<p><em>Straight talk: two closes a day is the system at full sprint, not day one — cold email means silence is the default and your first videos are practice reps. What converts is being the only person in their inbox who already made the thing. Volume in, quality out, and only send commercials you'd be proud to invoice.</em></p>`;

(async () => {
  const pdf = readFileSync(path.join(os.homedir(), "lead-magnets/openart-director-dealerships/pdf/openart-director-dealerships-guide.pdf"));
  const up = await sb.storage.from("pdfs").upload(`${SLUG}.pdf`, pdf, { contentType: "application/pdf", upsert: true });
  console.log("pdf upload:", up.error ? up.error.message : "ok");

  const row = {
    slug: SLUG,
    title: "Two videos a day. A Porsche in 28 days.",
    description: "The dealership commercial system: find exotic inventory with terrible videos, vibe direct a cinematic commercial with OpenArt Director, and sell it for $1,000 — both prompts included, plus the outreach that closes.",
    whats_inside: [
      "The dealership target checklist",
      "OpenArt Director setup (videos up to 5 minutes)",
      "The universal automotive prompt, copy-paste ready",
      "The exact Porsche 911 prompt from the video",
      "The pitch email + the four-hooks upsell",
      "The pricing ladder and monthly retainer play",
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
