import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// create room
export async function POST(request) {
  const req = await request.json();

  const author = await prisma.user.findUnique({
    where: {
      email: req.email,
    },
    select: {
      id: true,
    },
  });

  if (!author)
    return NextResponse.json({
      message: "user not found",
    });

  const room = await prisma.room.create({
    data: {
      name: req.name,
      authorId: author.id,
      member: { connect: { id: author.id } },
    },
  });

  return NextResponse.json({
    message: "success",
    data: room,
  });
}
