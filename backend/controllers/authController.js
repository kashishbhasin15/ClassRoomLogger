


import User from "../models/Users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// 🔐 generate token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

// ================= SIGNUP =================
export const signup = async (req, res) => {
  try {
    // ✅ FIX: include missing fields
    let {
      name,
      email,
      password,
      role,
      institutionId,
      department
    } = req.body;

    // ✅ normalize input
    email = email.toLowerCase().trim();

    // ✅ validation
    if (!name || !email || !password || !role) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // ✅ check existing user
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // 🔐 hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ create user (SAFE)
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      institutionId: institutionId || "", // ✅ avoid undefined
      department: department || ""
    });

    // ❌ remove password from response
    user.password = undefined;

    res.status(201).json({
      token: generateToken(user._id, user.role),
      user,
    });

  } catch (err) {
    console.error("SIGNUP ERROR:", err); // 🔥 VERY IMPORTANT
    res.status(500).json({ msg: err.message });
  }
};

// ================= LOGIN =================
export const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    email = email.toLowerCase().trim();

    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    user.password = undefined;

    res.json({
      token: generateToken(user._id, user.role),
      user,
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ msg: err.message });
  }
};

// ================= ADMIN LOGIN =================
export const adminLogin = async (req, res) => {
  try {
    let { email, password } = req.body;

    email = email.toLowerCase().trim();

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(
        { id: "admin", role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      return res.json({ token, role: "admin" });
    }

    res.status(401).json({ msg: "Invalid admin credentials" });

  } catch (err) {
    console.error("ADMIN LOGIN ERROR:", err);
    res.status(500).json({ msg: err.message });
  }
};