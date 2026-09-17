import prisma from "@/lib/prisma";
import { cache } from "react";

// Use React cache for deduplication within the same request
export const getProjects = cache(async () => {
  return await prisma.project.findMany({
    orderBy: { completionDate: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      clientName: true,
      coverImageUrl: true,
      completionDate: true,
      updatedAt: true,
    },
  });
});

export const getFeaturedProjects = cache(async (limit = 4) => {
  return await prisma.project.findMany({
    take: limit,
    orderBy: { completionDate: "desc" },
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
