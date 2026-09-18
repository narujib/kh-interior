import prisma from "@/lib/prisma";
import { cache } from "react";

// Use React cache for deduplication within the same request
export const getProjects = cache(async () => {
  return await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      clientName: true,
      coverImageUrl: true,
      updatedAt: true,
    },
  });
});

export const getFeaturedProjects = cache(async (limit = 4) => {
  return await prisma.project.findMany({
    where: { isFeatured: true },
    take: limit,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      coverImageUrl: true,
      clientName: true,
    },
  });
});

export const getProjectBySlug = cache(async (slug: string) => {
  return await prisma.project.findUnique({
    where: { slug },
    include: {
      images: {
        orderBy: { orderIndex: "asc" },
      },
    },
  });
});
