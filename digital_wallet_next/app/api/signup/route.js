import { NextResponse } from "next/server";
import { prisma } from "../../../prisma/index.js";

export async function POST(req) {
  console.log("Inside signup backend route");
  const body = await req.json();
  const email = body.email;
  const phone = parseInt(body.phoneNumber);
  const password = body.password;

  console.log(phone);

  //logic to add the user to the postgres db

  try {
    const newUser = await prisma.user.create({
      data: {
        email: email,
        password: password,
        phoneNumber: phone,
      },
    });

    console.log("New user added:", newUser);
  } catch (error) {
    console.error("Error adding user:", error);
  }

  return NextResponse.json({ status: 201 });
}
