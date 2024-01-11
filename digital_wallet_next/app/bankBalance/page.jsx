"use client";
import { useEffect, useState } from "react";

import axios from "axios";
import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";

function BankBalance() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        session = session;
        axios
          .post("/api/getAccounts", {
            id: session.user.id,
          })
          .then((res) => {
            setAccounts(res.data.accountNumbers);
          });
      } else {
        redirect("/api/auth/signin?callbackUrl=/bankBalance");
      }
    });
  }, []);

  function getBankBalance(acc) {
    axios
      .post("/api/bankBalance", {
        accountNumber: acc,
        pin: "000000",
      })
      .then((res) => {
        console.log(res.data.balance);
      });
  }

  return (
    <div>
      <h1>Bank Accounts</h1>
      {accounts.map((acc, index) => {
        return (
          <div key={index}>
            {acc}
            <button
              onClick={() => {
                getBankBalance(acc);
              }}
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 focus:outline-none mb-4 mt-2"
            >
              View Bank Balance
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default BankBalance;
