"use client";

import * as React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Compass, Calendar, ArrowRight, AlertCircle } from "lucide-react";

interface RoadmapWorkflow {
  slug: string;
  name: string;
  status: string;
  progressPercentage: number;
  isUrgent: boolean;
  isApplicable: boolean;
  dueDate: string | null;
}

export default function DashboardPage() {
  const [name, setName] = React.useState("");
  const [city, setCity] = React.useState("");
  const [workflows, setWorkflows] = React.useState<RoadmapWorkflow[]>([]);
  const [reminders, setReminders] = React.useState<{ title: string; reminderAt: string; workflowSlug?: string }[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    Promise.all([
      fetch("/api/profile").then((r) => r.json()),
      fetch("/api/roadmap/generate", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" }).then((r) => r.json()),
      fetch("/api/reminders").then((r) => r.json()),
    ])
      .then(([profileRes, roadmapRes, remindersRes]) => {
        const profile = profileRes.data?.profile;
        if (profile) {
          const fullName = profile.user?.name || "";
          setName(fullName.split(" ")[0] || "User");
          setCity(profile.city?.name || "Germany");
        }
        const wfs = roadmapRes.data?.roadmap?.workflows || [];
        setWorkflows(wfs.filter((w: RoadmapWorkflow) => w.isApplicable));
        setReminders(remindersRes.data?.reminders || []);
      })
      .catch(() => setError("Failed to load dashboard data."))
      .finally(() => setIsLoading(false));
  }, []);

  const completedCount = workflows.filter((w) => w.status === "completed").length;
  const totalCount = workflows.length;
  const overallProgress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const nextAction = workflows.find((w) => w.status === "not_started" || w.status === "in_progress");

  if (isLoading) {
    return (
      <div className="flex flex-col space-y-8 max-w-content mx-auto">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-4">
        <AlertCircle className="h-12 w-12 text-text-muted" />
        <p className="text-text-secondary text-sm">{error}</p>
        <Button variant="secondary" onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-8 max-w-content mx-auto">
      <div className="flex flex-col space-y-2 md:flex-row md:justify-between md:items-end md:space-y-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-text-primary">
            Welcome, {name}
          </h1>
          <p className="text-sm text-text-secondary">
            Here is your progress towards settling down in {city}.
          </p>
        </div>
        <div className="text-xs font-bold text-text-muted uppercase">
          Timezone: Europe/Berlin
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 flex flex-col justify-between">
          <div>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Settle-in Progress</CardTitle>
              <CardDescription className="text-xs">
                You have completed {completedCount} of {totalCount} required workflows.
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-2">
              <ProgressBar value={overallProgress} labelText="Overall Completion" />
            </CardContent>
          </div>
          <div className="mt-6 flex justify-between items-center text-xs text-text-secondary bg-surface-soft/40 p-4 -mx-6 -mb-6 rounded-b-xl border-t border-border/40">
            <span>Next milestone: {nextAction?.name || "All done!"}</span>
            <Link href="/roadmap" className="text-accent font-semibold hover:underline flex items-center gap-1">
              View full timeline <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </Card>

        {nextAction && (
          <Card className="bg-accent-soft/30 border-accent/10 flex flex-col justify-between">
            <CardHeader className="pb-2">
              <span className="text-[10px] font-bold tracking-wider text-accent uppercase">
                Next Recommended Action
              </span>
              <CardTitle className="text-base font-semibold pt-1">{nextAction.name}</CardTitle>
              <CardDescription className="text-xs pt-1 leading-relaxed">
                {nextAction.isUrgent ? "This step is time-sensitive." : "Continue with your setup."}
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-4">
              <Link href={`/workflows/${nextAction.slug}`}>
                <Button className="w-full text-xs min-h-[38px] py-1.5 flex items-center gap-1.5">
                  <span>Start Setup</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-base font-semibold">Active Checklist</CardTitle>
              <CardDescription className="text-xs">Your current focus items.</CardDescription>
            </div>
            <Link href="/workflows" className="text-xs font-semibold text-accent hover:underline">
              View Workflows
            </Link>
          </CardHeader>
          <CardContent className="mt-4 flex flex-col space-y-4">
            {workflows.length === 0 && (
              <p className="text-xs text-text-muted text-center py-4">No workflows yet. Complete onboarding to get started.</p>
            )}
            {workflows.slice(0, 5).map((flow) => (
              <div
                key={flow.slug}
                className="flex items-center justify-between border-b border-border/40 pb-3 last:border-b-0 last:pb-0"
              >
                <div className="flex flex-col space-y-1">
                  <span className="text-sm font-semibold text-text-primary">{flow.name}</span>
                  <div className="w-32">
                    <ProgressBar value={flow.progressPercentage} showLabel={false} />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {flow.isUrgent && flow.status !== "completed" && (
                    <span className="text-[9px] uppercase font-bold text-error">Urgent</span>
                  )}
                  <Badge variant={
                    flow.status === "completed" ? "success"
                    : flow.status === "in_progress" ? "warning"
                    : flow.status === "blocked" ? "error"
                    : "default"
                  }>
                    {flow.status === "completed" ? "Completed"
                      : flow.status === "in_progress" ? "In Progress"
                      : flow.status === "blocked" ? "Blocked"
                      : "Not Started"}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="flex flex-col justify-between">
          <div>
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="text-base font-semibold">Upcoming Deadlines</CardTitle>
                <CardDescription className="text-xs">Deadlines & Appointments.</CardDescription>
              </div>
              <Link href="/reminders" className="text-xs font-semibold text-accent hover:underline">
                Manage
              </Link>
            </CardHeader>
            <CardContent className="mt-4 flex flex-col space-y-4">
              {reminders.length === 0 && (
                <p className="text-xs text-text-muted text-center py-4">No upcoming reminders.</p>
              )}
              {reminders.slice(0, 3).map((reminder, i) => (
                <div key={i} className="flex gap-3 border-l-2 border-accent pl-3">
                  <div className="flex flex-col space-y-0.5">
                    <span className="text-sm font-semibold text-text-primary">{reminder.title}</span>
                    <span className="text-xs text-text-secondary flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-text-muted" />
                      {new Date(reminder.reminderAt).toLocaleDateString("en-US", {
                        year: "numeric", month: "long", day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </div>
          <div className="mt-6">
            <Link href="/reminders">
              <Button variant="secondary" className="w-full text-xs min-h-[38px] py-1.5">
                Add Reminder
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
