import React from "react";
import { LuDownload } from "react-icons/lu";
import moment from "moment";
import { addThousandSeperator, formatMomentDate } from "../../utils/helpers";
import FullTransactionInfoCard from "../../components/Cards/FullTransactionInfoCard";

function FullTransactionList({ transactions, onDownload }) {
  const transactionsData = transactions.FULL_INCOME_EXPENSE_TRANSACTIONS;
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Income Sources</h5>
        <button className="card-btn" onClick={onDownload}>
          <LuDownload className="text-base" /> Download
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1">
        {transactionsData?.map((transactions) => (
          <FullTransactionInfoCard
            key={transactions._id}
            title={
              transactions.source ? transactions.source : transactions.category
            }
            icon={transactions.icon}
            date={moment(transactions.date).format(formatMomentDate)}
            amount={addThousandSeperator(transactions.amount)}
            type={`${transactions.source ? "income" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}

export default FullTransactionList;
