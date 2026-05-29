// Static seed data used as fallback when DATABASE_URL is not configured
// Mirrors the structure returned by Prisma queries

export const mockCities = [
  { id: "city-berlin", name: "Berlin", slug: "berlin", federalState: "Berlin", isMvpCity: true },
  { id: "city-hannover", name: "Hannover", slug: "hannover", federalState: "Lower Saxony", isMvpCity: false },
  { id: "city-munich", name: "Munich", slug: "munich", federalState: "Bavaria", isMvpCity: false },
  { id: "city-hamburg", name: "Hamburg", slug: "hamburg", federalState: "Hamburg", isMvpCity: false },
  { id: "city-cologne", name: "Cologne", slug: "cologne", federalState: "North Rhine-Westphalia", isMvpCity: false },
  { id: "city-frankfurt", name: "Frankfurt", slug: "frankfurt", federalState: "Hesse", isMvpCity: false },
];

export const mockWorkflows = [
  {
    id: "wf-mobile-sim", slug: "mobile_sim", name: "Mobile SIM Registration",
    shortDescription: "Get a working German mobile number to authenticate banking, appointments, and daily communication.",
    longDescription: "A German phone number is essential for almost every official step: bank account verification (VideoIdent), appointment confirmations, delivery services, and employer contact.",
    category: "practical_setup", defaultOrder: 1, riskLevel: "low", isActive: true,
    lastReviewedAt: "2026-05-15T00:00:00.000Z",
    steps: [
      { id: "ms-step-1", title: "Check device compatibility", description: "Ensure your phone is unlocked and supports German frequency bands.", stepOrder: 1, source: null, city: null },
      { id: "ms-step-2", title: "Choose SIM type", description: "Decide between prepaid SIM, eSIM, or postpaid contract.", stepOrder: 2, source: null, city: null },
      { id: "ms-step-3", title: "Prepare identification documents", description: "German law requires identity verification for SIM activation.", stepOrder: 3, source: null, city: null },
      { id: "ms-step-4", title: "Complete video identification", description: "Most providers use VideoIdent to verify your identity.", stepOrder: 4, source: null, city: null },
      { id: "ms-step-5", title: "Activate and test your number", description: "Insert the SIM and make a test call.", stepOrder: 5, source: null, city: null },
    ],
    checklistItems: [
      { id: "ms-cl-1", title: "Unlocked compatible phone", description: "Your phone must be unlocked and support German network bands.", itemType: "other", priority: "high", isRequired: true, source: null, city: null },
      { id: "ms-cl-2", title: "Valid passport or national ID", description: "Accepted by most providers for identity verification.", itemType: "document", priority: "high", isRequired: true, source: null, city: null },
      { id: "ms-cl-3", title: "Email address", description: "For provider account registration.", itemType: "information", priority: "medium", isRequired: false, source: null, city: null },
      { id: "ms-cl-4", title: "SIM card or eSIM activated", description: "Confirm your number is working.", itemType: "verification", priority: "high", isRequired: true, source: null, city: null },
    ],
    contentSources: [
      { id: "src-1", title: "Bundesnetzagentur - SIM Card Registration", url: "https://www.bundesnetzagentur.de/", sourceType: "official_government", publisher: "Bundesnetzagentur", lastCheckedAt: "2026-05-15T00:00:00.000Z" },
    ],
  },
  {
    id: "wf-banking", slug: "banking", name: "Banking Setup",
    shortDescription: "Open a German bank account to receive salary, pay rent, and manage everyday payments.",
    longDescription: "A German or EU bank account with SEPA capability is needed for salary, rent, insurance premiums, and subscriptions.",
    category: "practical_setup", defaultOrder: 2, riskLevel: "medium", isActive: true,
    lastReviewedAt: "2026-05-15T00:00:00.000Z",
    steps: [
      { id: "bk-step-1", title: "Identify your banking needs", description: "Determine what you need: salary account, rent payments, blocked account, or daily spending.", stepOrder: 1, source: null, city: null },
      { id: "bk-step-2", title: "Check eligibility for online/mobile banking", description: "Most online banks accept EU/EEA passports and some non-EU passports.", stepOrder: 2, source: null, city: null },
      { id: "bk-step-3", title: "Prepare documents for verification", description: "Valid passport, proof of address, tax residency declaration.", stepOrder: 3, source: null, city: null },
      { id: "bk-step-4", title: "Complete identity verification", description: "Most online banks use VideoIdent or app-based verification.", stepOrder: 4, source: null, city: null },
      { id: "bk-step-5", title: "Activate account and receive card", description: "After approval, you will get your IBAN and card.", stepOrder: 5, source: null, city: null },
    ],
    checklistItems: [
      { id: "bk-cl-1", title: "Valid passport or national ID", description: "Required for identity verification.", itemType: "document", priority: "high", isRequired: true, source: null, city: null },
      { id: "bk-cl-2", title: "Smartphone with camera", description: "Needed for app-based identity verification.", itemType: "other", priority: "high", isRequired: true, source: null, city: null },
      { id: "bk-cl-3", title: "German or EU residential address", description: "Required for card delivery.", itemType: "information", priority: "high", isRequired: true, source: null, city: null },
      { id: "bk-cl-4", title: "German mobile number", description: "Used for account verification and 2FA.", itemType: "information", priority: "high", isRequired: true, source: null, city: null },
      { id: "bk-cl-5", title: "Account approved and card received", description: "IBAN issued and card received.", itemType: "account_setup", priority: "high", isRequired: true, source: null, city: null },
    ],
    contentSources: [
      { id: "src-2", title: "N26 Bank Account Opening", url: "https://n26.com/en-eu", sourceType: "official_provider", publisher: "N26", lastCheckedAt: "2026-05-15T00:00:00.000Z" },
    ],
  },
  {
    id: "wf-health", slug: "health_insurance", name: "Health Insurance Onboarding",
    shortDescription: "Secure valid health insurance coverage, which is mandatory for all residents in Germany.",
    longDescription: "Health insurance is compulsory in Germany. Most employees and students under 30 are eligible for statutory (public) health insurance.",
    category: "bureaucracy", defaultOrder: 3, riskLevel: "high", isActive: true,
    lastReviewedAt: "2026-05-15T00:00:00.000Z",
    steps: [
      { id: "hi-step-1", title: "Determine your insurance path", description: "Your status determines your options: public or private insurance.", stepOrder: 1, source: null, city: null },
      { id: "hi-step-2", title: "Choose a health insurance provider", description: "Compare providers based on monthly contribution and language support.", stepOrder: 2, source: null, city: null },
      { id: "hi-step-3", title: "Apply and submit documents", description: "Complete the online application with your details and status.", stepOrder: 3, source: null, city: null },
      { id: "hi-step-4", title: "Receive insurance confirmation", description: "Your provider will send a membership certificate.", stepOrder: 4, source: null, city: null },
    ],
    checklistItems: [
      { id: "hi-cl-1", title: "Valid passport or ID", description: "Required for insurance application.", itemType: "document", priority: "high", isRequired: true, source: null, city: null },
      { id: "hi-cl-2", title: "German or registered address", description: "Insurance documents are mailed to your address.", itemType: "information", priority: "high", isRequired: true, source: null, city: null },
      { id: "hi-cl-3", title: "University enrollment or employment contract", description: "Proof of status for eligibility.", itemType: "document", priority: "high", isRequired: true, source: null, city: null },
      { id: "hi-cl-4", title: "Membership certificate received", description: "Confirmation of insurance for employer/university.", itemType: "proof", priority: "high", isRequired: true, source: null, city: null },
    ],
    contentSources: [
      { id: "src-3", title: "German Health Insurance Overview", url: "https://www.bundesgesundheitsministerium.de/krankenversicherung", sourceType: "official_government", publisher: "BMG", lastCheckedAt: "2026-05-15T00:00:00.000Z" },
    ],
  },
  {
    id: "wf-anmeldung", slug: "anmeldung", name: "Anmeldung (Address Registration)",
    shortDescription: "Register your residential address at the local Bürgeramt within 14 days of moving in.",
    longDescription: "Anmeldung is the official registration of your address in Germany. It is legally required within 14 days of moving into a new home.",
    category: "bureaucracy", defaultOrder: 4, riskLevel: "medium", isActive: true,
    lastReviewedAt: "2026-05-15T00:00:00.000Z",
    steps: [
      { id: "an-step-1", title: "Obtain your landlord confirmation", description: "Ask your landlord for the Wohnungsgeberbestätigung form.", stepOrder: 1, source: null, city: null },
      { id: "an-step-2", title: "Complete the registration form", description: "Fill out the official Anmeldung form.", stepOrder: 2, source: null, city: null },
      { id: "an-step-3", title: "Book a Bürgeramt appointment", description: "Appointments are mandatory in most cities.", stepOrder: 3, source: null, city: null },
      { id: "an-step-4", title: "Attend appointment with documents", description: "Bring your passport, form, and landlord confirmation.", stepOrder: 4, source: null, city: null },
      { id: "an-step-5", title: "Receive your Tax ID in the mail", description: "Your Tax ID is automatically sent after Anmeldung.", stepOrder: 5, source: null, city: null },
    ],
    checklistItems: [
      { id: "an-cl-1", title: "Valid passport or national ID", description: "Bring your original passport to the appointment.", itemType: "document", priority: "high", isRequired: true, source: null, city: null },
      { id: "an-cl-2", title: "Completed registration form", description: "Pre-fill the Anmeldung form.", itemType: "form", priority: "high", isRequired: true, source: null, city: null },
      { id: "an-cl-3", title: "Wohnungsgeberbestätigung", description: "Mandatory signed form from your landlord.", itemType: "document", priority: "high", isRequired: true, source: null, city: null },
      { id: "an-cl-4", title: "Bürgeramt appointment booked", description: "Book your appointment early.", itemType: "appointment", priority: "high", isRequired: true, source: null, city: null },
      { id: "an-cl-5", title: "Registration certificate received", description: "Keep this certificate safe.", itemType: "proof", priority: "high", isRequired: true, source: null, city: null },
    ],
    contentSources: [
      { id: "src-4", title: "Berlin Bürgeramt Appointment", url: "https://service.berlin.de/terminvereinbarung/", sourceType: "official_government", publisher: "Berlin.de", lastCheckedAt: "2026-05-15T00:00:00.000Z" },
    ],
  },
  {
    id: "wf-residence", slug: "residence_permit", name: "Residence Permit Application",
    shortDescription: "Apply for or extend your residence permit before your current visa or permit expires.",
    longDescription: "Non-EU citizens who plan to stay in Germany longer than 90 days need a residence permit.",
    category: "bureaucracy", defaultOrder: 5, riskLevel: "high", isActive: true,
    lastReviewedAt: "2026-05-15T00:00:00.000Z",
    steps: [
      { id: "rp-step-1", title: "Identify your permit type", description: "Determine which residence title applies to you.", stepOrder: 1, source: null, city: null },
      { id: "rp-step-2", title: "Prepare your document dossier", description: "Common documents: passport, photos, Anmeldung certificate, insurance proof.", stepOrder: 2, source: null, city: null },
      { id: "rp-step-3", title: "Book appointment at Ausländerbehörde", description: "Appointment availability varies by city.", stepOrder: 3, source: null, city: null },
      { id: "rp-step-4", title: "Submit application and pay fee", description: "Fees range from €50-€100 depending on permit type.", stepOrder: 4, source: null, city: null },
      { id: "rp-step-5", title: "Collect your residence permit card", description: "Once approved, you will receive an electronic residence permit card.", stepOrder: 5, source: null, city: null },
    ],
    checklistItems: [
      { id: "rp-cl-1", title: "Valid passport", description: "Must be valid for the duration of the permit.", itemType: "document", priority: "high", isRequired: true, source: null, city: null },
      { id: "rp-cl-2", title: "Biometric photos (35x45mm)", description: "Recent biometric photos meeting German standards.", itemType: "document", priority: "high", isRequired: true, source: null, city: null },
      { id: "rp-cl-3", title: "Anmeldung certificate", description: "Proof of registered address.", itemType: "proof", priority: "high", isRequired: true, source: null, city: null },
      { id: "rp-cl-4", title: "Health insurance proof", description: "Valid health insurance membership certificate.", itemType: "proof", priority: "high", isRequired: true, source: null, city: null },
      { id: "rp-cl-5", title: "Proof of financial means", description: "Bank statements, blocked account, or employment contract.", itemType: "document", priority: "high", isRequired: true, source: null, city: null },
    ],
    contentSources: [
      { id: "src-5", title: "Berlin Ausländerbehörde", url: "https://www.berlin.de/einwanderung/", sourceType: "official_government", publisher: "Berlin.de", lastCheckedAt: "2026-05-15T00:00:00.000Z" },
    ],
  },
  {
    id: "wf-tax", slug: "tax_id_elster", name: "Tax ID & ELSTER Registration",
    shortDescription: "Understand your Tax ID, track its delivery, and set up your ELSTER online tax account.",
    longDescription: "Your Tax ID is automatically generated after Anmeldung and mailed to your registered address.",
    category: "bureaucracy", defaultOrder: 6, riskLevel: "medium", isActive: true,
    lastReviewedAt: "2026-05-15T00:00:00.000Z",
    steps: [
      { id: "tx-step-1", title: "Understand Tax ID vs Tax Number", description: "Your Tax ID is a unique 11-digit number assigned for life.", stepOrder: 1, source: null, city: null },
      { id: "tx-step-2", title: "Track your Tax ID delivery", description: "After Anmeldung, your Tax ID arrives within 2-4 weeks.", stepOrder: 2, source: null, city: null },
      { id: "tx-step-3", title: "Provide Tax ID to employer", description: "Your employer needs your Tax ID for payroll tax calculations.", stepOrder: 3, source: null, city: null },
      { id: "tx-step-4", title: "Register for ELSTER", description: "ELSTER is the German online tax portal.", stepOrder: 4, source: null, city: null },
      { id: "tx-step-5", title: "Activate ELSTER account", description: "After activation, you can view your tax data online.", stepOrder: 5, source: null, city: null },
    ],
    checklistItems: [
      { id: "tx-cl-1", title: "Anmeldung completed", description: "Tax ID is triggered after address registration.", itemType: "reminder", priority: "high", isRequired: true, source: null, city: null },
      { id: "tx-cl-2", title: "Tax ID letter received", description: "Check your mail for the letter.", itemType: "document", priority: "high", isRequired: true, source: null, city: null },
      { id: "tx-cl-3", title: "Tax ID provided to employer", description: "Submit your Tax ID for correct tax withholding.", itemType: "form", priority: "high", isRequired: true, source: null, city: null },
      { id: "tx-cl-4", title: "ELSTER registration submitted", description: "Register at elster.de.", itemType: "form", priority: "medium", isRequired: false, source: null, city: null },
      { id: "tx-cl-5", title: "ELSTER account activated", description: "Activate your account with the code.", itemType: "account_setup", priority: "medium", isRequired: false, source: null, city: null },
    ],
    contentSources: [
      { id: "src-6", title: "Federal Central Tax Office", url: "https://www.bzst.de/EN/", sourceType: "official_government", publisher: "BZSt", lastCheckedAt: "2026-05-15T00:00:00.000Z" },
    ],
  },
];

export const mockGlossaryTerms = [
  { id: "gl-1", term: "Anmeldung", slug: "anmeldung", plainEnglishDefinition: "The mandatory registration of your residential address in Germany. Must be done within 14 days of moving in.", germanDefinition: "Anmeldung des Wohnsitzes", workflow: { name: "Anmeldung (Address Registration)", slug: "anmeldung" } },
  { id: "gl-2", term: "Bürgeramt", slug: "buergeramt", plainEnglishDefinition: "The local government office that handles address registration, ID cards, and passports.", germanDefinition: "Bürgeramt", workflow: null },
  { id: "gl-3", term: "Ausländerbehörde", slug: "auslaenderbehoerde", plainEnglishDefinition: "The Foreigners' Office responsible for residence permits and immigration matters.", germanDefinition: "Ausländerbehörde", workflow: { name: "Residence Permit Application", slug: "residence_permit" } },
  { id: "gl-4", term: "Steueridentifikationsnummer (Tax ID)", slug: "tax-id", plainEnglishDefinition: "A unique 11-digit tax identification number assigned to every German resident.", germanDefinition: "Steueridentifikationsnummer", workflow: { name: "Tax ID & ELSTER Registration", slug: "tax_id_elster" } },
  { id: "gl-5", term: "ELSTER", slug: "elster", plainEnglishDefinition: "The German online tax portal for filing tax returns and managing tax matters.", germanDefinition: "ELSTER", workflow: { name: "Tax ID & ELSTER Registration", slug: "tax_id_elster" } },
  { id: "gl-6", term: "Krankenkasse", slug: "krankenkasse", plainEnglishDefinition: "Health insurance provider in Germany (e.g. TK, AOK, Barmer).", germanDefinition: "Krankenkasse", workflow: { name: "Health Insurance Onboarding", slug: "health_insurance" } },
  { id: "gl-7", term: "IBAN", slug: "iban", plainEnglishDefinition: "International Bank Account Number — standard format for bank accounts in Europe.", germanDefinition: "IBAN", workflow: { name: "Banking Setup", slug: "banking" } },
  { id: "gl-8", term: "SEPA", slug: "sepa", plainEnglishDefinition: "Single Euro Payments Area — allows euro transfers across EU countries.", germanDefinition: "SEPA", workflow: { name: "Banking Setup", slug: "banking" } },
  { id: "gl-9", term: "VideoIdent", slug: "videoident", plainEnglishDefinition: "A video-based identity verification method used by banks and telecom providers.", germanDefinition: "VideoIdent", workflow: null },
  { id: "gl-10", term: "eSIM", slug: "esim", plainEnglishDefinition: "A digital SIM card embedded in your phone for mobile activation without a physical SIM.", germanDefinition: "eSIM", workflow: { name: "Mobile SIM Registration", slug: "mobile_sim" } },
  { id: "gl-11", term: "Wohnungsgeberbestätigung", slug: "wohnungsgeberbestaetigung", plainEnglishDefinition: "A written confirmation from your landlord verifying your move-in date and address.", germanDefinition: "Wohnungsgeberbestätigung", workflow: { name: "Anmeldung (Address Registration)", slug: "anmeldung" } },
  { id: "gl-12", term: "Aufenthaltstitel", slug: "aufenthaltstitel", plainEnglishDefinition: "Residence title/permit allowing non-EU citizens to live in Germany.", germanDefinition: "Aufenthaltstitel", workflow: { name: "Residence Permit Application", slug: "residence_permit" } },
];

export const mockResources = [
  { id: "res-1", title: "Berlin Bürgeramt Appointment", url: "https://service.berlin.de/terminvereinbarung/", sourceType: "official_government", publisher: "Berlin.de", lastCheckedAt: "2026-05-15T00:00:00.000Z", city: { name: "Berlin", slug: "berlin" }, workflow: { name: "Anmeldung (Address Registration)", slug: "anmeldung" } },
  { id: "res-2", title: "Federal Office for Migration and Refugees", url: "https://www.bamf.de/", sourceType: "official_government", publisher: "BAMF", lastCheckedAt: "2026-05-15T00:00:00.000Z", city: null, workflow: { name: "Residence Permit Application", slug: "residence_permit" } },
  { id: "res-3", title: "ELSTER Portal", url: "https://www.elster.de/eportal/start", sourceType: "official_government", publisher: "ELSTER", lastCheckedAt: "2026-05-15T00:00:00.000Z", city: null, workflow: { name: "Tax ID & ELSTER Registration", slug: "tax_id_elster" } },
  { id: "res-4", title: "German Tax ID Explained", url: "https://www.make-it-in-germany.com/en/working/tax-and-social-security/tax-id", sourceType: "trusted_institution", publisher: "Make it in Germany", lastCheckedAt: "2026-05-15T00:00:00.000Z", city: null, workflow: { name: "Tax ID & ELSTER Registration", slug: "tax_id_elster" } },
  { id: "res-5", title: "N26 Bank Account Opening", url: "https://n26.com/en-eu", sourceType: "official_provider", publisher: "N26", lastCheckedAt: "2026-05-15T00:00:00.000Z", city: null, workflow: { name: "Banking Setup", slug: "banking" } },
  { id: "res-6", title: "Bundesnetzagentur - SIM Registration", url: "https://www.bundesnetzagentur.de/", sourceType: "official_government", publisher: "Bundesnetzagentur", lastCheckedAt: "2026-05-15T00:00:00.000Z", city: null, workflow: { name: "Mobile SIM Registration", slug: "mobile_sim" } },
  { id: "res-7", title: "DAAD - Health Insurance for Students", url: "https://www.daad.de/en/study-and-research-in-germany/health-insurance/", sourceType: "trusted_institution", publisher: "DAAD", lastCheckedAt: "2026-05-15T00:00:00.000Z", city: null, workflow: { name: "Health Insurance Onboarding", slug: "health_insurance" } },
  { id: "res-8", title: "Techniker Krankenkasse (TK) English Info", url: "https://www.tk.de/en", sourceType: "official_provider", publisher: "TK", lastCheckedAt: "2026-05-15T00:00:00.000Z", city: null, workflow: { name: "Health Insurance Onboarding", slug: "health_insurance" } },
  { id: "res-9", title: "Hannover Bürgeramt", url: "https://e-government.hannover-stadt.de/hannover/", sourceType: "official_government", publisher: "Hannover.de", lastCheckedAt: "2026-05-15T00:00:00.000Z", city: { name: "Hannover", slug: "hannover" }, workflow: { name: "Anmeldung (Address Registration)", slug: "anmeldung" } },
  { id: "res-10", title: "München Bürgerbüro", url: "https://www.muenchen.de/rathaus/terminvereinbarung.html", sourceType: "official_government", publisher: "Muenchen.de", lastCheckedAt: "2026-05-15T00:00:00.000Z", city: { name: "Munich", slug: "munich" }, workflow: { name: "Anmeldung (Address Registration)", slug: "anmeldung" } },
];
