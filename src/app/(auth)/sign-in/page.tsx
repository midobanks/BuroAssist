"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { DisclaimerBlock } from "@/components/ui/disclaimer-block";
import { Logo } from "@/components/ui/logo";
import { Eye, EyeOff } from "lucide-react";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isMagicLinkLoading, setIsMagicLinkLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleCredentialsSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password. Please try again.");
      } else if (result?.ok) {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleMagicLink = async () => {
    if (!email) {
      setError("Please enter your email address first.");
      return;
    }
    setError("");
    setIsMagicLinkLoading(true);

    try {
      await signIn("resend", { email, callbackUrl, redirect: false });
      router.push("/verify-request");
    } catch {
      setError("Failed to send magic link. Please try again.");
    } finally {
      setIsMagicLinkLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Sign In</CardTitle>
        <CardDescription className="text-xs pt-1">
          Sign in to manage your German bureaucracy roadmap and check off tasks.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col space-y-5">
        {error && (
          <Alert variant="error" title="Sign in failed">
            {error}
          </Alert>
        )}

        <form onSubmit={handleCredentialsSignIn} className="flex flex-col space-y-4">
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
                    placeholder="Must be at least 8 characters"
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
            Sign In with Password
          </Button>
        </form>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-border/80" />
          <span className="flex-shrink mx-4 text-text-muted text-[10px] uppercase font-bold tracking-wider">
            Or use magic link
          </span>
          <div className="flex-grow border-t border-border/80" />
        </div>

        <Button
          variant="secondary"
          onClick={handleMagicLink}
          isLoading={isMagicLinkLoading}
          className="w-full"
        >
          Send Magic Link
        </Button>

        <p className="text-center text-xs text-text-secondary pt-2">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="text-accent font-semibold hover:underline">
            Create one
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}

export default function SignInPage() {
  return (
    <div className="flex-1 bg-background min-h-full flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-[420px] flex flex-col space-y-6">
        <div className="flex justify-center pb-2">
          <Logo href="/" size="md" />
        </div>

        <React.Suspense fallback={<div className="text-center text-sm text-text-muted py-8">Loading...</div>}>
          <SignInForm />
        </React.Suspense>

        <DisclaimerBlock />
      </div>
    </div>
  );
}
