import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Media Kit",
  description: "Joshua LaRosa — AI creator helping young people turn AI into leverage. Audience, reach, and brand partnerships.",
};

const DATA = {
  tagline: "Giving young people leverage in the age of AI.",
  blurb:
    "I'm Joshua LaRosa (@joshualarosa.ai). I help the next generation actually use AI — students, young founders, and anyone willing to learn, young or old — and apply it in real life: in school, in college, in business, in building a future most people aren't ready for. The mission is simple: give people leverage in a world being rewritten by AI, taught in a way that feels organic, not like a textbook.",
  email: "josh@joshualarosai.com",
  total: { n: "82.7K", note: "across Instagram & TikTok — plus 6.2K newsletter subscribers, and a far larger audience who watch without ever following." },
  platforms: [
    {
      name: "Instagram", tag: "The engine", handle: "@joshualarosa.ai", href: "https://www.instagram.com/joshualarosa.ai",
      stats: [{ n: "43.3K", l: "Followers" }, { n: "8.6%", l: "Engagement · top 25%" }, { n: "33.9K", l: "Avg views / reel" }, { n: "539.5K", l: "Reach / month" }],
      story: "Reels average 33.9K views on 43.3K followers — nearly my whole audience watching every single post — and 539.5K people are reached a month, 12× my following. An 8.6% engagement rate puts me in the top 25% of creators my size. Most don't come close.",
    },
    {
      name: "TikTok", tag: "Fast growth", handle: "@josh_larosa", href: "https://www.tiktok.com/@josh_larosa",
      stats: [{ n: "39.4K", l: "Followers" }, { n: "463K", l: "Viewers / 60d" }, { n: "+32%", l: "Growth / 60d" }, { n: "3.5K", l: "Avg views" }],
      story: "Young, US-heavy, and growing fast — 463K viewers in the last 60 days, up 32%. This is where the next wave of the audience is being built.",
    },
    {
      name: "Newsletter", tag: "The direct line", handle: "Building Leverage · Substack", href: "https://substack.com/@buildingleveragepod",
      stats: [{ n: "6.2K", l: "Subscribers" }, { n: "30%", l: "Open rate" }],
      story: "6,200 readers at a 30% open rate — roughly double the industry average. The most direct, trusted line straight to my audience's inbox.",
    },
  ],
  age: [{ range: "18–24", pct: 33 }, { range: "25–34", pct: 34 }, { range: "35–44", pct: 15 }, { range: "45–54", pct: 9 }, { range: "55+", pct: 5 }],
  gender: { male: 71, female: 28 },
  geo: [{ c: "🇺🇸 United States", pct: 48 }, { c: "🇮🇳 India", pct: 9 }, { c: "🇸🇪 Sweden", pct: 4 }, { c: "🇬🇧 United Kingdom", pct: 3 }, { c: "🇨🇦 Canada", pct: 3 }],
  brands: ["Higgsfield", "OpenArt", "ElevenLabs", "Replit", "Poppy AI"],
  formats: ["Founder & product storytelling videos", "Short-form AI explainers (Reels / TikTok / Shorts)", "Podcast features on Building Leverage", "Integrated brand mentions + dedicated edits"],
};

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(28px,4vw,42px)", letterSpacing: "-0.03em", color: "var(--c-ink)", lineHeight: 1 }}>{n}</div>
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
          <p className="eyebrow" style={{ marginBottom: "var(--s-5)" }}>Media kit · Joshua LaRosa</p>
          <h1 className="display" style={{ fontSize: "var(--t-hero)", letterSpacing: "-0.03em", lineHeight: 1.0, maxWidth: 880 }}>
            Giving young people <span className="serif" style={{ color: "var(--c-ink)" }}>leverage</span> in the age of AI.
          </h1>
          <p style={{ maxWidth: 640, color: "var(--c-muted)", marginTop: "var(--s-5)", lineHeight: 1.7, fontSize: "var(--t-h3)" }}>{DATA.blurb}</p>
          <div style={{ display: "flex", gap: "var(--s-4)", marginTop: "var(--s-6)", flexWrap: "wrap" }}>
            <a href={`mailto:${DATA.email}?subject=Brand%20partnership`} className="btn-accent">Work with me <span>→</span></a>
            <span className="btn-link" style={{ pointerEvents: "none", color: "var(--c-muted)" }}>joshualarosa.ai/media-kit</span>
          </div>
        </section>

        {/* TOTAL — one unmistakable number */}
        <section className="wrap section">
          <div style={{ borderTop: "1px solid var(--c-line)", borderBottom: "1px solid var(--c-line)", padding: "var(--s-7) 0", display: "flex", gap: "var(--s-7)", alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ flex: "none" }}>
              <p className="eyebrow" style={{ marginBottom: "var(--s-3)" }}>Total following</p>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(64px,12vw,128px)", letterSpacing: "-0.04em", lineHeight: 0.85, color: "var(--c-ink)" }}>82.7K</div>
            </div>
            <p style={{ maxWidth: 440, color: "var(--c-muted)", lineHeight: 1.65, fontSize: "var(--t-h3)" }}>
              {DATA.total.note}
            </p>
          </div>
        </section>

        {/* PLATFORM BREAKDOWN — each clearly labeled */}
        <section className="wrap section">
          <p className="eyebrow" style={{ marginBottom: "var(--s-5)" }}>Where the audience lives</p>
          <div style={{ display: "grid", gap: "var(--s-4)" }}>
            {DATA.platforms.map((p) => (
              <div key={p.name} className="mk-panel">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "var(--s-4)", flexWrap: "wrap", marginBottom: "var(--s-5)" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "var(--s-3)", flexWrap: "wrap" }}>
                      <h2 style={{ fontSize: "var(--t-h1)", textTransform: "none" }}>{p.name}</h2>
                      <span className="mk-tag">{p.tag}</span>
                    </div>
                    <div className="mono" style={{ color: "var(--c-muted)", fontSize: "var(--t-small)", marginTop: 4 }}>{p.handle}</div>
                  </div>
                  <a href={p.href} target="_blank" rel="noopener" className="btn-link">Visit <span className="arrow">→</span></a>
                </div>
                <div className="mk-pstats">{p.stats.map((s) => <Stat key={s.l} n={s.n} l={s.l} />)}</div>
                <p style={{ color: "var(--c-muted)", lineHeight: 1.7, marginTop: "var(--s-5)", maxWidth: 720 }}>{p.story}</p>
              </div>
            ))}
          </div>
        </section>

        {/* THE ANGLE — the story that makes it convert */}
        <section className="wrap section">
          <div style={{ background: "var(--c-ink)", color: "#F4F1EA", borderRadius: "var(--r-lg)", padding: "var(--s-8) var(--s-7)" }}>
            <p className="eyebrow" style={{ color: "var(--c-yellow)", marginBottom: "var(--s-5)" }}>Why it converts</p>
            <p style={{ fontSize: "var(--t-h1)", fontFamily: "var(--font-display)", fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.18, maxWidth: 820, color: "#fff" }}>
              Most AI content is a tutorial. Mine is a <span className="serif" style={{ color: "var(--c-yellow)" }}>feeling</span>.
            </p>
            <p style={{ color: "#b9b4aa", maxWidth: 600, marginTop: "var(--s-5)", lineHeight: 1.7, fontSize: "var(--t-h3)" }}>
              I show young people that AI isn&apos;t a threat — it&apos;s the biggest unfair advantage of their lifetime. No jargon, no gatekeeping, just real ways to use it in school, work, and life. That&apos;s why people don&apos;t just watch, they feel seen — and it&apos;s why an 8.6% engagement rate sits in the top 25%. For a brand, that means your product shows up inside a story people actually trust.
            </p>
          </div>
        </section>

        {/* AUDIENCE */}
        <section className="wrap section">
          <p className="eyebrow" style={{ marginBottom: "var(--s-2)" }}>The audience</p>
          <p style={{ color: "var(--c-muted)", fontSize: "var(--t-h3)", maxWidth: 560, marginBottom: "var(--s-6)", lineHeight: 1.5 }}>
            Young, ambitious, and concentrated in the markets brands care about most.
          </p>
          <div className="mk-grid3">
            <div>
              <div className="eyebrow" style={{ marginBottom: "var(--s-4)" }}>Age <span style={{ opacity: 0.6 }}>· 67% are 18–34</span></div>
              {DATA.age.map((a) => (
                <div key={a.range} style={{ marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--t-small)", marginBottom: 4 }}><span>{a.range}</span><span className="muted">{a.pct}%</span></div>
                  <div className="mk-bar"><span style={{ width: `${a.pct * 2}%` }} /></div>
                </div>
              ))}
            </div>
            <div>
              <div className="eyebrow" style={{ marginBottom: "var(--s-4)" }}>Top markets</div>
              {DATA.geo.map((g) => (
                <div key={g.c} style={{ marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--t-small)", marginBottom: 4 }}><span>{g.c}</span><span className="muted">{g.pct}%</span></div>
                  <div className="mk-bar"><span style={{ width: `${g.pct * 2}%` }} /></div>
                </div>
              ))}
            </div>
            <div>
              <div className="eyebrow" style={{ marginBottom: "var(--s-4)" }}>Gender</div>
              <div style={{ display: "flex", gap: "var(--s-6)" }}>
                <Stat n={`${DATA.gender.male}%`} l="Male" />
                <Stat n={`${DATA.gender.female}%`} l="Female" />
              </div>
              <p style={{ color: "var(--c-muted)", fontSize: "var(--t-small)", marginTop: "var(--s-5)", lineHeight: 1.5 }}>Across Instagram + TikTok, last 60 days.</p>
            </div>
          </div>
        </section>

        {/* BRANDS */}
        <section className="wrap section">
          <p className="eyebrow" style={{ marginBottom: "var(--s-2)" }}>Trusted by</p>
          <p style={{ color: "var(--c-muted)", fontSize: "var(--t-h3)", maxWidth: 560, marginBottom: "var(--s-5)", lineHeight: 1.5 }}>The teams building the future of AI already partner with me.</p>
          <div className="mk-brands">
            {DATA.brands.map((b) => <div key={b} className="mk-brand">{b}</div>)}
            <div className="mk-brand" style={{ color: "var(--c-muted)", borderStyle: "dashed" }}>+ hundreds more</div>
          </div>
        </section>

        {/* WHAT I MAKE */}
        <section className="wrap section">
          <p className="eyebrow" style={{ marginBottom: "var(--s-4)" }}>What I make</p>
          <h2 className="display" style={{ fontSize: "var(--t-h2)", maxWidth: 560, marginBottom: "var(--s-5)", textTransform: "none" }}>Formats that fit how you want to show up.</h2>
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
            <h2 className="display" style={{ fontSize: "var(--t-h1)", color: "#fff", maxWidth: 620, textTransform: "none" }}>Tell me what you&apos;re launching.</h2>
            <p style={{ color: "#b9b4aa", maxWidth: 460, margin: "var(--s-4) 0 var(--s-5)", lineHeight: 1.6 }}>Brand deals, founder features, and collaborations. I reply to every serious inquiry.</p>
            <a href={`mailto:${DATA.email}?subject=Brand%20partnership`} className="btn-accent">{DATA.email} <span>→</span></a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
