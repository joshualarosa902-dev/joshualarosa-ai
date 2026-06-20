import type { Resource } from "./types";
import { SAMPLE_RESOURCES } from "./sampleData";
import { getServerSupabase } from "./supabaseServer";

// Data-access layer. Reads from Supabase when configured, otherwise falls back
// to sample data — so the whole site is buildable and previewable before the
// backend exists. Pages only ever call these functions.

async function fetchAll(): Promise<Resource[]> {
  const sb = getServerSupabase();
  if (!sb) return SAMPLE_RESOURCES.filter((r) => r.published);
  const { data, error } = await sb
    .from("resources")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });
  if (error || !data) return [];
  return data as Resource[];
}

export async function getPublishedResources(): Promise<Resource[]> {
  return fetchAll();
}

export async function getFeaturedResources(): Promise<Resource[]> {
  const all = await fetchAll();
  const featured = all.filter((r) => r.featured);
  return (featured.length ? featured : all).slice(0, 3);
}

export async function getResource(slug: string): Promise<Resource | null> {
  const all = await fetchAll();
  return all.find((r) => r.slug === slug) ?? null;
}

export async function getCategories(): Promise<string[]> {
  const all = await fetchAll();
  return Array.from(new Set(all.map((r) => r.category))).sort();
}
