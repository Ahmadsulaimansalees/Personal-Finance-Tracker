import React from "react";
import { useState } from "react";
import Input from "../Input";
import EmojiPickerPopUp from "../EmojiPickerPopUp";

function AddIncomeForm({ onAddIncome }) {
  const [income, setIncome] = useState({
    source: "",
    amount: "",
    date: "",
    icon: "",
  });
  const handleChange = (key, value) => setIncome({ ...income, [key]: value });

  return (
    <div className="p-6">
      <EmojiPickerPopUp
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      <Input
        value={income.source}
        onChange={({ target }) => handleChange("source", target.value)}
        label="Income Source"
        placeholder="Freelance, Salary, Tips etc."
        type="text"
      />

      <Input
        value={income.value}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        placeholder=""
        type="number"
      />
      <Input
        value={income.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        placeholder=""
        type="date"
      />

      <div className="flex justify-end mt-6">
        <button
          className="add-btn add-btn-fill "
          type="button"
          onClick={() => onAddIncome(income)}
        >
          Add Income
        </button>
      </div>
    </div>
  );
}

export default AddIncomeForm;
