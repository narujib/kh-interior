import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/shared/stagger-container";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Mock data until DB is ready
const MOCK_GALLERY = [
  {
    id: "1",
    imageUrl:
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&q=80",
    altText: "Detail Interior",
    orientation: "PORTRAIT",
  },
  {
    id: "2",
    imageUrl:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80",
    altText: "Tekstur Material",
    orientation: "LANDSCAPE",
  },
  {
    id: "3",
    imageUrl:
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80",
    altText: "Ruang Keluarga",
    orientation: "PORTRAIT",
  },
  {
    id: "4",
    imageUrl:
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&q=80",
    altText: "Desain Dapur",
    orientation: "LANDSCAPE",
  },
];

export function GalleryPreview() {
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
          {MOCK_GALLERY.map((item) => (
            <StaggerItem
              key={item.id}
              className={`group relative overflow-hidden ${
                item.orientation === "PORTRAIT"
                  ? "col-span-2 aspect-[3/4] md:col-span-1"
                  : "col-span-2 aspect-[4/3] md:col-span-2"
              }`}
            >
              <Image
                src={item.imageUrl}
                alt={item.altText}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="bg-black-soft/0 group-hover:bg-black-soft/10 absolute inset-0 transition-colors duration-500" />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
