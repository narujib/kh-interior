import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/shared/stagger-container";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedGalleryItems } from "@/lib/data/gallery";

export async function GalleryPreview() {
  const items = await getFeaturedGalleryItems(5);

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className="bg-surface-muted py-24 md:py-32">
      <Container>
        <div className="mb-16 flex flex-col justify-between gap-8 md:mb-24 md:flex-row md:items-end">
          <SectionHeading
            title="Momen & Detail"
            numbering="04"
            subtitle="Galeri"
            className="mb-0"
          />
          <Link
            href="/gallery"
            className="text-foreground hover:text-foreground-soft group flex items-center gap-2 pb-2 text-sm font-medium tracking-widest uppercase transition-colors"
          >
            Lihat Semua Galeri
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <StaggerContainer className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {items.map((item, index) => {
            // Gambar pertama (index 0) dibuat besar, sisanya kecil
            const isLarge = index === 0;
            const spanClasses = isLarge
              ? "col-span-2 row-span-2 md:col-span-2 md:row-span-2 aspect-square md:aspect-auto"
              : "col-span-1 row-span-1 md:col-span-1 md:row-span-1 aspect-square";

            return (
              <StaggerItem
                key={item.id}
                className={`group relative overflow-hidden ${spanClasses}`}
              >
                <Image
                  src={item.imageUrl}
                  alt={item.altText}
                  fill
                  priority={index <= 2}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes={
                    isLarge
                      ? "(max-width: 768px) 100vw, 50vw"
                      : "(max-width: 768px) 50vw, 25vw"
                  }
                />
                <div className="bg-black-soft/0 group-hover:bg-black-soft/10 absolute inset-0 transition-colors duration-500" />
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </Container>
    </section>
  );
}
