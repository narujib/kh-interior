import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { uploadToCloudinary, CloudinaryFolder } from "@/lib/cloudinary";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
];

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = formData.get("folder") as string | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      );
    }

    if (
      !folder ||
      ![
        "custom-interior/projects/covers",
        "custom-interior/projects/gallery",
        "custom-interior/gallery",
      ].includes(folder)
    ) {
      return NextResponse.json(
        { success: false, error: "Invalid folder" },
        { status: 400 }
      );
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Invalid file type. Only JPG, PNG, WEBP, and AVIF are allowed.",
        },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: "File size exceeds the 10MB limit." },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await uploadToCloudinary(buffer, folder as CloudinaryFolder);

    return NextResponse.json({
      success: true,
      data: {
        imageUrl: result.secure_url,
      },
    });
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to upload file to Cloudinary." },
      { status: 500 }
    );
  }
}
