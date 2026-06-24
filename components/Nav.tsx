"use client";

import { useState } from "react";
import Link from "next/link";

const LINKS = [
  { label: "Resources", href: "/resources" },
  { label: "Podcast", href: "/podcast" },
  { label: "Newsletter", href: "/#newsletter" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <nav className="wrap nav-inner">
        <Link href="/" className="nav-mark" onClick={() => setOpen(false)}>
          joshualarosa<span style={{ color: "var(--c-yellow)" }}>.ai</span>
        </Link>

        <button
          className="nav-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span style={{ fontSize: 20, lineHeight: 1 }}>{open ? "✕" : "☰"}</span>
        </button>

        <div className="nav-links" data-open={open}>
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="navlink" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link href="/media-kit" className="btn-ghost" onClick={() => setOpen(false)}>
            Work with me
          </Link>
        </div>
      </nav>
    </header>
  );
}
