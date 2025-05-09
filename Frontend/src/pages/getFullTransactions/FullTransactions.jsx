import React from "react";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useEffect } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import FullTransactionList from "./FullTransactionList";
import FullTransactionOverview from "./FullTransactionOverview";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";

function FullTransactions() {
  useUserAuth();

  const [fullTransactionsData, setFullTransactionsData] = useState([]);
  const [loading, setLoading] = useState(false);

  const userData = useContext(UserContext);

  // AXIOS API Paths
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
  // HAndle download xlsx

  useEffect(() => {
    fetchFullTransactions();

    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Full">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <FullTransactionOverview transactions={fullTransactionsData} />
            <FullTransactionList
              transactions={fullTransactionsData}
              userData={userData}
              // onDownload={} // something yet to come
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default FullTransactions;
