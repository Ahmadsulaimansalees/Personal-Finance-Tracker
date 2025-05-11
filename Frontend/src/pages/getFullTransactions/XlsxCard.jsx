import moment from "moment";
import React from "react";
import toast from "react-hot-toast";
import * as XLSX from "xlsx";

/**
 * Exports user transactions to an XLSX file with summary and user info.
 * @param {Object} userData - User information.
 * @param {Object} transactionsData - Transactions data.
 */
export function exportTransactionsToXlsx({ userData, transactionsData }) {
  const transactions = transactionsData.FULL_INCOME_EXPENSE_TRANSACTIONS;

  // Calculate total income and total expense
  let totalIncome = 0;
  let totalExpense = 0;
  transactions.forEach((transaction) => {
    if (transaction.category) {
      // Expense
      totalExpense += Number(transaction.amount) || 0;
    } else if (transaction.source) {
      // Income
      totalIncome += Number(transaction.amount) || 0;
    }
  });

  // Prepare worksheet data
  const wsData = [
    ["Date", "Description", "Type", "Amount"],
    ...transactions.map((transaction) => {
      const isCategory = !!transaction.category;
      const description = isCategory
        ? transaction.category
        : transaction.source || "";
      const type = isCategory ? "Expense" : "Income";
      const amount = transaction.amount
        ? `₦${Number(transaction.amount).toLocaleString()}`
        : "";
      return [
        transaction.date
          ? XLSX.SSF.format("yyyy-mm-dd", new Date(transaction.date))
          : "",
        description,
        type,
        amount,
      ];
    }),
    // Add a blank row before summary
    [],
    // Add summary rows
    ["", "", "Total Income", `₦${totalIncome.toLocaleString()}`],
    ["", "", "Total Expense", `₦${totalExpense.toLocaleString()}`],
  ];

  // Create worksheet and workbook
  const ws = XLSX.utils.aoa_to_sheet(wsData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Transactions");

  // Add user info as a separate sheet
  const userInfo = [
    ["Full Name", userData.fullName],
    ["User ID", userData._id],
    ["Email", userData.email],
    ["User Since", userData.createdAt],
    ["Exported At", new Date().toLocaleString()],
  ];
  const wsUser = XLSX.utils.aoa_to_sheet(userInfo);
  XLSX.utils.book_append_sheet(wb, wsUser, "User Info");

  // Download
  XLSX.writeFile(
    wb,
    `Excel Finance Statement - ${moment(Date.now()).format("Do MMM YYYY")}.xlsx`
  );
  toast.success("XLSX file downloaded successfully!");
}
