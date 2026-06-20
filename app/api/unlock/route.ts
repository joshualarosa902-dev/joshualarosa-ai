import { NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabaseServer";
import { SAMPLE_RESOURCES } from "@/lib/sampleData";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PDF_BUCKET = "pdfs";
const SIGNED_TTL = 300; // seconds

export async function POST(req: Request) {
  let body: { email?: string; slug?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const email = (body.email ?? "").trim().toLowerCase();
  const slug = body.slug?.trim() || null;

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  const sb = getServerSupabase();

  // Sample mode (no Supabase yet): accept the email, no real file.
  if (!sb) {
    if (slug) return NextResponse.json({ sample: true });
    return NextResponse.json({ ok: true });
  }

  // Record the subscriber (duplicate emails are fine — ignore conflict noise).
  await sb.from("subscribers").insert({ email, resource_slug: slug });

  if (!slug) return NextResponse.json({ ok: true });

  const { data: resource } = await sb
    .from("resources")
    .select("pdf_path")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  const pdfPath = resource?.pdf_path ?? SAMPLE_RESOURCES.find((r) => r.slug === slug)?.pdf_path;
  if (!pdfPath) {
    return NextResponse.json({ error: "Resource not found." }, { status: 404 });
  }

  const { data: signed, error } = await sb.storage.from(PDF_BUCKET).createSignedUrl(pdfPath, SIGNED_TTL);
  if (error || !signed) {
    return NextResponse.json({ error: "Could not generate download link." }, { status: 500 });
  }

  return NextResponse.json({ url: signed.signedUrl });
}
