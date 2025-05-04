import React from "react";
import { addThousandSeperator } from "../../utils/helpers";

function customToolTip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div className=" bg-white shadow-md rounded-lg p-2 border border-gray-300 ">
        <p className="text-xs font-semibold text-teal-600 mb-1">
          {payload[0].payload.source}
        </p>
        <p className="text-sm text-gray-600">
          Amount:
          <span className="pl-1 text-sm font-medium text-teal-500">
            &#8358;{addThousandSeperator(payload[0].value)}{" "}
          </span>
        </p>
      </div>
    );
  }
  return null;
}

export default customToolTip;
