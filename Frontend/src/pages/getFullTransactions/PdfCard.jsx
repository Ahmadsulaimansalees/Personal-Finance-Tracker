import React from "react";
import { jsPDF } from "jspdf";
import moment from "moment";
import { boldFontBase64, LightFont, SemiBold } from "../../assets/fonts/fonts"; // Adjust the path to your font files
import { addThousandSeperator } from "../../utils/helpers";
import toast from "react-hot-toast";

const generatePdf = ({ userData, transactionsData }) => {
  const transactions = transactionsData.FULL_INCOME_EXPENSE_TRANSACTIONS;

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

  // Top Section

  // Set boldest font for the title and center it at the very top
  doc.setFont("BoldFont", "bold");
  doc.setFontSize(22);
  const pageWidth = doc.internal.pageSize.getWidth();
  doc.text("PERSONAL FINANCE TRACKER", pageWidth / 2, 16, { align: "center" });

  // Prepare top info
  doc.setFont("LightFont", "normal");
  doc.setFontSize(11);

  const leftX = 20;
  const rightX = pageWidth - 20;
  const topY = 28; // Y position for all top info

  // Left side: Full Name and User ID
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

  // Middle Belt Section
  const rectX = 20; // X-coordinate of the rectangle
  const rectY = 50; // Y-coordinate of the rectangle
  const rectWidth = 170; // Width of the rectangle
  const rectHeight = 10; // Height of the rectangle

  // Summary card (warmer orange)
  doc.setFillColor(251, 146, 60); // orange-400
  doc.roundedRect(rectX, rectY, rectWidth, rectHeight, 2, 2, "F");

  // Add white text "Summary" inside the rectangle
  doc.setFont("BoldFont", "bold");
  doc.setFontSize(16); // Increased from 14 to 16
  doc.setTextColor(255, 255, 255); // White color
  doc.text("Summary", rectX + rectWidth / 2, rectY + rectHeight / 2 + 2, {
    align: "center",
  });

  // Shadow/statistics card (very light, transparent orange)
  const roundedRectX = 20;
  const roundedRectY = 65;
  const roundedRectWidth = 170;
  const roundedRectHeight = 24; // Increased height

  doc.setDrawColor(220, 220, 220); // Light gray border
  doc.setFillColor(255, 247, 237); // orange-50, very light and warm
  doc.roundedRect(
    roundedRectX,
    roundedRectY,
    roundedRectWidth,
    roundedRectHeight,
    2,
    2,
    "FD"
  );

  // Add content inside the rectangle with reduced vertical spacing
  const lastTransaction = transactions[transactions.length - 1];
  // Use the date of the last transaction for the timeframe
  const latestTransactionDate = moment(transactions[0].date);
  const mockData = {
    totalIncome: "Null",
    totalExpense: "Null",
    timeframe: `${moment(lastTransaction.date).format(
      "Do MMM YYYY"
    )} - ${moment(latestTransactionDate).format("Do MMM YYYY")}`,
  };

  doc.setFont("LightFont", "normal");
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0); // Black color

  doc.text("Total Income:", roundedRectX + 5, roundedRectY + 8);
  doc.text(mockData.totalIncome, roundedRectX + 100, roundedRectY + 8);

  doc.text("Total Expense:", roundedRectX + 5, roundedRectY + 14);
  doc.text(mockData.totalExpense, roundedRectX + 100, roundedRectY + 14);

  doc.text("Timeframe:", roundedRectX + 5, roundedRectY + 20);
  doc.text(mockData.timeframe, roundedRectX + 100, roundedRectY + 20);

  // Amber rectangle for column headers
  const tableX = 20;
  const tableY = roundedRectY + roundedRectHeight + 5; // Try 5 or even 0
  const tableWidth = 170;
  const tableHeaderHeight = 10;

  // Table header (warmer orange, rounded)
  doc.setFillColor(251, 146, 60); // orange-400
  doc.roundedRect(tableX, tableY, tableWidth, tableHeaderHeight, 2, 2, "F");

  // Set header text style
  doc.setFont("BoldFont", "bold");
  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255); // White

  // Draw headers (adjust X positions as needed)
  doc.text("Date", tableX + 5, tableY + 7);
  doc.text("Description", tableX + 45, tableY + 7);
  doc.text("Type", tableX + 105, tableY + 7);
  doc.text("Amount", tableX + 145, tableY + 7);

  // Table rows
  const rowHeight = 9;
  const rowSpacing = 2; // Space between rows
  let currentY = tableY + tableHeaderHeight + 4; // Adds margin before first row

  const pageHeight = doc.internal.pageSize.getHeight();
  const bottomMargin = 20; // Space to leave at the bottom

  transactions.forEach((transaction, idx) => {
    // Add spacing before each row except the first
    if (idx > 0) currentY += rowSpacing;

    // Check if we need a new page before drawing the next row
    if (currentY + rowHeight + bottomMargin > pageHeight) {
      doc.addPage();
      currentY = 20; // Reset Y position for new page (adjust as needed)

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

    // Conditional logic
    const isCategory = !!transaction.category;
    const description = isCategory
      ? transaction.category
      : transaction.source || "";
    const type = isCategory ? "Expense" : "Income";
    const amount = transaction.amount
      ? `₦${addThousandSeperator(transaction.amount)}`
      : "";

    // Rounded background for each row
    if (isCategory) {
      doc.setFillColor(230, 230, 230); // Light gray for category rows
    } else {
      doc.setFillColor(255, 255, 255); // White for others
    }
    doc.roundedRect(tableX, currentY, tableWidth, rowHeight, 2, 2, "F");

    // Set text color for row
    doc.setFont("LightFont", "normal");
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);

    // Draw row text
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

  // Save the PDF
  doc.save("transactions_summary.pdf");
  toast.success("PDF generated successfully!");
};

export default generatePdf;
