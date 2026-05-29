import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import { mockCities, mockWorkflows, mockGlossaryTerms, mockResources } from "@/lib/mock-data";

const { Pool } = pg;

let prisma: PrismaClient;

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    return null;
  }

  const pool = new Pool({
    connectionString,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  });

  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
}

// Build a mock Prisma client that returns static seed data
function createMockPrisma(): PrismaClient {
  const mockFindMany = (data: unknown[]) => (() => Promise.resolve(data)) as any;
  const mockFindUnique = (data: unknown) => ((_args: unknown) => Promise.resolve(data)) as any;

  return {
    city: { findMany: mockFindMany(mockCities), findUnique: mockFindUnique(null) },
    workflow: {
      findMany: mockFindMany(mockWorkflows),
      findUnique: ((args: any) => {
        const workflow = mockWorkflows.find((w: any) => w.slug === args?.where?.slug);
        return Promise.resolve(workflow || null);
      }) as any,
    },
    workflowStep: { findMany: mockFindMany([]) },
    checklistItem: {
      findMany: mockFindMany([]),
      findUnique: mockFindUnique(null),
    },
    contentSource: { findMany: mockFindMany(mockResources) },
    glossaryTerm: {
      findMany: ((args: any) => {
        let terms = [...mockGlossaryTerms];
        if (args?.where?.OR) {
          const search = args.where.OR[0]?.term?.contains?.toLowerCase();
          if (search) {
            terms = terms.filter((t: any) =>
              t.term.toLowerCase().includes(search) ||
              t.plainEnglishDefinition.toLowerCase().includes(search)
            );
          }
        }
        return Promise.resolve(terms);
      }) as any,
    },
    user: { findUnique: mockFindUnique(null), create: mockFindUnique(null) },
    profile: {
      findUnique: mockFindUnique(null),
      upsert: ((_args: unknown) => Promise.resolve({ id: "mock-id", onboardingCompletedAt: null })) as any,
    },
    userWorkflow: { findMany: mockFindMany([]), findUnique: mockFindUnique(null), upsert: ((_args: unknown) => Promise.resolve({})) as any, create: mockFindUnique(null) },
    userChecklistItem: { findMany: mockFindMany([]), upsert: ((_args: unknown) => Promise.resolve({})) as any },
    reminder: { findMany: mockFindMany([]), create: mockFindUnique(null), findUnique: mockFindUnique(null), update: mockFindUnique(null) },
    feedback: { create: mockFindUnique(null) },
    $transaction: ((cb: any) => cb(createMockPrisma())) as any,
    $disconnect: () => Promise.resolve(),
  } as unknown as PrismaClient;
}

const realClient = createPrismaClient();
prisma = realClient ?? createMockPrisma();

export default prisma;
