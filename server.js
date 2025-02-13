// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const pool = require("./config/db"); // Import the database pool
const authRoutes = require("./routes/authRoutes");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test database connection
app.get("/api/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ message: "Database connection successful", time: result.rows[0].now });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Database connection failed" });
  }
});

// Routes
app.use("/api/auth", authRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});