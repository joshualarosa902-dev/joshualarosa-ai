"use client";

import { useEffect, useState } from "react";

type Status = "idle" | "loading" | "unlocked" | "error";

export default function GatedArticle({ slug, title, teaser, rest }: { slug: string; title: string; teaser: string; rest: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  useEffect(() => {
    if (localStorage.getItem(`unlocked:${slug}`)) setStatus("unlocked");
  }, [slug]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, slug }),
      });
      const data = await res.json();
      if (!res.ok) { setStatus("error"); setMessage(data.error ?? "Something went wrong."); return; }
      localStorage.setItem(`unlocked:${slug}`, "1");
      if (data.url) setDownloadUrl(data.url);
      setStatus("unlocked");
    } catch { setStatus("error"); setMessage("Network error. Try again."); }
  }

  const unlocked = status === "unlocked";

  return (
    <div className="article">
      <div dangerouslySetInnerHTML={{ __html: teaser }} />

      {unlocked ? (
        <>
          <div dangerouslySetInnerHTML={{ __html: rest }} />
          <div className="dl-bar">
            <span className="label"><span className="dot" /> You're in — enjoy</span>
            {downloadUrl
              ? <a className="btn-accent" href={downloadUrl}>Download the PDF <span className="arrow">↓</span></a>
              : <button className="btn-accent" onClick={submit}>Get the PDF <span className="arrow">↓</span></button>}
          </div>
        </>
      ) : (
        <div className="gate-wrap">
          <div className="gate-blur" aria-hidden="true" dangerouslySetInnerHTML={{ __html: rest }} />
          <div className="gate-card">
            <p className="eyebrow" style={{ marginBottom: "var(--s-3)" }}>Keep reading</p>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "var(--t-h3)", letterSpacing: "-.01em" }}>
              Get the rest of “{title}” + the PDF — free.
            </h3>
            <p style={{ color: "var(--c-muted)", fontSize: "var(--t-small)", margin: "var(--s-2) 0 var(--s-4)" }}>
              Drop your email to unlock the full guide and download it.
            </p>
            <form onSubmit={submit} style={{ display: "flex", gap: "var(--s-3)", flexWrap: "wrap" }}>
              <input type="email" required placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="field" style={{ flex: 1, minWidth: 200 }} />
              <button className="btn-accent" type="submit" disabled={status === "loading"}>
                {status === "loading" ? "…" : "Unlock"} <span className="arrow">→</span>
              </button>
            </form>
            {status === "error" && <p style={{ marginTop: "var(--s-3)", fontSize: "var(--t-small)", color: "#b3261e" }}>{message}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
