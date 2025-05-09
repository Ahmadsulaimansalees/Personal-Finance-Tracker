const Income = require("../models/Income");
const Expense = require("../models/Expense");
const xlsx = require("xlsx");

const { isValidObjectid, Types } = require("mongoose");

// Dashboard data
exports.getFullTransactions = async (req, res) => {
  try {
    const userId = req.user.id;
    const userObjectId = new Types.ObjectId(String(userId));

    // GET ALL INCOME AND EXPENSE TRANSACTIONS FOR THE PAST 1year
    const last1YearIncome = await Income.find({
      userId,
      date: { $gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });
    const last1YearExpense = await Expense.find({
      userId,
      date: { $gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    const last1yearIncomeAndExpenseTransactions = [
      ...last1YearExpense,
      ...last1YearIncome,
    ];

    const sorted1YearData = last1yearIncomeAndExpenseTransactions
      .sort((a, b) => {
        if ((a.date, b.date)) {
          return new Date(a.date) - new Date(b.date);
        } else {
          if (a.category && !b.category) return -1;

          if (!a.category && b.category) return 1;

          return 0;
        }
      })
      .reverse();
    const FULL_INCOME_EXPENSE_TRANSACTIONS = sorted1YearData;
    res.json({
      FULL_INCOME_EXPENSE_TRANSACTIONS,
    });
  } catch (error) {
    console.log("an error occured fetching all transactions", error);
  }
};

exports.DownloadFullTransactions = async (req, res) => {
  try {
    const userId = req.user.id;
    const userObjectId = new Types.ObjectId(String(userId));

    // GET ALL INCOME AND EXPENSE TRANSACTIONS FOR THE PAST 1year
    const last1YearIncome = await Income.find({
      userId,
      date: { $gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });
    const last1YearExpense = await Expense.find({
      userId,
      date: { $gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    const last1yearIncomeAndExpenseTransactions = [
      ...last1YearExpense,
      ...last1YearIncome,
    ];

    const sorted1YearData = last1yearIncomeAndExpenseTransactions.sort(
      (a, b) => {
        new Date(a.date) - new Date(b.date);
      }
    );

    const data = sorted1YearData.map((item) => ({
      Category: item?.category || "-",
      Source: item?.source || "-",
      Amount: item.amount,
      Date: item.date,
      Icon: item.ncon,
    }));

    res.json({
      FULL_INCOME_EXPENSE_TRANSACTIONS: data,
    });

    // const wb = xlsx.utils.book_new();
    // const ws = xlsx.utils.json_to_sheet(data);
    // xlsx.utils.book_append_sheet(wb, ws, "Income");
    // xlsx.writeFile(wb, "Full_Income-Expense-data.xlsx");
    // res.download("Full_Income-Expense-data.xlsx");
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "an error occured generating an xlsx sheet file", err });
  }
};
