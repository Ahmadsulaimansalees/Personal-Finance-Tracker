import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import CustomPieChart from "../Charts/CustomPieChart";
import { addThousandSeperator } from "../../utils/helpers";

const COLORS = ["#875CF5", "#FA2C37", "#FF6900", "#4F39F6"];

function RecentIncomeWithChart({ data, totalIncome }) {
  const [chartData, setChartData] = useState([]);

  const prepareChartData = () => {
    const dataArr = data?.map((item) => ({
      name: item?.source,
      amount: item?.amount,
    }));

    setChartData(dataArr);
  };

  useEffect(() => {
    prepareChartData();
    return () => {};
  }, [data]);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg hover:text-teal-500">Last 60 Days Income</h5>
      </div>

      <CustomPieChart
        data={chartData}
        label="Total Income"
        totalAmount={totalIncome}
        showTextAnchor={true}
        colors={COLORS}
      />
    </div>
  );
}

export default RecentIncomeWithChart;
