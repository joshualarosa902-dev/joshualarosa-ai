import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Building Leverage — joshualarosa.ai",
  description: "Long-form conversations on building with AI.",
};

const LISTEN = [
  { label: "YouTube", href: "https://www.youtube.com/@BuildingLeveragePod" },
  { label: "Substack", href: "https://substack.com/@buildingleveragepod" },
];

export default function Podcast() {
  return (
    <>
      <Nav />
      <main>
        <section className="surface-dark" style={{ minHeight: "70vh", display: "flex", alignItems: "center" }}>
          <div className="wrap section">
            <p className="eyebrow" style={{ marginBottom: "var(--s-5)" }}>
              The podcast<span style={{ color: "var(--c-yellow)" }}> · </span>coming soon
            </p>
            <h1 className="hero" style={{ maxWidth: 640 }}>
              <span style={{ color: "var(--c-yellow)" }}>Building</span> Leverage.
            </h1>
            <p style={{ color: "var(--c-muted-dark)", maxWidth: 460, margin: "var(--s-5) 0 var(--s-6)", fontSize: "var(--t-h3)", lineHeight: 1.55 }}>
              Long-form conversations on building with AI. A dedicated home for the show is on the way —
              for now, listen wherever you get your podcasts.
            </p>
            <div style={{ display: "flex", gap: "var(--s-5)", flexWrap: "wrap", alignItems: "center" }}>
              {LISTEN.map((l) => (
                <a key={l.label} href={l.href} target="_blank" rel="noopener" className="btn-accent">
                  {l.label} <span>→</span>
                </a>
              ))}
            </div>
            <p style={{ marginTop: "var(--s-6)" }}>
              <Link href="/" className="navlink" style={{ color: "#F4F1EA", opacity: 0.7 }}>← Back to resources</Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
