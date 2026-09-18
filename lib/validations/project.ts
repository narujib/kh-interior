import * as z from "zod";

export const projectSchema = z.object({
  title: z
    .string()
    .min(3, "Judul terlalu pendek")
    .max(100, "Judul terlalu panjang"),
  description: z.string().min(10, "Deskripsi terlalu pendek"),
  clientName: z
    .string()
    .min(2, "Nama klien harus diisi")
    .max(100, "Terlalu panjang"),
  coverImageUrl: z.string().url("URL gambar tidak valid"),
  images: z.array(z.string().url("URL gambar tidak valid")).optional(),
});

export type ProjectFormData = z.infer<typeof projectSchema>;
