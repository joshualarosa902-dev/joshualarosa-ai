import Link from "next/link";
import type { Resource } from "@/lib/types";

export default function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <Link href={`/r/${resource.slug}`} className="card resource-card" style={{ textDecoration: "none", display: "block" }}>
      <span className="label"><span className="dot" />{resource.category}</span>
      <div className="card__title">{resource.title}</div>
      <p className="card__desc">{resource.description}</p>
      <span className="btn-link" style={{ pointerEvents: "none" }}>
        View <span className="arrow">→</span>
      </span>
    </Link>
  );
}
