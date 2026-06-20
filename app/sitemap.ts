import type { MetadataRoute } from "next";
import { getPublishedResources } from "@/lib/resources";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://joshualarosa.ai";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const resources = await getPublishedResources();
  const staticPages = ["", "/resources", "/podcast"].map((p) => ({
    url: `${BASE}${p}`,
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.7,
  }));
  const resourcePages = resources.map((r) => ({
    url: `${BASE}/r/${r.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  return [...staticPages, ...resourcePages];
}
