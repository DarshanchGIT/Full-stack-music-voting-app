import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { YT_REGEX } from "@/app/lib/utils";
import { prismaClient } from "@/app/lib/db";
import { getServerSession } from "next-auth";
//@ts-ignore
import youtubesearchapi from "youtube-search-api";

// Creating schema to validate req
const createStreamSchema = z.object({
  creatorId: z.string(),
  url: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const data = createStreamSchema.parse(await req.json());

    console.log("Parsed data:", data);

    // Check if user exists
    const user = await prismaClient.user.findUnique({
      where: { id: data.creatorId },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User does not exist" },
        { status: 404 }
      );
    }

    // Validate YouTube URL format
    const isYt = data.url.match(YT_REGEX);
    if (!isYt) {
      return NextResponse.json(
        { message: "Invalid YouTube URL format" },
        { status: 400 }
      );
    }

    // Extract the ID from the URL
    const extractedId = data.url.includes("v=")
      ? data.url.split("v=")[1].split("&")[0]
      : data.url.split("/").pop()?.split("?")[0];

    // Ensure extractedId is defined and not empty
    if (!extractedId || extractedId.length === 0) {
      return NextResponse.json(
        { message: "Could not extract YouTube ID from URL" },
        { status: 400 }
      );
    }

    console.log("Extracted ID:", extractedId);

    const res = await youtubesearchapi.GetVideoDetails(extractedId);
    // const videoThumbnail = res.thumbnail.thumbnails;
    // console.log("Thumbnail of the video is: ", videoThumbnail);
    const thumbnails = res.thumbnail.thumbnails;
    thumbnails.sort((a: { width: number }, b: { width: number }) =>
      a.width < b.width ? -1 : 1
    );

    // Log data before inserting
    console.log("Data to be inserted:", {
      userId: data.creatorId,
      url: data.url,
      extractedId,
      type: "Youtube",
      title: res.title,
      thumbnails,
    });

    // Create a stream entry in the database
    await prismaClient.stream.create({
      data: {
        userId: data.creatorId,
        // addedBy: user.id,
        url: data.url,
        extractedId,
        type: "Youtube",
        title: res.title ?? "Can't find video",
        smallImg:
          (thumbnails.length > 1
            ? thumbnails[thumbnails.length - 2].url
            : thumbnails[thumbnails.length - 1].url) ??
          "https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_640.jpg",
        bigImg:
          thumbnails[thumbnails.length - 1].url ??
          "https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_640.jpg",
      },
    });

    return NextResponse.json({ message: "Stream added successfully" });
  } catch (error) {
    console.error("Error is: ", error);
    return NextResponse.json(
      { error: "Error while adding a stream" },
      { status: 400 }
    );
  }
}

export async function GET(req: NextRequest) {
  const creatorId = req.nextUrl.searchParams.get("creatorId");
  const session = await getServerSession();
  // const user = await prismaClient.user.findFirst({
  //   where: {
  //     email: session?.user?.email ?? "",
  //   },
  // });
  const streams = await prismaClient.stream.findMany({
    where: {
      userId: creatorId ?? "",
    },
  });

  return NextResponse.json(
    {
      message: "Streams for this specific Id",
      streams,
    },
    {
      status: 200,
    }
  );

  // if (!user) {
  //   return NextResponse.json(
  //     {
  //       message: "Unauthenticated",
  //     },
  //     {
  //       status: 403,
  //     }
  //   );
  // }

  // if (!creatorId) {
  //   return NextResponse.json(
  //     {
  //       message: "Error",
  //     },
  //     {
  //       status: 411,
  //     }
  //   );
  // }
}
