import React from "react";
import { useEffect, useState } from "react";
import { prepareExpenseBarChartData } from "../../utils/helpers";
import CustomBarChart from "../Charts/CustomBarChart";

function Last30DaysExpenses({ data }) {
  const [charData, setCharData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseBarChartData(data);

    setCharData(result);
    return () => {};
  }, [data]);

  return (
    <div className="card col-span-1 ">
      <div className="flex items-center justify-between">
        <h5 className="text-lg hover:text-teal-500">Last 30 Days Expenses</h5>
      </div>

      <CustomBarChart data={charData} />
    </div>
  );
}

export default Last30DaysExpenses;
