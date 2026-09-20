import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import ChatbotWidget from "@/components/ChatbotWidget";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Codcknet Nigeria Limited | Safer Roads. Smarter Fleets.",
  description: "Certified vehicle safety, GPS tracking and fleet management across Nigeria.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${jakarta.variable} h-full antialiased`}><body className="min-h-full">{children}<ChatbotWidget /></body></html>;
}