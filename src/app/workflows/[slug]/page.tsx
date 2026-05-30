"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/ui/logo";
import { Alert } from "@/components/ui/alert";
import { SourceBlock } from "@/components/ui/source-block";
import { DisclaimerBlock } from "@/components/ui/disclaimer-block";
import { ArrowLeft, BookOpen, AlertCircle } from "lucide-react";

interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  stepOrder: number;
  source: { title: string; url: string } | null;
}

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  itemType: string;
  priority: string;
}

export default function PublicWorkflowDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [workflow, setWorkflow] = React.useState<{
    name: string;
    shortDescription: string;
    longDescription: string;
    riskLevel: string;
    lastReviewedAt: string;
    steps: WorkflowStep[];
    checklistItems: ChecklistItem[];
    contentSources: { id: string; title: string; url: string; sourceType: string; publisher: string | null; lastCheckedAt: string }[];
  } | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    fetch(`/api/workflows/${slug}`)
      .then((r) => r.json())
      .then((res) => {
        if (!res.data?.workflow) {
          setError("Workflow not found.");
          return;
        }
        setWorkflow(res.data.workflow);
      })
      .catch(() => setError("Failed to load workflow."))
      .finally(() => setIsLoading(false));
  }, [slug]);

  if (isLoading) {
    return (
      <div className="flex-grow bg-background min-h-full">
        <header className="border-b border-border bg-surface h-16 flex items-center">
          <div className="max-w-content w-full mx-auto px-4">
            <Logo href="/" />
          </div>
        </header>
        <main className="max-w-narrow mx-auto px-4 py-12 flex flex-col space-y-6">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-8 w-72" />
          <Skeleton className="h-24 w-full" />
        </main>
      </div>
    );
  }

  if (error || !workflow) {
    return (
      <div className="flex-grow bg-background min-h-full">
        <header className="border-b border-border bg-surface h-16 flex items-center">
          <div className="max-w-content w-full mx-auto px-4 flex items-center justify-between">
            <Logo href="/" />
            <Link href="/sign-in"><Button variant="secondary" className="min-h-[38px] px-4 py-1.5 text-xs">Sign In</Button></Link>
          </div>
        </header>
        <main className="max-w-narrow mx-auto px-4 py-12 flex flex-col items-center space-y-4">
          <AlertCircle className="h-12 w-12 text-text-muted" />
          <Alert variant="warning" title="Not available">{error || "Workflow not found."}</Alert>
          <Link href="/workflows"><Button variant="secondary">Back to Workflows</Button></Link>
        </main>
      </div>
    );
  }

  return (
    <div className="flex-grow bg-background min-h-full flex flex-col justify-between">
      <header className="border-b border-border bg-surface h-16 flex items-center">
        <div className="max-w-content w-full mx-auto px-4 flex items-center justify-between">
          <Logo href="/" />
          <Link href="/sign-in">
            <Button variant="secondary" className="min-h-[38px] px-4 py-1.5 text-xs">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-narrow w-full mx-auto px-4 py-12 flex flex-col space-y-8">
        <Link href="/workflows" className="flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-accent transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Workflows
        </Link>

        <div className="flex flex-col space-y-2">
          <div className="flex items-center gap-2">
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-text-primary">{workflow.name}</h1>
            <Badge variant={workflow.riskLevel === "high" ? "error" : workflow.riskLevel === "medium" ? "warning" : "neutral"}>
              {workflow.riskLevel === "high" ? "High Risk" : workflow.riskLevel === "medium" ? "Medium" : "Low Risk"}
            </Badge>
          </div>
          <p className="text-xs leading-relaxed text-text-secondary font-medium">
            {workflow.longDescription || workflow.shortDescription}
          </p>
          {workflow.lastReviewedAt && (
            <p className="text-[10px] text-text-muted">Last reviewed: {new Date(workflow.lastReviewedAt).toLocaleDateString()}</p>
          )}
        </div>

        <DisclaimerBlock />

        {workflow.steps.length > 0 && (
          <section>
            <h2 className="text-base font-bold text-text-primary mb-4">Step-by-Step Process</h2>
            <div className="flex flex-col space-y-4">
              {workflow.steps.map((step) => (
                <Card key={step.id}>
                  <CardContent className="pt-4">
                    <div className="flex gap-3">
                      <div className="h-6 w-6 rounded-full bg-accent text-surface text-[11px] flex items-center justify-center font-bold shrink-0 mt-0.5">
                        {step.stepOrder}
                      </div>
                      <div className="flex flex-col space-y-1">
                        <h3 className="font-semibold text-text-primary text-sm">{step.title}</h3>
                        <p className="text-xs text-text-secondary leading-relaxed">{step.description}</p>
                        {step.source && (
                          <SourceBlock
                            title={step.source.title}
                            url={step.source.url}
                            sourceType="official_government"
                            publisher={step.source.title}
                            lastCheckedAt={workflow.lastReviewedAt}
                          />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {workflow.checklistItems.length > 0 && (
          <section>
            <h2 className="text-base font-bold text-text-primary mb-4">Required Documents & Steps</h2>
            <div className="flex flex-col space-y-3">
              {workflow.checklistItems.filter((i) => i.priority === "high" || i.priority === "urgent").map((item) => (
                <Card key={item.id}>
                  <CardContent className="pt-4 flex items-start justify-between">
                    <div className="flex flex-col space-y-0.5">
                      <span className="font-semibold text-text-primary text-sm">{item.title}</span>
                      <p className="text-xs text-text-secondary">{item.description}</p>
                    </div>
                    <Badge variant={item.priority === "urgent" ? "error" : "warning"}>{item.priority}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {workflow.contentSources.length > 0 && (
          <section>
            <h3 className="text-sm font-bold text-text-primary flex items-center gap-1.5 mb-4">
              <BookOpen className="h-4 w-4 text-accent" /> Official Sources & Links
            </h3>
            <div className="flex flex-col space-y-3">
                {workflow.contentSources.map((source) => (
                <a key={source.id} href={source.url} target="_blank" rel="noopener noreferrer">
                  <SourceBlock
                    title={source.title}
                    url={source.url}
                    sourceType={source.sourceType as any}
                    publisher={source.publisher || source.sourceType.replace("_", " ")}
                    lastCheckedAt={source.lastCheckedAt}
                  />
                </a>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="border-t border-border bg-surface-soft/40 py-6 text-center text-xs text-text-muted">
        &copy; {new Date().getFullYear()} BüroAssist. Made with care for expats.
      </footer>
    </div>
  );
}
