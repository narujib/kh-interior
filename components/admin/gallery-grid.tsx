"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { GalleryItem } from "@/generated/prisma/client";
import { Trash2, Loader2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  deleteGalleryItemAction,
  toggleFeaturedGalleryItemAction,
} from "@/lib/actions/admin-gallery";

interface GalleryGridProps {
  items: GalleryItem[];
}

export function GalleryGrid({ items }: GalleryGridProps) {
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

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

  const handleToggleFeatured = (id: string) => {
    startTransition(async () => {
      try {
        await toggleFeaturedGalleryItemAction(id);
        toast.success("Status unggulan (featured) berhasil diperbarui");
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Gagal mengubah status"
        );
      }
    });
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
      {items.map((item, index) => (
        <div key={item.id} className="border-border relative flex flex-col border bg-surface">
          <div className="relative aspect-square border-b border-border">
            <Image
              src={item.imageUrl}
              alt={item.altText}
              fill
              priority={index <= 4}
              className="object-cover"
            />
            {/* Badge isFeatured always visible if true */}
            {item.isFeatured && (
              <div className="absolute top-2 right-2 rounded-full bg-black/60 p-1.5 text-yellow-400">
                <Star className="h-4 w-4 fill-current" />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2 p-3">
            <Button
              variant={item.isFeatured ? "default" : "secondary"}
              size="sm"
              onClick={() => handleToggleFeatured(item.id)}
              disabled={isPending}
              className="w-full rounded text-xs"
            >
              {item.isFeatured ? "Hapus dari Beranda" : "Tampilkan di Beranda"}
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(item.id)}
              disabled={isDeleting === item.id || isPending}
              className="w-full rounded text-xs"
            >
              {isDeleting === item.id ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="mr-2 h-4 w-4" />
              )}
              Hapus Item
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
