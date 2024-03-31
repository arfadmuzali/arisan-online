import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PATCH(request) {
  const params = await request.json();

  const userLeaveRoom = await prisma.user.update({
    where: {
      email: params.email,
    },
    data: {
      memberOf: {
        disconnect: [{ roomId: params.roomId }],
      },
    },
  });

  return NextResponse.json({
    message: "success leave",
    data: params,
  });
}
