import React from "react";
import {
  Line,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { addThousandSeperator } from "../../utils/helpers";
import CustomBiaxialToolTip from "./CustomBiaxialToolTip";

function CustomBiaxialLineChart({ data }) {
  // Ensure data is an array
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="bg-white p-4 text-center">
        No data available for chart.
      </div>
    );
  }

  return (
    <div className="bg-white">
      <ResponsiveContainer width="100%" height={300}>
        {/* Use the processed data */}
        <LineChart width={500} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" vertical={false} />{" "}
          {/* Added a subtle grid */}
          <XAxis
            dataKey="month" // Use the 'month' key from the processed data
            tick={{ fontSize: 12, fill: "#555" }}
            // stroke="none" // You might want a subtle axis line
            axisLine={false} // Hide the axis line if stroke is none
            tickLine={false} // Hide the tick line
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#555" }}
            // stroke="none" // You might want a subtle axis line
            axisLine={false} // Hide the axis line if stroke is none
            tickLine={false} // Hide the tick line
            tickFormatter={(tick) => `₦${addThousandSeperator(tick)} `}
          />
          {/* Use the custom tooltip component */}
          <Tooltip content={CustomBiaxialToolTip} />
          {/* Income Line (Green) */}
          <Line
            type="monotone"
            dataKey="totalIncome" // Use the new data key for total income
            stroke="#4CAF50" // Green color
            strokeWidth={2}
            dot={{ r: 4, fill: "#4CAF50" }}
            activeDot={{ r: 6 }}
            name="Income" // Name for the tooltip
          />
          {/* Expense Line (Red) */}
          <Line
            type="monotone"
            dataKey="totalExpense" // Use the new data key for total expense
            stroke="#F44336" // Red color
            strokeWidth={2}
            dot={{ r: 4, fill: "#F44336" }}
            activeDot={{ r: 6 }}
            name="Expense" // Name for the tooltip
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CustomBiaxialLineChart;
