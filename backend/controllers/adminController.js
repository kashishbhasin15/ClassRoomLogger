import Complaint from "../models/Complaint.js";
import User from "../models/Users.js";

// ALL complaints
export const getAllComplaints = async (req, res) => {
  // const complaints = await Complaint.find().populate("createdBy", "name email");
  const complaints = await Complaint.find()
  .populate("createdBy", "name email")
  .sort({ createdAt: -1 }); //newest first
  res.json(complaints);
};

// UPDATE status
export const updateStatus = async (req, res) => {
  const { status } = req.body;

  const complaint = await Complaint.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  res.json(complaint);
};

// DELETE complaint
export const deleteComplaint = async (req, res) => {
  await Complaint.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
};

// VIEW users
export const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};