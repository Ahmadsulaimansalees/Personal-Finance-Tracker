const React = require("react");
const {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  renderToBuffer,
} = require("@react-pdf/renderer");
const fs = require("fs");
const path = require("path");

// Define PDF document styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 20,
  },
  section: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 5,
  },
  text: {
    fontSize: 12,
  },
  table: {
    display: "table",
    width: "100%",
    borderCollapse: "collapse",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 5,
  },
  tableCell: {
    flex: 1,
    fontSize: 10,
  },
  headerCell: {
    flex: 1,
    fontSize: 10,
    fontWeight: "bold",
  },
});

// Create the PDF document component using React.createElement
const UserSummaryDocument = ({ user }) =>
  React.createElement(
    Document,
    null,
    React.createElement(
      Page,
      { size: "A4", style: styles.page },
      React.createElement(
        View,
        { style: styles.section },
        React.createElement(Text, { style: styles.heading }, "User Summary"),
        React.createElement(
          Text,
          { style: styles.text },
          React.createElement(Text, { style: styles.label }, "User ID:"),
          ` ${user.userId}`
        ),
        React.createElement(
          Text,
          { style: styles.text },
          React.createElement(Text, { style: styles.label }, "Name:"),
          ` ${user.name}`
        )
      ),
      React.createElement(
        View,
        { style: styles.section },
        React.createElement(Text, { style: styles.heading }, "Transactions"),
        user.transactions && user.transactions.length > 0
          ? React.createElement(
              View,
              { style: styles.table },
              React.createElement(
                View,
                { style: styles.tableRow },
                React.createElement(Text, { style: styles.headerCell }, "Date"),
                React.createElement(
                  Text,
                  { style: styles.headerCell },
                  "Description"
                ),
                React.createElement(
                  Text,
                  { style: styles.headerCell },
                  "Amount"
                )
              ),
              ...user.transactions.map((transaction, index) =>
                React.createElement(
                  View,
                  { key: index, style: styles.tableRow },
                  React.createElement(
                    Text,
                    { style: styles.tableCell },
                    transaction.date
                  ),
                  React.createElement(
                    Text,
                    { style: styles.tableCell },
                    transaction.description
                  ),
                  React.createElement(
                    Text,
                    { style: styles.tableCell },
                    `$${transaction.amount.toFixed(2)}`
                  )
                )
              )
            )
          : React.createElement(
              Text,
              { style: styles.text },
              "No transactions available."
            )
      )
    )
  );

// Example Express handler function
exports.DownloadPDFSummary = async (req, res) => {
  // Replace with real user data fetching logic
  const mockUserData = {
    userId: "12345",
    name: "John Doe",
    transactions: [
      { date: "2025-05-01", description: "Purchase #123", amount: 25.5 },
      { date: "2025-05-05", description: "Payment received", amount: 100.0 },
      { date: "2025-05-08", description: "Subscription fee", amount: 10.99 },
    ],
  };

  try {
    const pdfBuffer = await renderToBuffer(
      React.createElement(UserSummaryDocument, { user: mockUserData })
    );

    // Define the uploads folder path
    const uploadsFolderPath = path.join(__dirname, "../../uploads");
    if (!fs.existsSync(uploadsFolderPath)) {
      fs.mkdirSync(uploadsFolderPath, { recursive: true });
    }

    // Define the file path for the PDF
    const pdfFilePath = path.join(
      uploadsFolderPath,
      `user_summary_${mockUserData.userId}.pdf`
    );

    // Save the PDF buffer to the file
    fs.writeFileSync(pdfFilePath, pdfBuffer);

    // Send the PDF file as a response
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="user_summary_${mockUserData.userId}.pdf"`
    );
    res.send(pdfBuffer);
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).send("Error generating PDF");
  }
};
