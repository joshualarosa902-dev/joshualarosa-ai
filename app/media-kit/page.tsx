import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Media Kit",
  description: "Joshua LaRosa — AI creator & host of Building Leverage. Audience, reach, and brand partnerships.",
};

const DATA = {
  tagline: "AI storytelling that makes people feel something.",
  blurb:
    "I'm Joshua LaRosa (@joshualarosa.ai) — an AI & tech creator making personality-first videos about AI, founders, and building with leverage, across Instagram, TikTok, YouTube, Twitter, Twitch and Facebook, plus the Building Leverage podcast. Brands work with me because the audience trusts the story, not just the stat.",
  email: "joshualarosa902@gmail.com",
  stats: [
    { n: "82.7K", l: "Total followers" },
    { n: "8.6%", l: "Engagement · top 25%" },
    { n: "33.9K", l: "Avg views / reel" },
    { n: "6.2K", l: "Newsletter subscribers" },
  ],
  platforms: [
    { name: "Instagram", handle: "@joshualarosa.ai", followers: "43.3K", meta: "8.6% engagement · 539.5K reach / mo", href: "https://www.instagram.com/joshualarosa.ai" },
    { name: "TikTok", handle: "@josh_larosa", followers: "39.4K", meta: "463K viewers / 60d · 3.5K avg views", href: "https://www.tiktok.com/@josh_larosa" },
    { name: "Newsletter", handle: "Building Leverage · Substack", followers: "6.2K", meta: "30% average open rate", href: "https://substack.com/@buildingleveragepod" },
  ],
  age: [
    { range: "18–24", pct: 33 }, { range: "25–34", pct: 34 }, { range: "35–44", pct: 15 },
    { range: "45–54", pct: 9 }, { range: "55+", pct: 5 },
  ],
  gender: { male: 71, female: 28 },
  geo: [
    { c: "🇺🇸 United States", pct: 48 }, { c: "🇮🇳 India", pct: 9 }, { c: "🇸🇪 Sweden", pct: 4 },
    { c: "🇬🇧 United Kingdom", pct: 3 }, { c: "🇨🇦 Canada", pct: 3 },
  ],
  brands: ["Replit", "Lemon AI", "Merit Systems", "AgentCash", "August AI", "Mozie"],
  formats: [
    "Founder & product storytelling videos",
    "Short-form AI explainers (Reels / TikTok / Shorts)",
    "Podcast features on Building Leverage",
    "Integrated brand mentions + dedicated edits",
  ],
};

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(34px,5vw,56px)", letterSpacing: "-0.03em", color: "var(--c-ink)" }}>{n}</div>
      <div className="eyebrow" style={{ marginTop: 6 }}>{l}</div>
    </div>
  );
}

export default function MediaKit() {
  return (
    <>
      <Nav />
      <main>
        {/* HERO */}
        <section className="wrap section" style={{ paddingTop: "var(--s-7)" }}>
          <p className="eyebrow" style={{ marginBottom: "var(--s-5)" }}>Media kit</p>
          <h1 className="display" style={{ fontSize: "var(--t-hero)", letterSpacing: "-0.03em", lineHeight: 1.02 }}>
            Joshua LaRosa
          </h1>
          <p className="serif" style={{ fontSize: "var(--t-h1)", color: "var(--c-ink)", marginTop: "var(--s-3)", maxWidth: 720, lineHeight: 1.2 }}>
            {DATA.tagline}
          </p>
          <p style={{ maxWidth: 620, color: "var(--c-muted)", marginTop: "var(--s-5)", lineHeight: 1.7 }}>{DATA.blurb}</p>
          <div style={{ display: "flex", gap: "var(--s-4)", marginTop: "var(--s-6)", flexWrap: "wrap" }}>
            <a href={`mailto:${DATA.email}?subject=Brand%20partnership`} className="btn-accent">Work with me <span>→</span></a>
            <a href="/media-kit" className="btn-link" style={{ pointerEvents: "none", color: "var(--c-muted)" }}>joshualarosa.ai/media-kit</a>
          </div>
        </section>

        {/* STATS */}
        <section className="wrap section">
          <div className="mk-stats">{DATA.stats.map((s) => <Stat key={s.l} n={s.n} l={s.l} />)}</div>
        </section>

        {/* PLATFORMS */}
        <section className="wrap section">
          <p className="eyebrow" style={{ marginBottom: "var(--s-5)" }}>The platforms</p>
          <div className="mk-grid3">
            {DATA.platforms.map((p) => (
              <a key={p.name} href={p.href} target="_blank" rel="noopener" className="mk-card">
                <div style={{ fontSize: "var(--t-h3)", fontWeight: 500 }}>{p.name}</div>
                <div className="mono" style={{ color: "var(--c-muted)", fontSize: "var(--t-small)", margin: "4px 0 var(--s-4)" }}>{p.handle}</div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 30, letterSpacing: "-0.02em" }}>{p.followers}</div>
                <div className="eyebrow" style={{ marginTop: 4 }}>followers</div>
                <div style={{ fontSize: "var(--t-small)", color: "var(--c-muted)", marginTop: "var(--s-3)", lineHeight: 1.5 }}>{p.meta}</div>
              </a>
            ))}
          </div>
        </section>

        {/* AUDIENCE */}
        <section className="wrap section">
          <p className="eyebrow" style={{ marginBottom: "var(--s-2)" }}>The audience</p>
          <p style={{ color: "var(--c-muted)", fontSize: "var(--t-small)", marginBottom: "var(--s-5)" }}>Across Instagram + TikTok · last 60 days</p>
          <div className="mk-grid3">
            <div>
              <div className="eyebrow" style={{ marginBottom: "var(--s-4)" }}>Age</div>
              {DATA.age.map((a) => (
                <div key={a.range} style={{ marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--t-small)", marginBottom: 4 }}><span>{a.range}</span><span className="muted">{a.pct}%</span></div>
                  <div className="mk-bar"><span style={{ width: `${a.pct * 2}%` }} /></div>
                </div>
              ))}
            </div>
            <div>
              <div className="eyebrow" style={{ marginBottom: "var(--s-4)" }}>Top geographies</div>
              {DATA.geo.map((g) => (
                <div key={g.c} style={{ marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--t-small)", marginBottom: 4 }}><span>{g.c}</span><span className="muted">{g.pct}%</span></div>
                  <div className="mk-bar"><span style={{ width: `${g.pct * 2}%` }} /></div>
                </div>
              ))}
            </div>
            <div>
              <div className="eyebrow" style={{ marginBottom: "var(--s-4)" }}>Gender</div>
              <div style={{ display: "flex", gap: "var(--s-5)" }}>
                <Stat n={`${DATA.gender.male}%`} l="Male" />
                <Stat n={`${DATA.gender.female}%`} l="Female" />
              </div>
            </div>
          </div>
        </section>

        {/* BRANDS */}
        <section className="wrap section">
          <p className="eyebrow" style={{ marginBottom: "var(--s-5)" }}>Trusted by</p>
          <div className="mk-brands">
            {DATA.brands.map((b) => <div key={b} className="mk-brand">{b}</div>)}
          </div>
        </section>

        {/* WHAT I MAKE */}
        <section className="wrap section">
          <p className="eyebrow" style={{ marginBottom: "var(--s-4)" }}>What I make</p>
          <h2 className="display" style={{ fontSize: "var(--t-h2)", maxWidth: 560, marginBottom: "var(--s-5)" }}>Formats that fit how you want to show up.</h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "var(--s-3)", maxWidth: 560 }}>
            {DATA.formats.map((f) => (
              <li key={f} style={{ display: "flex", gap: "var(--s-3)", alignItems: "baseline" }}><span className="dot" style={{ flex: "none" }} /><span>{f}</span></li>
            ))}
          </ul>
        </section>

        {/* CONTACT */}
        <section className="wrap section">
          <div style={{ background: "var(--c-ink)", borderRadius: "var(--r-lg)", padding: "var(--s-8) var(--s-7)", color: "#F4F1EA" }}>
            <p className="eyebrow" style={{ color: "var(--c-yellow)", marginBottom: "var(--s-4)" }}>Let&apos;s work together</p>
            <h2 className="display" style={{ fontSize: "var(--t-h1)", color: "#fff", maxWidth: 620 }}>Tell me what you&apos;re launching.</h2>
            <p style={{ color: "#b9b4aa", maxWidth: 460, margin: "var(--s-4) 0 var(--s-5)" }}>Brand deals, founder features, and collaborations. I reply to every serious inquiry.</p>
            <a href={`mailto:${DATA.email}?subject=Brand%20partnership`} className="btn-accent">{DATA.email} <span>→</span></a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
