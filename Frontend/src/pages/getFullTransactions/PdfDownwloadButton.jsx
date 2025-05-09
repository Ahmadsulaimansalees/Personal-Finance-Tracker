import React from "react";
import generatePdf from "./PdfCard"; // adjust the path if needed

const PdfDownloadButton = ({ userData, transactionsData }) => (
  <button
    className="flex items-center gap-3 text-[12px] font-medium text-gray-700 hover:text-white bg-gray-50 hover:bg-red-500 px-4 py-1.5 rounded-lg border border-gray-200/50 cursor-pointer;"
    onClick={() => generatePdf({ userData, transactionsData })}
  >
    Download PDF
  </button>
);

export default PdfDownloadButton;
