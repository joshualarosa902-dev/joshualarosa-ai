// Publishes the 23 Free AI Certifications guide to the hub: uploads the PDF,
// seeds the resources row, and adds the metered-article content.
// Run from ~/joshualarosa-ai:  node scripts/add_aicerts.mjs
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

const SLUG = "23-free-ai-certifications";

const U = {
  S1: "https://www.linkedin.com/learning/paths/career-essentials-in-generative-ai-by-microsoft-and-linkedin",
  S2: "https://skillsbuild.org/college-students/course-catalog/artificial-intelligence-fundamentals",
  S3: "https://www.skills.google/course_templates/536",
  I1: "https://skillsbuild.org/college-students/course-catalog/generative-ai-in-action",
  I2: "https://skillsbuild.org/college-students/course-catalog/build-your-first-chatbot-using-ibm-watsonx",
  I3: "https://skillsbuild.org/college-students/course-catalog/ai-enabled-applications-for-customer-service",
  I4: "https://skillsbuild.org/students/course-catalog/artificial-intelligence/ai-foundations-powered-by-iste-and-ibm",
  G1: "https://www.skills.google/course_templates/539",
  G2: "https://www.skills.google/course_templates/554",
  G3: "https://www.skills.google/course_templates/388",
  G4: "https://www.skills.google/course_templates/976",
  G5: "https://www.skills.google/course_templates/1076",
  G6: "https://www.skills.google/course_templates/541",
  G7: "https://www.skills.google/course_templates/538",
  G8: "https://www.skills.google/course_templates/1120",
  C1: "https://learn.oracle.com/ols/learning-path/become-an-oci-ai-foundations-associate-2025/118071/147781",
  C2: "https://aws.amazon.com/education/awseducate/",
  C3: "https://aws.amazon.com/education/awseducate/",
  H1: "https://www.life-global.org/course/391-ai-for-beginners",
  H2: "https://www.life-global.org/course/423-ai-for-business-professionals",
  H3: "https://www.life-global.org/course/439-critical-thinking-in-the-ai-era",
  U1: "https://www.elementsofai.com",
  U2: "https://www.freecodecamp.org/learn/machine-learning-with-python/",
};

const li = (id, name, provider, desc) => `<li><strong><a href="${U[id]}">${name}</a> — ${provider}.</strong> ${desc}</li>`;

const teaser = `
<h3>A resume with zero AI proof is a silent no</h3>
<p>Nearly every job posting now asks for AI familiarity in some form — and a resume with no AI signal at all makes the recruiter assume you don't have it. The fix costs nothing: free credentials and badges from <strong>Microsoft, Google, IBM, Amazon, and Oracle</strong> you can finish in an afternoon and list the same day.</p>
<p><strong>The rule:</strong> don't do all 23. Pick three — one big-name foundation, one hands-on badge, one that matches your major. The exact 3-line stacks are at the end.</p>
<h3>Start here — the first three badges, whatever your major</h3>
<ol>
${li("S1", "Career Essentials in Generative AI", "Microsoft + LinkedIn", "Five courses, ~4 hours — generative AI basics, Copilot, ethics — and the badge displays directly on your LinkedIn profile where recruiters actually look.")}
${li("S2", "Artificial Intelligence Fundamentals", "IBM SkillsBuild", "The most complete free beginner credential here — ML, deep learning, NLP, computer vision, chatbots, and ethics, closed out with an IBM badge on Credly.")}
${li("S3", "Introduction to Generative AI", "Google", "Google's 45-minute explainer — the fastest credible badge here, maximum name for minimum time.")}
</ol>`;

const rest = `
<h3>The IBM stack — four more badges with IBM's name on them</h3>
<ol>
${li("I1", "Generative AI in Action", "IBM SkillsBuild", "The intermediate follow-up — prompt engineering, Python libraries, real applications, and generative AI careers.")}
${li("I2", "Build Your First Chatbot Using IBM watsonx", "IBM SkillsBuild", "An actual build in about an hour: a working chatbot on watsonx, and the NLP behind it. Instant interview story.")}
${li("I3", "AI-Enabled Applications for Customer Service", "IBM SkillsBuild", "AI where businesses feel it first — chatbots, sentiment analysis, and personalization in CX. ~8 hours.")}
${li("I4", "AI Foundations", "ISTE + IBM SkillsBuild", "A structured, comprehensive intro — basics, applications, careers, ethics, and design thinking, with its own badge.")}
</ol>
<h3>The Google stack — eight badges, one afternoon at a time</h3>
<ol>
${li("G1", "Introduction to Large Language Models", "Google", "One hour on how LLMs — the tech behind ChatGPT, Gemini, and Claude — actually work.")}
${li("G2", "Introduction to Responsible AI", "Google", "Fifteen minutes to a badge — the fastest credential in this guide.")}
${li("G3", "Responsible AI: Applying AI Principles", "Google", "The stronger follow-up — how Google Cloud operationalizes responsible AI. ~2 hours.")}
${li("G4", "Prompt Design in Agent Platform", "Google", "A skill badge on prompt engineering, image analysis, and multimodal techniques (formerly “Prompt Design in Vertex AI”).")}
${li("G5", "Build Real World AI Applications with Gemini and Imagen", "Google", "Hands-on with Google's flagship models — recognition, NLP, generation, deployment.")}
${li("G6", "Introduction to Image Generation", "Google", "How diffusion models work and how image generators are trained and deployed. 30 minutes.")}
${li("G7", "Transformer Models and BERT", "Google", "The architecture behind modern AI — self-attention, BERT, core NLP tasks. The most technical Google badge here.")}
${li("G8", "Create Generative AI Apps on Google Cloud", "Google", "Intermediate and practical: prompt design, retrieval-augmented generation, and building LLM chat apps. ~4 hours.")}
</ol>
<h3>Cloud giants + one-hour wins</h3>
<ol>
${li("C1", "OCI AI Foundations Associate", "Oracle University", "The closest thing here to a formal certification — an actual exam, free once you complete the learning path.")}
${li("C2", "Introduction to Generative AI", "AWS Educate", "A free Credly badge from Amazon — training plus assessment on generative AI and foundation models. Inside the AWS Educate catalog after free signup.")}
${li("C3", "Machine Learning Foundations", "AWS Educate", "Past “AI tools” into actual machine learning fundamentals, assessment included.")}
${li("H1", "AI for Beginners", "HP LIFE", "Fast and friendly — generative AI, ML, LLMs, and workplace impact, free certificate at the end.")}
${li("H2", "AI for Business Professionals", "HP LIFE", "Under an hour, connecting AI to productivity and decision-making — the business framing most courses skip.")}
${li("H3", "Critical Thinking in the AI Era", "HP LIFE", "Spotting misinformation and bias in AI-era content. An underrated differentiator. ~60 minutes.")}
</ol>
<h3>The credibility plays</h3>
<ol>
${li("U1", "Elements of AI", "University of Helsinki + Reaktor", "The most famous free AI course in the world — university-backed, no math or coding required, digital certificate on completion.")}
${li("U2", "Machine Learning with Python Certification", "freeCodeCamp", "The most technical credential here: TensorFlow, neural networks, five required projects. Unmistakably legit to any engineer.")}
</ol>
<h3>Your 3-line stack</h3>
<p>Copy the wording exactly, newest first, in a "Certifications" section under Skills:</p>
<ul>
<li><strong>Any major:</strong> Career Essentials in Generative AI — Microsoft and LinkedIn · Introduction to Generative AI — Google · Elements of AI — University of Helsinki</li>
<li><strong>Business/marketing:</strong> AI for Business Professionals — HP LIFE · Career Essentials in Generative AI — Microsoft and LinkedIn · AI-Enabled Applications for Customer Service — IBM SkillsBuild</li>
<li><strong>Technical:</strong> Machine Learning with Python — freeCodeCamp · Create Generative AI Apps on Google Cloud — Google · Machine Learning Foundations — AWS Educate</li>
</ul>
<p>Add the same three to LinkedIn's Licenses &amp; Certifications — recruiters filter searches by them. And remember: three finished certs beat ten started ones.</p>`;

(async () => {
  const pdf = readFileSync(path.join(os.homedir(), "lead-magnets/23-free-ai-certifications/pdf/23-free-ai-certifications-guide.pdf"));
  const up = await sb.storage.from("pdfs").upload(`${SLUG}.pdf`, pdf, { contentType: "application/pdf", upsert: true });
  console.log("pdf upload:", up.error ? up.error.message : "ok");

  const row = {
    slug: SLUG,
    title: "23 free AI certifications. Proof you get AI.",
    description: "Free AI credentials and badges from Microsoft, Google, IBM, Amazon, Oracle and more — every link checked, stacked by provider, with the exact 3-line resume stack for your major.",
    whats_inside: [
      "The first three badges for any major",
      "The IBM stack — 5 Credly-verified badges",
      "The Google stack — 8 badges, an afternoon each",
      "Oracle, AWS, and HP LIFE quick wins",
      "University-backed + technical heavyweights",
      "The exact 3-line resume stack for your major",
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
