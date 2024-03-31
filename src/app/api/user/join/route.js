import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  const param = await request.json();

  const room = await prisma.room.findUnique({
    where: {
      roomId: param.roomId,
    },
  });

  if (!room) {
    return NextResponse.json({
      message: "can not find room",
    });
  }
  const checkIfJoin = await prisma.room.findUnique({
    where: {
      roomId: param.roomId,
      member: {
        some: {
          email: param.email,
        },
      },
    },
  });

  if (checkIfJoin) {
    return NextResponse.json({
      message: "you already join",
    });
  }

  const joinRoom = await prisma.user.update({
    where: {
      email: param.email,
    },
    data: {
      memberOf: { connect: { roomId: param.roomId } },
    },
    select: {
      name: true,
      email: true,
      memberOf: true,
    },
  });

  return NextResponse.json({
    message: "join success",
    data: joinRoom,
  });
}
