// Publishes the 27 Free Certifications guide to the hub: uploads the PDF,
// seeds the resources row, and adds the metered-article content.
// Run from ~/joshualarosa-ai:  node scripts/add_certs.mjs
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

const SLUG = "27-free-certifications";

const U = {
  F1: "https://grow.google/ai-essentials/",
  F2: "https://academy.hubspot.com/courses/content-marketing",
  F3: "https://www.semrush.com/academy/courses/semrush-seo-crash-course-with-brian-dean/",
  F4: "https://www.anthropic.com/learn",
  J1: "https://academy.hubspot.com/courses/inbound-marketing",
  J2: "https://academy.hubspot.com/courses/seo-training",
  J3: "https://www.semrush.com/academy/courses/seo-essentials-with-semrush/",
  J4: "https://www.facebook.com/business/learn/certification",
  J5: "https://www.hootsuite.com/academy",
  J6: "https://anthropic.skilljar.com/claude-101",
  J7: "https://www.anthropic.com/learn",
  J8: "https://skillshop.exceedlms.com/student/collection/1830706-fundamentals-of-digital-marketing",
  J9: "https://trailhead.salesforce.com/content/learn/modules/artificial-intelligence-for-customer-service",
  J10: "https://www.netacad.com/courses/introduction-to-cybersecurity",
  K1: "https://www.linkedin.com/learning/paths/career-essentials-in-generative-ai-by-microsoft-and-linkedin",
  K2: "https://skillsbuild.org/college-students/course-catalog/artificial-intelligence-fundamentals",
  K3: "https://skillsbuild.org/college-students/course-catalog/generative-ai-in-action",
  K4: "https://skillsbuild.org/college-students/course-catalog/build-your-first-chatbot-using-ibm-watsonx",
  K5: "https://www.skills.google/course_templates/536",
  K6: "https://www.skills.google/course_templates/539",
  K7: "https://www.skills.google/course_templates/1076",
  K8: "https://learn.oracle.com/ols/learning-path/become-an-oci-ai-foundations-associate-2025/118071/147781",
  K9: "https://aws.amazon.com/education/awseducate/",
  K10: "https://www.life-global.org/course/391-ai-for-beginners",
  K11: "https://www.life-global.org/course/423-ai-for-business-professionals",
  K12: "https://www.elementsofai.com",
  K13: "https://www.freecodecamp.org/learn/machine-learning-with-python/",
};

const li = (id, name, provider, desc) => `<li><strong><a href="${U[id]}">${name}</a> — ${provider}.</strong> ${desc}</li>`;

const teaser = `
<h3>Certifications are the cheapest resume upgrade left</h3>
<p>Every one of these is free to train, most take an afternoon or less, and together they cover the exact skills employers are screening resumes for right now — AI, marketing, data, and security. A cert alone doesn't get you hired, but when a recruiter spends eight seconds on your resume, a stack of recognizable names — Google, HubSpot, Anthropic, IBM, Cisco — is the difference between the "maybe" pile and the trash.</p>
<p><strong>How to use this guide:</strong> don't do all 27. Start with the featured four, then add 3–5 from the category that matches your major. A focused stack beats a random pile.</p>
<h3>The featured four — start here, in this order</h3>
<ol>
${li("F1", "Google AI Essentials", "Google", "The number one skill employers screen for, with Google's name on the certificate. Runs on Coursera — short enough to finish inside the 7-day free trial (set a reminder to cancel after).")}
${li("F2", "Content Marketing Certification", "HubSpot Academy", "Recognized by nearly every employer with a marketing team. Free, and it proves you can drive results with content — not just post and pray.")}
${li("F3", "SEO Crash Course with Brian Dean", "Semrush Academy", "Taught by one of the most respected names in SEO. Under an hour, and the certificate drops straight onto your LinkedIn.")}
${li("F4", "Claude Certified Architect", "Anthropic", "The niche one nobody's talking about yet. Companies like Deloitte are investing thousands per employee in exactly this skill set — and the entire prep path (13 courses on Anthropic Academy) is free right now. The proctored exam has a fee unless you catch a waiver window.")}
</ol>`;

const rest = `
<h3>Marketing &amp; growth — six certs that scream "I can drive revenue"</h3>
<ol>
${li("J1", "Inbound Marketing Certification", "HubSpot Academy", "The classic. One of the most widely recognized credentials in digital marketing — attracting customers with value instead of interrupting them with ads.")}
${li("J2", "AEO Fundamentals Certification", "HubSpot Academy", "HubSpot just replaced its classic SEO cert with this — search optimization for the AI-answer era. Being early to the rename is exactly the kind of edge this guide is about.")}
${li("J3", "Beginner SEO with Semrush", "Semrush Academy", "Short and expert-led (recently renamed from “SEO Essentials”) — real keyword research, competitor analysis, and the full Semrush toolkit.")}
${li("J8", "Fundamentals of Digital Marketing", "Google Skillshop", "The famous Digital Garage course in its new home — 17 modules, ~40 hours, free certificate. The meatiest marketing credential here.")}
${li("J4", "Certified Digital Marketing Associate", "Meta Blueprint", "The industry credential for Facebook and Instagram ads. Training free; the proctored exam runs about $99 — the one to invest in after the free stack.")}
${li("J5", "Social Media Marketing Certificate", "Hootsuite Academy", "Professional social campaign planning and analytics. Coursework free; the certificate exam is a paid tier. Niche — which is why agencies notice it.")}
</ol>
<h3>AI you can actually use — prove you build, not just talk</h3>
<ol>
${li("J6", "Claude 101", "Anthropic Academy", "The official free course from the team that built Claude — core features, prompting, responsible use. The warm-up for Claude Certified Architect.")}
${li("J7", "Build with Claude", "Anthropic Academy", "The step past prompting: real workflows, files and projects, AI systems that do actual work. Turns “I use AI” into “I build with AI.”")}
${li("J9", "AI for Customer Service", "Salesforce Trailhead", "A free gamified badge on Salesforce's Einstein AI — the corporate stack half the Fortune 500 runs on. About 15 minutes; the fastest real credential in this guide.")}
${li("K4", "Build Your First Chatbot with watsonx", "IBM SkillsBuild", "A hands-on build, not a lecture series — you walk away having made a working chatbot, which makes a perfect interview story. ~60 minutes.")}
</ol>
<h3>Big-name AI foundations — fast credentials, famous names</h3>
<ol>
${li("K1", "Career Essentials in Generative AI", "Microsoft + LinkedIn", "About four hours, free, and the badge displays directly on your LinkedIn profile. The single best first AI cert for any major.")}
${li("K2", "Artificial Intelligence Fundamentals", "IBM SkillsBuild", "A meaty free badge — machine learning, deep learning, NLP, and ethics, with IBM's name and a Credly badge behind it.")}
${li("K3", "Generative AI in Action", "IBM SkillsBuild", "The intermediate follow-up: prompt engineering, real applications, and where generative AI is headed at work.")}
${li("K5", "Introduction to Generative AI", "Google", "Google's fast, free explainer — an easy 45-minute badge with maximum name recognition.")}
${li("K6", "Introduction to Large Language Models", "Google", "One hour on how the tech behind ChatGPT, Gemini, and Claude actually works.")}
${li("K10", "AI for Beginners", "HP LIFE", "Fast, free, and friendly — generative AI and workplace impact with a certificate at the end.")}
${li("K11", "AI for Business Professionals", "HP LIFE", "Under an hour, connecting AI directly to productivity and decision-making — the business-side framing most courses skip.")}
</ol>
<h3>Level up — six certs that make the technical shortlist</h3>
<ol>
${li("K7", "Build Real World AI Applications with Gemini and Imagen", "Google", "Hands-on building with Google's flagship models — proof of real Google AI stack experience.")}
${li("K8", "OCI AI Foundations Associate", "Oracle University", "The closest thing here to a formal industry certification — free training and a free exam once you finish the learning path.")}
${li("K9", "Machine Learning Foundations", "AWS Educate", "A free Credly badge from Amazon that goes past “AI tools” into actual ML fundamentals. Find it in the AWS Educate catalog after free signup.")}
${li("J10", "Introduction to Cybersecurity", "Cisco Networking Academy", "A respected free credential (~6 hours) covering threats, defenses, and security careers. Security makes every resume stronger.")}
${li("K12", "Elements of AI", "University of Helsinki", "The famous university-backed course — no math, no coding, real academic credibility.")}
${li("K13", "Machine Learning with Python", "freeCodeCamp", "The most technical cert here: TensorFlow, neural networks, five projects, ~300 budgeted hours. Unmistakably legit to any engineer.")}
</ol>
<h3>How to list them so they land</h3>
<p>Certs go in a dedicated "Certifications" section right under Skills, one line each: <em>Certification Name — Provider (Year)</em>. Add your top 3–4 to LinkedIn's Licenses &amp; Certifications too — recruiters filter searches by them. And keep it honest: only list what you finished, and drop the oldest as you earn better. Five sharp lines beat fifteen filler ones.</p>`;

(async () => {
  const pdf = readFileSync(path.join(os.homedir(), "lead-magnets/27-free-certifications/pdf/27-free-certifications-guide.pdf"));
  const up = await sb.storage.from("pdfs").upload(`${SLUG}.pdf`, pdf, { contentType: "application/pdf", upsert: true });
  console.log("pdf upload:", up.error ? up.error.message : "ok");

  const row = {
    slug: SLUG,
    title: "27 free certifications. One unfair resume.",
    description: "The 4 from the video plus 23 more — zero tuition, every link checked by hand, organized by major so you know which ones belong on YOUR resume.",
    whats_inside: [
      "The featured four, ranked easiest to hardest",
      "6 marketing & growth certs recruiters recognize",
      "4 hands-on AI credentials from Anthropic, Salesforce, and IBM",
      "7 fast big-name AI foundations (Microsoft, Google, IBM, HP)",
      "6 technical level-ups (Oracle, AWS, Cisco, Helsinki, freeCodeCamp)",
      "Exact resume + LinkedIn wording for every cert",
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
