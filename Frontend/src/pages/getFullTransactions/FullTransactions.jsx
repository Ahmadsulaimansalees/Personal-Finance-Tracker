import React, { useState, useEffect, useContext } from "react";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useUserAuth } from "../../hooks/useUserAuth";
import FullTransactionList from "./FullTransactionList";
import FullTransactionOverview from "./FullTransactionOverview";
import { UserContext } from "../../context/userContext";

function FullTransactions() {
  useUserAuth();

  const [fullTransactionsData, setFullTransactionsData] = useState([]);
  const [loading, setLoading] = useState(false);

  const userData = useContext(UserContext);

  // Fetch all transactions from API
  const fetchFullTransactions = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.FULL.GET_ALL_TRANSACTIONS}`
      );
      if (response.data) {
        setFullTransactionsData(response.data);
      }
    } catch (error) {
      console.error("an error occured fetching income data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFullTransactions();
    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Full">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <FullTransactionOverview transactions={fullTransactionsData} />
            <FullTransactionList
              transactions={fullTransactionsData}
              userData={userData}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default FullTransactions;
