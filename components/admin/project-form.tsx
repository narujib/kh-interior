"use client";
/* eslint-disable react-hooks/incompatible-library */

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema, ProjectFormData } from "@/lib/validations/project";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/admin/image-upload";
import { MultiImageUpload } from "@/components/admin/multi-image-upload";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface ProjectFormProps {
  initialData?: ProjectFormData & { id?: string; images?: string[] };
  onSubmit: (data: ProjectFormData) => Promise<void>;
}

export function ProjectForm({ initialData, onSubmit }: ProjectFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      clientName: initialData?.clientName || "",
      coverImageUrl: initialData?.coverImageUrl || "",
      images: initialData?.images || [],
    },
  });

  const handleSubmit = async (data: ProjectFormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Gagal menyimpan proyek"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Judul Proyek</Label>
          <Input
            id="title"
            {...form.register("title")}
            className="border-border rounded-none"
          />
          {form.formState.errors.title && (
            <p className="text-sm text-red-500">
              {form.formState.errors.title.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="clientName">Nama Klien / Lokasi</Label>
          <Input
            id="clientName"
            {...form.register("clientName")}
            className="border-border rounded-none"
          />
          {form.formState.errors.clientName && (
            <p className="text-sm text-red-500">
              {form.formState.errors.clientName.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Deskripsi</Label>
        <Textarea
          id="description"
          {...form.register("description")}
          className="border-border min-h-[150px] rounded-none"
        />
        {form.formState.errors.description && (
          <p className="text-sm text-red-500">
            {form.formState.errors.description.message}
          </p>
        )}
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        <div className="space-y-2 md:col-span-5">
          <Label>Gambar Sampul (Wajib)</Label>
          <ImageUpload
            folder="custom-interior/projects/covers"
            value={form.watch("coverImageUrl")}
            onChange={(url) =>
              form.setValue("coverImageUrl", url, { shouldValidate: true })
            }
          />
          {form.formState.errors.coverImageUrl && (
            <p className="text-sm text-red-500">
              {form.formState.errors.coverImageUrl.message}
            </p>
          )}
        </div>

        <div className="space-y-2 md:col-span-7">
          <Label>Gambar Galeri / Pendukung (Opsional)</Label>
          <MultiImageUpload
            folder="custom-interior/projects/gallery"
            value={form.watch("images") || []}
            onChange={(urls) => form.setValue("images", urls)}
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="bg-foreground text-white-soft w-full rounded-none py-6"
      >
        {isSubmitting ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : initialData ? (
          "Perbarui Proyek"
        ) : (
          "Buat Proyek"
        )}
      </Button>
    </form>
  );
}
