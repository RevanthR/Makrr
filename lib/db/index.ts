import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const globalForDb = globalThis as unknown as { db: ReturnType<typeof drizzle> | undefined };

export function getDb() {
  const connectionString = process.env.POSTGRES_URL;
  if (!connectionString) {
    throw new Error("POSTGRES_URL is not set");
  }
  if (globalForDb.db) return globalForDb.db;
  const client = postgres(connectionString, { max: 1 });
  globalForDb.db = drizzle(client, { schema });
  return globalForDb.db;
}
