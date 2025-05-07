import dotenv from "dotenv";
import { pool } from "./db";

dotenv.config();

async function seed(): Promise<void> {
  await pool.query(`
    DROP TABLE IF EXISTS users;
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      username TEXT,
      first_name TEXT,
      last_name TEXT,
      bio TEXT,
      location TEXT,
      profile_picture TEXT,  -- Store URL or path to the profile picture
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `);

  console.log("✅ Database seeded.");
  await pool.end();
  process.exit(0);
}

seed().catch((err: Error) => {
  console.error("❌ Seeding error:", err);
  process.exit(1);
});
