import prisma from "@/lib/prisma";
import { cache } from "react";

export const getGalleryItems = cache(async () => {
  const [galleryItems, projects] = await Promise.all([
    prisma.galleryItem.findMany({
      orderBy: { createdAt: "desc" },
    }),
    prisma.project.findMany({
      include: { images: true },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const projectMappedImages = projects.flatMap((p, idx) => {
    const images = [
      {
        id: `p-cover-${p.id}`,
        imageUrl: p.coverImageUrl,
        altText: `Sampul: ${p.title}`,
        // We alternate orientations to make the masonry grid look dynamic
        orientation:
          idx % 2 === 0 ? ("LANDSCAPE" as const) : ("PORTRAIT" as const),
        isFeatured: false,
        createdAt: p.createdAt,
      },
      ...p.images.map((img, imgIdx) => ({
        id: `p-img-${img.id}`,
        imageUrl: img.imageUrl,
        altText: img.altText || p.title,
        orientation:
          imgIdx % 2 !== 0 ? ("LANDSCAPE" as const) : ("PORTRAIT" as const),
        isFeatured: false,
        createdAt: p.createdAt,
      })),
    ];
    return images;
  });

  const allItems = [...galleryItems, ...projectMappedImages].sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );

  return allItems;
});

export const getFeaturedGalleryItems = cache(async (limit = 5) => {
  return await prisma.galleryItem.findMany({
    where: { isFeatured: true },
    take: limit,
    orderBy: { createdAt: "desc" },
  });
});
