// Exports all captured emails from the hub to a CSV on your Desktop.
// Run from ~/joshualarosa-ai:
//   node scripts/export_emails.mjs              -> all emails
//   node scripts/export_emails.mjs 7            -> last 7 days only
//   node scripts/export_emails.mjs 27-free-certifications  -> one guide only
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

const arg = process.argv[2];
const days = arg && /^\d+$/.test(arg) ? Number(arg) : null;
const slug = arg && !days ? arg : null;

let all = [], from = 0;
while (true) {
  let q = sb.from("subscribers").select("email, resource_slug, created_at").order("created_at", { ascending: false }).range(from, from + 999);
  if (slug) q = q.eq("resource_slug", slug);
  if (days) q = q.gte("created_at", new Date(Date.now() - days * 86400000).toISOString());
  const { data, error } = await q;
  if (error) { console.error(error.message); process.exit(1); }
  if (!data.length) break;
  all = all.concat(data);
  from += 1000;
  if (data.length < 1000) break;
}

// dedupe by email, keep most recent capture
const seen = new Map();
for (const r of all) if (!seen.has(r.email.toLowerCase())) seen.set(r.email.toLowerCase(), r);
const rows = [...seen.values()];

const csv = "email,guide,date\n" + rows.map((r) =>
  `${r.email},${r.resource_slug || "newsletter"},${r.created_at.slice(0, 10)}`
).join("\n");

const label = slug ? slug : days ? `last-${days}-days` : "all";
const out = path.join(os.homedir(), "Desktop", `hub-emails-${label}-${new Date().toISOString().slice(0, 10)}.csv`);
writeFileSync(out, csv);
console.log(`${rows.length} unique emails (${all.length} total captures) -> ${out}`);
