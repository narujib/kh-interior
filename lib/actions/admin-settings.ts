"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";
import {
  adminSettingsSchema,
  AdminSettingsFormData,
} from "@/lib/validations/admin-settings";

export async function updateAdminCredentialsAction(
  data: AdminSettingsFormData
) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.name) {
    throw new Error("Unauthorized");
  }

  // Cari admin yang sedang login berdasarkan nama username di session
  const admin = await prisma.admin.findUnique({
    where: { username: session.user.name },
  });

  if (!admin) {
    throw new Error("Admin tidak ditemukan");
  }

  // Validasi input
  const parsed = adminSettingsSchema.parse(data);

  // Verifikasi password saat ini
  const isPasswordValid = await bcryptjs.compare(
    parsed.currentPassword,
    admin.passwordHash
  );

  if (!isPasswordValid) {
    throw new Error("Password saat ini salah");
  }

  // Cek apakah username baru sudah dipakai (oleh admin lain, meski kita cuma punya 1 admin)
  if (parsed.newUsername !== admin.username) {
    const existingAdmin = await prisma.admin.findUnique({
      where: { username: parsed.newUsername },
    });

    if (existingAdmin) {
      throw new Error("Username sudah digunakan");
    }
  }

  // Siapkan data pembaruan
  const updateData: { username: string; passwordHash?: string } = {
    username: parsed.newUsername,
  };

  // Jika password baru diisi, hash password baru tersebut
  if (parsed.newPassword && parsed.newPassword.trim().length > 0) {
    updateData.passwordHash = await bcryptjs.hash(parsed.newPassword, 10);
  }

  // Update data ke database
  await prisma.admin.update({
    where: { id: admin.id },
    data: updateData,
  });

  return { success: true };
}
