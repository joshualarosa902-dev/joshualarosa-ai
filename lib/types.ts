export type Resource = {
  slug: string;
  title: string;
  description: string;
  whats_inside: string[];
  category: string;
  cover_url: string | null;
  pdf_path: string;
  video_url: string | null;
  featured: boolean;
  published: boolean;
  created_at?: string;
};
