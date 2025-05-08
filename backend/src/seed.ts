import dotenv from "dotenv";
import { pool } from "./db";
import { eventsData } from "./eventsData"; // Import the event data

dotenv.config();

async function seed(): Promise<void> {
  // Drop existing tables (cascading dependencies)
  await pool.query(`
    DROP TABLE IF EXISTS results CASCADE;
    DROP TABLE IF EXISTS events CASCADE;
    DROP TABLE IF EXISTS users CASCADE;
    DROP TABLE IF EXISTS favorites CASCADE;

    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      username TEXT,
      first_name TEXT,
      last_name TEXT,
      bio TEXT,
      location TEXT,
      profile_picture TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE events (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      location TEXT,
      date DATE,
      host TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE results (
      id SERIAL PRIMARY KEY,
      event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
      skater_name TEXT NOT NULL,
      placement INTEGER,
      score DECIMAL,
      country TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE favorites (
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
      favorited_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (user_id, event_id)
    );
  `);

  // Seed events and results using the imported data
  for (const event of eventsData) {
    // Insert event data
    const result = await pool.query(
      `INSERT INTO events (name, location, date, host) 
       VALUES ($1, $2, $3, $4) RETURNING id`,
      [event.name, event.location, event.date, event.host]
    );
    const eventId = result.rows[0].id;

    // Insert corresponding results
    for (const resultData of event.results) {
      await pool.query(
        `INSERT INTO results (event_id, skater_name, placement, score, country) 
         VALUES ($1, $2, $3, $4, $5)`,
        [
          eventId,
          resultData.skater_name,
          resultData.placement,
          resultData.score,
          resultData.country,
        ]
      );
    }
  }

  console.log("✅ Database seeded.");
  await pool.end();
  process.exit(0);
}

seed().catch((err: Error) => {
  console.error("❌ Seeding error:", err);
  process.exit(1);
});
