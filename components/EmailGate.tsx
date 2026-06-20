"use client";

import { useEffect, useState } from "react";

type Status = "idle" | "loading" | "unlocked" | "error";

export default function EmailGate({ slug, title }: { slug: string; title: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [already, setAlready] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`unlocked:${slug}`);
    if (saved) {
      setAlready(true);
      setEmail(saved);
      setStatus("unlocked");
    }
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
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong.");
        return;
      }
      localStorage.setItem(`unlocked:${slug}`, email);
      setStatus("unlocked");
      if (data.url) {
        setDownloadUrl(data.url);
        window.location.href = data.url;
      } else if (data.sample) {
        setMessage("Sample mode — the real PDF downloads here once Supabase is connected.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Try again.");
    }
  }

  if (status === "unlocked") {
    return (
      <div className="gate" style={{ borderColor: "var(--c-yellow)" }}>
        <p className="eyebrow" style={{ margin: 0 }}>
          <span className="dot" /> {already ? "You already have this" : "Unlocked"}
        </p>
        <p style={{ margin: "var(--s-3) 0 var(--s-4)", fontSize: "var(--t-small)", color: "var(--text-muted)" }}>
          {downloadUrl
            ? "Your download should have started."
            : message || "Tap below to get your copy."}
        </p>
        {downloadUrl ? (
          <a className="btn-accent" href={downloadUrl}>Download again <span className="arrow">↓</span></a>
        ) : (
          <button className="btn-accent" onClick={() => submit(new Event("submit") as unknown as React.FormEvent)}>
            Get the file <span className="arrow">↓</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <form className="gate" onSubmit={submit}>
      <p className="eyebrow" style={{ margin: "0 0 var(--s-3)" }}>Get “{title}” free</p>
      <p style={{ margin: "0 0 var(--s-4)", fontSize: "var(--t-small)", color: "var(--text-muted)" }}>
        Drop your email and the PDF is yours.
      </p>
      <div style={{ display: "flex", gap: "var(--s-3)", flexWrap: "wrap" }}>
        <input
          type="email"
          required
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="field"
        />
        <button className="btn-accent" type="submit" disabled={status === "loading"}>
          {status === "loading" ? "…" : "Download"} <span className="arrow">↓</span>
        </button>
      </div>
      {status === "error" && (
        <p style={{ marginTop: "var(--s-3)", fontSize: "var(--t-small)", color: "#b3261e" }}>{message}</p>
      )}
    </form>
  );
}
