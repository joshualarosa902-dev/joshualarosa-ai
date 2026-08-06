// Publishes the Campus Ambassador Programs guide to the hub: uploads the PDF,
// seeds the resources row, and adds the metered-article content.
// Run from ~/joshualarosa-ai:  node scripts/add_amb.mjs
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

const SLUG = "campus-ambassadors";

const HL = (t) => `<span style="background:rgba(235,196,0,0.32);padding:1px 5px;border-radius:3px;font-weight:600;">${t}</span>`;
const R = (name, url, desc) => `<li><strong><a href="${url}">${name}</a></strong> — ${desc}</li>`;

const teaser = `
<h3>A brand pays you to be you, on your campus</h3>
<p>Ambassador roles are the cheat code hiding in plain sight: real companies pay you — cash, credits, or serious perks — to run events, post content, and put their product in front of students. Usually ${HL("3–8 hours a week")}, no experience required, and most students have never heard of a single one. It's a real resume title, it generates real numbers, and it's how "ambassador" quietly becomes "intern."</p>
<h3>The featured five from the video, with live status</h3>
<ul>
${R("Notion Campus Leaders", "https://www.notion.so/product/notion-for-education", "workshops, templates, and community building — check current cohort.")}
${R("Claude Campus Ambassadors — Anthropic", "https://claude.com/programs/campus", "paid AI-education program with a stipend. Spring apps closed — one of the once-a-year ones, bookmark it.")}
${R("Autodesk Design & Make Ambassadors", "https://www.autodesk.com/education/home", "workshops + projects with gift cards and merch — access via Autodesk Education.")}
${R("Microsoft Copilot Ambassador — Fall 2026", "https://oncampusnation.com/job/microsoft-copilot-ambassador-fall-2026/", `up to $1,500 on completion, rolling — our full walkthrough: <a href='https://joshualarosa.ai/r/copilot-ambassador'>joshualarosa.ai/r/copilot-ambassador</a>`)}
${R("Red Bull Student Marketeer", "https://jobs.redbull.com/us-en/microsite/student-marketeer?lang=en", "real hourly pay up to $21/hr by location — open, location-based hiring.")}
</ul>`;

const rest = `
<h3>Cash first — the programs that pay actual money</h3>
<ul>
${R("CELSIUS University Ambassador", "https://apply.workable.com/celsius/j/BDA23AF70C/apply/", "paid marketing role, Fall 2026 hiring.")}
${R("OLIPOP College Ambassador", "https://app.evolvez.co/jobs/80/olipop-college-brand-ambassador-fall-2026", "$1,200 stipend, Fall 2026.")}
${R("Choolaah Campus Ambassador", "https://oncampusnation.com/job/33-paid-choolaah-campus-ambassador-program-2026/", "$1,000 — Nebraska–Lincoln and Ole Miss.")}
${R("Chameleon Coffee", "https://app.evolvez.co/jobs/85/chameleon-coffee-college-brand-ambassador-fall-2026", "$875 stipend.")}
${R("Red Vines", "https://app.evolvez.co/jobs/82/red-vines-college-brand-ambassador-fall-2026", "$875 stipend.")}
${R("Tombstone Pizza", "https://app.evolvez.co/jobs/84/tombstone-college-brand-ambassador-fall-2026", "$875 stipend.")}
${R("NEON College Ambassador", "https://www.linkedin.com/jobs/view/neon-college-ambassador-fall-2026-at-neon-4398339947", "$18/hr, ~5 hrs/week — Temple University, closes Aug 10.")}
${R("Coca-Cola Campus Ambassador", "https://campuscommandos.com/about-coca-cola/", "paid, year-long.")}
${R("Pearson Campus Ambassador", "https://www.pearson.com/en-us/higher-education/students/student-programs/pearson-campus-ambassador.html/", "paid student employment.")}
${R("Kaplan Student Brand Ambassador", "https://www.kaptest.com/studentbrandambassadors", "hourly + free prep course.")}
${R("ScholarTrip Campus Ambassador", "https://oncampusnation.com/job/2247-campus-ambassador-fall-2026-2/", "paid content work — closes Aug 20.")}
${R("ScholarTrip Abroad Ambassador", "https://oncampusnation.com/job/33-abroad-ambassador-fall-2026/", "$150/month for three reels abroad — closes Aug 20.")}
${R("StudentUniverse", "https://nextgen.team/studentuniverse-brand-ambassador-program/", "paid part-time contracted role.")}
</ul>
<p><em>The $875–$1,200 stipend cluster (OLIPOP, Chameleon, Red Vines, Tombstone) runs on one platform — one profile, four applications.</em></p>
<h3>The AI circle — where the title carries the most weight</h3>
<ul>
${R("OpenAI Student Collective", "https://openai.com/student-collective/", `semester stipends — <strong>closes Aug 10</strong>. Our walkthrough: <a href='https://joshualarosa.ai/r/openai-student-collective'>joshualarosa.ai/r/openai-student-collective</a>`)}
${R("OpenAI Campus Network", "https://openai.com/index/openai-campus-network-student-club-interest-form/", "the club-level door into OpenAI.")}
${R("Cursor Ambassadors", "https://anysphere.typeform.com/to/YreXrWZd", "credits, meetup funding, direct team access — reviewed weekly.")}
${R("Cursor Campus Leads — Fall 2026", "https://anysphere.typeform.com/to/x8Mr87nN", "interest form live for the next expansion.")}
${R("Replit Campus Leaders", "https://replit.com/edu/campus-leaders", "credits + direct line to the team.")}
${R("Databricks Student Fellows", "https://airtable.com/appasC90KmqZ5x1t5/pag6tvR9VUG4Kf1iM/form", "certifications + vouchers, Fall 2026 cohort.")}
${R("Mistral Ambassadors", "https://docs.google.com/forms/d/e/1FAIpQLSdBSiRzm2xBpMszB_9fBixJNyKdGnPMj99DtZbagHMdHgkGUg/viewform", "API credits, quarterly cohorts.")}
${R("ElevenLabs Ambassadors", "https://docs.google.com/forms/d/e/1FAIpQLSeW2gthJtSrZ5Rhs7_FYT0BtykJcWnE2XXVsURe-xaSZHkQeA/viewform?usp=send_form", "credits + possible paid creator work.")}
${R("GitHub Campus Experts", "https://github.com/education/students/campus-expert", "the most respected volunteer title in student tech.")}
${R("AWS Student Builder Group Leader", "https://builder.aws.com/content/3CdWYQVnCvWSJ1tuASel5VuPIbW/apply-to-start-an-aws-student-builder-group-on-your-campus", "start the AWS group on your campus.")}
${R("Microsoft Learn Student Ambassadors", "https://mvp.microsoft.com/studentambassadors", "the ongoing global program (separate from the paid Copilot campaign).")}
${R("Adobe Student Ambassadors", "https://www.adobeforeducation.com/student-ambassador-program", "for creative majors — open.")}
${R("Google Developer Groups on Campus", "https://developers.google.com/community", "organize the campus dev community.")}
${R("Google Gemini Student Ambassador", "https://blog.google/intl/en-mena/company-news/outreach-initiatives/become-the-next-google-gemini-student-ambassador-in-egypt-saudi-arabia/", "Egypt & Saudi Arabia only.")}
${R("Intel Student Ambassadors", "https://intel.kreativdistrikt.com/", "for students with technical projects.")}
${R("Salesforce Student Ambassador", "https://invite.salesforce.com/studentambassadors", "express interest; cohorts vary.")}
${R("IBM Z Student Ambassador", "https://www.yourbigyear.com/ibm-z-student-ambassador-program", "tiny applicant pool, real exposure.")}
${R("Wolfram Student Ambassador", "https://www.wolfram.com/company/careers/ambassador/", "math/computation crowd.")}
${R("Fabric Campus Ambassador", "https://oncampusnation.com/job/2247-fabric-campus-ambassador/", "open listing.")}
</ul>
<h3>Every other lane</h3>
<ul>
${R("honeygrow", "https://www.honeygrow.com/ambassador/", "perks + activations near participating markets.")}
${R("Becker CPA Campus Ambassador", "https://www.becker.com/cpa-review/campus-ambassador-application", "free CPA review — accounting juniors/seniors.")}
${R("Prept — Premed Social Media Manager", "https://oncampusnation.com/job/2247-premed-social-media-manager-2/", "for premed creators.")}
${R("IES Abroad Ambassador", "https://www.iesabroad.org/ambassador-application", "for returned IES students.")}
${R("Big Ten Network Brand Ambassador", "https://www.linkedin.com/posts/big-ten-network_attention-big-ten-students-applications-activity-7462170175904178176-GFBZ", "sophomores+ at Big Ten schools.")}
${R("APA Campus Ambassador", "https://pages.apa.org/cap-app/", "psychology majors.")}
${R("Gift of Life Campus Ambassador", "https://cap.giftoflife.org/", "run marrow-registry drives.")}
${R("Gray for Glioblastoma", "https://oncampusnation.com/job/2247-ambassador/", "flexible advocacy role.")}
</ul>
<h3>The watchlist — closed now, set a reminder</h3>
<ul>
${R("Claude Corps Fellowship", "https://www.anthropic.com/claude-corps/fellow", "reopens September 2026 — set the reminder now.")}
${R("Salesforce Forum Ambassadors", "https://trailhead.salesforce.com/forumambassadors", "check back in September.")}
${R("Poppi University", "https://drinkpoppi.com/pages/poppi-university", "reopens December for Spring 2027.")}
${R("OpenAI Codex Ambassadors", "https://developers.openai.com/community/codex-ambassadors", "future cohort planned.")}
${R("Claude Campus Ambassadors", "https://claude.com/programs/campus", "the featured-five one to watch.")}
${R("LaCroix College Ambassadors", "https://www.facebook.com/LaCroix/posts/applications-for-our-spring-2026-college-ambassador-program-close-on-413-apply-n/1359516079540319/", "spring cycle.")}
${R("Tableau Ambassadors", "https://www.tableau.com/community/community-leaders/ambassadors/apply", "annual — July deadline passed.")}
${R("Women Techmakers", "https://www.technovation.org/women-techmakers/", "2026 process TBA.")}
${R("IEEE ComSoc Student Ambassador", "https://www.comsoc.org/engagement-community/students/ieee-comsoc-student-ambassador", "annual May window.")}
${R("The Chick Mission", "https://www.thechickmission.org/student-ambassador/", "2027 interest form open now.")}
${R("Perplexity Campus Strategists", "https://www.perplexity.ai/campus-strategists", "no verified current intake.")}
${R("Figma Campus Leaders", "https://linktr.ee/figmacampusleaders", "no reliable public application right now.")}
${R("Edge Impulse", "https://www.edgeimpulse.com/blog/welcoming-our-campus-ambassadors-for-2026/", "watch for round two.")}
${R("Postman Student Leaders", "https://www.postman.com/postman/archived-postman-student-program/overview", "archived — long shot.")}
${R("Hugging Face Student Ambassadors", "https://huggingface.co/blog/ambassadors", "dormant since 2022 — longest shot here.")}
</ul>
<h3>Get picked</h3>
<ul>
<li><strong>Apply to 8–12, not 2</strong> — applications take minutes and the pools are small.</li>
<li><strong>Bring a plan, not vibes</strong> — name the club, event, or group chat you'd actually use to reach students.</li>
<li><strong>Link one piece of content</strong> — a single decent reel beats any follower count.</li>
<li><strong>Clean your public profiles</strong> — many programs require them, and they look.</li>
<li><strong>Move on deadlines</strong> — ${HL("OpenAI closes Aug 10")}, ScholarTrip Aug 20, and rolling programs fill quietly. Early applications get read by a human.</li>
</ul>
<p><em>Every link here was verified this week — but windows change fast, so confirm deadlines on the company's own page before planning around them. And never inflate your following or involvement: the bar is low enough that honest wins.</em></p>`;

(async () => {
  const pdf = readFileSync(path.join(os.homedir(), "lead-magnets/campus-ambassadors/pdf/campus-ambassadors-guide.pdf"));
  const up = await sb.storage.from("pdfs").upload(`${SLUG}.pdf`, pdf, { contentType: "application/pdf", upsert: true });
  console.log("pdf upload:", up.error ? up.error.message : "ok");

  const row = {
    slug: SLUG,
    title: "Get paid to be the campus plug.",
    description: "The featured five from the video plus 50+ more ambassador programs — every official link verified, sorted by what they actually pay, with the watchlist for the ones that only open once a year.",
    whats_inside: [
      "The featured five with live status",
      "13 programs that pay actual cash ($875–$1,500 + hourly)",
      "19 AI & tech programs (OpenAI, Cursor, Replit, GitHub…)",
      "Every other lane — food, education, travel, sports, service",
      "The 15-program watchlist with reopen dates",
      "The get-picked application playbook",
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
