import { NextResponse } from "next/server";
import { prisma } from "../../../prisma/index.js";
import axios from "axios";

export async function POST(req) {
  const body = await req.json();

  const amount = parseInt(body.amount);
  const password = body.password;
  const userId = parseInt(body.id); //userid of the sender
  const email = body.email; //email of user to whom money is being sent

  try {
    const senderUser = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    const receiversUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    //updating the balance in senders wallet

    if (
      senderUser.password != password ||
      senderUser.balance < amount ||
      !receiversUser
    ) {
      return NextResponse.json(
        { message: "Action not allowed" },
        { status: 400 }
      );
    }

    console.log("Before Senders wallet updated");
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        walletBalance: {
          decrement: amount,
        },
      },
    });

    console.log("Senders wallet updated");

    //updating the receivers balance in the wallet

    await prisma.user.update({
      where: {
        id: receiversUser.id,
      },
      data: {
        walletBalance: {
          increment: amount,
        },
      },
    });
    return NextResponse.json(
      {
        message:
          "Amount deducted from senders Wallet and added to receivers wallet",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Senders and Receivers Wallet not updated" },
      { status: 400 }
    );
  }
  a;
}
