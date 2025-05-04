const jwt = require("jsonwebtoken");
const UserInfo = require("../models/UserInfo.js");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Register User
exports.registerUser = async (req, res) => {
  const { fullName, email, password, profileImageUrl } = req.body;
  // validation
  if (!fullName || !email || !password)
    return res.status(401).json({ message: "All fields are required" });

  // Check if a user exists
  try {
    const existingUser = await UserInfo.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create an account
    const user = await UserInfo.create({
      fullName,
      email,
      password,
      profileImageUrl,
    });

    res.status(201).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "please provide your email and password" });
  }
  try {
    const user = await UserInfo.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res
        .status(400)
        .json({ error: "Your Email or password is incorrect" });
    }
    res.status(200).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Loggin user", error: error.message });
  }
};

// get User info
exports.getUserInfo = async (req, res) => {
  try {
    const user = await UserInfo.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting user", error: error.message });
  }
};
