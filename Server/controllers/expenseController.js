const xlsx = require("xlsx");
const Expense = require("../models/Expense.js");
// Add Expense
exports.addExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const { icon, category, amount, date } = req.body;

    if (!category || !amount || !date) {
      return res
        .status(400)
        .json({ error: "All fields are required except icons" });
    }

    const newExpense = new Expense({
      userId,
      icon,
      category,
      amount,
      date: new Date(date), // <-- Correct way
    });

    await newExpense.save();
    res.status(200).json({ newExpense });
  } catch (err) {
    res.status(500).json({ error: "an error occured adding Expense", err });
  }
};
// Get Expense
exports.getAllExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });
    res.status(200).json({ expense });
  } catch (err) {
    res.status(500).json({ error: "error getting all Expense", err });
  }
};
// Delete document
exports.deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "an error  occured", err });
  }
};

// Get Excel Expense
exports.downloadExpenseExcel = async (req, res) => {
  const userId = req.user.id;
  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });

    // prepare data for excel

    const data = expense.map((item) => ({
      Category: item.category,
      Amount: item.amount,
      Date: item.date,
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Expense");
    xlsx.writeFile(wb, "Expense_details.xlsx");
    res.download("expense_details.xlsx");
  } catch (err) {
    res
      .status(500)
      .json({ error: "an error occured generating an xlsx sheet file", err });
  }
};
