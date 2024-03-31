import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request, context) {
  const { params } = context;

  const room = await prisma.room.findUnique({
    where: {
      roomId: params.roomId,
    },
    include: {
      author: true,
      member: true,
    },
  });

  return NextResponse.json({
    message: "success",
    data: room,
  });
}
