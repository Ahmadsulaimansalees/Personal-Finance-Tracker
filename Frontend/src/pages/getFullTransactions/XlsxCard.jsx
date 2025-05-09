import React from "react";
import toast from "react-hot-toast";
import * as XLSX from "xlsx";

export function exportTransactionsToXlsx({ userData, transactionsData }) {
  const transactions = transactionsData.FULL_INCOME_EXPENSE_TRANSACTIONS;

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
  ];

  // Create worksheet and workbook
  const ws = XLSX.utils.aoa_to_sheet(wsData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Transactions");

  // Add user info as a separate sheet (optional)
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
  XLSX.writeFile(wb, "transactions_summary.xlsx");
  toast.success("XLSX file downloaded successfully!");
}
