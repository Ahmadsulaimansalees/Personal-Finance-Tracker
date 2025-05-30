import React from "react";
import { LuPlus } from "react-icons/lu";
import CustomBarChart from "../Charts/CustomBarChart";
import { prepareIncomeBarChartData } from "../../utils/helpers";
import { useEffect, useState } from "react";

function IncomeOverview({ transactions, onAddIncome }) {
  const [chartData, setChartData] = useState([]);
  // console.log(transactions);
  const transactionsData = transactions.income;

  useEffect(() => {
    const result = prepareIncomeBarChartData(transactionsData);
    setChartData(result);

    return () => {};
  }, [transactionsData]);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div className="">
          <h5 className="text-lg">Income Overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            Track your earnings overtime and analyze your income trend
          </p>
        </div>
        <button className="add-btn" onClick={onAddIncome}>
          <LuPlus className="text-lg" />
          Add Income
        </button>
      </div>
      <div className="mt-10">
        <CustomBarChart data={chartData} />
      </div>
    </div>
  );
}

export default IncomeOverview;
