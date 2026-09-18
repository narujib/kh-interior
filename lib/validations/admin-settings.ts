import * as z from "zod";

export const adminSettingsSchema = z.object({
  currentPassword: z.string().min(1, "Password saat ini wajib diisi"),
  newUsername: z.string().min(3, "Username minimal 3 karakter"),
  newPassword: z
    .string()
    .min(6, "Password minimal 6 karakter")
    .optional()
    .or(z.literal("")),
});

export type AdminSettingsFormData = z.infer<typeof adminSettingsSchema>;
