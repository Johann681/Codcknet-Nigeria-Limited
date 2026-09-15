import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Codcknet Nigeria Limited",
  description: "Learn how Codcknet delivers vehicle safety, GPS tracking, and fleet management solutions across Nigeria.",
};

export default function AboutLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
