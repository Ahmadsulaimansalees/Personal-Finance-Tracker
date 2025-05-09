import React from "react";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import IncomeOverview from "../../components/Income/IncomeOverview";
import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useEffect } from "react";
import Modal from "../../components/Modal";
import AddIncomeForm from "../../components/Income/AddIncomeForm";
import toast from "react-hot-toast";
import IncomeList from "../../components/Income/IncomeList";
import DeleteAlert from "../../components/Income/DeleteAlert";
import { useUserAuth } from "../../hooks/useUserAuth";

function Income() {
  useUserAuth();
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  // AXIOS API Paths

  // get all incme details
  const fetchIncomeData = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      );
      if (response.data) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.error("an error occured fetching income data", error);
    } finally {
      setLoading(false);
    }
  };
  // Add income data
  const handleAddIncome = async (incomeData) => {
    const { source, amount, date, icon } = incomeData;

    // Validation checks

    if (!source.trim()) {
      toast.error("Source Required");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number greater than 0");
      return;
    }
    if (!date) {
      toast.error("Date is required");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon,
      });

      setOpenAddIncomeModal(false);
      toast.success("income added successfully");
      fetchIncomeData();
    } catch (error) {
      console.error(
        "Error adding income",
        error.response?.data?.message || error.message
      );
    }
  };
  // delete income data
  const deleteIncomeData = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));

      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Income deleted successfully");
      fetchIncomeData();
    } catch (error) {
      console.error(
        "An error occured deleting income",
        error.response?.data?.message || error.message
      );
    }
  };

  // HAndle download xlsx
  const handlDownloadIncomeDetails = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.INCOME.EXPORT_INCOME_EXCEL,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "income_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(
        "an error occured downloading your income excel sheet",
        error
      );
      toast.error("Failed to download income details, please try again");
    } finally {
      toast.success("Income Excel sheet downloaded successfully");
    }
  };

  useEffect(() => {
    fetchIncomeData();

    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>

          <IncomeList
            transactions={incomeData}
            onDelete={(id) => {
              setOpenDeleteAlert({
                show: true,
                data: id,
              });
            }}
            onDownload={handlDownloadIncomeDetails}
          />
        </div>

        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={(data) => handleAddIncome(data)} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title={"Delete Income"}
        >
          <DeleteAlert
            content="Are you sure you want to delete this income details "
            onDelete={() => deleteIncomeData(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
}

export default Income;
