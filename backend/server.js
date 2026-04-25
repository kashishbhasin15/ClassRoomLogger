// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import connectDB from "./config/db.js";
// import authRoutes from "./routes/authRoutes.js";
// import complaintRoutes from "./routes/complaintRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js";

// import bookingRoutes from "./routes/bookingRoutes.js";



// dotenv.config();

// const app = express();

// // app.use(cors());

// app.use(cors({
//   origin: "https://class-room-logger.vercel.app/",
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true
// }));
// // app.options('/*', cors());

// app.use(express.json());

// app.use("/api/auth", authRoutes);
// app.use("/api/complaints", complaintRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/bookings", bookingRoutes);

// // connect DB
// connectDB();

// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

// // server
// // app.listen(5000, () => console.log("Server running on port 5000"));

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

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

/* =======================
   ✅ CORS CONFIG (FIXED)
======================= */
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like Postman)
    if (!origin) return callback(null, true);

    // allow all Vercel deployments (main + preview)
    if (origin.includes("vercel.app")) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

/* =======================
   ✅ MIDDLEWARE
======================= */
app.use(express.json());

/* =======================
   ✅ ROUTES
======================= */
app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/bookings", bookingRoutes);

/* =======================
   ✅ ROOT ROUTE
======================= */
app.get("/", (req, res) => {
  res.send("API is running...");
});

/* =======================
   ✅ DATABASE
======================= */
connectDB();

/* =======================
   ✅ SERVER START
======================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


app.get("/test", (req, res) => {
  res.send("Backend is working ✅");
});