import { NextResponse } from "next/server";
import { prisma } from "../../../prisma/index.js";

export async function POST(req) {
  const body = await req.json();
  const email = body.email;
  const phone = parseInt(body.phoneNumber);
  const password = body.password;

  //logic to add the user to the postgres db

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (existingUser) {
      return NextResponse.json({ message: "User exists" });
    } else {
      await prisma.user.create({
        data: {
          email: email,
          password: password,
          phoneNumber: phone,
          accountNumbers: [],
          walletBalance: 0,
        },
      });
    }
    return NextResponse.json({ message: "User created" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "User not created" }, { status: 400 });
  }
}
