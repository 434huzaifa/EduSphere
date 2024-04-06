import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";
import dotenv from "dotenv"
dotenv.config()
if (process.env.DATABASE_URL==null) {
    throw new Error("Database URL MISSING")
}
const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql, {
	schema,logger:true
});