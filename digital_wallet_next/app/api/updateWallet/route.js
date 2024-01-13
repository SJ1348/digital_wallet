import { NextResponse } from "next/server";
import { prisma } from "../../../prisma/index.js";
import axios from "axios";

export async function POST(req) {
  const body = await req.json();

  const operation = body.operation;
  const amount = parseInt(body.amount);
  const pin = body.pin;
  const userId = parseInt(body.id);
  const accountNumber = body.accountNumber;

  //updating the balance in the bank
  try {
    await axios.post("https://mockbank.onrender.com/wallet/updateBalance", {
      accountNumber: accountNumber,
      operation: operation,
      amount: amount,
      pin: pin,
    });
  } catch (error) {
    return NextResponse.json({ message: error.response.data.message });
  }

  //updating the balance in the wallet
  try {
    if (operation == "debit") {
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          walletBalance: {
            increment: amount,
          },
        },
      });
    } else if (operation == "credit") {
      await prisma.user.update({
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
    return NextResponse.json({ message: "Updated wallet" });
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}
