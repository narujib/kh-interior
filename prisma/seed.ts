import { config } from "dotenv";
config({ path: ".env.local" });
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcryptjs from "bcryptjs";

async function main() {
  const pool = new Pool({
    connectionString: process.env.DIRECT_URL ?? process.env.DATABASE_URL,
  });

  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    const existingAdmin = await prisma.admin.findFirst();

    if (existingAdmin) {
      console.log("✓ Admin already exists — skipping seed.");
      return;
    }

    const username = process.env.ADMIN_USERNAME;
    const password = process.env.ADMIN_PASSWORD;

    if (!username || !password) {
      throw new Error(
        "ADMIN_USERNAME and ADMIN_PASSWORD must be set in environment variables."
      );
    }

    const passwordHash = await bcryptjs.hash(password, 12);

    await prisma.admin.create({
      data: { username, passwordHash },
    });

    console.log(`✓ Admin created: ${username}`);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
