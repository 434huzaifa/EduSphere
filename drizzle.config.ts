import {defineConfig} from "drizzle-kit"
import dotenv from "dotenv"
dotenv.config()
if (process.env.DATABASE_URL==null) {
    throw new Error("Database URL MISSING")
}
export default defineConfig({
    schema:"./src/db/schema.ts",
    out:"./src/db/migrations",
    driver:"pg",
    dbCredentials:{
        connectionString:process.env.DATABASE_URL
    },
    verbose:true,
    strict:true
})