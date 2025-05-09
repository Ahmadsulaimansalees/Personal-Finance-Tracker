import React from "react";
import moment from "moment";
import { addThousandSeperator, formatMomentDate } from "../../utils/helpers";
import FullTransactionInfoCard from "../../components/Cards/FullTransactionInfoCard";
import DownloadPdf from "./PdfCard";
import PdfDownloadButton from "./PdfDownwloadButton";
import XlsxDownloadCard from "./XlsxDownloadCard";

function FullTransactionList({ transactions, userData }) {
  const transactionsData = transactions.FULL_INCOME_EXPENSE_TRANSACTIONS;
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Full Transactions</h5>{" "}
        <div className="flex justify-between">
          <PdfDownloadButton
            userData={userData.user}
            transactionsData={transactions}
          />
          <XlsxDownloadCard
            userData={userData.user}
            transactionsData={transactions}
          />
        </div>
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
