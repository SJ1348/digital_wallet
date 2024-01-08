"use client";
import React from "react";
import axios from "axios";

const getBankBalance = async () => {
  const response = await axios.get("/api/bankBalance");
  if (response.data.message == "BankBalance sent") {
    console.log("REQUEST COMPLETED");
  }
  // try {
  //   const response = await axios.post("/api/signup", user);
  //   if (response.data.message == "User exists") {
  //     setUserExists(true);
  //   } else {
  //     router.push("/api/auth/signin");
  //   }
  // } catch (error) {
  // } finally {
  //   setLoading(false);
  // }
};

function BankBalance() {
  return (
    <div>
      <h1>BankBalance</h1>
      <button
        onClick={getBankBalance}
        className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 focus:outline-none mb-4 mt-2"
      >
        View Bank Balance
      </button>
    </div>
  );
}

export default BankBalance;
