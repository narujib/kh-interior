"use client";

import { useTransition, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  adminSettingsSchema,
  AdminSettingsFormData,
} from "@/lib/validations/admin-settings";
import { updateAdminCredentialsAction } from "@/lib/actions/admin-settings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { signOut } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SettingsFormProps {
  initialUsername?: string;
}

export function SettingsForm({ initialUsername = "" }: SettingsFormProps) {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdminSettingsFormData>({
    resolver: zodResolver(adminSettingsSchema),
    defaultValues: {
      currentPassword: "",
      newUsername: initialUsername,
      newPassword: "",
    },
  });

  // Set default username once initialUsername is loaded
  useEffect(() => {
    if (initialUsername) {
      reset({
        currentPassword: "",
        newUsername: initialUsername,
        newPassword: "",
      });
    }
  }, [initialUsername, reset]);

  const onSubmit = (data: AdminSettingsFormData) => {
    startTransition(async () => {
      try {
        await updateAdminCredentialsAction(data);
        toast.success("Kredensial berhasil diperbarui. Silakan login kembali.");

        // Timeout sedikit sebelum logout agar user melihat pesan sukses
        setTimeout(() => {
          signOut({ callbackUrl: "/admin/login" });
        }, 2000);
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Gagal memperbarui pengaturan"
        );
      }
    });
  };

  return (
    <Card className="border-border bg-surface-muted mx-auto max-w-2xl shadow-none">
      <CardHeader>
        <CardTitle className="font-heading text-2xl font-normal">
          Kredensial Login
        </CardTitle>
        <CardDescription className="text-foreground-soft">
          Perbarui username dan password untuk mengakses dasbor admin.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="border-border bg-background space-y-4 rounded-md border p-4">
            <h3 className="text-foreground mb-4 text-sm font-medium tracking-widest uppercase">
              Verifikasi Keamanan
            </h3>

            <div className="space-y-2">
              <Label htmlFor="currentPassword">Password Saat Ini</Label>
              <Input
                id="currentPassword"
                type="password"
                {...register("currentPassword")}
                placeholder="Masukkan password Anda saat ini"
                disabled={isPending}
              />
              {errors.currentPassword && (
                <p className="text-sm text-red-500">
                  {errors.currentPassword.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="newUsername">Username Baru</Label>
              <Input
                id="newUsername"
                type="text"
                {...register("newUsername")}
                placeholder="Username baru"
                disabled={isPending}
              />
              {errors.newUsername && (
                <p className="text-sm text-red-500">
                  {errors.newUsername.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">Password Baru (Opsional)</Label>
              <Input
                id="newPassword"
                type="password"
                {...register("newPassword")}
                placeholder="Kosongkan jika tidak ingin mengubah password"
                disabled={isPending}
              />
              {errors.newPassword && (
                <p className="text-sm text-red-500">
                  {errors.newPassword.message}
                </p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full rounded-none text-xs tracking-widest uppercase sm:w-auto"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Menyimpan...
              </>
            ) : (
              "Simpan Perubahan"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
