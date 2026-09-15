import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Service List | Codcknet Nigeria Limited",
  description: "Explore Codcknet speed limiter installation, GPS tracking, fleet management, and support services.",
};

export default function ServicesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
