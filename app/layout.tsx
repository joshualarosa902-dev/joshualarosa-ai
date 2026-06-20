import type { Metadata } from "next";
import "../brand/tokens.css";
import "../brand/components.css";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://joshualarosa.ai";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "joshualarosa.ai — resource hub",
    template: "%s — joshualarosa.ai",
  },
  description: "Guides, prompts and playbooks from the videos. Free, and always here.",
  openGraph: {
    type: "website",
    siteName: "joshualarosa.ai",
    title: "joshualarosa.ai — resource hub",
    description: "Guides, prompts and playbooks from the videos. Free, and always here.",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "joshualarosa.ai — resource hub",
    description: "Guides, prompts and playbooks from the videos. Free, and always here.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
