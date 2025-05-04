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
        <h4 className="cursor-pointer bg-gray-50 hover:bg-teal-50 text-gray-500 text-xs font-medium  border m-2 border-gray-200/50 p-4 rounded-lg">
          Total Income
          <span className="w-full text-[1.1rem] block font-bold mt-0.5 text-teal-500">
            {" "}
            &#8358; {addThousandSeperator(totalIncome)}
          </span>
        </h4>
      </div>

      <CustomPieChart
        data={chartData}
        label="Total Income"
        totalAmount={` &#8358${totalIncome}`}
        showTextAnchor
        colors={COLORS}
      />
    </div>
  );
}

export default RecentIncomeWithChart;
