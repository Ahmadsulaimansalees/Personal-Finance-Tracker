import React from "react";
import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";
import { addThousandSeperator, formatMomentDate } from "../../utils/helpers";

function ExpenseTransactions({ transactions, onSeeMore }) {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg hover:text-teal-500">Recent Expenses</h5>
        <button className="card-btn" onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />
        </button>
      </div>
      <div className="mt-6">
        {Array.isArray(transactions) &&
          transactions
            .slice(0, 5)
            .map((expense) => (
              <TransactionInfoCard
                key={expense._id}
                title={expense.category}
                icon={expense.icon}
                date={moment(expense.date).format(formatMomentDate)}
                amount={addThousandSeperator(expense.amount)}
                type="expense"
                hideDeleteBtn
              />
            ))}
      </div>
    </div>
  );
}

export default ExpenseTransactions;
