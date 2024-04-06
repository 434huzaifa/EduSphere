import { migrate } from "drizzle-orm/neon-http/migrator";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv"
dotenv.config()
if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE URL MISSING")
}
const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);
const main = async () => {
	try {
		await migrate(db, {
			migrationsFolder: "src/db/migrations",
		});

		console.log("Migration successful");
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

main();