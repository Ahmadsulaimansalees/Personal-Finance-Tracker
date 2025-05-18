import React from "react";
import { LuDownload } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import moment from "moment";
import { addThousandSeperator, formatMomentDate } from "../../utils/helpers";

function IncomeList({ transactions, onDelete, onDownload }) {
  const transactionsData = transactions.income;
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Income List</h5>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {transactionsData?.map((income) => (
          <TransactionInfoCard
            key={income._id}
            title={income.source}
            icon={income.icon}
            date={moment(income.date).format(formatMomentDate)}
            amount={addThousandSeperator(income.amount)}
            type={"income"}
            onDelete={() => onDelete(income._id)}
          />
        ))}
      </div>
    </div>
  );
}

export default IncomeList;
