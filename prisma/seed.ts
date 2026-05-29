import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const { Pool } = pg;
const connectionString = process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/buroassist";
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding BüroAssist database...");

  // ──────────────────────────────────────────────
  // 1. CITIES
  // ──────────────────────────────────────────────
  const cities = await Promise.all(
    [
      { name: "Berlin", slug: "berlin", federalState: "Berlin" },
      { name: "Hannover", slug: "hannover", federalState: "Lower Saxony" },
      { name: "Munich", slug: "munich", federalState: "Bavaria" },
      { name: "Hamburg", slug: "hamburg", federalState: "Hamburg" },
      { name: "Cologne", slug: "cologne", federalState: "North Rhine-Westphalia" },
      { name: "Frankfurt", slug: "frankfurt", federalState: "Hesse" },
    ].map((c) =>
      prisma.city.upsert({
        where: { slug: c.slug },
        update: {},
        create: { ...c, isMvpCity: c.slug === "berlin", isActive: true },
      })
    )
  );
  console.log(`Seeded ${cities.length} cities`);

  const berlinId = cities.find((c) => c.slug === "berlin")!.id;

  // ──────────────────────────────────────────────
  // 2. CONTENT SOURCES
  // ──────────────────────────────────────────────
  const sources = await Promise.all(
    [
      { title: "Berlin Bürgeramt Appointment", url: "https://service.berlin.de/terminvereinbarung/", sourceType: "official_government" as const, publisher: "Berlin.de", cityId: berlinId },
      { title: "Berlin Resident Registration Form", url: "https://service.berlin.de/dienstleistung/120686/", sourceType: "official_government" as const, publisher: "Berlin.de", cityId: berlinId },
      { title: "Berlin Ausländerbehörde", url: "https://www.berlin.de/einwanderung/", sourceType: "official_government" as const, publisher: "Berlin.de", cityId: berlinId },
      { title: "Federal Office for Migration and Refugees", url: "https://www.bamf.de/", sourceType: "official_government" as const, publisher: "BAMF" },
      { title: "German Health Insurance Overview", url: "https://www.bundesgesundheitsministerium.de/krankenversicherung", sourceType: "official_government" as const, publisher: "BMG" },
      { title: "Techniker Krankenkasse (TK) English Info", url: "https://www.tk.de/en", sourceType: "official_provider" as const, publisher: "TK" },
      { title: "AOK English Service", url: "https://www.aok.de/en/", sourceType: "official_provider" as const, publisher: "AOK" },
      { title: "Federal Central Tax Office - Tax ID Info", url: "https://www.bzst.de/EN/", sourceType: "official_government" as const, publisher: "BZSt" },
      { title: "ELSTER Portal", url: "https://www.elster.de/eportal/start", sourceType: "official_government" as const, publisher: "ELSTER" },
      { title: "N26 Bank Account Opening", url: "https://n26.com/en-eu", sourceType: "official_provider" as const, publisher: "N26" },
      { title: "Revolut Germany", url: "https://www.revolut.com/de/", sourceType: "official_provider" as const, publisher: "Revolut" },
      { title: "Wise Borderless Account", url: "https://wise.com/gb/borderless/", sourceType: "official_provider" as const, publisher: "Wise" },
      { title: "Bundesnetzagentur - SIM Card Registration", url: "https://www.bundesnetzagentur.de/", sourceType: "official_government" as const, publisher: "Bundesnetzagentur" },
      { title: "German Tax ID Explained", url: "https://www.make-it-in-germany.com/en/working/tax-and-social-security/tax-id", sourceType: "trusted_institution" as const, publisher: "Make it in Germany" },
      { title: "Serviceportal Hamburg", url: "https://www.hamburg.de/service/", sourceType: "official_government" as const, publisher: "Hamburg.de", cityId: cities.find((c) => c.slug === "hamburg")!.id },
      { title: "Hannover Bürgeramt", url: "https://e-government.hannover-stadt.de/hannover/", sourceType: "official_government" as const, publisher: "Hannover.de", cityId: cities.find((c) => c.slug === "hannover")!.id },
      { title: "München Bürgerbüro", url: "https://www.muenchen.de/rathaus/terminvereinbarung.html", sourceType: "official_government" as const, publisher: "Muenchen.de", cityId: cities.find((c) => c.slug === "munich")!.id },
      { title: "Köln Bürgeramt", url: "https://www.stadt-koeln.de/service/onlinedienste/terminvereinbarung/", sourceType: "official_government" as const, publisher: "Stadt Köln", cityId: cities.find((c) => c.slug === "cologne")!.id },
      { title: "Frankfurt Bürgeramt", url: "https://frankfurt.de/service/service-rathaus/aemter-und-dienststellen/buergeramt", sourceType: "official_government" as const, publisher: "Frankfurt.de", cityId: cities.find((c) => c.slug === "frankfurt")!.id },
      { title: "DAAD - Health Insurance for Students", url: "https://www.daad.de/en/study-and-research-in-germany/health-insurance/", sourceType: "trusted_institution" as const, publisher: "DAAD" },
      { title: "EU Health Insurance Card Info", url: "https://ec.europa.eu/social/main.jsp?catId=559", sourceType: "official_government" as const, publisher: "European Commission" },
    ].map((s) =>
      prisma.contentSource.upsert({
        where: { id: s.title.toLowerCase().replace(/\s+/g, "-") },
        update: {},
        create: { id: s.title.toLowerCase().replace(/\s+/g, "-"), ...s, lastCheckedAt: new Date("2026-05-15") },
      })
    )
  );
  console.log(`Seeded ${sources.length} content sources`);

  // ──────────────────────────────────────────────
  // 3. WORKFLOWS
  // ──────────────────────────────────────────────
  const workflowData = [
    {
      slug: "mobile_sim" as const,
      name: "Mobile SIM Registration",
      shortDescription: "Get a working German mobile number to authenticate banking, appointments, and daily communication.",
      longDescription: "A German phone number is essential for almost every official step: bank account verification (VideoIdent), appointment confirmations, delivery services, and employer contact. This workflow helps you choose between prepaid, eSIM, or contract plans and complete identity verification successfully.",
      category: "practical_setup",
      defaultOrder: 1,
      riskLevel: "low" as const,
    },
    {
      slug: "banking" as const,
      name: "Banking Setup",
      shortDescription: "Open a German bank account to receive salary, pay rent, and manage everyday payments.",
      longDescription: "A German or EU bank account with SEPA capability is needed for salary, rent, insurance premiums, and subscriptions. Online/mobile banks (N26, Revolut, Wise) can be a fast first step. Traditional banks (Sparkasse, Deutsche Bank) offer in-person support and Girocard but may take longer to open.",
      category: "practical_setup",
      defaultOrder: 2,
      riskLevel: "medium" as const,
    },
    {
      slug: "health_insurance" as const,
      name: "Health Insurance Onboarding",
      shortDescription: "Secure valid health insurance coverage, which is mandatory for all residents in Germany.",
      longDescription: "Health insurance is compulsory in Germany. Most employees and students under 30 are eligible for statutory (public) health insurance. Freelancers, older students, and high earners may opt for private insurance. You need proof of coverage for visa applications, university enrollment, and employment registration.",
      category: "bureaucracy",
      defaultOrder: 3,
      riskLevel: "high" as const,
    },
    {
      slug: "anmeldung" as const,
      name: "Anmeldung (Address Registration)",
      shortDescription: "Register your residential address at the local Bürgeramt within 14 days of moving in.",
      longDescription: "Anmeldung is the official registration of your address in Germany. It is legally required within 14 days of moving into a new home. Your Tax ID (Steueridentifikationsnummer) is automatically sent to your registered address afterwards. Many other processes — bank account, residence permit, health insurance — may require your Anmeldung certificate.",
      category: "bureaucracy",
      defaultOrder: 4,
      riskLevel: "medium" as const,
    },
    {
      slug: "residence_permit" as const,
      name: "Residence Permit Application",
      shortDescription: "Apply for or extend your residence permit before your current visa or permit expires.",
      longDescription: "Non-EU citizens who plan to stay in Germany longer than 90 days (or beyond their visa validity) need a residence permit (Aufenthaltstitel). The type depends on your purpose: study, work, job-seeking, family reunion, or research. Processing times vary by city, so apply early.",
      category: "bureaucracy",
      defaultOrder: 5,
      riskLevel: "high" as const,
    },
    {
      slug: "tax_id_elster" as const,
      name: "Tax ID & ELSTER Registration",
      shortDescription: "Understand your Tax ID, track its delivery, and set up your ELSTER online tax account.",
      longDescription: "Your Tax ID (Steueridentifikationsnummer) is automatically generated after Anmeldung and mailed to your registered address. It is needed by your employer for payroll tax deductions. ELSTER is the German online tax portal, useful for filing tax returns, viewing tax data, and managing tax matters digitally.",
      category: "bureaucracy",
      defaultOrder: 6,
      riskLevel: "medium" as const,
    },
  ];

  const workflows = await Promise.all(
    workflowData.map((w) =>
      prisma.workflow.upsert({
        where: { slug: w.slug },
        update: {},
        create: { ...w, lastReviewedAt: new Date("2026-05-15"), isActive: true },
      })
    )
  );
  console.log(`Seeded ${workflows.length} workflows`);

  const getWorkflowId = (slug: string) => workflows.find((w) => w.slug === slug)!.id;
  const getSourceId = (titlePrefix: string) =>
    sources.find((s) => s.title.startsWith(titlePrefix))?.id ?? null;

  // ──────────────────────────────────────────────
  // 4. WORKFLOW STEPS
  // ──────────────────────────────────────────────
  const stepsData = [
    // ── Mobile SIM ──
    { workflowSlug: "mobile_sim", title: "Check device compatibility", description: "Ensure your phone is unlocked and supports the frequency bands used in Germany. For eSIM, verify your phone model supports it (iPhone XS+/Google Pixel 3+/Samsung S20+).", stepOrder: 1, sourceTitle: "Bundesnetzagentur" },
    { workflowSlug: "mobile_sim", title: "Choose SIM type", description: "Decide between prepaid SIM (no contract, refill credit), eSIM (digital, instant activation if supported), or postpaid contract (monthly bill, usually needs Anmeldung and Schufa check).", stepOrder: 2, sourceTitle: "Bundesnetzagentur" },
    { workflowSlug: "mobile_sim", title: "Prepare identification documents", description: "German law requires identity verification for SIM activation. Have your passport or national ID ready. A residence permit may also be accepted. Ensure your name matches your ID exactly.", stepOrder: 3, sourceTitle: "Bundesnetzagentur" },
    { workflowSlug: "mobile_sim", title: "Complete video identification or PostIdent", description: "Most providers use VideoIdent (video call) or PostIdent (in-post-office) to verify your identity. Ensure good lighting, stable internet, and your ID document is physically present.", stepOrder: 4 },
    { workflowSlug: "mobile_sim", title: "Activate and test your number", description: "Once verified, insert the SIM or activate the eSIM profile. Make a test call and ensure you can receive SMS for banking verification codes.", stepOrder: 5 },

    // ── Banking ──
    { workflowSlug: "banking", title: "Identify your banking needs", description: "Determine what you need: salary account, rent payments, blocked account (for visa/study), or daily spending. This helps choose between online/mobile banks and traditional banks.", stepOrder: 1 },
    { workflowSlug: "banking", title: "Check eligibility for online/mobile banking", description: "Most online banks (N26, Revolut, Wise) accept EU/EEA passports and some non-EU passports. You need a smartphone, email, and a German or EU residential address. Some may accept temporary addresses.", stepOrder: 2 },
    { workflowSlug: "banking", title: "Prepare documents for verification", description: "Valid passport or national ID, proof of address (if required), tax residency declaration, and sometimes proof of status (student certificate, employment contract).", stepOrder: 3 },
    { workflowSlug: "banking", title: "Complete identity verification", description: "Most online banks use VideoIdent or app-based verification. Have your ID and a stable internet connection ready. For traditional banks, you may need to visit a branch in person.", stepOrder: 4 },
    { workflowSlug: "banking", title: "Activate account and receive card", description: "After approval, you will get your IBAN immediately (for some online banks) and a physical card within 5-10 business days. Add the card to Apple Pay/Google Pay for instant use.", stepOrder: 5 },

    // ── Health Insurance ──
    { workflowSlug: "health_insurance", title: "Determine your insurance path", description: "Your status determines your options: employees under ~€69,300/year are usually insured via statutory (public) insurance; freelancers and high earners can choose private; students under 30 are typically eligible for student statutory rates.", stepOrder: 1, sourceTitle: "German Health Insurance", riskLevel: "high" as const },
    { workflowSlug: "health_insurance", title: "Choose a health insurance provider", description: "Compare providers neutrally based on: monthly contribution, language support, English app/service, coverage scope, acceptance by doctors, extra benefits (preventive care, digital services). Common public insurers: TK, AOK, Barmer, DAK.", stepOrder: 2, sourceTitle: "Techniker Krankenkasse" },
    { workflowSlug: "health_insurance", title: "Apply and submit documents", description: "Complete the online application. You will need your personal details, address, status/employer info, and perhaps previous insurance proof. For students, university enrollment documents are needed.", stepOrder: 3, sourceTitle: "DAAD - Health Insurance for Students" },
    { workflowSlug: "health_insurance", title: "Receive insurance confirmation and proof", description: "Your provider will send a membership certificate (Mitgliedsbescheinigung). Keep this for your employer, university, and residence permit application.", stepOrder: 4 },
    { workflowSlug: "health_insurance", title: "Understand your coverage and next steps", description: "Learn about your electronic health card (eGK), how to find doctors (Arztsuche), how to submit sick notes, and how to change providers if needed in the future.", stepOrder: 5 },

    // ── Anmeldung ──
    { workflowSlug: "anmeldung", title: "Obtain your landlord confirmation (Wohnungsgeberbestätigung)", description: "Ask your landlord or property manager to fill out and sign the official Wohnungsgeberbestätigung form. This is a mandatory document for registration and confirms your move-in date and address.", stepOrder: 1, sourceTitle: "Berlin Resident Registration" },
    { workflowSlug: "anmeldung", title: "Complete the registration form", description: "Fill out the official Anmeldung form (available online from your Bürgeramt). You can pre-fill it digitally or complete it by hand. It asks for personal details, previous address, and new address.", stepOrder: 2, sourceTitle: "Berlin Resident Registration" },
    { workflowSlug: "anmeldung", title: "Book a Bürgeramt appointment", description: "Appointments are mandatory in most cities and can be scarce. Book early online via your city's service portal. Some Bürgerämter allow walk-ins but expect long waits.", stepOrder: 3, sourceTitle: "Berlin Bürgeramt Appointment" },
    { workflowSlug: "anmeldung", title: "Attend appointment with documents", description: "Bring your passport/ID, completed registration form, landlord confirmation, and rental contract (if available). The process takes 10-15 minutes. You will receive a registration certificate (Meldebestätigung) immediately.", stepOrder: 4 },
    { workflowSlug: "anmeldung", title: "Receive your Tax ID in the mail", description: "Your Tax ID (Steueridentifikationsnummer) is automatically sent to your registered address within 2-4 weeks after Anmeldung. Keep this letter safe — you will need it for employment and tax matters.", stepOrder: 5, sourceTitle: "German Tax ID Explained" },

    // ── Residence Permit ──
    { workflowSlug: "residence_permit", title: "Identify your permit type", description: "Determine which residence title applies: student permit, skilled worker permit (Section 18a/18b), EU Blue Card, job seeker permit, family reunion, or research permit. Each has different requirements and processing times.", stepOrder: 1, sourceTitle: "Federal Office for Migration" },
    { workflowSlug: "residence_permit", title: "Prepare your document dossier", description: "Common documents: valid passport, biometric photos (35x45mm), Anmeldung certificate, health insurance proof, proof of financial means, employment contract or enrollment certificate, rental agreement.", stepOrder: 2 },
    { workflowSlug: "residence_permit", title: "Book appointment at Ausländerbehörde", description: "The Ausländerbehörde (Foreigners' Office) handles residence permit applications. Appointment availability varies by city — book as early as possible. Some cities offer online application portals.", stepOrder: 3, sourceTitle: "Berlin Ausländerbehörde" },
    { workflowSlug: "residence_permit", title: "Submit application and pay fee", description: "Submit your completed application with all documents. Fees range from €50-€100 depending on permit type. You may receive a temporary certificate (Fiktionsbescheinigung) while your application is processed.", stepOrder: 4 },
    { workflowSlug: "residence_permit", title: "Collect your residence permit card", description: "Once approved, you will receive an electronic residence permit card (eAT) valid for the duration of your permit. Check the validity date and set a reminder for renewal.", stepOrder: 5 },

    // ── Tax ID & ELSTER ──
    { workflowSlug: "tax_id_elster", title: "Understand Tax ID vs Tax Number vs SSN", description: "Your Tax ID (Steueridentifikationsnummer) is a unique 11-digit number assigned for life. Your Tax Number (Steuernummer) is issued by your local tax office and may change if you move. Social Security Number (Sozialversicherungsnummer) is separate and used for pension/health insurance.", stepOrder: 1, sourceTitle: "German Tax ID Explained" },
    { workflowSlug: "tax_id_elster", title: "Track your Tax ID delivery", description: "After Anmeldung, the Federal Central Tax Office mails your Tax ID to your registered address within 2-4 weeks. If you haven't received it, contact your local tax office or request a reissue via ELSTER or by mail.", stepOrder: 2, sourceTitle: "Federal Central Tax Office" },
    { workflowSlug: "tax_id_elster", title: "Provide Tax ID to employer", description: "Your employer needs your Tax ID for payroll tax calculations. Without it, you may be taxed at the highest rate (Tax Class 6). Submit your Tax ID as soon as you receive it.", stepOrder: 3 },
    { workflowSlug: "tax_id_elster", title: "Register for ELSTER", description: "ELSTER is the German online tax portal. Register at elster.de. You will receive an activation code by mail (2-3 weeks). Complete registration with the activation code and set up your password.", stepOrder: 4, sourceTitle: "ELSTER Portal" },
    { workflowSlug: "tax_id_elster", title: "Activate ELSTER account and explore features", description: "After activation, you can view your tax data, submit tax returns (Steuererklärung), check your tax assessment, and manage tax-related communications digitally.", stepOrder: 5 },
  ];

  for (const step of stepsData) {
    const sourceId = step.sourceTitle ? getSourceId(step.sourceTitle) : null;
    const riskLevel = (step as any).riskLevel || "low";
    await prisma.workflowStep.create({
      data: {
        workflowId: getWorkflowId(step.workflowSlug),
        title: step.title,
        description: step.description,
        stepOrder: step.stepOrder,
        sourceId,
        lastReviewedAt: new Date("2026-05-15"),
      },
    });
  }
  console.log(`Seeded ${stepsData.length} workflow steps`);

  // ──────────────────────────────────────────────
  // 5. CHECKLIST ITEMS
  // ──────────────────────────────────────────────
  const checklistData = [
    // Mobile SIM
    { workflowSlug: "mobile_sim", title: "Unlocked compatible phone", description: "Your phone must be unlocked and support German network bands.", itemType: "other" as const, priority: "high" as const },
    { workflowSlug: "mobile_sim", title: "Valid passport or national ID", description: "Accepted by most providers for identity verification.", itemType: "document" as const, priority: "high" as const },
    { workflowSlug: "mobile_sim", title: "Email address", description: "For provider account registration and confirmation.", itemType: "information" as const, priority: "medium" as const },
    { workflowSlug: "mobile_sim", title: "German or temporary address", description: "Some providers require an address for SIM delivery.", itemType: "information" as const, priority: "medium" as const },
    { workflowSlug: "mobile_sim", title: "Stable internet for VideoIdent", description: "Video identification requires a stable internet connection.", itemType: "verification" as const, priority: "medium" as const },
    { workflowSlug: "mobile_sim", title: "Payment method (optional for prepaid)", description: "Credit card, PayPal, or direct debit for plan payments.", itemType: "other" as const, priority: "low" as const },
    { workflowSlug: "mobile_sim", title: "SIM card or eSIM activated", description: "Confirm your number is working with a test call and SMS.", itemType: "verification" as const, priority: "high" as const },

    // Banking
    { workflowSlug: "banking", title: "Valid passport or national ID", description: "Required for identity verification by all German banks.", itemType: "document" as const, priority: "high" as const },
    { workflowSlug: "banking", title: "Smartphone with camera", description: "Needed for app-based identity verification (VideoIdent).", itemType: "other" as const, priority: "high" as const },
    { workflowSlug: "banking", title: "German or EU residential address", description: "Required for card delivery and tax residency declaration.", itemType: "information" as const, priority: "high" as const },
    { workflowSlug: "banking", title: "German mobile number", description: "Used for account verification and security codes (2FA).", itemType: "information" as const, priority: "high" as const },
    { workflowSlug: "banking", title: "Email address", description: "For account communication and statements.", itemType: "information" as const, priority: "medium" as const },
    { workflowSlug: "banking", title: "Tax residency declaration", description: "Most banks require you to declare your tax residency (W-8/9 equivalent for Germany).", itemType: "form" as const, priority: "medium" as const },
    { workflowSlug: "banking", title: "Proof of status (if applicable)", description: "Student certificate or employment contract for special account types.", itemType: "document" as const, priority: "low" as const },
    { workflowSlug: "banking", title: "Account approved and card received", description: "IBAN issued and debit card delivered or added to mobile wallet.", itemType: "account_setup" as const, priority: "high" as const },

    // Health Insurance
    { workflowSlug: "health_insurance", title: "Valid passport or ID", description: "Required for insurance application and verification.", itemType: "document" as const, priority: "high" as const },
    { workflowSlug: "health_insurance", title: "German or registered address", description: "Insurance documents and health card are mailed to your address.", itemType: "information" as const, priority: "high" as const },
    { workflowSlug: "health_insurance", title: "University enrollment or employment contract", description: "Proof of status to determine eligibility for student/employee rates.", itemType: "document" as const, priority: "high" as const },
    { workflowSlug: "health_insurance", title: "Previous insurance proof (if applicable)", description: "If switching from another German or EU insurance, provide proof of prior coverage.", itemType: "document" as const, priority: "medium" as const },
    { workflowSlug: "health_insurance", title: "Membership certificate received", description: "Confirmation of insurance (Mitgliedsbescheinigung) for employer/university/visa.", itemType: "proof" as const, priority: "high" as const },
    { workflowSlug: "health_insurance", title: "Electronic health card (eGK) received", description: "Your health card is used for doctor visits and prescriptions.", itemType: "proof" as const, priority: "medium" as const },

    // Anmeldung
    { workflowSlug: "anmeldung", title: "Valid passport or national ID", description: "Bring your original passport or ID to the appointment.", itemType: "document" as const, priority: "high" as const },
    { workflowSlug: "anmeldung", title: "Completed registration form", description: "Pre-fill the Anmeldung form (available online from your city).", itemType: "form" as const, priority: "high" as const },
    { workflowSlug: "anmeldung", title: "Wohnungsgeberbestätigung (landlord confirmation)", description: "Mandatory signed form from your landlord confirming move-in date and address.", itemType: "document" as const, priority: "high" as const },
    { workflowSlug: "anmeldung", title: "Rental contract (optional but recommended)", description: "Helpful if questions arise about your tenancy.", itemType: "document" as const, priority: "low" as const },
    { workflowSlug: "anmeldung", title: "Bürgeramt appointment booked", description: "Book your appointment online or in person. Appointments can be scarce — book early.", itemType: "appointment" as const, priority: "high" as const },
    { workflowSlug: "anmeldung", title: "Registration certificate (Meldebestätigung) received", description: "Keep this certificate safe. You will need it for banking, residence permit, and other processes.", itemType: "proof" as const, priority: "high" as const },

    // Residence Permit
    { workflowSlug: "residence_permit", title: "Valid passport", description: "Your passport must be valid for the duration of the permit.", itemType: "document" as const, priority: "high" as const },
    { workflowSlug: "residence_permit", title: "Biometric photos (35x45mm)", description: "Recent biometric photos meeting German standards.", itemType: "document" as const, priority: "high" as const },
    { workflowSlug: "residence_permit", title: "Anmeldung certificate", description: "Proof of registered address in Germany.", itemType: "proof" as const, priority: "high" as const },
    { workflowSlug: "residence_permit", title: "Health insurance proof", description: "Valid health insurance membership certificate.", itemType: "proof" as const, priority: "high" as const },
    { workflowSlug: "residence_permit", title: "Proof of financial means", description: "Bank statements, blocked account confirmation, employment contract, or scholarship letter.", itemType: "document" as const, priority: "high" as const },
    { workflowSlug: "residence_permit", title: "Employment contract or enrollment certificate", description: "Proof of your purpose in Germany (work or study).", itemType: "document" as const, priority: "high" as const },
    { workflowSlug: "residence_permit", title: "Rental agreement or proof of accommodation", description: "Confirms you have suitable housing.", itemType: "document" as const, priority: "medium" as const },
    { workflowSlug: "residence_permit", title: "Completed application form", description: "Form or online submission confirmation from your Ausländerbehörde.", itemType: "form" as const, priority: "high" as const },
    { workflowSlug: "residence_permit", title: "Application fee paid", description: "Fee ranges from €50-€100 depending on permit type.", itemType: "other" as const, priority: "medium" as const },

    // Tax ID & ELSTER
    { workflowSlug: "tax_id_elster", title: "Anmeldung completed", description: "Tax ID is automatically triggered after address registration.", itemType: "reminder" as const, priority: "high" as const },
    { workflowSlug: "tax_id_elster", title: "Tax ID letter received", description: "Check your mail for the letter from the Federal Central Tax Office.", itemType: "document" as const, priority: "high" as const },
    { workflowSlug: "tax_id_elster", title: "Tax ID provided to employer", description: "Submit your Tax ID to your employer for correct tax withholding.", itemType: "form" as const, priority: "high" as const },
    { workflowSlug: "tax_id_elster", title: "ELSTER registration submitted", description: "Register at elster.de with your personal details.", itemType: "form" as const, priority: "medium" as const },
    { workflowSlug: "tax_id_elster", title: "ELSTER activation code received", description: "Your activation code arrives by mail within 2-3 weeks.", itemType: "reminder" as const, priority: "medium" as const },
    { workflowSlug: "tax_id_elster", title: "ELSTER account activated", description: "Activate your account with the code and set up your password.", itemType: "account_setup" as const, priority: "medium" as const },
  ];

  for (const item of checklistData) {
    await prisma.checklistItem.create({
      data: {
        workflowId: getWorkflowId(item.workflowSlug),
        title: item.title,
        description: item.description,
        itemType: item.itemType,
        priority: item.priority,
        isRequired: item.priority === "high",
        lastReviewedAt: new Date("2026-05-15"),
      },
    });
  }
  console.log(`Seeded ${checklistData.length} checklist items`);

  // ──────────────────────────────────────────────
  // 6. GLOSSARY TERMS
  // ──────────────────────────────────────────────
  const glossaryData = [
    { term: "Anmeldung", slug: "anmeldung", plainEnglishDefinition: "The mandatory registration of your residential address in Germany. Must be done within 14 days of moving in at the local Bürgeramt.", germanDefinition: "Anmeldung des Wohnsitzes", workflowSlug: "anmeldung" },
    { term: "Bürgeramt", slug: "buergeramt", plainEnglishDefinition: "The local government office (citizens' office) that handles address registration, ID cards, passports, and various other administrative services.", germanDefinition: "Bürgeramt" },
    { term: "Ausländerbehörde", slug: "auslaenderbehoerde", plainEnglishDefinition: "The Foreigners' Office responsible for issuing and managing residence permits, visas, and immigration matters for non-German citizens.", germanDefinition: "Ausländerbehörde", workflowSlug: "residence_permit" },
    { term: "Aufenthaltstitel", slug: "aufenthaltstitel", plainEnglishDefinition: "Residence title/permit that allows non-EU citizens to live in Germany for a specific purpose (study, work, family reunion).", germanDefinition: "Aufenthaltstitel", workflowSlug: "residence_permit" },
    { term: "Wohnungsgeberbestätigung", slug: "wohnungsgeberbestaetigung", plainEnglishDefinition: "A written confirmation from your landlord verifying your move-in date and address. Required for the Anmeldung registration process.", germanDefinition: "Wohnungsgeberbestätigung", workflowSlug: "anmeldung" },
    { term: "Steueridentifikationsnummer (Tax ID)", slug: "tax-id", plainEnglishDefinition: "A unique 11-digit tax identification number assigned to every German resident for life. Automatically sent by mail after Anmeldung.", germanDefinition: "Steueridentifikationsnummer", workflowSlug: "tax_id_elster" },
    { term: "Steuernummer (Tax Number)", slug: "tax-number", plainEnglishDefinition: "A tax account number issued by your local tax office (Finanzamt). It may change if you move to a different tax district.", germanDefinition: "Steuernummer", workflowSlug: "tax_id_elster" },
    { term: "ELSTER", slug: "elster", plainEnglishDefinition: "The German online tax portal (Elektronische Steuererklärung) used for filing tax returns, viewing tax data, and communicating with the tax office.", germanDefinition: "ELSTER", workflowSlug: "tax_id_elster" },
    { term: "Krankenkasse", slug: "krankenkasse", plainEnglishDefinition: "Health insurance provider in Germany. Statutory (public) insurers like TK, AOK, Barmer, and DAK cover the majority of residents.", germanDefinition: "Krankenkasse", workflowSlug: "health_insurance" },
    { term: "Gesetzliche Krankenversicherung (GKV)", slug: "public-health-insurance", plainEnglishDefinition: "Statutory/public health insurance — the standard system for employees below ~€69,300/year. Contributions are income-based and shared with your employer.", germanDefinition: "gesetzliche Krankenversicherung", workflowSlug: "health_insurance" },
    { term: "Private Krankenversicherung (PKV)", slug: "private-health-insurance", plainEnglishDefinition: "Private health insurance — available to high earners, freelancers, and self-employed individuals. Premiums are based on age and health status, not income.", germanDefinition: "private Krankenversicherung", workflowSlug: "health_insurance" },
    { term: "IBAN", slug: "iban", plainEnglishDefinition: "International Bank Account Number — the standard format for bank account numbers in Germany and Europe. Used for domestic and cross-border SEPA transfers.", germanDefinition: "IBAN", workflowSlug: "banking" },
    { term: "SEPA", slug: "sepa", plainEnglishDefinition: "Single Euro Payments Area — a payment integration standard that allows euro transfers and direct debits across EU/EEA countries as if they were domestic.", germanDefinition: "SEPA", workflowSlug: "banking" },
    { term: "Girocard", slug: "girocard", plainEnglishDefinition: "The standard German debit card (formerly EC card) linked to your bank account. Widely accepted in German shops but less useful online or abroad.", germanDefinition: "Girocard", workflowSlug: "banking" },
    { term: "VideoIdent", slug: "videoident", plainEnglishDefinition: "A video-based identity verification method used by banks, telecom providers, and other services. You show your ID document via a video call.", germanDefinition: "VideoIdent" },
    { term: "PostIdent", slug: "postident", plainEnglishDefinition: "An in-person identity verification service offered at post offices. Used by some banks and service providers for identity confirmation.", germanDefinition: "PostIdent" },
    { term: "eSIM", slug: "esim", plainEnglishDefinition: "A digital SIM card embedded in your phone that allows you to activate a mobile plan without a physical SIM card. Supported by most modern smartphones.", germanDefinition: "eSIM", workflowSlug: "mobile_sim" },
    { term: "Prepaid SIM", slug: "prepaid-sim", plainEnglishDefinition: "A pay-as-you-go mobile SIM plan with no long-term contract. You top up credit as needed. Ideal as a first German number.", germanDefinition: "Prepaid-Karte", workflowSlug: "mobile_sim" },
    { term: "Meldebestätigung", slug: "meldebestaetigung", plainEnglishDefinition: "The official registration certificate you receive after completing Anmeldung. Confirms your registered address for official purposes.", germanDefinition: "Meldebestätigung", workflowSlug: "anmeldung" },
    { term: "Fiktionsbescheinigung", slug: "fiktionsbescheinigung", plainEnglishDefinition: "A temporary certificate issued by the Ausländerbehörde that confirms your legal stay while your residence permit application is being processed.", germanDefinition: "Fiktionsbescheinigung", workflowSlug: "residence_permit" },
    { term: "Schufa", slug: "schufa", plainEnglishDefinition: "Germany's main credit bureau. Landlords, banks, and mobile providers may request a Schufa report to assess your creditworthiness.", germanDefinition: "Schufa" },
    { term: "Finanzamt", slug: "finanzamt", plainEnglishDefinition: "Your local tax office responsible for income tax, VAT, and business tax matters. Issues your tax number and handles tax returns.", germanDefinition: "Finanzamt", workflowSlug: "tax_id_elster" },
    { term: "Sozialversicherungsnummer (Social Security Number)", slug: "social-security-number", plainEnglishDefinition: "A unique number assigned for the German social security system (pension, health insurance, unemployment, nursing care insurance). Automatically issued when you start working.", germanDefinition: "Sozialversicherungsnummer" },
  ];

  for (const term of glossaryData) {
    await prisma.glossaryTerm.create({
      data: {
        term: term.term,
        slug: term.slug,
        plainEnglishDefinition: term.plainEnglishDefinition,
        germanDefinition: term.germanDefinition,
        workflowId: term.workflowSlug ? getWorkflowId(term.workflowSlug) : null,
      },
    });
  }
  console.log(`Seeded ${glossaryData.length} glossary terms`);

  console.log("Database seeded successfully.");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
