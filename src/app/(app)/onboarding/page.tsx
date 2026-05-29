"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Alert } from "@/components/ui/alert";
import { DisclaimerBlock } from "@/components/ui/disclaimer-block";
import { CheckCircle2 } from "lucide-react";

interface WorkflowPreview {
  slug: string;
  name: string;
  order: number;
  reason: string;
  isUrgent: boolean;
  isApplicable: boolean;
  status: string;
}

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = React.useState(1);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState("");
  const [roadmap, setRoadmap] = React.useState<WorkflowPreview[]>([]);
  const totalSteps = 4;

  const [cityId, setCityId] = React.useState("");
  const [cityOptions, setCityOptions] = React.useState<{ id: string; name: string; slug: string }[]>([]);
  const [status, setStatus] = React.useState("");
  const [nationality, setNationality] = React.useState("");
  const [arrivalDate, setArrivalDate] = React.useState("");
  const [moveInDate, setMoveInDate] = React.useState("");
  const [visaExpiryDate, setVisaExpiryDate] = React.useState("");

  React.useEffect(() => {
    fetch("/api/workflows")
      .then((r) => r.json())
      .then((res) => {
        fetch("/api/cities")
          .then((r) => r.json())
          .then((cRes) => {
            if (cRes.data?.cities) setCityOptions(cRes.data.cities);
          })
          .catch(() => {});
      })
      .catch(() => {});
  }, []);

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleFinish = async () => {
    setError("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/onboarding/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cityId,
          nationalityGroup: nationality,
          currentStatus: status,
          arrivalDate: arrivalDate ? new Date(arrivalDate).toISOString() : null,
          moveInDate: moveInDate ? new Date(moveInDate).toISOString() : null,
          visaExpiryDate: visaExpiryDate ? new Date(visaExpiryDate).toISOString() : null,
        }),
      });

      const body = await res.json();

      if (!res.ok) {
        setError(body.error?.message || "Something went wrong. Please try again.");
        return;
      }

      setRoadmap(body.data?.roadmap?.workflows || []);
      setStep(totalSteps + 1);
    } catch {
      setError("Something went wrong. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const progressPercent = Math.round(((Math.min(step, totalSteps) - 1) / (totalSteps - 1)) * 100);

  if (step > totalSteps && roadmap.length > 0) {
    return (
      <div className="flex-1 bg-background min-h-full flex flex-col justify-center items-center py-12 px-4">
        <div className="w-full max-w-[500px] flex flex-col space-y-6">
          <div className="text-center">
            <span className="font-semibold text-accent text-lg">Büro<span className="font-normal text-text-secondary">Assist</span></span>
            <h1 className="text-xl font-bold text-text-primary mt-1">Your Roadmap is Ready</h1>
          </div>

          <Card>
            <CardContent className="pt-8 pb-6">
              <div className="text-center py-2 flex flex-col items-center">
                <CheckCircle2 className="h-12 w-12 text-success mb-3" />
                <h2 className="text-lg font-bold text-text-primary">Personalized sequence created!</h2>
                <p className="text-xs text-text-secondary mt-1">Based on your answers, here is your recommended order:</p>
              </div>

              <div className="flex flex-col space-y-2 mt-4 max-h-64 overflow-y-auto border border-border/60 rounded-lg p-3 bg-surface-soft/20">
                {roadmap.filter(r => r.isApplicable).map((flow) => (
                  <div key={flow.slug} className="flex items-center gap-2.5 text-xs text-text-primary font-semibold">
                    <div className="h-5 w-5 rounded-full bg-accent text-surface text-[10px] flex items-center justify-center font-bold shrink-0">
                      {flow.order}
                    </div>
                    <span>{flow.name}</span>
                    {flow.isUrgent && (
                      <span className="text-[9px] uppercase font-bold text-error bg-error-soft/60 px-1.5 py-0.5 rounded">Urgent</span>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-center">
                <Button onClick={() => router.push("/dashboard")} className="min-h-[38px] px-6 text-xs">
                  Go to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-background min-h-full flex flex-col justify-center items-center py-12 px-4">
      <div className="w-full max-w-[500px] flex flex-col space-y-6">
        <div className="text-center">
          <span className="font-semibold text-accent text-lg">Büro<span className="font-normal text-text-secondary">Assist</span></span>
          <h1 className="text-xl font-bold text-text-primary mt-1">Set Up Your Expat Profile</h1>
        </div>

        <Card className="shadow-soft">
          <CardHeader className="pb-4">
            <ProgressBar value={progressPercent} labelText={`Step ${step} of ${totalSteps}`} />
          </CardHeader>

          <CardContent className="min-h-[280px]">
            {error && (
              <div className="mb-4">
                <Alert variant="error" title="Onboarding failed">{error}</Alert>
              </div>
            )}

            {step === 1 && (
              <div className="flex flex-col space-y-4">
                <div>
                  <h2 className="text-base font-bold text-text-primary">Where are you relocating in Germany?</h2>
                  <p className="text-xs text-text-secondary mt-0.5">We personalize local address and authority guidelines.</p>
                </div>
                <div className="flex flex-col space-y-3 pt-2">
                  {[
                    { name: "Berlin (MVP Launch)", slug: "berlin" },
                    { name: "Munich", slug: "munich" },
                    { name: "Hamburg", slug: "hamburg" },
                    { name: "Hannover", slug: "hannover" },
                    { name: "Cologne", slug: "cologne" },
                    { name: "Frankfurt", slug: "frankfurt" },
                  ].map((c) => {
                    const city = cityOptions.find((co) => co.slug === c.slug);
                    return (
                      <label
                        key={c.slug}
                        className={`flex items-center justify-between px-4 py-3 rounded-lg border text-sm font-semibold cursor-pointer transition-all ${
                          cityId === (city?.id || c.slug)
                            ? "border-accent bg-accent-soft/20 text-accent"
                            : "border-border hover:bg-surface-soft text-text-secondary hover:text-text-primary"
                        }`}
                      >
                        <span>{c.name}</span>
                        <input
                          type="radio"
                          name="city"
                          value={city?.id || c.slug}
                          checked={cityId === (city?.id || c.slug)}
                          onChange={() => setCityId(city?.id || c.slug)}
                          className="accent-accent"
                        />
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col space-y-4">
                <div>
                  <h2 className="text-base font-bold text-text-primary">What is your status and nationality?</h2>
                  <p className="text-xs text-text-secondary mt-0.5">Helps us filter health insurance and visa rules.</p>
                </div>

                <div className="flex flex-col space-y-4 pt-2">
                  <div className="flex flex-col space-y-1">
                    <label className="text-xs font-bold text-text-primary uppercase" htmlFor="status">
                      Status in Germany
                    </label>
                    <select
                      id="status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="rounded-md border border-border bg-surface px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-accent font-medium text-text-primary"
                    >
                      <option value="">Select your status...</option>
                      <option value="employee">Employee / Working Professional</option>
                      <option value="student">Student (University / Language School)</option>
                      <option value="skilled_worker">Skilled Worker / Blue Card Candidate</option>
                      <option value="freelancer">Freelancer / Self-Employed</option>
                      <option value="job_seeker">Job Seeker</option>
                    </select>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-xs font-bold text-text-primary uppercase" htmlFor="nationality">
                      Nationality Group
                    </label>
                    <select
                      id="nationality"
                      value={nationality}
                      onChange={(e) => setNationality(e.target.value)}
                      className="rounded-md border border-border bg-surface px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-accent font-medium text-text-primary"
                    >
                      <option value="">Select nationality group...</option>
                      <option value="non_eu">Non-EU Citizen (requires entry visa / permit)</option>
                      <option value="eu_eea">EU / EEA Citizen (freedom of movement)</option>
                      <option value="unknown">Other / I do not wish to specify</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="flex flex-col space-y-4">
                <div>
                  <h2 className="text-base font-bold text-text-primary">Specify your key dates</h2>
                  <p className="text-xs text-text-secondary mt-0.5">Used to generate deadlines and schedule email reminders.</p>
                </div>

                <div className="flex flex-col space-y-4 pt-2">
                  <div className="flex flex-col space-y-1">
                    <label className="text-xs font-bold text-text-primary uppercase" htmlFor="arrival">
                      Arrival Date in Germany
                    </label>
                    <input
                      id="arrival"
                      type="date"
                      value={arrivalDate}
                      onChange={(e) => setArrivalDate(e.target.value)}
                      className="rounded-md border border-border bg-surface px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-accent font-medium text-text-primary"
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-xs font-bold text-text-primary uppercase" htmlFor="movein">
                      Move-In Date (Flat/Room)
                    </label>
                    <input
                      id="movein"
                      type="date"
                      value={moveInDate}
                      onChange={(e) => setMoveInDate(e.target.value)}
                      className="rounded-md border border-border bg-surface px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-accent font-medium text-text-primary"
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-xs font-bold text-text-primary uppercase" htmlFor="visa">
                      Entry Visa Expiry Date
                    </label>
                    <input
                      id="visa"
                      type="date"
                      value={visaExpiryDate}
                      onChange={(e) => setVisaExpiryDate(e.target.value)}
                      className="rounded-md border border-border bg-surface px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-accent font-medium text-text-primary"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="flex flex-col space-y-4">
                <div>
                  <h2 className="text-base font-bold text-text-primary">Review your information</h2>
                  <p className="text-xs text-text-secondary mt-0.5">We will generate your personalized roadmap based on these details.</p>
                </div>

                <div className="border border-border/60 rounded-lg p-4 space-y-3 bg-surface-soft/20">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">City:</span>
                    <span className="font-semibold text-text-primary">{cityOptions.find(c => c.id === cityId)?.name || "Selected"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Status:</span>
                    <span className="font-semibold text-text-primary capitalize">{status.replace("_", " ")}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Nationality:</span>
                    <span className="font-semibold text-text-primary capitalize">{nationality.replace("_", " ")}</span>
                  </div>
                  {arrivalDate && (
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">Arrival:</span>
                      <span className="font-semibold text-text-primary">{new Date(arrivalDate).toLocaleDateString()}</span>
                    </div>
                  )}
                  {moveInDate && (
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">Move-in:</span>
                      <span className="font-semibold text-text-primary">{new Date(moveInDate).toLocaleDateString()}</span>
                    </div>
                  )}
                  {visaExpiryDate && (
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">Visa expiry:</span>
                      <span className="font-semibold text-text-primary">{new Date(visaExpiryDate).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-between border-t border-border/40 pt-4">
            <Button
              variant="tertiary"
              onClick={handleBack}
              disabled={step === 1}
              className="min-h-[38px] px-4 py-1.5 text-xs"
            >
              Back
            </Button>

            {step === totalSteps ? (
              <Button
                onClick={handleFinish}
                isLoading={isSubmitting}
                disabled={!cityId || !status || !nationality}
                className="min-h-[38px] px-5 py-1.5 text-xs"
              >
                Generate Roadmap
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={
                  (step === 1 && !cityId) ||
                  (step === 2 && (!status || !nationality))
                }
                className="min-h-[38px] px-5 py-1.5 text-xs"
              >
                Next
              </Button>
            )}
          </CardFooter>
        </Card>

        <DisclaimerBlock />
      </div>
    </div>
  );
}
