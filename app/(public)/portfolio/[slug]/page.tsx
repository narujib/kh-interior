import { Container } from "@/components/shared/container";
import { FadeIn } from "@/components/shared/fade-in";
import { ImageReveal } from "@/components/shared/image-reveal";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/shared/stagger-container";
import { ContactCTA } from "@/components/sections/contact-cta";
import { getProjectBySlug } from "@/lib/data/projects";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Proyek Tidak Ditemukan",
    };
  }

  return {
    title: `${project.title}`,
    description: project.description.substring(0, 160),
    openGraph: {
      images: [project.coverImageUrl],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // Try to fetch project from DB
  const project = await getProjectBySlug(slug);

  // If no project is found (e.g., DB empty during dev), we either use mock data if it's a known slug or 404
  let displayProject = project;

  if (!displayProject) {
    // For demo purposes, we provide a mock project if slug matches one of our mocks
    const MOCK_PROJECTS: Record<
      string,
      {
        id: string;
        title: string;
        clientName: string;
        description: string;
        coverImageUrl: string;
        images: Array<{ id: string; imageUrl: string; altText: string }>;
      }
    > = {
      "glass-house": {
        id: "1",
        title: "Rumah Kaca",
        clientName: "Hunian Pribadi",
        description:
          "Terletak di atas bukit yang landai, The Glass House adalah mahakarya dalam memadukan ruang interior dan eksterior. Tujuan desainnya adalah untuk menciptakan tempat perlindungan yang terasa sepenuhnya terhubung dengan alam sekitar sambil mempertahankan rasa keintiman yang mendalam. Kami menggunakan palet bahan terbatas seperti batu alam, kayu ek hangat, dan perunggu berpatina untuk menyeimbangkan dinding kaca yang luas. Setiap perabot dirancang khusus atau didapatkan dari penjual barang antik untuk memastikan estetika yang benar-benar unik, terasa tertata rapi sekaligus nyaman untuk ditinggali.",
        coverImageUrl:
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80",
        images: [
          {
            id: "img1",
            imageUrl:
              "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80",
            altText: "Pemandangan Ruang Keluarga",
          },
          {
            id: "img2",
            imageUrl:
              "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&q=80",
            altText: "Detail Dapur",
          },
          {
            id: "img3",
            imageUrl:
              "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80",
            altText: "Kamar Tidur Utama",
          },
        ],
      },
    };

    if (MOCK_PROJECTS[slug]) {
      displayProject = MOCK_PROJECTS[slug] as unknown as typeof project; // Cast via unknown to the Prisma type
    } else {
      notFound();
    }
  }

  // Ensure displayProject is not null for TypeScript
  if (!displayProject) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: displayProject.title,
    image: displayProject.coverImageUrl,
    datePublished:
      displayProject.createdAt?.toISOString() || new Date().toISOString(),
    dateModified:
      displayProject.updatedAt?.toISOString() || new Date().toISOString(),
    author: {
      "@type": "Organization",
      name: "Khakim Interior",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="bg-background pt-32 pb-24 md:pt-40 md:pb-32">
        <Container>
          {/* Back button */}
          <FadeIn className="mb-12 md:mb-20">
            <Link
              href="/portfolio"
              className="text-foreground-soft hover:text-foreground group inline-flex items-center gap-2 text-xs tracking-widest uppercase transition-colors"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Kembali ke Portofolio
            </Link>
          </FadeIn>

          {/* Project Header */}
          <div className="mb-16 grid grid-cols-1 gap-12 md:mb-24 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-8 lg:pr-12">
              <FadeIn delay={0.1}>
                <h1 className="font-heading mb-8 text-4xl leading-[1.1] font-normal sm:text-5xl md:text-6xl lg:text-7xl">
                  {displayProject.title}
                </h1>
              </FadeIn>
            </div>

            <div className="flex flex-col justify-end lg:col-span-4">
              <FadeIn
                delay={0.2}
                className="border-border flex flex-col gap-6 border-l pl-6"
              >
                <div>
                  <p className="text-foreground-soft mb-1 text-xs tracking-widest uppercase">
                    Klien
                  </p>
                  <p className="text-foreground font-medium">
                    {displayProject.clientName}
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative mb-16 h-[50vh] w-full md:mb-32 md:h-[70vh]">
            <ImageReveal className="h-full w-full">
              <Image
                src={displayProject.coverImageUrl}
                alt={displayProject.title}
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
            </ImageReveal>
          </div>

          {/* Description */}
          <div className="mx-auto mb-24 max-w-3xl text-center md:mb-40">
            <FadeIn>
              <p className="text-foreground-soft text-lg leading-relaxed font-light md:text-xl">
                {displayProject.description}
              </p>
            </FadeIn>
          </div>

          {/* Project Gallery */}
          {displayProject.images && displayProject.images.length > 0 && (
            <StaggerContainer className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16 lg:gap-24">
              {displayProject.images.map(
                (
                  image: { id: string; imageUrl: string; altText?: string },
                  index: number
                ) => (
                  <StaggerItem
                    key={image.id}
                    className={`relative aspect-[4/5] w-full ${index % 2 !== 0 ? "md:mt-32" : ""}`}
                  >
                    <Image
                      src={image.imageUrl}
                      alt={
                        image.altText ||
                        displayProject?.title ||
                        "Project Image"
                      }
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </StaggerItem>
                )
              )}
            </StaggerContainer>
          )}

          {/* Next Project Navigation (Placeholder for now) */}
          <div className="border-border mt-32 flex items-center justify-between border-t pt-16">
            <p className="text-foreground-soft text-sm tracking-widest uppercase">
              Akhir dari Proyek
            </p>
            <Link
              href="/portfolio"
              className="text-foreground hover:text-foreground-soft group inline-flex items-center gap-2 text-sm font-medium tracking-widest uppercase transition-colors"
            >
              Lihat Proyek Lainnya
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Container>
      </article>

      <ContactCTA />
    </>
  );
}
