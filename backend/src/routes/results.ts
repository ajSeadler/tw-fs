import express from "express";
import { pool } from "../db";

const router = express.Router();

// GET results for a specific event
router.get("/:eventId", async (req, res) => {
  const { eventId } = req.params;
  const { rows } = await pool.query(
    "SELECT * FROM results WHERE event_id = $1 ORDER BY placement ASC",
    [eventId]
  );
  res.json(rows);
});

// POST new result
router.post("/", async (req, res) => {
  const { event_id, skater_name, placement, score, country } = req.body;
  const result = await pool.query(
    `INSERT INTO results (event_id, skater_name, placement, score, country)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [event_id, skater_name, placement, score, country]
  );
  res.status(201).json(result.rows[0]);
});

export default router;
