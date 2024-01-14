import { NextResponse } from "next/server";
import { prisma } from "../../../prisma/index.js";

export async function POST(req) {
  const body = await req.json();
  const userId = parseInt(body.id);

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  let accountNumbers;

  if (user) {
    accountNumbers = user.accountNumbers.map((accNum) => {
      return parseInt(accNum);
    });
    return NextResponse.json({ accountNumbers }, { status: 200 });
  } else {
    return NextResponse.json(
      { message: "No account numbers found" },
      { status: 400 }
    );
  }
}
