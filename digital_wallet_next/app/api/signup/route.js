// import { getUserData } from "@/app/(db)/db";
import { NextResponse } from "next/server";
import { prisma } from "../../../prisma/index.js";

// let userData = getUserData();

export async function POST(req) {
  console.log("Inside signup backend route");
  const body = await req.json();
  const email = body.email;
  const phone = parseInt(body.phoneNumber);
  const password = body.password;

  console.log(phone);

  //logic to add the user to the postgres db

  try {
    // Replace the property values with your actual data
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

  // userData = [...userData, { phone, email, password }];

  //after adding, redirect to login (which is basically options in nextauth)

  return NextResponse.json({ status: 201 });
}
