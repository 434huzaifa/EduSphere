import { migrate } from "drizzle-orm/neon-http/migrator";
import { db } from ".";
if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE URL MISSING")
}
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