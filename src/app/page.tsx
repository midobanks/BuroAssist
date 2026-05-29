import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DisclaimerBlock } from "@/components/ui/disclaimer-block";
import { Badge } from "@/components/ui/badge";
import { Smartphone, Landmark, HeartHandshake, House, Shield, FileText, CheckCircle, Clock, Bell, Sparkles, ArrowRight, User, MapPin, Route, ListChecks, Calendar } from "lucide-react";

function FlowArrow() {
  return (
    <svg className="w-8 h-8 text-accent/30 shrink-0 hidden md:block" viewBox="0 0 32 32" fill="none">
      <path d="M4 16h20M18 10l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function HeroIllustration() {
  return (
    <svg viewBox="0 0 400 320" className="w-full max-w-md mx-auto" fill="none">
      {/* Background shape */}
      <circle cx="200" cy="160" r="140" fill="var(--color-accent-soft)" opacity="0.3"/>
      <circle cx="200" cy="160" r="100" fill="var(--color-accent-soft)" opacity="0.2"/>

      {/* Document icon */}
      <rect x="145" y="80" width="110" height="140" rx="8" fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth="2"/>
      <rect x="160" y="100" width="80" height="6" rx="3" fill="var(--color-accent)" opacity="0.6"/>
      <rect x="160" y="114" width="60" height="4" rx="2" fill="var(--color-border)"/>
      <rect x="160" y="126" width="70" height="4" rx="2" fill="var(--color-border)"/>
      <rect x="160" y="138" width="50" height="4" rx="2" fill="var(--color-border)"/>
      <rect x="160" y="155" width="65" height="4" rx="2" fill="var(--color-border)"/>
      <rect x="160" y="167" width="55" height="4" rx="2" fill="var(--color-border)"/>
      <rect x="160" y="184" width="60" height="4" rx="2" fill="var(--color-border)"/>
      <circle cx="185" cy="215" r="12" fill="var(--color-success)" opacity="0.15"/>
      <path d="M179 215l4 4 8-8" stroke="var(--color-success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>

      {/* Stamp */}
      <rect x="205" y="102" width="36" height="36" rx="18" stroke="var(--color-accent)" strokeWidth="1.5" opacity="0.4" strokeDasharray="3 2"/>
      <text x="223" y="125" textAnchor="middle" fill="var(--color-accent)" fontSize="8" fontWeight="bold" opacity="0.4">OK</text>

      {/* Arrow pointing right from document */}
      <path d="M260 160h30" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>

      {/* Phone/Checkmark icon */}
      <rect x="290" y="95" width="60" height="110" rx="8" fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth="2"/>
      <rect x="298" y="102" width="44" height="60" rx="4" fill="var(--color-accent-soft)" opacity="0.5"/>
      <circle cx="320" cy="180" r="8" fill="var(--color-border)" opacity="0.4"/>
      <rect x="310" y="170" width="20" height="4" rx="2" fill="var(--color-accent)" opacity="0.3"/>

      {/* Floating sparkles */}
      <path d="M120 70l4-8 4 8" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4"/>
      <path d="M280 70l3-6 3 6" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.3"/>
      <path d="M200 40l2-4 2 4" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.25"/>

      {/* Calendar dots */}
      <rect x="160" y="145" width="6" height="6" rx="1" fill="var(--color-accent)" opacity="0.3"/>
      <rect x="172" y="145" width="6" height="6" rx="1" fill="var(--color-warning)" opacity="0.3"/>
      <rect x="184" y="145" width="6" height="6" rx="1" fill="var(--color-success)" opacity="0.3"/>
    </svg>
  );
}

function HowItWorksStep({ number, title, description, icon }: { number: number; title: string; description: string; icon: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center text-center relative">
      {/* Step number circle */}
      <div className="relative mb-5">
        <div className="h-14 w-14 rounded-full bg-accent text-surface flex items-center justify-center text-lg font-bold shadow-md relative z-10">
          {icon}
        </div>
        {/* Pulse ring */}
        <div className="absolute inset-0 rounded-full bg-accent/20 animate-ping" style={{ animationDuration: "3s" }} />
      </div>

      {/* Connector line (desktop) */}
      {number < 3 && (
        <div className="hidden md:block absolute top-7 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-accent/40 to-accent/10" />
      )}

      <h3 className="text-lg font-bold text-text-primary mb-2">{title}</h3>
      <p className="text-sm text-text-secondary leading-relaxed max-w-[260px]">{description}</p>
    </div>
  );
}

function WorkflowJourneyIllustration() {
  return (
    <div className="relative py-8">
      {/* Background track */}
      <svg className="w-full h-24" viewBox="0 0 800 96" preserveAspectRatio="none" fill="none">
        <path d="M0 48 Q200 0 400 48 Q600 96 800 48" stroke="var(--color-accent-soft)" strokeWidth="2" opacity="0.4"/>
      </svg>
      {/* Abstract nodes */}
      <div className="absolute inset-0 flex items-center justify-around px-4">
        {[
          { label: "SIM", color: "var(--color-accent)" },
          { label: "Bank", color: "var(--color-success)" },
          { label: "Insurance", color: "var(--color-warning)" },
          { label: "Anmeldung", color: "var(--color-accent)" },
          { label: "Permit", color: "var(--color-error)" },
          { label: "Tax", color: "var(--color-info)" },
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center gap-1.5">
            <div className="h-4 w-4 rounded-full border-2 border-accent/40 bg-surface" style={{ borderColor: item.color }} />
            <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BenefitCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex gap-4 p-5 rounded-xl bg-surface border border-border/60 hover:border-accent/20 hover:shadow-soft transition-all duration-200">
      <div className="h-10 w-10 rounded-lg bg-accent-soft/50 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="flex flex-col space-y-1">
        <h3 className="font-semibold text-text-primary text-sm">{title}</h3>
        <p className="text-xs text-text-secondary leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

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

  const howItWorks = [
    {
      number: 1,
      title: "Tell us about yourself",
      description: "Answer a few quick questions: your city, status, nationality, and key dates. It takes less than 2 minutes.",
      icon: <User className="h-6 w-6" />,
    },
    {
      number: 2,
      title: "Get your personal roadmap",
      description: "We generate a step-by-step plan sequenced just for you — showing what to do, when, and why it matters.",
      icon: <Route className="h-6 w-6" />,
    },
    {
      number: 3,
      title: "Track progress & stay on time",
      description: "Check off tasks, save notes, and receive reminders so you never miss a critical deadline or appointment.",
      icon: <Bell className="h-6 w-6" />,
    },
  ];

  const benefits = [
    {
      icon: <Sparkles className="h-5 w-5 text-accent" />,
      title: "Personalized for your situation",
      description: "Your roadmap adapts to your nationality, visa type, city, and employment status — not generic advice.",
    },
    {
      icon: <ListChecks className="h-5 w-5 text-accent" />,
      title: "Checklists that track your progress",
      description: "Every workflow has a detailed checklist. Mark items done, add notes, and watch your progress grow.",
    },
    {
      icon: <Calendar className="h-5 w-5 text-accent" />,
      title: "Deadline reminders you can trust",
      description: "Set reminders for appointments, visa renewals, and activation codes. Gentle email nudges keep you on track.",
    },
    {
      icon: <MapPin className="h-5 w-5 text-accent" />,
      title: "City-specific guidance",
      description: "Official links, office addresses, and tips tailored to your city — Berlin, Munich, Hamburg, and more.",
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-accent" />,
      title: "Source-backed confidence",
      description: "Every guide links to official sources. You'll know exactly where to verify and what to expect.",
    },
    {
      icon: <Shield className="h-5 w-5 text-accent" />,
      title: "No sensitive data stored",
      description: "We never store passport numbers, Tax IDs, bank credentials, or insurance policy details.",
    },
  ];

  return (
    <div className="flex-1 bg-background min-h-full flex flex-col justify-between">
      {/* Header */}
      <header className="border-b border-border bg-surface/80 backdrop-blur-md sticky top-0 z-50">
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
      <main className="flex-1 max-w-content mx-auto px-4 py-12 md:py-20 flex flex-col space-y-24 md:space-y-32">
        {/* ── HERO ── */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="flex flex-col space-y-6 order-2 md:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-soft/60 border border-accent/10 text-xs font-semibold text-accent w-fit">
              <Sparkles className="h-3.5 w-3.5" />
              Your personalized relocation companion
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary leading-[1.08]">
              Your calm guide through{" "}
              <span className="text-accent relative">
                German bureaucracy
                <svg className="absolute -bottom-1 left-0 w-full h-3" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none">
                  <path d="M2 10 Q50 0 100 10 Q150 20 198 10" stroke="var(--color-accent-soft)" strokeWidth="3" strokeLinecap="round" opacity="0.6"/>
                </svg>
              </span>
            </h1>
            <p className="text-base md:text-lg text-text-secondary leading-relaxed max-w-[480px]">
              Stop Googling &mdash; start doing. BüroAssist gives you a personalized, step-by-step plan for Anmeldung, banking, insurance, SIM, residence permit, and taxes. Built for expats, by people who&apos;ve been there.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link href="/sign-in?callbackUrl=/onboarding">
                <Button className="w-full sm:w-auto text-base py-3 px-8 shadow-md hover:shadow-lg transition-shadow">
                  Create Your Roadmap
                </Button>
              </Link>
              <Link href="/workflows">
                <Button variant="secondary" className="w-full sm:w-auto text-base py-3 px-8">
                  Browse Workflows
                </Button>
              </Link>
            </div>
            {/* Trust indicator */}
            <div className="flex items-center gap-3 pt-2 text-xs text-text-muted">
              <div className="flex -space-x-1.5">
                {["#B46A3C", "#4F7A5A", "#536F8C", "#A56A28"].map((color, i) => (
                  <div key={i} className="h-6 w-6 rounded-full border-2 border-surface" style={{ backgroundColor: color }} />
                ))}
              </div>
              <span>Trusted by expats settling in Germany</span>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <HeroIllustration />
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="flex flex-col items-center text-center space-y-12 md:space-y-16">
          <div className="flex flex-col items-center space-y-3 max-w-xl">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-accent">How it works</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary">
              Three steps to settle in with confidence
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed max-w-md">
              No clutter, no confusion. Just a clear path from arrival to settled.
            </p>
          </div>

          {/* Connected steps visually */}
          <div className="hidden md:flex items-center justify-center gap-6 w-full max-w-5xl">
            {howItWorks.map((step) => (
              <div key={step.number} className="w-[320px] flex flex-col items-center relative">
                {/* Card */}
                <div className="w-full h-[280px] bg-surface rounded-2xl border border-border/60 p-6 shadow-soft hover:shadow-md transition-shadow group flex flex-col">
                  <div className="flex flex-col items-center space-y-4 flex-1">
                    <div className="h-14 w-14 rounded-full bg-accent text-surface flex items-center justify-center text-lg font-bold shadow-md group-hover:scale-105 transition-transform shrink-0">
                      {step.icon}
                    </div>
                    <div className="relative">
                      <span className="text-[10px] font-bold tracking-wider text-accent uppercase">Step {step.number}</span>
                    </div>
                    <h3 className="font-bold text-text-primary text-lg text-center">{step.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed text-center">{step.description}</p>
                  </div>
                </div>
                {/* Connector arrow */}
                {step.number < 3 && (
                  <div className="absolute top-1/2 -translate-y-1/2 -right-[18px] z-10">
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                      <circle cx="18" cy="18" r="17" fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth="1"/>
                      <path d="M14 12l6 6-6 6" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile version (vertical) */}
          <div className="md:hidden flex flex-col space-y-8 w-full max-w-sm">
            {howItWorks.map((step, i) => (
              <div key={step.number} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <div className="h-12 w-12 rounded-full bg-accent text-surface flex items-center justify-center font-bold shadow-md shrink-0">
                    {step.icon}
                  </div>
                  {i < howItWorks.length - 1 && (
                    <div className="w-0.5 flex-1 bg-gradient-to-b from-accent/30 to-accent/5 mt-2" />
                  )}
                </div>
                <div className="flex flex-col space-y-1 pt-1.5">
                  <span className="text-[10px] font-bold tracking-wider text-accent uppercase">Step {step.number}</span>
                  <h3 className="font-bold text-text-primary">{step.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── WORKFLOW JOURNEY ── */}
        <section className="flex flex-col space-y-8">
          <div className="flex flex-col space-y-2 text-center md:text-left">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-accent">The Journey</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary">
              Six workflows, one seamless journey
            </h2>
            <p className="text-sm text-text-secondary max-w-xl">
              Each workflow depends on the next. We sequence them so you never do things out of order.
            </p>
          </div>

          <WorkflowJourneyIllustration />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {mvpWorkflows.map((flow, i) => (
              <Card key={flow.title} hoverable className="flex flex-col justify-between h-full group border-border/60 hover:border-accent/20 transition-all">
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-accent-soft/40 group-hover:bg-accent-soft/60 transition-colors">
                      {flow.icon}
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold tracking-wider text-accent uppercase">{flow.tag}</span>
                      <CardTitle className="text-sm font-bold pt-0.5">{flow.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardDescription className="px-6 pb-5 text-xs leading-relaxed">
                  {flow.description}
                </CardDescription>
              </Card>
            ))}
          </div>
        </section>

        {/* ── BENEFITS ── */}
        <section className="bg-surface border border-border/60 rounded-3xl p-8 md:p-14 shadow-soft">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="flex flex-col space-y-4">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-accent">Why BüroAssist</span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary leading-tight">
                Built differently. Built for <span className="text-accent">clarity</span>.
              </h2>
              <p className="text-sm text-text-secondary leading-relaxed">
                Bureaucracy is hard enough without bad UX. Every feature in BüroAssist was designed to reduce anxiety, not add to it.
              </p>
            </div>

            {/* Abstract illustration */}
            <svg viewBox="0 0 280 200" className="w-full max-w-sm mx-auto" fill="none">
              {/* Layered cards illustration */}
              <rect x="40" y="30" width="200" height="140" rx="12" fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth="1.5"/>
              <rect x="55" y="45" width="170" height="18" rx="4" fill="var(--color-accent-soft)" opacity="0.5"/>
              <rect x="55" y="70" width="140" height="8" rx="3" fill="var(--color-border)" opacity="0.5"/>
              <rect x="55" y="85" width="120" height="8" rx="3" fill="var(--color-border)" opacity="0.4"/>
              <rect x="55" y="100" width="150" height="8" rx="3" fill="var(--color-border)" opacity="0.5"/>
              <rect x="55" y="120" width="60" height="24" rx="6" fill="var(--color-accent)" opacity="0.15"/>
              <rect x="57" y="127" width="10" height="10" rx="3" fill="var(--color-success)"/>
              <text x="75" y="136" fill="var(--color-text-primary)" fontSize="8" fontWeight="600">Complete</text>
              <rect x="125" y="120" width="60" height="24" rx="6" fill="var(--color-warning-soft)" opacity="0.5"/>
              <text x="135" y="136" fill="var(--color-warning)" fontSize="8" fontWeight="600">In progress</text>
              {/* Checkmark */}
              <circle cx="220" cy="50" r="18" fill="var(--color-success-soft)" opacity="0.3"/>
              <path d="M213 50l5 5 10-10" stroke="var(--color-success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              {/* Source badge */}
              <rect x="55" y="152" width="80" height="10" rx="4" fill="var(--color-info-soft)" opacity="0.3"/>
              <text x="60" y="160" fill="var(--color-info)" fontSize="7" fontWeight="600">Official sources ✓</text>
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
            {benefits.map((benefit) => (
              <BenefitCard key={benefit.title} {...benefit} />
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="relative overflow-hidden rounded-3xl bg-accent p-8 md:p-16 text-center">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-[0.04]">
            <svg className="w-full h-full" viewBox="0 0 400 200" fill="none">
              <circle cx="50" cy="50" r="60" stroke="currentColor" strokeWidth="1"/>
              <circle cx="350" cy="150" r="80" stroke="currentColor" strokeWidth="1"/>
              <circle cx="200" cy="100" r="40" stroke="currentColor" strokeWidth="1"/>
            </svg>
          </div>
          <div className="relative z-10 flex flex-col items-center space-y-6 max-w-xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-surface tracking-tight">
              Ready to settle in with less stress?
            </h2>
            <p className="text-base text-accent-soft/80 leading-relaxed max-w-md">
              Join expats who&apos;ve turned bureaucracy chaos into a calm, checkable plan.
            </p>
            <Link href="/sign-up">
              <Button className="bg-text-primary text-surface hover:bg-text-primary/90 text-base py-3 px-10 shadow-xl border-2 border-white/20 hover:border-white/40 transition-all">
                Get Started Free
              </Button>
            </Link>
            <p className="text-xs text-accent-soft/60">No credit card required. Takes 2 minutes.</p>
          </div>
        </section>

        {/* Reassurance Disclaimer */}
        <section className="pt-4">
          <DisclaimerBlock />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-surface-soft/40 py-10">
        <div className="max-w-content mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <span>&copy; {new Date().getFullYear()} BüroAssist. Made with care for expats.</span>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-text-secondary transition-colors">About</Link>
            <Link href="/privacy" className="hover:text-text-secondary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-text-secondary transition-colors">Terms &amp; Conditions</Link>
            <Link href="/disclaimer" className="hover:text-text-secondary transition-colors">Disclaimer</Link>
            <Link href="/glossary" className="hover:text-text-secondary transition-colors">German Glossary</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
