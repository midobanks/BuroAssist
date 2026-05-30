"use client";

import * as React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert } from "@/components/ui/alert";
import { Logo } from "@/components/ui/logo";
import { Book, Search, ArrowLeft } from "lucide-react";

interface GlossaryTerm {
  id: string;
  term: string;
  slug: string;
  plainEnglishDefinition: string;
  germanDefinition: string | null;
  workflow: { name: string; slug: string } | null;
}

export default function GlossaryPage() {
  const [terms, setTerms] = React.useState<GlossaryTerm[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [search, setSearch] = React.useState("");
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const timer = setTimeout(() => {
      const params = search ? `?search=${encodeURIComponent(search)}` : "";
      setError("");
      setIsLoading(true);
      fetch(`/api/glossary${params}`)
        .then((r) => r.json())
        .then((res) => setTerms(res.data?.terms || []))
        .catch(() => setError("Failed to search glossary."))
        .finally(() => setIsLoading(false));
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="flex-grow bg-background min-h-full flex flex-col justify-between">
      <header className="border-b border-border bg-surface sticky top-0 z-50">
        <div className="max-w-content mx-auto px-4 h-16 flex items-center justify-between">
          <Logo href="/" />
          <Link href="/sign-in">
            <Button variant="secondary" className="min-h-[38px] px-4 py-1.5 text-xs">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-content w-full mx-auto px-4 py-12 flex flex-col space-y-8">
        <div>
          <Link href="/" className="flex items-center gap-1 text-xs font-semibold text-text-secondary hover:text-accent mb-4">
            <ArrowLeft className="h-4 w-4" /> Home
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-text-primary flex items-center gap-2">
            <Book className="h-6 w-6 text-accent" /> German Bureaucracy Glossary
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            German administrative terms explained in simple, friendly English.
          </p>
        </div>

        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-text-muted" />
          <input
            type="text"
            placeholder="Search terms or definitions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-sm bg-surface border border-border rounded-xl pl-10 pr-4 py-2.5 focus-visible:outline-2 focus-visible:outline-accent font-medium text-text-primary shadow-card"
          />
        </div>

        {error && <Alert variant="error" title="Error">{error}</Alert>}

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
        ) : terms.length === 0 ? (
          <div className="col-span-full py-16 text-center text-xs text-text-muted font-medium">
            No matching glossary terms found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {terms.map((item) => (
              <Card key={item.id} className="flex flex-col justify-between h-full hover:border-accent/15 transition-all">
                <div>
                  <CardHeader className="pb-2 flex flex-row items-start justify-between space-y-0">
                    <div className="flex flex-col space-y-0.5">
                      {item.workflow && (
                        <Badge variant="neutral">{item.workflow.name}</Badge>
                      )}
                      <CardTitle className="text-base font-bold pt-1">{item.term}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="mt-2">
                    <p className="text-xs text-text-secondary leading-relaxed font-medium">
                      {item.plainEnglishDefinition}
                    </p>
                    {item.germanDefinition && (
                      <p className="text-[10px] text-text-muted mt-2 italic">
                        German: {item.germanDefinition}
                      </p>
                    )}
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-border bg-surface-soft/40 py-8 mt-12">
        <div className="max-w-content mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <span>&copy; {new Date().getFullYear()} BüroAssist. Made with care for expats.</span>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-text-secondary">About</Link>
            <Link href="/privacy" className="hover:text-text-secondary">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-text-secondary">Terms</Link>
            <Link href="/disclaimer" className="hover:text-text-secondary">Disclaimer</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
