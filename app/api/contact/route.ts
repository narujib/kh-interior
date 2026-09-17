import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { contactSchema } from "@/lib/validations/contact";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate request body
    const validatedData = contactSchema.parse(body);

    // Basic rate limiting/spam protection could go here in the future
    // For now, we save directly to DB

    const message = await prisma.message.create({
      data: {
        senderName: validatedData.name,
        email: validatedData.email,
        messageText: validatedData.message,
        isRead: false,
      },
    });

    return NextResponse.json({
      success: true,
      data: { id: message.id },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Validasi gagal. Silakan periksa kembali isian form Anda.",
          details: error.errors,
        },
        { status: 400 }
      );
    }

    console.error("Contact API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Terjadi kesalahan internal. Pesan gagal dikirim.",
      },
      { status: 500 }
    );
  }
}
