import { Container } from "@/components/shared/container";
import { PageHeading } from "@/components/shared/page-heading";
import { ContactCTA } from "@/components/sections/contact-cta";
import { getGalleryItems } from "@/lib/data/gallery";
import { GalleryClient } from "@/components/gallery/gallery-client";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Galeri",
  description:
    "Kurasi galeri dari detail interior, tekstur material, dan komposisi ruang.",
};

export default async function GalleryPage() {
  const dbItems = await getGalleryItems();

  // Mock data for demo purposes if DB is empty
  const items =
    dbItems.length > 0
      ? dbItems
      : [
          {
            id: "1",
            imageUrl:
              "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&q=80",
            altText: "Detail Interior",
            orientation: "PORTRAIT" as const,
          },
          {
            id: "2",
            imageUrl:
              "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80",
            altText: "Tekstur Material",
            orientation: "LANDSCAPE" as const,
          },
          {
            id: "3",
            imageUrl:
              "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80",
            altText: "Ruang Keluarga",
            orientation: "PORTRAIT" as const,
          },
          {
            id: "4",
            imageUrl:
              "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&q=80",
            altText: "Desain Dapur",
            orientation: "LANDSCAPE" as const,
          },
          {
            id: "5",
            imageUrl:
              "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&q=80",
            altText: "Cahaya Alami",
            orientation: "LANDSCAPE" as const,
          },
          {
            id: "6",
            imageUrl:
              "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&q=80",
            altText: "Detail Kamar Tidur",
            orientation: "PORTRAIT" as const,
          },
        ];

  return (
    <>
      <div className="bg-background pt-32 pb-24 md:pt-48 md:pb-32">
        <Container>
          <PageHeading
            title="Galeri"
            subtitle="Momen, tekstur, dan detail yang mendefinisikan pendekatan kami terhadap desain spasial."
            align="left"
          />
        </Container>
      </div>

      <section className="bg-background pb-24 md:pb-40">
        <Container>
          <GalleryClient items={items} />
        </Container>
      </section>

      <ContactCTA />
    </>
  );
}
