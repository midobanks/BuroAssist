"use client";

import * as React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert } from "@/components/ui/alert";
import { ArrowRight, Compass, ShieldAlert, AlertCircle } from "lucide-react";

interface RoadmapItem {
  slug: string;
  name: string;
  shortDescription: string;
  reason: string;
  status: string;
  progressPercentage: number;
  isUrgent: boolean;
  isApplicable: boolean;
  order: number;
}

export default function RoadmapPage() {
  const [steps, setSteps] = React.useState<RoadmapItem[]>([]);
  const [city, setCity] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    Promise.all([
      fetch("/api/roadmap/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: true }),
      }).then((r) => r.json()),
      fetch("/api/profile").then((r) => r.json()),
    ])
      .then(([roadmapRes, profileRes]) => {
        if (!roadmapRes.data?.roadmap?.workflows) {
          setError("Please complete your onboarding first.");
          return;
        }
        const items = roadmapRes.data.roadmap.workflows
          .filter((w: RoadmapItem) => w.isApplicable)
          .sort((a: RoadmapItem, b: RoadmapItem) => a.order - b.order);
        setSteps(items);
        setCity(profileRes.data?.profile?.city?.name || "Germany");
      })
      .catch(() => setError("Failed to load your roadmap."))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col space-y-8 max-w-narrow mx-auto">
        <Skeleton className="h-8 w-72" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-4 max-w-narrow mx-auto">
        <AlertCircle className="h-12 w-12 text-text-muted" />
        <Alert variant="warning" title="Roadmap unavailable">{error}</Alert>
        <Link href="/onboarding">
          <Button>Complete Onboarding</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-8 max-w-narrow mx-auto">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-text-primary flex items-center gap-2">
          <Compass className="h-6 w-6 text-accent" /> Your Relocation Roadmap
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          This sequence is personalized based on your profile in {city}.
        </p>
      </div>

      {steps.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-sm text-text-muted">Your roadmap is empty. Complete your profile to get started.</p>
            <Link href="/onboarding" className="mt-4 inline-block">
              <Button variant="secondary">Set Up Profile</Button>
            </Link>
          </CardContent>
        </Card>
      )}

      <div className="relative border-l border-border pl-6 ml-3 space-y-8">
        {steps.map((step) => {
          const isCompleted = step.status === "completed";
          const isInProgress = step.status === "in_progress";
          const isBlocked = step.status === "blocked";

          return (
            <div key={step.slug} className="relative">
              <div
                className={`absolute -left-[31px] top-1.5 h-4 w-4 rounded-full border-2 bg-surface transition-colors ${
                  isCompleted
                    ? "border-success bg-success"
                    : isInProgress
                    ? "border-warning"
                    : isBlocked
                    ? "border-error"
                    : "border-border"
                }`}
              />

              <Card className={isInProgress ? "border-accent/35 shadow-soft" : ""}>
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-text-primary text-base">
                      {step.order}. {step.name}
                    </h3>
                    <div className="flex items-center gap-1.5">
                      {step.isUrgent && (
                        <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-error bg-error-soft/60 px-2 py-0.5 rounded border border-error/15">
                          <ShieldAlert className="h-3 w-3" /> Urgent
                        </span>
                      )}
                      <Badge
                        variant={
                          isCompleted ? "success"
                          : isInProgress ? "warning"
                          : isBlocked ? "error"
                          : "default"
                        }
                      >
                        {isCompleted ? "Completed"
                          : isInProgress ? "In Progress"
                          : isBlocked ? "Blocked"
                          : "Ready"}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-xs leading-relaxed text-text-secondary font-medium">
                    {step.reason}
                  </p>

                  <div className="pt-2 flex items-center justify-between border-t border-border/40">
                    <span className="text-[10px] text-text-muted uppercase font-bold">
                      {step.progressPercentage}% complete
                    </span>
                    <Link href={`/workflows/${step.slug}`}>
                      <Button
                        variant={isInProgress ? "primary" : "secondary"}
                        className="min-h-[34px] px-3.5 py-1 text-xs"
                      >
                        <span>Go to Tasks</span>
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
