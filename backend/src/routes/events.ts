// routes/events.ts
import express from "express";
import { pool } from "../db";

const router = express.Router();

// GET /api/events
router.get("/", async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM events ORDER BY date DESC");
  res.json(rows);
});

// POST /api/events
router.post("/", async (req, res) => {
  const { name, location, date, host } = req.body;
  const result = await pool.query(
    "INSERT INTO events (name, location, date, host) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, location, date, host]
  );
  res.status(201).json(result.rows[0]);
});

export default router;
