"use client";
import axios from "axios";
import React from "react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { redirect } from "next/navigation";

const WalletBalance = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/addMoneyToWallet");
    },
  });

  const [user, setUser] = useState({
    amount: "",
    pin: "",
  });
  const [isClicked, setIsClicked] = useState(false);

  const addMoney = () => {
    //Need accountNumber, operation, amount, pin and id for hitting backend endpoint
    //send only id and pin from frontend, rest will be obained via db calls in the backend

    axios
      .post("/api/addMoneyToWallet", {
        amount: user.amount,
        pin: user.pin,
        id: session.user.id,
      })
      .then((res) => {
        console.log("DONE");
      });
  };

  return (
    <div>
      Wallet
      <div>
        <button
          onClick={() => {
            setIsClicked(true);
          }}
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 focus:outline-none mb-4 mt-2"
        >
          Add money to wallet
        </button>
        {isClicked ? (
          <div>
            <label
              htmlFor="amount"
              className="block text-sm text-gray-600 font-semibold mb-2"
            >
              Enter amount to be added
            </label>
            <input
              type="number"
              id="amount"
              value={user.amount}
              onChange={(e) => setUser({ ...user, amount: e.target.value })}
              placeholder="Amount"
              className="w-full text-black px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 mb-3"
            />
            <label
              htmlFor="pin"
              className="block text-sm text-gray-600 font-semibold mb-2"
            >
              Enter your PIN
            </label>
            <input
              type="number"
              id="pin"
              value={user.pin}
              onChange={(e) => setUser({ ...user, pin: e.target.value })}
              placeholder="PIN"
              className="w-full text-black px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 mb-3"
            />
            <button
              onClick={() => {
                setIsClicked(false);
                addMoney();
              }}
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 focus:outline-none mb-4 mt-2"
            >
              Confirm
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default WalletBalance;
