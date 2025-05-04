import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { addThousandSeperator } from "../../utils/helpers";

function CustomBarChart({ data }) {
  // Custom tool tip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
          <p className="text-xs font-semibold text-teal-500 mb-1 ">
            {payload[0].payload.source}
          </p>
          <p className="text-sm text-gray-600">
            Amount: &#8358;
            <span className="text-sm font-medium text-gray-900">
              {addThousandSeperator(payload[0].payload.amount)}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white mt-6">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke="none" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "#555" }}
            stroke="none"
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#555" }}
            stroke="none"
            tickFormatter={(tick) => `₦${addThousandSeperator(tick)} `}
          />
          <Tooltip content={CustomTooltip} />

          <Bar
            dataKey="amount"
            fill="#FF8042"
            radius={[10, 10, 0, 0]}
            activeBar={{ r: 8, fill: "teal" }}
          >
            {Array.isArray(data) &&
              data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={
                    index % 5 === 0
                      ? "#875CF5" // Purple
                      : index % 5 === 1
                      ? "#cfbefb" // Light Purple
                      : index % 5 === 2
                      ? "#38B2AC" // Light Teal
                      : index % 5 === 3
                      ? "#2F855A" // Emerald
                      : "#E53E3E" // Red
                  }
                />
              ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CustomBarChart;
