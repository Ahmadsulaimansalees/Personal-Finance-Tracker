const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  getFullTransactions,
  DownloadFullTransactions,
} = require("../controllers/fullTransactionsController");

const router = express.Router();

router.get("/get", protect, getFullTransactions);
router.get("/download", protect, DownloadFullTransactions);

module.exports = router;
