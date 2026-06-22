import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import EmailGate from "@/components/EmailGate";
import GatedArticle from "@/components/GatedArticle";
import { getResource, getPublishedResources } from "@/lib/resources";
import { GUIDE_CONTENT } from "@/lib/guideContent";

export const revalidate = 60;

export async function generateStaticParams() {
  const resources = await getPublishedResources();
  return resources.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const r = await getResource(slug);
  if (!r) return { title: "Not found — joshualarosa.ai" };
  return {
    title: `${r.title} — joshualarosa.ai`,
    description: r.description,
    openGraph: { title: r.title, description: r.description, images: r.cover_url ? [r.cover_url] : [] },
  };
}

export default async function ResourcePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = await getResource(slug);
  if (!r) notFound();

  const guide = GUIDE_CONTENT[slug];

  // Metered-article layout (teaser → blur → email unlock → full + download)
  if (guide) {
    return (
      <>
        <Nav />
        <main className="wrap section" style={{ paddingTop: "var(--s-7)" }}>
          <div style={{ maxWidth: 740, margin: "0 auto" }}>
            <Link href="/resources" className="navlink">← Resources</Link>
            <span className="label" style={{ display: "block", margin: "var(--s-5) 0 var(--s-3)" }}><span className="dot" />{r.category}</span>
            <h1 className="display" style={{ fontSize: "var(--t-h1)", letterSpacing: "-.02em" }}>{r.title}</h1>
            <p style={{ fontSize: "var(--t-h3)", color: "var(--c-muted)", lineHeight: 1.5, marginTop: "var(--s-4)" }}>{r.description}</p>
            <hr className="divider" />
            <GatedArticle slug={r.slug} title={r.title} teaser={guide.teaser} rest={guide.rest} />
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Fallback layout (resources without web content yet)
  return (
    <>
      <Nav />
      <main className="wrap section" style={{ paddingTop: "var(--s-7)" }}>
        <Link href="/resources" className="navlink">← Resources</Link>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.4fr) minmax(280px, 1fr)", gap: "var(--s-7)", alignItems: "start", marginTop: "var(--s-5)" }} className="resource-layout">
          <div>
            <div className="cover">
              {r.cover_url ? <img src={r.cover_url} alt={r.title} /> : <div className="cover-ph"><span className="glyph">{r.title.charAt(0)}<span className="accent">.</span></span></div>}
            </div>
            <span className="label"><span className="dot" />{r.category}</span>
            <h1 className="display" style={{ fontSize: "var(--t-h1)", margin: "var(--s-3) 0 var(--s-4)" }}>{r.title}</h1>
            <p style={{ fontSize: "var(--t-h3)", color: "var(--c-muted)", lineHeight: 1.55, maxWidth: 540 }}>{r.description}</p>
            {r.whats_inside?.length > 0 && (
              <div style={{ marginTop: "var(--s-6)" }}>
                <p className="eyebrow" style={{ marginBottom: "var(--s-4)" }}>What’s inside</p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "var(--s-3)" }}>
                  {r.whats_inside.map((item, i) => (
                    <li key={i} style={{ display: "flex", gap: "var(--s-3)", alignItems: "baseline" }}><span className="dot" style={{ flex: "none" }} /><span>{item}</span></li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div style={{ position: "sticky", top: 88 }}>
            <EmailGate slug={r.slug} title={r.title} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
