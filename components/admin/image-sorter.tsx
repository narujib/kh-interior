"use client";

import { useState } from "react";
import { ProjectImage } from "@/generated/prisma/client";
import { GripVertical, X, Loader2 } from "lucide-react";
import Image from "next/image";
import { ImageUpload } from "./image-upload";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface ImageSorterProps {
  projectId: string;
  initialImages: ProjectImage[];
}

export function ImageSorter({ projectId, initialImages }: ImageSorterProps) {
  const [images, setImages] = useState<ProjectImage[]>(initialImages);
  const [isUpdating, setIsUpdating] = useState(false);

  // Drag and drop state
  const [draggedId, setDraggedId] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedId(id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    if (draggedId === id) return;

    const draggedIndex = images.findIndex((img) => img.id === draggedId);
    const targetIndex = images.findIndex((img) => img.id === id);

    if (draggedIndex === -1 || targetIndex === -1) return;

    const newImages = [...images];
    const [draggedImage] = newImages.splice(draggedIndex, 1);
    newImages.splice(targetIndex, 0, draggedImage);

    // Update order indexes
    const updatedOrder = newImages.map((img, index) => ({
      ...img,
      orderIndex: index,
    }));

    setImages(updatedOrder);
  };

  const handleDragEnd = () => {
    setDraggedId(null);
  };

  const handleSaveOrder = async () => {
    setIsUpdating(true);
    try {
      const response = await fetch(
        `/api/admin/projects/${projectId}/images/reorder`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            images: images.map(({ id, orderIndex }) => ({ id, orderIndex })),
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to save order");
      toast.success("Image order saved");
    } catch {
      toast.error("Failed to save order");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAddImage = async (url: string) => {
    if (!url) return;

    setIsUpdating(true);
    try {
      const response = await fetch(`/api/admin/projects/${projectId}/images`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageUrl: url,
          altText: "Project image",
          orderIndex: images.length,
        }),
      });

      if (!response.ok) throw new Error("Failed to add image");

      const newImage = await response.json();
      setImages([...images, newImage.data]);
      toast.success("Image added");
    } catch {
      toast.error("Failed to add image");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteImage = async (imageId: string) => {
    if (!confirm("Are you sure you want to remove this image?")) return;

    setIsUpdating(true);
    try {
      const response = await fetch(
        `/api/admin/projects/${projectId}/images/${imageId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Failed to delete image");

      setImages(images.filter((img) => img.id !== imageId));
      toast.success("Image deleted");
    } catch {
      toast.error("Failed to delete image");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-xl font-medium">Project Gallery</h3>
        <Button
          variant="outline"
          onClick={handleSaveOrder}
          disabled={isUpdating}
          className="border-border rounded-none"
        >
          {isUpdating ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          Save Order
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {images.map((image) => (
          <div
            key={image.id}
            draggable
            onDragStart={(e) => handleDragStart(e, image.id)}
            onDragOver={(e) => handleDragOver(e, image.id)}
            onDragEnd={handleDragEnd}
            className={`border-border group bg-surface-muted relative aspect-square border transition-opacity ${
              draggedId === image.id ? "opacity-50" : "opacity-100"
            }`}
          >
            <Image
              src={image.imageUrl}
              alt={image.altText || "Project image"}
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
              <button
                type="button"
                className="cursor-grab rounded bg-white/20 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/40 active:cursor-grabbing"
              >
                <GripVertical className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => handleDeleteImage(image.id)}
                className="rounded bg-red-500/80 p-2 text-white backdrop-blur-sm transition-colors hover:bg-red-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}

        <div className="aspect-square">
          <ImageUpload
            folder="custom-interior/projects/gallery"
            value=""
            onChange={handleAddImage}
            disabled={isUpdating}
          />
        </div>
      </div>
    </div>
  );
}
