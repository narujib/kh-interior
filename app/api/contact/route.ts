import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { contactSchema } from "@/lib/validations/contact";
import { z } from "zod";

const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate request body
    const validatedData = contactSchema.parse(body);

    // Basic rate limiting
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const now = Date.now();

    // Cleanup old entries
    for (const [key, timestamp] of rateLimitMap.entries()) {
      if (now - timestamp > RATE_LIMIT_WINDOW) {
        rateLimitMap.delete(key);
      }
    }

    const lastRequest = rateLimitMap.get(ip);
    if (lastRequest && now - lastRequest < RATE_LIMIT_WINDOW) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    rateLimitMap.set(ip, now);

    const message = await prisma.message.create({
      data: {
        senderName: validatedData.name,
        email: validatedData.email,
        whatsapp: validatedData.whatsapp,
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
      const zodError = error as z.ZodError;
      return NextResponse.json(
        { success: false, error: zodError.issues[0].message },
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
