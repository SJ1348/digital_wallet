import { NextResponse } from "next/server";
import { prisma } from "../../../prisma/index.js";
import axios from "axios";

export async function POST(req) {
  const body = await req.json();

  const operation = body.operation;
  const amount = parseInt(body.amount); //get from frontend
  const pin = body.pin; //get from front end
  const userId = parseInt(body.id); //get from session from frontend
  const accountNumber = body.accountNumber;

  //updating the balance in the bank
  try {
    const response = await axios.post(
      "https://mockbank.onrender.com/wallet/updateBalance",
      {
        accountNumber: accountNumber,
        operation: operation,
        amount: amount,
        pin: pin,
      }
    );

    if (response.data.message == "Insufficient funds") {
      return NextResponse.json({ message: response.data.message });
    }
  } catch (error) {
    console.log(error.message.data);
  }

  //updating the balance in the wallet
  let updatedUser;
  try {
    console.log(userId);
    if (operation == "debit") {
      updatedUser = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          walletBalance: {
            increment: 0,
          },
        },
      });
    } else if (operation == "credit") {
      updatedUser = await prisma.user.update({
        where: {
          id: parseInt(userId),
        },
        data: {
          walletBalance: {
            decrement: amount,
          },
        },
      });
    }
  } catch (error) {
    console.error("Error updating balance:", error);
  }

  return NextResponse.json({ message: "Updated wallet" });
}
