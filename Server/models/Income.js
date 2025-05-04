const mongoose = require("mongoose");

const IncomeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userInfo",
      required: true,
    },
    icon: { type: String, required: false },
    source: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now() },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Income", IncomeSchema);
