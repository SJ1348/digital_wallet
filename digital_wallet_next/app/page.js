"use client";
//import { getSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import React from "react";
import { useSession } from "next-auth/react";

import { useState } from "react";
import axios from "axios";

const ExampleSSC = () => {
  const [user, setUser] = useState({
    accountNumber: "",
    pin: "",
  });

  const addBankAccount = () => {
    axios
      .post("/api/addAccount", user)
      .then((response) => {
        if (response.data.message === "Bank account added successfully") {
          console.log("Request completed");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // const { data: session } = useSession();

  //const session = await getSession(options);

  return (
    <div>
      <h1>Component</h1>
      {/* {session ? ( */}
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
          onChange={(e) => setUser({ ...user, accountNumber: e.target.value })}
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
          SIGN UP
        </button>
      </div>
      {/* //) : ( */}
      {/* //<p>You are not logged in.</p> */}
      {/* //)} */}
    </div>
  );
};

export default ExampleSSC;
