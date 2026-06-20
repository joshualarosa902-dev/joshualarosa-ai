"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
      } else {
        setDone(true);
      }
    } catch {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <p style={{ fontSize: "var(--t-h3)", fontWeight: 500 }}>
        <span className="dot" style={{ marginRight: 8 }} /> You’re in. Talk soon.
      </p>
    );
  }

  return (
    <form onSubmit={submit} style={{ display: "flex", gap: "var(--s-3)", flexWrap: "wrap", maxWidth: 460 }}>
      <input
        type="email"
        required
        placeholder="you@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="field"
        style={{ flex: 1, minWidth: 220 }}
      />
      <button className="btn-accent" type="submit" disabled={loading}>
        {loading ? "…" : "Subscribe"} <span>→</span>
      </button>
      {error && <p style={{ width: "100%", margin: 0, fontSize: "var(--t-small)", color: "#b3261e" }}>{error}</p>}
    </form>
  );
}
