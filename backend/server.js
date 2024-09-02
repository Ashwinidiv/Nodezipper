const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes.js");
const noteRoutes = require("./routes/noteRoutes.js");
const { notFound, errorHandler } = require("./middlewares/errorMiddlewares.js");
const path = require("path");

const app = express();
dotenv.config();
connectDB();

// Middleware to parse JSON requests
app.use(express.json());

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    credentials: true,
  })
);

// API routes
app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);

// Serve static files from the frontend build directory
app.use(express.static(path.join(__dirname, "/frontend/dist")));

// Catch-all route to serve the index.html for all other routes
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/frontend/dist/index.html"))
);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
