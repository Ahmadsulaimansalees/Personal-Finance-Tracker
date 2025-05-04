import React from "react";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useEffect } from "react";
// import toast from "react-hot-toast";
// import IncomeList from "../../components/Income/IncomeList";
import { useUserAuth } from "../../hooks/useUserAuth";
import FullTransactionList from "./FullTransactionList";

function FullTransactions() {
  useUserAuth();

  const [fullTransactionsData, setFullTransactionsData] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const handlDownloadPDFData = async () => {
    // try {
    //   const response = await axiosInstance.get(
    //     API_PATHS.INCOME.EXPORT_INCOME_EXCEL,
    //     {
    //       responseType: "blob",
    //     }
    //   );
    //   const url = window.URL.createObjectURL(new Blob([response.data]));
    //   const link = document.createElement("a");
    //   link.href = url;
    //   link.setAttribute("download", "income_details.xlsx");
    //   document.body.appendChild(link);
    //   link.click();
    //   link.parentNode.removeChild(link);
    //   window.URL.revokeObjectURL(url);
    // } catch (error) {
    //   console.error(
    //     "an error occured downloading your income excel sheet",
    //     error
    //   );
    //   toast.error("Failed to download income details, please try again");
    // } finally {
    //   toast.success("Income Excel sheet downloaded successfully");
    // }
  };

  useEffect(() => {
    fetchFullTransactions();

    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Full">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            {/* <FullTransactionList transactions={fullTransactionsData} /> */}
          </div>

          <FullTransactionList
            transactions={fullTransactionsData}
            // onDelete={(id) => {
            //   setOpenDeleteAlert({
            //     show: true,
            //     data: id,
            //   });
            // }}
            onDownload="" // something yet to come
          />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default FullTransactions;
