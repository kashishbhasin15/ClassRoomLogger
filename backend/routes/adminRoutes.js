import express from "express";
import {
  getAllComplaints,
  updateStatus,
  deleteComplaint,
  getUsers,
} from "../controllers/adminController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// router.get("/complaints", protect, authorize("admin"), getAllComplaints);
router.put("/complaints/:id", protect, authorize("admin"), updateStatus);
router.delete("/complaints/:id", protect, authorize("admin"), deleteComplaint);
router.get("/users", protect, authorize("admin"), getUsers);
router.get("/complaints", protect, authorize("admin"), getAllComplaints);

export default router;