import Link from "next/link";

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/joshualarosa.ai" },
  { label: "TikTok", href: "https://www.tiktok.com/@josh_larosa" },
  { label: "YouTube", href: "https://www.youtube.com/@BuildingLeveragePod" },
  { label: "Substack", href: "https://substack.com/@buildingleveragepod" },
];

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--c-line)", marginTop: "var(--s-8)" }}>
      <div
        className="wrap"
        style={{ padding: "var(--s-6) var(--s-6)", display: "flex", justifyContent: "space-between", gap: "var(--s-5)", flexWrap: "wrap" }}
      >
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 18, letterSpacing: "-0.02em" }}>
            joshualarosa<span style={{ color: "var(--c-yellow)" }}>.ai</span>
          </div>
          <p className="eyebrow" style={{ marginTop: "var(--s-3)" }}>Quiet editorial · siblings with building leverage</p>
        </div>
        <div style={{ display: "flex", gap: "var(--s-5)", flexWrap: "wrap", alignItems: "flex-start" }}>
          {SOCIALS.map((s) => (
            <a key={s.label} href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel="noopener" className="navlink">
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
