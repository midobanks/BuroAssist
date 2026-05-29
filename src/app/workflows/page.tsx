"use client";

import * as React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, ArrowRight, Smartphone, Landmark, HeartHandshake, Home, Shield, FileText } from "lucide-react";

const workflowIcons: Record<string, React.ReactNode> = {
  mobile_sim: <Smartphone className="h-5 w-5 text-accent" />,
  banking: <Landmark className="h-5 w-5 text-accent" />,
  health_insurance: <HeartHandshake className="h-5 w-5 text-accent" />,
  anmeldung: <Home className="h-5 w-5 text-accent" />,
  residence_permit: <Shield className="h-5 w-5 text-accent" />,
  tax_id_elster: <FileText className="h-5 w-5 text-accent" />,
};

interface WorkflowItem {
  slug: string;
  name: string;
  shortDescription: string;
  category: string;
  defaultOrder: number;
}

export default function PublicWorkflowsPage() {
  const [workflows, setWorkflows] = React.useState<WorkflowItem[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("/api/workflows")
      .then((r) => r.json())
      .then((res) => {
        const wfs = (res.data?.workflows || []).sort((a: WorkflowItem, b: WorkflowItem) => a.defaultOrder - b.defaultOrder);
        setWorkflows(wfs);
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="flex-grow bg-background min-h-full flex flex-col justify-between">
      <header className="border-b border-border bg-surface h-16 flex items-center">
        <div className="max-w-content w-full mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="font-semibold text-text-primary text-lg">
            <span className="text-accent">Büro</span>Assist
          </Link>
          <Link href="/sign-in">
            <Button variant="secondary" className="min-h-[38px] px-4 py-1.5 text-xs">
              Sign In
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-content w-full mx-auto px-4 py-12 flex flex-col space-y-6">
        <Link href="/" className="flex items-center gap-1 text-xs font-semibold text-text-secondary hover:text-accent mb-2">
          <ArrowLeft className="h-4 w-4" /> Home
        </Link>

        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-text-primary">
            Relocation Workflows
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Browse guides and requirements for the six core setup stages in Germany.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-48 w-full" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workflows.map((flow) => (
              <Card key={flow.slug} className="flex flex-col justify-between h-full hover:border-accent/15 transition-all">
                <div>
                  <CardHeader className="pb-3 border-b border-border/40 -mx-6 px-6 flex flex-row items-center gap-2">
                    <div className="p-1.5 bg-accent-soft/30 rounded-md">{workflowIcons[flow.slug] || <FileText className="h-5 w-5 text-accent" />}</div>
                    <span className="font-semibold text-text-primary text-sm">{flow.name}</span>
                  </CardHeader>
                  <div className="mt-4">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-text-muted">
                      {flow.category?.replace("_", " ") || "Setup"}
                    </span>
                    <p className="text-xs text-text-secondary leading-relaxed mt-1">
                      {flow.shortDescription}
                    </p>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-border/40">
                  <Link href={`/workflows/${flow.slug}`}>
                    <Button variant="secondary" className="w-full text-xs min-h-[38px] py-1.5 flex items-center justify-center gap-1.5">
                      <span>View Guide</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-border bg-surface-soft/40 py-6 text-center text-xs text-text-muted">
        &copy; {new Date().getFullYear()} BüroAssist. Made with care for expats.
      </footer>
    </div>
  );
}
