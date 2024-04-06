import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";
console.log("DATABASE_URL",process.env.DATABASE_URL);
if (process.env.DATABASE_URL==null) {
    throw new Error("Database URL MISSING")
}
const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql, {
	schema,
});