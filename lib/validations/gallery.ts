import * as z from "zod";

export const gallerySchema = z.object({
  imageUrl: z.string().url("URL gambar tidak valid"),
  altText: z
    .string()
    .min(3, "Teks alternatif terlalu pendek")
    .max(150, "Maks 150 karakter"),
  orientation: z.enum(["LANDSCAPE", "PORTRAIT"], {
    required_error: "Pilih orientasi gambar",
  }),
});

export type GalleryFormData = z.infer<typeof gallerySchema>;
