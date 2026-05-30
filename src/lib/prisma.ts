import { mockCities, mockWorkflows, mockGlossaryTerms, mockResources } from "@/lib/mock-data";

function createMockPrisma() {
  const promise = <T>(data: T) => () => Promise.resolve(data);

  return {
    city: { findMany: promise(mockCities) },
    workflow: {
      findMany: promise(mockWorkflows),
      findUnique: (args: any) => {
        const slug = args?.where?.slug;
        const wf = mockWorkflows.find((w: any) => w.slug === slug) || null;
        return Promise.resolve(wf);
      },
    },
    checklistItem: { findMany: promise([]) },
    contentSource: { findMany: promise(mockResources) },
    glossaryTerm: {
      findMany: (args: any) => {
        let terms = [...mockGlossaryTerms];
        if (args?.where?.OR) {
          const search = args.where.OR[0]?.term?.contains?.toLowerCase();
          if (search) terms = terms.filter((t: any) =>
            t.term.toLowerCase().includes(search) ||
            t.plainEnglishDefinition.toLowerCase().includes(search)
          );
        }
        return Promise.resolve(terms);
      },
    },
    user: {
      findUnique: (args: any) => {
        const email = args?.where?.email;
        if (email) {
          return Promise.resolve({
            id: "demo-user-id",
            name: "Demo User",
            email,
            passwordHash: "$2b$12$4yzbToVcnN/XdTPfOTUA1uuvhIHObaJPgi/RV4GjcHEH104Cy9LMq",
            role: "user",
          });
        }
        return Promise.resolve(null);
      },
      create: promise({ id: "demo-user-id", name: "", email: "" }),
    },
    profile: { findUnique: promise(null), upsert: promise({}), create: promise({}) },
    userWorkflow: { findMany: promise([]), upsert: promise({}), create: promise({}) },
    userChecklistItem: { findMany: promise([]), upsert: promise({}) },
    reminder: { findMany: promise([]), create: promise({}), update: promise({}) },
    feedback: { create: promise({}) },
    $transaction: (cb: any) => cb(createMockPrisma()),
    $disconnect: () => Promise.resolve(),
  } as any;
}

let prisma: any = null;

async function initPrisma() {
  if (prisma) return prisma;

  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    prisma = createMockPrisma();
    return prisma;
  }

  try {
    const { PrismaClient } = await import("@prisma/client");
    const { PrismaPg } = await import("@prisma/adapter-pg");
    const pg = await import("pg");

    const { Pool } = pg.default || pg;
    const pool = new Pool({ connectionString, max: 10, idleTimeoutMillis: 30000, connectionTimeoutMillis: 5000 });
    const adapter = new PrismaPg(pool);
    prisma = new PrismaClient({ adapter });
  } catch {
    prisma = createMockPrisma();
  }

  return prisma;
}

// Initialize synchronously with mock for immediate use
// Real Prisma will be loaded lazily if DATABASE_URL is set
prisma = createMockPrisma();

// Fire and forget: upgrade to real Prisma if available
if (process.env.DATABASE_URL) {
  initPrisma().catch(() => {});
}

export default prisma;
