import express from "express";
import {
  createBooking,
  getAllBookings,
  updateBookingStatus,
  getMyBookings
} from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createBooking);
router.get("/", protect, getAllBookings);
router.put("/:id", protect, updateBookingStatus);
router.get("/my", protect, getMyBookings);

export default router;