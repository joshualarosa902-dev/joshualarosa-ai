"use client";

import { useState } from "react";
import ResourceCard from "./ResourceCard";
import type { Resource } from "@/lib/types";

export default function CategoryFilter({ resources, categories }: { resources: Resource[]; categories: string[] }) {
  const [active, setActive] = useState<string>("All");
  const chips = ["All", ...categories];
  const shown = active === "All" ? resources : resources.filter((r) => r.category === active);

  return (
    <div>
      <div style={{ display: "flex", gap: "var(--s-3)", flexWrap: "wrap", marginBottom: "var(--s-6)" }}>
        {chips.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className="chip-filter"
            aria-pressed={active === c}
            data-active={active === c}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="grid-cards">
        {shown.map((r) => (
          <ResourceCard key={r.slug} resource={r} />
        ))}
      </div>
    </div>
  );
}
