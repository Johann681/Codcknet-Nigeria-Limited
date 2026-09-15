import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Online | Codcknet Nigeria Limited",
  description: "Schedule vehicle tracking, speed limiter installation, and fleet management consultations with Codcknet.",
};

export default function BookOnlineLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
