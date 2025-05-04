const express = require("express");

const {
  registerUser,
  loginUser,
  getUserInfo,
} = require("../controllers/authControllers");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/getUser", protect, getUserInfo);

router.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const imageUrl = `${req.protocol}://${req.headers.host}/uploads/${req.file.filename}`;
  res.status(200).json({ imageUrl });
});

module.exports = router;
