const xlsx = require("xlsx");
const Income = require("../models/Income.js");
// Add Income
exports.addIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const { icon, source, amount, date } = req.body;

    if (!source || !amount || !date) {
      return res
        .status(400)
        .json({ error: "All fields are required except icons" });
    }

    const newIncome = new Income({
      userId,
      icon,
      source,
      amount,
      date: Date(date),
    });

    await newIncome.save();
    res.status(200).json({ newIncome });
  } catch (err) {
    res.status(500).json({ error: "an error occured adding income", err });
  }
};
// Get Income
exports.getAllIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const income = await Income.find({ userId }).sort({ date: -1 });
    res.status(200).json({ income });
  } catch (err) {
    res.status(500).json({ error: "error getting all income", err });
  }
};
// Delete document
exports.deleteIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    await Income.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "income deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "an error  occured", err });
  }
};

// Get Excel Income
exports.downloadIncomeExcel = async (req, res) => {
  const userId = req.user.id;
  try {
    const income = await Income.find({ userId }).sort({ date: -1 });

    // prepare data for excel

    const data = income.map((item) => ({
      Source: item.source,
      Amount: item.amount,
      Date: item.date,
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Income");
    xlsx.writeFile(wb, "Income_details.xlsx");
    res.download("income_details.xlsx");
  } catch (err) {
    res
      .status(500)
      .json({ error: "an error occured generating an xlsx sheet file", err });
  }
};
