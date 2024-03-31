import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request, context) {
  const { params } = context;

  const myRoom = await prisma.user.findUnique({
    where: {
      email: params.myroom,
    },
    select: {
      memberOf: {
        include: {
          author: {
            select: {
              email: true,
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  return NextResponse.json({
    message: "success",
    data: myRoom,
  });
}
