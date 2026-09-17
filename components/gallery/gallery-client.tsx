"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface GalleryItem {
  id: string;
  imageUrl: string;
  altText: string;
}

interface GalleryClientProps {
  items: GalleryItem[];
}

export function GalleryClient({ items }: GalleryClientProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % items.length);
    }
  };

  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + items.length) % items.length);
    }
  };

  if (!items || items.length === 0) {
    return (
      <div className="border-border border-t py-32 text-center">
        <p className="text-foreground-soft font-light">
          No images in gallery yet.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-flow-dense auto-rows-[150px] grid-cols-2 gap-2 md:auto-rows-[250px] md:grid-cols-3 md:gap-4 lg:auto-rows-[300px] lg:grid-cols-4">
        {items.map((item, index) => {
          // Pola pseudo-random untuk memberikan efek "acak tapi rapi"
          const p = index % 10;
          let spanClasses = "col-span-1 row-span-1"; // Default kecil

          if (p === 0 || p === 6) {
            spanClasses = "col-span-2 row-span-2"; // Besar (2x2)
          } else if (p === 3) {
            spanClasses = "col-span-2 row-span-1"; // Lebar (2x1)
          } else if (p === 4 || p === 8) {
            spanClasses = "col-span-1 row-span-2"; // Tinggi (1x2)
          }

          return (
            <div
              key={item.id}
              className={`group relative cursor-pointer overflow-hidden rounded-md ${spanClasses}`}
              onClick={() => openLightbox(index)}
            >
              <Image
                src={item.imageUrl}
                alt={item.altText}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="bg-black-soft/0 group-hover:bg-black-soft/20 absolute inset-0 transition-colors duration-500" />
            </div>
          );
        })}
      </div>

      <Dialog
        open={selectedIndex !== null}
        onOpenChange={(open) => !open && closeLightbox()}
      >
        <DialogContent className="flex h-[95vh] max-w-[95vw] flex-col items-center justify-center border-none bg-transparent p-0 shadow-none">
          <VisuallyHidden>
            <DialogTitle>Image Lightbox</DialogTitle>
            <DialogDescription>View high resolution image</DialogDescription>
          </VisuallyHidden>

          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-50 rounded-full bg-black/50 p-2 text-white/70 transition-colors hover:text-white"
            aria-label="Close lightbox"
          >
            <X className="h-6 w-6" />
          </button>

          {selectedIndex !== null && (
            <div className="relative flex h-full w-full items-center justify-center">
              <button
                onClick={showPrev}
                className="absolute left-4 z-50 rounded-full bg-black/50 p-3 text-white/70 transition-all hover:bg-black/80 hover:text-white"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>

              <div className="relative flex h-full w-full items-center justify-center p-12">
                <div className="relative h-full max-h-[80vh] w-full max-w-5xl">
                  <Image
                    src={items[selectedIndex].imageUrl}
                    alt={items[selectedIndex].altText}
                    fill
                    className="object-contain"
                    sizes="95vw"
                    priority
                  />
                </div>
              </div>

              <button
                onClick={showNext}
                className="absolute right-4 z-50 rounded-full bg-black/50 p-3 text-white/70 transition-all hover:bg-black/80 hover:text-white"
                aria-label="Next image"
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
