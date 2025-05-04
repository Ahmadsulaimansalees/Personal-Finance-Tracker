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
        <h5 className="text-lg hover:text-teal-500">Financial Overview </h5>
        <h4 className="cursor-pointer bg-gray-50 hover:bg-teal-50 text-gray-500 text-xs font-medium  border m-2 border-gray-200/50 p-2 rounded-lg">
          Available Balance
          <span className="w-full text-[1.1rem] block font-bold mt-0.5 text-teal-500">
            {" "}
            &#8358; {addThousandSeperator(totalBalance)}
          </span>
        </h4>
      </div>

      <CustomPieChart
        data={balanceData}
        label="Total Balance"
        totalAmount={totalBalance}
        colors={COLORS}
        showTextAnchor
      />
    </div>
  );
}

export default FinanceOverview;
