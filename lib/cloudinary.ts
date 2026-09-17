import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// ─── Folder constants ─────────────────────────────────────────────────────────
export const CLOUDINARY_FOLDERS = {
  PROJECT_COVERS: "custom-interior/projects/covers",
  PROJECT_GALLERY: "custom-interior/projects/gallery",
  GALLERY: "custom-interior/gallery",
} as const;

export type CloudinaryFolder =
  (typeof CLOUDINARY_FOLDERS)[keyof typeof CLOUDINARY_FOLDERS];

// ─── Upload helper ────────────────────────────────────────────────────────────
interface UploadResult {
  secure_url: string;
  public_id: string;
}

export async function uploadToCloudinary(
  fileBuffer: Buffer,
  folder: CloudinaryFolder,
  options?: Record<string, unknown>
): Promise<UploadResult> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        ...options,
      },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Upload failed — no result returned"));
          return;
        }
        resolve({
          secure_url: result.secure_url,
          public_id: result.public_id,
        });
      }
    );

    uploadStream.end(fileBuffer);
  });
}

export default cloudinary;
