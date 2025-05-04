import React, { useEffect, useState } from "react";
import { prepareExpenseLineChartData } from "../../utils/helpers";
import { LuPlus } from "react-icons/lu";
import CustomLineChart from "./CustomLineChart";

function ExpenseOverview({ transactions, onAddExpense }) {
  const [chartData, setChartData] = useState([]);
  // console.log(transactions);
  const transactionsData = transactions.expense;

  useEffect(() => {
    const result = prepareExpenseLineChartData(transactionsData);
    setChartData(result);

    return () => {};
  }, [transactionsData]);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div className="">
          <h5 className="text-lg">Expense Overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            Track your spending overtime and gain insight into where your money
            goes
          </p>
        </div>
        <button className="add-btn" onClick={onAddExpense}>
          <LuPlus className="text-lg" />
          Add Expense
        </button>
      </div>
      <div className="mt-10">
        <CustomLineChart data={chartData} />
      </div>
    </div>
  );
}

export default ExpenseOverview;
