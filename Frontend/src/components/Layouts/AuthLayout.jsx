import React from "react";
import Login_Card from "../../assets/images/Login_Card.jpg";

function AuthLayout({ children }) {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/2 h-screen px-8 md:px-12 pt-8 pb-12 bg-white flex flex-col justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          Personal Expense Tracker
        </h2>
        <div className="flex-grow flex items-center justify-center">
          {children}
        </div>
        <p className="text-sm text-gray-500 text-center">
          Manage your finances effortlessly.
        </p>
      </div>
      <div className="hidden md:flex w-1/2 h-screen bg-gray-900 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
        <div className="relative z-10 flex flex-col items-center justify-center text-center text-white px-8">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to Your Personal Finance Tracker
          </h1>
          <p className="text-lg mb-6">
            Take control of your finances and achieve your goals.
          </p>
          <h3 className="underline animate-pulse hover:text-amber-300 text-xl">
            Login to continue
          </h3>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
