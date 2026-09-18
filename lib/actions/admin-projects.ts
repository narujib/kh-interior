"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { projectSchema, ProjectFormData } from "@/lib/validations/project";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProjectAction(data: ProjectFormData) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }

  const parsed = projectSchema.parse(data);

  // Auto-generate slug
  const baseSlug = parsed.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
    
  let finalSlug = baseSlug;
  let isUnique = false;

  while (!isUnique) {
    const existing = await prisma.project.findUnique({
      where: { slug: finalSlug },
    });
    if (!existing) {
      isUnique = true;
    } else {
      finalSlug = `${baseSlug}-${Math.random().toString(36).substring(2, 6)}`;
    }
  }

  await prisma.project.create({
    data: {
      title: parsed.title,
      slug: finalSlug,
      description: parsed.description,
      clientName: parsed.clientName,
      coverImageUrl: parsed.coverImageUrl,
      images: parsed.images && parsed.images.length > 0 ? {
        create: parsed.images.map((url, index) => ({
          imageUrl: url,
          altText: `${parsed.title} - Image ${index + 1}`,
          orderIndex: index,
        })),
      } : undefined,
    },
  });

  revalidatePath("/portfolio");
  revalidatePath("/admin/portfolio");
  revalidatePath("/");

  redirect("/admin/portfolio");
}

export async function updateProjectAction(id: string, data: ProjectFormData) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }

  const parsed = projectSchema.parse(data);

  await prisma.project.update({
    where: { id },
    data: {
      title: parsed.title,
      description: parsed.description,
      clientName: parsed.clientName,
      coverImageUrl: parsed.coverImageUrl,
    },
  });

  // Handle images separately: Delete existing and recreate
  if (parsed.images) {
    await prisma.projectImage.deleteMany({
      where: { projectId: id },
    });

    if (parsed.images.length > 0) {
      await prisma.projectImage.createMany({
        data: parsed.images.map((url, index) => ({
          projectId: id,
          imageUrl: url,
          altText: `${parsed.title} - Image ${index + 1}`,
          orderIndex: index,
        })),
      });
    }
  }

  revalidatePath(`/portfolio`); // clear wildcard or specific later
  revalidatePath("/admin/portfolio");
  revalidatePath("/");

  redirect("/admin/portfolio");
}

export async function toggleFeaturedProjectAction(id: string) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) throw new Error("Proyek tidak ditemukan");

  // Prevent more than 4 featured projects if turning ON
  if (!project.isFeatured) {
    const featuredCount = await prisma.project.count({
      where: { isFeatured: true },
    });
    if (featuredCount >= 4) {
      throw new Error("Maksimal 4 proyek yang dapat ditampilkan di Beranda");
    }
  }

  await prisma.project.update({
    where: { id },
    data: { isFeatured: !project.isFeatured },
  });

  revalidatePath("/");
  revalidatePath("/admin/portfolio");
}
