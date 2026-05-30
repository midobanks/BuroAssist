import * as React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="flex-grow bg-background min-h-full flex flex-col justify-between">
      <header className="border-b border-border bg-surface h-16 flex items-center">
        <div className="max-w-content w-full mx-auto px-4 flex items-center justify-between">
          <Logo href="/" />
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
          Terms & Conditions
        </h1>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Terms of Use</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col space-y-4 text-xs text-text-secondary leading-relaxed font-medium">
            <p>
              By accessing BüroAssist, you agree to these terms:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>All guides and roadmap recommendations are for educational and self-tracking purposes only.</li>
              <li>We do not guarantee appointment availability or success with local registrations or permit applications.</li>
              <li>You may cancel your account and email reminder notifications at any time in your profile settings.</li>
            </ul>
          </CardContent>
        </Card>
      </main>

      <footer className="border-t border-border bg-surface-soft/40 py-6 text-center text-xs text-text-muted">
        &copy; {new Date().getFullYear()} BüroAssist.
      </footer>
    </div>
  );
}
