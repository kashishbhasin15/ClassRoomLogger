import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

import bookingRoutes from "./routes/bookingRoutes.js";



dotenv.config();

const app = express();

// app.use(cors());

app.use(cors({
  origin: "*",
  credentials: true
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/bookings", bookingRoutes);

// connect DB
connectDB();

app.get("/", (req, res) => {
  res.send("API is running...");
});

// server
// app.listen(5000, () => console.log("Server running on port 5000"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


