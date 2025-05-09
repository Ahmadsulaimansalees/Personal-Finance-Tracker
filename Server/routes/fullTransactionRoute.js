const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  getFullTransactions,
  DownloadFullTransactions,
} = require("../controllers/fullTransactionsController");
const { DownloadPDFSummary } = require("../controllers/pdfGenerator");

const router = express.Router();

router.get("/get", protect, getFullTransactions);
router.get("/download", protect, DownloadFullTransactions);
router.get("/download-pdf", protect, DownloadPDFSummary);

module.exports = router;
