import React from "react";
import {
  AreaChart,
  Area,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import customToolTip from "../Charts/customToolTip";
import { addThousandSeperator } from "../../utils/helpers";

function CustomLineChart({ data }) {
  return (
    <div className="bg-white ">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#87cf5" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#87cf5" stopOpacity={0} />
            </linearGradient>
          </defs>

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
          <Tooltip content={customToolTip} />

          <Area
            type="monotone"
            dataKey={"amount"}
            stroke="red"
            fill="#a11f1f3e"
            strokeWidth={2}
            dot={{ r: 4, fill: "red" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CustomLineChart;
