import Complaint from "../models/Complaint.js";
import User from "../models/Users.js";
import sendEmail from "../utils/sendEmail.js";

// CREATE
export const createComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.create({
      ...req.body,
      createdBy: req.user.id,
    });

    // send email
    const user = await User.findById(req.user.id);
    await sendEmail(user.email, "Complaint Submitted", "Your complaint is received.");

    res.json(complaint);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};


// GET USER COMPLAINTS
export const getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({
      createdBy: req.user.id,
    }).sort({ createdAt: -1 }); // 🔥 newest first

    res.json(complaints);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};