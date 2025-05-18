import React from "react";
import * as XLSX from "xlsx";
import moment from "moment";
import { addThousandSeperator } from "../../utils/helpers";
import { FiDownload } from "react-icons/fi";
import toast from "react-hot-toast";

/**
 * Generates and downloads an XLSX summary of expense transactions.
 * @param {Object} props
 * @param {Array} props.transactions - Array of expense transactions
 */
const ExpensesXlsxCard = ({ transactions = [] }) => {
  const transactionData = transactions.expense;
  const handleDownload = () => {
    try {
      // Calculate total expense
      let totalExpense = 0;
      transactionData.forEach((transaction) => {
        totalExpense += Number(transaction.amount) || 0;
      });

      // Prepare summary sheet data
      const summarySheet = [
        ["Personal Finance Tracker - Expense Summary"],
        [],
        ["Date Generated", moment().format("Do MMM YYYY, hh:mm A")],
        [],
        ["Total Expense", `NGN ${addThousandSeperator(totalExpense)}`],
        [],
      ];

      // Prepare transactionData table
      const tableHeader = ["Date", "Category", "Amount"];
      const tableRows = transactionData.map((t) => [
        moment(t.date).format("Do MMM YYYY"),
        t.category,
        `NGN ${addThousandSeperator(t.amount)}`,
      ]);

      // Combine all for worksheet
      const wsData = [...summarySheet, tableHeader, ...tableRows];

      // Create worksheet and workbook
      const ws = XLSX.utils.aoa_to_sheet(wsData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Expense Summary");

      // Download
      XLSX.writeFile(
        wb,
        `Expense_Summary_${moment().format("YYYY-MM-DD_HH-mm")}.xlsx`
      );
      toast.success("Expense XLSX downloaded!");
    } catch (error) {
      toast.error("Failed to generate XLSX");
      console.error(error);
    }
  };

  return (
    <div className="card w-[100%] bg-transparent shadow-none flex flex-col items-center justify-center">
      <h2 className="text-sm font-medium text-gray-700 mb-5">
        Expense Summary{" "}
      </h2>
      <button
        onClick={handleDownload}
        className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 text-gray-600 rounded hover:bg-red-600 hover:text-white transition"
      >
        <FiDownload size={18} />
        Download XLSX
      </button>
    </div>
  );
};

export default ExpensesXlsxCard;
