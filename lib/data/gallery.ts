import prisma from "@/lib/prisma";
import { cache } from "react";

export const getGalleryItems = cache(async () => {
  return await prisma.galleryItem.findMany({
    orderBy: { createdAt: "desc" },
  });
});

export const getFeaturedGalleryItems = cache(async (limit = 6) => {
  return await prisma.galleryItem.findMany({
    take: limit,
    orderBy: { createdAt: "desc" },
  });
});
