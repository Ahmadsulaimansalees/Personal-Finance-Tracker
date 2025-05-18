import React from "react";
import * as XLSX from "xlsx";
import moment from "moment";
import { addThousandSeperator } from "../../utils/helpers";
import { FiDownload } from "react-icons/fi";
import toast from "react-hot-toast";

/**
 * Generates and downloads an XLSX summary of income transactions.
 * @param {Object} props
 * @param {Array} props.transactions - Array of income transactions
 */
const IncomeXlsxCard = ({ transactions = [] }) => {
  const transactionData = transactions.income;
  const handleDownload = () => {
    try {
      // Calculate total income
      let totalIncome = 0;
      transactionData.forEach((transaction) => {
        totalIncome += Number(transaction.amount) || 0;
      });

      // Prepare summary sheet data
      const summarySheet = [
        ["Personal Finance Tracker - Income Summary"],
        [],
        ["Date Generated", moment().format("Do MMM YYYY, hh:mm A")],
        [],
        ["Total Income", `NGN ${addThousandSeperator(totalIncome)}`],
        [],
      ];

      // Prepare transactionData table
      const tableHeader = ["Date", "Source", "Amount"];
      const tableRows = transactionData.map((t) => [
        moment(t.date).format("Do MMM YYYY"),
        t.source,
        `NGN ${addThousandSeperator(t.amount)}`,
      ]);

      // Combine all for worksheet
      const wsData = [...summarySheet, tableHeader, ...tableRows];

      // Create worksheet and workbook
      const ws = XLSX.utils.aoa_to_sheet(wsData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Income Summary");

      // Download
      XLSX.writeFile(
        wb,
        `Income_Summary_${moment().format("YYYY-MM-DD_HH-mm")}.xlsx`
      );
      toast.success("Income XLSX downloaded!");
    } catch (error) {
      toast.error("Failed to generate XLSX");
      console.error(error);
    }
  };

  return (
    <div className="card w-[100%] bg-transparent shadow-none flex flex-col items-center justify-center">
      <h2 className="text-sm font-medium text-gray-700 mb-5">
        Income Summary{" "}
      </h2>
      <button
        onClick={handleDownload}
        className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 text-teal-600 rounded hover:bg-teal-600 hover:text-white transition"
      >
        <FiDownload size={18} />
        Download XLSX
      </button>
    </div>
  );
};

export default IncomeXlsxCard;
