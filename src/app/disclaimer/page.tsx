import * as React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertCircle } from "lucide-react";

export default function DisclaimerPage() {
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
        
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-text-primary flex items-center gap-2">
          <AlertCircle className="h-6 w-6 text-text-muted" /> Legal Disclaimer
        </h1>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Important Notice</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col space-y-4 text-xs text-text-secondary leading-relaxed font-medium">
            <p>
              BüroAssist provides general guidance, translations, timelines, and checklists to help expats understand and navigate German bureaucracy.
            </p>
            <p className="font-semibold text-text-primary">
              BüroAssist does not provide legal, tax, immigration, insurance, or financial advice.
            </p>
            <p>
              We compile and review our guides based on official state manuals, government portals, and public information. However, German laws and municipal office (Bürgeramt/Ausländerbehörde) practices change frequently. Requirements can also vary significantly based on your individual citizenship, marriage status, target city, and personal situation.
            </p>
            <p>
              Always cross-reference details and confirm final application requirements directly with the responsible consulate, authority, or registered provider. Under no circumstances is BüroAssist liable for any application delays, rejections, fines, or status adjustments.
            </p>
          </CardContent>
        </Card>
      </main>

      <footer className="border-t border-border bg-surface-soft/40 py-6 text-center text-xs text-text-muted">
        &copy; {new Date().getFullYear()} BüroAssist. Informational purposes only.
      </footer>
    </div>
  );
}
