import React from "react";
import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from "../../components/Cards/TransactionInfoCard";
import moment from "moment";
import { addThousandSeperator, formatMomentDate } from "../../utils/helpers";

function RecentIncome({ transactions, onSeeMore }) {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg hover:text-teal-500">Recent Income</h5>
        <button className="card-btn" onClick={onSeeMore}>
          {" "}
          See All <LuArrowRight className="text-base" />
        </button>
      </div>
      <div className="mt-6">
        {transactions?.slice(0, 5)?.map((item) => (
          <TransactionInfoCard
            key={item._id}
            title={item.source}
            icon={item.icon}
            date={moment(item.date).format(formatMomentDate)}
            amount={addThousandSeperator(item.amount)}
            type="income"
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
}

export default RecentIncome;
