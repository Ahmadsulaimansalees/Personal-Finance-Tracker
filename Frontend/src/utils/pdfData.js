import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

// Fetch user info and full transaction list from your backend
async function fetchUserData() {
  try {
    // Fetch user info
    const userRes = await axiosInstance.post(API_PATHS.AUTH.GET_USER_INFO);

    // Fetch all transactions
    const txRes = await axiosInstance.get(API_PATHS.FULL.GET_ALL_TRANSACTIONS);

    return {
      userId: userRes.data._id || userRes.data.id,
      userProfilePicture: userRes.data.profilePicture || "",
      fullTransactionList: txRes.data.transactions || [],
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}

// Function to prepare data for rendering in a PDF
export async function getPdfData() {
  const userData = await fetchUserData();
  if (!userData) return null;

  return {
    userId: userData.userId,
    userProfilePicture: userData.userProfilePicture,
    transactions: userData.fullTransactionList,
  };
}
