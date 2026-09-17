"use client";
/* eslint-disable react-hooks/incompatible-library */

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { gallerySchema, GalleryFormData } from "@/lib/validations/gallery";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { ImageUpload } from "./image-upload";
import { createGalleryItemAction } from "@/lib/actions/admin-gallery";

export function GalleryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<GalleryFormData>({
    resolver: zodResolver(gallerySchema),
    defaultValues: {
      imageUrl: "",
      altText: "",
    },
  });

  const onSubmit = async (data: GalleryFormData) => {
    setIsSubmitting(true);
    try {
      await createGalleryItemAction(data);
      toast.success("Item galeri ditambahkan");
      form.reset();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Gagal menambahkan item galeri"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label>Gambar</Label>
        <ImageUpload
          folder="custom-interior/gallery"
          value={form.watch("imageUrl")}
          onChange={(url) =>
            form.setValue("imageUrl", url, { shouldValidate: true })
          }
        />
        {form.formState.errors.imageUrl && (
          <p className="text-sm text-red-500">
            {form.formState.errors.imageUrl.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="altText">Teks Alternatif</Label>
        <Input
          id="altText"
          placeholder="Deskripsi singkat tentang gambar"
          {...form.register("altText")}
        />
        {form.formState.errors.altText && (
          <p className="text-sm text-red-500">
            {form.formState.errors.altText.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-none"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Menambahkan...
          </>
        ) : (
          "Tambahkan ke Galeri"
        )}
      </Button>
    </form>
  );
}
