import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import profileRoutes from "./routes/profile"; // Add the import for profile routes

const app = express();

app.use(cors());
app.use(express.json());

// Use the auth routes
app.use("/api/auth", authRoutes); // Adjust to ensure auth routes are prefixed with /api/auth

// Use the profile routes
app.use("/api", profileRoutes); // Profile routes are now handled under /api

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
