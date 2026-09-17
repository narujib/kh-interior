"use client";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createGalleryItemAction } from "@/lib/actions/admin-gallery";

export function GalleryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<GalleryFormData>({
    resolver: zodResolver(gallerySchema),
    defaultValues: {
      imageUrl: "",
      altText: "",
      orientation: "LANDSCAPE",
    },
  });

  const onSubmit = async (data: GalleryFormData) => {
    setIsSubmitting(true);
    try {
      await createGalleryItemAction(data);
      toast.success("Gallery item added");
      form.reset();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to add gallery item"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label>Image</Label>
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
        <Label htmlFor="altText">Alt Text</Label>
        <Input
          id="altText"
          placeholder="Brief description of the image"
          {...form.register("altText")}
        />
        {form.formState.errors.altText && (
          <p className="text-sm text-red-500">
            {form.formState.errors.altText.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="orientation">Orientation</Label>
        <Select
          value={form.watch("orientation")}
          onValueChange={(value) =>
            form.setValue("orientation", value as "LANDSCAPE" | "PORTRAIT", {
              shouldValidate: true,
            })
          }
        >
          <SelectTrigger className="border-border rounded-none">
            <SelectValue placeholder="Select orientation" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="LANDSCAPE">Landscape</SelectItem>
            <SelectItem value="PORTRAIT">Portrait</SelectItem>
          </SelectContent>
        </Select>
        {form.formState.errors.orientation && (
          <p className="text-sm text-red-500">
            {form.formState.errors.orientation.message}
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
            Adding...
          </>
        ) : (
          "Add to Gallery"
        )}
      </Button>
    </form>
  );
}
