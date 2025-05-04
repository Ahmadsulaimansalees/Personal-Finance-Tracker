import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";
import Expenses from "./pages/Dashboard/Expenses";
import UserProvider from "./context/userContext";
import { Toaster } from "react-hot-toast";
import FullTransactions from "./pages/getFullTransactions/FullTransactions";

function App() {
  return (
    <UserProvider>
      <div className="">
        <Router>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/income" element={<Income />} />
            <Route path="/expense" element={<Expenses />} />
            <Route path="/full" element={<FullTransactions />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </div>

      <Toaster
        toastOptions={{
          style: {
            fontSize: "13px",
          },
        }}
      />
    </UserProvider>
  );
}

export default App;

const Root = () => {
  // CHeck if token Exists in localStorage
  const isAuthenticated = !!localStorage.getItem("token");
  // Redirect to dashboard if authenticated otherwise to login
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};
