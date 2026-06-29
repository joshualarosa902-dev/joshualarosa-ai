// Publishes the Claude + Higgsfield World Cup Shorts guide to the hub:
// uploads the PDF, seeds the resources row, and adds the metered-article content.
// Run from ~/joshualarosa-ai:  node scripts/add_worldcup.mjs
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

const SLUG = "claude-higgsfield-worldcup";
const UTM = "https://higgsfield.ai/s/higgsfield-mcp-v3-earning-series-joshualarosa.ai-nDeYAA";

const PROMPT = `You're my AI creative director. I'll give you one viral World Cup short; use Higgsfield to produce 15 fresh ones in the same winning style.

Reference short: [PASTE LINK]

1) Study the reference and lock its DNA — the first-second hook, the cut rhythm and pacing, the color and lighting, the type of moment, and exactly why it holds attention.

2) With Higgsfield, generate 15 vertical 9:16 World Cup shorts that share that DNA but never repeat. Spread them across these lanes: last-minute winners, slow-mo goals, trophy lifts, crowd eruptions, underdog upsets, GOAT montages, and rivalry hype.

Every short must:
- Open on the most dramatic frame within the first 0.5 seconds — no slow intros.
- Look broadcast-grade and cinematic: rich color, real stadium atmosphere, crowd energy.
- Run 5-8 seconds and loop cleanly, built for YouTube Shorts and TikTok.

Generate all 15, then list them numbered with a one-line title and a punchy first-second caption for each so I can post them fast.`;

const C = {
  title: "15 viral World Cup shorts from one clip",
  subtitle: "The exact Claude + Higgsfield setup students are using to turn one viral World Cup short into a week of monetizable faceless shorts — the connection, the optimized prompt, and 10 variations.",
  category: "AI Tools",
  whats_inside: [
    "The one-time Higgsfield-to-Claude connection",
    "The optimized prompt that turns one clip into 15 shorts",
    "The 4-step batch workflow",
    "How to post and actually monetize the output",
    "10 ready-to-run World Cup short prompts",
  ],
  sections: [
    {
      label: "The Opportunity",
      title: "Faceless shorts are printing while you sleep",
      body: `<p>Right now, faceless World Cup shorts are pulling <strong>millions of views</strong> and getting monetized while the people who posted them are asleep. No face, no editing background, no film crew — just clips, posted on repeat.</p><p>The shift: you no longer have to make them one at a time. You point two AI tools at one viral clip and they hand you a week's worth back. That's the whole play, and this guide is the exact setup.</p><p>Two tools do the work. <strong>Claude</strong> is the brain that takes your instruction. <strong>Higgsfield</strong> is the engine that renders the shorts. Connect them once, and from then on it's one sentence per batch.</p>`,
    },
    {
      label: "The Setup",
      title: "Connect Higgsfield to Claude in 60 seconds",
      body: `<p>You only do this <span style="background:rgba(235,196,0,0.32);padding:1px 5px;border-radius:3px;font-weight:600;">once</span>. After it's connected, Claude can talk to Higgsfield directly and generate videos on command.</p><a href="${UTM}" style="display:block;text-align:center;background:#EBC400;color:#16130B;font-weight:700;padding:15px 22px;border-radius:12px;margin:18px 0 4px;text-decoration:none;">⚽ Sign up + connect Higgsfield →</a><p style="text-align:center;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#8C857A;margin:0 0 16px;">Start here — this is the link you connect in Claude</p><ul><li><strong>Copy the link</strong> — go to <a href="${UTM}" style="background:rgba(235,196,0,0.32);color:#16130B;font-weight:600;padding:1px 5px;border-radius:3px;border-bottom:2px solid #EBC400;text-decoration:none;">higgsfield.ai/mcp</a> and copy the connector link it gives you.</li><li><strong>Open connectors</strong> — in Claude, click Customize, then Connectors.</li><li><strong>Add a custom connector</strong> — choose Add custom connector.</li><li><strong>Paste and save</strong> — paste the Higgsfield link, confirm, and you're connected.</li></ul>`,
    },
    {
      label: "The Workflow",
      title: "One clip in, fifteen shorts out",
      body: `<p>Once connected, the whole loop is four moves, and the rendering happens on Higgsfield's side:</p><ul><li><strong>Connect</strong> — Higgsfield is linked inside Claude.</li><li><strong>Grab a viral clip</strong> — find a World Cup short that's blowing up and copy its link.</li><li><strong>One prompt</strong> — paste the link into Claude and run the prompt below.</li><li><strong>Let it cook</strong> — Higgsfield renders the whole batch in the background.</li></ul><p>You're not editing fifteen videos. You're approving one instruction and letting two AIs do the fifteen.</p>`,
    },
    {
      label: "The Exact Prompt",
      title: "The optimized prompt — paste it straight into Claude",
      body: `<p>Drop your viral clip's link where it says, paste the whole thing into Claude, and let Higgsfield take it from there.</p><pre style="white-space:pre-wrap;background:#16130B;color:#F4F1EA;border:1px solid rgba(235,196,0,0.5);border-radius:10px;padding:18px 20px;font-size:14px;line-height:1.6;overflow:auto;font-family:ui-monospace,Menlo,monospace;">${PROMPT}</pre><p>Run a batch of 5 first to lock the look, then scale the same prompt to 15.</p>`,
    },
    {
      label: "Make It Monetizable",
      title: "Turn renders into a posting machine",
      body: `<p>Generating the shorts is the easy half. The money comes from posting consistently and letting the algorithm find your winners.</p><ul><li><strong>Post daily</strong> — a week's worth from one batch means one a day without touching the tools again.</li><li><strong>Hook in the first second</strong> — lead with the goal, the celebration, the upset.</li><li><strong>Let volume pick the winner</strong> — post them all, then double down on what pops.</li></ul><p>Straight talk: this is a real workflow, not a money button. "$10K/month" is what's possible at the top, not a guarantee — results depend on volume, niche, and consistency. Every platform has its own policy on AI-generated and rights-managed sports footage, so check the rules before you post at scale.</p>`,
    },
  ],
  prompts: [
    { name: "The last-minute winner", text: "A 90th-minute winning goal in cinematic slow motion — the strike, the net rippling, the bench erupting — crowd roar swelling, vertical 9:16, broadcast-grade color." },
    { name: "Slow-mo goal cathedral", text: "One unstoppable goal replayed from three angles in dramatic slow motion, stadium lights flaring, confetti hanging in the air, scored to a rising orchestral hit." },
    { name: "The nation erupts", text: "Cut between the goal and a packed fan zone losing its mind — flares, flags, strangers hugging — a fast hype edit with motion blur and hard beat-synced cuts." },
    { name: "Underdog upset", text: "A tiny nation stuns a giant: the winning moment, players collapsing in disbelief, commentary spiking, captioned 'nobody saw this coming.'" },
    { name: "The GOAT montage", text: "A 12-second highlight reel of one legend's best World Cup moments, retro footage cutting to modern, every touch on the beat, ending on the trophy." },
    { name: "Trophy lift", text: "The captain lifts the World Cup in a storm of golden confetti — slow push-in on the cup, teammates roaring behind, anthem swelling. Pure goosebumps." },
    { name: "Crowd POV", text: "Shot from inside the stands the instant the winning goal goes in — phones up, a wave of bodies, the scream — shaky-cam realism, vertical." },
    { name: "Rivalry hype", text: "A pre-match hype edit for two rival nations: flags, fans, star players in slow-mo stare-downs, captioned with the fixture and a countdown." },
    { name: "Retro broadcast", text: "Recreate an iconic goal in grainy 90s broadcast style — VHS scanlines, a vintage scorebug, crowd hiss — then snap to crisp modern color on the celebration." },
    { name: "The final whistle", text: "The last whistle of the final: the winners drop to their knees, the losers freeze, slow-mo tears and roars side by side, captioned 'this is why we watch.'" },
  ],
};

const sec = (s) => `<h3>${s.title}</h3>${s.body}`;
const promptsHtml = `<h3>My 10 best World Cup short prompts</h3><ol>${C.prompts.map((p) => `<li><strong>${p.name} —</strong> ${p.text}</li>`).join("")}</ol>`;
const teaser = C.sections.slice(0, 2).map(sec).join("");
const rest = C.sections.slice(2).map(sec).join("") + promptsHtml;

(async () => {
  const pdf = readFileSync(path.join(os.homedir(), "lead-magnets/claude-higgsfield-worldcup/pdf/claude-higgsfield-worldcup-guide.pdf"));
  const up = await sb.storage.from("pdfs").upload(`${SLUG}.pdf`, pdf, { contentType: "application/pdf", upsert: true });
  console.log("pdf upload:", up.error ? up.error.message : "ok");

  const row = {
    slug: SLUG, title: C.title, description: C.subtitle, whats_inside: C.whats_inside,
    category: C.category, cover_url: null, pdf_path: `${SLUG}.pdf`,
    video_url: UTM, featured: true, published: true,
  };
  const { error } = await sb.from("resources").upsert(row, { onConflict: "slug" });
  console.log("row upsert:", error ? error.message : "ok");

  const gcPath = path.join(ROOT, "lib", "guideContent.json");
  const gc = JSON.parse(readFileSync(gcPath, "utf8"));
  gc[SLUG] = { teaser, rest };
  writeFileSync(gcPath, JSON.stringify(gc, null, 1));
  console.log("guideContent.json updated; total entries:", Object.keys(gc).length);
})();
