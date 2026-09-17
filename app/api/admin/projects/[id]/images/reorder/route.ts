import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { images } = await req.json();
    if (!Array.isArray(images)) {
      return NextResponse.json(
        { success: false, error: "Invalid payload" },
        { status: 400 }
      );
    }

    // Use a transaction to update all order indexes
    await prisma.$transaction(
      images.map((img: { id: string; orderIndex: number }) =>
        prisma.projectImage.update({
          where: { id: img.id },
          data: { orderIndex: img.orderIndex },
        })
      )
    );

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to reorder images" },
      { status: 500 }
    );
  }
}
