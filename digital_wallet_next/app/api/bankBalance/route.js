import { NextResponse } from "next/server";
import { prisma } from "../../../prisma/index.js";
import axios from "axios";

export async function POST(req) {
  const body = await req.json();
  // const userId = parseInt(body.id);
  const accountNumber = body.accountNumber;
  const pin = body.pin;

  // const user = await prisma.user.findUnique({
  //   where: {
  //     id: userId,
  //   },
  // });

  // const accountNumber = parseInt(user.accountNumbers[0]);

  const response = await axios.get(
    "https://mockbank.onrender.com/wallet/getBalance",
    {
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        accountNumber,
        pin,
      },
    }
  );

  return NextResponse.json({ balance: response.data.balance }, { status: 200 });
}
