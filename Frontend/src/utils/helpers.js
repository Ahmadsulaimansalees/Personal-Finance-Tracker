import moment from "moment";

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const getInitials = (name) => {
  if (!name) return "";

  const words = name.split("");
  let initials = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }

  return initials.toUpperCase();
};

export const addThousandSeperator = (num) => {
  if (num == null || isNaN(num)) return "";

  const [integerPart, fractionalPart] = num.toString().split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;
};

export const prepareExpenseBarChartData = (data = []) => {
  if (!Array.isArray(data)) return [];
  const chartData = data.map((item) => ({
    category: item?.category,
    amount: item?.amount,
  }));
  return chartData;
};
export const prepareIncomeBarChartData = (data = []) => {
  if (!Array.isArray(data)) return [];

  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format("Do MMM"),
    amount: item?.amount,
    source: item?.source,
  }));
  return chartData;
};

export const prepareExpenseLineChartData = (data = []) => {
  if (!Array.isArray(data)) return [];

  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format("Do MMM"),
    amount: item?.amount,
    source: item?.category,
  }));
  return chartData;
};
export const prepareFullTransactionsLineChartData = (data = []) => {
  if (!Array.isArray(data)) return [];
  // 1. Sort data by date
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  // 2. Group transactions by month and aggregate totals
  const dailyDataMap = {};

  sortedData.forEach((item) => {
    // Use the start of the month for consistent grouping
    const dayKey = moment(item?.date).format("YYYY-MM-DD"); // Use a consistent key for grouping, e.g., "2023-01"
    const displayDay = moment(item?.date).format("MMM DD YYYY"); // Format for display, e.g., "Jan 2023"

    if (!dailyDataMap[dayKey]) {
      dailyDataMap[dayKey] = {
        month: displayDay, // Store the display format
        totalIncome: 0,
        totalExpense: 0,
      };
    }

    // Check if it's income or expense and add to the respective total
    // Assuming 'source' means income and 'category' means expense
    if (item?.source) {
      dailyDataMap[dayKey].totalIncome += item?.amount || 0;
    } else if (item?.category) {
      dailyDataMap[dayKey].totalExpense += item?.amount || 0;
    }
    // Note: If a transaction can have BOTH source and category, you'll need to adjust this logic.
    // Assuming a transaction is either income OR expense.
  });

  // 3. Convert the map into an array of objects
  // Sort by dayKey (date) to ensure chronological order
  const chartData = Object.keys(dailyDataMap)
    .sort() // Sorts keys like "2023-01", "2023-02"
    .map((dayKey) => dailyDataMap[dayKey]);

  return chartData;
};

export const formatMomentDate = "Do MMM YYYY - hh:mm A";
