import { prisma } from "../../../prisma/index.js";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req) {
  // Get account number and pin from req
  const body = await req.json();
  const accountNumber = parseInt(body.accountNumber);
  const pin = body.pin;

  // Check if account number and pin matches from mock bank api
  try {
    const accValidation = await axios.post(
      "https://mockbank.onrender.com/wallet/checkAccount",
      {
        accountNumber: accountNumber,
        pin: pin,
      }
    );
    if (accValidation.data.message == "Bank account and pin matches") {
      const userId = parseInt(body.id);

      // Todo : check if account already added
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (user.accountNumbers.includes(BigInt(accountNumber))) {
        return NextResponse.json(
          { message: "Account already added" },
          { status: 200 }
        );
      }

      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          accountNumbers: {
            push: accountNumber,
          },
        },
      });
    }
    return NextResponse.json(
      { message: "Bank account added successfully" },
      { status: 200 }
    );
  } catch (error) {
    if (error.response.data.message == "Invalid Credentials")
      return NextResponse.json(
        {
          status: 400,
        },
        { message: "Invalid Credentials" }
      );
    else {
      return NextResponse.json(
        {
          status: 400,
        },
        { message: error.response.data.message }
      );
    }
  }
}
