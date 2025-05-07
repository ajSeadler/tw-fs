/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router, Response } from "express";
import { pool } from "../db";
import { authenticateToken, AuthRequest } from "../middleware/authenticate";

const router = Router();

// Function to get the current user profile
const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    res.setHeader("Cache-Control", "no-store");

    const userId = req.user!.userId;

    const { rows } = await pool.query(
      `SELECT id, username, email, first_name, last_name, bio, location, profile_picture, created_at
       FROM users
       WHERE id = $1`,
      [userId]
    );

    if (!rows[0]) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.status(200).json({ user: rows[0] });
  } catch (err: any) {
    console.error("Error in GET /api/me:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to update the user profile
const updateProfile = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const { username, first_name, last_name, bio, location, profile_picture } =
    req.body;
  const userId = req.user!.userId;

  try {
    await pool.query(
      `UPDATE users
       SET username = $1,
           first_name = $2,
           last_name = $3,
           bio = $4,
           location = $5,
           profile_picture = $6
       WHERE id = $7`,
      [username, first_name, last_name, bio, location, profile_picture, userId]
    );

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (err: any) {
    console.error("Error in PUT /api/me:", err);
    res.status(500).json({ error: "Failed to update profile" });
  }
};

// Define the routes
router.get("/me", authenticateToken, getMe);
router.put("/me", authenticateToken, updateProfile);

export default router;
