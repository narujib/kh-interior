"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ChevronLeft, ChevronRight, X, Loader2 } from "lucide-react";

interface GalleryItem {
  id: string;
  imageUrl: string;
  altText: string;
}

interface GalleryClientProps {
  items: GalleryItem[];
}

const ITEMS_PER_PAGE = 36;

export function GalleryClient({ items }: GalleryClientProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);
  
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingTriggerRef = useRef<HTMLDivElement | null>(null);

  const displayedItems = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !isLoading) {
        setIsLoading(true);
        // Simulate network delay for the "loading" effect
        setTimeout(() => {
          setVisibleCount((prev) => Math.min(prev + ITEMS_PER_PAGE, items.length));
          setIsLoading(false);
        }, 800);
      }
    },
    [hasMore, isLoading, items.length]
  );

  useEffect(() => {
    const element = loadingTriggerRef.current;
    if (!element) return;

    const option = {
      root: null,
      rootMargin: "100px",
      threshold: 0,
    };

    observerRef.current = new IntersectionObserver(handleObserver, option);
    observerRef.current.observe(element);

    return () => {
      if (observerRef.current && element) {
        observerRef.current.unobserve(element);
      }
    };
  }, [handleObserver]);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % displayedItems.length);
    }
  };

  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + displayedItems.length) % displayedItems.length);
    }
  };

  if (!items || items.length === 0) {
    return (
      <div className="border-border border-t py-32 text-center">
        <p className="text-foreground-soft font-light">
          Tidak ada gambar di galeri saat ini.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-flow-dense auto-rows-[150px] grid-cols-2 gap-2 sm:grid-cols-3 md:auto-rows-[200px] md:grid-cols-4 md:gap-4 lg:auto-rows-[250px] lg:grid-cols-5 xl:grid-cols-6">
        {displayedItems.map((item, index) => {
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

          const isWide = spanClasses.includes("col-span-2");
          const imageSizes = isWide
            ? "(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
            : "(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw";

          return (
            <div
              key={item.id}
              className={`group relative cursor-pointer overflow-hidden rounded-md animate-in fade-in zoom-in duration-500 fill-mode-both ${spanClasses}`}
              style={{ animationDelay: `${(index % ITEMS_PER_PAGE) * 50}ms` }}
              onClick={() => openLightbox(index)}
            >
              <Image
                src={item.imageUrl}
                alt={item.altText}
                fill
                priority={index <= 4}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes={imageSizes}
              />
              <div className="bg-black-soft/0 group-hover:bg-black-soft/20 absolute inset-0 transition-colors duration-500" />
            </div>
          );
        })}
      </div>
      
      {/* Loading Trigger Element */}
      {hasMore && (
        <div 
          ref={loadingTriggerRef} 
          className="mt-16 flex w-full justify-center pb-8"
        >
          {isLoading && (
            <div className="flex flex-col items-center justify-center gap-2 text-foreground-soft animate-pulse">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span className="text-xs uppercase tracking-widest font-medium">Memuat Galeri...</span>
            </div>
          )}
        </div>
      )}

      <Dialog
        open={selectedIndex !== null}
        onOpenChange={(open) => !open && closeLightbox()}
      >
        <DialogContent
          showCloseButton={false}
          className="flex h-[100dvh] w-full max-w-full flex-col items-center justify-center border-none bg-transparent p-0 shadow-none sm:max-w-full md:max-w-full"
        >
          <VisuallyHidden>
            <DialogTitle>Image Lightbox</DialogTitle>
            <DialogDescription>View high resolution image</DialogDescription>
          </VisuallyHidden>

          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-50 rounded-full bg-black/60 p-3 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-black/80"
            aria-label="Tutup lightbox"
          >
            <X className="h-6 w-6" />
          </button>

          {selectedIndex !== null && (
            <div className="relative flex h-full w-full items-center justify-center">
              <button
                onClick={showPrev}
                className="absolute left-4 z-50 rounded-full bg-black/60 p-4 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-black/80 md:left-8"
                aria-label="Gambar sebelumnya"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>

              <div className="relative flex h-full w-full items-center justify-center p-4 md:p-24">
                <div className="relative h-full w-full">
                  <Image
                    src={displayedItems[selectedIndex].imageUrl}
                    alt={displayedItems[selectedIndex].altText}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority
                  />
                </div>
              </div>

              <button
                onClick={showNext}
                className="absolute right-4 z-50 rounded-full bg-black/60 p-4 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-black/80 md:right-8"
                aria-label="Gambar selanjutnya"
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
