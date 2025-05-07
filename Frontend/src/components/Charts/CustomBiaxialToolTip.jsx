import React from "react";
import { addThousandSeperator } from "../../utils/helpers"; // Assuming this path is correct

// Accept the 'label' prop which contains the date/month string
function CustomBiaxialToolTip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      // Outer container with your existing Tailwind styles
      <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
        {/* Display the date/month label at the top */}
        {/* Use a suitable Tailwind class for the header */}
        <p className="text-sm font-medium text-gray-700 mb-2 border-b border-gray-200 pb-1">
          {label} {/* Use the label prop here */}
        </p>

        {/* Iterate through the payload array to display info for each line */}
        {payload.map((entry, index) => {
          // 'entry' contains data for one line at this specific data point
          // entry.name will be "Income" or "Expense" (from your <Line name="..." /> prop)
          // entry.value will be the totalIncome or totalExpense amount
          // entry.color will be the stroke color of the line

          // Ensure the entry is valid and has a value to display
          if (entry.name && typeof entry.value === "number") {
            return (
              // Display data for a single line (Income or Expense)
              <p
                key={`tooltip-item-${index}`}
                className="text-sm text-gray-600 mb-1 last:mb-0"
              >
                {/* Display the line name with its color */}
                <span
                  className="font-medium"
                  style={{ color: entry.color }}
                >{`${entry.name}:`}</span>

                {/* Display the formatted amount */}
                <span className="pl-1 text-sm font-medium text-gray-800">
                  {" "}
                  {/* You can adjust text color */}
                  &#8358; {addThousandSeperator(entry.value)}
                </span>
              </p>
            );
          }
          return null; // Don't render if the entry is incomplete or invalid
        })}
      </div>
    );
  }

  // Return null if the tooltip is not active or there's no data
  return null;
}

export default CustomBiaxialToolTip;
