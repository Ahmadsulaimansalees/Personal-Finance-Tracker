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
import customToolTip from "./customToolTip";

function customBiaxialLineChart({ data }) {
  return (
    <div className="bg-white ">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart width={500} height={300} data={data}>
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

          {/* <Area
            type="monotone"
            dataKey={"amount"}
            stroke="red"
            fill="#a11f1f3e"
            strokeWidth={2}
            dot={{ r: 4, fill: "red" }}
          /> */}
          <Line
            type="monotone"
            dataKey="source1"
            stroke="red"
            strokeWidth={2}
            dot={{ r: 4, fill: "red" }}
            activeDot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="source2"
            stroke="green"
            strokeWidth={2}
            dot={{ r: 4, fill: "red" }}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default customBiaxialLineChart;
