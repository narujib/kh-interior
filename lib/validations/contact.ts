import * as z from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Nama terlalu pendek")
    .max(100, "Nama terlalu panjang"),
  email: z.string().email("Format email tidak valid"),
  message: z
    .string()
    .min(10, "Pesan minimal 10 karakter")
    .max(1000, "Maksimal 1000 karakter"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export type ContactFormData = z.infer<typeof contactSchema>;
