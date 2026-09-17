"use client";

import { useState } from "react";
import Image from "next/image";
import { GalleryItem } from "@/generated/prisma/client";
import { Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { deleteGalleryItemAction } from "@/lib/actions/admin-gallery";

interface GalleryGridProps {
  items: GalleryItem[];
}

export function GalleryGrid({ items }: GalleryGridProps) {
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus item galeri ini?")) return;

    setIsDeleting(id);
    try {
      await deleteGalleryItemAction(id);
      toast.success("Item galeri dihapus");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Gagal menghapus item"
      );
    } finally {
      setIsDeleting(null);
    }
  };

  if (items.length === 0) {
    return (
      <div className="border-border bg-surface-muted flex h-full flex-col items-center justify-center border border-dashed p-12 text-center">
        <p className="text-foreground-soft">
          Tidak ada item galeri yang ditemukan.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {items.map((item) => (
        <div key={item.id} className="group border-border relative border">
          <div className="relative aspect-square">
            <Image
              src={item.imageUrl}
              alt={item.altText}
              fill
              className="object-cover"
            />
          </div>

          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
            <Button
              variant="destructive"
              size="icon"
              onClick={() => handleDelete(item.id)}
              disabled={isDeleting === item.id}
              className="rounded"
            >
              {isDeleting === item.id ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
