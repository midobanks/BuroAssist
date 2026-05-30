import * as React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { MailOpen } from "lucide-react";

export default function VerifyRequestPage() {
  return (
    <div className="flex-1 bg-background min-h-full flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-[420px] flex flex-col space-y-6">
        <div className="flex justify-center pb-2">
          <Logo href="/" size="md" />
        </div>
        
        <Card className="text-center">
          <CardHeader className="flex flex-col items-center">
            <div className="p-3 bg-accent-soft rounded-full mb-2">
              <MailOpen className="h-8 w-8 text-accent animate-pulse" />
            </div>
            <CardTitle className="text-xl">Check your email</CardTitle>
            <CardDescription className="text-xs pt-1 leading-relaxed">
              A secure sign-in link has been sent to your email address.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col space-y-4">
            <p className="text-xs text-text-secondary leading-relaxed">
              Click the link in your inbox to securely sign in. If you don&apos;t see it, check your spam or promotions folder.
            </p>
            <Link href="/sign-in" className="pt-2">
              <Button variant="secondary" className="w-full">
                Back to Sign In
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
