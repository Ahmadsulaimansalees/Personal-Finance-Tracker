import React from "react";
import { exportTransactionsToXlsx } from "./XlsxCard";

const XlsxDownloadCard = ({ userData, transactionsData }) => (
  <button
    className="flex items-center gap-3 text-[12px] font-medium text-gray-700 hover:text-white bg-gray-50 hover:bg-green-500 px-4 py-1.5 rounded-lg border border-gray-200/50 cursor-pointer;"
    onClick={() => exportTransactionsToXlsx({ userData, transactionsData })}
  >
    Download Excel
  </button>
);

export default XlsxDownloadCard;
