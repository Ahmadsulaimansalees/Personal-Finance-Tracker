require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("././config/db");
const authRoutes = require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const fullTransactionRoute = require("./routes/fullTransactionRoute");
const app = express();
const path = require("path");

require("dotenv").config();
// Middleware
app.use(express.json());
const PORT = process.env.PORT || 5000;
app.use(express.urlencoded({ extended: true })); // Optional: For parsing URL-encoded data
// CORS
const allowedOrigin =
  [process.env.ORIGIN_URL, process.env.ORIGIN_URL2] || "http://localhost:5173";

app.use(
  cors({
    origin: allowedOrigin,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// Connect to MongoDB
connectDB();

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/full", fullTransactionRoute);

// serve upload folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
