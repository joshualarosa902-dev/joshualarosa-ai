import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="wrap section" style={{ paddingTop: "var(--s-8)", paddingBottom: "var(--s-8)", minHeight: "50vh" }}>
        <p className="eyebrow" style={{ marginBottom: "var(--s-4)" }}>404</p>
        <h1 className="display" style={{ fontSize: "var(--t-h1)", maxWidth: 520 }}>
          This one’s <span className="serif und">missing</span>.
        </h1>
        <p style={{ maxWidth: 420, color: "var(--c-muted)", margin: "var(--s-4) 0 var(--s-5)" }}>
          The page you’re after isn’t here. The resources probably have what you want.
        </p>
        <Link href="/resources" className="btn-accent">Browse resources <span>→</span></Link>
      </main>
      <Footer />
    </>
  );
}
