const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const pg = require("pg");
const dotenv = require("dotenv");

dotenv.config();

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL environment variable is missing.");
  }

  console.log("Initializing database connection pool...");
  const pool = new pg.Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  console.log("Starting database seeding...");

  // 1. Seed Cities
  const cities = [
    { name: "Berlin", slug: "berlin", federalState: "Berlin" },
    { name: "Munich", slug: "munich", federalState: "Bavaria" },
    { name: "Hamburg", slug: "hamburg", federalState: "Hamburg" },
    { name: "Cologne", slug: "cologne", federalState: "North Rhine-Westphalia" },
    { name: "Frankfurt", slug: "frankfurt", federalState: "Hesse" },
  ];

  console.log("Seeding cities...");
  const seededCities = [];
  for (const c of cities) {
    const record = await prisma.city.upsert({
      where: { slug: c.slug },
      update: { name: c.name, federalState: c.federalState },
      create: { name: c.name, slug: c.slug, federalState: c.federalState },
    });
    seededCities.push(record);
  }
  console.log(`Seeded ${seededCities.length} cities.`);

  // 2. Seed Workflows
  const workflows = [
    {
      slug: "mobile_sim",
      name: "Mobile SIM Registration",
      category: "Utility",
      shortDescription: "Get a local German phone number.",
      longDescription: "Obtaining a local German phone number (SIM or eSIM) is essential for receiving SMS two-factor authentication codes from banks, utilities, and public offices.",
      defaultOrder: 1,
      riskLevel: "low",
    },
    {
      slug: "banking",
      name: "Banking Setup",
      category: "Finance",
      shortDescription: "Open a SEPA bank account.",
      longDescription: "A German or SEPA-compatible bank account is necessary for standard life. Your salary is paid into it, rent is collected from it via direct debit, and insurance premiums are billed to it.",
      defaultOrder: 2,
      riskLevel: "medium",
    },
    {
      slug: "health_insurance",
      name: "Health Insurance Onboarding",
      category: "Mandatory Insurance",
      shortDescription: "Register with a health insurance provider.",
      longDescription: "German health insurance is legally mandatory for all residents. Employees must register, and students must show proof of insurance to matriculate at their universities.",
      defaultOrder: 3,
      riskLevel: "high",
    },
    {
      slug: "anmeldung",
      name: "Address Registration (Anmeldung)",
      category: "Official",
      shortDescription: "Register your address at the Bürgeramt.",
      longDescription: "Anmeldung is the process of registering your address with the local city registry. By law, this must be completed within 14 days of moving into a permanent flat or room.",
      defaultOrder: 4,
      riskLevel: "high",
    },
    {
      slug: "residence_permit",
      name: "Residence Permit",
      category: "Official",
      shortDescription: "Apply for work/study permit or Blue Card.",
      longDescription: "Non-EU citizens must apply for a residence permit (Aufenthaltstitel) or Blue Card at the Ausländerbehörde to live and work in Germany beyond their initial entry visa duration.",
      defaultOrder: 5,
      riskLevel: "high",
    },
    {
      slug: "tax_id_elster",
      name: "Tax ID & ELSTER Registration",
      category: "Taxes",
      shortDescription: "Obtain tax number and set up tax portal.",
      longDescription: "Your tax ID is issued automatically after your first address registration. Setting up ELSTER lets you submit tax declarations and request tax class updates.",
      defaultOrder: 6,
      riskLevel: "high",
    },
  ];

  console.log("Seeding workflows...");
  const seededWorkflows = {};
  for (const w of workflows) {
    const record = await prisma.workflow.upsert({
      where: { slug: w.slug },
      update: {
        name: w.name,
        category: w.category,
        shortDescription: w.shortDescription,
        longDescription: w.longDescription,
        defaultOrder: w.defaultOrder,
        riskLevel: w.riskLevel,
      },
      create: w,
    });
    seededWorkflows[w.slug] = record;
  }
  console.log(`Seeded ${Object.keys(seededWorkflows).length} workflows.`);

  // 3. Seed Content Sources (Example)
  console.log("Seeding content sources...");
  const officialSource = await prisma.contentSource.upsert({
    where: { id: "00000000-0000-0000-0000-000000000001" },
    update: {},
    create: {
      id: "00000000-0000-0000-0000-000000000001",
      title: "Berlin Service Portal - Anmeldung instructions",
      url: "https://service.berlin.de/dienstleistung/120686/",
      sourceType: "official_government",
      publisher: "State of Berlin",
    },
  });

  // 4. Seed Checklist Items (Anmeldung)
  const checklistItems = [
    {
      workflowId: seededWorkflows.anmeldung.id,
      title: "Secure a Bürgeramt appointment",
      description: "Appointments are hard to get. Refresh the booking page early in the morning or call 115.",
      itemType: "appointment",
      priority: "urgent",
      isRequired: true,
    },
    {
      workflowId: seededWorkflows.anmeldung.id,
      title: "Obtain Landlord Confirmation (Wohnungsgeberbestätigung)",
      description: "A signed document from your landlord confirming that you have moved into the flat.",
      itemType: "document",
      priority: "urgent",
      isRequired: true,
    },
    {
      workflowId: seededWorkflows.anmeldung.id,
      title: "Fill out the registration form (Anmeldeformular)",
      description: "Complete the registration form in German before your appointment.",
      itemType: "form",
      priority: "high",
      isRequired: true,
    },
  ];

  console.log("Seeding checklist items...");
  for (const item of checklistItems) {
    await prisma.checklistItem.create({
      data: item,
    });
  }

  // 5. Seed Glossary Terms
  const glossary = [
    { term: "Anmeldung", slug: "anmeldung", plainEnglishDefinition: "The mandatory process of registering your residential address with the local municipal registry office (Bürgeramt)." },
    { term: "Bürgeramt", slug: "buergeramt", plainEnglishDefinition: "The local municipal office or citizens' registration office." },
    { term: "Wohnungsgeberbestätigung", slug: "wohnungsgeberbestaetigung", plainEnglishDefinition: "Landlord Confirmation form, required for Anmeldung." },
    { term: "Steueridentifikationsnummer", slug: "steueridentifikationsnummer", plainEnglishDefinition: "Tax Identification Number (Tax ID). Unique 11-digit number assigned for life." },
  ];

  console.log("Seeding glossary terms...");
  for (const g of glossary) {
    await prisma.glossaryTerm.upsert({
      where: { slug: g.slug },
      update: { term: g.term, plainEnglishDefinition: g.plainEnglishDefinition },
      create: g,
    });
  }

  console.log("Database seeding completed successfully! 🎉");
  await pool.end();
}

main().catch((e) => {
  console.error("Seeding failed with error:", e);
  process.exit(1);
});
