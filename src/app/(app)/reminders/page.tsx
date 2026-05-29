"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Bell, Calendar, Plus, Trash2 } from "lucide-react";

interface Reminder {
  id: string;
  title: string;
  description: string | null;
  reminderType: string;
  reminderAt: string;
  channel: string;
  status: string;
  workflow: { name: string; slug: string } | null;
}

export default function RemindersPage() {
  const [reminders, setReminders] = React.useState<Reminder[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  const [showForm, setShowForm] = React.useState(false);
  const [formTitle, setFormTitle] = React.useState("");
  const [formDate, setFormDate] = React.useState("");
  const [formType, setFormType] = React.useState("deadline");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const fetchReminders = () => {
    fetch("/api/reminders")
      .then((r) => r.json())
      .then((res) => {
        setReminders(res.data?.reminders || []);
      })
      .catch(() => setError("Failed to load reminders."))
      .finally(() => setIsLoading(false));
  };

  React.useEffect(() => {
    fetchReminders();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/reminders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formTitle,
          reminderType: formType,
          reminderAt: new Date(formDate).toISOString(),
          channel: "email",
        }),
      });
      const body = await res.json();
      if (!res.ok) {
        setError(body.error?.message || "Failed to create reminder.");
        return;
      }
      setShowForm(false);
      setFormTitle("");
      setFormDate("");
      fetchReminders();
    } catch {
      setError("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/reminders/${id}`, { method: "DELETE" });
      fetchReminders();
    } catch {
      // silently fail
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col space-y-6 max-w-content mx-auto">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-8 max-w-content mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-text-primary flex items-center gap-2">
            <Bell className="h-6 w-6 text-accent" /> Reminders
          </h1>
          <p className="text-sm text-text-secondary mt-1">Manage your deadlines and appointment reminders.</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="min-h-[38px] px-4 text-xs">
          <Plus className="h-4 w-4 mr-1" /> New Reminder
        </Button>
      </div>

      {error && <Alert variant="error" title="Error">{error}</Alert>}

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Create Reminder</CardTitle>
          </CardHeader>
          <form onSubmit={handleCreate}>
            <CardContent className="flex flex-col space-y-4">
              <div className="flex flex-col space-y-1">
                <label className="text-xs font-bold text-text-primary uppercase" htmlFor="reminder-title">
                  Title
                </label>
                <input
                  id="reminder-title"
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Bürgeramt Appointment"
                  required
                  className="rounded-md border border-border bg-surface px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-accent"
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label className="text-xs font-bold text-text-primary uppercase" htmlFor="reminder-date">
                  Date & Time
                </label>
                <input
                  id="reminder-date"
                  type="datetime-local"
                  value={formDate}
                  onChange={(e) => setFormDate(e.target.value)}
                  required
                  className="rounded-md border border-border bg-surface px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-accent"
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label className="text-xs font-bold text-text-primary uppercase" htmlFor="reminder-type">
                  Type
                </label>
                <select
                  id="reminder-type"
                  value={formType}
                  onChange={(e) => setFormType(e.target.value)}
                  className="rounded-md border border-border bg-surface px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-accent"
                >
                  <option value="deadline">Deadline</option>
                  <option value="appointment">Appointment</option>
                  <option value="document_follow_up">Document Follow-up</option>
                  <option value="activation_code">Activation Code</option>
                  <option value="renewal">Renewal</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 border-t border-border/40 pt-4">
              <Button variant="tertiary" type="button" onClick={() => setShowForm(false)} className="text-xs">Cancel</Button>
              <Button type="submit" isLoading={isSubmitting} className="text-xs">Save Reminder</Button>
            </CardFooter>
          </form>
        </Card>
      )}

      {reminders.length === 0 && !showForm && (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-sm text-text-muted">No reminders yet. Create one to stay on track.</p>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-col space-y-4">
        {reminders.map((reminder) => (
          <Card key={reminder.id}>
            <CardContent className="pt-4 flex items-center justify-between">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${
                  reminder.status === "sent" ? "bg-success-soft"
                  : reminder.status === "cancelled" ? "bg-error-soft"
                  : "bg-accent-soft"
                }`}>
                  <Calendar className={`h-4 w-4 ${
                    reminder.status === "sent" ? "text-success"
                    : reminder.status === "cancelled" ? "text-error"
                    : "text-accent"
                  }`} />
                </div>
                <div className="flex flex-col space-y-0.5">
                  <span className="text-sm font-semibold text-text-primary">{reminder.title}</span>
                  <span className="text-xs text-text-secondary">
                    {new Date(reminder.reminderAt).toLocaleDateString("en-US", {
                      year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit",
                    })}
                  </span>
                  {reminder.workflow && (
                    <span className="text-[10px] text-accent font-semibold">{reminder.workflow.name}</span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={
                  reminder.status === "sent" ? "success"
                  : reminder.status === "cancelled" ? "error"
                  : reminder.status === "failed" ? "error"
                  : "warning"
                }>
                  {reminder.status === "scheduled" ? "Scheduled"
                    : reminder.status === "sent" ? "Sent"
                    : reminder.status === "cancelled" ? "Cancelled"
                    : reminder.status}
                </Badge>
                {reminder.status === "scheduled" && (
                  <button
                    onClick={() => handleDelete(reminder.id)}
                    className="p-1.5 hover:bg-surface-soft rounded-md text-text-muted hover:text-error transition-colors"
                    aria-label="Cancel reminder"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
