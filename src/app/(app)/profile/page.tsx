"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { User, Save } from "lucide-react";

export default function ProfilePage() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

  const [cityId, setCityId] = React.useState("");
  const [cityOptions, setCityOptions] = React.useState<{ id: string; name: string }[]>([]);
  const [nationalityGroup, setNationalityGroup] = React.useState("");
  const [currentStatus, setCurrentStatus] = React.useState("");
  const [arrivalDate, setArrivalDate] = React.useState("");
  const [moveInDate, setMoveInDate] = React.useState("");
  const [visaExpiryDate, setVisaExpiryDate] = React.useState("");
  const [isSaving, setIsSaving] = React.useState(false);

  React.useEffect(() => {
    Promise.all([
      fetch("/api/profile").then((r) => r.json()),
      fetch("/api/cities").then((r) => r.json()),
    ])
      .then(([profileRes, citiesRes]) => {
        const p = profileRes.data?.profile;
        if (p) {
          setCityId(p.cityId || "");
          setNationalityGroup(p.nationalityGroup || "");
          setCurrentStatus(p.currentStatus || "");
          setArrivalDate(p.arrivalDate ? p.arrivalDate.split("T")[0] : "");
          setMoveInDate(p.moveInDate ? p.moveInDate.split("T")[0] : "");
          setVisaExpiryDate(p.visaExpiryDate ? p.visaExpiryDate.split("T")[0] : "");
        }
        setCityOptions(citiesRes.data?.cities || []);
      })
      .catch(() => setError("Failed to load profile."))
      .finally(() => setIsLoading(false));
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cityId: cityId || null,
          nationalityGroup: nationalityGroup || null,
          currentStatus: currentStatus || null,
          arrivalDate: arrivalDate ? new Date(arrivalDate).toISOString() : null,
          moveInDate: moveInDate ? new Date(moveInDate).toISOString() : null,
          visaExpiryDate: visaExpiryDate ? new Date(visaExpiryDate).toISOString() : null,
        }),
      });

      const body = await res.json();
      if (!res.ok) {
        setError(body.error?.message || "Failed to save profile.");
        return;
      }
      setSuccess("Profile updated successfully.");
    } catch {
      setError("Something went wrong.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col space-y-6 max-w-content mx-auto">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-8 max-w-content mx-auto">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-text-primary flex items-center gap-2">
          <User className="h-6 w-6 text-accent" /> Profile
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          Manage your personalization settings for your roadmap.
        </p>
      </div>

      {error && <Alert variant="error" title="Error">{error}</Alert>}
      {success && <Alert variant="success" title="Saved">{success}</Alert>}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Personalization Details</CardTitle>
          <CardDescription className="text-xs">
            These details are used to generate your roadmap. Update them anytime and refresh your roadmap.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-5">
          <div className="flex flex-col space-y-1">
            <label className="text-xs font-bold text-text-primary uppercase" htmlFor="profile-city">
              City
            </label>
            <select
              id="profile-city"
              value={cityId}
              onChange={(e) => setCityId(e.target.value)}
              className="rounded-md border border-border bg-surface px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-accent"
            >
              <option value="">Select city...</option>
              {cityOptions.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col space-y-1">
            <label className="text-xs font-bold text-text-primary uppercase" htmlFor="profile-status">
              Status in Germany
            </label>
            <select
              id="profile-status"
              value={currentStatus}
              onChange={(e) => setCurrentStatus(e.target.value)}
              className="rounded-md border border-border bg-surface px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-accent"
            >
              <option value="">Select status...</option>
              <option value="employee">Employee</option>
              <option value="student">Student</option>
              <option value="skilled_worker">Skilled Worker / Blue Card</option>
              <option value="freelancer">Freelancer</option>
              <option value="job_seeker">Job Seeker</option>
            </select>
          </div>

          <div className="flex flex-col space-y-1">
            <label className="text-xs font-bold text-text-primary uppercase" htmlFor="profile-nationality">
              Nationality Group
            </label>
            <select
              id="profile-nationality"
              value={nationalityGroup}
              onChange={(e) => setNationalityGroup(e.target.value)}
              className="rounded-md border border-border bg-surface px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-accent"
            >
              <option value="">Select nationality group...</option>
              <option value="eu_eea">EU / EEA</option>
              <option value="non_eu">Non-EU</option>
              <option value="unknown">Other</option>
            </select>
          </div>

          <div className="flex flex-col space-y-1">
            <label className="text-xs font-bold text-text-primary uppercase" htmlFor="profile-arrival">
              Arrival Date
            </label>
            <input
              id="profile-arrival"
              type="date"
              value={arrivalDate}
              onChange={(e) => setArrivalDate(e.target.value)}
              className="rounded-md border border-border bg-surface px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-accent"
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label className="text-xs font-bold text-text-primary uppercase" htmlFor="profile-movein">
              Move-In Date
            </label>
            <input
              id="profile-movein"
              type="date"
              value={moveInDate}
              onChange={(e) => setMoveInDate(e.target.value)}
              className="rounded-md border border-border bg-surface px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-accent"
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label className="text-xs font-bold text-text-primary uppercase" htmlFor="profile-visa">
              Visa Expiry Date
            </label>
            <input
              id="profile-visa"
              type="date"
              value={visaExpiryDate}
              onChange={(e) => setVisaExpiryDate(e.target.value)}
              className="rounded-md border border-border bg-surface px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-accent"
            />
          </div>
        </CardContent>
        <CardFooter className="border-t border-border/40 pt-4 flex justify-end">
          <Button onClick={handleSave} isLoading={isSaving} className="flex items-center gap-1.5">
            <Save className="h-4 w-4" /> Save Changes
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
