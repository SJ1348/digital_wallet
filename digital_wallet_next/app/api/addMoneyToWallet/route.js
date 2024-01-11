import { NextResponse } from "next/server";
import { prisma } from "../../../prisma/index.js";
import axios from "axios";

export async function POST(req) {
  console.log("HELLO FROM Add money");

  const body = await req.json();

  const operation = "debit"; //hardcode
  const amount = body.amount; //get from frontend
  const pin = body.pin; //get from front end
  const userId = body.id; //get from session from frontend

  //getting account number from db using id
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(userId),
    },
  });

  const accountNumber = user.accountNumbers[0];

  //updating the balance in the bank (deducting from bank)
  try {
    await axios.put("https://mockbank.onrender.com/wallet/updateBalance", {
      accountNumber: accountNumber.toString(),
      operation: operation,
      amount: amount,
      pin: pin,
    });
  } catch (error) {
    console.log(error.message.data);
  }

  //updating the balance in the wallet (adding to wallet)

  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: parseInt(userId),
      },
      data: {
        walletBalance: {
          increment: parseInt(amount),
        },
      },
    });

    console.log("Updated balance:", updatedUser);
  } catch (error) {
    console.error("Error updating balance:", error);
  }

  return NextResponse.json({ message: "Money added" });
}
