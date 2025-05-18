import React from "react";
import CustomPieChart from "../../components/Charts/CustomPieChart";
import { addThousandSeperator } from "../../utils/helpers";

const COLORS = ["#875CF5", "#078cdf", "#FF6900"];

function FinanceOverview({ totalBalance, totalIncome, totalExpense }) {
  const balanceData = [
    { name: "Total Balance", amount: totalBalance },
    { name: "Total Income", amount: totalIncome },
    { name: "Total Expenses", amount: totalExpense },
  ];
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg hover:text-teal-500">Financial Overview</h5>
      </div>

      <CustomPieChart
        data={balanceData}
        label="Total Balance"
        totalAmount={totalBalance}
        colors={COLORS}
        showTextAnchor={true}
      />
    </div>
  );
}

export default FinanceOverview;
