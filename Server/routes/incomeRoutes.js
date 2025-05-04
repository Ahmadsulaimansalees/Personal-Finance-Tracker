const express = require("express");
const {
  addIncome,
  getAllIncome,
  downloadIncomeExcel,
  deleteIncome,
} = require("../controllers/incomeController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", protect, addIncome);
router.get("/get", protect, getAllIncome);
router.delete("/:id", protect, deleteIncome);
router.get("/download-excel", protect, downloadIncomeExcel);

module.exports = router;
