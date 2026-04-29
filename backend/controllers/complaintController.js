// import Complaint from "../models/Complaint.js";
// import User from "../models/Users.js";
// import sendEmail from "../utils/sendEmail.js";

// // CREATE
// export const createComplaint = async (req, res) => {
//   try {
//     const complaint = await Complaint.create({
//       ...req.body,
//       createdBy: req.user.id,
//     });

//     // send email
//     const user = await User.findById(req.user.id);
//     await sendEmail(user.email, "Complaint Submitted", "Your complaint is received.");

//     res.json(complaint);
//   } catch (err) {
//     res.status(500).json({ err: err.message });
//   }
// };


// // GET USER COMPLAINTS
// export const getMyComplaints = async (req, res) => {
//   try {
//     const complaints = await Complaint.find({
//       createdBy: req.user.id,
//     }).sort({ createdAt: -1 }); // 🔥 newest first

//     res.json(complaints);
//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// };


















// import Complaint from "../models/Complaint.js";
// import User from "../models/Users.js";
// import sendEmail from "../utils/sendEmail.js";

// /* =========================
//    CREATE COMPLAINT
// ========================= */
// export const createComplaint = async (req, res) => {
//   try {
//     const {
//       roomNumber,
//       buildingName,
//       date,
//       complaintType,
//       urgencyLevel,
//       timeSlot,
//       description
//     } = req.body;

//     // 🔥 1. CHECK DUPLICATE (GLOBAL - ANY USER)
//     const existingComplaint = await Complaint.findOne({
//       roomNumber,
//       buildingName,
//       date
//     });

//     if (existingComplaint) {
//       return res.status(400).json({
//         msg: "Complaint already submitted for this room today ❌"
//       });
//     }

//     // 🔥 2. CREATE COMPLAINT
//     const complaint = await Complaint.create({
//       roomNumber,
//       buildingName,
//       complaintType,
//       urgencyLevel,
//       date,
//       timeSlot,
//       description,
//       createdBy: req.user.id,
//     });

//     // 🔥 3. SEND EMAIL (optional safe check)
//     const user = await User.findById(req.user.id);

//     if (user?.email) {
//       await sendEmail(
//         user.email,
//         "Complaint Submitted",
//         "Your complaint has been received successfully."
//       );
//     }

//     // 🔥 4. SUCCESS RESPONSE
//     res.status(201).json({
//       msg: "Complaint submitted successfully ✅",
//       complaint
//     });

//   } catch (err) {
//     console.error("Create Complaint Error:", err);

//     res.status(500).json({
//       msg: "Server error while submitting complaint ❌",
//       error: err.message
//     });
//   }
// };


// /* =========================
//    GET MY COMPLAINTS
// ========================= */
// export const getMyComplaints = async (req, res) => {
//   try {
//     const complaints = await Complaint.find({
//       createdBy: req.user.id,
//     }).sort({ createdAt: -1 }); // 🔥 newest first

//     res.status(200).json(complaints);

//   } catch (err) {
//     console.error("Get My Complaints Error:", err);

//     res.status(500).json({
//       msg: "Error fetching complaints ❌",
//       error: err.message
//     });
//   }
// };






















import Complaint from "../models/Complaint.js";
import User from "../models/Users.js";

/* =========================
   CREATE COMPLAINT
========================= */
export const createComplaint = async (req, res) => {
  try {
    const {
      roomNumber,
      buildingName,
      date,
      complaintType,
      urgencyLevel,
      timeSlot,
      description
    } = req.body;

    // ✅ VALIDATION (optional but good)
    if (!roomNumber || !buildingName || !date) {
      return res.status(400).json({
        msg: "Missing required fields ❌"
      });
    }

    // ✅ DUPLICATE CHECK
    const existingComplaint = await Complaint.findOne({
      roomNumber,
      buildingName,
      date
    });

    if (existingComplaint) {
      return res.status(400).json({
        msg: "Complaint already submitted for this room today ❌"
      });
    }

    // ✅ CREATE COMPLAINT
    const complaint = await Complaint.create({
      roomNumber,
      buildingName,
      complaintType,
      urgencyLevel,
      date,
      timeSlot,
      description,
      createdBy: req.user.id,
    });

    // ✅ FAST RESPONSE (NO BLOCKING)
    res.status(201).json({
      msg: "Complaint submitted successfully ✅",
      complaint
    });

  } catch (err) {
    console.error("Create Complaint Error:", err);

    res.status(500).json({
      msg: "Server error while submitting complaint ❌",
      error: err.message
    });
  }
};


/* =========================
   GET MY COMPLAINTS
========================= */
export const getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({
      createdBy: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json(complaints);

  } catch (err) {
    console.error("Get My Complaints Error:", err);

    res.status(500).json({
      msg: "Error fetching complaints ❌",
      error: err.message
    });
  }
};