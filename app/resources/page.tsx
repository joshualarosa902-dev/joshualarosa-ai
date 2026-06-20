import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CategoryFilter from "@/components/CategoryFilter";
import { getPublishedResources, getCategories } from "@/lib/resources";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Resources",
  description: "Every free guide, prompt and playbook in one place.",
};

export default async function Resources() {
  const [resources, categories] = await Promise.all([getPublishedResources(), getCategories()]);

  return (
    <>
      <Nav />
      <main className="wrap section" style={{ paddingTop: "var(--s-7)" }}>
        <p className="eyebrow" style={{ marginBottom: "var(--s-4)" }}>Resources</p>
        <h1 className="display" style={{ fontSize: "var(--t-h1)", maxWidth: 560, marginBottom: "var(--s-6)" }}>
          Everything, <span className="serif und">in one place</span>.
        </h1>
        {resources.length === 0 ? (
          <div className="empty">
            <p style={{ margin: 0, fontWeight: 500 }}>No resources yet.</p>
            <p style={{ margin: "var(--s-3) 0 0", fontSize: "var(--t-small)" }}>New guides drop here straight from the videos — check back soon.</p>
          </div>
        ) : (
          <CategoryFilter resources={resources} categories={categories} />
        )}
      </main>
      <Footer />
    </>
  );
}
