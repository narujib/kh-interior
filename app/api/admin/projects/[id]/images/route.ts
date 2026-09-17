import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { imageUrl, altText, orderIndex } = await req.json();

    if (!imageUrl) {
      return NextResponse.json(
        { success: false, error: "Image URL required" },
        { status: 400 }
      );
    }

    const newImage = await prisma.projectImage.create({
      data: {
        projectId: params.id,
        imageUrl,
        altText: altText || "Project image",
        orderIndex: orderIndex || 0,
      },
    });

    return NextResponse.json({ success: true, data: newImage });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to add image" },
      { status: 500 }
    );
  }
}
