import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ResourceCard from "@/components/ResourceCard";
import NewsletterForm from "@/components/NewsletterForm";
import { getFeaturedResources } from "@/lib/resources";

export const revalidate = 60;

export default async function Home() {
  const featured = await getFeaturedResources();

  return (
    <>
      <Nav />
      <main>
        {/* hero */}
        <section className="wrap section" style={{ paddingTop: "var(--s-8)" }}>
          <p className="eyebrow" style={{ marginBottom: "var(--s-5)" }}>Resource library</p>
          <h1 className="hero" style={{ maxWidth: 680 }}>
            Everything I use to <span className="serif und">build</span>,<br />quietly organized.
          </h1>
          <p style={{ maxWidth: 460, color: "var(--c-muted)", marginTop: "var(--s-5)", fontSize: "var(--t-h3)", lineHeight: 1.55 }}>
            Guides, prompts and playbooks from the videos. Free, and always here.
          </p>
          <div style={{ marginTop: "var(--s-6)", display: "flex", gap: "var(--s-5)", alignItems: "center", flexWrap: "wrap" }}>
            <Link href="/resources" className="btn-accent">Start here <span>→</span></Link>
            <a href="#newsletter" className="btn-link">Get the newsletter</a>
          </div>
        </section>

        {/* featured */}
        <section className="wrap section">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "var(--s-5)" }}>
            <p className="eyebrow" style={{ margin: 0 }}>Featured</p>
            <Link href="/resources" className="btn-link">All resources <span className="arrow">→</span></Link>
          </div>
          <div className="grid-cards">
            {featured.map((r) => (
              <ResourceCard key={r.slug} resource={r} />
            ))}
          </div>
        </section>

        {/* newsletter */}
        <section id="newsletter" className="wrap section">
          <hr className="divider" />
          <p className="eyebrow" style={{ marginBottom: "var(--s-4)" }}>The newsletter</p>
          <h2 className="display" style={{ fontSize: "var(--t-h1)", maxWidth: 560 }}>
            One useful thing, <span className="serif und">weekly</span>.
          </h2>
          <p style={{ maxWidth: 420, color: "var(--c-muted)", margin: "var(--s-4) 0 var(--s-5)" }}>
            What I’m building, what’s working, and the tools worth your time.
          </p>
          <NewsletterForm />
        </section>

        {/* podcast — dark moment */}
        <section className="surface-dark">
          <div className="wrap section">
            <p className="eyebrow" style={{ marginBottom: "var(--s-5)" }}>
              AI<span style={{ color: "var(--c-yellow)" }}> · </span>systems<span style={{ color: "var(--c-yellow)" }}> · </span>leverage
            </p>
            <h2 className="display" style={{ fontSize: "var(--t-h1)", maxWidth: 560 }}>
              The <span style={{ color: "var(--c-yellow)" }}>Building Leverage</span> podcast.
            </h2>
            <p style={{ color: "var(--c-muted-dark)", maxWidth: 440, margin: "var(--s-5) 0" }}>
              Long-form conversations on building with AI. A dedicated site is on the way.
            </p>
            <div style={{ display: "flex", gap: "var(--s-5)", alignItems: "center", flexWrap: "wrap" }}>
              <Link href="/podcast" className="btn-accent">Listen <span>→</span></Link>
              <span className="navlink" style={{ opacity: 0.6 }}>Dedicated site — coming soon</span>
            </div>
          </div>
        </section>

        {/* work with me */}
        <section className="wrap section">
          <p className="eyebrow" style={{ marginBottom: "var(--s-4)" }}>Work with me</p>
          <h2 className="display" style={{ fontSize: "var(--t-h2)", maxWidth: 520 }}>
            Brand partnerships &amp; collabs.
          </h2>
          <p style={{ maxWidth: 420, color: "var(--c-muted)", margin: "var(--s-4) 0 var(--s-5)" }}>
            Storytelling videos on founders, products and AI. Rates and past work in the media kit.
          </p>
          <a href="https://www.passionfroot.me/joshualarosaai" target="_blank" rel="noopener" className="btn-link">
            View media kit <span className="arrow">→</span>
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}
