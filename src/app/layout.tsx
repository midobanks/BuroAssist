import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PostHogProvider } from "@/components/shared/posthog-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BüroAssist — Your calm guide through German bureaucracy",
  description: "A minimal, scannable guide and roadmap planner to help expats navigate Anmeldung, residence permits, tax registration, health insurance, and banking in Germany.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-background text-text-primary font-sans">
        <PostHogProvider>
          {children}
        </PostHogProvider>
      </body>
    </html>
  );
}
