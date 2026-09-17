import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Codcknet Nigeria Limited",
  description: "Contact Codcknet about vehicle tracking, speed limiter installation, and fleet management solutions.",
};

export default function BookOnlineLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
