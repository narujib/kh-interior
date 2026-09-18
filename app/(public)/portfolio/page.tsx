import { Container } from "@/components/shared/container";
import { PageHeading } from "@/components/shared/page-heading";
import { ProjectCard } from "@/components/portfolio/project-card";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/shared/stagger-container";
import { ContactCTA } from "@/components/sections/contact-cta";
import { getProjects } from "@/lib/data/projects";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Portofolio",
  description:
    "Jelajahi karya pilihan kami dari proyek desain interior dan arsitektur kustom premium.",
};

export default async function PortfolioPage() {
  // Fetch from our Query Layer
  const projects = await getProjects();

  // If no projects in DB yet, fallback to some mock data for display purposes
  // Normally we would just show an empty state, but for the demo we show the aesthetic
  const displayProjects =
    projects.length > 0
      ? projects
      : [
          {
            id: "1",
            title: "Rumah Kaca",
            slug: "glass-house",
            clientName: "Hunian Pribadi",
            coverImageUrl: "/images/hero.jpeg",
          },
          {
            id: "2",
            title: "Loteng Minimalis",
            slug: "minimalist-loft",
            clientName: "Hotel Butik",
            coverImageUrl: "/images/workshop.jpg",
          },
          {
            id: "3",
            title: "Tempat Singgah Perkotaan",
            slug: "urban-retreat",
            clientName: "Klien Pribadi",
            coverImageUrl: "/images/kitchenset.jpg",
          },
          {
            id: "4",
            title: "Restorasi Warisan",
            slug: "heritage-restoration",
            clientName: "Cagar Budaya",
            coverImageUrl: "/images/wardrobe.jpg",
          },
          {
            id: "5",
            title: "Oasis Modern",
            slug: "modern-oasis",
            clientName: "Eksekutif Teknologi",
            coverImageUrl: "/images/backdrop-living-room.jpg",
          },
          {
            id: "6",
            title: "Vila Pesisir",
            slug: "coastal-villa",
            clientName: "Rumah Peristirahatan Musim Panas",
            coverImageUrl: "/images/storage.jpg",
          },
        ];

  return (
    <>
      <div className="bg-surface pt-32 pb-24 md:pt-48 md:pb-32">
        <Container>
          <PageHeading
            title="Karya Pilihan"
            subtitle="Kurasi karya terbaik dari proyek desain interior kami, menampilkan komitmen kami pada kemewahan yang tenang dan estetika yang abadi."
            align="left"
          />
        </Container>
      </div>

      <section className="bg-surface pb-24 md:pb-32">
        <Container>
          {displayProjects.length > 0 ? (
            <StaggerContainer className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 md:gap-y-24">
              {displayProjects.map((project, index) => (
                <StaggerItem
                  key={project.id}
                  className={index % 2 !== 0 ? "md:mt-24" : ""}
                >
                  <ProjectCard
                    title={project.title}
                    slug={project.slug}
                    coverImage={project.coverImageUrl}
                    clientName={project.clientName}
                  />
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <div className="border-border border-t py-32 text-center">
              <p className="text-foreground-soft font-light">
                Tidak ada proyek yang ditemukan.
              </p>
            </div>
          )}
        </Container>
      </section>

      <ContactCTA />
    </>
  );
}
