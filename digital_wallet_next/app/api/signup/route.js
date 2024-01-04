import { getUserData } from "@/app/(db)/db";
import { NextResponse } from "next/server";

let userData = getUserData();

export async function POST(req) {
  const body = await req.json();
  const email = body.email;
  const password = body.password;

  userData = [...userData, { email, password }];

  return NextResponse.json({ userData }, { status: 201 });
}
