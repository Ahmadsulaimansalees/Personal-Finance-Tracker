import React from "react";
import { LuDownload } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import moment from "moment";
import { addThousandSeperator, formatMomentDate } from "../../utils/helpers";

function ExpenseList({ transactions, onDelete }) {
  const transactionsData = transactions.expense;
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Expense List</h5>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {transactionsData?.map((expense) => (
          <TransactionInfoCard
            key={expense._id}
            title={expense.source}
            icon={expense.icon}
            date={moment(expense.date).format(formatMomentDate)}
            amount={addThousandSeperator(expense.amount)}
            type={"expense"}
            onDelete={() => onDelete(expense._id)}
          />
        ))}
      </div>
    </div>
  );
}

export default ExpenseList;
