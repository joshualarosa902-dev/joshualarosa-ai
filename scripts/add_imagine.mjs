// Publishes the Microsoft Imagine Cup 2027 guide to the hub: uploads the PDF,
// seeds the resources row, and adds the metered-article content.
// Run from ~/joshualarosa-ai:  node scripts/add_imagine.mjs
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

const SLUG = "microsoft-imagine-cup-2027";
const REG = "https://imaginecup.microsoft.com/en-us/Category/register/34";
const RFS = "https://www.ycombinator.com/rfs";

const HL = (t) => `<span style="background:rgba(235,196,0,0.32);padding:1px 5px;border-radius:3px;font-weight:600;">${t}</span>`;
const BTN = `<a href="${REG}" style="display:block;text-align:center;background:#EBC400;color:#16130B;font-weight:700;padding:15px 22px;border-radius:12px;margin:18px 0 4px;text-decoration:none;">🏆 Register for Imagine Cup 2027 →</a><p style="text-align:center;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#8C857A;margin:0 0 16px;">Official Microsoft registration · open now</p>`;
const I = (name, who, desc) => `<li><strong>${name}</strong>${who ? ` <em>(asked for by ${who})</em>` : ""} — ${desc}</li>`;

const teaser = `
<h3>Microsoft Imagine Cup 2027: registration is open, and Microsoft funds student founders</h3>
<p>The <strong>Microsoft Imagine Cup 2027</strong> is a startup competition built for student founders: form a team of up to four students, build a real product on Microsoft's AI stack, and compete on a world stage. ${HL("Registration is already open")} — and registered teams can unlock ${HL("up to $5,000 USD in Azure credits")} to experiment, test, and refine an MVP (Microsoft's own wording).</p>
<ul>
<li><strong>Team size:</strong> up to 4 students — every member registers</li>
<li><strong>Eligibility:</strong> enrolled high-school or college/university students, 18+</li>
<li><strong>2027 deadline &amp; prize pool:</strong> not published yet — which is exactly why registering early wins</li>
<li><strong>What's at stake:</strong> the 2026 cycle's world champion won ${HL("$150,000 and mentorship with Microsoft CEO Satya Nadella")} ($100K Scale and $50K Launch prizes beneath it)</li>
</ul>
${BTN}
<h3>How to enter Imagine Cup 2027</h3>
<p>Register every teammate → unlock the Azure credits → pick your lane (Microsoft lists five categories but explicitly allows any challenge) → and use the missing deadline as your edge: ${HL("credits today, building all semester, polished before rounds are even announced")}. Last cycle ran roughly February through June — plan around that shape.</p>`;

const rest = `
<h3>Build the team before the perfect idea</h3>
<p>The team forms first; the idea sharpens later. Cover four bases: <strong>the builder</strong> (ships the demo on your Azure credits), <strong>the designer</strong> (the "product vs class project" difference), <strong>the business brain</strong> (judges fund founders, not features), and <strong>the domain expert</strong> (the teammate who's lived the problem). Recruit with one message: "Entering Microsoft's Imagine Cup — need a designer/builder. Microsoft gives us $5K in credits to build with." The credits do the recruiting.</p>
<h3>28 startup ideas Y Combinator literally asked for</h3>
<p>YC publishes <a href="${RFS}">Requests for Startups</a> — ideas its partners want founded. Building one for Imagine Cup means pitching judges an idea the world's top accelerator already endorsed. <strong>The current Fall 2026 list:</strong></p>
<ol>
${I("The Primer", "Andrew Miklas", "an adaptive AI tutor teaching kids to read, write, and do math like a private tutor, at consumer scale.")}
${I("The Future of American Defense", "Daniel P. Driscoll, U.S. Secretary of the Army", "low-cost interceptors, sensors, drones, and modular hardware — the Army actively wants commercial solutions.")}
${I("A Cloud for Small Software", "Pete Koomen", "infrastructure that makes deploying a bespoke tool as easy as sharing a Google Doc.")}
${I("Multiplayer AI", "Aaron Epstein", "shared live AI sessions teams can join, watch, and redirect — agent chats become team workspaces.")}
${I("Compute at Sea", "Francois Chaubard", "offshore modular compute using the ocean's space, sunlight, and cooling.")}
${I("AI Consumer Products for 1 Billion People", "Raphael Schaad", "agent-powered products for daily life, built for massive scale.")}
${I("AI for the Aging Population", "Max Kolysh", "voice, monitoring, and robotics keeping older adults independent — a massive care shortage.")}
${I("New Operating Systems for the Physical World", "Charlie Warren", "coordinating AI agents, robots, and human workers for construction and fleet ops.")}
${I("The Best Time to Build in Crypto", "Nemil Dalal", "bear-market infrastructure: stablecoins, agentic commerce, dev ramps.")}
${I("Data for the Real World", "Austin Tindle & Diana Hu", "dense physical-world data collection for energy, agriculture, logistics, and weather.")}
${I("Proving You're Human", "Max Kolysh", "verifying real humans against cheap deepfakes, without sacrificing privacy.")}
${I("AI-Native Compliance Infrastructure", "Daivik Goel", "AI-by-default compliance replacing spreadsheets and analyst armies.")}
${I("Self-Maintaining APIs", "Harsha Gaddipati", "systems that auto-update customer codebases when APIs change — Dependabot for APIs.")}
</ol>
<p><strong>Plus the Summer 2026 wave — 15 more</strong> (full essays archived at <a href="${RFS}">ycombinator.com/rfs</a>): AI for Low-Pesticide Agriculture · AI-Native Service Companies · AI Personalized Medicine · Company Brain · Counter-Swarm Defense · Dynamic Software Interfaces · Electronics in Space · Hardware Supply Chain · Industrial Capabilities in Space · Inference Chips for Agent Workflows · SaaS Challengers · Software for Agents · Startups That Want to Sell to Huge Companies · Supply Chain 2.0 for Semiconductors · The AI Operating System for Companies.</p>
<p><em>Student-friendly picks: The Primer, AI for the Aging Population, Proving You're Human, and Multiplayer AI — all demo-able on Azure with your credits.</em></p>
<h3>The playbook</h3>
<ul>
<li><strong>This week:</strong> register (all teammates), unlock credits, pick an idea.</li>
<li><strong>This month:</strong> build the ugliest working version — the credits exist precisely for this.</li>
<li><strong>This semester:</strong> 20 real users. Traction beats decks in every startup competition ever run.</li>
<li><strong>When rounds drop:</strong> you're the team with a product and users while everyone else registers.</li>
</ul>
${BTN}
<p><em>Keeping it honest: the $5,000 is "up to," in Azure credits, not cash. The 2027 deadline and prize pool genuinely aren't published; the $150K/Satya figures are what last cycle's champion received, cited as context. Verify current rules on the official site. Independent resource by Joshua LaRosa — not affiliated with Microsoft or Y Combinator.</em></p>`;

(async () => {
  const pdf = readFileSync(path.join(os.homedir(), "lead-magnets/imagine-cup-2027/pdf/imagine-cup-2027-guide.pdf"));
  const up = await sb.storage.from("pdfs").upload(`${SLUG}.pdf`, pdf, { contentType: "application/pdf", upsert: true });
  console.log("pdf upload:", up.error ? up.error.message : "ok");

  const row = {
    slug: SLUG,
    title: "Microsoft Imagine Cup 2027: Registration, $5,000 Azure Credits & How to Enter",
    description: "Microsoft Imagine Cup 2027 registration is open. The full student-founder playbook: up to $5,000 in Azure credits, teams of four, eligibility, last cycle's $150K prize context — plus 28 startup ideas Y Combinator asked founders to build.",
    whats_inside: [
      "Imagine Cup 2027 fact sheet — verified on Microsoft's official page",
      "The registration walkthrough + Azure credits unlock",
      "Why the unpublished deadline is your edge",
      "The 4-role team formula and how to recruit",
      "All 28 Y Combinator Requests for Startups (Fall + Summer 2026)",
      "The semester-long build playbook",
    ],
    category: "Career",
    cover_url: null,
    pdf_path: `${SLUG}.pdf`,
    video_url: REG,
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
