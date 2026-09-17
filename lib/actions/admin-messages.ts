"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function toggleMessageReadAction(id: string, isRead: boolean) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }

  await prisma.message.update({
    where: { id },
    data: { isRead },
  });

  revalidatePath("/admin/messages");
  revalidatePath("/admin/dashboard");
}

export async function deleteMessageAction(id: string) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }

  await prisma.message.delete({
    where: { id },
  });

  revalidatePath("/admin/messages");
  revalidatePath("/admin/dashboard");
}
