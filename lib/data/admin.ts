import prisma from "@/lib/prisma";

export async function getDashboardStats() {
  const [totalProjects, totalGalleryItems, unreadMessages, latestProject] =
    await Promise.all([
      prisma.project.count(),
      prisma.galleryItem.count(),
      prisma.message.count({ where: { isRead: false } }),
      prisma.project.findFirst({
        orderBy: { createdAt: "desc" },
        select: { title: true },
      }),
    ]);

  return {
    totalProjects,
    totalGalleryItems,
    unreadMessages,
    latestProjectTitle: latestProject?.title,
  };
}

export async function getRecentMessages(limit = 5) {
  return prisma.message.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}
