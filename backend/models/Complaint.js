import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
  roomNumber: String,
  buildingName: String,
  complaintType: String,
  urgencyLevel: String,
  date: String,
  timeSlot: String,
  description: String,

  status: {
    type: String,
    enum: ["pending", "in_progress", "resolved"],
    default: "pending"
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

export default mongoose.model("Complaint", complaintSchema);