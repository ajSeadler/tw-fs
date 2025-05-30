/* eslint-disable @typescript-eslint/no-explicit-any */
// src/routes/auth.ts
import dotenv from "dotenv";
dotenv.config();

import { Router, Request, Response } from "express";
import { pool } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();

// Ensure JWT secret is set
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error("❌ Missing JWT_SECRET in environment");
  process.exit(1);
}

// POST /api/register
router.post("/register", async (req: Request, res: Response): Promise<void> => {
  const { firstName, lastName, email, password } = req.body;

  // Validation
  if (!firstName || !lastName || !email || !password) {
    res.status(400).json({
      error: "First name, last name, email, and password are required",
    });
    return;
  }

  try {
    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Insert user into database
    const { rows } = await pool.query(
      `INSERT INTO users (email, password, first_name, last_name)
       VALUES ($1, $2, $3, $4)
       RETURNING id, email, first_name, last_name, created_at`,
      [email, hashed, firstName, lastName]
    );
    const user = rows[0];

    // Create JWT token
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send the response with the user and token
    res.status(201).json({ user, token });
  } catch (err: any) {
    console.error("Error in /api/register:", err);
    if (err.code === "23505") {
      // Duplicate email error
      res.status(409).json({ error: "Email already registered" });
    } else {
      // Internal server error
      res.status(500).json({ error: err.message });
    }
  }
});

// POST /api/login
router.post("/login", async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: "Email and password required" });
    return;
  }

  try {
    const { rows } = await pool.query(
      "SELECT id, email, password FROM users WHERE email = $1",
      [email]
    );
    const user = rows[0];
    if (!user) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    // Sign a JWT
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1w",
    });

    res.json({
      user: { id: user.id, email: user.email },
      token,
    });
  } catch (err: any) {
    console.error("Error in /api/login:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
