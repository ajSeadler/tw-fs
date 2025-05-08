import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth";
import profileRoutes from "./routes/profile";
import eventRoutes from "./routes/events";
import resultRoutes from "./routes/results";
import favoritesRoutes from "./routes/favorites"; // ← import it

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", profileRoutes);

app.use("/api/events", eventRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/favorites", favoritesRoutes); // ← mount it

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
