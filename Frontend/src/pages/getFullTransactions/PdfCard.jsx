import React from "react";
import { jsPDF } from "jspdf";
import moment from "moment";
import { boldFontBase64, LightFont, SemiBold } from "../../assets/fonts/fonts"; // Adjust the path to your font files
import { addThousandSeperator } from "../../utils/helpers";
import toast from "react-hot-toast";

/**
 * Generates a PDF summary of user transactions.
 * @param {Object} userData - User information.
 * @param {Object} transactionsData - Transactions data.
 */
const generatePdf = ({ userData, transactionsData }) => {
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

  // Initialize jsPDF
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4", // Set to A4 size
  });

  // Add custom fonts
  doc.addFileToVFS("impact.ttf", boldFontBase64);
  doc.addFont("impact.ttf", "BoldFont", "bold");
  doc.addFileToVFS("Candara.ttf", LightFont);
  doc.addFont("Candara.ttf", "LightFont", "normal");

  // ===== Top Section =====

  // Title
  doc.setFont("BoldFont", "bold");
  doc.setFontSize(22);
  const pageWidth = doc.internal.pageSize.getWidth();
  const titleY = 16;
  doc.text("PERSONAL FINANCE TRACKER", pageWidth / 2, titleY, {
    align: "center",
  });

  // Underline the title
  const titleText = "PERSONAL FINANCE TRACKER";
  const titleFontSize = 22;
  doc.setFontSize(titleFontSize);
  const titleWidth = doc.getTextWidth(titleText);
  const underlineY = titleY + 2.5; // Slightly below the text
  const underlineStartX = (pageWidth - titleWidth) / 2;
  const underlineEndX = underlineStartX + titleWidth;
  doc.setLineWidth(0.7);
  doc.line(underlineStartX, underlineY, underlineEndX, underlineY);

  // User Info Section
  doc.setFont("LightFont", "normal");
  doc.setFontSize(11);

  const leftX = 20;
  const rightX = pageWidth - 20;
  const topY = 28; // Y position for all top info

  // Left side: Full Name, User ID, Email
  doc.text(`Full Name: ${userData.fullName}`, leftX, topY);
  doc.text(`User ID: ${userData._id}`, leftX, topY + 7);
  doc.text(`Email: ${userData.email}`, leftX, topY + 14);

  // Right side: Time Generated, User Since, Date
  const timeGenerated = moment().format("hh:mm A");
  const userSince = moment(userData.createdAt).format("Do MMM YYYY");
  const currentDate = moment().format("Do MMM YYYY");

  doc.text(`Time Generated: ${timeGenerated}`, rightX, topY, {
    align: "right",
  });
  doc.text(`User Since: ${userSince}`, rightX, topY + 14, { align: "right" });
  doc.text(`Date: ${currentDate}`, rightX, topY + 7, { align: "right" });

  // ===== Middle Belt Section =====

  // Summary card (orange-400)
  const rectX = 20;
  const rectY = 50;
  const rectWidth = 170;
  const rectHeight = 10;
  doc.setFillColor(251, 146, 60); // orange-400
  doc.roundedRect(rectX, rectY, rectWidth, rectHeight, 2, 2, "F");

  // "Summary" label
  doc.setFont("BoldFont", "bold");
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.text("Summary", rectX + rectWidth / 2, rectY + rectHeight / 2 + 2, {
    align: "center",
  });

  // Shadow/statistics card (very light, transparent orange)
  const roundedRectX = 20;
  const roundedRectY = 65;
  const roundedRectWidth = 170;
  const roundedRectHeight = 24;
  doc.setDrawColor(220, 220, 220); // Light gray border
  doc.setFillColor(255, 247, 237); // orange-50
  doc.roundedRect(
    roundedRectX,
    roundedRectY,
    roundedRectWidth,
    roundedRectHeight,
    2,
    2,
    "FD"
  );

  // Prepare summary data
  const lastTransaction = transactions[transactions.length - 1];
  const latestTransactionDate = moment(transactions[0].date);
  const mockData = {
    totalIncome: `NGN ${addThousandSeperator(totalIncome)}`,
    totalExpense: `NGN ${addThousandSeperator(totalExpense)}`,
    timeframe: `${moment(lastTransaction.date).format(
      "Do MMM YYYY"
    )} - ${moment(latestTransactionDate).format("Do MMM YYYY")}`,
  };

  // Summary content
  doc.setFont("LightFont", "normal");
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);

  doc.text("Total Income:", roundedRectX + 5, roundedRectY + 8);
  doc.setFontSize(10);
  doc.setTextColor(34, 197, 94); // Green
  doc.text(mockData.totalIncome, roundedRectX + 100, roundedRectY + 8);

  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  doc.text("Total Expense:", roundedRectX + 5, roundedRectY + 14);
  doc.setFontSize(10);
  doc.setTextColor(239, 68, 68); // Red
  doc.text(mockData.totalExpense, roundedRectX + 100, roundedRectY + 14);

  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  doc.text("Timeframe:", roundedRectX + 5, roundedRectY + 20);
  doc.text(mockData.timeframe, roundedRectX + 100, roundedRectY + 20);

  // ===== Table Section =====

  // Table header setup
  const tableX = 20;
  const tableY = roundedRectY + roundedRectHeight + 5;
  const tableWidth = 170;
  const tableHeaderHeight = 10;

  // Table header (orange-400, rounded)
  doc.setFillColor(251, 146, 60); // orange-400
  doc.roundedRect(tableX, tableY, tableWidth, tableHeaderHeight, 2, 2, "F");

  // Table header text
  doc.setFont("BoldFont", "bold");
  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.text("Date", tableX + 5, tableY + 7);
  doc.text("Description", tableX + 45, tableY + 7);
  doc.text("Type", tableX + 105, tableY + 7);
  doc.text("Amount", tableX + 145, tableY + 7);

  // Table rows
  const rowHeight = 9;
  const rowSpacing = 2;
  let currentY = tableY + tableHeaderHeight + 4; // Margin before first row

  const pageHeight = doc.internal.pageSize.getHeight();
  const bottomMargin = 20;

  transactions.forEach((transaction, idx) => {
    // Add spacing before each row except the first
    if (idx > 0) currentY += rowSpacing;

    // Page break logic
    if (currentY + rowHeight + bottomMargin > pageHeight) {
      doc.addPage();
      currentY = 20;

      // Redraw table header on new page
      doc.setFillColor(251, 146, 60); // orange-400
      doc.roundedRect(
        tableX,
        currentY,
        tableWidth,
        tableHeaderHeight,
        2,
        2,
        "F"
      );
      doc.setFont("BoldFont", "bold");
      doc.setFontSize(11);
      doc.setTextColor(255, 255, 255);
      doc.text("Date", tableX + 5, currentY + 7);
      doc.text("Description", tableX + 45, currentY + 7);
      doc.text("Type", tableX + 105, currentY + 7);
      doc.text("Amount", tableX + 145, currentY + 7);
      currentY += tableHeaderHeight;
    }

    // Row content
    const isCategory = !!transaction.category;
    const description = isCategory
      ? transaction.category
      : transaction.source || "";
    const type = isCategory ? "Expense" : "Income";
    const amount = transaction.amount
      ? `NGN ${addThousandSeperator(transaction.amount)}`
      : "";

    // Row background
    if (isCategory) {
      doc.setFillColor(230, 230, 230); // Light gray for category rows
    } else {
      doc.setFillColor(255, 255, 255); // White for others
    }
    doc.roundedRect(tableX, currentY, tableWidth, rowHeight, 2, 2, "F");

    // Row text
    doc.setFont("LightFont", "normal");
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);

    doc.text(
      moment(transaction.date).format("Do MMM YYYY") || "",
      tableX + 5,
      currentY + 6
    );
    doc.text(description, tableX + 45, currentY + 6);
    doc.text(type, tableX + 105, currentY + 6);
    doc.text(amount, tableX + 145, currentY + 6);

    currentY += rowHeight;
  });

  // Save the PDF and notify user
  doc.save(
    `Finance Statement (${moment(lastTransaction.date).format(
      "Do MMM YYYY"
    )} - ${moment(latestTransactionDate).format("Do MMM YYYY")}).pdf`
  );
  toast.success("PDF generated successfully!");
};

export default generatePdf;
