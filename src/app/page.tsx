import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DisclaimerBlock } from "@/components/ui/disclaimer-block";
import { Badge } from "@/components/ui/badge";
import { Smartphone, Landmark, HeartHandshake, House, Shield, FileText } from "lucide-react";

export default function LandingPage() {
  const mvpWorkflows = [
    {
      title: "Mobile SIM Card",
      description: "Get a local German phone number essential for banking, registrations, and general verifications.",
      icon: <Smartphone className="h-6 w-6 text-accent" />,
      tag: "Step 1",
    },
    {
      title: "Banking Setup",
      description: "Open a SEPA bank account to receive salary, pay rent, and set up monthly utility contracts.",
      icon: <Landmark className="h-6 w-6 text-accent" />,
      tag: "Step 2",
    },
    {
      title: "Health Insurance",
      description: "Mandatory German health insurance onboarding. Required for employment and visa applications.",
      icon: <HeartHandshake className="h-6 w-6 text-accent" />,
      tag: "Step 3",
    },
    {
      title: "Anmeldung (Registration)",
      description: "Register your local German address at the Bürgeramt. Mandatory within 14 days of moving in.",
      icon: <House className="h-6 w-6 text-accent" />,
      tag: "Step 4",
    },
    {
      title: "Residence Permit",
      description: "Apply for your residence permit or Blue Card before your entry visa expires. Long queues, book early.",
      icon: <Shield className="h-6 w-6 text-accent" />,
      tag: "Step 5",
    },
    {
      title: "Tax ID & ELSTER",
      description: "Register with the tax office to avoid default high tax brackets and set up your ELSTER account.",
      icon: <FileText className="h-6 w-6 text-accent" />,
      tag: "Step 6",
    },
  ];

  return (
    <div className="flex-1 bg-background min-h-full flex flex-col justify-between">
      {/* Header */}
      <header className="border-b border-border bg-surface sticky top-0 z-50">
        <div className="max-w-content mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-semibold text-text-primary text-lg flex items-center gap-1.5">
            <span className="text-accent text-xl">Büro</span>
            <span className="font-normal text-text-secondary">Assist</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/sign-in">
              <Button variant="tertiary" className="min-h-[38px] px-4 py-1.5 text-xs">
                Sign In
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button variant="secondary" className="min-h-[38px] px-4 py-1.5 text-xs">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-content mx-auto px-4 py-12 md:py-20 flex flex-col space-y-16">
        {/* Hero Section */}
        <section className="flex flex-col space-y-6 max-w-narrow text-center md:text-left md:mr-auto">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-text-primary leading-tight">
            Your calm guide through <span className="text-accent underline decoration-accent-soft underline-offset-4">German bureaucracy</span>
          </h1>
          <p className="text-base md:text-lg text-text-secondary leading-relaxed font-medium">
            BüroAssist helps internationals navigate their relocation to Germany. Generate a custom step-by-step roadmap, track document checklists, set reminders, and access source-backed guides.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link href="/sign-in?callbackUrl=/onboarding">
              <Button className="w-full sm:w-auto text-base py-3">
                Create Your Personalized Roadmap
              </Button>
            </Link>
            <Link href="/workflows">
              <Button variant="secondary" className="w-full sm:w-auto text-base py-3">
                Explore Workflows Publicly
              </Button>
            </Link>
          </div>
        </section>

        {/* Core Workflows Section */}
        <section className="flex flex-col space-y-8">
          <div className="flex flex-col space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-text-primary">
              Supported MVP Workflows
            </h2>
            <p className="text-sm text-text-secondary max-w-narrow">
              We cover the six foundational tasks every expat needs to handle to settle down smoothly in Germany.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mvpWorkflows.map((flow) => (
              <Card key={flow.title} hoverable className="flex flex-col justify-between h-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="p-2 bg-accent-soft rounded-lg">{flow.icon}</div>
                  <Badge variant="neutral">{flow.tag}</Badge>
                </CardHeader>
                <div className="mt-4 flex-1">
                  <CardTitle className="text-base font-bold pb-1">{flow.title}</CardTitle>
                  <CardDescription className="text-xs leading-relaxed">
                    {flow.description}
                  </CardDescription>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="bg-surface border border-border rounded-2xl p-8 md:p-12 flex flex-col space-y-8 shadow-soft">
          <h2 className="text-2xl font-bold text-text-primary tracking-tight">
            How BüroAssist Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col space-y-3">
              <div className="h-8 w-8 rounded-full bg-accent text-surface font-bold text-sm flex items-center justify-center">
                1
              </div>
              <h3 className="font-semibold text-text-primary">Personalize Your Profile</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Tell us your arrival date, city, employment or student status, and nationality group.
              </p>
            </div>
            <div className="flex flex-col space-y-3">
              <div className="h-8 w-8 rounded-full bg-accent text-surface font-bold text-sm flex items-center justify-center">
                2
              </div>
              <h3 className="font-semibold text-text-primary">Follow Your Roadmap</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Get a custom-sequenced checklist that respects dependencies (e.g. why a SIM card comes before bank accounts).
              </p>
            </div>
            <div className="flex flex-col space-y-3">
              <div className="h-8 w-8 rounded-full bg-accent text-surface font-bold text-sm flex items-center justify-center">
                3
              </div>
              <h3 className="font-semibold text-text-primary">Track & Set Reminders</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Check off documents, save custom notes, and receive gentle email nudges before critical deadlines or appointments.
              </p>
            </div>
          </div>
        </section>

        {/* Reassurance Disclaimer */}
        <section className="pt-4">
          <DisclaimerBlock />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-surface-soft/40 py-8">
        <div className="max-w-content mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <span>&copy; {new Date().getFullYear()} BüroAssist. Made with care for expats.</span>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-text-secondary">About</Link>
            <Link href="/privacy" className="hover:text-text-secondary">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-text-secondary">Terms & Conditions</Link>
            <Link href="/disclaimer" className="hover:text-text-secondary">Disclaimer</Link>
            <Link href="/glossary" className="hover:text-text-secondary">German Glossary</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
