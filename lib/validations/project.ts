import * as z from "zod";

export const projectSchema = z.object({
  title: z
    .string()
    .min(3, "Judul terlalu pendek")
    .max(100, "Judul terlalu panjang"),
  slug: z
    .string()
    .min(3)
    .max(100)
    .regex(/^[a-z0-9-]+$/, "Slug hanya boleh huruf kecil, angka, dan strip"),
  description: z.string().min(10, "Deskripsi terlalu pendek"),
  clientName: z
    .string()
    .min(2, "Nama klien harus diisi")
    .max(100, "Terlalu panjang"),
  completionDate: z.string().or(z.date()), // Accepts date string or date object
  coverImageUrl: z.string().url("URL gambar tidak valid"),
  // Project images handled separately for simpler form logic initially
});

export type ProjectFormData = z.infer<typeof projectSchema>;
