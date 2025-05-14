import express, { Request, Response } from "express";
import { pool } from "../db";

const router = express.Router();

router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM events ORDER BY date DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    res.status(400).json({ message: "Invalid event ID" });
    return;
  }

  try {
    const eventResult = await pool.query("SELECT * FROM events WHERE id = $1", [
      id,
    ]);

    if (eventResult.rows.length === 0) {
      res.status(404).json({ message: "Event not found" });
      return;
    }

    const resultsResult = await pool.query(
      "SELECT * FROM results WHERE event_id = $1 ORDER BY placement ASC",
      [id]
    );

    const eventWithResults = {
      ...eventResult.rows[0],
      results: resultsResult.rows,
    };

    res.json(eventWithResults);
  } catch (err) {
    console.error("Error fetching event with results:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/", async (req: Request, res: Response): Promise<void> => {
  const { name, location, date, host } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO events (name, location, date, host)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, location, date, host]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error creating event:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
