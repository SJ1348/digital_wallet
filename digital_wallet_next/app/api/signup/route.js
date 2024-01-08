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
      const newUser = await prisma.user.create({
        data: {
          email: email,
          password: password,
          phoneNumber: phone,
        },
      });

      console.log("New user added:", newUser);
    }
    return NextResponse.status(201).json({ message: "User created" });
  } catch (error) {
    console.error("Error adding user:", error);
    return NextResponse.json({ status: 500 });
  }
}
