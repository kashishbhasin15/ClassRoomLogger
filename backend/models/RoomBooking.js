import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  roomNumber: String,
  buildingName: String,
  date: String,
  timeSlot: String,

  teacherName: String,
  subject: String,
  reason: String,

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },

  requestedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

export default mongoose.model("RoomBooking", bookingSchema);