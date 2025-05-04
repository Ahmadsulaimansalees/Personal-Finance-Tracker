import React from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import { useState } from "react";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import { useEffect } from "react";
import Modal from "../../components/Modal";
import ExpenseOverview from "../../components/Expenses/ExpenseOverview";
import ExpenseList from "../../components/Expenses/ExpenseList";
import AddExpenseForm from "../../components/Expenses/AddExpenseForm";
import DeleteAlert from "../../components/Income/DeleteAlert";
import toast from "react-hot-toast";

function Expenses() {
  useUserAuth();
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

  // AXIOS API Paths

  // get all incme details
  const fetchExpenseData = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
      );
      if (response.data) {
        setExpenseData(response.data);
      }
    } catch (error) {
      console.error("an error occured fetching Expense data", error);
    } finally {
      setLoading(false);
    }
  };
  // Add Expense data
  const handleAddExpense = async (expenseData) => {
    const { category, amount, date, icon } = expenseData;

    // Validation checks

    if (!category.trim()) {
      toast.error("category Required");
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
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon,
      });

      setOpenAddExpenseModal(false);
      toast.success("Expense added successfully");
      fetchExpenseData();
    } catch (error) {
      console.error(
        "Error adding Expense",
        error.response?.data?.message || error.message
      );
    }
  };
  // Delete Expense Dara
  const deleteExpenseData = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));

      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Expense deleted successfully");
      fetchExpenseData();
    } catch (error) {
      console.error(
        "An error occured deleting Expense",
        error.response?.data?.message || error.message
      );
    }
  };

  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.EXPORT_EXPENSE_EXCEL,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "expense_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(
        "an error occured downloading your expense excel sheet",
        error
      );
      toast.error("Failed to download expense details, please try again");
    } finally {
      toast.success("Expense Excel sheet downloaded successfully");
    }
  };

  useEffect(() => {
    fetchExpenseData();

    return () => {};
  }, []);
  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <ExpenseOverview
              transactions={expenseData}
              onAddExpense={() => setOpenAddExpenseModal(true)}
            />
          </div>

          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => {
              setOpenDeleteAlert({
                show: true,
                data: id,
              });
            }}
            onDownload={handleDownloadExpenseDetails}
          />
        </div>
        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expense"
        >
          <AddExpenseForm onAddExpense={(data) => handleAddExpense(data)} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title={"Delete Expense"}
        >
          <DeleteAlert
            content="Are you sure you want to delete this Expense details "
            onDelete={() => deleteExpenseData(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
}

export default Expenses;
