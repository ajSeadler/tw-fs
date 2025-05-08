/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/routes/favorites.ts
import dotenv from "dotenv";
dotenv.config();

import { Router, Request, Response, NextFunction } from "express";
import { pool } from "../db";
import jwt, { JwtPayload as DefaultJwtPayload } from "jsonwebtoken";

const router = Router();

// ——————————————————————————
// 1) Assert that JWT_SECRET is present
// ——————————————————————————
const JWT_SECRET = process.env.JWT_SECRET!;
if (!JWT_SECRET) {
  console.error("❌ Missing JWT_SECRET in environment");
  process.exit(1);
}

// ——————————————————————————
// 2) Define your own JwtPayload interface
// ——————————————————————————
interface JwtPayload extends DefaultJwtPayload {
  userId: number;
  email: string;
}

// ——————————————————————————
// 3) Middleware: authenticate & type-cast safely
// ——————————————————————————
function authenticate(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ error: "Missing or invalid Authorization header" });
    return;
  }

  const token = authHeader.slice(7); // remove "Bearer "
  try {
    // jwt.verify can return a string or object; we know ours is an object with userId/email
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    // Now TS knows decoded.userId and decoded.email exist
    req.user = { userId: decoded.userId, email: decoded.email };
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}

// Tell TS that Request may have a `.user` of that shape:
declare module "express-serve-static-core" {
  interface Request {
    user?: { userId: number; email: string };
  }
}

// ——————————————————————————
// 4) Apply the middleware to all favorites routes
// ——————————————————————————
router.use(authenticate);

// POST /api/favorites/:eventId
router.post("/:eventId", async (req, res): Promise<void> => {
  const eventId = Number(req.params.eventId);
  const userId = req.user!.userId;

  try {
    const result = await pool.query(
      `INSERT INTO favorites (user_id, event_id)
       VALUES ($1, $2)
       ON CONFLICT (user_id, event_id) DO NOTHING
       RETURNING *`,
      [userId, eventId]
    );

    if (result.rowCount === 0) {
      res.status(200).json({ message: "Already favorited." });
      return;
    }
    res.status(201).json({ message: "Favorited!", favorite: result.rows[0] });
  } catch (err: any) {
    console.error("Error in POST /api/favorites:", err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/favorites/:eventId
router.delete("/:eventId", async (req, res): Promise<void> => {
  const eventId = Number(req.params.eventId);
  const userId = req.user!.userId;

  try {
    const result = await pool.query(
      `DELETE FROM favorites
       WHERE user_id = $1 AND event_id = $2
       RETURNING *`,
      [userId, eventId]
    );
    if (result.rowCount === 0) {
      res.status(404).json({ error: "Favorite not found." });
      return;
    }
    res.json({ message: "Unfavorited!", favorite: result.rows[0] });
  } catch (err: any) {
    console.error("Error in DELETE /api/favorites:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/favorites
router.get("/", async (req, res): Promise<void> => {
  const userId = req.user!.userId;

  try {
    const { rows } = await pool.query(
      `SELECT e.*
       FROM events e
       JOIN favorites f ON f.event_id = e.id
       WHERE f.user_id = $1
       ORDER BY f.favorited_at DESC`,
      [userId]
    );
    res.json({ favorites: rows });
  } catch (err: any) {
    console.error("Error in GET /api/favorites:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
