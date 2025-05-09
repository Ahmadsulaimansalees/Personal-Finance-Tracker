const Income = require("../models/Income");
const Expense = require("../models/Expense");

const { isValidObjectid, Types } = require("mongoose");

// Dashboard data
exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;
    const userObjectId = new Types.ObjectId(String(userId));

    // fetch income & expenses
    const totalIncome = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // fetch income & expenses
    const totalExpense = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    //  get incmome  transaction in last 60 days

    const last60DaysIncome = await Income.find({
      userId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    // get expense  transaction in last 60 days

    const last60DaysExpense = await Expense.find({
      userId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    // fetch last 30 days income & expense transactions
    const last30DaysExpense = await Expense.find({
      userId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    });
    // fetch last 30 days income & expense transactions
    const last30DaysIncome = await Income.find({
      userId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    // last 30 days expense transactions summation

    const last30DaysIncomeSum = last30DaysIncome.reduce(
      (acc, item) => acc + item.amount,
      0
    );

    // last 30 days expense transactions summation

    const last30DaysExpenseSum = last30DaysExpense.reduce(
      (acc, item) => acc + item.amount,
      0
    );

    //  fetch last 5 tranasactions income & expense
    const last5Transactions = [
      ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(
        (txn) => ({
          ...txn.toObject(),
          type: "income",
        })
      ),
      ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(
        (txn) => ({
          ...txn.toObject(),
          type: "expense",
        })
      ),
    ].sort((a, b) => b.date - a.date); // sort latest first

    // RETURNING ALL NECESSARY DATA IN JSON FORMAT

    res.json({
      totalBalance:
        (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),

      totalIncome: totalIncome[0]?.total || 0,
      totalExpense: totalExpense[0]?.total || 0,
      last60DaysExpense: last60DaysExpense,
      last60DaysIncome: last60DaysIncome,
      last30daysExpenses: {
        total: last30DaysExpenseSum,
        transactions: last60DaysExpense,
      },
      last30daysIncome: {
        total: last30DaysIncomeSum,
        transactions: last60DaysIncome,
      },
      recentTransactions: last5Transactions,
    });
  } catch (err) {
    res.status(500).json({ error: "an error occurred", err });
  }
};
