import { neon, NeonQueryFunction } from "@neondatabase/serverless";

export function getDb(): NeonQueryFunction<false, false> | null {
  const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!connectionString) {
    return null;
  }
  return neon(connectionString);
}
