import * as React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex-grow bg-background min-h-full flex flex-col justify-between">
      <header className="border-b border-border bg-surface h-16 flex items-center">
        <div className="max-w-content w-full mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="font-semibold text-text-primary text-lg">
            <span className="text-accent">Büro</span>Assist
          </Link>
          <Link href="/">
            <Button variant="secondary" className="min-h-[38px] px-4 py-1.5 text-xs">
              Home
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-narrow w-full mx-auto px-4 py-12 flex flex-col space-y-6">
        <Link href="/" className="flex items-center gap-1 text-xs font-semibold text-text-secondary hover:text-accent mb-2">
          <ArrowLeft className="h-4 w-4" /> Home
        </Link>
        
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-text-primary">
          About BüroAssist
        </h1>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Our Mission</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col space-y-4 text-xs text-text-secondary leading-relaxed font-medium">
            <p>
              Moving to Germany is an exciting step, but navigating the administrative system (Behörden) can be incredibly stressful, especially for non-German speakers.
            </p>
            <p>
              BüroAssist is designed to act as a calm, helpful companion. Inspired by modern text-first guidelines, we break down complex official workflows into clear checklists, keep track of deadlines, and provide direct references to official sources.
            </p>
            <p>
              We cover the six core steps: SIM card activation, banking registration, health insurance onboarding, Anmeldung (address registration), residence permits, and Tax ID retrieval.
            </p>
          </CardContent>
        </Card>
      </main>

      <footer className="border-t border-border bg-surface-soft/40 py-6 text-center text-xs text-text-muted">
        &copy; {new Date().getFullYear()} BüroAssist. Made with care for expats.
      </footer>
    </div>
  );
}
