import React from "react";
import { prepareFullTransactionsLineChartData } from "../../utils/helpers";
import { useEffect, useState } from "react";
import CustomBiaxialLineChart from "../../components/Charts/customBiaxialLineChart";

function FullTransactionOverview({ transactions }) {
  const [chartData, setChartData] = useState([]);

  const FullDataDestructed = transactions.FULL_INCOME_EXPENSE_TRANSACTIONS;

  useEffect(() => {
    // SORT THE DATA IN DATE
    const result = prepareFullTransactionsLineChartData(FullDataDestructed);
    setChartData(result);

    return () => {};
  }, [FullDataDestructed]);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div className="">
          <h5 className="text-lg">Full Transaction Overview</h5>
        </div>
      </div>
      <div className="mt-10">
        <CustomBiaxialLineChart data={chartData} />
      </div>
    </div>
  );
}

export default FullTransactionOverview;
