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

  // Check if slug exists
  const existing = await prisma.project.findUnique({
    where: { slug: parsed.slug },
  });

  if (existing) {
    throw new Error("A project with this slug already exists.");
  }

  await prisma.project.create({
    data: {
      title: parsed.title,
      slug: parsed.slug,
      description: parsed.description,
      clientName: parsed.clientName,
      completionDate: new Date(parsed.completionDate),
      coverImageUrl: parsed.coverImageUrl,
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

  // Check if slug exists on ANOTHER project
  const existing = await prisma.project.findUnique({
    where: { slug: parsed.slug },
  });

  if (existing && existing.id !== id) {
    throw new Error("A project with this slug already exists.");
  }

  await prisma.project.update({
    where: { id },
    data: {
      title: parsed.title,
      slug: parsed.slug,
      description: parsed.description,
      clientName: parsed.clientName,
      completionDate: new Date(parsed.completionDate),
      coverImageUrl: parsed.coverImageUrl,
    },
  });

  revalidatePath(`/portfolio/${parsed.slug}`);
  revalidatePath("/portfolio");
  revalidatePath("/admin/portfolio");
  revalidatePath("/");

  redirect("/admin/portfolio");
}
