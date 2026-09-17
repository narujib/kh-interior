"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { gallerySchema, GalleryFormData } from "@/lib/validations/gallery";
import { revalidatePath } from "next/cache";

export async function createGalleryItemAction(data: GalleryFormData) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }

  const parsed = gallerySchema.parse(data);

  await prisma.galleryItem.create({
    data: {
      imageUrl: parsed.imageUrl,
      altText: parsed.altText,
    },
  });

  revalidatePath("/gallery");
  revalidatePath("/admin/gallery");
}

export async function deleteGalleryItemAction(id: string) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }

  await prisma.galleryItem.delete({
    where: { id },
  });

  revalidatePath("/gallery");
  revalidatePath("/admin/gallery");
}
