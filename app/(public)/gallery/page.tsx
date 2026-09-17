import { Container } from "@/components/shared/container";
import { PageHeading } from "@/components/shared/page-heading";
import { ContactCTA } from "@/components/sections/contact-cta";
import { getGalleryItems } from "@/lib/data/gallery";
import { GalleryClient } from "@/components/gallery/gallery-client";

export const metadata = {
  title: "Gallery | Khakim Interior",
  description:
    "A curated gallery of interior details, material textures, and spatial compositions.",
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
            altText: "Interior Detail",
            orientation: "PORTRAIT" as const,
          },
          {
            id: "2",
            imageUrl:
              "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80",
            altText: "Material Texture",
            orientation: "LANDSCAPE" as const,
          },
          {
            id: "3",
            imageUrl:
              "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80",
            altText: "Living Space",
            orientation: "PORTRAIT" as const,
          },
          {
            id: "4",
            imageUrl:
              "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&q=80",
            altText: "Kitchen Design",
            orientation: "LANDSCAPE" as const,
          },
          {
            id: "5",
            imageUrl:
              "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
            altText: "Natural Light",
            orientation: "LANDSCAPE" as const,
          },
          {
            id: "6",
            imageUrl:
              "https://images.unsplash.com/photo-1600566752229-250de485458f?auto=format&fit=crop&q=80",
            altText: "Bedroom Detail",
            orientation: "PORTRAIT" as const,
          },
        ];

  return (
    <>
      <div className="bg-background pt-32 pb-24 md:pt-48 md:pb-32">
        <Container>
          <PageHeading
            title="Gallery"
            subtitle="Moments, textures, and details that define our approach to spatial design."
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
