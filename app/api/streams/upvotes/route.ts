import { prismaClient } from "@/app/lib/db";
import { error } from "console";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const upvoteSchema = z.object({
  streamId: z.string(),
  // url: z.string(),
});

export async function POST(req: NextRequest) {
  //getting user detail on backend
  const session = await getServerSession();
  const user = await prismaClient.user.findFirst({
    where: {
      email: session?.user?.email ?? "",
    },
  });

  if (!user) {
    return NextResponse.json(
      {
        message: "Unauthenticated",
      },
      {
        status: 403,
      }
    );
  }

  //agr karta hai user exist
  // so do the actuall work
  try {
    const data = upvoteSchema.parse(await req.json());
    await prismaClient.upvote.create({
      data: {
        userId: user.id,
        streamId: data.streamId,
      },
    });

    return NextResponse.json({
      message: "Done!",
    });

    //if any error
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error while downvoting the stream",
      },
      {
        status: 403,
      }
    );
  }
}
