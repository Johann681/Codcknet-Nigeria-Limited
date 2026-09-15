import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products | Codcknet Nigeria Limited",
  description: "Government-approved speed limiters, GPS trackers, diagnostic tools, and fleet hardware from Codcknet.",
};

export default function ProductsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
