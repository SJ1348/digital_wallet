import { NextResponse } from "next/server";

export async function GET() {
  console.log("HELLO FROM BANK BALANCE");
  return NextResponse.json({ message: "BankBalance sent" });
}
