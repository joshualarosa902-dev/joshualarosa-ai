// Publishes the Job Simulations guide to the hub: uploads the PDF,
// seeds the resources row, and adds the metered-article content.
// Run from ~/joshualarosa-ai:  node scripts/add_sims.mjs
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

const SLUG = "job-simulations";
const F = "https://www.theforage.com/simulations";

const HL = (t) => `<span style="background:rgba(235,196,0,0.32);padding:1px 5px;border-radius:3px;font-weight:600;">${t}</span>`;
const S = (company, name, slug, dur, desc) => `<li><strong><a href="${F}/${slug}">${company} — ${name}</a></strong>${dur ? ` (${dur})` : ""} — ${desc}</li>`;

const teaser = `
<h3>Do the intern's job before you ever apply</h3>
<p>Virtual job simulations are the closest thing to a cheat code left in recruiting: real companies publish ${HL("the actual tasks their interns and analysts do")}, you complete them online — free, self-paced, no application, no interview — and you walk away with a certificate and finished work you can talk about.</p>
<p>The platform's own data: students who complete one are ${HL("3.3x more likely to land a job")}. Everyone else walks into the interview saying why they're <em>interested</em>. You walk in with the work already done.</p>
<p><strong>How to run this:</strong> pick 1–2 from YOUR field — done deeply beats collected. Certificate goes on your resume and LinkedIn; in the interview, bring up the deliverable, not the certificate.</p>
<h3>Finance — investment banking, audit, and VC</h3>
<ul>
${S("JPMorganChase", "Investment Banking", "jpmorgan/investment-banking-hkyd", "3–4 hrs", "research an M&A target, run the analysis, draft the client note.")}
${S("Bank of America", "Investment Banking", "bank-of-america/investment-banking-bwp7", "4–5 hrs", "screen acquisition targets and build the model.")}
${S("Goldman Sachs", "Controllers", "goldman-sachs/controllers-8npc", "30–60 min", "the fastest Goldman line for your resume.")}
${S("Citi", "Investment Banking", "citi/investment-banking-9wcw", "5–6 hrs", "full company analysis through to a client recommendation.")}
${S("PwC Switzerland", "Audit", "PwC%20Switzerland/audit-vety", "4–5 hrs", "financial statements, audit planning, risk.")}
${S("H2 Ventures", "Venture Capital", "h2-ventures/venture-capital-comi", "3–4 hrs", "evaluate startups like an investor.")}
</ul>`;

const rest = `
<h3>Consulting &amp; project management</h3>
<ul>
${S("BCG", "Strategy Consulting", "bcg/strategy-consulting-jk76", "4–5 hrs", "structured problem-solving and a client recommendation — THE consulting line.")}
${S("BCG", "Digital Transformation", "bcg/digital-transformation-pk18", "3–4 hrs", "digital strategy and client presentations.")}
${S("Mastercard", "Advisors & Consulting", "mastercard/advisors-client-services-xvlw", "1–2 hrs", "data-driven consulting, fast.")}
${S("CBRE", "Project Management", "cbre/project-management-x2vz", "1–2 hrs", "planning, stakeholders, execution.")}
${S("Siemens Mobility", "Project Manager", "siemens-mobility/project-management-qydx", "1–2 hrs", "scheduling and risk on real projects.")}
${S("Forage", "Career Explorer", "learning/career-explorer-bgbk", "30–40 min", "not sure which field? Start here.")}
</ul>
<h3>Marketing, sales, retail &amp; people</h3>
<ul>
${S("Red Bull", "On-Premise Sales", "red-bull/on-premise-sales-waza", "1–2 hrs", "account analysis and sales strategy.")}
${S("Pearson", "Marketing Explorer", "pearson/marketing-oxce", "", "a first rep of real marketing tasks.")}
${S("Forage Academy", "Omnichannel Marketing", "forage/sponsored-content-omnichannel-marketing-5iep", "5–6 hrs", "full campaign strategy end to end.")}
${S("Bloomberg", "Client Engagement", "bloomberg/client-engagement-a6hi", "3–4 hrs", "client needs and recommendations.")}
${S("HPE", "Digital Sales", "hewlett-packard-enterprise/digital-sales-mmkg", "4–5 hrs", "lead prioritization, enterprise-style.")}
${S("GE Aerospace", "Explore Human Resources", "ge-aerospace/human-resources-8hl7", "3–4 hrs", "people analytics and compensation analysis.")}
${S("Walmart", "Area Manager", "walmart/area-manager-68sx", "1–2 hrs", "leadership and operations at scale.")}
${S("Walmart", "Associate Merchant", "walmart/associate-merchant-bgji", "30–60 min", "retail strategy in under an hour.")}
</ul>
<h3>Software, data, AI &amp; cybersecurity</h3>
<ul>
${S("Walmart", "Advanced Software Engineering", "walmart/software-engineering-fceb", "3–4 hrs", "Java, data structures, architecture, SQL.")}
${S("JPMorganChase", "Software Engineering", "jpmorgan/advanced-software-engineering-r0fm", "4–5 hrs", "Spring Boot, Kafka, APIs, testing.")}
${S("Skyscanner", "Front-End Engineering", "skyscanner/front-end-software-engineering-cbwl", "1–2 hrs", "React components and automated testing.")}
${S("Mastercard", "Cybersecurity", "mastercard/cybersecurity-t8ye", "1–2 hrs", "phishing analysis and security training design.")}
${S("BCG", "Data Science", "bcg/data-science-ccdz", "8–9 hrs", "the heavyweight — end-to-end analysis, modeling, recommendations.")}
${S("Tata", "GenAI Data Analytics", "tata/data-analytics-t3zr", "", "AI strategy plus analytics — the combo employers are hunting.")}
</ul>
<h3>Engineering &amp; operations</h3>
<ul>
${S("Johnson & Johnson", "Robotics & Controls", "johnson-and-johnson/robotics-controls-aozc", "3–4 hrs", "robotics problem-solving at a medtech giant — the one from the video.")}
${S("GE Aerospace", "Explore Engineering", "ge-aerospace/engineering-xadc", "3–4 hrs", "propulsion-system design and analysis.")}
${S("GE Aerospace", "Electrical Engineering", "ge-aerospace/explore-electrical-engineering-ftgs", "3–4 hrs", "avionics and power-distribution design.")}
${S("GE Aerospace", "Manufacturing Engineering", "ge-aerospace/supply-chain-n0yr", "3–4 hrs", "manufacturing and supply-chain operations.")}
${S("Siemens Mobility", "Industrial Engineering", "siemens-mobility/operations-industrial-engineering-xh22", "2–3 hrs", "process analysis and operations.")}
</ul>
<h3>Law</h3>
<ul>
${S("Latham & Watkins", "Antitrust & Competition", "latham-watkins/antitrust-competition-8rrq", "", "competition-law research at an elite firm.")}
${S("Clifford Chance", "Business & Human Rights", "clifford-chance/business-human-rights-pgz5", "6–7 hrs", "compliance, drafting, client advice.")}
${S("Baker McKenzie", "Corporate", "baker-mckenzie-apac/corporate-0t4o", "8–9 hrs", "transactions and due diligence.")}
${S("Morrison Foerster", "M&A", "morrison-foerster/m-a-na5d", "30–40 min", "deal analysis in forty minutes.")}
</ul>
<h3>Healthcare, pharmacy &amp; life sciences</h3>
<ul>
${S("Pfizer", "Molecule to Market", "pfizer-uk/molecule-market-prll", "4–5 hrs", "clinical research through product launch.")}
${S("LifeArc", "Biology Research", "life-arc/life-sciences-biology-research-5t8f", "7–8 hrs", "experimental design and statistical analysis.")}
${S("LifeArc", "Chemistry", "life-arc/chemistry-w0ox", "5–6 hrs", "molecular design and synthesis.")}
${S("Walmart", "Pharmacy Technician", "walmart/pharmacy-technician-hhpz", "30–60 min", "prescription workflows and patient safety.")}
${S("Forage Academy", "Surgical Tech", "forage/sponsored-content-surgical-tech-xgwi", "1–2 hrs", "operating-room workflows and terminology.")}
</ul>
<h3>Cash it in — the resume bullet</h3>
<p>List it under Certifications or Projects with the X-Y-Z formula: <em>[Company] Virtual Job Simulation — [Field] · Forage · Completed [Company]'s [role] simulation (X), performing [the actual tasks] (Y), producing [the deliverable — model, memo, presentation] (Z).</em></p>
<p><em>Straight talk: a simulation isn't an internship and recruiters know the difference — never label it as work experience. Listed honestly, it does exactly what the 3.3x stat promises: it proves you've already done the job's actual tasks, and gives you something real to talk about in the room.</em></p>`;

(async () => {
  const pdf = readFileSync(path.join(os.homedir(), "lead-magnets/job-simulations/pdf/job-simulations-guide.pdf"));
  const up = await sb.storage.from("pdfs").upload(`${SLUG}.pdf`, pdf, { contentType: "application/pdf", upsert: true });
  console.log("pdf upload:", up.error ? up.error.message : "ok");

  const row = {
    slug: SLUG,
    title: "No experience? Fix it this week.",
    description: "40 free virtual job simulations from JPMorgan, BCG, Pfizer, Walmart and more — the real intern tasks, done online, with a certificate for your resume. Organized by major, every link checked.",
    whats_inside: [
      "What job simulations are + the 3.3x stat",
      "Finance: JPMorgan, Goldman, Citi, BofA, PwC, VC",
      "Consulting, marketing, sales, and people roles",
      "Tech: SWE, data science, AI, cybersecurity",
      "Engineering, law, and healthcare tracks",
      "The exact resume bullet to cash it in",
    ],
    category: "Career",
    cover_url: null,
    pdf_path: `${SLUG}.pdf`,
    video_url: null,
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
