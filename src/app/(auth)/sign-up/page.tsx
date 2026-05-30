"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { DisclaimerBlock } from "@/components/ui/disclaimer-block";
import { Logo } from "@/components/ui/logo";
import { Eye, EyeOff } from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      if (!res.ok) {
        const body = await res.json();
        setError(body.error?.message || "Registration failed. Please try again.");
        return;
      }

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Account created but sign-in failed. Please try signing in.");
      } else {
        router.push("/onboarding");
        router.refresh();
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 bg-background min-h-full flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-[420px] flex flex-col space-y-6">
        <div className="flex justify-center pb-2">
          <Logo href="/" size="md" />
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Create Account</CardTitle>
            <CardDescription className="text-xs pt-1">
              Start personalizing your German relocation checklist and roadmap.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col space-y-5">
            {error && (
              <Alert variant="error" title="Registration failed">
                {error}
              </Alert>
            )}

            <form onSubmit={handleSignUp} className="flex flex-col space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col space-y-1">
                  <label className="text-xs font-bold text-text-primary uppercase" htmlFor="first-name">
                    First Name
                  </label>
                  <input
                    id="first-name"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Alex"
                    required
                    className="rounded-md border border-border bg-surface px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-accent"
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <label className="text-xs font-bold text-text-primary uppercase" htmlFor="last-name">
                    Last Name
                  </label>
                  <input
                    id="last-name"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Smith"
                    required
                    className="rounded-md border border-border bg-surface px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-accent"
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-xs font-bold text-text-primary uppercase" htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="rounded-md border border-border bg-surface px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-accent"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-xs font-bold text-text-primary uppercase" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    required
                    minLength={8}
                    className="w-full rounded-md border border-border bg-surface px-3 py-2 pr-10 text-sm focus-visible:outline-2 focus-visible:outline-accent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-text-muted hover:text-text-primary transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <p className="text-[10px] text-text-muted mt-0.5">Must be at least 8 characters</p>
              </div>

              <Button type="submit" isLoading={isLoading} className="w-full mt-2">
                Register Account
              </Button>
            </form>

            <p className="text-center text-xs text-text-secondary pt-2">
              Already have an account?{" "}
              <Link href="/sign-in" className="text-accent font-semibold hover:underline">
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>

        <DisclaimerBlock />
      </div>
    </div>
  );
}
