"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";
import axios from "axios";

const ExampleSSC = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/addAccount");
    },
  });
  const [user, setUser] = useState({
    accountNumber: "",
    pin: "",
  });

  const addBankAccount = () => {
    axios
      .post("/api/addAccount", {
        accountNumber: user.accountNumber,
        pin: user.pin,
        id: session.user.id,
      })
      .then((res) => {
        console.log(res.data.message);
      });
  };

  return (
    <div>
      <h1>Component</h1>
      {session ? (
        <div>
          <p>Welcome, </p>

          <label
            htmlFor="account"
            className="block text-sm text-gray-600 font-semibold mb-2"
          >
            Account number
          </label>
          <input
            type="text"
            id="account"
            value={user.accountNumber}
            onChange={(e) =>
              setUser({ ...user, accountNumber: e.target.value })
            }
            placeholder="Account number"
            className="w-full text-black px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 mb-3"
          />

          <label
            htmlFor="pin"
            className="block text-sm text-gray-600 font-semibold mb-2"
          >
            PIN
          </label>

          <input
            type="text"
            id="pin"
            value={user.pin}
            onChange={(e) => setUser({ ...user, pin: e.target.value })}
            placeholder="pin"
            className="w-full text-black px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 mb-3"
          />

          <button
            type="button"
            onClick={addBankAccount}
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 focus:outline-none mb-4 mt-2"
          >
            Add Bank Account
          </button>
        </div>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
};

export default ExampleSSC;
