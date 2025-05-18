import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import customToolTip from "./customToolTip";
import customLegend from "./customLegend";
import { addThousandSeperator } from "../../utils/helpers";

function CustomPieChart({ data, label, totalAmount, colors, showTextAnchor }) {
  // Custom center label renderer
  const renderCenterLabel = ({ cx, cy }) => {
    if (!showTextAnchor) return null;
    return (
      <>
        <text
          x={cx}
          y={cy - 10}
          textAnchor="middle"
          fill="#b0b6be" // light gray
          fontSize={15}
          fontWeight={500}
        >
          {label}
        </text>
        <text
          x={cx}
          y={cy + 20}
          textAnchor="middle"
          fill="#22272b" // deep gray
          fontSize={22}
          fontWeight="bold"
        >
          {totalAmount !== undefined && totalAmount !== null
            ? `₦${addThousandSeperator(totalAmount)}`
            : ""}
        </text>
      </>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <PieChart width={300} height={400}>
        <Pie
          dataKey="amount"
          data={data}
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={130}
          innerRadius={100}
          labelLine={false}
          label={renderCenterLabel}
          isAnimationActive={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip content={customToolTip} />
        <Legend content={customLegend} />
      </PieChart>
    </div>
  );
}

export default CustomPieChart;
