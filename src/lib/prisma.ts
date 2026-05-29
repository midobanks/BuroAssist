import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const { Pool } = pg;

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL environment variable is missing.");
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

let prisma: PrismaClient;

try {
  prisma = createPrismaClient();
} catch {
  prisma = new Proxy({} as unknown as PrismaClient, {
    get(_, prop) {
      throw new Error(
        `DATABASE_URL is not configured. PrismaClient.${String(prop)} cannot be used. ` +
        "Set the DATABASE_URL environment variable to use database features."
      );
    },
  });
}

export default prisma;
