const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  getFullTransactions,
  DownloadFullTransactionsPDF,
} = require("../controllers/fullTransactionsController");

const router = express.Router();

router.get("/get", protect, getFullTransactions);
router.get("/download", protect, DownloadFullTransactionsPDF);

module.exports = router;
