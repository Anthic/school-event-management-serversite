const User = require("../models/User");
const { hashPassword, verifyPassword } = require("../utils/hashUtils");
const crypto = require("crypto");

exports.register = async (req, res) => {
  const { name, email, password, photoURL } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const { hashedPassword, salt } = hashPassword(password);
    const user = new User({
      name,
      email,
      hashedPassword,
      salt,
      photoURL,
    });
    await user.save();
    return res
      .status(201)
      .json({ ok: true, message: "User created successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ ok: false, message: "Server error", error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ ok: false, message: "Invalid credentials" });

    const valid = verifyPassword(password, user.hashedPassword, user.salt);
    if (!valid)
      return res
        .status(400)
        .json({ ok: false, message: "Invalid credentials" });

    const token = crypto.randomBytes(32).toString("hex");
    user.token = token;
    await user.save();

    res.json({
      ok: true,
      message: "Login successful",
      user: { name: user.name, email: user.email, photoURL: user.photoURL },
      token,
    });
  } catch (err) {
    res
      .status(500)
      .json({ ok: false, message: "Server error", error: err.message });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = req.user;
    res.json({
      ok: true,
      user: { name: user.name, email: user.email, photoURL: user.photoURL },
    });
  } catch (err) {
    console.error("GetMe error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

