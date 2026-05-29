"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { MessageSquare, Star, ShieldCheck } from "lucide-react";

export default function FeedbackPage() {
  const [feedbackType, setFeedbackType] = React.useState("product_feedback");
  const [message, setMessage] = React.useState("");
  const [rating, setRating] = React.useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message) return;

    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          feedbackType,
          message,
          rating: rating || null,
        }),
      });

      const body = await res.json();
      if (!res.ok) {
        setError(body.error?.message || "Failed to submit feedback.");
        return;
      }

      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setMessage("");
        setRating(null);
      }, 3000);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col space-y-6 max-w-narrow mx-auto">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-text-primary flex items-center gap-2">
          <MessageSquare className="h-6 w-6 text-accent" /> Share Feedback
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          Tell us about content errors, missing details, or feature ideas.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Submit Feedback Report</CardTitle>
          <CardDescription className="text-xs">
            We review expat feedback regularly to keep guides accurate.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && <Alert variant="error" title="Error">{error}</Alert>}

          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-1">
              <label className="text-xs font-bold text-text-primary uppercase" htmlFor="feed-type">
                Feedback Category
              </label>
              <select
                id="feed-type"
                value={feedbackType}
                onChange={(e) => setFeedbackType(e.target.value)}
                className="rounded-md border border-border bg-surface px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-accent font-medium text-text-primary"
              >
                <option value="content_error">Content Error / Outdated Info</option>
                <option value="missing_information">Missing Important Information</option>
                <option value="confusing_step">Confusing Step / Process Guide</option>
                <option value="product_feedback">General Product Feedback</option>
                <option value="feature_request">New Feature Request</option>
              </select>
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-xs font-bold text-text-primary uppercase">
                Rate your experience
              </label>
              <div className="flex items-center gap-2 pt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 hover:scale-110 transition-transform"
                    aria-label={`Rate ${star} stars`}
                  >
                    <Star
                      className={`h-6 w-6 ${
                        rating && rating >= star
                          ? "fill-warning text-warning"
                          : "text-text-muted hover:text-warning"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-xs font-bold text-text-primary uppercase" htmlFor="feed-msg">
                Your Message
              </label>
              <textarea
                id="feed-msg"
                placeholder="What can we improve? Please be as detailed as possible..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full text-sm bg-surface border border-border/80 rounded-md p-3 focus-visible:outline-2 focus-visible:outline-accent font-medium text-text-primary"
                required
              />
            </div>

            <div className="flex items-center gap-4 pt-2">
              <Button type="submit" isLoading={isSubmitting} className="text-xs min-h-[38px] py-1.5 px-6">
                Submit Feedback
              </Button>

              {isSubmitted && (
                <span className="flex items-center gap-1 text-xs text-success font-medium">
                  <ShieldCheck className="h-4 w-4" /> Thank you! Your feedback has been submitted.
                </span>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
