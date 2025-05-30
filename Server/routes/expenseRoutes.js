const express = require("express");
const {
  addExpense,
  getAllExpense,
  downloadExpenseExcel,
  deleteExpense,
} = require("../controllers/expenseController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", protect, addExpense);
router.get("/get", protect, getAllExpense);
router.delete("/:id", protect, deleteExpense);
router.get("/download-excel", protect, downloadExpenseExcel);

module.exports = router;
